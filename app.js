const STORAGE_KEYS = {
  countdownStart: "aiPaysYouCountdownStart",
  candidates: "aiPaysYouCandidates",
  selectedDomain: "aiPaysYouSelectedDomain",
};

const FUNNEL_STEPS = {
  1: "Choose domain",
  2: "Create profile",
  3: "Practice interview",
  4: "Sit project interview",
  5: "Join project",
  6: "Create best work",
  7: "Get paid",
};

function getCountdownStart() {
  const existing = localStorage.getItem(STORAGE_KEYS.countdownStart);
  if (existing) return Number(existing);

  const now = Date.now();
  localStorage.setItem(STORAGE_KEYS.countdownStart, String(now));
  return now;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const daysEl = document.getElementById("days");
  if (!daysEl) return;

  const start = getCountdownStart();
  const end = start + 30 * 24 * 60 * 60 * 1000;
  const remaining = Math.max(0, end - Date.now());

  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((remaining / (60 * 1000)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  daysEl.textContent = String(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}

function readCandidates() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.candidates)) || [];
  } catch {
    return [];
  }
}

function writeCandidates(candidates) {
  localStorage.setItem(STORAGE_KEYS.candidates, JSON.stringify(candidates));
}

function syncDomainSelect() {
  const domainSelect = document.getElementById("domain");
  if (!domainSelect) return;

  const saved = localStorage.getItem(STORAGE_KEYS.selectedDomain);
  if (saved) domainSelect.value = saved;

  domainSelect.addEventListener("change", () => {
    localStorage.setItem(STORAGE_KEYS.selectedDomain, domainSelect.value);
  });
}

function handleLeadForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const selectedDomain = document.getElementById("domain")?.value || localStorage.getItem(STORAGE_KEYS.selectedDomain) || "";

    const candidate = {
      id: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()),
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      domain: selectedDomain,
      step: Number(formData.get("step")),
      joinedAt: new Date().toISOString(),
      countdownStartedAt: new Date(getCountdownStart()).toISOString(),
      notes: String(formData.get("notes") || "").trim(),
      source: "github-pages-mvp",
    };

    const candidates = readCandidates();
    const existingIndex = candidates.findIndex((item) => item.email.toLowerCase() === candidate.email.toLowerCase());

    if (existingIndex >= 0) {
      candidates[existingIndex] = { ...candidates[existingIndex], ...candidate };
    } else {
      candidates.push(candidate);
    }

    writeCandidates(candidates);
    form.reset();

    const status = document.getElementById("form-status");
    if (status) status.textContent = "Candidate saved. Open CRM to review the funnel.";
  });
}

function renderAdmin() {
  const rows = document.getElementById("candidate-rows");
  if (!rows) return;

  const candidates = readCandidates();
  const byStep = (step) => candidates.filter((candidate) => Number(candidate.step) >= step).length;

  document.getElementById("metric-total").textContent = String(candidates.length);
  document.getElementById("metric-practice").textContent = String(byStep(3));
  document.getElementById("metric-interview").textContent = String(byStep(4));
  document.getElementById("metric-paid").textContent = String(byStep(7));

  rows.innerHTML = "";

  if (!candidates.length) {
    rows.innerHTML = '<tr class="empty-row"><td colspan="6">No candidates saved in this browser yet.</td></tr>';
    return;
  }

  for (const candidate of candidates.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt))) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(candidate.name)}</td>
      <td>${escapeHtml(candidate.email)}</td>
      <td>${escapeHtml(candidate.domain || "Unselected")}</td>
      <td>${candidate.step} - ${escapeHtml(FUNNEL_STEPS[candidate.step] || "Unknown")}</td>
      <td>${new Date(candidate.joinedAt).toLocaleDateString()}</td>
      <td>${escapeHtml(candidate.notes || "")}</td>
    `;
    rows.appendChild(row);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toCsvValue(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function setupAdminActions() {
  const exportButton = document.getElementById("export-csv");
  if (exportButton) {
    exportButton.addEventListener("click", () => {
      const candidates = readCandidates();
      const headers = ["name", "email", "domain", "step", "joinedAt", "countdownStartedAt", "notes", "source"];
      const csv = [
        headers.join(","),
        ...candidates.map((candidate) => headers.map((header) => toCsvValue(candidate[header])).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ai-pays-you-candidates.csv";
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  const clearButton = document.getElementById("clear-crm");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      const confirmed = window.confirm("Clear all locally saved candidate records?");
      if (!confirmed) return;
      localStorage.removeItem(STORAGE_KEYS.candidates);
      renderAdmin();
    });
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
syncDomainSelect();
handleLeadForm();
renderAdmin();
setupAdminActions();

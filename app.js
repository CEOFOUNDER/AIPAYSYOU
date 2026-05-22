const STORAGE_KEYS = {
  countdownStart: "aiPaysYouCountdownStart",
  candidates: "aiPaysYouCandidates",
  selectedDomain: "aiPaysYouSelectedDomain",
};

const FUNNEL_STEPS = {
  1: "Pick expertise",
  2: "Practice interview",
  3: "Create profile",
  4: "Try real project",
  5: "Joined project",
  6: "Completed work",
  7: "Got paid",
};

const EXPERTISE_PROFILES = {
  consulting: {
    label: "Consulting - Business, Strategy, IT, and Transformation",
    headline: "Consulting expertise maps directly to AI evaluation.",
    description:
      "Use your business, strategy, IT, or transformation judgment to review AI outputs, evaluate scenarios, test recommendations, and improve project workflows.",
    pay: "$50-$200/hour",
  },
  medicine: {
    label: "Medicine and Clinical Practice",
    headline: "Clinical expertise can train AI to reason more safely.",
    description:
      "Use medical judgment to review clinical scenarios, evaluate model answers, and spot missing context in healthcare workflows.",
    pay: "$100-$180/hour",
  },
  law: {
    label: "Law and Legal Review",
    headline: "Legal expertise can improve AI reasoning and review.",
    description:
      "Use legal judgment across transactions, litigation, compliance, employment, IP, and document review tasks.",
    pay: "$85-$150/hour",
  },
  software: {
    label: "Software Engineering",
    headline: "Software expertise can evaluate AI-generated code and systems.",
    description:
      "Use engineering judgment to review code, architecture, performance, reliability, and technical reasoning.",
    pay: "$50-$170/hour",
  },
  data: {
    label: "Data, MLOps, Cloud, and Cybersecurity",
    headline: "Technical infrastructure expertise is useful immediately.",
    description:
      "Use data, MLOps, cloud, network, or security judgment to test AI outputs against real technical constraints.",
    pay: "$45-$160/hour",
  },
  finance: {
    label: "Finance, Investment, and Accounting",
    headline: "Finance expertise can evaluate AI on real commercial judgment.",
    description:
      "Use investment, banking, equity research, accounting, risk, or trading knowledge to review AI analysis and recommendations.",
    pay: "$80-$200/hour",
  },
  science: {
    label: "Science, Engineering, and PhD Research",
    headline: "Research expertise can train AI on specialist reasoning.",
    description:
      "Use scientific, engineering, PhD, physics, architecture, or geospatial knowledge to evaluate complex AI answers.",
    pay: "$60-$140/hour",
  },
  language: {
    label: "Language, Translation, and Audio Evaluation",
    headline: "Language expertise can improve AI across real-world communication.",
    description:
      "Use bilingual, translation, audio, transcription, and cultural judgment to evaluate language-heavy AI work.",
    pay: "$25-$60/hour",
  },
  operations: {
    label: "Business Operations and Supply Chain",
    headline: "Operations expertise can make AI outputs more realistic.",
    description:
      "Use process, supply chain, admin, and operating-model judgment to test whether AI recommendations work in practice.",
    pay: "$34-$110/hour",
  },
  sales: {
    label: "Sales, Support, and Customer Experience",
    headline: "Customer-facing expertise can train AI for practical conversations.",
    description:
      "Use sales, support, customer experience, and commerce judgment to evaluate how AI handles real customer situations.",
    pay: "$43-$150/hour",
  },
  design: {
    label: "Design, Media, and AI Content Review",
    headline: "Creative expertise can evaluate AI outputs people actually see.",
    description:
      "Use product design, UX, slide design, image, voice, animation, or content-review judgment to improve AI-generated work.",
    pay: "$50-$125/hour",
  },
  generalist: {
    label: "Generalist AI Evaluation",
    headline: "Generalist judgment can still be valuable in AI evaluation.",
    description:
      "Use broad reasoning, real-world understanding, and careful review skills to test whether AI outputs make sense.",
    pay: "$50-$200/hour",
  },
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
  if (saved && EXPERTISE_PROFILES[saved]) domainSelect.value = saved;

  updateFitPanel(domainSelect.value);

  domainSelect.addEventListener("change", () => {
    localStorage.setItem(STORAGE_KEYS.selectedDomain, domainSelect.value);
    updateFitPanel(domainSelect.value);
  });
}

function updateFitPanel(value) {
  const profile = EXPERTISE_PROFILES[value] || EXPERTISE_PROFILES.consulting;
  const headline = document.getElementById("fit-headline");
  const description = document.getElementById("fit-description");
  const pay = document.getElementById("fit-pay");

  if (headline) headline.textContent = profile.headline;
  if (description) description.textContent = profile.description;
  if (pay) pay.textContent = profile.pay;
}

function handleLeadForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const selectedDomainValue = document.getElementById("domain")?.value || localStorage.getItem(STORAGE_KEYS.selectedDomain) || "";
    const selectedDomain = EXPERTISE_PROFILES[selectedDomainValue]?.label || selectedDomainValue;

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
    if (status) status.textContent = "Saved. Your 30-day fit record is ready to review.";
  });
}

function renderAdmin() {
  const rows = document.getElementById("candidate-rows");
  if (!rows) return;

  const candidates = readCandidates();
  const byStep = (step) => candidates.filter((candidate) => Number(candidate.step) >= step).length;

  document.getElementById("metric-total").textContent = String(candidates.length);
  document.getElementById("metric-practice").textContent = String(byStep(2));
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

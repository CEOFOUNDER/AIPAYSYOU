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
    shortLabel: "consulting",
    description:
      "Top AI labs and AI project teams need consulting experts to review AI outputs, evaluate scenarios, test recommendations, and improve project workflows.",
    pay: "$50-$200/hour",
  },
  medicine: {
    label: "Medicine and Clinical Practice",
    shortLabel: "medicine",
    description:
      "Top AI labs and AI project teams need medical experts to review clinical scenarios, evaluate model answers, and spot missing context in healthcare workflows.",
    pay: "$100-$180/hour",
  },
  law: {
    label: "Law and Legal Review",
    shortLabel: "law",
    description:
      "Top AI labs and AI project teams need legal experts to review transactions, litigation, compliance, employment, IP, and document-heavy AI work.",
    pay: "$85-$150/hour",
  },
  software: {
    label: "Software Engineering",
    shortLabel: "software engineering",
    description:
      "Top AI labs and AI project teams need software experts to review code, architecture, performance, reliability, and technical reasoning.",
    pay: "$50-$170/hour",
  },
  data: {
    label: "Data, MLOps, Cloud, and Cybersecurity",
    shortLabel: "data, MLOps, cloud, and cybersecurity",
    description:
      "Top AI labs and AI project teams need technical infrastructure experts to test AI outputs against real data, cloud, MLOps, network, and security constraints.",
    pay: "$45-$160/hour",
  },
  finance: {
    label: "Finance, Investment, and Accounting",
    shortLabel: "finance",
    description:
      "Top AI labs and AI project teams need finance experts to review investment, banking, equity research, accounting, risk, and trading analysis.",
    pay: "$80-$200/hour",
  },
  science: {
    label: "Science, Engineering, and PhD Research",
    shortLabel: "science, engineering, and PhD research",
    description:
      "Top AI labs and AI project teams need research experts to evaluate complex scientific, engineering, PhD, physics, architecture, and geospatial answers.",
    pay: "$60-$140/hour",
  },
  language: {
    label: "Language, Translation, and Audio Evaluation",
    shortLabel: "language and audio evaluation",
    description:
      "Top AI labs and AI project teams need language experts to evaluate bilingual, translation, audio, transcription, and culturally sensitive AI work.",
    pay: "$25-$60/hour",
  },
  operations: {
    label: "Business Operations and Supply Chain",
    shortLabel: "business operations and supply chain",
    description:
      "Top AI labs and AI project teams need operations experts to test whether AI recommendations work in real process, supply chain, admin, and operating-model contexts.",
    pay: "$34-$110/hour",
  },
  sales: {
    label: "Sales, Support, and Customer Experience",
    shortLabel: "sales, support, and customer experience",
    description:
      "Top AI labs and AI project teams need customer-facing experts to evaluate how AI handles real sales, support, customer experience, and commerce situations.",
    pay: "$43-$150/hour",
  },
  design: {
    label: "Design, Media, and AI Content Review",
    shortLabel: "design, media, and AI content review",
    description:
      "Top AI labs and AI project teams need creative experts to review product design, UX, slide design, image, voice, animation, and AI-generated content.",
    pay: "$50-$125/hour",
  },
  generalist: {
    label: "Generalist AI Evaluation",
    shortLabel: "generalist evaluation",
    description:
      "Top AI labs and AI project teams need careful generalist reviewers to test whether AI outputs make sense in real-world situations.",
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
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (hoursEl) hoursEl.textContent = pad(hours);
  if (minutesEl) minutesEl.textContent = pad(minutes);
  if (secondsEl) secondsEl.textContent = pad(seconds);
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
  const domain = document.getElementById("fit-domain");
  const inline = document.getElementById("domain-inline");
  const stepOne = document.getElementById("step-one");

  if (headline) headline.textContent = `Your expertise in ${profile.shortLabel} is in demand.`;
  if (description) description.textContent = profile.description;
  if (pay) pay.textContent = profile.pay;
  if (domain) domain.textContent = profile.label;
  if (inline) inline.textContent = profile.shortLabel;
  if (stepOne) stepOne.textContent = `Signal that, as an expert in ${profile.shortLabel}, you are ready to review AI work.`;
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

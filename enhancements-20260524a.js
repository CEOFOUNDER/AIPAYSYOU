const AI_GENERALIST_PROFILE = {
  label: "Generalist with some AI knowledge",
  description:
    "Top AI labs and AI project teams need AI-aware generalists to review everyday AI outputs, compare responses, check reasoning, and spot when answers are useful, clear, or wrong.",
  pay: "$60-$120/hour",
};

function applyAiGeneralistCopy() {
  const select = document.getElementById("domain");
  if (select?.value !== "ai-generalist") return;

  const exactDomain = AI_GENERALIST_PROFILE.label;
  const headline = document.getElementById("fit-headline");
  const description = document.getElementById("fit-description");
  const pay = document.getElementById("fit-pay");
  const domain = document.getElementById("fit-domain");
  const inline = document.getElementById("domain-inline");
  const stepOne = document.getElementById("step-one");

  if (headline) headline.textContent = `${exactDomain} expertise is in demand.`;
  if (description) description.textContent = AI_GENERALIST_PROFILE.description;
  if (pay) pay.textContent = AI_GENERALIST_PROFILE.pay;
  if (domain) domain.textContent = exactDomain;
  if (inline) inline.textContent = exactDomain;
  if (stepOne) {
    stepOne.textContent = `Signal that, as a ${exactDomain}, you are ready to review AI work.`;
  }
}

function centerAfterUnlock(targetId) {
  window.setTimeout(() => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 40);
}

document.getElementById("check-demand")?.addEventListener("click", () => {
  applyAiGeneralistCopy();
  centerAfterUnlock("result-section");
});

document.getElementById("unlock-flow")?.addEventListener("click", () => {
  applyAiGeneralistCopy();
  centerAfterUnlock("action-flow");
});

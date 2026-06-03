# AI Pays You Website Guardrails

Use these guardrails whenever updating the AI Pays You website.

## Project Context

- Site: AI Pays You
- Repo: CEOFOUNDER/AIPAYSYOU
- Primary live site: https://aipaysyouin30days.com
- GitHub Pages fallback: https://ceofounder.github.io/AIPAYSYOU/
- Working folder: C:\Users\gille\Documents\Codex\2026-05-22\all-right-so-you-re-going
- Core files: `index.html`, `styles.css`, `compact.css`, `app.js`, `enhancements-20260524a.js`, `admin.html`
- Custom domain file: `CNAME`

## Primary Purpose

The site converts credible professionals and domain experts into a paid AI project onboarding funnel. It should feel practical, direct, trustworthy, and opportunity-led, not like a generic AI hype page.

## Core Message

AI Pays You helps people turn their professional knowledge into paid AI-related work within a clear 30-day path.

## Must Preserve

- The domain checker funnel as the central interactive journey.
- The 30-day positioning.
- The professional/domain expert audience.
- The Mercor/project marketplace affiliate path where already configured.
- The compact/mobile screen experience.
- The lightweight GitHub Pages/static-site architecture.
- The local MVP CRM/admin concept unless explicitly replacing it.
- The custom domain `aipaysyouin30days.com` via `CNAME`.
- The company attribution footer for SEE THE NEXT MOVE LTD.

## Tone And Copy

- Use clear, confident, plain English.
- Avoid vague AI hype.
- Avoid promising guaranteed income.
- Emphasize practical next steps, fit, eligibility, and momentum.
- Keep copy aligned with LinkedIn, article, and hiring-style positioning.
- The page should sound like a serious opportunity, not a course sales page.
- Do not add Gilles Bonelli's LinkedIn or personal contact details unless explicitly requested.

## Visual And UI Consistency

- Design mobile-first.
- Compact screens must remain readable and usable.
- CTAs should be obvious and action-oriented.
- Avoid clutter, oversized decorative sections, and unnecessary complexity.
- Keep the funnel easy to scan.
- Maintain visual hierarchy: headline, promise, domain checker, steps, proof/fit, CTA.
- Keep the legal/company footer visible, subtle, and readable.

## Functional Consistency

- Do not break the domain selector/checker.
- Do not remove existing candidate capture behavior without replacing it.
- Do not introduce backend assumptions incompatible with GitHub Pages.
- Keep `admin.html` as local/browser-side CRM unless explicitly changing the storage model.
- Preserve external links and target behavior unless asked to change them.
- Preserve `CNAME` with `aipaysyouin30days.com` unless the custom domain is intentionally changed.

## Lessons From Past Mistakes

- After a change, save it in both places when relevant: the local project folder and GitHub.
- If adding project rules or context, update `GUARDRAILS.md` too.
- Do not assume the local folder is a Git checkout; this project may need direct GitHub connector updates.
- If GitHub Pages changes are made, verify the repository readback after publishing.
- Avoid hidden legal footers. Company attribution must be visible, not gated behind funnel state.
- Prefer ASCII for legal footer symbols, such as `Copyright 2026`, to avoid encoding issues.
- Be careful when copying large CSS files to GitHub; verify selectors after update to catch typos.
- For domain setup, distinguish DNS propagation from wrong records. Check actual DNS records before changing things repeatedly.
- For Namecheap and GitHub Pages, use GitHub Pages A records for `@` and a `www` CNAME to `CEOFOUNDER.github.io`.
- HTTPS may take time after DNS works. Do not move to Cloudflare unless GitHub HTTPS remains blocked or the user explicitly asks.

## Before Making Any Website Change

1. Check whether the change strengthens the domain checker funnel.
2. Check whether it improves trust, clarity, or conversion.
3. Check compact/mobile behavior.
4. Check that the copy does not overpromise.
5. Check that GitHub Pages static hosting still works.
6. Check whether `GUARDRAILS.md` needs updating because of the change.
7. If the change affects domain, footer, hosting, or legal identity, verify the live site and GitHub file readback.

## Update Instruction Format

Use this prompt pattern when asking for future website changes:

```text
$ai-pays-you-website-guardrails to update the website: [your change]
```

## Example

```text
$ai-pays-you-website-guardrails to update the website: make the domain checker CTA clearer for healthcare professionals
```

## Implementation Discipline

When asked to update the website:

- Make the smallest useful change.
- Keep styles consistent with existing files.
- Avoid unrelated redesigns.
- Verify the page still works locally where possible.
- Verify GitHub readback for changed files when publishing directly to GitHub.
- Summarize what changed and what was intentionally left alone.

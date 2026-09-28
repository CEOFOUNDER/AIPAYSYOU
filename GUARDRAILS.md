# AI Pays You Website Guardrails

This GitHub file is the single source of truth for AI Pays You website guardrails.

Primary command:

```text
$ai-pays-you-website-guardrails to update the website: [your change]
```

Do not maintain separate local project-folder copies of these guardrails. If a local operational prompt, note, or skill exists, it must point back to this GitHub file rather than becoming a competing rule set.

## Project Context

- Site: AI Pays You
- Repo: CEOFOUNDER/AIPAYSYOU
- Canonical guardrails file: `GUARDRAILS.md` in `CEOFOUNDER/AIPAYSYOU`
- Primary live site: https://aipaysyouin30days.com
- GitHub Pages fallback: https://ceofounder.github.io/AIPAYSYOU/
- Working folder: `C:\Users\gille\Documents\Codex\2026-05-22\all-right-so-you-re-going`
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
- The approved referral opportunity paths for Mercor, Micro1, Alignerr, and Ethos.
- The compact/mobile screen experience.
- The lightweight GitHub Pages/static-site architecture.
- The local MVP CRM/admin concept unless explicitly replacing it.
- The custom domain `aipaysyouin30days.com` via `CNAME`.
- The company attribution footer for SEE THE NEXT MOVE LTD.
- The current protected footer wording, unless the user explicitly asks to change footer copy: `© SEE THE NEXT MOVE LTD. 2026`.
- The `About this project` credibility band on the front page only, unless explicitly asked to remove or replace it.

## Tone And Copy

- Use clear, confident, plain English.
- Avoid vague AI hype.
- Avoid promising guaranteed income.
- Emphasize practical next steps, fit, eligibility, and momentum.
- Keep copy aligned with LinkedIn, article, and hiring-style positioning.
- The page should sound like a serious opportunity, not a course sales page.
- Do not add Gilles Bonelli's LinkedIn or personal contact details unless explicitly requested.
- Keep the founder credential line factual and non-contact-oriented.

## Visual And UI Consistency

- Design mobile-first.
- Compact screens must remain readable and usable.
- CTAs should be obvious and action-oriented.
- Avoid clutter, oversized decorative sections, and unnecessary complexity.
- Keep the funnel easy to scan.
- Keep one primary decision per stage: choose expertise first, then choose a referral platform.
- Treat referral-platform clicks as the landing page's primary conversion action; supporting process guidance must not compete with those links.
- Explain Steps 2 and 3 compactly on the result view instead of placing them behind an additional interactive screen.
- Maintain visual hierarchy: headline, promise, domain checker, steps, proof/fit, CTA.
- Keep the legal/company footer visible, subtle, and readable.
- Keep the `About this project` band subtle, text-led, and above the footer on `index.html` only; do not add it to `admin.html` or secondary pages.
- On desktop, let the `About this project` text use the available footnote-band width rather than forcing it into a narrow paragraph block.
- Keep `About this project` content vertically centered between its horizontal rules; avoid top-heavy padding that pushes the label/text downward.
- Keep hero, timer, domain checker, and footer proportioned across laptop, desktop, tablet, and phone breakpoints.
- Do not let hero text overwhelm the domain checker on laptop screens; the first viewport should feel balanced, not like one oversized headline with a stranded form.
- Use a clear spacing scale for landing page adjustments, favoring 8, 16, 24, 32, 48, and 64 pixel rhythm rather than arbitrary offsets.
- Use fluid type with bounded `clamp()` values so hero text remains dominant without crowding the form or footer.
- Keep the 30-day timer visually connected to the domain checker, not floating over or colliding with the form.

## Functional Consistency

- Do not break the domain selector/checker.
- Do not remove existing candidate capture behavior without replacing it.
- Do not introduce backend assumptions incompatible with GitHub Pages.
- Keep `admin.html` as local/browser-side CRM unless explicitly changing the storage model.
- Preserve external links and target behavior unless asked to change them.
- Approved direct referral URLs are Mercor `https://work.mercor.com/?referralCode=00a43f19-4489-444c-8926-cd5f4309c1cf&utm_campaign=platform&utm_medium=direct&utm_source=referral`, Micro1 `https://www.micro1.ai/experts/opportunities?referralCode=638abe12-b20b-42ec-a23b-61a826c98c6a&utm_source=referral&utm_medium=share&utm_campaign=job_referral`, Alignerr `https://app.alignerr.com/signin?referral-code=55253c98-ebad-4450-8791-5c2c989760ea&program=b7f918c0-4ef7-11f1-9dec-3d76718b1a77&referralJobId=f4b9a0e2-e6c2-4388-b01d-b7655b313d9b`, and Ethos `https://agent.askethos.com/refer/lwdne1mcsmzt`.
- Link referral buttons directly to their approved destination URLs; do not insert Bitly or another URL shortener between AI Pays You and the destination.
- Show all four approved platforms for every expertise option.
- Treat the four referral platform buttons as Step 1 of the user workflow: choose a platform and view positions.
- Give each platform button its own randomized count from 1 to 20, displayed on that button as `Up to X positions`; all four counts must be different within the same result view, and 1 must use the singular `position`.
- Label all position counts as indicative estimates rather than live or guaranteed inventory; availability and eligibility are confirmed on each platform.
- Keep the workflow sequence explicit and non-duplicative: Step 1 is the platform choice, Step 2 is profile/application setup, and Step 3 is completing accepted work and receiving payment under the platform's terms.
- Preserve `CNAME` with `aipaysyouin30days.com` unless the custom domain is intentionally changed.

## Lessons From Past Mistakes

- GitHub is the source of truth for guardrails. Do not keep local project-folder guardrail copies.
- If adding project rules or context, update this GitHub `GUARDRAILS.md` file.
- Do not assume the local folder is a Git checkout; this project may need direct GitHub connector updates.
- If GitHub Pages changes are made, verify the repository readback after publishing.
- Avoid hidden legal footers. Company attribution must be visible, not gated behind funnel state.
- Footer/legal attribution copy is protected content. Do not change it as part of layout, CSS, cache-busting, or unrelated website edits.
- Prefer entity-safe HTML for symbols in source, such as `&copy;`, when the visible page should show the copyright symbol.
- Be careful when copying large CSS files to GitHub; verify selectors after update to catch typos.
- For CSS/layout changes, bump query-string asset versions in `index.html` so the live site does not keep stale cached CSS.
- For layout changes, check at least laptop, desktop, tablet, and mobile breakpoints before publishing when browser tooling is available.
- Do not leave obsolete single-platform referral CTAs in the funnel when the approved multi-platform opportunity panel is present.
- Resolve and verify referral destinations before publishing direct links. If a legacy redirect points to a retired route, use the verified current official route while preserving its referral code.
- Do not show one aggregate position count for multiple referral platforms; each platform button must carry its own indicative count.
- Do not duplicate Step 1 in a second screen after the visitor has already been shown the referral platform choices.
- Do not add a generic `Continue` CTA after the referral-platform choices when it distracts from opening a matched platform.
- Keep conversion copy short: state the action, reduce uncertainty, and avoid repeating the same instruction in multiple sections.
- For domain setup, distinguish DNS propagation from wrong records. Check actual DNS records before changing things repeatedly.
- For Namecheap and GitHub Pages, use GitHub Pages A records for `@` and a `www` CNAME to `CEOFOUNDER.github.io`.
- HTTPS may take time after DNS works. Do not move to Cloudflare unless GitHub HTTPS remains blocked or the user explicitly asks.

## Before Making Any Website Change

1. Fetch this GitHub guardrails file first.
2. Check whether the change strengthens the domain checker funnel.
3. Check whether it improves trust, clarity, or conversion.
4. Check compact/mobile behavior.
5. Check that the copy does not overpromise.
6. Check that GitHub Pages static hosting still works.
7. Check whether this file needs updating because of the change.
8. If the change affects domain, footer, hosting, legal identity, CSS, or responsive layout, verify the live site and GitHub file readback.

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
- Publish required website changes to GitHub.
- Verify GitHub readback for changed files after publishing.
- Summarize what changed and what was intentionally left alone.

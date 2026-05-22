# AI Pays You

Static GitHub Pages landing page for converting domain experts into a paid AI project onboarding funnel.

## What is included

- Mobile-first landing page with the headline `Get AI to pay you 30 days from now.`
- Visitor-specific 30-day countdown using browser `localStorage`
- Seven-step visual funnel
- Professional domain dropdown
- Affiliate links wired to the configured project marketplace URL
- Browser-side candidate capture
- Local CRM dashboard at `admin.html`
- CSV export for candidate follow-up

## CRM note

The current CRM is an MVP that stores records in the visitor/admin browser. GitHub Pages cannot securely write
private candidate records to the repository by itself. For production, replace the `writeCandidates` function in
`app.js` with a real backend target such as GitHub Issues via a serverless function, Google Sheets, Airtable, Supabase,
or another CRM endpoint.

## Deploy on GitHub Pages

1. Create or open the repository for AI Pays You.
2. Add these files to the repository root.
3. In GitHub, open **Settings > Pages**.
4. Set the source to the main branch root.
5. Visit the published GitHub Pages URL.

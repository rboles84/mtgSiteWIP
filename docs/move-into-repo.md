# Move Into Repo

Copy these files into `C:\dev\mtgSiteWIP` and replace the existing versions there:

- `index.html`
- `shared.js`
- `README.md`
- `research.html` (only if you want the copied version here to remain in sync with the new shared session layer)
- `data/factions.json`
- `docs/data-contracts.md`
- `docs/manual-test-cases.md`
- `docs/supabase-profile-update.sql`
- `supabase/functions/guild-recruiter/index.ts`
- `supabase/functions/guild-recruiter/faction-context.ts`

Keep these existing repo files:

- `docs/workflow.md`
- `.github/ISSUE_TEMPLATE/task.yml`
- `.github/pull_request_template.md`

Delete these older automated-test artifacts from the repo for this phase:

- `package.json`
- `playwright.config.js`
- `tests/`
- `.github/workflows/test.yml`
- `docs/testing.md`

## Recommended copy order

1. Copy `data/factions.json`.
2. Copy `shared.js`.
3. Copy `index.html`.
4. Copy the `supabase/functions/guild-recruiter` files.
5. Copy the new docs.
6. Remove the automated-test files listed above.
7. Run the SQL in `docs/supabase-profile-update.sql`.
8. Redeploy the edge function.
9. Redeploy the static site.

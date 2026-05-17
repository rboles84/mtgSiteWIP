# Move Into Repo

Copy these files into `C:\dev\mtgSiteWIP` and replace the existing versions there:

- `index.html`
- `shared.js`
- `docs/reference/README.md`
- `maze/index.html`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/raw-factions/`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/supabase-profile-update.sql`
- `supabase/functions/guild-recruiter/index.ts`
- `supabase/functions/guild-recruiter/faction-context.ts`

Keep these existing repo files:

- `docs/reference/workflow.md`
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
2. Copy `data/raw-factions/`.
3. From `C:\dev\projectFiles\voxmana-tools`, run `npm run build:factions` to generate placement artifacts and the edge-function context.
4. Copy `shared.js`.
5. Copy `index.html`.
6. Copy the `supabase/functions/guild-recruiter` files.
7. Copy the new docs.
8. Remove the automated-test files listed above.
9. Run the SQL in `docs/supabase-profile-update.sql`.
10. Redeploy the edge function.
11. Redeploy the static site.

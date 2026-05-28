# Handoff: VM-088 Home Mana Lens Closeout

## Agent Name
Codex

## Task Requested
Implement the VM-088 closeout plan: wrap up the Home auto-cycling Mana Lens showcase against the canonical VM-149 registry, keep the tuned 4800ms cycle, strengthen harness checks, move the card to done, and preserve the existing uncommitted VM-149 work.

## Files Reviewed
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/handoffs/2026-05-20-2320-codex-vm093-identity-signal-three-layer-repair.md`
- `docs/handoffs/2026-05-26-2334-codex-vm148-canonical-homepage-cutover.md`
- `docs/handoffs/2026-05-27-0706-codex-vm149-identity-preview-registry.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `index.html`
- `assets/js/newindex2.js`
- `data/identity-layers.json`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-newindex2.mjs`
- `docs/reference/manual-test-cases.md`

## Files Changed
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-newindex2.mjs`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-088-home-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-0730-codex-vm088-home-mana-lens-closeout.md`

## What Changed
- Moved VM-088 from in-progress to done and updated the card around the canonical `/index.html` route and registry-backed identity preview data.
- Replaced the stale `1500ms` acceptance text with the tuned `4800ms` cycle timing.
- Strengthened frontend smoke checks for the Home Mana Lens registry contract: 20 preview-eligible identities, contiguous `preview_order`, no stale picker hooks, registry-gated initialization, reduced-motion guard, visibility pause, and reader hover/focus pause listeners.
- Strengthened the Home visual harness so the forced `boros` capture verifies White + Red + Boros overlay text, confirms reduced motion reports `Still`, and asserts no interval starts in reduced motion.
- Added a shortened-interval browser interaction check to confirm the cycle advances, pauses during reader hover, and resumes after leaving.
- Updated manual QA notes for the 4800ms cycle, reduced-motion still state, and pause/resume behavior.

## Why It Changed
VM-088 had lingered as an in-progress card after VM-090/VM-092/VM-093 repaired the desired passive Home signal and VM-148 retargeted Home to `/index.html`. VM-149 removed the remaining blocker by moving preview identity ownership into `data/identity-layers.json`, so VM-088 could close as a reconciliation and coverage pass rather than a redesign.

## Decisions Made
- Kept `heroManaCycleMs = 4800` as the tuned default.
- Treated VM-088 as a closeout on top of VM-149, not a separate identity data migration.
- Kept the existing `assets/js/newindex2.js` / `assets/css/newindex2.css` route-local asset names.
- Did not add public runtime APIs for testing; checks use existing DOM hooks and harness-only browser instrumentation.

## Risks / Uncertainties
- The worktree still contains the broader uncommitted VM-149 registry payload. This closeout preserved that state and did not split or revert it.
- The Home visual script names still include `newindex2` even though the route target is canonical `/index.html`; this remains a later asset-name cleanup opportunity.
- The visual harness relies on local Edge/Chrome availability, as before.

## Tests Run
- `node --check assets/js/newindex2.js`
- `node --check scripts/frontend-smoke.mjs`
- `node --check scripts/visual-regression-newindex2.mjs`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:visual:newindex2`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not Touched
- No Maze parser/search behavior.
- No Scryfall query behavior.
- No placement scoring algorithm or placement model semantics.
- No precon source, generated precon catalog, schemas, ranking, or recommendation logic.
- No Supabase schema, edge function, or saved-profile contract.
- No shard, wedge, four-color, five-color, colorless, or family-style runtime expansion.
- No Home visual redesign or route asset rename.

## Follow-Up Recommendations
- Commit VM-149 and VM-088 together or otherwise keep their ordering explicit, because VM-088 closeout assumes the VM-149 canonical registry payload is present.
- Handle `newindex2` asset-name cleanup separately if the project wants route-current file names.
- Finish dossier identity routing against the registry alias index before adding more alias families.

## Next Suggested Agent
Release / Git steward for staging, commit, and push of the combined VM-149 + VM-088 payload.

## Related Kanban Card, Docs, Or Plans
- `docs/kanban/done/VM-088-home-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/backlog/VM-149-identity-preview-registry-canonicalization.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/data-contracts.md`

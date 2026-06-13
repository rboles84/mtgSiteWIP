# 2026-06-03 14:06 - Codex - VM-275 Glint Identity-Hero Background

## Agent Name

Codex

## Task Requested

Add the user-provided `assets/img/identity-hero/glint.webp` asset to the Glint dossier page using the same identity-hero background system already used by the other dossier-backed identities.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/2026-06-03-1222-codex-vm274-yore-identity-hero-background.md`
- `docs/handoffs/2026-06-03-1240-codex-vm251-glint-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/kanban/done/VM-274-yore-identity-hero-background-dossier-hookup.md`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `assets/img/identity-hero/glint.webp`

## Files Changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-275-glint-identity-hero-background-dossier-hookup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-1406-codex-vm275-glint-identity-hero-background.md`

## What Changed

- Added `GLINT: "glint"` to the shared identity-hero slug lookup.
- Restored the existing live `YORE: "yore"` dossier hero mapping in the same helper so the focused hero coverage matches the current live four-color set and the shared follow-up test can pass.
- Updated the Archscry dossier follow-up test coverage to treat Glint as the 32nd asset-backed live dossier identity.
- Added an explicit Glint layer-order assertion confirming overlay, `glint.webp`, and the existing Glint banner compose together.
- Added VM-275 Kanban and handoff bookkeeping.

## Why It Changed

VM-251 promoted Glint live but intentionally left it outside the initial hero-image rollout. The user added `assets/img/identity-hero/glint.webp`; VM-275 connects that asset to the existing dossier hero helper without creating new route, alias, placement, generated, or canon behavior.

The current shared helper also lacked the already-expected `YORE` mapping from VM-274, so this pass restored that same live helper entry rather than leaving the focused dossier hero test suite in a broken state.

## Decisions Made

- Reused the existing explicit faction-key hero slug map rather than deriving an image from `UBRG`.
- Kept `UBRG`, `COLORLESS`, `WUBRG`, and future four-color lanes unmapped in the hero helper.
- Left generated data and Glint raw/research/architecture files untouched.

## Risks / Uncertainties

- The worktree remains dirty with many unrelated changes from prior Yore/Glint/Dune work; this pass did not attempt cleanup.
- `assets/img/identity-hero/glint.webp` was already present as a user-provided untracked asset and was referenced but not modified.

## Tests Run

- `node --check assets\js\index.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run test:presentation-snapshots`

## Not Touched

- `data/raw-factions/glint/**`
- `docs/research/glint/**`
- `docs/architecture/colors/glint/**`
- Generated data files
- Schemas
- Maze files
- Route CSS/JS
- Home preview membership
- Supabase runtime
- Unrelated Yore, Dune, Ink, Witch, and dirty worktree files

## Follow-Up Recommendations

- If future four-color identities are promoted and receive image assets, add them through the same explicit helper map and focused dossier coverage.
- Keep `UBRG` and color-code permutations metadata-query-only; do not derive public hero paths from color-code aliases.

## Next Suggested Agent

Test Strategist for any future broader visual QA pass, otherwise no follow-up needed for VM-275.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-275-glint-identity-hero-background-dossier-hookup.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/kanban/done/VM-274-yore-identity-hero-background-dossier-hookup.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/2026-06-03-1222-codex-vm274-yore-identity-hero-background.md`

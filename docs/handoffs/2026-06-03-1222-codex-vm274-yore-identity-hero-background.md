# 2026-06-03 12:22 - Codex - VM-274 Yore Identity-Hero Background

## Agent Name

Codex

## Task Requested

Add the user-provided `assets/img/identity-hero/yore.webp` asset to the Yore dossier page using the same identity-hero background system already used by the other dossier-backed identities.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/kanban/done/VM-273-yore-live-placement-copy-polish-manual-qa-repair.md`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `assets/img/identity-hero/yore.webp`

## Files Changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-274-yore-identity-hero-background-dossier-hookup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-1222-codex-vm274-yore-identity-hero-background.md`

## What Changed

- Added `YORE: "yore"` to the shared identity-hero slug lookup.
- Updated the Archscry dossier follow-up test coverage to treat Yore as the 31st asset-backed live dossier identity.
- Added an explicit Yore layer-order assertion confirming overlay, `yore.webp`, and the existing Yore banner compose together.
- Added VM-274 Kanban and handoff bookkeeping.

## Why It Changed

VM-271 intentionally excluded four-color identities because they were not live. VM-245 later promoted Yore, and the user added `assets/img/identity-hero/yore.webp`; VM-274 connects that asset to the existing dossier hero helper without creating new route, alias, placement, or canon behavior.

## Decisions Made

- Reused the existing explicit faction-key hero slug map rather than deriving an image from `WUBR`.
- Kept `WUBR`, `COLORLESS`, `WUBRG`, and future four-color lanes unmapped in the hero helper.
- Left generated data and Yore raw/research/architecture files untouched.

## Risks / Uncertainties

- The worktree remains dirty with many unrelated changes from prior Yore/Glint/Dune work; this pass did not attempt cleanup.
- `assets/img/identity-hero/yore.webp` was already present as a user-provided untracked asset and was referenced but not modified.

## Tests Run

- `node --check assets\js\index.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run test:presentation-snapshots`

## Not Touched

- `data/raw-factions/yore/**`
- `docs/research/yore/**`
- `docs/architecture/colors/yore/**`
- Generated data files
- Schemas
- Maze files
- Route CSS/JS
- Home preview membership
- Supabase runtime
- Unrelated Glint, Dune, Ink, Witch, and dirty worktree files

## Follow-Up Recommendations

- If future four-color identities are promoted and receive image assets, add them through the same explicit helper map and focused dossier coverage.
- Keep `WUBR` and color-code permutations metadata-query-only; do not derive public hero paths from color-code aliases.

## Next Suggested Agent

Test Strategist for any future broader visual QA pass, otherwise no follow-up needed for VM-274.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-274-yore-identity-hero-background-dossier-hookup.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`

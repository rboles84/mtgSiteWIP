# 2026-06-03 22:31 - Codex - VM-278 Dune Identity-Hero Background

## Agent Name

Codex

## Task Requested

Add the user-provided `assets/img/identity-hero/dune.webp` asset to the Dune dossier page using the same identity-hero background system already used by the other dossier-backed identities.

## Pre-Flight Summary

Recent related work:

- VM-271 rolled out the shared identity-hero background system to the then-live dossier-backed identities.
- VM-274 hooked `yore.webp` into that shared helper after Yore went live.
- VM-275 hooked `glint.webp` into that same helper after Glint went live.
- VM-257 promoted Dune live as `DUNE` but explicitly left it outside the current hero rollout.

Current known risks:

- The Dune asset hookup must not widen into raw, generated, route, preview, placement, or alias work.
- `DUNE` is live, but `BRGW`, `WBRG`, and permutations must remain metadata-query-only and must not become hero-path slugs.
- The worktree remains broadly dirty with unrelated runtime, docs, and research changes.

Relevant decisions already made:

- Four-color hero assets are added through the explicit `faction.key -> slug` helper, not derived from technical color codes.
- Yore and Glint already use this targeted follow-up pattern after live promotion.
- Dune route, preview, raw, and hero-rollout boundaries from VM-257 should remain intact except for the dossier background hookup requested here.

Files recently changed:

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- generated Dune promotion outputs
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

What should not be touched:

- `data/raw-factions/dune/**`
- `docs/research/dune/**`
- `docs/architecture/colors/dune/**`
- generated data files
- schemas
- Maze files
- route CSS/JS
- Home preview membership
- Supabase runtime
- unrelated Yore, Glint, Ink, Witch, and dirty worktree files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/2026-06-03-1222-codex-vm274-yore-identity-hero-background.md`
- `docs/handoffs/2026-06-03-1406-codex-vm275-glint-identity-hero-background.md`
- `docs/handoffs/2026-06-03-2137-codex-vm257-dune-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/kanban/done/VM-274-yore-identity-hero-background-dossier-hookup.md`
- `docs/kanban/done/VM-275-glint-identity-hero-background-dossier-hookup.md`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `assets/img/identity-hero/dune.webp`

## Files Changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-278-dune-identity-hero-background-dossier-hookup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2231-codex-vm278-dune-identity-hero-background.md`

## What Changed

- Added `DUNE: "dune"` to the shared identity-hero slug lookup in `assets/js/index.js`.
- Updated the Archscry dossier follow-up test coverage to treat Dune as the 33rd asset-backed live dossier identity.
- Removed Dune from the focused hero exclusion list now that its asset exists and is intentionally wired.
- Added an explicit Dune layer-order assertion confirming overlay, `dune.webp`, and the existing Dune banner compose together.
- Added VM-278 Kanban and handoff bookkeeping.

## Why It Changed

VM-257 promoted Dune live but intentionally left it outside the current identity-hero rollout. The user then provided `assets/img/identity-hero/dune.webp`; VM-278 connects that asset to the existing dossier hero helper without creating new route, alias, placement, generated, or canon behavior.

## Decisions Made

- Reused the existing explicit faction-key hero slug map rather than deriving an image from `BRGW`.
- Kept `BRGW`, `WBRG`, `COLORLESS`, `WUBRG`, and future four-color lanes (`INK`, `WITCH`) unmapped as public hero slugs.
- Left generated data and Dune raw/research/architecture files untouched.

## Risks / Uncertainties

- The worktree remains dirty with many unrelated changes from prior Yore/Glint/Dune work; this pass did not attempt cleanup.
- `assets/img/identity-hero/dune.webp` was already present as a user-provided untracked asset and was referenced but not modified.

## Tests Run

- `node --check assets\js\index.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run test:presentation-snapshots`
- scoped `git diff --check` on the touched VM-278 files

## Not Touched

- `data/raw-factions/dune/**`
- `docs/research/dune/**`
- `docs/architecture/colors/dune/**`
- generated data files
- schemas
- Maze files
- route CSS/JS
- Home preview membership
- Supabase runtime
- unrelated Yore, Glint, Ink, Witch, and dirty worktree files

## Follow-Up Recommendations

- If future four-color identities are promoted and receive image assets, add them through the same explicit helper map and focused dossier coverage.
- Keep `BRGW` and color-code permutations metadata-query-only; do not derive public hero paths from color-code aliases.

## Next Suggested Agent

Test Strategist for any future broader visual QA pass, otherwise no follow-up needed for VM-278.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-278-dune-identity-hero-background-dossier-hookup.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/kanban/done/VM-274-yore-identity-hero-background-dossier-hookup.md`
- `docs/kanban/done/VM-275-glint-identity-hero-background-dossier-hookup.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/2026-06-03-1222-codex-vm274-yore-identity-hero-background.md`
- `docs/handoffs/2026-06-03-1406-codex-vm275-glint-identity-hero-background.md`
- `docs/handoffs/2026-06-03-2137-codex-vm257-dune-controlled-runtime-promotion.md`

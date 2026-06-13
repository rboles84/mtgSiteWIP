# 2026-06-05 07:36 - Codex - VM-293 Witch Identity-Hero Background

## Agent name

Codex

## Task requested

Hook the user-provided `assets/img/identity-hero/witch.webp` asset into the Archscry dossier page like the existing identity hero backgrounds.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-1222-codex-vm274-yore-identity-hero-background.md`
- `docs/handoffs/2026-06-03-1406-codex-vm275-glint-identity-hero-background.md`
- `docs/handoffs/2026-06-03-2231-codex-vm278-dune-identity-hero-background.md`
- `docs/handoffs/2026-06-04-2354-codex-vm269-witch-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `assets/img/identity-hero/`

## Files changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-293-witch-identity-hero-background-dossier-hookup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-05-0736-codex-vm293-witch-identity-hero-background.md`

## What changed

- Added `WITCH: "witch"` to the explicit identity hero slug map.
- Updated Archscry dossier follow-up coverage so Witch is one of the 34 asset-backed dossier hero identities.
- Removed Witch from the intentional hero-exclusion list while preserving `COLORLESS`, `WUBRG`, and `INK` as excluded.
- Added a Witch layer-order assertion proving the dossier hero composes overlay, `witch.webp`, and the existing Witch banner.
- Created and completed VM-293 bookkeeping.

## Why it changed

Witch was promoted live in VM-269, but that promotion intentionally ignored the existing untracked `witch.webp` hero asset. This task makes the live Witch dossier match the established Yore, Glint, and Dune identity-hero behavior without changing routes, aliases, Home preview, Maze, generated data, raw packet data, or the asset bytes.

## Decisions made

- Reused the established explicit `faction.key -> slug` mapping rather than deriving hero assets from `GWUB`, `WUBG`, `Growth`, or other technical/permutation labels.
- Kept runtime/public hero labeling on `WITCH` / `Witch`; no public color-code or Growth alias was added.
- Treated the existing `witch.webp` file as supplied asset input only and did not modify it.

## Risks / uncertainties

- The worktree remains broadly dirty with unrelated modified and untracked files.
- `node research\archscry-dossier-followup-tests.js` currently stops before the hero assertions on an unrelated `JESKAI` flavor-index assertion: `expected JESKAI snippet text to come from committed Scryfall indexes`.
- `assets/img/identity-hero/witch.webp` is still untracked; this task wires to it but does not stage or otherwise manage git state.

## Tests run

- `node --check assets\js\index.js` - pass
- `node --check research\archscry-dossier-followup-tests.js` - pass
- `node --input-type=module -e "<focused Witch identity hero assertion>"` - pass
- `npm.cmd run test:presentation-snapshots` - pass
- `node research\archscry-dossier-followup-tests.js` - fail before hero checks on unrelated `JESKAI` flavor-index assertion
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- assets/js/index.js research/archscry-dossier-followup-tests.js docs/kanban/board.md docs/kanban/in-progress/VM-293-witch-identity-hero-background-dossier-hookup.md` - pass with line-ending warnings only

## Not touched

- Witch raw JSON
- Witch research packet docs
- Witch architecture docs
- Generated faction, placement, and flavor artifacts
- Maze behavior
- Home preview membership
- Routes and aliases
- Supabase
- Schemas
- `assets/img/identity-hero/witch.webp` bytes

## Follow-up recommendations

- Resolve the unrelated JESKAI flavor-index assertion so the full dossier follow-up suite can reach and enforce the new Witch hero assertions directly.
- Ensure `assets/img/identity-hero/witch.webp` is included in the intended git artifact flow if this branch is prepared for commit.

## Next suggested agent

Test Strategist or Implementation Agent for the unrelated JESKAI flavor-index follow-up if the broader dossier suite needs to be restored.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-293-witch-identity-hero-background-dossier-hookup.md`
- `docs/handoffs/2026-06-04-2354-codex-vm269-witch-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-2231-codex-vm278-dune-identity-hero-background.md`
- `docs/handoffs/2026-06-03-1406-codex-vm275-glint-identity-hero-background.md`
- `docs/handoffs/2026-06-03-1222-codex-vm274-yore-identity-hero-background.md`

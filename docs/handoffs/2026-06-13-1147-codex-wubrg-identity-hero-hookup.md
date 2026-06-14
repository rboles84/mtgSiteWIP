# 2026-06-13 11:47 - Codex - WUBRG Identity Hero Hookup

## Agent Name

Codex

## Task Requested

Add the user-provided `wubrg.webp` from `assets/img/identity-hero/` to WUBRG placement/dossier hero usage.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1119-codex-wubrg-identity-hero-prompt.md`
- `docs/handoffs/2026-06-13-0912-codex-wubrg-source-bound-deepening.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`
- `docs/kanban/board.md`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `assets/img/identity-hero/wubrg.webp`

## Files Changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-373-wubrg-identity-hero-background-hookup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1147-codex-wubrg-identity-hero-hookup.md`

## What Changed

- Added `WUBRG: "wubrg"` to the explicit identity hero slug map.
- Updated the dossier follow-up hero coverage expectations from 35 to 36 asset-backed entries.
- Removed WUBRG from the hero-exclusion set while preserving `INK` as excluded.
- Added VM-373 bookkeeping and closed it as done.

## Why It Changed

The user explicitly approved using the newly present `assets/img/identity-hero/wubrg.webp` asset. Prior WUBRG work intentionally blocked hero rollout until explicit product approval; this pass performs only the approved dossier hero hookup.

## Decisions Made

- Use the same explicit `faction.key -> slug` helper as the other identity heroes.
- Treat WUBRG hero usage as dossier/placement presentation only, not Home preview, public route, directory, raw data, generated data, source evidence, or Commander recommendation expansion.
- Preserve `INK` as the only current live placement key outside the identity hero rollout.
- Do not modify the `wubrg.webp` asset bytes.

## Risks / Uncertainties

- Full `research/archscry-dossier-followup-tests.js` currently stops before hero assertions on an unrelated in-progress VM-372 Colorless support-only richness assertion.
- The worktree was broadly dirty before this task; unrelated changes were preserved.
- Browser visual QA was not run in this pass.

## Tests Run

- `node --check assets/js/index.js` - passed.
- `node --check research/archscry-dossier-followup-tests.js` - passed.
- Focused WUBRG hero mapping probe - passed.
- `git diff --check -- assets/js/index.js research/archscry-dossier-followup-tests.js docs/kanban/board.md docs/kanban/in-progress/VM-373-wubrg-identity-hero-background-hookup.md` - passed with CRLF warnings only before card closeout.
- `node research/archscry-dossier-followup-tests.js` - blocked before hero assertions by unrelated VM-372 Colorless expectation: expected `support_only_controlled_richness`, actual `undefined`.

## Not Touched

- No `assets/img/identity-hero/wubrg.webp` byte edits, conversion, optimization, recrop, or regeneration.
- No WUBRG raw JSON/content changes.
- No generated data rebuild.
- No Home preview, public route, directory, alias, schema, API, Maze, Commander support, Supabase, or `INK` hero rollout changes.
- No staging or commits.

## Follow-Up Recommendations

- Run browser visual QA for a WUBRG dossier once the broader VM-372 in-progress assertions are reconciled.
- Keep any Home/public WUBRG hero rollout behind a separate explicit product card.

## Next Suggested Agent

Frontend implementation agent for visual QA if requested.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-373-wubrg-identity-hero-background-hookup.md`
- `docs/kanban/done/VM-371-wubrg-identity-hero-generation-prompt.md`
- `docs/kanban/done/VM-367-wubrg-gold-layer1-layer2.md`
- `docs/kanban/done/VM-368-wubrg-commander-support-verification.md`
- `docs/kanban/done/VM-369-colorless-wubrg-crucible-readiness.md`
- `docs/kanban/done/VM-370-wubrg-claim-backed-lore-depth.md`

# 2026-05-29 18:41 - Codex - VM-161 Mana Base Basics Placeholder Suppression

## Agent Name

Codex

## Task Requested

Implement VM-161 to stop generic basic-land guidance terms such as `basics` from rendering as empty card placeholders in Archscry Mana Base Starting Map land tiers, especially for the Bant adjacent dossier exposed after VM-160.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-26-0021-codex-vm135-archscry-card-voices-identity-story.md`
- `docs/kanban/board.md`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `data/identity-layers.json`
- `data/factions.json`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `assets/js/commander-dossier.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-161-mana-base-basics-placeholder-suppression.md`
- `docs/handoffs/2026-05-29-1841-codex-vm161-mana-base-basics-placeholder-suppression.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Replaced the singular-basic-only suppression set with a `BASIC_LAND_PLACEHOLDERS` set that also suppresses `basic`, `basics`, `basic land`, and `basic lands`.
- Kept the source Bant `budget_line` intact; normalization now filters non-card guidance terms before rendering.
- Added Bant regression coverage proving Budget keeps `Bant Panorama`, `Path of Ancestry`, and `Evolving Wilds` while suppressing generic basic placeholders across all land tiers.
- Added manual QA guidance for Mana Base Starting Map so Basics guidance remains copy-only and no tier shows a `basics` placeholder card.
- Created and closed the VM-161 Kanban card.

## Why It Changed

Manual testing of a White primary / Bant adjacent dossier showed `basics` from Bant's budget line being treated as a Scryfall named-card slot. That produced an empty text card in the Budget tier. Basic-land guidance belongs in the Basics tab copy, not in card-art lanes.

## Decisions Made

- Suppress generic basic placeholders in shared dossier normalization rather than editing Bant source data.
- Allow shorter deduped rows, consistent with VM-135.
- Do not add replacement/fallback cards for suppressed placeholder terms.

## Risks / Uncertainties

- Some source land lines may still include other prose-like non-card terms in the future; this pass only covers known basic-placeholder terms.
- Browser visual verification should still be done against the exact White primary / Bant adjacent path before release, although the generated land tier now resolves to real cards only.

## Tests Run

- `node --check assets/js/commander-dossier.js` - passed.
- Bant data check through `buildCommanderLandRecommendations` - Budget resolves to `["Bant Panorama","Path of Ancestry","Evolving Wilds"]`.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd run test:placement` - passed, `21 factions, 21 golden paths`.
- `npm.cmd test` - passed.
- `git diff --check` - passed with line-ending warnings only.

## Not Touched

- Placement scoring.
- Bant identity/source/generated faction data.
- Generated faction artifacts.
- Route CSS/JS.
- Maze controller behavior.
- Home preview behavior.
- Supabase behavior.

## Follow-Up Recommendations

- During manual QA, reproduce White primary / Bant adjacent and verify the Budget tab no longer renders a `basics` tile.
- Consider a future broader source-line sanitizer only if other prose-like terms appear in land lanes.

## Next Suggested Agent

Test Strategist for browser/manual verification of the White primary / Bant adjacent dossier path.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-161-mana-base-basics-placeholder-suppression.md`
- `docs/kanban/done/VM-160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/reference/manual-test-cases.md`

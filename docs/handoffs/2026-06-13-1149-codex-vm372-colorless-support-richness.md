# 2026-06-13 11:49 - Codex - VM-372 Colorless Support-Only Controlled Richness

## Agent Name

Codex

## Task Requested

Proceed with a new card number because VM-371 was occupied, then expose Colorless Commander Compass, deck links, and research links as support-only controlled richness while preserving all blocked public surfaces.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-372-colorless-support-only-controlled-richness.md`
- `docs/architecture/colors/colorless/product-decision-gate.md`
- `docs/reference/colorless-source-readiness-matrix.md`
- `docs/research/colorless/colorless_Commander_ColorlessStaples_ManaStaples.txt`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Recent handoffs for VM-362, VM-368, VM-369, VM-370, VM-371, and VM-373
- `docs/kanban/board.md`
- Related Kanban cards for VM-362 and VM-368 through VM-373
- `docs/architecture/colors/colorless/product-decision-gate.md`
- `docs/reference/colorless-source-readiness-matrix.md`
- `docs/research/colorless/colorless_Commander_ColorlessStaples_ManaStaples.txt`
- `data/raw-factions/colorless/colorless.profile.json`
- `data/raw-factions/colorless/colorless.changelog.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `data/raw-factions/colorless/colorless.profile.json`
- `data/raw-factions/colorless/colorless.changelog.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `docs/architecture/colors/colorless/product-decision-gate.md`
- `docs/reference/colorless-source-readiness-matrix.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-372-colorless-support-only-controlled-richness.md`
- `docs/handoffs/2026-06-13-1149-codex-vm372-colorless-support-richness.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Created VM-372 after confirming VM-371 was occupied.
- Added Colorless `commander_compass` with exactly two support-only rows: `Zhulodok, Void Gorger` and `Omarthis, Ghostfire Initiate`.
- Added exactly one Colorless `deck_links` row: `Eldrazi Unbound (Precon)`.
- Added Colorless `research_links` for local, official, and exact source-verification context.
- Removed the builder's unconditional deletion of Colorless Commander Compass.
- Added a narrow Colorless support-only exception to Commander Compass candidate validation so `commander_legal: null` and empty color identity rows can render only for `COLORLESS`.
- Changed MTGDecks link behavior so `mtgd: null` suppresses derived browse links, omitted `mtgd` preserves legacy derivation, and string `mtgd` uses the exact source.
- Removed the hardcoded Colorless dossier fallback rows now that source-driven rows exist.
- Updated tests to assert support-only row structure, null suppression, unchanged Home/alias/route behavior, and strict Maze behavior.
- Updated governance docs to approve only VM-372's narrow support-only fields while keeping broader surfaces blocked.
- Moved VM-372 to Done.

## Why It Changed

VM-372 intentionally permits controlled Colorless support richness without turning Colorless into a public route, Home preview identity, directory target, broad deck recommendation surface, or legality/popularity/metagame/price claim surface.

## Decisions Made

- `commander_legal: null` remains deliberate policy, not a missing value.
- Scryfall exact-name `id:c` checks are verification input only for returned names and empty `color_identity`.
- The local staples file is review context only and does not promote broad staples, mana rocks, or best-card framing.
- `deck_links[0].mtgd: null` explicitly suppresses MTGDecks derivation for Colorless.
- `deck_links[0].edhrec: null` keeps EDHREC browse links suppressed.
- Research links are source-context only, not public directory links.

## Current Source Checks

- Wizards Commander Masters decklists page showed `Eldrazi Unbound (Colorless)`, `Zhulodok, Void Gorger`, `Omarthis, Ghostfire Initiate`, and `15 Wastes`.
- Exact Scryfall API checks were run for `!"Zhulodok, Void Gorger" id:c` and `!"Omarthis, Ghostfire Initiate" id:c`; each returned the expected card name with `color_identity: []`.

## Risks / Uncertainties

- The worktree was already broadly dirty and remained so. VM-372 preserved unrelated changes.
- `npm.cmd run dossier:audit` still reports 113 warnings and 0 failures; the warnings are existing advisory-style content gap/language bleed warnings, not VM-372 failures.
- Generated comparison from the VM-372 baseline showed only `COLORLESS` changed in `data/factions.json` and no placement faction keys changed in `data/placement-model.json`.

## Tests Run

- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- JSON parse check for `data/raw-factions/colorless/colorless.profile.json` and `data/raw-factions/colorless/colorless.changelog.json`
- `npm.cmd run build:factions`
- `npm.cmd run validate:source-generated -- --targets=COLORLESS`
- `npm.cmd run test:placement`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- `npm.cmd run test:parser`
- Targeted VM-372 acceptance probe for Colorless Compass, deck links, research links, Home preview, aliases, routing, Maze queries, raw enrichment, generated faction diff scope, and placement diff scope

## Not Touched

- No staging or commits.
- No Home preview expansion.
- No public route.
- No aliases beyond `COLORLESS`.
- No directory links.
- No hero asset work.
- No schema/API expansion.
- No broad Colorless recommendation copy.
- No EDHREC or MTGDecks Colorless browse links.
- No legality, popularity, metagame, price, or recommendation-quality assertions.
- No broad content from `docs/research/colorless/colorless_Commander_ColorlessStaples_ManaStaples.txt` was promoted.

## Follow-Up Recommendations

- Keep any future Colorless Commander expansion behind a new card and source ledger entry.
- If Colorless legality assertions are ever approved, add a separate governance card and tests that distinguish legality proof from support-only row existence.
- Keep generated diff review baseline-based when the worktree is already dirty.

## Next Suggested Agent

Test Strategist or Documentation Steward for any future Colorless expansion gate; JSON Cartographer if new source IDs or claim IDs are needed.

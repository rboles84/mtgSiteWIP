# VM-553 - 37-Identity Player Relationship Guide

ID: VM-553

Status: Done

Owner request: Relate a prospective player to all 37 Vox Mana identities using `data/factions.json`, each identity's `identity.md` and `metaphysics.md`, the supplied *Vox Mana: The Magic Player Atlas*, and five supplied Mark Rosewater color-pie essays.

## Verdict

Proceed with a documentation-only interpretive guide.

## Smallest Safe Version

- One compact entry for each of the 37 active identities.
- Each entry names the identity's center, affirmative fit, nearest relationships, pushback, and outright rejection boundary.
- Add a lightweight comparison method for describing a person without inventing a score, probability, or diagnosis.

## Review Level

Focused documentation review against the certified identity records and supplied source materials.

## Stop Condition

Stop when all 37 identities are represented exactly once, color/setting expressions remain distinct, and the guide contains no placement-model, runtime, generated-data, or recovered-semantic changes.

## Authority And Inputs

- `data/factions.json` as generated current-display evidence, read only.
- `docs/architecture/colors/*/identity.md` and `metaphysics.md` as the certified identity architecture, read only.
- `C:\Users\obake\Downloads\Vox_Mana_The_Magic_Player_Atlas.md` as the supplied layered-player framework and supported guild/college crosswalk.
- Supplied Mark Rosewater PDFs: *Hate Is Enough*, *IM Legend*, *Pie Fights*, *Thank You for Being a Friend*, and *The Value of Pie*.
- VM-444 current 37-identity count authority and VM-551 placement trust/interpretation boundaries.

## In Scope

- `docs/reference/37-identity-player-relationship-guide.md`
- This Kanban card, `docs/kanban/board.md`, and the required indexed handoff.

## Out Of Scope

- Placement questions, signals, weights, scoring, confidence, adjacency behavior, or player-validation design.
- Changes to `data/factions.json`, `data/identity-layers.json`, raw faction records, identity/metaphysics sources, generated artifacts, runtime code, or CRIT-001 records.
- Claims that colors diagnose personality, skill, morality, power level, or deck behavior.

## Acceptance Checks

- Exactly 37 identity entries, matching the active `data/factions.json` keys.
- Every entry includes center, fit, relationships, pushback, and rejection.
- Same-color guild/college pairs remain distinguishable.
- Mono, shard, wedge, four-color, Colorless, and WUBRG entries use the certified repo distinctions rather than extrapolating from the 15-identity Atlas section alone.
- Sources and limitations are explicit.
- No unrelated dirty-tree files are modified.

## Completion

- Added `docs/reference/37-identity-player-relationship-guide.md` with exactly 37 numbered entries.
- Every identity includes one affirmative resonance, nearest connections, productive pushback, and a false-fit rejection boundary.
- Preserved guild/college same-color distinctions, lead-color shard/wedge logic, missing-color four-color logic, and separate Colorless/WUBRG endpoints.
- Kept the result interpretive and non-scoring; no Archscry, runtime, source, generated-data, or CRIT-001 semantic record changed.

## Tests Run

- Exact 37-name parity against `data/factions.json`: passed; sequence 1-37, no missing or extra identities.
- Relationship-label counts: 37 `Resonates`, 37 `Connects`, 37 `Pushes back`, and 37 `Rejects` entries.
- Paired-doc inventory: all 36 identities expected under `docs/architecture/colors/*/` have both `identity.md` and `metaphysics.md`; WUBRG authority exception documented.
- `git diff --check`: passed; existing board line-ending warning only.
- Rendered and visually reviewed the complete single-page capture for each of the five supplied source PDFs, then removed temporary render files.
- `npm test` and `npm run test:parser` not run because no runtime, parser, source-data, or generated artifact changed.

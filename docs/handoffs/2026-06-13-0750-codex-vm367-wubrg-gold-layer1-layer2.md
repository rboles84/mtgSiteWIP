# 2026-06-13 07:50 - Codex - VM-367 WUBRG Gold Layer 1 And Layer 2

## Agent Name

Codex

## Task Requested

Add Five-Color / `WUBRG` as a gold-standard Layer 1 and Layer 2 identity in one source-gated pass, starting with local WUBRG lore research inspection and preserving no-overwrite/no-generated-evidence boundaries. Ensure Maze dossier links work for plain reading and Operator's Hand, include support-only Commander/deck/search links, and avoid Home/public-route/Colorless-WUBRG Crucible expansion.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent related handoffs for Colorless, four-color, source-generated guardrails, and Maze query repair.
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-367-wubrg-gold-layer1-layer2.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/architecture/identity-layer1-coverage-and-wubrg-plan.md`
- Existing files under `docs/research/wubrg/`
- Runtime and generator paths for identity layers, raw factions, Archscry, Maze, Commander dossier, tests, and source/generated validation.

## Files Changed

- `docs/research/wubrg/README.md`
- `docs/research/wubrg/wubrg-existing-file-classification.md`
- `docs/research/wubrg/wubrg-reliability-audit.md`
- `docs/research/wubrg/wubrg-source-ledger.md`
- `docs/research/wubrg/wubrg-evidence-ledger.md`
- `docs/research/wubrg/wubrg-layer2-gold-findings.md`
- `docs/research/wubrg/wubrg-manual-fill.md`
- `data/raw-factions/wubrg/wubrg.sources.json`
- `data/raw-factions/wubrg/wubrg.claims.json`
- `data/raw-factions/wubrg/wubrg.profile.json`
- `data/raw-factions/wubrg/wubrg.placement.json`
- `data/raw-factions/wubrg/wubrg.changelog.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `research/research-init.js`
- `assets/js/maze-handoff.js`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `research/maze-search-tests.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- Generated: `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, `data/archscry-flavor-snippets.json`, `supabase/functions/guild-recruiter/faction-context.ts`
- Closeout docs: `docs/kanban/board.md`, `docs/kanban/done/VM-367-wubrg-gold-layer1-layer2.md`, `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a lore-first WUBRG research packet that classifies existing local WUBRG files, records reliability and source roles, captures official/current/support sources with access dates, and separates claim-bearing rows from shaping/discovery material.
- Added `data/raw-factions/wubrg/` with source-backed Layer 2 claims, support-only Commander rows, manual-fill deferrals, placement profile, and changelog.
- Added `WUBRG` to identity layers as `five_color`, placement eligible, preview ineligible, with `Five-Color` public label and suppressed directory links.
- Added WUBRG to the faction artifact builder, source/generated validator, Archscry flavor snippet selection, quick-reading registry/generated tests, and placement golden-path coverage.
- Added WUBRG exact Maze dossier paths:
  - `id=wubrg is:commander f:commander`
  - `id<=wubrg f:commander -is:commander -t:land (...)`
  - `id<=wubrg f:commander (ft:coalition OR ft:domain OR ft:spectrum OR ft:unite OR ft:world)`
- Added WUBRG Archscry/Maze handoff canonicalization so arbitrary WUBRG order normalizes to `wubrg`, shows `WUBRG` in the dossier hint, and uses `Five-Color` in readable copy.
- Added support-only links for local JSONL Commander rows, MTGDecks, Archidekt, exact Scryfall Commander search, grouped WUBRG cost/activation search, and broader five-symbol Oracle discovery search.

## Why It Changed

The project needed Five-Color / WUBRG promoted without repeating earlier source/generation contamination risks. The user required one gold-standard pass with local lore-first review, exact source roles, support-only Commander/deck handling, working Maze links, and no public/Home expansion.

## Decisions Made

- `WUBRG` is the technical/display code; `Five-Color` is the preferred public label.
- WUBRG is live for placement and dossier/Maze handoff, but not Home preview, public directory route, or hero asset rollout.
- Layer 2 readiness gates Layer 1 promotion; unsupported local essays remain shaping/discovery only.
- Broad Scryfall five-symbol Oracle query is retained as discovery/support only and requires manual verification per result.
- Draconic Domination and Painbow stay deferred support rows until official/current decklist agreement is captured.
- No `COLORLESS/WUBRG` Crucible was added; boundary is represented by inhibition/gate signals only.

## Risks / Uncertainties

- Draconic Domination and Painbow need official/current decklist confirmation before stronger use.
- Named WUBRG Commander/card legality remains support-only unless current card/source verification is captured.
- WUBRG flavor snippets are generated from committed indexes and are not lore evidence.
- Existing unrelated dirty/untracked documentation drift remains present and was not normalized.

## Tests Run

- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check research/maze-search-tests.js`
- `npm.cmd run build:factions`
- `node research/build-archscry-flavor-snippets.mjs`
- `node research/maze-search-tests.js`
- `node assets/js/quick-reading-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/validate-source-generated-guardrails.mjs WUBRG`
- `npm.cmd test`
- `npm.cmd run test:parser`

## Not Touched

- Existing historical/user WUBRG files in `docs/research/wubrg/`, including `WUBRG Identity Research Prompt.md` and `wubrg_research_terminal.html`.
- Home preview carousel expansion.
- Public WUBRG directory route/page.
- WUBRG identity hero asset rollout.
- `COLORLESS/WUBRG` Crucible approval or implementation.
- Unrelated dirty files/cards such as lighthouse/audit docs and VM-364/365/366 closeout artifacts.

## Follow-Up Recommendations

- Capture official/current decklist sources for Draconic Domination and Painbow or leave them explicitly deferred.
- Consider a future WUBRG identity hero/background card only after explicit product approval.
- Keep WUBRG Commander recommendations support-only unless a later card performs current named-card legality/source verification.

## Next Suggested Agent

Documentation Steward or JSON Cartographer for the Draconic Domination / Painbow official-current decklist capture.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-367-wubrg-gold-layer1-layer2.md`
- `docs/research/wubrg/wubrg-layer2-gold-findings.md`
- `docs/research/wubrg/wubrg-evidence-ledger.md`
- `docs/research/wubrg/wubrg-source-ledger.md`
- `docs/reference/source-generated-guardrails.md`

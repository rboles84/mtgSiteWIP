# Codex Handoff - VM-487 Maze Scryfall Checklist Follow-up

## Agent Name

Codex

## Task Requested

Review `scryfall_checklist_report_2026-07-09_1916.md`, repair its three failed Maze/Scryfall queries plus two reproducible defects hidden in PASS rows, add regression coverage, update governance documentation, and preserve the dirty working tree.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-483, VM-484, and VM-485 handoffs
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/reference/manual-test-cases.md`
- `C:\Users\obake\Downloads\scryfall_checklist_report_2026-07-09_1916.md`
- Maze compiler, semantic registry, parser/contract/route/mode tests, and browser smoke

## Files Changed

- `research/scryfall-grounded-compiler.js`
- `data/scryfall/grounding/plain-reading-semantics.json`
- `scripts/validate-plain-reading-semantics.mjs`
- `research/scryfall-parser-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `research/research-mode-tests.js`
- `scripts/browser-smoke.mjs`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/reference/manual-test-cases.md`
- `docs/qa/2026-07-09-vm487-maze-scryfall-checklist-follow-up.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-487-maze-scryfall-checklist-follow-up.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-09-1953-codex-vm487-maze-scryfall-checklist.md`

## What Changed

- Replaced the VM-483 Spider-Man/Rakdos exact-color special with a guarded normal-card type/subtype pool: `c<=<colors> -c:c`.
- Reordered token-object detection before set resolution and added a post-resolution token child-set refinement path.
- Routed Strixhaven Inkling/Pest token objects to `s:tstx`, supported multiple/no-child parents, and preserved explicit token-set and token-maker behavior.
- Added a combined ability relaxation for strict zero-result Commander searches; Glint now offers exact UBRG Commander fallback without Partner syntax.
- Added curated positive/negative mill semantics and consumed redundant candidate legality wording.
- Added deterministic parser, contract, route UI, mode, browser, QA, and manual coverage.

## Why It Changed

The report proved that the previous exact Rakdos fix was too narrow, token objects were searching playable parent sets, strict Glint queries lacked a useful identity-preserving fallback, mill negation was inverted, and successful legality compilation could still produce false unresolved diagnostics.

## Decisions Made

- The requested card was named VM-486, but preflight found VM-486 already assigned to Robboles recurring idea candidates. This work uses the collision-free VM-487 ID.
- The color-pool rule applies only to named multicolor normal-card type/subtype searches. Commander candidates, deck support, explicit identity, token objects, exact-color, and single-color paths are excluded.
- Scryfall `setType: token` includes substitute-card sets; inferred token children therefore exclude names containing `Substitute Cards`, while explicit substitute-set requests remain exact.
- The strict Glint query is correct and remains primary. Recovery drops all ability categories together but does not invent Partner pairing.
- The checked-in grounding already had the required token child metadata, so no grounding regeneration was needed.

## Risks / Uncertainties

- Future Scryfall token-set naming that is neither a true Tokens set nor a Substitute Cards set may need a concrete fixture before refinement changes.
- The downloaded checklist still has 72 untested rows and no checked-in report generator.
- Live Scryfall counts are mutable and are intentionally not pinned in tests.

## Tests Run

- `node --check research\scryfall-grounded-compiler.js` - passed.
- `npm.cmd run test:plain-reading-semantics` - passed.
- `npm.cmd run test:parser` - 221 cases passed.
- `node research\maze-query-contract-tests.js` - passed.
- `node research\maze-search-tests.js` - passed.
- `npm.cmd run test:mode` - 10 mode and 12 leakage cases passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:browser-smoke` - desktop and mobile passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed.
- Live Scryfall sanity checks - repaired Rakdos and Silverquill queries returned results; strict Glint remained zero and its exact-identity fallback returned a result.
- `git diff --check` - passed with existing line-ending warnings only.

## Not Touched

- Generated Scryfall grounding artifacts or live Scryfall data.
- Parser modes or broad synonym/set-family behavior.
- Reading Finds storage, migration, or Archscry handoff contracts.
- Maze layout, modal behavior, or VM-485 mana-pip rendering.
- Unrelated dirty-tree files, commits, pushes, or deployment.

## Follow-Up Recommendations

- Run the remaining 72 interactive checklist rows in a separate testing pass.
- Add future token-child exceptions only from concrete local grounding and manual fixtures.

## Next Suggested Agent

A Test Strategist can own the remaining 72-row interactive checklist pass; no specialist is required for this completed repair.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-487-maze-scryfall-checklist-follow-up.md`
- `docs/qa/2026-07-09-vm487-maze-scryfall-checklist-follow-up.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`

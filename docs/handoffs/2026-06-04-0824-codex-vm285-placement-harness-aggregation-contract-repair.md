# 2026-06-04 08:24 - Codex - VM-285 Placement Harness Aggregation And Contract Repair

## Agent Name

Codex

## Task Requested

Execute VM-285 as a focused placement/test-harness repair slice:

- create the fresh Kanban card and handoff
- convert `assets/js/quick-reading-tests.js` from fail-fast behavior into named aggregated section reporting
- preserve assertion intent and non-zero runner behavior
- update stale executable Maze query expectations without changing readable-copy ordering
- update `research/archscry-adjacent-navigation-tests.js` to the post-VM-281 / VM-283 active-target contract
- run the required validation stack plus classification-only Home reruns

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0714-codex-vm284-quandrix-golden-path-calibration.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-222-temur-dossier-link-maze-qa-repair.md`
- `docs/kanban/done/VM-281-four-color-active-fit-maze-handoff-hardening.md`
- `docs/kanban/done/VM-283-four-color-handoff-field-consistency-contract.md`
- `docs/kanban/done/VM-284-quandrix-golden-path-calibration-repair.md`
- `docs/kanban/backlog/VM-154-home-hero-horizontal-overflow-containment.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/done/VM-117-phase-7-performance-pass-script-deferral-cls-lighthouse.md`
- `assets/js/quick-reading-tests.js`
- `assets/js/archscry-presentation.js`
- `assets/js/maze-handoff.js`
- `research/archscry-adjacent-navigation-tests.js`
- `research/maze-search-tests.js`
- `research/research-init.js`

## Files Changed

- `assets/js/quick-reading-tests.js`
- `assets/js/archscry-presentation.js`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-285-placement-harness-aggregation-and-contract-drift-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0824-codex-vm285-placement-harness-aggregation-contract-repair.md`

## What Changed

- Added an async-aware section runner to `assets/js/quick-reading-tests.js` that executes named placement areas in order, collects failures by section name, prints a grouped summary, and exits non-zero afterward.
- Wrapped the existing top-level quick-reading assertions into stable, human-readable sections instead of rewriting the underlying helper graph.
- Updated stale executable Maze query identity assertions to match live routing-alias identity order where repo truth had moved:
  - `TEMUR`: `urg` -> `gur`
  - `SULTAI`: `ubg` -> `bgu`
  - `JESKAI`: `wur` -> `urw`
- Preserved readable-copy ordering by removing the plain-reading rewrite from `applyMazeIdentityOverride()` in `assets/js/archscry-presentation.js`; executable queries still use routing-alias order.
- Updated `research/archscry-adjacent-navigation-tests.js` to assert the post-VM-281 / VM-283 active-target handoff contract with a live four-color adjacent case:
  - `guild` = active viewed target
  - `fit` = active viewed target
  - `sourceFaction` preserves the original reading
  - `returnUrl` points back to the viewed dossier state
- Created and closed the VM-285 Kanban card, and updated the board accordingly.

## Why It Changed

- VM-284 intentionally left the quick-reading suite red on a separate executable Maze query-ordering issue after the QUANDRIX calibration repair.
- The placement harness still failed fast, which made it harder to map failing areas inside `test:placement`.
- The repo’s live executable query identity map had already shifted to routing-alias order for several wedges, while human-facing copy was supposed to remain in readable color-order prose.
- The adjacent-navigation test still reflected the pre-VM-281 / VM-283 handoff contract instead of the live active-target behavior.

## Decisions Made

- Kept QUANDRIX calibration locked at `0.35`; VM-284 was not reopened.
- Preserved quick-reading runner semantics for CI and parent runners by still failing the process normally when any section fails.
- Fixed readable Temur copy in runtime instead of weakening the copy assertion, because implementation evidence showed the contract drift lived in `applyMazeIdentityOverride()`.
- Treated `SULTAI` and `JESKAI` executable identity expectations as the same class of stale test drift once the aggregated harness exposed them.
- Used a live four-color adjacent case in `research/archscry-adjacent-navigation-tests.js` so `sourceFaction` expectations match the current runtime contract without widening runtime behavior.

## Risks / Uncertainties

- `docs/kanban/board.md` and many unrelated repo files were already dirty before this slice; I changed only the targeted VM-285 board entries and did not normalize unrelated drift.
- The Lighthouse Home runner still reproduces the known `NO_FCP` path and hangs during Edge cleanup after `taskkill` access denial.
- `npm.cmd run test:visual:newindex2` now passes again; this slice did not investigate whether that green result was caused by prior unrelated work or by the readable-copy correction.

## Tests Run

- `npm.cmd run test:placement` - passed
- `node research/maze-search-tests.js` - passed
- `node research/archscry-adjacent-navigation-tests.js` - passed
- `npm.cmd test` - passed
- `npm.cmd run test:visual:newindex2` - passed with `mobile: 2`, `tablet: 1`, `desktop: 121`
- `npm.cmd run test:lighthouse:newindex2` - reproduced `NO_FCP`, reported `Performance: 0`, `Accessibility: 0`, wrote `docs/audits/lighthouse-newindex2.html`, then hung during Edge cleanup after `taskkill` access denial

## Not Touched

- `data/raw-factions/**`
- research packets and docs packets
- generated builder outputs
- route names
- Home asset names
- Lighthouse harness internals
- VM-284 calibration surfaces

## Follow-Up Recommendations

- If more executable-identity drift surfaces in future wedges or four-color lanes, keep it scoped to stale test expectations unless readable-copy drift or runtime contract drift is also present.
- If the team wants the Home Lighthouse classification to become actionable, open a separate card against the known `NO_FCP` / Edge cleanup environment issue instead of widening placement work.
- If richer failure mapping inside `test:placement` becomes useful later, the next safe step would be more granular section boundaries, not per-assert rewrites.

## Next Suggested Agent

Codex main agent or Test Strategist for any future placement regression triage; Documentation Steward only if the team wants the Home Lighthouse limitation re-documented elsewhere.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-285-placement-harness-aggregation-and-contract-drift-repair.md`
- `docs/kanban/done/VM-284-quandrix-golden-path-calibration-repair.md`
- `docs/kanban/done/VM-283-four-color-handoff-field-consistency-contract.md`
- `docs/kanban/done/VM-281-four-color-active-fit-maze-handoff-hardening.md`
- `docs/kanban/done/VM-222-temur-dossier-link-maze-qa-repair.md`
- `docs/kanban/backlog/VM-154-home-hero-horizontal-overflow-containment.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/done/VM-117-phase-7-performance-pass-script-deferral-cls-lighthouse.md`

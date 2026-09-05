# VM-547 semantic result-quality revision handoff

- Agent name: Codex
- Task requested: Revise the rejected VM-547 candidate without redesigning the accepted architecture; prove useful card-level semantic behavior for all 367 projections and stop at Owner Review.
- Related card: `docs/kanban/in-progress/VM-547-post-reading-commander-shortlist-bridge.md`
- Exact material candidate: `b0a3ba8462e3f5fcd1a20a21131cd765e3714fab`
- Branch: `codex/vm-547-archscry-maze-discovery`
- Delivery state: Owner Review; local commit only; no push, PR, merge, or `main` change.

## Files reviewed

- Required RobDev and RobQA skills, usage guides, and frozen gates.
- VM-547 card, board, prior Owner Review/handoff, Maze query contract, and data-flow map.
- Canonical dossier source, discovery-profile source/schema/catalog, shared Archscry/Maze path factory, Maze dossier renderer, browser harnesses, and pinned Oracle corpus/manifest.

## Files changed

- Canonical projection source/schema/catalog and deterministic producer.
- Shared Maze handoff factory plus truthful Archscry/Maze labels and unavailable-thread rendering.
- Exhaustive local query evaluator, projection audit, pinned card fixtures, 37-row matrix, and 367-row evidence ledger.
- Focused VM-547 browser/profile harnesses and module cache keys.
- Query/data-flow contracts, VM-547 card/board, Owner Review report, and this handoff/index.

## What changed and why

The rejected candidate proved structure but not result populations. The revision evaluates every exact generated query against the pinned 38,626-card Oracle corpus, tightens broad or misleading clauses/labels, pins false-positive regressions, and records a positive, plausible semantic negative, and boundary card for every executable projection. A lane-specific override can now refine a governed thread or mark one unavailable with a rationale; unavailable cards stay visible in Maze but expose neither a fake search nor query syntax.

The compact four-choice Archscry handoff, richer Maze continuation, shared source/factory ownership, route/history design, WUBRG top-level boundary, result presentation, Placement, parser/compiler, ranking, atmosphere, and unrelated surfaces remain unchanged.

## RobDev compact packet

- Owning authority: approved dossier meaning remains in `identity-dossier-content.source.json`; reviewed query projection remains in `maze-discovery-profiles.source.json`; the builder produces the catalog; `maze-handoff.js` is the sole runtime consumer factory.
- Changed behavior: lane-specific semantic precision, explicit unavailability, truthful broad-pool wording, and deterministic card-level evidence.
- Protected behavior: certified dossier meaning, four path types, Archscry density, Maze result cards/unrelated modes, navigation/history, WUBRG impossibility, parser/compiler, ranking, Placement, global design.
- Consumers: Archscry dossier handoff, Maze dossier continuation, profile tests, browser tests, matrix/evidence generation.
- Risks: stale fixtures, local Scryfall-model drift, shallow high-recall branches, composite labels, false-positive stretch matches, and fabricated zero-result paths.
- Smallest complete implementation: one lane-override extension in the existing source/builder/factory plus exhaustive deterministic audit evidence.
- Non-goals: popularity/fit ranking, runtime AI, dossier rewrites, architecture/UI redesign, live-query result ordering, accounts or persistence.
- Stop condition: exact local candidate at Owner Review after VM-547-specific RobQA; no push or merge before Owner acceptance.

## Decisions made

- All 367 thread/lane projections remain modeled. Exactly 354 are executable and nonempty; 13 retain governed labels and explanations but are intentionally unavailable.
- Broad color-identity commander results remain explicitly broad and are never called fit.
- Story searches remain flavor-text vocabulary; mechanical labels remain tied to governed Oracle/mechanical concepts.
- Stretch queries must join outside-identity eligibility to a named dossier characteristic. WUBRG retains no fabricated stretch action.
- Archscry and Maze continue to consume the same generated catalog through the same factory.

## Risks / uncertainties

- The deterministic result proof uses the pinned local Oracle corpus and seven locally modeled Scryfall functional tags. The fixture records corpus provenance; future corpus/model changes must intentionally regenerate and review evidence.
- `npm run test:maze-onboarding-browser` passed before the candidate freeze, then timed out twice on the exact candidate at two different visual waits (raw-mode state and finite Guide Beacon animation). No VM-547 assertion failed. At Owner direction, further visual retries stopped; this is disclosed for manual judgment rather than silently counted as a pass.
- The source-generated guardrail retains two pre-existing JESKAI/MARDU model-owned provenance warnings; the command passes.

## Tests run

- PASS — `npm run test:maze-discovery-profiles`: 37/37 profiles, 367/367 projections, 354 executable/nonempty, 13 unavailable, 354 positive, 354 negative, 354 boundary, 501 query-generation and 501 truthfulness checks.
- PASS — `npm run test:vm547-browser`: 74 desktop, 8 narrow, 8 mobile, 48 accessibility, 3 return-navigation, 14 unavailable-state UI checks, 0 page errors.
- PASS — `npm test`: 16/16 established suites; presentation snapshot reports 16 fixed cases.
- PASS — `npm run lint:js`: 38 files.
- PASS — `npm run lint:html`.
- PASS — `npm run test:source-generated`: two disclosed pre-existing warnings.
- PASS — `git diff --check`.
- TIMEOUT — `npm run test:maze-onboarding-browser`: two exact-candidate attempts at different visual waits; one pre-freeze run passed.
- Skipped tests: None.

## Not touched

No Archscry hero, dossier typography, unrelated dossier card, global navigation, Maze result card, unrelated Maze mode, background/atmosphere, global hover/focus, Placement, parser/compiler, popularity/ranking, account, persistence, PR, remote branch, or `main` change.

## Follow-up recommendations

Owner should use the short representative path in the Owner Review report, spot-check the protected Maze onboarding interaction if desired, then choose `ACCEPT`, `ACCEPT WITH SMALL FOLLOW-UP`, or `REVISE`. `ACCEPT VM-547` is required before branch publication or integration.

## Next suggested agent

Owner Review. If accepted, the integration agent should verify this exact material SHA and follow the standard ACCEPT workflow. If revised, continue the same branch and invalidate the current RobQA evidence for material changes.

## Related docs and plans

- `docs/qa/2026-09-04-vm547-owner-review.md`
- `docs/qa/2026-09-04-vm547-all-37-discovery-matrix.md`
- `docs/qa/2026-09-04-vm547-all-367-projection-evidence.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/data-flow-map.md`

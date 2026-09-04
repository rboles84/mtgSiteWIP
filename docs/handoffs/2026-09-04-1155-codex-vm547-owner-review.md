# VM-547 Archscry to Maze Discovery Handoff

Agent name: Codex

Task requested: Implement and exhaustively validate the all-37 Archscry to Maze discovery handoff, start the exact local Owner Review environment, and stop before push, PR, merge, or `main` integration.

Status: Material candidate prepared; exact candidate SHA and RobQA binding will be added after the stable candidate commit. Owner acceptance remains required.

Related Kanban card, docs, or plans:

- `docs/kanban/in-progress/VM-547-post-reading-commander-shortlist-bridge.md`
- `docs/qa/2026-09-04-vm547-owner-review.md`
- `docs/qa/2026-09-04-vm547-all-37-discovery-matrix.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/data-flow-map.md`

## Files reviewed

- Governing RobDev and RobQA skills/gates and the standard delivery workflow.
- Handoff index and relevant VM-150, VM-551, VM-577, VM-615, VM-616, VM-625 handoffs/cards/contracts.
- The certified 37-dossier content catalog, identity registry, existing shared Maze handoff factory, Archscry dossier renderer/data loaders, Maze context/query/result owners, responsive styles, and existing regression/browser harnesses.

## Files changed

- Added the authored/generated discovery-profile source, schemas, deterministic builder, runtime catalog, all-37 semantic harness, browser harness, and generated Owner matrix.
- Extended the shared Maze handoff factory, Archscry catalog loading/presentation, Maze rehydration/context presentation, route markup, and scoped Maze styles.
- Updated relevant package commands, HTML/cache validation, VM-551 catalog integrity coverage, VM-616 browser harness portability/timing, Maze tests, and stale Archscry follow-up expectations.
- Updated the Maze query contract, data-flow map, VM-547 card/board, Owner report, and this handoff/index.

## What changed

Archscry retains one compact `Maze Discovery Paths` handoff with plain top-level labels. Maze now identifies the originating dossier and reading, distinguishes the initial broad color-identity pool from semantic refinement, exposes governed identity-specific threads, explains each thread in plain English, and keeps exact Scryfall operators behind a collapsed inspector. Support searches explicitly trace reading to mechanical thread to interpretation to cards. Story searches use `ft:` vocabulary. Stretch searches exclude the original identity while preserving a named dossier mechanic. WUBRG replaces the impossible outside-five-color action with an explicit unavailable boundary.

Both routes load the same generated 37-profile catalog and call the same shared path factory. There is no runtime semantic generation, separate Archscry/Maze definition, ranking-as-fit, or rewrite of certified dossier meaning.

## Why it changed

The prior shared factory produced shallow generic vocabulary and could imply semantic fit where a lane was only an exact color-identity commander pool. VM-547 makes the continuation materially identity-specific and inspectable while keeping the dossier itself compact.

## RobDev compact packet

- Work class/risk: High-risk cross-surface semantic projection and navigation change; source authority, user trust, all-37 coverage, and responsive UI are direct risks.
- Owning authority: `data/dossier/identity-dossier-content.source.json` owns dossier meaning; `data/dossier/maze-discovery-profiles.source.json` owns reviewed query projections; `scripts/build/build-maze-discovery-profiles.mjs` is producer; `assets/js/maze/maze-handoff.js` is the single runtime composer.
- Consumers: Archscry dossier links, Maze context panel/thread controls/query execution, generated matrix, semantic/browser tests.
- Changed behavior: truthful broad labels, identity-specific threads, story/mechanical separation, meaningful outside-color stretch, optional query details, WUBRG boundary, and context-preserving return.
- Protected behavior: placement/scoring, certified dossier semantics, parser/compiler, result ranking, persistence, global navigation, unrelated dossier/Maze surfaces, atmosphere, and external service discovery.
- Main risks: label/query mismatch, source drift, shallow stretch matches, Colorless/WUBRG assumptions, responsive density, duplicate history.
- Smallest complete implementation: one authored source and generated catalog, one shared factory, compact Archscry projection, rich Maze projection, exhaustive semantic fixtures, representative browser coverage.
- Non-goals: commander ranking, legality/price certification, runtime AI, account persistence, placement changes, or redesign.
- Stop condition: exact material candidate passes deterministic RobQA and waits at Owner Review without push or merge.

## Decisions made

- Exactly three approved mechanical threads per dossier keep Maze rich but bounded.
- The broad commander lane remains a clearly labeled exact identity pool; semantic commander threads live underneath.
- Operator syntax is inspectable but secondary.
- TEMUR's optional Survival Through Attunement lens and WUBRG's optional Full-Spectrum Integrator remain dossier interpretations rather than query claims.
- WUBRG has no outside-color Commander lane because no valid outside-five-color space exists.
- Legacy `buildDossierMazePathEntries` behavior remains available when no canonical profile is supplied.

## Risks / uncertainties

- Owner visual/comprehension judgment remains intentionally pending; automation owns objective layout, semantics, accessibility mechanics, and navigation.
- The source/generated suite retains two pre-existing model-owned warning records for JESKAI and MARDU; both are outside VM-547 and the suite passes.
- The legacy Archscry follow-up suite required expectation maintenance against current committed copy/assets/catalogs, including an exact seven-item historical-print flavor allowlist. Runtime behavior was not changed by that maintenance.

## Tests run

- PASS — all-37 semantic/catalog harness: 37 discovered, 37 profiles, 148 governed top-level states, 147 executable paths plus WUBRG boundary, 148 unique threads, 367 lane projections, 148 positive, 148 negative, 148 boundary, 514 query-generation, 514 label-truth checks.
- PASS — VM-547 browser harness: 37/37 Archscry, 37/37 Maze, 74 desktop route renders, 8 narrow, 8 mobile, 48 accessibility checks, 3 return/history flows, zero page errors.
- PASS — established VM-616 Maze context/history browser regression: 1/1.
- PASS — existing `npm test`: 16/16 suites.
- PASS — frontend JS lint: 38 files.
- PASS — frontend HTML validation.
- PASS — source/generated guardrails with two disclosed pre-existing warnings.
- Skipped tests: None.

## Not touched

No placement model/scoring, certified dossier claims, Scryfall parser/compiler, Maze result ranking/cards, persistence keys, global navigation, unrelated Maze entry modes, Archscry hero/typography/unrelated cards, backgrounds/atmosphere, or shared hover/focus treatment. No push, PR, merge, or `main` change.

## Follow-up recommendations

Owner should perform only the bounded representative interaction/visual pass in `docs/qa/2026-09-04-vm547-owner-review.md`, then choose `ACCEPT`, `ACCEPT WITH SMALL FOLLOW-UP`, or `REVISE`. Any material change invalidates the exact-candidate RobQA evidence.

Next suggested agent: Owner Review; return any finding to RobDev on the same branch.

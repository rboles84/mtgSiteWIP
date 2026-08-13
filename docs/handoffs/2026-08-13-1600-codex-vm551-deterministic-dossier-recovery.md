# VM-551 Deterministic Dossier And Recovery Repair

- Agent: Codex
- Task requested: Continue Packet 2/3 completion through deterministic defects and all-37 certification unless a true owner-only judgment remains.

## Files reviewed

Gate B1 engine/refinement code and reports, production Archscry result/dossier rendering, Packet 1–3 runtime catalogs, provider/Maze validation, current all-37 matrix, Kanban, and relevant handoffs.

## Files changed

- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `scripts/vm551-dossier-content-integrity-tests.mjs`
- `scripts/vm551-dossier-recovery-tests.mjs`
- `package.json`
- this handoff, Kanban milestone, and handoff index

## What changed and why

- Why This Fit now selects only positive, non-neutral, dependency-independent answer observations; three remains an explanation target, not a naming threshold.
- Test the Fit no longer repeats the `This may fit if → Notice what resonates → This may fit if` scaffold, and How This Plays no longer carries a generic bridge sentence.
- A page-level canonical card-usage set reserves visible precon commanders, then rationale cards, voice cards, and finally filters Card Signal References. Voice repetition remains possible only through an explicit approved `critical_repeat` record.
- Insufficient/contradictory readings now expose the engine's approved optional targeted refinement or materially relevant answer revisit. Mixed readings expose each independently supported direction without manufacturing a named dossier.
- Original evidence remains unchanged when an optional targeted refinement is evaluated.

## Decisions and risks

No placement mapping, scoring, ranking, route selection, naming qualification, stopping rule, normal six-to-eight-question limit, or Yore observability changed. Optional refinement continues to use the existing engine contract outside the main journey. Browser/live witness certification remains the next gate.

## Tests run

- JS syntax: PASS
- `test:vm551-dossier-integrity`: PASS
- `test:vm551-dossier-recovery`: PASS across 2,000 deterministic journeys; 956 bounded, 956 with an unused approved targeted question, 141 mixed
- `lint:js`: PASS
- `git diff --check`: PASS

## Not touched

Gate A, questions/answers, mappings, scoring, routing, stopping, persistence/schema, Matrix, certified identity authority, provider destinations, Maze semantics, deployment, migration, player validation.

## Follow-up

Build and run the current-engine all-37 actual UI witness replay, generate the final PASS/NOT_APPLICABLE/FAIL matrix, run the full regression/certification suite, and stop for owner visual review.

## Related records

- `docs/kanban/in-progress/VM-551-all-37-dossier-closeout-program.md`
- `docs/plans/vm551-gate-b1-product-fit/all-37-dossier-closeout-program.md`

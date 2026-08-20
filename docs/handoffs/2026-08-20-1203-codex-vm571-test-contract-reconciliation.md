# VM-571 Test Contract Reconciliation Handoff

- Agent name: Codex
- Task requested: Correct exactly two stale QA/test references discovered after VM-570, run focused checks, record any later unrelated dossier-suite failure, and avoid product or architecture work.
- Files reviewed: Current governance, VM-570 card/handoff, current Maze runtime ownership, browser smoke, Archscry dossier test/runtime authority, VM-567/VM-568 history, package test commands, branch, HEAD, and worktree state.
- Files changed: `scripts/browser-smoke.mjs`, `tests/archscry/archscry-dossier-followup-tests.js`, VM-571 card, Kanban board, handoff index, and this handoff.
- What changed: Browser smoke now reads `assets/js/maze/research-init.js`; the dossier follow-up assertion now expects the approved `Cards That Play Like This` heading.
- Why it changed: VM-570 moved Maze runtime ownership, and later approved dossier work superseded the old `Why These Cards Echo This Reading` heading while the two QA contracts remained stale.
- Decisions made: Changed test infrastructure only; preserved current product runtime and copy; stopped when the focused dossier suite reached a distinct later historical assertion.
- Risks / uncertainties: Full browser smoke was not run because the current workspace lacks installed dependencies, which is not a repository defect. The later dossier assertion remains outside VM-571.
- Tests run: PASS `node --check scripts/browser-smoke.mjs`; PASS `node --check tests/archscry/archscry-dossier-followup-tests.js`; PASS focused Maze path contract; PASS focused dossier heading contract; focused dossier suite passed the corrected assertion then FAILed later at line 275 with `expected the result directory to describe the complete current identity atlas`.
- Not touched: Product runtime/copy, generated data, dependencies, Node/toolchain configuration, broad QA, semantic provenance, dead tooling, research lifecycle, VM-570, runtime decomposition, and Pass 2.
- Follow-up recommendations: Assess dead tooling cleanup as a separate task before planning Archscry Pass 2. Handle the later dossier assertion only under separately approved scope.
- Next suggested agent: Dead-tooling review planning agent after VM-571 closeout, not a runtime-decomposition implementer.
- Related Kanban card, docs, or plans: `docs/kanban/done/VM-571-post-vm570-test-contract-reconciliation.md`, VM-570, VM-567, and VM-568.

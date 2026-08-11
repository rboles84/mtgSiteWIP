# VM-551 Live Questionnaire And Qualified Alternatives Carry-Forward Handoff

- Agent name: Codex
- Task requested: Carry the approved Gate B1 questionnaire presentation into live Archscry and separate clear-primary state from independently qualified exploration alternatives.
- Related Kanban card: `docs/kanban/done/VM-551-gate-b1-live-questionnaire-qualified-alternatives-carry-forward.md`
- Branch/worktree: `codex/vm551` / `C:\dev\voxmana.io-vm551`
- Starting HEAD: `f0d4bde9dec7720d91f6af95a25720c5b3009f26`

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md` and the recent VM-551 consolidation, production-fidelity, runtime, and alternatives handoffs
- `docs/kanban/board.md` and related completed VM-551 cards
- `docs/prototypes/vm551-gate-b1-production-fidelity-preview/`
- `docs/plans/vm551-gate-b1-placement-instrument/pilot-question-bank.tsv`
- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/js/index.js`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/gate-b1-placement-engine.js`
- `scripts/build-gate-b1-placement-model.mjs`
- `scripts/vm551-gate-b1-qualified-alternatives-tests.mjs`

## Files Changed

- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/js/archscry-question-presentation.js`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `data/gate-b1-placement-model.json`
- `scripts/build-gate-b1-placement-model.mjs`
- `scripts/vm551-gate-b1-questionnaire-presentation-tests.mjs`
- `scripts/vm551-gate-b1-qualified-alternatives-tests.mjs`
- `package.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-551-gate-b1-live-questionnaire-qualified-alternatives-carry-forward.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed And Why

- Live question headings now use a readable 68-character maximum within the available card instead of the stale 28-character half-card constraint.
- Answer grids carry the approved geometry: 4 answers remain 2×2; 3 answers are three columns above 900px, two columns plus a spanning third at intermediate widths, and one column at 700px and below.
- The canonical question TSV now supplies additive `jargon_term_ids` and `jargon_help` fields to the generated runtime model. A pure presentation selector admits terms likely to change comprehension and suppresses ordinary/redundant definitions. Q3 therefore renders only `A graveyard is a player's discard pile.`
- Gate completion and result construction are user-controlled through `Continue into the Hall` and `Open my reading`; neither transition is timer-driven.
- Progress now names the active stage locally and consistently communicates a six-to-eight-moment adaptive journey.
- The Gate A adapter now uses the engine's existing alternatives for close/tied/mixed states, but for a clear primary it may additionally expose other internal candidates only when their existing naming qualification is independently true and direct positive evidence exists. This fixes the state/exploration conflation without changing the engine's 0.20 close window, ranking, or scores.
- Primary exploration comparisons use `alternative_state = exploration`, complete production match objects, existing evidence adaptation, the production dossier, and existing certified presentation contrasts. Close remains exactly one secondary; tied remains a qualified co-leader; mixed remains at most two alternatives; bounded states remain unnamed.

## Decisions Made

- Presentation metadata is generated from the approved question-bank source rather than hardcoded as duplicate prose.
- The helper selector owns only visibility; source content remains authoritative.
- A numerically ranked candidate is never public by rank alone. Independent naming qualification and direct positive evidence are both mandatory.
- Primary exploration does not add score, alter the primary separation rule, or convert the result to close.
- Existing production dossier renderers and section definitions remain authoritative.

## Tests Run

- `npm.cmd run test:gate-b1-model` — PASS, 16 constructs / 36 questions / 124 answers / 37 identities / 123 pairs / 76 directional uses.
- `npm.cmd run test:gate-b1-questionnaire-presentation` — PASS.
- `npm.cmd run test:gate-b1-result-contract` — PASS, focused primary 0/1/2 plus 5,000 deterministic journeys. States: primary 2,450; insufficient 1,827; contradictory 267; mixed 352; close 78; tied 26. Primary alternatives: zero 2,444; one 6.
- `npm.cmd run test:gate-b1-engine` — PASS, 5,000 journeys / 37 identities / 123 pairs / 6,660 synthetic runs / 921 mutations / 36 of 37 responsible primaries.
- `npm.cmd run test:gate-b1-runtime` — PASS.
- `npm.cmd run test:placement` — PASS, 37 legacy golden paths.
- `npm.cmd run test:source-generated` — PASS with the two pre-existing JESKAI/MARDU model-owned warning notes.
- `npm.cmd run lint:js` — PASS.
- `npm.cmd run lint:html` — PASS.
- Node syntax checks for all changed JavaScript modules and test scripts — PASS.
- `git diff --check` and staged-path/protected-scope audits — PASS.
- Minimal live browser smoke — PASS:
  - 1280px Q1: 1,120px card, 1,062px title box, 2×2 four-answer grid, no overflow.
  - Q3: one board-wipe mention total; visible graveyard helper; no duplicate board/board-wipe helper.
  - Gate and reading transitions remained visible after ten seconds until their action buttons were used.
  - Three-answer question: three 345px columns at 1280px; 2×345px plus a 705px spanning third at 820px; one 309px column at 390px; no horizontal overflow.
  - Calculated close route rendered `Close result: Jund, with Red also supported`, one Red alternative, no `undefined`.
  - Console warning/error logs were empty.

## Risks / Uncertainties

- Qualified exploration alternatives are intentionally uncommon in the deterministic sample (6 of 2,450 primary results) because no qualification or evidence threshold was weakened. This is expected and prevents slot filling.
- Yore remains the intentional 37th observability boundary from the approved engine lineage.
- The generated model records additive presentation fields and updated canonical source hashes; semantic counts and engine outcomes remain validated and unchanged.

## Not Touched

- Constructs, question/answer semantics, stable IDs, mapping authority, scoring, ranking, routing, stopping, refinement, naming qualification, Yore behavior, certified identity records, Gate A public states, native evidence ledger, dossier section definitions, Matrix, Maze, persistence, schemas, accounts, deployment, and production certification.

## Follow-Up Recommendations

- Owner should resume natural readings on this same canonical worktree and assess whether the now-rare supported comparison directions feel useful when they appear.
- Keep all future VM-551 work on `codex/vm551` / `C:\dev\voxmana.io-vm551` unless the owner explicitly authorizes an exception after the single-worktree hard stop.

## Next Suggested Agent

- Owner review only. Do not begin another implementation task automatically.

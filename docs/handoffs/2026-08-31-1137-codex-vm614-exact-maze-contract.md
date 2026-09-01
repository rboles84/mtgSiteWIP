# VM-614 Exact Maze Contract Handoff

## Agent name

Codex

## Task requested

Go beyond screenshot imitation: read the Guide, Maze, and Archscry CSS/JavaScript stacks, identify the
actual product UI contract, and repair the still-unpolished Guide without beginning VM-615+.

## Files reviewed

- repo-local RobDev and RobQA skills, guides, and frozen gates
- accepted Field Guide/onboarding contract, VM-614 card, board, QA record, and prior VM-614 handoffs
- complete linked HTML/CSS/JS stacks for `/guide/`, `/maze/`, and `/archscry/`
- shared tokens, fonts, layout, topbar, atmosphere, components, rich-atmosphere, motion, feedback, topbar,
  auth/session, and radar sources
- all route stylesheet ownership blocks and responsive sections
- recursive first-party JavaScript import graphs: Guide 4 files / 1,432 lines; Maze 18 files / 15,020
  lines; Archscry 39 files / 19,537 lines
- live matched CSSOM and screenshots for Guide, Maze, and Archscry
- focused validators and browser smoke

## Files changed

- `guide/index.html`
- `assets/css/guide.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/guide-browser-smoke.mjs`
- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/kanban/board.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/2026-08-31-0953-codex-vm614-archscry-maze-convergence.md`
- this handoff and `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Replaced the Guide-only visual approximation with direct loading of `maze.css`.
- Added the Maze route-shell class alongside the Guide route identity so the background image filter,
  body overlays, page grid, focus, typography, and responsive rules are inherited exactly.
- Rebuilt the Guide markup on Maze's real command-deck, command-copy, console, mode-card, body, sidebar,
  main, and footer primitives.
- Made each primary intent a direct whole-control link instead of a static article containing a nested
  CTA button.
- Reworked the lower map into Maze's sidebar/main application shell and a connected sequence instead of
  another equal-card layout.
- Reduced `guide.css` from a parallel 672-line design system to Guide-content adapters only.
- Replaced approximation assertions with static and browser regressions that require actual Maze
  inheritance and compare the two routes' computed visual contracts.

## Why it changed

The prior candidate used the same ingredients but not the same system. It rendered the shared gateway
with different filters/vignettes and duplicated Maze geometry under Guide-only selectors, so the page
still looked like a separate, older landing-page design.

## Decisions made

- The accepted VM-613 contract remains the authority for content, order, destinations, and optional flow.
- Maze's authored CSS/DOM system is the concrete visual implementation authority for this repair.
- Shared rich-atmosphere, motion, feedback, and topbar JavaScript remains valid Guide infrastructure.
- Maze query/search/state/persistence and Archscry reading/Placement/dossier/service JavaScript remain
  specialist domain behavior and must not be imported merely for visual parity.
- Exact inheritance is guarded; copied Guide shell/background/mode-card systems are now a regression.

## Risks / uncertainties

- Final visual acceptance remains the owner's judgment.
- Guide now intentionally depends on the Maze route stylesheet. A future deliberate Maze-shell change
  will flow into Guide and should be reviewed as a shared product-family change.
- The full Maze CSS payload is larger than a future extracted shared-surface module would be; extracting
  that module now would change Maze and expand VM-614 risk, so it was not attempted.

## Tests run

- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `npm.cmd run test:route-metadata`
- PASS `npm.cmd run test:copy-boundaries`
- PASS `npm.cmd run test:guide-browser`
- PASS `git diff --check` (existing line-ending warnings only)
- PASS live desktop Guide/Maze visual and CSSOM comparison
- PASS rendered 1440 x 1000 and 390 x 844 Guide self-QA
- CPU-heavy Placement/dossier/all-identity/recovery suites: NOT REQUIRED

## Not touched

- Maze or Archscry HTML, CSS, domain/runtime behavior, state, persistence, or content
- shared CSS/JavaScript implementations
- accepted Guide meaning, primary order, destinations, navigation, or Home discovery treatment
- Placement, telemetry, Strategium, Apocrypha sources, or `/library/`
- `/guide/reading/`, `/guide/maze/`, `/guide/reference/`, VM-615, VM-616, or VM-617
- commit, push, PR, merge, deployment, or integration

## Follow-up recommendations

- Owner reviews only the two current exact-contract witnesses.
- Treat every earlier Guide witness and READY claim as rejected history.
- If accepted, close VM-614 in a separately authorized integration/closeout step; do not begin VM-615 in
  this run.

## Next suggested agent

Owner Review; return only a bounded remaining VM-614 finding to Codex.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`

## RobDev / RobQA transfer

- **QA tier:** QA-3 because shared navigation/routing remains in the candidate; this repair is visible UI.
- **Outcome:** Guide uses the same authored product-surface contract as Maze rather than approximating it.
- **Owner/producer:** accepted VM-613 content contract; Maze CSS/DOM visual owner; shared atmosphere runtime.
- **Changed behavior:** Guide-only shell, background rendering, intent controls, and lower content layout.
- **Protected behavior:** all specialist semantics, state, persistence, shared implementations, and later
  Guide routes.
- **Consumers/states:** Guide desktop/mobile users, keyboard focus, direct links, anchor navigation,
  reduced motion, 390px containment, and 200% zoom equivalent.
- **Manual finding:** copied ingredients left the Guide in a parallel visual system.
- **Regression invariant:** Guide must load Maze CSS and match Maze's computed shell/surface contracts;
  Guide CSS may adapt content but may not recreate the background, command deck, or decision-card system.
- **Rendered evidence:** current desktop/mobile witness paths are in the QA record.
- **Disposition:** **RobQA READY - Owner Review required**.

# VM-614 Archscry / Maze Visual Convergence Handoff - REJECTED

Status: **Superseded by the third owner finding.** This candidate copied selected visual ingredients but
retained a parallel Guide-only presentation system. Its screenshots and READY claim are rejected history,
not acceptance evidence.

## Agent name

Codex

## Task requested

Use the live Archscry and Implicit Maze routes as the actual UI authority, then correct the Guide's
background, CSS composition, and JavaScript atmosphere behavior without changing accepted VM-614 content
or beginning later Guide work.

## Files reviewed

- repo-local RobDev and RobQA skills, usage guides, and frozen gates
- current VM-614 card, QA record, prior implementation and remediation handoffs
- live `http://127.0.0.1:4176/archscry/index.html`
- live `http://127.0.0.1:4176/maze/index.html`
- live `http://127.0.0.1:4176/guide/` before and after repair
- `assets/css/archscry.css`, `assets/css/maze.css`, `assets/css/atmosphere.css`
- `assets/js/shared/vm-rich-atmosphere.js`
- Guide HTML/CSS and focused static/browser validators
- owner-provided screenshot, treated as visual evidence only

## Files changed

- `guide/index.html`
- `assets/css/guide.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/guide-browser-smoke.mjs`
- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/kanban/board.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/2026-08-31-0758-codex-vm614-field-guide-owner-review.md`
- `docs/handoffs/2026-08-31-0849-codex-vm614-owner-visual-remediation.md`
- this handoff and `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Restored the same `background-vox-gateway-clean-13.webp` used by the live reference routes.
- Added the `vm-guide-route` and `data-vm-atmosphere="rich"` route contract, replaced the inert star
  element with the shared canvas, and loaded `vm-rich-atmosphere.js`.
- Rebuilt the Guide as one Archscry/Maze-style command deck: introduction on the left, three compact
  decision controls on the right, with Archscry receiving selected/primary emphasis.
- Applied the reference routes' dark blue-black base, pointer-aware vignette, dense rounded glass,
  compact borders/controls, and gold/teal hierarchy through the map and continuation surfaces.
- Removed a duplicate topbar offset that had placed the Guide's primary surface 130px too low.
- Replaced the false Apocrypha-derived regression rule with live-product contract checks.

## Why it changed

The prior remediation inferred a generic current aesthetic from Apocrypha. The owner clarified that
Archscry and the Maze are the required UI references. Live inspection proved that both use a different
background/runtime contract and a denser application-command composition.

## Decisions made

- Treat the second note as a continuation of the same objective VM-614 visual-authority defect.
- Use live Archscry/Maze structure and computed behavior as authority rather than visual resemblance.
- Reuse only the shared atmosphere runtime; do not import specialist Archscry/Maze state or query JS.
- Keep the content hierarchy, links, map meaning, navigation, and accessibility semantics unchanged.
- Mark the Apocrypha-derived remediation as superseded rather than preserving its false invariant.

## Risks / uncertainties

- Final visual acceptance remains the owner's judgment.
- Guide intentionally shares the product shell and atmosphere but not specialist route behavior.
- The rich atmosphere uses randomized stars/orbs; deterministic tests verify initialization and contract,
  while rendered inspection judges the actual visual result.

## Tests run

- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `npm.cmd run test:route-metadata`
- PASS `npm.cmd run test:copy-boundaries`
- PASS `npm.cmd run test:guide-browser`
- PASS `git diff --check`
- PASS in-app live comparison of Archscry, Maze, and Guide at desktop
- PASS in-app Guide review at 390 x 844 with no horizontal overflow
- PASS primary Guide action click-through to Archscry with Archscry active navigation
- CPU-heavy Placement/dossier/all-identity/recovery suites: NOT REQUIRED; protected behavior did not change

## Not touched

- Archscry HTML, CSS, reading/state/result/dossier behavior, or content
- Maze HTML, CSS, parsing/query/mode/results/persistence behavior, or content
- shared CSS/tokens/topbar/runtime files
- Home Guide treatment during this remediation
- Placement, telemetry, Strategium, Apocrypha sources, or `/library/` behavior
- `/guide/reading/`, `/guide/maze/`, `/guide/reference/`, VM-615, VM-616, or VM-617

## Follow-up recommendations

- Owner reviews only the current desktop and mobile convergence witnesses.
- Do not use the original or Apocrypha-derived screenshots as acceptance evidence.
- Do not commit, push, open a PR, merge, or begin a later Guide card without owner disposition.

## Next suggested agent

Owner Review; return any bounded remaining VM-614 finding to Codex.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`

## RobDev / RobQA transfer

- **QA tier:** QA-3 because the existing navigation change remains in candidate scope; this remediation
  itself is visible presentation plus one shared atmosphere runtime hookup.
- **Outcome:** Guide is an orientation command surface in the same product family as Archscry and Maze.
- **Owner/producer:** accepted VM-613 content contract; authored Guide HTML/CSS; shared atmosphere runtime.
- **Changed behavior:** Guide-only background, atmosphere canvas, layout, and presentation.
- **Protected behavior:** all content, routes, state, persistence, specialist semantics, and shared runtime.
- **Consumers/states:** Guide desktop/mobile visitors, keyboard focus, reduced motion, anchor navigation,
  390px containment, and 200% zoom equivalent.
- **Manual finding:** background, CSS, and JS did not match Archscry/Maze.
- **Systemic invariant:** Guide must use their gateway/rich-atmosphere contract and keep its compact choices
  inside a two-column desktop command deck near the topbar.
- **Rendered evidence:** current desktop and 390px witness paths are recorded in the QA document.
- **Disposition:** **RobQA READY - renewed Owner Review required**.

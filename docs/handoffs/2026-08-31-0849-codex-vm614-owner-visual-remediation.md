# VM-614 Owner Visual Finding Remediation Handoff

**Status: SUPERSEDED / REJECTED by the subsequent owner finding.** This handoff preserves the first
remediation attempt as history; it is not current implementation authority or acceptance evidence. See
`2026-08-31-0953-codex-vm614-archscry-maze-convergence.md`.

## Agent name

Codex

## Task requested

Investigate and repair the owner's finding that the new Guide looked ancient and unpolished because of a
soap-bubble background and a generic square-card layout. Keep VM-614 in Owner Review and do not begin any
later Guide card.

## Files reviewed

- repo-local RobDev and RobQA skills, usage guides, and frozen gates
- the VM-614 card, QA record, implementation handoff, Guide HTML/CSS, and focused validators
- current accepted Strategium, Apocrypha, and Maze route-local visual systems
- repository-owned background assets and prior rendered VM-614 evidence

## Files changed

- `guide/index.html`
- `assets/css/guide.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/guide-browser-smoke.mjs`
- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/2026-08-31-0758-codex-vm614-field-guide-owner-review.md`
- this handoff and `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Replaced the legacy gateway/radar background with the existing current codex atmosphere.
- Rebuilt the route-local visual composition around a rounded glass hero and an asymmetric decision grid:
  Archscry is the lead path, with card finding and product orientation as a supporting stack.
- Replaced clipped gold slabs with restrained rounded actions and carried the rounded framed language
  through the map and continuation surface.
- Added Guide-only source and computed-style regression checks for the real owner finding.
- Removed a decorative desktop marker at the mobile breakpoint after rendered self-QA found it colliding
  with the hero copy.

## Why it changed

The initial implementation reused an old Home gateway visual and generic shared panels without checking
them against current accepted route surfaces. That created the exact stale, bubble-like, square-card
presentation the owner identified.

## Decisions made

- Treat the finding as an objective visual-authority defect within VM-614, not as intended polish.
- Keep the repair in Guide HTML/CSS and focused validation; do not redesign Home or shared components.
- Preserve every accepted content, route, navigation, accessibility, and specialist-runtime contract.
- Reuse an existing repository asset and current route-local machinery; add no new art or framework.

## Risks / uncertainties

- Overall aesthetic acceptance remains an owner judgment.
- The large lead decision intentionally prioritizes Archscry while the copy still states that it is advice,
  not a prerequisite.
- The background asset is shared with a current codex-oriented surface, but Guide retains its own layout
  and functional orientation rather than copying specialist content.

## Tests run

- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run test:guide-browser`
- PASS `git diff --check`
- PASS fresh in-app rendered review at 1440 x 1000 and 390 x 844
- PASS mobile width equality (`scrollWidth === clientWidth === 390`) and desktop/mobile rounded hierarchy
- Remaining VM-614 deterministic suite rerun is recorded in the updated QA record.

## Not touched

- Guide copy, decision order, targets, map meaning, continuation order, or keyboard semantics
- Home layout/treatment during this remediation
- shared components, global tokens, or specialist route styling
- Placement, Archscry state/results/dossiers, Maze semantics/persistence, Strategium content, Apocrypha
  sources, telemetry, or `/library/` behavior
- VM-615, VM-616, or VM-617

## Follow-up recommendations

- Owner reviews the two fresh remediation witnesses and reports acceptance or a bounded remaining finding.
- Do not self-accept, commit, push, open a PR, merge, or begin a later Guide card.

## Next suggested agent

Owner Review; return any bounded visual finding to Codex within VM-614.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`

## RobDev / RobQA transfer

- **Outcome:** a current, intentional Guide front door without changing its accepted product structure.
- **Owner/producer:** VM-613 contract plus route-local authored Guide HTML/CSS.
- **Changed behavior:** Guide-only visual atmosphere and composition; focused regression coverage.
- **Protected behavior:** all content, navigation, accessibility, state, persistence, and specialist runtime.
- **Consumers/states:** desktop and mobile Guide visitors; 1440px, 390px, keyboard, reduced motion, and 200%
  zoom-equivalent states.
- **Systemic invariant:** current codex background, dominant desktop lead decision, rounded hero/decision/action
  surfaces; scoped only to `/guide/`.
- **Disposition:** **SUPERSEDED - the owner rejected this visual-authority choice**.

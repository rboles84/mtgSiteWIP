# VM-615 Reading and Dossier Onboarding — Owner Review Handoff

## Agent name

Codex

## Task requested

Implement VM-615 through focused validation and rendered Owner Review readiness, then stop uncommitted
without starting VM-616 or VM-617.

## Files reviewed

- VM-615 Owner brief and accepted VM-613/614/618 lifecycle records.
- `.agents/skills/robdev/` and `.agents/skills/robqa/` usage instructions and frozen governing passes.
- `docs/contracts/field-guide-onboarding-contract.md` and VM-613 onboarding maps/recon.
- Current Archscry landing, result, dossier directory, all major dossier panels, result state presentation,
  direct-review harness, fresh-session browser smoke, Guide shell/CSS, topbar, route validators, and focused
  browser/static tests.

## Files changed

- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/css/guide-reading.css`
- `assets/js/archscry/index.js`
- `assets/js/archscry/runtime/actions.js`
- `assets/js/archscry/runtime/boot.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/runtime/interview.js`
- `assets/js/archscry/runtime/questionnaire.js`
- `guide/reading/index.html`
- `package.json`
- `scripts/check-route-metadata.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm615-reading-dossier-onboarding-tests.mjs`
- `scripts/vm615-reading-guide-browser.mjs`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-615-reading-dossier-onboarding.md`
- `docs/qa/2026-08-31-vm615-reading-dossier-owner-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-31-2359-codex-vm615-reading-dossier-owner-review.md`

Rendered witnesses were generated under `outputs/owner-review/vm615-reading-dossier/`.

## What changed

- Added one compact, keyboard-operable dossier decision map that routes four common goals through the
  existing dossier panel actions.
- Added the single canonical `How to read your dossier →` invitation at the dossier directory.
- Added one concise non-ranking clarification to Commander Browsing Starts.
- Added optional `/guide/reading/` depth with bounded Placement language, a three-step relationship,
  ordinary-player starting intents, a neutral dossier anatomy specimen, and two small continuation actions.
- Added route metadata, validator ownership, cache-bound Archscry module delivery, static regression, and
  focused browser regression with compact witnesses.

## Why it changed

VM-614 already teaches what Archscry is. VM-615 needed to solve the post-reading friction—what the result
means and where to begin—without making the Guide mandatory or rewriting the dossier.

## RobDev packet

- **Outcome:** a player with a result can choose one useful dossier question immediately and optionally ask
  for a concise anatomy explanation.
- **Owning producer:** `renderResult()` owns the contextual dossier orientation; authored
  `guide/reading/index.html` owns optional depth.
- **Reused machinery:** current dossier panel IDs/actions, accepted Guide/Maze shell, VM-618 topbar, current
  result-state copy, certified placement witnesses, and local direct-review route.
- **Changed behavior:** presentation/navigation only; one nested public route.
- **Protected behavior:** all Placement/identity/recommendation semantics, questionnaire, alternatives,
  persistence/account/telemetry, Maze, Strategium, Apocrypha, `/library/`.
- **Risks controlled:** no fake result, no score/method internals, no mandatory Guide, no horizontal overflow,
  no mobile desktop-diagram compression, and exact current section labels.
- **Smallest complete implementation:** one dossier treatment, one optional page, one browsing clarification,
  route ownership, and focused tests.
- **Non-goals/stop:** no Guide landing expansion, new recommendation, new result state, `/guide/maze/`,
  `/guide/reference/`, VM-616/617, commit, push, PR, merge, or self-acceptance.

## Decisions made

- Result copy is **NO CHANGE** because the current primary/close/legacy banners already set the expectation
  truthfully and remain outcome-first.
- Start Here, Why This Fits, Card Signals, Mana Notes, Maze Discovery, and identity-specific content are
  **NO CHANGE**.
- Commander Browsing Starts needed one sentence to prevent a ranking interpretation; logic/order/data are
  unchanged.
- Direct-review Yore intentionally omits the production-result orientation because it has no actual
  Placement result; its bounded dossier remains unchanged.

## Risks / uncertainties

- Complete fresh-user onboarding validation remains limited by the reproduced accepted-main
  `test:browser-smoke` timeout after storage reset during the first answer/progress transition.
- The legacy dossier follow-up test has an unrelated accepted-main copy expectation failure.
- The VM-618 topbar screenshot runner encountered a locked prior artifact; nested Guide current/mobile
  behavior is independently covered by the passing VM-615 browser test.

## Tests run

PASS: HTML lint, JS lint, frontend smoke, route metadata, copy boundaries, VM-615 static regression,
VM-615 browser regression, accepted Guide browser regression, in-app desktop primary journey,
deep-link/Back/Forward/refresh, certified Jund close-result desktop/mobile, direct Yore review, reduced
motion, keyboard focus/activation, zoom-equivalent reflow, and `git diff --check`.

Known/independent failures: fresh-session `test:browser-smoke`; locked-artifact `test:topbar-browser`;
accepted-main legacy assertion in `archscry-dossier-followup-tests.js`.

## Not touched

Questionnaire/Placement semantics; scoring/evidence/ranking/qualification/stopping; identities/dossier data;
recommendation order; Maze modes/query/Reading Finds/return behavior; persistence/account/telemetry;
Strategium; Apocrypha; `/library/`; Guide landing; `/guide/maze/`; `/guide/reference/`; VM-616; VM-617.

## Follow-up recommendations

Owner should judge only the five requested product questions. If accepted later, close through the normal
exact-candidate/lifecycle pattern; address the fresh-session harness gap only under its proper owner.

## Next suggested agent

Owner review, then Codex lifecycle closeout only after explicit acceptance.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-615-reading-dossier-onboarding.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`
- `docs/qa/2026-08-31-vm615-reading-dossier-owner-review.md`

## Owner Review correction — 2026-09-01

- Applied only the two authorized semantic-copy corrections in `guide/reading/index.html`: `Your result…`
  in the hero and `The direction those answers support` in the supported-direction specimen.
- Verified the existing skip link is hidden during normal load, visible on keyboard focus, functional, and
  lands focus on `#reading-guide-main` below the sticky topbar. No product/CSS repair was required.
- Extended only the focused VM-615 static/browser regressions and refreshed the existing desktop/mobile
  witnesses. The desktop witness now represents normal page-load state rather than the test's focused state.
- PASS: `lint:html`, `test:copy-boundaries`, `test:reading-guide`, `test:reading-guide-browser`, desktop/mobile
  rendered sanity, and `git diff --check`.
- No other product/runtime change; no commit, push, PR, merge, VM-616, or VM-617.

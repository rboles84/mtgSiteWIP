# VM-620 Shared Field Guide Beacon — Owner Review Handoff

- **Agent:** Codex
- **Task requested:** Create and execute VM-620 from accepted `main`, inventory all user-facing Guide links/actions, implement only the approved shared contextual-help language, complete focused rendered RobQA, and stop at Owner Review without commit, push, merge, Driver expansion, VM-617 work, or changes to accepted Owner Review output directories.
- **Related card:** `docs/kanban/in-progress/VM-620-shared-field-guide-beacon-visual-language.md`
- **Branch / baseline:** `codex/vm-620-shared-guide-beacon` from `9c572edb0232161c860ea199a508a73f99a5d6fd`
- **Gates:** repo-local `robdev` and `robqa`; frozen `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`

## Files reviewed

- Required workflow authorities, RobDev/RobQA skills and frozen gates, handoff index, board, VM-620 card, and accepted Field Guide contract.
- Accepted VM-615, VM-616, VM-618, and VM-619 cards, reports, QA records, and closeout handoffs.
- Every runtime HTML/JS occurrence leading to `/guide/`, `/guide/reading/`, and `/guide/maze/`, plus the generated mobile Guide navigation owner.
- Home, certified Jund close-result dossier, weak Maze translation, direct static Maze Guide, shared motion/topbar owners, and relevant browser/static harnesses.
- All six final VM-620 desktop/mobile witnesses.

## Files changed

- Runtime integration: `index.html`, `archscry/index.html`, `maze/index.html`.
- Shared component: `assets/css/guide-beacon.css`, `assets/js/shared/guide-beacon.js`.
- Route-local cleanup: `assets/css/home.css`, `assets/css/archscry.css`, `assets/css/maze.css`, `assets/js/maze/research-ui.js`, `assets/js/maze/research-init.js`, `assets/js/archscry/runtime/dossier-view.js`.
- Archscry cache-key owners: `assets/js/archscry/index.js`, `runtime/actions.js`, `boot.js`, `dev-review.js`, `interview.js`, `questionnaire.js`.
- Validation: `package.json`, `scripts/validate-frontend-html.mjs`, `scripts/vm620-guide-beacon-tests.mjs`, `scripts/vm620-guide-beacon-browser.mjs`, and bounded compatibility changes in the VM-615/616/619 and topbar harnesses.
- Governance/evidence: VM-620 card move/update, `docs/kanban/board.md`, inventory report, Owner Review QA report, this handoff, and `docs/handoffs/HANDOFF_INDEX.md`.
- New untracked evidence only: `outputs/vm620-owner-review/`.

## What changed

- Exactly three contextual invitations—Home orientation, Archscry dossier reading help, and Maze search help—now share a rune, `FIELD GUIDE` eyebrow, bounded surface, quiet/interaction states, and route-sized variants.
- One finite 4.8-second three-beat signal begins only at meaningful visibility, reserves a stable logical ID once per page visit, survives dynamic node replacement without replay, and settles on pointer/mouse entry or keyboard focus.
- Both motion preferences produce the same strong static affordance. Without JS or IntersectionObserver, links remain ordinary working anchors.
- Removed superseded route-local Beacon animations/styles while retaining route-local layout placement.
- Added focused static/browser contracts and redirected accepted legacy witness writers into VM-620's evidence tree through an optional environment override whose default is unchanged.

## Why it changed

The accepted Maze treatment established a recognizable optional-help pattern, but Home and the dossier used unrelated low-salience links. VM-620 needed recognition across those legitimate contextual surfaces without elevating all Guide navigation, flattening product hierarchy, or implying guided reading outside Maze.

## RobDev compact packet

- **Owning authority:** VM-620 Owner execution brief and accepted Field Guide contract; VM-615/616/618/619 remain controlling protected authorities.
- **Producer:** shared CSS/JS component with route-owned anchor semantics and stable IDs.
- **Consumers:** only Home, Archscry dossier orientation, and Maze Query Inspector.
- **Changed behavior:** visual recognition and finite attention lifecycle.
- **Protected behavior:** product actions, dossier decisions/tabs, Maze recovery/query/history/Finds, utility/mobile navigation, Guide documents, VM-619 Driver lifecycle, Placement, persistence, account, and telemetry.
- **Smallest complete implementation:** two dependency-free shared assets, three route integrations, old local style removal, exact inventory, focused tests, six witnesses.
- **Non-goals:** no new Guide route, guided parameter, Driver config/vendor change, persistence, analytics, framework, semantic producer, data, VM-617, or generalized help registry.
- **Stop condition:** Owner Review Ready with deterministic validation and rendered evidence; no acceptance or git publication.

## Decisions made

- Navigation is never inferred from the word “Guide”; only current-task help is eligible.
- Home uses an entry variant outside the four-card grid; dossier uses a compact fifth-independent-help presentation, not a decision; Maze stays the reference variant.
- `IntersectionObserver` at 55% visibility is the smallest correct trigger; `MutationObserver` is limited to late-rendered eligible nodes.
- A module-local stable-ID `Set` is sufficient page-visit state and intentionally does not persist.
- Shared assets load only on affected routes. Driver remains separately lazy and Maze-only.

## Risks / uncertainties

- Final noticeability, magical-signal taste, and cross-route family coherence remain Owner product judgments.
- VoiceOver/Safari was not available; no VM-619 accessibility disposition was changed.
- Cache keys changed for affected route CSS/module owners to prevent accepted stale route-local Beacon rules from surviving deployment.

## Tests run

- PASS: HTML/JS lint, copy boundaries, route metadata, frontend smoke.
- PASS: Guide and topbar browser checks.
- PASS: VM-615 static/browser, VM-616 static/browser, VM-619 static/browser.
- PASS: VM-620 static/browser, including no-JS, reduced motion, 390px, 200%-equivalent reflow, rerender/no replay, and direct static Maze Guide.
- PASS: `git diff --check`.
- PASS: accepted Driver.js 1.8.0 hashes unchanged.
- SKIP: unrelated Placement/SIRF/parser calibration and exhaustive suites; no protected semantic/data producer changed.

## Not touched

- Driver.js vendor bytes/license and four-step configuration.
- `/guide/reading/` content and behavior.
- Direct `/guide/maze/` static behavior.
- Placement, parser/search semantics, generated/canonical data, account, persistence, telemetry.
- VM-617.
- Existing untracked `outputs/owner-review/`, `outputs/vm616-owner-review/`, and `outputs/vm619-owner-review/`.
- No commit, push, merge, PR, or self-acceptance.

## Follow-up recommendations

- Owner should review only the five product-judgment questions and six restrained witnesses recorded in `docs/qa/2026-09-01-vm620-guide-beacon-owner-review.md`.
- If findings are accepted, bind the exact reviewed candidate in a separate Owner-authorized closeout; otherwise convert the specific visual finding into the narrowest regression before remediation.

- **Next suggested agent:** Owner review, then a bounded lifecycle closeout only after explicit acceptance.

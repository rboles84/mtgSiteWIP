# VM-621 Guided-Reading Expansion — Handoff

Current-status correction (2026-09-02): the historical required/pending NVDA gate below is superseded by the
Owner decision. Real screen-reader validation: NOT PERFORMED, optional future audit, not a review blocker.
Owner keyboard/mechanical/visual and final Home copy checks passed; strengthened browser reruns now pass.
See `docs/qa/2026-09-02-vm620-vm621-combined-owner-review.md` for current Owner Review Ready disposition.
The remainder preserves the original execution history, not current pending work or final acceptance.

- Agent: Codex.
- Task: preserve VM-620 visuals, record the Owner promise mismatch, verify/register the next free card, recon
  and implement Home/Reading guided configurations if the accepted helper fits.
- Branch/base: existing `codex/vm-620-shared-guide-beacon` at
  `9c572edb0232161c860ea199a508a73f99a5d6fd`; no new branch/worktree or publication.
- Gates: repo-local `robdev` / `robqa`; frozen `docs/dev/RobDevPass.md` / `docs/qa/RobQAPass.md`.
- Disposition: implementation complete; Owner Review Pending — visual/NVDA and strengthened browser rerun
  remain pending. No full RobQAPass READY/PASS or Owner acceptance claimed.

## Files reviewed

Required skills/gates, handoff index, board, relevant VM-613–620 cards/decisions/handoffs; VM-620 inventory;
both static Guides; accepted Maze config/theme/shared helper/vendor; Home/dossier Beacon producers; existing
VM-615/619/620 tests; VM-621 preflight/card; final runtime diffs and rendered desktop flows.

## Files changed in this follow-up

- Runtime: `index.html`, `assets/js/archscry/runtime/dossier-view.js`, `guide/index.html`,
  `guide/reading/index.html`, `assets/css/guide-walkthrough.css`.
- Added: `assets/js/guide/intro-walkthrough.js`, `assets/js/guide/reading-walkthrough.js`,
  `scripts/vm621-guide-walkthrough-tests.mjs`, `scripts/vm621-guide-walkthrough-browser.mjs`.
- Test integration: `package.json`, `scripts/lint-frontend-js.mjs`, `scripts/validate-frontend-html.mjs`,
  `scripts/frontend-smoke.mjs`, VM-615 static/browser and VM-620 static/browser scripts.
- Governance: VM-621 card/preflight/QA, VM-620 card/QA/inventory, board, this handoff and index.
- Earlier VM-620 changes remain and are enumerated in its 22:26 handoff; they were not reverted.

## RobDev compact packet / what and why

- Owner Option 1/VM-621 owns interaction; static Guide content owns teaching meaning; VM-620 owns signaling.
- Verified VM-621 was free. One related branch/worktree existed; continue it with separate cards and one
  complete later integration, rather than split the unintegrated initiative.
- Home uses `/guide/?guided=vox-mana-intro`; dossier uses `/guide/reading/?guided=dossier-reading`. Each has
  four short route-owned steps over existing content and returns to its ordinary Guide.
- Existing machinery: unchanged shared walkthrough helper, accepted theme/lifecycle and local Driver 1.8.0.
  New section IDs/focus attrs and two quiet H1 selectors are the only static HTML/CSS accommodation.
- Consumers: Home/Main Guide and dossier/Reading Guide. Maze remains the protected reference.
- Protected: Guide/dossier/Placement meaning, VM-619 helper/config/vendor, direct static routes, VM-620 signal,
  navigation/query/Finds, storage, telemetry/account state, VM-617 and three existing review output directories.
- Non-goals/stop conditions: no auto-tour, progress, persistence, new framework, semantic expansion,
  generalized helper, extra branch or publication. No architecture conflict was found.

## RobQA evidence / risks

- QA-3 navigation/state transitions plus QA-2 focus/accessibility. CPU-heavy validation: NOT REQUIRED.
- PASS: final HTML/JS lint (36 JS files), copy boundaries, route metadata, frontend smoke, VM-615 static,
  VM-619 static/lifecycle/vendor hashes, VM-620 static, VM-621 static, `git diff --check`.
- PASS: initial VM-621 browser suite on current runtime independently exercised both routes and real Home/
  certified-dossier Beacon clicks, keyboard, focus/cleanup, fallback, mobile/reflow, motion and history.
- Later test-only strengthening covers Shift+Tab, exact tabindex restoration, Home specimen buttons and Vox
  motion-at-startup. Reruns of VM-621/VM-619 failed at Chromium launch before page creation, including an
  approved outside-sandbox retry. Added assertions are not claimed as executed. No product change compensated
  for the environment failure; no VM-621 PNG witnesses were produced.
- In-app desktop self-QA read/clicked both complete flows: forward focus, route-specific copy, bounded
  popovers and quiet H1/static-URL completion. Owner volunteered for visual testing; probing stopped. Focused
  Windows NVDA remains required for both. No acceptance inferred.
- Owner finding invariant: actual Beacon click must launch its matching first guided step, not silently drop
  into documentation. Static red-before-green and the passing source-click browser cases record it.
- Skipped: unrelated Placement/SIRF/parser and exhaustive semantic/journey/mutation/synthetic suites; no
  protected producer changed. Other legacy browser reruns stopped after the environment limitation.

## Not touched / final state

- Shared helper, Maze config/page, vendor JS/CSS/license/hashes unchanged from base. Static Guide semantic
  text unchanged; only IDs/focus attrs/adapter scripts changed. VM-619 remains Done — Owner Accepted.
- VM-617 unstarted; `/guide/reference/` absent. Three existing Owner Review directories remain untracked.
- Worktree intentionally dirty with combined VM-620/621 code/docs/tests. No staging, commit, push, PR or merge.
  HEAD, main and origin/main remain the base SHA above.
- Local review server: `http://127.0.0.1:8765/`, session 82601, left available for Owner review.

## Follow-up / next suggested agent

Owner: perform the short visual/product and Windows NVDA review. Codex: address concrete findings, rerun the
strengthened focused browser checks when Chromium launch works, and bind a candidate only with explicit
authorization. Keep VM-620/621 unaccepted and unmerged until both gates finish.

Related: `docs/kanban/in-progress/VM-621-contextual-field-guide-guided-reading-expansion.md`,
`docs/reports/2026-09-01-vm621-guided-reading-expansion-preflight.md`,
`docs/qa/2026-09-01-vm621-guided-reading-owner-review.md`, VM-620 card and 22:26 handoff.

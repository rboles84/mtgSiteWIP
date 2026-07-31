# VM-552 Strategium QA-driven remediation and retest

## Agent name

Codex

## Task requested

Remediate the controlling defects from the completed Strategium lifecycle automated QA run, retest the exact candidate, update the workbook and owner set, and stop before owner acceptance or independent review.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-31-0818-codex-vm552-strategium-automated-qa.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-552-strategium-game-lifecycle-completion-mvp.md`
- `docs/qa/strategium-game-lifecycle-mvp.md`
- `docs/qa/Strategium_Game_Lifecycle_Human_QA_Workbook.xlsx`
- Existing first-run evidence under `docs/qa/evidence/`
- Lifecycle implementation, focused lifecycle tests, review tests, metadata/smoke tests, and full repository test configuration

## Files changed

- Product implementation: `assets/js/strategium-lifecycle.js`
- Focused regression coverage: `scripts/strategium-lifecycle-tests.mjs`
- Retest evidence: `docs/qa/evidence/retest-01/`
- Workbook: `docs/qa/Strategium_Game_Lifecycle_Human_QA_Workbook.xlsx`
- QA documentation: `docs/qa/strategium-game-lifecycle-mvp.md`
- Kanban record: `docs/kanban/in-progress/VM-552-strategium-game-lifecycle-completion-mvp.md`
- This handoff and `docs/handoffs/HANDOFF_INDEX.md`

## What changed

The implementation now uses structured Before-the-Game sentence composition and a canonical disclosure catalog, preserving all selected disclosures through evaluator, result, spoken, and copied text. During-the-Game uses a canonical response catalog for all offered response IDs. Invalid, incomplete, malformed, and extra state displays a visible polite recovery notice. The final agreement step uses the named primary `Build my pregame statement` action and reaches the result directly. Focused tests cover the complete 1,935,360 Before-the-Game output space and all 48 During-the-Game moment/response pairs.

## Why it changed

The first-run QA evidence controlled remediation: every generated statement used semicolon-chain construction, disclosure selections could disappear, all 48 During-the-Game pairs fell back to generic copy, invalid state recovered silently, and the final action was an ambiguous Continue. The first-run evidence was preserved before product edits in QA-baseline commit `953a9052d2b056ed39051f11e247938fa60555d4`.

## Decisions made

- Failed baseline implementation SHA: `6f807816a81ca347cbd180a8c1ab413df84dce69`.
- QA-baseline evidence commit: `953a9052d2b056ed39051f11e247938fa60555d4`.
- Remediated implementation commit tested: `84a458aa7b2c14db6184fc0b11271cbfeb7ed9b0`.
- Workbook stores the implementation SHA actually tested, not the later commit that embeds the retest workbook and docs.
- The 15 existing subjective rows remain `Owner Review Required`; objective visual mechanics are recorded without treating visual/editorial acceptance as automated Pass.
- Direct repository Puppeteer/Edge validation resolved the first-run keyboard harness limitation; no product change was made solely to accommodate the in-app automation binding.

## Risks / uncertainties

- Owner visual, editorial, tone, reduced-motion, and physical review remain open and are not certified by this retest.
- The local browser evidence uses headless Microsoft Edge through the repository’s Puppeteer dependency; the owner checklist remains the gate for human visual judgment.
- Full repository tests require the known temporary ignored Scryfall fixture; it was removed after the run and no fixture is part of the candidate changes.

## Tests run

- `npm.cmd run test:strategium-lifecycle` — passed; 1,935,360 statements, 48 During-the-Game pairs, route/history/recovery/copy/final-action/viewport checks.
- `npm.cmd run test:strategium-review` — passed; 24 paths, 15 results, shared lessons, Console deep links, dialog accessibility, URL recovery, history, focus, and feedback.
- `npm.cmd run lint:js` — passed.
- `npm.cmd run lint:html` — passed.
- `npm.cmd run test:copy-boundaries` — passed.
- `npm.cmd run test:route-metadata` — passed.
- `npm.cmd run test:frontend-smoke` — passed.
- `npm.cmd run test:parser` — passed, 226 cases.
- `npm.cmd run test:browser-smoke` — passed.
- `npm.cmd test` — passed, exit 0, with the temporary ignored fixture supplied and removed afterward.
- Direct retest evidence runner — passed; 1,200 Finding-a-Table combinations, 1,935,360 Before-the-Game combinations, 48 During-the-Game pairs, zero console errors, failed requests, viewport overflow, unnamed controls, fallback pairs, or safety violations.
- Workbook artifact-tool verification — passed; seven expected sheets, no missing executable actual/evidence cells, allowed statuses only, zero formula errors.

## Not touched

- Control repository product files
- `main` or `origin/main`
- Push, merge, deployment, integration, certification, or VM-551
- First-run QA evidence under `docs/qa/evidence/`
- Unrelated product routes, styles, data, or generated audit reports after restoring the two full-suite report byproducts

## Follow-up recommendations

The next gate is owner execution of `docs/qa/strategium-lifecycle-owner-acceptance-checklist.md` against the exact final candidate SHA. The owner should record Pass/Fail and notes for the 15 subjective rows only. Independent review is not authorized until the owner explicitly approves that exact SHA.

## Next suggested agent

Owner, for subjective acceptance only. After explicit owner approval, an independently authorized reviewer may inspect the exact approved SHA under the project’s review gates.

## Related Kanban card, docs, or plans

- `VM-552` in `docs/kanban/in-progress/VM-552-strategium-game-lifecycle-completion-mvp.md`
- `docs/qa/strategium-game-lifecycle-mvp.md`
- `docs/qa/Strategium_Game_Lifecycle_Human_QA_Workbook.xlsx`
- `docs/qa/strategium-lifecycle-owner-acceptance-checklist.md`
- `docs/qa/evidence/retest-01/`

# VM-586 Archscry Current-State Evidence — RobDev Handoff

- Agent name: Codex
- Task requested: Execute the owner-attached Archscry current-state evidence and red-team goal end to end from accepted baseline `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`, automate all 37 dossier and engine cases, generate both workbooks and all evidence, reconcile actual sources, create the bounded owner queue, and advance only after RobDev self-QA and independent RobQA.
- Related work: VM-586; VM-579 direct review/engine validation; VM-551 current all-37 witnesses and engine reports.
- Branch: `codex/vm586-archscry-current-state-evidence`
- Review state: RobDev self-QA passed; exact candidate commit and independent RobQA are next.

## Files Reviewed

- Owner-provided `C:\Users\obake\Downloads\archscry-current-state-evidence-red-team-one-go-goal.md`
- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md`, recent VM-579 and VM-551 handoffs, `docs/kanban/board.md`, and related cards/plans
- `data/identity-layers.json`, `data/gate-b1-placement-model.json`
- `docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json`
- `scripts/build-vm551-all-37-live-witnesses.mjs`, `scripts/vm551-all-37-live-ui-replay.mjs`
- `assets/js/archscry/gate-b1-placement-engine.js` and current VM-579 review seams
- Relevant historical red-team, exact-authority, architecture, lens, player-validation, and current engine report sources listed in `docs/audits/archscry-current-state-2026-08-22/reconciliation/red-team-source-inventory.md`
- Workspace spreadsheet skill, artifact-tool API/style requirements, and browser-control skill/local-development guidance

## Files Changed

- `.gitignore`
- `package.json`
- `scripts/audit/archscry-current-state.mjs`
- `scripts/audit/archscry-red-team-reconciliation.mjs`
- `scripts/audit/build-archscry-current-state-workbooks.mjs`
- `scripts/audit/build-workbook-preview-contact-sheets.py`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `docs/audits/archscry-current-state-2026-08-22/**`
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/archscry-dossier-review.xlsx`
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/archscry-engine-validation.xlsx`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Added a baseline-gated, resume-safe orchestrator that discovers the 37 identities from current authority, drives the real VM-579 direct-review controls, extracts structured and complete rendered content, captures 37 screenshots and raw records, replays the current legitimate witness inventory through production engine exports, and writes 37 detailed traces plus compact matrices and exception reports.
- Added a checksummed red-team source inventory and rerunnable reconciliation producing 16 current dispositions and a seven-decision owner queue.
- Added two artifact-tool-only workbooks with 42 sheets each. Both are formula-inspected, exported/re-imported, and rendered into 84 visual previews.
- Added a Python/Pillow contact-sheet helper used only for preview QA; it does not author or modify workbooks.
- Added an opt-in `--engine-only` mode to the existing VM-551 live UI replay so representative current-engine integration can stop before unrelated legacy dossier/card-hover assertions. Default harness behavior is unchanged.
- Preserved large repeatable screenshots/raw HTML/traces/previews locally under the task output evidence directory and checksum-bound them from committed summaries/manifests. The two compact review workbooks remain versioned outputs.

## Why It Changed

The owner explicitly required the repetitive 37-by-37 collection and current-source reconciliation to be automated, with owner work reduced to bounded product judgment. Existing VM-579 and VM-551 machinery exposed the correct seams but did not produce one current evidence packet, detailed traces, workbooks, reconciliation, or review queue.

## RobDev Compact Packet

- Owning authority: current rendered product for dossiers; `data/identity-layers.json` for identity discovery/order; current production placement engine plus the current-compatible witness artifact for engine evidence; exact audit/design/report sources for red-team claims.
- Producer: new audit scripts consume existing production/review seams; `@oai/artifact-tool` alone produces `.xlsx` artifacts.
- Changed behavior: audit and QA tooling/artifacts only.
- Protected behavior: runtime UI, dossier composition/content, placement and questionnaire semantics, mappings, identity data, telemetry, persistence, product-generated data, Scryfall authority, deployment, and VM-578.
- Consumer impact: owner/independent review receives deterministic records, workbooks, screenshots, traces, exception ledgers, and a bounded queue. Production consumers are unaffected.
- Risks addressed: direct-review/reachability conflation, stale/incompatible witnesses, expected-result injection, historical finding drift, workbook density/formula errors, and sandbox media false positives.
- Smallest complete implementation: one orchestrator, one source reconciliation generator, one artifact-tool workbook generator, one visual contact-sheet helper, and one opt-in live-engine sample mode.
- Non-goals: product remediation, scoring/question/mapping redesign, new self-report or quiz modes, red-team fixes, empirical validation, deployment, exhaustive certification, or VM-578 work.
- Stop conditions: no product runtime mutation, forced identity, fabricated witness, parallel renderer/engine, or mixed product baseline was required.

## Decisions Made

- Direct dossier evidence remains `DIRECT_DOSSIER_REVIEW` / `NOT_ASSERTED`; engine evidence is a separate seam with its own audit IDs and trace hashes.
- Expected identity is used only after engine replay as an assertion.
- Yore's current no-result is preserved as the approved bounded behavior; it is not converted into a fake pass or defect.
- Sandbox-blocked optional Scryfall media produces one note per identity and no blocker/major/minor product exception.
- Historical defects are hypotheses, not current truth. Current dispositions are 9 disproven, 3 needing player data, 2 product-design boundaries, 1 confirmed provenance gap, and 1 unclear current sensitivity claim.
- Workbooks are review views, not product sources of truth. Full evidence remains JSON/trace/screenshot based.
- The in-app browser caught lowercase Maze provider normalization in the workbook summary; it was fixed and both workbooks were regenerated and revalidated.

## Risks / Uncertainties

- Mapping accuracy, player comprehension, ordinary-player outcome distribution, and neighbor confusion remain unvalidated without player data.
- The result surface still lacks a user-facing exact provenance manifest; audit hashes mitigate review reproducibility only.
- Current representative mutation checks pass, but VM-586 did not recreate the superseded engine's historical 44,005 exhaustive comparison universe.
- Optional card images were unavailable in the screenshot collection sandbox; local hero art and complete text/layout remained available, and the in-app browser sample rendered current local art correctly.
- Two legacy baseline-only assertions remain outside scope: a stale `.has(...)` source regex in the dossier-integrity test and a broader rationale-hover cleanup assertion in the default full-surface replay. The changed engine-only path and all task-owned checks pass.

## Tests Run

- PASS: Node syntax checks for all three audit `.mjs` files.
- PASS: Python compile check for the contact-sheet helper.
- PASS: `node scripts/audit/archscry-current-state.mjs --allow-candidate`.
- PASS: `npm.cmd run audit:archscry-red-team-reconciliation`.
- PASS: `npm.cmd run audit:archscry-current-state-workbooks`.
- PASS: artifact-tool export/import/inspect/formula scan and render of all 84 workbook sheets.
- PASS: `npm.cmd run test:placement`.
- PASS: `npm.cmd run test:vm551-all-37-witnesses`.
- PASS: `npm.cmd run test:dev-review`.
- PASS: `npm.cmd run test:vm586-live-ui-samples` for Green, Jund, Lorehold, Witch, Yore, Colorless, and WUBRG.
- PASS: in-app browser direct-review comparison for White, House Dimir, Lorehold, Bant, Abzan, Dune, Colorless, and WUBRG after workbook correction.
- BASELINE-ONLY FAIL: `npm.cmd run test:vm551-dossier-integrity`; static regex expects `.has(...)`, unchanged current baseline runtime uses target-aware `.get(...)`.
- BASELINE-ONLY FAIL: default full-surface Green replay reaches the current result but fails an unrelated rationale-card hover cleanup assertion; the bounded task-owned engine-only mode passes.

## Not Touched

- No runtime product file under `assets/`, no product HTML/CSS, no canonical or generated `data/`, no placement/question/mapping/identity content, no telemetry/persistence/deployment, no Scryfall authority, and no VM-578 corpus content.

## Follow-Up Recommendations

1. Commit the exact candidate and give its SHA to a fresh independent RobQA agent.
2. Independent RobQA should rerun the narrow deterministic commands, inspect workbook formulas/sheets and representative previews, verify the eight/five owner queue is bounded, and compare the exact candidate to baseline for product-runtime absence.
3. If independent RobQA passes, move VM-586 to Done and hand only the bounded queue to the owner.
4. Any future empirical claim requires separate authorization for the existing player-validation protocol.
5. The two legacy baseline-only assertion drifts may receive their own focused maintenance card if the owner wants them restored; they do not belong in VM-586.

## Next Suggested Agent

Independent RobQA reviewer on the exact candidate SHA, using the repository-local RobQA skill and frozen `docs/qa/RobQAPass.md` without trusting this implementation summary.

## Related Kanban, Docs, or Plans

- `docs/kanban/in-progress/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- `docs/audits/archscry-current-state-2026-08-22/README.md`
- `docs/audits/archscry-current-state-2026-08-22/manifest.json`
- `docs/audits/archscry-current-state-2026-08-22/robdev-self-qa.md`
- `docs/audits/archscry-current-state-2026-08-22/reconciliation/owner-review-queue.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

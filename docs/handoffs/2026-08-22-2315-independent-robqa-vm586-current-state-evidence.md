# VM-586 Independent RobQA — Current-State Evidence Candidate

- Agent name: Independent RobQA
- Task requested: Independently review exact candidate `614abfb90f60d9a9e667c2153bd3484d4c3df4e3` against exact parent/baseline `db9a16a40c2bfb7d0d493eacef348f19d70bb05a` for the complete VM-586 current-state dossier, engine, workbook, reconciliation, and owner-queue package.
- Related work: VM-586; VM-579 direct-review and engine-validation seams; VM-551 current witness and engine evidence.
- Exact candidate reviewed: `614abfb90f60d9a9e667c2153bd3484d4c3df4e3`
- Exact parent reviewed: `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`
- Disposition: `FAIL — Return to RobDev`

## Files Reviewed

- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and frozen `docs/qa/RobQAPass.md`
- `docs/handoffs/2026-08-22-2302-codex-vm586-archscry-current-state-evidence.md`
- `docs/kanban/in-progress/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- Exact candidate diff against `db9a16a`, including `.gitignore`, `package.json`, `scripts/audit/**`, `scripts/vm551-all-37-live-ui-replay.mjs`, `docs/audits/archscry-current-state-2026-08-22/**`, both `.xlsx` outputs, board, card, and handoff changes
- Current dossier/engine JSON, CSV, exception ledgers, all 37 local raw records, all 37 screenshots, all 37 detailed traces, workbook QA inventory, 84 per-sheet previews, eight contact sheets, red-team source inventory/reconciliation, owner queue, manifest, and RobDev self-QA
- The 14 red-team source files named by the generated inventory, sampled at the exact cited finding, design, protocol, and current-engine locators

## Files Changed

- `docs/handoffs/2026-08-22-2315-independent-robqa-vm586-current-state-evidence.md`
- `docs/handoffs/HANDOFF_INDEX.md`

No candidate code, data, evidence, workbook, screenshot, trace, or reconciliation artifact was changed. The unrelated VM-578 corpus was not opened, read, staged, moved, or modified.

## Change Classification

- QA tier: primarily `QA-0` audit/document/generated-evidence work, with targeted `QA-2` validation for the new opt-in live engine-only harness path. It is not QA-4 because no placement, scoring, ranking, qualification, stopping, questionnaire, mapping, or product data changed.
- Changed behavior: rerunnable current-state audit/reconciliation/workbook tooling, generated review evidence, and one opt-in engine-only harness mode.
- Protected behavior intentionally untouched: product runtime and UI, placement semantics, canonical/generated product data, telemetry, persistence, media authority, deployment, and VM-578.
- Realistic regressions: incomplete or mismatched 37-row evidence, target/expected-result injection, direct-review/reachability conflation, stale or unhashed files, false Yore closure, corrupt or misleading workbooks, inaccurate manifest completion state, ungrounded red-team dispositions, and an overbroad owner queue.

## Independent Findings

### 1. Manifest completion and primary workbook references are internally false

`docs/audits/archscry-current-state-2026-08-22/manifest.json` says the top-level `workbooks.status` and `red_team.status` are `COMPLETE`, but `completion_status.workbooks`, `completion_status.red_team_reconciliation`, and `completion_status.robdev_self_qa` remain `PENDING`. The manifest's primary `dossier.workbook` and `engine.workbook` fields point to nonexistent files named `dossier-review-current-production-state.xlsx` and `engine-validation-current-production-state.xlsx`; the actual generated files are `archscry-dossier-review.xlsx` and `archscry-engine-validation.xlsx` under the same task output root.

This is a required evidence-contract failure, not a cosmetic note: the review entry point promises exact artifact paths and truthful completion state. The same manifest cannot simultaneously be complete and pending, and its primary workbook links must resolve.

Smallest correction: have the owning generators update one canonical workbook path in both sections, advance completed phases truthfully, leave only independent RobQA pending before re-review, and add a deterministic manifest invariant that every required path exists and duplicate status fields agree.

### 2. Both delivered workbooks contain zero exported formula cells

The builder assigns summary KPI formulas in source and the self-QA claims formula inspection, but direct inspection of both delivered XLSX ZIPs found zero worksheet `<f>` nodes. The displayed KPI values are static cached values after export. `validateExport()` only scans an inspection string for Excel error tokens and then unconditionally records `formula_errors: []`; it never asserts that the required formulas survived export/re-import.

This violates the workspace spreadsheet requirement that derived values remain formulas and makes the current “formula-inspected” evidence materially incomplete.

Smallest correction: make the required KPI cells persist as formulas in both exported workbooks, then assert their exact cells/formulas after re-import/export (or equivalently assert a nonzero, expected formula inventory) before recording formula QA as passed. Regenerate both workbooks, previews, workbook QA, hashes, manifest, and any dependent handoff claims.

## Tests Selected

| Test | Reason | Result |
|---|---|---|
| Exact SHA and worktree check | Bind review to the requested candidate and preserve unrelated dirt | PASS — HEAD exactly `614abfb9`; only the pre-existing unrelated corpus directory is untracked |
| Exact candidate diff and protected-root check | Detect scope drift | PASS — no `assets/`, `data/`, product HTML/CSS, telemetry, persistence, or deployment file changed |
| `git diff --check db9a16a..614abfb9` | Whitespace integrity | PASS |
| Node syntax checks for all three audit scripts and the modified replay harness | Validate executable syntax | PASS |
| Read-only Python `compile(...)` for the preview helper | Validate helper syntax without writing `__pycache__` | PASS |
| Independent 37-row checksum/parity walk | Verify all raw dossier records, screenshots, detailed traces, manifest primary artifacts, and workbook hashes | PASS — 37 dossiers, 37 screenshots, 37 raw records, 37 traces; all referenced hashes and compact/detail parity checks pass |
| Screenshot decode/dimension/nonblank scan | Reject corrupt or blank generated screenshots | PASS — 37 valid PNGs, all 1425 px wide and 5583–6983 px tall, no blank sample |
| Engine semantics review | Verify expected result is only a post-run assertion and preserve bounded Yore | PASS — production exports drive replay; 36 named matches, no mismatch/stale/missing/error, and Yore remains unqualified `insufficient` with no named result |
| `npm.cmd run test:placement` | Confirm unchanged current engine witness behavior at bounded cost | PASS — 37 factions and 37 golden paths |
| `npm.cmd run test:vm551-all-37-witnesses` | Confirm witness/model compatibility | PASS — 37 rows, 36 named, one bounded, three refinements |
| `npm.cmd run test:dev-review` | Verify existing review gating/order/isolation/current engine seam | PASS |
| `npm.cmd run test:vm586-live-ui-samples` | Exercise the changed opt-in engine-only path across representative primary/close/refined/bounded/endpoint states | PASS — Green, Jund, Lorehold, Witch, Yore, Colorless, and WUBRG |
| In-app browser direct-review sample | Independently click actual current review controls and compare rendered endpoint behavior | PASS — White, Yore, and WUBRG each render the correct identity, all six nonempty panels, correct Maze context, no journey-language leakage, and no horizontal overflow |
| Workbook ZIP/sheet/formula inspection | Verify the actual delivered binaries rather than trusting QA JSON | FAIL — both have 42 expected sheets and zero error cells, but each has zero formula cells |
| Workbook rendered preview inspection | Check representative summary, exception, identity, endpoint, and trace views plus all-sheet contacts | PASS for readability/structure; does not cure absent formulas |
| Manifest referential/completion invariant | Verify the promised review entry point | FAIL — two primary workbook paths do not exist and three completed phases remain marked pending |

## Reproduced Baseline-Only Failures

1. `npm.cmd run test:vm551-dossier-integrity` reproduces the `.has(...)` assertion failure. Exact diff inspection confirms both the test and owning runtime are unchanged from `db9a16a`; the baseline assertion expects `educationalTermAllocation.has(help.recordId)` while the exact baseline runtime uses target-aware `.get(...) !== educationalTargetKey(...)`. Classification: inherited stale source assertion, not VM-586 product drift.
2. `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=desktop --identity=G` reproduces the rationale-copy hover cleanup failure at the exact assertion shared with `db9a16a`. The candidate diff adds only an opt-in `engineOnlyMode` declaration and a guarded early return; with the flag absent, the default failing path and product runtime are unchanged. Classification: inherited full-surface harness/product-contract disagreement outside the VM-586 engine-only evidence seam.

The baseline-only labels are independently supported and are not reasons for this disposition.

## Tests Intentionally Skipped

- Full 37-identity UI replay at desktop/intermediate/mobile: unchanged product behavior is already certified at the accepted baseline; the candidate changes no protected runtime, and the targeted seven-case live sample covers the new opt-in harness path.
- Exhaustive synthetic, mutation, recovery, or certification suites: no QA-4 behavior changed, so CPU-heavy validation is not proportionate.
- Regenerating the 37 dossiers, reconciliation, or workbooks: these commands overwrite candidate evidence; independent checksum/parity validation and focused browser replay were sufficient to assess the existing exact candidate without mutating it.

## CPU-Heavy Validation

`NOT REQUIRED`

No protected decision logic changed. The last valid baseline certification remains controlling for untouched engine semantics.

## Self-QA Rendered Evidence

- White direct review, normal desktop in-app browser: actual hero `White`; status `REVIEW MODE — direct identity render: White`; all six panels visible and nonempty; four Maze links carry `contextMode=dossier-review` and `reviewIdentity=W`; no overflow or placement-history language.
- Yore endpoint: actual hero `Yore / Artifice`; all six panels visible; three Maze links correctly bound; no overflow or placement-history language. Separate engine replay remains `NO_RESULT` / `insufficient` with no named dossier.
- WUBRG endpoint: actual hero `WUBRG`; all six panels visible; three Maze links correctly bound; no overflow or placement-history language.
- Generated screenshot review: White, Yore, and WUBRG full-page captures are visually populated and match the current direct-review composition; optional card art is visibly unavailable in the captured sandbox and is truthfully separated as an environment note.
- Workbook review: summary and endpoint/trace sheets are legible and structurally consistent, but direct binary inspection proves the formula contract did not survive export.

## Manual Findings Converted to Invariants

- Finding: manifest phases and artifact paths disagree with generated reality.
  - Defect class: generated evidence integrity / referential consistency.
  - Regression invariant: every required manifest artifact path must exist; duplicated status/path representations must agree; a phase may be `COMPLETE` only after its outputs and QA evidence exist.
- Finding: workbook QA reports no formula errors while the exported workbooks contain no formulas.
  - Defect class: workbook export/verification gap.
  - Regression invariant: required KPI cells must contain the expected formulas after export/re-import, and workbook QA must fail when the formula inventory is absent even if displayed cached values are correct.

## Remaining Owner Judgment

None should be requested from the owner on this candidate. After RobDev corrects the two deterministic evidence-package defects and a new exact-SHA RobQA passes, the existing bounded eight-dossier, five-engine, seven-decision queue is appropriately scoped for owner judgment.

## Risks / Uncertainties

- The underlying 37-by-37 dossier and engine corpus appears complete and internally sound; the return is limited to review-package truthfulness and workbook formula persistence.
- Player accuracy, comprehension, ordinary-player distribution, and mapping validity remain outside deterministic proof and correctly remain in the player-data/product-decision queue.
- Optional external Scryfall card media remains a documented environment limitation, not a product-content finding.

## Not Touched

- Candidate source, generated evidence, workbooks, screenshots, traces, audit JSON/CSV, reconciliation artifacts, card/board, product runtime/data, telemetry, persistence, deployment, and VM-578.

## Follow-Up Recommendations

1. Return to RobDev for the two smallest corrections above.
2. Regenerate the dependent workbook/manifest/QA artifacts and update the RobDev handoff claims.
3. Commit a new exact candidate SHA.
4. Run a fresh independent RobQA against that exact SHA, including direct formula-cell and manifest referential/status assertions.

## Next Suggested Agent

RobDev remediation owner for VM-586, followed by fresh independent RobQA.

## Related Kanban, Docs, or Plans

- `docs/kanban/in-progress/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- `docs/audits/archscry-current-state-2026-08-22/manifest.json`
- `docs/audits/archscry-current-state-2026-08-22/workbook-qa.json`
- `docs/audits/archscry-current-state-2026-08-22/robdev-self-qa.md`
- `docs/audits/archscry-current-state-2026-08-22/reconciliation/owner-review-queue.md`
- `.agents/skills/robqa/SKILL.md`
- `docs/qa/RobQAPass.md`

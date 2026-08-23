# Independent RobQA — VM-586 Replacement Candidate

- Agent name: Independent RobQA (fresh replacement-candidate review)
- Task requested: Independently review exact candidate `fb2826aa6837aca461a9a5415bb5175e17e9731d` against accepted product baseline `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`, with special focus on the first review's manifest-integrity and exported-formula blockers, then return the exact owner-readiness disposition.
- Related work: VM-586; superseded candidate `614abfb90f60d9a9e667c2153bd3484d4c3df4e3`; first independent return `2026-08-22-2315-independent-robqa-vm586-current-state-evidence.md`.
- Branch: `codex/vm586-archscry-current-state-evidence`
- Exact candidate reviewed: `fb2826aa6837aca461a9a5415bb5175e17e9731d`
- Exact accepted baseline: `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`

## Disposition

PASS — Owner Review Ready

The two deterministic blockers from the first review are closed. The replacement candidate's manifest is referentially and phase-state consistent, both delivered XLSX binaries contain the four exact required formulas, fresh artifact-tool re-import preserves those formulas, and the workbook producer now throws if any required imported formula is missing or changed. The remaining package independently reconciles to 37 authoritative dossiers, 37 screenshots, 37 current-compatible engine witnesses, 37 detailed traces, 14 checksummed source files, 16 red-team dispositions, and the bounded `8 dossier / 5 engine / 7 decision` owner queue.

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and frozen `docs/qa/RobQAPass.md`
- Owner-provided `C:\Users\obake\Downloads\archscry-current-state-evidence-red-team-one-go-goal.md`
- `docs/kanban/board.md` and `docs/kanban/in-progress/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-586 implementation, first independent review, and package-remediation handoffs
- Exact candidate diff from `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`
- All five changed/new audit and replay scripts plus `package.json`
- `docs/audits/archscry-current-state-2026-08-22/**`
- Both delivered workbook binaries, their artifact-tool imports, `workbook-qa.json`, all eight contact sheets covering all 84 per-sheet previews, and representative full-page dossier screenshots
- All 37 local raw dossier records, all 37 local screenshots, and all 37 local detailed engine traces through independent checksum/parity traversal
- The 14 red-team source files through their inventory paths and hashes; the 16-finding reconciliation and bounded owner queue

## Files Changed

- `docs/handoffs/2026-08-22-2342-independent-robqa-vm586-replacement-candidate.md`
- `docs/handoffs/HANDOFF_INDEX.md`

No candidate implementation, generated evidence, workbook, screenshot, trace, source reconciliation, card, board, product runtime, or product data was changed. The finalizer was rerun only as its deterministic validation command and left the candidate evidence byte-unchanged. The unrelated VM-578 corpus was not opened, read, staged, moved, or modified.

## What Changed

- Added this exact-SHA independent review record and its index entry.
- Advanced exact candidate `fb2826aa6837aca461a9a5415bb5175e17e9731d` to the bounded owner-review gate with no candidate or product mutation.

## Why It Changed

VM-586 requires a fresh independent RobQA disposition after the first candidate's deterministic package-integrity return. This record transfers the reproduced evidence, exact candidate binding, risk-proportional test selection, and shortest remaining owner judgment.

## Decisions Made

- The manifest and exported-formula blockers are closed by deterministic producer invariants and independent reproduction.
- `independent_robqa: PENDING` is correct inside the pre-review candidate; the main closeout may advance it only by binding this pass handoff and exact reviewed SHA through the existing finalizer.
- The two reproduced broad-suite failures remain inherited baseline-only contracts, not VM-586 defects.
- No exhaustive engine campaign is justified because no QA-4 product behavior changed.

## Change Classification

- QA tier: primarily `QA-0` audit/generated-evidence/tooling verification, plus bounded `QA-2` validation for the new opt-in engine-only live replay seam.
- Changed behavior: rerunnable current-state collection/reconciliation/workbook/package validation tooling, generated owner-review evidence, and an opt-in replay early-return used only for representative engine checks.
- Protected behavior intentionally untouched: Archscry product runtime and UI, placement scoring/ranking/qualification/routing/stopping/refinement, questionnaire and mappings, identity/dossier source data, generated product data, telemetry, persistence, deployment, and VM-578.
- Realistic regressions tested: dead or contradictory manifest fields, absent/stale formula cells, stale hashes, incomplete 37-row evidence, direct-review/reachability conflation, expected-result injection, false Yore closure, ungrounded red-team claims, and an owner queue that hands deterministic work back to the owner.

## Independent Findings

### First-review blocker 1 — closed

- The manifest's primary dossier workbook path equals `workbooks.dossier.path`, resolves to `archscry-dossier-review.xlsx`, and exists.
- The primary engine workbook path equals `workbooks.engine.path`, resolves to `archscry-engine-validation.xlsx`, and exists.
- All 18 required manifest paths exist.
- `collection`, `workbooks`, `red_team_reconciliation`, and `robdev_self_qa` are consistently `COMPLETE` across their duplicate representations.
- `independent_robqa` is truthfully `PENDING` in the pre-review exact candidate.
- Both actual workbook SHA-256 values match `manifest.json` and `workbook-qa.json`.

### First-review blocker 2 — closed

Direct namespace-aware Open XML inspection found exactly these four formula cells in each delivered binary:

- Dossier `00 Summary`: `A4 =COUNTA(B8:B44)`, `D4 =COUNTIF(E8:E44,"PASS")`, `G4 =COUNTIF(M8:M44,"YES")`, `J4 =COUNTA(L8:L44)`.
- Engine `00 Summary`: `A4 =COUNTA(B8:B44)`, `D4 =COUNTIF(G8:G44,"PASS_MATCH")`, `G4 =COUNTIF(G8:G44,"MISMATCH")`, `J4 =COUNTIF(G8:G44,"NO_RESULT")`.

A fresh read-only `@oai/artifact-tool` import independently returned those exact eight formulas, 42 sheets per workbook, and no formula error tokens. The producer's `validateExport()` now reads each required cell after export/re-import and throws on any missing or unequal formula before it can record preservation success; the final package validator independently requires the exact four-cell inventory, binary hash agreement, and preservation flag for each workbook.

No additional correctness finding remains.

## Tests Selected / Tests Run

| Test | Reason | Result |
|---|---|---|
| Exact HEAD/branch/worktree check | Bind review to the requested candidate and detect unrelated dirt | PASS — exact HEAD `fb2826aa`; one registered worktree; only `vm578.zip` remains unrelated and untracked |
| Baseline ancestry and exact `db9a16a..fb2826aa` diff | Detect product/runtime scope drift | PASS — baseline is an ancestor; no `assets/`, `data/`, product HTML/CSS, telemetry, persistence, or deployment file changed |
| `git diff --check db9a16a..fb2826aa` | Candidate whitespace integrity | PASS |
| Node syntax checks for four audit scripts and changed replay harness; read-only Python compile for contact-sheet helper | Validate executable syntax without mutating evidence | PASS |
| Independent manifest path/status/hash traversal | Reproduce the first blocker invariant | PASS — 18/18 paths exist; canonical paths equal; completed phase fields agree; independent review is PENDING; both workbook hashes match |
| `npm.cmd run audit:archscry-current-state-finalize` | Exercise the candidate's cross-artifact stop gate | PASS — 18 paths, exact baseline, eight formulas, hashes, counts, and phase agreement; no content diff afterward |
| Namespace-aware XLSX ZIP inspection | Verify the actual delivered binary serialization | PASS — exactly four formula cells in each workbook, at the required addresses with the required formulas |
| Fresh artifact-tool XLSX import and formula/error inspection | Verify formulas survive the required consumer path | PASS — 42 sheets each, exact eight formulas recovered, zero formula error matches |
| All-sheet preview review through eight contact sheets | Check workbook readability/population across all 84 sheets | PASS — both five-sheet index groups and all 37 dossier/trace sheets are populated, consistently structured, and legible at their intended sheet scale |
| Independent dossier/raw/screenshot parity traversal | Verify complete rendered evidence without trusting the summaries | PASS — 37 unique authoritative identities, 37 raw JSON files with full text and HTML, 37 hash-matching PNGs, six nonempty visible panels each, no overflow, no telemetry, and exact rendered-identity parity |
| PNG signature/dimension/hash checks | Reject missing, corrupt, or substituted screenshots | PASS — all 37 are valid PNGs, 1425 px wide, 5583–6983 px tall, and match recorded bytes/hashes/geometry |
| Direct-review provenance and Maze-context scan | Protect the VM-579 evidence seam | PASS — every row is `DIRECT_DOSSIER_REVIEW` / `NOT_ASSERTED`, zero prohibited journey/confidence-language leaks, and all 134 Maze links retain matching dossier-review identity context |
| Independent engine/trace/source parity traversal | Verify current witnesses and detailed traces | PASS — 37 current-compatible rows, 37 hash-matching traces, 284 answer steps, source/model hashes match, 36 `PASS_MATCH`, and one bounded `NO_RESULT` |
| Yore and qualification-state review | Reject a forced 37th result and false rank/selection equivalence | PASS — Yore remains `insufficient`, unnamed, and unqualified; 35 primary plus Jund close; all five named raw-leader/selected-result divergences remain qualified |
| Static engine-seam review | Detect expected identity or target injection | PASS — production exports compute from selections/state/model; expected identity is used only in the post-run comparison and audit fields |
| Red-team source/hash/disposition traversal | Verify actual sources and one current disposition per finding | PASS — 14 existing sources match their hashes; 16 unique findings reconcile to 9 disproven, 3 player-data, 2 product-design, 1 confirmed, and 1 unclear |
| Owner-queue bound check | Ensure deterministic work is not handed back to the owner | PASS — exactly 8 representative dossiers, 5 engine journeys, and 7 high-impact decisions |
| `npm.cmd run test:placement` | Reconfirm unchanged current placement witnesses at bounded cost | PASS — 37 factions and 37 golden paths |
| `npm.cmd run test:vm551-all-37-witnesses` | Reconfirm current witness/model compatibility | PASS — 37 rows, 36 named, one bounded, three refinement witnesses |
| `npm.cmd run test:dev-review` | Reconfirm accepted review gating/taxonomy/isolation/engine seams | PASS |
| `npm.cmd run test:vm586-live-ui-samples` | Exercise the opt-in path across primary, close, refined, bounded, Colorless, and WUBRG cases | PASS — Green, Jund, Lorehold, Witch, Yore, Colorless, and WUBRG |
| Representative full-page screenshot inspection | Sanity-check actual rendered product evidence | PASS — White, Yore, and WUBRG are populated, correctly identified, coherently structured, and visibly preserve the bounded optional-media limitation |

Two short ad hoc schema probes initially used reviewer-assumed display casing/link property names rather than the published evidence fields; after aligning to the actual schema, the final parity checks above passed. This was a reviewer-probe correction, not a candidate defect.

## Reproduced Baseline-Only Failures

1. `npm.cmd run test:vm551-dossier-integrity` still fails the stale source regex that expects `educationalTermAllocation.has(help.recordId)`. Both the test and owning runtime are unchanged from `db9a16a`; the accepted baseline runtime uses target-aware `educationalTermAllocation.get(help.recordId) !== educationalTargetKey(...)`. Classification: inherited stale test assertion, outside VM-586.
2. `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=desktop --identity=G` still fails the broader rationale-copy preview assertion. The candidate only adds an opt-in `--engine-only` branch before that unchanged default path, and all product runtime is byte-unchanged from `db9a16a`. Classification: inherited default full-surface harness/product-contract disagreement; the task-owned engine-only samples pass.

Neither inherited failure weakens the VM-586 evidence package or changes this disposition.

## Tests Intentionally Skipped

- Regenerating all 37 dossier renders, screenshots, traces, reconciliation, and workbooks: this would overwrite the exact candidate evidence under review. Independent file/hash/schema/trace/formula traversal plus focused live replay proved the delivered package without mutating it.
- Full 37-identity UI replay at desktop/intermediate/mobile: no product runtime changed; the accepted exact baseline remains controlling, and the seven-case live sample covers the new opt-in harness seam and the meaningful result-state classes.
- Exhaustive synthetic, mutation, recovery, or 44,005-comparison recreation: no QA-4 behavior changed, and the package truthfully classifies current mutation breadth as an owner risk decision rather than an accuracy claim.

## CPU-Heavy Validation

`NOT REQUIRED`

No placement, scoring, ranking, qualification, routing, stopping, refinement, questionnaire, mapping, or product data changed. The smallest deterministic set above protects the actual QA-0/QA-2 risk.

## Self-QA Rendered Evidence

- White full-page screenshot: correct `White` hero, direct-review control, six populated dossier panels, complete lower-page Commander/Maze sections, no horizontal overflow; optional card media limitation remains visible and documented.
- Yore full-page screenshot: correct `Yore / Artifice` hero and six-panel direct dossier; separate engine evidence remains unnamed `insufficient` rather than being forced to match the available dossier.
- WUBRG full-page screenshot: correct `WUBRG` hero, all five-color mana symbols, six populated panels, complete endpoint dossier, no horizontal overflow.
- Dossier workbook contacts: summary, 37 environment notes, section/link/card inventories, and all 37 identity sheets are populated and consistently styled.
- Engine workbook contacts: summary, six bounded/surprising-valid notes, witness/result/qualification indexes, and all 37 detailed trace sheets are populated and consistently styled.

## Manual Findings Converted to Invariants

- Finding: primary workbook paths and duplicate phase fields previously disagreed.
  - Defect class: evidence-package referential consistency.
  - Regression invariant: all 18 required paths must exist; canonical workbook paths and duplicate status fields must agree; only completed phases may be marked complete.
- Finding: prior QA could report formula success without enforcing imported formula presence.
  - Defect class: workbook serialization/verification gap.
  - Regression invariant: each delivered workbook must re-import with its four exact required KPI formulas, formula preservation must be explicit, binary and QA hashes must agree, and the producer must fail on any mismatch.

## Remaining Owner Judgment

Only the already-generated bounded queue remains:

- eight representative dossiers for fidelity, usefulness, readability, and product feel;
- five representative engine journeys covering primary, close, refinement, responsible qualification, and Yore insufficient;
- seven high-impact choices concerning player validation, provenance exposure, mutation breadth, and intentional Yore/lens design.

All repetitive all-37 collection, file integrity, formula verification, current witness replay, trace validation, and source reconciliation are agent-owned and complete.

## Owner Review Commands / Routes

1. Open `docs/audits/archscry-current-state-2026-08-22/reconciliation/owner-review-queue.md` and follow only its named eight dossiers, five engine cases, and seven decisions.
2. Use `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/archscry-dossier-review.xlsx` for the dossier samples.
3. Use `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/archscry-engine-validation.xlsx` for the five engine cases.

No owner command asks for all-37 recollection or deterministic checksum/formula verification.

## Risks / Uncertainties

- Player accuracy, comprehension, ordinary-player distribution, and mapping validity remain empirical/product questions; the package correctly does not claim them.
- Optional Scryfall card media was unavailable in the collection sandbox and remains 37 explicit environment notes, not product-content defects.
- Exact result provenance is available in the audit package but not the current player-facing result surface; this remains one explicit owner decision.
- The historical exhaustive mutation universe was not recreated for the current engine; the package preserves that limit as `UNCLEAR_CURRENT` rather than overstating stability.

## Not Touched

- No candidate implementation or evidence artifact.
- No `assets/`, `data/`, Archscry product HTML/CSS/runtime, telemetry, persistence, deployment, or generated product-data file.
- No VM-578 content; `docs/research/maze-player-language/corpus/vm578.zip` remains the sole unrelated untracked file and is absent from the candidate diff and index.

## Follow-Up Recommendations

1. Bind closeout to exact reviewed candidate `fb2826aa6837aca461a9a5415bb5175e17e9731d` and this exact pass disposition.
2. Advance only to the bounded owner queue; do not ask the owner to re-run the 37-by-37 collection.
3. After owner acceptance, update manifest independent-review status through the existing finalizer and complete the normal VM-586 Kanban/handoff closeout without product changes.
4. Keep the two inherited baseline-only harness/test drifts and any future empirical validation outside this evidence-generation scope.

## Next Suggested Agent

VM-586 closeout owner/main agent, followed by the bounded owner review.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/in-progress/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- `docs/audits/archscry-current-state-2026-08-22/manifest.json`
- `docs/audits/archscry-current-state-2026-08-22/workbook-qa.json`
- `docs/audits/archscry-current-state-2026-08-22/robdev-self-qa.md`
- `docs/audits/archscry-current-state-2026-08-22/reconciliation/owner-review-queue.md`
- `docs/handoffs/2026-08-22-2315-independent-robqa-vm586-current-state-evidence.md`
- `docs/handoffs/2026-08-22-2324-codex-vm586-package-integrity-remediation.md`
- `.agents/skills/robqa/SKILL.md`
- `docs/qa/RobQAPass.md`

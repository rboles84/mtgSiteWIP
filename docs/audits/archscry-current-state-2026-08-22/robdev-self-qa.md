# RobDev Self-QA — Archscry Current-State Evidence

Date: 2026-08-22
Baseline under test: `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`
Task: VM-586
Gate: repository-local RobDev skill and frozen `docs/dev/RobDevPass.md`; test selection uses the repository-local RobQA skill and frozen `docs/qa/RobQAPass.md`.

## Disposition

`ROBDEV SELF-QA — PASS FOR INDEPENDENT ROBQA`

The requested evidence automation is complete and no product-runtime stop condition was triggered. This is a high-review audit/tooling change because its outputs support owner judgment, but it changes no placement, dossier, identity, data, telemetry, persistence, or deployment behavior.

## Changed and Protected Behavior

- Changed: rerunnable audit orchestration, current evidence records, detailed trace generation, two workbook builders, workbook preview/contact-sheet generation, a source-grounded red-team reconciliation, a bounded owner queue, and an engine-only sample mode in the existing live UI witness harness.
- Protected and unchanged: all product runtime modules, current placement model, scoring/ranking/qualification/stopping/refinement, questionnaire and mappings, identity semantics/content, telemetry, persistence, generated product data, media authority, and VM-578.
- Product diff check: `git diff --name-only db9a16a -- assets data archscry maze` returns empty.
- VM-578 remains the unrelated untracked `docs/research/maze-player-language/corpus/vm578.zip` and was never read, moved, staged, or modified.

## Deterministic Evidence Results

- Dossier Review: 37/37 direct renders, 37/37 screenshots, six panels per identity, complete rendered text, structured cards/links/segments, zero horizontal overflow, zero telemetry events, and zero blocker/major/minor product exceptions.
- Dossier limitation: 37 repeated `NOTE / PRODUCT CHOICE` rows for sandbox-blocked optional Scryfall media; owner review is not required for those notes.
- Engine: 37/37 compatible witnesses replayed through current production functions; 36 `PASS_MATCH`, zero mismatch/stale/missing/error, and `ENGINE-YORE` as the approved `NO_RESULT` / `insufficient` boundary.
- Result states: 35 primary, one close (`Jund`), one insufficient (`Yore`); three witnesses use approved refinement answers; five named outcomes responsibly differ from the raw numeric leader.
- Red team: 14 checksummed sources and 16 current findings — 9 `DISPROVEN_CURRENT`, 3 `NEEDS_PLAYER_DATA`, 2 `PRODUCT_DESIGN`, 1 `CONFIRMED_CURRENT`, and 1 `UNCLEAR_CURRENT`.
- Owner queue: eight representative dossiers, five engine journeys, and seven source-bounded decisions.

## Workbook Verification

- Dossier workbook: 42 sheets — summary, exceptions, section coverage, link inventory, card inventory, and 37 identity sheets.
- Engine workbook: 42 sheets — summary, exceptions, witness inventory, result states, qualification/divergence, and 37 detailed trace sheets.
- Both workbooks were authored only with the workspace-bundled `@oai/artifact-tool`, exported, re-imported, structurally inspected, formula-inspected, and checked for Excel error values.
- Formula errors: zero in both workbooks.
- Visual QA: all 84 sheets rendered to bounded PNG previews and reviewed through eight contact sheets. Titles, headers, table bands, identity/trace sheet structure, and the summary KPI values rendered without corruption.
- Browser comparison found and caused correction of one workbook-only bug: raw provider value `maze` was initially compared as uppercase. Regeneration now reports White as 9 non-Maze provider links plus 4 Maze links, matching the current page and raw record.

## Rendered-Product Self-QA

The in-app browser directly rendered White, House Dimir, Lorehold, Bant, Abzan, Dune, Colorless, and WUBRG through the VM-579 review controls. For all eight:

- hero title and tagline matched the captured raw record;
- all six dossier panels rendered simultaneously;
- total link counts matched the raw record;
- the review label remained visible;
- no horizontal overflow occurred.

The seven-case live engine UI sample passed for Green, Jund, Lorehold, Witch, Yore, Colorless, and WUBRG. It verified named results for six cases, the visible bounded insufficient state for Yore without a named dossier, evidence-ledger retention, and desktop overflow safety.

## Commands and Results

| Command / check | Result |
|---|---|
| `node --check scripts/audit/archscry-current-state.mjs` | PASS |
| `node --check scripts/audit/archscry-red-team-reconciliation.mjs` | PASS |
| `node --check scripts/audit/build-archscry-current-state-workbooks.mjs` | PASS |
| `python -m py_compile scripts/audit/build-workbook-preview-contact-sheets.py` | PASS |
| `node scripts/audit/archscry-current-state.mjs --allow-candidate` | PASS — 37 dossiers/screenshots, 36 named engine matches, one bounded no-result |
| `npm.cmd run audit:archscry-red-team-reconciliation` | PASS — 14 sources, 16 findings, 7 owner decisions |
| `npm.cmd run audit:archscry-current-state-workbooks` | PASS — two 42-sheet workbooks, clean re-import and formula inspection |
| `npm.cmd run test:placement` | PASS — 37 identities and 37 golden paths |
| `npm.cmd run test:vm551-all-37-witnesses` | PASS — 37 current rows, 36 named, one bounded, three refinements |
| `npm.cmd run test:dev-review` | PASS — review gating, taxonomy order, transient Maze context, isolation, real-engine validation |
| `npm.cmd run test:vm586-live-ui-samples` | PASS — seven visible current-engine samples |
| In-app browser eight-dossier comparison | PASS after workbook Maze-provider normalization |
| Artifact-tool export/import/inspect/render | PASS — 84 sheets, zero formula errors |

## Known Baseline-Only Failures

These failures are reproduced on unchanged baseline-owned code and are not caused by VM-586:

1. `npm.cmd run test:vm551-dossier-integrity` fails because the static source assertion still expects `educationalTermAllocation.has(help.recordId)`, while current baseline runtime uses the stronger target-aware `educationalTermAllocation.get(help.recordId) !== educationalTargetKey(...)` contract. Neither the test nor runtime file differs from `db9a16a`; the current rendered and dev-review checks pass. Updating that unrelated stale assertion is out of scope.
2. The legacy full-surface single-identity replay `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=desktop --identity=G` reaches the correct current result but fails its broader rationale-card hover cleanup assertion. VM-586 therefore added an opt-in `--engine-only` harness mode that stops after the real visible engine/result contract; default behavior remains unchanged. The seven required current-engine UI samples pass through that bounded mode. The hover assertion is not evidence of an engine or dossier-render mismatch and is left for its owning surface.

## Limits and Residual Risk

- Current deterministic/synthetic results are structural evidence, not empirical player accuracy. Mapping validity, ordinary-player outcome distribution, comprehension, and neighbor confusion still require the separately authorized player-validation protocol.
- Yore intentionally remains not cleanly observable from Commander behavior. Its bounded no-result is a product decision, not a missing witness.
- The current result surface does not expose a user-facing exact provenance manifest; this is the one confirmed current red-team finding. The audit packet supplies exact hashes for review but does not modify the product serializer.
- External optional card images were unavailable in the collection sandbox. Local identity hero art and the complete text/layout remained available, and the in-app browser sample confirmed the representative visual surface.

## Owner Review Remaining

Only the product-judgment queue in `reconciliation/owner-review-queue.md` remains. Repetitive collection, structural verification, workbook inspection, and representative browser replay are complete.

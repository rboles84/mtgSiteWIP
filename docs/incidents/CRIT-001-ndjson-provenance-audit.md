# CRIT-001 NDJSON Provenance and Dependency Audit

Date: 2026-07-19
Agent: Codex
Branch: `codex/crit001-ndjson-provenance-audit`
Base commit: `e5a7af86fe912ff45cb8001659d310506377848c`
Related cards: VM-541, VM-542, CRIT-001, DRIFT-017, DRIFT-019
Decision: `PASS - NDJSON PROVENANCE AND DEPENDENCY RESOLVED`

## 1. Mission

Determine whether these tracked files are legitimate active consumers that require runtime propagation recovery:

- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`
- `assets/js/newindex-color-matrix.js`
- `assets/js/color-matrix-radar.js`

This was a read-only provenance and dependency audit. It did not edit runtime code, source data, generated data, workbook binaries, workbook inspection NDJSON, validator prototypes, Green / VM-521, VM-522, the external Excel tracker, or protected worktrees.

## 2. Drift-Control Baseline

The mandatory CRIT-001 drift-control baseline at `docs/incidents/CRIT-001-drift-control-template.md` was applied before classification.

| Checkpoint | Result | Evidence |
|---|---|---|
| Exact worktree and base | PASS | Clean audit worktree on `codex/crit001-ndjson-provenance-audit` at `e5a7af86fe912ff45cb8001659d310506377848c`. |
| No semantic/runtime mutation | PASS | Audit changed governance files only. |
| Candidate-scope isolation | PASS | No candidate was created, reviewed, approved, or certified. |
| Generated/source authority separation | PASS | `data/identity-layers.json` remains the canonical preview source; workbook artifacts are reference/staging outputs. |
| Dependency proof before active classification | PASS | Exact import/script, package, workflow, and repository-reader searches found no active preview-text dependency on the four audited files. |

No `FAIL` or `UNKNOWN` scorecard result was found.

## 3. Prior Related Work

VM-541 identified stale preview strings for Silverquill, Azorius, Gruul, Simic, Black, and Red in two JS files and two workbook inspection NDJSON files, then conservatively classified them as active certified preview consumers pending recovery.

This audit independently checked provenance and dependency instead of trusting VM-541's active-consumer assumption. It supersedes only that active-consumer classification. It does not alter VM-541's evidence that stale copied strings exist.

VM-476 created the enhanced workbook artifacts as a reference/staging workbook package. Its handoff records the canonical runtime identity registry as `data/identity-layers.json`, with workbook enrichments treated as staging/reference unless promoted through the repo source-first flow.

VM-063, VM-064, VM-065, VM-144, VM-148, and VM-286 establish the historical preview-page lineage for the JS files and the later promotion of the canonical home page to `index.html`.

## 4. Files Assessed

| File | Current classification | Confidence | Active defect? |
|---|---|---:|---|
| `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson` | `DEBUG_INSPECTION_ARTIFACT` | High | No |
| `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson` | `DEBUG_INSPECTION_ARTIFACT` | High | No |
| `assets/js/newindex-color-matrix.js` | `HISTORICAL_ARCHIVE` | Medium-high | No |
| `assets/js/color-matrix-radar.js` | `HISTORICAL_ARCHIVE` | Medium-high | No |

The JS files remain runtime-capable if a future page imports them, but current repository evidence does not show a live import path.

## 5. NDJSON Provenance

Both top-level `*.xlsx.inspect.ndjson` files were introduced by commit `3d12bad70f87fd9c57eedc72523179a07ee90985` (`Add verified workbook output artifacts`, 2026-07-09). That commit added the enhanced workbook builder, both workbook binaries, both top-level inspection dumps, QA screenshots, `qa/workbook-inspect.ndjson`, and `qa/formula-error-scan.ndjson`.

The current audit base contains:

| File | Size | Line count | Record kinds |
|---|---:|---:|---|
| `MTGDataV3_Enhanced.xlsx.inspect.ndjson` | 9,381,635 bytes | 20,452 | `workbook`, `sheet`, `table`, `region`, `computedStyle` |
| `MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson` | 9,385,414 bytes | 20,458 | `workbook`, `sheet`, `table`, `region`, `computedStyle` |
| `qa/workbook-inspect.ndjson` | smaller QA summary | 6 | `sheet`, `table`, `notice` |

Both top-level dumps contain `Identity_Layers_37` table inspection records over `A1:P38`, including the `Preview Text` column. They are workbook inspection snapshots, not source data.

The enhanced workbook builder at `outputs/mtgdata-v3-enhanced/.work/build-v3-enhanced.mjs` reads canonical JSON, writes workbook rows, calls workbook inspection for QA output, and saves workbook binaries. It writes `qa/workbook-inspect.ndjson` and `qa/formula-error-scan.ndjson`; it does not read or write the two top-level `*.xlsx.inspect.ndjson` files.

## 6. Dependency Search Results

Repository-wide exact searches for the two top-level NDJSON paths, `MTGDataV3_Enhanced`, `outputs/mtgdata-v3-enhanced`, `inspect.ndjson`, and `Identity_Layers_37` found documentation references and the workbook builder, but no package script, workflow, runtime module, app page, or test harness consuming the top-level NDJSON files as preview data.

`package.json` scripts and `.github/workflows/validation.yml` do not run workbook or top-level NDJSON consumption. The current CI gates run source/generated, parser, placement, Maze, copy-boundary, and frontend smoke checks.

Current live HTML imports do not include `assets/js/newindex-color-matrix.js` or `assets/js/color-matrix-radar.js`. The only exact current code reference found between those two files is a self-reference in an error message inside `assets/js/color-matrix-radar.js`.

`scripts/validate-frontend-html.mjs` reads all `assets/js/*.js` files for legacy font-pattern regression. That read does not consume or validate preview text and does not make either JS file an active preview consumer.

## 7. Canonical Authority Chain

The active preview authority remains:

1. `data/identity-layers.json`
2. generated embedded consumer `data/factions.json`
3. current live home preview runtime in `assets/js/home.js`, which fetches `data/identity-layers.json`

The workbook path is reference/staging:

1. source JSON and workbook reference inputs
2. enhanced workbook binary outputs
3. workbook inspection/QA artifacts

The audited top-level NDJSON files sit after the workbook output in that chain. They do not feed canonical JSON, generated JSON, current runtime pages, or CI preview validation.

## 8. JS File Classification

`assets/js/newindex-color-matrix.js` and `assets/js/color-matrix-radar.js` were introduced as part of historical preview-page work. They contain embedded color-profile and identity data islands, DOM lookups, and Chart.js-oriented runtime behavior, but current live pages do not import them.

Historical route records show `newIndex2.html` was promoted to canonical `index.html`; stale current-state references to `newIndex2.html` were later cleaned; preview route files such as `newIndex.html` and `newIndex2.html` are absent in the audit base.

The correct current classification is `HISTORICAL_ARCHIVE`, not `ACTIVE_RUNTIME_CONSUMER`. Because the files still live under `assets/js`, their placement is a repository-hygiene risk: if a future page imports either file, stale preview text would become active again.

## 9. Revised Defect Count

| Bucket | Count | Notes |
|---|---:|---|
| Active runtime preview defects | 0 | No current import or live route dependency was found for the audited JS files or NDJSON files. |
| Active build-input preview defects | 0 | No build step reads the audited files as preview authority. |
| Active test-fixture preview defects | 0 | No test fixture consumes these stale preview strings as expected product truth. |
| Debug inspection stale preview cells | 12 | Six identities across two workbook inspection dumps. |
| Historical/archive stale preview cells | 12 | Six identities across two historical JS files. |

The stale strings should remain visible as repository hygiene debt, not as active certified preview propagation defects.

## 10. Recovery Recommendation

Recommendation: Option D - No Runtime Repair.

Do not perform an atomic runtime propagation recovery for these four files. No current live preview consumer depends on them.

Recommended follow-up, as a separate non-semantic cleanup card:

- Either archive or document the two historical JS files so future dependency scans do not confuse dormant runtime-capable assets with active consumers.
- Either remove, archive, or regenerate the top-level workbook inspection NDJSON files during a workbook artifact refresh; do not hand-edit them.
- Keep `qa/workbook-inspect.ndjson` treatment separate from the top-level full inspection dumps.
- Update future DRIFT-015/DRIFT-017 consumer audits to require an import/read/dependency proof before marking a copied string as active.

## 11. Green / VM-522 Resumption

This governance-only audit resolves the NDJSON provenance and dependency blocker created by the VM-541 STOP classification. It does not certify Green, start Green Gate 1+2, advance VM-522, or modify semantic data.

Green / VM-521 may resume only after the normal CRIT-001 sequence accepts this governance result and continues from a clean, exact program base. A separate committed Green drift-preflight control record is still required before Green Gate 1+2 semantic work.

## 12. Final Decision

NDJSON provenance and dependency are resolved. The top-level NDJSON files are debug inspection artifacts. The two JS files are historical runtime-capable preview artifacts without current live imports. None of the four files is an active preview-data consumer in the audit base.

NDJSON PROVENANCE DECISION: PASS - NDJSON PROVENANCE AND DEPENDENCY RESOLVED
NDJSON PROVENANCE AUDIT SHA: PENDING_NDJSON_PROVENANCE_AUDIT_SHA

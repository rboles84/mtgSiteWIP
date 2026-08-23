# Archscry Current-State Evidence & Red-Team Reconciliation

- Exact product baseline: `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`
- Identity authority: `data/identity-layers.json` (37)
- Dossiers collected: 37/37
- Screenshots generated: 37/37
- Dossier product exceptions: 0
- Dossier environment/product-choice notes: 37
- Engine named matches: 36/37
- Engine intentional bounded no-result cases: 1 (`YORE`)
- Engine mismatches/errors: 0
- Red-team findings reconciled: 16
- Bounded owner-review decisions: 7

Dossier evidence records current rendered identity content only. Every row is `DIRECT_DOSSIER_REVIEW` and `NOT_ASSERTED` for placement reachability.

Engine evidence replays the current legitimate witness sequences through the current production engine. Expected identity is used only as an external post-run assertion.

## Review Entry Points

- `manifest.json` — exact baseline, source hashes, browser limits, artifact paths, counts, workbook hashes, and phase states.
- `dossier/dossier-review-current-state.json` — 37 structured records with complete rendered text and raw/screenshot references.
- `engine/engine-validation-current-state.json` — 37 current-engine results with exact witness/model/trace hashes.
- `reconciliation/red-team-source-inventory.md` — actual relevant sources, chronology, authority class, and checksums.
- `reconciliation/red-team-reconciliation.md` — current dispositions with evidence, confidence, action, and owner-review status.
- `reconciliation/owner-review-queue.md` — eight dossiers, five engine journeys, and seven decisions; no all-37 owner collection.
- `workbook-qa.json` — both 42-sheet inventories, eight exact exported formulas, zero formula errors, and all-sheet preview references.
- `robdev-self-qa.md` — changed/protected contracts, browser/workbook sampling, deterministic tests, known baseline-only failures, and readiness.

## Workbooks and Large Evidence

- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/archscry-dossier-review.xlsx`
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/archscry-engine-validation.xlsx`
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/evidence/dossier/screenshots/` — 37 full-page PNGs.
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/evidence/dossier/raw/` — 37 full raw render records including HTML.
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/evidence/engine/traces/` — 37 detailed answer-by-answer traces.
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-22/evidence/workbook-previews/` — 84 rendered sheet previews plus contact sheets.

The workbooks are review artifacts, not product sources of truth. Large repeatable screenshots, raw records, traces, and previews remain local/ignored but are checksum-bound by the manifest and summary evidence. Optional Scryfall card media was blocked in the collection sandbox; this is the sole repeated dossier note and is not a product defect.

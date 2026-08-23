# VM-586 — Archscry Current-State Evidence & Red-Team Reconciliation

## Status

Awaiting Independent RobQA

## Type

Developer tooling / deterministic evidence generation / audit reconciliation / QA support

## Area

Archscry dossier review, Gate B1 placement validation, owner review support

## Priority

High

## Created

2026-08-22

## Summary

Automate the exact-current-state evidence the owner would otherwise collect manually: all 37 accepted Dossier Review renders, structured and full rendered content, deterministic screenshots, current legitimate engine witnesses and answer-by-answer traces, two readable workbooks, exception reports, source-grounded red-team reconciliation, and a bounded owner-review queue.

The owner-provided `archscry-current-state-evidence-red-team-one-go-goal.md` attachment is the controlling task authority for this Goal Mode run. The accepted current-production baseline is exact SHA `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`.

## Intake Triage

- Verdict: proceed.
- Smallest safe version: one rerunnable audit entry point that reuses VM-579 Dossier Review, the production engine, the current 37-row witness authority, current browser automation, and the workspace workbook stack; no runtime product changes.
- Review level: RobDev self-QA plus independent RobQA with rendered and workbook sampling.
- Stop condition: any need to change product runtime, force a target identity, fabricate a witness, duplicate renderer/engine/registry/questionnaire/browser machinery, or mix a non-baseline product state.

## RobDev Pre-Edit Contract

- Product outcome: a machine-generated current-production evidence package that reduces owner work to exceptions, 6–10 representative dossiers, 3–5 representative engine journeys, and high-impact product judgment.
- Current behavior: VM-579 provides local/flag-gated direct Dossier Review and production Engine Validation seams, while current VM-551 tooling preserves 37 current-engine witness rows; no one command currently emits the requested rendered collection, trace matrix, workbooks, screenshots, reconciliation, and owner queue together.
- Locked decisions: exact baseline `db9a16a`; 37 identities discovered from current authority; dossier presence never proves reachability; engine validation never receives a target identity; VM-578 is unrelated and excluded; red-team findings are recorded, not remediated.
- Owning layer: the rendered product owns dossier evidence; `data/identity-layers.json` owns current expression discovery; the production Gate B1 engine and compatible current witness artifact own engine replay evidence; source audit files own their historical findings; audit artifacts own only provenance and disposition.
- Authoritative producers: VM-579 direct-review route and current dossier renderer; `assets/js/archscry/gate-b1-placement-engine.js`; `scripts/build-vm551-all-37-live-witnesses.mjs`; the workspace-provided `@oai/artifact-tool` for workbook authoring.
- Existing machinery reused: VM-579 review controls, current Puppeteer/Chrome test utilities, current engine exports, current identity registry, current witness artifact, repository audit conventions, RobDev/RobQA gates, and existing telemetry suppression/mock behavior.
- Changed behavior: new rerunnable audit tooling and generated evidence only.
- Protected behavior: product runtime, placement scoring/ranking/qualification/stopping/refinement, questionnaire, mappings, identity semantics, dossier content, telemetry schemas/providers, persistence, generated product data, Scryfall authority, and VM-578 corpus.
- Consumers and blast radius: audit command, generated JSON/CSV/Markdown/XLSX/PNG artifacts, owner review, and future reruns; production browser consumers remain unchanged.
- Relevant states: missing/stale witnesses, no result, engine error, optional media/network failure, wrong/missing render, extraction failure, console error, overflow, malformed link, duplicate/missing identity, workbook/render integrity.
- Smallest complete implementation: one bounded orchestrator plus focused validation helpers and the required artifact tree; no framework or product seam.
- Non-goals: redesign, self-report prior, reduced/novice quiz, question/evidence/mapping/scoring/qualification/ontology changes, red-team remediation, random synthetic campaigns, analytics/replay work, deployment.

## Source

- Owner-provided Goal Mode attachment: `archscry-current-state-evidence-red-team-one-go-goal.md`.
- Accepted baseline: `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`.
- VM-579 direct-review and production-engine validation architecture.
- Current VM-551 all-37 witness and certification artifacts.
- Repository-local RobDev and RobQA skills and frozen authorities.

## Acceptance Criteria

- Exactly 37 authoritative identities are discovered without a handwritten identity authority.
- 37/37 direct-review dossiers are rendered, structured, fully text-captured, and explicitly marked `DIRECT_DOSSIER_REVIEW` / `NOT_ASSERTED`.
- 37 deterministic screenshots are generated or every bounded failure is explicit and hashed in the manifest.
- The dossier workbook, raw JSON/CSV, and exception report are valid and readable.
- All legitimate current witnesses are replayed through the production engine without target identity or expected-result injection.
- The 37-row engine matrix, detailed traces, engine workbook, and exception report are generated with missing/stale/error states explicit.
- Actual relevant red-team sources are inventoried; every finding has one source-bounded disposition, evidence, confidence, and actionability classification.
- The owner-review queue requests only bounded judgment: approximately 6–10 dossiers, 3–5 engine journeys, exceptions, and high-impact product questions.
- Manifest pins exact baseline, versions, sources, counts, hashes, browser conditions, and limitations.
- RobDev rendered/artifact self-QA passes.
- Independent RobQA returns `PASS — Owner Review Ready` for the exact candidate.

## Files Likely Impacted

- `package.json`
- `scripts/audit/`
- `tests/archscry/`
- `docs/audits/archscry-current-state-2026-08-22/`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-586-archscry-current-state-evidence-red-team-reconciliation.md`
- `docs/handoffs/`
- Conversation output directory for final `.xlsx` artifacts under `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/`

## Risks

- Confusing direct dossier availability with engine reachability.
- Treating historical VM-551 evidence as current rendered truth.
- Mixing incompatible witness/model generations.
- Optional media/network delays producing false product defects.
- Workbook raw-data density becoming owner-hostile.
- Audit binaries bloating Git.
- Unrelated VM-578 corpus contamination.

## Implementation Prompt

Execute the controlling owner attachment end to end from exact baseline `db9a16a`, reusing current project infrastructure. Do not modify product runtime. Do not force identities or fabricate witnesses. Keep VM-578 untouched and excluded. Continue through RobDev self-QA and independent RobQA until `PASS — Owner Review Ready` or a true attached-goal stop condition.

## Notes

- The attached goal is owner-provided task authority even though it is not committed to the repository.
- Screenshot and large trace commit policy must follow current repository precedent; local generated evidence may be hashed and excluded from Git when appropriate.

## Implementation Result

- Generated 37/37 current direct-review dossier records, 37/37 full-page screenshots, structured card/link/segment inventories, complete rendered text, and a dossier exception ledger with zero blocker/major/minor product exceptions.
- Replayed 37/37 current-compatible witnesses through production engine exports: 36 named matches, zero mismatch/stale/missing/error, and one approved bounded Yore no-result.
- Generated 37 detailed answer-by-answer trace JSON files and compact 37-row validation matrices.
- Generated two artifact-tool-authored workbooks with 42 sheets each, clean export/re-import/formula inspection, zero formula errors, and 84 rendered sheet previews.
- Inventoried 14 actual relevant red-team sources and reconciled 16 findings into 9 disproven current, 3 needing player data, 2 product-design boundaries, 1 confirmed current provenance gap, and 1 unclear current sensitivity claim.
- Reduced owner work to eight dossier samples, five engine journeys, and seven high-impact decisions.
- RobDev rendered/browser/workbook self-QA is `PASS FOR INDEPENDENT ROBQA`.

## Current Gate

- Candidate branch: `codex/vm586-archscry-current-state-evidence`.
- Next action: commit one exact candidate and run a fresh independent RobQA review against that SHA.
- Do not advance to owner review unless the independent disposition is exactly `PASS — Owner Review Ready`.

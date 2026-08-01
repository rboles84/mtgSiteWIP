# VM-551 Full Placement-System Audit Handoff

Agent name: Codex

Task requested: Conduct a comprehensive documentation-only audit of Vox Mana's complete placement system, define CECOS-informed repair requirements, and do not implement, push, merge, deploy, or certify.

Related Kanban card: VM-551 - Full Placement-System Audit

## Repository Authority

- Control repository: `C:\dev\voxmana.io`
- Audit worktree: `C:\dev\voxmana.io-vm551-placement-system-audit`
- Branch: `codex/vm551-placement-system-audit`
- Exact base: `2b4058ff4c769f03d52070204b3ce973e51decbd`
- Final audit content SHA: `abf786ae4b9f17053c4d3291f20a6cc2414c0edc`
- Authority preflight: local `main` and `origin/main` exact at base; ahead/behind `0 0`; control clean; expected SHA existed; only expected registered worktree existed before audit worktree creation.

## Commit List

1. `6c3d363f370bcb2e8f1f15914ad229262442f70b` - `docs(vm-551): map placement system architecture`
2. `34be0e71d7e15ae5177f4030ad16389f8c980843` - `docs(vm-551): add placement audit matrices`
3. `00c52b4117f6bab94492be22c22fb6eac362f171` - `docs(vm-551): record placement findings and defects`
4. `abf786ae4b9f17053c4d3291f20a6cc2414c0edc` - `docs(vm-551): specify CECOS placement repairs`

The final handoff/Kanban governance commit follows these audit-content commits and does not change the audited evidence or conclusions.

## Files Reviewed

- `AGENTS.md`, `CLAUDE.md`, repository/docs/architecture/reference READMEs.
- Handoff index and relevant placement, 37-identity, CRIT-001, radar, harness, and contamination handoffs.
- Kanban board and relevant completed/in-progress cards.
- CRIT-001 drift template, contract amendment, operating playbook, ledger, and 37 recovered identity records.
- CECOS draft.2 production candidate and QA report from the controlling corpus repository.
- Placement architecture, data-flow, domain, contract, radar, and deep-research documentation.
- `archscry/index.html`; placement, shared-state, presentation, dossier, radar, and recommendation JavaScript.
- Faction builder, Gate source, generated model/factions/layers/provenance, schemas, precons, taxonomy, Scryfall indexes, tests, fixtures, and validation scripts.
- All 37 raw identity source/claim/profile/placement record sets.

## Files Changed

- `docs/audits/vm551-placement-system/README.md`
- `docs/audits/vm551-placement-system/VM-551-full-placement-system-audit.md`
- `docs/audits/vm551-placement-system/placement-system-architecture-map.md`
- `docs/audits/vm551-placement-system/question-and-identity-matrix-summary.md`
- `docs/audits/vm551-placement-system/decision-classification-and-state-model.md`
- `docs/audits/vm551-placement-system/copy-evidence-recommendation-rendering-audit.md`
- `docs/audits/vm551-placement-system/requirements-specification.md`
- `docs/audits/vm551-placement-system/audit-placement-system.mjs`
- `docs/audits/vm551-placement-system/analysis-summary.json`
- `docs/audits/vm551-placement-system/question-to-signal-matrix.csv`
- `docs/audits/vm551-placement-system/identity-reachability-opportunity-matrix.csv`
- `docs/audits/vm551-placement-system/copy-comparison-corpus.json`
- `docs/audits/vm551-placement-system/copy-comparison-pairs.csv`
- `docs/audits/vm551-placement-system/claim-evidence-register.csv`
- `docs/audits/vm551-placement-system/defect-register.csv`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-551-full-placement-system-audit.md` moved from `in-progress/`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-01-0900-codex-vm551-placement-system-audit.md`

## What Changed

- Mapped the real user-answer-to-rendered-result path and its multiple source/generated authorities.
- Reconstructed the actual adaptive weighted-scoring model and determined it is not legitimately Bayesian.
- Enumerated every valid runtime terminal path and quantified reachability, winner share, ties, confidence, stages, and adjacent ranks.
- Traced every one of 356 live answers to actual positive/negative identity effects in a machine-reviewable matrix.
- Created per-identity audit records for all 37 identities.
- Generated and compared all 37 primary dossiers.
- Reconciled 868 raw claims and 356 live answer claims into a 1,224-row evidence register.
- Audited 101 recommendation entries against the committed Commander index and current official special-rule evidence for the one missing candidate.
- Inspected representative primary/adjacent results at desktop/mobile sizes, keyboard activation, metadata, state transitions, overflow, and console state.
- Recorded 34 categorized defects and mapped every defect to a declared requirement.
- Specified CECOS evidence, signal, scoring, confidence, primary/adjacent, claim, recommendation, rendering, validation, independent review, and certification contracts.

## Why It Changed

VM-551 required a diagnosis and requirements baseline before any repair planning. The artifacts separate observed evidence from interpretation, keep defect types distinct, expose hidden decision behavior, and make later owner review reproducible.

## Architecture Findings

- Actual model: deterministic adaptive weighted scoring with equal priors, lookup deltas, suppressions, lateral inhibition, softmax shares, rule-based question selection, and rank-based results.
- Gate source is generated from color loadings; live Hall/Crucible data is a hard-coded builder bank.
- Recovered CRIT-001 minimum-hit and false-positive guardrails are present as metadata but not enforced.
- Primary is numeric rank one. Adjacent is numeric ranks two and three.
- Confidence is top softmax share; confidence gap is top minus second.
- Completed results use session cache/optional profile persistence; partial readings do not survive refresh.
- The result is one SPA route, not 37 durable identity result routes.
- Copy and recommendation surfaces merge generated identity records, hard-coded templates/guidance, optional indexes, and result evidence.

## Quantitative Counts

- 37 identities.
- 113 questions / 356 answers: Gate 4/20, Hall 58/234, Crucible 51/102.
- 26,891 exhaustive terminal paths: 3,004 six-question, 16,843 seven-question, 7,044 eight-question.
- 333 exact top ties.
- All 37 primary and rank-two reachable; 36 rank-three reachable; Colorless never rank three.
- Winner share range: Black 8.2184% to Abzan 0.6210%.
- Supporting-answer opportunity range: 8 to 59.
- All 37 can win with zero direct positive evidence.
- 20/356 stable answer IDs; 0/356 answer-level provenance links; 0 neutral/mixed/unsure answers.
- 37 generated dossiers; 609/666 normalized decree pairs above 0.65 token Jaccard; zero normalized exact copy pairs.
- 1,224 claim register rows: 868 raw identity claims + 356 live answer claims.
- 101 recommendation entries: 82 locally indexed exact-color commanders, 18 deck links, 1 legal special-rule commander absent from the local index.
- 34 defects: 4 Critical, 20 High, 9 Medium, 1 Low.

## Critical Findings

- `VM551-D001`: live Hall/Crucible scoring is disconnected from canonical recovered evidence contracts.
- `VM551-D002`: Bayesian/probability terminology is unsupported by implementation.
- `VM551-D003`: confidence is uncalibrated softmax share.
- `VM551-D004`: every identity can win without affirmative evidence.

## High Findings

- `VM551-D005`: exact ties silently default by identity key.
- `VM551-D006`: numeric second/third is mislabeled adjacency.
- `VM551-D007`: one adjacent view can contradict itself (`Strong`, `Emerging`, `1%`).
- `VM551-D008`: no neutral/mixed/unsure answer state.
- `VM551-D009`: 336 answers lack stable IDs.
- `VM551-D010`: all 356 answer effects lack provenance.
- `VM551-D011`: recovered minimum-hit/guardrail semantics are inert.
- `VM551-D012`: placement-model schema is too weak to enforce contracts.
- `VM551-D013`: scoring configuration includes unused/dead controls.
- `VM551-D014`: mandatory metaphorical Gate produces broad color-derived bias.
- `VM551-D015`: all-37 opportunity and winner shares are highly unequal.
- `VM551-D016`: Colorless has incomplete rank-state coverage and extreme share.
- `VM551-D017`: copy expands answer signals into unsupported behavioral claims.
- `VM551-D020`: live player-behavior interpretations lack explicit source bridges.
- `VM551-D021`: recommendation personalization/evidence types are conflated.
- `VM551-D023`: legacy compatibility fabricates confidence.
- `VM551-D029`: results lack exact input/evidence hashes.
- `VM551-D030`: regression tests lack empirical calibration and claim-entailment gates.
- `VM551-D031`: Commander index misses a legal Spacecraft commander rule.
- `VM551-D032`: committed semantic-readiness provenance is stale at the exact base.

## Decisions Made

- Describe the model as adaptive weighted scoring, not Bayesian inference.
- Treat winner shares as internal model outputs, never correctness probabilities.
- Classify current placement as an editorial exploration heuristic until Gate A/B repairs pass.
- Require independent affirmative evidence and a relationship type for adjacency.
- Keep numeric confidence prohibited until empirical calibration exists.
- Preserve all 37 certified identity records; repair contracts must reference rather than rewrite them without separate authorization.
- Keep implementation sequence MVP-first: Gate A trust blockers, Gate B correctness, Gate C interpretation, Gate D hardening.

## Requirements Specification

`docs/audits/vm551-placement-system/requirements-specification.md` declares:

- canonical evidence and controlled signal records,
- question-to-signal and identity evidence contracts,
- honest score/probability and confidence contracts,
- primary/adjacent/tie/mixed/insufficient contracts,
- copy claim and recommendation contracts,
- rendering/state/deep-link contracts,
- schema, manifest, source/generated, legality, and compatibility requirements,
- exhaustive validation, independent review, and later production certification gates.

## Prioritized Repair Sequence

- Gate A — Trust blockers: terminology, canonical contracts, affirmative evidence/unknown/ties, meaningful adjacency, provenance.
- Gate B — MVP correctness: smallest behavior-first question set, uncertainty/correlation, all-37 bias/sensitivity, honest confidence, recommendation disclosure.
- Gate C — Interpretation quality: claim-entailing copy, primary/alternative/adjacent separation, repetition and presentation repair.
- Gate D — Hardening: schemas/hashes, calibration corpus, exhaustive automation, migrations, independent review/certification tooling.

## Tests Run

Passed:

- Audit generator and byte-reproducibility hashes for six CSV/JSON outputs.
- Count/uniqueness/source-path/requirement-trace reconciliation.
- `npm.cmd run test:placement`.
- `npm.cmd run test:gate-live-bias`.
- `npm.cmd run test:gate-compression`.
- `npm.cmd run test:bias:all`.
- `npm.cmd run test:source-generated` (two existing model-owned warnings).
- `npm.cmd run test:parser` (226 cases).
- `npm.cmd run lint:js`.
- `npm.cmd run lint:html`.
- `npm.cmd run test:frontend-smoke`.
- `npm.cmd run test:route-metadata`.
- `npm.cmd run test:copy-boundaries`.
- `npm.cmd run test:browser-smoke`.
- In-app browser representative placement/render/state/accessibility checks.

Incomplete/failing baseline checks:

- `npm.cmd run test:semantic-readiness`: stale committed provenance after earlier subtests pass (`VM551-D032`).
- `npm.cmd test`: absent ignored `data/scryfall/raw/oracle-cards.json` after earlier suites pass (`VM551-D034`).
- `npm.cmd run test:visual:archscry`: 17 missing baseline artifacts (`VM551-D033`).

Dependencies were installed with `npm.cmd ci --ignore-scripts`; package and lockfile were unchanged. No audit fix or dependency mutation was applied.

## Risks / Uncertainties

- No empirical player-response/correctness corpus exists, so accuracy and calibration cannot be certified.
- Exhaustive paths are runtime-reachable paths, not arbitrary sequences of all questions.
- Claim authority and answer-dimension classifications are review-routing aids, not new canonical truth.
- Recommendation currentness is bounded by a May 2026 local Scryfall snapshot plus a focused current official-rule check.
- CECOS draft.2 is a production candidate rather than approved final.
- Missing aggregate fixture and visual baselines limit clean-checkout automated validation.

## Not Touched

- Production JavaScript, HTML, CSS, runtime JSON, routes, analytics, persistence, Supabase, deployment, or hosting.
- Raw identity claims/sources/profiles/placement records and certified CRIT-001 semantics.
- Faction builder, Gate source, generated placement model/factions/layers/provenance, schemas, precon/taxonomy/Scryfall data.
- VM-552 or unrelated work.
- Remote branches, PRs, deployment, certification, or release metadata.

## Explicit Boundary Confirmations

- No production implementation changed.
- Nothing was pushed, merged, deployed, or certified.
- No VM-551 repair or implementation task was created or started.
- No production generated artifact was accepted or modified as part of VM-551.
- Only explicit paths were staged; `git add .` and `git add -A` were not used.

## Follow-up Recommendations

1. Owner reviews Critical/High findings and confirms defect categories.
2. Owner accepts, rejects, or revises the CECOS contract architecture.
3. Owner explicitly chooses the Gate A and Gate B MVP boundary.
4. Only after acceptance, create a separately authorized implementation plan and tasks.

## Next Suggested Agent

Owner/reviewer. No implementation agent is authorized yet.

## Related Kanban, Docs, and Plans

- `docs/kanban/done/VM-551-full-placement-system-audit.md`
- `docs/audits/vm551-placement-system/VM-551-full-placement-system-audit.md`
- `docs/audits/vm551-placement-system/requirements-specification.md`
- `docs/incidents/CRIT-001-drift-control-template.md`

## Next Gate

Owner review of the VM-551 audit findings and repair requirements. Implementation planning is not authorized until the audit is accepted, defect categories are confirmed, and the MVP repair boundary is explicitly approved.

# VM-551 Placement-System Audit Artifacts

Start with `VM-551-full-placement-system-audit.md`. The owner-rejection remediation is governed by `audit-input-authority.md`; `remediation-analysis-summary.json` is the reconciled quantitative summary. Five of the original six generated evidence artifacts remain byte-identical. `identity-reachability-opportunity-matrix.csv` has one intentional reconciliation correction: its stale `can-win-with-zero-positive-evidence` bias label is replaced by a withdrawn-historical invalid-counter marker; quantitative fields are unchanged. `audit-input-manifest.json` records both hashes.

Boundary precedence: `bounded-mvp-repair-plan.md` and `requirements-traceability-matrix.csv` govern Gate A/B1/B2. Narrative summaries must agree with them. `owner-review-evidence-manifest.md` pins the bounded owner-review package, and `owner-review-critical-extract.md` exposes consequential rows without replacing their machine-readable sources.

Historical-artifact warning: `identity-reachability-opportunity-matrix.csv` preserves the rejected audit's invalid `minimum_positive_evidence_when_primary` column for field-level traceability, but its stale bias-indicator conclusion is explicitly relabeled as withdrawn historical. Do not use the invalid column. Use the corrected strong-hit and negative-only fields in `sensitivity-dependency-collision-analysis.json` and `identity-distinctiveness-matrix.csv`.

## Human-readable audit

- `VM-551-full-placement-system-audit.md`
- `placement-system-architecture-map.md`
- `question-and-identity-matrix-summary.md`
- `decision-classification-and-state-model.md`
- `copy-evidence-recommendation-rendering-audit.md`
- `requirements-specification.md`
- `question-disposition-summary.md`
- `identity-distinctiveness-analysis.md`
- `scenario-validation-summary.md`
- `sensitivity-dependency-collision-analysis.md`
- `repeated-signal-dependency-analysis.md`
- `evidence-integration-and-cecos-readjudication.md`
- `voice-and-explanation-audit.md`
- `bounded-mvp-repair-plan.md`
- `validation-record.md`
- `owner-review-evidence-manifest.md`
- `owner-review-critical-extract.md`

## Machine-reviewable evidence

- `analysis-summary.json`
- `question-to-signal-matrix.csv`
- `identity-reachability-opportunity-matrix.csv`
- `copy-comparison-corpus.json`
- `copy-comparison-pairs.csv`
- `claim-evidence-register.csv`
- `defect-register.csv`

## Remediation authority and machine-reviewable evidence

- `audit-input-authority.md`
- `audit-input-manifest.json`
- `cecos-conclusion-adjudication.csv`
- `question-quality-adjudication.csv` (113 questions)
- `answer-quality-adjudication.csv` (356 answers)
- `question-disposition-summary.json`
- `identity-distinctiveness-matrix.csv` (37 identities)
- `profile-scenario-matrix.csv` and `profile-scenario-details.json` (37 scenarios)
- `adversarial-scenario-matrix.csv` (nine scenarios)
- `sensitivity-dependency-collision-analysis.json`
- `repeated-signal-dependency-audit.csv`
- `evidence-integration-matrix.csv`
- `explanation-trace-audit.json`
- `defect-register-remediated.csv` (authoritative remediated register; original IDs preserved)
- `requirements-traceability-matrix.csv`
- `remediation-analysis-summary.json`

Scenario warning: all 37 current profile probes are `GOLDEN-PATH-DERIVED`, have `EXACT-PRIMARY` scoring outcomes, and are `INCOMPLETE` as review scenarios because none contains an independently selected neighboring or mixed/uncertain challenge. They are reachability evidence, not semantic placement accuracy or empirical player validation.

## Reproduce

```powershell
node docs\audits\vm551-placement-system\audit-placement-system.mjs
node docs\audits\vm551-placement-system\audit-placement-system-remediation.mjs
node docs\audits\vm551-placement-system\build-owner-review-package.mjs
node docs\audits\vm551-placement-system\validate-owner-review-reconciliation.mjs
```

Both generators read production sources but write only inside this audit directory. The remediation generator also reads and hashes the exact CECOS draft.4 Git object. It does not browse, modify production data, or alter runtime behavior.

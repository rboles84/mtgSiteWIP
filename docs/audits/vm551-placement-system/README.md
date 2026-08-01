# VM-551 Placement-System Audit Artifacts

Start with `VM-551-full-placement-system-audit.md`. The owner-rejection remediation is governed by `audit-input-authority.md`; `remediation-analysis-summary.json` is the reconciled quantitative summary. The original six generated evidence artifacts remain byte-identical and are preserved rather than rewritten.

Historical-artifact warning: `identity-reachability-opportunity-matrix.csv` preserves the rejected audit's invalid `minimum_positive_evidence_when_primary` column for byte-level traceability. Do not use that column. Use the corrected strong-hit and negative-only fields in `sensitivity-dependency-collision-analysis.json` and `identity-distinctiveness-matrix.csv`.

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

## Reproduce

```powershell
node docs\audits\vm551-placement-system\audit-placement-system.mjs
node docs\audits\vm551-placement-system\audit-placement-system-remediation.mjs
```

Both generators read production sources but write only inside this audit directory. The remediation generator also reads and hashes the exact CECOS draft.4 Git object. It does not browse, modify production data, or alter runtime behavior.

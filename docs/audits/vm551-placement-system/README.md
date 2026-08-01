# VM-551 Placement-System Audit Artifacts

Start with `VM-551-full-placement-system-audit.md`.

## Human-readable audit

- `VM-551-full-placement-system-audit.md`
- `placement-system-architecture-map.md`
- `question-and-identity-matrix-summary.md`
- `decision-classification-and-state-model.md`
- `copy-evidence-recommendation-rendering-audit.md`
- `requirements-specification.md`

## Machine-reviewable evidence

- `analysis-summary.json`
- `question-to-signal-matrix.csv`
- `identity-reachability-opportunity-matrix.csv`
- `copy-comparison-corpus.json`
- `copy-comparison-pairs.csv`
- `claim-evidence-register.csv`
- `defect-register.csv`

## Reproduce

```powershell
node docs\audits\vm551-placement-system\audit-placement-system.mjs
```

The generator reads production sources but writes only inside this audit directory.

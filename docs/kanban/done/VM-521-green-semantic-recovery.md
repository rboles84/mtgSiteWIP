# VM-521 - Green Semantic Recovery

ID: VM-521
Status: Done - Certified Semantically Ready
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: G
Raw packet: `data/raw-factions/green/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 after committed drift preflight

## Objective

Prepare the next CRIT-001 identity slot for Green / G after VM-520 Red certification. The VM-521 drift preflight passed, Gate 1+2 authorized scoped remediation, Gate 3+4 remediation plus Gate 5 candidate creation are complete, the original independent review returned `REQUEST CHANGES`, and the fresh provenance re-review approved exact candidate `45e323cde853ee5058b71c819f080ab4025597ce`.

Current state: VM-521 Green / G is certified `semantically_ready` under CRIT-001 Contract v1.1 from exact approved candidate `45e323cde853ee5058b71c819f080ab4025597ce`. Fresh provenance re-review `ec148486ff2442ff2e3145dd9d45a6d993179766` returned `APPROVE EXACT SHA 45e323cde853ee5058b71c819f080ab4025597ce` after provenance audit `aa62ac329c53c00016dcce749b5fea73b145d4ac` resolved the original active-consumer classification. Original rejection review `2f776d8ac488a349db0975094b5948a9c3183674`, superseded calibration-drift candidate `83123037f619472a4d2834e124311df691281a53`, failed historical repair `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0`, and stop-line `542015ab4dee8158002eb96dca65ef03fa81904d` remain preserved; superseded/failed objects remain unapproved. Certification uses `PENDING_VM521_CERTIFICATION_COMMIT_SHA` internally; the actual SHA is reported in final task output. Wave 3 monocolors are complete: 5 of 5 certified. VM-522 and Excel remain untouched.

## Gates

- [x] Drift preflight - passed in `docs/incidents/recoveries/VM-521-green-drift-preflight.md`; commit `PENDING_VM521_DRIFT_PREFLIGHT_SHA`.
- [x] Gate 1 - Packet audit and bounded disposition; complete in `docs/incidents/recoveries/VM-521-green-semantic-recovery.md`.
- [x] Gate 2 - Sufficient evidence confirmation; complete with `REMEDIATION AUTHORIZED`.
- [x] Gate 3 - Canonical remediation; complete in candidate `45e323cde853ee5058b71c819f080ab4025597ce`.
- [x] Gate 4 - Generation and validation; complete in candidate `45e323cde853ee5058b71c819f080ab4025597ce`.
- [x] Gate 5 - Candidate creation; final candidate `45e323cde853ee5058b71c819f080ab4025597ce` created after superseding `83123037f619472a4d2834e124311df691281a53`.
- [x] Gate 5 - Independent review of exact candidate SHA; returned `REQUEST CHANGES` in `docs/incidents/recoveries/VM-521-green-independent-review.md`.
- [x] Gate 5 - Fresh provenance re-review of exact candidate SHA; returned `APPROVE EXACT SHA 45e323cde853ee5058b71c819f080ab4025597ce` in `docs/incidents/recoveries/VM-521-green-provenance-rereview.md`.
- [x] Certification of exact approved candidate SHA; complete.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- Green source, claim, profile, placement, generated data, fixtures, provenance, preview, recruiter, and recommendation data were remediated and generated in the approved candidate. Certification, VM-522 work, original-main modification, and Excel updates remain unauthorized until the next explicit certification window.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift preflight record: `docs/incidents/recoveries/VM-521-green-drift-preflight.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-521-green-semantic-recovery.md`
- Candidate recovery SHA: `45e323cde853ee5058b71c819f080ab4025597ce`
- Superseded candidate SHA: `83123037f619472a4d2834e124311df691281a53`
- Independent review record: `docs/incidents/recoveries/VM-521-green-independent-review.md`
- Original independent review decision: `REQUEST CHANGES`
- Fresh provenance re-review decision: `APPROVE EXACT SHA 45e323cde853ee5058b71c819f080ab4025597ce`
- Certification commit: `PENDING_VM521_CERTIFICATION_COMMIT_SHA`

## Setup Boundary

VM-521 Green / G was created only as the next active CRIT-001 identity slot after VM-520 Red certification. Current program base is the VM-520 Red certification SHA `9f0a076a369cba23dc9bc19231b0efcddd21afe5`. The separate drift-preflight record applied `docs/incidents/CRIT-001-drift-control-template.md` and returned `PASS - GREEN GATE 1+2 AUTHORIZED`. Gate 1+2 read-only audit later completed with `REMEDIATION AUTHORIZED`; Gate 3+4 remediation and Gate 5 candidate creation are complete under frozen-field, exact-chain, preview, neighbor, Table Talk, candidate-scope, and VM-522 stop controls. Candidate-scope exits 1 only for the documented Green display-source exception: `data/identity-layers.json#/expressions/G/preview_text` and generated `data/factions.json#/identity_layers/expressions/G/preview_text`. Fresh provenance re-review approved the exact candidate after VM-542/DRIFT-019 corrected the active-consumer classification. Certification, semantically_ready transition, VM-522 work, original-main modification, and Excel updates remain not started.

## Certification - 2026-07-19

- Decision: `CERTIFIED SEMANTICALLY_READY`.
- Exact approved candidate: `45e323cde853ee5058b71c819f080ab4025597ce`.
- Fresh approval review: `ec148486ff2442ff2e3145dd9d45a6d993179766`.
- Original rejection review: `2f776d8ac488a349db0975094b5948a9c3183674`, preserved as historical.
- Superseded candidate: `83123037f619472a4d2834e124311df691281a53`, preserved and unapproved after calibration-note scope finding.
- Failed historical repair: `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0`, preserved and unapproved; Green stop-line `542015ab4dee8158002eb96dca65ef03fa81904d`.
- Provenance audit: `aa62ac329c53c00016dcce749b5fea73b145d4ac`; disputed NDJSON files remain `DEBUG_INSPECTION_ARTIFACT`, matrix JS files remain `HISTORICAL_ARCHIVE`, and residual stale strings remain VM-542/DRIFT-019 hygiene debt only.
- Green provenance count: 25.
- Candidate-scope result: `PASS - approved documented G display-source exception` limited to `data/identity-layers.json#/expressions/G/preview_text` and `data/factions.json#/identity_layers/expressions/G/preview_text`.
- Program status: 20 certified identities; Wave 3 monocolors complete, 5 of 5 certified.
- VM-522: not started.
- External Excel: untouched.

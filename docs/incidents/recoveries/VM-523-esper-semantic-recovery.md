# VM-523 - Esper Semantic Recovery

Status: Done - Certified Semantically Ready
Program: CRIT-001 - 37-Identity Semantic Recovery Program
Identity: Esper / WUB
Internal key: ESPER
Contract: CRIT-001 Contract v1.1

## Certification Summary

Esper / WUB is certified `semantically_ready` from exact approved candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80`. The certification records candidate workflow object `841154f80a786ae41fa59c5835ec9370e40cb05e` and independent review object `995e4c018af1097d92ffe61b710eb069ec82e6d8`. The certification commit is self-referential, so tracked governance uses `PENDING_VM523_CERTIFICATION_COMMIT_SHA`; the actual certification SHA is reported externally after commit creation and becomes the new program base.

## Preserved History

- Preflight: `docs/handoffs/2026-07-20-0902-codex-vm523-esper-drift-preflight.md`.
- Gate 1+2 audit: `docs/handoffs/2026-07-20-1023-codex-vm523-esper-gate1-gate2.md`.
- Gate 3+4 remediation: `docs/handoffs/2026-07-20-1219-codex-vm523-esper-gate3-gate4.md`.
- Candidate workflow: `docs/handoffs/2026-07-20-1641-codex-vm523-esper-candidate-workflow.md`.
- Independent approval review: `docs/handoffs/2026-07-20-1914-codex-vm523-esper-independent-review.md`.

## Certification Checks

- Exact approval line: `APPROVE EXACT SHA 6467f70fa4de13173172e20277e0fd56ebaf0b80`.
- Claim counts: 9 total; 7 substantive; 2 support; 0 discovery; 0 unclassified.
- Evidence locators: 21 total; 16 substantive locators; 0 missing.
- Provenance: 56 ESPER entries; 0 null canonical IDs; 0 null hashes; 0 duplicate canonical/null keys; 0 support records in authoritative chains.
- Fixture: 23 cases, PASS.
- Collision and placement: PASS.
- Preview source/embedded equality: PASS.
- Recruiter lateral inhibition targets: `WU`, `UB`, `WB`, `BANT`, `GRIXIS`.
- Home, Archscry, recruiter, tests, and CI consumers: PASS.
- DRIFT-015, DRIFT-016, DRIFT-017: PASS.
- Frozen-field and non-Esper integrity: PASS.
- Candidate-scope: PASS for ESPER; invalid WUB alias exits 1 with `Unknown identity WUB`.

## Program State

- Certified count: 22 of 37.
- Wave 4 shards: 2 of 10 certified.
- Next identity: VM-524 / Grixis remains not started.
- External Excel tracker: untouched.
- VM-542/DRIFT-019 residual artifacts and historical/debug/archive exclusions: untouched.

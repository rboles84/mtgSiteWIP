# 2026-07-18 17:27 - Codex - VM-520 Red Candidate

## Agent name

Codex

## Task requested

Complete VM-520 Red / R CRIT-001 Goal-mode work from Gate 1+2 read-only audit through Gate 5 candidate creation and a separate workflow-record commit. Stop with the exact Red candidate awaiting independent review.

## Files reviewed

- `C:\Users\obake\.codex\attachments\b7af5c83-673a-4b1c-a894-0725b18b1466\pasted-text-1.txt`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- Red raw, generated, fixture, provenance, recruiter, source digest, and monocolor precedent files.

## Files changed

Implementation candidate:

- `data/raw-factions/red/red.claims.json`
- `data/raw-factions/red/red.profile.json`
- `data/raw-factions/red/red.placement.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Workflow records:

- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-18-1727-codex-vm520-red-candidate.md`

## What changed

- Created exact Red candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.
- Assigned final Red claim roles: 6 substantive, 0 discovery, 2 support, 0 unclassified.
- Added bounded evidence locations and evidence scopes to all substantive Red claims.
- Isolated source-intake, rules, Scryfall, Commander, mechanics, and governance/process support from broad philosophical proof chains.
- Added stable native provenance IDs for Red profile, mechanics, site surface, placement summary, and chatbot mismatch guidance.
- Rebuilt generated placement, faction, recruiter, and provenance outputs.
- Added Red semantic fixtures with exact fixture/provenance parity for `/core_identity` and `/placement_summary`.
- Replaced the generic Red preview with DRIFT-015 source-owned copy and propagated it to the embedded generated consumer.
- Updated governance records to hold Red at `candidate_awaiting_independent_review`.

## Why it changed

Gate 1+2 found Red was not Contract v1.1-ready: claims were unclassified, evidence scopes were missing, support/process rows contaminated semantic chains, required provenance IDs were null, Red fixtures were absent, chatbot mismatch guidance lacked evidence mapping, and the preview was generic Red overfit.

## Decisions made

- `red_claim_0002` through `red_claim_0007` are substantive; `red_claim_0007` is mechanic/process-specific only.
- `red_claim_0001` and `red_claim_0008` are support records.
- The frozen placement summary text, calibration terms, thresholds, broad penalty, strengthen/suppress lists, guardrail, lateral targets, collision shape/order, native IDs, and optional-field absences were preserved.
- The Red preview required DRIFT-015 remediation because the old text centered generic emotion/authenticity/passion/expression without consequence or attachment boundaries.
- Candidate-scope exit 1 is documented as an R display-source exception pending independent review, limited by inspection to `data/identity-layers.json#/expressions/R/preview_text` and `data/factions.json#/identity_layers/expressions/R/preview_text`.

## Risks / uncertainties

- Independent review must validate the documented DRIFT-015 exception and may still request changes.
- The source file uses local capture hashes for public-source artifacts rather than a uniform `content_hash` field; generated provenance canonical content hashes are present and validator-clean.
- Known unrelated `test:source-generated` warnings remain for JESKAI and MARDU model-owned inhibitor traps.

## Tests run

- `node -e "JSON.parse(...red.semantic-fixtures.json...)"`
- `node research/validate-semantic-readiness.mjs --targets=R`
- custom read-only Red role/evidence/provenance/frozen/preview control script
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=R`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870 --identity=R`

## Not touched

- No independent review was performed.
- No approval or rejection decision was issued.
- Red was not certified and not marked `semantically_ready`.
- Program base remains `1116786785dc4c5c8c1447dcad79c89e527657eb`.
- Certified count remains 18 and Wave 3 remains 3 of 5.
- VM-521 was not started.
- Original main `C:\dev\mtgSiteWIP` was not modified.
- Excel was not modified.
- Existing Table Talk baseline files were preserved and excluded.

## Follow-up recommendations

- Run independent review against exact candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.
- Review the documented R display-source exception and preview semantics before any approval decision.
- Do not certify Red or start VM-521 until an exact candidate SHA receives independent approval.

## Next suggested agent

Independent reviewer for exact Red candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.

## Related Kanban card, docs, or plans

- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-drift-control-template.md`

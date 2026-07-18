# 2026-07-18 17:05 - Codex - VM-520 Red Gate 1+2

## Agent

Codex

## Task Requested

Complete VM-520 Red / R Gate 1+2 read-only semantic and evidence audit after the committed Red drift preflight, create governance-only records, and stop before remediation, candidate creation, independent review, approval, certification, VM-521, original-main modification, Excel update, push, PR, or merge.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- Recent VM-517, VM-518, and VM-519 monocolor recovery, review, and certification records.
- `data/raw-factions/red/red.claims.json`
- `data/raw-factions/red/red.sources.json`
- `data/raw-factions/red/red.profile.json`
- `data/raw-factions/red/red.placement.json`
- `data/raw-factions/red/red.changelog.json`
- `docs/research/mono_upgrade/13_red.md`
- `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md`
- `docs/research/mono_upgrade/22_council_of_colors.md`
- `docs/research/mono_upgrade/30_commander_and_rules.md`
- Red generated consumers and provenance in `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json`, `data/semantic-readiness-provenance.json`, and `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-18-1705-codex-vm520-red-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Recorded the VM-520 Red Gate 1+2 read-only audit and evidence confirmation.
- Classified source authority and permitted source use.
- Recorded initial role counts: 8 total claims, all unclassified.
- Authorized Gate 3+4 remediation because Red has sufficient local official evidence but is not Contract v1.1-ready.
- Recorded frozen placement, collision, optional-field, preview, fixture/provenance, and neighbor-boundary controls.
- Updated VM-520 governance state to Gate 1+2 complete / remediation authorized.

## Why It Changed

The Red packet currently lacks semantic roles, bounded evidence locations, guidance evidence mapping, stable canonical IDs for required profile locators, and semantic fixtures. Generated proof chains reference unclassified claims and the identity-layer preview is semantically risky under DRIFT-015/017.

## Decisions Made

- Decision: `REMEDIATION AUTHORIZED`.
- Expected final role disposition: `red_claim_0002` through `red_claim_0007` substantive; `red_claim_0001` and `red_claim_0008` support-only.
- `MONO-R-2015` and `MONO-R-2025` are the only broad Red philosophy proof sources.
- `MECH-CP-2021` and `GOV-COC-2024` may support mechanic/process-specific texture only.
- Rules, Scryfall, and project governance rows must stay support-only and out of authoritative semantic proof chains.
- Remediation must preserve Red frozen fields and object-with-`pairs` collision structure.

## Risks / Uncertainties

- The current preview text is equal between source and embedded consumer, but equality is not semantic alignment; Gate 3+4 likely needs a DRIFT-015 preview replacement.
- Red public/recruiter copy naturally uses high-risk terms such as freedom, emotion, impulse, passion, speed, damage, and haste; candidate review must verify these are source-bounded and not generic Red overfit.
- Candidate-scope validation may require a documented display-source exception if the Red preview is changed.

## Tests Run

- `git status --short --branch`
- `git rev-parse HEAD`
- `git branch --show-current`
- `git cat-file -e '1116786785dc4c5c8c1447dcad79c89e527657eb^{commit}'`
- `git merge-base --is-ancestor 1116786785dc4c5c8c1447dcad79c89e527657eb HEAD`
- `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js`
- `git log --oneline aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2..HEAD -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js`
- `node research/semantic-candidate-scope-tests.js`
- `node research/audit-semantic-readiness.mjs --targets=R`
- `node research/validate-semantic-readiness.mjs --targets=R` exited 1 with expected pre-remediation failures.
- `node research/validate-semantic-candidate-scope.mjs --base=94a33b70fdac83b350195a3eed7f34118f999e31 --target=94a33b70fdac83b350195a3eed7f34118f999e31 --identity=R` exited 1 with expected unclassified proof-chain diagnostics and no crash.
- Read-only original main status check.

Final staged-scope, diff, and commit checks are recorded in the final task response.

## Not Touched

- No Red raw semantic, generated, fixture, provenance, preview, recruiter, source, test, schema, validator, builder, scoring, calibration, or runtime file was edited.
- No candidate was created.
- No independent review, approval, certification, or `semantically_ready` transition occurred.
- VM-521 was not started.
- Original main and external Excel tracker were not modified.
- Table Talk handoff files and unrelated index hunks were preserved and excluded.

## Follow-Up Recommendations

- Proceed to Gate 3+4 remediation only under the constraints recorded in `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`.
- Pay special attention to DRIFT-015/017 preview semantic alignment and candidate-scope exception handling.
- Create a Red fixture from generated truth after remediation, then validate exact fixture/provenance parity before candidate creation.

## Next Suggested Agent

Main Codex identity for VM-520 Red Gate 3+4 remediation and Gate 5 candidate creation.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`

# VM-525 Jund Candidate Workflow Handoff

Agent name: Codex

Task requested: Resume VM-525 Jund from DRIFT-020 certification through Gate 5 candidate creation and candidate workflow recording, without independent review, certification, VM-526, Excel, push, PR, merge, or original-main edits.

Files reviewed:
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-525-jund-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- VM-525 preflight, Gate 1+2, Gate 3+4 stop, and DRIFT-020 certification handoffs
- Jund raw source files, generated consumers, validators, and fixtures

Files changed in exact semantic candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`:
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/identity-layers.json`
- `research/fixtures/semantic-readiness/jund.semantic-fixtures.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Files changed in this workflow/governance commit:
- `docs/kanban/ready/VM-525-jund-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-21-2213-codex-vm525-jund-candidate-workflow.md`

What changed:
- Created continuation worktree `C:\dev\mtgSiteWIP-crit001-vm525-jund-post-drift020` from DRIFT-020 certification base `665d2b128f3aab8daf5d48d4fdab244a9fb33c2e`.
- Remediated Jund to 13 claims: 12 substantive claims and 1 support record.
- Added bounded evidence locators and source records for approved Jund/Alara evidence.
- Added required Jund provenance owner IDs, semantic guidance evidence, Jund fixtures, and exact preview text.
- Regenerated Jund generated consumers and semantic provenance.
- Created final exact semantic candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`.
- Preserved superseded candidates `ba606b702832ce84baf45055562808f9b971e897` and `4a2c6462c4967f661bfa5357805fc155d2d5a746` as unapproved.

Why it changed:
- DRIFT-020 certified the narrow candidate-scope infrastructure needed to permit `data/identity-layers.json#/expressions/JUND/preview_text`, clearing the previous Jund Gate 3+4 stop.
- Gate 1+2 had already authorized bounded Jund semantic remediation once the preview-scope blocker was cleared.

Decisions made:
- `JUND` remains the only valid identity key; `BRG` remains invalid alias/metadata only.
- WUBRG is retained as a draft generic-trap fixture/collision note with `lateral_inhibition: false`, not as a generated Jund lateral target.
- Original Jund collision entries retain frozen confidence fields and native IDs; appended collision guidance does not add forbidden confidence fields.
- Support-only story, character, dragon, clan, demon, devour, and Modern Jund material remains excluded from semantic proof chains.

Risks / uncertainties:
- `npm.cmd test` is not fully green in this local install because declared devDependency `xlsx` is absent from `node_modules`; the command passes earlier sections and then fails at `research/import-precon-mechanics-validation.mjs` with `ERR_MODULE_NOT_FOUND: xlsx`.
- Exact archive export without Git metadata cannot run candidate-scope and initially trips byte-strict provenance checks under CRLF checkout; detached exact Git worktree verification passed after LF provenance normalization with no semantic diff.
- Independent review has not been performed; no approval or certification exists.

Tests run:
- `node research/audit-semantic-readiness.mjs --targets=JUND` - PASS after remediation; 13 claims, 12 substantive, 1 support, 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=JUND` - PASS.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=JUND` - PASS.
- `npm.cmd run test:semantic-readiness` - PASS in candidate worktree.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `node research/validate-source-generated-guardrails.mjs --targets=JUND` - PASS with one inherited model-owned inhibitor warning.
- `npm.cmd run test:placement` - PASS.
- `npm.cmd run test:parser` - PASS.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `npm.cmd run test:source-generated` - PASS for scripted default targets with existing warnings.
- `node research/build-semantic-readiness-provenance.mjs --check` - PASS in candidate worktree.
- `npm.cmd run build:factions` idempotence - PASS; before/after diff hashes matched.
- `node research/validate-semantic-candidate-scope.mjs --base=665d2b128f3aab8daf5d48d4fdab244a9fb33c2e --target=b275fc62aca3ed67bcdc624ea59b3ee15cdeae04 --identity=JUND` - PASS.
- `node research/validate-semantic-candidate-scope.mjs --base=665d2b128f3aab8daf5d48d4fdab244a9fb33c2e --target=b275fc62aca3ed67bcdc624ea59b3ee15cdeae04 --identity=BRG` - expected FAIL, unknown identity.
- `node research/validate-semantic-candidate-scope.mjs --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=460dd7186dc76658797beac74a4330cc699a52d6 --identity=JUND` - expected FAIL; historical stop remains invalid as a semantic candidate.
- Exact detached Git worktree `C:\Users\obake\AppData\Local\Temp\j-b275fc62`: candidate-scope PASS, JUND readiness PASS, placement PASS, semantic-readiness PASS after LF provenance normalization.

Not touched:
- No independent review, approval, rejection, certification, semantically_ready transition, certified-count change, program-base advancement beyond recording candidate parent, VM-526/Naya work, Excel edit, push, PR, merge, original-main edit, DRIFT-017 prototype read/copy/use, VM-542/DRIFT-019 residual, historical/debug/archive change, Table Talk file change, package/dependency install, CI change, or global runtime calibration change.

Follow-up recommendations:
- Assign an independent reviewer to review exact SHA `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04` only.
- Reviewer should rerun exact candidate-scope, JUND readiness, fixture/provenance checks, and frozen-field/lateral-target checks from a clean exact tree.
- Do not start VM-526 until VM-525 independent review and certification gates are complete, except setup-only work explicitly allowed by CRIT-001 drift controls.

Next suggested agent: Independent Reviewer

Related Kanban card, docs, or plans:
- `docs/kanban/ready/VM-525-jund-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`
- `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
- `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
- `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
- `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`

READY FOR INDEPENDENT REVIEW OF EXACT SHA b275fc62aca3ed67bcdc624ea59b3ee15cdeae04

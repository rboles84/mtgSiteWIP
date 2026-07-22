# VM-525 Jund Independent Exact-SHA Review

## Agent name

Codex

## Task requested

Perform a fresh independent CRIT-001 exact-SHA review of VM-525 Jund semantic candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04` from workflow commit `461ff5c389a93c6c5e5fc7317bbc5413d214a960`, without modifying the candidate, creating a replacement, certifying, starting VM-526, editing Excel, pushing, opening a PR, or merging.

## Files reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-21-1229-codex-vm525-jund-drift-preflight.md`
- `docs/handoffs/2026-07-21-1457-codex-vm525-jund-gate1-gate2.md`
- `docs/handoffs/2026-07-21-1710-codex-vm525-jund-gate3-gate4-stop.md`
- `docs/handoffs/2026-07-21-2213-codex-vm525-jund-candidate-workflow.md`
- `docs/handoffs/2026-07-21-1829-codex-drift020-jund-preview-candidate-scope.md`
- `docs/handoffs/2026-07-21-1920-codex-drift020-preview-candidate-workflow.md`
- `docs/handoffs/2026-07-21-2004-codex-drift020-independent-review.md`
- `docs/handoffs/2026-07-21-2058-codex-drift020-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-525-jund-semantic-recovery.md`
- Candidate diff paths under `data/`, `research/fixtures/semantic-readiness/`, and `supabase/functions/guild-recruiter/`

## Files changed

- `docs/handoffs/2026-07-21-2233-codex-vm525-jund-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-525-jund-semantic-recovery.md`

## What changed

Recorded independent approval of exact semantic candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04` and updated VM-525 governance state to certification-ready. No semantic candidate files, generated files, validator/test files, package files, CI files, Excel files, original-main files, DRIFT-017 prototype files, Table Talk files, or VM-526 files were changed.

## Why it changed

The review reran the required CRIT-001 drift controls, candidate/workflow separation checks, exact candidate-scope controls, semantic readiness checks, generated provenance reconciliation, and exact-candidate test matrix. No approval-blocking findings remained.

## Decisions made

- APPROVE EXACT SHA `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`.
- Treat `BRG` as invalid identity key and metadata-only text, not as a generated or review target key.
- Treat the Windows checkout `semantic-readiness-provenance.json` byte-level `--check` failure before builder normalization as newline conversion only: the candidate blob is LF, equals the generated manifest byte-for-byte, and contains 1987 entries.
- Treat the ignored local `data/scryfall/raw/oracle-cards.json` hardlink as a disclosed test input only, matching documented local-only Scryfall corpus practice.

## Risks / uncertainties

- Certification remains unperformed and must be a separate certification-only window.
- `docs/audits/gate-compression/live-gate-bias.*` are written by `npm.cmd test`; those writes occurred only in the disposable exact-candidate temp worktree.
- The exact-candidate temp worktree used `npm.cmd ci` and an ignored local Scryfall corpus hardlink; neither is part of the candidate commit.

## Tests run

- `git diff --check 665d2b128f3aab8daf5d48d4fdab244a9fb33c2e b275fc62aca3ed67bcdc624ea59b3ee15cdeae04` - pass.
- `node research/audit-semantic-readiness.mjs --targets=JUND` - pass; 13 claims, 12 substantive, 1 support.
- `node research/validate-semantic-readiness.mjs --targets=JUND` - pass.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=JUND` - pass.
- `node research/validate-semantic-candidate-scope.mjs --base=665d2b128f3aab8daf5d48d4fdab244a9fb33c2e --target=b275fc62aca3ed67bcdc624ea59b3ee15cdeae04 --identity=JUND` - pass.
- `node research/validate-semantic-candidate-scope.mjs --base=665d2b128f3aab8daf5d48d4fdab244a9fb33c2e --target=b275fc62aca3ed67bcdc624ea59b3ee15cdeae04 --identity=BRG` - expected fail, unknown identity.
- `node research/validate-semantic-candidate-scope.mjs --base=16528f3a24a7f3d7f4475bdde56fbfee09becd98 --target=460dd7186dc76658797beac74a4330cc699a52d6 --identity=JUND` - expected fail, reproduced stopped-range contamination.
- `node research/semantic-candidate-scope-tests.js` - pass.
- `npm.cmd run test:placement` - pass.
- `npm.cmd run test:faction-context-isolation` - pass.
- `node research/validate-source-generated-guardrails.mjs --targets=JUND` - pass with one existing model-owned inhibitor warning.
- `npm.cmd run test:parser` - pass; 226 parser cases.
- `npm.cmd run test:source-generated` - pass for default JESKAI/MARDU warning baseline.
- `node research/build-semantic-readiness-provenance.mjs --check` in Windows checkout before builder normalization - failed due CRLF working-copy conversion only; raw candidate blob equals generated manifest byte-for-byte.
- In exact detached candidate worktree `C:\Users\obake\AppData\Local\Temp\jund-review-b275-20260721223016`: `npm.cmd ci` - pass.
- In exact detached candidate worktree after supplying ignored Scryfall corpus hardlink: `npm.cmd test` - pass.
- In exact detached candidate worktree after builder normalization: `npm.cmd run test:semantic-readiness` - pass.
- In exact detached candidate worktree: `npm.cmd run build:factions` and `npm.cmd run build:semantic-provenance` - pass; generated files compare byte-equal to candidate blobs.

## Not touched

No candidate semantic data, generated consumers, readiness fixtures, validator/test implementation, package files, CI files, Excel tracker, original-main worktree, DRIFT-017 prototype worktree, Table Talk files, VM-526 files, push, PR, merge, certification state, certified-count field, or semantically_ready ledger state was touched.

## Follow-up recommendations

Run a separate VM-525 certification-only window from this approval review, certify only exact candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`, then update the program base and certified counts if certification passes.

## Next suggested agent

Certification agent for VM-525 Jund.

## Related Kanban card, docs, or plans

- `docs/kanban/ready/VM-525-jund-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`

APPROVE EXACT SHA b275fc62aca3ed67bcdc624ea59b3ee15cdeae04

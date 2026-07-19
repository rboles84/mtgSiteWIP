# VM-521 Green Replacement Candidate Stop-Line Handoff

Agent name: Codex

Task requested: Remediate the VM-521 Green DRIFT-019 consumed-surface preview blocker, create one implementation-only replacement candidate, run required validation, then create a governance-only replacement workflow record if the candidate-stage controls pass.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-521-green-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/recoveries/VM-521-green-drift-preflight.md`
- `docs/incidents/recoveries/VM-521-green-semantic-recovery.md`
- `docs/incidents/recoveries/VM-521-green-independent-review.md`
- `docs/handoffs/2026-07-18-2051-codex-vm521-green-drift-preflight.md`
- `docs/handoffs/2026-07-18-2121-codex-vm521-green-gate1-gate2.md`
- `docs/handoffs/2026-07-18-2147-codex-vm521-green-candidate.md`
- `docs/handoffs/2026-07-18-2221-codex-vm521-green-independent-review.md`
- `assets/js/newindex-color-matrix.js`
- `assets/js/color-matrix-radar.js`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`
- `outputs/mtgdata-v3-enhanced/.work/build-v3-enhanced.mjs`
- `docs/handoffs/2026-07-05-1403-codex-mtgdata-v3-enhanced-workbook.md`
- `docs/kanban/done/VM-476-mtgdata-v3-enhanced-workbook.md`

## Files Changed

Implementation-only candidate `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0`:

- `assets/js/newindex-color-matrix.js`
- `assets/js/color-matrix-radar.js`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`

Stop-line governance:

- `docs/handoffs/2026-07-18-2253-codex-vm521-green-replacement-stop.md`
- `docs/handoffs/HANDOFF_INDEX.md` VM-521 stop-line row only

## What Changed

- Replaced exactly one stale Gate 1+2 Green preview in each of the four active consumed surfaces with the accepted preview extracted from `45e323cde853ee5058b71c819f080ab4025597ce:data/identity-layers.json#/expressions/G/preview_text`.
- Preserved `data/identity-layers.json`, `data/factions.json`, Green raw/profile/placement/provenance/fixture/recruiter files, validators, tests, schemas, scoring, calibration, Hall/Crucible, and all unrelated identities.
- Created replacement attempt candidate `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0`.
- Stopped because exact candidate-scope validation reported additional diagnostics for the four consumed-surface files beyond the two previously documented JSON preview paths.

## Why It Changed

Independent review `2f776d8ac488a349db0975094b5948a9c3183674` returned `REQUEST CHANGES` because candidate `45e323cde853ee5058b71c819f080ab4025597ce` left stale Green preview text in two active JS consumers and two active inspect NDJSON artifacts. The direct propagation fixed the active stale copies, but the prompt's candidate-scope rule blocks final replacement-candidate designation when the validator reports those consumed surfaces as additional non-identity or frozen shared file diagnostics.

## Decisions Made

- Candidate `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0` is preserved as a failed/superseded replacement attempt, not as the final acceptable replacement candidate awaiting review.
- No replacement workflow record was created because the candidate-stage checkpoint did not pass.
- No independent review, approval decision, certification, semantically_ready update, program-base advancement, VM-522 work, original-main write, external Excel update, push, PR, or merge occurred.

## Risks / Uncertainties

- The implementation appears to resolve DRIFT-019 on active consumed surfaces, but the current candidate-scope validator still reports the consumed-surface changes against Gate 1+2.
- The next agent needs either an explicit governance exception for these DRIFT-017 consumed surfaces under the required command, or a different repository-approved validation path. Do not silently weaken the validator or invent an exception.
- Historical CRIT records and inactive UI research prototypes still preserve old preview text as audit/prototype history; these were intentionally not edited.

## Tests Run

- `git rev-parse --show-toplevel`
- `git branch --show-current`
- `git rev-parse HEAD`
- `git merge-base --is-ancestor 9f0a076a369cba23dc9bc19231b0efcddd21afe5 HEAD`
- Required object existence checks for `332ab81ffcfa461df1109e89709d47907e7c0032`, `83123037f619472a4d2834e124311df691281a53`, `45e323cde853ee5058b71c819f080ab4025597ce`, `e86f011063b2434f49d1e447f87d7087532142cd`, and `2f776d8ac488a349db0975094b5948a9c3183674`
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short`
- Exact accepted and stale preview extraction from Git objects
- Consumed-surface ownership and stale-copy inventory
- `node --check assets/js/newindex-color-matrix.js`
- `node --check assets/js/color-matrix-radar.js`
- NDJSON line-by-line parse and line-count comparison for both changed inspect artifacts
- JSON parse checks for Green raw/generated/provenance/fixture files
- Accepted-state regression script for claim roles, evidence scopes, provenance count, null IDs/hashes, duplicate keys, support isolation, fixture chains, active preview equality, and frozen fields
- All 12 Green preflight proof-chain locator checks
- Two runs of `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=G`
- `node research/validate-semantic-readiness.mjs --targets=G`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=332ab81ffcfa461df1109e89709d47907e7c0032 --target=ba2845a6ce6958f11de9c1d4935221c0fdda0ab0 --identity=G` exited `1` with additional consumed-surface diagnostics.

## Not Touched

- No Green raw claims, sources, profile, placement, provenance, fixture, authoritative preview JSON, embedded preview JSON, or recruiter context was changed.
- No tests, validators, schemas, builders, global scoring, calibration, Hall, Crucible, runtime behavior, or unrelated identity data was changed.
- No binary `.xlsx` workbook was modified.
- No external CRIT-001 Excel tracker was modified.
- No original-main worktree file was modified.
- Table Talk baseline files/hunks were preserved and excluded.

## Follow-up Recommendations

- Treat `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0` as a failed/superseded replacement attempt unless the user explicitly authorizes the four consumed-surface diagnostics as a manual DRIFT-017 candidate-scope adjudication.
- If authorized, create a new governance-only workflow record that clearly states the validator output and the explicit adjudication. If not authorized, design a repository-approved validator or workflow path that can distinguish active consumed-surface propagation from unauthorized semantic drift without weakening CRIT-001 controls.
- Preserve the accepted Green semantic state from `45e323cde853ee5058b71c819f080ab4025597ce`.

## Next Suggested Agent

Planning Architect or CRIT-001 governance owner for candidate-scope policy adjudication.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/backlog/VM-521-green-semantic-recovery.md`
- `docs/incidents/recoveries/VM-521-green-independent-review.md`
- `docs/incidents/recoveries/VM-521-green-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`

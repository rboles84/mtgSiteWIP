# VM-527 Abzan Gate 3+4 Semantic Remediation

Agent name: Codex

Task requested: Perform VM-527 Abzan Gate 3+4 semantic remediation exactly from the Gate 1+2 contract, validate the resulting exact candidate SHA, and update only governance records after the semantic candidate commit.

## Decision

PASS - ABZAN GATE 5 CANDIDATE CREATION AUTHORIZED.

Exact semantic candidate SHA: `11c099b8beb9f23e23660787f00b97e89914d50b`.

This is not independent review, approval, certification, semantically_ready transition, program-base advancement, Excel work, VM-528 work, push, PR, merge, original-main work, or protected-worktree work.

## Files Reviewed

- `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.sources.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json`
- `research/semantic-readiness-lib.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- `research/build-faction-artifacts.mjs`

## Files Changed

Semantic candidate commit `11c099b8beb9f23e23660787f00b97e89914d50b` changed:

- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json`

This governance commit changes:

- `docs/handoffs/2026-07-22-1110-codex-vm527-abzan-gate3-gate4.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

## What Changed

- Assigned Contract v1.1 semantic roles to all 11 Abzan claims: 10 `substantive_claim`, 1 `support_record`.
- Added bounded evidence locations and evidence scopes for all Abzan claims.
- Kept `abzan_claim_0011` as support-only Commander product evidence and marked Commander source-basis proof chains as `auxiliary_support`.
- Added Abzan-local canonical IDs for previously null profile/placement provenance surfaces.
- Added semantic guidance evidence mappings for all canonical Abzan recruiter guidance strings.
- Added `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json` with 17 fixtures.
- Regenerated `data/factions.json` and `data/semantic-readiness-provenance.json` from source.

## Why It Changed

Gate 1+2 authorized Abzan remediation only after source, role, fixture, provenance, preview, generated-consumer, Dromoka, generic-WBG, Commander-product, and alias controls were fixed. This candidate makes those repairs without changing shared validators, schemas, package files, placement model implementation, runtime scoring, Excel, VM-528, or protected worktrees.

## Candidate Facts

- Exact candidate SHA: `11c099b8beb9f23e23660787f00b97e89914d50b`
- Program base: `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`
- Claim count: 11 total; 10 substantive; 1 support; 0 discovery; 0 unclassified.
- Semantic provenance: 43 ABZAN rows; 0 null canonical IDs; 0 null canonical content hashes; 2 auxiliary support rows.
- Fixtures: 17 total; 1 core inclusion, 1 mature/pressure behavior, 1 nearest collision ambiguity, 13 required-neighbor exclusions, 1 provenance fixture.
- Generated hash `data/factions.json`: `78d603da6b1fb8504b48bced630ecafbf703c1ef4ac96334c6ede48cd5066529`
- Generated hash `data/semantic-readiness-provenance.json`: `6e280944c11f3b8fe5991c8b68cf928e9a0d3b31728dbc0c763cb3b8309bd971`
- Fixture hash: `9734a71e668915905a2e80870ce28ef12ae7cd341f1438c4ee2b622bcc036152`

## Decisions Made

- `ABZAN` remains the only internal identity key.
- `WBG`, `BGW`, and `GWB` remain invalid candidate-scope aliases.
- The source preview text is retained unchanged and still matches the generated embedded preview.
- Dromoka's brood remains a boundary/suppression comparator, not Abzan Houses continuity.
- Commander product rows remain auxiliary support only and cannot carry authoritative semantic proof.

## Risks / Uncertainties

- `npm test` is not fully green in this worktree because the local Scryfall corpus file `data/scryfall/raw/oracle-cards.json` is absent. The suite passed through adaptive placement, live gate bias, parser, builder, semantic readiness contract, maze, syntax/mode, search metadata, and precon artifact tests before stopping on that missing local corpus.
- `validate-source-generated-guardrails` retains the known non-blocking model-owned inhibitor warning: family continuity can become exclusion, rigidity, political burden, or duty outliving consent.

## Tests Run

- `node research/validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=11c099b --identity=ABZAN` - PASS.
- `node research/validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=11c099b --identity=WBG` - expected `Unknown identity WBG`.
- `node research/validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=11c099b --identity=BGW` - expected `Unknown identity BGW`.
- `node research/validate-semantic-candidate-scope.mjs --base=80b34dcda7db51d08f77f862f4eafb5cf3cabeaa --target=11c099b --identity=GWB` - expected `Unknown identity GWB`.
- `node research/validate-semantic-readiness.mjs --targets=ABZAN` - PASS.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=ABZAN` - PASS.
- `node research/build-semantic-readiness-provenance.mjs --check` - PASS, verified 2015 entries.
- `node research/validate-source-generated-guardrails.mjs --targets=ABZAN` - PASS with 1 warning.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `npm.cmd ci` - PASS, installed locked dependencies; audit reports 19 vulnerabilities.
- `npm.cmd test` - PARTIAL PASS then stopped on missing `data/scryfall/raw/oracle-cards.json`.

## Not Touched

No independent review, certification, semantically_ready transition, certified-count change, program-base advancement, Excel edit, VM-528 work, push, PR, merge, original-main edit, protected worktree edit, DRIFT-017 prototype edit, DRIFT-020 implementation/test edit, schema implementation edit, package/lockfile edit, CI edit, historical/debug/archive edit, or Table Talk edit occurred.

## Follow-Up Recommendations

Record a separate Gate 5 candidate workflow handoff for exact SHA `11c099b8beb9f23e23660787f00b97e89914d50b`, then send that exact SHA to independent review. Do not certify without an independent exact-SHA approval.

## Next Suggested Agent

Independent exact-SHA reviewer for VM-527 Abzan candidate `11c099b8beb9f23e23660787f00b97e89914d50b`.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-527-abzan-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`

PASS - ABZAN GATE 5 CANDIDATE CREATION AUTHORIZED

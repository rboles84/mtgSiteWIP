# 2026-07-18 18:24 - Codex - VM-520 Red Replacement Candidate

## Agent name

Codex

## Task requested

Remediate the approval-blocking VM-520 Red independent-review finding by adding missing Red-local `JESKAI`, `JUND`, and `NAYA` neighbor boundaries, create one implementation-only replacement candidate commit, then create a separate governance-only workflow record. Stop with the exact replacement candidate awaiting fresh independent review.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-independent-review.md`
- `docs/handoffs/2026-07-18-1705-codex-vm520-red-gate1-gate2.md`
- `docs/handoffs/2026-07-18-1727-codex-vm520-red-candidate.md`
- `docs/handoffs/2026-07-18-1756-codex-vm520-red-independent-review.md`
- Red raw placement, generated placement, semantic fixture, recruiter context, provenance, and local Red source digest excerpts.

## Files changed

Implementation replacement candidate:

- `data/raw-factions/red/red.placement.json`
- `data/placement-model.json`
- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Workflow records:

- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-18-1824-codex-vm520-red-replacement-candidate.md`
- `docs/handoffs/HANDOFF_INDEX.md` with only the VM-520 replacement row intended for staging.

## What changed

- Created replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`.
- Added Red-local collision review triggers for Jeskai, Jund, and Naya overlap without adding new collision pairs or lateral targets.
- Added Red placement poor-fit and inhibitor guidance that flows into generated recruiter context.
- Added Red fixture exclusions for `JESKAI`, `JUND`, and `NAYA`, backed by substantive Red claims `red_claim_0003`, `red_claim_0005`, and `red_claim_0006`.
- Updated governance to record the replacement candidate awaiting fresh independent review.

## Why it changed

Independent review of rejected candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` returned `REQUEST CHANGES` because Red-local fixture/collision/recruiter guidance did not cover prompt-required `JESKAI`, `JUND`, and `NAYA` boundaries.

## Decisions made

- Preserve the accepted Red preview, provenance count, fixture/provenance exact chains, and all frozen placement fields.
- Do not add `JESKAI`, `JUND`, or `NAYA` as Red collision pairs or lateral targets.
- Use existing Red-local placement guidance and semantic fixture structures for the replacement.
- Treat candidate-scope exit 1 as the already documented R display-source exception only when limited to the two preview paths.

## Risks / uncertainties

- The replacement candidate still requires a fresh independent review before any approval or certification.
- `npm.cmd run test:source-generated` retains the known unrelated JESKAI/MARDU model-owned inhibitor warnings.

## Tests run

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=R`
- `node research/audit-semantic-readiness.mjs --targets=R`
- `node research/semantic-candidate-scope-tests.js`
- custom Red invariant script for counts, provenance count, fixture chains, required neighbors, preview equality, W/U collision order, and lateral targets
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=6aefb2090ff20a361f7f3cd80515445036323158 --identity=R` exited 1 only for the documented R display-source exception diagnostics.

## Not touched

- `data/raw-factions/red/red.claims.json`
- `data/raw-factions/red/red.profile.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`
- Tests, validators, schemas, builders, global scoring, Hall, Crucible, other identities, original main, external Excel, push, PR, merge, and VM-521.
- Allowed Table Talk baseline files remained excluded.

## Follow-up recommendations

Run a fresh independent review against exact replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`. Do not certify Red, mark `semantically_ready`, advance program base, or start VM-521 unless that exact candidate is independently approved.

## Next suggested agent

Independent reviewer for exact Red replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`.

## Related Kanban card, docs, or plans

- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-independent-review.md`
- `docs/incidents/CRIT-001-drift-control-template.md`

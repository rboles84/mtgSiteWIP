# VM-509 Boros Gate 4 Generation and Validation

- Agent name: Codex
- Task requested: Complete VM-509 Boros Gate 4 generation, fixture, provenance, generated-diff, and validation work; resolve only the collision target preservation blocker; do not create candidate or certification commits.
- Related card: VM-509 Boros Semantic Recovery

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-509-boros-semantic-recovery.md`
- `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/boros_legion/boros_legion.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/build-faction-artifacts.mjs`
- `research/validate-semantic-candidate-scope.mjs`

## Files changed

- `data/raw-factions/boros_legion/boros_legion.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/boros_legion.semantic-fixtures.json`
- `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md`
- `docs/kanban/backlog/VM-509-boros-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-14-2326-codex-vm509-boros-gate4-validation.md`

## What changed

- Rebuilt Boros generated artifacts and semantic provenance.
- Added Boros Contract v1.1 semantic fixtures.
- Removed stale high-heat Boros display-source public copy from generated/display output.
- Resolved the Gate 4 collision-preservation blocker by normalizing two Boros canonical collision target identifiers: `generic_wr_overfit` to `WR`, and `rakdos_cult` to `cult_of_rakdos`.
- Updated VM-509 workflow documentation and ledgers to record Gate 4 completion.

## Why it changed

Gate 4 had to prove generated artifacts preserve the Gate 3 canonical Boros meaning. Generated WR initially dropped two canonical collision entries because their `against` target names were not generator-recognized. The minimal canonical normalization preserved the entries without changing builder behavior or lateral-inhibition behavior.

## Decisions made

- Used canonical target normalization instead of builder changes.
- Preserved the generic WR overfit guardrail through the collision ID/text/evidence while using generated target `WR` so the builder retains the entry.
- Used `cult_of_rakdos` for Rakdos so generated output normalizes to `BR`, matching existing repo convention.
- Did not create a recovery candidate or certification commit.

## Risks / uncertainties

- Generated audit neighbor references show `WR` for the generic-overfit guardrail because the builder does not support synthetic `GENERIC_WR_OVERFIT` targets as generated `against` values. The collision ID and required-neighbor evidence preserve the intended guardrail.
- Known builder-owned Boros inhibitor warning remains unchanged.
- Git reports LF-to-CRLF notices; `git diff --check` passes.

## Tests run

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=WR`
- `npm.cmd run validate:source-generated -- --targets=WR`
- `node research/validate-semantic-readiness.mjs --fixtures`
- `node research/audit-semantic-readiness.mjs --targets=WR`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- Generated-diff isolation dry-run against `HEAD`
- Candidate-scope generated-consumer coverage dry-run against `HEAD`
- `git diff --check`

## Not touched

- No non-Boros raw packet changed.
- No contract, schema, validator, builder script, Hall, Crucible, scoring, inhibition behavior, confidence behavior, scheduling, tie-ordering, or global recruiter behavior changed.
- No candidate commit or certification commit was created.
- No next identity was started.
- Original main worktree was not modified; it retains only its pre-existing docs/workflow dirty baseline.

## Follow-up recommendations

- Proceed to Gate 5 candidate creation only when explicitly authorized.
- Candidate review should verify the documented generated display-source cleanup and the generic-overfit target normalization convention.

## Next suggested agent

Independent Gate 5 candidate creation/review flow, only after explicit user authorization.

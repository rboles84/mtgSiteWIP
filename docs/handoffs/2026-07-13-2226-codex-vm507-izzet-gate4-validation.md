# VM-507 Izzet Gate 4 generation and validation

- Agent name: Codex
- Task requested: Complete VM-507 Izzet Gate 4 generation and validation only, including the explicitly authorized bounded wording-blocker resolution for `q_izzet_league_0008`.
- Related Kanban card: `docs/kanban/backlog/VM-507-izzet-semantic-recovery.md`
- Related report: `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/backlog/VM-507-izzet-semantic-recovery.md`
- `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`
- `data/raw-factions/izzet_league/izzet_league.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/izzet_league.semantic-fixtures.json`

## Files changed

- `data/raw-factions/izzet_league/izzet_league.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/izzet_league.semantic-fixtures.json`
- `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`
- `docs/kanban/backlog/VM-507-izzet-semantic-recovery.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-13-2226-codex-vm507-izzet-gate4-validation.md`

## What changed

- Rebuilt generated artifacts and semantic-readiness provenance after Gate 3 canonical remediation.
- Added the Izzet semantic readiness fixture file.
- Applied the authorized bounded wording correction for `q_izzet_league_0008`, replacing "Reckless inventor who still wants the machine to work." with "Risk-aware inventor who wants the experiment to keep working, scale, or teach something useful."
- Preserved the question's discriminator role, evidence mappings, confidence value, calibrated placement-summary fields, and collision/lateral-inhibition behavior.
- Narrowed Izzet-scoped preserved display copy in `data/factions.json` so generated public/recruiter copy no longer carries stale explosion, dragon-ego, or mad-science display framing.
- Updated the VM-507 report and Kanban card to record Gate 4 completion.

## Why it changed

Gate 4 required generated artifact rebuild, provenance regeneration, semantic fixtures, generated-diff isolation, public-copy inspection, and validation before Gate 5 candidate creation. Validation initially exposed one stale raw-sourced string, and the follow-up prompt explicitly authorized that single canonical wording correction.

## Decisions made

- Treated `data/factions.json` display text as an Izzet-scoped display-source correction because existing builder display-preservation behavior was preserving stale Izzet public copy.
- Did not modify `data/identity-layers.json`; it did not contain the stale Izzet blocker.
- Used a worktree-equivalent candidate-scope dry-run because the formal scope validator requires committed base/target refs and Gate 4 is pre-candidate.

## Risks / uncertainties

- The formal `validate:semantic-candidate-scope` command should be run on the eventual Gate 5 candidate boundary because the current Gate 4 tree is intentionally uncommitted.
- Git reports LF-to-CRLF working-copy warnings during status/diff checks, but `git diff --check` exits successfully.

## Tests run

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=UR`
- `npm.cmd run validate:source-generated -- --targets=UR`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- `node research/audit-semantic-readiness.mjs --targets=UR`
- generated-diff isolation check
- worktree candidate-scope dry-run
- `git diff --check`

## Results

- Gate 4 validation passed.
- The stale string "Reckless inventor who still wants the machine to work." is absent from canonical and generated Izzet consumers.
- The replacement string "Risk-aware inventor who wants the experiment to keep working, scale, or teach something useful." is present.
- Generated changes are UR/Izzet-scoped.
- No non-Izzet raw packet changed.
- No confidence, calibration, scoring, inhibition, lateral-inhibition, scheduling, tie-ordering, Hall, Crucible, or global recruiter behavior changed.
- UR semantic provenance does not use retained discovery-only or support-only Izzet source IDs as semantic proof.
- Known builder-owned Izzet inhibitor warning remains unchanged.
- Dossier audit remains 37 primary dossiers, 76 adjacent dossiers, 113 warnings, 0 failures.

## Not touched

- No candidate commit.
- No certification commit.
- No independent review.
- No other identity remediation.
- No Contract v1.1, shared schema, validators, builder scripts, Hall, Crucible, scoring, inhibition behavior, confidence behavior, scheduling, tie-ordering, or global recruiter behavior.
- No non-Izzet raw faction packet.
- Original main worktree `C:\dev\mtgSiteWIP` was not modified.

## Follow-up recommendations

- Proceed to VM-507 Gate 5 candidate creation only when explicitly authorized.
- Run the formal candidate-scope validator on the candidate boundary during Gate 5.

## Next suggested agent

Gate 5 candidate creation agent, after user authorization.

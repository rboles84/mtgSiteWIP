# 2026-07-13 11:52 - Codex - VM-505 Witherbloom Scope-Policy Cleanup

## Agent name

Codex

## Task requested

Resolve VM-505 Witherbloom Gate 4 `collision_guidance` ordering/path churn without changing inhibition behavior, rebuild generated artifacts, rerun validation, and stop before Gate 5 candidate creation.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-505-witherbloom-semantic-recovery.md`
- `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md`
- `data/raw-factions/witherbloom/witherbloom.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files changed

- `data/raw-factions/witherbloom/witherbloom.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md`
- `docs/kanban/in-progress/VM-505-witherbloom-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-13-1152-codex-vm505-witherbloom-scope-policy-cleanup.md`

## What changed

- Moved the new BG/Golgari `collision_guidance` row after the three accepted-base collision rows.
- Preserved accepted-base indexes for Selesnya, Simic, and Quandrix collision rows.
- Preserved `lateral_inhibition: false` on the existing Quandrix collision row at `/collision_guidance/2/lateral_inhibition`.
- Rebuilt generated artifacts and semantic provenance.
- Updated VM-505 documentation to show Gate 4 scope-policy cleanup complete and Gate 5 candidate creation ready when authorized.

## Why it changed

The candidate-scope/frozen-field comparison is path-based. Inserting the new BG/Golgari row before existing rows shifted the Quandrix `lateral_inhibition: false` path from index 2 to index 3, creating apparent frozen-field churn despite no behavior change. Reordering preserves behavior and avoids false candidate-scope failure.

## Decisions made

- Did not alter any `lateral_inhibition` value.
- Did not change confidence or calibrated placement-summary fields.
- Kept BG/Golgari as a required neighbor and preserved its Witherbloom-side evidence mapping.
- Treated `data/identity-layers.json` and generated `data/factions.json` identity-layer content as documented Witherbloom display-source exceptions.

## Risks / uncertainties

- The exact SHA-based candidate-scope command still needs to run at Gate 5 after the candidate commit exists. The working-tree dry-run now passes with only documented Witherbloom display-source exceptions.

## Tests run

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=WITHERBLOOM`
- `npm.cmd run validate:source-generated -- --targets=WITHERBLOOM`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run dossier:audit`
- `npm.cmd run audit:semantic-readiness -- --targets=WITHERBLOOM`
- Working-tree frozen-field sweep: clean.
- Working-tree candidate-scope dry-run: pass with documented Witherbloom display-source exceptions only.

## Not touched

- No recovery candidate commit.
- No certification commit.
- No other identity started.
- No non-Witherbloom raw packet edits.
- No Contract v1.1, shared schema, validator, builder script, Hall, Crucible, scoring, inhibition behavior, confidence behavior, scheduling, tie-ordering, or global recruiter behavior changes.
- Original main worktree was not written.

## Follow-up recommendations

Proceed to VM-505 Gate 5 candidate creation when explicitly authorized. Run the exact SHA-based candidate-scope guard at the candidate boundary and document the Witherbloom display-source exceptions if still reported.

## Next suggested agent

Codex on VM-505 Gate 5 candidate creation only.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-505-witherbloom-semantic-recovery.md`
- `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md`
- CRIT-001 Contract v1.1
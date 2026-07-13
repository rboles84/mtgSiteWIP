# VM-504 Silverquill Scope-Policy Cleanup

- Agent name: Codex
- Task requested: Remove pre-candidate forbidden confidence/calibration deltas while preserving Silverquill semantic remediation; validate and stop before candidate creation.
- Related Kanban card: VM-504 Silverquill Semantic Recovery
- Related plan/docs: CRIT-001 Contract v1.1; `docs/incidents/recoveries/VM-504-silverquill-semantic-recovery.md`

## Files Reviewed

- `data/raw-factions/silverquill/silverquill.placement.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `data/factions.json`
- `data/identity-layers.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/incidents/recoveries/VM-504-silverquill-semantic-recovery.md`
- `docs/kanban/in-progress/VM-504-silverquill-semantic-recovery.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Files Changed

- `data/raw-factions/silverquill/silverquill.placement.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/incidents/recoveries/VM-504-silverquill-semantic-recovery.md`
- `docs/kanban/in-progress/VM-504-silverquill-semantic-recovery.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-12-2059-codex-vm504-silverquill-scope-policy-cleanup.md`

Other existing Gate 3/Gate 4 dirty files remain part of the broader VM-504 worktree.

## What Changed

- Restored `/core_values/7/confidence`, `/core_values/8/confidence`, and `/core_values/9/confidence` to `Medium` by adding substantive, evidence-backed Silverquill core-value rows at those positions.
- Restored `placement_summary.calibrated_false_positive_guardrail` exactly to the accepted program-base value.
- Restored `placement_summary.calibrated_primary_read` exactly to the accepted program-base value.
- Rebuilt generated artifacts and semantic provenance.
- Documented that candidate-scope guard findings are now limited to the Silverquill-scoped display-source exception.

## Why It Changed

CRIT-001 freezes confidence and calibrated placement-summary fields unless separately authorized. Pre-candidate scope verification correctly blocked candidate creation until these deltas were removed.

## Decisions Made

- Did not reintroduce discovery/search claims as semantic core-value proof.
- Preserved the recovered Silverquill semantic model by using substantive claim-backed core-value rows.
- Did not modify builder, validator, schema, Contract v1.1, Hall, Crucible, scoring, inhibition, confidence behavior, scheduling, tie-ordering, or global recruiter behavior.
- Did not create a candidate or certification commit.

## Risks / Uncertainties

- The official candidate-scope guard still reports `data/identity-layers.json` and generated `data/factions.json` identity-layer content. Manual isolation confirms this is the documented Silverquill-scoped display-source exception, but Gate 5 should explicitly record it for review.

## Tests Run

- `npm.cmd run build:factions` — passed.
- `node research/validate-semantic-readiness.mjs --targets=SILVERQUILL` — passed.
- `npm.cmd run validate:source-generated -- --targets=SILVERQUILL` — passed with the known builder-owned inhibitor warning.
- `npm.cmd run test:semantic-readiness` — passed.
- `npm.cmd run test:placement` — passed, 37 factions / 37 golden paths.
- `npm.cmd run test:faction-context-isolation` — passed.
- `node research/archscry-dossier-followup-tests.js` — passed.
- `npm.cmd run dossier:audit` — passed with 113 warnings / 0 failures.
- Candidate-scope guard against temporary unreferenced snapshot — only documented Silverquill display-source exception findings remain.
- Manual generated-diff isolation check — Silverquill-scoped.
- `git diff --check` — passed with line-ending warnings only.

## Not Touched

- No non-Silverquill raw packet.
- No Contract v1.1, schema, validators, builder scripts, or VM-501 infrastructure.
- No Hall or Crucible content.
- No scoring, confidence behavior, inhibition, scheduling, or tie-ordering logic.
- No global recruiter behavior.
- No candidate commit.
- No certification commit.
- No next identity.
- Original dirty main worktree.

## Follow-up Recommendations

- Proceed to VM-504 Gate 5 candidate creation when authorized.
- In Gate 5, record the candidate-scope guard findings as the explicit Silverquill-scoped display-source exception if they remain unchanged.

## Next Suggested Agent

Codex for VM-504 Gate 5 candidate creation after explicit authorization.

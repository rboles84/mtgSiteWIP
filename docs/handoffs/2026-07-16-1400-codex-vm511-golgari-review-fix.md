# 2026-07-16 14:00 - Codex - VM-511 Golgari Review-Fix Replacement Candidate

## Agent name

Codex

## Task requested

Remediate VM-511 Golgari independent review findings after `REQUEST CHANGES` on rejected candidate `a649c306f19d0be3c9f09f549163200761ce9e15`, create a replacement semantic candidate commit, and record a separate workflow commit. Do not certify and do not start VM-512 or any other identity.

## Files reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`
- `docs/handoffs/2026-07-16-0917-codex-vm511-golgari-gate1-gate2.md`
- `docs/handoffs/2026-07-16-1128-codex-vm511-golgari-candidate.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/golgari_swarm/golgari_swarm.profile.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.placement.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.claims.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/semantic-readiness-lib.mjs`
- `research/build-faction-artifacts.mjs`
- `research/validate-semantic-candidate-scope.mjs`

## Files changed

Replacement candidate commit `bb0105f3f2d91a7696aefc004254fc52dc37cd85`:

- `data/raw-factions/golgari_swarm/golgari_swarm.profile.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.placement.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Workflow-record commit pending from this handoff:

- `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`
- `docs/kanban/backlog/VM-511-golgari-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-16-1400-codex-vm511-golgari-review-fix.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added missing native canonical ID fields to Golgari raw profile and placement objects that feed authoritative/generated-consumed provenance rows.
- Regenerated semantic provenance through `npm.cmd run build:factions`; BG now has 80 provenance entries, 0 null `canonical_id` values, and 0 null content hashes.
- Narrowed BG public/generated copy in `data/factions.json` and regenerated `supabase/functions/guild-recruiter/faction-context.ts`.
- Removed stale public phrases from auxiliary Commander Compass phrasing so `Nothing is wasted`, `Everything feeds something else`, and `most honest guild` no longer appear in BG public/recruiter generated surfaces.
- Recorded rejected candidate/workflow, review decision, blockers, replacement candidate SHA, and awaiting-review status in governance files.

## Why it changed

The independent review found two blockers: BG provenance null canonical IDs on required authoritative/generated-consumed rows, and stale high-risk Golgari public/recruiter copy that still overfit into unsupported broad rot/death framing.

## Decisions made

- Fixed provenance IDs at the raw source-object level rather than editing the generated provenance manifest by hand.
- Kept Golgari identity source-bounded instead of flattening it: death, decay, undercity survival, food production, graveyard resources, and renewal remain only inside bounded cycle/reclamation framing.
- Did not change builders, validators, schemas, Contract v1.1, Hall/Crucible, scoring, confidence, calibration, scheduling, tie-order, or global recruiter behavior.

## Risks / uncertainties

- `npm.cmd run test:source-generated` still reports the known JESKAI/MARDU builder-owned inhibitor warnings; those are unchanged and non-blocking.
- Replacement workflow-record commit SHA is self-referential and is reported after commit creation.

## Tests run

- JSON parse checks for Golgari raw files - passed.
- `npm.cmd run build:factions` - passed.
- Explicit BG provenance check - 80 entries, 0 null `canonical_id`, 0 null `canonical_content_hash`, 0 null file/pointer values.
- Explicit BG provenance chain check - 0 non-substantive chain references.
- Explicit stale-copy scan - no matches for the review-blocked phrases.
- `node research/audit-semantic-readiness.mjs --targets=BG` - passed.
- `node research/validate-semantic-readiness.mjs --targets=BG` - passed.
- `node research/semantic-candidate-scope-tests.js` - passed.
- `npm.cmd run test:semantic-readiness` - passed.
- `npm.cmd run test:placement` - passed.
- `npm.cmd run test:faction-context-isolation` - passed.
- `npm.cmd run test:source-generated` - passed with unchanged JESKAI/MARDU warnings.
- `npm.cmd test` - passed.
- `node research/validate-semantic-candidate-scope.mjs --base=c35fa9b59a34182c83539ed2c002f94115ae54fe --target=HEAD --identity=BG` - passed at candidate commit.
- `git diff --check` - passed.

## Not touched

- No certification was created.
- No VM-512 or other identity was started.
- Original main worktree `C:\dev\mtgSiteWIP` was not touched; only its known pre-existing unrelated docs/workflow dirty baseline was observed.
- No non-Golgari raw packets were edited.
- No schemas, Contract v1.1, builders, validators, Hall/Crucible files, scoring/confidence/calibration files, scheduling/tie-order logic, or global recruiter behavior were changed.

## Follow-up recommendations

- Run an independent exact-SHA review of replacement candidate `bb0105f3f2d91a7696aefc004254fc52dc37cd85`.
- Certify only if that exact replacement candidate is approved by independent review.

## Next suggested agent

Independent reviewer for VM-511 Golgari replacement candidate exact SHA.

## Related Kanban card, docs, or plans

- `docs/kanban/backlog/VM-511-golgari-semantic-recovery.md`
- `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-operating-playbook.md`

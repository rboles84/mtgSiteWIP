# VM-512 Gruul Gate 1+2 Handoff

- Agent name: Codex
- Task requested: Complete VM-512 Gruul / RG Gate 1+2 read-only audit and bounded evidence confirmation under CRIT-001 Operating Playbook v2.
- Related Kanban card: `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- Related report: `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-16-1624-codex-vm511-golgari-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/gruul_clans/gruul_clans.claims.json`
- `data/raw-factions/gruul_clans/gruul_clans.sources.json`
- `data/raw-factions/gruul_clans/gruul_clans.profile.json`
- `data/raw-factions/gruul_clans/gruul_clans.placement.json`
- `data/raw-factions/gruul_clans/gruul_clans.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-16-1719-codex-vm512-gruul-gate1-gate2.md`

## What Changed

- Recorded VM-512 Gate 1+2 audit and evidence sufficiency findings.
- Marked Gruul as Gate 3 authorized after Gate 1+2, not certified.
- Recorded the required-neighbor set and target-specific stale phrase risks for Gate 3.
- Updated the CRIT ledger and Kanban board to point to the VM-512 audit report.

## Why It Changed

Gruul has sufficient local/listed evidence to proceed, but it is not certifiable as-is under Contract v1.1. The packet has zero substantive claims, 78 unclassified claims, discovery records in authoritative chains, missing fixtures, incomplete collision guidance, and 59 null RG canonical IDs in generated provenance.

## Decisions Made

- Proceed to Gate 3 remediation only if local source localization succeeds.
- No broad online source discovery is required before Gate 3.
- Keep story-corpus rows as discovery-only unless source-read evidence is explicitly localized.
- Use the minimum required neighbor set from the VM-512 objective, with additional observed neighbors only if source-bounded and required.

## Risks / Uncertainties

- Public phrases around rage, anti-civilization, freedom, wildness, `break the city`, and `civilization is a cage` need strict source-bounded handling.
- Commander Compass source-basis fields can be mistaken for lore proof unless isolated during remediation.
- Generated key-figure chains must not retain discovery/unclassified proof.
- Gate 3 must avoid frozen scoring/confidence/calibration, scheduling, Hall/Crucible, and global recruiter behavior changes.

## Tests Run

- `git status --short --branch` - clean at preflight.
- `node research/audit-semantic-readiness.mjs --targets=RG` - passed structurally; reported `0 substantive / 6 discovery / 0 support / 78 unclassified`.
- `node research/validate-semantic-readiness.mjs --targets=RG` - failed as expected for Gate 1 blockers.
- JSON parse checks for Gruul raw files - passed.
- Raw/generated/provenance read-only inspection - completed.

## Not Touched

- `data/raw-factions/gruul_clans/**`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Semantic fixtures
- Contract, schemas, builders, validators, runtime scoring, Hall, Crucible, scheduling, tie ordering, confidence, calibration, and global recruiter behavior
- Original main worktree `C:\dev\mtgSiteWIP`
- VM-513 / Dimir

## Follow-Up Recommendations

- Begin Gate 3 by assigning roles and adding bounded evidence locations with `evidence_scope` to every authoritative Gruul substantive claim.
- Rebind profile, placement, public copy, recruiter guidance, and key figures to substantive claims only.
- Add RG fixtures and regenerate only standard CRIT-001 artifacts.
- Stop if source locators, required-neighbor distinctions, provenance cleanup, or generated proof-chain isolation require broader schema/builder changes.

## Next Suggested Agent

Codex continuing VM-512 Gate 3+4 remediation under the current Goal authorization.

# Agent Handoff — VM-506 Lorehold Gate 3 Canonical Remediation

Agent name: Codex
Task requested: Complete bounded Gate 3 canonical remediation for Lorehold without generated rebuild or candidate certification.
Related card: `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
Related report: `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-12-1142-codex-vm506-lorehold-gate2-evidence.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `data/raw-factions/prismari/prismari.claims.json`
- `data/raw-factions/prismari/prismari.placement.json`
- `data/raw-factions/lorehold/lorehold.claims.json`
- `data/raw-factions/lorehold/lorehold.sources.json`
- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.changelog.json`

## Files Changed

- `data/raw-factions/lorehold/lorehold.claims.json`
- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.changelog.json`
- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-07-12-1154-codex-vm506-lorehold-gate3-remediation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

Applied the Gate 2 remediation plan to Lorehold canonical raw files only:

- added claim `semantic_role` fields;
- added bounded evidence locations to substantive/support claims;
- separated discovery records from profile and placement proof chains;
- separated support-only product/deck records from substantive Spirit mechanics;
- replaced discovery-backed placement core values and behavioral signal;
- added recruiter guidance evidence mappings;
- recorded bounded required-neighbor evidence;
- updated Lorehold changelog/readiness evidence.

## Why It Changed

Gate 1 found Contract v1.1 blockers and Gate 2 confirmed existing Lorehold evidence was sufficient to repair them. Gate 3 was authorized to remediate canonical source data only, leaving generated rebuild and candidate validation for Gate 4.

## Decisions Made

- Lorehold now has 88 `substantive_claim`, 7 `discovery_record`, 2 `support_record`, and 0 `unclassified` claims.
- `claim_lorehold_unknown_0001` and `lorehold_claim_0022` through `lorehold_claim_0027` remain discovery records.
- `claim_lorehold_mechanic_0013` and `claim_lorehold_mechanic_0014` remain support records.
- Required neighbors recorded: `WR`, `QUANDRIX`, `PRISMARI`, `SILVERQUILL`, `WB`, `WU`, `RG`, `WITHERBLOOM`.
- Generated provenance and artifacts are intentionally stale until Gate 4.

## Risks / Uncertainties

- Contract validation still reports stale/missing generated provenance and missing semantic fixtures, expected before Gate 4.
- Adjacent identities other than Prismari are not certified yet, so Lorehold neighbor guidance remains Lorehold-side and should not overstate adjacent identities.
- Gate 4 must inspect generated diffs carefully because placement and guidance consumers will change after rebuild.

## Tests Run

- `git status --short --branch`
- JSON parse checks for changed Lorehold canonical files
- `npm.cmd run audit:semantic-readiness -- --targets=LOREHOLD`
- `node research/validate-semantic-readiness.mjs --targets=LOREHOLD` — failed only on expected Gate 4 generated provenance/fixture items after canonical edits.
- `git diff --check`
- Original dirty main worktree status check with `safe.directory`

## Not Touched

- Generated artifacts.
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`
- `data/raw-factions/lorehold/lorehold.sources.json`
- Other identity raw packets.
- Prismari certification records.
- Contract v1.1, schemas, validators, builders, Hall/Crucible content, scoring, inhibition, confidence, scheduling, tie ordering, or global recruiter behavior.
- Original dirty `main` worktree.

## Follow-Up Recommendations

1. Proceed to Gate 4 only after explicit authorization.
2. Gate 4 should rebuild generated artifacts and provenance from the remediated Lorehold canonical files.
3. Gate 4 should treat stale generated provenance and missing semantic fixtures as expected pre-rebuild findings, then verify they are resolved.
4. Do not create a candidate recovery SHA until Gate 4 validation is complete.

## Next Suggested Agent

JSON Cartographer / Test Strategist for VM-506 Gate 4 generated rebuild and validation after explicit authorization.

# VM-507 Izzet Gate 3 Canonical Remediation Handoff

- Agent name: Codex
- Task requested: Complete VM-507 Izzet Gate 3 canonical remediation only under CRIT-001 Contract v1.1.
- Related Kanban card: `docs/kanban/backlog/VM-507-izzet-semantic-recovery.md`
- Related report: `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-507-izzet-semantic-recovery.md`
- `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`
- `docs/reference/semantic-readiness-contract.md`
- `research/semantic-readiness-lib.mjs`
- `research/audit-semantic-readiness.mjs`
- `research/validate-semantic-readiness.mjs`
- `data/raw-factions/izzet_league/izzet_league.claims.json`
- `data/raw-factions/izzet_league/izzet_league.sources.json`
- `data/raw-factions/izzet_league/izzet_league.profile.json`
- `data/raw-factions/izzet_league/izzet_league.placement.json`
- `data/raw-factions/izzet_league/izzet_league.changelog.json`

## Files changed

- `data/raw-factions/izzet_league/izzet_league.claims.json`
- `data/raw-factions/izzet_league/izzet_league.profile.json`
- `data/raw-factions/izzet_league/izzet_league.placement.json`
- `data/raw-factions/izzet_league/izzet_league.changelog.json`
- `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`
- `docs/kanban/backlog/VM-507-izzet-semantic-recovery.md`
- `docs/handoffs/2026-07-13-2046-codex-vm507-izzet-gate3-remediation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added `semantic_role: "substantive_claim"` to all 104 current Izzet claims.
- Added bounded `evidence_locations` to all 104 substantive claims with exact source-ID parity.
- Isolated support-only rules material from authoritative mechanics support and recorded it as auxiliary.
- Added recruiter guidance evidence mappings for match, mismatch, and uncertainty guidance.
- Added explicit discriminator-question `evidence_claim_ids`.
- Added bounded collision guidance and required-neighbor evidence for Prismari, Quandrix, Simic, Azorius, Rakdos, Dimir, and generic UR overfit.
- Narrowed raw canonical wording around reckless/explosive/lab-chaos phrasing where needed.
- Updated VM-507 report and card for Gate 3 status.

## Why it changed

Gate 2 authorized bounded canonical remediation from existing claims and already-listed/local sources. The work resolves Gate 1/Gate 2 canonical blockers while leaving generated artifacts and certification for later gates.

## Decisions made

- All current Izzet claim records remain substantive; no claim records were demoted.
- Discovery/support boundaries remain source-role and auxiliary-context boundaries.
- House Dimir was retained as an Izzet-side required neighbor because current Izzet questions and guidance explicitly use secrecy, leverage, and information-control contrasts.
- Generic UR was recorded as an overfit guardrail rather than a real faction identity.
- No lateral-inhibition behavior was added or changed.

## Risks / uncertainties

- Generated provenance is stale until Gate 4.
- Izzet semantic fixtures remain missing until Gate 4.
- Display-preserved generated public copy may still contain stale explosion/ego/mad-science language until generated rebuild and inspection.
- Rakdos and Dimir boundaries are Izzet-side only until those identities are separately recovered.

## Tests run

- JSON parse checks for changed Izzet canonical files.
- `node research/audit-semantic-readiness.mjs --targets=UR`
- `node research/validate-semantic-readiness.mjs --targets=UR` — failed only for expected Gate 4 stale/missing provenance and missing fixture work.
- Final Gate 3 scope checks are recorded in the VM-507 report/final response.

## Not touched

- Generated artifacts.
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/semantic-readiness-provenance.json`
- Non-Izzet raw packets.
- Contract v1.1, schemas, validators, builder scripts.
- Hall, Crucible, scoring, inhibition, confidence, scheduling, tie ordering, and global recruiter behavior.
- Original main worktree at `C:\dev\mtgSiteWIP`.

## Follow-up recommendations

Proceed only when authorized to VM-507 Gate 4 generation and validation. Gate 4 should rebuild generated artifacts, regenerate provenance, add Izzet semantic fixtures, inspect public/recruiter copy for stale display text, run source/generated parity checks, and perform generated-diff isolation.

## Next suggested agent

Codex for VM-507 Gate 4 generation and validation when authorized.

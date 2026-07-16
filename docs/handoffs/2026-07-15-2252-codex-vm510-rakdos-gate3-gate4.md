# 2026-07-15 22:52 - Codex - VM-510 Rakdos Gate 3+4

## Agent

Codex

## Task requested

Remediate Rakdos / BR under CRIT-001 Contract v1.1 after the completed Gate 1+2 report, regenerate/validate generated consumers and provenance, and stop before Gate 5 candidate creation or certification.

## Files reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/recoveries/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Recent VM-540, VM-510, and VM-509 handoffs
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `data/raw-factions/cult_of_rakdos/`
- BR generated consumers and provenance
- Semantic readiness builders/validators for behavior only; no builder/validator edits were made

## Files changed

- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.claims.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.placement.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/cult_of_rakdos.semantic-fixtures.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-510-rakdos-semantic-recovery.md`
- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-15-2252-codex-vm510-rakdos-gate3-gate4.md`

## What changed

- Classified all Rakdos claims under Contract v1.1: 22 substantive claims and 10 discovery records.
- Added bounded evidence locations for substantive claims using existing official Rakdos overview and mechanics source records.
- Isolated story-corpus discovery records as metadata/history only.
- Removed discovery-backed generated BR key figures; generated BR now retains only source-backed Rakdos as an authoritative key figure.
- Added 12 non-inhibiting BR collision guidance rows and required-neighbor fixture coverage.
- Rebuilt BR generated consumers and provenance.
- Narrowed unsupported public/high-heat Rakdos copy.

## Why it changed

Gate 1+2 found that Rakdos had no certifying semantic roles, no bounded evidence locations, discovery-backed authoritative proof chains, empty collision guidance, missing fixtures, generated key-figure contamination, and provenance null/discovery-chain defects.

## Decisions made

- No online source intake was used.
- The Gate 1+2 required-neighbor set was retained exactly.
- `lateral_inhibition: false` was used for collision guidance so guidance survives generation without changing generated lateral-inhibition targets.
- Commander Compass and deck/product copy remain auxiliary and do not prove identity.
- Exact card names and MTG keywords with stale-scan terms were retained only as product/card facts.

## Risks / uncertainties

- The official source locators are bounded reviewed source-record locators rather than local line-number excerpts, matching prior accepted remediation pattern.
- Deep story localization for Judith, Exava, Rakdos the Defiler, Rix Maadi, and Unleash remains deferred and non-blocking for this minimal certification path.

## Tests run

- JSON parse checks for Rakdos raw files and BR fixture
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=BR`
- `node research/validate-semantic-readiness.mjs --targets=BR`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- Candidate-scope worktree dry-run against `30bd86bec4134cbdd136fe0c73f052f92a00bd96..worktree`
- `git diff --check`

## Not touched

- No Contract v1.1 changes.
- No schema, builder, validator, runtime, scoring, confidence, calibration, scheduling, tie-order, Hall, Crucible, or global recruiter behavior changes.
- No other raw identity packet.
- Gate 3+4 stopped before Gate 5 candidate creation; Gate 5 candidate creation is recorded below.
- No certification.
- No other identity started.
- Original main worktree `C:\dev\mtgSiteWIP` was not touched.

## Follow-up recommendations

- Gate 5 candidate commit was created after explicit authorization: `c96ceea602370fd146cdad5393d17e4cf68f8aa3`.
- Rakdos is awaiting independent review.
- Rakdos is not certified.
- Later non-blocking source localization may promote Judith, Exava, Rakdos the Defiler, Rix Maadi, or Unleash if bounded source evidence is added.

## Gate 5 candidate creation update

- Candidate commit: `c96ceea602370fd146cdad5393d17e4cf68f8aa3`.
- Candidate commit message: `VM-510 remediate Rakdos semantic readiness candidate`.
- Final pre-candidate validation passed: JSON parse checks, `npm.cmd run build:factions`, BR audit, BR validation, semantic candidate scope tests, semantic readiness tests, placement tests, faction-context isolation tests, candidate-scope worktree dry-run, and `git diff --check`.
- Workflow-record commit records the candidate SHA, awaiting independent review state, not-certified state, no certification SHA yet, and no next identity started.
- No certification occurred.
- No other identity started.
- Original main worktree `C:\dev\mtgSiteWIP` was not touched.

## Next suggested agent

Independent Gate 5 reviewer for VM-510 candidate `c96ceea602370fd146cdad5393d17e4cf68f8aa3`.

## Related Kanban card / docs

- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/recoveries/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`

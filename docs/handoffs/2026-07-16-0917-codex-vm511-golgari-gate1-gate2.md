# VM-511 Golgari Gate 1+2 Audit And Evidence Confirmation Handoff

## Agent name

Codex

## Task requested

Resume VM-511 Golgari / BG under the corrected main-worktree safety rule and complete Gate 1+2 read-only audit/evidence confirmation, then commit governance/report records before any remediation.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-16-0817-codex-vm510-rakdos-certification.md`
- `docs/handoffs/2026-07-15-2358-codex-vm510-rakdos-review-fix.md`
- `docs/handoffs/2026-07-15-2252-codex-vm510-rakdos-gate3-gate4.md`
- `docs/handoffs/2026-07-15-1656-codex-vm510-rakdos-gate1-gate2.md`
- `docs/handoffs/2026-07-15-1556-codex-vm540-operating-playbook-gate-zero.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-511-golgari-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/research/canon/ten-guild-reference-audit.md`
- `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/guilds/golgari/README.md`
- `docs/research/canon/guilds/golgari/SOURCES.md`
- `data/raw-factions/golgari_swarm/*`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files changed

- `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`
- `docs/kanban/backlog/VM-511-golgari-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-16-0917-codex-vm511-golgari-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added the VM-511 Gate 1+2 audit/evidence-confirmation report.
- Recorded Gate 1+2 completion, `claim_extraction_pass_required`, source sufficiency, target-specific stale phrase risks, proposed required neighbors, and Gate 3 stop conditions.
- Updated the VM-511 card, board, and CRIT-001 ledger records to show Gate 3 authorization only if bounded local source localization succeeds.
- Added this handoff and indexed it.

## Why it changed

VM-511 was authorized for Goal-mode execution through Gate 5 candidate creation only. Gate 1+2 found Contract v1.1 blockers and confirmed that bounded Gate 3 remediation can proceed from listed/local evidence without online source intake if source localization succeeds.

## Decisions made

- Applied the corrected safety rule: the original main worktree's known unrelated dirty docs/workflow baseline is allowed and did not block VM-511.
- Primary disposition: `claim_extraction_pass_required`.
- Gate 3 is authorized under the current VM-511 Goal, but only within local/listed evidence and Playbook v2 stop rules.
- Broad online source discovery is not required before Gate 3.
- Proposed required neighbors: `GENERIC_BG_OVERFIT`, `B`, `G`, `WITHERBLOOM`, `WG`, `WB`, `RG`, `BR`, `UB`, `SIMIC_COMBINE`, `ABZAN`, `JUND`, `SULTAI`.

## Risks / uncertainties

- Exact bounded locators for current official overview/mechanics/prerelease source rows still need Gate 3 localization.
- Story-only Vraska, Jarad, and Izoni material must not remain authoritative unless source-read and rebound to substantive claims.
- High-heat public copy around death, rot, decay, graveyard, cycle, and "Nothing is wasted" must be narrowed or exactly source-supported in Gate 3.
- Generated key figures and provenance are currently contaminated or incomplete, but generated artifacts were intentionally not modified in Gate 1+2.

## Tests run

- Corrected worktree safety checks for `C:\dev\mtgSiteWIP-crit001` and read-only original-main status comparison.
- `git status --short`
- `node research/audit-semantic-readiness.mjs --targets=BG`
- `node research/validate-semantic-readiness.mjs --targets=BG` - failed as expected for Gate 1 blockers.
- JSON parse and raw/generated/provenance inspection for BG canonical and generated files.

## Not touched

- Golgari canonical raw packet.
- Generated artifacts.
- Semantic fixtures.
- Builders, validators, schemas, Contract v1.1.
- Hall, Crucible, scoring, inhibition, confidence, calibration, scheduling, tie ordering, and global recruiter behavior.
- Other identity raw packets.
- Original main worktree `C:\dev\mtgSiteWIP`.
- VM-512 or any other identity.

## Follow-up recommendations

- Proceed to VM-511 Gate 3 canonical remediation only within the current authorization.
- Gate 3 should first localize official/local source locators and stop if locator support is unavailable or if high-heat wording is retained without evidence.
- Do not run Gate 4 generation until Gate 3 canonical remediation is complete.

## Next suggested agent

JSON Cartographer / semantic recovery implementer for VM-511 Gate 3, under the current Goal authorization.

## Related Kanban card, docs, or plans

- `docs/kanban/backlog/VM-511-golgari-semantic-recovery.md`
- `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-operating-playbook.md`

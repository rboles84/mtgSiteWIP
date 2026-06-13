# 2026-06-11 06:58 - Codex - VM-333 Sultai Dossier Copy Contract Repair Blocked

## Agent Name

Codex

## Task Requested

Implement VM-333 as a narrow Sultai dossier copy hotfix: replace only the Sultai rendered `selfCheck` phrase in `assets/js/archscry-presentation.js`, preserve `assets/js/commander-dossier.js` audit metadata, avoid raw/generated/Supabase/Maze/Colorless/BGU/VM-236 scope, validate Sultai audit behavior, and update Kanban/handoff records.

## Pre-Flight Summary

Recent related work:

- VM-209 through VM-214 created, reviewed, and promoted SULTAI as exactly one live key.
- VM-236 remains the broader reserved Sultai live-copy polish backlog card and was not started.
- VM-289 established the dossier audit contract and kept Sultai banned phrase regression coverage hard.
- VM-315 enriched Sultai display data while preserving protected raw claims/sources hashes.
- VM-325 established source-bound gold-standard governance.
- VM-332 closed before VM-333 started, so the board had no active in-progress blocker.

Current known risks:

- The worktree was broadly dirty before VM-333 and remains broadly dirty across runtime JS/CSS, generated data, raw packets, docs, Kanban/handoffs, assets, and deleted/moved research docs.
- `assets/js/archscry-presentation.js`, `assets/js/commander-dossier.js`, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md` already had dirty drift before this task.
- The originally suspected Sultai `selfCheck` line was not the only Sultai audit source.

Relevant decisions already made:

- SULTAI is the only live Sultai key.
- `BGU` and permutations remain metadata/query-only.
- Sultai raw claims/sources are protected.
- `assets/js/commander-dossier.js` banned phrase metadata must remain audit authority.
- Generated/runtime output cannot be used as source backing under VM-325.

Files recently changed by related work:

- VM-332 changed `assets/js/archscry-presentation.js`, research tests/init, quick reading tests, board, and handoff index.
- VM-315 changed Sultai display/registry/raw profile/changelog surfaces but preserved raw claims/sources.
- VM-289 changed dossier audit contract behavior and regression tests.

What should not be touched:

- `assets/js/commander-dossier.js`
- raw Sultai JSON
- generated data
- Supabase context
- Maze behavior
- Colorless files or behavior
- land warnings
- BGU alias policy
- broad Sultai parity/copy polish
- VM-236 backlog copy

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/kanban/done/VM-211-sultai-brood-docs-parity-fill.md`
- `docs/kanban/done/VM-212-sultai-brood-raw-faction-source-packet.md`
- `docs/kanban/done/VM-213-sultai-brood-raw-packet-review-gate.md`
- `docs/kanban/done/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md`
- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `docs/kanban/done/VM-315-sultai-display-enrichment.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/kanban/done/VM-332-ink-maze-exact-commander-activation.md`
- `docs/handoffs/2026-06-11-0644-codex-vm332-ink-maze-exact-commander-activation.md`
- `docs/handoffs/2026-06-09-2142-codex-vm315-sultai-display-enrichment.md`
- `docs/handoffs/2026-06-04-1437-codex-vm289-dossier-audit-contract-repair-and-hardening.md`
- `docs/handoffs/2026-06-10-1922-codex-vm325-source-bound-gold-standard-rule.md`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `data/identity-layers.json`
- `data/factions.json`
- `artifacts/dossier-snapshots/dossier-audit-report.md`

## Files Changed

- `assets/js/archscry-presentation.js`
- `docs/kanban/board.md`
- `docs/kanban/blocked/VM-333-sultai-dossier-copy-contract-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-11-0658-codex-vm333-sultai-dossier-copy-blocked.md`

## What Changed

- Created VM-333 as an in-progress card after VM-332 was confirmed closed.
- Replaced only the Sultai `selfCheck` copy in `assets/js/archscry-presentation.js` with:
  `This may fit if you want a Commander deck where graveyards, secrets, and stolen options become calculated advantage under Sultai's ruthless opportunity and Sidisi-era ambition.`
- Moved VM-333 to Blocked after validation showed the remaining Sultai audit failure comes from Sultai archetype data outside the approved edit scope.
- Updated the Kanban board to list no cards in progress and VM-333 under Blocked.
- Added this handoff and index entry.

## Why It Changed

The requested visible self-check copy did contain the banned phrase and was safe to repair within scope. Validation then proved the hard audit failure still exists because `auditCommanderDossier` includes dossier archetype descriptions in primary-owned audit text, and Sultai's `Calculated Ruthlessness` archetype still contains `generic same-color goodstuff` in `data/identity-layers.json` and generated `data/factions.json`.

## Decisions Made

- Did not edit `assets/js/commander-dossier.js`, because it is explicitly protected audit metadata and regression-test authority.
- Did not edit `data/identity-layers.json` or `data/factions.json`, because the approved scope said to edit only `assets/js/archscry-presentation.js` and not generated data.
- Marked VM-333 blocked rather than widening scope silently.
- Preserved Colorless failures as out of scope.

## Risks / Uncertainties

- VM-333's requested code edit is complete, but its Sultai audit acceptance criteria are not met.
- Repairing the remaining Sultai banned phrase requires a source-aware decision about editing the authoritative registry/source surface and regenerating generated output through the approved path.
- `npm.cmd run dossier:audit` writes `artifacts/dossier-snapshots/dossier-audit-report.md`; this artifact remained unstaged.
- Broad unrelated dirty drift remains.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` - captured broad pre-existing dirty drift before edits.
- `rg -n "VM-333|Sultai Dossier Copy Contract Repair" docs\kanban docs\handoffs -S` - no prior VM-333 reference found.
- `rg -n "generic same-color goodstuff|SULTAI|selfCheck" assets/js/archscry-presentation.js assets/js/commander-dossier.js` - post-edit Sultai `selfCheck` no longer contains the banned phrase; `commander-dossier.js` metadata remains intact.
- `node --check assets\js\archscry-presentation.js` - passed.
- `node research\archscry-dossier-followup-tests.js` - passed.
- `npm.cmd run dossier:audit` - failed with 3 failures.
- `Get-FileHash -Algorithm SHA256 data\raw-factions\sultai\sultai.claims.json,data\raw-factions\sultai\sultai.sources.json` - protected hashes unchanged.

Exact `npm.cmd run dossier:audit` result:

```text
Audited 36 primary Commander dossiers and 74 adjacent dossiers.
Pass: 0; warnings: 107; failures: 3.
```

Remaining failures:

- `sultai-brood.primary.md`: banned phrase for Sultai in Sultai primary-owned sections: `generic same-color goodstuff`.
- `witch-growth.adjacent.colorless.md`: Colorless table-caution action-cue contract failure, out of scope.
- `colorless.primary.md`: Colorless table-caution action-cue contract failure, out of scope.

Protected Sultai raw hashes after edit:

- `data/raw-factions/sultai/sultai.claims.json`: `86E3E603508C714D6F1D938D91FD171C450FECA4D744EA1A82BB0956433DA0C8`
- `data/raw-factions/sultai/sultai.sources.json`: `9090CCE62C2A419CBD6AB9CE1C7CB82D3DC5890596B6BC4B314C11CA9BDCEB5E`

## Not Touched

- No `assets/js/commander-dossier.js` edits.
- No raw Sultai JSON edits.
- No generated data edits.
- No Supabase context edits.
- No Maze behavior edits.
- No Colorless repairs.
- No land warning changes.
- No BGU alias policy changes.
- No broad VM-236 Sultai copy polish.
- No staging or commits.

## Follow-Up Recommendations

- Next Sultai follow-up should explicitly authorize source-aware archetype copy repair in `data/identity-layers.json`, then regenerate accepted generated output through the approved builder path if required.
- Keep `assets/js/commander-dossier.js` banned phrase metadata intact.
- Keep Colorless table-caution failures on a separate owner/card.

## Next Suggested Agent

Planning Architect / JSON Cartographer for a source-aware Sultai archetype copy repair, or the Colorless/VM-332 follow-up owner for the out-of-scope Colorless audit contract rows.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/blocked/VM-333-sultai-dossier-copy-contract-repair.md`
- `docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md`
- `docs/kanban/done/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-214-sultai-brood-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `docs/kanban/done/VM-315-sultai-display-enrichment.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/kanban/done/VM-332-ink-maze-exact-commander-activation.md`

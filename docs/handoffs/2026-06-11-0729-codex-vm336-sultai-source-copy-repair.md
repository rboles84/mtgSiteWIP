# 2026-06-11 07:29 - Codex - VM-336 Sultai Dossier Source Copy Repair

## Agent Name

Codex

## Task Requested

Implement VM-336 as a Sultai-only source/display hotfix: remove `generic same-color goodstuff` from every Sultai Layer 1/display path that emits dossier-owned copy, preserve `assets/js/commander-dossier.js` audit metadata, regenerate generated faction output through the approved builder path, validate the dossier audit result, supersede VM-333, and do not stage files.

## Pre-Flight Summary

Recent related work:

- VM-333 repaired Sultai `selfCheck` copy but blocked because the rendered audit still saw the banned phrase from Sultai archetype data.
- VM-335 is done as the Mono Source-Authority Decision.
- VM-315 enriched Sultai display data and protected raw Sultai claims/sources hashes.
- VM-289 established the dossier audit contract and classified the Sultai banned phrase as a real content regression.
- VM-236 remains broad Sultai live-copy polish and was not started.

Current known risks:

- The worktree was broadly dirty before VM-336 and remains broadly dirty across runtime, generated data, raw packets, docs, assets, Kanban, handoffs, and deleted/moved research docs.
- Generated data files were already dirty before VM-336; `build:factions` writes generated placement/context surfaces, so diff review must distinguish VM-336's Sultai phrase propagation from pre-existing generated drift.
- `npm.cmd run dossier:audit` still fails on Colorless table-caution rows, which are out of scope.

Relevant decisions already made:

- SULTAI is the live Sultai key.
- `BGU` and permutations remain metadata/query-only.
- Sultai raw claims/sources are protected.
- `assets/js/commander-dossier.js` banned phrase metadata is audit authority and must remain intact.
- Generated output must mirror the registry/source change through the builder path, not by hand-editing generated data as evidence.

Files recently changed by related work:

- VM-333 changed `assets/js/archscry-presentation.js`, board, blocked card, and handoff index.
- VM-335 changed source-authority docs, board, done card, and handoff index.
- VM-315 changed Sultai display/registry and generated display surfaces.

What should not be touched:

- `assets/js/commander-dossier.js`
- raw Sultai claims/sources
- BGU alias policy
- land warnings
- Maze behavior
- broad VM-236 copy polish
- Colorless behavior or audit repair
- staging or commits

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-11-0658-codex-vm333-sultai-dossier-copy-blocked.md`
- `docs/handoffs/2026-06-11-0718-planning-architect-vm335-mono-source-authority-decision.md`
- `docs/handoffs/2026-06-09-2142-codex-vm315-sultai-display-enrichment.md`
- `docs/handoffs/2026-06-04-1437-codex-vm289-dossier-audit-contract-repair-and-hardening.md`
- `docs/kanban/blocked/VM-333-sultai-dossier-copy-contract-repair.md`
- `docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `data/identity-layers.json`
- `data/factions.json`
- `research/build-faction-artifacts.mjs`
- `artifacts/dossier-snapshots/dossier-audit-report.md`

## Files Changed

- `data/identity-layers.json`
- `data/factions.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-333-sultai-dossier-copy-contract-repair.md`
- `docs/kanban/done/VM-336-sultai-dossier-source-copy-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-11-0729-codex-vm336-sultai-source-copy-repair.md`

Builder wrote generated outputs during `npm.cmd run build:factions`; VM-336 accepts only the Sultai `data/factions.json` phrase propagation. The broad generated diff against HEAD was already part of the dirty worktree context and is not claimed as VM-336 content.

## What Changed

- Created VM-336, then completed it after validation.
- Replaced the Sultai `Calculated Ruthlessness` archetype description in `data/identity-layers.json`.
- Regenerated generated faction output with `npm.cmd run build:factions`.
- Verified `data/factions.json` mirrors the repaired Sultai archetype description.
- Moved VM-333 from blocked to done as superseded/resolved by VM-336.
- Added this handoff and updated the handoff index.

## Exact Source Sentence Replacement

From:

`Let ambition move through planning, theft, denial, and selective timing rather than generic same-color goodstuff.`

To:

`Let ambition move through planning, theft, denial, selective timing, and resource conversion under ruthless opportunity and Sidisi-era ambition.`

## Why It Changed

VM-333 proved the Sultai audit failure was not only in visible presentation `selfCheck` copy. The dossier audit includes archetype descriptions in primary-owned Sultai audit text, and Sultai's `Calculated Ruthlessness` archetype still emitted the banned phrase from the Layer 1 display/registry path. VM-336 repaired that source path and regenerated the mirror.

## Decisions Made

- Did not edit `assets/js/commander-dossier.js`; the banned phrase policy is correct and remains intact.
- Did not edit raw Sultai claims or sources.
- Treated Colorless table-caution failures as out of scope.
- Treated broad generated diff against HEAD as pre-existing/generated drift; accepted only the Sultai phrase propagation for VM-336.
- Moved VM-333 to done as superseded/resolved by VM-336 after Sultai audit sections cleared.

## Risks / Uncertainties

- `npm.cmd run dossier:audit` still exits nonzero because of two Colorless table-caution failures.
- Generated data and context files remain broadly dirty from pre-existing workspace drift; future agents should not attribute that entire diff to VM-336.
- The audit report artifact is written by `dossier:audit`; it remained unstaged.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` - captured broad pre-existing dirty drift before edits.
- `rg -n "generic same-color goodstuff|Calculated Ruthlessness|SULTAI|selfCheck" assets/js/archscry-presentation.js assets/js/commander-dossier.js data/identity-layers.json data/factions.json` - before and after phrase probe.
- `node --check assets\js\archscry-presentation.js` - passed.
- `npm.cmd run build:factions` - passed.
- `node research\archscry-dossier-followup-tests.js` - passed.
- `npm.cmd run dossier:audit` - failed only on Colorless out-of-scope rows.
- `Get-FileHash -Algorithm SHA256 data\raw-factions\sultai\sultai.claims.json,data\raw-factions\sultai\sultai.sources.json` - protected hashes unchanged.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short -- artifacts` - no tracked/staged artifact output.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --cached --name-only` - no staged files.

Exact `npm.cmd run dossier:audit` result:

```text
Audited 36 primary Commander dossiers and 74 adjacent dossiers.
Pass: 0; warnings: 108; failures: 2.
```

Sultai audit result:

- `Content Regressions`: None.
- `Banned Phrase Failures`: None.
- No remaining Sultai failure rows.

Remaining Colorless failures, out of scope:

- `witch-growth.adjacent.colorless.md`: `tableCautionText` lacks a practical action cue.
- `colorless.primary.md`: `tableCautionText` lacks a practical action cue.

Protected Sultai raw hashes:

- `data/raw-factions/sultai/sultai.claims.json`: `86E3E603508C714D6F1D938D91FD171C450FECA4D744EA1A82BB0956433DA0C8`
- `data/raw-factions/sultai/sultai.sources.json`: `9090CCE62C2A419CBD6AB9CE1C7CB82D3DC5890596B6BC4B314C11CA9BDCEB5E`

## Git Status Summary

Before VM-336:

- Broad pre-existing drift across runtime JS/CSS, generated data, raw packets, docs, assets, Kanban/handoffs, deleted/moved research docs, and many untracked handoff/Kanban/doc/source folders.
- `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, `assets/js/archscry-presentation.js`, `assets/js/commander-dossier.js`, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md` were already dirty.

After VM-336:

- Expected VM-336 additions/updates are the Sultai registry/generated phrase repair plus Kanban/handoff updates.
- Broad pre-existing drift remains.
- No files were staged.
- No `artifacts/` audit output was staged.

## Not Touched

- No `assets/js/commander-dossier.js` edits.
- No raw Sultai claims or sources edits.
- No BGU alias policy changes.
- No land warning changes.
- No Maze behavior changes.
- No broad VM-236 copy polish.
- No Colorless behavior or audit repair.
- No staging or commits.

## Follow-Up Recommendations

- Hand the remaining two `dossier:audit` failures to the Colorless dossier contract owner.
- Keep VM-236 reserved for broader Sultai copy polish if product wants a larger prose pass later.

## Next Suggested Agent

Colorless dossier contract owner for the remaining Colorless table-caution audit rows.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-336-sultai-dossier-source-copy-repair.md`
- `docs/kanban/done/VM-333-sultai-dossier-copy-contract-repair.md`
- `docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md`
- `docs/kanban/done/VM-315-sultai-display-enrichment.md`
- `docs/kanban/done/VM-289-dossier-audit-contract-repair-and-hardening.md`
- `docs/kanban/done/VM-335-mono-source-authority-decision.md`

# VM-336 - Sultai Dossier Source Copy Repair

ID: VM-336
Title: Sultai Dossier Source Copy Repair
Status: done
Type: Layer 1 Display / Dossier Audit Hotfix
Area: Sultai Brood, Commander Dossier Audit, Identity Registry
Priority: high
Created: 2026-06-11
Completed: 2026-06-11

## Summary

Removed the banned phrase `generic same-color goodstuff` from the Sultai Layer 1/display path that emits dossier-owned archetype copy, while preserving the `assets/js/commander-dossier.js` audit policy that bans it.

This was a Sultai-only hotfix. It did not start broad VM-236 Sultai copy polish and did not repair Colorless audit failures.

## Pre-Flight Findings

- VM-336 was unused at pre-flight.
- VM-335 was already done as the Mono Source-Authority Decision.
- VM-333 was blocked because its narrow runtime-only scope repaired Sultai `selfCheck` copy but left the emitted Sultai archetype phrase in `data/identity-layers.json` and generated `data/factions.json`.
- VM-315 protects Sultai raw claims/sources hashes:
  - `data/raw-factions/sultai/sultai.claims.json`: `86E3E603508C714D6F1D938D91FD171C450FECA4D744EA1A82BB0956433DA0C8`
  - `data/raw-factions/sultai/sultai.sources.json`: `9090CCE62C2A419CBD6AB9CE1C7CB82D3DC5890596B6BC4B314C11CA9BDCEB5E`
- VM-289 treats the Sultai banned phrase as a real authored-data regression, not an audit bug.
- VM-236 remains the broader Sultai live-copy polish backlog card and was not started.
- Broad unrelated dirty drift existed before VM-336 across runtime, generated data, raw packets, docs, assets, Kanban, handoffs, and deleted/moved research docs.

## Source Copy Replacement

Replaced only the Sultai `Calculated Ruthlessness` archetype description in `data/identity-layers.json`.

From:

`Let ambition move through planning, theft, denial, and selective timing rather than generic same-color goodstuff.`

To:

`Let ambition move through planning, theft, denial, selective timing, and resource conversion under ruthless opportunity and Sidisi-era ambition.`

## Generated Output Accepted

- Ran `npm.cmd run build:factions`.
- Accepted the generated `data/factions.json` mirror of the Sultai archetype description.
- `build:factions` also wrote generated placement/context surfaces in a worktree that already had broad generated drift. VM-336 accepts only the Sultai copy propagation and does not claim unrelated generated diff as part of this card.

## Validation Results

- `rg -n "generic same-color goodstuff|Calculated Ruthlessness|SULTAI|selfCheck" assets/js/archscry-presentation.js assets/js/commander-dossier.js data/identity-layers.json data/factions.json` confirmed:
  - Sultai `selfCheck` remains repaired.
  - Sultai `Calculated Ruthlessness` no longer contains the banned phrase in registry or generated display data.
  - `assets/js/commander-dossier.js` audit metadata still contains the banned phrase as intended.
- `node --check assets\js\archscry-presentation.js` passed.
- `npm.cmd run build:factions` passed.
- `node research\archscry-dossier-followup-tests.js` passed.
- `npm.cmd run dossier:audit` failed only on Colorless out-of-scope rows:
  - `Audited 36 primary Commander dossiers and 74 adjacent dossiers.`
  - `Pass: 0; warnings: 108; failures: 2.`
  - `Content Regressions`: None.
  - `Banned Phrase Failures`: None.
  - Remaining failures:
    - `witch-growth.adjacent.colorless.md`: Colorless `tableCautionText` lacks a practical action cue.
    - `colorless.primary.md`: Colorless `tableCautionText` lacks a practical action cue.
- Protected Sultai raw hash check passed:
  - `data/raw-factions/sultai/sultai.claims.json`: `86E3E603508C714D6F1D938D91FD171C450FECA4D744EA1A82BB0956433DA0C8`
  - `data/raw-factions/sultai/sultai.sources.json`: `9090CCE62C2A419CBD6AB9CE1C7CB82D3DC5890596B6BC4B314C11CA9BDCEB5E`

## Acceptance Status

- [x] Sultai has no remaining Content Regressions in `npm.cmd run dossier:audit`.
- [x] Sultai has no remaining Banned Phrase Failures in `npm.cmd run dossier:audit`.
- [x] Remaining audit failures are Colorless table-caution rows and documented as out of scope.
- [x] Sultai raw claims/sources hashes are preserved.
- [x] VM-333 is superseded/resolved by VM-336.
- [x] Handoff is created and indexed.

## Not Touched

- No `assets/js/commander-dossier.js` edits.
- No raw Sultai claims or sources edits.
- No BGU alias policy changes.
- No land warning changes.
- No Maze behavior changes.
- No broad VM-236 copy polish.
- No Colorless behavior or audit repair.
- No staging or commits.

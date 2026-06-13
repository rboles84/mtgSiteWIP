# VM-333 - Sultai Dossier Copy Contract Repair

ID: VM-333
Title: Sultai Dossier Copy Contract Repair
Status: done - superseded/resolved by VM-336
Type: Runtime Copy / Dossier Audit Hotfix
Area: Sultai Brood, Archscry, Commander Dossier Audit
Priority: high
Created: 2026-06-11
Blocked: 2026-06-11
Resolved: 2026-06-11
Resolved By: VM-336

## Summary

VM-333 repaired the originally scoped Sultai rendered `selfCheck` phrase in `assets/js/archscry-presentation.js`, but validation showed the same banned phrase still emitted through Sultai archetype data in `data/identity-layers.json` and generated `data/factions.json`.

VM-336 expanded the approved scope to the Sultai Layer 1/display path, replaced the remaining `Calculated Ruthlessness` archetype phrase, regenerated `data/factions.json`, and cleared Sultai Content Regressions and Banned Phrase Failures.

## Final Status

- Sultai `selfCheck` no longer emits `generic same-color goodstuff`.
- Sultai `Calculated Ruthlessness` no longer emits `generic same-color goodstuff`.
- `assets/js/commander-dossier.js` banned phrase metadata remains intact.
- `npm.cmd run dossier:audit` now reports no Sultai Content Regressions and no Banned Phrase Failures.
- Remaining audit failures are Colorless table-caution rows, out of VM-333 and VM-336 scope.
- Sultai raw claims/sources hashes remain preserved.

## Related Work

- Superseding repair: `docs/kanban/done/VM-336-sultai-dossier-source-copy-repair.md`
- Original blocked handoff: `docs/handoffs/2026-06-11-0658-codex-vm333-sultai-dossier-copy-blocked.md`

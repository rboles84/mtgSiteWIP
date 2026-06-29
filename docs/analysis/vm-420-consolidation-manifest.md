# VM-420 Consolidation Manifest

Chosen VM: VM-420

VM-417 was not reused because the repo already records that `VM-417` may be reserved, while `VM-418` and `VM-419` are closed. All new VM-specific names in this pass use `VM-420`.

## Remove-Now Tombstones

These files were removed from the current tree only after byte-identical verification and fixed-string reference scans. Canonical copies remain tracked.

| Original path | Canonical replacement | SHA-256 | Bytes | Decision | Rationale |
| --- | --- | --- | ---: | --- | --- |
| `docs/research/archive/bant-pre-push-cleanup/duplicate-canon-captures/Alara Shards Lore Dossier Protocol.rtf` | `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | `470AA497D31F43C2B72B6D37A2AB2055AE6915F14991A2438B5D73A85F01176A` | 2301507 | `remove-now` | Byte-identical archive duplicate. The canonical canon copy is the active source path; the removed path was only cited by the historical VM-170 handoff. |
| `docs/research/ui_research/siteUpgradeInfo_Good.html` | `docs/research/webdev/generic-webdev/MTG_Platform_Architecture_Codex_and_Interactive_Research.html` | `FE20CC9A838E2039D7516CD61F832B85B0B8A37488D2D3744A614737AE87ECE5` | 110613 | `remove-now` | Byte-identical UI duplicate. The retained webdev copy is outside the tracked-ignored `ui_research` class; the removed path was only cited by the historical VM-063 handoff. |

## Defer / Retain Notes

The duplicate Tarkir seed folders remain in place during VM-420. Their files are byte-identical or line-equivalent to normalized `source-material/` copies, but active research docs, source ledgers, seed crosschecks, and in some cases raw metadata still cite the old folders as preserved seed material. Removing those paths would require a larger source-path reconciliation pass.

| Candidate class | Decision | Rationale |
| --- | --- | --- |
| `docs/research/abzan houses/**` | `defer` | Active Abzan research docs and `data/raw-factions/abzan/abzan.sources.json` still reference the preserved seed folder. |
| `docs/research/jeskai way/**` | `defer` | Active Jeskai docs and source packet crosschecks still describe the unmanaged seed folder as preserved source material. |
| `docs/research/mardu horde/**` | `defer` | Active Mardu docs, source ledger, and source packet crosschecks still describe the unmanaged seed folder as preserved source material. |
| `docs/research/sultai brood/**` | `defer` | Active Sultai docs and `data/raw-factions/sultai/sultai.sources.json` still reference the preserved seed folder. |
| Colorless, canon, and architecture duplicate groups | `retain-authority` | These files are source material, architecture support, or bibliography/evidence artifacts; they were not pruned in this docs hygiene pass. |

## Archive-Indexed Moves

No `archive-indexed` UI moves were made. The active `docs/research/webdev/vox-mana-specific/codex_index_modern_homepage_redo_brief.md` still references `docs/research/ui_research/` as a design-input folder, and VM-407 explicitly names `docs/research/ui_research/vox-mana-identity-matrix-v2-mock.html` as an approved source-of-truth mock.

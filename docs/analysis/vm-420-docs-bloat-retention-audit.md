# VM-420 Docs Bloat Retention Audit

Chosen VM: VM-420

## Scope

VM-420 is a docs hygiene and retention-framework pass, not a broad mirror cleanup. It keeps `docs/handoffs/` and `docs/kanban/done/` intact for agent continuity, avoids history rewrite, and changes only current-tree documentation artifacts.

`VM-417` was not reused because VM-418 records that VM-417 may be reserved and the board already has VM-418 and VM-419 closed. VM-420 was unused before the card was created.

## Pre-Flight Summary

Recent related work:

- VM-024 normalized docs paths after reorg and left historical handoff/card paths as historical records.
- VM-076 preserved `docs/research/canon/` and `docs/research/ui_research/` as intentional archive/design additions.
- VM-156 inventoried the canon tree and kept source/canon material read-only by default.
- VM-170 established the Bant cleanup precedent: move/retain with provenance, update active refs, rebuild generated outputs only when raw metadata changes.
- VM-394 documented that new `docs/research/canon/` and `docs/research/ui_research/` files match ignore patterns, while already tracked files remain tracked.
- VM-418/VM-419 promoted and closed the recent route/runtime bundle; no runtime cleanup belongs in VM-420.

Current known risks:

- Tracked files that match ignore patterns are not safely ignored; they remain in the index until explicitly removed.
- Source-drop folders may be byte-identical to normalized `source-material/` copies but still serve as active provenance in source ledgers and packet docs.
- Raw metadata references exist for some preserved seed folders, so source-path removals can become data/build work.

Relevant decisions:

- No handoff or done-card compaction.
- No zipping by default.
- No source/canon deletion unless byte-identical and reference-safe.
- Moving a path is treated the same as removing it for reference-safety checks.

Files recently changed before VM-420:

- VM-413 through VM-419 public routes, docs, fonts, audits, board entries, and handoffs were already on the branch.

What VM-420 did not touch:

- Runtime routes/assets, generated data, raw metadata, placement behavior, MTG lore, Commander facts, visual baselines, `docs/handoffs/`, and `docs/kanban/done/`.

## Before / After Counts

These counts use tracked docs present in the working tree. New VM-420 markdown files are audit artifacts for this change and are not part of the pre-removal tracked baseline until staged.

| Metric | Before removals | After removals | Change |
| --- | ---: | ---: | ---: |
| Tracked docs files present | 1646 | 1644 | -2 |
| Tracked docs size present | 130.08 MB | 127.78 MB | -2.30 MB |
| Tracked Markdown files | 1401 | 1401 | 0 |
| Tracked docs Markdown files | 1389 | 1389 | 0 |
| Exact duplicate groups | 16 | 14 | -2 |
| Exact duplicate files | 32 | 28 | -4 |
| Redundant exact-duplicate bytes | 2.91 MB | 0.61 MB | -2.30 MB |
| Tracked files matching ignore patterns | 285 | 284 | -1 |
| Size of tracked files matching ignore patterns | 62.13 MB | 62.02 MB | -0.11 MB |

## Docs Size By Top Folder

After removals:

| Folder | Files | MB |
| --- | ---: | ---: |
| `docs/research` | 570 | 119.45 |
| `docs/handoffs` | 474 | 3.16 |
| `docs/audits` | 9 | 1.68 |
| `docs/kanban` | 438 | 1.53 |
| `docs/architecture` | 94 | 1.30 |
| `docs/analysis` | 14 | 0.29 |
| `docs/reference` | 17 | 0.20 |
| `docs/design` | 7 | 0.11 |
| `docs/diagrams` | 17 | 0.03 |
| `docs/contracts` | 1 | 0.02 |
| `docs/context` | 2 | 0.01 |
| `docs/mockups` | 1 | 0.00 |

## Tracked Files That Match Ignore Patterns

`git check-ignore -v --no-index` matched the tracked ignored-pattern inventory through repo-local rules:

| Rule | Files after removals | Notes |
| --- | ---: | --- |
| `.gitignore:39:docs/research/canon/` | 245 | Retained by default as source/canon archive material. |
| `.gitignore:40:docs/research/ui_research/` | 39 | Retained except the byte-identical `siteUpgradeInfo_Good.html` duplicate. |

After removals, the remaining tracked ignored-pattern files are:

| Folder | Files | MB | Markdown |
| --- | ---: | ---: | ---: |
| `docs/research/canon` | 245 | 56.58 | 119 |
| `docs/research/ui_research` | 39 | 5.44 | 0 |

## Duplicate Group Decisions

| Duplicate group | Hash | Decision | Rationale |
| --- | --- | --- | --- |
| `docs/research/archive/bant-pre-push-cleanup/duplicate-canon-captures/Alara Shards Lore Dossier Protocol.rtf` -> `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf` | `470AA497D31F43C2B72B6D37A2AB2055AE6915F14991A2438B5D73A85F01176A` | `remove-now` | Byte-identical archive duplicate; canonical canon copy is actively referenced. |
| `docs/research/ui_research/siteUpgradeInfo_Good.html` -> `docs/research/webdev/generic-webdev/MTG_Platform_Architecture_Codex_and_Interactive_Research.html` | `FE20CC9A838E2039D7516CD61F832B85B0B8A37488D2D3744A614737AE87ECE5` | `remove-now` | Byte-identical UI duplicate; only old-path hit was a historical handoff. |
| `docs/research/abzan houses/abzan-houses-lore-source-packet.md` -> `docs/research/abzan/source-material/abzan-houses-lore-source-packet.md` | `9DE1734999C5492C46386AE66744E301F4C96CF79870BACDA21E4FDF6CA90089` | `defer` | Active Abzan docs/source ledgers reference preserved seed provenance. |
| `docs/research/abzan houses/Abzan Houses_ Deep Research Report.md` -> `docs/research/abzan/source-material/Abzan Houses_ Deep Research Report.md` | `6F35B95D711438D8B2386AF454DC08B207D81075285A9FCF969D4D24FF7EF386` | `defer` | Active Abzan docs/source ledgers reference preserved seed provenance. |
| `docs/research/abzan houses/abzan_houses_research_report.html` -> `docs/research/abzan/source-material/abzan_houses_research_report.html` | `0A51CBBCA8216CB4E4EB7916BF90A4933D26773650C62AF6B052EB1744663970` | `defer` | Active Abzan docs/source ledgers reference preserved seed provenance. |
| `docs/research/jeskai way/jeskai-way-lore-source-packet.md` -> `docs/research/jeskai/source-material/jeskai-way-lore-source-packet.md` | `A55936C4F98883210077465017E451F0753C0D53A2FCF7D55292E4F1512020E6` | `defer` | Active Jeskai packet docs and crosschecks describe the source-drop folder as preserved seed material. |
| `docs/research/jeskai way/Jeskai Way Deep Research Report.md` -> `docs/research/jeskai/source-material/Jeskai Way Deep Research Report.md` | `90280D9FE7CC3A6571848F356B986F05DCAEF7CFBEAB7742EF9A98BEB1C614C7` | `defer` | Active Jeskai packet docs and crosschecks describe the source-drop folder as preserved seed material. |
| `docs/research/jeskai way/jeskai_way_research_report.html` -> `docs/research/jeskai/source-material/jeskai_way_research_report.html` | `C6855A8156410218A0D277CB51E154589B3A07682731F98DCB0DBD50F4BB225E` | `defer` | Active Jeskai packet docs and crosschecks describe the source-drop folder as preserved seed material. |
| `docs/research/mardu horde/mardu-horde-lore-source-packet.md` -> `docs/research/mardu/source-material/mardu-horde-lore-source-packet.md` | `5918CDA91867C1458604FFC0D2EB16530C1EE55DB3D93022440F3D7AE9CF191B` | `defer` | Active Mardu packet docs/source ledgers still refer to the unmanaged folder as preserved source material. |
| `docs/research/mardu horde/mardu_horde_tactical_archive.html` -> `docs/research/mardu/source-material/mardu_horde_tactical_archive.html` | `B4828907829F3B27A21176FB0F17B61405D0905C415AECA58480C62AAE3B796F` | `defer` | Active Mardu packet docs/source ledgers still refer to the unmanaged folder as preserved source material. |
| `docs/research/mardu horde/Mardu Horde Deep Research Report.md` -> `docs/research/mardu/source-material/Mardu Horde Deep Research Report.md` | `E40918D70416C352786154B29C4F44C9EEEDD004CBF7CDDBD8069EE460C934B5` | `defer` | Active Mardu packet docs/source ledgers still refer to the unmanaged folder as preserved source material. |
| `docs/research/sultai brood/sultai-brood-lore-source-packet.md` -> `docs/research/sultai/source-material/sultai-brood-lore-source-packet.md` | `B3DA5A11D40E27CF647C4F2550983264A30E52E8D55EE550811AC925242728AB` | `defer` | Active Sultai docs/source ledgers and raw metadata still reference the seed folder. |
| `docs/research/sultai brood/sultai-brood-deep-research-report.md` -> `docs/research/sultai/source-material/sultai-brood-deep-research-report.md` | `686FF85652C192B073C513284017ADA4F20F5036EA7E20AF793B3FB6483A78AB` | `defer` | Active Sultai docs/source ledgers and raw metadata still reference the seed folder. |
| `docs/research/canon/misc/bibliography.md` -> `docs/research/colorless/source-material/09_Sources_and_Bibliography.md` | `FFB3A7F133A3002299AC0370B9AC87B8630454B5203C52868D9D91E0E7E19033` | `retain-authority` | Bibliography/source-material records are evidence-bearing; active source ledger references the colorless copy. |
| `docs/architecture/system/color-pie-framework.md` -> `docs/research/colorless/source-material/06_Color_Pie_Framework_and_Philosophy.md` | `7B270FEAC028048643DA4A9A58681F3107B1AFAE91D1A4C0DB8497FC972D27A1` | `retain-authority` | Architecture doc is actively cited across color audits; colorless source-material copy is source-ledger support. |
| `docs/research/colorless/source-material/colorless.txt` -> `docs/research/colorless/source-material/The Colorless Mana Symbol.txt` | `EDA0DA9B2166F4C0A70F96421767A97D3AE71EB8CA604B7C2F99EE05B7379C42` | `retain-authority` | Both files are separately cited by `data/raw-factions/colorless/colorless.sources.json` and the colorless source ledger. |

## Reference Safety Results

Fixed-string scans after removal found no active source, raw metadata, generated, or runtime references to removed paths.

| Removed path | Remaining hits |
| --- | --- |
| `docs/research/archive/bant-pre-push-cleanup/duplicate-canon-captures/Alara Shards Lore Dossier Protocol.rtf` | VM-420 audit/manifest/card/handoff and historical VM-170 handoff only. |
| `docs/research/ui_research/siteUpgradeInfo_Good.html` | VM-420 audit/manifest/card/handoff and historical VM-063 handoff only. |

No raw metadata, generated data, runtime routes, or source metadata were changed. Therefore no generated rebuild was required.

## Follow-Up Candidates

- Run a dedicated source-path reconciliation for Abzan/Jeskai/Mardu/Sultai seed folders if the owner wants Markdown duplicate count reduction. That work should update source ledgers, packet docs, raw metadata where present, and generated outputs where raw metadata changes.
- Decide whether `docs/research/ui_research/` should keep serving as an active design-input folder. If not, a future pass can move stale prototypes into `docs/research/_archive/<chosen-vm>-ui-research/` with active reference updates.
- Keep large `docs/research/mono_upgrade` and canon PDFs/RTFs retained by default unless a future audit proves exact duplicate, uncited, non-authoritative status.

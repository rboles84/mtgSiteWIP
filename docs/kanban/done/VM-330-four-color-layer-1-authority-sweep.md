# VM-330 - Four-Color Layer 1 Authority Sweep

Status: Done
Owner: Codex
Agent role: Planning Architect / JSON Cartographer / Test Strategist
Created: 2026-06-11
Completed: 2026-06-11

## Summary

Audit and harden Layer 1 authority for the existing live four-color lanes `YORE`, `DUNE`, `GLINT`, and `INK`.

`WITCH` is comparison/regression-only under VM-330 because VM-328 is the freshest four-color Layer 1 authority lane. Do not edit WITCH raw, generated, runtime, registry, route, Maze, dossier, snippets, or Supabase context surfaces unless pre-flight proves VM-328 failed and VM-330 is explicitly re-scoped before implementation.

## Lane Contracts

| Lane | Technical color identity | Display/support name | Public alias contract |
| --- | --- | --- | --- |
| `YORE` | `WUBR` | `Yore / Artifice` | `["YORE"]` |
| `DUNE` | `BRGW` | `Dune / Aggression` | `["DUNE"]` |
| `GLINT` | `UBRG` | `Glint / Chaos` | `["GLINT"]` |
| `INK` | `RGWU` | `Ink / Altruism` | `["INK"]` |

## Pre-Flight Findings

- `VM-330` was unused before card creation.
- `VM-329` is occupied and complete as Colorless dossier / hero / precon / mana-base / Maze UX repair; it must not be reused.
- Broad unrelated dirty drift exists across runtime, generated data, raw packets, docs, assets, Kanban, handoffs, and canon relocation deletes. Preserve it.
- Baseline `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK` passed with 0 warnings.
- Baseline `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK,WITCH` passed with 0 warnings.

## Snapshot Hashes

Generated/context files before any VM-330 edit:

| File | SHA-256 |
| --- | --- |
| `data/factions.json` | `A2256090237B01D9DB8B6860162EBCA5887639E23317E61C8FF60D6F50A2640A` |
| `data/placement-model.json` | `0A82336650A2510C12E190D03050038F0BD0DD8485D9A1079B2089E2A9A1F85F` |
| `data/identity-layers.json` | `6AC5E11C867A3406C5F6736E2DC48928DFBEB728BF937C301392E9D0B86B6AEF` |
| `data/archscry-flavor-snippets.json` | `E7A396EF3BD68C27F727B6D422BC3101D7F2389E984D45E0D24DF1BE34F63923` |
| `supabase/functions/guild-recruiter/faction-context.ts` | `E180FAE8126AE8B30924E39B0DE735131386446D0BF60A24D3E6D039A21E1C8E` |

Target raw files before any VM-330 edit:

| File | SHA-256 |
| --- | --- |
| `data/raw-factions/yore/yore.changelog.json` | `1C5F7773C92A4E80182F55D73DC8EED6731FDBDA7E9E20DCCD9BBE1035885B45` |
| `data/raw-factions/yore/yore.claims.json` | `18E2523369C01F117E10CE171B4B44F2288D76690D113ED18890F28C248E95E7` |
| `data/raw-factions/yore/yore.placement.json` | `A35F62287D72C8F1C114AC13887C3622BC42270F0B7B79EA7637A2637ACE517D` |
| `data/raw-factions/yore/yore.profile.json` | `73B215639C5654C5D48E83604A70D499E0BA2CE1EF67B05981D2BC7E8C47B53D` |
| `data/raw-factions/yore/yore.sources.json` | `207A2B051FF932F1373BA54695C86A14EFDFAF4758F09C5A96DDA6530D84EC86` |
| `data/raw-factions/dune/dune.changelog.json` | `F5EC5C85C5F1C16E543AF31E23A27BBD5AFC9129C85A9E4927A4E3696EADF18A` |
| `data/raw-factions/dune/dune.claims.json` | `0D23A30FC5341057B3AB267D8FD4245076E1CFA3F2D71CA51D5E9521460C427E` |
| `data/raw-factions/dune/dune.placement.json` | `19053DE26DE3CF38C082DCBCF94484B7AF4DBD5911CAF2CFE89C9FE370553292` |
| `data/raw-factions/dune/dune.profile.json` | `FCF7DB953844C62820A3B3DBC567DA14967774D1F02866A9AA8722D9D08A15E3` |
| `data/raw-factions/dune/dune.sources.json` | `FB3B6BADB087E2D9EBC5C517750525EDB0FF6B28A5DE52787CE49D1278A3579C` |
| `data/raw-factions/glint/glint.changelog.json` | `D1898AF4356F813B0D336F88AE33CD4574818A07142B87809AF8EDD653B9975E` |
| `data/raw-factions/glint/glint.claims.json` | `8E0ECF3BB292F6AE6F47843512695D48DE8FCCC1EBBBE03ECA6EC31F88885657` |
| `data/raw-factions/glint/glint.placement.json` | `DF6860639298417171FED70577AD1B80D307A5609FDA684AB886B08D65ECE2B2` |
| `data/raw-factions/glint/glint.profile.json` | `D641D1129AFCA1D8618D773400AE3818DD148F84335ED51ED1DCB82872E6BD53` |
| `data/raw-factions/glint/glint.sources.json` | `1CC75F20F127E0CBA5559812509A723517208BFAFA99A00919A651FCD5C7B87C` |
| `data/raw-factions/ink/ink.changelog.json` | `D12C5C58A02CB2458E0BAF985DCF77D27B054E6541DEC1F063940EE58F88F6D4` |
| `data/raw-factions/ink/ink.claims.json` | `67F231AB414D5ACAEDA372EB45ED8476655AFCA298051926F9EABC000E7DE5D9` |
| `data/raw-factions/ink/ink.placement.json` | `60140E88193DE1A156D0E43ECB431ACB88FB153AAED4D2C375DA257A3E666DD8` |
| `data/raw-factions/ink/ink.profile.json` | `6F261D9E88552FFCD111F14148013A8C2009CABE650FC1DF895B196F85303D6F` |
| `data/raw-factions/ink/ink.sources.json` | `CE21DE345FEF0050FE90962664573224E3E2DD0E551A5623A5E73F0216AA79D6` |

## Scope

- Audit `YORE`, `DUNE`, `GLINT`, and `INK` Layer 1 authority surfaces only.
- Compare against `WITCH` for four-color Layer 1 completeness only.
- Do not copy WITCH content, expand target lore density, or use WITCH to justify route, alias, preview, or public-interface changes.
- If a gap exists but approved local evidence is missing, do not infer, invent, or launder generated copy into raw source. Record the gap and queue a source-acquisition/intake follow-up.

## Acceptance Criteria

- [x] Raw packet authority verifies for `YORE`, `DUNE`, `GLINT`, and `INK`.
- [x] Generated display, placement, snippets, identity registry, and Supabase context entries verify for each target lane.
- [x] Runtime/Maze/dossier policy verifies for each target lane, with the existing VM-263 Ink Maze suppression warning recorded.
- [x] WITCH remains clean as comparison/regression-only.
- [x] No WITCH edit, WUBRG, Colorless, mono, route, alias, Home preview, hero asset, web research, or generated-to-raw laundering work is performed.
- [x] Required validation and test commands are run and recorded.

## Audit Result

No source-backed inconsistency was found in the VM-330 target raw, generated, registry, snippets, or Supabase context surfaces.

No raw source files changed. No generated files changed. No builders were run. Snapshot hashes for all target raw files and relevant generated/context files remained unchanged after audit.

`WITCH` was comparison/regression-only and remained clean in the final `YORE,DUNE,GLINT,INK,WITCH` validation.

`INK` has one policy warning: VM-263 explicitly promoted Ink as live/generated and placement-eligible while suppressing Ink Maze links and `RGWU` exact-query URLs until a future card. VM-330 therefore records the conflict between the requested `id=rgwu` runtime wording and the existing VM-263 public-interface guard, without expanding runtime under this audit-first card.

## Lane Verdicts

| Lane | Layer 1 status | Raw packet | Generated display | Generated placement | Identity registry | Snippets | Supabase context | Runtime / Maze / dossier | Warnings | Files changed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `YORE` | Complete | Present; five approved claims; claim source IDs and claim refs resolve. | Present; `YORE`, `Yore / Artifice`, `WUBR` contract matches. | Present; `placement_eligible: true`; generated claim count/source metadata remains `5`. | Live/placeable; preview-ineligible; alias `["YORE"]`; directory links suppressed. | Present; matched-card source excerpts; no route/alias/preview wording. | Present; key/color contract matches. | Exact commander query coverage remains `id=wubr`; dossier/follow-up surfaces covered. | None. | None. |
| `DUNE` | Complete | Present; five approved claims; claim source IDs and claim refs resolve. | Present; `DUNE`, `Dune / Aggression`, `BRGW` contract matches. | Present; `placement_eligible: true`; generated claim count/source metadata remains `5`. | Live/placeable; preview-ineligible; alias `["DUNE"]`; directory links suppressed. | Present; matched-card source excerpts; no route/alias/preview wording. | Present; key/color contract matches. | Exact commander query coverage remains `id=brgw`; dossier/follow-up surfaces covered. | None. | None. |
| `GLINT` | Complete | Present; five approved claims; claim source IDs and claim refs resolve. | Present; `GLINT`, `Glint / Chaos`, `UBRG` contract matches. | Present; `placement_eligible: true`; generated claim count/source metadata remains `5`. | Live/placeable; preview-ineligible; alias `["GLINT"]`; directory links suppressed. | Present; matched-card source excerpts; no route/alias/preview wording. | Present; key/color contract matches. | Exact commander query coverage remains `id=ubrg`; dossier/follow-up surfaces covered. | None. | None. |
| `INK` | Complete with warning | Present; five approved claims; claim source IDs and claim refs resolve. | Present; `INK`, `Ink / Altruism`, `RGWU` contract matches. | Present; `placement_eligible: true`; generated claim count/source metadata remains `5`. | Live/placeable; preview-ineligible; alias `["INK"]`; directory links suppressed. | Present; matched-card source excerpts; no route/alias/preview wording. | Present; key/color contract matches. | Placement/dossier live; Maze link remains intentionally suppressed by VM-263. | VM-263 suppresses Ink Maze links and `RGWU` exact-query URLs; future card should reconcile if `id=rgwu` activation is desired. | None. |

## Tests Run

- Pass, 0 warnings: `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK`
- Pass, 0 warnings: `npm.cmd run validate:source-generated -- --targets=YORE,DUNE,GLINT,INK,WITCH`
- Pass with 26 existing model-owned inhibitor warnings, none from VM-330 targets or WITCH: `npm.cmd run test:source-generated -- --all`
- Pass: `npm.cmd run test:placement`
- Fail on out-of-scope Colorless assertion in `research/archscry-dossier-followup-tests.js:2532`: `npm.cmd test`
- Pass, 115 parser cases: `npm.cmd run test:parser`
- Fail on the same out-of-scope Colorless assertion in `research/archscry-dossier-followup-tests.js:2532`: `node research\archscry-dossier-followup-tests.js`
- Pass: `node research\maze-search-tests.js`

## Not Performed

- No WITCH edits.
- No WUBRG, five-color, Colorless, mono-color, guild, shard, wedge, route, alias, Home preview, hero asset, schema, web research, generated-to-raw laundering, or broad dirty-worktree cleanup.
- No staging, commit, clean, revert, normalize, or unrelated overwrite.

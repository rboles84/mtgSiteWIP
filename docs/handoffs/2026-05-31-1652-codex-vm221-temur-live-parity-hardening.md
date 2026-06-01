# 2026-05-31 16:52 - Codex - VM-221 Temur Live Parity Hardening

## Agent Name

Codex

## Task Requested

Implement VM-221 as a Temur-only post-promotion live parity and Archscry text hardening pass, preserving VM-208 runtime boundaries and raw hash protections.

## Final Result

`live-parity-complete`

## Pre-Flight Summary

Recent related work:

- VM-208 promoted `TEMUR` as the single Temur live-pilot expression and recorded `promotion-complete-live-pilot`.
- VM-208 preserved `GUR` as metadata/query-only, kept Home preview at 20 entries, and recorded protected raw hashes for Temur claims and sources.
- VM-209 was confirmed as Sultai, not Temur. VM-221 was confirmed available before creation.
- Current board state already included adjacent Sultai/Jeskai/Abzan activity and a noisy worktree.

Current known risks:

- The worktree is broadly dirty with pre-existing tracked and untracked changes from Abzan, Sultai, Jeskai, Temur, runtime/generated, and docs lanes.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` already carried adjacent-lane changes before VM-221.
- Broad `git diff --name-only` includes generated/builder/identity files from the dirty baseline, so VM-221 relied on scoped edits, hashes, counts, and tests.

Relevant decisions already made:

- `TEMUR` remains live and placement-eligible.
- `GUR` remains data-level color metadata/query support only.
- Commander, dragons, ramp, copying, energy, counters, X-spells, ravenous, and artifacts may be used only as Commander/player texture.
- VM-221 must not retune placement, rebuild generated artifacts, or edit raw/research/architecture files.

Files recently changed before this pass:

- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- generated faction/placement/flavor/context artifacts
- board and handoff index files

What should not be touched:

- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`
- `docs/research/temur/**`
- `docs/research/temur frontier/**`
- `docs/architecture/colors/temur/**`
- Sultai, Jeskai, Mardu, or Abzan lane files
- `research/build-faction-artifacts.mjs`
- `data/identity-layers.json`
- Home preview membership, routes, Maze files, schemas, fixtures, generated artifacts, and Supabase config/migrations/deployment files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`

## Files Changed

- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-221-temur-live-parity-archscry-text-hardening.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1652-codex-vm221-temur-live-parity-hardening.md`

## What Changed

- Reworded Temur Archscry mechanics and self-check copy so Commander texture reads as player-facing table texture rather than visible internal caveat language.
- Reworded Temur Commander guidance so dragons, ramp, energy, artifacts, copying, instants, non-hand casting, tokens, counters, X-spells, and ravenous lines are deck expression, not Temur/Tarkir lore source.
- Reworded Temur precon fit summaries away from visible `support-only`, `canon proof`, and product-as-canon caveat phrasing.
- Added rendered Temur dossier and presentation regressions that reject public `GUR`, route-like paths, internal caveats, Atarka continuity, Dragonstorm backfill, Commander-canon leakage, and mechanics-as-canon leakage.
- Added Temur to the follow-up mana-base renderability assertion alongside Jund, Naya, and Abzan.
- Created and closed the VM-221 Kanban card.

## Why It Changed

VM-208 made Temur live. VM-221 tightened the mature live surface so Temur's player-facing copy keeps VM-203 through VM-208 boundaries without exposing implementation caveats or letting `GUR`, Atarka, Dragonstorm, or Commander-product material read as public identity proof.

## Temur Visible-Copy Issues Found And Fixed

- Presentation mechanics copy used visible `support-only` / canon-proof style language. It now describes Commander-facing table texture without turning deck mechanics into Tarkir lore.
- Commander spellcraft copy used visible `Commander support, not canon proof` phrasing. It now frames mechanics as deck expression, not the source of the clan's lore.
- Temur precon summaries repeatedly used support/canon caveats. They now read as Commander fit summaries anchored in attunement, timing, and earned pressure.

## Raw Hash Preservation

Protected Temur raw hashes matched before and after VM-221:

- `data/raw-factions/temur/temur.claims.json`: `C2C7839BE001619C2A5BEA0F2CAC2838FDC94C632AFFC3C7CC5888F79800E029`
- `data/raw-factions/temur/temur.sources.json`: `D2D2C96E40D78BE58E9BB5FA2AC414F6738074E611237C56412E9B551C4C3435`

## GUR Metadata-Only Proof

- Data-level `GUR` remains present only as existing Temur color metadata/query support, including `routing.color_identity`.
- `GUR`, `GRU`, `UGR`, `URG`, `RGU`, and `RUG` are absent as identity keys, generated faction keys, generated placement keys, and aliases.
- Rendered/visible Temur dossier and presentation tests reject public `GUR`, `Exact GUR`, generic `GUR`, `/temur/`, and `/gur/` leakage.

## Home Preview Proof

- Identity placement-eligible count remained 27.
- Generated faction count remained 27.
- Generated placement record count remained 27.
- Home preview membership remained 20.
- `TEMUR` remains absent from Home preview membership.

## Generated Refresh

No generated refresh was run. VM-221 changed display-source/test files only and did not require `npm.cmd run build:factions`.

## Decisions Made

- Kept Temur hardening to visible-copy and regression coverage only.
- Did not retune placement scoring, priors, inhibition, `RAW_TO_KEY`, builder mappings, identity-layer expression counts, generated placement records, or generated artifacts.
- Kept internal guardrail strings in source where they are used as review constraints, while rendered/visible tests enforce that those strings do not appear in public Temur copy.

## Risks / Uncertainties

- Broad repo status remains noisy with pre-existing changes outside VM-221 scope.
- A broad source grep for forbidden phrases still finds non-Temur legacy copy, internal guardrail strings, and test regexes. VM-221's enforced boundary is rendered/visible Temur copy plus key/alias/count/hash guards.

## Tests Run

- `Get-ChildItem docs\kanban -Recurse -File | Where-Object { $_.Name -match '^VM-221' }`
- `Get-ChildItem docs\handoffs -File | Where-Object { $_.Name -match 'vm221|VM-221|temur.*hardening|temur.*live-parity' }`
- `Get-FileHash data\raw-factions\temur\temur.claims.json -Algorithm SHA256`
- `Get-FileHash data\raw-factions\temur\temur.sources.json -Algorithm SHA256`
- Count guard for 27 placement-eligible expressions, 27 generated factions, 27 generated placement records, 20 Home preview entries, `TEMUR` absent from Home preview, and no blocked GUR/permutation keys or aliases.
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node assets\js\quick-reading-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Scoped visible-copy/source guard review
- `git diff --check` on VM-221 tracked files
- Scoped trailing-whitespace scan on VM-221 files

Skipped:

- `npm.cmd run test:parser`, because parser files did not change.
- `npm.cmd run build:factions`, because no generated refresh was required.

## Not Touched

- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`
- `docs/research/temur/**`
- `docs/research/temur frontier/**`
- `docs/architecture/colors/temur/**`
- Sultai, Jeskai, Mardu, and Abzan lane files
- `research/build-faction-artifacts.mjs`
- `data/identity-layers.json`
- Generated artifacts
- Home preview membership
- Static routes
- Maze files and Maze route behavior
- Schemas and fixtures
- Supabase config, migrations, deployment settings, and hand-authored Supabase files

## Follow-Up Recommendations

- Human review VM-221 before further Temur copy hardening.
- Keep future Temur tuning separate from live copy hardening; any placement retuning should be a dedicated card.

## Next Suggested Agent

Human reviewer.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-221-temur-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`

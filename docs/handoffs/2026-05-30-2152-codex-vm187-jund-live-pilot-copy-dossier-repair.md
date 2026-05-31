# Agent Handoff - VM-187 Jund Live-Pilot Copy And Dossier Handoff Repair

## Agent Name

Codex

## Task Requested

Implement VM-187: repair Jund's live-pilot presentation, Start Here guidance, Why This Fits copy, precon summaries, blank starter-card rendering, duplicate Basics label, and Maze `From Your Dossier` sidebar identity leak after VM-186 promoted `JUND`.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-1728-codex-vm174-grixis-maze-sidebar-identity-repair.md`
- `docs/handoffs/2026-05-30-1715-codex-vm173-grixis-dossier-recommendation-quality-repair.md`
- `docs/kanban/done/VM-186-jund-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-174-grixis-maze-sidebar-identity-repair.md`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/js/maze-handoff.js`
- `assets/js/quick-reading-tests.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/precon-artifact-tests.js`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.sources.json`
- `data/precons/vox-mana-precon-catalog.json`

## Files Changed

- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `assets/js/maze-handoff.js`
- `assets/js/quick-reading-tests.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/precon-artifact-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-187-jund-live-pilot-copy-dossier-handoff-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-2152-codex-vm187-jund-live-pilot-copy-dossier-repair.md`

## What Changed

- Added a `JUND` presentation override so reveal and Why This Fits copy no longer falls through generic fallback language.
- Added Jund/Gruul fork copy that asks what instinct is worth feeding rather than using vague path language.
- Added Jund Commander guidance for pressure, sacrifice, attrition, drain, support-only mechanics caveats, and table caution.
- Added Jund-specific precon fit summaries for World Shaper, Power Hungry, Blight Curse, and Graveyard Overdrive using facts already present in the local precon catalog.
- Suppressed empty Starter Card References panels and removed the duplicate inner Basics label in the mana-base panel.
- Added `JUND -> brg` to the Maze dossier identity resolver and passed a visible `Jund` hint so active Jund handoffs do not render stored `UR` sidebar paths or visible `BRG`.
- Added regressions for the new Jund presentation, Commander onboarding, precon copy, Maze sidebar identity override, starter-card suppression, and mana-base display boundaries.

## Why It Changed

Manual QA found that live Jund still sounded like generated fallback copy and that Maze `From Your Dossier` could show `UR` paths when a Jund handoff carried a stored adjacent/primary color-pair result. VM-187 repairs those live surfaces while preserving the VM-176 through VM-180 evidence boundary and VM-186 promotion contract.

## Decisions Made

- `JUND` remains the live expression key.
- `brg` is allowed only as internal query/color metadata.
- `BRG` must not become a visible label, alias, route key, fixture key, public expression key, or raw-to-live target.
- Jund mechanics language is display/support-only and carries the VM-179 caveat rather than becoming canon evidence.
- Empty starter-card sections are suppressed globally when all starter groups are empty, instead of adding unapproved Jund starter cards.
- The Maze sidebar hides outside-color commander stretch for live Jund, matching the shard policy already used for Grixis.

## Risks / Uncertainties

- The worktree was already dirty with prior shard/runtime changes and untracked Jund/Naya materials before VM-187. This task preserved that state and did not revert unrelated files.
- `git diff --check` passed but continued to report existing LF-to-CRLF working-copy warnings.
- VM-187 did not run `npm.cmd run build:factions` because the repaired copy lives in runtime/rendering source and did not require generated faction output.

## Tests Run

- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/index.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check assets/js/maze-handoff.js`
- `node --check research/research-init.js`
- `node --check research/maze-search-tests.js`
- `node research/maze-search-tests.js`
- `node assets/js/quick-reading-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/precon-artifact-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git diff --check`

## Guard Checks

- `data/raw-factions/jund/jund.claims.json` hash stayed `EDA50E0F55756014D80351AC36089474755CA501B73DE5B11A4BFAC8641FDA82`.
- Jund raw claim count stayed 10, from `jund_claim_0001` through `jund_claim_0010`.
- Jund source roles still use only `claim-bearing`, `shaping-only`, and `support-only`; no new claim-bearing reclassification was introduced.
- Scoped VM-187 changes were limited to Jund presentation/runtime copy, Jund Maze dossier resolver behavior, targeted tests, Kanban, and handoff/index files.

## Not Touched

- `data/raw-factions/jund/jund.claims.json`
- Naya paths
- Jund research or architecture docs
- Home preview files
- Route maps, static pages, Maze routes, route CSS, or route keys
- Schema files
- Raw-faction claim files
- Generated faction output
- New lore sources, evidence rows, manual-fill rows, Commander facts, card facts, precon facts, or raw claims

## Follow-Up Recommendations

- Manually smoke a fresh Jund Archscry result and Maze handoff in browser to confirm the copy feels right in the live layout and the Maze sidebar shows Jund / Black-Red-Green intent rather than `UR`.
- If Jund starter-card recommendations are desired later, open a separate evidence/support card instead of filling them through VM-187.
- If future shard pilots need similar copy repair, start from this VM-187 presentation override pattern instead of allowing fallback language to ship.

## Next Suggested Agent

Manual QA / Product Reviewer for live Jund copy acceptance.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-187-jund-live-pilot-copy-dossier-handoff-repair.md`
- `docs/kanban/done/VM-186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-1728-codex-vm174-grixis-maze-sidebar-identity-repair.md`
- `docs/handoffs/2026-05-30-1715-codex-vm173-grixis-dossier-recommendation-quality-repair.md`


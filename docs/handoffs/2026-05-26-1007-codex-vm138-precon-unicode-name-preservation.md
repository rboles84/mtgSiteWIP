# Agent Handoff

- Agent name: Codex
- Task requested: Fix the `Blood Rites` precon so `Clavileño, First of the Blessed` renders correctly in Archscry precon cards and outbound Scryfall / MTGDecks links, then document and test the repair.
- Related Kanban card: VM-138

## Files reviewed

- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-26-0731-codex-vm136-archscry-precon-layer.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-26-0816-codex-vm137-faction-native-precons.md`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`
- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-137-faction-native-precons.md`
- `C:\dev\mtgSiteWIP\data\precons\vox-mana-precons.source.json`
- `C:\dev\mtgSiteWIP\data\precons\vox-mana-precon-catalog.json`
- `C:\dev\mtgSiteWIP\research\build-precon-artifacts.mjs`
- `C:\dev\mtgSiteWIP\research\precon-artifact-tests.js`
- `C:\dev\mtgSiteWIP\assets\js\index.js`
- `C:\dev\mtgSiteWIP\assets\js\commander-dossier.js`
- `C:\dev\mtgSiteWIP\docs\reference\data-contracts.md`
- `C:\dev\mtgSiteWIP\docs\reference\manual-test-cases.md`

## Files changed

- `C:\dev\mtgSiteWIP\data\precons\vox-mana-precons.source.json`
- `C:\dev\mtgSiteWIP\data\precons\vox-mana-precon-catalog.json`
- `C:\dev\mtgSiteWIP\research\build-precon-artifacts.mjs`
- `C:\dev\mtgSiteWIP\research\precon-artifact-tests.js`
- `C:\dev\mtgSiteWIP\docs\reference\data-contracts.md`
- `C:\dev\mtgSiteWIP\docs\reference\manual-test-cases.md`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`
- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-138-precon-unicode-name-preservation.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-26-1007-codex-vm138-precon-unicode-name-preservation.md`

## What changed

- Corrected the canonical `Blood Rites` source record to use `Clavileño, First of the Blessed` consistently across the commander name, descriptive copy, and learning copy.
- Rebuilt the generated precon catalog so the corrected commander name now flows into dossier rendering and outbound link inputs.
- Hardened the precon artifact builder so it fails on `U+FFFD` replacement characters instead of silently converting corrupted text into shipping runtime data.
- Added regression coverage that locks the `Blood Rites` commander name, MTGDecks slug, and Scryfall exact-name query in place.
- Added a manual QA note and a data-contract note so future source edits know to preserve UTF-8 clean commander names.
- Added VM-138 to the Kanban done lane and indexed this handoff.

## Why it changed

- The live dossier was rendering `Clavile-o, First of the Blessed`, which broke both the on-card commander display and the downstream commander-specific search links.
- The root cause was not the renderer: the canonical precon source JSON already contained the damaged commander name, and the build pipeline propagated it faithfully.
- The builder was also too forgiving about replacement-character corruption, which created a risk of silently shipping future mojibake into the generated runtime catalog.

## Decisions made

- Kept the fix in the canonical precon source lane instead of patching the renderer or generated output directly.
- Treated this as a pipeline integrity fix, not a UI-only copy tweak.
- Added a fail-fast rule for `U+FFFD` rather than trying to auto-repair corrupted source text during generation.
- Scoped the change to the reported unicode/name-link issue without changing recommendation ordering, dossier structure, or panel behavior.

## Risks / uncertainties

- This fix guarantees the current canonical source and generated catalog preserve `Clavileño`, but it does not automatically repair archived research snapshots outside the canonical data lane.
- Other future source edits could still introduce different encoding mistakes that are valid Unicode but semantically wrong; this pass specifically guards against replacement-character corruption and the known `Clavileño` regression.
- The worktree still contains the broader uncommitted VM-136 / VM-137 precon-layer changes, so any later commit should be scoped carefully if the user wants this bug fix separated from the larger branch payload.

## Tests run

- `npm.cmd run build:precons`
- `node research/precon-artifact-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd test`

## Not touched

- Placement scoring and `placement_result`
- Save / resume and Supabase profile contracts
- Maze handoff behavior
- Strategium
- Top-level Archscry dossier rail and panel ordering
- Precon recommendation ranking rules

## Follow-up recommendations

- If the user still edits archived `vox_mana_precons_MASTER` snapshots, add a small contributor note pointing future edits to `data/precons/vox-mana-precons.source.json` as the authoritative source.
- If more non-ASCII commander names are expected, consider a tiny source QA script that scans canonical precon text for common mojibake patterns before build time.

## Next suggested agent

- JSON Cartographer or Test Strategist if more source-data QA hardening is requested.

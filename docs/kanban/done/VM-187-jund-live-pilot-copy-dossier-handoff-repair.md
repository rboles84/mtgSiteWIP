# VM-187 - Jund Live-Pilot Copy And Dossier Handoff Repair

ID: VM-187
Title: Jund Live-Pilot Copy And Dossier Handoff Repair
Status: done
Type: Runtime Copy / Dossier Handoff Bugfix
Area: Jund, Archscry, Maze
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Repair Jund's post-VM-186 live-pilot presentation so its reveal, onboarding, precon summaries, starter UX, mana-base basics guidance, and Maze dossier sidebar feel like Vox Mana instead of generic fallback copy.

## Scope

- Add authored Jund presentation copy for `JUND`.
- Keep `brg` internal query/color metadata only.
- Prevent `BRG` from becoming a visible label, alias, route key, fixture key, public expression key, or raw-to-live target.
- Repair Jund Commander onboarding copy and support-only mechanics caveat.
- Repair Jund precon presentation blurbs using facts already present in the local precon catalog.
- Hide empty starter-card panels when no starter cards are authored.
- Remove duplicate Basics label in the mana-base panel.
- Add Jund to the Maze dossier sidebar resolver so active Jund handoffs use `brg` paths instead of stored `UR` or other primary placement noise.

## Non-Goals

- Do not edit `data/raw-factions/jund/jund.claims.json`.
- Do not add new Jund lore sources, raw claims, evidence rows, manual-fill rows, Commander facts, card facts, precon facts, route keys, static pages, Home preview entries, schema fields, or generated identity keys.
- Do not touch Naya work.
- Do not run a generated faction rebuild unless the repaired copy requires the approved faction build path.

## Acceptance Criteria

- Jund reveal and Why This Fits copy no longer use generic fallback language such as `playable pattern`, `personality label`, `recognizable Commander table role`, or `Commander mechanics that make the faction plan visible`.
- Start Here uses the Jund pressure/appetite Commander plan and lists `Midrange`, `Aggro`, and `Counters Matter`.
- Precon summaries avoid `Exact BRG` and use Jund-facing local-catalog facts for World Shaper, Power Hungry, Blight Curse, and Graveyard Overdrive.
- Empty Starter Card References do not render blank sections.
- Mana Base Starting Map has one Basics label and Jund basics guidance for Swamps, Mountains, and Forests.
- Maze `From Your Dossier` for active `JUND` uses `id=brg` and `id<=brg`, does not show `UR`, does not show visible `BRG`, and hides outside-color commander stretch.
- Raw Jund claims remain unchanged.

## Completion Notes

- Added `JUND` presentation copy and Jund/Gruul contrast language.
- Added Jund Commander guidance and Jund-specific precon fit summaries.
- Added render guards for empty starter-card panels and duplicate Basics labels.
- Added `JUND -> brg` to the Maze dossier identity resolver with a Jund visible hint.
- Added regressions for Jund presentation copy, Commander onboarding, precon summaries, Maze sidebar identity override, and starter/mana rendering guards.

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

- `data/raw-factions/jund/jund.claims.json` hash remained `EDA50E0F55756014D80351AC36089474755CA501B73DE5B11A4BFAC8641FDA82`.
- Jund raw claim count remained 10 with IDs `jund_claim_0001` through `jund_claim_0010`.
- Source-role allowlist remained valid with no new claim-bearing source reclassification.
- No VM-187 edits were made to Naya paths, Home preview files, route maps, schema files, or raw-faction claim files.

# VM-316 - TEMUR Source-First Display Enrichment

ID: VM-316
Title: TEMUR Source-First Display Enrichment
Status: done
Type: JSON / Display Source Enrichment
Area: Temur Frontier, Display Data, Raw Profile Anchors
Priority: high
Created: 2026-06-09
Completed: 2026-06-09

## Summary

Repair TEMUR's display-quality gap using local approved source backing only. TEMUR already passed VM-300 with one expected model-owned inhibitor warning and non-empty mechanics, but display inputs were thin: no raw enrichment, empty deck links, empty research links, empty raw key figures, and empty raw canonical flavor text.

## Scope

- Preserve unrelated dirty worktree drift.
- Use local approved Temur research/source backing only.
- Add TEMUR display metadata following the ABZAN/SULTAI wedge convention.
- Add TEMUR raw enrichment through the approved display-source path.
- Add raw key figures and institutional anchors only when explicitly supported by promoted TEMUR evidence rows and current timeline limits.
- Keep canonical flavor text empty.
- Fix stale quick-reading color-order expectations only when runtime/search output proved the test expectation was stale.

## Non-Goals

- Do not edit TEMUR raw claims, sources, or placement.
- Do not add placement axes, discriminator questions, inhibitor changes, claim-count repairs, schema changes, mechanics rewrites, or generated placement edits.
- Do not treat deck/research links as lore, profile, placement, or claim evidence.
- Do not author flavor snippets, routes, Maze behavior, Home preview changes, or deck research.
- Do not start VM-236.

## Completion Notes

- Added TEMUR display metadata in `data/identity-layers.json`: `display.research_links.edhrec_slug = "temur"` and one `Temur Commanders` deck link.
- Added `data/factions.json::factions.TEMUR.raw_enrichment` with 3 timeline beats, 5 figure/institutional anchors, and empty `canonical_flavor_text`.
- Added 5 bounded raw profile anchors: Surrak Dragonclaw, Yasova Dragonclaw, The Dragonclaw, The One Who Whispers Twice / Twice Whisperer, and Whisperers and the Wide Whisper.
- Updated `temur.changelog.json` with VM-316 display enrichment and unchanged raw claims/sources/placement boundaries.
- Corrected stale quick-reading color-order expectations for TEMUR and adjacent SULTAI/JESKAI harness assertions after runtime/search output proved the test expectations were stale.
- Restored unrelated WITCH Supabase context drift from the full build; targeted `--context-targets=TEMUR` produced no accepted context diff.

## Acceptance Criteria

- [x] VM-316 pre-flight and baseline probes were recorded.
- [x] TEMUR display metadata has `edhrec_slug: "temur"` and one `Temur Commanders` deck link.
- [x] TEMUR raw enrichment has three timeline beats, evidence-backed figure/institutional anchors, and empty `canonical_flavor_text`.
- [x] Raw profile anchor additions are evidence-backed and timeline-bounded.
- [x] TEMUR claims, sources, and placement hashes remain unchanged.
- [x] Generated output acceptance is limited to deterministic TEMUR display changes.
- [x] VM-300 target validation remains green for `LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR` with only expected model-owned warnings.
- [x] Required tests pass, including `npm.cmd run test:placement`.

## Tests Run

- `node --check research\build-faction-artifacts.mjs`
- `node --check research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:faction-context-isolation`
- JSON parse checks for touched raw/display/generated JSON.
- Hash guards for `data/raw-factions/temur/temur.claims.json`, `data/raw-factions/temur/temur.sources.json`, and `data/raw-factions/temur/temur.placement.json`.
- `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR`
- `npm.cmd run build:factions`
- Generated diff inspection against a pre-build snapshot.
- `npm.cmd run build:factions -- --context-targets=TEMUR`
- `npm.cmd run test:source-generated`
- `node research\archscry-dossier-followup-tests.js`
- `node research\maze-search-tests.js`
- `npm.cmd run test:placement`

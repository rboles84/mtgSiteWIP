# VM-273 - Yore Live Placement Copy Polish And Manual QA Repair

ID: VM-273
Title: Yore Live Placement Copy Polish And Manual QA Repair
Status: done
Type: Runtime Presentation / Manual QA Repair
Area: Yore, Archscry, Commander Dossier
Priority: high
Created: 2026-06-03
Completed: 2026-06-03

## Summary

Repaired manual QA issues in live Yore placement and dossier presentation after VM-245 promotion.

## Results

- Removed user-facing implementation phrasing from Yore presentation copy, including `strict false-positive boundaries`.
- Added Yore/Abzan-specific hero, reading-signal, and fork copy so Yore reads as artifice, constructed continuity, and engineered agency while Abzan keeps endurance, obligation, ancestry, and inherited survival.
- Added Yore-specific radar helper text explaining that Growth is an interpretive pressure reading, not Green color membership.
- Displayed Yore `Aggro` tag summaries as `Pressure` in the Yore presentation layer only, without renaming global taxonomy.
- Updated source-side flavor snippet generation so Yore prefers local source-safe examples and excludes weak examples like `Abrade` and `Abandon the Post`.
- Rebuilt `data/archscry-flavor-snippets.json` through `node research/build-archscry-flavor-snippets.mjs`.

## Manual QA Outcome

- Yore hero preserves `Rewrite the limit. Keep the engine honest.`
- Yore/Abzan fork uses `What limit is worth rebuilding so choice can continue?` and keeps Abzan distinct.
- Growth radar explains non-Green Yore continuity/adaptation pressure without claiming Green alignment.
- Yore card examples are now `Ayara, Widow of the Realm // Ayara, Furnace Queen`, `Abandoned Sarcophagus`, and `Access Denied`.
- Yore remains outside Home preview.

## Protected Surfaces

- Did not edit `data/raw-factions/yore/**`.
- Did not edit `docs/research/yore/**`.
- Did not edit `docs/architecture/colors/yore/**`.
- Did not change placement eligibility, aliases, routes, Maze behavior, Home preview membership, Supabase runtime, schemas, or promotion status.
- Did not touch unrelated Glint files or unrelated dirty files.

## Verification

- Raw Yore JSON hashes still match VM-244/VM-245 expected hashes.
- Counts remain identity 31, factions 31, placement 31, Archscry flavor snippets 31, Home preview 20.
- `YORE` is not in Home preview.
- `WUBR` and permutations remain metadata-query-only.

## Tests Run

- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\dossier-radar.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\build-archscry-flavor-snippets.mjs`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- `git diff --check`

## Related Handoff

- `docs/handoffs/2026-06-03-0700-codex-vm273-yore-placement-copy-polish.md`

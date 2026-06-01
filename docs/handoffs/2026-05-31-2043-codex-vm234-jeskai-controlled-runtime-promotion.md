# 2026-05-31 20:43 - Codex - VM-234 Jeskai Controlled Runtime Promotion

## Agent Name

Codex

## Task Requested

Implement VM-234: promote the VM-233-approved Jeskai raw packet to exactly one live Archscry placement expression key, `JESKAI`, while preserving all color-code permutations and lowercase forms as metadata/query-only.

## Pre-Flight Summary

- Recent related work: VM-229 created the Jeskai evidence packet, VM-230 and VM-231 created shaping-only architecture docs, VM-232 authored the five-file non-live raw packet, and VM-233 approved that raw packet for future promotion planning.
- Current known risks: scope leakage into routes, Home preview, Maze keys, aliases, fixtures, generated color-code keys, or non-Jeskai generated-record drift.
- Relevant decisions already made: VM-233 primary verdict was `review-approved-for-future-promotion-planning`; VM-230/VM-231 are shaping-only, not claim-bearing evidence; `JESKAI` is the only public/live key authorized by VM-234.
- Files recently changed before VM-234 included a broad dirty worktree with Mardu/Sultai/Temur/Abzan/Jeskai prior phase work. `assets/js/index.js` was already modified and was not touched by VM-234.
- What should not be touched: VM-229 evidence packet, VM-230/VM-231 architecture docs, VM-232 raw claims/sources/source roles, Home routes/pages, Maze route keys, fixtures, schema, non-Jeskai authored copy, and unrelated lane work.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1757-codex-vm229-jeskai-source-packet.md`
- `docs/handoffs/2026-05-31-1819-codex-vm230-jeskai-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-1843-codex-vm231-jeskai-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-1916-codex-vm232-jeskai-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1936-codex-vm233-jeskai-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1920-codex-vm214-sultai-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-234-jeskai-way-controlled-runtime-promotion.md`
- `data/raw-factions/jeskai/*.json`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`
- `research/research-init.js`

## Files Changed

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`
- `research/research-init.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-234-jeskai-way-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2043-codex-vm234-jeskai-controlled-runtime-promotion.md`

## Touched-File Mapping

| File | VM-214/Sultai Precedent Category |
|---|---|
| `research/build-faction-artifacts.mjs` | raw-to-live build mapping; placement support |
| `data/identity-layers.json` | identity layer data |
| `assets/js/commander-dossier.js` | Commander dossier guidance |
| `assets/js/archscry-presentation.js` | Archscry/presentation guidance |
| `assets/js/quick-reading-tests.js` | promotion-specific test/support files already used by precedent |
| `research/archscry-dossier-followup-tests.js` | promotion-specific test/support files already used by precedent |
| `research/maze-search-tests.js` | promotion-specific test/support files already used by precedent |
| `research/research-init.js` | placement support; Commander dossier guidance |
| `data/factions.json` | generated faction artifacts |
| `data/placement-model.json` | generated placement artifacts |
| `data/archscry-flavor-snippets.json` | generated flavor artifacts |
| `supabase/functions/guild-recruiter/faction-context.ts` | Supabase generated context only; no schema work |
| `docs/kanban/board.md` | VM-234 Kanban bookkeeping |
| `docs/kanban/done/VM-234-jeskai-way-controlled-runtime-promotion.md` | VM-234 Kanban bookkeeping |
| `docs/handoffs/HANDOFF_INDEX.md` | VM-234 handoff bookkeeping |
| `docs/handoffs/2026-05-31-2043-codex-vm234-jeskai-controlled-runtime-promotion.md` | VM-234 handoff bookkeeping |

## What Changed

- Promoted exactly one live expression key, `JESKAI`.
- Added Jeskai to identity-layer data with colors `["U", "R", "W"]`, kind `wedge`, core color `U`, placement eligibility true, and Home preview eligibility false.
- Added raw-to-live builder mapping from raw `jeskai` to live `JESKAI`.
- Added Jeskai placement support, gate/hall answers, presentation guidance, Commander dossier guidance, research/dossier routing support, and promotion regressions following the Sultai/Mardu promotion precedent.
- Rebuilt generated faction, placement, flavor-snippet, and Supabase context artifacts through the established generation path.
- Kept Home preview membership unchanged.
- Moved VM-234 to Done and checked off the card acceptance criteria.

## Baseline And Final Counts

| Surface | Baseline | Final |
|---|---:|---:|
| Identity expressions | 29 | 30 |
| Generated faction records | 29 | 30 |
| Placement records | 29 | 30 |
| Archscry flavor snippet keys | 29 | 30 |
| Home preview entries | 20 | 20 |

The single new public/live expression key is exactly `JESKAI`.

## Raw Hash Proof

The reviewed VM-232 raw JSON hashes matched before and after VM-234. No raw Jeskai JSON files were edited.

| Raw file | SHA-256 before | SHA-256 after |
|---|---|---|
| `data/raw-factions/jeskai/jeskai.sources.json` | `48BA180ECC5DF9534648DBBCFD83A93D02848D9AF000944EE15312BFA5040A0F` | `48BA180ECC5DF9534648DBBCFD83A93D02848D9AF000944EE15312BFA5040A0F` |
| `data/raw-factions/jeskai/jeskai.claims.json` | `CFC200B639201680912BD15D5AF75D490A2EDC5206B65CB2A386B5EA08FBFDD4` | `CFC200B639201680912BD15D5AF75D490A2EDC5206B65CB2A386B5EA08FBFDD4` |
| `data/raw-factions/jeskai/jeskai.profile.json` | `5ECAA1F7FC6349053CAC0B8772BEE9D85EFFD145548DBCB88166E5FB2B8AB006` | `5ECAA1F7FC6349053CAC0B8772BEE9D85EFFD145548DBCB88166E5FB2B8AB006` |
| `data/raw-factions/jeskai/jeskai.placement.json` | `1511882A9AF9D9FAB7071234F9AB60C3E0FE2A1A2F52554AF40227F52119BE6E` | `1511882A9AF9D9FAB7071234F9AB60C3E0FE2A1A2F52554AF40227F52119BE6E` |
| `data/raw-factions/jeskai/jeskai.changelog.json` | `5130A9444A31F6DD4B03266BBC2522A04E228A0225D124DA96F3AD12EF53C101` | `5130A9444A31F6DD4B03266BBC2522A04E228A0225D124DA96F3AD12EF53C101` |

## Key And Leakage Scan Results

- `JESKAI` exists in identity, generated faction, placement, flavor, and build-contract context surfaces.
- `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, lowercase permutations, and lowercase `jeskai` are absent as generated identity/faction/placement/flavor keys and absent as `JESKAI` identity aliases.
- `research/build-faction-artifacts.mjs` maps only raw `jeskai` to live `JESKAI`; no color-code permutation raw-to-live targets were added.
- No `/jeskai/`, `/urw/`, `/wur/`, `/rwu/`, `/uwr/`, `/ruw/`, or `/wru/` route/static-page/Maze route was added.
- Commander-facing `URW` appears only as color-identity query metadata for `JESKAI` guidance.
- Targeted generated Jeskai player-facing copy scan found no internal review terms: `support-only`, `claim-bearing`, `manual-fill`, `raw packet`, `canon proof`, `review-gated`, `source_authored_review_gated`, or `not_placement_eligible`.
- Non-Jeskai generated aggregate record hashes, excluding the new `JESKAI` record, matched the baseline, so existing generated records did not drift.

## Decisions Made

- Kept raw metadata unchanged because the precedent did not require a raw lifecycle mutation to promote through the approved builder path.
- Preserved `jeskai.claims.json` and `jeskai.sources.json` byte-for-byte, and also preserved the profile, placement, and changelog hashes.
- Added a small builder compatibility helper for structured `collision_guidance` because the Jeskai raw packet stores that field as structured data while the builder expected an array.
- Updated mono adjacency placement assertions to allow live wedge pilots with the tested mono color after `JESKAI` joined the live set.

## Risks / Uncertainties

- The worktree remains broadly dirty from earlier lane work. VM-234 changed only the files listed above and preserved unrelated dirty files.
- A broad internal-term scan still finds pre-existing internal review terms in older generated non-Jeskai records. The targeted generated Jeskai scan is clean.
- `assets/js/index.js` is modified in the worktree from pre-existing unrelated work and was not edited by VM-234.

## Tests Run

- Baseline/final count and key scan for identity, generated faction, placement, flavor, and Home preview records.
- Raw SHA-256 hash comparison for all five Jeskai raw JSON files.
- Non-Jeskai generated aggregate drift hash comparison, excluding the new `JESKAI` record.
- `node --check research\build-faction-artifacts.mjs`
- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node --check research\maze-search-tests.js`
- `node --check research\research-init.js`
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Case-sensitive blocked-key scan for `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, lowercase permutations, and lowercase `jeskai`.
- Targeted generated Jeskai player-facing internal-term scan.
- Scoped route/static/Maze leakage scan.
- Scoped `git diff --check` on VM-234 files.
- Trailing-whitespace scan on the new VM-234 card and handoff markdown files.

Initial failures during VM-234:

- First `npm.cmd run build:factions` failed because `placement.collision_guidance` was structured as an object for Jeskai while the builder expected an array. Fixed by normalizing collision guidance in the builder without editing raw JSON.
- First `npm.cmd run test:placement` failed because a mono adjacency boundary assertion had not been updated for a live `JESKAI` wedge. Fixed the assertion to allow live wedge pilots sharing the tested mono color.

Final reruns passed.

## Not Touched

- VM-229 Jeskai source packet and evidence ledger.
- VM-230 and VM-231 Jeskai architecture docs.
- VM-232 Jeskai raw JSON content.
- VM-228/Mardu, VM-214/Sultai, Temur, Abzan, Naya, and other lane source/raw/architecture docs.
- Routes, static pages, Home preview membership, Maze route keys, fixture keys, schema files, Supabase schema, and color-code aliases.

## Follow-Up Recommendations

- Manual QA should spot-check the live Jeskai Archscry reading, Commander dossier, and Maze handoff sidebar for player-facing tone.
- A later polish card can decide whether Jeskai needs more Commander copy depth after live observation; do not add color-code aliases as part of that polish.
- Future work involving `URW` should keep it query metadata only unless a separate card explicitly changes public alias policy.

## Next Suggested Agent

Test Strategist for manual browser QA of live Jeskai Archscry/Maze/Dossier surfaces, or Kanban Steward if the next lane needs reservation/cleanup.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-234-jeskai-way-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1936-codex-vm233-jeskai-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1920-codex-vm214-sultai-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`

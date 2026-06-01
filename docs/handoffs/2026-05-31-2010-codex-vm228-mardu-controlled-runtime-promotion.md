# Codex Handoff - VM-228 Mardu Controlled Runtime Promotion

## Agent Name

Codex acting as Runtime Promotion / Placement steward.

## Task Requested

Implement VM-228 by promoting exactly one live public expression key, `MARDU`, after VM-235 recorded `review-approved-for-future-promotion-planning`, while keeping `RWB` and `WBR` metadata/query-only and preserving the VM-235 Mardu raw packet byte-for-byte.

## Pre-Flight Summary

Recent related work:

- VM-226 created the five-file authored-but-not-live Mardu raw packet.
- VM-227 blocked the lane with `review-blocked-repair-required` because `not_placement_eligible` was missing.
- VM-235 repaired only the missing non-live status marker, reran the VM-227-style review, and recorded `review-approved-for-future-promotion-planning`.
- Sultai VM-214 and Temur VM-208 supplied the controlled promotion precedent.

Current known risks:

- The worktree was already broadly dirty with tracked and untracked Abzan, Temur, Sultai, Jeskai, Mardu, runtime, generated, docs, raw, and Kanban changes.
- VM-228 needed to isolate the Mardu delta without reverting unrelated existing work.
- Mardu raw JSON files are untracked in the dirty worktree, so SHA-256 hash guards are the boundary proof.

Relevant decisions already made:

- VM-235 is the repair re-review approval gate for VM-228, not VM-227.
- `MARDU` is the only public/live expression key authorized for promotion.
- `RWB`, `WBR`, and color-order permutations remain metadata/query-only.
- Raw Mardu status markers remain authored/review-gated even after runtime promotion.

Files recently changed before or outside this task:

- `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md` were already dirty from prior lane work.
- Runtime/generated files and clan docs/raw folders had existing dirty changes from Abzan, Temur, Sultai, Jeskai, and Mardu work.
- `assets/js/index.js` was already dirty and was not edited by VM-228.

What should not be touched:

- Mardu raw packet JSON content.
- Mardu source packet and architecture docs.
- `RWB`/`WBR` public aliases, routes, raw-to-live targets, Home cards, Maze entries, fixture keys, or generated expression keys.
- Routes, Home preview UI, Maze route files, schemas, fixtures, research docs, and architecture docs.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1846-codex-vm226-mardu-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1910-codex-vm227-mardu-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1931-codex-vm235-mardu-status-marker-repair.md`
- Sultai and Temur controlled promotion handoffs and implementation precedent
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `data/raw-factions/mardu/*.json`
- `docs/architecture/colors/mardu/identity.md`
- `docs/architecture/colors/mardu/metaphysics.md`
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
- `docs/kanban/done/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`

## What Changed

- Verified VM-235 approval and VM-228 Backlog state before editing.
- Promoted exactly one public/live expression key: `MARDU`.
- Added `mardu: "MARDU"` to the existing raw-to-live mapping used by the Sultai/Temur precedent.
- Added a live `MARDU` identity-layer expression with kind `wedge`, colors `["R", "W", "B"]`, core color `R`, placement eligible true, and preview eligible false.
- Added Mardu live placement support through the existing builder path: biological prior, conservative lateral inhibitors, Hall/gate answers, generated faction output, placement output, flavor snippet output, and Supabase faction context.
- Added Mardu-specific presentation, Commander dossier, research handoff/search support, and regression tests.
- Rebuilt generated artifacts through the approved commands instead of hand-editing generated files.
- Moved VM-228 Backlog to In Progress to Done and recorded closeout evidence on the card.

## Why It Changed

VM-235 repaired and approved the Mardu raw packet for future promotion planning. VM-228 is the controlled runtime promotion gate that makes `MARDU` available as one live Archscry placement expression while preserving color-code and route boundaries.

## Decisions Made

- `MARDU` is the only public/live expression key added.
- `RWB`, `RBW`, `WRB`, `WBR`, `BRW`, `BWR`, lowercase `mardu`, and lowercase color-code forms remain metadata/query-only and are not live expression keys, aliases, raw-to-live targets, routes, Home preview entries, Maze entries, or generated placement keys.
- Home preview membership stays at 20 entries.
- The raw Mardu packet remains authored/review-gated source material; live placement eligibility is represented only in identity/build/generated surfaces.
- Mardu placement inhibitors were kept conservative and limited to `WR`, `WB`, `BR`, `NAYA`, `JUND`, `ABZAN`, `TEMUR`, and `SULTAI`; Jeskai was not added as a live dependency because Jeskai is not live.
- No self-aliases beyond the existing public key alias pattern were added solely for color-code behavior.

## Baseline And Hash Evidence

Baseline and final counts:

| Surface | Before | After |
|---|---:|---:|
| Identity-layer expressions | 28 | 29 |
| Generated faction records | 28 | 29 |
| Placement records | 28 | 29 |
| Archscry flavor snippet keys | 28 | 29 |
| Home preview entries | 20 | 20 |

Raw Mardu SHA-256 hashes matched VM-235 before and after VM-228:

| File | SHA-256 |
|---|---|
| `mardu.changelog.json` | `DB604EB784B66DB3D8F21BFB669FE67AAB0D696093E27D5B56F1A80EA3DED593` |
| `mardu.claims.json` | `9C504F043F58D52A60C6C16F1933154C52E313E21461C1151734461FF68B9CA2` |
| `mardu.placement.json` | `0467CEF88D8C67B9496F36D7B72419519F9F3C92436640E4FA601B942370EE47` |
| `mardu.profile.json` | `4E605460956961D6AC6980578E0F299214F8F03FB1DBCB41827B56E978F2EFE1` |
| `mardu.sources.json` | `A57C80D9EC7A806EA7CE5405C5036EC264A601D3C4B5FCFA3EF742CFA75C83A9` |

## Risks / Uncertainties

- The broader worktree remains dirty and was not cleaned, staged, committed, reverted, or normalized.
- Generated outputs now contain Mardu as expected; unrelated pre-existing dirty generated/runtime changes may still be present in the worktree.
- `RWB` and `WBR` intentionally appear in source-owned copy/tests as metadata/query terms, but scans verified they are not active public keys, aliases, routes, Home entries, Maze entries, raw-to-live targets, or generated placement keys.

## Tests Run

- Raw Mardu SHA-256 hash guard before and after promotion.
- Baseline/final key count scan for identity, generated faction, placement, Archscry flavor, and Home preview records.
- `node --check research\build-faction-artifacts.mjs`
- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\research-init.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node --check research\maze-search-tests.js`
- `npm.cmd run build:factions`
- `node research\build-archscry-flavor-snippets.mjs`
- `npm.cmd run test:placement`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- `npm.cmd run audit:factions`
- Mardu key/alias/Home preview/RAW_TO_KEY boundary scan.
- Raw packet leakage scan for active/public integration fields or true placement/preview/live flags.
- `rg` route/Home/Maze leakage scan for `/mardu/`, `/rwb/`, and `/wbr/`.
- Scoped `git diff --check` on VM-228 touched files.
- Scoped trailing-whitespace scan on VM-228 touched files.

## Not Touched

- `data/raw-factions/mardu/*.json`
- `docs/research/mardu/**`
- `docs/architecture/colors/mardu/**`
- Home preview membership
- Home preview UI
- Route/static page files
- Maze route files
- Schema files with remaining diffs
- Placement fixtures
- Raw packet content
- New raw registries or alternate promotion scripts
- Abzan, Temur, Sultai, Jeskai, or shared architecture docs
- Staging or commits

## Follow-Up Recommendations

- Manual QA should spot-check the live Mardu dossier and Archscry output for tone, especially that Commander-facing copy feels player-facing rather than internal-review flavored.
- Jeskai VM-234 remains the next later controlled promotion candidate after its own review and baseline checks, not as part of VM-228.
- Any future `RWB`/`WBR` public behavior requires a separate card.

## Next Suggested Agent

Documentation Steward or Test Strategist for Mardu post-promotion manual QA if desired; otherwise Kanban Steward / Runtime Promotion steward for the next approved lane.

## Related Kanban Card / Docs

- `docs/kanban/done/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1931-codex-vm235-mardu-status-marker-repair.md`
- `docs/handoffs/2026-05-31-1910-codex-vm227-mardu-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1846-codex-vm226-mardu-raw-faction-source-packet.md`
- `data/raw-factions/mardu/`

## Explicit Final Scope Confirmation

VM-228 promoted exactly one live public key, `MARDU`. VM-228 did not make `RWB` or `WBR` live; they remain metadata/query-only. VM-228 did not edit the Mardu raw packet, Mardu research docs, Mardu architecture docs, routes, Home preview UI, Maze route files, schemas, fixtures, raw registries, alias maps, or promotion lists outside the approved build mapping and generated outputs.

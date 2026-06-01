# 2026-05-31 16:45 - Codex - VM-215 Abzan Dossier Manual QA Repair

## Agent Name

Codex

## Task Requested

Implement VM-215 by repairing Abzan manual QA issues in the live Archscry dossier and Maze handoff: curated Abzan-native card examples, Abzan-specific signal copy, and Maze "From Your Dossier" identity/path selection that honors active `ABZAN` over stale stored `UR`.

## Pre-Flight Summary

Reviewed `AGENTS.md`, `docs/handoffs/HANDOFF_INDEX.md`, recent Abzan/Temur handoffs, `docs/kanban/board.md`, related done cards, and the requested VM-215 plan before editing.

Recent related work:

- VM-202 promoted `ABZAN` live as the only public Abzan expression key while keeping `WBG` metadata/query-only and Home preview unchanged.
- VM-208 promoted `TEMUR` live while keeping `GUR` metadata/query-only and preserving Home/Maze/routes/schema boundaries.
- VM-197 closeout documented the Abzan source-packet lineage and the noisy dirty baseline.

Current known risks:

- The worktree was already broadly dirty/untracked before VM-215, including Abzan/Temur raw, architecture, generated, board, and handoff artifacts.
- Several VM-215 target files were already modified in the baseline by prior Abzan/Temur work.
- `assets/js/maze-handoff.js` normalizes Temur `gur` to `urg`; VM-215 therefore applied the `gur` query identity override locally in `research/research-init.js` without editing the shared helper.
- A Jeskai Way VM-215 backlog reservation appeared during closeout, making this Abzan manual-QA repair a duplicate VM-215; the active Jeskai lane was later repaired to VM-229 through VM-234.

Relevant decisions already made:

- `ABZAN` is the public live expression key; lowercase `wbg` is query-only.
- Home preview, routes, Maze route keys, raw packets, generated data, schemas, Supabase config, fixtures, and builders were out of scope.
- Curated snippet data is authoritative for Abzan card-example copy when present.

What should not be touched:

- `data/archscry-flavor-snippets.json`
- raw-faction packets
- research/architecture docs
- generated data
- Home preview membership/source lists
- route files and Maze route files
- schema, Supabase config, fixtures, builders, and unrelated dirty/untracked baseline files

## Files Reviewed

- `AGENTS.md` instructions supplied in-thread
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1108-codex-vm202-abzan-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1615-codex-vm197-abzan-source-packet-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `assets/js/quick-reading-tests.js`
- `assets/js/maze-handoff.js`
- `data/archscry-flavor-snippets.json`
- `data/factions.json`
- `data/placement-model.json`

## Files Changed

- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/done/VM-215-abzan-dossier-manual-qa-repair.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-1645-codex-vm215-abzan-dossier-manual-qa-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added Naya/Abzan/Temur active-key Maze sidebar support in `research/research-init.js`, including query-only `rgw`, `wbg`, and `gur` identities and no outside-color stretch paths.
- Made URL/current handoff identity (`fit` or resolved `factionName`) win over stale stored placement mana scores for Maze sidebar path selection.
- Added an Abzan-family reading signal lane in Maze search-signal extraction so Abzan handoff paths do not fall back only to generic signals.
- Added curated snippet selection helpers in `assets/js/index.js` so live expression examples prefer checked-in faction snippets when at least two exist.
- Preserved curated snippet title/excerpt display copy as authoritative while using flavor-index cards only for metadata enrichment.
- Added mojibake cleanup for common optional Scryfall display text before rendering.
- Added Abzan-specific omen rules for ancestor memory, family/house continuity, stewardship, perennation, endurance, and next-generation duty.
- Filtered Abzan omen echo names to the active Abzan result when Abzan is a positive match, preventing adjacent Orzhov/Golgari/Selesnya leakage in Abzan signals.
- Added Maze and dossier follow-up regressions covering stale `UR`, curated Abzan examples, bad broad-match exclusions, Abzan omen copy, and negative Dromoka/generic-WBG/adjacent-result labels.
- Created and closed VM-215 Kanban bookkeeping and indexed this handoff.

## Why It Changed

Manual QA showed the Abzan result was scoring correctly but presentation and handoff surfaces were leaking older generic behavior: generic answer-signal copy, broad flavor-index card examples, and a Maze sidebar that could prefer stale stored `UR` placement data over the active Abzan dossier URL. VM-215 repaired those presentation paths without changing raw evidence, scoring, promotion data, or generated artifacts.

## Decisions Made

- Did not edit `data/archscry-flavor-snippets.json`; the repair consumes the existing curated snippets.
- Did not hardcode Abzan card examples directly into render HTML; added reusable curated-snippet selection for any live expression with snippet data.
- Kept `wbg`, `rgw`, and `gur` query-only in Maze sidebar paths.
- Did not edit `assets/js/maze-handoff.js`; the Temur `gur` override is local to `research/research-init.js` because the shared helper was outside the allowed edit list.
- Documented the duplicate VM-215 collision with the then-current Jeskai reservation in the board, card, and this handoff; that Jeskai lane was later repaired to VM-229 through VM-234.
- Did not stage or commit files.

## Dirty Baseline / Final Status

Initial `git status --short` was captured before edits and already included broad dirty/untracked Abzan, Temur, Sultai, generated, board, and handoff paths.

VM-215 intentionally added/changed only allowed VM-215 paths. Existing unrelated dirty/untracked baseline files remain present and were not normalized or staged.

During closeout, additional unrelated Jeskai/Sultai lane drift appeared outside the VM-215 allowed edit set, including:

- `docs/handoffs/2026-05-31-1637-codex-vm215-220-jeskai-kanban-reservation-only.md`
- `docs/kanban/backlog/VM-215-jeskai-way-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-216-jeskai-way-identity-and-metaphysics.md`
- `docs/kanban/backlog/VM-217-jeskai-way-docs-parity-fill.md`
- `docs/kanban/backlog/VM-218-jeskai-way-raw-faction-source-packet.md`
- `docs/kanban/backlog/VM-219-jeskai-way-raw-packet-review-gate.md`
- `docs/kanban/backlog/VM-220-jeskai-way-controlled-runtime-promotion.md`
- `docs/kanban/in-progress/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/research/sultai/`

VM-215 did not create, move, stage, or normalize those paths. The handoff index already contained the Jeskai reservation row when VM-215 added its own row above it.

## Tests Run

- `node --check assets/js/index.js`
- `node --check assets/js/commander-dossier.js`
- `node --check research/research-init.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check research/maze-search-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `node research/maze-search-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- Scoped `git diff --check` on VM-215 allowed paths

## Not Touched

- `data/archscry-flavor-snippets.json`
- `data/raw-factions/**`
- `docs/research/abzan/**`
- `docs/architecture/colors/abzan/**`
- generated faction/identity/placement/Supabase outputs
- Home preview membership/source lists
- route files
- Maze route files
- schema files
- Supabase config
- fixtures
- builders
- unrelated dirty/untracked baseline files

## Risks / Uncertainties

- The worktree remains noisy from prior Abzan/Temur/Sultai lanes, so scoped validation and status comparison are more reliable than full-tree cleanliness.
- The `git diff --check` run prints existing line-ending warnings for touched tracked files, but no whitespace errors were reported.
- Archscry-origin generated personalized Maze paths still follow their existing helper behavior; VM-215 specifically repaired the Maze route sidebar reconstruction path from the dossier handoff.

## Follow-Up Recommendations

- Human manual QA should re-run the known Abzan path and check "Signals From Your Answers", "What This Looks Like In Cards", and Maze "From Your Dossier".
- If generated Archscry personalized Maze paths also need `gur` instead of `urg` for Temur, open a separate helper-contract card because that touches `assets/js/maze-handoff.js` / presentation behavior outside VM-215.
- Keep Sultai VM-209 through VM-214 separate and do not mix Sultai onboarding with Abzan presentation repair.

## Next Suggested Agent

Human reviewer for manual QA confirmation.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-215-abzan-dossier-manual-qa-repair.md`
- `docs/kanban/done/VM-202-abzan-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1108-codex-vm202-abzan-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`

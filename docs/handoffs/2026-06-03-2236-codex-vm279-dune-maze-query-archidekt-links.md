# 2026-06-03 22:36 - Codex - VM-279 Dune Maze Query And Archidekt Links

## Agent Name

Codex

## Task Requested

Implement VM-279 to repair Dune personalized Maze/Scryfall query hygiene, keep Dune deck-start links Archidekt-only, and preserve raw/research/architecture/generated/Home/route/hero boundaries.

## Pre-Flight Summary

Recent related work:

- VM-257 promoted Dune live as `DUNE`, kept `Aggression` support-only, kept `BRGW` technical/query-only, suppressed Commander directory links, and recorded the unrelated QUANDRIX broad-suite failure.
- VM-278 hooked `assets/img/identity-hero/dune.webp` into the existing dossier identity-hero system and intentionally did not change Maze, raw, generated, route, or Home preview behavior.
- VM-238 established Maze executable query precedence and the separation between executable `operatorQuery` and readable display prose.

Current known risks:

- Dune support-texture overreach remains a live-copy risk.
- `Aggression`, `BRGW`, `WBRG`, and same-color permutations must not become routes, aliases, placement keys, preview keys, or public navigation labels.
- The shared worktree is broadly dirty with unrelated four-color promotion, hero, generated, docs, and research changes.
- The broad placement suite still has the unrelated QUANDRIX golden-path failure from VM-257.

Relevant decisions already made:

- Use `VM-279` because `VM-278` is already complete and reserved for the Dune identity-hero hookup.
- Dune personalized Maze paths may use `wbrg` as Scryfall query syntax only.
- Dune deck-start provider output remains Archidekt-only; the approved `Aggro archetype lane` label is allowed outside personalized Maze query text.
- Outside-color stretch copy must say it is a gameplay stretch and not a clean Dune commander expression.

Files recently changed:

- `assets/js/index.js`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- generated Dune/Yore/Glint promotion outputs
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

What should not be touched:

- `data/raw-factions/dune/**`
- `docs/research/dune/**`
- `docs/architecture/colors/dune/**`
- generated data and Supabase files
- routes, aliases, Home preview, identity-hero mapping/assets, raw packet status, and placement eligibility
- unrelated dirty Yore, Glint, Ink, Witch, generated, docs, or research work

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2137-codex-vm257-dune-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-2231-codex-vm278-dune-identity-hero-background.md`
- `docs/handoffs/2026-05-31-2128-codex-vm238-mardu-maze-link-query-preservation-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-278-dune-identity-hero-background-dossier-hookup.md`
- `docs/kanban/done/VM-238-mardu-maze-link-query-preservation-repair.md`
- `assets/js/maze-handoff.js`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/deck-tags_expanded.json`
- `data/taxonomy/vox-mana-tags.json`

## Files Changed

- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-279-dune-maze-query-and-archidekt-only-deck-link-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2236-codex-vm279-dune-maze-query-archidekt-links.md`

## What Changed

- Added Dune-only personalized Maze query terms in `assets/js/archscry-presentation.js`.
- Kept the Dune commander Maze path broad and exact: `id=wbrg is:commander f:commander`.
- Replaced inherited personalized support/flavor/stretch terms with Dune-safe combat, territory, survival, and battlefield-pressure terms.
- Added Dune outside-color stretch label/copy stating it is a gameplay stretch and not a clean Dune commander expression.
- Added focused quick-reading assertions for Dune Maze query shape, forbidden Dune personalized query terms, outside-color stretch warning copy, and Archidekt-only Dune deck-start links.
- Added and closed the VM-279 Kanban card and updated handoff index bookkeeping.

## Why It Changed

Dune personalized Maze paths were inheriting tag-driven query terms like `knowledge`, `study`, `hungry`, `devouring`, `aggro`, and `aggressive`. Those terms either contradict Dune's missing-Blue pressure frame or bleed into Glint/Jund/generic aggro texture. VM-279 makes Dune's personalized Maze output source-bound and user-safe without changing the shared query factory or non-Dune identities.

## Decisions Made

- Implemented the exception in `buildPersonalizedMazePaths` rather than the generic Maze helper.
- Used `wbrg` only as Scryfall query syntax for Dune personalized Maze paths.
- Preserved `BRGW` as Dune's technical deck-search metadata elsewhere.
- Scoped forbidden-term assertions to Dune personalized Maze path queries only, so the approved Archidekt `Aggro archetype lane` label remains valid.
- Did not edit `assets/js/commander-dossier.js` because Dune Commander directory links were already suppressed and Archidekt-only output already matched the approved provider shape.

## Risks / Uncertainties

- The worktree remains broadly dirty with unrelated changes; VM-279 did not normalize or revert them.
- `node assets/js/quick-reading-tests.js` and `npm.cmd test` still stop on the pre-existing unrelated QUANDRIX golden-path assertion after the new Dune assertions execute.
- No live Scryfall/network validation was run; this pass validates local query shape and provider hygiene.

## Tests Run

- `node --check assets/js/index.js` - passed
- `node --check assets/js/commander-dossier.js` - passed
- `node --check assets/js/archscry-presentation.js` - passed
- `node --check assets/js/quick-reading-tests.js` - passed
- `node --check research/archscry-dossier-followup-tests.js` - passed
- Focused Dune personalized Maze output probe - passed
- `node research/archscry-dossier-followup-tests.js` - passed
- `npm.cmd run test:presentation-snapshots` - passed
- `node assets/js/quick-reading-tests.js` - failed on pre-existing unrelated QUANDRIX golden-path assertion after the new Dune assertions execute
- `npm.cmd test` - failed on the same pre-existing unrelated QUANDRIX golden-path assertion
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - passed with LF-to-CRLF warnings only

## Not Touched

- `data/raw-factions/dune/**`
- `docs/research/dune/**`
- `docs/architecture/colors/dune/**`
- generated faction, placement, flavor, and Supabase outputs
- `assets/img/identity-hero/dune.webp`
- `assets/js/index.js`
- route files
- Home preview logic
- raw packet status or Dune placement eligibility
- non-Dune personalized Maze behavior
- unrelated dirty worktree files

## Follow-Up Recommendations

- Treat the QUANDRIX golden-path failure as a separate shared placement/debug task.
- If Dune manual QA finds additional Maze path wording issues, keep them in the Dune personalized path layer rather than widening generic Maze helpers.
- If more four-color identities need bespoke Maze terms, add explicit identity-specific overrides with focused query-shape tests.

## Next Suggested Agent

Test Strategist for the existing QUANDRIX golden-path failure, if the team wants to clear the broad suite before more four-color placement work.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-279-dune-maze-query-and-archidekt-only-deck-link-repair.md`
- `docs/kanban/done/VM-278-dune-identity-hero-background-dossier-hookup.md`
- `docs/kanban/done/VM-257-dune-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-2231-codex-vm278-dune-identity-hero-background.md`
- `docs/handoffs/2026-06-03-2137-codex-vm257-dune-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2128-codex-vm238-mardu-maze-link-query-preservation-repair.md`

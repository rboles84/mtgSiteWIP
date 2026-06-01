# VM-239 - Jeskai Dossier Deck-Start De-Dup And QA Closeout

## Agent Name

Codex acting as Runtime QA Repair / Test Strategist.

## Task Requested

Implement VM-239 to remove duplicated external commander directory service links from the shared Jeskai dossier Start Here panel, keep Commander Deck Starts as the single external deck-start owner, and revalidate Jeskai Archscry -> Maze `operatorQuery` precedence after VM-238 without broadening into new runtime promotion or parser work.

## Pre-Flight Summary

Recent related work:

- VM-234 promoted exactly one live Jeskai key, `JESKAI`, while keeping `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, lowercase forms, and `jeskai` metadata/query-only.
- VM-238 repaired the shared Archscry -> Maze precedence path so explicit `operatorQuery` wins, operator-style `q` is the executable fallback, and readable prose stays display-only.
- The board showed no active in-progress cards, and `VM-239` was free to start.

Current known risks:

- The worktree remains broadly dirty from earlier Jeskai, Mardu, Sultai, Temur, Abzan, runtime, generated, research, Kanban, and handoff work.
- `assets/js/index.js`, `research/archscry-dossier-followup-tests.js`, `research/maze-search-tests.js`, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md` were already modified before VM-239.
- The dossier renderer is shared across lanes, so even a small Start Here change needs full shared regression coverage.

Relevant decisions already made:

- `JESKAI` is the only live Jeskai key.
- External commander directory services belong in Commander Deck Starts, not duplicated inside Start Here.
- Jeskai raw/research/architecture files, generated faction data, Home preview membership, routes, schemas, and Supabase schema/config are outside this repair.

Files recently changed:

- VM-238 touched shared Maze handoff/search initialization and tests.
- VM-234 touched shared live Jeskai runtime surfaces and their supporting generated data.
- Shared dossier/Maze test files were already dirty before this repair and had to be edited in place.

What should not be touched:

- Jeskai raw packet files
- Jeskai research docs
- Jeskai architecture docs
- Generated faction data
- Home preview membership
- Routes/static pages
- Schemas
- Supabase schema/config
- Unrelated Mardu, Sultai, Temur, Abzan, or other lane work

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2128-codex-vm238-mardu-maze-link-query-preservation-repair.md`
- `docs/kanban/board.md`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`
- `assets/js/quick-reading-tests.js`
- Current dirty worktree status via `git status --short`

## Files Changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `research/maze-search-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-239-jeskai-dossier-deck-start-de-dup-and-qa-closeout.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2203-codex-vm239-jeskai-dossier-deck-start-dedup-qa-closeout.md`

## What Changed

- Removed the duplicated external commander directory service block from Start Here by dropping the dedicated Start Here commander-directory HTML from the shared dossier render state.
- Left Commander Deck Starts as the single owner of EDHREC, Archidekt, and MTGDecks service groups.
- Updated dossier follow-up regressions so Start Here now proves it keeps newcomer guidance and preview cards without rendering the external service block, while Commander Deck Starts still proves the service groups and section ordering.
- Added a Jeskai Archscry-origin Maze regression that revalidates the VM-238 precedence contract: the readable Jeskai phrase remains display-only, the preserved `operatorQuery` executes, and the bad translated query `c=wu c=ur c=wur f:commander` is not produced.
- Created and closed VM-239.

## Why It Changed

Manual QA showed that Jeskai Start Here repeated the same external deck-start services that already live in Commander Deck Starts, which made the dossier feel redundant for new readers. The closeout also needed a Jeskai-specific proof that the shared VM-238 Maze precedence repair still holds for Archscry-origin launches.

## Decisions Made

- Start Here keeps newcomer guidance, internal dossier navigation, preview cards, and placement-specific Commander plan copy only.
- Commander Deck Starts remains the only external deck-start service owner.
- VM-239 revalidated the Jeskai launch contract but did not broaden into a new Maze parser/query-normalization repair.
- The Jeskai revalidation target is the execution contract and bad-query suppression, not a new public/live key policy change.

## Risks / Uncertainties

- Shared files were already dirty before VM-239, so future work should continue reading current file state rather than assuming a clean base.
- The Jeskai Maze sidebar still has its own existing internal identity-ordering conventions, but VM-239 confirmed the intended operator-query execution contract and bad-query guard instead of widening scope.
- No browser screenshot/manual click pass was run in this turn; verification stayed in the existing automated suite requested by the plan.

## Tests Run

- `node --check assets/js/index.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check research/maze-search-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/maze-search-tests.js`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test`
- Scoped `git diff --check` on VM-239 touched files

## Not Touched

- Jeskai raw packet files
- Jeskai research docs
- Jeskai architecture docs
- Generated faction data
- Home preview membership
- Routes/static pages
- Schemas
- Supabase schema/config
- Unrelated lane docs/data/runtime work
- Staging or commits

## Follow-Up Recommendations

- Run a quick browser manual QA pass on the live Jeskai dossier to confirm the Start Here panel feels cleaner now that the duplicate external service block is gone.
- If a future pass wants to normalize the Jeskai sidebar's internal exact-identity ordering beyond the operator-query execution contract, create a separate Maze regression card rather than reopening VM-239.

## Next Suggested Agent

Test Strategist for a quick browser manual QA pass on Jeskai dossier and Maze handoff behavior.

## Related Kanban Card / Docs

- `docs/kanban/done/VM-239-jeskai-dossier-deck-start-de-dup-and-qa-closeout.md`
- `docs/handoffs/2026-05-31-2128-codex-vm238-mardu-maze-link-query-preservation-repair.md`
- `docs/kanban/done/VM-234-jeskai-way-controlled-runtime-promotion.md`

## Explicit VM-239 Closeout Guarantees

- Start Here no longer renders the duplicated external commander directory service block.
- Commander Deck Starts remains the single owner of EDHREC, Archidekt, and MTGDecks service groups.
- Recommended Precon Decks and Commander Lanes remained in order.
- Jeskai `operatorQuery` precedence was revalidated after VM-238.
- The bad translated query `c=wu c=ur c=wur f:commander` was not produced.
- `JESKAI` remains the only live Jeskai key.
- `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, lowercase forms, and `jeskai` remain metadata/query-only.
- No raw, research, architecture, generated faction data, Home preview, route, schema, Supabase, or unrelated lane work was performed.

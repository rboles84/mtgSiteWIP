# VM-239 - Jeskai Dossier Deck-Start De-Dup And QA Closeout

ID: VM-239
Title: Jeskai Dossier Deck-Start De-Dup And QA Closeout
Status: done
Type: Runtime QA Repair / Dossier UX
Area: Archscry Dossier, Maze, Jeskai
Priority: high
Created: 2026-05-31

## Summary

Implement the remaining Jeskai post-promotion manual-QA repair by removing duplicated external commander directory service links from Start Here while keeping Commander Deck Starts as the single owner of EDHREC, Archidekt, and MTGDecks deck-start groups.

## Scope

- Perform AGENTS.md pre-flight before editing.
- Keep Start Here focused on newcomer guidance, internal dossier navigation, preview cards, and placement-specific Commander plan copy.
- Remove only the duplicated external commander directory service block from Start Here.
- Revalidate the shared `operatorQuery` precedence repair from VM-238 against the Jeskai Archscry -> Maze launch path.
- Preserve `JESKAI` as the only live Jeskai key.
- Keep `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, lowercase forms, and `jeskai` metadata/query-only.
- Do not edit Jeskai raw/research/architecture files, generated faction data, Home preview membership, routes, schemas, Supabase schema/config, or unrelated lane work.

## Acceptance Criteria

- [x] Start Here no longer renders the duplicated external commander directory service block.
- [x] Commander Deck Starts remains the single owner of EDHREC, Archidekt, and MTGDecks service groups.
- [x] Recommended Precon Decks, Commander Deck Starts, and Commander Lanes remain in order.
- [x] Start Here still renders meaningful Jeskai guidance without empty headings, orphan labels, or blank cards.
- [x] Jeskai Archscry-origin Maze launch still executes preserved `operatorQuery` precedence after VM-238.
- [x] The bad translated query `c=wu c=ur c=wur f:commander` is not produced.
- [x] `JESKAI` remains the only live Jeskai key.
- [x] `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, lowercase forms, and `jeskai` remain metadata/query-only.

## Closeout

Completed: 2026-05-31

Result: Start Here no longer repeats external commander-directory service links, Commander Deck Starts remains the single external deck-start owner, and Jeskai Archscry-origin Maze launches were revalidated after VM-238 so readable prose stays display-only while the preserved operator query executes without producing `c=wu c=ur c=wur f:commander`.

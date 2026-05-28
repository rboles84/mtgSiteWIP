# VM-012 - Scryfall Parser Expansion and Diagnostics

ID: VM-012
Title: Scryfall Parser Expansion and Diagnostics
Status: done
Type: Data / Research
Area: Scryfall Data, Maze
Priority: low
Created: 2026-05-15
Completed: 2026-05-27

## Summary

Closed the independent Maze parser/data/diagnostics pass without starting VM-022, redesigning Maze, changing stash/modal contracts, or adding network-dependent validation. The parser now covers the final requested syntax slice, exposes deterministic local dictionary vocabulary, feeds Loom keyword autocomplete from that local vocabulary with legacy parity protection, and shows parser warnings in the existing Query Inspector.

## Acceptance Criteria

- Parser coverage handles crew, sacrifice-as-Oracle-text intent, dictionary-backed subtype lookup, dictionary-backed keyword lookup, and Commander format plus subtype/keyword combinations.
- `research/scryfall-dictionary.js` exposes sorted local vocabulary for keywords, subtypes, card types, and formats through the checked-in seed/dictionary path.
- Loom keyword autocomplete uses derived local vocabulary while preserving every legacy keyword suggestion.
- Low-confidence, unresolved-term, and ambiguous-alternative diagnostics remain on the existing parser result shape and render in the existing Query Inspector.
- Parser/search result shape, Maze stash, modal contracts, Archscry handoff shape, visual treatment, routes, and VM-022 architecture scope were not changed.

## Verification

- `node --check research/scryfall-parser.js`
- `node --check research/scryfall-dictionary.js`
- `node --check research/research-init.js`
- `node --check research/research-ui.js`
- `npm.cmd run test:parser`
- `npm.cmd test`
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`

## Notes

- `sacrifice` intentionally resolves as Oracle text intent (`o:sacrifice`), not keyword/type/subtype/format vocabulary.
- The checked-in parser seed and dictionary remain the approved local deterministic data source for VM-012 autocomplete and validation.
- No Scryfall bulk download logic, runtime fetches, generated remote cache files, or build-time network validation were added.

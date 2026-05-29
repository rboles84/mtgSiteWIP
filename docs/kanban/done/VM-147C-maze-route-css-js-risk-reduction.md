# VM-147C - Maze Route CSS JS Risk Reduction

ID: VM-147C
Title: Maze Route CSS JS Risk Reduction
Status: done
Type: Frontend / Risk Reduction
Area: Maze, CSS Architecture, Route-local JS
Priority: medium
Created: 2026-05-28
Completed: 2026-05-28

## Summary

Reduce risk in The Implicit Maze route's route-local CSS and JS ownership surfaces without changing parser/search behavior, exact-name modal behavior, stash/export behavior, Archscry handoff contracts, route boot behavior, storage keys, Scryfall fetch/cache/dedupe behavior, shared systems, or route markup.

## Current Route Contract

`maze/index.html` preserves this CSS stack:

- Google font preconnect and Cinzel / Crimson Pro / IBM Plex Mono font request
- `../assets/css/fonts.css`
- `../assets/css/tokens.css`
- `../assets/css/layout.css`
- `../assets/css/topbar.css`
- `../assets/css/atmosphere.css`
- `../assets/css/components.css`
- `../assets/css/maze.css`

`maze/index.html` preserves this JS stack:

- Supabase UMD CDN
- `../assets/js/shared.js`
- module `../research/research-init.js`
- `../assets/js/vm-rich-atmosphere.js`
- `../assets/js/reduce-motion.js`
- `../assets/js/vm-topbar.js`

## In Scope

- `maze/index.html` asset-stack verification only
- `assets/css/maze.css`
- `research/research-init.js` ownership comments only
- `docs/reference/manual-test-cases.md`
- VM-147 umbrella and board tracking
- Handoff documentation

## Out Of Scope

- Parser/search behavior
- Exact-name modal behavior and modal focus/inert contracts
- Stash key, payload shape, export headings, or drawer behavior
- Archscry handoff key, payload shape, return banner behavior, or dossier path factory
- Scryfall fetch/cache/dedupe behavior
- Route boot sequencing
- Shared CSS/JS extraction or normalization
- Visual redesign

## Completion Notes

- Confirmed `maze/index.html` preserves the expected Maze CSS and JS asset stack.
- Added high-level ownership and section comments to `assets/css/maze.css` for the route shell/background, utility helpers, animation helpers, shared Maze surfaces, command deck, mode/search shell, Query Inspector, Loom builder, sidebar/results/return banner, empty/loading states, result grid, stash drawer, modal, responsive rules, and reduced motion.
- Scanned for byte-identical duplicate CSS blocks and found no safe removal candidate, so no CSS declarations were removed.
- Added a top-level VM-147C ownership map and section comments to `research/research-init.js` without moving functions or changing executable JS.
- Added VM-147C manual QA coverage for Maze boot, Plain Reading, Operator's Hand, The Loom, Query Inspector alternatives, launch URLs, Archscry return flow, adjacent-fit dossier paths, modal focus/inert behavior, stash export/clear, reduced motion, and responsive overflow.
- Left the VM-147 umbrella open for future route-specific follow-ups.

## Tests Run

- `node --check research/research-init.js` - pass.
- `node --check research/maze-search-tests.js` - pass.
- `node research/maze-query-contract-tests.js` - pass.
- `node research/maze-search-tests.js` - pass.
- `npm.cmd run test:parser` - pass; 115 parser cases.
- `npm.cmd run lint:js` - pass.
- `npm.cmd run lint:html` - pass.
- `npm.cmd run test:frontend-smoke` - pass.
- `npm.cmd test` - pass.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - pass; Git reported LF-to-CRLF working-copy normalization warnings only.

## Manual QA

- Added the VM-147C manual QA checklist to `docs/reference/manual-test-cases.md`.
- Human manual testing was reported as good after implementation.

## Risks / Uncertainties

- Maze still has no dedicated visual regression script in `package.json`; behavioral tests and manual QA remain the primary guardrails.
- `research/research-init.js` remains dense and contract-heavy. Future cleanup should be behavior-specific and backed by focused regression tests.
- `assets/css/maze.css` still carries cascade-sensitive styling for command deck, results, modal, and stash surfaces. Ambiguous cleanup candidates should remain follow-up work unless directly proven safe.

## Human Review

Complete - human manual testing was reported as good after implementation.

# VM-238 - Mardu Maze Link Query Preservation Repair

ID: VM-238
Title: Mardu Maze Link Query Preservation Repair
Status: done
Type: Runtime QA Repair / Maze Query
Area: Maze, Archscry Dossier, Mardu Horde
Priority: high
Created: 2026-05-31

## Summary

Repair the Mardu dossier and Archscry Maze launch path so exact Commander links preserve executable `id=rwb is:commander f:commander ...` queries while readable Mardu labels remain display-only.

## Scope

- Perform AGENTS.md pre-flight before editing.
- Preserve `MARDU` as the only live Mardu public key.
- Keep `RWB` and `WBR` metadata/query-only.
- Use `operatorQuery` first, operator-style `q` second, and readable/plain query only as display fallback.
- Treat `q` as operator-style only when it contains explicit Scryfall syntax such as `id:`, `id=`, `c:`, `c=`, `o:`, `t:`, `is:`, `f:`, `type:`, `oracle:`, `color:`, or parenthesized operator clauses.
- Do not edit Mardu raw JSON, Mardu research docs, Mardu architecture docs, generated data, Home UI, routes, schemas, Supabase files, builders, placement fixtures, or cross-lane docs/data.

## Acceptance Criteria

- [x] Mardu personalized Maze paths use `id=rwb` / `id<=rwb` executable queries and `red-white-black` readable labels.
- [x] Mardu exact Commander Maze links do not generate new executable `id=wbr` output.
- [x] Maze launch executes `operatorQuery` when it is present, even when `plainReadingQuery` is readable prose.
- [x] Operator-style `q` is executable only when no `operatorQuery` exists.
- [x] Plain readable Mardu phrases do not execute or create `c=wb c=br c=wbr` searches when an operator query exists.
- [x] Regression coverage prevents Orzhov/Rakdos/Mardu recognized-identity diagnostics from readable Mardu prose when `operatorQuery` is present.
- [x] Handoff documents URL parameter precedence.

## Closeout

Completed: 2026-05-31

Result: shared Maze handoff identity normalization now preserves Mardu `rwb` ordering, and Archscry-origin Maze launches now use explicit query precedence: `operatorQuery` first, operator-style `q` second, readable/plain query as display fallback only.

Tests run:

- `node --check assets\js\maze-handoff.js`
- `node --check research\research-init.js`
- `node --check research\maze-search-tests.js`
- `node --check research\maze-query-contract-tests.js`
- `node --check assets\js\quick-reading-tests.js`
- `node research\maze-query-contract-tests.js`
- `node research\maze-search-tests.js`
- `node assets\js\quick-reading-tests.js`
- `npm.cmd test`
- Scoped `git diff --check` on VM-238 touched files.

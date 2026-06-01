# Codex Handoff - VM-238 Mardu Maze Link Query Preservation Repair

## Agent Name

Codex acting as Runtime QA Repair / Test Strategist.

## Task Requested

Implement VM-238 to repair the first Mardu dossier/Archscry Maze link so it preserves executable `id=rwb is:commander f:commander ...` operator queries while keeping readable Mardu phrasing display-only.

## Pre-Flight Summary

Recent related work:

- VM-228 promoted exactly one live public Mardu key, `MARDU`, while keeping `RWB` and `WBR` metadata/query-only.
- VM-237 repaired stale quick-reading reachability for live Mardu Gate/Hall support.
- VM-234 completed Jeskai promotion after the VM-237 broad-suite blocker was recorded.

Current known risks:

- The worktree remains broadly dirty from recent Abzan, Temur, Sultai, Mardu, Jeskai, runtime, generated, raw, research, Kanban, and handoff work.
- `assets/js/quick-reading-tests.js`, `research/maze-search-tests.js`, `research/research-init.js`, and `docs/kanban/board.md` were already dirty before VM-238.
- Mardu color-code strings must stay query metadata only, not public route or alias keys.

Relevant decisions already made:

- `MARDU` is live.
- `RWB` and `WBR` remain metadata/query-only.
- Mardu raw JSON, research docs, architecture docs, Home preview, routes, schemas, builders, and generated data are outside this repair.

Files recently changed:

- VM-228 and VM-234 touched shared promotion/runtime/test surfaces.
- VM-237 touched the quick-reading loader/tests and Kanban/handoff files.

What should not be touched:

- Mardu raw JSON, Mardu research docs, Mardu architecture docs, generated data, Home UI, routes, schemas, Supabase files, builders, placement fixtures, or cross-lane docs/data.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2035-codex-vm237-mardu-quick-reading-reachability-repair.md`
- `docs/handoffs/2026-05-31-2043-codex-vm234-jeskai-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-237-mardu-live-quick-reading-reachability-repair.md`
- `assets/js/maze-handoff.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/maze-query-contract-tests.js`
- `research/maze-query-core.js`

## Files Changed

- `assets/js/maze-handoff.js`
- `research/research-init.js`
- `assets/js/quick-reading-tests.js`
- `research/maze-search-tests.js`
- `research/maze-query-contract-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-238-mardu-maze-link-query-preservation-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2128-codex-vm238-mardu-maze-link-query-preservation-repair.md`

## What Changed

- Added shared Maze operator-query detection for URL `q` parameters.
- Updated Maze operator resolution so explicit `operatorQuery` wins, then operator-style `q`, while readable prose does not become executable syntax.
- Updated Archscry-origin Maze launch storage/boot logic to avoid reusing plain `q` prose or stale stored operator queries as executable launch syntax.
- Preserved Mardu `rwb` ordering in shared Maze identity normalization, matching the working dossier sidebar path and expected `red-white-black` display text.
- Updated Mardu path tests from `wbr` / `white-black-red` to `rwb` / `red-white-black`.
- Added regression coverage for the reported Mardu URL shape, including no `c=wb c=br c=wbr` execution and no Orzhov/Rakdos/Mardu recognized-identity diagnostics from readable prose when `operatorQuery` is present.
- Created and closed VM-238.

## Why It Changed

The first Mardu Archscry Maze link was built through the shared personalized Maze path helper, which normalized `rwb` into `wbr`. The working "From Your Dossier" path had a later override back to `rwb`, so the two entry points disagreed. The launch path also needed an explicit guard so readable labels remain display context rather than a fallback executable query.

## Decisions Made

- `operatorQuery` is the highest-priority executable URL parameter.
- Operator-style `q` is the executable fallback only when `operatorQuery` is absent.
- Readable/plain query text is display fallback only.
- A `q` value is operator-style only when it includes explicit Scryfall syntax such as field operators or operator clauses; readable phrases like `Mardu Horde commanders with exactly red-white-black identity` are not operator queries.
- Mardu exact Commander links should use `id=rwb` and `red-white-black`; `RWB` and `WBR` still remain metadata/query-only and not public route/alias keys.

## Risks / Uncertainties

- The broader worktree remains dirty and was not cleaned, staged, committed, reverted, or normalized.
- This repair changes shared Maze operator detection, so it was covered with full `npm.cmd test`.
- The visible mojibake in the pasted QA text was not repaired because source inspection did not show this task's broken Mardu query behavior coming from text encoding.

## Tests Run

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

## Not Touched

- `data/raw-factions/mardu/*.json`
- `docs/research/mardu/**`
- `docs/architecture/colors/mardu/**`
- Generated data
- Home preview UI
- Routes/static pages
- Schemas
- Supabase files
- Builders
- Placement fixtures
- Raw registries or alias maps
- Abzan, Temur, Sultai, Jeskai, or shared architecture docs
- Staging or commits

## Follow-Up Recommendations

- Manual QA should reopen the first Mardu dossier/Archscry Maze link and confirm it displays readable Mardu text while executing `id=rwb is:commander f:commander ...`.
- If the pasted mojibake appears in the actual browser UI, create a separate text-encoding/copy polish card; VM-238 did not chase that because the source query bug was independent.

## Next Suggested Agent

Test Strategist for a manual browser QA pass on Mardu Archscry -> Maze dossier links.

## Related Kanban Card / Docs

- `docs/kanban/done/VM-238-mardu-maze-link-query-preservation-repair.md`
- `docs/handoffs/2026-05-31-2010-codex-vm228-mardu-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-2035-codex-vm237-mardu-quick-reading-reachability-repair.md`

## Explicit Final Scope Confirmation

VM-238 repaired Mardu Maze link/query preservation only. It did not make `RWB` or `WBR` live, did not alter Mardu raw/research/architecture files, did not edit generated data, and did not add routes, aliases, Home entries, Maze route keys, schemas, Supabase files, builders, or placement fixtures.

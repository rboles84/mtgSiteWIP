# 2026-07-04 09:58 - Codex - VM-473 Mixed-Mode Ambiguity Blocking

## Agent Name

Codex

## Task Requested

Implement VM-473: deterministic Operator's Hand / Plain Reading classification, name-like guards, blocking set-family ambiguity, execution guards, tests, docs, Kanban closeout, and no commit.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-04-0912-codex-vm472-robust-implicit-maze-compiler.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-472-robust-implicit-maze-compiler-framework.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/contracts/maze-query-contract.md`
- `research/maze-query-core.js`
- `research/research-init.js`
- `research/research-ui.js`
- `research/scryfall-grounded-compiler.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `research/scryfall-parser-tests.js`

## Files Changed

- `research/maze-query-core.js`
- `research/research-init.js`
- `research/research-ui.js`
- `research/scryfall-grounded-compiler.js`
- `research/maze-query-contract-tests.js`
- `research/maze-search-tests.js`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-473-mixed-mode-classifier-ambiguity-blocking.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-04-0958-codex-vm473-mixed-mode-ambiguity-blocking.md`

## What Changed

- Added `classifyMazeRawInput()` in the shared Maze query contract.
- Preserved pure raw Scryfall syntax, including quoted/operator-embedded English such as `o:"draw a card" f:commander`.
- Routed mixed Operator input such as `all heroes in the marvel set f:commander` through the VM-472 grounded compiler while preserving explicit syntax fragments.
- Added a raw-mode name-like guard so `Lightning Bolt`, `lightning bolt`, `Sol Ring`, and `Cyclonic Rift` route to the named-card endpoint instead of Plain Reading prose compilation.
- Added structured blocking set-family ambiguity to `queryModel.ambiguous` and derived contract-level `executionBlocked` / `blockReason` from that model.
- Added diagnostics for `raw_mixed_plain_reading`, `raw_name_like`, `parser_blocking_ambiguity`, and `parser_ambiguity_choice`.
- Updated Query Inspector grouping so mixed-routing and name-like diagnostics are visible and ambiguity choices render as buttons.
- Added a blocked Maze state that disables executable Copy/Open actions, avoids Scryfall fetch, avoids recent-search insertion, and shows neutral "Maze needs one choice" copy.
- Preserved Archscry initial stored `operatorQuery` launches by forcing raw execution for those launch paths.

## Why It Changed

VM-472 made Plain Reading robust once input reached the grounded compiler. The screenshot showed a remaining mode-boundary defect: Operator's Hand could still send mixed English-plus-operator text directly to Scryfall as raw prose. VM-473 makes that boundary deterministic while keeping pure syntax and card-name-like input conservative.

## Decisions Made

- `queryModel.ambiguous` is the source of truth for blocking ambiguity.
- Contract/UI blocking is derived from structured query-model ambiguity, not maintained as a parallel ambiguity model.
- Name-like multi-word raw input with no recognized spans uses `/cards/named`.
- Initial Archscry `operatorQuery` execution remains raw even after the classifier exists.
- Blocked ambiguity clears executable actions instead of pointing Copy/Open in Scryfall at a partial query.

## Risks / Uncertainties

- The name-like guard is intentionally conservative by recognized span count. Card names that contain recognized catalog/registry terms can still route as Plain Reading in Operator mode.
- Mixed-mode routing is deterministic but may still need more corpus coverage around uncommon raw syntax forms.
- Full `npm.cmd test` was not rerun in this VM; VM-472 already documented an unrelated broader-suite failure in `research/archscry-dossier-followup-tests.js`.
- The repo remains broadly dirty from prior VM work; unrelated files were preserved.

## Tests Run

- `node --check research\maze-query-core.js` - passed
- `node --check research\research-init.js` - passed
- `node --check research\research-ui.js` - passed
- `node research\scryfall-parser-tests.js` - passed, 125 parser cases
- `node research\maze-query-contract-tests.js` - passed
- `node research\maze-search-tests.js` - passed
- `node scripts\validate-plain-reading-semantics.mjs` - passed
- `npm.cmd run lint:js` - passed
- `git diff --check` - passed with LF/CRLF warnings only

## Not Touched

- No LLM fallback.
- No runtime Scryfall catalog fetching.
- No generated grounding artifact edits.
- No backend service, account, API key, Supabase, or Reading Finds storage changes.
- No broad UI redesign.
- No commit.

## Follow-Up Recommendations

- Expand the classifier corpus with more real raw Scryfall forms and common card-name false positives.
- Add browser/manual QA for blocked ambiguity visual polish in the real page, especially Copy/Open disabled states.
- Continue the VM-472 recommendation for a tiered golden/invariant corpus and category metrics.

## Next Suggested Agent

Test Strategist for classifier/corpus expansion, or frontend polish agent for Query Inspector choice UX.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-473-mixed-mode-classifier-ambiguity-blocking.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/contracts/maze-query-contract.md`
- `docs/handoffs/2026-07-04-0912-codex-vm472-robust-implicit-maze-compiler.md`

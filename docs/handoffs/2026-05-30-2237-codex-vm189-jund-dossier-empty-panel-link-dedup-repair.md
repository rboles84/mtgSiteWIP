# Agent Handoff - VM-189 Jund Dossier Empty Panel And Link Dedup Repair

## Agent Name

Codex

## Task Requested

Implement VM-189: fix remaining Jund live dossier rendering defects after VM-187, specifically duplicated EDHREC / MTGDecks Start Here links, empty `Shard Starter Card References` headings, and duplicate `Basics` display in the Mana Base Starting Map.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-2152-codex-vm187-jund-live-pilot-copy-dossier-repair.md`
- `docs/handoffs/2026-05-30-2212-codex-vm188-naya-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-187-jund-live-pilot-copy-dossier-handoff-repair.md`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `research/archscry-dossier-followup-tests.js`
- `assets/js/quick-reading-tests.js`
- `data/factions.json`
- `data/raw-factions/jund/jund.claims.json`

## Files Changed

- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-189-jund-dossier-empty-panel-link-dedup-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-2237-codex-vm189-jund-dossier-empty-panel-link-dedup-repair.md`

## What Changed

- Added normalized starter-card render state so blank arrays or whitespace-only entries cannot render empty Starter Card References headings.
- Filtered starter-card segment controls to non-empty groups only.
- Hid the entire Starter Card References panel when no starter cards are authored.
- Consolidated Commander directory links into one Start Here block under `Commander starting points`.
- Kept basics guidance in the basics panel body while leaving `Basics` as the single visible mana-base segment label.
- Added render-state assertions for Jund link deduplication, starter panel suppression, basics copy, existing authored starter groups, and partial starter-card groups.

## Why It Changed

Manual QA showed the Jund result still displayed duplicated EDHREC / MTGDecks links and empty Starter Card References labels despite VM-187's earlier suppression attempt. The fix needed to operate at the render-state level, not only through source-string or CSS-hidden checks.

## Decisions Made

- Jund still has no approved authored starter cards, so the correct behavior is to hide the Starter Card References panel rather than filling it with unapproved cards.
- Commander directory links should remain visible once even if preview cards are absent or fail art verification.
- The basics panel remains prose-only and does not add land counts or new mana-base recommendations.

## Risks / Uncertainties

- The worktree was already dirty with prior shard/runtime changes and untracked shard materials before VM-189. This task preserved that state and did not revert unrelated files.
- `git diff --check` passed but continued to report existing LF-to-CRLF working-copy warnings.

## Tests Run

- `node --check assets/js/index.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node assets/js/quick-reading-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not Touched

- `data/raw-factions/jund/jund.claims.json`
- Jund research or architecture docs
- Naya paths
- Home preview files
- Route maps, static pages, Maze routes, route CSS, or route keys
- Schema files
- Generated faction output
- Supabase context
- New lore sources, evidence rows, manual-fill rows, Commander facts, card facts, or raw claims

## Follow-Up Recommendations

- Manually smoke a fresh Jund Archscry result in browser and confirm the Start Here, Starter Card References, and Mana Base tabs match the user-facing copy expectations.
- If Jund starter-card recommendations are desired later, open a separate support/evidence card rather than adding cards through this UI repair path.

## Next Suggested Agent

Manual QA / Product Reviewer for live Jund dossier acceptance.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-189-jund-dossier-empty-panel-link-dedup-repair.md`
- `docs/kanban/done/VM-187-jund-live-pilot-copy-dossier-handoff-repair.md`
- `docs/handoffs/2026-05-30-2152-codex-vm187-jund-live-pilot-copy-dossier-repair.md`
- `docs/handoffs/2026-05-30-2212-codex-vm188-naya-controlled-runtime-promotion.md`

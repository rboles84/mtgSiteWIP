# Handoff: Kanban Cleanup and Historical Closeout

## Agent Name
Codex

## Task Requested
Close the backlog cards whose implementation was already complete, mark the obsolete VM-017 homepage mockup card as superseded, preserve historical duplicate IDs, and record the Kanban-only cleanup without touching runtime code or unrelated local worktree changes.

## Files Reviewed
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-2016-codex-vm017-main-index-gateway-mockup-set.md`
- `docs/handoffs/2026-05-16-1200-codex-vm021-archscry-results-ux-consolidation.md`
- `docs/handoffs/2026-05-16-1240-codex-vm021a-archscry-dossier-qa-corrections.md`
- `docs/handoffs/2026-05-16-1345-codex-vm021c-add-in-flight-request-dedupe-for-scryfall-calls.md`
- `docs/handoffs/2026-05-17-0138-codex-normalize-docs-paths-after-reorg.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/kanban/backlog/VM-021-archscry-results-ux-consolidation-pass.md`
- `docs/kanban/backlog/VM-021A-archscry-dossier-qa-corrections.md`
- `docs/kanban/backlog/VM-021C-add-in-flight-request-dedupe-for-scryfall-calls.md`
- `docs/kanban/backlog/VM-024-normalize-docs-paths-after-reorg.md`
- `docs/kanban/done/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`

## Files Changed
- `docs/kanban/board.md`
- `docs/kanban/done/VM-017-main-index-gateway-mockup-set.md`
- `docs/kanban/done/VM-021-archscry-results-ux-consolidation-pass.md`
- `docs/kanban/done/VM-021A-archscry-dossier-qa-corrections.md`
- `docs/kanban/done/VM-021C-add-in-flight-request-dedupe-for-scryfall-calls.md`
- `docs/kanban/done/VM-024-normalize-docs-paths-after-reorg.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1702-codex-kanban-cleanup-closeout.md`

## What Changed
- Moved `VM-021`, `VM-021A`, `VM-021C`, and `VM-024` from `backlog/` to `done/` and updated each card status from `backlog` to `done`.
- Moved `VM-017` from `backlog/` to `done/`, updated its status to `superseded`, and recorded that the old Three Doors direction is obsolete after `VM-148`.
- Appended closeout notes to the moved cards so each one points back to its implementation handoff plus this cleanup handoff.
- Updated `docs/kanban/board.md` in place so Backlog no longer lists the five moved cards, Done now lists them, and the Done section carries a compact preserved-duplicate note for `VM-044` and `VM-049`.
- Left `VM-021B` unchanged in `done/`.

## Why It Changed
The repo already contained completion handoffs for `VM-021`, `VM-021A`, `VM-021C`, and `VM-024`, but the file-based Kanban state still showed them as backlog. `VM-017` had become a superseded pre-`VM-148` design prompt and no longer belonged in the active backlog.

## Decisions Made
- Preserved the existing local edits in `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` by editing only the specific affected lines.
- Kept `VM-147` open as the umbrella spike and left the recent `VM-147A`, `VM-147B`, `VM-147C`, and `VM-154` worktree items untouched.
- Preserved historical duplicate IDs for `VM-044` and `VM-049` and documented them only on the board instead of rewriting historical done cards.
- Treated this as a Kanban/documentation cleanup only and did not rerun runtime test suites.

## Risks / Uncertainties
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` already had local modifications before this cleanup, so future edits still need in-place discipline.
- The broader worktree still contains unrelated runtime and documentation changes outside this cleanup scope.
- Historical duplicate IDs remain in the repo by design and still require care if future cards are added manually.

## Tests Run
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short`
- `Get-Date -Format "yyyy-MM-dd-HHmm"`
- Reviewed the current contents of the target backlog cards, the unaffected `VM-021B` done card, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- docs/kanban docs/handoffs`

## Not Touched
- Runtime JavaScript, CSS, research files, generated artifacts, schemas, and non-Kanban product docs
- `docs/kanban/done/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- Untracked `VM-147A`, `VM-147B`, `VM-147C`, and `VM-154` Kanban/handoff files
- Any historical `VM-044` or `VM-049` done card file content

## Follow-Up Recommendations
- If future homepage concept work is revived, create a new current-home card instead of reopening superseded `VM-017`.
- Continue using the implementation handoffs for `VM-021`, `VM-021A`, `VM-021C`, and `VM-024` as the authoritative runtime-work records.
- Keep documenting duplicate-ID exceptions on the board whenever preserved historical collisions are encountered.

## Next Suggested Agent
Kanban Steward or Documentation Steward for any future board-hygiene pass.

## Related Kanban Card, Docs, Or Plans
- `docs/kanban/done/VM-017-main-index-gateway-mockup-set.md`
- `docs/kanban/done/VM-021-archscry-results-ux-consolidation-pass.md`
- `docs/kanban/done/VM-021A-archscry-dossier-qa-corrections.md`
- `docs/kanban/done/VM-021C-add-in-flight-request-dedupe-for-scryfall-calls.md`
- `docs/kanban/done/VM-024-normalize-docs-paths-after-reorg.md`
- `docs/kanban/done/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`

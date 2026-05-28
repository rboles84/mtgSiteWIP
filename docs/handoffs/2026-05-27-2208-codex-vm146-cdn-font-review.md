# 2026-05-27 22:08 - Codex - VM-146 CDN Font Review

## Agent name

Codex

## Task requested

Implement VM-146 by creating the approved docs-only route-by-route CDN and font dependency review, adding a route ownership matrix cross-link, closing the Kanban card, and recording the handoff trail without runtime changes.

## Repository state

- Branch: `feature/ui-refactor-exploration`
- HEAD at VM-146 verification: `7e75e5f`
- Split-commit base: VM-144 was committed first as `0514149`, and this VM-146 record is prepared for the next separate commit.
- Worktree status at correction time: mixed and uncommitted; VM-144 archive changes were already present alongside the VM-146 docs changes when this correction was recorded.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2205-codex-vm144-preview-archive-audit.md`
- `docs/handoffs/2026-05-27-2143-codex-vm022-vm145-vm153-merge-bundle.md`
- `docs/handoffs/2026-05-27-2118-codex-vm145-legal-page-css-extraction.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-146-cdn-font-dependency-review.md`
- `docs/architecture/route-ownership-matrix.md`
- Public route HTML files for Home, Archscry, Maze, Strategium, Apocrypha, Library, Privacy, and Terms
- Route-loaded shared and route-local CSS/JS files
- Maze route-loaded `research/research-init.js`, `research/research-search.js`, and `research/research-ui.js`

## Files changed

- `docs/architecture/cdn-font-dependency-review.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-146-cdn-font-dependency-review.md`
- `docs/kanban/backlog/VM-146-cdn-font-dependency-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2208-codex-vm146-cdn-font-review.md`

## What changed

- Added `docs/architecture/cdn-font-dependency-review.md` with a route-by-route dependency table.
- Scoped the review to live public route HTML plus CSS/JS directly loaded by those routes.
- Included Maze `research` sources only because Maze directly loads `research/research-init.js`.
- Split boot-time asset delivery from interactive/runtime service behavior and copy-only legal mentions.
- Documented Google Fonts as both `fonts.googleapis.com` stylesheet delivery and implied `fonts.gstatic.com` font-file delivery.
- Documented Supabase CDN asset loading separately from Supabase-backed auth/session/database behavior.
- Added evidence notes for every keep, replace, and defer recommendation.
- Added a route ownership matrix cross-link to the new review.
- Moved VM-146 from `docs/kanban/backlog/` to `docs/kanban/done/`.
- Created `docs/kanban/done/VM-146-cdn-font-dependency-review.md` as the completed card.
- Updated the board and handoff index.

## Why it changed

VM-146 was created as an analysis-first follow-up to the frontend route ownership matrix. The project needed a durable route-by-route dependency recommendation before any later work removes fonts, changes CDN delivery, or adjusts Supabase script loading.

## Decisions made

- Kept the review documentation-only and did not edit runtime HTML, CSS, JS, schemas, build tooling, or generated data.
- Treated Home, Archscry, Maze, and Strategium Google Fonts usage as `defer` because direct route-owned font references remain.
- Treated Apocrypha and Library Google Fonts as `replace` candidates because their live styling appears to rely on token-backed local fonts, with visual compatibility caveats.
- Treated Privacy and Terms third-party service names as policy-copy mentions only.
- Kept VM-145 and VM-147 separate, as planned.

## Risks / uncertainties

- Google Fonts replacement still needs visual QA route by route because font changes can alter layout and tone.
- Supabase CDN replacement must preserve existing saved-result, OAuth, and session behavior.
- VM-144 changes were already uncommitted in the worktree when VM-146 started; VM-146 edits were limited to the VM-146 docs/card/board/handoff plus the route ownership matrix cross-link. During the one-at-a-time commit pass, VM-144 was committed first as `0514149`, leaving this VM-146 payload scoped for the next separate commit.
- VM-022 remains in progress on the board and was not edited by this VM-146 correction.

## Tests run

- Static origin scan over the eight route HTML files and directly loaded CSS/JS paths.
  - Result: confirmed only the expected Google Fonts, Supabase CDN, Supabase service, Scryfall, TCGPlayer, and Commander-directory sources within route-loaded files.
- Static font-family scan over the eight route HTML files and directly loaded CSS/JS paths.
  - Result: confirmed direct Cinzel/Cinzel Decorative/Crimson/Plex usage on Home, Archscry, Maze, and Strategium; token-backed local font usage on Apocrypha, Library, legal pages, and shared shell; and policy-only service mentions on legal pages.
- Review check that every recommendation has an evidence note.
- Review check that direct route ownership is separated from inherited shared-shell dependency.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
  - Result: no new whitespace issues introduced; pre-existing CRLF line-ending warnings remained unchanged.

## Not touched

- Runtime route HTML/CSS/JS behavior
- `assets/js/shared.js` Supabase session behavior
- Supabase schema, edge functions, auth flow, and saved-profile contracts
- Generated data and generated schemas
- Placement scoring, precon ranking, Maze search behavior, and Scryfall cache behavior
- Legal copy and policy wording
- VM-022 in-progress implementation files
- VM-144 archived assets and related active-route cleanup

## Follow-up recommendations

- Use the VM-146 review before opening any implementation card that removes Google Fonts or changes Supabase SDK delivery.
- Keep Supabase delivery-mechanism work separate from Supabase product behavior changes.
- If Google Fonts removal starts, prioritize Apocrypha and Library first because their review evidence suggests lower route-owned font risk.

## Next suggested agent

Documentation Steward for release-note polish or Implementation Architect for a future scoped dependency replacement card.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-146-cdn-font-dependency-review.md`
- `docs/architecture/cdn-font-dependency-review.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/kanban/done/VM-143-frontend-route-ownership-matrix.md`
- `docs/kanban/done/VM-145-legal-page-css-extraction.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`

# VM-146 - CDN And Font Dependency Review

ID: VM-146
Title: CDN And Font Dependency Review
Status: done
Type: Architecture / Performance Review
Area: Frontend Dependencies
Priority: low
Created: 2026-05-26
Completed: 2026-05-27
Branch: feature/ui-refactor-exploration
HEAD at VM-146 verification: 7e75e5f
Split-commit base: VM-144 was committed first as 0514149, and this VM-146 record is prepared for the next separate commit.

## Summary

Review runtime CDN and font dependencies route by route, separating privacy/performance decisions from broad modernization work.

## Source

- `docs/architecture/route-ownership-matrix.md`
- Public route HTML files
- CSS and JS files directly loaded by public routes
- `assets/css/fonts.css`
- `assets/js/shared.js`
- `research/research-init.js`, `research/research-search.js`, and `research/research-ui.js` only because Maze directly loads the `research/research-init.js` module path

## Acceptance Criteria

- Each route's Google Fonts and Supabase CDN usage is documented with a keep, replace, or defer recommendation.
- The review distinguishes external runtime calls from legal-copy mentions of third-party services.
- Any recommendation preserves current route visuals, local-file compatibility, and Supabase session behavior unless a follow-up implementation card explicitly changes them.
- The output does not mandate a repo-wide CSS or build-system modernization.

## Non-Goals

- Do not self-host fonts or remove CDN scripts in this review card.
- Do not change Supabase auth/session behavior.
- Do not introduce a bundler.

## Implementation Summary

- Added `docs/architecture/cdn-font-dependency-review.md` with a route-by-route dependency table for `/`, `/archscry/`, `/maze/`, `/strategium/`, `/apocrypha/`, `/library/`, `/privacy/`, and `/terms/`.
- Scoped the audit to live route HTML plus CSS/JS directly loaded by those routes.
- Counted Google Fonts as `fonts.googleapis.com` stylesheet delivery plus implied `fonts.gstatic.com` font-file delivery.
- Separated Supabase CDN asset loading from Supabase-backed auth/session/database behavior.
- Marked Home, Archscry, Maze, and Strategium Google Fonts usage as `defer` because direct route-owned font-family evidence remains.
- Marked Archscry and Maze Supabase CDN assets as `defer`, while keeping Supabase-backed behavior.
- Marked Apocrypha and Library Google Fonts as `replace` candidates with shared-shell visual compatibility caveats.
- Documented Privacy and Terms third-party service names as policy-copy mentions only, not route-owned runtime dependencies.
- Added a route ownership matrix cross-link to the new dependency review.
- Moved VM-146 from `docs/kanban/backlog/` to `docs/kanban/done/`.
- Created `docs/kanban/done/VM-146-cdn-font-dependency-review.md` as the completed card.

## Worktree Note

- VM-144 changes were already uncommitted in the worktree when VM-146 started.
- VM-146 edits were limited to the VM-146 docs/card/board/handoff plus the route ownership matrix cross-link.
- During the one-at-a-time commit pass, VM-144 was committed first as `0514149`, leaving this VM-146 payload scoped for the next separate commit.

## Files Changed

- `docs/architecture/cdn-font-dependency-review.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-146-cdn-font-dependency-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2208-codex-vm146-cdn-font-review.md`

## Verification

- Static origin scan over the eight route HTML files and their directly loaded CSS/JS paths
  - Result: confirmed only the expected Google Fonts, Supabase CDN, Supabase service, Scryfall, TCGPlayer, and Commander-directory sources within route-loaded files.
- Static font-family scan over the same route-loaded CSS/JS paths
  - Result: confirmed direct Cinzel/Cinzel Decorative/Crimson/Plex usage on Home, Archscry, Maze, and Strategium; token-backed local font usage on Apocrypha, Library, legal pages, and shared shell; and policy-only service mentions on legal pages.
- Review check confirming recommendations include evidence notes
- Review check confirming direct route-owned dependencies are separated from inherited shared-shell dependencies
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
  - Result: no new whitespace issues introduced; pre-existing CRLF line-ending warnings remained unchanged.

## Human Review

Yes - dependency changes carry privacy, performance, and visual tradeoffs.

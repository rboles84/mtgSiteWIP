# VM-146 - CDN And Font Dependency Review

ID: VM-146
Title: CDN And Font Dependency Review
Status: backlog
Type: Architecture / Performance Review
Area: Frontend Dependencies
Priority: low
Created: 2026-05-26

## Summary

Review runtime CDN and font dependencies route by route, separating privacy/performance decisions from broad modernization work.

## Source

- `docs/architecture/route-ownership-matrix.md`
- Public route HTML files
- `assets/css/fonts.css`
- `assets/js/shared.js`

## Acceptance Criteria

- Each route's Google Fonts and Supabase CDN usage is documented with a keep, replace, or defer recommendation.
- The review distinguishes external runtime calls from legal-copy mentions of third-party services.
- Any recommendation preserves current route visuals, local-file compatibility, and Supabase session behavior unless a follow-up implementation card explicitly changes them.
- The output does not mandate a repo-wide CSS or build-system modernization.

## Non-Goals

- Do not self-host fonts or remove CDN scripts in this review card.
- Do not change Supabase auth/session behavior.
- Do not introduce a bundler.

## Files Likely Impacted

- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/data-contracts.md` only if service boundaries change in a later implementation card

## Risks / Uncertainties

- Supabase CDN usage is coupled to saved readings and shared session behavior on Archscry and Maze.
- Font changes can create visual regressions even when markup is unchanged.

## Implementation Prompt

Produce a route-by-route dependency recommendation for Google Fonts, Supabase CDN, and other external runtime dependencies without changing runtime files.

## Human Review

Yes - dependency changes carry privacy, performance, and visual tradeoffs.

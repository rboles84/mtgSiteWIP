# Handoff — VM-413 Fraunces + Spectral Type System Unification (Planning)

- **Date:** 2026-06-19 15:00
- **Agent:** Claude (Planning Architect)
- **Related Card:** VM-413 (Ready)
- **Status:** Plan + card complete; ready for owner review and Codex implementation prompt.

## Task Requested

Owner reviewed live site screenshots, disliked the current display/body type, and (after a
side-by-side mockup of Cormorant Garamond, EB Garamond, Spectral, and Fraunces) selected the
**Fraunces (display) + Spectral (body)** pairing. Asked for a deep diagnostic of the current
font pipeline first, then a VM card with the next sequence number for review. No code changes.

## Files Reviewed

- `CLAUDE.md`, `AGENTS.md`, `docs/handoffs/HANDOFF_INDEX.md`, `docs/kanban/board.md`.
- `assets/css/tokens.css` (font tokens), `assets/css/fonts.css` (`@font-face`).
- `assets/css/home.css`, `archscry.css`, `strategium.css`, `maze.css`, `topbar.css`,
  `apocrypha.css`, `legal.css`, `components.css` (font-family + text-transform usage).
- `index.html`, `archscry/`, `strategium/`, `maze/`, `library/`, `apocrypha/` heads.
- `assets/fonts/` (woff2 signatures/sizes), `CNAME`, `.nojekyll`, git remote.

## Key Findings

- The intended **Fraunces + Source Serif 4 + IBM Plex Mono** system is already declared in
  `tokens.css:88-90` and the self-hosted woff2 load correctly in production (apex domain
  `voxmana.io`, valid `wOF2` files, all pages link `tokens.css` + `fonts.css`). The fonts are
  NOT broken.
- The page-to-page inconsistency is caused by **hardcoded `Cinzel` overrides that bypass the
  token**: `archscry.css` (37), `strategium.css` (1, on the `body` selector → whole page),
  `home.css` (2), `maze.css` (1). Cinzel is capitals-only, which is the look the owner disliked.
- Body is `Source Serif 4` everywhere via token (except Strategium body, which inherits Cinzel).
- **Spectral is net-new** — absent from the repo; must be added as asset + `@font-face`.
- **69** `text-transform: uppercase` rules across 8 CSS files compound the all-caps readability
  issue independent of the font choice.

## Files Changed

- Created `docs/kanban/ready/VM-413-fraunces-spectral-type-system-unification.md`.
- Updated `docs/kanban/board.md` (Ready section now lists VM-413).
- Updated `docs/handoffs/HANDOFF_INDEX.md` (this entry).

## Decisions Made

- Selected pairing: **Fraunces (display) + Spectral (body)**, per owner.
- Scoped the work as a token repoint + Cinzel-override removal + Spectral asset addition, plus a
  bounded uppercase-reduction review. Kept it explicitly a type swap, not a redesign.

## Risks / Uncertainties

- Archscry has the largest regression surface (37 rules; letter-spacing tuned for Cinzel caps).
- Spectral asset must be a correctly licensed OFL subset with matched metric overrides (CLS).
- All four visual-regression baselines will legitimately change and must be regenerated.
- Three open owner decisions recorded on the card: Cinzel retirement, Spectral delivery method,
  and whether to fold the uppercase cleanup into this card or split it.

## Tests Run

- None (planning only; no code changed). Test plan is enumerated on the card.

## Not Touched

- Generated data, faction JSON, raw sources, flavor snippets, Supabase, route content/colors,
  and the known open residuals (Temur wording, WITCH flavor, `witch.webp`, VM-295).

## Follow-Up / Next Suggested Agent

- Owner to review VM-413 and supply a Codex implementation prompt to compare/refine against the
  card's Recommended Approach and Acceptance Criteria, then Codex implements.

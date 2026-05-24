# VM-115 - Shared Token Follow-Up: OKLCH, Fluid Spacing, and Monotonic Type

ID: VM-115
Title: Shared Token Follow-Up: OKLCH, Fluid Spacing, and Monotonic Type
Status: done
Type: Frontend / Shared CSS / Tokens
Area: Shared Visual System
Priority: medium
Created: 2026-05-24
Completed: 2026-05-24

## Summary

Implement the approved shared-token follow-up: add sRGB-equivalent OKLCH declarations beside the existing color fallbacks, add teal-only Display P3 accent overrides, retune the fluid spacing token pilot, make the body display scale monotonic, and adopt the fluid spacing pilot only on low-risk shared and base-home surfaces.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1453-codex-vm114-p0-shared-css-foundation-pass.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-114-p0-shared-css-foundation-pass.md`
- User-approved implementation plan and monotonicity follow-up in this thread

## Scope

- Update `assets/css/tokens.css` with explicit hex/RGBA -> OKLCH -> teal-only Display P3 token layering.
- Retune `--space-fluid-*` to a conservative shared-shell scale while leaving the fixed `--s-*` scale intact.
- Make `--text-base` through `--text-xl` fluid and raise `--text-2xl` to keep the display scale monotonic.
- Adopt the fluid spacing pilot in low-risk shared component spacing and the base section of `assets/css/home.css`.
- Update living architecture and Kanban documentation for the shared-token follow-up.

## Non-Goals

- Do not edit HTML files, JavaScript files, or route wiring.
- Do not change `assets/css/atmosphere.css`, `assets/css/fonts.css`, or the art-directed `body[data-page="home"]` override block.
- Do not expand Display P3 beyond the teal accent family in this pass.
- Do not touch `newIndex2_Old.html`.

## Acceptance Criteria

- Shared semantic color tokens keep their fallback-first ordering and add sRGB-equivalent OKLCH declarations.
- `@supports (color: color(display-p3 1 1 1))` only overrides `--teal`, `--teal-l`, and `--teal-d`.
- The representative type scale remains monotonic across `320`, `390`, `540`, `768`, `1024`, and `1440` viewport widths.
- Shared fluid spacing adoption stays limited to low-risk `components.css` surfaces and the base `home.css` shell section above the art-direction override.
- No HTML files change in this pass.

## Outcome

- Rebuilt `assets/css/tokens.css` in clean ASCII while preserving the shared layer/import scaffold and adding explicit Tier 1/2/3 token comments.
- Added OKLCH equivalents for the shared palette, border alphas, and status tokens while keeping them sRGB-equivalent to the current live palette.
- Added teal-only Display P3 overrides for the accent family on wide-gamut displays.
- Retuned the existing fluid spacing token pilot from section-scale values down to conservative component/shared-shell values.
- Made `--text-base`, `--text-lg`, and `--text-xl` fluid and raised `--text-2xl` to remove the previously identified inversion window.
- Adopted the fluid spacing tokens in shared buttons, tabs, search, cards, chips, rails, status strips, and the base home shell without touching the later art-directed homepage block.
- Updated the Project Atlas shared visual-system description to reflect the progressive color/token work.

## Verification

- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run lint:html` - fails on the existing legal-page assertion: `legal pages should keep their Maze navigation links`
- Static checks:
  - token monotonicity script at `320`, `390`, `540`, `768`, `1024`, and `1440` widths
  - sRGB-to-OKLCH equivalence script confirming only near-zero rounding deltas
  - `git -c safe.directory=C:/dev/mtgSiteWIP diff --name-only -- '*.html'`
- Browser QA:
  - local Chrome/Firefox/Safari spot-checks were not completed because no callable Browser tool, Playwright runtime, or local browser executables were available in this turn

## Handoff

- `docs/handoffs/2026-05-24-1537-codex-vm115-shared-token-follow-up.md`

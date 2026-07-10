# Codex Handoff - VM-485 Maze Modal Mana Pips

## Agent Name

Codex

## Task Requested

Fix only the Maze Scryfall result modal so mana costs and Oracle text render real local MTG mana pips instead of raw brace notation or custom letter chips, with pinned Mana Font assets, focused accessibility, browser coverage, documentation, and no parser/query/Reading Finds drift.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-07-09-1126-codex-vm483-final-maze-retest.md`
- `docs/handoffs/2026-07-09-1211-codex-vm484-token-object-regression-hardening.md`
- `docs/handoffs/2026-06-30-1429-codex-vm448-browser-smoke.md`
- `docs/handoffs/2026-06-28-2001-codex-vm405-maze-deck-idea-tray-v2.md`
- `docs/handoffs/2026-06-29-0013-codex-vm426-reading-finds.md`
- `docs/handoffs/2026-06-30-1834-codex-vm456-player-language.md`
- `docs/kanban/done/VM-405-maze-deck-idea-tray-v2.md`
- `docs/kanban/done/VM-426-reading-finds-dossier-reflection.md`
- `docs/kanban/done/VM-448-critical-browser-e2e-smoke.md`
- `docs/kanban/done/VM-456-term-preserving-player-language-pass.md`
- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `scripts/browser-smoke.mjs`
- `docs/reference/manual-test-cases.md`
- `package.json`
- User-provided `README (1).md`, `maze-symbol-renderer (1).js`, and `maze-modal-pips (1).css` extracts.

## Files Changed

- `package.json`
- `package-lock.json`
- `assets/vendor/mana/README.md`
- `assets/vendor/mana/css/mana.min.css`
- `assets/vendor/mana/fonts/mana.eot`
- `assets/vendor/mana/fonts/mana.svg`
- `assets/vendor/mana/fonts/mana.ttf`
- `assets/vendor/mana/fonts/mana.woff`
- `maze/index.html`
- `assets/css/maze.css`
- `research/research-init.js`
- `scripts/browser-smoke.mjs`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-485-maze-modal-mana-pips.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-09-1759-codex-vm485-maze-modal-mana-pips.md`

## What Changed

- Pinned `mana-font` exactly to `1.18.0` and vendored only its compiled runtime CSS plus the Mana font formats referenced by that CSS.
- Documented the upstream repository/version and the SIL OFL 1.1 font / MIT stylesheet license split.
- Linked the local Mana stylesheet from `maze/index.html` and added a modal-only scope class.
- Replaced the old modal letter-chip renderer with safe DOM/text-node rendering for generic, colored, colorless, variable, tap/untap, snow, energy, hybrid, Phyrexian, and half-color symbols.
- Added readable brace-free fallback text for unsupported tokens without using `innerHTML`.
- Kept symbol titles and readable ARIA labels while changing the cost container label from raw notation to `Mana cost`.
- Preserved Oracle text nodes, punctuation, spaces, adjacent symbols, and explicit line breaks.
- Removed the obsolete custom modal mana-color chip CSS and added scoped Mana Font sizing/alignment plus fallback styling.
- Extended browser smoke with a synthetic VM-485 fixture, build-time CSS class extraction/validation, font-file checks, font/glyph rendering checks, accessibility checks, exact text-node sequence assertions, and desktop/mobile coverage.

## Why It Changed

Scryfall card details exposed internal brace notation and approximate text chips where players expect familiar Magic mana symbols. A pinned local symbol font gives the modal authentic pips without adding a runtime network dependency or changing search semantics.

## Decisions Made

- Use the user-confirmed Mana class model: `ms`, a verified symbol class, `ms-cost`, and `ms-shadow`; no `ms-split` for current combined hybrid/Phyrexian classes.
- Represent half-color Scryfall tokens such as `{HR}` with `ms-r ms-half`; keep the separate `{1/2}` glyph mapped to `ms-1-2`.
- Validate every class referenced by the renderer against vendored CSS in browser smoke by statically reading source files before browser launch.
- Preserve unsupported token text without braces instead of guessing a Mana class.
- Keep all rendering DOM-safe and modal-scoped; no Oracle `innerHTML` or runtime CSS parsing.
- Keep MPlantin and other upstream package sources out of the vendor subset because the modal does not invoke those classes.

## Risks / Uncertainties

- Future Scryfall symbol additions will use readable fallback text until their exact Mana 1.18.0 class mapping is explicitly added and validated.
- The upstream stylesheet contains unused MPlantin declarations, but the VM-485 modal classes do not invoke that font and live browser QA produced no missing-font or console errors.
- `npm install` continues to report the repository's existing audit summary of 18 vulnerabilities; `mana-font@1.18.0` adds no transitive dependencies.
- Firefox, Safari/WebKit, iOS Safari, and Android Chrome remain outside this Chromium/Edge-focused pass.

## Tests Run

- `node --check research\research-init.js` - passed.
- `node --check scripts\browser-smoke.mjs` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:browser-smoke` - passed for desktop and mobile, including VM-485 modal assertions.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd test` - passed, including 212 parser cases and the existing Maze/Reading Finds suites.
- In-app browser QA against live `Abomination, World Ravager` - passed on desktop and at `390px`; no horizontal overflow, modal column overlap, console warnings, or page errors.
- `git diff --check` - passed with existing LF/CRLF working-copy warnings only.

## Not Touched

- Maze parser, compiler, query routing, generated Scryfall grounding, or live Scryfall data.
- Reading Finds persistence, migration, sections, actions, or Archscry handoff contracts.
- Modal close, Escape, outside-click, inert, or focus-return architecture.
- Unrelated Maze chips/badges or broader route layout.
- Unrelated dirty-tree files, generated/source data, Supabase/account behavior, visual baselines, staging, commits, pushes, or deployment.

## Follow-Up Recommendations

- Add new Scryfall symbol mappings only with an exact real fixture and a corresponding static vendored-CSS assertion.
- Run the modal check in Firefox and Safari/WebKit when the next cross-browser QA pass is scheduled.
- Revisit upstream Mana only through a separately approved version-bump ticket that records class and visual changes.

## Screenshot Alignment Follow-Up

After the initial completion, the owner supplied an `Aboshan, Cephalid Emperor` modal screenshot showing that the pips read slightly low inside both the casting-cost row and Oracle text.

- Changed the modal pip line height from Mana's inherited `1.35em` to `1.3em`, matching the rendered pip height.
- Removed the shared `-0.18em` vertical offset and restored neutral `middle` alignment for the flex-based casting-cost row.
- Applied a reduced `-0.1em` offset only to inline Oracle pips.
- Extended browser smoke to require matching pip line-box/element heights, a shared casting-cost top edge, and less than `1px` center difference between an Oracle pip and adjacent text.
- Rechecked the exact live Aboshan modal: desktop Oracle center difference was `0.04px`; `390px` mobile was `0.33px`; casting-cost top-edge spread was `0px`; no horizontal overflow or browser warnings/errors appeared.
- Reran `node --check scripts\browser-smoke.mjs`, `npm.cmd run test:browser-smoke`, and focused `git diff --check`; all passed with only existing line-ending warnings.

## Next Suggested Agent

No specialist required. Human cross-browser QA is the remaining optional follow-up.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-485-maze-modal-mana-pips.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/done/VM-448-critical-browser-e2e-smoke.md`
- `docs/kanban/done/VM-426-reading-finds-dossier-reflection.md`

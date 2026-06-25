# VM-413 - Fraunces + Spectral Type System Unification

## Status

Done

## Type

Design / Frontend (CSS + font assets)

## Area

Global typography for live public routes

## Priority

High (owner-driven brand/readability fix)

## Created

2026-06-19

## Summary

Implement Fraunces display, Spectral body, and IBM Plex Mono labels across the live public
routes. Retire live Cinzel, Cinzel Decorative, Crimson Pro, and Google Fonts dependencies
from route-loaded assets after confirming the former decree-style titles render acceptably
with Fraunces.

This card remains the single live card for the work. No VM-414 card exists or should be
created.

## Pre-Flight Findings

- Prior related work: VM-114/VM-115 established shared font/token scaffolding; VM-146
  documented route-owned Google Fonts dependencies; VM-392 identified Home font/CSS/LCP
  strategy as a post-v1 performance follow-up.
- Current VM-413 planning handoff: `docs/handoffs/2026-06-19-1500-claude-vm413-fraunces-spectral-type-system.md`.
- Known risks: Archscry has many Cinzel-tuned rules; visual baselines will move; new
  Spectral metrics must not copy Source Serif 4 overrides blindly.
- Do not touch generated data, lore/source files, placement logic, Supabase, Scryfall,
  Commander facts, or route behavior outside typography.

## Implementation Scope

- Add self-hosted Spectral WOFF2 assets under `assets/fonts/`.
  - Preferred: Spectral roman and italic WOFF2 covering needed weights.
  - Fallback: static `400`, `600`, and italic `400`.
  - Document source/license in `assets/fonts/README.md`.
- Add Spectral `@font-face` blocks in `assets/css/fonts.css`, mirroring Source Serif 4's
  block structure only.
  - Do not copy Source Serif 4 metric override values.
  - Compute Spectral-specific `size-adjust`, `ascent-override`, `descent-override`, and
    `line-gap-override`, or omit them initially and verify no layout shift.
- Update `assets/css/tokens.css`:
  - `--font-display: 'Fraunces', Georgia, 'Times New Roman', serif`
  - `--font-text: 'Spectral', 'Source Serif 4', Georgia, 'Times New Roman', serif`
  - `--font-mono` unchanged.
- Confirm the current Fraunces subset supports the weights and variation settings now
  routed through it.
- Classify each hardcoded Cinzel/Cinzel Decorative/Crimson rule before replacing:
  - Body/paragraph text -> `var(--font-text)`.
  - Headings/display labels -> `var(--font-display)`.
  - Technical labels -> `var(--font-mono)` when appropriate.
- Fix live route-loaded CSS/JS/SVG/canvas/chart font strings, including the inline SVG
  label stack in `index.html`.
- Remove route-owned Google Fonts imports after confirming former Cinzel Decorative
  decree-style titles fall back acceptably to Fraunces.
- Fix Maze shared CSS order so `tokens.css` loads before `fonts.css`.
- Review letter-spacing per rule; do not globally zero tracking or remove Home hero
  negative tracking without visual cause.

## Guards And Docs

- Add or extend static regression checks for live route-loaded files only.
- Scope all font-regression `rg` checks to live public route assets: route HTML, route
  folders, `assets/css/**`, and `assets/js/**`.
- Explicitly exclude `docs/**`, archived prototypes, audits, artifacts, and research files.
- Update `docs/architecture/cdn-font-dependency-review.md` and
  `docs/architecture/route-ownership-matrix.md` to close VM-146's deferred Google Fonts work.
- Include Privacy and Terms in route QA.

## Acceptance Criteria

- Headless FontFace check confirms Fraunces, Spectral, and IBM Plex Mono load from
  `/assets/fonts/`.
- Scoped `rg` over live route-loaded CSS/JS/HTML returns zero hits for `Cinzel`,
  `Cinzel Decorative`, `Crimson Pro`, `fonts.googleapis`, and `fonts.gstatic`.
- Body copy uses Spectral, display text uses Fraunces, and labels use IBM Plex Mono.
- No new overflow, clipping, blank canvas, layout shift, or console errors.
- Before/after `npm run test:placement` remains behaviorally unchanged.

## Tests To Run

- Before/after no-op guard: `npm run test:placement`.
- `npm test`
- `npm run test:parser`
- `npm run lint:html`
- `npm run lint:js`
- `npm run test:frontend-smoke`
- `npm run test:lighthouse:home`
- `npm run test:visual:home`
- `npm run test:visual:archscry`
- `npm run test:visual:strategium`
- `npm run test:visual:apocrypha`
- Regenerate the four visual baselines only after confirming diffs are typography-only.
- Browser QA all public routes for loaded Spectral/Fraunces/Plex, no Cinzel caps, and no
  visual regressions.

## Implementation Result

- Added self-hosted Spectral roman/italic WOFF2 assets and documented their source/license
  in `assets/fonts/README.md`.
- Updated shared tokens to Fraunces display, Spectral body, and IBM Plex Mono labels.
- Removed live public route Google Fonts imports and hardcoded Cinzel/Cinzel Decorative/
  Crimson Pro route-loaded font strings.
- Classified route rules by text role: Spectral for body-scale copy, Fraunces for display,
  and Plex Mono for labels/buttons/technical readouts.
- Fixed Home SVG/chart/canvas font strings, Archscry route CSS, Strategium body copy,
  Maze CSS and live toast styling, Apocrypha/Library route heads, and Maze token/font load
  order.
- Added Home critical self-hosted font preloads for the initial Fraunces/Spectral/Plex
  render path.
- Added a scoped live-route font regression guard to `npm run lint:html`; docs, audits,
  artifacts, and archived research are intentionally excluded.
- Updated VM-146 dependency docs and the route ownership matrix to close deferred Google
  Fonts work.
- Regenerated the four visual baselines after confirming diffs were typography-only.

## Tests Run

- PASS `npm.cmd run test:placement` before implementation.
- PASS `npm.cmd run test:placement` after implementation.
- PASS headless FontFace route check: Fraunces, Spectral, and IBM Plex Mono loaded from
  `/assets/fonts/`; sampled body/display/label selectors computed to the intended stacks;
  no sampled route console errors or CLS.
- PASS scoped `rg` over live route assets for `Cinzel`, `Cinzel Decorative`, `Crimson Pro`,
  `fonts.googleapis`, and `fonts.gstatic` returned zero hits.
- PASS `npm.cmd test`.
- PASS `npm.cmd run test:parser`.
- PASS `npm.cmd run lint:html`.
- PASS `npm.cmd run lint:js`.
- PASS `npm.cmd run test:frontend-smoke`.
- FAIL `npm.cmd run test:lighthouse:home`: Performance remained 88 and Accessibility 96
  against the existing 90/90 gate; prior committed Lighthouse report was already Performance
  88 with VM-392's formal waiver.
- PASS `npm.cmd run test:visual:home` after baseline refresh.
- PASS `npm.cmd run test:visual:archscry` after baseline refresh.
- PASS `npm.cmd run test:visual:strategium` after baseline refresh.
- PASS `npm.cmd run test:visual:apocrypha` after baseline refresh.

## Do Not Touch

- Generated data: `data/placement-model.json`, `data/factions.json`, raw faction sources,
  flavor snippets, evidence ledgers, Supabase functions.
- Open unrelated residuals: Temur wording, WITCH flavor verification, `witch.webp`,
  VM-295 repair.
- Page content, route behavior, placement scoring, Scryfall/deck-link flows, Supabase
  auth/session behavior, and Commander facts.

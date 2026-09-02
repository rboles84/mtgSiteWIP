# VM-619 — Opt-In Maze Guided Reading Implementation

**Status:** Done — Owner Accepted
**Implemented:** 2026-09-01
**Baseline:** `c36570f6b0bd9e254f43637660b7d467a277ef7b` on the sole worktree/branch `codex/vm-619-guided-reading-redteam`

## Owner acceptance

- Exact accepted product/validation candidate: `05ebc9021fed8dadd7dbb6f87255bddd605b0748`.
- The required first-release Windows NVDA manual accessibility gate passed after the final focus remediation. Exact NVDA and browser versions were not supplied in the acceptance packet and are not inferred.
- VoiceOver + Safari remains untested; no universal screen-reader certification is claimed.
- Lifecycle closeout changes no production, copy, interaction, Driver, Guide, Beacon, styling, or validation file after candidate binding.

## Result

The working Maze Beacon now makes one truthful, explicit offer: **Walk me through this search**. It navigates to `/guide/maze/?guided=maze-search`, where exactly four brief popovers orient the accepted translation, context, recovery, and useful-result sections. Direct `/guide/maze/` remains the complete static Guide and never starts Driver.

No automatic trigger, storage, account state, completion record, cookie, telemetry, product operation, query mutation, reading mutation, or `/guide/reading/` implementation was added. VM-620 and VM-617 remain outside scope.

## Architecture and lifecycle

- `assets/js/guide/maze-walkthrough.js` owns the sole supported ID, four selectors, concise copy, and local asset URLs.
- `assets/js/shared/guide-walkthrough.js` owns exact URL parsing, four-target preflight, lazy local asset loading, one active instance, Driver lifecycle, target-focus suppression/restoration, reduced-motion policy, URL cleanup, focus destinations, navigation teardown, and safe fallback.
- `guide/maze/index.html` adds only stable focus targets, the fourth section ID, and the Maze route module. It does not include Driver CSS/JS directly.
- Unsupported/duplicate `guided` values, missing targets, unavailable Driver API, asset errors, or Driver startup errors remove only `guided` with `history.replaceState` and leave the ordinary Guide intact.
- Every step focuses the enabled forward action (`Next`, then `Done`) after Driver renders the popover. Close and Escape focus the current section heading. Done focuses `#maze-guide-title` and scrolls the static page to the top; the route suppresses only the programmatic title outline so completion does not draw a page-sized decorative frame. Back/pagehide teardown does not rewrite the destination entry.
- OS `prefers-reduced-motion` and existing Vox Mana motion state disable Driver animation and smooth scrolling. A motion preference change during an active walkthrough cleanly ends it rather than starting a reconfiguration engine.

## Exact four steps

1. **Read the translation** → `#translation`
2. **See what affects the search** → `#context`
3. **Understand why it missed** → `#recovery`
4. **Act on a useful result** → `#maze-guide-results`

The popovers are orientation only. The highlighted static Guide sections remain visible and supply the teaching detail.

## Driver.js provenance and payload

Official npm package `driver.js` version **1.8.0**, MIT license, was obtained in OS temp with package scripts disabled, inspected, and reduced to three reviewed distribution files. The temp intake was removed. No package dependency or lockfile changed.

| File | Raw bytes | gzip | Brotli | SHA-256 |
| --- | ---: | ---: | ---: | --- |
| `assets/vendor/driverjs/1.8.0/driver.js.iife.js` | 25,483 | 7,244 | 6,476 | `C6ADE0B831C6C043DAF480861208CD2FA45EA4AAC581CC8BB8E234281C011DDF` |
| `assets/vendor/driverjs/1.8.0/driver.css` | 3,042 | 974 | 764 | `D095D440021FCF133AD46D37F18A2745FB76440F14F5208D17E203C039F765C9` |
| `assets/vendor/driverjs/1.8.0/LICENSE` | 1,067 | — | — | `EC3CE3A08736FEFD6A03A6D5B52B0705E6919FE06DE9D7BD3FB63DCFB492D76D` |

The guided-only Driver JS+CSS cost is 28,525 raw bytes / 8,218 gzip / 7,240 Brotli. Vox adapter/config/theme add 14,215 raw / 4,355 gzip / 3,640 Brotli. A static visit fetches only the 2,058-byte route config; the 9,445-byte shared helper, Driver, and 2,712-byte theme remain lazy until a URL contains `guided`. All VM-619/Driver requests are Vox-owned local paths. The harness aborts unrelated remote page requests and proves the new guided runtime introduces none.

## Interaction evidence

- Start focus: Driver Next button.
- Each new step focus: the enabled forward action (`Next`, then `Done`). Tab and Shift+Tab still reach Close and the available navigation controls and cycle only among visible Driver controls. Underlying target links are temporarily `tabindex=-1` and pointer-disabled without hiding explanatory text.
- Space: native Next, Previous, Close, and Done passed. Enter: Next passed. Arrow Right/Left: step navigation passed. Escape: passed from all four steps.
- Escape focus destinations: `#translation-title`, `#context-title`, `#recovery-title`, `#maze-next-title` respectively. Close on Step 3 focused `#recovery-title`. Done focused `#maze-guide-title` at the top with no visible title outline.
- Back during active tour returned to `/maze/`. Done then Back and Close then Back returned to `/maze/` with no guided/static loop.
- Refresh with the exact guided URL restarted Step 1; refresh after Done stayed static. Three same-page replays (Done, Close, Escape) produced one overlay each and no accumulated Driver DOM, handlers, focus suppression, or ARIA state.
- Exact unknown ID and a simulated missing Section II removed `guided` and stayed static. A blocked Driver JS request did the same with no overlay.
- 390×844, 768×900, and 1440×1000 passed without horizontal overflow; Section III remained usable through narrow→desktop→768 resizing. OS reduced motion used Driver `driver-simple`; a live Vox motion change cleanedly stopped the tour.

## Witnesses

- `outputs/vm619-owner-review/01-step-1-desktop.png`
- `outputs/vm619-owner-review/02-step-3-desktop.png`
- `outputs/vm619-owner-review/03-step-3-mobile-390x844.png`
- `outputs/vm619-owner-review/04-static-guide-after-done.png`

Reduced motion has no meaningful static screenshot difference; its non-animated Driver mode and near-zero computed transition duration are recorded by automation instead.

## Owner-finding regression

Owner Review exposed two presentation defects in the first candidate: Driver's default focus landed on Close instead of the forward action, and Done focused the full main container, producing a large gold frame around the page. The browser harness was tightened first and failed on those exact states. The implementation then moved step focus to Next/Done and completion focus to the static H1. The approved copy refinement also replaced Steps 2–3 without changing their descriptions. Focused automation, regenerated witnesses, and direct in-app browser interaction now prove the corrected behavior.

## Limits

- The required first-release Windows NVDA manual gate passed; its exact NVDA/browser versions were not supplied for the record.
- VoiceOver + Safari was unavailable and remains an explicitly unverified cross-platform limitation.
- The accepted candidate uses truthful `role=dialog` without `aria-modal`; the static target/background stays in the accessibility tree.
- This implementation is not a general tour framework and does not authorize a Reading Guide walkthrough.

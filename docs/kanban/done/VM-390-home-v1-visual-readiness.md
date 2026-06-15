# VM-390 - Home V1 Visual Readiness

ID: VM-390
Title: Home V1 Visual Readiness
Status: done
Type: Frontend / Visual Defect / Release Readiness
Area: Home, Identity Signal, Responsive Layout, Visual Regression
Priority: high
Created: 2026-06-14

## Summary

VM-389 is complete and Home now exposes all 37 v1 live placement identities, but the release is still blocked by Home horizontal overflow and `test:visual:home` failures. VM-390 promotes VM-154 into a focused v1 readiness pass: fix Home horizontal overflow, preserve VM-389 behavior, and classify any remaining Home visual diff without expanding into unrelated release blockers.

Dirty tree context: VM-387/388/389 changes and two untracked `docs/research/vox-mana-decomposition-*.html` prototypes are present and must be preserved.

## Pre-Flight Notes

- Recent related work: VM-389 promoted the Home Identity Signal from 20 to 37 entries and left visual/Home overflow as a blocker; VM-387/388 changed Apocrypha only; VM-154 recorded the earlier Home overflow evidence.
- Known risks: prior broad `html`/`body` containment fixed measured scroll width but exceeded the Home visual budget; Home visual compare is already red; dirty VM-387/388/389 work must not be reverted.
- Decisions already made: current branch is the intended release source of truth; no baseline refresh, commit, push, tag, placement, Maze, generated-data, API/schema, public route, Archscry, Strategium, or Apocrypha changes in VM-390.
- Files recently changed by related work: `data/identity-layers.json`, `assets/js/home.js`, Home tests/docs, Apocrypha CSS, board, and handoff index.
- Do not touch: placement/model/generated outputs, Maze behavior, public routes/aliases, visual baselines, Apocrypha/Archscry/Strategium runtime, or unrelated research prototypes.

## Scope

- Fix Home horizontal overflow only.
- Prefer `assets/css/home.css`; touch `index.html` or `assets/js/home.js` only if measurement proves CSS alone is unsafe.
- Prefer fixing the offending element with sizing, wrapping, `max-width`, `min-width: 0`, `overflow-wrap`, or grid/flex constraints before broad `overflow-x: hidden` on `body` or `html`.
- Preserve VM-389 behavior: 37 identities, Colorless profile pill, WUBRG overlay, hover/focus pause, held-signal details, reduced motion, Chart.js radar, and forced visual hooks.
- Do not refresh Home visual baselines unless the remaining diff is classified as intentional VM-389 visual drift and the waiver/update is explicitly documented.

## Measurement Log

Before fix, Home had horizontal document/body overflow at every measured non-wide width:

| Width | Document client/scroll | Body client/scroll | Overflow | Main source |
|---|---:|---:|---:|---|
| 375 | 360 / 402 | 360 / 402 | 42 | `.vm-hero-mana::before` created about `59px` internal panel overflow; chart wrapper had `38px` internal overflow. |
| 390 | 375 / 419 | 375 / 419 | 44 | `.vm-hero-mana::before` created about `61px` internal panel overflow. |
| 430 | 415 / 467 | 415 / 467 | 52 | `.vm-hero-mana::before` created about `69px` internal panel overflow; `#heroManaGlow` extended about `5.4px` each side. |
| 768 | 753 / 865 | 753 / 865 | 112 | Hero mana aura and `#heroManaGlow`; glow bounds about `left -52.7`, `right 805.7`. |
| 800 | 785 / 903 | 785 / 903 | 118 | `.vm-hero-mana::before` created `135px` internal panel overflow; `#heroManaGlow` bounds about `left -57.2`, `right 842.2`. |
| 1024 | 1009 / 1053 | 1009 / 1053 | 44 | `.vm-hero-mana::before` created about `61px` internal panel overflow. |
| 1440 | 1440 / 1440 | 1440 / 1440 | 0 | No document/body overflow. |

After fix, document and body overflow are clear at every target width:

| Width | Document client/scroll | Body client/scroll | Overflow |
|---|---:|---:|---:|
| 375 | 360 / 360 | 360 / 360 | 0 |
| 390 | 375 / 375 | 375 / 375 | 0 |
| 430 | 415 / 415 | 415 / 415 | 0 |
| 768 | 753 / 753 | 753 / 753 | 0 |
| 800 | 785 / 785 | 785 / 785 | 0 |
| 1024 | 1009 / 1009 | 1009 / 1009 | 0 |
| 1440 | 1440 / 1440 | 1440 / 1440 | 0 |

Changed selectors:

- `.vm-hero-mana::before`: changed horizontal inset from `-18%` to `0` so the decorative aura stays inside the panel's scrollable geometry.
- `.vm-chart-wrap.vm-hero-chart-wrap`: restored `overflow: hidden` so the hero radar glow remains clipped by the chart wrapper instead of widening the document.

No screenshots were added to tracked docs. The useful runtime captures are the untracked visual-regression artifacts from `npm.cmd run test:visual:home` under `artifacts/visual-regression/home/current` and `artifacts/visual-regression/home/diff`.

## Test Log

- Browser overflow probe - PASS: no document/body horizontal overflow at `375`, `390`, `430`, `768`, `800`, `1024`, and `1440`.
- Browser behavior probe - PASS: 37 Home preview identities, contiguous `preview_order` `0-36`, forced Boros capture still renders overlay/title, reduced motion reports `Still`.
- Accessibility spot-check - PASS: keyboard focus reaches `#heroManaSignalLatch`; Enter opens held-signal details; details are visible with `aria-expanded="true"`, `aria-pressed="true"`, and populated text.
- `npm.cmd run test:visual:home` - FAIL: mobile `59348`, tablet `100267`, desktop `132498` mismatched pixels against budget `300`.
- Visual failure classification: overflow is resolved; remaining failure is Home baseline drift from prior/VM-389 intentional Home Identity Signal changes and unrelated broad baseline drift, not a remaining horizontal overflow issue. No Home visual baseline was refreshed.
- `npm.cmd run test:frontend-smoke` - initial FAIL because the smoke guard still referenced the superseded VM-154 backlog path; fixed to the new done path, then PASS.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `node assets/js/quick-reading-tests.js` - PASS, 37 factions and 37 golden paths.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - PASS with line-ending warnings only.

## Acceptance Criteria

- [x] VM-154 overflow is resolved or explicitly superseded by VM-390 with evidence.
- [x] Home has no horizontal document/body overflow at measured mobile, tablet, 800px, and desktop widths.
- [x] `test:visual:home` passes, or any remaining failure is classified and documented as intentional VM-389 drift or unrelated baseline drift.
- [x] VM-389 Home Identity Signal behavior remains intact.
- [x] Keyboard focus states and held-signal details remain reachable after the overflow fix.
- [x] No placement, Maze, route, alias, schema/API, generated-data, Apocrypha, Archscry, Strategium, or baseline churn is introduced.
- [x] Required checks pass, or each remaining failure is documented with cause and next owner.

## Related

- Supersedes `docs/kanban/done/VM-154-home-hero-horizontal-overflow-containment.md`.
- Follows `docs/kanban/done/VM-389-v1-home-identity-signal-promotion.md`.

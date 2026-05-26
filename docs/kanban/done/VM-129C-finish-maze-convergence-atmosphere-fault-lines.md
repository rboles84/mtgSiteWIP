# VM-129C - Finish Maze Convergence and Patch the Atmosphere Fault Lines

Status: Done
Owner: Codex
Completed: 2026-05-25

## Summary

Converged `/maze/` on the current `newIndex2.html` / Strategium atmosphere family, added a shared rich stars-and-orbs runtime for routes that opt in, repaired the shared star-only canvas reuse guard, and minimally unblocked Archscry's hidden atmosphere layer without restyling Archscry into the Home/Strategium family.

## Acceptance Notes

- Maze now opts into `data-vm-atmosphere="rich"` and loads `assets/js/vm-rich-atmosphere.js`.
- Archscry now opts into the same rich runtime and no longer uses `data-bg-clean="true"`.
- `assets/js/atmosphere.js` now reuses an existing `.vm-bg__stars` canvas instead of exiting before sizing/painting it.
- Maze panel tones were moved away from teal-forward glass toward the black-glass/gold Home/Strategium language.
- Strategium was verified to already own a local stars-and-orbs runtime, so no second renderer was added.

## Tests

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node --check assets/js/vm-rich-atmosphere.js`
- `node --check assets/js/atmosphere.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:parser`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser/Puppeteer route checks for Maze desktop, Maze mobile, Archscry desktop, and reduced-motion static canvas rendering.

## Follow-Up

- Consider a later route-family atmosphere consolidation that retires duplicate local renderers from Home and Strategium once a shared visual baseline is fully agreed.
- Keep Apocrypha normalization separate; it intentionally remains its own archive branch after this pass.

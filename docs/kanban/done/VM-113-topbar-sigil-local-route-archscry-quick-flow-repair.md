# VM-113 - Topbar Sigil, Local Route, and Archscry Quick Flow Repair

ID: VM-113
Title: Topbar Sigil, Local Route, and Archscry Quick Flow Repair
Status: done
Type: Frontend / Routing Compatibility / UX Repair
Area: Shared Topbar, Local File Routing, Archscry
Priority: high
Created: 2026-05-24

## Summary

Replace the current topbar logo with a more site-appropriate Vox Mana sigil, restore explicit `index.html` targets for live local-file navigation, and make the Archscry quick-reading launch feel unmistakably open and working.

## Scope

- Replace `assets/img/vox-mana-header-logo.svg` with a refined static sigil better matched to the Vox Mana shell.
- Update live route links that currently target folders so local clicks open explicit `index.html` pages instead of directory listings.
- Update programmatic Archscry and Maze route helpers that still emit folder-style URLs.
- Tighten the Archscry quick-reading launch behavior so clicking the CTA clearly reveals and lands on the quiz section.

## Non-Goals

- Do not redesign the entire shared topbar again.
- Do not rename routes or re-open the Strategium move.
- Do not alter Archscry scoring, placement logic, or result generation.
- Do not rewrite historical done cards or archived handoffs.

## Acceptance Criteria

- The header uses a new Vox Mana sigil that reads cleanly in the topbar and feels appropriate to the site.
- Clicking live route links from local files opens explicit HTML pages rather than folder directory listings.
- Archscry quick reading visibly opens the quiz section when the CTA is clicked.
- Hosted/local-server navigation semantics remain intact.

## Outcome

- Replaced the live topbar logo asset with a new gold Vox Mana sigil tuned for the shared brand pill.
- Updated shared public-route links and route helpers to use explicit `index.html` targets, including footer legal links that still broke under `file://`.
- Added quick-reading scroll positioning so Archscry clearly lands on the first question when the CTA is pressed.

## Verification

- `node --check assets/js/index.js`
- `node --check assets/js/archscry-presentation.js`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Localhost browser smoke on `newIndex2.html` and `archscry/index.html`

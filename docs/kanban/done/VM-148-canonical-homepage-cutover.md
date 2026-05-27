# VM-148 - Canonical Homepage Cutover

ID: VM-148
Title: Canonical Homepage Cutover
Status: done
Type: Frontend / Routing
Area: Home, Route Ownership
Priority: high
Created: 2026-05-26
Completed: 2026-05-26

## Summary

Promoted the de-facto `newIndex2.html` homepage to the canonical root `index.html`, retired the old Three Doors root shell, updated route navigation and frontend harnesses, and preserved identity-registry work for VM-149.

## What Changed

- Deleted the old Three Doors `index.html`.
- Moved the Identity Signal homepage from `newIndex2.html` to `index.html`.
- Updated the new root Home/brand links to self-target `./index.html`.
- Updated Home links across Archscry, Maze, Strategium, Apocrypha, Privacy, and Terms to `../index.html`.
- Confirmed `/library/` remains a redirect shell to `/apocrypha/` and does not carry a Home topbar link.
- Removed old Three Doors-only `assets/css/home.css`, `assets/js/home.js`, and `assets/js/atmosphere.js` after reference checks.
- Retargeted HTML validation, frontend smoke, visual regression, and Lighthouse harness URLs from `/newIndex2.html` to `/index.html`.
- Updated living route ownership docs, route diagrams, method/data-flow references, manual QA notes, and active Kanban cards.
- Added VM-149 as the identity preview registry canonicalization follow-up.

## Non-Goals Preserved

- Did not migrate identity preview data into `identity-layers.json`.
- Did not widen placement institution kinds or color expansion schema.
- Did not extract Maze core, alter Strategium token behavior, or archive unrelated stale preview assets.
- Did not rename `assets/css/newindex2.css` or `assets/js/newindex2.js`.

## Verification

- `npm.cmd run lint:html` passed.
- `npm.cmd run lint:js` passed.
- `npm.cmd run test:frontend-smoke` passed.
- `npm.cmd test` passed.
- `npm.cmd run test:visual:newindex2` passed within the existing 300-pixel budget.
- `npm.cmd run test:lighthouse:newindex2` reached `/index.html` but hit the known `NO_FCP` failure; Edge cleanup then returned `taskkill` access denied, so the stuck Node process was stopped manually.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` passed with only existing CRLF warnings.

## Follow-Up

- VM-149 should canonicalize identity preview data before shard, wedge, or four-color expansion work.
- VM-088 is retargeted to Home but should re-check VM-149 before deepening Mana Lens data behavior.
- VM-017 is now a historical Three Doors prompt and must be re-triaged before implementation.

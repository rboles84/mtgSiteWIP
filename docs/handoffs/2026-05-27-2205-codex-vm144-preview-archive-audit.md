# 2026-05-27 22:05 - Codex - VM-144 Preview Archive Audit

## Agent name

Codex

## Task requested

Implement VM-144 by proving which preview-era assets are stale, archiving only confirmed obsolete active-path assets, updating current docs, preserving live route behavior, and recording the handoff trail.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2208-codex-vm146-cdn-font-review.md`
- `docs/handoffs/2026-05-26-2312-codex-vm143-route-ownership-matrix.md`
- `docs/handoffs/2026-05-26-2334-codex-vm148-canonical-homepage-cutover.md`
- `docs/handoffs/2026-05-27-0706-codex-vm149-identity-preview-registry.md`
- `docs/handoffs/2026-05-27-0730-codex-vm088-home-mana-lens-closeout.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-144-stale-preview-asset-archive-audit.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/design/asset-manifest.md`
- `docs/reference/manual-test-cases.md`
- Public route files, active `assets/` CSS/JS, validators, smoke tests, and Maze return/handoff code

## Files changed

- `assets/css/archscry.css`
- `assets/js/archscry-presentation.js`
- `scripts/lint-frontend-js.mjs`
- `research/archscry-adjacent-navigation-tests.js`
- `docs/reference/manual-test-cases.md`
- `docs/design/asset-manifest.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/research/archive/vm144-stale-preview-assets/README.md`
- `docs/research/archive/vm144-stale-preview-assets/assets/css/archscry-atlas.css`
- `docs/research/archive/vm144-stale-preview-assets/assets/css/home-preview.css`
- `docs/research/archive/vm144-stale-preview-assets/assets/js/archscry-index2.js`
- `docs/research/archive/vm144-stale-preview-assets/assets/js/home-preview.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-144-stale-preview-asset-archive-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-2205-codex-vm144-preview-archive-audit.md`

## What changed

- Moved VM-144 from backlog to in-progress before implementation, then to done after verification.
- Confirmed `archscry/index2.html`, `newIndex.html`, and `newIndex2.html` are absent as live route files.
- Moved the obsolete preview-only assets out of active `assets/` paths into a working-tree folder archive at `docs/research/archive/vm144-stale-preview-assets/`; this is not a ZIP, separate branch, or duplicate active-path copy.
- Added an archive README documenting original paths, proof of staleness, provenance-only rules, and recovery location.
- Removed `assets/js/archscry-index2.js` from the frontend JS lint target list.
- Removed the stale `/archscry/index2.html` branch from `buildArchscryMazeContext()` so Maze returns target `../archscry/index.html`.
- Added a regression assertion for the live Archscry return URL.
- Replaced the manual atlas-preview smoke pass with an archived-preview note.
- Updated current asset/route docs to distinguish archived preview assets from live `newindex2.css` / `newindex2.js` Home assets.
- Tightened the delivery record with explicit archive form, reference-scan evidence, doc-change summaries, proof pointers, and current git state.

## Reference scan summary

- Before VM-144, the operational/current-scope scan found 10 relevant references: three candidate active asset files, one stale `archscry.css` route comment, one `/archscry/index2.html` Maze return branch, two VM-144 backlog card references, one manual-test route reference, one lint target entry, and two live `newindex2` Lighthouse harness references.
- After VM-144, the current operational scan found 7 intentional references: four archived-asset rows in `docs/design/asset-manifest.md`, one archived-route note in `docs/reference/manual-test-cases.md`, and two live `docs/audits/lighthouse-newindex2.html` output references in `scripts/lighthouse-newindex2.mjs`.
- Broader remaining references are limited to provenance records in the VM-144 archive README, done card, this handoff, historical records, or current docs that explicitly identify the stale assets/routes as archived or removed.

## Current doc change summary

- `docs/reference/manual-test-cases.md`: replaced the stale `/archscry/index2.html` atlas smoke pass with an archived-preview note and current `/archscry/` plus Maze return guidance.
- `docs/design/asset-manifest.md`: added the archived preview asset table and preserved `assets/css/newindex2.css` / `assets/js/newindex2.js` as live Home assets.
- `docs/architecture/route-ownership-matrix.md`: updated the VM-144 follow-up note to say the stale preview assets were archived while live `newindex2` Home assets remain active.
- `docs/research/archive/vm144-stale-preview-assets/README.md`: records original paths, proof of staleness, provenance status, and recovery location for the archived files.

## Git state at record tightening

- Branch: `feature/ui-refactor-exploration`.
- Base HEAD at record time: `7e75e5f` (`VM-022: introduce Maze query contract spec and field inventory`).
- VM-144 changes are uncommitted in the working tree at this record-tightening pass.
- The working tree is dirty and also contains unrelated VM-146 documentation/card changes, so this handoff does not claim a clean tree.
- Final VM-144 commit hash should be recorded by the release/git steward after staging and committing VM-144 separately from unrelated work.

## Why it changed

The project had already removed the preview route files, but several preview-era assets and operational references remained in active locations. VM-144 preserves provenance while keeping active route, validator, and QA surfaces honest about what is live.

## Decisions made

- Treated `assets/css/newindex2.css` and `assets/js/newindex2.js` as live Home assets despite historical names.
- Treated `assets/js/archscry-presentation.js` as the only allowed live-code change.
- Left historical completed cards, old handoffs, and research snapshots unchanged for traceability.
- Classified `scripts/lighthouse-newindex2.mjs` and `docs/audits/lighthouse-newindex2.html` naming as live harness continuity, not stale route behavior.
- Treated the archive as a recoverable working-tree folder archive, not a release artifact, ZIP, or git branch.

## Risks / uncertainties

- `newindex2` route-asset and harness names remain historical and may merit a separate cleanup card.
- Restoring any archived preview asset would need a new scoped card and proof of live-route need.
- Maze return behavior is covered by static and automated checks, but no browser click-through was run because the automated smoke/test suite already covers the active contract and no unresolved `/archscry/index2.html` handoff path remained.

## Tests run

- Pre/post static reference scans for `archscry-atlas.css`, `archscry-index2.js`, `home-preview.css`, `home-preview.js`, `archscry/index2.html`, `index2.html`, and `newIndex.html`
- Targeted delivery-record scan after tightening confirmed the 7 intentional current operational references listed above.
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not touched

- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- Canonical Home route behavior
- Public route targets
- Placement scoring or generated data
- Maze parser/search/cache/stash/modal behavior
- Supabase schema, edge functions, or saved-profile contracts
- Historical done cards, old handoffs, and research snapshots
- MTG lore, card facts, commander facts, and product decisions

## Follow-up recommendations

- Open a separate cleanup card if the project wants to rename live `newindex2` Home assets and harnesses.
- Do not restore archived preview assets to active `assets/` paths without a new proof-first card.

## Next suggested agent

Release / Git steward

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-144-stale-preview-asset-archive-audit.md`
- `docs/research/archive/vm144-stale-preview-assets/README.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/design/asset-manifest.md`
- `docs/reference/manual-test-cases.md`

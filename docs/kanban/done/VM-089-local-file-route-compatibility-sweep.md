# VM-089 - Local File Route Compatibility Sweep

ID: VM-089
Title: Local File Route Compatibility Sweep
Status: done
Type: Frontend / Routing Compatibility
Area: Home / Archscry / Maze / Apocrypha
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Restore working navigation and asset loading when Vox Mana pages are opened directly from `file://` paths, without changing the canonical hosted route model.

## Source Evidence

- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/2026-05-20-0018-codex-vm068-preview-home-link-retarget-to-newindex2.md`
- `docs/handoffs/2026-05-20-1210-codex-archscry-placement-atlas-preview.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `newIndex2.html`
- `archscry/index.html`
- `archscry/index2.html`
- `maze/index.html`
- `apocrypha/index.html`

## Acceptance Criteria

- `newIndex2.html` route CTAs and top navigation open the intended local pages under `file://`.
- `archscry/index.html` and `archscry/index2.html` load local assets correctly and keep placement/dossier flows intact.
- Maze, Apocrypha, Privacy, and Terms topbars also resolve correctly under `file://`.
- Archscry-side programmatic jumps and dossier Maze handoff links stop using local-breaking root-absolute URLs.
- Hosted-style canonical routes remain unchanged in meaning when the site is served from a web root.

## Completion Notes

- Replaced root-absolute route links in `newIndex2.html` with root-relative-friendly local paths so preview-home CTAs and top navigation work when opened directly from disk.
- Converted home and route-page shared asset references to relative paths across `index.html`, `archscry/index.html`, `archscry/index2.html`, `maze/index.html`, `apocrypha/index.html`, `privacy/index.html`, and `terms/index.html`.
- Updated Archscry-side JS navigation and Maze handoff URL generation so local dossier-to-Maze flows and return links stay valid without changing hosted routing semantics.

## Tests Run

- `node --check assets/js/index.js`
- `node --check assets/js/archscry-presentation.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Notes

`git diff --check` only reported existing LF/CRLF normalization warnings.

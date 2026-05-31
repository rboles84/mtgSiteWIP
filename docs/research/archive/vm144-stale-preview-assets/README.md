# VM-144 Stale Preview Asset Archive

Archived: 2026-05-28
Related card: `docs/kanban/done/VM-144-stale-preview-asset-archive-audit.md`

This working-tree folder archive preserves preview-era frontend assets that were proven obsolete before removal from active `assets/` paths. It is not a ZIP, separate git branch, or duplicate active-path copy; recovery means copying a file from its preserved archive path back into the repo under a new scoped card.

## Archived Files

| Original path | Archive path | Classification | Proof |
|---|---|---|---|
| `assets/css/archscry-atlas.css` | `assets/css/archscry-atlas.css` | Obsolete Archscry atlas-preview stylesheet | The `/archscry/index2.html` route no longer exists; the only active references were this file's own selectors, a stale `archscry.css` comment, and the removed manual atlas preview note. |
| `assets/js/archscry-index2.js` | `assets/js/archscry-index2.js` | Obsolete Archscry atlas-preview runtime | The `/archscry/index2.html` route no longer exists; the only active reference was `scripts/lint-frontend-js.mjs`, which was updated to stop linting archived code. |
| `assets/css/home-preview.css` | `assets/css/home-preview.css` | Obsolete `newIndex.html` preview stylesheet | `newIndex.html` no longer exists as a live route; no live route, validator, smoke test, or current-behavior doc loads it. |
| `assets/js/home-preview.js` | `assets/js/home-preview.js` | Obsolete `newIndex.html` preview runtime | `newIndex.html` no longer exists as a live route; no live route, validator, smoke test, or current-behavior doc loads it. |

## Current Live Assets

Do not confuse these archived preview assets with the live Home route assets:

- `assets/css/newindex2.css`
- `assets/js/newindex2.js`

Those files are still loaded by canonical `index.html` and remain active until a separate route-asset rename card handles them.

## Archive Rule

These copies are provenance only. Do not edit them as active runtime files, and do not restore them to `assets/` without first creating or reopening a scoped card that proves a live route needs them.

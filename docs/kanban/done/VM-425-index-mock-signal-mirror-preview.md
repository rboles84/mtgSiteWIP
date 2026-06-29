# VM-425 - Index Mock Signal Mirror Preview

Status: Backed out

## Summary

Added a root-level `index_mock.html` preview beside the existing Home page so the Signal Mirror hero treatment could be reviewed in real time without changing the production `index.html` route. After owner review, the mock direction was rejected and the mock runtime files were removed.

## Backout

Backed out on 2026-06-28 at owner request. Removed:

- `index_mock.html`
- `assets/css/home-signal-mirror-mock.css`
- `assets/js/home-signal-mirror-mock.js`

The traceability docs remain so the rejected mock is not mistaken for missing work.

## Preflight

- Reviewed `AGENTS.md`, `docs/kanban/board.md`, `docs/handoffs/HANDOFF_INDEX.md`, VM-424 Home positioning, VM-407 Identity Radar, and VM-019 mock sandbox history.
- Ran `git status --short --branch` and confirmed a pre-existing dirty tree with unrelated VM-420/421/422/423/424 work.
- Ran a fresh collision scan for `VM-425`, `index_mock`, `home-signal-mirror-mock`, and `Signal Mirror`; no existing local VM-425/mock files were found.

## Scope Completed

- Added `index_mock.html` as an isolated copy of the current Home page.
- Kept `index.html` untouched.
- Added mock-only CSS in `assets/css/home-signal-mirror-mock.css`.
- Added mock-only JS in `assets/js/home-signal-mirror-mock.js`.
- Added a Signal Mirror strip under the not-a-deckbuilder line.
- Mirrored the existing Identity Signal title/formula by observing the Home signal DOM instead of changing `assets/js/home.js`.
- Highlighted active WUBRG axis colors on the mock only.
- Pointed mock Home/topbar self-links to `./index_mock.html`.
- Backed out the review mock after owner rejection by removing the mock page and mock-only assets.

## Acceptance

- No active VM-425 mock page or mock-only runtime asset remains.
- Production `index.html` remains untouched by the VM-425 backout.
- Existing Archscry, Maze, Apocrypha, Strategium, Privacy, and Terms links are unchanged.
- No production radar resolver, data, placement, Maze, Archscry, Supabase, generated artifact, or visual baseline behavior changed.

## Verification

- PASS `node --check assets/js/home-signal-mirror-mock.js`
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run test:frontend-smoke`
- PASS scoped `git diff --check -- index_mock.html assets/css/home-signal-mirror-mock.css assets/js/home-signal-mirror-mock.js docs/kanban/board.md docs/kanban/done/VM-425-index-mock-signal-mirror-preview.md docs/reference/manual-test-cases.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-28-1109-codex-vm425-index-mock-signal-mirror.md` with line-ending warnings only for pre-existing doc formatting behavior.
- PASS Edge/Puppeteer browser QA at `375`, `768`, and `1280` widths: mock loaded, radar/topbar present, no document/body horizontal overflow, Signal Mirror title/formula populated, WUBRG axis active state populated, route cards still `4`, and no hero CTA row.
- PASS live-cycle QA: Signal Mirror title/formula changed after the existing Identity Signal cycle at all three tested widths.
- PASS production Home isolation check: `/index.html` did not contain `.vm-signal-mirror` and retained title `Vox Mana`.
- PASS reduced-motion browser QA: Signal Mirror remained readable, the Identity Signal reported `Still`, WUBRG axis active state remained populated, and no overflow was detected.
- PASS backout check: `index_mock.html`, `assets/css/home-signal-mirror-mock.css`, and `assets/js/home-signal-mirror-mock.js` were removed.

## Not Touched

- `index.html`
- `assets/js/home.js`
- `assets/js/vm-radar.js`
- Placement/source JSON
- Generated data/artifacts
- Maze parser/search logic
- Archscry scoring
- Supabase save/deck-link plumbing
- Visual baselines
- Unrelated dirty VM-420/VM-421/VM-422/VM-423/VM-424 files
- Commits, pushes, or staged changes

## Related

- Removed: `index_mock.html`
- Removed: `assets/css/home-signal-mirror-mock.css`
- Removed: `assets/js/home-signal-mirror-mock.js`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-06-28-1109-codex-vm425-index-mock-signal-mirror.md`

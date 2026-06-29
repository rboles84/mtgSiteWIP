# 2026-06-28 11:09 - Codex - VM-425 Index Mock Signal Mirror Preview

Status: Backed out after owner review.

## Agent Name

Codex

## Task Requested

Implement VM-425 by wiring a fully working root-level `index_mock.html` Signal Mirror preview beside the existing `index.html`, with mock-only CSS/JS, no production Home changes, no radar/data behavior changes, and no commit/push/baseline refresh.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-1903-codex-vm424-homepage-positioning.md`
- `docs/handoffs/2026-06-16-1901-codex-vm407-identity-radar-v2.md`
- `docs/handoffs/2026-05-15-2113-codex-lightweight-mock-home-sandbox.md`
- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`

## Files Changed

- `index_mock.html`
- `assets/css/home-signal-mirror-mock.css`
- `assets/js/home-signal-mirror-mock.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-425-index-mock-signal-mirror-preview.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-28-1109-codex-vm425-index-mock-signal-mirror.md`

Runtime files later removed during backout:

- `index_mock.html`
- `assets/css/home-signal-mirror-mock.css`
- `assets/js/home-signal-mirror-mock.js`

## What Changed

- Created `index_mock.html` as a review-only Home mock.
- Added revised Signal Mirror hero copy and a `Current signal` strip below the not-a-deckbuilder line.
- Loaded mock-only CSS/JS after the normal Home assets.
- Observed the existing Identity Signal DOM to mirror the current title/formula and highlight WUBRG axis components.
- Retargeted only the mock's Home/topbar self-links to `./index_mock.html`.
- Added VM-425 Kanban/manual QA/handoff documentation.
- After owner review, removed the review-only mock page and mock-only assets, then marked VM-425 docs as backed out.

## Why It Changed

The VM-424 copy solved first-visit clarity but felt too static and generic in the hero. VM-425 gives the owner a real-time preview of a more distinctive Signal Mirror treatment while preserving production Home and the existing Identity Signal implementation.

The owner rejected the mock direction after review and asked for all mockup files to be removed. The runtime mock was deleted while the required project trail was preserved.

## Decisions Made

- Used `VM-425` after collision scan found no local conflicts.
- Kept the mock root-level and isolated for easy review/backout.
- Did not modify `index.html`, `assets/js/home.js`, `assets/js/vm-radar.js`, or identity data.
- Used MutationObserver against existing signal DOM instead of changing the Home signal lifecycle.
- Kept route-card CTAs as the only action surface; no hero CTA row was added.
- Kept the VM-425 board/card/handoff trail instead of deleting docs permanently, per AGENTS.md.

## Risks / Uncertainties

- `index_mock.html` was copied from the current dirty `index.html`, so it included the current local Home/topbar/feedback state by design before the backout.
- The repo had many unrelated dirty files before VM-425, including VM-420/421/422/423/424 work; they were preserved.
- The mock was rejected and removed; only the traceability docs remain.

## Tests Run

- `node --check assets/js/home-signal-mirror-mock.js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- Scoped `git diff --check -- index_mock.html assets/css/home-signal-mirror-mock.css assets/js/home-signal-mirror-mock.js docs/kanban/board.md docs/kanban/done/VM-425-index-mock-signal-mirror-preview.md docs/reference/manual-test-cases.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-28-1109-codex-vm425-index-mock-signal-mirror.md` - passed with line-ending warnings only.
- Started local static server on `http://127.0.0.1:8425/` using Python process `30748`.
- Edge/Puppeteer browser QA at `375`, `768`, and `1280` widths - passed for mock load, radar/topbar presence, no document/body horizontal overflow, populated Signal Mirror title/formula, populated WUBRG axis active state, four route cards, no hero CTA row, and mock Home/brand hrefs pointing to `./index_mock.html`.
- Live-cycle QA - passed; Signal Mirror title/formula changed after the existing Identity Signal cycle at all three tested widths.
- Production Home isolation check - passed; `/index.html` did not contain `.vm-signal-mirror` and retained title `Vox Mana`.
- Reduced-motion Edge/Puppeteer QA - passed; Signal Mirror remained readable, Identity Signal state reported `Still`, WUBRG axis active state stayed populated, and no overflow was detected.
- Backout file-removal check - passed; `index_mock.html`, `assets/css/home-signal-mirror-mock.css`, and `assets/js/home-signal-mirror-mock.js` no longer exist.

## Not Touched

- `index.html`
- `assets/js/home.js`
- `assets/js/vm-radar.js`
- Placement/source JSON
- Generated artifacts
- Maze parser/search logic
- Archscry scoring
- Supabase save/deck-link plumbing
- Visual baselines
- Unrelated dirty files
- Commits, pushes, or staged changes

## Follow-Up Recommendations

- Owner will revisit the main Home page direction later.
- Future Home hero experiments should use a new card and should not resurrect VM-425 unless explicitly requested.

## Next Suggested Agent

Owner direction for a future main Home page pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-425-index-mock-signal-mirror-preview.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-424 Homepage First-Visit Positioning
- VM-407 Identity Radar v2

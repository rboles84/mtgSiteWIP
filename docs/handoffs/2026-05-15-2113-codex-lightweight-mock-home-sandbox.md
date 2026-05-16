# Agent Handoff: Codex - Lightweight Mock Home Sandbox

Date: 2026-05-15 21:13
Related Card: VM-019
Related Plan: VM-017 Main Index Gateway Mockup Set
Status: Backed out

## Agent Name

Codex

## Task Requested

Use `AGENTS.md`, run preflight first, then create a disposable root-level mock homepage sandbox that stays separate from the live site. The sandbox should add `mock_index.html`, `mock_home.css`, and `mock_home.js`, keep the live homepage untouched, use the Vox Mana logo SVG by direct read-only file reference, keep the frame first-visit only, keep Apocrypha visible, and keep Maze as the central gateway focus.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-2016-codex-vm017-main-index-gateway-mockup-set.md`
- `docs/handoffs/2026-05-15-0914-codex-vm005-archscry-maze-continuity.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/mockups/homepage-gateway-mockup-set.md`
- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/img/backgrounds/background-vox-gateway-clean-13.webp`
- `C:\dev\projectFiles\vox-mana-logo-flame-orb-final.svg`

## Files Changed

- `mock_index.html` - added, then deleted after user rejected the sandbox direction.
- `mock_home.css` - added, then deleted after user rejected the sandbox direction.
- `mock_home.js` - added, then deleted after user rejected the sandbox direction.
- `docs/kanban/done/VM-019-lightweight-mock-home-sandbox.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-2113-codex-lightweight-mock-home-sandbox.md`

## What Changed

- Added a root-level `mock_index.html` file for direct local review.
- Added isolated mock styling in `mock_home.css`.
- Added lightweight first-visit motion in `mock_home.js`.
- Deleted the three mock files after the user rejected the direction.
- Linked shared token/font CSS read-only, with all mock-specific layout and presentation contained in the mock files.
- Referenced the existing gateway background image read-only.
- Referenced `C:\dev\projectFiles\vox-mana-logo-flame-orb-final.svg` directly from the mock header without editing or copying the SVG.
- Added VM-019 as a completed kanban tracker for the disposable sandbox and linked it back to VM-017.
- Added a VM-017 note that the lightweight first-visit sandbox does not close the full mockup-set scope.

## Why It Changed

The user wanted a low-risk visual sandbox for the home gateway direction before any production homepage changes. Keeping the mock in three root-level files makes rollback a simple file deletion and preserves the live route, existing home CSS, and existing home behavior.

## Decisions Made

- Keep the brand link inside the mock pointing back to `mock_index.html` instead of the live `/` route.
- Keep gateway destination links relative to the local repo files: `archscry/index.html`, `maze.html`, and `library/index.html`.
- Exclude returning-user logic and localStorage reads so the mock remains a first-visit frame only.
- Use only minimal pointer motion in the mock JS; no shared live homepage JS is loaded.
- Track this lightweight sandbox as VM-019 while keeping the broader VM-017 mockup set open.

## Risks / Uncertainties

- The first sandbox direction was not accepted by the user.
- The in-app browser blocked `file://` navigation under its URL policy, so direct visual review from disk still needs manual confirmation.
- The external SVG reference is intentionally local-only and depends on `C:\dev\projectFiles\vox-mana-logo-flame-orb-final.svg` existing on the review machine.
- The mock is not a production-ready responsive implementation; it is a first-visit review frame with basic responsive resilience only.

## Tests Run

- Completed AGENTS preflight against the handoff index, VM-017 handoff, kanban board/card, and homepage mockup brief.
- `Test-Path C:\dev\projectFiles\vox-mana-logo-flame-orb-final.svg` returned `True`.
- Confirmed `assets/img/backgrounds/background-vox-gateway-clean-13.webp` exists.
- Confirmed `mock_index.html`, `mock_home.css`, and `mock_home.js` did not already exist before creation.
- `git diff -- index.html assets/css/home.css assets/js/home.js` returned no diff.
- `Select-String` found no mock references to `href="/"`, `src="/"`, `assets/js/home`, `assets/css/home`, or returning-user localStorage keys.
- `Select-String` confirmed `mock_index.html` references `mock_home.css`, `mock_home.js`, the gateway background, and the direct logo SVG path.
- Attempted in-app browser `file:///C:/dev/mtgSiteWIP/mock_index.html`; browser policy blocked `file://` navigation, so no browser screenshot was captured.
- Deleted `mock_index.html`, `mock_home.css`, and `mock_home.js` as the documented sandbox backout path.

## Not Touched

- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `C:\dev\projectFiles\vox-mana-logo-flame-orb-final.svg`
- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- Archscry runtime behavior
- Maze parser, search behavior, and handoff contract
- Apocrypha runtime files
- Generated data

## Follow-Up Recommendations

- Open `mock_index.html` directly from disk in a normal local browser and confirm the logo, background, and gateway composition visually.
- If approved, cherry-pick only the desired ideas into the live home shell in a separate production implementation task.
- If rejected, delete `mock_index.html`, `mock_home.css`, and `mock_home.js`; docs tracker cleanup is optional and separate.

## Next Suggested Agent

UI Implementer or Human Reviewer

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-019-lightweight-mock-home-sandbox.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/mockups/homepage-gateway-mockup-set.md`
- `docs/handoffs/HANDOFF_INDEX.md`

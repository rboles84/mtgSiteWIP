# VM-122 - Strategium Commander Learning Console Redesign

ID: VM-122
Title: Strategium Commander Learning Console Redesign
Status: done
Type: Frontend / Content Architecture / Commander UX
Area: Strategium Route
Priority: high
Created: 2026-05-24
Completed: 2026-05-24

## Summary

Redesign `/strategium/` from a renamed Basics page into a Commander-focused learning console that teaches table readiness, deck behavior, threat assessment, pod communication, archetype signaling, and color perception at a Commander table.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-22-0051-codex-vm099-basics-field-guide-cleanup.md`
- `docs/handoffs/2026-05-24-1405-codex-vm112b-strategium-rename.md`
- `docs/handoffs/2026-05-24-1936-codex-vm120-container-queries-subgrid.md`
- `docs/handoffs/2026-05-15-1926-codex-vm015-returning-user-commander-fit-check.md`
- `docs/handoffs/2026-05-15-2106-codex-vm018-commander-table-fit-rule-zero-card.md`
- `docs/kanban/board.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `strategium/index.html`

## Pre-Implementation State

- `strategium/index.html` still carried the old VM-099 Basics-era structure and language.
- The hero still centered on generic color-system teaching rather than Commander table behavior.
- `Start Here` and `Color Philosophy Bridge` were still live, even after the route was renamed to Strategium.
- The page still loaded `../assets/js/graph.js` and carried a large inline Color Matrix, radar, and identity-selector runtime that no longer fit the approved Strategium direction.

## Scope

- Rebuild the Strategium hero, onboarding flow, console content model, pod-perception section, readiness checklist, and closing CTA.
- Remove the inherited Color Matrix, radar, and related page-local JS/CSS from Strategium.
- Preserve shared topbar behavior, route targets, footer routing, atmosphere, and the overall Vox Mana visual shell.
- Update the board, Project Atlas, manual QA docs, and handoff trail.

## Acceptance Criteria

- `/strategium/` clearly reads as a Commander-focused page rather than a renamed Basics route.
- The old hero pills, `Start Here`, and `Color Philosophy Bridge` are gone.
- The Strategium console uses Commander-specific topics and content.
- The route no longer depends on the removed local Chart.js learning-console machinery.
- The checklist is interactive, keyboard-reachable, and updates a readiness summary without persistence.
- Shared navigation, route links, atmosphere, and responsive behavior remain intact.

## Implementation Summary

- Rebuilt the hero around Commander table literacy with new `Table Readiness`, `Deck Behavior`, and `Threat Assessment` pills.
- Replaced the placeholder Commander block with a real three-card Commander-focused section for before, during, and after the game.
- Replaced the generic `Start Here` onboarding with a five-lane Commander entry-point section for new, returning, precon, brewer, and competitive-curious users.
- Reworked the Strategium console to use Commander-specific tabs: `Command Zone`, `Pod Readiness`, `Archetype Signal`, `Threat Reading`, and `Beyond WUBRG`.
- Removed the old Color Matrix and radar stack, plus the local `graph.js` dependency and related page-local chart logic.
- Replaced `Color Philosophy Bridge` with `How Your Colors Look to the Pod`, including a natural `Colorless` lane.
- Added an interactive `Commander Readiness Checklist` with local summary feedback and no persistence.
- Replaced the final CTA block with three next-move cards for dossier return, Archscry start, and Maze exploration.

## Non-Goals

- Do not change shared topbar behavior or route names.
- Do not add new persistence, deck import, or Archscry/Maze product logic.
- Do not implement `VM-015` or `VM-018` runtime behavior beyond using their product framing as copy guidance.

## Dependencies / Related Work

- `VM-090 - Split Homepage And Basics Experience`
- `VM-099 - Basics Page Field Guide Cleanup`
- `VM-112B - Strategium Rename`
- `VM-120 - Phase 6 Container Queries + Subgrid`
- `VM-015 - Returning User Commander Fit Check`
- `VM-018 - Commander Table Fit and Rule Zero Card`

## Files Changed

- `strategium/index.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-122-strategium-commander-learning-console-redesign.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`

## Verification

- `node --check` on a temporary extract of the inline Strategium script
- `npm.cmd run lint:html`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser QA on `http://127.0.0.1:4173/strategium/` confirming:
  - old `Start Here` and `Color Philosophy Bridge` copy is gone
  - the Strategium console swaps Commander-specific content cleanly
  - the readiness checklist updates its summary and keeps focus-visible interaction
  - the page emits no browser warning or error logs during the touched interactions
  - the mobile-width layout at `390x844` stacks cleanly without horizontal overflow
  - the end-state CTA targets resolve to `../archscry/index.html`, `../archscry/index.html`, and `../maze/index.html`

## Human Review

Yes - this card changes a live route's information architecture and should get a real browser pass for layout, motion, and Commander-copy usefulness before closeout.

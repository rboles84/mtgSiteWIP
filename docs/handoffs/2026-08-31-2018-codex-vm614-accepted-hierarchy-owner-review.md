# Codex Handoff - VM-614 Accepted Hierarchy Owner Review

- **Agent name:** Codex
- **Task requested:** Apply the bounded Owner Changes Required corrections to the existing VM-614 Guide candidate and stop at Owner Review.
- **Related work:** VM-614 Field Guide foundation and global discoverability
- **Disposition:** RobQA READY - Owner Review required

## Files Reviewed

- Repo-local RobDev and RobQA skills, usage guides, and frozen gates
- Browser skill for required rendered product review
- `docs/handoffs/HANDOFF_INDEX.md` and the current 11:37 and 13:41 VM-614 handoffs
- `docs/kanban/board.md` and the VM-614 card
- Owner-Accepted VM-613 Field Guide/onboarding contract
- Current Guide HTML/CSS, Maze shell CSS, focused validators, and browser smoke
- Current branch/worktree and protected-route/runtime state

## Files Changed by This Correction

- `guide/index.html`
- `assets/css/guide.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/guide-browser-smoke.mjs`
- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/kanban/board.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Restored **Understand Vox Mana** as the third approximately equal primary choice.
- Made that whole control an accessible `#how-vox-connects` anchor; activation moves focus to the map and lands below the sticky topbar.
- Moved Strategium back to secondary treatment alongside Apocrypha.
- Reordered the document and rendered flow to I // Where to begin -> II // How it connects -> III // Continue.
- Removed the standalone visible **Vox Mana Field Guide** hero label and duplicate optionality panel.
- Preserved the four-step Archscry -> Reading -> Dossier -> Maze sequence.
- Added a small unnumbered parallel-destination pair for Strategium and Apocrypha.
- Kept the final continuation section to existing reading, Strategium, and Apocrypha.

## Why It Changed

The prior candidate contradicted the accepted VM-613 primary hierarchy, rendered III before II, repeated hero/reassurance content, and relied on prose rather than visual structure to communicate that Strategium and Apocrypha are parallel specialist destinations.

## Decisions Made

- The explicit current owner instruction and accepted VM-613 hierarchy supersede the earlier Strategium-primary remediation.
- The Guide continues to inherit the Maze visual shell; only Guide composition adapters changed.
- The in-page product map is a valid primary Orientation destination because it now delivers the promised content, focus, and scroll state.
- Strategium and Apocrypha are intentionally repeated only in the map's subordinate parallel pair and the compact actionable continuation section.

## RobDev Compact Packet

- **Outcome:** a concise front door with the accepted three-choice hierarchy and ordered product map/continuations.
- **Owner/producer:** explicit owner correction plus accepted VM-613 contract; authored `guide/index.html` and route-local `guide.css` are the presentation owners.
- **Existing machinery reused:** Maze command deck, mode cards, main/sidebar glass surfaces, shared atmosphere, topbar, feedback, and reduced-motion infrastructure.
- **Changed behavior:** Guide copy/hierarchy, same-page Orientation navigation, section composition/order, and focused regression assertions.
- **Protected behavior:** shared navigation/Home Guide treatment, Home's four functional cards, all atmosphere, Archscry/dossier/Maze/Strategium/Apocrypha behavior, Placement, persistence, telemetry, `/library/`, and later Guide routes.
- **Consumers:** Guide desktop/mobile visitors, keyboard users, fragment/deep-link users, and focused VM-614 validation.
- **Risks:** anchor focus/scroll beneath the sticky topbar; visual dominance of the third card; secondary destinations accidentally reading as steps 05/06; mobile order/overflow; page-length growth.
- **Smallest complete implementation:** one Guide markup re-composition, route-local adapter changes, three focused invariant updates, and Owner Review records.
- **Non-goals:** no new Guide pages, architecture reopening, specialist content duplication, shared runtime changes, or VM-615-617 work.
- **Stop condition:** uncommitted RobQA-ready candidate returned to Owner Review.

## Tests Run

- `npm.cmd run lint:html` - PASS
- `npm.cmd run lint:js` - PASS
- `npm.cmd run test:frontend-smoke` - PASS
- `npm.cmd run test:route-metadata` - PASS, 11 public route heads
- `npm.cmd run test:copy-boundaries` - PASS, 30 live-copy files
- `npm.cmd run test:guide-browser` - PASS
- `git diff --check` - PASS with existing line-ending warnings only

## RobQA Readiness

- **QA tier:** QA-3 navigation/routing plus visible product UI.
- **Rendered desktop case:** 1440 x 1000, PASS; accepted hierarchy, I-II-III order, subordinate parallel pair, compact continuation, and no overflow.
- **Rendered mobile case:** 390 x 844, PASS; same hierarchy/order, natural stacked map, subordinate specialists, and no overflow.
- **Interaction:** visible Orientation control reaches `#how-vox-connects`, focuses the section, and exposes **How Vox Mana fits together** below the sticky topbar.
- **Keyboard:** skip target, primary-card order, Orientation activation, and visible focus pass.
- **Reduced motion:** inherited animation reduction passes.
- **200% zoom equivalent:** 720 CSS-pixel viewport containment passes.
- **Home invariant:** exactly four functional Home cards plus the separate Guide discovery treatment.
- **CPU-heavy validation:** NOT REQUIRED; no placement, semantic, state, or specialist runtime behavior changed.
- **Owner finding converted to invariant:** accepted primary titles/targets, I-II-III DOM/visual order, concise hero, no duplicate optionality panel, unnumbered parallel specialists, compact continuations, and Home four-card count are now guarded.
- **Remaining owner judgment:** final Guide product feel, wording, visual balance, and perceived restraint.

## Owner Review Criteria Self-Assessment

1. Three dominant choices match the accepted hierarchy: PASS.
2. Strategium reads as secondary: PASS.
3. Third choice lands naturally on the product map: PASS.
4. DOM and visual order are I -> II -> III: PASS.
5. Hero has one fewer visible title: PASS.
6. Duplicate optionality/reassurance is removed: PASS.
7. Strategium/Apocrypha appear as unnumbered parallel destinations: PASS.
8. Page remains a front door rather than a documentation portal: PASS in self-QA; final owner judgment remains.
9. Mobile preserves hierarchy without a desktop-style diagram: PASS.
10. Home remains exactly four functional product paths: PASS.

## Visual Witnesses

- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-owner-changes-r5-desktop.png`
- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-owner-changes-r5-mobile.png`

## Risks / Uncertainties

- Owner acceptance is still required; this task explicitly stops at Owner Review.
- The full VM-614 candidate remains uncommitted in the existing worktree.

## Not Touched

- Archscry, dossier, Maze, Strategium, Apocrypha, Placement, persistence, telemetry, and their runtime behavior
- Existing atmosphere, orb, mote, star, nebula, or route background behavior
- `/guide/reading/`, `/guide/maze/`, or `/guide/reference/`
- Commit, push, PR, merge, VM-615, VM-616, or VM-617

## Follow-up Recommendations

- Owner reviews only `http://127.0.0.1:4176/guide/` at an ordinary desktop and mobile width.
- If accepted, perform VM-614 closeout/integration only in a separately authorized run.

## Next Suggested Agent

Owner reviewer.

## Related Kanban, Docs, and Plans

- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/handoffs/2026-08-31-1341-codex-vm614-guide-findings-scope-correction.md`

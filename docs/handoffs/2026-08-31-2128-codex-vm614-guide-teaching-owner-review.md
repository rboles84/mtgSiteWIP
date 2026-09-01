# Codex Handoff - VM-614 Guide Teaching Owner Review

- **Agent name:** Codex
- **Task requested:** Apply the latest bounded VM-614 Owner Review, replace repeated Guide navigation with explanation and demonstration, rerun focused RobQA, and stop at Owner Review.
- **Related work:** VM-614 Field Guide foundation and global discoverability
- **Disposition:** RobQA READY - Owner Review required

## Files Reviewed

- Repo-local RobDev/RobQA skills, usage guides, and frozen gates
- Browser skill and current rendered Guide, Archscry, Maze, and Strategium surfaces
- Current VM-614 card, board, QA evidence, handoff index, and recent VM-614 handoffs
- Owner-Accepted Field Guide/onboarding contract and current Guide implementation
- Current Archscry dossier labels and deterministic public result flow
- Current Maze mode labels, query compiler, query tests, and Reading Finds language
- Current Strategium lifecycle and Commander Console labels
- Branch, worktree, status, and protected-route boundaries

## Files Changed by This Correction

- `guide/index.html`
- `assets/css/guide.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/guide-browser-smoke.mjs`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/kanban/board.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Removed the three equal primary router cards, the linked table-of-contents map, and the generic
  `III // Continue` cluster.
- Simplified the hero to the flavor designation, **Find your place. Shape your play.**, and one functional
  orientation sentence.
- Added alternating Archscry, Maze, and Strategium explanation/specimen sections.
- Added exactly one principal body CTA per Archscry, Maze, Strategium, and Apocrypha.
- Added a non-clickable Archscry -> Reading/Placement -> Dossier -> Maze relationship, with Strategium
  and Apocrypha visually subordinate as parallel/supporting lenses.
- Kept Apocrypha to one compact source continuation.

## Why It Changed

The prior candidate repeated navigation and destination names instead of teaching what each product does,
what it gives the player, and how the surfaces relate. The Owner explicitly superseded the equal-primary
Guide-only rendering constraint while preserving the accepted architecture and protected specialist
contracts.

## Decisions Made

- Static HTML/CSS specimens were the smallest truthful implementation: they remain responsive, need no
  interaction, cannot leak account state, and do not stale against screenshot cropping or saved sessions.
- The Archscry specimen uses generic current public process labels, not a named identity, score, answer,
  or live result.
- The Maze example uses the Owner-proposed query because the current compiler handles it deterministically.
- The relationship visual contains no links so it explains product roles rather than recreating routing.

## RobDev Compact Packet

- **Outcome:** `/guide/` teaches the major Vox Mana surfaces with genuine examples and restrained actions.
- **Owner/producer:** explicit latest Owner Review; authored Guide HTML/CSS owns presentation, while each
  specialist remains the semantic authority for its represented language.
- **Existing machinery reused:** Maze route shell, atmospheric background, glass surface primitives,
  shared topbar, feedback, reduced motion, and footer.
- **Changed behavior:** Guide content hierarchy, body copy, static specimens, CTA count/order, and
  relationship presentation.
- **Protected behavior:** Home and shared navigation, atmosphere, Archscry/dossier/Placement, Maze parser
  and state, Strategium, Apocrypha, persistence, telemetry, and all later Guide routes.
- **Consumers:** first-visit Guide readers, keyboard users, mobile/zoom users, and focused VM-614 checks.
- **Risks:** demo truth drift, personal-state leakage, repeated routing, page length, homogeneous panels,
  mobile compression, and relationship steps appearing mandatory.
- **Smallest complete implementation:** static route-local HTML/CSS plus focused assertions and records.
- **Non-goals:** no parser change, specialist edit, new Guide route, content expansion, runtime behavior,
  or VM-615-617 work.
- **Stop condition:** uncommitted RobQA-ready candidate returned to Owner Review.

## Specimen Sources

- **Archscry:** current public `Reading complete`, supported-direction, `Placement dossier`, and dossier
  directory language in `archscry/index.html` and `assets/js/archscry/runtime/`.
- **Maze:** current public mode labels in `maze/index.html`; current compiler
  `resolveMazeQueryRequest(mode=ai)` with grounding and semantics artifacts.
- **Strategium:** current lifecycle labels in `strategium/index.html` and current Console topic language.
- **Data safety:** all three are visibly labeled **Example**; no identity, score, account, saved reading,
  personal response, or fabricated live result is present.

## Exact Maze Demonstration

- Input: `Red vampires that sacrifice creatures.`
- Exact current output: `type:vampire type:creature c:r o:sacrifice`
- Parser mode: `plain_reading`
- Parser/runtime files changed: none

## Tests Run

- `npm.cmd run lint:html` - PASS
- `npm.cmd run lint:js` - PASS, 31 files
- `npm.cmd run test:frontend-smoke` - PASS
- `npm.cmd run test:route-metadata` - PASS, 11 public route heads
- `npm.cmd run test:copy-boundaries` - PASS, 30 live-copy files
- `npm.cmd run test:guide-browser` - PASS
- `git diff --check` - PASS, existing line-ending warnings only
- Unrelated CPU-heavy Placement/semantic/all-identity/mutation/recovery/journey suites - SKIP, not justified
- Known fresh-session Archscry browser-smoke gap - SKIP, out of VM-614 scope

## RobQA Readiness

- **QA tier:** QA-3 shared navigation/routing plus visible product UI.
- **Desktop:** 1440 x 1000 PASS.
- **Mobile:** 390 x 844 PASS; `scrollWidth === clientWidth === 390`.
- **Keyboard:** skip link and four product CTAs receive visible focus in product order.
- **Reduced motion:** CTA motion collapses under the media preference.
- **200% zoom equivalent:** 720 CSS-pixel viewport has no horizontal overflow.
- **Owner finding converted to invariant:** router/Continue absence, three labeled specimens, exact Maze
  output, four unique CTAs, non-link relationship, mobile stacking, and protected Home/routes are guarded.
- **Remaining owner judgment:** teaching clarity, example usefulness, relationship clarity, restraint, and
  overall visual/product fit.

## Visual Witnesses

- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-teaching-r6-desktop.png`
- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-teaching-r6-mobile.png`

## Risks / Uncertainties

- Owner acceptance is still required.
- The complete VM-614 candidate remains uncommitted in the existing worktree.

## Not Touched

- Archscry, dossier, Maze, Strategium, Apocrypha, Placement, persistence, telemetry, and specialist runtime
- Existing atmosphere on any route
- `/guide/reading/`, `/guide/maze/`, or `/guide/reference/`
- Commit, push, PR, merge, VM-615, VM-616, or VM-617

## Follow-up Recommendations

- Owner reviews only `http://127.0.0.1:4176/guide/` at ordinary desktop and mobile widths and judges the
  six questions recorded in the QA evidence.
- If accepted, perform VM-614 closeout/integration only in a separately authorized run.

## Next Suggested Agent

Owner reviewer.

## Related Kanban, Docs, and Plans

- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/handoffs/2026-08-31-2018-codex-vm614-accepted-hierarchy-owner-review.md`

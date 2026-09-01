# Codex Handoff - VM-614 Final Presentation Owner Review

- **Agent name:** Codex
- **Task requested:** Apply the final bounded VM-614 hero, readability, product-name, and three-mode Maze specimen corrections; rerun focused RobQA; stop at Owner Review.
- **Related work:** VM-614 Field Guide foundation and global discoverability
- **Disposition:** RobQA READY - Owner Review required

## Files Reviewed

- Repo-local RobDev/RobQA skills, usage guides, and frozen gates
- Browser skill and actual rendered Guide and Maze surfaces
- Current VM-614 card, board, QA evidence, handoff index, and latest VM-614 handoff
- Owner-accepted VM-613 contract and the locked seven-part Guide structure
- Current Plain Reading compiler result, public Operator's Hand example/semantics, and accepted Loom controls/runtime output
- Guide HTML, CSS, validators, browser smoke, branch, worktree, and protected boundaries

## Files Changed by This Correction

- `guide/index.html`
- `assets/css/guide.css`
- `assets/js/guide/guide.js` (new)
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/guide-browser-smoke.mjs`
- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/kanban/board.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Restored **A Planeswalker's Guide to Vox Mana** as the H1 beneath the codex flavor line, retained
  **Find your place. Shape your play.** as a subordinate brand line, and used the full Guide hero region.
- Foregrounded **Archscry · Commander direction**, **The Implicit Maze · Card discovery**, and
  **Strategium · Table literacy** while preserving the approved benefit-led headings.
- Strengthened only Guide-local teaching copy size, line height, contrast, paragraph rhythm/measure,
  question and specimen labels, CTA separation, and Strategium lane/chip legibility.
- Reused the single Maze specimen area for three button-selected states. Native buttons expose selected
  state and panel relationships, work by click/touch and keyboard, and do not depend on hover or motion.
- Preserved the approved relationship section and compact Apocrypha endcap without new interaction.

## Why It Changed

The teaching design was approved in substance, but the hero hierarchy obscured the page identity, product
names were too visually quiet, content-heavy sections needed stronger reading comfort, and the Maze area
named three real modes while showing only one. The Owner authorized only this bounded presentation pass.

## Decisions Made

- A native-button reveal is the smallest robust accessible pattern for this Guide-only illustration.
- The three Maze states are authored HTML/CSS specimens grounded in current public/runtime truth, not
  screenshots, parser calls, or reconstructed product behavior.
- The relationship-map interaction idea is recorded only as a possible VM-617 polish question; it is not
  implemented, committed scope, or a new card.

## RobDev Compact Packet

- **Outcome:** the existing teaching Guide has the correct identity hierarchy, readable product sections,
  and one truthful inspectable example for each current Maze mode.
- **Owner/producer:** the final Owner Review prompt controls scope; authored Guide HTML/CSS/JS owns only
  Guide presentation while specialist runtime remains the truth authority.
- **Existing machinery reused:** Maze route shell/atmosphere, shared typography and controls, current
  public labels/examples, native buttons, topbar, feedback, reduced motion, and footer.
- **Changed behavior:** Guide-local hero composition, product kickers, reading comfort, and specimen-state
  presentation.
- **Protected behavior:** Archscry, Placement, dossiers, Maze parser/modes/results/Reading Finds,
  Strategium, Apocrypha, persistence, telemetry, accounts, shared typography/atmosphere, and later routes.
- **Consumers:** desktop/mobile Guide visitors, keyboard/touch/reduced-motion/zoom users, and focused tests.
- **Risks:** example drift, tab-like control semantics, mobile compression, page length, and accidental
  product/runtime coupling.
- **Smallest complete implementation:** one Guide-local script, bounded Guide markup/CSS, focused
  regression assertions, rendered witnesses, and governance records.
- **Non-goals:** no redesign, new section, product CTA, parser/runtime change, map interaction, later Guide
  route, or VM-615-617 execution.
- **Stop condition:** uncommitted RobQA-ready candidate returned for subjective Owner judgment.

## Maze Mode Truth

- **Plain Reading:** current compiler; HTML/CSS specimen; `Red vampires that sacrifice creatures.` ->
  `type:vampire type:creature c:r o:sacrifice`; no parser/product semantic change.
- **Operator's Hand:** current public direct-query example/behavior; HTML/CSS specimen;
  `c:r kw:haste mv<=3 f:modern`; explicitly direct Scryfall syntax; no semantic interpretation or product
  change.
- **The Loom:** current accepted visible dimensions exercised in the runtime; HTML/CSS specimen; Red +
  Creature + Haste + Commander -> `id<=r t:creature f:commander kw:haste`; no Loom/query change.

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
- **Desktop:** 1440 x 1000 PASS after visual inspection.
- **Mobile:** 390 x 844 PASS; natural mode/lane/relationship stacking and no page overflow.
- **Keyboard:** skip/CTA order, visible mode focus, and Left/Right switching across exact states PASS.
- **Touch equivalent:** native-button activation at 390px PASS.
- **Reduced motion:** CTA and mode transitions collapse PASS.
- **200% zoom equivalent:** 720 CSS-pixel viewport has no horizontal overflow PASS.
- **Finding converted to invariant:** exact H1/tagline/product labels, body reading metrics, all mode states and
  queries, non-link relationship, compact structure, and protected route/runtime boundaries are guarded.
- **Remaining owner judgment:** hero identity/width, text readability, mode usefulness, Strategium
  readability, and overall restraint.

## Visual Witnesses

- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-final-r7-desktop.png`
- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-final-r7-mobile.png`
- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-final-r7-maze-plain.png`
- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-final-r7-maze-operator.png`
- `C:\Users\obake\.codex\visualizations\2026\08\31\01a05651-bc92-7c40-8ebd-bdfb6f20ba46\vm614-guide-final-r7-maze-loom.png`

## Risks / Uncertainties

- Subjective Owner acceptance is still required.
- The complete VM-614 candidate remains uncommitted in the continuing worktree.

## Not Touched

- Specialist HTML/CSS/JS, product semantics, state, persistence, telemetry, accounts, or atmosphere
- Relationship-map interaction or new VM-617 commitment/card
- `/guide/reading/`, `/guide/maze/`, `/guide/reference/`
- Commit, push, PR, merge, VM-615, VM-616, or VM-617

## Follow-up Recommendations

- Owner reviews `http://127.0.0.1:4176/guide/` and judges only the five product questions in the QA record.
- If accepted, perform VM-614 closeout/integration only in a separately authorized run.

## Next Suggested Agent

Owner reviewer.

## Related Kanban, Docs, and Plans

- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/handoffs/2026-08-31-2128-codex-vm614-guide-teaching-owner-review.md`

# VM-615 Reading and Dossier Onboarding — Owner Review Evidence

Date: 2026-08-31
Branch: `codex/vm-615-reading-dossier-onboarding`
Disposition: **RobQA PASS — Owner Accepted**
Accepted candidate: `8dcd6d2cb4861c3a13af8e9eb01c66253db5f617`

## RobQA classification

- QA-3 for contextual dossier navigation, canonical deep linking, and nested Guide current state.
- QA-1 for authored copy, route metadata, and the static teaching specimen.
- Changed behavior is limited to dossier orientation, one browsing-context sentence, and the optional
  `/guide/reading/` route.
- Placement, identity/dossier semantic truth, alternatives, persistence, accounts, telemetry, Maze,
  Strategium, Apocrypha, and `/library/` remain protected.

## Product outcome

VM-614 teaches what Archscry is. VM-615 now helps a player who already has a result choose one useful
question—understand the placement, choose a deck direction, compare Commander starting points, or keep
exploring cards—and opens the current dossier section that answers it. Optional depth at
`/guide/reading/` explains Placement and the dossier without becoming required onboarding.

## Result and dossier decisions

- **Result copy: NO CHANGE.** Current primary copy remains `Current best fit: {identity}` followed by
  `This is the identity your recorded answers favored most in this reading.` Close and legacy headings
  retain their existing bounded language.
- **Dossier orientation: VISIBLE COPY + EXISTING ACTIONS.** Exact heading is `What do you want from this
  result?` with the reassurance `You do not need to read every section. Start with the question that is
  useful now.`
- Goal mappings:
  - `Understand the result` → `Placement`
  - `Choose a first deck direction` → `Start Here`
  - `Compare Commander starting points` → `Commander Browsing Starts`
  - `Keep exploring with cards` → `Maze Discovery`
- Canonical optional link: `How to read your dossier →` → `/guide/reading/#dossier-map`.
- Commander Browsing Starts adds only: `These are places to begin browsing this direction, not a
  definitive ranking.`

## `/guide/reading/`

- Hero: `Read the result. Choose one next step.`
- I: bounded Placement explanation plus `Reading → Supported direction → Dossier` visual.
- II: three ordinary-player intent lanes for understanding, building, or continued exploration.
- III: neutral seven-section dossier anatomy with one question answered by each section.
- IV: compact return to Archscry or enter the Implicit Maze actions.
- The page contains no named/fabricated result, score, confidence percentage, methodology, Maze-mode
  explanation, Strategium block, or repeated VM-614 product overview.

## Explicit no-change decisions

- Archscry landing and questionnaire: no change.
- Placement result/state presentation: no change.
- Start Here: no change; current practical lane is already useful.
- Why This Fits: no identity-specific or evidence-language change.
- Card Signals: no content/data change.
- Mana Notes: no content/data change.
- Maze Discovery: no query, handoff, return, or Reading Finds change.
- Supported-alternative qualification/comparison: no change.
- Yore/four-color capability gating and directory-link suppression: no change.
- VM-618 topbar structure and interaction: no change; nested Guide uses the shared current-state mechanism.

## State honesty

- **Normal primary:** PASS — live stored Gruul result inspected in the in-app browser; Placement remains the
  default and outcome-first.
- **Supported alternative:** PASS — certified Jund close-result witness from
  `docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json` rendered through the production
  dossier. Public heading remains `Close result: Jund, with Gruul Clans also supported`; the alternative
  panel remains present.
- **Bounded/unusual:** PASS — local direct-review Yore renders its existing capability-gated dossier with
  Start Here and without a fabricated Placement result.
- **Fresh session:** LIMITATION — `npm.cmd run test:browser-smoke` reproduces the known timeout after storage
  reset during the desktop Archscry first-answer/progress transition. VM-615 does not claim complete
  fresh-user onboarding validation and does not repair that harness/runtime seam.

## Focused validation

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd run lint:html` | PASS | Public route semantics, assets, headings, nav, and landmarks. |
| `npm.cmd run lint:js` | PASS | 31 frontend files. |
| `npm.cmd run test:frontend-smoke` | PASS | Reading route is authorized; `/guide/maze/` and `/guide/reference/` remain absent. |
| `npm.cmd run test:route-metadata` | PASS | 12 public route heads including `/guide/reading/`. |
| `npm.cmd run test:copy-boundaries` | PASS | 30 live-copy files. |
| `npm.cmd run test:reading-guide` | PASS | VM-615 static/result/directory/route contract. |
| `npm.cmd run test:reading-guide-browser` | PASS | 1440/390, certified close state, Yore, keyboard, reduced motion, deep link, zoom-equivalent reflow. |
| `npm.cmd run test:guide-browser` | PASS | Accepted Guide/Maze inheritance and 200%-zoom contract remain intact. |
| In-app Back/Forward/refresh journey | PASS | `Start Here` survives Guide deep-link Back; Forward and refresh retain `#dossier-map`. |
| `git diff --check` | PASS | No whitespace errors. |
| `npm.cmd run test:browser-smoke` | KNOWN FAIL | Fresh-session first-answer/progress timeout; preserved limitation, no repair. |
| `npm.cmd run test:topbar-browser` | HARNESS BLOCKED | Could not overwrite locked prior VM-618 screenshot; VM-615 browser coverage independently passes nested current/mobile uniqueness. |
| `node tests/archscry/archscry-dossier-followup-tests.js` | BASELINE FAIL | Unchanged legacy assertion expects atlas copy absent from accepted `main`; no VM-615 repair. |

Unrelated all-37 generation, Placement mutation, synthetic calibration, semantic recovery, account, and live
service suites were skipped as unjustified.

## Rendered witnesses

- `outputs/owner-review/vm615-reading-dossier/guide-reading-desktop-1440x1000.png`
- `outputs/owner-review/vm615-reading-dossier/guide-reading-mobile-390x844.png`
- `outputs/owner-review/vm615-reading-dossier/dossier-orientation-desktop.png`
- `outputs/owner-review/vm615-reading-dossier/dossier-orientation-mobile.png`
- `outputs/owner-review/vm615-reading-dossier/dossier-close-result-desktop-1440x1000.png`
- `outputs/owner-review/vm615-reading-dossier/dossier-close-result-mobile-390x844.png`

## Local review

- `http://127.0.0.1:4176/archscry/index.html`
- `http://127.0.0.1:4176/guide/reading/index.html`
- `http://127.0.0.1:4176/guide/reading/index.html#dossier-map`

## Owner decisions

Judge only:

1. Placement wording.
2. Dossier-directory orientation.
3. Usefulness of the visual dossier anatomy.
4. Page restraint.
5. Whether VM-615 genuinely helps after the reading rather than repeating VM-614.

## Owner Review correction pass — 2026-09-01

- Hero semantic precision now reads: `Your result is a direction to inspect, not a verdict to obey.`
- The supported-direction specimen now reads: `The direction those answers support`.
- The skip link required no product/CSS change. A normal page load keeps it above the viewport; keyboard
  focus reveals it; activation focuses `#reading-guide-main`; and the destination remains below the sticky
  topbar. The browser regression now asserts all four states explicitly.
- The desktop witness capture now begins from a fresh document load after the keyboard exercise, so the
  normal-state screenshot no longer displays the focused skip link.
- Focused rerun: HTML lint, copy boundaries, VM-615 static regression, VM-615 browser regression,
  desktop/mobile rendered sanity, and `git diff --check` all pass.
- No dossier controls, Placement/dossier semantics, state, Maze, or other protected runtime behavior changed.
- Disposition advanced to **RobQA PASS — Owner Accepted** at exact candidate
  `8dcd6d2cb4861c3a13af8e9eb01c66253db5f617` on 2026-09-01.

## Owner-Accepted closeout — 2026-09-01

- The Owner accepted the complete reviewed VM-615 candidate exactly as rendered after the two bounded
  semantic corrections.
- Narrow closeout verification reconfirmed the exact hero/specimen copy, skip-link contract, route
  presence/absence, card/board lifecycle integrity, and unchanged accepted production files.
- The known fresh-session Archscry browser-smoke gap remains unresolved and is not included in VM-615's
  completed validation claim.
- No additional product, runtime, semantic, interaction, layout, copy, or onboarding change was made after
  the accepted candidate commit.

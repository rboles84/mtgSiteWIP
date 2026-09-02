# VM-619 Guided Reading — RobQA Owner Review

**Disposition:** RobQA PASS — Owner Accepted
**Acceptance:** ACCEPTED at exact candidate `05ebc9021fed8dadd7dbb6f87255bddd605b0748`
**Manual accessibility gate:** PASS — required first-release Windows NVDA review

## Acceptance binding

- Owner Accepted VM-619 on 2026-09-01 with no further product change authorized during closeout.
- Exact Owner-Accepted candidate: `05ebc9021fed8dadd7dbb6f87255bddd605b0748`.
- Manual environment as reported: Windows with NVDA. The acceptance packet did not supply the exact NVDA version or browser family/version; those values are intentionally not inferred.
- The required first-release manual screen-reader/accessibility review passed after the Next/Done and quiet-H1 focus remediation. No universal screen-reader certification is claimed.
- VoiceOver + Safari remains untested because that environment was unavailable; this is a cross-platform coverage limitation, not a PASS.
- Closeout updates lifecycle documentation only. Production and validation files remain identical to the accepted candidate.

## RobQA classification

- **Risk:** QA-2 interaction/accessibility candidate. The change is opt-in and stateless, but it temporarily controls focus, scrolling, history cleanup, target interaction, and a third-party overlay lifecycle.
- **Changed behavior:** exact Maze Beacon request, four-step Guide orientation, local lazy Driver lifecycle, forward-action focus, quiet completion focus, history/motion cleanup.
- **Protected contracts:** direct static Guide; accepted Maze/Guide content and Beacon signal; query/context/Reading Finds/Placement/account/telemetry behavior; VM-620 and VM-617; no persistence.
- **Smallest deterministic validation:** dedicated static/lifecycle and real-route browser harness; frontend JS/HTML lint; existing Guide browser smoke; existing VM-616 static and rendered contracts; restrained desktop/mobile witnesses; in-app Browser semantic and visual inspection.

## Automated results

| Command | Result |
| --- | --- |
| `npm.cmd run test:vm619-guided-reading` | PASS — exact four-step/static/vendor/hash/no-storage contracts |
| `npm.cmd run test:vm619-guided-reading-browser` | PASS — 20 requested start/exit/history/failure/motion/responsive/replay contracts |
| `node scripts/vm619-guide-walkthrough-browser.mjs --review` | PASS — same contract plus four review witnesses |
| `npm.cmd run lint:js` | PASS — 33 frontend files |
| `npm.cmd run lint:html` | PASS |
| `npm.cmd run test:guide-browser` | PASS |
| `npm.cmd run test:maze-onboarding` | PASS |
| `npm.cmd run test:maze-onboarding-browser` | PASS |
| `git diff --check` | PASS; line-ending notices only |

No Placement all-37, SIRF, parser mutation, semantic calibration, account/live-service, or other CPU-heavy suite was run because no protected semantic engine changed.

## Automated accessibility and cleanup evidence

- Popover is a dialog named by its visible title and described by its visible body. It does not claim false modal semantics.
- Close, Previous, Next, and Done are native buttons with explicit accessible names; focus-visible styling is a three-pixel high-contrast outline.
- Start/step focus lands on the enabled forward action (`Next`, then `Done`). Tab and Shift+Tab still reach Close and available navigation controls and cycle only through visible walkthrough controls because target actionables are temporarily removed from the tab order. Static explanatory content remains in the accessibility tree.
- Driver `disableActiveInteraction` plus scoped pointer suppression prevents highlighted Guide actions from navigating. The Section IV real link was both keyboard- and pointer-inert during the step and exactly restored afterward.
- Escape passes at all four steps, removes `guided`, removes overlay/popover/active classes/temporary ARIA, restores original `tabindex`, and focuses the current section heading.
- Done leaves `/guide/maze/`, no Driver DOM/ARIA/classes, scrolls to top, and focuses `#maze-guide-title` without a visible title/page outline. Close leaves the current reading position and focuses the current heading.
- Same-page Done→Close→Escape replay retains one Driver surface and no duplicated handlers/callbacks.
- OS and Vox motion mechanisms are honored; mid-tour preference change chooses clean stop over complex reconfiguration.

## Required Owner NVDA plan

Use Windows NVDA with current Firefox or Chrome:

1. From `/maze/`, generate the Query Inspector Beacon and activate **Walk me through this search**.
2. Confirm the initial dialog/title/body and Close/Next controls are announced sensibly.
3. Read Step 1 heading/body; activate Next; activate Previous.
4. Traverse all four steps and confirm Section I–IV target/background reading does not create confusing duplication.
5. Relaunch and press Escape from an active step; confirm focus announces that section heading and static Guide reading continues.
6. Relaunch, complete with Done, and confirm focus announces the main Guide/title at the top.
7. Read the ordinary static Guide afterward.
8. Inspect/confirm no stale Driver dialog, overlay semantics, `aria-controls`, or suppressed Guide link remains.
9. Report browser/version, NVDA version, announcement wording that was confusing, and any focus loss.

## Owner finding converted to regression

- **Observed:** Step focus appeared on Close rather than Next; Done returned to the top with a large gold frame around the main page.
- **Red evidence:** before implementation, the browser harness failed all 18 newly rendered forward-focus checks and the completion destination/outline check; the static suite failed on the approved copy contract.
- **Systemic invariant:** every rendered step owns focus on its enabled forward action, and completion owns focus on the static Guide title with no decorative page-sized focus frame.
- **Green evidence:** the focused browser and review harnesses, regenerated witnesses, compatibility suites, and an actual in-app Next→Next→Next→Done interaction all pass. The static descriptions remain unchanged while the headings read **Read**, **See**, **Understand**, **Act**.

If Mac/iPhone hardware becomes available, additionally test VoiceOver + Safari. Its absence is documented and does not silently count as a pass.

## Owner judgments resolved

The Owner accepted usefulness, four-step brevity, visual fit, focus/history lifecycle comfort, and the first opt-in guided-reading pattern exactly as tested.

1. Does **Walk me through this search** feel meaningfully better than being dropped onto the Guide?
2. Are the four steps short enough?
3. Does the Driver/Vox Mana presentation feel native rather than bolted on?
4. Are Close/Skip/Done/focus/history behaviors comfortable and unsurprising?
5. After the manual NVDA check, is this good enough to become Vox Mana's first accepted opt-in guided-reading pattern?

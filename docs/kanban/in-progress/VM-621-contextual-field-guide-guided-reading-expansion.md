# VM-621 — Contextual Field Guide Guided-Reading Expansion

ID: VM-621
Title: Contextual Field Guide Guided-Reading Expansion
Status: Owner Accepted — Combined Candidate Binding / Closeout In Progress
Type: Guided interaction / accessibility
Area: Field Guide, Home, Archscry dossier, shared guided-reading lifecycle
Priority: Owner finding
Created: 2026-09-01

## Summary

Owner accepted the reviewed combined VM-620 + VM-621 worktree on 2026-09-02 and authorized scope binding,
lifecycle closeout and branch push. Only the complete combined tip is integration-eligible; no PR/merge is
authorized yet. All accepted production/test files remain frozen. Earlier review restrictions are history.

Binding overlap: automatic approval rejected index-only reconstruction of intermediate URL/test strings.
Scope B therefore keeps mixed Home/dossier markup, package/lint/HTML/VM-615 checks and VM-620 destination
tests intact beside VM-621 configuration work. No working production/test bytes were rewritten. VM-620
retains visual/test ownership within those integration files; no technical inseparability is claimed.

Resolve the Owner-observed interaction mismatch exposed by VM-620: every contextual Field Guide Beacon
should deliver an explicit short orientation when clicked, then leave the player in the ordinary static
Guide. Extend the Owner-Accepted VM-619 pattern to the Home Guide and dossier-reading Guide without adding a
second engine or changing VM-620's visual-language ownership.

## Source / Owner Finding

Owner Review of VM-620 found:

> Shared visual recognition exposed a shared interaction expectation. Home and dossier Beacons currently
> look like the accepted Maze help affordance but do not provide equivalent guided orientation.

The Owner authorized Option 1 on 2026-09-01. VM-620 remains Owner Review Pending and retains the shared
Beacon signal; VM-621 owns the interaction resolution.

## Verified ID and sequencing

- Repository recon found no existing VM-621 card, branch, plan, report, QA record, or handoff. VM-621 is the
  next available ID.
- The sole active worktree is already on the uncommitted `codex/vm-620-shared-guide-beacon` branch. The
  single-active-branch rule prohibits a second related branch.
- Continue the same branch as one combined, unintegrated VM-620 + VM-621 initiative. Keep card ownership,
  tests, and evidence separate. Do not merge either card until both are accepted.

## Recon result

- `assets/js/shared/guide-walkthrough.js` already owns the accepted URL parsing, four-target preflight, lazy
  local Driver loading, focus suppression/restoration, Close/Escape/Done behavior, URL cleanup, history,
  reduced motion, failure fallback, and accessibility cleanup.
- The helper accepts route-local configuration and does not contain Maze semantics. It deliberately requires
  exactly four steps; both new static Guide authorities expose exactly four appropriate teaching sections.
- No framework, registry, generalized tour system, dependency, or helper redesign is required.

## Locked route contracts

### Home Beacon

- Beacon destination: `/guide/?guided=vox-mana-intro`.
- Direct `/guide/` remains static.
- Exactly four short steps using existing content:
  1. Archscry / Commander direction — `#guide-archscry`.
  2. The Implicit Maze / card discovery — `#guide-maze`.
  3. Strategium / table literacy — `#guide-strategium`.
  4. Product relationship and supporting Apocrypha role — `#how-vox-connects`.
- Done returns to the ordinary Guide top and focuses `#guide-title` quietly.

### Dossier Beacon

- Beacon destination: `/guide/reading/?guided=dossier-reading`.
- Direct `/guide/reading/` and the existing static `#dossier-map` deep link remain available separately.
- Exactly four short steps using existing accepted content:
  1. What the result means.
  2. Where to start.
  3. How the dossier is organized.
  4. What to do next.
- Done returns to the ordinary Reading Guide top and focuses `#reading-guide-title` quietly.

## Acceptance Criteria

1. Home and dossier Beacons retain VM-620's accepted shared visual signal but navigate to the exact explicit
   guided URLs above; no tour auto-launches on an ordinary static visit.
2. Each guided route presents exactly four concise route-owned steps over existing static Guide content,
   then leaves that ordinary Guide usable with `guided` removed.
3. Both routes reuse the accepted VM-619 helper, local Driver.js 1.8.0, theme, forward-action focus policy,
   Close/Escape/Done behavior, URL/history cleanup, reduced-motion behavior, missing-target/asset fallback,
   and target accessibility cleanup without a second engine or generalized framework.
4. Each route independently passes keyboard activation and traversal, Previous/Next/Done, Close/Escape,
   underlying-action suppression, focus restoration, cleanup, Back/refresh/replay, mobile, 200% reflow, and
   both reduced-motion mechanisms.
5. Static Guide content, dossier content/Placement semantics, Maze wording/configuration/vendor hashes,
   VM-620 Beacon lifecycle, navigation, persistence, telemetry, account state, and VM-617 remain unchanged.
6. Focused automation and rendered self-QA reach Owner Review Ready. Per the 2026-09-02 Owner decision,
   real screen-reader validation is NOT PERFORMED and is optional future audit coverage, not a review blocker.
   Owner keyboard/mechanical/visual testing and the final Home copy recheck passed; no final acceptance inferred.

## Non-Goals

- No automatic tour, first-visit launch, persistence, progress, completion state, telemetry, cookies, account
  state, or forced walkthrough.
- No Guide semantic-copy change, dossier-content change, Placement change, Maze change, Driver vendor change,
  second engine, generic tour framework, or VM-617 work.
- Do not remove or weaken VM-620's shared Beacon treatment.
- Do not commit, push, merge, or Owner Accept VM-620 or VM-621 without later explicit authorization.

## Risk / RobQA

- QA-3 navigation/state transition plus QA-2 focus/accessibility lifecycle.
- The Owner finding becomes this systemic invariant: every eligible contextual Field Guide Beacon must either
  launch its governed guided configuration or fail safely to the matching ordinary static Guide; it must not
  visually promise orientation and silently deep-link into documentation.
- CPU-heavy Placement/parser/semantic suites are not required because no semantic producer changes.

## Owner review update — 2026-09-02

Owner mechanically and visually approved the Home and dossier flows, subject to exactly two Home description
corrections (Steps 1 and 4). Apply the Owner's exact sentences without changing headings, step count, other
copy, URLs, interaction, styling, or shared/vendor code. QA-1: pin the two descriptions in the existing static
contract, run narrow static/HTML/copy checks and Home desktop/mobile render sanity. The earlier proposed
NVDA gate is superseded by the Owner's current optional-audit policy. No commit, push, merge or VM-617 work.

Both exact descriptions are now applied and pinned by a RED-before-GREEN static regression. PASS:
`test:vm621-guided-reading`, `lint:html`, `test:copy-boundaries`, Home Steps 1/4 rendered at 1440×1000 and
390×844, and `git diff --check`. Browser-suite rerun is not required for this copy patch because it does not
pin these descriptions. Pre/post comparison confirms exactly two Home string replacements, four steps, and
unchanged protected dossier/Maze/shared/vendor/HTML/Beacon files. Real screen-reader validation was not
performed; it is optional future audit coverage, not a review blocker under the Owner's current policy.
Owner subsequently took over remaining testing ("ill test dont worry about nvda on this"); agent validation
is complete and stopped at Owner Review. No NVDA PASS or final acceptance is inferred.

Owner subsequently reported PASS for the final Home Beacon → Steps 1/4 → Done → normal static Guide check,
with no further visible defect. Automated accessibility contracts and Owner keyboard/visual interaction
testing passed. Final combined static/browser regressions now pass, including the strengthened VM-621 suite
and VM-619 compatibility. See `docs/qa/2026-09-02-vm620-vm621-combined-owner-review.md`; both cards retain
separate ownership and await combined Owner judgment. Real screen-reader validation: NOT PERFORMED.

## Previous implementation evidence — 2026-09-01

- Implemented two small route-local configurations using the accepted shared helper unchanged. Home and
  dossier Beacons now use the exact guided URLs above. The static Guide HTML changed only for stable target
  IDs, programmatic heading focus, and route-adapter script loading; semantic content is unchanged.
- Extended the existing quiet completion-focus CSS selector to both H1s. No second engine or new dependency.
- Added VM-621 static/browser regressions and reconciled VM-615/620 and frontend assertions with the newly
  authorized URL/focus contracts.
- PASS: final HTML/JS lint, copy boundaries, route metadata, frontend smoke, VM-615 static, VM-619 static and
  vendor hashes, VM-620 static, VM-621 static, and patch whitespace checks.
- PASS: initial VM-621 browser run on the final runtime code independently exercised both routes and actual
  Home/certified-dossier Beacon clicks, keyboard, focus/cleanup, fallback, mobile/reflow, history, and motion.
- Subsequent test-only additions strengthen Home specimen suppression/restoration and Vox motion-at-startup
  coverage. Their rerun and a VM-619 browser rerun could not launch Chromium (process exited before pages
  opened, including an approved outside-sandbox retry). This is an environment limitation, not a product FAIL;
  those historical attempts did not execute the strengthened assertions. The final combined rerun now passes.
- In-app rendered desktop inspection clicked both four-step flows and confirmed forward-action focus and
  quiet Done-to-H1 cleanup. Owner volunteered to perform remaining visual testing; further browser probing
  stopped. The later Owner decision makes real screen-reader testing optional future audit coverage.
- See `docs/qa/2026-09-01-vm621-guided-reading-owner-review.md` for the bounded review and evidence disposition.
- Remains uncommitted/unmerged on the existing combined branch. Neither VM-620 nor VM-621 is Owner Accepted.

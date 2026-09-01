# VM-618 Guide Topbar Utility — Owner Review Handoff

Date: 2026-08-31 22:58 MDT
Agent: Codex
Status: RobQA READY — STOPPED AT OWNER REVIEW
Branch: `codex/vm-618-guide-topbar-utility`
Base/working HEAD: `12b1756c63f0d726868c4964fc78354eba0abad1` (no commit created)

## Task Requested

Apply the bounded post-VM-614 shared-topbar correction: keep only the five product destinations in the
desktop center pill, move literal Guide to the utility area immediately before Feedback, project Guide
exactly once into the mobile menu, and correct shared active-marker alignment without changing accepted
Guide/product content. Register the next available card, validate proportionally, and stop uncommitted at
Owner Review.

## Pre-Flight / Recent Related Work

- Read and applied the repo-local RobDev and RobQA skills and their frozen gates.
- Reviewed the current board, handoff index, VM-613/VM-614 cards and handoffs, accepted Field Guide
  contract, route ownership matrix, workflow, and token/reasoning control.
- VM-613 established the accepted onboarding hierarchy; VM-614 implemented and integrated the accepted
  teaching-first Guide. Its exact candidate remains immutable.
- VM-615, VM-616, and VM-617 are reserved by the accepted sequence and were not available for this work;
  VM-618 was the next usable card ID.
- Initial repository state was one clean `main` worktree at `12b1756c`; the task continues in that same
  worktree on one new branch, with no additional worktree.

## RobDev Compact Packet

- **Outcome:** distinguish primary product destinations from the Guide orientation utility while keeping
  Guide globally discoverable and making shared current-page markers optically correct.
- **Owning layer / producer:** authored canonical route headers, shared `vm-topbar.js` mobile projection
  and active-state producer, and shared `topbar.css` presentation.
- **Existing machinery reused:** `data-vm-nav`, route-relative links, current-state propagation, feedback
  insertion, menu focus/Escape lifecycle, and Reduce motion control.
- **Changed behavior:** Guide placement/projection/current presentation; shared primary-link spacing and
  marker/separator geometry only.
- **Protected behavior:** accepted Guide body, Archscry/Reading/dossier/Placement, Maze, Strategium,
  Apocrypha, Feedback modal, persistence, telemetry, `/library/` forwarding, and later Guide routes.
- **Consumers enumerated:** all 14 canonical public topbars at Home, Guide, Archscry, Maze, Strategium and
  its five subroutes, Apocrypha, Library, Privacy, and Terms.
- **Risk / stop:** cache freshness, route-depth drift, duplicate mobile Guide, focus regression, and
  responsive overflow; stop before redesign, VM-615–617, commit, push, PR, merge, or self-acceptance.

## Files Reviewed

- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`, `docs/workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md` and recent VM-613/VM-614 handoffs
- `docs/kanban/board.md`, VM-613 and VM-614 cards
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/architecture/route-ownership-matrix.md`
- all canonical topbar consumers, shared topbar CSS/JavaScript, Feedback JavaScript, and relevant checks

## Files Changed

### Production

- `assets/css/topbar.css`
- `assets/js/shared/vm-topbar.js`
- `index.html`
- `guide/index.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `strategium/find-a-table/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `apocrypha/index.html`
- `library/index.html`
- `privacy/index.html`
- `terms/index.html`

### Validation

- `scripts/validate-frontend-html.mjs`
- `scripts/guide-browser-smoke.mjs`
- `scripts/topbar-browser-smoke.mjs` (new)
- `package.json`

### Governance / Documentation

- `docs/kanban/in-progress/VM-618-guide-topbar-utility-active-indicator.md` (new)
- `docs/kanban/board.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/handoffs/2026-08-31-2258-codex-vm618-guide-topbar-owner-review.md` (new)
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- The desktop center navigation now contains exactly Home, Archscry, Maze, Strategium, and Apocrypha.
- Each canonical header now owns one literal Guide utility link immediately before the menu trigger;
  Feedback's existing initializer inserts Feedback between Guide and that trigger.
- The mobile menu projects the five primary links, then one Guide utility link, then the existing controls.
- Guide current state is preserved by the existing `data-vm-nav` mechanism and copied to mobile.
- Shared symmetric link spacing keeps the active marker under the rendered label and separator diamonds at
  the true inter-label midpoint.
- The shared topbar asset query is `vm618`, ensuring browsers receive the new mobile projection code.
- Static and browser regressions now enforce canonical order, utility placement, mobile uniqueness/current
  state, geometry, focus/Escape, reduced motion, and responsive containment.

## Why It Changed

The six-item desktop center pill conflated a product-orientation utility with five primary destinations,
and the inherited asymmetric left padding shifted the active marker from the visible label. Moving Guide
through the existing utility/mobile seams fixes hierarchy and geometry without reopening VM-613/614.

## Decisions Made

- Use one authored utility Guide link per canonical header instead of synthesizing it globally; this keeps
  route-relative URLs explicit and inspectable.
- Reuse the existing mobile projection instead of creating a second menu system.
- Keep active/separator correction entirely shared and symmetric; no route- or label-specific offsets.
- Advance both shared topbar CSS and JavaScript cache keys together after real-browser inspection exposed
  a cached pre-change JavaScript asset.

## RobQA Readiness

- **Tier:** QA-3 shared navigation/accessibility projection plus QA-1 precision styling.
- **Changed behavior tested:** desktop hierarchy/order/current state, utility order, mobile single Guide and
  ordering, active/separator geometry, keyboard focus, menu Escape/focus return, Reduce motion, cache key,
  and responsive/200%-zoom-equivalent containment.
- **Protected contracts tested:** 14 route `<main>` regions are byte-equivalent to `HEAD`; Guide/browser,
  frontend smoke, route metadata, and copy-boundary checks pass; later Guide routes remain absent.
- **CPU-heavy tests:** NOT REQUIRED. No semantic, Placement, identity, data, ranking, persistence, or
  telemetry producer changed.
- **Real manual finding converted to an invariant:** the first 390px in-app check received cached old
  topbar JavaScript and omitted Guide. Versioning the JavaScript URL repaired the actual browser, and the
  HTML validator now requires the VM-618 asset key on every canonical consumer.
- **Remaining Owner judgment:** confirm the restrained Guide utility treatment and active/separator optical
  balance in the three witnesses below.

## Tests Run

- `npm.cmd run lint:html` — PASS
- `npm.cmd run lint:js` — PASS
- `npm.cmd run test:frontend-smoke` — PASS
- `npm.cmd run test:route-metadata` — PASS
- `npm.cmd run test:copy-boundaries` — PASS
- `npm.cmd run test:guide-browser` — PASS
- `npm.cmd run test:topbar-browser` — PASS
- `git diff --check` — PASS
- All 14 current `<main>` regions compared with `HEAD` — PASS, unchanged
- VM-615–617 card/branch and later Guide-route absence checks — PASS

One final sandboxed browser rerun was denied `EPERM` while refreshing an ignored PNG witness. The same
unchanged browser suite passed immediately with its required approved local-browser/write permission;
this was an execution-environment boundary, not a product assertion failure.

## Rendered Witnesses

- `artifacts/vm618-topbar/guide-utility-desktop.png` — 1440×1000 Guide utility/current treatment
- `artifacts/vm618-topbar/archscry-active-marker-desktop.png` — 1440×1000 marker/separator alignment
- `artifacts/vm618-topbar/guide-mobile-menu-open.png` — 390×844 single Guide mobile projection

The ignored witness directory is local evidence and is not part of the candidate diff.

## Risks / Uncertainties

- Final optical approval remains an Owner judgment.
- Canonical topbars are still authored in 14 HTML files; the strengthened enumeration check now makes
  future drift deterministic, but deliberate new public routes must be added to that list.

## Not Touched

- Guide page body or accepted VM-614 presentation/content
- Archscry, Reading, dossier, Placement, Maze, Strategium, or Apocrypha product behavior
- Feedback modal implementation or behavior
- Persistence, telemetry, account state, data/schema/builders, or semantic sources
- `/library/` forwarding behavior
- `/guide/reading/`, `/guide/maze/`, or `/guide/reference/`
- VM-615, VM-616, or VM-617 cards/branches/work
- Commit, push, PR, merge, or Owner acceptance

## Follow-Up Recommendation

Owner should inspect the three bounded witnesses and the live Guide/topbar. If accepted, issue a separate
closeout/publication instruction. Do not continue into VM-615–617 from this task.

## Next Suggested Agent

Owner Review. No implementation agent should continue until a new explicit instruction is received.

## Related Card / Docs / Plans

- `docs/kanban/in-progress/VM-618-guide-topbar-utility-active-indicator.md`
- `docs/kanban/done/VM-613-field-guide-onboarding-contract.md`
- `docs/kanban/done/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/architecture/route-ownership-matrix.md`

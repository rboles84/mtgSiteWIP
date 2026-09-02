# VM-620 Shared Field Guide Beacon — Owner Review

**Status:** Owner Review Ready — VM-621 resolves the mismatch; combined final judgment pending
**Date:** 2026-09-01
**Branch:** `codex/vm-620-shared-guide-beacon`
**Baseline:** `9c572edb0232161c860ea199a508a73f99a5d6fd`
**Gates used:** repo-local `robdev` and `robqa`; `docs/dev/RobDevPass.md`; `docs/qa/RobQAPass.md`

## RobQA classification

- **Risk:** QA-2 for a shared, progressive-enhancement visual component, with bounded QA-3 regression protection for the accepted Maze recovery and guided-reading lifecycle.
- **Changed behavior:** three approved contextual Guide invitations now share a recognizable static anatomy and one visibility-triggered, finite signal per logical Beacon per page visit.
- **Protected contracts:** four Home product paths; four dossier decisions and tab behavior; Maze translation/recovery, Query Inspector, history, Finds, and exact guided URL; VM-619 four-step Driver lifecycle; ordinary desktop/mobile navigation; Guide content; Placement, persistence, account, and telemetry behavior.
- **Not changed:** product semantics, generated/canonical data, Guide content, Driver vendor files, Placement, parser/calibration, storage, telemetry, account behavior, or VM-617.
- **Review state:** final combined automation and Owner keyboard/mechanical/visual checks passed. Real screen-reader validation is NOT PERFORMED, optional future audit, not a blocker under the Owner decision. See [final combined packet](2026-09-02-vm620-vm621-combined-owner-review.md); neither card is Owner Accepted.

## Exact Beacon propagation

Received shared treatment:

1. Home new-player Guide invitation → `/guide/?guided=vox-mana-intro` (interaction owned by VM-621).
2. Archscry dossier reading help → `/guide/reading/?guided=dossier-reading` (interaction owned by VM-621).
3. Maze search help → `/guide/maze/?guided=maze-search`.

Intentionally left normal:

- all 16 desktop Guide utility actions;
- all generated mobile Guide navigation actions;
- all topbar brand/product navigation;
- Guide skip links and Back to top links;
- Guide product continuation CTAs;
- Guide-page `Field Guide` footer links;
- Home/Privacy/Terms footer and reference links;
- ordinary external source links;
- all other anchors.

The full occurrence-level classification is in `docs/reports/2026-09-01-vm620-guide-beacon-inventory.md`.

## Architecture and payload

- `assets/css/guide-beacon.css`: **5,375 bytes** raw.
- `assets/js/shared/guide-beacon.js`: **4,149 bytes** raw.
- Loaded only by Home, Archscry, and Maze.
- No dependency, framework, Driver coupling, storage, cookies, account state, telemetry, or analytics.
- `IntersectionObserver` threshold: 0.55. No observer support means quiet static usability.
- In-memory stable-ID `Set` prevents scroll and dynamic-rerender replay during the current page visit.
- `MutationObserver` attaches late-rendered dossier and Query Inspector nodes.
- Signal: one 4.8-second, three-beat pseudo-element sequence; no text/background blinking and no perpetual animation.
- Pointer/mouse entry and keyboard focus settle the sequence. OS and Vox reduced-motion settings suppress movement but preserve the static affordance.

## Original VM-620 validation (before VM-621 expansion)

| Check | Result | Scope |
| --- | --- | --- |
| `npm.cmd run lint:html` | PASS | Public HTML asset ownership, ordering, and semantics |
| `npm.cmd run lint:js` | PASS | Front-end JS lint |
| `npm.cmd run test:copy-boundaries` | PASS | Live-copy boundaries |
| `npm.cmd run test:route-metadata` | PASS | Public route metadata |
| `npm.cmd run test:frontend-smoke` | PASS | Guide/Home/Maze/Archscry and adjacent route smoke |
| `npm.cmd run test:guide-browser` | PASS | Static Guide semantics, navigation, interactions, mobile, motion, and reflow |
| `npm.cmd run test:topbar-browser` | PASS | VM-618 navigation, redirected to VM-620 evidence output |
| `npm.cmd run test:reading-guide` | PASS | VM-615 dossier onboarding contract |
| `npm.cmd run test:reading-guide-browser` | PASS | VM-615 rendered dossier/Guide contract, redirected to VM-620 evidence output |
| `npm.cmd run test:maze-onboarding` | PASS | VM-616 Maze context/recovery contract |
| `npm.cmd run test:maze-onboarding-browser` | PASS | VM-616 rendered recovery, Beacon no-replay, history, and Finds isolation; redirected output |
| `npm.cmd run test:vm619-guided-reading` | PASS | VM-619 exact static/lifecycle contract |
| `npm.cmd run test:vm619-guided-reading-browser -- --review` | PASS | Four steps, focus, keyboard, history, reduced motion, direct static route; redirected output |
| `npm.cmd run test:vm620-guide-beacon` | PASS | Exact approved owners, destinations, assets, finite lifecycle, fallback, and no propagation |
| `npm.cmd run test:vm620-guide-beacon-browser` | PASS | Visibility, once-per-visit, rerender, interaction, motion, mobile, 200% equivalent, no-JS, direct Maze Guide |
| `git diff --check` | PASS | Patch whitespace |

The accepted VM-615/616/619 and VM-618 browser harnesses now accept `VM_OWNER_REVIEW_OUTPUT` as an optional witness destination. Their original default paths are unchanged. All runs for this card were redirected beneath temporary `outputs/vm620-owner-review/regression-*` folders; those reproducible compatibility screenshots were removed after PASS so only the six restrained VM-620 witnesses remain. The three pre-existing untracked Owner Review directories were not written.

## Protected VM-619 proof

- Maze wording remains `FIELD GUIDE` / `Walk me through this search →`.
- Guided destination remains exactly `/guide/maze/?guided=maze-search`.
- The four-step Driver walkthrough passed its static and browser suites.
- Direct `/guide/maze/` remained static and did not create Driver DOM or load contextual Beacon assets.
- Driver.js 1.8.0 vendor hashes remain the accepted values:
  - `driver.js.iife.js`: `C6ADE0B831C6C043DAF480861208CD2FA45EA4AAC581CC8BB8E234281C011DDF`
  - `driver.css`: `D095D440021FCF133AD46D37F18A2745FB76440F14F5208D17E203C039F765C9`
- VM-621 now owns Home/dossier guided link destinations; neither invoking product route loads Driver.

## Rendered self-QA

All six restrained witnesses were inspected at actual route state:

| Surface | Desktop | Mobile | Judgment |
| --- | --- | --- | --- |
| Home | `outputs/vm620-owner-review/home-guide-beacon-desktop-1440x1000.png` | `outputs/vm620-owner-review/home-guide-beacon-mobile-390x844.png` | PASS — Beacon is clear above the grid, narrower and less substantial than the four product cards; no fifth-pillar reading or overflow |
| Archscry dossier | `outputs/vm620-owner-review/dossier-guide-beacon-desktop-1440x1000.png` | `outputs/vm620-owner-review/dossier-guide-beacon-mobile-390x844.png` | PASS — four decisions remain dominant; compact help is separate, secondary, wrapped, and contained |
| Maze Query Inspector | `outputs/vm620-owner-review/maze-guide-beacon-desktop-1440x1000.png` | `outputs/vm620-owner-review/maze-guide-beacon-mobile-390x844.png` | PASS — accepted wording/destination remain in context; translation and recovery stay primary; no overlap or overflow |

Browser assertions additionally passed at 720×500 (200%-zoom-equivalent reflow), OS reduced motion, Vox reduced motion, JavaScript disabled, reload, scroll-away/back, dossier rerender/panel change, and Query Inspector rerender.

## Required red-team answers

1. **Did navigation become a Beacon?** No. Utility and generated mobile Guide navigation lack Beacon classes, IDs, assets, and signal behavior.
2. **Does Home look like five product pillars?** No. The Beacon is a narrow orientation strip above the unchanged four-card grid.
3. **Does dossier help compete with four choices?** No. It is compact and separate; the question and four decision controls remain larger and earlier.
4. **Does Maze remain the accepted reference?** Yes. Copy, canonical instance, placement, guided URL, finite signal, rerender behavior, and Driver flow pass.
5. **Is the family recognizable?** Yes. All three share the rune, eyebrow, surface boundary, glow language, quiet state, and interaction behavior.
6. **Are variants appropriately different?** Yes. Entry, compact, and Maze modifiers preserve route-specific scale and placement.
7. **Does `FIELD GUIDE` add clutter?** No material issue found. It is a small recognition eyebrow and appears only on the three approved invitations.
8. **Can signaling burn below the fold?** No. It begins only after the logical Beacon meets the 55% visibility threshold.
9. **Can scrolling out/back replay it?** No. The stable logical ID is reserved before signaling and remains in the page-visit `Set`.
10. **Can dynamic rerender replay it?** No. Dossier and Query Inspector rerender tests pass with the same stable ID quiet.
11. **Does hover/focus end the signal?** Yes. Pointer/mouse entry and keyboard focus settle it and no automatic resume occurs.
12. **Any perpetual animation?** No. One finite 4.8-second sequence, one iteration.
13. **Is reduced-motion hierarchy obvious?** Yes. Both mechanisms remove animation while retaining the mark, eyebrow, boundary, copy, and focus treatment.
14. **Does text/background flash?** No. Only the non-interactive perimeter pseudo-element changes opacity/scale in three restrained beats.
15. **Does JS affect navigation?** No. Links are normal anchors; JS only assigns attention state.
16. **Does Driver.js still pass?** Yes. VM-619 static/browser suites pass, and vendor hashes are unchanged.
17. **Do Home/Archscry promise guided reading?** Yes, after the Owner-authorized VM-621 resolution. Each exact Beacon URL now launches its bounded four-step orientation; ordinary direct Guide visits remain static.
18. **Was VM-619 behavior implemented elsewhere?** The VM-619 lifecycle is reused unchanged by two route-local VM-621 configurations. Home and Archscry themselves still load no Driver assets, and no second engine was added.
19. **Was VM-617 touched?** No. It remains unstarted and outside the diff.
20. **Can a player recognize optional Field Guide help?** Self-QA says yes: the repeated anatomy is distinct from product actions and navigation. Final product judgment remains with the Owner.

## Skipped by design

- **SKIP:** full Placement/SIRF/parser calibration, exhaustive engine, mutation, journey, and synthetic suites. VM-620 changes no Placement, parser, generated data, search semantics, or recovery computation; running them would not add risk-proportional evidence.
- **SKIP:** VoiceOver/Safari. No suitable environment was available; VM-620 does not alter the accepted VM-619 accessibility disposition.

## Owner judgment — only these five questions

1. Do Home, Archscry, and Maze clearly look like members of the same Field Guide help family?
2. Is each Beacon noticeable without overpowering the actual task on its page?
3. Does the finite magical signal draw the eye without feeling like an ad or notification spam?
4. Do the entry, compact, and Maze variants preserve the correct hierarchy for each page?
5. Does the shared visual promise now match a useful short orientation on all three contextual Beacons?

## Original Owner finding — resolved by VM-621, final acceptance pending

Owner Review found that the shared visual language creates a shared interaction promise. Maze launches an
explicit guided reading, while Home opens the static Guide and dossier help drops directly at Section III.
That mismatch is MAJOR and prevents VM-620 acceptance. The Beacon treatment remains; verified follow-up
VM-621 owns the guided Home and dossier configurations. VM-620 and VM-621 must be reviewed and integrated as
one complete product outcome, with separate card ownership.

VM-621 implements that resolution; both flows and the final Home copy correction passed Owner review checks.
Final combined regressions now pass. Screen-reader testing was not performed and is optional/nonblocking
under the explicit 2026-09-02 Owner decision. The final combined packet governs current readiness, not acceptance.

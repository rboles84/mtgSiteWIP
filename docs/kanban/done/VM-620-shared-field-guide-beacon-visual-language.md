# VM-620 — Shared Field Guide Beacon Discoverability and Visual Language

ID: VM-620
Title: Shared Field Guide Beacon Discoverability and Visual Language
Status: Done — Owner Accepted
Type: Design-system discovery / contextual help
Area: Field Guide, Home, Archscry, Maze, shared UI
Priority: unranked
Created: 2026-09-01

## Accepted candidate — 2026-09-02

- VM-620 scope candidate: `db2c6ee3a77368ce25ec8994c66d791f83f8b1f9`.
- VM-621 scope candidate / combined Owner-Accepted deployable tip: `99ad6895400c858a6bfdd9cc99438b577950e4df`.
- RobQA PASS — Owner Accepted, based on explicit combined acceptance and the final combined evidence.
- VM-620 alone is not authorized for integration. Accepted only as a component of the combined VM-620 + VM-621 state.
- Scope B retains intact mixed Home/dossier markup and destination-validation files; VM-620 still owns their
  visual portions. Index-only reconstruction was denied, not claimed technically impossible.
- Automated/browser accessibility contracts: PASS. Owner keyboard/visual/mechanical review: PASS.
  Real screen-reader validation: NOT PERFORMED; optional future audit, nonblocking. VM-619 evidence unchanged.
- Paired lifecycle-only closeout follows the repository's combined-card precedent. Production/tests are
  unchanged after binding; output directories remain untracked. Branch push authorized; PR/merge is not.
- Exact file ownership and final verification: `docs/handoffs/2026-09-02-1033-codex-vm620-vm621-owner-accepted-closeout.md`.

## Binding and prior review history

Owner accepted the reviewed combined VM-620 + VM-621 worktree on 2026-09-02 and authorized scope binding,
lifecycle closeout and branch push. VM-620 scope is NOT independently authorized for integration; acceptance
applies only as a component of the final combined state. Product/test bytes are frozen during closeout.
Earlier review restrictions below are execution history, superseded only by this bounded closeout authority.

Binding overlap: automatic approval rejected reconstructing index-only intermediate URL/test strings.
No production/test file was rewritten. Pure VM-620 files form scope A; mixed Home/dossier markup, package/
lint/HTML/VM-615 checks and VM-620 destination tests remain intact in scope B with VM-621 configurations.
This is an honest file-level dependency boundary, not a claim that those hunks are technically inseparable.
VM-620 visual ownership does not transfer to VM-621 merely because final integration files land in scope B.

Current review update (2026-09-02): VM-621 resolves the interaction mismatch; all requested combined static/
browser regressions pass. Owner Home/dossier keyboard/mechanical/visual checks and final Home copy recheck
passed. Real screen-reader validation: NOT PERFORMED, optional future audit and not a review blocker under
the Owner decision. See `docs/qa/2026-09-02-vm620-vm621-combined-owner-review.md`. VM-620 remains visual-only;
at that review stage neither card was Owner Accepted. The exact combined acceptance above now governs.

Evaluate and, only after Owner approval, propagate a recognizable shared **Field Guide** beacon language to
legitimate optional contextual-help invitations without turning every Guide link into an oversized CTA.

## Source

- Owner VM-620 execution brief dated 2026-09-01 authorizes the bounded inventory, shared visual-language
  implementation, focused RobQA, and rendered Owner Review preparation described below.
- VM-616 Owner Review accepted the Maze Guide Beacon architecture and identified a broader cross-route
  discoverability requirement that is explicitly outside VM-616.
- VM-619 separately owns the future opt-in guided-reading/walkthrough concept; this card owns visual
  recognition and discoverability only.

## Initial Invitation Inventory

- Home: `New to Vox Mana?` / `Start with the Guide →` in `index.html`.
- Archscry dossier: `How to read your dossier →` in
  `assets/js/archscry/runtime/dossier-view.js`.
- Maze Query Inspector: accepted `Field Guide` / `Walk me through this search →` beacon in
  `assets/js/maze/research-ui.js`.

The implementation card must complete an actual contextual Guide-invitation inventory before deciding which
links legitimately receive the shared language. Ordinary navigation and footer links are not automatically
beacons.

## Pattern Questions

- Common `FIELD GUIDE` recognition and accessible rune/mark treatment.
- Shared gold border/glow hierarchy without materially enlarging compact invitations.
- Finite, restrained attention signaling with a permanent quiet state after presentation.
- Steady hover/focus states and reduced-motion behavior.
- Compact, inline, and layout-aware variants for different owning surfaces.
- Route-local versus shared CSS/component ownership and the smallest safe producer seam.

## Acceptance Criteria

1. Eligible Home, Archscry dossier, and Maze invitations share a recognizable Field Guide visual language
   without changing their route-specific meaning.
2. Home Guide help does not become a fifth product pillar, dossier help remains secondary to its four
   practical decisions, and Maze preserves its accepted Query Inspector/guided-reading hierarchy.
3. Each eligible logical Beacon may give one restrained visible signal per page visit when it can actually
   be seen, then settles; hover/focus stops it and reduced-motion users receive an equally understandable
   static affordance.
4. Common styling/attention machinery is reused without introducing a framework, persistence, telemetry,
   Driver coupling, or route-specific semantic logic; working links remain usable if enhancement JS fails.
5. VM-615 dossier behavior, VM-616 Maze recovery, VM-619 Maze guided reading, VM-618 navigation, Guide
   content, Placement, Maze semantics, persistence, and adjacent routes pass focused regression checks.

## Non-Goals

- No unrelated Home, Archscry, Maze, Guide, runtime or dependency redesign beyond the Owner-authorized
  contextual Beacon implementation; the original backlog-only restriction was superseded by execution authority.
- Do not implement guided reading, step sequencing, overlays, Driver.js, or the VM-619 product behavior.
- Do not convert every Guide/navigation/footer link into a beacon or oversized CTA.
- Do not change parser, query, dossier, reading, Placement, result, persistence, account, or telemetry
  behavior.

## Dependencies / Related Work

- Owner acceptance and integration of the VM-616 Maze beacon candidate.
- Accepted VM-613/614/615/618 Field Guide and navigation architecture.
- VM-619 remains separately governed for opt-in guided-reading behavior.
- VM-617 remains separately governed for reference, cross-links, and final onboarding validation.

## Risks / Uncertainties

- Over-propagation could make optional help visually louder than primary product actions.
- A shared abstraction could erase route-local density and layout needs.
- Replaying attention on rerender or repeat navigation could become distracting.
- Visual consistency must not imply a guided walkthrough where only a document link exists.

## Original implementation gate (historical)

The Owner authorized this bounded implementation pass. Stop at rendered Owner Review readiness: do not
self-accept, commit, push, merge, begin VM-617, extend Driver.js beyond Maze, or add guided reading to Home,
Archscry, or `/guide/reading/`.

## Implementation Result — 2026-09-01

- Repository and rendered-product inventory found exactly three eligible contextual invitations: Home,
  Archscry dossier help, and Maze search help. The occurrence-level classification is recorded in
  `docs/reports/2026-09-01-vm620-guide-beacon-inventory.md`.
- Added one shared progressive-enhancement owner: `assets/css/guide-beacon.css` and
  `assets/js/shared/guide-beacon.js`.
- All three variants share a rune, `FIELD GUIDE` eyebrow, bounded quiet surface, finite 4.8-second
  three-beat signal, steady interaction state, and both reduced-motion mechanisms. Stable logical IDs plus
  in-memory page-visit state prevent scroll and dynamic-rerender replay.
- Home remains above the unchanged four product paths; dossier help remains separate from its unchanged
  four decisions; Maze retains one canonical Beacon, accepted wording, exact guided URL, and Maze-only
  Driver behavior.
- All desktop/mobile utility navigation, Guide internal/continuation/footer links, and ordinary references
  remain normal.
- Shared payload is 5,375 raw CSS bytes plus 4,149 raw JS bytes and loads only on Home, Archscry, and Maze.

## Validation Result — Owner Review Ready

- PASS: HTML and JavaScript lint; copy boundaries; route metadata; frontend smoke; Guide and VM-618 topbar
  browser checks.
- PASS: VM-615 dossier static/browser, VM-616 Maze static/browser, and VM-619 guided-reading static/browser
  regressions.
- PASS: dedicated VM-620 static and browser contracts for exact propagation, visibility, finite/once-only
  lifecycle, rerender, hover/focus, reduced motion, no-JS fallback, mobile, 200%-equivalent reflow, and direct
  static `/guide/maze/`.
- PASS: six inspected Home/Archscry/Maze desktop/mobile witnesses under
  `outputs/vm620-owner-review/`.
- PASS: accepted Driver.js 1.8.0 SHA-256 hashes unchanged; VM-617 remains untouched.
- SKIP by risk classification: Placement/SIRF/parser calibration and unrelated exhaustive suites because no
  protected semantic producer or data changed.
- Full evidence and the five Owner-only judgment questions are in
  `docs/qa/2026-09-01-vm620-guide-beacon-owner-review.md`.

No self-acceptance, commit, push, merge, VM-617 work, new guided route, or Driver expansion occurred.

## Owner Review Finding — 2026-09-01

- **Observed:** Home and dossier Beacons use the same three-beat visual promise as the accepted Maze Beacon,
  but Home opens a static Guide and dossier help drops directly at Section III with no guided orientation.
- **Expected:** a contextual Field Guide Beacon should explicitly orient the player when clicked, then leave
  them in the ordinary static Guide.
- **Classification:** MAJOR product-promise mismatch. The VM-620 visual implementation is retained, but the
  card is not Owner Accepted and is no longer Owner Review Ready by itself.
- **Governed resolution:** verified follow-up VM-621 owns Home and dossier extension of the accepted VM-619
  guided-reading pattern. VM-620 remains visual-language-only.
- **Integration boundary:** do not merge VM-620 until VM-621 resolves the interaction mismatch and both cards
  complete their required review gates.

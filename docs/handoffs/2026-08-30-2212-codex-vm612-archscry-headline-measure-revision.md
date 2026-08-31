# VM-612 Archscry Headline Measure Revision - Owner Review Handoff

## Agent name

Codex

## Task requested

Use the available right-hand space in the Archscry landing card so the revised headline is not confined
to a narrow left column, while preserving the rest of the typography candidate and stopping without a
commit, push, or merge.

## Files reviewed

- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, `docs/qa/RobQAPass.md`
- VM-612 card, board, handoff index, typography handoff, and intro-copy revision handoff
- Owner screenshot at `C:/Users/obake/AppData/Local/Temp/codex-clipboard-df512102-3ca1-4d7b-868d-a4fa7596839a.png`
- `archscry/index.html`, `assets/css/archscry.css`, `scripts/validate-frontend-html.mjs`, current diff/status,
  and the rendered localhost start surface

## Files changed

- `assets/css/archscry.css`
- `archscry/index.html`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-612-semantic-typography-system-upgrade.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-08-30-2212-codex-vm612-archscry-headline-measure-revision.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Increased the route-local landing headline maximum measure from `14ch` to `21ch`.
- Advanced only the Archscry route stylesheet cache key from `vm612` to `vm612a` after a normal reload
  proved the browser retained the old rule.
- Updated the existing HTML validator's exact Archscry stylesheet and last-stylesheet expectations to
  the same `vm612a` URL.

## Why it changed

The owner identified that the desktop headline occupied a narrow left column while substantial usable
card width remained empty. The wrapper already spanned the available width; the `14ch` title cap was the
sole owning constraint.

## Decisions made

- Treated the red rectangle in the screenshot as visual annotation only.
- Changed the narrowest route-local owner rather than the shared font token, type size, card, or
  responsive system.
- Kept paragraph measures unchanged and relied on the existing mobile container to cap the wider title
  automatically.
- Did not add a breakpoint because the current container contract preserved mobile exactly.

## RobDev compact packet

- Outcome: the Archscry headline uses the formerly empty right-hand desktop space.
- Owner/producer: `assets/css/archscry.css` owns the route-local title measure; `archscry/index.html`
  owns the route stylesheet URL; the existing HTML validator protects that URL/order contract.
- Changed behavior: desktop/intermediate title wrapping and resulting landing-card height.
- Protected behavior: exact copy, Almendra family/weight/size, paragraph widths, CTA, mobile wrap,
  markup, accessibility, navigation, route/auth state, placement, scoring, dossier, comparison, and JS.
- Existing machinery: current landing selector, route cache-busting pattern, and HTML validator.
- Consumers inspected: live Archscry landing at 1440, 1180, 960, and 390px.
- Risks: edge crowding, horizontal overflow, awkward line balance, paragraph widening, and mobile drift.
- Smallest implementation: one CSS value, one route-local cache key, and two matching validator strings.
- Non-goals/not touched: shared tokens, fonts, other routes, card geometry rules, breakpoints, logic/data.

## Risks / uncertainties

- Final optical balance remains owner judgment.
- The panel becomes shorter because the desktop title uses three lines instead of five; this is the
  expected consequence of using the available horizontal space.

## RobQA readiness

- QA tier: QA-1 presentation.
- Changed behavior: route-local desktop/intermediate headline measure and wrap.
- Protected behavior intentionally untouched: copy, font treatment, paragraph/CTA measures, exact
  mobile geometry, structure, interaction/state, and all application/data contracts.
- CPU-heavy validation: `NOT REQUIRED`; no decision logic or protected engine behavior changed.
- Owner finding/invariant: an editorial hero should use its available card width at desktop without
  sacrificing readable line balance, edge clearance, or its existing narrow-width containment.
- Remaining owner judgment: whether the three-line desktop composition has the intended visual balance.

## Tests run

- PASS: baseline and post-change rendered geometry at 1440x1000, 1180x900, 960x806, and 390x844.
- PASS: 1440 title changed from five lines at 570.75px to three lines at 856.13px, with 74.88px between
  the title box and the card's right edge.
- PASS: 1180 and 960 both render balanced three-line titles with no horizontal document overflow.
- PASS: 390 title rect, five line rects, paragraph rects, note rect, CTA rect, and no-overflow result are
  unchanged from the pre-edit baseline.
- PASS: paragraph widths remain 701.08px at 1440/1180, 667.69px at 960, and 285px at 390; CTA width
  remains 180.84px.
- PASS: Almendra 700/title size treatment remained unchanged at every reviewed width.
- PASS: `npm.cmd run lint:html` after updating the exact cache-key guard.
- PASS: `git diff --check`.
- PASS: source guard finds `max-width: 21ch` and the `vm612a` route/validator contract; `14ch` is absent.
- Intentionally skipped: browser-smoke, placement, journey, synthetic, mutation, recovery, all-identity,
  and visual-baseline suites because no related behavior changed and VM-612 already records their
  separate harness status.

## Not touched

Approved landing copy; eyebrow, paragraph, and CTA styles; HTML structure/ARIA; shared typography
tokens and font assets; JavaScript; other routes; navigation/auth; placement/scoring; dossier/comparison
logic; data/generated files; visual baselines; git history; remote state.

## Follow-up recommendations

Owner reviews only `http://localhost:4174/archscry/` near 960px and at desktop width for final optical
balance. If accepted, disposition this revision with the larger uncommitted VM-612 candidate.

## Next suggested agent

Owner visual reviewer; then the planned VM-612 integration agent if the combined candidate is accepted.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-612-semantic-typography-system-upgrade.md`
- `docs/handoffs/2026-08-30-2154-codex-vm612-typography-owner-review.md`
- `docs/handoffs/2026-08-30-2204-codex-vm612-archscry-intro-copy-revision.md`
- `.agents/skills/robdev/SKILL.md` / `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md` / `docs/qa/RobQAPass.md`

## Branch / exact state

- Branch: `font-upgrade`
- Current HEAD: `960c3a2db27f5b4dd4cbae6cc5b0889235f3750b`
- Reviewed route: `http://localhost:4174/archscry/`
- Commit/push/merge: none

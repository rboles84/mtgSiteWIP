# VM-613 Field Guide and Onboarding Contract — Owner Review Handoff

## Agent name

Codex

## Task requested

Execute VM-613 as an architecture, product-contract, and runtime-recon card only: inspect current
repository/runtime truth, establish the Vox Mana Field Guide/onboarding authority, map journeys and
friction, reconcile related work, define VM-614 through VM-617, apply RobQA, and stop at Owner Review
without implementing `/guide/`, changing runtime, committing, pushing, self-accepting, or beginning
VM-614.

## Decision summary

The proposed architecture keeps Home's four functional paths and adds **Guide** as an optional,
persistent onboarding/product-literacy layer. Guide routes intent and explains cross-surface
relationships; functional and specialist surfaces continue to teach the interaction/state they own.

V1 remains four pages:

- `/guide/` — orientation and intent routing;
- `/guide/reading/` — Archscry -> Placement -> Dossier -> next direction;
- `/guide/maze/` — Plain Reading -> Operator's Hand -> Loom, context/results/recovery;
- `/guide/reference/` — compact terms, quick reference, and at most six recipes.

The top-level label is literal **Guide**. **Codex Vocifera** is flavor only. Guide is not a fifth
functional pillar, `/library/` remains Apocrypha compatibility, and Guide links instead of duplicating
Strategium or Apocrypha.

## Files reviewed

- repo-local RobDev/RobQA skills, usage guides, and frozen gates
- `AGENTS.md`, workflow, token/reasoning control, board, handoff index, and relevant cards/handoffs
- route ownership, project atlas, data flow, Maze contracts, current test plan, public route source
- Home, Archscry/dossier, Maze, Strategium, and Apocrypha at localhost desktop/mobile
- current all-37 Archscry evidence/manifest and representative White/Yore/Colorless screenshots
- PlayIRL Resources page as bounded comparative inspiration

## Files changed

- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/reports/2026-08-30-vm613-current-state-recon.md`
- `docs/design/2026-08-30-vm613-onboarding-maps.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`
- `docs/kanban/in-progress/VM-613-field-guide-onboarding-contract.md`
- `docs/kanban/board.md`
- this handoff and `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Established the candidate Guide authority, naming, route IA, writing rules, contextual-help decision
  rules, content ownership, accessibility, first-value model, and protected boundaries.
- Recorded five first-user journeys, 13 runtime witnesses, gaps that could not be reproduced safely, and
  the compact screenshot/route set worth owner review.
- Created a material-friction inventory and surface-by-surface contextual onboarding matrix.
- Reconciled VM-006, VM-007, VM-406, VM-547, VM-548, and relevant completed work without editing or
  closing any unrelated card.
- Defined implementation-ready VM-614 through VM-617 scopes with dependencies, non-goals, review gates,
  QA posture, and program stop conditions.

## Why it changed

Vox Mana's individual surfaces increasingly explain themselves, but first-time visitors still lack one
literal, retrievable map of what the product does, where to begin, how the major terms connect, and what
useful action follows a result. The candidate adds that authority without turning onboarding into a
tutorial gate or duplicating specialist content.

## Decisions made

- Accepted the proposed four-route V1 IA; recon found no need for one page per feature.
- Kept most teaching contextual: visible copy before an action, empty/recovery explanations after state,
  and Guide depth only when the explanation spans surfaces or is optional.
- Recommended “If unsure, start with Archscry” as advice, not forced navigation.
- Reserved `/library/` and all Apocrypha source-library responsibility.
- Capped V1 reference content at terminology, quick reference, minimal Scryfall-for-humans material, and
  at most six representative recipes.
- Classified direct Maze retention of dossier context as an owner/product-continuity choice rather than
  an automatic defect.

## RobDev compact packet

- **Outcome:** one durable onboarding authority plus evidence, maps, reconciliation, and implementation
  sequence; no product runtime.
- **Authority/owner:** owner VM-613 prompt and authored `docs/` contract package; specialist route,
  semantic, evidence, source, and persistence authorities remain controlling.
- **Changed behavior:** documentation, Kanban state, and handoff evidence only.
- **Protected behavior:** all Placement/scoring/evidence/qualification/stopping, dossier truth/SIRF,
  Maze parsing/query/results/persistence, saved readings/accounts, telemetry, Strategium, Apocrypha,
  `/library/`, shared nav/runtime, and production presentation.
- **Existing machinery:** current architecture/contracts, route/runtime evidence, VM-586 witnesses,
  shared workflow, RobDev/RobQA, and file-based Kanban.
- **Consumers:** future VM-614 through VM-617 planning and owner product decisions; no live consumer.
- **Risks:** Guide bloat, fifth-pillar framing, duplicated specialist authority, unsafe semantic
  explanation, and current fresh-Archscry harness drift. Each is explicitly bounded.
- **Non-goals/stop:** no `/guide/`, runtime, telemetry, new fixture/framework, VM-614, commit, or push;
  stop condition reached at Owner Review readiness.

## RobQA readiness packet

- **QA tier:** QA-0 documentation / non-runtime metadata.
- **Changed behavior:** durable product/repository guidance only.
- **Protected behavior intentionally untouched:** every production runtime and protected semantic/state
  contract listed above.
- **Realistic regressions checked:** false fifth-pillar framing; Strategium/Apocrypha duplication;
  `/library/` collision; lore-only discovery; V1 encyclopedia growth; front-loaded tutorial behavior;
  missing accessibility; unbounded follow-up cards; silent backlog supersession; accidental runtime file.
- **CPU-heavy validation:** `NOT REQUIRED`; no product or engine behavior changed.
- **Rendered evidence:** local runtime reviewed at 1440x1000 and 390x844 for Home, stored Colorless
  dossier, dossier -> Maze, Plain success/weak translation, Operator, Loom, Reading Finds empty,
  Strategium, Apocrypha, mobile menu, and reduced-motion pointer behavior.
- **Remaining owner judgment:** exactly the five decisions listed below.

## Tests run

- PASS: required contract/content assertions for naming, four paths, four-route IA, contextual help,
  specialist boundaries, accessibility, telemetry non-change, 13 witnesses, five related backlog cards,
  and VM-614 through VM-617.
- PASS: all referenced architecture/contract/manifest and three representative screenshot paths exist.
- PASS: candidate Markdown has no trailing whitespace or unresolved drafting placeholders.
- PASS: changed paths are documentation/metadata only; `guide/` does not exist.
- PASS: `git diff --check` (line-ending warning only).
- PASS: direct runtime/DOM inspection described in the recon report.
- FAIL — classified harness gap: `npm.cmd run test:browser-smoke` reached isolated Home, then timed out
  before fresh Archscry initialized; no result/dossier/Maze state was exercised by that run.
- Intentionally skipped: HTML/JS/placement/parser/all-identity/synthetic/mutation/recovery suites because
  VM-613 changes no runtime and current deterministic evidence already owns those protected baselines.

## Runtime evidence to inspect

Shortest owner set:

1. `/` at desktop and 390px: four-path framing and where a small Guide entry should live.
2. `/archscry/` stored/known result plus the White and Yore dossier screenshots below: where **How to
   read your dossier** belongs.
3. A dossier Maze path: mode cards, visible translation, result delivery, return action.
4. `/maze/` Loom at desktop: dossier context available/not applied and Current Weave.
5. Strategium `/strategium/` and Apocrypha `/apocrypha/`: confirm Guide should link, not duplicate.

Representative durable screenshots:

- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-30/evidence/dossier/screenshots/01-w.png`
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-30/evidence/dossier/screenshots/35-yore.png`
- `outputs/01a02cd6-bce7-7832-9558-3075c52f146a/archscry-current-state-2026-08-30/evidence/dossier/screenshots/36-colorless.png`

## Files to inspect

Read only these four candidate artifacts for product judgment:

1. `docs/contracts/field-guide-onboarding-contract.md`
2. `docs/design/2026-08-30-vm613-onboarding-maps.md`
3. `docs/reports/2026-08-30-vm613-current-state-recon.md`
4. `docs/plans/2026-08-30-vm613-field-guide-sequence.md`

## Key decisions requiring owner judgment

1. Confirm global order **Home · Guide · Archscry · The Implicit Maze · Strategium · Apocrypha**.
2. Confirm “If unsure, start with Archscry” as optional advice.
3. Choose the first **How to read your dossier** placement: result, directory, or one deduplicated
   treatment spanning both.
4. Decide whether direct `/maze/` should retain prior dossier context by default or explain/dismiss it
   more explicitly.
5. Confirm the `/guide/reference/` V1 cap of at most six recipes.

## Existing backlog impact

- **Independent:** VM-006, VM-007, VM-547, VM-548.
- **Governed by this contract after acceptance:** onboarding placement/copy portions of future Home,
  Archscry/dossier, Maze, Strategium/Apocrypha bridge work.
- **May be partly superseded later:** VM-406, but only after VM-615/617 are registered and the owner
  explicitly dispositions the old planning card.
- **Preserved completed baselines:** VM-424, VM-426, VM-449, VM-550/552, VM-591, VM-592, and Apocrypha
  source-library work.

## Proposed VM-614 scope

Guide foundation only: create `/guide/` with the accepted naming/intent router, add literal **Guide** to
shared desktop/mobile navigation in the accepted order, preserve Home's four cards, reuse current
tokens/typography/topbar/footer/reduced-motion machinery, add route metadata and focused navigation/
responsive/accessibility validation, and stop at Owner Review. Do not create the three deeper Guide
pages or modify functional-route onboarding in VM-614.

## Risks / uncertainties

- Fresh guest Quick Reading and context-free standalone Maze were not safely reproduced in the current
  in-app session; the existing isolated smoke harness also failed at Archscry initialization. These are
  explicit evidence gaps, not silent passes.
- Keyboard reduced-motion activation through the browser helper was inconclusive; pointer behavior and
  state restoration passed. A future visible change must receive a real keyboard pass.
- Subjective choices above remain unaccepted. RobQA READY is not owner acceptance.

## Not touched

All production HTML/CSS/JS/navigation/routes; `/guide/`; Placement/dossier/SIRF data or semantics;
Maze query/result/persistence; Reading Finds data; account/saved-reading behavior; telemetry;
Strategium/Apocrypha content; `/library/`; visual baselines; unrelated cards; branches/remotes.

## Follow-up recommendations

- Owner reviews the four candidate artifacts and five decisions.
- If accepted, register VM-614 only. Do not create VM-615 through VM-617 until their turn in the
  accepted sequence.
- Track the existing fresh-Archscry browser-smoke failure separately if it remains reproducible; do not
  fold harness repair into Guide product scope without explicit authorization.

## Next suggested agent

Owner product reviewer. After acceptance, a VM-614 implementation agent using RobDev and RobQA.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-613-field-guide-onboarding-contract.md`
- `docs/contracts/field-guide-onboarding-contract.md`
- `docs/reports/2026-08-30-vm613-current-state-recon.md`
- `docs/design/2026-08-30-vm613-onboarding-maps.md`
- `docs/plans/2026-08-30-vm613-field-guide-sequence.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

## Branch / exact state

- Branch/worktree: clean-start `main` worktree; no new branch/worktree created.
- Starting/runtime recon HEAD: `9625273081951cf7a95e52b4c400b6a69cb0e5d9`.
- Candidate: uncommitted documentation-only working tree.
- Commit/push/merge/deploy: none.

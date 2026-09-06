# VM-634 - Hide the Home Color Philosophy Strip

Historical Owner Review record. The subsequent [Owner acceptance and integration closeout](2026-09-06-0907-codex-vm634-owner-accepted-closeout.md) supersedes the pending lifecycle statements below; original acceptance criteria and QA evidence remain unchanged.

Agent name: Codex
Task requested: Implement the Owner-approved temporary hide of the complete Home philosophy strip with collapsed space, preserved implementation, and delivery through Owner Review only.

## Files reviewed

Reviewed the repo-local RobDev and RobQA skills and usage guides, frozen docs/dev/RobDevPass.md and docs/qa/RobQAPass.md, workflow and token-cost guidance, handoff index, board, VM-107 card and introduction handoff, VM-495 accessibility handoff, recent cursor-dimming handoff, Home HTML/CSS/JavaScript, shared reduced-motion script, HTML validator, and change-report validator.

## Files changed

- `assets/css/home.css`
- `docs/handoffs/2026-09-06-0818-codex-vm634-hide-home-color-axis.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-634-hide-home-color-axis.md`
- `index.html`
- `scripts/validate-frontend-html.mjs`

## What changed and why

The Owner wants the W/U/B/R/G philosophy strip unavailable in the UI for now. The authored Home wrapper carries hidden, and its scoped CSS guard sets display:none with important priority. This removes the full wrapper, its padding/margin footprint, and graphic accessibility exposure from ordinary presentation from initial HTML, without JavaScript timing. The wrapper retains role=img and its existing accessible label for restoration. Home's stylesheet key is vm634, with the three existing HTML-validator expectations updated accordingly.

## Decisions and RobDev packet

- Authority: the Owner-approved plan; authored index.html and assets/css/home.css are the presentation owners. No generated producer is involved.
- Reuse: native hidden state and a scoped route CSS rule; no new flag, dependency, runtime path, or framework.
- Changed behavior: hide the complete philosophy strip and collapse its footprint for every user and viewport.
- Protected behavior and consumers: full SVG/labels, animation definitions, Home initialization, Identity Signal, copy, parent hero layout, navigation, Guide Beacon, cursor ambience, reduced-motion behavior, routes, storage, data, and placement/semantic authorities.
- Plausible risks: hiding only the SVG could leave its wrapper footprint or accessible label; a display override could reveal it. The owning wrapper and unconditional important guard address both.
- Restoration: remove only hidden from the vm-color-axis wrapper in index.html. Keep the SVG, CSS and initializer. The guard no longer matches after restoration.
- Non-goals/stop conditions: no redraw, animation optimization, surrounding layout adjustment, data change, shared behavior change, or integration. Stop if unrelated work or protected authority becomes implicated.
- Repository pre-flight: clean main at admission; sole registered checkout; existing vm-623, vm-625, and font-upgrade branches are unrelated. Created one VM-634 branch in the same checkout to preserve accepted main.

## Tests run

Development: npm.cmd run lint:html and git diff --check passed. A one-off Node assertion compared baseline and working files after normalizing line endings: Home HTML differs only by the hidden attribute, restoration comment, and cache key; CSS differs only by the unconditional hidden guard; Home JavaScript is unchanged; the validator differs only by Home's cache expectations. Source inspection found no reactivation of the axis wrapper.

Distinct post-commit RobQA: re-read the actual candidate diff and card acceptance criteria, verified the admission baseline equals merge-base(candidate, main), and reran the focused preservation assertions, npm.cmd run lint:html, and git diff --check baseline..candidate. All passed at b2a2441970470e20b42311cc58117c43566b582b with a clean candidate checkout. Native hidden semantics and the unconditional display:none guard establish no layout box or accessibility exposure without a JS dependency. No browser or screen-reader execution is claimed.

## RobQA readiness and Owner review

QA tier: QA-1 presentation.
QA execution: SAME-AGENT DISTINCT PHASE, Codex; bounded route-local visibility change with no governance, shared behavior, security, migration, semantic, or significant integration trigger.
Candidate and verdict: PASS at b2a2441970470e20b42311cc58117c43566b582b; Owner PENDING. No correctness findings or implementation blockers.
CPU-heavy validation: NOT REQUIRED.
Browser justification: none; initial hidden markup, scoped unconditional display guard, and source preservation cover the objective contract below the browser layer. No browser/screen-reader execution or visual acceptance is claimed.
Skipped: screenshots, visual regression, viewport matrices, animation-fidelity waits, browser smoke, and engine suites; none protects an additional changed risk here. The prior cursor-dimming handoff's Home-canvas smoke failure was not rerun or investigated.
Owner finding converted to invariant: none; this is an approved product preference, not a reported defect.
Remaining Owner judgment: the hero's visual balance after collapsing the strip.

Purpose: Judge the resulting Home hero spacing.
Open: / on the local VM-634 checkout.
Starting state: load or refresh Home.
Do: Inspect the intro area beneath the hero copy beside the Identity Signal panel.
PASS if: the spacing feels acceptable with the philosophy strip absent.
FAIL if: the new spacing needs an Owner-directed adjustment.

## Risks / uncertainties

No known implementation blocker. Subjective spacing remains Owner judgment. Hiding preserves the shipped source; it is not deletion or an animation-performance optimization. No production deployment is part of this task.

## Not touched

Identity Signal content/behavior, Home JavaScript, SVG artwork and labels, existing CSS animations, hero copy/grid, navigation, Guide Beacon, cursor lighting, route/state/storage behavior, generated data, frozen governance, and MTG semantics.

## Follow-up recommendations

Owner review the hero spacing. Restore later by removing hidden. Integrate only after exact-candidate Owner ACCEPT under the existing workflow.

## Next suggested agent

Owner for visual acceptance; implementation agent only for a bounded Owner finding or authorized integration.

## Related Kanban card, docs, or plans

- [VM-634](../kanban/done/VM-634-hide-home-color-axis.md)
- [Workflow](../reference/workflow.md)
- [RobDev skill](../../.agents/skills/robdev/SKILL.md) and [frozen gate](../dev/RobDevPass.md)
- [RobQA skill](../../.agents/skills/robqa/SKILL.md) and [frozen gate](../qa/RobQAPass.md)
- Owner-approved plan in this task, 2026-09-06.

## Material candidate

- Baseline: `4e536641f8fddd26ceec520455474a0965460114`
- Candidate: `b2a2441970470e20b42311cc58117c43566b582b`
- Changed paths: `7`

Derived from git diff --name-status --find-renames baseline..candidate. This is the primary task change set.

## Evidence delta

- Material candidate: `b2a2441970470e20b42311cc58117c43566b582b`
- Evidence head: `75f63ce31fdf1722171e2f662a449494b7e53b13`
- Additional evidence-only paths: `4`

The evidence head identifies the original consolidated Owner Review record. This delta is not the full task diff. It records only candidate binding, test observations, lifecycle summaries, and Git accounting; implementation and acceptance criteria are unchanged. Later lifecycle closeout has separate accounting in the linked closeout report.

## Evidence-only paths

- `docs/handoffs/2026-09-06-0818-codex-vm634-hide-home-color-axis.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-634-hide-home-color-axis.md`

## Final branch delta

Git-derived total: 7 paths from admission baseline to the consolidated evidence head. The path set equals the material set; evidence only updates existing delivery records. Final exact evidence SHA and clean status are reported in the task after committing and validating this record.

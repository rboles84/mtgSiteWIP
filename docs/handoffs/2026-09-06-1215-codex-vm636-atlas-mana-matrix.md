# VM-636 — Atlas Mana Alignment Matrix

Agent: Codex
Task requested: Add the missing Mana Alignment Matrix to explored identity dossiers, starting with the Owner's Blue URL.
Branch: codex/vm-636-atlas-mana-matrix
Admission baseline: 29115b84dc6f628916c7a2f7cf07bac8dc4c5241

## Files reviewed / pre-flight

Applied the repo-local RobDev and RobQA skills and usage guides with their previously read frozen gates. Rehydrated current board/index, VM-625 card and original implementation/integration handoffs, VM-635 closeout, route ownership, dossier view/controls/radar, shared VMRadar resolver, module-cache validator, and existing Atlas/dev-review tests. Inspected the Owner's Blue page: Start Here had no matrix before the change.

VM-625 intentionally hides Placement in browse mode; the identity matrix was nested inside that omitted panel. VM-635 and VM-634 are integrated and protected. Main was clean in the sole registered checkout. The old VM-625 local pointer is retained historical integrated work, not active enhancement work; unrelated vm-623/font-upgrade pointers remain untouched. Created one VM-636 branch from current main, with no extra worktree.

## What changed and why / RobDev packet

- Authority: Owner's explicit enhancement request. Presentation ownership is dossier-view.js, dossier-radar.js, and dossier-controls.js. Existing identity-layer preview scores and components remain the authoritative profile inputs.
- Changed behavior: exploration adds the existing matrix at the top of Start Here. It is an Identity Profile with an identity-alignment accessible chart name. Personal Placement remains absent in exploration, and local dev-review retains its previous presentation.
- Producer/reuse: shared VMRadar.resolveRadarProfile and the existing renderer, Chart.js chart, trait interactions, trace/synthesis controls, fallback and panel visibility machinery. No new data, chart engine, scoring, or identity prose.
- Initialization: the exploration-marked matrix uses the active browsed faction and a null reading, including after tab/layout changes. Normal Placement still requires a result. A delayed frame checks that its original canvas is still present before drawing, preventing stale identity initialization after navigation.
- Cache: retained the existing uniform module epoch contract and advanced the connected Archscry/Maze import graph and entry points from vm547r5 to vm636. Outside the three matrix modules, JS/route changes are cache-only. Existing cache validation expectations advance with the graph.
- Protected consumers: normal personal and local direct-review dossiers, registry/scores/semantics, saved-reading state/schema, active result/view identity, Atlas directory/history/URL/Maze-return behavior, artwork/resolvers/Scryfall/credits/fallbacks, every CSS/image/data file, Home, black backgrounds and hidden philosophy strip.
- Risks/states: fresh exploration cannot require a result; a prior saved identity cannot drive the browsed chart; hidden panels must initialize when revealed; a delayed frame must not draw into a replacement canvas. Default, explicit panel, View All, mono/multicolor/Colorless, reduced-motion and unavailable-chart behavior retain existing machinery.
- Smallest complete change: three production matrix seams plus the established cache epoch, focused tests and delivery docs. No layout redesign, personal-fit interpretation, saved-state writes, semantic recalibration, or unrelated cleanup. Stop for any need to modify those protected contracts.

## Decisions

Use Start Here, the existing default exploration panel, rather than expose personal Placement controls. Keep matrix naming, axes, values and design; change only exploration context labels. This updates the requested Atlas presentation while preserving the accepted distinction between identity browsing and an assessed result. No Owner reapproval of historical VM-625 implementation is required to develop this scoped successor; VM-636 has its own exact-candidate review.

## Tests selected / development evidence

- node tests/archscry/identity-atlas-matrix-tests.js: PASS before candidate. All 37 active identity profiles and matrix markup, existing controls, personal labels, fresh/saved initialization, hidden/revealed panels, no active-result/view mutation and stale-canvas isolation.
- npm.cmd run lint:html and npm.cmd run lint:js: PASS before candidate. Existing markup and connected cache contract remain enforced.
- Git-based source preservation: PASS before candidate. All module/route changes outside the three matrix modules normalize to baseline after replacing the epoch; all CSS/images/data/Home are unchanged. Imported baseline and current matrix renderers produce identical personal-matrix HTML across all 37 identities.
- Browser development witness: Blue direct exploration shows one visible Mana Alignment Matrix in Start Here with the five existing values (38, 98, 36, 34, 54), Identity Profile copy, no Placement tab, and the existing official-art credit.
- git diff --check: run against the committed candidate and evidence before delivery.

## RobQA readiness / exact candidate

RobDev: READY for candidate creation.
QA tier: QA-2 component presentation and initialization. Execution: SAME-AGENT DISTINCT PHASE, Codex; no routing, storage, scoring, semantic, security, migration or governance behavior is changed. The cache graph uses the existing contract.
Candidate: PENDING. RobQA: PENDING. Owner: PENDING. Integration: PENDING; stop at Owner Review.
CPU-heavy validation: NOT REQUIRED.
Browser justification: objective visible canvas initialization, keyboard axis expansion, multicolor checkbox behavior, and tab/layout reveal cannot be fully established by source checks. Bounded witnesses cover Blue, multicolor, Colorless and an existing saved-reading restore. No screenshot or viewport matrix.
Tests intentionally skipped: full Atlas navigation suite, full dev-review suite, broad frontend/engine/placement suites, screenshots, animation-fidelity waits, and exhaustive browser identity loops. No changed risk justifies them; local Edge startup was previously unavailable, and working in-app browser checks cover the new interaction directly.
Manual finding to invariant: Owner found Atlas dossiers lacked the matrix. Regression protects all active profile variants, identity-only initialization and preservation of the personal-reading boundary rather than special-casing Blue.

## Remaining Owner judgment / shortest review

Open http://127.0.0.1:8000/archscry/index.html?explore=blue and inspect the matrix above Start Here. Optionally use the Atlas to open a multicolor identity and try Component traces/Synthesis. PASS if the existing matrix feels correctly placed in the browse dossier; otherwise report the desired placement adjustment. Personal assessment and all-identity semantic review are not part of this request.

## Risks / uncertainties

No known correctness blocker at development completion. Subjective placement remains Owner review. No push, merge, deployment, or new Owner acceptance is claimed. Existing chart fallback text/behavior and motion preference handling remain unchanged.

## Not touched

All CSS, image files including official identity art, registry/data/scores/prose, placement algorithms, saved-reading schema/writers, Scryfall/hero resolvers, VM-634/635 presentation, unrelated branches, frozen authorities, and local dev-review matrix exclusion. Other module changes are cache-revision-only.

## Follow-up / next suggested agent

Owner reviews the exact QA-passed VM-636 candidate. Codex handles only a bounded finding or explicit later integration authorization. No further enhancement scope is inferred.

## Related card/docs/gates

- [VM-636](../kanban/in-progress/VM-636-atlas-mana-matrix.md)
- [VM-625](../kanban/done/VM-625-public-identity-atlas-explorer.md)
- [Route ownership](../architecture/route-ownership-matrix.md)
- [RobDev skill](../../.agents/skills/robdev/SKILL.md), [frozen gate](../dev/RobDevPass.md)
- [RobQA skill](../../.agents/skills/robqa/SKILL.md), [frozen gate](../qa/RobQAPass.md)
- [Workflow](../reference/workflow.md)

## Files changed / Git accounting

Pending committed material candidate; derive all scopes from Git before delivery.

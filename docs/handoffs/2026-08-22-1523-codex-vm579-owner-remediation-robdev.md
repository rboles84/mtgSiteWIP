# VM-579 Owner Remediation RobDev Handoff

## Handoff Metadata

- Agent name: Codex (`/root`, RobDev)
- Task requested: Finish the bounded VM-579 owner remediation in Goal Mode: carry direct-review dossier identity into Maze as transient context, order the selector by authoritative taxonomy, preserve production placement/Maze behavior, and prepare an exact candidate for independent RobQA.
- Related Kanban card, docs, or plans: `docs/kanban/in-progress/VM-579-archscry-dev-review-placement-validation.md`; `docs/dev/RobDevPass.md`; `docs/qa/RobQAPass.md`; supplied Goal Mode objective.
- Candidate identity: the commit containing this handoff; the orchestrator must supply its full exact SHA to independent RobQA.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-22-1353-codex-vm579-archscry-dev-review.md`
- `docs/handoffs/2026-08-22-1406-codex-vm579-independent-robqa.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-579-archscry-dev-review-placement-validation.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- Existing Archscry presentation, dev-review, dossier, Maze handoff/initialization, identity metadata, focused tests, and relevant Git history.

## Files Changed

- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/runtime/dev-review.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/maze/maze-handoff.js`
- `assets/js/maze/research-init.js`
- `tests/archscry/archscry-dev-review-tests.js`
- `tests/maze/maze-search-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-579-archscry-dev-review-placement-validation.md`
- `docs/kanban/backlog/VM-580-transform-hover-preview-interaction-contract.md`
- `docs/kanban/backlog/VM-581-college-commander-browsing-identity-labels.md`
- `docs/kanban/backlog/VM-582-mobile-provider-control-intrinsic-sizing.md`
- `docs/kanban/backlog/VM-583-maze-mobile-search-control-gap.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-22-1523-codex-vm579-owner-remediation-robdev.md`

## What Changed

- Direct-review Maze URLs now carry explicit `dossier-review` identity and reading context through the existing Archscry-to-Maze context adapter.
- Maze resolves that context into module memory only, builds paths from the reviewed identity without a placement-shaped result, and does not read or overwrite the saved production handoff for review launches.
- The selector uses existing expression/faction metadata to produce the required mono, guild, college, shard, wedge, four-color, Colorless, WUBRG order.
- Focused tests cover taxonomy counts/order, Dimir, Jund, Colorless, WUBRG, Silverquill, exact persistence bytes, Reading Finds context, return navigation, normal production handoff, isolation, telemetry, and the existing placement engine.
- Four non-causal owner findings were routed to VM-580 through VM-583 without product implementation.

## Why It Changed

The first VM-579 owner review proved the core review/engine seams but found that direct-review Maze navigation reused a previously saved dossier and that selector enumeration was not useful for systematic review. This correction keeps the review context explicit and transient while leaving the production placement result and persistent handoff authoritative.

## Compact RobDev Implementation Packet

- Product outcome: direct-review identity -> Maze -> the same dossier identity context; deterministic taxonomy selector order.
- Current behavior corrected: review links previously omitted dossier context and Maze fell back to the saved handoff; the selector used raw registry enumeration.
- Locked decisions: do not fabricate placement, mutate persistence, change placement semantics, absorb VM-580–VM-583, create parallel product machinery, merge, push, close, or move VM-579 to Done before owner reacceptance.
- Owning layers and producer: existing dossier/Maze context builders and resolver own route context; `identity-layers.json` expression `kind` and current faction metadata own grouping and labels.
- Existing machinery reused: `withArchscryMazeContext`, `buildArchscryMazeContext`, `resolveMazeLaunchState`, the existing dossier path builder, production dossier renderer, production placement engine, and existing dev-review gate.
- Changed behavior: explicit development-review launches and development selector presentation only.
- Protected behavior: normal production handoff/persistence, saved placement/profile bytes, placement scoring/ranking/qualification/stopping, Reading Finds persistence, telemetry, provider routes, identity authority, and transforms.
- Consumers/blast radius: local flagged Archscry review panel, Archscry Maze links, Maze startup context, search paths, Reading Finds source context, and return URL; production launch regression is explicit.
- Relevant states: stale saved Jund plus reviewed Dimir, no saved handoff, ordinary/endpoint/college identities, return navigation, repeated search, desktop/mobile, and normal production launch.
- Smallest complete implementation: add review-only URL fields to existing adapters, retain them in Maze memory, branch path construction at the existing resolver, and sort registry-derived entries by current metadata.
- Non-goals/stop conditions: no placement or persistent-schema change, no new engine/renderer/state system, no VM-580–VM-583 implementation, and stop if broader decomposition is required. No broad rework was required.

## Decisions Made

- Review context takes precedence over saved handoff only when `contextMode=dossier-review` and `reviewIdentity` validates against the current identity registry.
- Review state is never serialized. Normal handoffs conditionally omit review-only fields and retain the production placement result.
- Faction display names come from current faction/route metadata, preventing identity-key labels such as WUBRG from replacing the established Five-Color presentation.
- Mono colors use W/U/B/R/G metadata keys; other groups use stable label ordering. No duplicate identity registry was introduced.
- The VM-580–VM-583 findings remain separate because direct code evidence shows VM-579 did not introduce their owning behavior.

## Risks / Uncertainties

- Cross-route context and storage isolation justify QA-3 even though the feature is development-only.
- Two placement assertions and one shared Maze metadata assertion fail at both the candidate worktree and untouched remediation parent `07b5b3e`; they are inherited baselines, not VM-579 deltas.
- Independent RobQA must review the exact candidate rather than relying on the earlier PASS for `1c87dc2`.

## Tests Run

- PASS: `npm run test:dev-review` on the final implementation.
- PASS: relevant `node --check` commands and `git diff --check`.
- PASS: `npm run lint:js`, `npm run lint:html`, `npm run test:gate-b1-runtime`, `npm run test:telemetry`, `npm run test:frontend-smoke`, `npm run test:archscry-transform`, and `npm run test:maze-finds`.
- BASELINE FAIL: `npm run test:placement` has the same two failures from untouched `07b5b3e`: Esper visible-copy and Quandrix starter-whitelist assertions.
- BASELINE FAIL: `node tests/maze/maze-search-tests.js` has the same `c:r` versus `c:r f:commander` assertion from untouched `07b5b3e`.
- Rendered PASS at 1440x1000 and 390x844: taxonomy order, Dimir/WUBRG/Silverquill route context, search paths, Reading Finds, same-tab return, no saved Jund leakage, production Jund persistence, no overlap/overflow, and zero console errors.

## RobQAPass Readiness

- QA tier: QA-3.
- Changed behavior under review: transient direct-review Maze context and deterministic selector taxonomy.
- Protected contracts: exact saved state, normal persistent Maze handoff, production placement semantics, telemetry, gating/isolation, route labels, and responsive interaction.
- Deterministic evidence: focused browser automation plus protected suites and exact-parent baseline reproduction.
- Rendered evidence: ordinary, endpoint, and college identity journeys on desktop/mobile, including return navigation.
- Owner-review scope after independent PASS: only confirm the direct-review Maze context and desired selector order.
- Readiness verdict: READY FOR INDEPENDENT EXACT-SHA ROBQA.

## Not Touched

- Placement model/data, scoring, ranking, qualification, stopping, or refinement semantics.
- Generated faction/dossier authority or identity source data.
- Production telemetry contracts or persistent storage schema.
- Transform hover preview, college provider-label presentation, mobile provider sizing, or Maze mobile spacing implementation.
- VM-578 branch, card, identity, or `docs/research/maze-player-language/corpus/vm578.zip`.
- Merge, push, deployment, VM-579 closure, or Done transition.

## Follow-up Recommendations

- Independent RobQA must rerun the focused contract and rendered ordinary/endpoint/college journeys against the exact candidate SHA, verify byte-exact persistence isolation and normal Jund production behavior, and inspect the diff for parallel machinery or scope leakage.
- If PASS, update only the VM-579 remediation evidence/checklist and handoff index, keep the card In Progress, and return the owner to the two bounded acceptance checks.

## Next Suggested Agent

Independent RobQA reviewer for the exact candidate SHA.

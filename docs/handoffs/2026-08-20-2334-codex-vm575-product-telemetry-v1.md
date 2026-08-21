# VM-575 Product Telemetry V1 Handoff

## Agent Name

Codex

## Task Requested

Implement the smallest production-safe anonymous Vox Mana Product Analytics V1: one PostHog Cloud US adapter and only the Archscry `reading_started`, `question_answered`, and `reading_completed` funnel events.

## Files Reviewed

- Repository governance: `AGENTS.md`, `CLAUDE.md`, `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, handoff index/relevant VM-551/VM-573 handoffs, Kanban board, workflow, data/source contracts, and architecture maps.
- Runtime and authority: `archscry/index.html`, `assets/js/archscry/index.js`, `assets/js/archscry/runtime/{actions,boot,questionnaire,state}.js`, `assets/js/archscry/gate-b1-{placement-engine,runtime-contract}.js`, `assets/js/archscry/archscry-presentation.js`, `assets/js/shared/shared.js`, and `data/gate-b1-placement-model.json`.
- Privacy/testing: `privacy/index.html`, `package.json`, `tests/run-tests.js`, frontend lint/smoke scripts, and focused Gate B1 integration/presentation tests.

## Files Changed

- `assets/js/shared/vox-telemetry.js` - provider isolation, three event schemas, normalization/firewall, PostHog manual-only bootstrap, reading lifecycle, local suppression, and test seams.
- `assets/js/archscry/index.js` - initializes the adapter at Archscry boot.
- `assets/js/archscry/runtime/questionnaire.js` - emits the three events at existing structured lifecycle seams.
- `tests/telemetry/vox-telemetry-tests.js` - focused schema, privacy, firewall, failure, local-mode, correlation, and duplicate tests.
- `package.json`, `tests/run-tests.js`, `scripts/lint-frontend-js.mjs` - registers focused validation and the new frontend module.
- `privacy/index.html` - minimal factual PostHog/anonymous Archscry disclosure and project-level client-IP-discard statement.
- `docs/reference/product-telemetry.md`, `docs/reference/README.md`, `docs/architecture/data-flow-map.md` - concise maintainer contract and runtime/provider map.
- `docs/kanban/board.md`, `docs/kanban/done/VM-575-product-telemetry-v1.md`, `docs/handoffs/HANDOFF_INDEX.md`, this handoff - governance closeout.

## What Changed

- Added a dependency-free browser adapter using the owner-supplied public PostHog token and US hosts.
- Configured manual capture only: no persistence, autocapture, page/pageleave, dead/rage clicks, replay, surveys, performance, heatmaps, exceptions, flags, or anonymous person profiles.
- Added event-specific allowlists and a second `before_send` firewall that rejects every other event, strips provider-added URL/referrer/context fields, and forces no person profile and no GeoIP enrichment.
- Added one ephemeral in-memory `reading_run_id` per genuine new reading and deterministic `placement_version` projection: `m=<model>|i=<instrument>|map=<mapping>|r=<result>`.
- Emitted accepted structured question/answer IDs only after placement state accepts the answer, and one completion after the first successful result finalization. Restore/rerender emits nothing; post-result refinement emits no second V1 completion.
- Suppressed remote delivery by default on localhost/127.0.0.1, with explicit mock and one-use live verification modes.

## Why It Changed

Vox Mana needs durable placement-funnel evidence without adding backend infrastructure, provider calls throughout renderers, persistent analytics identity, or any influence on placement behavior.

## Decisions Made

- Kept PostHog entirely behind `vox-telemetry.js`; application code has no provider knowledge.
- Used exact structured IDs/states from current runtime/model authority and omitted prose, scores, answer paths on completion, URLs, account data, and free input.
- Backtracking truthfully emits a later accepted answer at the reused `step_index`; ordered analysis treats it as replacing the path from that step.
- Optional refinement stays outside V1 after the first completion.
- `$geoip_disable: true` remains defense against enrichment. Owner live inspection proved it does not itself prevent IP storage, so PostHog's project-level **Discard client IP data** setting is a required provider control. A second post-setting live reading showed GeoIP disabled and no client-IP property on the newly ingested completion event. No event/schema/runtime change was made for this reconciliation.
- The second reading's Mixed WU outcome was valid adaptive-engine behavior and served only as the provider privacy check; telemetry supplied evidence and did not alter or override placement.

## Risks / Uncertainties

- The PostHog project-level IP-discard setting exists outside this repository and must be reverified after project, region, or provider migration.
- The public browser token is intentionally client-visible. No personal/secret API credential was requested or added.
- Ad blockers or provider outages can reduce event delivery, but the product remains unaffected by design.

## Tests Run

- PASS `npm run test:telemetry`
- PASS `npm run lint:js`
- PASS `npm run lint:html`
- PASS `npm run test:frontend-smoke`
- PASS `npm run test:gate-b1-runtime`
- PASS `npm run test:gate-b1-questionnaire-presentation`
- PASS `git diff --check`
- PASS rendered mock reading: six accepted answers, White result, normal dossier, no PostHog script/iframe, no console errors.
- PASS rendered blocked-provider reading: external PostHog asset/ingestion blocked by CSP, same White result/dossier, product unaffected.
- PASS live PostHog reading: provider script loaded, six-answer White reading completed, dossier rendered, no console errors/replay iframe.
- OWNER PASS semantic live event inspection: exactly 1 start + 6 answers + 1 completion, shared reading run, expected `identity_key: W`, expected placement/result/stopping properties, no unsolicited event names, and no URL value.
- OWNER PASS provider privacy inspection after enabling project-level client IP discard: exactly 1 start + 8 answers + 1 completion, a legitimate adaptive Mixed WU result, GeoIP disabled, no client-IP property on the new completion event, and no unsolicited event names.
- PASS rendered privacy page: PostHog and IP-discard disclosures visible, no console errors.

CPU-heavy all-37, 5,000-journey, mutation, bias, and generated-data suites were not run because telemetry does not change those protected contracts.

## RobDevPass Compact Implementation Packet

- Changed behavior: three non-blocking anonymous placement-funnel event projections and one factual privacy disclosure.
- Protected behavior: placement scoring/weighting/routing/stopping/qualification, identity authority, result meanings, dossier/recommendations, generated data, account state, and navigation.
- Owning authority: Gate B1 model/result values remain authoritative; telemetry only projects them.
- Consumers: PostHog Product Analytics and future human product review only.
- Failure behavior: invalid telemetry fails closed; provider/loading/capture failure fails open for Vox Mana and never throws into product flow.
- Non-goals: every dossier/card/Maze/glossary/media/error/retention/experiment/profile surface listed in the owner request.

## RobQAPass Readiness

- QA tier: QA-3 state-transition integration with privacy/provider risk.
- Deterministic coverage: exact schemas, property/event rejection, sensitive-property defense, provider failure, local no-send, per-reading correlation, new-run replacement, completion duplication, and focused existing lifecycle contracts.
- Rendered coverage: representative successful reading, provider-blocked reading, live provider reading, restored dossier behavior, and privacy disclosure.
- Owner judgment remaining: none for VM-575. Both the semantic stream and a post-setting provider-level IP-discard stream were owner-verified.
- Residual risk: external provider settings can drift independently of source; reverify them during analytics project migration or privacy review.

## Not Touched

Placement engine/model, governed/generated data, identity definitions/mappings, dossiers, recommendations, cards, Card Signals, Sound/Play, Mana Notes, tier surfaces, glossary, Maze, outbound links, media/error telemetry, satisfaction, Web Analytics, replay, flags, experiments, surveys, profiles, accounts, backend infrastructure, and production deployment configuration.

## Follow-Up Recommendations

- Treat any future event/property as a separate reviewed card with explicit schema, privacy, cardinality, and firewall changes.
- Reverify PostHog's project-level client IP discard and manual-only product settings during project/region migration; do not infer them from the browser config.
- Do not use event popularity to automatically tune placement weighting or routing.

## Next Suggested Agent

Release/integration owner only if a commit, push, deployment, or production verification is requested. No implementation follow-up is required for VM-575.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-575-product-telemetry-v1.md`
- `docs/reference/product-telemetry.md`
- `docs/architecture/data-flow-map.md`
- Owner request: Vox Mana Product Telemetry V1 Implementation

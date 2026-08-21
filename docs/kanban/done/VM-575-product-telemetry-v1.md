# VM-575 - Product Telemetry V1

ID: VM-575
Title: Product Telemetry V1
Status: Done
Type: Product analytics
Area: Archscry
Priority: High
Created: 2026-08-20
Completed: 2026-08-20

## Summary

Add the smallest production-safe anonymous product telemetry foundation for the Archscry placement funnel. Use PostHog Cloud US through one provider-isolated adapter and emit exactly `reading_started`, `question_answered`, and `reading_completed` from existing structured placement state.

## Source

Owner request: Vox Mana Product Telemetry V1 Implementation, following the completed read-only telemetry architecture analysis.

## RobDevPass Pre-Edit Contract

- Product outcome: aggregate Archscry starts, accepted answers, and completed placement outcomes can be analyzed without identifying users or changing the reading.
- Current behavior: Archscry runs a structured adaptive reading with stable question, answer, stage, placement-version, result-state, and identity values; no passive analytics exists.
- Locked decisions: PostHog Cloud US; manual custom events only; no analytics persistence, identification, profiles, flags, replay, surveys, autocapture, page events, errors, or broader product instrumentation.
- Owning layer: provider policy and schemas belong to one shared frontend telemetry adapter; reading lifecycle calls belong to `assets/js/archscry/runtime/questionnaire.js`.
- Existing machinery: the current Gate B1 model metadata, accepted-answer state transition, result finalization path, and VM-573 runtime ownership boundaries.
- Changed behavior: three non-blocking anonymous events and a narrow factual privacy disclosure.
- Protected behavior: placement scoring, weighting, routing, stopping, qualification, identity mappings, result meanings, dossiers, recommendations, generated data, media, navigation, and account state.
- Consumers and blast radius: the Archscry route only; PostHog receives allowlisted event projections; local/test use remains remote-suppressed.
- Relevant states: new reading, backtracking/re-answering, successful completion, restore/rerender, second reading, blocked provider, missing provider, and throwing capture.
- Smallest complete implementation: one adapter, three event calls, focused tests, privacy disclosure, maintainer note, and one representative rendered reading.
- Non-goals and stop conditions: no backend, dependency install, build migration, placement refactor, other-route telemetry, or automatic analytics feature. Stop if any is required.

## Acceptance Criteria

- One provider-isolated telemetry module owns PostHog initialization, event/property schemas, normalization, and a `before_send` event firewall.
- PostHog uses the owner-supplied browser project token and US ingestion host with manual capture only.
- `disable_persistence: true`, `person_profiles: "identified_only"`, `advanced_disable_flags: true`, and explicit disables prevent persistence, profiles, flags, page events, autocapture, replay, surveys, heatmaps, performance, dead clicks, and exception capture.
- Exactly three event names can leave the app: `reading_started`, `question_answered`, and `reading_completed`.
- A new ephemeral `reading_run_id` is created per genuinely new quick reading and is never persisted or placed in a URL.
- `placement_version` is a deterministic projection of existing model, instrument, mapping, and result versions.
- Accepted answers emit structured IDs only after the placement state accepts them; completion emits once after successful finalization.
- Restore and ordinary rerender do not emit duplicate start or completion events.
- Unknown events, unexpected properties, and representative sensitive properties fail closed; provider failures fail open for Vox Mana.
- Local deterministic use does not call PostHog Cloud by default; a deliberate mock/live verification path is documented.
- Focused automated tests and one representative rendered reading pass without heavyweight placement suites.
- The existing privacy policy receives only the factual disclosure required for anonymous Archscry product analytics.

## Files Likely Impacted

- `assets/js/shared/vox-telemetry.js`
- `assets/js/archscry/index.js`
- `assets/js/archscry/runtime/questionnaire.js`
- `scripts/lint-frontend-js.mjs`
- `tests/telemetry/vox-telemetry-tests.js`
- `tests/run-tests.js`
- `package.json`
- `privacy/index.html`
- one concise telemetry maintainer reference under `docs/reference/`
- Kanban and handoff records

## Risks

- PostHog defaults or remote project settings could create unintended automatic events unless every relevant feature is explicitly disabled and the event firewall rejects `$` events.
- PostHog may add provider context properties; the final firewall must strip URL/referrer and other unapproved context while retaining only the minimum transport properties required for ingestion.
- Backtracking can emit a later accepted answer at a reused `step_index`; documentation must define the later event as superseding the prior path from that step.
- Optional post-result refinement can finalize again; V1 completion must remain once per reading run without changing refinement behavior.
- CDN or ingestion blocking must never delay or fail the questionnaire.

## Implementation Prompt

Implement the owner-approved Vox Mana Product Telemetry V1 request exactly as scoped. Use PostHog Cloud US through a provider-isolated manual-only adapter, emit only the three placement-funnel events from current structured state, preserve every placement and dossier contract, add focused QA and minimal privacy/docs updates, and stop before any later telemetry surface.

## Notes

- QA tier: QA-3 state-transition integration with privacy/provider risk; no placement logic is changed.
- CPU-heavy validation: NOT REQUIRED. Existing all-37 placement certification remains authoritative because engine/model behavior is untouched.
- Current repository has no CSP surface to update.
- Live verification produced exactly eight events: one `reading_started`, six `question_answered`, and one `reading_completed`, with one shared `reading_run_id`, `identity_key: W`, the expected placement version, and no unsolicited event names.
- Privacy reconciliation: live event inspection proved `$geoip_disable: true` suppresses GeoIP enrichment but does not by itself prevent PostHog from storing the source IP observed at ingestion. After the owner enabled PostHog's project-level **Discard client IP data** control, a second controlled reading produced one start, eight accepted answers, and one completion with GeoIP disabled and no stored client-IP property. This is a required provider setting, not a new event or application schema change.
- The second live reading validly followed the adaptive engine to a Mixed WU result. It served only as provider privacy verification; it does not replace the accepted six-answer White semantic verification and does not justify placement remediation.

## Completion Evidence

- Implemented one dependency-free provider adapter with manual PostHog initialization, event/property allowlists, normalization, a `before_send` firewall, local suppression, deterministic mock support, and non-blocking failure behavior.
- Wired only the new-reading, accepted-answer, and first-successful-completion lifecycle points in the current VM-573 Archscry runtime.
- Added one in-memory reading correlation ID and one deterministic projection of the existing model, instrument, mapping, and result versions.
- Updated the factual privacy disclosure and concise maintainer/data-flow references, including the required project-level IP-discard setting.
- Automated checks passed: `npm run test:telemetry`, `npm run lint:js`, `npm run lint:html`, `npm run test:frontend-smoke`, `npm run test:gate-b1-runtime`, `npm run test:gate-b1-questionnaire-presentation`, and `git diff --check`.
- Rendered QA passed for a representative six-answer White reading in mock mode, a full reading with PostHog blocked by CSP, the live provider run, and the updated privacy page.
- The owner verified the semantic live stream contained exactly eight expected event rows, one shared reading run, the expected White completion properties, and no unsolicited event names.
- The owner separately verified the post-setting privacy stream contained exactly ten expected event rows, a legitimate adaptive Mixed WU completion, no unsolicited event names, and no client-IP property on the newly ingested completion event.

## Not Touched

- Placement engine/model, scoring, weighting, routing, qualification, stopping, identity definitions/mappings, result meanings, dossiers, recommendations, governed/generated data, media resolution, cards, glossary, Maze, outbound links, errors, replay, flags, surveys, experiments, profiles, and account behavior.

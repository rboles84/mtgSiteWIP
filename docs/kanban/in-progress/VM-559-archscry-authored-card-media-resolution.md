# VM-559 - Archscry Authored-Card Media Resolution

ID: VM-559

Status: In Progress

Current gate: Implementation and agent QA complete on the VM-559 branch; RobQAPass classifies the integration/deployment risk as QA-5. Awaiting the short owner visual review before integration, push, production replay, and closeout.

Type: Production defect / generated media projection / shared resolver and rendering reliability

Area: Archscry dossier, Card Signals, Matrix, Sound, Play, and Mana Notes

Priority: High

Created: 2026-08-15

## Product Outcome

Ensure every governed authored Archscry card resolves deterministically to committed Scryfall metadata and ordered image candidates without runtime `api.scryfall.com` name lookup. Replace implementation-family Card Signals headings with the existing player-facing identity label. Keep `cards.scryfall.io` as the explicitly bounded image-delivery dependency.

## RobDevPass Contract

- Owning authority: approved dossier/faction sources own card selection, tier, and order; Scryfall bulk owns canonical card facts.
- Authoritative producer: extend the existing Scryfall index producer and shared resolver; generated projections remain non-authoritative runtime representations.
- Changed behavior: governed media resolution, projection freshness, printing/face/candidate stability, hydration timing, image-delivery isolation, fallback state, and Card Signals headings.
- Protected behavior: placement, scoring, qualification, identity meaning, Matrix associations, all card selections, Mana Notes tiers/order, VM-558 Sound/Play semantics, result state, and shared card-detail meaning.
- Consumers: Archscry renderer, shared card detail, Scryfall cache, generated-index validation, all-identity replay, and deployment verification.
- Smallest complete implementation: one deterministic governed projection, policy-aware resolver, visible-surface hydration, slot-local delivery, exact headings, and focused drift/failure validation.
- Non-goals: no card/content rerank, placement work, VM-551 reopening, local bitmap hosting, service worker, proxy, database, or parallel media subsystem.
- Stop conditions: any required change to authored selections, identity/placement authority, image-hosting architecture, Scryfall factual policy, or an unexpected selection drift without explicit owner authorization.

## Governing Contracts

- Governed surfaces: Matrix, Card Signals, Sound, Play, Basics, Premium, Midrange, Budget, Utility, and every additional detected authored card-bearing dossier surface.
- Authored projection misses fail build/release and never receive runtime API rescue.
- Dynamic consumers may opt into isolated live fallback; authored consumers use projection-only resolution.
- Projection manifests carry schema/version, bulk identity/checksum, raw-plus-normalized authored inventory checksum, media index checksum, and resolved/unresolved counts.
- Generation is byte-stable and excludes timestamps, filesystem ordering, locale-dependent sorting, and other volatile values.
- Existing card selections pin Oracle identity, exact printing/object, layout/face association, and ordered candidates. Unexpected drift stops work.
- `--accept-selection-drift` is owner-authorized only and may not be used to clear validation failures.
- Card metadata resolution and browser image delivery remain separate state machines; transient delivery never becomes card `not_found`.
- Card Signals headings use exactly `[player-facing identity display label] Card Signals`.

## Acceptance Criteria

- All governed authored occurrences resolve from the committed projection with zero unresolved names and zero runtime API name lookups.
- Before/after identity, surface, tier, position, raw name, normalized key, and order are identical.
- Canonical Oracle identity, printing/object, layout/face association, and candidate order are deterministic and reviewed.
- Two identical generations are byte-for-byte equal.
- Hidden panels/tiers do not hydrate; successful revisits dedupe; deferred/transient work remains retryable; superseded work is discarded before dispatch.
- Candidate delivery failures remain slot-local and do not poison resolved metadata, cache, queue, or circuit breaker.
- All 37 identities pass one-width automated coverage with `api.scryfall.com` blocked and `cards.scryfall.io` permitted.
- Focused automated mobile interactions pass for Mardu, Glint, and one ordinary identity.
- Mardu Swamp, Glint-Eye Nephilim, other Glint creatures, Opulent Palace, punctuation aliases, multiface records, and exact headings are locked regressions.
- RobQAPass selects the final proportional QA tier from the completed diff; deployment uses QA-5 integration controls.

## Branch

`codex/vm559-archscry-media-reliability`

## Implemented Candidate Evidence

- Current structured inventory: 1,178 governed occurrences across 37 identities and 572 unique resolver keys. Surface counts are Matrix 111, Sound 73, Play 50, commander previews 101, Card Signals 283, and Mana Notes 560. The earlier 469 Mana Notes / 37 Sound / 406-unique figures remain historical pre-VM-558 evidence, not application invariants.
- Projection validation: zero unresolved records; manifest pins schema `1.0.0`, Scryfall bulk ID/checksum, authored inventory checksum, media index checksum, and exact counts.
- Determinism: two in-memory regenerations are byte-identical and match the committed artifacts; the second check produces no generated index drift.
- Resolver proof: governed hits and misses make zero API calls; projection misses fail closed; transient failures retry once without negative caching; 429 backoff defers other work; superseded work is discarded before dispatch.
- Desktop UI proof: all 37 identities, every panel and active tier/segment, View All, revisit suppression, card detail, successful image dimensions, zero projection misses, zero unavailable/retryable tiles, and zero `api.scryfall.com` requests passed with mocked successful `cards.scryfall.io` delivery.
- Targeted regressions: Mardu Swamp advances from a forced failed first candidate to an ordered fallback; Mardu and Glint headings are exact; Glint-Eye Nephilim, all rendered Glint creature slots, Opulent Palace, punctuation aliases, and governed multiface records resolve from the projection.
- Delivery-state isolation: a forced all-candidate Swamp outage leaves only that slot retryable, preserves every other resolved slot, retries exactly once on later activation, and then stops dispatching until reload.
- Mobile UI proof: Mardu, Glint, and Azorius pass active-tier hydration, all tier switches, View All, successful revisit suppression, candidate fallback, modal interaction, no overflow, and zero authored API lookup at 390px.
- Rendered self-QA: local Mardu Card Signals and Basics panels show the correct heading and card art, including Swamp, with no unavailable tile or visual layout regression.

## RobQAPass Classification

- Changed risk: shared cross-identity resolver/projection and image delivery behavior with deployment-artifact freshness consequences.
- Implementation checks: focused producer, projection, resolver-state, cache, lazy hydration, desktop all-identity, focused mobile, frontend lint/HTML, source-generated, and rendered-product QA.
- Final tier: QA-5 applies to integration/deployment because the exact built candidate and published SHA must be verified with API lookup blocked. Placement certification and all-viewport dossier certification are outside the changed risk.
- Owner review remains limited to Mardu, Glint, and one ordinary identity at desktop/mobile, one tier switch, View All, one card-detail interaction, and visual judgment of heading/readability/order.
- Headed review command: `npm.cmd run review:vm559 -- --identity=MARDU --viewport=desktop` (substitute `GLINT`/`WU` and `mobile`). It blocks API lookup, permits the real image CDN, prechecks all panels/tiers, and leaves the verified dossier open for owner judgment.

## Remaining Release Gates

- Owner acceptance is not claimed.
- Do not merge, push to `main`, deploy, close the card, or claim production reliability until owner review accepts the exact candidate.
- After acceptance, integrate the exact tested SHA, wait for GitHub Pages to publish it, rerun the cache-bypassed all-37 production replay with `api.scryfall.com` blocked and `cards.scryfall.io` permitted, then record deployed SHA/evidence and close VM-559.

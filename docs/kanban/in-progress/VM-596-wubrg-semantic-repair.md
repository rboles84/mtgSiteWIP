# VM-596 — WUBRG Semantic Repair

ID: VM-596
Title: WUBRG Semantic Repair
Status: Closed — included in local SIRF baseline `ae11c3820c466475f6b181fcf3471ecff21e78cd`; no CRIT-001 recertification or push
Type: Protected semantic provenance and presentation repair
Area: WUBRG raw profile / Archscry dossier / generated presentation
Priority: Launch-critical correctness
Created: 2026-08-29

## Summary

Reconcile the completed internal WUBRG Semantic Audit with the owner-supplied external evidence synthesis, preserve the certified eight-claim and Placement boundaries, and repair the Five-Color source-to-render path so all-five access is canonical while philosophy, integration, archetype, mechanics, and table behavior remain explicitly contextual.

## Source

- Owner implementation request supplied 2026-08-29: `WUBRG Semantic Repair — Reconcile Research, Fix Provenance, Implement Final Five-Color Model`.
- Independent research artifact supplied as `WUBRG External Evidence Audit.md`; retained as shaping/research history, not direct claim authority.
- Prior internal WUBRG Semantic Audit completed in the preceding task.
- Certified WUBRG semantic candidate: `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`.
- Current implementation base: `fbea856b2a480d722db58401598c9d8a9b704baf` on `main`.

## RobDevPass Contract

- Product outcome: Five-Color renders as access to all five colors with contextual meaning, qualified mechanics, and distinct construction directions; Full-Spectrum Integrator remains a visibly Vox Mana archetype rather than a universal role.
- Current behavior: generated display and approved dossier copy elevate coalition/synthesis/integration into universal identity, use generated faction archetypes as supposed authored evidence, force `WUBRG` as the public label, and contain a runtime replacement that strips the Vox Mana qualification.
- Locked decisions: preserve all eight certified claim statements; preserve Placement questions, scoring, calibration, axes, candidate formation, aliases, routing, preview order, Card Signals, precons, and recommendations; do not add unlocated external claims to authoritative chains; stop at Owner Review without commit or push.
- Owning layers: WUBRG raw profile/source ledger for governed synthesis and limitations; `data/identity-layers.json` for registry/display input; identity-dossier source plus its producer for public dossier copy; Archscry presentation/foundation for contextual composition; runtime renderer for formatting only.
- Authoritative producers: `scripts/build/build-faction-artifacts.mjs` for faction/placement/context projections and a reproducible identity-dossier catalog producer for the approved source.
- Existing machinery: current raw profile, source ledger, identity-layer display shape, dossier source/catalog shape, faction builder, VM-579 direct-review route, and focused dossier/runtime tests.
- Changed behavior: WUBRG profile/display/presentation semantics, WUBRG dossier provenance and content, WUBRG label composition, WUBRG-only runtime strengthening removal, and focused semantic tests.
- Protected behavior: every non-WUBRG identity; WUBRG certified claim statements; Placement, scoring, routing, aliases, preview eligibility/order, Colorless boundary, card/precon facts and ordering, persistence, telemetry, and VM-595 research outputs.
- Consumers/blast radius: Home WUBRG preview/display note, Archscry hero, Start Here, Test the Fit, What to Look For, How This Plays, summary strips, card-detail identity context, generated faction/context data, and focused tests; representative neighboring identities require regression review.
- Relevant states: direct-review and normal composed WUBRG dossier at desktop and narrow/mobile widths; shared renderer neighbors; missing/non-universal role must remain useful rather than empty.
- Smallest complete implementation: correct the governed WUBRG profile and display input; record the external synthesis as non-claim-bearing research; repair dossier source/provenance and producer; remove WUBRG-only semantic strengthening; regenerate owned artifacts; add focused contract tests; render QA.
- Non-goals: no new external web research, new claim statements, Placement/scoring/certification rewrite, all-37 prose cleanup, generic dossier redesign, new branch/worktree, commit, push, deployment, or owner acceptance.
- Stop conditions: any frozen Placement/claim drift, unresolved primary-source requirement, generated artifact without a responsible producer, non-WUBRG semantic drift, failed deterministic generation, or rendered correctness blocker.

## Finalization Pass — 2026-08-30

- Owner-approved model remains unchanged: all-five access is canonical; integration is optional Vox Mana interpretation; access-based toolbox and typal plans remain legitimate.
- Completed authored/generator work: Test the Fit now uses the access-oriented `materially serves` boundary; How This Plays and fallback presentation now teach the available construction modes; Rainbow Payoffs appears in What to Look For from the raw WUBRG profile; Turtle Power! source and generated catalog use `Leonardo, the Balance` as main commander and retain `Heroes in a Half Shell` as an alternate; all five displayed WUBRG source rows now use official Wizards decklists.
- Environmental note: `npm.cmd run build:factions` continues to fail with Windows `EPERM` on concurrently locked `data/placement-model.schema.json`. Do not hand-edit that generated file or disturb the concurrent lock owner. The owner independently reviewed the actual rendered candidate and accepted it, including the corrected Turtle Power! face commander.

## Acceptance Criteria

- [x] AC1 — Five-Color remains evidence-correct: all-five access without universal philosophy, lore, role, superiority, integration, or completion.
- [x] AC2 — Both integrated all-five plans and access-based typal/toolbox/commander reasons are valid; literal WUBRG payoffs are not required.
- [x] AC3 — Player-facing Test the Fit, Start Here, How This Plays, and What to Look For are useful without weakening semantic limits.
- [x] AC4 — Precon metadata is correct in rendered Precon Starting Points; owner review confirms Turtle Power! renders Leonardo, the Balance and WUBRG products remain exact-color fits.
- [x] AC5 — Focused source/catalog safeguards and owner-rendered review confirm the accepted source → generation → runtime → UI boundary. The unrelated shared-file lock remains recorded but does not authorize generated-file hand edits.

## Owner Review Readiness

- Risk class: QA-3. The change repairs a certified identity's public semantic model and generated presentation path while deliberately preserving certified claim and Placement behavior.
- Source/provenance: the external audit is retained in-repo as shaping-only research because its evidence ledger supplied no primary-source locators; certified WUBRG claims and the raw profile remain authoritative.
- Deterministic result: the new dossier producer validates 37 approved records, copy hashes, raw-source WUBRG exploration locators, explicit Integrator optionality, seven mechanic relationship classes, and catalog freshness.
- Protected result: eight claim statements, raw Placement, color arrays, routing, aliases, placement eligibility, preview eligibility/order/scores, questions, scoring, Card Signals, and precon support remain unchanged.
- Rendered result: WUBRG passed direct-review and production replay at desktop and mobile; White, Azorius, Jund, and Colorless rendered without console errors or visible regressions.
- Owner decision: PASS — owner accepted the final WUBRG review on 2026-08-30. No commit, push, deployment, certification, or integration has been authorized. The prior exact certified candidate remains the last certified state until a separately authorized exact-SHA workflow.

## Validation

- PASS — `npm.cmd run test:wubrg-semantic-repair`
- PASS — `npm.cmd run test:identity-dossier-content`
- PASS — `npm.cmd run test:source-generated`
- PASS — `npm.cmd run test:semantic-readiness`
- PASS — `npm.cmd run test:placement`
- PASS — `npm.cmd run lint:js`
- PASS — WUBRG production UI replay at desktop and mobile
- PASS — in-app rendered QA at 1440×1000 and 390×844, plus White, Azorius, Jund, and Colorless desktop neighbors
- PASS — `git diff --check` and exact protected-field comparison
- INHERITED — the broad VM-551 integrity and dossier-followup scripts stop on unrelated stale source-pattern expectations already absent at `HEAD`; their WUBRG-specific assertions were updated, and the focused VM-596 suite passes.

## Files Likely Impacted

- `docs/research/wubrg/`
- `data/raw-factions/wubrg/`
- `data/identity-layers.json`
- `data/dossier/identity-dossier-content.source.json`
- dossier/faction generated projections and producers
- WUBRG-specific Archscry presentation/foundation/runtime seams
- focused WUBRG, dossier, provenance, and renderer tests
- required Kanban/handoff records

## Risks

- The certified raw Placement model still uses integration/coalition as a placement lens; presentation must distinguish that interpretive result from the broader Five-Color identity without changing scoring.
- The external research packet has no populated source URLs, so it cannot authorize new primary-source claim chains.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` already contain uncommitted VM-595 hunks; edits must be additive and preserve them exactly.
- Raw-profile edits invalidate the prior exact certified tree and therefore remain an uncommitted Owner Review candidate until a later explicitly authorized exact-SHA workflow.

## Implementation Prompt

Apply the owner-supplied semantic contract through the existing WUBRG source-to-render pipeline. Treat all-five access as canonical, contextuality as the governing boundary, integration as one optional Vox Mana archetype, and mechanics according to relationship strength. Preserve frozen Placement and claim behavior, regenerate rather than hand-edit projections, perform rendered QA, and stop at Owner Review without commit or push.

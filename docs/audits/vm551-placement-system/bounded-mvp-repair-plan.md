# VM-551 Bounded MVP Repair Boundary

Status: implementation-planning input only. This document does not authorize implementation, task creation, integration, push, deployment, or certification.

Precedence: `bounded-mvp-repair-plan.md`, `requirements-traceability-matrix.csv`, and `downstream-compatibility-contract.md` jointly govern the repair boundary. Narrative summaries must agree with them.

## Gate A — Immediate trust containment

Smallest outcome: stop presenting an editorial weighted score as calibrated identity accuracy and preserve states where the current evidence cannot support a clear result.

- Defects: D002, D003, D005–D007, D017, D020, D023.
- Requirements: REQ-A-001 through REQ-A-005.
- Likely production files if later authorized: `assets/js/adaptive-placement.js`, `assets/js/commander-dossier.js`, `assets/js/archscry-presentation.js`, `assets/js/shared.js`, Archscry result template/route HTML, and focused result-state tests.
- Identities/families: all 37; especially exact ties, weak rank two, guild/college collisions, Colorless, WUBRG, and four-color cross-family results.
- Question scope: no questionnaire refit. Preserve unknown/insufficient/invalid/incomplete outcomes from existing response and state evidence, and contain or suppress a misleading named result when necessary.
- Scoring-contract scope: no model refit and no scoring/stopping change. Name the model adaptive weighted scoring; preserve accumulated scores, softmax shares, gaps, ranking inputs, and adaptive stopping inputs; expose additive tie/insufficient state; stop presenting softmax share as calibrated confidence.
- Output-contract scope: remove public numeric confidence, probability, correctness, and strength claims only. Preserve existing serialized field names/shapes and all cache, profile, saved-reading, legacy, OAuth, dossier, recommendation, deck-link, adjacent-view, Matrix, Maze, and return consumers. New public states are additive; numeric ranks are close alternatives, not adjacency; unsupported motivation/table/deck claims fall back to bounded observation language. The authored Mana Alignment Matrix remains separate from confidence and from the placement-derived `mana_scores` dossier payload.
- Required tests: exact/near tie; no-direction/incomplete; weak rank two; legacy missing confidence; no fabricated numeric fallback; no public numeric confidence output; field-shape and writer/reader compatibility; session-cache, profile, OAuth, and saved/legacy-reading round trips; primary dossier and alternative/adjacent rendering; recommendation and deck-link rendering; authored Matrix and placement-result mana-alignment rendering; Maze handoff and return-to-dossier state; one representative identity per structural family; mobile/keyboard/state regression.
- Owner decisions: exact public terminology; whether Gate A suppresses named placement when current minimum evidence is not established; whether close alternatives are shown or omitted.
- Source/corpus dependencies: exact draft.4 boundary and certified identity names only; no new semantic research required to stop overclaiming.
- Entry conditions: owner accepts the remediated authority record, D004 correction, and Gate A output boundary; `result-field-consumer-map.csv` receives independent review; every material field is classified `PRESERVE-UNCHANGED`, `PRESERVE-INTERNAL-HIDE-PUBLICLY`, `ADDITIVE-EXTENSION`, `VERSIONED-MIGRATION-LATER`, or `UNRESOLVED-BLOCKER`; and no `UNRESOLVED-BLOCKER` enters Gate A implementation planning.
- Stopping point: public output is honest about the current heuristic while existing internal numbers, result-field shapes, persistence, dossier, Matrix, recommendation, deck-link, adjacent-view, and Maze consumers remain compatible; no questionnaire refit, calibration, recommendation redesign, destructive field removal/rename, or new identity semantics.

### Gate A downstream compatibility contract

Gate A changes public interpretation/rendering only. Internal numeric values may remain necessary for ranking, adaptive selection/stopping, deterministic replay, legacy compatibility, and regression testing. Existing serialized field names and shapes remain stable. Additive result-state examples include `result_state`, `public_confidence_state`, `alternative_state`, `confidence_display_mode`, `model_kind`, `legacy_result`, `limitations`, and `compatibility_version`; these are planning examples, not authorization to implement them.

Gate A implementation planning is prohibited until the machine-reviewable result-field consumer map is independently reviewed under `downstream-compatibility-contract.md`. No destructive removal or rename belongs in Gate A. Any future replacement requires a separately reviewed additive version/migration contract and owner authorization.

## Gate B1 — First controlled-pilot correctness slice

Smallest outcome: a disciplined, bounded pilot can test whether a minimal question/scoring slice distinguishes owner-approved high-risk identity contrasts without forcing certainty.

- Defects: D001, D004, D008–D011, D014–D015, D036, D038–D040.
- Requirements: REQ-B1-001 through REQ-B1-006.
- Likely production files if later authorized: canonical placement-question/signal source chosen by owner, builder question-bank section, generated placement model/schema only through the authorized source pipeline, adaptive scoring/branching, result serializer, and new pilot-only validation fixtures. Exact paths require implementation planning after owner acceptance.
- Identities/families: all five guild/college same-color pairs; Bant/Grixis/Sultai/Temur; Izzet/Esper/Jeskai/Lorehold/Colorless/Yore/Ink; every four-color identity; WUBRG. Remaining identities stay covered by regression, not equal-depth redesign in this slice.
- Question scope: select the smallest evidence-derived, Commander-relevant, single-construct subset. Exclude every question that lacks owner-approved construct/evidence/false-positive contracts. Do not rewrite all 113.
- Scoring-contract scope: stable answer/signal IDs; one reviewed scoring authority; explicit effect units; dependency groups/caps; executable minimum-hit and guardrail decisions; close/unknown/insufficient outcomes; deterministic tie handling.
- Output-contract scope: pilot output states observed constructs and uncertainty; recommendations may be hidden or clearly generic exploration until Gate C.
- Required tests: full active-question/answer reachability; independently derived all-37 synthetic profiles; five same-color pair confusion sets; shard/wedge boundary samples; five four-color + Colorless + WUBRG; 44,005-style matched perturbation report; repeated-construct duplicates; answer-order; contradictory/mixed/no-direction; minimum-hit/guardrail; branch coverage. Current golden-path-derived probes are reachability fixtures only.
- Owner decisions: pilot identity/family strata; minimum evidence unit; allowed negative evidence; perturbation thresholds; close/unknown thresholds; whether pilot results are saved; which questions are excluded.
- Source/corpus dependencies: certified CRIT-001 identity definitions; CECOS-compliant derivation records; applicable tutor/combo and other research only as bounded support; no use of Strategium/Apocrypha presentation as scoring authority.
- Entry conditions: Gate A passes; owner approves exact pilot construct set, thresholds before results, response consent/data boundary, and acceptable result states.
- Stopping point: bounded local/controlled player pilot candidate. No general public accuracy claim, numeric confidence, broad recommendation personalization, full 113-question migration, or certification.

## Gate B2 — Deferred correctness expansion

Smallest outcome: extend the validated contracts beyond the first pilot without blocking it on lower-risk completeness work.

- Defects: D012–D013, D016, D029–D030, D032, D037.
- Requirements: REQ-B2-001 plus the retained detailed data/test requirements.
- Likely production files: placement schema, remaining question sources, builder validators, source/generated manifests, compatibility/version fields, comprehensive bias/branch tooling.
- Identities/families: remaining mono/guild/college/shard/wedge contrasts and low-frequency branch states; complete rank-state coverage where product requirements still need it.
- Question scope: adjudicate remaining excluded questions only when evidence/comprehension dependencies exist.
- Scoring-contract scope: remove dead controls, make active branches reachable or retire them, strengthen schemas/manifests, expand normalization/bias review.
- Output-contract scope: preserve Gate A states; no added certainty.
- Required tests: clean-checkout deterministic build, source/generated hashes, all active effects used, dead branch zero tolerance, broader scenario corpus.
- Owner decisions: fairness thresholds, legacy migration extent, completeness versus pilot learning value.
- Source/corpus dependencies: pilot findings and reviewed question derivations.
- Entry conditions: first pilot produces analyzable evidence and no Gate A regression.
- Stopping point: correctness coverage expanded; copy/recommendation polish still excluded.

## Gate C — Interpretation and UX quality

Smallest outcome: explanations, recommendations, state, and rendering become useful without claiming more than the corrected model/evidence supports.

- Defects: D018–D019, D021–D022, D024–D028, D031.
- Requirements: REQ-C-001 and REQ-C-002 plus detailed copy/recommendation/state/UI requirements.
- Likely production files: dossier/presentation templates, recommendation records/resolvers, Archscry result markup/styles, persistence/deep-link handling, metadata.
- Identities/families: all 37 primary states and only reviewed adjacent relationships.
- Question scope: none except explanation wording linked to active signals.
- Scoring-contract scope: no score changes.
- Output-contract scope: claim IDs/entailment, recommendation types/freshness/unresolved legality, semantic headings, mobile controls, state/deep-link disclosure.
- Required tests: all-37 copy corpus, all allowed adjacent states, recommendation legality/status, desktop/mobile/a11y/state/metadata.
- Owner decisions: voice, repetition tolerance, recommendation visibility, durable result URLs.
- Source/corpus dependencies: reviewed claim and recommendation contracts; locally authoritative legality/freshness sources.
- Entry conditions: Gate B1 result contracts are stable.
- Stopping point: interpretation and UX quality complete; no calibration/certification claim.

## Gate D — Hardening

Smallest outcome: long-term reproducibility, calibration, migration, monitoring, and certification tooling are ready for a separately authorized release process.

- Defects: D030, D033–D034 and residual automation/migration risks.
- Requirements: REQ-D-001 and retained hardening requirements.
- Likely production files: test infrastructure, manifests, migration adapters, calibration/monitoring tooling, reviewed visual baselines.
- Identities/families: exhaustive all-state coverage.
- Question scope: version/migration coverage.
- Scoring-contract scope: empirical calibration only with an approved design; Bayesian language only if an actual Bayesian model is specified and validated.
- Output-contract scope: historical labeling, monitored drift, exact release provenance.
- Required tests: independent exact-SHA rerun, calibration, clean checkout, visual/a11y, migration, source/generated/deployed reconciliation.
- Owner decisions: calibration target/outcome, thresholds, release/certification authority.
- Source/corpus dependencies: approved pilot corpus and independent review.
- Entry conditions: Gates A–C accepted; separate implementation/review/certification authorization.
- Stopping point: candidate ready for an independent review gate, not automatically deployed or certified.

## Explicitly excluded from the first implementation pass

- Rewriting all 113 questions or all 356 answers.
- Converting the heuristic into a Bayesian model.
- Numeric confidence calibration.
- Full recommendation/Commander legality resolver redesign.
- Template diversification and copy polish beyond stopping misleading claims.
- Durable result sharing, analytics, accounts, cross-device persistence, or unrelated routes.
- Canonical identity-semantic edits or CRIT-001 recertification.
- Visual baseline creation/acceptance.
- Full historical-result migration.
- Removal or rename of existing result fields, storage keys, profile columns, dossier payloads, Matrix inputs, deck-link metadata, adjacent-view state, or Maze handoff state.
- Changes to internal scores, softmax ranking, adaptive stopping, question selection, or the authored Mana Alignment Matrix.
- Production certification, integration, merge, push, or deployment.

The first pass ends at Gate A containment plus an owner-approved Gate B1 controlled-pilot candidate. Nothing in this document authorizes that work to begin.

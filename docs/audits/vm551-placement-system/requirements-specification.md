# VM-551 Draft.4-Informed Repair and Requirements Specification

Status: design specification only. Implementation is not authorized by this document.

Governing CECOS input: exact draft.4 object recorded in `audit-input-authority.md`. Draft.2 is not authority for this remediation.

Boundary precedence: `bounded-mvp-repair-plan.md`, `requirements-traceability-matrix.csv`, and `downstream-compatibility-contract.md` jointly govern the repair boundary. Narrative summaries must agree with them. This broader design specification describes eventual contracts; it does not move Gate B1 or B2 work into Gate A.

## Design principles

The repair architecture follows the CECOS evidence boundary:

```text
preserved evidence
  -> compliant observations
  -> reviewed findings
  -> controlled product interpretation
  -> implementation and rendering
```

Question prompts and closed answer options are product-authored instruments, not corpus observations or player language. A selected answer is product-response data whose permitted interpretation must be separately derived and reviewed. Placement, confidence, copy, and recommendations are derived outputs. Derived outputs never become their own evidence. Unknown, mixed, contradictory, and insufficient states must remain representable.

## Canonical contracts

### Canonical evidence record

Each evidence record must contain:

- stable evidence ID and version,
- source authority class (`official`, `community-consensus`, `heuristic`, `editorial`, `not-public-factual`),
- exact source/provenance locator,
- preserved observation,
- permitted interpretation scope,
- prohibited inference,
- review status and reviewer,
- uncertainty/unknown markers,
- content hash.

Lore/mechanics evidence and observable Commander-behavior evidence must be separate records. An explicit interpretive bridge is required when the product moves between them.

### Controlled signal vocabulary

Every placement signal must have:

- stable signal ID and definition,
- behavioral dimension (gameplay, social, motivation, aesthetic, lore affinity, philosophy),
- observable indicators and counter-indicators,
- correlation group,
- evidence authority,
- identities supported/opposed,
- known confounds,
- public-claim entailments,
- disallowed stereotypes.

Signals from different dimensions may coexist but must not be treated as interchangeable evidence.

### Question-to-signal contract

Every question and answer must specify:

- stable versioned IDs,
- exact player wording,
- intended observation,
- direct/inferred/speculative mapping status,
- positive and negative controlled signals,
- correlation group and double-count protection,
- neutral/mixed/unsure behavior,
- identity effects and bounded weights,
- confidence contribution,
- evidence/claim references,
- ambiguity and accessibility review,
- tests for overlap, steering, stereotype, and contradiction.

### Identity evidence contract

Each of the 37 identities must specify:

- canonical ID/name/family/colors,
- recovered behavioral definition,
- minimum independent positive evidence,
- required differentiators,
- opposition/boundary signals,
- false-positive guardrails,
- college/guild and mono/multi boundary rules where applicable,
- four-color/Colorless/WUBRG exact semantic guards,
- allowed adjacent relationship types,
- permitted public claims,
- recommendation eligibility rules,
- evidence and contract version/hash.

### Score or probability contract

The owner must choose and name one model honestly:

- If weighted scoring: define score units, normalization, correlation handling, negative evidence, comparable ranges, thresholds, and decision validation. Do not use posterior/probability terminology.
- If Bayesian: define priors, conditional likelihoods, dependency assumptions, estimation data, posterior computation, calibration, and validation. Hand-authored affinities alone are insufficient.

Both options require deterministic replay, exact tie handling, missing/neutral behavior, sensitivity analysis, and all-37 opportunity normalization.

### Confidence contract

Confidence state must derive from evidence amount, authority/quality, agreement, distinctiveness, perturbation stability, and empirical calibration. Numeric percentages are prohibited until they predict an externally reviewed outcome at documented rates. Legacy unknown confidence remains unknown.

### Primary and adjacent selection contract

- Primary requires minimum independent positive evidence and a passed false-positive guardrail.
- Exact ties return a tie/mixed result unless a traceable discriminator resolves them.
- Near ties return close alternatives unless one identity meets a distinctiveness rule.
- Adjacent requires independent positive evidence plus an explicit relationship type.
- Numerical second/third alone is not adjacency.
- Low secondary strength omits adjacency.
- College/guild, mono/multi, four-color, Colorless, and WUBRG comparisons require their specific boundary rules.

### Copy claim contract

Every generated material claim must declare:

- claim ID and template/identity source,
- selected evidence needed,
- identity evidence needed,
- evidence class,
- certainty/qualification rule,
- allowed primary/adjacent/mixed uses,
- disallowed inferences,
- fallback and grammar variants.

Personality, motivation, deck behavior, table perception, lore, and strategy must remain distinct claim classes.

### Recommendation contract

Every recommendation must declare:

- object type (commander, precon, archetype, identity, card, external search),
- legality evidence and freshness,
- exact or stretch color relationship,
- mechanical/strategic fit evidence,
- popularity evidence if claimed,
- editorial status,
- selected-answer rationale if personalized,
- limitation/skip-if copy.

Recommendation ranking must never feed back into placement evidence.

### Rendering contract

Every result state must render:

- primary/mixed/insufficient/close-alternative/adjacent status,
- one consistent strength state,
- evidence summary and limitations,
- semantically headed sections,
- accessible tab and all-section navigation,
- responsive/no-overflow behavior,
- honest route/deep-link metadata,
- versioned result provenance,
- graceful invalid/stale/partial-state handling.

## Requirements by repair domain

### Logic repair

- `REQ-LOGIC-001`: Build the live question bank exclusively from reviewed question-to-signal contracts.
- `REQ-LOGIC-002`: Rename the current model weighted/adaptive scoring, or replace it with a specified Bayesian model before Bayesian terminology is used.
- `REQ-LOGIC-003`: Enforce per-identity minimum independent positive evidence and false-positive guardrails.
- `REQ-LOGIC-004`: Serialize exact ties, near ties, mixed, and insufficient states explicitly.
- `REQ-LOGIC-005`: Enforce recovered CRIT-001 boundaries in live selection, including college/guild and edge identities.
- `REQ-LOGIC-006`: Apply or remove every declared scoring control; no dead configuration may imply nonexistent behavior.
- `REQ-LOGIC-007`: Normalize evidence opportunity and pass all-37 bias/sensitivity gates.
- `REQ-LOGIC-008`: Model or cap correlated evidence; answer order must not change an otherwise identical evidence set.

### Question-design repair

- `REQ-QUESTION-001`: Provide explicit neutral, mixed, none, and unsure handling without manufacturing directional evidence.
- `REQ-QUESTION-002`: Make the MVP Gate behavior-first, dimension-separable, and bounded so no early answer predetermines broad identity families.

### Confidence and adjacency repair

- `REQ-CONF-001`: Replace softmax-share confidence with a reviewed state covering evidence amount, quality, agreement, distinctiveness, stability, and calibration.
- `REQ-CONF-002`: Use one confidence-state source across serialization, primary/adjacent copy, summaries, and rendering.
- `REQ-CONF-003`: Preserve missing or legacy confidence as unknown; never synthesize a numerical value.
- `REQ-ADJ-001`: Require independent positive evidence and a reviewed relationship type before an identity is labeled adjacent.

### Evidence repair

- `REQ-EVID-001`: Link every live answer effect to reviewed evidence and signal contracts.
- `REQ-EVID-002`: Add explicit lore/philosophy-to-Commander-behavior interpretive bridges where public copy needs them.
- `REQ-EVID-003`: Preserve direct, inferred, speculative, mixed, contradictory, and unknown classifications.
- `REQ-EVID-004`: Review every public identity claim for source scope and public suitability.

### Copy-generation repair

- `REQ-COPY-001`: Generate only claims entailed by the selected evidence state and identity contract.
- `REQ-COPY-002`: Establish identity-specificity thresholds and review the all-37 comparison corpus.
- `REQ-COPY-003`: Use grammar-safe fragments for all confidence/status combinations.
- `REQ-COPY-004`: Qualify table perception, deck style, and motivation as possible interpretations.
- `REQ-COPY-005`: Prevent adjacent views from reusing primary-only claims or strength.
- `REQ-COPY-006`: Remove repeated identity blocks when all-section view already provides the same claim.

### Data and pipeline repair

- `REQ-DATA-001`: Add stable IDs to all questions, answers, signals, claims, recommendations, and relationship records.
- `REQ-DATA-002`: Enforce schemas for IDs, effects, ranges, references, controlled vocabulary, and decision invariants.
- `REQ-DATA-003`: Generate an input manifest with hashes and serialize the exact model/evidence contract version into results.
- `REQ-DATA-004`: Refresh and validate Commander legality with complete commander-enabling rules or mark unresolved records as unverified.
- `REQ-DATA-005`: Establish one canonical source for Hall/Crucible data and remove duplicate manual synchronization.
- `REQ-DATA-006`: Validate source/generated reconciliation; stale output fails the gate.

### Recommendation repair

- `REQ-REC-001`: Record and render recommendation type, legality/freshness evidence, mechanical/strategic rationale, personalization basis, and editorial limitations.
- `REQ-REC-002`: Label exact-color, extra-color stretch, popularity, and support-only exploration as distinct recommendation states.

### State and persistence repair

- `REQ-STATE-001`: Restore versioned partial state or explicitly warn that refresh/navigation will discard it.
- `REQ-STATE-002`: Define validated saved-result/deep-link semantics and explain invalid or unavailable result references instead of silently showing landing.

### UI and rendering repair

- `REQ-UI-001`: Align metadata and shareability claims with resolvable route semantics.
- `REQ-UI-002`: Use semantic headings for every major dossier section.
- `REQ-UI-003`: Make mobile tab overflow discoverable and keyboard operable.
- `REQ-UI-004`: Present mixed/insufficient/close-alternative states without primary certainty language.
- `REQ-UI-005`: Show why an adjacent relationship exists and its relationship type.
- `REQ-UI-006`: Label recommendation evidence type and freshness.

### Testing and validation

- `REQ-TEST-001`: Cover primary, rank-two, rank-three, mixed, tie, and insufficient behavior for all 37 identities.
- `REQ-TEST-002`: Add exhaustive/deterministic gates for reachability, opportunity, bias, correlation, order, tie, contradiction, and one-answer perturbation.
- `REQ-TEST-003`: Validate confidence calibration on an independently reviewed player-response corpus.
- `REQ-TEST-004`: Validate every generated claim against its claim contract.
- `REQ-TEST-005`: Compare all 37 primary and allowed adjacent copy surfaces for duplicates, contradiction, unsupported certainty, grammar, and missing blocks.
- `REQ-TEST-006`: Validate Commander legality/freshness and exact/stretch recommendation status.
- `REQ-TEST-007`: Run desktop/mobile rendering, accessibility, keyboard, refresh, invalid state, direct URL, restart, and handoff tests.
- `REQ-TEST-008`: Make aggregate validation self-contained in a clean checkout or fail early with an exact, verified fixture prerequisite.
- `REQ-TEST-009`: Predeclare and test one-answer perturbation thresholds by identity and structural family; unstable results must downgrade to close/unknown rather than retain certainty.

### Additional remediation contracts

- `REQ-GOV-001`: Every governing audit input must have an exact repository, Git object, path, checksum, role, and verification result; unpreserved web evidence cannot be audit authority.
- `REQ-QUESTION-003`: The first pilot may use only evidence-derived, Commander-relevant, single-construct questions with reviewed false-positive/negative and representational-failure handling.
- `REQ-LOGIC-009`: Every active question and answer must be reachable under the declared branching contract or removed from active coverage claims.
- `REQ-LOGIC-010`: Repeated constructs must share a controlled dependency group and a cap/model/disclosure; raw repeated answers cannot count as independent evidence by default.
- `REQ-CONF-004`: Perturbation stability must contribute to the result state; locally unstable primary results cannot use strong certainty language.
- `REQ-CONF-005`: Evidence amount/confidence must count independent evidence units rather than repeated authored signals.
- `REQ-IDENTITY-001`: Reachability/golden-path success cannot satisfy distinctiveness; all 37 require reviewed nearest-competitor, unique-discriminator, minimum-hit, guardrail, and scenario coverage.

### Migration and compatibility

- Version the new result schema and retain read-only legacy parsing.
- Never convert missing legacy confidence to a number; use `unknown`.
- Do not silently reinterpret legacy scores as new confidence states.
- Gate A changes public interpretation/rendering only. Preserve internal scores, softmax shares/gaps, ranking/stopping inputs, serialized result-field names/shapes, cache/profile/saved/OAuth/legacy state, dossier/recommendation/deck-link/adjacent/Maze consumers, and historical model/result versions.
- Add bounded public states as new fields; do not replace or rename existing fields. Missing additive fields normalize to unknown/incomplete without fabricated certainty.
- Keep authored `preview_scores`/component-average Mana Alignment Matrix values separate from public confidence and from the placement-derived normalized `mana_scores`/dossier `manaAlignment` path.
- A future destructive schema change requires a separately reviewed additive version/migration contract, consumer review, compatibility testing, and owner authorization.
- Gate A implementation planning is prohibited until `result-field-consumer-map.csv` receives independent review and every material field has an allowed disposition with no `UNRESOLVED-BLOCKER` entering planning.
- Invalidate or migrate cached partial state when contract/model hashes differ.
- Preserve saved results as historical outputs with their original model version.
- Do not mutate CRIT-001 certified raw records through placement repair; reference them by exact version/hash.
- Keep recommendation and radar migrations separate from placement semantics unless their contracts explicitly change.

## Validation gates

1. Source integrity: all canonical inputs and hashes resolve; no source/generated drift.
2. Contract completeness: 37 identities, every question/answer/signal/claim/recommendation covered.
3. Logic correctness: ties, unknown, minimum evidence, correlation, order, and edge identities pass.
4. Bias/reachability: agreed opportunity and sensitivity thresholds pass for all 37.
5. Claim safety: every material public claim is entailed and classified.
6. Recommendation safety: legality/freshness/type/rationale are explicit.
7. Rendering: all result states pass responsive, accessibility, keyboard, metadata, and persistence checks.
8. Independent product review: reviewer reruns controls from exact candidate SHA and source inputs; corpus artifacts separately follow draft.4 review requirements.
9. Later production certification: reviewed/generated/deployed truth is reconciled before trackers, release metadata, or certification change. This is Vox Mana product governance, not a claim that CECOS defines Archscry certification.

Any `FAIL` or `UNKNOWN` in a trust-blocking control stops progression. Only exact candidate SHAs may be reviewed, approved, or certified.

## Independent review and later production certification

Independent review must:

- rerun generator, exhaustive paths, matrices, and contract validators;
- inspect a stratified player-response corpus, not implementation summaries;
- review exact ties, weakest winners, below-strong-minimum proxy paths, college/guild collisions, four-color, Colorless, and WUBRG;
- compare primary and adjacent copy against selected evidence;
- revalidate current Commander legality;
- inspect representative desktop/mobile routes;
- record exact candidate SHA and source hashes.

Production certification is a later, separately authorized Vox Mana gate. It must reconcile canonical, generated, reviewed, and deployed truth. Draft.4 directly governs corpus release/review, while Archscry product certification remains a separate project contract. VM-551 does not authorize either implementation or certification.

## Prioritized repair sequence

### Gate A — Immediate trust containment

1. Freeze terminology: stop calling current shares Bayesian probability or calibrated confidence.
2. Remove public numeric confidence/probability/correctness/strength claims; preserve internal numeric behavior and existing result/storage/consumer shapes; keep missing legacy confidence unknown; add only backward-compatible bounded public states after the consumer map is independently reviewed.
3. Emit explicit tied, close, mixed, insufficient, and invalid/incomplete states instead of forced certainty.
4. Treat numeric second/third as close alternatives or omit them; reserve adjacency for a later relationship contract.
5. Constrain first-pass copy to selected observations and qualified interpretation.

Gate A performs no questionnaire refit, scoring-authority rebuild, or minimum-hit/guardrail implementation except what is strictly necessary to prevent a misleading named result state.

### Gate B1 — First controlled-pilot correctness slice

1. Select the smallest evidence-derived, Commander-relevant, single-construct question set for owner-approved high-risk contrasts.
2. Add stable IDs/provenance, unknown/mixed handling, one scoring authority, dependency groups, minimum hits, and executable guardrail decisions.
3. Pass independently derived all-37 profile probes plus same-color guild/college, shard/wedge, four-color, Colorless, WUBRG, contradiction, repeated-construct, order, branch, and perturbation tests. The current 37 golden-path-derived probes are incomplete reachability checks, not this evidence.
4. Predeclare thresholds before pilot results and downgrade unstable/insufficient cases.
5. Stop at a controlled pilot candidate; do not claim public accuracy.

### Gate B2 — Deferred correctness expansion

1. Expand reviewed question coverage only from pilot evidence.
2. Strengthen schema, manifests, source/generated reconciliation, branch reachability, and dead-control removal.
3. Broaden opportunity/fairness coverage without delaying the bounded first pilot.

### Gate C — Interpretation quality

1. Regenerate claims from selected evidence contracts.
2. Distinguish primary, close alternative, meaningful adjacent, and exploration.
3. Reduce repeated template language and qualify table/deck/motivation claims.
4. Improve recommendation rationales and exact/stretch boundaries.
5. Repair headings, deep-link messaging, partial-state messaging, and mobile tab affordance.

### Gate D — Hardening

1. Full schema enforcement, manifests, hashes, and build reproducibility.
2. Empirical calibration corpus and monitored drift thresholds.
3. Exhaustive copy/route/accessibility automation.
4. Compatibility migrations and historical result labeling.
5. Independent review and production certification tooling.

MVP-first boundary: Gate A containment and Gate B1 precede a controlled player pilot. Gate B2 expansion, Gate C interpretation quality, and Gate D hardening must not enter the first pass unless an owner decision shows they are required to preserve the Gate A/B1 trust boundary. No implementation is authorized.

# VM-551 Gate B1 — Final Architecture Decision

Status: owner approved and integrated into design documentation plus the isolated owner prototype. No scoring, routing, runtime, player validation, or production artifact is changed.

Starting commit: `f5b030e12871e4a5ca7706d29d25c096a0d51748`

## 1. Executive decision

Owner disposition (2026-08-08): all five recommendations below are approved. The integration uses Option 2 for C16: one added adaptive construct/item, preserving every prior behavioral ID and the six-to-eight-question journey. The final design inventory is 16 constructs, 35 behavioral questions, 110 behavioral answer contracts, 37 identities, and 123 unchanged confusion pairs.

| Question | Recommendation | Confidence | Owner decision required |
|---|---|---:|---|
| Three-axis readiness | Replace the overloaded single label conceptually with independent **content readiness**, **instrument observability**, and **mapping validation** axes. | High | Approve the states and transition rules below. |
| Esper construct | Add **information-to-plan conversion** as a new cross-identity behavioral construct in the future instrument-design pass. Do not assign it an ID, signal, question, weight, or stage yet. | Medium-high | Approve the dimension for later instrument design. |
| Yore evidence channel | Allow an optional, explicitly labeled **identity/lens self-report** evidence class only after behavioral narrowing and under the hard safeguards below. | Medium | Approve the secondary evidence class or retain behavior-only uncertainty. |
| Gate / Hall / Crucible | Choose **Option B: preserve counts, loosen stage semantics**. Keep four broad questions, two or three adaptive questions, zero or one targeted question, and the hard maximum of eight; the targeted slot need not always be an identity-specific behavioral Crucible. | Medium-high | Approve Option B. |
| 37/37 content goal | Conceptually normalize to **37 `CONTENT_READY`, 0 `CONTENT_PARTIAL`, 0 `CONTENT_GAP`**. This says the result package is ready if reached; it says nothing about whether B1 can reach it reliably. | High | Approve the conceptual normalization before any later matrix edit. |

The architecture remains behavioral first, dimensional before identity interpretation, non-scoring, and uncertainty-preserving. All directional identity associations remain evidence-required hypotheses.

Evidence authority remains separated: certified identity records establish identity truth; CECOS draft.4 at exact accepted object `947bf45bf6a191839b5fb4fa6c65980ed9d5737e` establishes whether situations and language are recognizable to Commander players; the Player Atlas and Commander Personality Matrix are vocabulary and architecture aids only. Community/player language never establishes identity assignment.

## 2. Three-axis status model

### A. Content readiness

This axis asks: **If sufficient evidence reaches this identity, does Vox Mana have an excellent, honest result experience to show?**

- `CONTENT_READY`: the package contains an answer-derived behavioral summary, certified identity context, a useful neighbor, a bounded distinction where one is supportable, an explicit limitation, Commander exploration, and useful dossier / Matrix / Maze / recommendation continuation. Observability and mapping validation do not affect this state.
- `CONTENT_PARTIAL`: one or more of those result-content components is materially weak or missing, even if the instrument can observe the identity.
- `CONTENT_GAP`: Vox Mana cannot yet present a useful, source-backed, honest result package. A label or atmospheric paragraph alone does not qualify.

### B. Instrument observability

This axis asks: **Can the current approved B1 instrument observe enough information to distinguish the identity from relevant competitors without importing unstated motive or philosophy?**

- `OBSERVABLE`: the current pool contains a direct, bounded identity-boundary observation. This is structural observability, not proof that the mapping is correct.
- `PARTIALLY_OBSERVABLE`: the pool observes relevant broad or family behavior but lacks a direct identity-specific discriminator. The instrument can narrow candidates but must preserve close or insufficient outcomes.
- `NOT_CLEANLY_OBSERVABLE`: the certified distinction depends on a layer that the behavioral instrument does not measure cleanly, or the current apparent discriminator measures a different construct. Behavioral answers alone must not manufacture the distinction.

The structural direct/broad classifications come from `identity-coverage-matrix.tsv:2-38`. Esper and Yore are exceptions to the matrix's nominal direct-hypothesis label because the certified-truth-first recovery proved that their current items observe C06/C09 behavior without reaching the certified boundary (`esper-yore-evidence-recovery.md:43-52,140-175,258-286`).

### C. Mapping validation

This axis asks: **Has eligible player evidence established that the observation-to-identity association works as intended?**

- `MAPPING_HYPOTHESIS`: the semantic contract can be reviewed, but eligible player evidence has not established the association. It remains evidence-required and non-scoring.
- `MAPPING_VALIDATION_IN_PROGRESS`: an authorized, predeclared player-validation protocol is collecting eligible evidence; no production inference is authorized.
- `MAPPING_VALIDATED`: the predeclared evidence standard has been met, contradictions and false positives have been adjudicated, and the exact mapping has received the required approval.

A rejected association is a disposition on the hypothesis, not a fourth readiness state: it must be retired or revised and return as a new hypothesis. No current B1 identity mapping is `MAPPING_VALIDATION_IN_PROGRESS` or `MAPPING_VALIDATED` (`owner-decisions.md:115-122,142-144`).

### Conceptual 37-identity inventory

This table proposes architecture states only. It does not alter `result-usefulness-matrix.tsv` or any placement record.

| Identity | Content readiness | Instrument observability | Mapping validation | Architectural reading |
|---|---|---|---|---|
| Abzan | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; broad/family behavior only. |
| Black | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; no direct mono boundary. |
| Bant | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct boundary hypothesis; high confusion risk is validation work. |
| Golgari | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct structural hypothesis, not validated. |
| Rakdos | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; broad/family behavior only. |
| Colorless | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct limitation/breadth observation; false positives remain unvalidated. |
| Dune | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct boundary hypothesis; label comprehension remains validation work. |
| Esper | `CONTENT_READY` | `NOT_CLEANLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Result content is complete; current B1 misses information-to-plan conversion. |
| Green | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; no direct mono boundary. |
| Glint | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct boundary hypothesis; comprehension/mapping unvalidated. |
| Grixis | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct hypothesis with high competitor confusion. |
| Ink | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct protected-access hypothesis; mapping evidence absent. |
| Jeskai | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct timing hypothesis; neighbor separation unvalidated. |
| Jund | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; broad/family behavior only. |
| Lorehold | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct structural hypothesis; distinctiveness evidence insufficient. |
| Mardu | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; broad/family behavior only. |
| Naya | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; broad/family behavior only. |
| Prismari | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct structural hypothesis, not validated. |
| Quandrix | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct structural hypothesis, not validated. |
| Red | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; no direct mono boundary. |
| Gruul | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; broad/family behavior only. |
| Silverquill | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct agreement-boundary hypothesis, not validated. |
| Sultai | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct hypothesis with high confusion risk. |
| Temur | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct hypothesis with high confusion risk. |
| Blue | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; no direct mono boundary. |
| Dimir | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; broad/family behavior only. |
| Simic | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct engine-boundary hypothesis, not validated. |
| Izzet | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct structural hypothesis; distinctiveness evidence insufficient. |
| White | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; no direct mono boundary. |
| Orzhov | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct agreement-boundary hypothesis, not validated. |
| Selesnya | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; broad/family behavior only. |
| Witch | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct growth/engine hypotheses; mapping and label comprehension unvalidated. |
| Witherbloom | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct resource-boundary hypothesis, not validated. |
| Boros | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct structural hypothesis, not validated. |
| Azorius | `CONTENT_READY` | `PARTIALLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Useful package; broad/family behavior only. |
| Five-Color | `CONTENT_READY` | `OBSERVABLE` | `MAPPING_HYPOTHESIS` | Direct breadth observation; false positives remain unvalidated. |
| Yore | `CONTENT_READY` | `NOT_CLEANLY_OBSERVABLE` | `MAPPING_HYPOTHESIS` | Result content is complete; behavior does not establish constructed-agency philosophy. |

Conceptual counts are **37 / 0 / 0** for content, **21 / 14 / 2** for observable / partial / not cleanly observable, and **37 / 0 / 0** for hypothesis / in progress / validated.

The old single label mixes concerns most visibly in four groups:

- Esper and Yore are `GAP` only because an instrument problem was stored as a content problem.
- Eleven current `PARTIAL` rows already have direct observations; their remaining concerns are false positives, comprehension, or mapping validation, not missing result content: Bant, Colorless, Dune, Glint, Grixis, Ink, Jeskai, Sultai, Temur, Witch, and Five-Color.
- Nine current `PARTIAL` rows have useful content but only broad/family observation: Abzan, Black, Green, Jund, Mardu, Naya, Red, Blue, and White.
- Five current `READY` rows are only partially observable: Rakdos, Gruul, Dimir, Selesnya, and Azorius. `READY` therefore never proved direct instrument coverage.

## 3. Esper construct analysis

### Atomicity

**Information-to-plan conversion** measures one post-information choice: after interaction or card access creates viable options, does the player prefer to consolidate a route, retain optionality, or exploit the opening now? The observation is a decision posture, not skill, intelligence, optimization quality, control density, threat-assessment accuracy, archetype, or motive. The accepted candidate is a useful comprehension probe, not approved wording (`esper-yore-evidence-recovery.md:140-163`).

The dimension survives wording changes because the recoverable kernel is the sequence **new information/options → preferred commitment posture**, not “draw cards,” “control,” or any identity slogan. It still needs novice comprehension and false-positive testing before a question is authorized.

### Distinction from current constructs

| Existing construct | What it observes | Why information-to-plan is not redundant |
|---|---|---|
| C01 Initiative posture | Advance a plan or hold resources to respond before the next event. | Information-to-plan begins after new options exist and asks what the player does with them. |
| C04 Advantage tempo | Accumulate small gains or seek a concentrated payoff. | Payoff cadence does not determine whether new information produces commitment, optionality, or immediate exploitation. |
| C06 Engine concentration | One central engine, replaceable pieces, or overlapping engines. | Structural dependency does not observe how a player chooses among newly available routes. |
| C08 Interaction timing / mana commitment | Tap now or preserve an interaction window around an opponent's commitment. | Timing the response is distinct from converting the resulting information or opening into a plan. |
| C09 Repeatability | Prefer familiar access to a route or game-to-game variance. | Cross-game route stability does not describe the current post-information choice. |
| C14 Setup tolerance | How long a player accepts preparation before affecting the table. | Waiting duration does not specify which route is selected after the wait produces options. |
| C15 Breadth / constraint | Prefer broad card-pool access or a bounded construction constraint. | Deckbuilding breadth does not establish in-game commitment posture. |

The current construct definitions explicitly exclude several of these inferences (`construct-map.tsv:2-16`); folding the candidate into any one of them would make that construct compound.

### Cross-identity usefulness

The observation is useful beyond Esper because it can test different boundaries without assigning any answer to an identity by itself:

| Context | Legitimate use of the observation | Required false-positive restraint |
|---|---|---|
| Blue | Separate acquiring options from choosing how those options change play. | Knowledge or card draw alone is not Blue proof. |
| Black | Test focused exploitation of an opening versus merely paying or converting resources. | Opportunism is not automatically mono-Black. |
| Azorius | Compare maintaining procedural/stable optionality with committing a designed route. | Control play and patience are not procedure proof. |
| Dimir | Compare retaining private leverage with consolidating or spending the opening. | Hidden information and interaction are not Dimir proof. |
| Grixis | Compare urgent exploitation with deliberate consolidation. | Survival and tempo pressure are not Grixis proof. |
| Jeskai | Observe whether pressure converts an opening immediately while response capacity remains relevant. | Tempo and open mana remain separate C01/C08 observations. |
| Control | Distinguish stabilizing into a closing route from keeping a broad answer set. | Archetype cannot assign identity. |
| Combo | Observe commitment to an assembled line after access improves. | Combo preference cannot assign Esper or any color. |
| Toolbox | Observe preservation of multiple live routes. | Tutors and flexible answers are not identity proof. |
| Midrange / tempo | Observe choosing a durable line versus using a transient window. | Board development and threat assessment remain separate. |

This reaches multiple important boundaries recovered for Esper—Blue/Esper, Azorius/Esper, Dimir/Esper, Esper/Grixis, and Jeskai/Esper—while also describing ordinary control, combo, toolbox, midrange, and tempo decisions. CECOS supplies recognizable Commander-language situations and counterexamples; certified identity records remain the only identity authority (`esper-yore-evidence-recovery.md:64-139`).

### Architecture cost and decision

**Decision: add a new cross-identity behavioral construct in a later authorized instrument-design pass.** It is atomic, nonredundant, understandable through a concrete post-interaction scenario, and useful across multiple identity and archetype boundaries. That makes it evidence-backed rather than an Esper patch.

The cost is one more behavioral dimension and another dependency to route and validate. It is justified only if the later design can keep the six-to-eight-question journey by replacing or adaptively selecting within the existing pool, not by making every player answer it. This packet does not decide an ID, question, signal, weight, identity association, or stage. If later wording cannot survive the documented false-positive tests, the construct remains available for research while Esper stays uncertain.

## 4. Yore observability analysis

Yore's result package is content-ready: it has certified constructed-agency context, documented neighbors, known artifact/recursion/conversion/combo false positives, a useful Commander expression, an honest limitation, and downstream continuation (`result-usefulness-matrix.tsv:38`; `esper-yore-evidence-recovery.md:177-290`).

Behavior still fails as a complete discriminator. Every player-natural kernel recovered from the retired questions—rebuilding, route changing, interchangeable conversion, artifact use, recursion, and engine redundancy—is already covered by C03/C06/C09/C12 or is generic behavior shared by Glint, Witch, Black, Grixis, combo, sacrifice, recursion, and artifact decks. The remaining certified distinction is constructed agency against natural limits: a philosophy/color-setting synthesis, not a uniquely observable Commander action. Another behavior question would either duplicate an existing construct or smuggle motive into the answer.

Archscry therefore should not require all 37 identities to be wholly distinguishable from behavior. Behavioral evidence remains mandatory and primary; when it reaches a genuine layer boundary, the system should either preserve uncertainty or use a separately declared secondary evidence class. Yore remains `NOT_CLEANLY_OBSERVABLE` even if that secondary channel is approved, because the channel does not convert philosophy into behavior.

## 5. Identity/lens self-report architecture

### Recommendation

Allow an optional `IDENTITY_LENS_SELF_REPORT` evidence class as **secondary boundary evidence**, not as behavioral mapping evidence and not as a free-standing identity selector.

The bounded rule is:

> Behavioral observations first narrow a plausible candidate set. Only then may an explicitly labeled identity/lens preference help resolve or enrich a boundary that behavior cannot cleanly observe. It may support a result only when independent behavioral evidence already makes that result plausible; otherwise the public state remains close, mixed, contradictory, or insufficient.

This is more honest than disguising philosophy as deck behavior. The Atlas separates primary motivation, aesthetic taste, cognitive/process style, deck behavior, table behavior, and color/setting identity (`Vox_Mana_The_Magic_Player_Atlas.md:91-134`). It also warns that color or setting lenses do not diagnose a player. The Atlas is conceptual vocabulary support, not placement authority.

### Mandatory guardrails

All of the proposed safeguards are required, with four additions:

1. The channel cannot independently create a one-answer identity flip or sole named winner.
2. It cannot override strong contradictory behavioral evidence.
3. It can operate only among an already plausible, bounded candidate set produced by at least two reasonably independent behavioral observations.
4. It must be explicitly labeled as self-report; it cannot be disguised as a scenario or behavioral observation.
5. It must not ask the player to select a faction name, color combination, missing-color slogan, morality, intelligence, or personality label.
6. Each response must state one bounded lens affinity in neutral, player-natural language; compound motive/aesthetic/behavior answers are prohibited.
7. A neutral skip, uncertainty, or deck-dependent response must be available and non-directional because the layer is not universal.
8. It cannot introduce a candidate that behavioral evidence had excluded or never made plausible.
9. It cannot validate, revise, or count as eligible evidence for a behavioral observation-to-identity mapping.
10. It must have a distinct evidence-class value, provenance, audit trail, contradiction handling, and validation protocol.
11. Close, tied, mixed, contradictory, and insufficient public states remain valid; the channel cannot force closure by question eight.
12. It cannot be used for broad opening routing. It is eligible only when a specific unresolved layer boundary remains after behavioral narrowing.
13. Result explanation must distinguish “what your Commander preferences showed” from “what you explicitly said resonates.”

### Benefits, risks, and fallback

Benefits are epistemic honesty, explicit separation of player layers, and a bounded path for Yore-like distinctions that behavior cannot carry. Risks are aspiration bias, identity giveaway, desirability bias, novice uncertainty, faction self-selection, and the temptation to let a single statement dominate several independent observations.

The guardrails keep the channel secondary, but they do not make it validated. It requires its own later comprehension, stability, steering, contradiction, and result-recognition study. If a production-fidelity design cannot make the channel neutral and auditable, the fallback is enrichment only and Yore remains an uncertain behavioral placement.

## 6. Adaptive-stage architecture

### Preserved principle

The evidence supports the current principle:

**broad observations → adaptive narrowing → targeted unresolved evidence → honest result state**

The six-to-eight-question ceiling, minimum independent evidence, dependency controls, and uncertainty states remain sound (`README.md:138-180,258-291`). Esper exposes a missing dimension, not a need for a longer quiz. Yore exposes an evidence-class boundary, not a reason to add more behavioral Crucibles.

### Recommendation: Option B

Preserve the approved journey counts:

- four mandatory broad observations;
- two or three adaptively selected observations;
- zero or one final targeted observation;
- hard maximum of eight;
- uncertainty rather than forced closure when evidence is insufficient.

Loosen only the semantic assumption that the final targeted slot is always one identity-specific behavioral Crucible. It may instead test:

- a remaining competitor boundary;
- a cross-identity unresolved construct such as information-to-plan conversion; or
- an optional identity/lens self-report, if the bounded eligibility and guardrails above are satisfied.

“Gate,” “Hall,” and “Crucible” can remain player-facing progression language. Architecturally, they mean broad, adaptive, and targeted evidence—not three different strengths of identity points. This packet does not assign any existing or proposed item to a different stage. Exactly one targeted slot remains enough because failure to resolve by eight produces an honest uncertain state rather than more questions.

## 7. Content-readiness normalization

The current matrix has 15 `READY`, 20 `PARTIAL`, and 2 `GAP` rows (`result-usefulness-matrix.tsv:2-38`). Every row already contains the complete result package fields named in the content rubric. The `missing_value` and `status_rationale` cells for the 22 non-ready rows identify direct-discriminator, false-positive, comprehension, or player-evidence needs—observability and validation concerns—not missing result content.

The proposed conceptual content counts are therefore **37 `CONTENT_READY`, 0 `CONTENT_PARTIAL`, 0 `CONTENT_GAP`**. The fifteen existing `READY` rows remain ready. Every proposed change is listed below; no source row is edited.

| Identity | Current → proposed | Exact rationale for conceptual change |
|---|---|---|
| Abzan | `PARTIAL` → `CONTENT_READY` | The result package is complete; the missing direct Abzan/Witch observation belongs to observability and validation. |
| Black | `PARTIAL` → `CONTENT_READY` | The package is complete; mono-versus-neighbor discrimination and empirical mono evidence belong to observability/validation. |
| Bant | `PARTIAL` → `CONTENT_READY` | The package is complete and a direct C05 boundary exists; false-positive and boundary validation do not make content partial. |
| Colorless | `PARTIAL` → `CONTENT_READY` | The package honestly explains imposed constraint and alternatives; independent behavioral/false-positive proof is mapping validation. |
| Dune | `PARTIAL` → `CONTENT_READY` | The package is useful and bounded; Dune/Ink player evidence and expression-name comprehension are validation concerns. |
| Esper | `GAP` → `CONTENT_READY` | Certified explanation, neighbor, limitation, Commander directions, and continuations are present; information-to-plan is an observability gap. |
| Green | `PARTIAL` → `CONTENT_READY` | The package is complete; mono/multicolor separation belongs to observability and validation. |
| Glint | `PARTIAL` → `CONTENT_READY` | The package is complete; label comprehension and engineered/improvised mapping evidence belong to validation. |
| Grixis | `PARTIAL` → `CONTENT_READY` | The package is complete; independent separation from Black/four-color conversion is an observation/mapping requirement. |
| Ink | `PARTIAL` → `CONTENT_READY` | The package already states protected-access behavior and limits; evidence against group-benefit and Dune false positives is validation work. |
| Jeskai | `PARTIAL` → `CONTENT_READY` | The package already states pressure-plus-response behavior and limits; neighbor separation is an unvalidated mapping. |
| Jund | `PARTIAL` → `CONTENT_READY` | The package is complete; a direct boundary and false-positive evidence are missing from the instrument, not the result. |
| Mardu | `PARTIAL` → `CONTENT_READY` | The package is complete; direct Mardu/Boros/Rakdos discrimination belongs to observability and validation. |
| Naya | `PARTIAL` → `CONTENT_READY` | The package distinguishes spectacle, theme, and combat honestly; direct observation and false-positive evidence remain instrument work. |
| Red | `PARTIAL` → `CONTENT_READY` | The package is complete; direct mono/multicolor separation belongs to observability and validation. |
| Sultai | `PARTIAL` → `CONTENT_READY` | The package is complete and a direct C12 split exists; player support and graveyard false positives belong to validation. |
| Temur | `PARTIAL` → `CONTENT_READY` | The package is complete and a direct hypothesis exists; separation from generic flexible midrange is validation work. |
| Blue | `PARTIAL` → `CONTENT_READY` | The package is complete; direct mono/multicolor knowledge separation belongs to observability and validation. |
| White | `PARTIAL` → `CONTENT_READY` | The package is complete; direct mono/multicolor order separation belongs to observability and validation. |
| Witch | `PARTIAL` → `CONTENT_READY` | The package is complete and direct hypotheses exist; identity-boundary and label-comprehension validation remain. |
| Five-Color | `PARTIAL` → `CONTENT_READY` | The package is complete and a breadth observation exists; evidence against narrower/self-restricted decks is validation work. |
| Yore | `GAP` → `CONTENT_READY` | Certified constructed-agency content, neighbors, false positives, limitation, Commander directions, and continuations are present; the failure is behavioral observability. |

This normalization does not assert 37 reliable placements. It makes the content inventory answer only its declared product question.

## 8. Product comparison sanity check

The existing EDHMatch capture mixes direct preference/self-description statements, scenario-based indirect report, and a direct type self-assessment that is explicitly excluded from its result calculation (`edhmatch-player-type-complete.txt:116-170,275-418`). That confirms a short quiz need not infer every useful player layer indirectly. Archscry should not copy its taxonomy, language, or direct profile selection; the relevant lesson is to declare evidence types honestly.

The Commander Personality Matrix evidence supports independent dimensions first and interpretation later. Its three creator axes—linear/nonlinear, involved/uninvolved, subtle/spectacular—are sliders, and player reports show that each term can split into several contexts (`YT-commander-personality-matrix-refined-player-evidence.md:20-26,616-649`). This supports bounded constructs and layered interpretation, not adding those axes to B1 or treating one answer as an identity.

Archscry's construct architecture remains stronger than a flat identity quiz because it records Commander observations, dependencies, contradictions, and representational failure before interpreting an identity. The cost is that it cannot honestly force all philosophy/color-setting distinctions out of behavior. The proposed secondary lens channel addresses that limitation openly while retaining behavior as primary evidence.

## 9. Final proposed B1 architecture

In plain language:

1. A player answers four broad Commander scenarios.
2. Each answer records a bounded `BEHAVIORAL_OBSERVATION`, dependency group, exclusions, uncertainty, and provenance; it does not award an identity directly.
3. Two or three adaptive questions observe unresolved constructs among the plausible behavioral families. The future construct inventory may include information-to-plan conversion if approved.
4. The system forms a bounded candidate set from independent behavioral support and contradictions. It does not treat a second-ranked score as a semantic neighbor.
5. At most one targeted question examines the most important unresolved evidence. It may be another behavioral boundary or, under strict eligibility, an optional `IDENTITY_LENS_SELF_REPORT` kept in a separate ledger.
6. Identity support remains a reviewed mapping hypothesis until eligible player evidence validates it. Dependent observations cannot stack as independent proof, and one response cannot flip a strong result.
7. Stopping and stability rules choose a Gate A-compatible named exploratory, close, tied, mixed, contradictory, or insufficient public state by question eight.
8. If an identity is reached, its `CONTENT_READY` package explains the observed behavior, certified identity context, nearby alternative, limitation, Commander direction, and next useful surface. Behavioral evidence and self-reported lens evidence are explained separately.

Compact flow:

`answer → evidence class → observation or explicit lens → construct / bounded candidate set → targeted boundary check → mapping and contradiction review → stopping/stability → honest public state → content-ready result package`

Nothing in this model authorizes weights, scoring, routing code, implementation, migration, player validation, or production use.

## 10. Owner decisions

| Decision | Recommended option | Alternatives | Consequence |
|---|---|---|---|
| Approve the three-axis model | Use the content / observability / mapping states defined here. | Retain one overloaded label. | Approval makes each inventory answer one question and prevents validation gaps from masquerading as missing content. |
| Normalize content conceptually | Approve 37/0/0 as the later content-only inventory target. | Keep selected rows partial/gap; identify the actual missing content field for each. | Approval permits a later explicit matrix task; it does not validate or implement placement. |
| Add information-to-plan conversion | Approve it as a new cross-identity behavioral construct for later design. | Fold it into an existing construct; decline it; defer. | Approval reopens only future construct/question design and coverage analysis, not an item or signal now. |
| Permit identity/lens self-report | Approve the guarded secondary evidence class. | Behavior-only uncertainty; enrichment-only; defer. | Approval creates a future design obligation for separate provenance, eligibility, validation, explanation, and contradiction handling. |
| Preserve the short adaptive route | Approve Option B: 4 broad / 2–3 adaptive / 0–1 targeted, maximum 8, with looser targeted semantics. | Option A exact current semantics; Option C count refinement; Option D redesign. | Approval preserves the product journey while allowing the final evidence to match the unresolved layer. |

## Non-goals and stop gate

This packet does not edit constructs, questions, answers, signals, stages, weights, identity points, coverage, confusion pairs, readiness rows, prototype, scoring, routing, stopping, runtime, Gate A, identity data, dossiers, Matrix, recommendations, Maze, persistence, or schemas. It does not conduct player validation, recruitment, shadow testing, migration, deployment, implementation, or certification.

Stop for owner architecture decision before any instrument edit, content-readiness normalization, production-fidelity preview, placement-engine work, or player validation.

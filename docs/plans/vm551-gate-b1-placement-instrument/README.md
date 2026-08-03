# VM-551 Gate B1 Placement Instrument Design

Status: design and evidence complete for owner review; pilot implementation is not authorized.

Base: 30bfe87171e4119a0bab1bb47318862c042977de

Branch: codex/vm551-gate-b1-placement-instrument-design

Worktree: C:\dev\voxmana.io-vm551-gate-b1-design

## Outcome

Gate B1 proposes one smaller, layered Archscry instrument for the existing 37-identity architecture. It preserves the current Quick Reading presentation, Gate → Hall → Crucible progression, four mandatory Gate questions, two or three adaptive Hall questions, zero or one Crucible question, six-to-eight-question journey, Gate A public result states, dossier architecture, saved-result compatibility boundary, Matrix, recommendations, and downstream surfaces.

The pilot pool contains:

| Stage | Current bank | Proposed pilot pool | Asked in one journey |
|---|---:|---:|---:|
| Gate | 4 | 4 replacement questions | exactly 4 |
| Hall | 58 | 12 adaptive questions | 2 or 3 |
| Crucible | 51 | 18 focused questions | 0 or 1 |
| Total | 113 | 34 | 6 to 8 |

The count follows the coverage analysis:

- 15 bounded constructs keep deck behavior, table preference, theme, and edge-family boundaries separate.
- Four constructs are broad enough for mandatory Gate observation.
- Twelve Hall items cover the remaining constructs plus one dependency-controlled alternative interaction-window item.
- Eighteen Crucible items cover five same-color guild/college boundaries, four high-confusion identities, direct Esper and Jeskai insufficient-evidence probes, five adjacent four-color boundaries, Colorless/Five-Color, and mono/multicolor ambiguity.
- Only one Crucible item is shown in a journey. The pool is larger than the journey because it is adaptive.

This is structural coverage, not proof of accuracy. The pilot explicitly permits tied, close, mixed, and insufficient outcomes.

## Pre-flight findings and frozen boundaries

Recent related work:

- The accepted VM-551 audit established 37 identities, 113 questions, 356 answers, 26,891 authored terminal paths, 333 exact ties, question/answer adjudication, dependency defects, distinctiveness risks, and Gate B1 requirements.
- Gate A was implemented, accepted, integrated, pushed, and production-verified. It changed public trust presentation while preserving internal placement and downstream shapes.
- Gate A is closed and frozen. Gate B1 was not previously started.

Known risks:

- No current answer has an answer-level evidence/provenance contract.
- Repeated constructs can appear to be independent evidence.
- Authored minimum-hit and false-positive guardrails are not executable.
- One-answer primary flips and rank-two-as-adjacency are unsafe.
- Bant, Grixis, Sultai, and Temur have high confusion risk.
- Colorless, Esper, Ink, Jeskai, Lorehold, Izzet, and Yore have insufficient distinctiveness evidence.
- Current golden paths prove reachability, not semantic separation or player accuracy.

Relevant decisions already made:

- CECOS draft.4 governs observation, ambiguity, provenance, and derived-instrument boundaries; it does not define Archscry weights or certify product accuracy.
- Player-language sources support recognizable scenarios and vocabulary, not identity assignments or scoring weights.
- Certified identity records and source maps support provisional boundary hypotheses, not empirical player mappings.
- Public numeric confidence remains prohibited.
- A numerical runner-up is not semantic adjacency.

What was not touched:

- Gate A plans and presentation work.
- The live question bank, placement model, Gate-compression source, builder, adaptive runtime, branching, scoring, stopping, result UI, dossiers, Matrix, recommendations, persistence, schemas, identity records, source maps, tests, routes, deployment, or production state.

## Evidence roles

The generated TSVs use compact provenance IDs:

| ID | Role |
|---|---|
| E-AUDIT | Accepted VM-551 question, answer, signal, distinctiveness, and sensitivity evidence. Describes current behavior and risks. |
| E-CECOS | Exact draft.4 observation/provenance/ambiguity boundary. Does not supply Archscry scoring. |
| E-PLAYER-COMMANDER | Commander role, dependency, resilience, attachment, and table-perception vocabulary. |
| E-PLAYER-PACE | Pace, resilience, interaction, theme/power separation, and beginner-language evidence. |
| E-PLAYER-VARIANCE | Consistency, variance, toolbox, and theme-first vocabulary. |
| E-PLAYER-THREAT | Visible/hidden threats, commander visibility, interaction, archenemy, and ending-mode vocabulary. |
| E-PLAYER-THEME | Creative expression, theme ownership, unusual mechanics, and memorable interaction. |
| E-CERTIFIED | Certified identity and boundary records. Supports provisional identity hypotheses only. |
| E-VOICE | Vox Mana atmosphere-plus-clarity and qualified explanation rules. |

Player discussion is never treated as a weight, likelihood, prevalence estimate, or identity assignment. Certified records are never treated as empirical player-response evidence.

## Construct architecture

The 15 constructs are:

1. initiative posture;
2. resource visibility;
3. disruption response;
4. advantage tempo;
5. commander reliance;
6. engine concentration;
7. pressure channel;
8. mana commitment and interaction window;
9. repeatability preference;
10. theme-efficiency tradeoff;
11. threat posture;
12. resource sacrifice;
13. public commitment;
14. setup tolerance;
15. deck breadth and constraint.

Each question has exactly one primary construct. Related constructs remain explicitly separate, and dependency groups prevent repeated observations from being counted as new evidence. For example:

- proactive/reactive posture and open-mana timing may describe one cadence and therefore share dependency review;
- visible resources and willingness to attract attention are not the same construct;
- commander reliance, protection, and engine concentration are not interchangeable;
- consistency is not tutor count;
- setup duration is not payoff rhythm;
- theme is not power, budget, experience, or deck behavior.

The detailed definitions, examples, exclusions, family relevance, confusion pairs, evidence needs, stage, overlap, and signal vocabulary are in construct-map.tsv.

## Existing-bank inventory

question-bank-inventory.tsv contains one row for each of the 356 current answer effects and repeats the complete 113-question context. It records current IDs or missing-ID status, stage, wording, effect targets, accepted question and answer dispositions, abstraction, double-barreling, mood/lore dependence, desirability risk, attempted constructs, salvageable concept, and proposed disposition.

Accepted audit dispositions remain unchanged:

- questions: 69 Replace, 40 Retune, 1 Keep-but-reword, 3 Needs-evidence, 0 Keep;
- answers: 20 Replace, 41 Retune, 64 Keep-but-reword, 231 Needs-evidence, 0 Keep.

Gate B1 design dispositions are:

- 69 questions: retire;
- 35 questions: retain concept only;
- 6 questions: rewrite for pilot;
- 3 questions: evidence needed.

These are question-level design dispositions. The inventory has 356 answer-effect rows, so its repeated row counts are 225 retire, 103 retain concept only, 22 rewrite for pilot, and 6 evidence needed.

No current answer effect is retained. Retain concept only means the bounded observation may inform research; it does not preserve wording, scores, suppressions, or identity effects.

## Gate design

The four Gate questions establish broad behavior without assigning a faction:

1. initiative posture on an open turn;
2. visible battlefield resources versus held resources;
3. protection, reduced exposure, or recovery around a clearly explained board wipe;
4. incremental, cyclical, or concentrated payoff rhythm.

Each includes an unknown or conditional answer only where the scenario genuinely permits it. Those answers are non-directional and cannot be converted into midpoint evidence.

Gate answers may narrow Hall eligibility in a future implementation, but they cannot name, eliminate, or strongly support an identity by themselves.

## Hall design

The Hall pool observes commander reliance, engine concentration, pressure channel, mana commitment, repeatability, theme-efficiency tradeoff, threat posture, voluntary resource conversion, public commitment, setup tolerance, deck breadth, and a second dependency-controlled interaction-window scenario.

Hall routing must select questions for unresolved constructs and plausible family boundaries. It must not present disguised faction philosophies. It may not repeat a dependency group merely to increase evidence volume.

After four Gate observations, the first two Hall questions provide at least two additional opportunities for reasonably independent evidence. A future implementation may ask a third Hall question when one answer is unknown/conditional, both Hall answers share a dependency family, a boundary observation is absent, or the result would otherwise be close/insufficient.

## Crucible design

Crucible questions are concrete Commander scenarios. They are eligible only after at least two independent observations and only when their exact competitor pair or family remains plausible.

The 18-item pool covers:

- Izzet/Prismari;
- Golgari/Witherbloom;
- Boros/Lorehold;
- Simic/Quandrix;
- Orzhov/Silverquill;
- Bant, Grixis, Sultai, and Temur high-confusion boundaries;
- Esper and Jeskai insufficient-distinctiveness boundaries;
- Yore/Glint, Glint/Dune, Dune/Ink, Ink/Witch, and Witch/Yore;
- Colorless/Five-Color;
- mono/multicolor ambiguity.

Every Crucible row states competitor scope, bounded observation, provenance, eligibility, and when it must not be asked. Neither, conditional, and missing-experience responses preserve representational failure instead of forcing one competitor.

## Identity and confusion coverage

identity-coverage-matrix.tsv contains exactly 37 identities. Each row records supporting and boundary constructs, strongest current competitors, minimum independent observations, current evidence quality, pilot questions, structural coverage, and uncovered risks.

confusion-pair-coverage.tsv contains 123 unique pairs. It includes:

- every pair represented by the accepted audit's exact-tie compositions, including decomposed multiway ties;
- every primary/rank-two pair appearing in at least 100 authored terminal paths, labeled as combinatorial frequency rather than player prevalence;
- all five same-color guild/college pairs;
- adjacent shard and wedge families;
- all adjacent four-color pairs;
- Colorless/Five-Color;
- high-confusion and insufficient-evidence identities.

Mono/multicolor ambiguity is handled by a shared boundary question after behavior evidence. Pairs without a direct Crucible item are marked indirect structural coverage. The correct pilot outcome for many is close or insufficient.

## Proposed scoring contract

No weights are designed or implemented. A future scoring design must keep six layers separate.

### 1. Observation capture

- Serialize instrument, question, answer, construct, and dependency-group IDs.
- Store the plain observation and whether it is directional, conditional, unknown, or representational failure.
- Keep deck behavior, table preference, theme/aesthetics, personal philosophy, experience, budget, and power expectation in separate typed fields.

### 2. Signal mapping

- One primary construct signal per answer.
- At most one bounded secondary signal with separate dependency and evidence.
- Mapping confidence describes review status, not the player or result.
- Unknown, conditional, and neither answers create no directional signal.

### 3. Identity support

- Identity support is a reviewed rule layer over independent observations, not raw additive stacking.
- Supporting and boundary evidence are distinct.
- A source-backed identity association remains a hypothesis until player validation.
- Theme or philosophy cannot replace deck-behavior evidence.

### 4. Exclusions and contradictions

- Exclusions prevent unsupported inference; they do not award negative points.
- A contradiction can block a strong name, request a different Hall item, or downgrade to close/insufficient.
- Negative-only winners are prohibited.
- One dependency group has one bounded contribution regardless of repeated answers.

### 5. Stopping and stability

- An ordinary named exploratory result requires at least three independent observations across at least two stages and one relevant boundary observation.
- High-confusion or insufficient-evidence identities require at least four independent observations, including a direct boundary observation.
- Crucible cannot appear before two independent observations.
- One answer cannot flip a strong result directly to another strong result; perturbation-sensitive outcomes downgrade to close, mixed, or insufficient.
- Exact ties remain ties. Near ties remain close unless reviewed boundary evidence separates them.
- Stopping uses evidence completeness, independence, contradictions, and stability, not a raw score gap.

### 6. Public result state

- Reuse Gate A public states and plain observation explanations.
- Keep numeric confidence hidden and unclaimed.
- Explain contributing observations and limitations.
- A runner-up is a close alternative only when the state contract permits it.
- Rank two is never semantic adjacency by itself.

This contract avoids arbitrary additive stacking, one-answer flips, duplicated dependent evidence, negative-only winners, fake calibration, and rank-two-as-adjacency.

## Instrument flow

    4 Gate observations
      -> 2 Hall observations
      -> check independence, boundary coverage, contradictions, and unknowns
          -> enough evidence: stop at 6 or ask one bounded Hall confirmation
          -> unresolved construct: ask third Hall
          -> exact reviewed competitor remains: ask one Crucible
      -> Gate A public state: named exploratory / close / tied / mixed / insufficient

The flow remains six to eight questions. It is one instrument with layered explanation.

## Files and validation

- construct-map.tsv: 15 construct contracts.
- question-bank-inventory.tsv: all 113 current questions and 356 answers/effects.
- pilot-question-bank.tsv: 34 proposed questions.
- answer-signal-contracts.tsv: 106 stable answer contracts.
- identity-coverage-matrix.tsv: all 37 identities.
- confusion-pair-coverage.tsv: 123 exact, high-frequency, and mandatory boundary pairs.
- migration-and-versioning-plan.md: additive versioning, shadow evaluation, rollback, and legacy handling.
- player-validation-plan.md: real-player comprehension, steering, recognition, stability, and explanation protocol.
- owner-decisions.md: material owner choices and recommendations.
- build-and-validate-design.mjs: documentation-only derivation and validator.
- validation-record.json: current PASS record.

Validation proves exact source counts, 37 unique identities, four Gate questions, unique IDs, one construct per question, complete answer contracts, no orphan references/signals, no vague-mood-only observation, explained jargon, non-scoring status, and coverage of every exact/high-frequency confusion pair.

No scoring implementation or live-data modification occurred.

## Stop

Stop for owner review of this Gate B1 design. Do not implement the pilot.

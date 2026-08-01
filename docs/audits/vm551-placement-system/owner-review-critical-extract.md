# VM-551 Owner-Review Critical Extract

This bounded extract reproduces selected complete records from the authoritative machine artifacts for human inspection. The source CSV/JSON files remain authoritative; this file does not replace them or introduce new severity analysis.

Reconciled extract counts: question records 28; identity records 23; representative profiles 5; materially challenging profiles 0; adversarial records 9; representative flips 5; different-family categories 151; repeated constructs 11; non-monotonic rows 28; defect records 9; Gate A/B1 requirements 11.

## Gate A downstream compatibility

`downstream-compatibility-contract.md` changes public interpretation/rendering only. It preserves internal scores/softmax/gaps and existing serialized fields for ranking, stopping, replay, storage, dossier, recommendation, deck-link, adjacent-view, Matrix, and Maze compatibility. Additive bounded result states are permitted only after independent consumer-map review; destructive field removal/rename is outside Gate A.

Consumer-map records: 37. Compatibility dispositions: {"ADDITIVE-EXTENSION":2,"PRESERVE-INTERNAL-HIDE-PUBLICLY":6,"PRESERVE-UNCHANGED":26,"VERSIONED-MIGRATION-LATER":3}.

The authored Matrix path (`identity-layers.preview_scores` or `vm-radar.js` component averages) is an identity visualization. The separate placement-result path (`placementResult.mana_scores` -> dossier `manaAlignment`) is placement-derived, normalized, cached, serialized, and rendered. Neither is public confidence, and the two paths are not interchangeable.

Gate A implementation planning is prohibited until the map is independently reviewed and no material field classified `UNRESOLVED-BLOCKER` enters planning. This extract does not replace the complete map.

## Question adjudication

Selection includes every KEEP, KEEP-BUT-REWORD, and NEEDS-EVIDENCE row; all four Gate rows; and the first five source-order Hall RETUNE, Hall REPLACE, Crucible RETUNE, and Crucible REPLACE rows. No KEEP rows exist.

### crucible_U_UG — NEEDS-EVIDENCE

```json
{
  "question_id": "crucible_U_UG",
  "phase": "crucible",
  "exact_prompt": "Should the next change refine the model, or alter the living thing that must survive?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_U_UG#answer-1",
    "MISSING:crucible_U_UG#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: engineered possibility | living adaptation",
  "actual_dimensions_tested": [
    "philosophical-preference"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "LOW",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "LOW-MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0.053",
  "repeated_signal_group": [
    "uncontrolled-editorial-construct",
    "growth-and-nature"
  ],
  "correlated_signal_group": "overlapping:uncontrolled-editorial-construct+growth-and-nature",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "NEEDS-EVIDENCE",
  "remediation_implication": "Establish evidence and falsification contracts before deciding whether to retain."
}
```

### crucible_UG_QUANDRIX — KEEP-BUT-REWORD

```json
{
  "question_id": "crucible_UG_QUANDRIX",
  "phase": "crucible",
  "exact_prompt": "Do you trust adaptation in the living body, or the abstract pattern beneath the body?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_UG_QUANDRIX#answer-1",
    "MISSING:crucible_UG_QUANDRIX#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: biology first | pattern first",
  "actual_dimensions_tested": [
    "social-behavior"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "LOW",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.071",
  "repeated_signal_group": [
    "uncontrolled-editorial-construct"
  ],
  "correlated_signal_group": "uncontrolled-editorial-construct",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "KEEP-BUT-REWORD",
  "remediation_implication": "Preserve only the bounded construct; simplify wording and add uncertainty handling before pilot."
}
```

### crucible_WR_LOREHOLD — NEEDS-EVIDENCE

```json
{
  "question_id": "crucible_WR_LOREHOLD",
  "phase": "crucible",
  "exact_prompt": "Do you charge to protect the present, or dig up the past before repeating its mistake?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_WR_LOREHOLD#answer-1",
    "MISSING:crucible_WR_LOREHOLD#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: present protection | past evidence",
  "actual_dimensions_tested": [
    "social-behavior"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "LOW",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "LOW-MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0.071",
  "repeated_signal_group": [
    "protection-and-duty",
    "history-and-memory"
  ],
  "correlated_signal_group": "overlapping:protection-and-duty+history-and-memory",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "NEEDS-EVIDENCE",
  "remediation_implication": "Establish evidence and falsification contracts before deciding whether to retain."
}
```

### crucible_BANT_ESPER — NEEDS-EVIDENCE

```json
{
  "question_id": "crucible_BANT_ESPER",
  "phase": "crucible",
  "exact_prompt": "Should order protect a living community, or perfect a designed system?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_BANT_ESPER#answer-1",
    "MISSING:crucible_BANT_ESPER#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: living communal order | designed perfectibility",
  "actual_dimensions_tested": [
    "social-behavior",
    "philosophical-preference"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "LOW",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "LOW-MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0.217",
  "repeated_signal_group": [
    "procedure-and-order",
    "uncontrolled-editorial-construct"
  ],
  "correlated_signal_group": "overlapping:procedure-and-order+uncontrolled-editorial-construct",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "NEEDS-EVIDENCE",
  "remediation_implication": "Establish evidence and falsification contracts before deciding whether to retain."
}
```

### gate_v2_locus_of_trust — REPLACE

```json
{
  "question_id": "gate_v2_locus_of_trust",
  "phase": "gate",
  "exact_prompt": "When the ground shifts, what do you trust first?",
  "answer_identifiers_or_missing_status": [
    "gate_v2_trust_self_claim",
    "gate_v2_trust_personal_threshold",
    "gate_v2_trust_braided_witness",
    "gate_v2_trust_common_root",
    "gate_v2_trust_outside_measure"
  ],
  "intended_construct": "Broad Gate routing; authored signals: self-authored agency | personal threshold | integrated whole | communal continuity | outside boundary",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk",
    "aesthetic-or-narrative-preference"
  ],
  "commander_relevance": "HIGH",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.103",
  "repeated_signal_group": [
    "agency-and-leverage",
    "uncontrolled-editorial-construct"
  ],
  "correlated_signal_group": "overlapping:agency-and-leverage+uncontrolled-editorial-construct",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "INCONSISTENT effect-count spread 7",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### gate_v2_pressure_becomes — REPLACE

```json
{
  "question_id": "gate_v2_pressure_becomes",
  "phase": "gate",
  "exact_prompt": "When pressure gathers, what should it become?",
  "answer_identifiers_or_missing_status": [
    "gate_v2_pressure_form",
    "gate_v2_pressure_answerable_motion",
    "gate_v2_pressure_many_currents",
    "gate_v2_pressure_wild_release",
    "gate_v2_pressure_silent_axis"
  ],
  "intended_construct": "Broad Gate routing; authored signals: ordered containment | bounded action | balanced convergence | adaptive release | outside boundary",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk",
    "philosophical-preference"
  ],
  "commander_relevance": "HIGH",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.107",
  "repeated_signal_group": [
    "procedure-and-order",
    "speed-and-action",
    "uncontrolled-editorial-construct",
    "growth-and-nature"
  ],
  "correlated_signal_group": "overlapping:procedure-and-order+speed-and-action+uncontrolled-editorial-construct+growth-and-nature",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "INCONSISTENT effect-count spread 8",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### gate_v2_first_signal — REPLACE

```json
{
  "question_id": "gate_v2_first_signal",
  "phase": "gate",
  "exact_prompt": "What signal reaches you first?",
  "answer_identifiers_or_missing_status": [
    "gate_v2_signal_cold_pattern",
    "gate_v2_signal_measured_trace",
    "gate_v2_signal_whole_chord",
    "gate_v2_signal_live_spark",
    "gate_v2_signal_unlit_edge"
  ],
  "intended_construct": "Broad Gate routing; authored signals: calculated implication | measured inference | balanced chord | felt ignition | outside boundary",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk",
    "aesthetic-or-narrative-preference"
  ],
  "commander_relevance": "LOW",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.154",
  "repeated_signal_group": [
    "uncontrolled-editorial-construct",
    "speed-and-action"
  ],
  "correlated_signal_group": "overlapping:uncontrolled-editorial-construct+speed-and-action",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "INCONSISTENT effect-count spread 14",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### gate_v2_cost_of_oath — REPLACE

```json
{
  "question_id": "gate_v2_cost_of_oath",
  "phase": "gate",
  "exact_prompt": "What cost can an oath fairly ask of you?",
  "answer_identifiers_or_missing_status": [
    "gate_v2_oath_preserve",
    "gate_v2_oath_steward",
    "gate_v2_oath_whole_covenant",
    "gate_v2_oath_transform",
    "gate_v2_oath_without_color"
  ],
  "intended_construct": "Broad Gate routing; authored signals: preserving duty | careful stewardship | integrated covenant | transformative cost | outside boundary",
  "actual_dimensions_tested": [
    "social-behavior",
    "philosophical-preference"
  ],
  "commander_relevance": "LOW",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0.185",
  "repeated_signal_group": [
    "protection-and-duty",
    "uncontrolled-editorial-construct",
    "agency-and-leverage"
  ],
  "correlated_signal_group": "overlapping:protection-and-duty+uncontrolled-editorial-construct+agency-and-leverage",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "INCONSISTENT effect-count spread 9",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### hall_W_shelter — RETUNE

```json
{
  "question_id": "hall_W_shelter",
  "phase": "hall",
  "exact_prompt": "A frightened group needs protection before trust has time to grow. What response feels most dependable?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_W_shelter#answer-1",
    "MISSING:hall_W_shelter#answer-2",
    "MISSING:hall_W_shelter#answer-3",
    "MISSING:hall_W_shelter#answer-4"
  ],
  "intended_construct": "Differentiate W; authored signals: shelter through structure | procedure first | urgent guardianship | belonging as shelter",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "MEDIUM",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.143",
  "repeated_signal_group": [
    "procedure-and-order",
    "uncontrolled-editorial-construct",
    "community-and-belonging"
  ],
  "correlated_signal_group": "overlapping:procedure-and-order+uncontrolled-editorial-construct+community-and-belonging",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM-HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 4",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### hall_W_duty — RETUNE

```json
{
  "question_id": "hall_W_duty",
  "phase": "hall",
  "exact_prompt": "A structure is imperfect, but it still keeps more people safe than improvisation. What matters most?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_W_duty#answer-1",
    "MISSING:hall_W_duty#answer-2",
    "MISSING:hall_W_duty#answer-3",
    "MISSING:hall_W_duty#answer-4"
  ],
  "intended_construct": "Differentiate W; authored signals: duty to maintain shelter | airtight procedure | case-first intervention | shared care",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "LOW",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.083",
  "repeated_signal_group": [
    "protection-and-duty",
    "procedure-and-order",
    "uncontrolled-editorial-construct",
    "community-and-belonging"
  ],
  "correlated_signal_group": "overlapping:protection-and-duty+procedure-and-order+uncontrolled-editorial-construct+community-and-belonging",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM-HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 4",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### hall_R_freedom — RETUNE

```json
{
  "question_id": "hall_R_freedom",
  "phase": "hall",
  "exact_prompt": "The door is closing and the safe plan will arrive too late. What kind of action keeps the moment alive?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_R_freedom#answer-1",
    "MISSING:hall_R_freedom#answer-2",
    "MISSING:hall_R_freedom#answer-3",
    "MISSING:hall_R_freedom#answer-4",
    "MISSING:hall_R_freedom#answer-5"
  ],
  "intended_construct": "Differentiate R; authored signals: direct action | protective charge | rapid prototype | pain as spectacle | wild belonging",
  "actual_dimensions_tested": [
    "gameplay-or-deck-behavior",
    "social-behavior",
    "aesthetic-or-narrative-preference",
    "philosophical-preference"
  ],
  "commander_relevance": "HIGH",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "LOW",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.087",
  "repeated_signal_group": [
    "speed-and-action",
    "protection-and-duty",
    "experiment-and-invention",
    "expression-and-performance",
    "community-and-belonging"
  ],
  "correlated_signal_group": "overlapping:speed-and-action+protection-and-duty+experiment-and-invention+expression-and-performance+community-and-belonging",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM-HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 3",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### hall_WU_process — RETUNE

```json
{
  "question_id": "hall_WU_process",
  "phase": "hall",
  "exact_prompt": "A community wants one outcome, but the written process points somewhere colder. What decides your first move?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_WU_process#answer-1",
    "MISSING:hall_WU_process#answer-2",
    "MISSING:hall_WU_process#answer-3",
    "MISSING:hall_WU_process#answer-4"
  ],
  "intended_construct": "Differentiate WU; authored signals: fairness through process | belonging over procedure | immediate rescue | contractual leverage",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk",
    "aesthetic-or-narrative-preference"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM",
  "abstraction_burden": "LOW",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.15",
  "repeated_signal_group": [
    "uncontrolled-editorial-construct",
    "procedure-and-order",
    "speed-and-action",
    "agency-and-leverage"
  ],
  "correlated_signal_group": "overlapping:uncontrolled-editorial-construct+procedure-and-order+speed-and-action+agency-and-leverage",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM-HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 2",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### hall_WG_belonging — RETUNE

```json
{
  "question_id": "hall_WG_belonging",
  "phase": "hall",
  "exact_prompt": "Someone feels isolated and brittle. What kind of help matters most?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_WG_belonging#answer-1",
    "MISSING:hall_WG_belonging#answer-2",
    "MISSING:hall_WG_belonging#answer-3",
    "MISSING:hall_WG_belonging#answer-4"
  ],
  "intended_construct": "Differentiate WG; authored signals: shared self | enforceable structure | vital care | transformative speech",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk",
    "aesthetic-or-narrative-preference",
    "philosophical-preference"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "MEDIUM",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.08",
  "repeated_signal_group": [
    "community-and-belonging",
    "procedure-and-order",
    "uncontrolled-editorial-construct"
  ],
  "correlated_signal_group": "overlapping:community-and-belonging+procedure-and-order+uncontrolled-editorial-construct",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM-HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 1",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### hall_B_cost — REPLACE

```json
{
  "question_id": "hall_B_cost",
  "phase": "hall",
  "exact_prompt": "A choice will cost life, comfort, or loyalty, but it keeps your fate from belonging to someone else. What makes the exchange honest?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_B_cost#answer-1",
    "MISSING:hall_B_cost#answer-2",
    "MISSING:hall_B_cost#answer-3",
    "MISSING:hall_B_cost#answer-4"
  ],
  "intended_construct": "Differentiate B; authored signals: power at a cost | secret leverage | binding debt | unrestrained appetite",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk",
    "aesthetic-or-narrative-preference"
  ],
  "commander_relevance": "LOW",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.1",
  "repeated_signal_group": [
    "agency-and-leverage",
    "uncontrolled-editorial-construct"
  ],
  "correlated_signal_group": "overlapping:agency-and-leverage+uncontrolled-editorial-construct",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "INCONSISTENT effect-count spread 5",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### hall_B_graveyard — REPLACE

```json
{
  "question_id": "hall_B_graveyard",
  "phase": "hall",
  "exact_prompt": "Something useful has died, failed, or been spent. What should happen to it now?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_B_graveyard#answer-1",
    "MISSING:hall_B_graveyard#answer-2",
    "MISSING:hall_B_graveyard#answer-3",
    "MISSING:hall_B_graveyard#answer-4"
  ],
  "intended_construct": "Differentiate B; authored signals: graveyard as resource | cycle of decay | memorial duty | public pressure",
  "actual_dimensions_tested": [
    "gameplay-or-deck-behavior",
    "social-behavior",
    "psychographic-or-motivational-inference-risk"
  ],
  "commander_relevance": "HIGH",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.15",
  "repeated_signal_group": [
    "decay-and-renewal",
    "protection-and-duty",
    "speed-and-action"
  ],
  "correlated_signal_group": "overlapping:decay-and-renewal+protection-and-duty+speed-and-action",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 3",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### hall_U_understanding — REPLACE

```json
{
  "question_id": "hall_U_understanding",
  "phase": "hall",
  "exact_prompt": "The room wants action before the variables are clear. What response feels most responsible?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_U_understanding#answer-1",
    "MISSING:hall_U_understanding#answer-2",
    "MISSING:hall_U_understanding#answer-3",
    "MISSING:hall_U_understanding#answer-4"
  ],
  "intended_construct": "Differentiate U; authored signals: act after understanding | formal procedure | hidden leverage | volatile experiment",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk"
  ],
  "commander_relevance": "HIGH",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.1",
  "repeated_signal_group": [
    "uncontrolled-editorial-construct",
    "procedure-and-order",
    "agency-and-leverage",
    "experiment-and-invention"
  ],
  "correlated_signal_group": "overlapping:uncontrolled-editorial-construct+procedure-and-order+agency-and-leverage+experiment-and-invention",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "INCONSISTENT effect-count spread 5",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### hall_U_possibility — REPLACE

```json
{
  "question_id": "hall_U_possibility",
  "phase": "hall",
  "exact_prompt": "A person or system seems limited by its current shape. What makes progress trustworthy?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_U_possibility#answer-1",
    "MISSING:hall_U_possibility#answer-2",
    "MISSING:hall_U_possibility#answer-3",
    "MISSING:hall_U_possibility#answer-4"
  ],
  "intended_construct": "Differentiate U; authored signals: optimization through knowledge | biological adaptation | rapid experimentation | knowledge as leverage",
  "actual_dimensions_tested": [
    "gameplay-or-deck-behavior",
    "social-behavior",
    "psychographic-or-motivational-inference-risk",
    "philosophical-preference"
  ],
  "commander_relevance": "HIGH",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.087",
  "repeated_signal_group": [
    "knowledge-and-deliberation",
    "growth-and-nature",
    "experiment-and-invention"
  ],
  "correlated_signal_group": "overlapping:knowledge-and-deliberation+growth-and-nature+experiment-and-invention",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "INCONSISTENT effect-count spread 5",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### hall_R_ignition — REPLACE

```json
{
  "question_id": "hall_R_ignition",
  "phase": "hall",
  "exact_prompt": "A feeling arrives before anyone has given permission. What makes the next move honest?",
  "answer_identifiers_or_missing_status": [
    "MISSING:hall_R_ignition#answer-1",
    "MISSING:hall_R_ignition#answer-2",
    "MISSING:hall_R_ignition#answer-3",
    "MISSING:hall_R_ignition#answer-4",
    "MISSING:hall_R_ignition#answer-5"
  ],
  "intended_construct": "Differentiate R; authored signals: emotion into action | urgent protection | experimental technique | transgressive release | primal instinct",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk"
  ],
  "commander_relevance": "LOW",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "HIGH",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.136",
  "repeated_signal_group": [
    "expression-and-performance",
    "protection-and-duty",
    "experiment-and-invention",
    "uncontrolled-editorial-construct",
    "growth-and-nature"
  ],
  "correlated_signal_group": "overlapping:expression-and-performance+protection-and-duty+experiment-and-invention+uncontrolled-editorial-construct+growth-and-nature",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 3",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### crucible_COLORLESS_WUBRG — RETUNE

```json
{
  "question_id": "crucible_COLORLESS_WUBRG",
  "phase": "crucible",
  "exact_prompt": "When the color wheel is in view, is the answer strongest because it steps outside color, or because every color has a negotiated role?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_COLORLESS_WUBRG#answer-1",
    "MISSING:crucible_COLORLESS_WUBRG#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: chosen outside-WUBRG restriction | all five colors present and negotiated",
  "actual_dimensions_tested": [
    "social-behavior"
  ],
  "commander_relevance": "HIGH",
  "wording_clarity": "MEDIUM",
  "abstraction_burden": "LOW",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "LOW-MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0.097",
  "repeated_signal_group": [
    "uncontrolled-editorial-construct"
  ],
  "correlated_signal_group": "uncontrolled-editorial-construct",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### crucible_W_WU — RETUNE

```json
{
  "question_id": "crucible_W_WU",
  "phase": "crucible",
  "exact_prompt": "Does dependable protection begin with a shelter people can trust, or a process nobody can bend?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_W_WU#answer-1",
    "MISSING:crucible_W_WU#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: shelter before procedure | procedure before shelter",
  "actual_dimensions_tested": [
    "social-behavior"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "LOW",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.118",
  "repeated_signal_group": [
    "procedure-and-order"
  ],
  "correlated_signal_group": "procedure-and-order",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### crucible_W_WG — RETUNE

```json
{
  "question_id": "crucible_W_WG",
  "phase": "crucible",
  "exact_prompt": "Does safety begin with shared standards, or with a community that already knows how to hold each other?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_W_WG#answer-1",
    "MISSING:crucible_W_WG#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: standards before belonging | belonging before standards",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk",
    "aesthetic-or-narrative-preference"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "LOW",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.056",
  "repeated_signal_group": [
    "community-and-belonging"
  ],
  "correlated_signal_group": "community-and-belonging",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### crucible_U_UR — RETUNE

```json
{
  "question_id": "crucible_U_UR",
  "phase": "crucible",
  "exact_prompt": "When the idea is promising but unstable, do you wait for the model or fire the prototype?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_U_UR#answer-1",
    "MISSING:crucible_U_UR#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: predictive patience | experimental spark",
  "actual_dimensions_tested": [
    "social-behavior"
  ],
  "commander_relevance": "HIGH",
  "wording_clarity": "MEDIUM-HIGH",
  "abstraction_burden": "LOW",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "LOW-MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0.059",
  "repeated_signal_group": [
    "uncontrolled-editorial-construct",
    "experiment-and-invention"
  ],
  "correlated_signal_group": "overlapping:uncontrolled-editorial-construct+experiment-and-invention",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### crucible_B_UB — RETUNE

```json
{
  "question_id": "crucible_B_UB",
  "phase": "crucible",
  "exact_prompt": "When power is available, do you pay the cost directly or wait until hidden information makes the move safer?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_B_UB#answer-1",
    "MISSING:crucible_B_UB#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: direct cost | hidden timing",
  "actual_dimensions_tested": [
    "psychographic-or-motivational-inference-risk"
  ],
  "commander_relevance": "MEDIUM",
  "wording_clarity": "MEDIUM",
  "abstraction_burden": "LOW",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "LOW-MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0.105",
  "repeated_signal_group": [
    "agency-and-leverage",
    "uncontrolled-editorial-construct"
  ],
  "correlated_signal_group": "overlapping:agency-and-leverage+uncontrolled-editorial-construct",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "MEDIUM",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "RETUNE",
  "remediation_implication": "Separate constructs, normalize effects, add stable answer IDs/provenance, and retest neighboring identities."
}
```

### crucible_W_WR — REPLACE

```json
{
  "question_id": "crucible_W_WR",
  "phase": "crucible",
  "exact_prompt": "When people are unsafe, is the first duty to build the standard or step in right now?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_W_WR#answer-1",
    "MISSING:crucible_W_WR#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: reliable protection | immediate duty",
  "actual_dimensions_tested": [
    "social-behavior"
  ],
  "commander_relevance": "LOW",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "LOW-MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0.048",
  "repeated_signal_group": [
    "protection-and-duty"
  ],
  "correlated_signal_group": "protection-and-duty",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### crucible_U_WU — REPLACE

```json
{
  "question_id": "crucible_U_WU",
  "phase": "crucible",
  "exact_prompt": "Does trust begin with understanding the system, or with a rule no one can bend?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_U_WU#answer-1",
    "MISSING:crucible_U_WU#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: model before procedure | procedure before model",
  "actual_dimensions_tested": [
    "social-behavior"
  ],
  "commander_relevance": "LOW",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "NO",
  "desirability_or_steering_risk": "MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.214",
  "repeated_signal_group": [
    "procedure-and-order"
  ],
  "correlated_signal_group": "procedure-and-order",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### crucible_U_UB — REPLACE

```json
{
  "question_id": "crucible_U_UB",
  "phase": "crucible",
  "exact_prompt": "Does information matter because it improves the future, or because no one knows you have it?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_U_UB#answer-1",
    "MISSING:crucible_U_UB#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: knowledge as possibility | knowledge as secrecy",
  "actual_dimensions_tested": [
    "philosophical-preference"
  ],
  "commander_relevance": "LOW",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "LOW-MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0",
  "repeated_signal_group": [
    "knowledge-and-deliberation"
  ],
  "correlated_signal_group": "knowledge-and-deliberation",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### crucible_B_BR — REPLACE

```json
{
  "question_id": "crucible_B_BR",
  "phase": "crucible",
  "exact_prompt": "Is the cost worth paying because it keeps control, or because it finally releases restraint?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_B_BR#answer-1",
    "MISSING:crucible_B_BR#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: controlled cost | unrestrained release",
  "actual_dimensions_tested": [
    "psychographic-or-motivational-inference-risk"
  ],
  "commander_relevance": "LOW",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "PRESENT",
  "answer_overlap": "0.2",
  "repeated_signal_group": [
    "agency-and-leverage",
    "uncontrolled-editorial-construct"
  ],
  "correlated_signal_group": "overlapping:agency-and-leverage+uncontrolled-editorial-construct",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

### crucible_B_WB — REPLACE

```json
{
  "question_id": "crucible_B_WB",
  "phase": "crucible",
  "exact_prompt": "Would you rather own the leverage privately, or bind it into an obligation no one can escape?",
  "answer_identifiers_or_missing_status": [
    "MISSING:crucible_B_WB#answer-1",
    "MISSING:crucible_B_WB#answer-2"
  ],
  "intended_construct": "Broad Gate routing; authored signals: private sovereignty | binding obligation",
  "actual_dimensions_tested": [
    "social-behavior",
    "psychographic-or-motivational-inference-risk"
  ],
  "commander_relevance": "LOW",
  "wording_clarity": "LOW",
  "abstraction_burden": "HIGH",
  "double_barreled_status": "YES",
  "desirability_or_steering_risk": "LOW-MEDIUM",
  "lore_dependence": "NOT-EXPLICIT",
  "mood_dependence": "NOT-EXPLICIT",
  "answer_overlap": "0.176",
  "repeated_signal_group": [
    "uncontrolled-editorial-construct"
  ],
  "correlated_signal_group": "uncontrolled-editorial-construct",
  "uncertainty_representation": "ABSENT: no explicit unknown, unsure, neutral, neither, mixed, or depends answer",
  "false_positive_risk": "HIGH",
  "false_negative_risk": "HIGH when the player is mixed/uncertain; no non-directional state exists",
  "scoring_consistency": "UNVALIDATED effect-count spread 0",
  "explanation_consistency": "UNVALIDATED: signal text is expanded by shared templates without per-claim entailment",
  "evidence_authority": "No answer-level source or claim reference in the live model; editorial interpretation only",
  "final_disposition": "REPLACE",
  "remediation_implication": "Do not carry into the first pilot without a new evidence-derived construct and representational-failure option."
}
```

## Identity distinctiveness

Complete records cover the eleven owner-named risk identities, both members of every same-color guild/college pair (Izzet/Prismari, Golgari/Witherbloom, Boros/Lorehold, Simic/Quandrix, Orzhov/Silverquill), all five four-color identities, and WUBRG. `UR` is the canonical Izzet key.

### BANT — Bant

```json
{
  "identity": "BANT",
  "canonical_name": "Bant",
  "certified_defining_signals": [
    "Bant",
    "exalted",
    "champion",
    "sigil",
    "honor",
    "Rafiq",
    "Valeron",
    "Akrasa",
    "Great Conduit",
    "community",
    "protection",
    "refinement"
  ],
  "negative_and_boundary_signals": [
    "hard-lock stax",
    "prison enchantments",
    "generic three-color value",
    "Simic ramp",
    "Selesnya tokens",
    "Naya big creatures",
    "Esper mill-control",
    "mass reanimation"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "WITCH",
      "count": 59
    },
    {
      "identity": "WUBRG",
      "count": 56
    },
    {
      "identity": "INK",
      "count": 56
    },
    {
      "identity": "W",
      "count": 44
    },
    {
      "identity": "U",
      "count": 40
    }
  ],
  "unique_discriminators": [
    "Bant",
    "exalted",
    "champion",
    "sigil",
    "honor",
    "Rafiq",
    "Valeron",
    "Akrasa",
    "Great Conduit",
    "refinement"
  ],
  "current_questions_detecting_discriminators": [
    "hall_W_shelter",
    "hall_W_duty",
    "hall_R_ignition",
    "hall_G_natural_order",
    "hall_WU_process",
    "hall_RG_wild",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_ESPER_designed_control",
    "hall_GRIXIS_survival_opening",
    "hall_NAYA_living_whole",
    "hall_NAYA_abundance_instinct",
    "hall_WITCH_patient_cultivation",
    "hall_WR_protection",
    "crucible_W_WU",
    "crucible_W_WR",
    "crucible_W_WG",
    "crucible_G_WG",
    "crucible_WU_WR",
    "crucible_WR_LOREHOLD",
    "crucible_BANT_ESPER",
    "crucible_NAYA_BANT",
    "crucible_JESKAI_SULTAI",
    "crucible_INK_WITCH"
  ],
  "missing_discriminators": [
    "exalted",
    "sigil",
    "Rafiq",
    "Valeron",
    "Akrasa",
    "Great Conduit"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_duty",
    "hall_B_graveyard",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_ABZAN_family_endurance",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_INK_protected_abundance",
    "hall_WR_protection",
    "crucible_W_WR",
    "crucible_R_WR",
    "crucible_WU_WR",
    "crucible_INK_WITCH"
  ],
  "support_opportunity": "23",
  "opposing_opportunity": "21",
  "minimum_hit_contract_status": "NOT-ENFORCED; 231/390 primary paths below 3 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.733",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.859",
  "likely_false_positives": "Primary below strong-min proxy: 231; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: exalted | sigil | Rafiq | Valeron | Akrasa | Great Conduit",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "HIGH-CONFUSION-RISK"
}
```

### BG — Golgari Swarm

```json
{
  "identity": "BG",
  "canonical_name": "Golgari Swarm",
  "certified_defining_signals": [
    "decay",
    "renewal",
    "death",
    "life",
    "rot",
    "undercity",
    "survival",
    "graveyard",
    "cycle",
    "reclamation"
  ],
  "negative_and_boundary_signals": [
    "wild dispossession",
    "essence craft study",
    "community harmony",
    "theatrical chaos"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "GLINT",
      "count": 198
    },
    {
      "identity": "B",
      "count": 79
    },
    {
      "identity": "G",
      "count": 77
    },
    {
      "identity": "WITCH",
      "count": 62
    },
    {
      "identity": "BR",
      "count": 56
    }
  ],
  "unique_discriminators": [
    "decay",
    "renewal",
    "rot",
    "undercity",
    "graveyard",
    "cycle",
    "reclamation"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_first_signal",
    "hall_B_cost",
    "hall_B_graveyard",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_RG_wild",
    "hall_WG_belonging",
    "hall_BG_reclamation",
    "hall_UG_adaptation",
    "hall_BANT_living_order",
    "hall_GRIXIS_survival_opening",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_family_endurance",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_survival_attunement",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_QUANDRIX_pattern",
    "hall_WITHERBLOOM_essence",
    "crucible_B_BG",
    "crucible_G_UG",
    "crucible_G_BG",
    "crucible_BG_WITHERBLOOM",
    "crucible_QUANDRIX_WITHERBLOOM",
    "crucible_ESPER_GRIXIS",
    "crucible_GRIXIS_JUND",
    "crucible_JUND_NAYA",
    "crucible_NAYA_BANT",
    "crucible_TEMUR_SULTAI",
    "crucible_TEMUR_MARDU",
    "crucible_JESKAI_TEMUR"
  ],
  "missing_discriminators": [],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_B_graveyard",
    "hall_G_natural_order",
    "hall_UG_adaptation",
    "hall_BANT_living_order",
    "hall_ABZAN_ancestor_perennation",
    "hall_GLINT_missing_white",
    "hall_WITHERBLOOM_essence",
    "crucible_G_BG"
  ],
  "support_opportunity": "26",
  "opposing_opportunity": "14",
  "minimum_hit_contract_status": "NOT-ENFORCED; 2/779 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.648",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "1",
  "likely_false_positives": "Primary below strong-min proxy: 2; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: none by lexical probe",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### COLORLESS — Colorless

```json
{
  "identity": "COLORLESS",
  "canonical_name": "Colorless",
  "certified_defining_signals": [],
  "negative_and_boundary_signals": [],
  "nearest_identity_competitors": [
    {
      "identity": "WUBRG",
      "count": 81
    },
    {
      "identity": "B",
      "count": 26
    },
    {
      "identity": "U",
      "count": 17
    },
    {
      "identity": "G",
      "count": 12
    },
    {
      "identity": "W",
      "count": 11
    }
  ],
  "unique_discriminators": [],
  "current_questions_detecting_discriminators": [],
  "missing_discriminators": [],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_B_cost",
    "hall_U_understanding",
    "hall_R_ignition",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_WU_process",
    "hall_UB_information",
    "hall_BR_intensity",
    "hall_RG_wild",
    "hall_WG_belonging",
    "hall_WB_obligation",
    "hall_UR_experiment",
    "hall_BG_reclamation",
    "hall_BANT_champion",
    "hall_ESPER_designed_control",
    "hall_GRIXIS_survival_opening",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_instinct_pressure",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_family_endurance",
    "hall_TEMUR_survival_attunement",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_WR_protection",
    "hall_LOREHOLD_history",
    "hall_PRISMARI_expression",
    "hall_QUANDRIX_pattern",
    "hall_SILVERQUILL_words",
    "hall_WITHERBLOOM_essence",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_COLORLESS_WUBRG",
    "crucible_U_UR",
    "crucible_B_UB",
    "crucible_B_BR",
    "crucible_B_BG",
    "crucible_B_WB",
    "crucible_R_WR",
    "crucible_R_BR",
    "crucible_G_BG",
    "crucible_G_RG",
    "crucible_WU_WR",
    "crucible_WU_WB",
    "crucible_UG_QUANDRIX",
    "crucible_BG_WITHERBLOOM",
    "crucible_WB_SILVERQUILL",
    "crucible_PRISMARI_QUANDRIX",
    "crucible_PRISMARI_SILVERQUILL",
    "crucible_LOREHOLD_QUANDRIX",
    "crucible_QUANDRIX_WITHERBLOOM",
    "crucible_BR_RG",
    "crucible_GRIXIS_JUND",
    "crucible_NAYA_BANT",
    "crucible_ABZAN_MARDU",
    "crucible_ABZAN_SULTAI",
    "crucible_TEMUR_SULTAI",
    "crucible_TEMUR_MARDU",
    "crucible_JESKAI_SULTAI",
    "crucible_JESKAI_TEMUR",
    "crucible_YORE_GLINT",
    "crucible_GLINT_DUNE",
    "crucible_DUNE_INK",
    "crucible_INK_WITCH",
    "crucible_WITCH_YORE"
  ],
  "support_opportunity": "8",
  "opposing_opportunity": "23",
  "minimum_hit_contract_status": "NOT-ENFORCED; 0/187 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.812",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "1",
  "likely_false_positives": "Primary below strong-min proxy: 0; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: none by lexical probe",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "INSUFFICIENT-DISTINCTIVENESS-EVIDENCE"
}
```

### DUNE — Dune / Aggression

```json
{
  "identity": "DUNE",
  "canonical_name": "Dune / Aggression",
  "certified_defining_signals": [
    "organized",
    "territorial",
    "force",
    "pressure",
    "direct action",
    "physical momentum",
    "survival",
    "multiplication",
    "common front",
    "four-color",
    "without Blue",
    "missing-Blue",
    "White line",
    "Black cost",
    "Red ignition",
    "Green persistence"
  ],
  "negative_and_boundary_signals": [
    "User centers detached contemplation, Blue adaptation, stable distance, exhaustive modeling, or perfect delay.",
    "User mentions combat, tokens, go-wide pressure, Saskia, Open Hostility, Dune-Brood, or Nephilim language without the missing-Blue worldview.",
    "User treats a single commander, support product, card anchor, color code, or name-adjacent phrase as sufficient proof.",
    "User resolves more cleanly into Jund, Naya, Mardu, Abzan, Glint, a two-color pair, or generic same-color goodstuff."
  ],
  "nearest_identity_competitors": [
    {
      "identity": "B",
      "count": 77
    },
    {
      "identity": "R",
      "count": 70
    },
    {
      "identity": "G",
      "count": 57
    },
    {
      "identity": "WITCH",
      "count": 34
    },
    {
      "identity": "WITHERBLOOM",
      "count": 31
    }
  ],
  "unique_discriminators": [
    "organized",
    "territorial",
    "force",
    "pressure",
    "direct action",
    "physical momentum",
    "multiplication",
    "common front",
    "without Blue",
    "missing-Blue",
    "White line",
    "Black cost",
    "Green persistence"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_duty",
    "hall_B_cost",
    "hall_B_graveyard",
    "hall_U_understanding",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_WU_process",
    "hall_UB_information",
    "hall_BR_intensity",
    "hall_BG_reclamation",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_GRIXIS_survival_opening",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_instinct_pressure",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_ABZAN_family_endurance",
    "hall_TEMUR_survival_attunement",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_WR_protection",
    "hall_LOREHOLD_history",
    "hall_SILVERQUILL_words",
    "hall_WITHERBLOOM_essence",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_COLORLESS_WUBRG",
    "crucible_B_UB",
    "crucible_B_BR",
    "crucible_B_BG",
    "crucible_R_WR",
    "crucible_R_BR",
    "crucible_R_RG",
    "crucible_G_UG",
    "crucible_G_BG",
    "crucible_G_RG",
    "crucible_BG_WITHERBLOOM",
    "crucible_WR_LOREHOLD",
    "crucible_QUANDRIX_WITHERBLOOM",
    "crucible_ESPER_GRIXIS",
    "crucible_GRIXIS_JUND",
    "crucible_JUND_NAYA",
    "crucible_NAYA_BANT",
    "crucible_ABZAN_MARDU",
    "crucible_TEMUR_SULTAI",
    "crucible_TEMUR_MARDU",
    "crucible_JESKAI_MARDU",
    "crucible_JESKAI_SULTAI",
    "crucible_JESKAI_TEMUR",
    "crucible_YORE_GLINT",
    "crucible_GLINT_DUNE",
    "crucible_DUNE_INK"
  ],
  "missing_discriminators": [],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_B_cost",
    "hall_U_understanding",
    "hall_WU_process",
    "hall_WB_obligation",
    "hall_ESPER_perfectibility",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_dead_usefulness",
    "hall_YORE_engineered_agency",
    "crucible_B_UB",
    "crucible_B_BR",
    "crucible_B_BG",
    "crucible_UB_WB",
    "crucible_WB_SILVERQUILL",
    "crucible_YORE_GLINT"
  ],
  "support_opportunity": "18",
  "opposing_opportunity": "18",
  "minimum_hit_contract_status": "NOT-ENFORCED; 57/541 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.778",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "1",
  "likely_false_positives": "Primary below strong-min proxy: 57; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: none by lexical probe",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### ESPER — Esper

```json
{
  "identity": "ESPER",
  "canonical_name": "Esper",
  "certified_defining_signals": [
    "Esper",
    "Alara",
    "WUB",
    "Blue-centered perfectibility",
    "perfectibility",
    "knowledge",
    "planning",
    "applied information",
    "ordered improvement",
    "coordination",
    "focused control",
    "instrumental information",
    "designed control",
    "optimization"
  ],
  "negative_and_boundary_signals": [
    "generic WUB goodstuff",
    "generic artifacts",
    "generic control",
    "civic procedure alone",
    "hidden leverage alone",
    "debt or obligation alone",
    "living communal order",
    "Red impulse",
    "Green natural acceptance",
    "manual-fill lore as proof"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "U",
      "count": 52
    },
    {
      "identity": "B",
      "count": 40
    },
    {
      "identity": "YORE",
      "count": 35
    },
    {
      "identity": "JESKAI",
      "count": 30
    },
    {
      "identity": "W",
      "count": 30
    }
  ],
  "unique_discriminators": [
    "Esper",
    "WUB",
    "Blue-centered perfectibility",
    "perfectibility",
    "planning",
    "applied information",
    "ordered improvement",
    "coordination",
    "focused control",
    "instrumental information",
    "designed control"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_pressure_becomes",
    "hall_B_cost",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_R_ignition",
    "hall_UB_information",
    "hall_ESPER_perfectibility",
    "hall_ESPER_designed_control",
    "hall_GRIXIS_volatile_calculation",
    "hall_NAYA_living_whole",
    "hall_TEMUR_survival_attunement",
    "hall_MARDU_total_commitment",
    "hall_JESKAI_disciplined_cunning",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITHERBLOOM_essence",
    "hall_WUBRG_full_spectrum",
    "crucible_U_UB",
    "crucible_U_UG",
    "crucible_B_UB",
    "crucible_B_BR",
    "crucible_UB_WB",
    "crucible_BANT_ESPER",
    "crucible_ESPER_GRIXIS",
    "crucible_GRIXIS_JUND",
    "crucible_JESKAI_MARDU",
    "crucible_JESKAI_SULTAI",
    "crucible_DUNE_INK",
    "crucible_INK_WITCH"
  ],
  "missing_discriminators": [
    "Esper",
    "Alara",
    "WUB",
    "planning",
    "coordination"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_U_understanding",
    "hall_WU_process",
    "hall_WG_belonging",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_GRIXIS_volatile_calculation",
    "hall_NAYA_abundance_instinct",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_way_form",
    "hall_INK_protected_abundance",
    "hall_WITCH_patient_cultivation",
    "hall_LOREHOLD_history",
    "crucible_W_WU",
    "crucible_U_WU",
    "crucible_WU_WG",
    "crucible_WU_WB"
  ],
  "support_opportunity": "22",
  "opposing_opportunity": "19",
  "minimum_hit_contract_status": "NOT-ENFORCED; 101/341 primary paths below 3 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.771",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.792",
  "likely_false_positives": "Primary below strong-min proxy: 101; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: Esper | Alara | WUB | planning | coordination",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "INSUFFICIENT-DISTINCTIVENESS-EVIDENCE"
}
```

### GLINT — Glint / Chaos

```json
{
  "identity": "GLINT",
  "canonical_name": "Glint / Chaos",
  "certified_defining_signals": [
    "adaptive",
    "appetite",
    "volatility",
    "living force",
    "improvisation",
    "four-color",
    "without White",
    "missing-White",
    "Blue adaptation",
    "Black appetite",
    "Red ignition",
    "Green living force",
    "cascade",
    "maelstrom",
    "unlicensed",
    "civic restraint"
  ],
  "negative_and_boundary_signals": [
    "The user centers White order, fairness, duty, stability, communal obligation, or peace-through-law.",
    "The user mentions only chaos, cascade, high variance, Yidris, or Glint-Eye without the missing-White worldview.",
    "The user treats Glint-Eye, Nephilim, Yidris, Chaos, UBRG, or color-code language as institutional or official proof.",
    "The user resolves more cleanly into Grixis, Jund, Temur, Sultai, Omnath/non-Black value, a two-color pair, or generic goodstuff."
  ],
  "nearest_identity_competitors": [
    {
      "identity": "B",
      "count": 182
    },
    {
      "identity": "R",
      "count": 75
    },
    {
      "identity": "G",
      "count": 59
    },
    {
      "identity": "NAYA",
      "count": 56
    },
    {
      "identity": "WUBRG",
      "count": 37
    }
  ],
  "unique_discriminators": [
    "adaptive",
    "appetite",
    "living force",
    "improvisation",
    "without White",
    "missing-White",
    "Blue adaptation",
    "Green living force",
    "cascade",
    "maelstrom",
    "unlicensed",
    "civic restraint"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "hall_W_duty",
    "hall_B_cost",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_WU_process",
    "hall_UB_information",
    "hall_WG_belonging",
    "hall_UR_experiment",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_ESPER_designed_control",
    "hall_GRIXIS_survival_opening",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_instinct_pressure",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_survival_attunement",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_WR_protection",
    "hall_QUANDRIX_pattern",
    "hall_SILVERQUILL_words",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_COLORLESS_WUBRG",
    "crucible_U_UG",
    "crucible_B_BR",
    "crucible_R_BR",
    "crucible_R_RG",
    "crucible_G_WG",
    "crucible_G_UG",
    "crucible_G_BG",
    "crucible_G_RG",
    "crucible_UG_QUANDRIX",
    "crucible_BG_WITHERBLOOM",
    "crucible_QUANDRIX_WITHERBLOOM",
    "crucible_BANT_ESPER",
    "crucible_GRIXIS_JUND",
    "crucible_JUND_NAYA",
    "crucible_NAYA_BANT",
    "crucible_JESKAI_TEMUR",
    "crucible_YORE_GLINT",
    "crucible_GLINT_DUNE",
    "crucible_DUNE_INK"
  ],
  "missing_discriminators": [
    "cascade",
    "maelstrom",
    "unlicensed"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_U_possibility",
    "hall_R_ignition",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_UR_experiment",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_JUND_instinct_pressure",
    "hall_TEMUR_survival_attunement",
    "hall_GLINT_living_force",
    "hall_DUNE_territorial_force",
    "hall_QUANDRIX_pattern",
    "crucible_R_RG",
    "crucible_G_UG",
    "crucible_G_RG",
    "crucible_GRIXIS_JUND",
    "crucible_JUND_NAYA",
    "crucible_GLINT_DUNE"
  ],
  "support_opportunity": "22",
  "opposing_opportunity": "19",
  "minimum_hit_contract_status": "NOT-ENFORCED; 101/864 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.779",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "1",
  "likely_false_positives": "Primary below strong-min proxy: 101; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: cascade | maelstrom | unlicensed",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### GRIXIS — Grixis

```json
{
  "identity": "GRIXIS",
  "canonical_name": "Grixis",
  "certified_defining_signals": [
    "Grixis",
    "Alara",
    "UBR",
    "Black-centered survival",
    "survival",
    "self-advocacy",
    "adaptation",
    "calculation",
    "weakness analysis",
    "immediacy",
    "zeal",
    "volatility"
  ],
  "negative_and_boundary_signals": [
    "generic UBR",
    "generic villainy",
    "Maestros aesthetics",
    "unearth alone",
    "Bolas claims",
    "Sedris claims",
    "vis claims",
    "public honor",
    "life-renewal",
    "manual-fill lore as proof"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "B",
      "count": 56
    },
    {
      "identity": "YORE",
      "count": 40
    },
    {
      "identity": "GLINT",
      "count": 35
    },
    {
      "identity": "U",
      "count": 30
    },
    {
      "identity": "BR",
      "count": 26
    }
  ],
  "unique_discriminators": [
    "Grixis",
    "UBR",
    "Black-centered survival",
    "self-advocacy",
    "calculation",
    "weakness analysis",
    "immediacy",
    "zeal"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "hall_U_possibility",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_WG_belonging",
    "hall_UR_experiment",
    "hall_BG_reclamation",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_GRIXIS_survival_opening",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_instinct_pressure",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_ABZAN_family_endurance",
    "hall_TEMUR_survival_attunement",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_WITHERBLOOM_essence",
    "hall_WUBRG_full_spectrum",
    "crucible_U_UG",
    "crucible_B_BG",
    "crucible_B_WB",
    "crucible_G_UG",
    "crucible_G_BG",
    "crucible_UG_QUANDRIX",
    "crucible_BG_WITHERBLOOM",
    "crucible_ESPER_GRIXIS",
    "crucible_GRIXIS_JUND",
    "crucible_JUND_NAYA",
    "crucible_TEMUR_SULTAI",
    "crucible_TEMUR_MARDU",
    "crucible_JESKAI_TEMUR",
    "crucible_YORE_GLINT",
    "crucible_GLINT_DUNE",
    "crucible_INK_WITCH",
    "crucible_WITCH_YORE"
  ],
  "missing_discriminators": [
    "Alara",
    "UBR",
    "immediacy",
    "zeal"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_U_possibility",
    "hall_RG_wild",
    "hall_ESPER_perfectibility",
    "crucible_U_UB",
    "crucible_ESPER_GRIXIS"
  ],
  "support_opportunity": "24",
  "opposing_opportunity": "21",
  "minimum_hit_contract_status": "NOT-ENFORCED; 259/306 primary paths below 3 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.756",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.859",
  "likely_false_positives": "Primary below strong-min proxy: 259; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: Alara | UBR | immediacy | zeal",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "HIGH-CONFUSION-RISK"
}
```

### INK — Ink / Altruism

```json
{
  "identity": "INK",
  "canonical_name": "Ink / Altruism",
  "certified_defining_signals": [
    "protected",
    "public abundance",
    "open knowledge",
    "community benefit",
    "shared resources",
    "guarded commons",
    "protected generosity",
    "four-color",
    "without Black",
    "missing-Black",
    "Red care",
    "Green reciprocity",
    "White civic promise",
    "Blue open knowledge",
    "commons",
    "gift",
    "capture"
  ],
  "negative_and_boundary_signals": [
    "The user centers private advantage, hoarding, personal sovereignty, or Black-style leverage as the leading value.",
    "The user mentions only shared resources, group-hug, public archives, Kynaios, Ink-Treader, Altruism, or same-color grouping without the missing-Black worldview.",
    "The user treats Altruism, Kynaios, Stalwart Unity, Ink-Treader, RGWU, WURG, same-color identity, or color-code language as official public naming authority.",
    "The user resolves more cleanly into Bant, Jeskai, Naya, Temur, Dune, Glint, a two-color pair, or generic same-color goodstuff."
  ],
  "nearest_identity_competitors": [
    {
      "identity": "W",
      "count": 57
    },
    {
      "identity": "LOREHOLD",
      "count": 35
    },
    {
      "identity": "QUANDRIX",
      "count": 35
    },
    {
      "identity": "NAYA",
      "count": 33
    },
    {
      "identity": "JESKAI",
      "count": 31
    }
  ],
  "unique_discriminators": [
    "protected",
    "public abundance",
    "open knowledge",
    "community benefit",
    "shared resources",
    "guarded commons",
    "protected generosity",
    "without Black",
    "missing-Black",
    "Red care",
    "Green reciprocity",
    "White civic promise",
    "Blue open knowledge",
    "commons",
    "gift",
    "capture"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_cost_of_oath",
    "hall_W_duty",
    "hall_B_graveyard",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_WU_process",
    "hall_UB_information",
    "hall_RG_wild",
    "hall_WG_belonging",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_ESPER_designed_control",
    "hall_GRIXIS_survival_opening",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_instinct_pressure",
    "hall_NAYA_living_whole",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_family_endurance",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_survival_attunement",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_WR_protection",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_COLORLESS_WUBRG",
    "crucible_W_WG",
    "crucible_U_UB",
    "crucible_U_UG",
    "crucible_B_WB",
    "crucible_R_BR",
    "crucible_G_WG",
    "crucible_G_BG",
    "crucible_WU_WG",
    "crucible_UB_WB",
    "crucible_PRISMARI_SILVERQUILL",
    "crucible_BANT_ESPER",
    "crucible_JUND_NAYA",
    "crucible_NAYA_BANT",
    "crucible_JESKAI_MARDU",
    "crucible_JESKAI_SULTAI",
    "crucible_YORE_GLINT",
    "crucible_DUNE_INK",
    "crucible_INK_WITCH",
    "crucible_WITCH_YORE"
  ],
  "missing_discriminators": [],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_duty",
    "hall_B_graveyard",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_ABZAN_family_endurance",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_INK_protected_abundance",
    "hall_WR_protection",
    "crucible_W_WR",
    "crucible_R_WR",
    "crucible_WU_WR",
    "crucible_INK_WITCH"
  ],
  "support_opportunity": "15",
  "opposing_opportunity": "16",
  "minimum_hit_contract_status": "NOT-ENFORCED; 102/350 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.772",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.854",
  "likely_false_positives": "Primary below strong-min proxy: 102; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: none by lexical probe",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "INSUFFICIENT-DISTINCTIVENESS-EVIDENCE"
}
```

### JESKAI — Jeskai Way

```json
{
  "identity": "JESKAI",
  "canonical_name": "Jeskai Way",
  "certified_defining_signals": [
    "Jeskai Way",
    "Blue-centered",
    "cunning",
    "discipline",
    "training",
    "martial practice",
    "monastery",
    "Narset",
    "Shu Yun",
    "Ojutai boundary",
    "Dragonstorm revival",
    "trained insight"
  ],
  "negative_and_boundary_signals": [
    "URW, WUR, RWU, UWR, RUW, or WRU color identity without a Jeskai evidence cluster.",
    "Generic spellslinger, prowess, copies, artifacts, energy, cycling, time counters, or Commander goodstuff without Jeskai evidence.",
    "Ojutai clan treated as Khans-era Jeskai continuity.",
    "Modern Dragonstorm revival used as Khans-era proof.",
    "Seed files, generated HTML, color-pair philosophy, or architecture prose treated as proof."
  ],
  "nearest_identity_competitors": [
    {
      "identity": "INK",
      "count": 65
    },
    {
      "identity": "LOREHOLD",
      "count": 55
    },
    {
      "identity": "W",
      "count": 51
    },
    {
      "identity": "U",
      "count": 50
    },
    {
      "identity": "NAYA",
      "count": 45
    }
  ],
  "unique_discriminators": [
    "Jeskai Way",
    "Blue-centered",
    "cunning",
    "discipline",
    "training",
    "martial practice",
    "monastery",
    "Narset",
    "Shu Yun",
    "Ojutai boundary",
    "Dragonstorm revival",
    "trained insight"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_U_possibility",
    "hall_R_freedom",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_missing_red",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_JESKAI_MARDU",
    "crucible_JESKAI_SULTAI",
    "crucible_JESKAI_TEMUR",
    "crucible_WITCH_YORE"
  ],
  "missing_discriminators": [
    "Narset",
    "Shu Yun",
    "Dragonstorm revival"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_BR_intensity",
    "hall_UR_experiment",
    "hall_JUND_appetite_consequence",
    "hall_SULTAI_resource_conversion",
    "hall_MARDU_war_name_oath",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_PRISMARI_expression",
    "hall_SILVERQUILL_words",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "crucible_R_BR",
    "crucible_R_RG",
    "crucible_UR_PRISMARI",
    "crucible_PRISMARI_QUANDRIX",
    "crucible_PRISMARI_SILVERQUILL"
  ],
  "support_opportunity": "16",
  "opposing_opportunity": "17",
  "minimum_hit_contract_status": "NOT-ENFORCED; 122/488 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.838",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.582",
  "likely_false_positives": "Primary below strong-min proxy: 122; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: Narset | Shu Yun | Dragonstorm revival",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "INSUFFICIENT-DISTINCTIVENESS-EVIDENCE"
}
```

### LOREHOLD — Lorehold College

```json
{
  "identity": "LOREHOLD",
  "canonical_name": "Lorehold College",
  "certified_defining_signals": [
    "history",
    "archive",
    "relic",
    "evidence",
    "field",
    "past",
    "archaeology",
    "memory",
    "lesson",
    "ruins",
    "research"
  ],
  "negative_and_boundary_signals": [
    "immediate protection",
    "procedure first",
    "pure performance",
    "experiment invention",
    "private leverage"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "NAYA",
      "count": 54
    },
    {
      "identity": "JESKAI",
      "count": 53
    },
    {
      "identity": "R",
      "count": 39
    },
    {
      "identity": "INK",
      "count": 31
    },
    {
      "identity": "YORE",
      "count": 23
    }
  ],
  "unique_discriminators": [
    "history",
    "archive",
    "relic",
    "evidence",
    "field",
    "past",
    "archaeology",
    "lesson",
    "ruins",
    "research"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_pressure_becomes",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_survival_attunement",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_JESKAI_disciplined_cunning",
    "hall_YORE_engineered_agency",
    "hall_DUNE_territorial_force",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_missing_red",
    "hall_WR_protection",
    "hall_LOREHOLD_history",
    "hall_QUANDRIX_pattern",
    "hall_COLORLESS_branch_boundary",
    "crucible_WR_LOREHOLD",
    "crucible_LOREHOLD_QUANDRIX",
    "crucible_ABZAN_MARDU",
    "crucible_TEMUR_SULTAI",
    "crucible_JESKAI_MARDU",
    "crucible_JESKAI_TEMUR",
    "crucible_WITCH_YORE"
  ],
  "missing_discriminators": [
    "archaeology",
    "ruins",
    "research"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_dead_usefulness",
    "hall_INK_missing_black",
    "crucible_LOREHOLD_QUANDRIX",
    "crucible_ABZAN_SULTAI"
  ],
  "support_opportunity": "18",
  "opposing_opportunity": "13",
  "minimum_hit_contract_status": "NOT-ENFORCED; 106/325 primary paths below 3 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.789",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.898",
  "likely_false_positives": "Primary below strong-min proxy: 106; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: archaeology | ruins | research",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "INSUFFICIENT-DISTINCTIVENESS-EVIDENCE"
}
```

### PRISMARI — Prismari College

```json
{
  "identity": "PRISMARI",
  "canonical_name": "Prismari College",
  "certified_defining_signals": [
    "expression",
    "performance",
    "art",
    "emotion",
    "elemental",
    "creativity",
    "dramatic",
    "style",
    "movement",
    "spectacle"
  ],
  "negative_and_boundary_signals": [
    "mechanical experiment",
    "precise rhetoric",
    "dangerous transgression",
    "mathematical proof",
    "archive evidence"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "GLINT",
      "count": 66
    },
    {
      "identity": "JESKAI",
      "count": 62
    },
    {
      "identity": "R",
      "count": 48
    },
    {
      "identity": "U",
      "count": 39
    },
    {
      "identity": "RG",
      "count": 23
    }
  ],
  "unique_discriminators": [
    "expression",
    "art",
    "elemental",
    "creativity",
    "dramatic",
    "style",
    "movement"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_pressure_becomes",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_BR_intensity",
    "hall_UR_experiment",
    "hall_UG_adaptation",
    "hall_JUND_appetite_consequence",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_missing_blue",
    "hall_INK_missing_black",
    "hall_WITCH_missing_red",
    "hall_PRISMARI_expression",
    "hall_SILVERQUILL_words",
    "crucible_R_BR",
    "crucible_R_RG",
    "crucible_UR_PRISMARI",
    "crucible_PRISMARI_QUANDRIX",
    "crucible_PRISMARI_SILVERQUILL",
    "crucible_BR_RG",
    "crucible_TEMUR_SULTAI"
  ],
  "missing_discriminators": [
    "creativity",
    "dramatic"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_BR_intensity",
    "hall_UR_experiment",
    "hall_JUND_appetite_consequence",
    "hall_SULTAI_resource_conversion",
    "hall_MARDU_war_name_oath",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_PRISMARI_expression",
    "hall_SILVERQUILL_words",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "crucible_R_BR",
    "crucible_R_RG",
    "crucible_UR_PRISMARI",
    "crucible_PRISMARI_QUANDRIX",
    "crucible_PRISMARI_SILVERQUILL"
  ],
  "support_opportunity": "22",
  "opposing_opportunity": "16",
  "minimum_hit_contract_status": "NOT-ENFORCED; 40/387 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.73",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.938",
  "likely_false_positives": "Primary below strong-min proxy: 40; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: creativity | dramatic",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### QUANDRIX — Quandrix College

```json
{
  "identity": "QUANDRIX",
  "canonical_name": "Quandrix College",
  "certified_defining_signals": [
    "pattern",
    "proof",
    "mathematics",
    "abstraction",
    "equation",
    "structure",
    "model",
    "precision",
    "theory",
    "fractal"
  ],
  "negative_and_boundary_signals": [
    "prototype experiment",
    "biological improvement",
    "emotion performance",
    "law procedure",
    "history evidence"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "U",
      "count": 66
    },
    {
      "identity": "GLINT",
      "count": 44
    },
    {
      "identity": "TEMUR",
      "count": 42
    },
    {
      "identity": "UB",
      "count": 35
    },
    {
      "identity": "SULTAI",
      "count": 31
    }
  ],
  "unique_discriminators": [
    "pattern",
    "proof",
    "mathematics",
    "abstraction",
    "equation",
    "model",
    "precision",
    "theory",
    "fractal"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_G_natural_order",
    "hall_UB_information",
    "hall_WG_belonging",
    "hall_WB_obligation",
    "hall_UR_experiment",
    "hall_UG_adaptation",
    "hall_ESPER_designed_control",
    "hall_TEMUR_survival_attunement",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_way_form",
    "hall_YORE_engineered_agency",
    "hall_WITCH_patient_cultivation",
    "hall_LOREHOLD_history",
    "hall_PRISMARI_expression",
    "hall_QUANDRIX_pattern",
    "hall_SILVERQUILL_words",
    "hall_COLORLESS_outside_wubrg",
    "hall_WUBRG_full_spectrum",
    "crucible_W_WU",
    "crucible_W_WR",
    "crucible_W_WG",
    "crucible_U_WU",
    "crucible_U_UR",
    "crucible_U_UG",
    "crucible_UR_PRISMARI",
    "crucible_UG_QUANDRIX",
    "crucible_PRISMARI_QUANDRIX",
    "crucible_LOREHOLD_QUANDRIX",
    "crucible_QUANDRIX_WITHERBLOOM",
    "crucible_BANT_ESPER",
    "crucible_JESKAI_MARDU"
  ],
  "missing_discriminators": [
    "mathematics",
    "fractal"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_U_understanding",
    "hall_WU_process",
    "hall_WG_belonging",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_GRIXIS_volatile_calculation",
    "hall_NAYA_abundance_instinct",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_way_form",
    "hall_INK_protected_abundance",
    "hall_WITCH_patient_cultivation",
    "hall_LOREHOLD_history",
    "crucible_W_WU",
    "crucible_U_WU",
    "crucible_WU_WG",
    "crucible_WU_WB"
  ],
  "support_opportunity": "19",
  "opposing_opportunity": "16",
  "minimum_hit_contract_status": "NOT-ENFORCED; 24/401 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.747",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.9",
  "likely_false_positives": "Primary below strong-min proxy: 24; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: mathematics | fractal",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### SILVERQUILL — Silverquill College

```json
{
  "identity": "SILVERQUILL",
  "canonical_name": "Silverquill College",
  "certified_defining_signals": [
    "rhetoric",
    "words",
    "influence",
    "reputation",
    "eloquence",
    "public",
    "voice",
    "persuasion",
    "critique",
    "status"
  ],
  "negative_and_boundary_signals": [
    "debt obligation",
    "invisible secrecy",
    "law procedure",
    "elemental art",
    "selfless belonging"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "ESPER",
      "count": 44
    },
    {
      "identity": "ABZAN",
      "count": 31
    },
    {
      "identity": "B",
      "count": 28
    },
    {
      "identity": "BR",
      "count": 19
    },
    {
      "identity": "BANT",
      "count": 19
    }
  ],
  "unique_discriminators": [
    "rhetoric",
    "words",
    "influence",
    "reputation",
    "eloquence",
    "public",
    "voice",
    "persuasion",
    "critique",
    "status"
  ],
  "current_questions_detecting_discriminators": [
    "hall_B_graveyard",
    "hall_UB_information",
    "hall_WG_belonging",
    "hall_WB_obligation",
    "hall_BANT_champion",
    "hall_ESPER_perfectibility",
    "hall_ABZAN_family_endurance",
    "hall_JESKAI_way_form",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_SILVERQUILL_words",
    "crucible_B_WB",
    "crucible_UB_WB",
    "crucible_WB_SILVERQUILL",
    "crucible_PRISMARI_SILVERQUILL",
    "crucible_NAYA_BANT"
  ],
  "missing_discriminators": [
    "rhetoric",
    "eloquence",
    "persuasion",
    "critique"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_BR_intensity",
    "hall_UR_experiment",
    "hall_JUND_appetite_consequence",
    "hall_SULTAI_resource_conversion",
    "hall_MARDU_war_name_oath",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_PRISMARI_expression",
    "hall_SILVERQUILL_words",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "crucible_R_BR",
    "crucible_R_RG",
    "crucible_UR_PRISMARI",
    "crucible_PRISMARI_QUANDRIX",
    "crucible_PRISMARI_SILVERQUILL"
  ],
  "support_opportunity": "21",
  "opposing_opportunity": "12",
  "minimum_hit_contract_status": "NOT-ENFORCED; 9/252 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.726",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.853",
  "likely_false_positives": "Primary below strong-min proxy: 9; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: rhetoric | eloquence | persuasion | critique",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### SULTAI — Sultai Brood

```json
{
  "identity": "SULTAI",
  "canonical_name": "Sultai Brood",
  "certified_defining_signals": [
    "Sultai Brood",
    "Tarkir",
    "BGU",
    "Black-centered",
    "ruthlessness",
    "resource conversion",
    "necromancy",
    "sibsig",
    "rakshasa pacts",
    "Queen Sidisi",
    "Silumgar boundary",
    "Modern Dragonstorm Sultai"
  ],
  "negative_and_boundary_signals": [
    "generic BGU",
    "generic graveyard value",
    "generic theft or exile-casting",
    "generic mill",
    "generic morph",
    "generic mutate",
    "Silumgar clan continuity",
    "Commander product identity",
    "Dragonstorm backfill into Khans-era Sultai",
    "seed-file claims",
    "manual-fill lore as proof",
    "color philosophy as Tarkir proof"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "B",
      "count": 39
    },
    {
      "identity": "GLINT",
      "count": 31
    },
    {
      "identity": "BG",
      "count": 28
    },
    {
      "identity": "U",
      "count": 23
    },
    {
      "identity": "WITCH",
      "count": 20
    }
  ],
  "unique_discriminators": [
    "Sultai Brood",
    "BGU",
    "Black-centered",
    "ruthlessness",
    "necromancy",
    "sibsig",
    "rakshasa pacts",
    "Queen Sidisi",
    "Silumgar boundary",
    "Modern Dragonstorm Sultai"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_B_cost",
    "hall_B_graveyard",
    "hall_SULTAI_resource_conversion",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_YORE_engineered_agency",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_B_BG",
    "crucible_ABZAN_SULTAI",
    "crucible_TEMUR_SULTAI",
    "crucible_JESKAI_SULTAI"
  ],
  "missing_discriminators": [
    "Tarkir",
    "BGU",
    "ruthlessness",
    "necromancy",
    "sibsig",
    "rakshasa pacts",
    "Queen Sidisi"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_B_cost",
    "hall_U_understanding",
    "hall_R_ignition",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_WU_process",
    "hall_UB_information",
    "hall_BR_intensity",
    "hall_RG_wild",
    "hall_WG_belonging",
    "hall_WB_obligation",
    "hall_UR_experiment",
    "hall_BG_reclamation",
    "hall_BANT_champion",
    "hall_ESPER_designed_control",
    "hall_GRIXIS_survival_opening",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_instinct_pressure",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_family_endurance",
    "hall_TEMUR_survival_attunement",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_WR_protection",
    "hall_LOREHOLD_history",
    "hall_PRISMARI_expression",
    "hall_QUANDRIX_pattern",
    "hall_SILVERQUILL_words",
    "hall_WITHERBLOOM_essence",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_COLORLESS_WUBRG",
    "crucible_U_UR",
    "crucible_B_UB",
    "crucible_B_BR",
    "crucible_B_BG",
    "crucible_B_WB",
    "crucible_R_WR",
    "crucible_R_BR",
    "crucible_G_BG",
    "crucible_G_RG",
    "crucible_WU_WR",
    "crucible_WU_WB",
    "crucible_UG_QUANDRIX",
    "crucible_BG_WITHERBLOOM",
    "crucible_WB_SILVERQUILL",
    "crucible_PRISMARI_QUANDRIX",
    "crucible_PRISMARI_SILVERQUILL",
    "crucible_LOREHOLD_QUANDRIX",
    "crucible_QUANDRIX_WITHERBLOOM",
    "crucible_BR_RG",
    "crucible_GRIXIS_JUND",
    "crucible_NAYA_BANT",
    "crucible_ABZAN_MARDU",
    "crucible_ABZAN_SULTAI",
    "crucible_TEMUR_SULTAI",
    "crucible_TEMUR_MARDU",
    "crucible_JESKAI_SULTAI",
    "crucible_JESKAI_TEMUR",
    "crucible_YORE_GLINT",
    "crucible_GLINT_DUNE",
    "crucible_DUNE_INK",
    "crucible_INK_WITCH",
    "crucible_WITCH_YORE"
  ],
  "support_opportunity": "23",
  "opposing_opportunity": "21",
  "minimum_hit_contract_status": "NOT-ENFORCED; 39/275 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.775",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.647",
  "likely_false_positives": "Primary below strong-min proxy: 39; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: Tarkir | BGU | ruthlessness | necromancy | sibsig | rakshasa pacts | Queen Sidisi",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "HIGH-CONFUSION-RISK"
}
```

### TEMUR — Temur Frontier

```json
{
  "identity": "TEMUR",
  "canonical_name": "Temur Frontier",
  "certified_defining_signals": [
    "Temur Frontier",
    "Tarkir",
    "GUR",
    "Green-centered",
    "savagery",
    "instinct",
    "mental fortitude",
    "Qal Sisma",
    "whisperers",
    "Wide Whisper",
    "frozen ancestors",
    "elemental memory",
    "Endless Song"
  ],
  "negative_and_boundary_signals": [
    "generic GUR",
    "generic dragons",
    "generic ramp",
    "generic copying",
    "generic energy or artifacts",
    "Atarka Clan continuity",
    "Commander product identity",
    "Dragonstorm backfill into Khans-era Temur",
    "seed-file claims",
    "manual-fill lore as proof"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "G",
      "count": 24
    },
    {
      "identity": "INK",
      "count": 24
    },
    {
      "identity": "GLINT",
      "count": 23
    },
    {
      "identity": "PRISMARI",
      "count": 19
    },
    {
      "identity": "LOREHOLD",
      "count": 19
    }
  ],
  "unique_discriminators": [
    "Temur Frontier",
    "GUR",
    "savagery",
    "mental fortitude",
    "Qal Sisma",
    "whisperers",
    "Wide Whisper",
    "frozen ancestors",
    "elemental memory",
    "Endless Song"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_pressure_becomes",
    "hall_R_ignition",
    "hall_G_natural_order",
    "hall_UR_experiment",
    "hall_JUND_instinct_pressure",
    "hall_NAYA_living_whole",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_survival_attunement",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_PRISMARI_expression",
    "hall_SILVERQUILL_words",
    "hall_WUBRG_full_spectrum",
    "crucible_R_RG",
    "crucible_G_RG",
    "crucible_PRISMARI_SILVERQUILL",
    "crucible_GRIXIS_JUND",
    "crucible_JUND_NAYA",
    "crucible_NAYA_BANT",
    "crucible_ABZAN_MARDU",
    "crucible_ABZAN_SULTAI",
    "crucible_TEMUR_SULTAI",
    "crucible_TEMUR_MARDU",
    "crucible_JESKAI_TEMUR"
  ],
  "missing_discriminators": [
    "Tarkir",
    "GUR",
    "savagery",
    "Qal Sisma",
    "whisperers",
    "Wide Whisper",
    "Endless Song"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_U_possibility",
    "hall_R_ignition",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_UR_experiment",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_JUND_instinct_pressure",
    "hall_TEMUR_survival_attunement",
    "hall_GLINT_living_force",
    "hall_DUNE_territorial_force",
    "hall_QUANDRIX_pattern",
    "crucible_R_RG",
    "crucible_G_UG",
    "crucible_G_RG",
    "crucible_GRIXIS_JUND",
    "crucible_JUND_NAYA",
    "crucible_GLINT_DUNE"
  ],
  "support_opportunity": "24",
  "opposing_opportunity": "21",
  "minimum_hit_contract_status": "NOT-ENFORCED; 30/213 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.707",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.671",
  "likely_false_positives": "Primary below strong-min proxy: 30; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: Tarkir | GUR | savagery | Qal Sisma | whisperers | Wide Whisper | Endless Song",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "HIGH-CONFUSION-RISK"
}
```

### UG — Simic Combine

```json
{
  "identity": "UG",
  "canonical_name": "Simic Combine",
  "certified_defining_signals": [
    "adaptation",
    "improvement",
    "biology",
    "evolve",
    "specimen",
    "mutation",
    "progress",
    "organism",
    "experiment",
    "biomancy"
  ],
  "negative_and_boundary_signals": [
    "abstract proof",
    "life death craft",
    "law procedure",
    "wild dispossession",
    "archive history"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "G",
      "count": 84
    },
    {
      "identity": "GLINT",
      "count": 71
    },
    {
      "identity": "WITCH",
      "count": 65
    },
    {
      "identity": "U",
      "count": 55
    },
    {
      "identity": "W",
      "count": 49
    }
  ],
  "unique_discriminators": [
    "biology",
    "evolve",
    "specimen",
    "mutation",
    "organism",
    "biomancy"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_pressure_becomes",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_R_ignition",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_RG_wild",
    "hall_UR_experiment",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_GRIXIS_volatile_calculation",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_WITCH_patient_cultivation",
    "hall_QUANDRIX_pattern",
    "hall_WITHERBLOOM_essence",
    "crucible_U_UR",
    "crucible_U_UG",
    "crucible_R_UR",
    "crucible_G_UG",
    "crucible_UG_QUANDRIX",
    "crucible_ESPER_GRIXIS",
    "crucible_YORE_GLINT",
    "crucible_GLINT_DUNE",
    "crucible_WITCH_YORE"
  ],
  "missing_discriminators": [
    "evolve",
    "specimen",
    "mutation",
    "biomancy"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_UR_experiment",
    "hall_UG_adaptation",
    "hall_GRIXIS_volatile_calculation",
    "hall_GLINT_missing_white",
    "hall_QUANDRIX_pattern",
    "crucible_U_UR",
    "crucible_R_UR",
    "crucible_UR_PRISMARI"
  ],
  "support_opportunity": "26",
  "opposing_opportunity": "15",
  "minimum_hit_contract_status": "NOT-ENFORCED; 5/629 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.631",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "1",
  "likely_false_positives": "Primary below strong-min proxy: 5; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: evolve | specimen | mutation | biomancy",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### UR — Izzet League

```json
{
  "identity": "UR",
  "canonical_name": "Izzet League",
  "certified_defining_signals": [
    "experiment",
    "invention",
    "prototype",
    "mechanism",
    "lightning",
    "science",
    "build",
    "discovery",
    "question",
    "engineering",
    "chaotic"
  ],
  "negative_and_boundary_signals": [
    "pure mathematical proof",
    "performance as emotional art",
    "history archive",
    "biological adaptation",
    "procedure"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "GLINT",
      "count": 189
    },
    {
      "identity": "JESKAI",
      "count": 162
    },
    {
      "identity": "R",
      "count": 96
    },
    {
      "identity": "LOREHOLD",
      "count": 76
    },
    {
      "identity": "RG",
      "count": 74
    }
  ],
  "unique_discriminators": [
    "invention",
    "prototype",
    "mechanism",
    "lightning",
    "science",
    "build",
    "discovery",
    "question",
    "engineering",
    "chaotic"
  ],
  "current_questions_detecting_discriminators": [
    "hall_W_shelter",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_UR_experiment",
    "hall_BG_reclamation",
    "hall_UG_adaptation",
    "hall_GRIXIS_volatile_calculation",
    "hall_YORE_engineered_agency",
    "hall_PRISMARI_expression",
    "hall_QUANDRIX_pattern",
    "hall_COLORLESS_outside_wubrg",
    "crucible_W_WR",
    "crucible_U_UR",
    "crucible_R_UR",
    "crucible_UR_PRISMARI"
  ],
  "missing_discriminators": [
    "invention",
    "science",
    "discovery",
    "engineering"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_UR_experiment",
    "hall_UG_adaptation",
    "hall_GRIXIS_volatile_calculation",
    "hall_GLINT_missing_white",
    "hall_QUANDRIX_pattern",
    "crucible_U_UR",
    "crucible_R_UR",
    "crucible_UR_PRISMARI"
  ],
  "support_opportunity": "28",
  "opposing_opportunity": "16",
  "minimum_hit_contract_status": "NOT-ENFORCED; 285/1061 primary paths below 3 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.628",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "1",
  "likely_false_positives": "Primary below strong-min proxy: 285; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: invention | science | discovery | engineering",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "INSUFFICIENT-DISTINCTIVENESS-EVIDENCE"
}
```

### WB — Orzhov Syndicate

```json
{
  "identity": "WB",
  "canonical_name": "Orzhov Syndicate",
  "certified_defining_signals": [
    "debt",
    "obligation",
    "contract",
    "prestige",
    "tithe",
    "leverage",
    "legacy",
    "hierarchy",
    "payment",
    "guilt"
  ],
  "negative_and_boundary_signals": [
    "impartial law",
    "invisible secrecy",
    "public rhetoric",
    "selfless belonging",
    "free charity"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "YORE",
      "count": 110
    },
    {
      "identity": "WITCH",
      "count": 68
    },
    {
      "identity": "W",
      "count": 65
    },
    {
      "identity": "B",
      "count": 58
    },
    {
      "identity": "BR",
      "count": 42
    }
  ],
  "unique_discriminators": [
    "debt",
    "obligation",
    "contract",
    "prestige",
    "tithe",
    "legacy",
    "hierarchy",
    "payment",
    "guilt"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_first_signal",
    "hall_B_cost",
    "hall_B_graveyard",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_WU_process",
    "hall_UB_information",
    "hall_WB_obligation",
    "hall_BG_reclamation",
    "hall_ESPER_perfectibility",
    "hall_ESPER_designed_control",
    "hall_GRIXIS_survival_opening",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_instinct_pressure",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_JESKAI_disciplined_cunning",
    "hall_YORE_engineered_agency",
    "hall_GLINT_missing_white",
    "hall_INK_protected_abundance",
    "hall_WITCH_patient_cultivation",
    "hall_SILVERQUILL_words",
    "crucible_U_UB",
    "crucible_B_UB",
    "crucible_B_BG",
    "crucible_B_WB",
    "crucible_WU_WB",
    "crucible_UB_WB",
    "crucible_WB_SILVERQUILL",
    "crucible_ESPER_GRIXIS",
    "crucible_GRIXIS_JUND"
  ],
  "missing_discriminators": [
    "prestige",
    "tithe",
    "legacy",
    "payment",
    "guilt"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_B_cost",
    "hall_U_understanding",
    "hall_WU_process",
    "hall_WB_obligation",
    "hall_ESPER_perfectibility",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_dead_usefulness",
    "hall_YORE_engineered_agency",
    "crucible_B_UB",
    "crucible_B_BR",
    "crucible_B_BG",
    "crucible_UB_WB",
    "crucible_WB_SILVERQUILL",
    "crucible_YORE_GLINT"
  ],
  "support_opportunity": "28",
  "opposing_opportunity": "18",
  "minimum_hit_contract_status": "NOT-ENFORCED; 13/571 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.66",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "1",
  "likely_false_positives": "Primary below strong-min proxy: 13; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: prestige | tithe | legacy | payment | guilt",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### WITCH — Witch / Growth

```json
{
  "identity": "WITCH",
  "canonical_name": "Witch / Growth",
  "certified_defining_signals": [
    "cultivate",
    "accumulate",
    "patient",
    "inevitable",
    "compound",
    "protect",
    "structure",
    "long-term",
    "scale",
    "deliberate",
    "systematic"
  ],
  "negative_and_boundary_signals": [
    "User centers speed, urgency, or acting before the window closes.",
    "User centers spectacle, emotional release, or the thrill of one decisive moment.",
    "User centers chaotic variance, high-risk gambling, or outcomes that depend on luck.",
    "User centers individual heroism, present-tense sacrifice, or immediate protection as the main answer.",
    "User centers mechanics, commanders, or color grouping without the missing-Red protected-growth worldview."
  ],
  "nearest_identity_competitors": [
    {
      "identity": "W",
      "count": 94
    },
    {
      "identity": "QUANDRIX",
      "count": 51
    },
    {
      "identity": "BANT",
      "count": 39
    },
    {
      "identity": "B",
      "count": 33
    },
    {
      "identity": "NAYA",
      "count": 31
    }
  ],
  "unique_discriminators": [
    "cultivate",
    "accumulate",
    "patient",
    "inevitable",
    "compound",
    "long-term",
    "scale",
    "deliberate",
    "systematic"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_pressure_becomes",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_B_graveyard",
    "hall_U_understanding",
    "hall_R_ignition",
    "hall_WU_process",
    "hall_UB_information",
    "hall_WG_belonging",
    "hall_WB_obligation",
    "hall_UG_adaptation",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_ESPER_designed_control",
    "hall_JUND_instinct_pressure",
    "hall_NAYA_living_whole",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_ancestor_perennation",
    "hall_SULTAI_resource_conversion",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_way_form",
    "hall_YORE_engineered_agency",
    "hall_DUNE_territorial_force",
    "hall_WITCH_patient_cultivation",
    "hall_LOREHOLD_history",
    "hall_QUANDRIX_pattern",
    "hall_SILVERQUILL_words",
    "hall_WUBRG_full_spectrum",
    "crucible_W_WU",
    "crucible_W_WR",
    "crucible_W_WG",
    "crucible_R_WR",
    "crucible_G_RG",
    "crucible_WR_LOREHOLD",
    "crucible_PRISMARI_SILVERQUILL",
    "crucible_BANT_ESPER",
    "crucible_DUNE_INK",
    "crucible_INK_WITCH",
    "crucible_WITCH_YORE"
  ],
  "missing_discriminators": [
    "accumulate",
    "compound",
    "systematic"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_U_understanding",
    "hall_WU_process",
    "hall_WG_belonging",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_GRIXIS_volatile_calculation",
    "hall_NAYA_abundance_instinct",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_way_form",
    "hall_INK_protected_abundance",
    "hall_WITCH_patient_cultivation",
    "hall_LOREHOLD_history",
    "crucible_W_WU",
    "crucible_U_WU",
    "crucible_WU_WG",
    "crucible_WU_WB"
  ],
  "support_opportunity": "16",
  "opposing_opportunity": "16",
  "minimum_hit_contract_status": "NOT-ENFORCED; 88/454 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.823",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.894",
  "likely_false_positives": "Primary below strong-min proxy: 88; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: accumulate | compound | systematic",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### WITHERBLOOM — Witherbloom College

```json
{
  "identity": "WITHERBLOOM",
  "canonical_name": "Witherbloom College",
  "certified_defining_signals": [
    "essence",
    "life",
    "death",
    "pest",
    "craft",
    "brew",
    "swamp",
    "study",
    "body",
    "drain",
    "growth"
  ],
  "negative_and_boundary_signals": [
    "community harmony",
    "biological optimization",
    "graveyard civilization",
    "wild dispossession",
    "abstract proof"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "GLINT",
      "count": 108
    },
    {
      "identity": "G",
      "count": 60
    },
    {
      "identity": "B",
      "count": 53
    },
    {
      "identity": "BR",
      "count": 38
    },
    {
      "identity": "UB",
      "count": 31
    }
  ],
  "unique_discriminators": [
    "essence",
    "pest",
    "craft",
    "brew",
    "swamp",
    "study",
    "body",
    "drain"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_first_signal",
    "hall_B_cost",
    "hall_B_graveyard",
    "hall_R_ignition",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_BR_intensity",
    "hall_RG_wild",
    "hall_WG_belonging",
    "hall_BG_reclamation",
    "hall_UG_adaptation",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_GRIXIS_survival_opening",
    "hall_JUND_instinct_pressure",
    "hall_NAYA_living_whole",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_family_endurance",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_survival_attunement",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_way_form",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_WITCH_patient_cultivation",
    "hall_PRISMARI_expression",
    "hall_QUANDRIX_pattern",
    "hall_WITHERBLOOM_essence",
    "hall_COLORLESS_branch_boundary",
    "crucible_U_UG",
    "crucible_B_BG",
    "crucible_R_RG",
    "crucible_G_UG",
    "crucible_G_BG",
    "crucible_G_RG",
    "crucible_UG_QUANDRIX",
    "crucible_BG_WITHERBLOOM",
    "crucible_QUANDRIX_WITHERBLOOM",
    "crucible_JUND_NAYA",
    "crucible_NAYA_BANT",
    "crucible_TEMUR_SULTAI",
    "crucible_JESKAI_TEMUR",
    "crucible_INK_WITCH"
  ],
  "missing_discriminators": [
    "pest",
    "brew",
    "swamp",
    "drain"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_U_possibility",
    "hall_RG_wild",
    "hall_ESPER_perfectibility",
    "crucible_U_UB",
    "crucible_ESPER_GRIXIS"
  ],
  "support_opportunity": "24",
  "opposing_opportunity": "11",
  "minimum_hit_contract_status": "NOT-ENFORCED; 0/439 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.666",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.979",
  "likely_false_positives": "Primary below strong-min proxy: 0; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: pest | brew | swamp | drain",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### WR — Boros Legion

```json
{
  "identity": "WR",
  "canonical_name": "Boros Legion",
  "certified_defining_signals": [
    "protect",
    "protection",
    "intervene",
    "immediate",
    "action",
    "teammate",
    "duty",
    "justice",
    "accountable",
    "defend"
  ],
  "negative_and_boundary_signals": [
    "procedure without urgency",
    "historical evidence without intervention",
    "harmony without confrontation",
    "performance without service",
    "private leverage"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "JESKAI",
      "count": 145
    },
    {
      "identity": "NAYA",
      "count": 126
    },
    {
      "identity": "R",
      "count": 107
    },
    {
      "identity": "YORE",
      "count": 79
    },
    {
      "identity": "WUBRG",
      "count": 77
    }
  ],
  "unique_discriminators": [
    "intervene",
    "immediate",
    "teammate",
    "justice",
    "accountable",
    "defend"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_B_graveyard",
    "hall_U_understanding",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_WU_process",
    "hall_UB_information",
    "hall_BR_intensity",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_JUND_instinct_pressure",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_family_endurance",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_survival_attunement",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_WITCH_patient_cultivation",
    "hall_WR_protection",
    "hall_LOREHOLD_history",
    "crucible_W_WU",
    "crucible_W_WR",
    "crucible_W_WG",
    "crucible_R_WR",
    "crucible_R_BR",
    "crucible_WU_WR",
    "crucible_WR_LOREHOLD",
    "crucible_BANT_ESPER",
    "crucible_NAYA_BANT",
    "crucible_ABZAN_SULTAI",
    "crucible_TEMUR_MARDU",
    "crucible_JESKAI_MARDU",
    "crucible_JESKAI_SULTAI",
    "crucible_JESKAI_TEMUR",
    "crucible_GLINT_DUNE",
    "crucible_DUNE_INK",
    "crucible_WITCH_YORE"
  ],
  "missing_discriminators": [
    "teammate"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_duty",
    "hall_B_graveyard",
    "hall_R_ignition",
    "hall_R_freedom",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_ABZAN_family_endurance",
    "hall_ABZAN_ancestor_perennation",
    "hall_TEMUR_elemental_memory",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_INK_protected_abundance",
    "hall_WR_protection",
    "crucible_W_WR",
    "crucible_R_WR",
    "crucible_WU_WR",
    "crucible_INK_WITCH"
  ],
  "support_opportunity": "29",
  "opposing_opportunity": "19",
  "minimum_hit_contract_status": "NOT-ENFORCED; 10/1008 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.628",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "1",
  "likely_false_positives": "Primary below strong-min proxy: 10; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: teammate",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### WUBRG — Five-Color / WUBRG

```json
{
  "identity": "WUBRG",
  "canonical_name": "Five-Color / WUBRG",
  "certified_defining_signals": [
    "all five colors present",
    "full-spectrum integration",
    "coalition or synthesis",
    "Commander color identity precision",
    "breadth with tradeoffs"
  ],
  "negative_and_boundary_signals": [
    "generic goodstuff-only",
    "WUBRG superiority",
    "official WUBRG faction or doctrine",
    "Colorless conflation",
    "four-color missing-color framing",
    "specific card, legality, price, ranking, or metagame claims without verification"
  ],
  "nearest_identity_competitors": [
    {
      "identity": "R",
      "count": 72
    },
    {
      "identity": "BG",
      "count": 47
    },
    {
      "identity": "WG",
      "count": 46
    },
    {
      "identity": "RG",
      "count": 40
    },
    {
      "identity": "ESPER",
      "count": 40
    }
  ],
  "unique_discriminators": [
    "all five colors present",
    "full-spectrum integration",
    "coalition or synthesis",
    "Commander color identity precision",
    "breadth with tradeoffs"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "hall_W_duty",
    "hall_R_ignition",
    "hall_WB_obligation",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_living_whole",
    "hall_ABZAN_ancestor_perennation",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_LOREHOLD_history",
    "hall_PRISMARI_expression",
    "hall_SILVERQUILL_words",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_COLORLESS_WUBRG",
    "crucible_W_WU",
    "crucible_W_WG",
    "crucible_U_WU",
    "crucible_R_UR",
    "crucible_R_RG",
    "crucible_G_WG",
    "crucible_G_BG",
    "crucible_WU_WG",
    "crucible_WR_LOREHOLD",
    "crucible_BR_RG",
    "crucible_ABZAN_SULTAI",
    "crucible_JESKAI_MARDU"
  ],
  "missing_discriminators": [
    "coalition or synthesis"
  ],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_B_cost",
    "hall_U_understanding",
    "hall_R_ignition",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_WU_process",
    "hall_UB_information",
    "hall_BR_intensity",
    "hall_RG_wild",
    "hall_WG_belonging",
    "hall_WB_obligation",
    "hall_UR_experiment",
    "hall_BG_reclamation",
    "hall_BANT_champion",
    "hall_ESPER_designed_control",
    "hall_GRIXIS_survival_opening",
    "hall_GRIXIS_volatile_calculation",
    "hall_JUND_instinct_pressure",
    "hall_JUND_appetite_consequence",
    "hall_NAYA_abundance_instinct",
    "hall_ABZAN_family_endurance",
    "hall_TEMUR_survival_attunement",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_WR_protection",
    "hall_LOREHOLD_history",
    "hall_PRISMARI_expression",
    "hall_QUANDRIX_pattern",
    "hall_SILVERQUILL_words",
    "hall_WITHERBLOOM_essence",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_COLORLESS_WUBRG",
    "crucible_U_UR",
    "crucible_B_UB",
    "crucible_B_BR",
    "crucible_B_BG",
    "crucible_B_WB",
    "crucible_R_WR",
    "crucible_R_BR",
    "crucible_G_BG",
    "crucible_G_RG",
    "crucible_WU_WR",
    "crucible_WU_WB",
    "crucible_UG_QUANDRIX",
    "crucible_BG_WITHERBLOOM",
    "crucible_WB_SILVERQUILL",
    "crucible_PRISMARI_QUANDRIX",
    "crucible_PRISMARI_SILVERQUILL",
    "crucible_LOREHOLD_QUANDRIX",
    "crucible_QUANDRIX_WITHERBLOOM",
    "crucible_BR_RG",
    "crucible_GRIXIS_JUND",
    "crucible_NAYA_BANT",
    "crucible_ABZAN_MARDU",
    "crucible_ABZAN_SULTAI",
    "crucible_TEMUR_SULTAI",
    "crucible_TEMUR_MARDU",
    "crucible_JESKAI_SULTAI",
    "crucible_JESKAI_TEMUR",
    "crucible_YORE_GLINT",
    "crucible_GLINT_DUNE",
    "crucible_DUNE_INK",
    "crucible_INK_WITCH",
    "crucible_WITCH_YORE"
  ],
  "support_opportunity": "8",
  "opposing_opportunity": "21",
  "minimum_hit_contract_status": "NOT-ENFORCED; 132/778 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.824",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.812",
  "likely_false_positives": "Primary below strong-min proxy: 132; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: coalition or synthesis",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "MECHANICALLY-DISTINGUISHABLE-BUT-UNVALIDATED"
}
```

### YORE — Yore / Artifice

```json
{
  "identity": "YORE",
  "canonical_name": "Yore / Artifice",
  "certified_defining_signals": [
    "engineered",
    "agency",
    "artifice",
    "technology",
    "civilization",
    "progress",
    "natural limits",
    "four-color",
    "without Green",
    "missing-Green",
    "White structure",
    "Blue optimization",
    "Black refusal",
    "Red heat",
    "resource conversion",
    "constructed continuity"
  ],
  "negative_and_boundary_signals": [
    "User centers natural lifecycle, organic belonging, ecological harmony, or Green-rooted continuity.",
    "User mentions artifacts, recursion, sacrifice, or optimization without engineered agency or missing-Green worldview.",
    "User treats Breya, Invent Superiority, Yore-Tiller, Cult of Yore, or a name-adjacent phrase as sufficient proof.",
    "User resolves more cleanly into Esper, Grixis, Jeskai, Mardu, Sultai, a two-color pair, or generic same-color goodstuff."
  ],
  "nearest_identity_competitors": [
    {
      "identity": "B",
      "count": 119
    },
    {
      "identity": "DUNE",
      "count": 64
    },
    {
      "identity": "BR",
      "count": 43
    },
    {
      "identity": "PRISMARI",
      "count": 41
    },
    {
      "identity": "R",
      "count": 39
    }
  ],
  "unique_discriminators": [
    "engineered",
    "artifice",
    "technology",
    "natural limits",
    "without Green",
    "missing-Green",
    "White structure",
    "Blue optimization",
    "Black refusal",
    "Red heat",
    "constructed continuity"
  ],
  "current_questions_detecting_discriminators": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_B_cost",
    "hall_B_graveyard",
    "hall_U_understanding",
    "hall_U_possibility",
    "hall_G_growth",
    "hall_G_natural_order",
    "hall_WU_process",
    "hall_RG_wild",
    "hall_WG_belonging",
    "hall_WB_obligation",
    "hall_UG_adaptation",
    "hall_ESPER_designed_control",
    "hall_ABZAN_family_endurance",
    "hall_TEMUR_survival_attunement",
    "hall_SULTAI_resource_conversion",
    "hall_SULTAI_dead_usefulness",
    "hall_MARDU_total_commitment",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_disciplined_cunning",
    "hall_JESKAI_way_form",
    "hall_YORE_engineered_agency",
    "hall_YORE_artifice_boundary",
    "hall_GLINT_living_force",
    "hall_GLINT_missing_white",
    "hall_DUNE_territorial_force",
    "hall_DUNE_missing_blue",
    "hall_INK_protected_abundance",
    "hall_INK_missing_black",
    "hall_WITCH_patient_cultivation",
    "hall_WITCH_missing_red",
    "hall_LOREHOLD_history",
    "hall_QUANDRIX_pattern",
    "hall_COLORLESS_outside_wubrg",
    "hall_COLORLESS_branch_boundary",
    "hall_WUBRG_full_spectrum",
    "crucible_COLORLESS_WUBRG",
    "crucible_W_WU",
    "crucible_W_WR",
    "crucible_W_WG",
    "crucible_U_UG",
    "crucible_B_UB",
    "crucible_B_BR",
    "crucible_B_BG",
    "crucible_R_BR",
    "crucible_G_WG",
    "crucible_G_BG",
    "crucible_G_RG",
    "crucible_BR_RG",
    "crucible_BANT_ESPER",
    "crucible_ESPER_GRIXIS",
    "crucible_GRIXIS_JUND",
    "crucible_ABZAN_SULTAI",
    "crucible_TEMUR_SULTAI",
    "crucible_JESKAI_SULTAI",
    "crucible_YORE_GLINT",
    "crucible_WITCH_YORE"
  ],
  "missing_discriminators": [],
  "questions_creating_confusion": [
    "gate_v2_locus_of_trust",
    "gate_v2_pressure_becomes",
    "gate_v2_first_signal",
    "gate_v2_cost_of_oath",
    "hall_W_shelter",
    "hall_W_duty",
    "hall_U_understanding",
    "hall_WU_process",
    "hall_WG_belonging",
    "hall_UG_adaptation",
    "hall_BANT_champion",
    "hall_BANT_living_order",
    "hall_ESPER_perfectibility",
    "hall_GRIXIS_volatile_calculation",
    "hall_NAYA_abundance_instinct",
    "hall_MARDU_war_name_oath",
    "hall_JESKAI_way_form",
    "hall_INK_protected_abundance",
    "hall_WITCH_patient_cultivation",
    "hall_LOREHOLD_history",
    "crucible_W_WU",
    "crucible_U_WU",
    "crucible_WU_WG",
    "crucible_WU_WB"
  ],
  "support_opportunity": "19",
  "opposing_opportunity": "16",
  "minimum_hit_contract_status": "NOT-ENFORCED; 219/583 primary paths below 2 strong authored hits",
  "false_positive_guardrail_status": "FREE-TEXT METADATA ONLY; no executable predicate, so exhaustive violation count is unresolved",
  "gate_dependency": "0.821",
  "single_question_dependency": "NO/UNRESOLVED",
  "branch_dependency": "0.919",
  "likely_false_positives": "Primary below strong-min proxy: 219; negative-only winners: 0",
  "likely_false_negatives": "Missing discriminator terms: none by lexical probe",
  "primary_copy_consistency": "NAME-CONSISTENT; claim entailment unvalidated",
  "adjacent_copy_consistency": "Numeric rank-two/rank-three framing; relationship meaning not independently established",
  "commander_expression_consistency": "Identity/color/tag-aligned editorial translation; not selected-answer evidence-backed",
  "unresolved_evidence_needs": "Player-language derivation, question validity, response reliability, same-family confusion matrix, false-positive/negative pilot evidence",
  "distinctiveness_disposition": "INSUFFICIENT-DISTINCTIVENESS-EVIDENCE"
}
```

## Scenario review

All 37 profile scenarios are `GOLDEN-PATH-DERIVED`: the generator calls `runAdaptiveGoldenPath` with the expected identity as target. None was independently selected, none includes a material neighboring/mixed challenge, all 37 score `EXACT-PRIMARY`, and all 37 have final review disposition `INCOMPLETE`.

The five representative records below cover mono-color, guild, college, shard, and four-color structures. Profiles with a material neighboring/mixed challenge: none.

### BANT — EXACT-PRIMARY / INCOMPLETE

```json
{
  "expected_identity": "BANT",
  "scenario_origin": "GOLDEN-PATH-DERIVED",
  "scenario_origin_basis": "The remediation generator calls runAdaptiveGoldenPath with targetFaction equal to the expected identity; answers were not selected independently.",
  "defining_evidence": [
    "Bant",
    "exalted",
    "champion",
    "sigil",
    "honor",
    "Rafiq",
    "Valeron",
    "Akrasa",
    "Great Conduit",
    "community",
    "protection",
    "refinement"
  ],
  "closest_competitor": "INK",
  "mixed_or_uncertain_element": "Nearest current numeric competitor INK; no explicit mixed/unknown response state exists.",
  "neighboring_challenge_status": "INCOMPLETE: nearest numeric competitor is recorded, but no independently selected neighboring challenge was introduced.",
  "mixed_or_uncertain_challenge_status": "INCOMPLETE: the target-seeking routine selected no mixed/uncertain answer and the questionnaire has no explicit mixed/unknown state.",
  "exact_available_answers_selected": [
    {
      "stage": "gate",
      "question_id": "gate_v2_locus_of_trust",
      "answer_id": "gate_v2_trust_common_root",
      "title": "The common root"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_pressure_becomes",
      "answer_id": "gate_v2_pressure_answerable_motion",
      "title": "Answerable motion"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_first_signal",
      "answer_id": "gate_v2_signal_whole_chord",
      "title": "The whole chord"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_cost_of_oath",
      "answer_id": "gate_v2_oath_whole_covenant",
      "title": "Keep the whole covenant"
    },
    {
      "stage": "hall",
      "question_id": "hall_BANT_champion",
      "answer_id": "MISSING:hall_BANT_champion#answer-1",
      "title": "Public trust and support"
    },
    {
      "stage": "hall",
      "question_id": "hall_BANT_living_order",
      "answer_id": "MISSING:hall_BANT_living_order#answer-1",
      "title": "Duty held by living community"
    }
  ],
  "branch_path_reached": [
    "gate:gate_v2_locus_of_trust",
    "gate:gate_v2_pressure_becomes",
    "gate:gate_v2_first_signal",
    "gate:gate_v2_cost_of_oath",
    "hall:hall_BANT_champion",
    "hall:hall_BANT_living_order"
  ],
  "final_primary": "BANT",
  "rank_two": "INK",
  "rank_three": "JESKAI",
  "softmax_share_displayed_as_confidence": "0.701",
  "direct_positive_evidence_present": "true",
  "minimum_hit_metadata_satisfied_by_strong_authored_hit_proxy": "true",
  "strong_authored_hit_count": "4",
  "false_positive_guardrail_metadata_satisfied": "UNRESOLVED: guardrail is free text and has no executable predicate",
  "explanation_result": "Bant recognizes the shape of your game as The Communal Champion. Your answers repeatedly expressed integrated covenant and supported champion. Ink / Altruism stayed near the reading, but Bant was the stronger match. This is a Vox Mana interpretive placement for a commander start, not an objective diagnosis or official canon.",
  "adjacent_result": [
    {
      "identity": "INK",
      "share": 0.032,
      "reason": "Ink / Altruism stayed close through bounded action, balanced chord, integrated covenant."
    },
    {
      "identity": "JESKAI",
      "share": 0.03,
      "reason": "Jeskai Way stayed close through bounded action, balanced chord, integrated covenant."
    }
  ],
  "commander_recommendation_result": [
    "Rafiq of the Many",
    "Chulane, Teller of Tales",
    "Tuvasa the Sunlit"
  ],
  "acceptable_result_set": [
    "BANT"
  ],
  "unacceptable_false_positives": [
    "ABZAN",
    "B",
    "BG",
    "BR",
    "COLORLESS"
  ],
  "scoring_outcome": "EXACT-PRIMARY",
  "final_disposition": "INCOMPLETE",
  "scenario_limit": "Golden-path-derived target-seeking probe. It demonstrates target reachability under the runtime helper only; it is not an independently derived profile, a neighboring challenge, semantic placement accuracy, or empirical player validation."
}
```

### PRISMARI — EXACT-PRIMARY / INCOMPLETE

```json
{
  "expected_identity": "PRISMARI",
  "scenario_origin": "GOLDEN-PATH-DERIVED",
  "scenario_origin_basis": "The remediation generator calls runAdaptiveGoldenPath with targetFaction equal to the expected identity; answers were not selected independently.",
  "defining_evidence": [
    "expression",
    "performance",
    "art",
    "emotion",
    "elemental",
    "creativity",
    "dramatic",
    "style",
    "movement",
    "spectacle"
  ],
  "closest_competitor": "R",
  "mixed_or_uncertain_element": "Nearest current numeric competitor R; no explicit mixed/unknown response state exists.",
  "neighboring_challenge_status": "INCOMPLETE: nearest numeric competitor is recorded, but no independently selected neighboring challenge was introduced.",
  "mixed_or_uncertain_challenge_status": "INCOMPLETE: the target-seeking routine selected no mixed/uncertain answer and the questionnaire has no explicit mixed/unknown state.",
  "exact_available_answers_selected": [
    {
      "stage": "gate",
      "question_id": "gate_v2_locus_of_trust",
      "answer_id": "gate_v2_trust_personal_threshold",
      "title": "The threshold in the self"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_pressure_becomes",
      "answer_id": "gate_v2_pressure_answerable_motion",
      "title": "Answerable motion"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_first_signal",
      "answer_id": "gate_v2_signal_live_spark",
      "title": "The live spark"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_cost_of_oath",
      "answer_id": "gate_v2_oath_transform",
      "title": "Become the changed thing"
    },
    {
      "stage": "hall",
      "question_id": "hall_PRISMARI_expression",
      "answer_id": "MISSING:hall_PRISMARI_expression#answer-1",
      "title": "The unforgettable expression"
    },
    {
      "stage": "hall",
      "question_id": "hall_TEMUR_survival_attunement",
      "answer_id": "MISSING:hall_TEMUR_survival_attunement#answer-4",
      "title": "Guard the living whole"
    }
  ],
  "branch_path_reached": [
    "gate:gate_v2_locus_of_trust",
    "gate:gate_v2_pressure_becomes",
    "gate:gate_v2_first_signal",
    "gate:gate_v2_cost_of_oath",
    "hall:hall_PRISMARI_expression",
    "hall:hall_TEMUR_survival_attunement"
  ],
  "final_primary": "PRISMARI",
  "rank_two": "R",
  "rank_three": "GLINT",
  "softmax_share_displayed_as_confidence": "0.461",
  "direct_positive_evidence_present": "true",
  "minimum_hit_metadata_satisfied_by_strong_authored_hit_proxy": "true",
  "strong_authored_hit_count": "3",
  "false_positive_guardrail_metadata_satisfied": "UNRESOLVED: guardrail is free text and has no executable predicate",
  "explanation_result": "Prismari College recognizes the shape of your game as The Elemental Expressionist. Your answers repeatedly expressed felt ignition and transformative cost. Red stayed near the reading, but Prismari College was the stronger match. This is a Vox Mana interpretive placement for a commander start, not an objective diagnosis or official canon.",
  "adjacent_result": [
    {
      "identity": "R",
      "share": 0.056,
      "reason": "Red stayed close through personal threshold, felt ignition."
    },
    {
      "identity": "GLINT",
      "share": 0.044,
      "reason": "Glint / Chaos stayed close through personal threshold, bounded action, transformative cost."
    }
  ],
  "commander_recommendation_result": [
    "Prismari Artistry (Precon)",
    "Galazeth Prismari",
    "Rootha, Mercurial Artist"
  ],
  "acceptable_result_set": [
    "PRISMARI"
  ],
  "unacceptable_false_positives": [
    "ABZAN",
    "B",
    "BANT",
    "BG",
    "BR"
  ],
  "scoring_outcome": "EXACT-PRIMARY",
  "final_disposition": "INCOMPLETE",
  "scenario_limit": "Golden-path-derived target-seeking probe. It demonstrates target reachability under the runtime helper only; it is not an independently derived profile, a neighboring challenge, semantic placement accuracy, or empirical player validation."
}
```

### U — EXACT-PRIMARY / INCOMPLETE

```json
{
  "expected_identity": "U",
  "scenario_origin": "GOLDEN-PATH-DERIVED",
  "scenario_origin_basis": "The remediation generator calls runAdaptiveGoldenPath with targetFaction equal to the expected identity; answers were not selected independently.",
  "defining_evidence": [
    "knowledge",
    "learning",
    "tools",
    "improvement",
    "optimization",
    "control",
    "deliberation"
  ],
  "closest_competitor": "UB",
  "mixed_or_uncertain_element": "Nearest current numeric competitor UB; no explicit mixed/unknown response state exists.",
  "neighboring_challenge_status": "INCOMPLETE: nearest numeric competitor is recorded, but no independently selected neighboring challenge was introduced.",
  "mixed_or_uncertain_challenge_status": "INCOMPLETE: the target-seeking routine selected no mixed/uncertain answer and the questionnaire has no explicit mixed/unknown state.",
  "exact_available_answers_selected": [
    {
      "stage": "gate",
      "question_id": "gate_v2_locus_of_trust",
      "answer_id": "gate_v2_trust_outside_measure",
      "title": "The measure outside the map"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_pressure_becomes",
      "answer_id": "gate_v2_pressure_form",
      "title": "A form that can hold"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_first_signal",
      "answer_id": "gate_v2_signal_measured_trace",
      "title": "The measured trace"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_cost_of_oath",
      "answer_id": "gate_v2_oath_transform",
      "title": "Become the changed thing"
    },
    {
      "stage": "hall",
      "question_id": "hall_U_understanding",
      "answer_id": "MISSING:hall_U_understanding#answer-1",
      "title": "Map the variables"
    },
    {
      "stage": "hall",
      "question_id": "hall_U_possibility",
      "answer_id": "MISSING:hall_U_possibility#answer-1",
      "title": "Improve the model"
    }
  ],
  "branch_path_reached": [
    "gate:gate_v2_locus_of_trust",
    "gate:gate_v2_pressure_becomes",
    "gate:gate_v2_first_signal",
    "gate:gate_v2_cost_of_oath",
    "hall:hall_U_understanding",
    "hall:hall_U_possibility"
  ],
  "final_primary": "U",
  "rank_two": "UB",
  "rank_three": "WU",
  "softmax_share_displayed_as_confidence": "0.894",
  "direct_positive_evidence_present": "true",
  "minimum_hit_metadata_satisfied_by_strong_authored_hit_proxy": "true",
  "strong_authored_hit_count": "4",
  "false_positive_guardrail_metadata_satisfied": "UNRESOLVED: guardrail is free text and has no executable predicate",
  "explanation_result": "Blue recognizes the shape of your game as The Possibility Architect. Your answers repeatedly expressed transformative cost and act after understanding. House Dimir stayed near the reading, but Blue was the stronger match. This is a Vox Mana interpretive placement for a commander start, not an objective diagnosis or official canon.",
  "adjacent_result": [
    {
      "identity": "UB",
      "share": 0.011,
      "reason": "House Dimir stayed close through measured inference, transformative cost, act after understanding."
    },
    {
      "identity": "WU",
      "share": 0.009,
      "reason": "Azorius Senate stayed close through measured inference, act after understanding, optimization through knowledge."
    }
  ],
  "commander_recommendation_result": [
    "Talrand, Sky Summoner",
    "Azami, Lady of Scrolls",
    "Minn, Wily Illusionist"
  ],
  "acceptable_result_set": [
    "U"
  ],
  "unacceptable_false_positives": [
    "ABZAN",
    "B",
    "BANT",
    "BG",
    "BR"
  ],
  "scoring_outcome": "EXACT-PRIMARY",
  "final_disposition": "INCOMPLETE",
  "scenario_limit": "Golden-path-derived target-seeking probe. It demonstrates target reachability under the runtime helper only; it is not an independently derived profile, a neighboring challenge, semantic placement accuracy, or empirical player validation."
}
```

### UR — EXACT-PRIMARY / INCOMPLETE

```json
{
  "expected_identity": "UR",
  "scenario_origin": "GOLDEN-PATH-DERIVED",
  "scenario_origin_basis": "The remediation generator calls runAdaptiveGoldenPath with targetFaction equal to the expected identity; answers were not selected independently.",
  "defining_evidence": [
    "experiment",
    "invention",
    "prototype",
    "mechanism",
    "lightning",
    "science",
    "build",
    "discovery",
    "question",
    "engineering",
    "chaotic"
  ],
  "closest_competitor": "GLINT",
  "mixed_or_uncertain_element": "Nearest current numeric competitor GLINT; no explicit mixed/unknown response state exists.",
  "neighboring_challenge_status": "INCOMPLETE: nearest numeric competitor is recorded, but no independently selected neighboring challenge was introduced.",
  "mixed_or_uncertain_challenge_status": "INCOMPLETE: the target-seeking routine selected no mixed/uncertain answer and the questionnaire has no explicit mixed/unknown state.",
  "exact_available_answers_selected": [
    {
      "stage": "gate",
      "question_id": "gate_v2_locus_of_trust",
      "answer_id": "gate_v2_trust_personal_threshold",
      "title": "The threshold in the self"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_pressure_becomes",
      "answer_id": "gate_v2_pressure_answerable_motion",
      "title": "Answerable motion"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_first_signal",
      "answer_id": "gate_v2_signal_live_spark",
      "title": "The live spark"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_cost_of_oath",
      "answer_id": "gate_v2_oath_transform",
      "title": "Become the changed thing"
    },
    {
      "stage": "hall",
      "question_id": "hall_UR_experiment",
      "answer_id": "MISSING:hall_UR_experiment#answer-1",
      "title": "The mechanism"
    },
    {
      "stage": "hall",
      "question_id": "hall_R_ignition",
      "answer_id": "MISSING:hall_R_ignition#answer-3",
      "title": "Make it a test"
    }
  ],
  "branch_path_reached": [
    "gate:gate_v2_locus_of_trust",
    "gate:gate_v2_pressure_becomes",
    "gate:gate_v2_first_signal",
    "gate:gate_v2_cost_of_oath",
    "hall:hall_UR_experiment",
    "hall:hall_R_ignition"
  ],
  "final_primary": "UR",
  "rank_two": "GLINT",
  "rank_three": "U",
  "softmax_share_displayed_as_confidence": "0.756",
  "direct_positive_evidence_present": "true",
  "minimum_hit_metadata_satisfied_by_strong_authored_hit_proxy": "true",
  "strong_authored_hit_count": "4",
  "false_positive_guardrail_metadata_satisfied": "UNRESOLVED: guardrail is free text and has no executable predicate",
  "explanation_result": "Izzet League recognizes the shape of your game as The Experimental Spark. Your answers repeatedly expressed transformative cost and mechanistic experiment. Glint / Chaos stayed near the reading, but Izzet League was the stronger match. This is a Vox Mana interpretive placement for a commander start, not an objective diagnosis or official canon.",
  "adjacent_result": [
    {
      "identity": "GLINT",
      "share": 0.027,
      "reason": "Glint / Chaos stayed close through personal threshold, bounded action, transformative cost."
    },
    {
      "identity": "U",
      "share": 0.024,
      "reason": "Blue stayed close through personal threshold, bounded action, transformative cost."
    }
  ],
  "commander_recommendation_result": [
    "Niv-Mizzet, Parun",
    "Melek, Izzet Paragon",
    "Niv-Mizzet, Dracogenius"
  ],
  "acceptable_result_set": [
    "UR"
  ],
  "unacceptable_false_positives": [
    "ABZAN",
    "B",
    "BANT",
    "BG",
    "BR"
  ],
  "scoring_outcome": "EXACT-PRIMARY",
  "final_disposition": "INCOMPLETE",
  "scenario_limit": "Golden-path-derived target-seeking probe. It demonstrates target reachability under the runtime helper only; it is not an independently derived profile, a neighboring challenge, semantic placement accuracy, or empirical player validation."
}
```

### YORE — EXACT-PRIMARY / INCOMPLETE

```json
{
  "expected_identity": "YORE",
  "scenario_origin": "GOLDEN-PATH-DERIVED",
  "scenario_origin_basis": "The remediation generator calls runAdaptiveGoldenPath with targetFaction equal to the expected identity; answers were not selected independently.",
  "defining_evidence": [
    "engineered",
    "agency",
    "artifice",
    "technology",
    "civilization",
    "progress",
    "natural limits",
    "four-color",
    "without Green",
    "missing-Green",
    "White structure",
    "Blue optimization",
    "Black refusal",
    "Red heat",
    "resource conversion",
    "constructed continuity"
  ],
  "closest_competitor": "SILVERQUILL",
  "mixed_or_uncertain_element": "Nearest current numeric competitor SILVERQUILL; no explicit mixed/unknown response state exists.",
  "neighboring_challenge_status": "INCOMPLETE: nearest numeric competitor is recorded, but no independently selected neighboring challenge was introduced.",
  "mixed_or_uncertain_challenge_status": "INCOMPLETE: the target-seeking routine selected no mixed/uncertain answer and the questionnaire has no explicit mixed/unknown state.",
  "exact_available_answers_selected": [
    {
      "stage": "gate",
      "question_id": "gate_v2_locus_of_trust",
      "answer_id": "gate_v2_trust_self_claim",
      "title": "The claim no one can make for me"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_pressure_becomes",
      "answer_id": "gate_v2_pressure_form",
      "title": "A form that can hold"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_first_signal",
      "answer_id": "gate_v2_signal_whole_chord",
      "title": "The whole chord"
    },
    {
      "stage": "gate",
      "question_id": "gate_v2_cost_of_oath",
      "answer_id": "gate_v2_oath_preserve",
      "title": "Preserve what must not break"
    },
    {
      "stage": "hall",
      "question_id": "hall_YORE_engineered_agency",
      "answer_id": "MISSING:hall_YORE_engineered_agency#answer-1",
      "title": "Build the agency machine"
    },
    {
      "stage": "hall",
      "question_id": "hall_YORE_artifice_boundary",
      "answer_id": "MISSING:hall_YORE_artifice_boundary#answer-1",
      "title": "The machine refuses surrender"
    }
  ],
  "branch_path_reached": [
    "gate:gate_v2_locus_of_trust",
    "gate:gate_v2_pressure_becomes",
    "gate:gate_v2_first_signal",
    "gate:gate_v2_cost_of_oath",
    "hall:hall_YORE_engineered_agency",
    "hall:hall_YORE_artifice_boundary"
  ],
  "final_primary": "YORE",
  "rank_two": "SILVERQUILL",
  "rank_three": "WB",
  "softmax_share_displayed_as_confidence": "0.791",
  "direct_positive_evidence_present": "true",
  "minimum_hit_metadata_satisfied_by_strong_authored_hit_proxy": "true",
  "strong_authored_hit_count": "4",
  "false_positive_guardrail_metadata_satisfied": "UNRESOLVED: guardrail is free text and has no executable predicate",
  "explanation_result": "Yore / Artifice recognizes the shape of your game as The Engineered Agency Architect. Your answers repeatedly expressed preserving duty and engineered agency against finality. Silverquill College stayed near the reading, but Yore / Artifice was the stronger match. This is a Vox Mana interpretive placement for a commander start, not an objective diagnosis or official canon.",
  "adjacent_result": [
    {
      "identity": "SILVERQUILL",
      "share": 0.019,
      "reason": "Silverquill College stayed close through ordered containment, balanced chord, preserving duty."
    },
    {
      "identity": "WB",
      "share": 0.019,
      "reason": "Orzhov Syndicate stayed close through ordered containment, balanced chord, preserving duty."
    }
  ],
  "commander_recommendation_result": [
    "Breya, Etherium Shaper",
    "Invent Superiority (Precon)"
  ],
  "acceptable_result_set": [
    "YORE"
  ],
  "unacceptable_false_positives": [
    "ABZAN",
    "BANT",
    "BG",
    "BR",
    "COLORLESS"
  ],
  "scoring_outcome": "EXACT-PRIMARY",
  "final_disposition": "INCOMPLETE",
  "scenario_limit": "Golden-path-derived target-seeking probe. It demonstrates target reachability under the runtime helper only; it is not an independently derived profile, a neighboring challenge, semantic placement accuracy, or empirical player validation."
}
```

### All nine adversarial records

### gameplay preference conflicts with philosophy — PARTIALLY-REPRESENTABLE-BUT-CONFLATED

```json
{
  "scenario": "gameplay preference conflicts with philosophy",
  "available_answer_coverage": "AVAILABLE-ANSWERS-EXPRESS-ONLY-PART",
  "disposition_rationale": "Available answers express gameplay-like and philosophical fragments, but the instrument scores them as interchangeable identity evidence and cannot preserve the conflict as two dimensions.",
  "exact_available_answers_selected": [
    {
      "question_id": "gate_v2_locus_of_trust",
      "answer_id": "gate_v2_trust_self_claim",
      "title": "The claim no one can make for me"
    },
    {
      "question_id": "gate_v2_pressure_becomes",
      "answer_id": "gate_v2_pressure_answerable_motion",
      "title": "Answerable motion"
    },
    {
      "question_id": "gate_v2_first_signal",
      "answer_id": "gate_v2_signal_cold_pattern",
      "title": "The cold pattern"
    },
    {
      "question_id": "gate_v2_cost_of_oath",
      "answer_id": "gate_v2_oath_preserve",
      "title": "Preserve what must not break"
    },
    {
      "question_id": "hall_B_cost",
      "answer_id": "MISSING:hall_B_cost#answer-4",
      "title": "Spend the restraint"
    },
    {
      "question_id": "hall_BR_intensity",
      "answer_id": "MISSING:hall_BR_intensity#answer-2",
      "title": "Break the cage itself"
    },
    {
      "question_id": "crucible_WB_SILVERQUILL",
      "answer_id": "MISSING:crucible_WB_SILVERQUILL#answer-1",
      "title": "Binding obligation"
    }
  ],
  "branch_path_reached": [
    "gate:gate_v2_locus_of_trust",
    "gate:gate_v2_pressure_becomes",
    "gate:gate_v2_first_signal",
    "gate:gate_v2_cost_of_oath",
    "hall:hall_B_cost",
    "hall:hall_BR_intensity",
    "crucible:crucible_WB_SILVERQUILL"
  ],
  "final_primary": "WB",
  "rank_two": "YORE",
  "rank_three": "B",
  "softmax_share_displayed_as_confidence": "0.398",
  "direct_positive_evidence_present": "true",
  "minimum_hit_and_guardrail_metadata_satisfied": "UNRESOLVED: no executable guardrail; scenario deliberately contains conflicting or bounded evidence",
  "explanation_result": "Orzhov Syndicate recognizes the shape of your game as The Obligation Architect. Your answers repeatedly expressed calculated implication and preserving duty. Yore / Artifice stayed near the reading, but Orzhov Syndicate was the stronger match. This is a Vox Mana interpretive placement for a commander start, not an objective diagnosis or official canon.",
  "adjacent_result": [
    "YORE:0.076",
    "B:0.071"
  ],
  "commander_recommendation_result": "Identity-level recommendations would be shown despite the unresolved construct conflict",
  "acceptable_result_set": "mixed-or-unknown",
  "unacceptable_false_positives": "Any fixed identity presented as strong, diagnostic, or evidence-backed",
  "final_disposition": "PARTIALLY-REPRESENTABLE-BUT-CONFLATED"
}
```

### theme preference without low-power preference — REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE

```json
{
  "scenario": "theme preference without low-power preference",
  "available_answer_coverage": "AVAILABLE-ANSWERS-FORCE-UNSUPPORTED-INFERENCE",
  "disposition_rationale": "Aesthetic/theme answers exist, but the output converts them into identity and Commander implications without a separate power-preference observation.",
  "exact_available_answers_selected": [
    {
      "question_id": "gate_v2_locus_of_trust",
      "answer_id": "gate_v2_trust_self_claim",
      "title": "The claim no one can make for me"
    },
    {
      "question_id": "gate_v2_pressure_becomes",
      "answer_id": "gate_v2_pressure_form",
      "title": "A form that can hold"
    },
    {
      "question_id": "gate_v2_first_signal",
      "answer_id": "gate_v2_signal_cold_pattern",
      "title": "The cold pattern"
    },
    {
      "question_id": "gate_v2_cost_of_oath",
      "answer_id": "gate_v2_oath_preserve",
      "title": "Preserve what must not break"
    },
    {
      "question_id": "hall_ESPER_perfectibility",
      "answer_id": "MISSING:hall_ESPER_perfectibility#answer-2",
      "title": "Follow the procedure"
    },
    {
      "question_id": "hall_B_cost",
      "answer_id": "MISSING:hall_B_cost#answer-1",
      "title": "Pay the cost"
    }
  ],
  "branch_path_reached": [
    "gate:gate_v2_locus_of_trust",
    "gate:gate_v2_pressure_becomes",
    "gate:gate_v2_first_signal",
    "gate:gate_v2_cost_of_oath",
    "hall:hall_ESPER_perfectibility",
    "hall:hall_B_cost"
  ],
  "final_primary": "B",
  "rank_two": "YORE",
  "rank_three": "MARDU",
  "softmax_share_displayed_as_confidence": "0.371",
  "direct_positive_evidence_present": "true",
  "minimum_hit_and_guardrail_metadata_satisfied": "UNRESOLVED: no executable guardrail; scenario deliberately contains conflicting or bounded evidence",
  "explanation_result": "Black recognizes the shape of your game as The Self-Sovereign Operator. Your answers repeatedly expressed calculated implication and preserving duty. Yore / Artifice stayed near the reading, but Black was the stronger match. This is a Vox Mana interpretive placement for a commander start, not an objective diagnosis or official canon.",
  "adjacent_result": [
    "YORE:0.073",
    "MARDU:0.058"
  ],
  "commander_recommendation_result": "Identity-level recommendations would be shown despite the unresolved construct conflict",
  "acceptable_result_set": "theme-only-no-power-inference",
  "unacceptable_false_positives": "Any fixed identity presented as strong, diagnostic, or evidence-backed",
  "final_disposition": "REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE"
}
```

### tutor use without a competitive assumption — QUESTIONNAIRE-CANNOT-REPRESENT

```json
{
  "scenario": "tutor use without a competitive assumption",
  "available_answer_coverage": "LITERALLY-NO-AVAILABLE-ANSWER",
  "disposition_rationale": "No current prompt or answer records tutor use, frequency, intent, or competitive assumption.",
  "exact_available_answers_selected": [],
  "branch_path_reached": [],
  "final_primary": "NOT-RUN",
  "rank_two": "",
  "rank_three": "",
  "softmax_share_displayed_as_confidence": "",
  "direct_positive_evidence_present": "false",
  "minimum_hit_and_guardrail_metadata_satisfied": "NOT-APPLICABLE",
  "explanation_result": "No exact current answer state represents the requested distinction without adding directional evidence.",
  "adjacent_result": "NOT-AVAILABLE",
  "commander_recommendation_result": "NOT-AVAILABLE",
  "acceptable_result_set": "no-stable-identity",
  "unacceptable_false_positives": "Any fixed identity, confidence percentage, or commander recommendation",
  "final_disposition": "QUESTIONNAIRE-CANNOT-REPRESENT"
}
```

### combo interest without psychographic inference — QUESTIONNAIRE-CANNOT-REPRESENT

```json
{
  "scenario": "combo interest without psychographic inference",
  "available_answer_coverage": "LITERALLY-NO-AVAILABLE-ANSWER",
  "disposition_rationale": "No current prompt or answer records combo interest while separating deck behavior from psychographic motivation.",
  "exact_available_answers_selected": [],
  "branch_path_reached": [],
  "final_primary": "NOT-RUN",
  "rank_two": "",
  "rank_three": "",
  "softmax_share_displayed_as_confidence": "",
  "direct_positive_evidence_present": "false",
  "minimum_hit_and_guardrail_metadata_satisfied": "NOT-APPLICABLE",
  "explanation_result": "No exact current answer state represents the requested distinction without adding directional evidence.",
  "adjacent_result": "NOT-AVAILABLE",
  "commander_recommendation_result": "NOT-AVAILABLE",
  "acceptable_result_set": "no-stable-identity",
  "unacceptable_false_positives": "Any fixed identity, confidence percentage, or commander recommendation",
  "final_disposition": "QUESTIONNAIRE-CANNOT-REPRESENT"
}
```

### color preference without faction preference — QUESTIONNAIRE-CANNOT-REPRESENT

```json
{
  "scenario": "color preference without faction preference",
  "available_answer_coverage": "LITERALLY-NO-AVAILABLE-ANSWER",
  "disposition_rationale": "No current answer records a bare color preference with an explicit prohibition on faction or behavioral inference.",
  "exact_available_answers_selected": [],
  "branch_path_reached": [],
  "final_primary": "NOT-RUN",
  "rank_two": "",
  "rank_three": "",
  "softmax_share_displayed_as_confidence": "",
  "direct_positive_evidence_present": "false",
  "minimum_hit_and_guardrail_metadata_satisfied": "NOT-APPLICABLE",
  "explanation_result": "No exact current answer state represents the requested distinction without adding directional evidence.",
  "adjacent_result": "NOT-AVAILABLE",
  "commander_recommendation_result": "NOT-AVAILABLE",
  "acceptable_result_set": "no-faction-inference",
  "unacceptable_false_positives": "Any fixed identity, confidence percentage, or commander recommendation",
  "final_disposition": "QUESTIONNAIRE-CANNOT-REPRESENT"
}
```

### social discomfort without stable identity inference — REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE

```json
{
  "scenario": "social discomfort without stable identity inference",
  "available_answer_coverage": "AVAILABLE-ANSWERS-FORCE-UNSUPPORTED-INFERENCE",
  "disposition_rationale": "Pressure/protection answers can express the immediate discomfort, but the runtime converts the situational response into stable identity evidence.",
  "exact_available_answers_selected": [
    {
      "question_id": "gate_v2_locus_of_trust",
      "answer_id": "gate_v2_trust_self_claim",
      "title": "The claim no one can make for me"
    },
    {
      "question_id": "gate_v2_pressure_becomes",
      "answer_id": "gate_v2_pressure_form",
      "title": "A form that can hold"
    },
    {
      "question_id": "gate_v2_first_signal",
      "answer_id": "gate_v2_signal_cold_pattern",
      "title": "The cold pattern"
    },
    {
      "question_id": "gate_v2_cost_of_oath",
      "answer_id": "gate_v2_oath_preserve",
      "title": "Preserve what must not break"
    },
    {
      "question_id": "hall_ESPER_perfectibility",
      "answer_id": "MISSING:hall_ESPER_perfectibility#answer-4",
      "title": "Protect the living whole"
    },
    {
      "question_id": "hall_UB_information",
      "answer_id": "MISSING:hall_UB_information#answer-1",
      "title": "Hold it until timing matters"
    }
  ],
  "branch_path_reached": [
    "gate:gate_v2_locus_of_trust",
    "gate:gate_v2_pressure_becomes",
    "gate:gate_v2_first_signal",
    "gate:gate_v2_cost_of_oath",
    "hall:hall_ESPER_perfectibility",
    "hall:hall_UB_information"
  ],
  "final_primary": "UB",
  "rank_two": "B",
  "rank_three": "YORE",
  "softmax_share_displayed_as_confidence": "0.429",
  "direct_positive_evidence_present": "true",
  "minimum_hit_and_guardrail_metadata_satisfied": "UNRESOLVED: no executable guardrail; scenario deliberately contains conflicting or bounded evidence",
  "explanation_result": "House Dimir recognizes the shape of your game as The Hidden Information Operator. Your answers repeatedly expressed ordered containment and calculated implication. Black stayed near the reading, but House Dimir was the stronger match. This is a Vox Mana interpretive placement for a commander start, not an objective diagnosis or official canon.",
  "adjacent_result": [
    "B:0.091",
    "YORE:0.076"
  ],
  "commander_recommendation_result": "Identity-level recommendations would be shown despite the unresolved construct conflict",
  "acceptable_result_set": "context-limited-unknown",
  "unacceptable_false_positives": "Any fixed identity presented as strong, diagnostic, or evidence-backed",
  "final_disposition": "REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE"
}
```

### new-player uncertainty — QUESTIONNAIRE-CANNOT-REPRESENT

```json
{
  "scenario": "new-player uncertainty",
  "available_answer_coverage": "LITERALLY-NO-AVAILABLE-ANSWER",
  "disposition_rationale": "Every current question forces a directional answer; no answer records lack of experience or uncertainty.",
  "exact_available_answers_selected": [],
  "branch_path_reached": [],
  "final_primary": "NOT-RUN",
  "rank_two": "",
  "rank_three": "",
  "softmax_share_displayed_as_confidence": "",
  "direct_positive_evidence_present": "false",
  "minimum_hit_and_guardrail_metadata_satisfied": "NOT-APPLICABLE",
  "explanation_result": "No exact current answer state represents the requested distinction without adding directional evidence.",
  "adjacent_result": "NOT-AVAILABLE",
  "commander_recommendation_result": "NOT-AVAILABLE",
  "acceptable_result_set": "unknown",
  "unacceptable_false_positives": "Any fixed identity, confidence percentage, or commander recommendation",
  "final_disposition": "QUESTIONNAIRE-CANNOT-REPRESENT"
}
```

### I do not know or no directional answer — QUESTIONNAIRE-CANNOT-REPRESENT

```json
{
  "scenario": "I do not know or no directional answer",
  "available_answer_coverage": "LITERALLY-NO-AVAILABLE-ANSWER",
  "disposition_rationale": "No current question offers an unsure, neutral, none, mixed, skip, or no-direction answer.",
  "exact_available_answers_selected": [],
  "branch_path_reached": [],
  "final_primary": "NOT-RUN",
  "rank_two": "",
  "rank_three": "",
  "softmax_share_displayed_as_confidence": "",
  "direct_positive_evidence_present": "false",
  "minimum_hit_and_guardrail_metadata_satisfied": "NOT-APPLICABLE",
  "explanation_result": "No exact current answer state represents the requested distinction without adding directional evidence.",
  "adjacent_result": "NOT-AVAILABLE",
  "commander_recommendation_result": "NOT-AVAILABLE",
  "acceptable_result_set": "unknown",
  "unacceptable_false_positives": "Any fixed identity, confidence percentage, or commander recommendation",
  "final_disposition": "QUESTIONNAIRE-CANNOT-REPRESENT"
}
```

### deck behavior differs from personal preference — PARTIALLY-REPRESENTABLE-BUT-CONFLATED

```json
{
  "scenario": "deck behavior differs from personal preference",
  "available_answer_coverage": "AVAILABLE-ANSWERS-EXPRESS-ONLY-PART",
  "disposition_rationale": "Some answers express deck behavior and others personal/philosophical preference, but the questionnaire does not preserve those layers as distinct observations.",
  "exact_available_answers_selected": [
    {
      "question_id": "gate_v2_locus_of_trust",
      "answer_id": "gate_v2_trust_self_claim",
      "title": "The claim no one can make for me"
    },
    {
      "question_id": "gate_v2_pressure_becomes",
      "answer_id": "gate_v2_pressure_form",
      "title": "A form that can hold"
    },
    {
      "question_id": "gate_v2_first_signal",
      "answer_id": "gate_v2_signal_measured_trace",
      "title": "The measured trace"
    },
    {
      "question_id": "gate_v2_cost_of_oath",
      "answer_id": "gate_v2_oath_preserve",
      "title": "Preserve what must not break"
    },
    {
      "question_id": "hall_YORE_engineered_agency",
      "answer_id": "MISSING:hall_YORE_engineered_agency#answer-1",
      "title": "Build the agency machine"
    },
    {
      "question_id": "hall_YORE_artifice_boundary",
      "answer_id": "MISSING:hall_YORE_artifice_boundary#answer-2",
      "title": "The deck just likes artifacts"
    }
  ],
  "branch_path_reached": [
    "gate:gate_v2_locus_of_trust",
    "gate:gate_v2_pressure_becomes",
    "gate:gate_v2_first_signal",
    "gate:gate_v2_cost_of_oath",
    "hall:hall_YORE_engineered_agency",
    "hall:hall_YORE_artifice_boundary"
  ],
  "final_primary": "YORE",
  "rank_two": "UB",
  "rank_three": "SILVERQUILL",
  "softmax_share_displayed_as_confidence": "0.362",
  "direct_positive_evidence_present": "true",
  "minimum_hit_and_guardrail_metadata_satisfied": "UNRESOLVED: no executable guardrail; scenario deliberately contains conflicting or bounded evidence",
  "explanation_result": "Yore / Artifice recognizes the shape of your game as The Engineered Agency Architect. Your answers repeatedly expressed measured inference and preserving duty. House Dimir stayed near the reading, but Yore / Artifice was the stronger match. This is a Vox Mana interpretive placement for a commander start, not an objective diagnosis or official canon.",
  "adjacent_result": [
    "UB:0.078",
    "SILVERQUILL:0.07"
  ],
  "commander_recommendation_result": "Identity-level recommendations would be shown despite the unresolved construct conflict",
  "acceptable_result_set": "mixed-layer-result",
  "unacceptable_false_positives": "Any fixed identity presented as strong, diagnostic, or evidence-backed",
  "final_disposition": "PARTIALLY-REPRESENTABLE-BUT-CONFLATED"
}
```

## Sensitivity and dependency

Matched comparison definition: An unordered pair of valid terminal paths with the identical complete question-ID set and identical selected answers for every question except one; the remaining shared question has different selected answer indices.

Denominator construction: All such unordered pairs across the 26,891 enumerated valid terminal paths; each qualifying pair contributes once to 44,005.

Same later questions: true. Branching changes included: false. A branch change changes the complete question-ID set, so that pair cannot enter the matched denominator.

Observed denominator: 44005; primary flips: 14424; different-family flips: 12360.

### Five representative primary flips

### Flip 1: B → WB

```json
{
  "question_id": "crucible_B_WB",
  "left_answer_id": "crucible_B_WB#answer-1",
  "left_answer_title": "Own the leverage",
  "left_primary": "B",
  "left_rank_two": "ESPER",
  "right_answer_id": "crucible_B_WB#answer-2",
  "right_answer_title": "Bind the obligation",
  "right_primary": "WB",
  "right_rank_two": "YORE",
  "same_question_set": true,
  "same_other_answers": true,
  "branching_change_included": false
}
```

### Flip 2: B → UB

```json
{
  "question_id": "crucible_B_UB",
  "left_answer_id": "crucible_B_UB#answer-1",
  "left_answer_title": "Pay directly",
  "left_primary": "B",
  "left_rank_two": "ESPER",
  "right_answer_id": "crucible_B_UB#answer-2",
  "right_answer_title": "Wait in secret",
  "right_primary": "UB",
  "right_rank_two": "YORE",
  "same_question_set": true,
  "same_other_answers": true,
  "branching_change_included": false
}
```

### Flip 3: SILVERQUILL → B

```json
{
  "question_id": "hall_SILVERQUILL_words",
  "left_answer_id": "hall_SILVERQUILL_words#answer-1",
  "left_answer_title": "Say the line that changes the room",
  "left_primary": "SILVERQUILL",
  "left_rank_two": "ESPER",
  "right_answer_id": "hall_SILVERQUILL_words#answer-3",
  "right_answer_title": "Codify the standard",
  "right_primary": "B",
  "right_rank_two": "YORE",
  "same_question_set": true,
  "same_other_answers": true,
  "branching_change_included": false
}
```

### Flip 4: SILVERQUILL → ESPER

```json
{
  "question_id": "hall_SILVERQUILL_words",
  "left_answer_id": "hall_SILVERQUILL_words#answer-1",
  "left_answer_title": "Say the line that changes the room",
  "left_primary": "SILVERQUILL",
  "left_rank_two": "ESPER",
  "right_answer_id": "hall_SILVERQUILL_words#answer-4",
  "right_answer_title": "Make the feeling visible",
  "right_primary": "ESPER",
  "right_rank_two": "B",
  "same_question_set": true,
  "same_other_answers": true,
  "branching_change_included": false
}
```

### Flip 5: B → ESPER

```json
{
  "question_id": "hall_SILVERQUILL_words",
  "left_answer_id": "hall_SILVERQUILL_words#answer-3",
  "left_answer_title": "Codify the standard",
  "left_primary": "B",
  "left_rank_two": "YORE",
  "right_answer_id": "hall_SILVERQUILL_words#answer-4",
  "right_answer_title": "Make the feeling visible",
  "right_primary": "ESPER",
  "right_rank_two": "B",
  "same_question_set": true,
  "same_other_answers": true,
  "branching_change_included": false
}
```

### Complete different-family flip categories

| Family transition | Count |
|---|---:|
| college:BG <-> college:GU | 22 |
| college:BG <-> color | 59 |
| college:BG <-> four_color | 21 |
| college:BG <-> guild:BG | 311 |
| college:BG <-> guild:BR | 8 |
| college:BG <-> guild:BU | 16 |
| college:BG <-> guild:BW | 8 |
| college:BG <-> guild:GR | 2 |
| college:BG <-> shard | 5 |
| college:BG <-> wedge | 3 |
| college:BW <-> color | 62 |
| college:BW <-> five_color | 9 |
| college:BW <-> four_color | 19 |
| college:BW <-> guild:BR | 9 |
| college:BW <-> guild:BU | 11 |
| college:BW <-> guild:BW | 115 |
| college:BW <-> guild:GW | 18 |
| college:BW <-> guild:RW | 6 |
| college:BW <-> guild:UW | 5 |
| college:BW <-> shard | 18 |
| college:BW <-> wedge | 29 |
| college:GU <-> college:RU | 30 |
| college:GU <-> college:RW | 2 |
| college:GU <-> color | 56 |
| college:GU <-> five_color | 10 |
| college:GU <-> four_color | 48 |
| college:GU <-> guild:BU | 35 |
| college:GU <-> guild:GR | 3 |
| college:GU <-> guild:GU | 174 |
| college:GU <-> guild:GW | 6 |
| college:GU <-> guild:RU | 5 |
| college:GU <-> guild:RW | 2 |
| college:GU <-> guild:UW | 10 |
| college:GU <-> shard | 19 |
| college:GU <-> wedge | 56 |
| college:RU <-> college:RW | 7 |
| college:RU <-> color | 31 |
| college:RU <-> five_color | 2 |
| college:RU <-> four_color | 47 |
| college:RU <-> guild:BG | 1 |
| college:RU <-> guild:BR | 10 |
| college:RU <-> guild:BU | 1 |
| college:RU <-> guild:GR | 5 |
| college:RU <-> guild:RU | 218 |
| college:RU <-> guild:RW | 7 |
| college:RU <-> guild:UW | 8 |
| college:RU <-> shard | 22 |
| college:RU <-> wedge | 64 |
| college:RW <-> color | 45 |
| college:RW <-> five_color | 3 |
| college:RW <-> four_color | 16 |
| college:RW <-> guild:GR | 5 |
| college:RW <-> guild:GU | 4 |
| college:RW <-> guild:GW | 11 |
| college:RW <-> guild:RU | 7 |
| college:RW <-> guild:RW | 196 |
| college:RW <-> guild:UW | 17 |
| college:RW <-> shard | 30 |
| college:RW <-> wedge | 70 |
| color <-> five_color | 207 |
| color <-> four_color | 186 |
| color <-> guild:BG | 387 |
| color <-> guild:BR | 973 |
| color <-> guild:BU | 1073 |
| color <-> guild:BW | 275 |
| color <-> guild:GR | 635 |
| color <-> guild:GU | 371 |
| color <-> guild:GW | 454 |
| color <-> guild:RU | 726 |
| color <-> guild:RW | 636 |
| color <-> guild:UW | 760 |
| color <-> shard | 287 |
| color <-> wedge | 277 |
| colorless <-> five_color | 72 |
| five_color <-> four_color | 25 |
| five_color <-> guild:BG | 3 |
| five_color <-> guild:BR | 4 |
| five_color <-> guild:BU | 25 |
| five_color <-> guild:BW | 3 |
| five_color <-> guild:GR | 12 |
| five_color <-> guild:GU | 30 |
| five_color <-> guild:GW | 46 |
| five_color <-> guild:RU | 21 |
| five_color <-> guild:RW | 18 |
| five_color <-> guild:UW | 4 |
| five_color <-> shard | 77 |
| five_color <-> wedge | 133 |
| four_color <-> guild:BG | 23 |
| four_color <-> guild:BR | 73 |
| four_color <-> guild:BU | 59 |
| four_color <-> guild:BW | 29 |
| four_color <-> guild:GR | 16 |
| four_color <-> guild:GU | 19 |
| four_color <-> guild:GW | 55 |
| four_color <-> guild:RU | 19 |
| four_color <-> guild:RW | 27 |
| four_color <-> guild:UW | 86 |
| four_color <-> shard | 418 |
| four_color <-> wedge | 220 |
| guild:BG <-> guild:BR | 3 |
| guild:BG <-> guild:BW | 1 |
| guild:BG <-> guild:GR | 3 |
| guild:BG <-> guild:GW | 3 |
| guild:BG <-> shard | 17 |
| guild:BG <-> wedge | 7 |
| guild:BR <-> guild:BU | 23 |
| guild:BR <-> guild:BW | 11 |
| guild:BR <-> guild:GR | 9 |
| guild:BR <-> guild:RU | 2 |
| guild:BR <-> guild:RW | 11 |
| guild:BR <-> guild:UW | 2 |
| guild:BR <-> shard | 93 |
| guild:BR <-> wedge | 40 |
| guild:BU <-> guild:BW | 79 |
| guild:BU <-> guild:RU | 1 |
| guild:BU <-> guild:UW | 14 |
| guild:BU <-> shard | 60 |
| guild:BU <-> wedge | 78 |
| guild:BW <-> guild:GW | 4 |
| guild:BW <-> guild:RW | 4 |
| guild:BW <-> guild:UW | 8 |
| guild:BW <-> shard | 37 |
| guild:BW <-> wedge | 29 |
| guild:GR <-> guild:GU | 4 |
| guild:GR <-> guild:GW | 26 |
| guild:GR <-> guild:RU | 6 |
| guild:GR <-> guild:RW | 20 |
| guild:GR <-> guild:UW | 12 |
| guild:GR <-> shard | 26 |
| guild:GR <-> wedge | 14 |
| guild:GU <-> guild:GW | 3 |
| guild:GU <-> guild:RU | 5 |
| guild:GU <-> guild:RW | 1 |
| guild:GU <-> guild:UW | 2 |
| guild:GU <-> shard | 21 |
| guild:GU <-> wedge | 20 |
| guild:GW <-> guild:RU | 2 |
| guild:GW <-> guild:RW | 17 |
| guild:GW <-> guild:UW | 38 |
| guild:GW <-> shard | 139 |
| guild:GW <-> wedge | 49 |
| guild:RU <-> guild:RW | 2 |
| guild:RU <-> guild:UW | 1 |
| guild:RU <-> shard | 36 |
| guild:RU <-> wedge | 20 |
| guild:RW <-> guild:UW | 34 |
| guild:RW <-> shard | 27 |
| guild:RW <-> wedge | 40 |
| guild:UW <-> shard | 74 |
| guild:UW <-> wedge | 133 |
| shard <-> wedge | 246 |

### Dead questions and answers

```json
{
  "dead_questions": [
    "crucible_PRISMARI_SILVERQUILL",
    "crucible_LOREHOLD_QUANDRIX",
    "crucible_TEMUR_MARDU"
  ],
  "dead_answers": [
    "crucible_PRISMARI_SILVERQUILL#answer-1",
    "crucible_PRISMARI_SILVERQUILL#answer-2",
    "crucible_LOREHOLD_QUANDRIX#answer-1",
    "crucible_LOREHOLD_QUANDRIX#answer-2",
    "crucible_TEMUR_MARDU#answer-1",
    "crucible_TEMUR_MARDU#answer-2"
  ]
}
```

### All eleven repeated-construct groups

### expression-and-performance

```json
{
  "construct_name": "expression-and-performance",
  "questions_and_answers": [
    "gate_v2_locus_of_trust:gate_v2_trust_self_claim",
    "hall_B_cost:hall_B_cost#answer-1",
    "hall_R_freedom:hall_R_freedom#answer-4",
    "hall_G_growth:hall_G_growth#answer-2",
    "hall_BR_intensity:hall_BR_intensity#answer-1",
    "hall_BR_intensity:hall_BR_intensity#answer-3",
    "hall_WG_belonging:hall_WG_belonging#answer-4",
    "hall_WB_obligation:hall_WB_obligation#answer-2",
    "hall_UR_experiment:hall_UR_experiment#answer-2",
    "hall_JUND_appetite_consequence:hall_JUND_appetite_consequence#answer-3",
    "hall_TEMUR_survival_attunement:hall_TEMUR_survival_attunement#answer-1",
    "hall_SULTAI_resource_conversion:hall_SULTAI_resource_conversion#answer-4",
    "hall_YORE_engineered_agency:hall_YORE_engineered_agency#answer-2",
    "hall_YORE_engineered_agency:hall_YORE_engineered_agency#answer-3",
    "hall_YORE_artifice_boundary:hall_YORE_artifice_boundary#answer-1",
    "hall_YORE_artifice_boundary:hall_YORE_artifice_boundary#answer-2",
    "hall_YORE_artifice_boundary:hall_YORE_artifice_boundary#answer-3",
    "hall_YORE_artifice_boundary:hall_YORE_artifice_boundary#answer-4",
    "hall_GLINT_living_force:hall_GLINT_living_force#answer-2",
    "hall_DUNE_missing_blue:hall_DUNE_missing_blue#answer-1",
    "hall_LOREHOLD_history:hall_LOREHOLD_history#answer-1",
    "hall_PRISMARI_expression:hall_PRISMARI_expression#answer-1",
    "hall_PRISMARI_expression:hall_PRISMARI_expression#answer-3",
    "hall_PRISMARI_expression:hall_PRISMARI_expression#answer-4",
    "hall_SILVERQUILL_words:hall_SILVERQUILL_words#answer-4",
    "hall_COLORLESS_branch_boundary:hall_COLORLESS_branch_boundary#answer-1",
    "hall_COLORLESS_branch_boundary:hall_COLORLESS_branch_boundary#answer-2",
    "crucible_R_BR:crucible_R_BR#answer-2",
    "crucible_R_RG:crucible_R_RG#answer-1",
    "crucible_G_BG:crucible_G_BG#answer-2",
    "crucible_UR_PRISMARI:crucible_UR_PRISMARI#answer-2",
    "crucible_PRISMARI_QUANDRIX:crucible_PRISMARI_QUANDRIX#answer-1",
    "crucible_PRISMARI_SILVERQUILL:crucible_PRISMARI_SILVERQUILL#answer-1",
    "crucible_LOREHOLD_QUANDRIX:crucible_LOREHOLD_QUANDRIX#answer-1",
    "crucible_BR_RG:crucible_BR_RG#answer-1"
  ],
  "stages": [
    "gate",
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "B",
    "R",
    "WR",
    "BR",
    "ESPER",
    "GRIXIS",
    "JUND",
    "TEMUR",
    "SULTAI",
    "MARDU",
    "JESKAI",
    "YORE",
    "GLINT",
    "DUNE",
    "BG",
    "RG",
    "UB",
    "UR",
    "LOREHOLD",
    "WB",
    "PRISMARI",
    "SILVERQUILL",
    "WITHERBLOOM",
    "WG",
    "WU",
    "G",
    "UG",
    "COLORLESS"
  ],
  "positive_effect_count": "89",
  "suppressions": [
    "W",
    "G",
    "WU",
    "BANT",
    "NAYA",
    "INK",
    "COLORLESS",
    "WUBRG",
    "QUANDRIX",
    "WG",
    "UG",
    "U",
    "R",
    "BR",
    "WB",
    "UR",
    "JUND",
    "GRIXIS",
    "ABZAN",
    "SULTAI",
    "YORE",
    "ESPER",
    "JESKAI",
    "MARDU",
    "GLINT",
    "WR",
    "PRISMARI",
    "SILVERQUILL",
    "B",
    "WITCH",
    "RG"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "3",
  "gate_evidence_counted_again_in_hall_or_crucible": "YES-POTENTIAL",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### protection-and-duty

```json
{
  "construct_name": "protection-and-duty",
  "questions_and_answers": [
    "gate_v2_locus_of_trust:gate_v2_trust_braided_witness",
    "gate_v2_first_signal:gate_v2_signal_whole_chord",
    "gate_v2_cost_of_oath:gate_v2_oath_preserve",
    "hall_W_shelter:hall_W_shelter#answer-3",
    "hall_W_shelter:hall_W_shelter#answer-4",
    "hall_W_duty:hall_W_duty#answer-1",
    "hall_W_duty:hall_W_duty#answer-4",
    "hall_R_ignition:hall_R_ignition#answer-2",
    "hall_R_freedom:hall_R_freedom#answer-2",
    "hall_WU_process:hall_WU_process#answer-3",
    "hall_UB_information:hall_UB_information#answer-1",
    "hall_BANT_champion:hall_BANT_champion#answer-1",
    "hall_JUND_instinct_pressure:hall_JUND_instinct_pressure#answer-3",
    "hall_JUND_appetite_consequence:hall_JUND_appetite_consequence#answer-2",
    "hall_NAYA_living_whole:hall_NAYA_living_whole#answer-1",
    "hall_NAYA_abundance_instinct:hall_NAYA_abundance_instinct#answer-1",
    "hall_ABZAN_family_endurance:hall_ABZAN_family_endurance#answer-1",
    "hall_ABZAN_family_endurance:hall_ABZAN_family_endurance#answer-2",
    "hall_ABZAN_ancestor_perennation:hall_ABZAN_ancestor_perennation#answer-1",
    "hall_ABZAN_ancestor_perennation:hall_ABZAN_ancestor_perennation#answer-3",
    "hall_ABZAN_ancestor_perennation:hall_ABZAN_ancestor_perennation#answer-4",
    "hall_TEMUR_survival_attunement:hall_TEMUR_survival_attunement#answer-4",
    "hall_TEMUR_elemental_memory:hall_TEMUR_elemental_memory#answer-2",
    "hall_TEMUR_elemental_memory:hall_TEMUR_elemental_memory#answer-4",
    "hall_SULTAI_resource_conversion:hall_SULTAI_resource_conversion#answer-2",
    "hall_SULTAI_dead_usefulness:hall_SULTAI_dead_usefulness#answer-2",
    "hall_MARDU_total_commitment:hall_MARDU_total_commitment#answer-2",
    "hall_MARDU_war_name_oath:hall_MARDU_war_name_oath#answer-3",
    "hall_JESKAI_way_form:hall_JESKAI_way_form#answer-2",
    "hall_DUNE_territorial_force:hall_DUNE_territorial_force#answer-3",
    "hall_INK_protected_abundance:hall_INK_protected_abundance#answer-1",
    "hall_INK_protected_abundance:hall_INK_protected_abundance#answer-2",
    "hall_INK_missing_black:hall_INK_missing_black#answer-3",
    "hall_WITCH_missing_red:hall_WITCH_missing_red#answer-1",
    "hall_WR_protection:hall_WR_protection#answer-1",
    "hall_WR_protection:hall_WR_protection#answer-4",
    "hall_LOREHOLD_history:hall_LOREHOLD_history#answer-2",
    "crucible_W_WR:crucible_W_WR#answer-1",
    "crucible_W_WG:crucible_W_WG#answer-2",
    "crucible_B_WB:crucible_B_WB#answer-1",
    "crucible_R_WR:crucible_R_WR#answer-2",
    "crucible_WU_WR:crucible_WU_WR#answer-2",
    "crucible_WR_LOREHOLD:crucible_WR_LOREHOLD#answer-1",
    "crucible_ABZAN_SULTAI:crucible_ABZAN_SULTAI#answer-1",
    "crucible_JESKAI_SULTAI:crucible_JESKAI_SULTAI#answer-1",
    "crucible_DUNE_INK:crucible_DUNE_INK#answer-2",
    "crucible_INK_WITCH:crucible_INK_WITCH#answer-1",
    "crucible_WITCH_YORE:crucible_WITCH_YORE#answer-2"
  ],
  "stages": [
    "gate",
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "W",
    "U",
    "B",
    "R",
    "G",
    "WU",
    "BANT",
    "WR",
    "BR",
    "ESPER",
    "GRIXIS",
    "JUND",
    "NAYA",
    "ABZAN",
    "TEMUR",
    "SULTAI",
    "MARDU",
    "JESKAI",
    "YORE",
    "GLINT",
    "DUNE",
    "INK",
    "WITCH",
    "WUBRG",
    "BG",
    "RG",
    "UB",
    "UR",
    "LOREHOLD",
    "WB",
    "PRISMARI",
    "QUANDRIX",
    "WG",
    "SILVERQUILL",
    "UG",
    "WITHERBLOOM"
  ],
  "positive_effect_count": "193",
  "suppressions": [
    "COLORLESS",
    "U",
    "WUBRG",
    "QUANDRIX",
    "UG",
    "W",
    "BR",
    "RG",
    "R",
    "WU",
    "SILVERQUILL",
    "WR",
    "WG",
    "JUND",
    "GRIXIS",
    "BANT",
    "NAYA",
    "ABZAN",
    "TEMUR",
    "SULTAI",
    "MARDU",
    "JESKAI",
    "DUNE",
    "B",
    "UB",
    "BG",
    "GLINT",
    "INK",
    "UR",
    "LOREHOLD",
    "WB",
    "WITCH"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "4",
  "gate_evidence_counted_again_in_hall_or_crucible": "YES-POTENTIAL",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### procedure-and-order

```json
{
  "construct_name": "procedure-and-order",
  "questions_and_answers": [
    "gate_v2_pressure_becomes:gate_v2_pressure_form",
    "hall_W_shelter:hall_W_shelter#answer-1",
    "hall_W_shelter:hall_W_shelter#answer-2",
    "hall_W_duty:hall_W_duty#answer-2",
    "hall_W_duty:hall_W_duty#answer-3",
    "hall_B_graveyard:hall_B_graveyard#answer-3",
    "hall_U_understanding:hall_U_understanding#answer-1",
    "hall_U_understanding:hall_U_understanding#answer-2",
    "hall_WU_process:hall_WU_process#answer-1",
    "hall_WU_process:hall_WU_process#answer-2",
    "hall_WU_process:hall_WU_process#answer-4",
    "hall_WG_belonging:hall_WG_belonging#answer-2",
    "hall_WB_obligation:hall_WB_obligation#answer-1",
    "hall_UG_adaptation:hall_UG_adaptation#answer-2",
    "hall_BANT_champion:hall_BANT_champion#answer-2",
    "hall_BANT_living_order:hall_BANT_living_order#answer-1",
    "hall_BANT_living_order:hall_BANT_living_order#answer-2",
    "hall_BANT_living_order:hall_BANT_living_order#answer-3",
    "hall_BANT_living_order:hall_BANT_living_order#answer-4",
    "hall_ESPER_perfectibility:hall_ESPER_perfectibility#answer-1",
    "hall_ESPER_perfectibility:hall_ESPER_perfectibility#answer-2",
    "hall_ESPER_perfectibility:hall_ESPER_perfectibility#answer-4",
    "hall_ESPER_designed_control:hall_ESPER_designed_control#answer-2",
    "hall_ESPER_designed_control:hall_ESPER_designed_control#answer-4",
    "hall_GRIXIS_survival_opening:hall_GRIXIS_survival_opening#answer-2",
    "hall_GRIXIS_volatile_calculation:hall_GRIXIS_volatile_calculation#answer-4",
    "hall_JUND_instinct_pressure:hall_JUND_instinct_pressure#answer-2",
    "hall_NAYA_abundance_instinct:hall_NAYA_abundance_instinct#answer-3",
    "hall_ABZAN_family_endurance:hall_ABZAN_family_endurance#answer-4",
    "hall_MARDU_war_name_oath:hall_MARDU_war_name_oath#answer-1",
    "hall_MARDU_war_name_oath:hall_MARDU_war_name_oath#answer-2",
    "hall_JESKAI_way_form:hall_JESKAI_way_form#answer-1",
    "hall_JESKAI_way_form:hall_JESKAI_way_form#answer-3",
    "hall_YORE_engineered_agency:hall_YORE_engineered_agency#answer-1",
    "hall_GLINT_missing_white:hall_GLINT_missing_white#answer-1",
    "hall_DUNE_missing_blue:hall_DUNE_missing_blue#answer-4",
    "hall_INK_protected_abundance:hall_INK_protected_abundance#answer-4",
    "hall_WITCH_patient_cultivation:hall_WITCH_patient_cultivation#answer-1",
    "hall_WITCH_patient_cultivation:hall_WITCH_patient_cultivation#answer-2",
    "hall_WITCH_patient_cultivation:hall_WITCH_patient_cultivation#answer-3",
    "hall_LOREHOLD_history:hall_LOREHOLD_history#answer-3",
    "hall_LOREHOLD_history:hall_LOREHOLD_history#answer-4",
    "hall_QUANDRIX_pattern:hall_QUANDRIX_pattern#answer-1",
    "hall_SILVERQUILL_words:hall_SILVERQUILL_words#answer-3",
    "hall_WUBRG_full_spectrum:hall_WUBRG_full_spectrum#answer-1",
    "crucible_W_WU:crucible_W_WU#answer-1",
    "crucible_W_WU:crucible_W_WU#answer-2",
    "crucible_W_WR:crucible_W_WR#answer-2",
    "crucible_W_WG:crucible_W_WG#answer-1",
    "crucible_U_WU:crucible_U_WU#answer-1",
    "crucible_U_WU:crucible_U_WU#answer-2",
    "crucible_WU_WG:crucible_WU_WG#answer-1",
    "crucible_WU_WG:crucible_WU_WG#answer-2",
    "crucible_WU_WR:crucible_WU_WR#answer-1",
    "crucible_WU_WB:crucible_WU_WB#answer-1",
    "crucible_BANT_ESPER:crucible_BANT_ESPER#answer-1",
    "crucible_BANT_ESPER:crucible_BANT_ESPER#answer-2"
  ],
  "stages": [
    "gate",
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "W",
    "U",
    "WU",
    "BANT",
    "WR",
    "ESPER",
    "GRIXIS",
    "JESKAI",
    "YORE",
    "INK",
    "WITCH",
    "UB",
    "UR",
    "LOREHOLD",
    "WB",
    "PRISMARI",
    "SILVERQUILL",
    "WG",
    "QUANDRIX",
    "UG",
    "MARDU",
    "JUND",
    "BR",
    "RG",
    "GLINT",
    "BG",
    "SULTAI",
    "WUBRG"
  ],
  "positive_effect_count": "120",
  "suppressions": [
    "B",
    "R",
    "G",
    "BR",
    "JUND",
    "NAYA",
    "ABZAN",
    "TEMUR",
    "SULTAI",
    "GLINT",
    "DUNE",
    "COLORLESS",
    "WUBRG",
    "BG",
    "RG",
    "WG",
    "WITHERBLOOM",
    "UB",
    "W",
    "WB",
    "U",
    "WR",
    "WU",
    "UG",
    "BANT",
    "ESPER",
    "GRIXIS",
    "MARDU",
    "JESKAI",
    "INK",
    "UR",
    "WITCH",
    "LOREHOLD",
    "PRISMARI",
    "SILVERQUILL",
    "YORE"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "4",
  "gate_evidence_counted_again_in_hall_or_crucible": "YES-POTENTIAL",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### speed-and-action

```json
{
  "construct_name": "speed-and-action",
  "questions_and_answers": [
    "gate_v2_pressure_becomes:gate_v2_pressure_answerable_motion",
    "gate_v2_first_signal:gate_v2_signal_live_spark",
    "hall_B_graveyard:hall_B_graveyard#answer-4",
    "hall_R_freedom:hall_R_freedom#answer-1",
    "hall_BR_intensity:hall_BR_intensity#answer-4",
    "hall_GRIXIS_survival_opening:hall_GRIXIS_survival_opening#answer-3",
    "hall_GRIXIS_volatile_calculation:hall_GRIXIS_volatile_calculation#answer-2",
    "hall_MARDU_total_commitment:hall_MARDU_total_commitment#answer-1",
    "hall_JESKAI_disciplined_cunning:hall_JESKAI_disciplined_cunning#answer-2",
    "hall_DUNE_missing_blue:hall_DUNE_missing_blue#answer-2",
    "hall_DUNE_missing_blue:hall_DUNE_missing_blue#answer-3",
    "hall_SILVERQUILL_words:hall_SILVERQUILL_words#answer-1",
    "crucible_B_BR:crucible_B_BR#answer-2",
    "crucible_R_WR:crucible_R_WR#answer-1",
    "crucible_R_UR:crucible_R_UR#answer-1",
    "crucible_R_BR:crucible_R_BR#answer-1",
    "crucible_NAYA_BANT:crucible_NAYA_BANT#answer-2",
    "crucible_ABZAN_MARDU:crucible_ABZAN_MARDU#answer-2",
    "crucible_TEMUR_MARDU:crucible_TEMUR_MARDU#answer-2",
    "crucible_JESKAI_MARDU:crucible_JESKAI_MARDU#answer-2",
    "crucible_JESKAI_TEMUR:crucible_JESKAI_TEMUR#answer-1",
    "crucible_GLINT_DUNE:crucible_GLINT_DUNE#answer-2",
    "crucible_DUNE_INK:crucible_DUNE_INK#answer-1"
  ],
  "stages": [
    "gate",
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "W",
    "U",
    "WU",
    "BANT",
    "WR",
    "ESPER",
    "GRIXIS",
    "NAYA",
    "ABZAN",
    "TEMUR",
    "SULTAI",
    "MARDU",
    "JESKAI",
    "YORE",
    "GLINT",
    "DUNE",
    "INK",
    "WITCH",
    "UB",
    "UR",
    "LOREHOLD",
    "WB",
    "PRISMARI",
    "QUANDRIX",
    "WG",
    "SILVERQUILL",
    "UG",
    "R",
    "RG",
    "BR",
    "BG"
  ],
  "positive_effect_count": "82",
  "suppressions": [
    "COLORLESS",
    "WUBRG",
    "B",
    "ESPER",
    "ABZAN",
    "SULTAI",
    "WITCH",
    "BG",
    "UB",
    "WB",
    "SILVERQUILL",
    "WITHERBLOOM",
    "WU",
    "U",
    "BR",
    "GRIXIS",
    "TEMUR",
    "JESKAI",
    "DUNE",
    "WR",
    "UR",
    "NAYA",
    "GLINT",
    "INK"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "3",
  "gate_evidence_counted_again_in_hall_or_crucible": "YES-POTENTIAL",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### growth-and-nature

```json
{
  "construct_name": "growth-and-nature",
  "questions_and_answers": [
    "gate_v2_pressure_becomes:gate_v2_pressure_wild_release",
    "hall_U_possibility:hall_U_possibility#answer-2",
    "hall_G_growth:hall_G_growth#answer-1",
    "hall_G_growth:hall_G_growth#answer-3",
    "hall_G_natural_order:hall_G_natural_order#answer-1",
    "hall_G_natural_order:hall_G_natural_order#answer-5",
    "hall_UR_experiment:hall_UR_experiment#answer-4",
    "hall_UG_adaptation:hall_UG_adaptation#answer-1",
    "hall_BANT_champion:hall_BANT_champion#answer-4",
    "hall_JUND_instinct_pressure:hall_JUND_instinct_pressure#answer-1",
    "hall_MARDU_total_commitment:hall_MARDU_total_commitment#answer-3",
    "hall_JESKAI_disciplined_cunning:hall_JESKAI_disciplined_cunning#answer-4",
    "hall_JESKAI_way_form:hall_JESKAI_way_form#answer-4",
    "hall_GLINT_living_force:hall_GLINT_living_force#answer-3",
    "hall_GLINT_missing_white:hall_GLINT_missing_white#answer-3",
    "hall_DUNE_territorial_force:hall_DUNE_territorial_force#answer-2",
    "hall_WITHERBLOOM_essence:hall_WITHERBLOOM_essence#answer-3",
    "crucible_U_UG:crucible_U_UG#answer-2",
    "crucible_G_UG:crucible_G_UG#answer-1",
    "crucible_G_UG:crucible_G_UG#answer-2",
    "crucible_G_RG:crucible_G_RG#answer-1",
    "crucible_UG_QUANDRIX:crucible_UG_QUANDRIX#answer-1",
    "crucible_GRIXIS_JUND:crucible_GRIXIS_JUND#answer-2",
    "crucible_JUND_NAYA:crucible_JUND_NAYA#answer-1",
    "crucible_TEMUR_SULTAI:crucible_TEMUR_SULTAI#answer-1",
    "crucible_TEMUR_MARDU:crucible_TEMUR_MARDU#answer-1",
    "crucible_JESKAI_TEMUR:crucible_JESKAI_TEMUR#answer-2",
    "crucible_YORE_GLINT:crucible_YORE_GLINT#answer-2",
    "crucible_GLINT_DUNE:crucible_GLINT_DUNE#answer-1",
    "crucible_INK_WITCH:crucible_INK_WITCH#answer-2"
  ],
  "stages": [
    "gate",
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "B",
    "R",
    "G",
    "BANT",
    "WR",
    "BR",
    "GRIXIS",
    "JUND",
    "NAYA",
    "ABZAN",
    "TEMUR",
    "SULTAI",
    "MARDU",
    "YORE",
    "GLINT",
    "DUNE",
    "INK",
    "WITCH",
    "BG",
    "RG",
    "UB",
    "UR",
    "LOREHOLD",
    "WB",
    "PRISMARI",
    "QUANDRIX",
    "WG",
    "SILVERQUILL",
    "UG",
    "WITHERBLOOM"
  ],
  "positive_effect_count": "84",
  "suppressions": [
    "W",
    "U",
    "WU",
    "COLORLESS",
    "WUBRG",
    "G",
    "UR",
    "QUANDRIX",
    "BANT",
    "WG",
    "MARDU",
    "JESKAI",
    "GLINT",
    "DUNE",
    "WITHERBLOOM",
    "UG",
    "RG",
    "GRIXIS",
    "NAYA",
    "SULTAI",
    "YORE",
    "INK"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "4",
  "gate_evidence_counted_again_in_hall_or_crucible": "YES-POTENTIAL",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### agency-and-leverage

```json
{
  "construct_name": "agency-and-leverage",
  "questions_and_answers": [
    "gate_v2_first_signal:gate_v2_signal_cold_pattern",
    "gate_v2_cost_of_oath:gate_v2_oath_transform",
    "hall_B_cost:hall_B_cost#answer-2",
    "hall_B_cost:hall_B_cost#answer-3",
    "hall_B_graveyard:hall_B_graveyard#answer-1",
    "hall_U_understanding:hall_U_understanding#answer-3",
    "hall_UB_information:hall_UB_information#answer-2",
    "hall_WB_obligation:hall_WB_obligation#answer-3",
    "hall_JUND_instinct_pressure:hall_JUND_instinct_pressure#answer-4",
    "hall_JUND_appetite_consequence:hall_JUND_appetite_consequence#answer-1",
    "hall_TEMUR_survival_attunement:hall_TEMUR_survival_attunement#answer-2",
    "hall_TEMUR_elemental_memory:hall_TEMUR_elemental_memory#answer-3",
    "hall_SULTAI_resource_conversion:hall_SULTAI_resource_conversion#answer-1",
    "hall_SULTAI_resource_conversion:hall_SULTAI_resource_conversion#answer-3",
    "hall_SULTAI_dead_usefulness:hall_SULTAI_dead_usefulness#answer-1",
    "hall_MARDU_total_commitment:hall_MARDU_total_commitment#answer-4",
    "hall_JESKAI_disciplined_cunning:hall_JESKAI_disciplined_cunning#answer-3",
    "hall_GLINT_missing_white:hall_GLINT_missing_white#answer-2",
    "hall_DUNE_territorial_force:hall_DUNE_territorial_force#answer-1",
    "hall_INK_protected_abundance:hall_INK_protected_abundance#answer-3",
    "hall_WITCH_missing_red:hall_WITCH_missing_red#answer-3",
    "crucible_B_UB:crucible_B_UB#answer-1",
    "crucible_B_UB:crucible_B_UB#answer-2",
    "crucible_B_BR:crucible_B_BR#answer-1",
    "crucible_B_WB:crucible_B_WB#answer-2",
    "crucible_WU_WB:crucible_WU_WB#answer-2",
    "crucible_UB_WB:crucible_UB_WB#answer-2",
    "crucible_WB_SILVERQUILL:crucible_WB_SILVERQUILL#answer-2",
    "crucible_QUANDRIX_WITHERBLOOM:crucible_QUANDRIX_WITHERBLOOM#answer-2",
    "crucible_ABZAN_SULTAI:crucible_ABZAN_SULTAI#answer-2",
    "crucible_TEMUR_SULTAI:crucible_TEMUR_SULTAI#answer-2",
    "crucible_JESKAI_SULTAI:crucible_JESKAI_SULTAI#answer-2"
  ],
  "stages": [
    "gate",
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "U",
    "B",
    "G",
    "WU",
    "BANT",
    "ESPER",
    "GRIXIS",
    "JUND",
    "ABZAN",
    "SULTAI",
    "YORE",
    "GLINT",
    "DUNE",
    "WITCH",
    "BG",
    "UB",
    "WB",
    "QUANDRIX",
    "WG",
    "SILVERQUILL",
    "UG",
    "WITHERBLOOM",
    "TEMUR",
    "INK",
    "RG",
    "UR",
    "PRISMARI",
    "BR",
    "WR"
  ],
  "positive_effect_count": "104",
  "suppressions": [
    "R",
    "WR",
    "NAYA",
    "TEMUR",
    "JESKAI",
    "INK",
    "COLORLESS",
    "WUBRG",
    "RG",
    "UR",
    "LOREHOLD",
    "PRISMARI",
    "W",
    "WU",
    "ESPER",
    "ABZAN",
    "MARDU",
    "YORE",
    "DUNE",
    "WB",
    "WG",
    "SILVERQUILL",
    "B",
    "U",
    "UB",
    "JUND",
    "SULTAI",
    "GLINT",
    "WITCH",
    "BR",
    "QUANDRIX"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "4",
  "gate_evidence_counted_again_in_hall_or_crucible": "YES-POTENTIAL",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### decay-and-renewal

```json
{
  "construct_name": "decay-and-renewal",
  "questions_and_answers": [
    "hall_B_graveyard:hall_B_graveyard#answer-2",
    "hall_G_natural_order:hall_G_natural_order#answer-4",
    "hall_WG_belonging:hall_WG_belonging#answer-3",
    "hall_JUND_appetite_consequence:hall_JUND_appetite_consequence#answer-4",
    "hall_ABZAN_ancestor_perennation:hall_ABZAN_ancestor_perennation#answer-2",
    "hall_WITCH_missing_red:hall_WITCH_missing_red#answer-4",
    "hall_QUANDRIX_pattern:hall_QUANDRIX_pattern#answer-2",
    "hall_WITHERBLOOM_essence:hall_WITHERBLOOM_essence#answer-1",
    "hall_WITHERBLOOM_essence:hall_WITHERBLOOM_essence#answer-2",
    "crucible_B_BG:crucible_B_BG#answer-2",
    "crucible_G_BG:crucible_G_BG#answer-1",
    "crucible_BG_WITHERBLOOM:crucible_BG_WITHERBLOOM#answer-1",
    "crucible_NAYA_BANT:crucible_NAYA_BANT#answer-1"
  ],
  "stages": [
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "BG",
    "WITHERBLOOM",
    "UG",
    "BANT",
    "SULTAI",
    "G",
    "NAYA"
  ],
  "positive_effect_count": "20",
  "suppressions": [
    "B",
    "G",
    "WG",
    "JUND",
    "ABZAN",
    "WITCH",
    "QUANDRIX",
    "WU",
    "WITHERBLOOM",
    "BG",
    "BANT"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "3",
  "gate_evidence_counted_again_in_hall_or_crucible": "NO-GATE-OVERLAP",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### experiment-and-invention

```json
{
  "construct_name": "experiment-and-invention",
  "questions_and_answers": [
    "hall_U_understanding:hall_U_understanding#answer-4",
    "hall_U_possibility:hall_U_possibility#answer-3",
    "hall_R_ignition:hall_R_ignition#answer-3",
    "hall_R_freedom:hall_R_freedom#answer-3",
    "hall_UR_experiment:hall_UR_experiment#answer-1",
    "hall_BG_reclamation:hall_BG_reclamation#answer-1",
    "hall_UG_adaptation:hall_UG_adaptation#answer-4",
    "hall_GLINT_missing_white:hall_GLINT_missing_white#answer-4",
    "hall_PRISMARI_expression:hall_PRISMARI_expression#answer-2",
    "hall_QUANDRIX_pattern:hall_QUANDRIX_pattern#answer-3",
    "hall_QUANDRIX_pattern:hall_QUANDRIX_pattern#answer-4",
    "hall_COLORLESS_outside_wubrg:hall_COLORLESS_outside_wubrg#answer-2",
    "crucible_U_UR:crucible_U_UR#answer-2",
    "crucible_R_UR:crucible_R_UR#answer-2",
    "crucible_UR_PRISMARI:crucible_UR_PRISMARI#answer-1",
    "crucible_YORE_GLINT:crucible_YORE_GLINT#answer-1"
  ],
  "stages": [
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "UR",
    "BG",
    "TEMUR",
    "UG",
    "RG",
    "LOREHOLD",
    "YORE",
    "ESPER"
  ],
  "positive_effect_count": "20",
  "suppressions": [
    "U",
    "R",
    "WU",
    "PRISMARI",
    "UG",
    "GLINT",
    "QUANDRIX",
    "COLORLESS"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "3",
  "gate_evidence_counted_again_in_hall_or_crucible": "NO-GATE-OVERLAP",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### knowledge-and-deliberation

```json
{
  "construct_name": "knowledge-and-deliberation",
  "questions_and_answers": [
    "hall_U_possibility:hall_U_possibility#answer-1",
    "hall_U_possibility:hall_U_possibility#answer-4",
    "hall_R_ignition:hall_R_ignition#answer-1",
    "hall_G_natural_order:hall_G_natural_order#answer-2",
    "hall_RG_wild:hall_RG_wild#answer-4",
    "hall_BG_reclamation:hall_BG_reclamation#answer-2",
    "hall_UG_adaptation:hall_UG_adaptation#answer-3",
    "hall_ESPER_perfectibility:hall_ESPER_perfectibility#answer-3",
    "hall_ESPER_designed_control:hall_ESPER_designed_control#answer-1",
    "hall_GRIXIS_survival_opening:hall_GRIXIS_survival_opening#answer-1",
    "hall_GRIXIS_volatile_calculation:hall_GRIXIS_volatile_calculation#answer-3",
    "hall_JESKAI_disciplined_cunning:hall_JESKAI_disciplined_cunning#answer-1",
    "hall_GLINT_living_force:hall_GLINT_living_force#answer-1",
    "hall_DUNE_territorial_force:hall_DUNE_territorial_force#answer-4",
    "hall_WITCH_missing_red:hall_WITCH_missing_red#answer-2",
    "crucible_U_UB:crucible_U_UB#answer-1",
    "crucible_U_UB:crucible_U_UB#answer-2",
    "crucible_U_UG:crucible_U_UG#answer-1",
    "crucible_UB_WB:crucible_UB_WB#answer-1",
    "crucible_ESPER_GRIXIS:crucible_ESPER_GRIXIS#answer-1",
    "crucible_ESPER_GRIXIS:crucible_ESPER_GRIXIS#answer-2",
    "crucible_GRIXIS_JUND:crucible_GRIXIS_JUND#answer-1",
    "crucible_JESKAI_MARDU:crucible_JESKAI_MARDU#answer-1"
  ],
  "stages": [
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "U",
    "UG",
    "UR",
    "WU",
    "UB",
    "R",
    "WR",
    "BR",
    "RG",
    "WITHERBLOOM",
    "BG",
    "ESPER",
    "WB",
    "GRIXIS",
    "B",
    "PRISMARI",
    "JESKAI",
    "GLINT"
  ],
  "positive_effect_count": "52",
  "suppressions": [
    "B",
    "WB",
    "RG",
    "BR",
    "U",
    "WU",
    "G",
    "BG",
    "UG",
    "ESPER",
    "BANT",
    "WG",
    "GRIXIS",
    "MARDU",
    "SULTAI",
    "TEMUR",
    "PRISMARI",
    "DUNE",
    "WITCH",
    "UB",
    "JUND"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "2",
  "gate_evidence_counted_again_in_hall_or_crucible": "NO-GATE-OVERLAP",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### community-and-belonging

```json
{
  "construct_name": "community-and-belonging",
  "questions_and_answers": [
    "hall_R_ignition:hall_R_ignition#answer-5",
    "hall_R_freedom:hall_R_freedom#answer-5",
    "hall_G_natural_order:hall_G_natural_order#answer-3",
    "hall_RG_wild:hall_RG_wild#answer-3",
    "hall_WG_belonging:hall_WG_belonging#answer-1",
    "hall_BG_reclamation:hall_BG_reclamation#answer-3",
    "hall_BANT_champion:hall_BANT_champion#answer-3",
    "hall_GRIXIS_survival_opening:hall_GRIXIS_survival_opening#answer-4",
    "hall_NAYA_living_whole:hall_NAYA_living_whole#answer-2",
    "hall_NAYA_living_whole:hall_NAYA_living_whole#answer-3",
    "hall_NAYA_living_whole:hall_NAYA_living_whole#answer-4",
    "hall_NAYA_abundance_instinct:hall_NAYA_abundance_instinct#answer-4",
    "hall_ABZAN_family_endurance:hall_ABZAN_family_endurance#answer-3",
    "hall_SULTAI_dead_usefulness:hall_SULTAI_dead_usefulness#answer-3",
    "hall_MARDU_war_name_oath:hall_MARDU_war_name_oath#answer-4",
    "hall_YORE_engineered_agency:hall_YORE_engineered_agency#answer-4",
    "hall_INK_missing_black:hall_INK_missing_black#answer-1",
    "hall_WITCH_patient_cultivation:hall_WITCH_patient_cultivation#answer-4",
    "hall_WITHERBLOOM_essence:hall_WITHERBLOOM_essence#answer-4",
    "hall_COLORLESS_branch_boundary:hall_COLORLESS_branch_boundary#answer-4",
    "crucible_COLORLESS_WUBRG:crucible_COLORLESS_WUBRG#answer-2",
    "crucible_B_BG:crucible_B_BG#answer-1",
    "crucible_R_RG:crucible_R_RG#answer-2",
    "crucible_G_WG:crucible_G_WG#answer-1",
    "crucible_G_WG:crucible_G_WG#answer-2",
    "crucible_JUND_NAYA:crucible_JUND_NAYA#answer-2"
  ],
  "stages": [
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "RG",
    "WG",
    "BANT",
    "JUND",
    "BR",
    "GRIXIS",
    "UB",
    "BG",
    "WITHERBLOOM",
    "SULTAI",
    "B",
    "TEMUR",
    "NAYA",
    "G",
    "INK",
    "WU",
    "UG",
    "UR",
    "WR",
    "WITCH",
    "ESPER",
    "WUBRG"
  ],
  "positive_effect_count": "47",
  "suppressions": [
    "R",
    "G",
    "RG",
    "WU",
    "UB",
    "BG",
    "BANT",
    "GRIXIS",
    "NAYA",
    "ABZAN",
    "SULTAI",
    "MARDU",
    "YORE",
    "B",
    "BR",
    "WITCH",
    "WITHERBLOOM",
    "COLORLESS",
    "WG",
    "JUND"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "3",
  "gate_evidence_counted_again_in_hall_or_crucible": "NO-GATE-OVERLAP",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### history-and-memory

```json
{
  "construct_name": "history-and-memory",
  "questions_and_answers": [
    "hall_TEMUR_elemental_memory:hall_TEMUR_elemental_memory#answer-1",
    "hall_SULTAI_dead_usefulness:hall_SULTAI_dead_usefulness#answer-4",
    "hall_WR_protection:hall_WR_protection#answer-3",
    "crucible_WR_LOREHOLD:crucible_WR_LOREHOLD#answer-2",
    "crucible_ABZAN_MARDU:crucible_ABZAN_MARDU#answer-1"
  ],
  "stages": [
    "hall",
    "crucible"
  ],
  "identities_affected": [
    "TEMUR",
    "UG",
    "RG",
    "LOREHOLD",
    "ABZAN"
  ],
  "positive_effect_count": "8",
  "suppressions": [
    "ABZAN",
    "NAYA",
    "GRIXIS",
    "SULTAI",
    "WR",
    "MARDU"
  ],
  "maximum_strong_hit_contribution_in_one_valid_path": "2",
  "gate_evidence_counted_again_in_hall_or_crucible": "NO-GATE-OVERLAP",
  "several_answers_can_represent_one_observation": "YES-POTENTIAL; no response data exists to establish statistical correlation",
  "repeated_contribution_influences_stopping_or_confidence": "YES: every contribution changes scores/softmax and can change threshold/Crucible decisions",
  "copy_independence_risk": "YES: selected signals are listed as separate reasons even when they express one repeated construct",
  "required_cap_grouping_or_disclosure": "Assign one controlled construct/dependency group; cap or model shared evidence; disclose that repeated authored signals are not independent observations."
}
```

### All 28 non-monotonic observations

| Question | Answer index (1-based) | Identity | Observations | Probability worsened | Rank worsened |
|---|---:|---|---:|---:|---:|
| gate_v2_first_signal | 1 | ABZAN | 25 | 0 | 1 |
| gate_v2_cost_of_oath | 1 | R | 125 | 19 | 13 |
| gate_v2_cost_of_oath | 1 | BR | 125 | 19 | 12 |
| gate_v2_cost_of_oath | 1 | ESPER | 125 | 19 | 24 |
| gate_v2_cost_of_oath | 1 | JUND | 125 | 19 | 20 |
| gate_v2_cost_of_oath | 1 | NAYA | 125 | 0 | 2 |
| gate_v2_cost_of_oath | 1 | ABZAN | 125 | 0 | 8 |
| gate_v2_cost_of_oath | 1 | JESKAI | 125 | 19 | 26 |
| gate_v2_cost_of_oath | 1 | YORE | 125 | 0 | 2 |
| gate_v2_cost_of_oath | 1 | DUNE | 125 | 0 | 1 |
| gate_v2_cost_of_oath | 1 | INK | 125 | 19 | 28 |
| gate_v2_cost_of_oath | 4 | G | 125 | 0 | 3 |
| gate_v2_first_signal | 2 | ABZAN | 25 | 0 | 2 |
| gate_v2_first_signal | 4 | INK | 25 | 0 | 2 |
| gate_v2_pressure_becomes | 4 | B | 5 | 4 | 3 |
| gate_v2_pressure_becomes | 4 | R | 5 | 0 | 2 |
| gate_v2_pressure_becomes | 4 | GRIXIS | 5 | 4 | 3 |
| gate_v2_pressure_becomes | 4 | ABZAN | 5 | 0 | 2 |
| gate_v2_pressure_becomes | 4 | MARDU | 5 | 4 | 3 |
| gate_v2_pressure_becomes | 4 | INK | 5 | 4 | 2 |
| gate_v2_pressure_becomes | 4 | WITCH | 5 | 4 | 1 |
| gate_v2_pressure_becomes | 4 | QUANDRIX | 5 | 4 | 1 |
| gate_v2_pressure_becomes | 4 | WG | 5 | 4 | 1 |
| gate_v2_pressure_becomes | 4 | UG | 5 | 4 | 1 |
| gate_v2_locus_of_trust | 2 | B | 1 | 0 | 1 |
| gate_v2_locus_of_trust | 4 | U | 1 | 1 | 0 |
| gate_v2_locus_of_trust | 4 | ABZAN | 1 | 1 | 1 |
| gate_v2_locus_of_trust | 4 | DUNE | 1 | 1 | 1 |

## Defects and traceability

### Required Critical and High-interest defect rows

### VM551-D001 — Critical

```json
{
  "defect_id": "VM551-D001",
  "category": "logic",
  "affected_identities_questions_routes": "All identities",
  "exact_reproduction": "Compare buildPlacementModel output wiring with raw placement discriminator_questions.",
  "machine_readable_evidence_reference": "research/build-faction-artifacts.mjs",
  "user_facing_impact": "Live Hall/Crucible effects are a separate hard-coded editorial bank with no claim links.",
  "severity": "Critical",
  "severity_rationale": "Can invalidate the public placement/confidence claim across the system.",
  "severity_depends_on_cecos": "NO: direct implementation, data, rendering, or pipeline evidence.",
  "root_cause": "Canonical evidence and signal vocabulary",
  "smallest_viable_correction": "REQ-LOGIC-001 canonical question-to-signal contracts",
  "required_evidence_dependency": "Canonical evidence and signal vocabulary",
  "requirement_ids": "REQ-LOGIC-001",
  "repair_gate": "Gate B1",
  "validation_required": "Live evidence effects derive from canonical reviewed identity contracts.",
  "blocks_trustworthy_placement": "yes",
  "reconciliation_note": "PRESERVED after implementation evidence and draft.4 re-adjudication."
}
```

### VM551-D002 — Critical

```json
{
  "defect_id": "VM551-D002",
  "category": "logic",
  "affected_identities_questions_routes": "All identities",
  "exact_reproduction": "Trace createInitialAdaptiveState through likelihoodToDelta softmaxScores and buildAdaptivePlacementResult.",
  "machine_readable_evidence_reference": "assets/js/adaptive-placement.js",
  "user_facing_impact": "Bayesian vocabulary describes an additive heuristic classifier.",
  "severity": "Critical",
  "severity_rationale": "Can invalidate the public placement/confidence claim across the system.",
  "severity_depends_on_cecos": "NO: direct implementation, data, rendering, or pipeline evidence.",
  "root_cause": "Model contract and public terminology",
  "smallest_viable_correction": "REQ-LOGIC-002 prohibit Bayesian/probability claims pending validation",
  "required_evidence_dependency": "Model contract and public terminology",
  "requirement_ids": "REQ-LOGIC-002",
  "repair_gate": "Gate A",
  "validation_required": "Probability terminology is used only for fitted or formally justified probability contracts.",
  "blocks_trustworthy_placement": "yes",
  "reconciliation_note": "PRESERVED after implementation evidence and draft.4 re-adjudication."
}
```

### VM551-D003 — Critical

```json
{
  "defect_id": "VM551-D003",
  "category": "confidence",
  "affected_identities_questions_routes": "All results",
  "exact_reproduction": "Run audit-placement-system.mjs and inspect analysis-summary.json.",
  "machine_readable_evidence_reference": "assets/js/adaptive-placement.js",
  "user_facing_impact": "Top softmax share and top-two separation are presented as confidence/strength.",
  "severity": "Critical",
  "severity_rationale": "Can invalidate the public placement/confidence claim across the system.",
  "severity_depends_on_cecos": "PARTLY: implementation evidence establishes the defect; draft.4 confirms evidence/unknown/claim boundary.",
  "root_cause": "Calibration corpus and decision contract",
  "smallest_viable_correction": "REQ-CONF-001 replace decorative share with confidence-state contract",
  "required_evidence_dependency": "Calibration corpus and decision contract",
  "requirement_ids": "REQ-CONF-001",
  "repair_gate": "Gate A",
  "validation_required": "Confidence represents evidence amount quality agreement distinctiveness stability and empirical calibration.",
  "blocks_trustworthy_placement": "yes",
  "reconciliation_note": "PRESERVED after implementation evidence and draft.4 re-adjudication."
}
```

### VM551-D004 — High

```json
{
  "defect_id": "VM551-D004",
  "category": "logic",
  "affected_identities_questions_routes": "All identities",
  "exact_reproduction": "Run audit-placement-system-remediation.mjs; inspect below_strong_minimum_hit_proxy_by_identity and negative_only_winner_total.",
  "machine_readable_evidence_reference": "sensitivity-dependency-collision-analysis.json",
  "user_facing_impact": "A primary can be presented even when the authored strong-hit proxy does not meet the identity's own generated minimum; the earlier stronger negative-only claim is withdrawn.",
  "severity": "High",
  "severity_rationale": "Can materially mislead placement interpretation, evidence authority, or first-pilot correctness.",
  "severity_depends_on_cecos": "PARTLY: implementation evidence establishes the defect; draft.4 confirms evidence/unknown/claim boundary.",
  "root_cause": "Controlled signal/evidence contracts",
  "smallest_viable_correction": "REQ-LOGIC-003 enforce minimum evidence and false-positive guardrails",
  "required_evidence_dependency": "Controlled signal/evidence contracts",
  "requirement_ids": "REQ-LOGIC-003",
  "repair_gate": "Gate B1",
  "validation_required": "Exhaustive strong-hit/minimum contract test plus all-37 false-positive scenario review.",
  "blocks_trustworthy_placement": "yes",
  "reconciliation_note": "REVISED: original zero-positive-evidence metric was invalid; severity reduced Critical -> High while the unenforced minimum contract remains material."
}
```

### VM551-D035 — High

```json
{
  "defect_id": "VM551-D035",
  "category": "audit-governance",
  "affected_identities_questions_routes": "VM-551 audit authority",
  "exact_reproduction": "Compare rejected handoff/full audit references with the exact draft.4 authority record.",
  "machine_readable_evidence_reference": "audit-input-authority.md + cecos-conclusion-adjudication.csv",
  "user_facing_impact": "Owner could not reproduce or trust CECOS-dependent findings; a web-derived legality claim exceeded the local audit authority.",
  "severity": "High",
  "severity_rationale": "Material audit or player-trust impact within the documented MVP boundary.",
  "severity_depends_on_cecos": "PARTLY: draft.4 confirms authority/dependence boundaries; machine evidence establishes the condition.",
  "root_cause": "Wrong CECOS draft and unpreserved external rule evidence were treated as governing inputs.",
  "smallest_viable_correction": "Use only exact draft.4 Git object; classify every major conclusion; withdraw the specific Hearthhull legality claim.",
  "required_evidence_dependency": "Exact CECOS object/checksum and local-only evidence",
  "requirement_ids": "REQ-GOV-001",
  "repair_gate": "Audit acceptance gate",
  "validation_required": "Independent checksum/authority replay and conclusion classification.",
  "blocks_trustworthy_placement": "yes",
  "reconciliation_note": "NEW IN OWNER-REJECTION REMEDIATION."
}
```

### VM551-D036 — High

```json
{
  "defect_id": "VM551-D036",
  "category": "logic",
  "affected_identities_questions_routes": "All primary selections",
  "exact_reproduction": "Run remediation generator and inspect matched one-answer pairs.",
  "machine_readable_evidence_reference": "sensitivity-dependency-collision-analysis.json",
  "user_facing_impact": "14,424/44,005 matched one-answer terminal comparisons flip primary; 32.7781% normalized sensitivity can make near-identical answers change identity without stability disclosure.",
  "severity": "High",
  "severity_rationale": "Material audit or player-trust impact within the documented MVP boundary.",
  "severity_depends_on_cecos": "NO: implementation/scenario evidence establishes the condition.",
  "root_cause": "No perturbation-stability contract or threshold informs result strength.",
  "smallest_viable_correction": "Define pilot stability thresholds and return close/uncertain when one-answer perturbations are unstable.",
  "required_evidence_dependency": "Bounded pilot response/scenario set",
  "requirement_ids": "REQ-TEST-009|REQ-CONF-004",
  "repair_gate": "Gate B1",
  "validation_required": "Re-run matched perturbations; stratify by identity/family and test user-visible uncertainty.",
  "blocks_trustworthy_placement": "yes",
  "reconciliation_note": "NEW IN OWNER-REJECTION REMEDIATION."
}
```

### VM551-D038 — High

```json
{
  "defect_id": "VM551-D038",
  "category": "question-design",
  "affected_identities_questions_routes": "113 questions / 356 answers",
  "exact_reproduction": "Run remediation generator; reconcile all dispositions.",
  "machine_readable_evidence_reference": "question-quality-adjudication.csv + question-disposition-summary.json",
  "user_facing_impact": "67 high-abstraction, 45 low-Commander-relevance, 73 double-barreled, and 113 uncertainty-blind questions make answers hard to interpret as one bounded construct.",
  "severity": "High",
  "severity_rationale": "Material audit or player-trust impact within the documented MVP boundary.",
  "severity_depends_on_cecos": "NO: implementation/scenario evidence establishes the condition.",
  "root_cause": "Questions were authored as identity-flavored scenarios without evidence/construct/reliability contracts.",
  "smallest_viable_correction": "Use the smallest evidence-derived, Commander-relevant, single-construct question slice for the first pilot; exclude unresolved questions.",
  "required_evidence_dependency": "Player-language corpus derivation and owner construct decisions",
  "requirement_ids": "REQ-QUESTION-003",
  "repair_gate": "Gate B1",
  "validation_required": "Cognitive interview, comprehension, neighbor-confusion, and representational-failure checks.",
  "blocks_trustworthy_placement": "yes",
  "reconciliation_note": "NEW IN OWNER-REJECTION REMEDIATION."
}
```

### VM551-D039 — High

```json
{
  "defect_id": "VM551-D039",
  "category": "evidence-dependency",
  "affected_identities_questions_routes": "11 repeated-construct groups",
  "exact_reproduction": "Run remediation generator; inspect cross-stage groups and maximum strong-hit contributions.",
  "machine_readable_evidence_reference": "repeated-signal-dependency-audit.csv",
  "user_facing_impact": "One underlying preference can be counted repeatedly, inflate softmax share, affect stopping, and be narrated as multiple independent reasons.",
  "severity": "High",
  "severity_rationale": "Material audit or player-trust impact within the documented MVP boundary.",
  "severity_depends_on_cecos": "PARTLY: draft.4 confirms authority/dependence boundaries; machine evidence establishes the condition.",
  "root_cause": "No controlled dependency groups, caps, or independence disclosure exist.",
  "smallest_viable_correction": "Group/cap repeated constructs and compute confidence/evidence amount from independent evidence units.",
  "required_evidence_dependency": "Controlled signal vocabulary and pilot response dependence analysis",
  "requirement_ids": "REQ-LOGIC-010|REQ-CONF-005",
  "repair_gate": "Gate B1",
  "validation_required": "Synthetic duplicate-construct tests plus pilot dependence analysis; do not claim empirical correlation before data.",
  "blocks_trustworthy_placement": "yes",
  "reconciliation_note": "NEW IN OWNER-REJECTION REMEDIATION."
}
```

### VM551-D040 — High

```json
{
  "defect_id": "VM551-D040",
  "category": "distinctiveness",
  "affected_identities_questions_routes": "All 37 identities",
  "exact_reproduction": "Compare golden-path-derived probe outcomes with distinctiveness dispositions and same-color/edge-family analysis.",
  "machine_readable_evidence_reference": "identity-distinctiveness-matrix.csv + profile-scenario-matrix.csv",
  "user_facing_impact": "Golden-path-derived target probes hit all 37, but all 37 lack an independent neighboring/mixed challenge; 4 identities have high confusion risk and 7 lack sufficient current distinctiveness evidence. Targeted reachability does not prove ordinary players can be separated.",
  "severity": "High",
  "severity_rationale": "Material audit or player-trust impact within the documented MVP boundary.",
  "severity_depends_on_cecos": "NO: implementation/scenario evidence establishes the condition.",
  "root_cause": "Reachability was used as a proxy for semantic distinctiveness; discriminators and false-positive guards are not validated.",
  "smallest_viable_correction": "Pilot the smallest high-risk family contrasts and preserve unknown/close alternatives; defer universal accuracy claims.",
  "required_evidence_dependency": "Certified identity definitions plus player-pilot confusion evidence",
  "requirement_ids": "REQ-IDENTITY-001",
  "repair_gate": "Gate B1",
  "validation_required": "Independently derived all-37 profile probes, same-color guild/college, shard/wedge, four-color, Colorless, and WUBRG confusion matrices.",
  "blocks_trustworthy_placement": "yes",
  "reconciliation_note": "NEW IN OWNER-REJECTION REMEDIATION."
}
```

### Every Gate A and Gate B1 requirement

### REQ-A-001 — Gate A

```json
{
  "requirement_id": "REQ-A-001",
  "finding_ids": "VM551-D002",
  "evidence": "adaptive-placement.js",
  "risk": "Bayesian/probability wording overclaims the model",
  "requirement": "Name current system adaptive weighted scoring everywhere",
  "validation": "Static/runtime terminology scan and owner copy review",
  "gate": "Gate A"
}
```

### REQ-A-002 — Gate A

```json
{
  "requirement_id": "REQ-A-002",
  "finding_ids": "VM551-D003|VM551-D007|VM551-D023",
  "evidence": "26,891 paths + runtime trace; downstream-compatibility-contract.md; result-field-consumer-map.csv",
  "risk": "Numeric shares/fabricated defaults imply calibrated certainty and an unbounded removal could break ranking replay persistence dossier Matrix recommendation adjacent deck-link and Maze consumers",
  "requirement": "Remove public numeric confidence, probability, correctness, and strength claims; preserve internal scores, softmax shares, gaps, ranking/stopping inputs, existing serialized field names/shapes, cache/profile/saved/legacy/OAuth/dossier/recommendation/deck-link/adjacent/Maze consumers, authored Matrix values, and the separate placement-derived mana-alignment payload; keep legacy missing confidence unknown; introduce only additive bounded public result states with backward-compatible normalization; prohibit implementation planning until the complete consumer map is independently reviewed and no UNRESOLVED-BLOCKER enters Gate A",
  "validation": "Compatibility validator; field-shape and writer/reader reconciliation; cache/profile/OAuth round trips; saved legacy reading; primary dossier; alternative/adjacent view; recommendation and deck-link rendering; authored Matrix; placement-result mana alignment; Maze handoff; return-to-dossier; legacy missing-confidence unknown; no fabricated numeric fallback; no public numeric confidence output",
  "gate": "Gate A"
}
```

### REQ-A-003 — Gate A

```json
{
  "requirement_id": "REQ-A-003",
  "finding_ids": "VM551-D005",
  "evidence": "333 ties + incomplete/contradictory runtime states",
  "risk": "Hidden tie defaults and unsupported completion fabricate a primary",
  "requirement": "Preserve unknown, mixed, contradictory, insufficient, tied, close, invalid, and incomplete result states using existing response/state evidence; do not refit the questionnaire in Gate A",
  "validation": "Decision table, exact/near tie, incomplete, contradictory, invalid, and absent-state scenarios",
  "gate": "Gate A"
}
```

### REQ-A-004 — Gate A

```json
{
  "requirement_id": "REQ-A-004",
  "finding_ids": "VM551-D006|VM551-D007",
  "evidence": "numeric ranks 2/3",
  "risk": "Weak runner-up is mislabeled meaningful adjacency",
  "requirement": "Call numeric runners-up close alternatives or omit them; reserve adjacency for reviewed relationship + evidence",
  "validation": "Weak-rank-two, cross-family, guild/college, Colorless/WUBRG tests",
  "gate": "Gate A"
}
```

### REQ-A-005 — Gate A

```json
{
  "requirement_id": "REQ-A-005",
  "finding_ids": "VM551-D017|VM551-D020",
  "evidence": "claim register and traces",
  "risk": "Copy states motivation/deck/table claims beyond answers",
  "requirement": "Use only entailed, qualified observation language in first pass",
  "validation": "Trace answer -> claim for every Gate A surface",
  "gate": "Gate A"
}
```

### REQ-B1-001 — Gate B1

```json
{
  "requirement_id": "REQ-B1-001",
  "finding_ids": "VM551-D008|VM551-D038",
  "evidence": "question quality matrix + 0 uncertainty answers",
  "risk": "Current instrument tests overlapping/abstract constructs and forces directional evidence",
  "requirement": "Select the smallest evidence-derived, Commander-relevant, single-construct pilot question slice with explicit unknown/mixed/no-direction handling",
  "validation": "Cognitive review plus 113/356 inclusion/exclusion manifest and uncertainty-state scenarios",
  "gate": "Gate B1"
}
```

### REQ-B1-002 — Gate B1

```json
{
  "requirement_id": "REQ-B1-002",
  "finding_ids": "VM551-D009|VM551-D010",
  "evidence": "answer matrix",
  "risk": "Effects cannot be stably traced or reviewed",
  "requirement": "Stable question/answer/signal IDs and direct/inferred/speculative provenance for every pilot effect",
  "validation": "Schema/reference/hash validation",
  "gate": "Gate B1"
}
```

### REQ-B1-003 — Gate B1

```json
{
  "requirement_id": "REQ-B1-003",
  "finding_ids": "VM551-D001|VM551-D004|VM551-D011",
  "evidence": "builder + 2,901 below-min paths",
  "risk": "Scoring can ignore identity contracts",
  "requirement": "One reviewed scoring authority; executable minimum-hit and false-positive decisions; explicit insufficient state",
  "validation": "Exhaustive all-37 minimum/guardrail tests",
  "gate": "Gate B1"
}
```

### REQ-B1-004 — Gate B1

```json
{
  "requirement_id": "REQ-B1-004",
  "finding_ids": "VM551-D039",
  "evidence": "11 repeated constructs",
  "risk": "Repeated observations can masquerade as independent evidence",
  "requirement": "Controlled dependency groups and contribution caps/disclosure",
  "validation": "Duplicate-construct, order, stopping, and confidence tests",
  "gate": "Gate B1"
}
```

### REQ-B1-005 — Gate B1

```json
{
  "requirement_id": "REQ-B1-005",
  "finding_ids": "VM551-D036",
  "evidence": "44,005 matched comparisons",
  "risk": "Small answer changes cause unstable primary flips",
  "requirement": "Predeclare pilot perturbation thresholds and downgrade unstable results",
  "validation": "All-37/family sensitivity report and scenario trace",
  "gate": "Gate B1"
}
```

### REQ-B1-006 — Gate B1

```json
{
  "requirement_id": "REQ-B1-006",
  "finding_ids": "VM551-D040",
  "evidence": "distinctiveness matrix + 37 profiles",
  "risk": "Reachability does not prove semantic separation",
  "requirement": "Pilot high-risk family contrasts and preserve close/unknown outcomes",
  "validation": "Same-color five pairs; shard/wedge; every four-color; Colorless; WUBRG confusion matrix",
  "gate": "Gate B1"
}
```

Boundary precedence: `bounded-mvp-repair-plan.md` and `requirements-traceability-matrix.csv` govern the repair boundary. Narrative summaries must agree with them.

# VM-551 Placement Decision, Classification, and State Model

This document records current behavior and the required replacement behavior. It is a requirements artifact, not production code.

## Placement decision table

| Case | Current behavior | Trust problem | Required output contract |
|---|---|---|---|
| Clear primary | Highest softmax share becomes primary; may stop after six answers if gap >= 0.24. | Share is uncalibrated and may reflect suppression rather than positive evidence. | Primary only when evidence minimum, agreement, stability, and calibrated-strength gates pass. |
| Near tie | Optional Crucible if a matching pair exists; otherwise another Hall question or rank order. | A pair outside the 51-question bank may never receive a direct discriminator. | Ask a traceable discriminator or return a mixed/close-alternative result. |
| Exact tie | Identity key lexicographic order wins. | Hidden deterministic default. 333 exhaustive paths tie exactly. | Represent exact tie; never claim a unique primary without a documented tie decision. |
| Weak evidence | Still returns a primary after 6–8 forced answers. | No insufficient-evidence state; all identities can win with zero direct positive evidence. | Return insufficient evidence or a broad family hypothesis. |
| Contradictory evidence | Positive, suppression, and lateral deltas accumulate; top rank wins. | Conflict amount is not exposed and score separation can masquerade as certainty. | Preserve contradiction as an explicit agreement dimension and lower confidence. |
| Several plausible identities | Top rank primary; ranks 2 and 3 called adjacent. | Numerical order is substituted for meaningful adjacency. | Present a reviewed candidate set and explain each evidence overlap/boundary. |
| High primary / weak secondary | Rank 2 remains an adjacent fit regardless of absolute support. | Runtime example showed a 1% runner-up as adjacent. | Omit adjacency below absolute evidence and relationship thresholds. |
| Weak primary / weak secondary | Highest weak score still receives primary language. | Relative separation does not establish adequate evidence. | Insufficient/mixed result with targeted follow-up. |
| College/guild same colors | Compete through separate hard-coded answer effects and sparse Crucible pairs. | Shared color effects can dominate the behavioral distinction. | Require college/guild boundary signals independent of color identity. |
| Mono/multicolor ambiguity | Color-propagated Gate effects plus adaptive Hall rank decide. | Multi-color identities have uneven evidence opportunities. | Compare controlled mono/multi boundary evidence and normalize opportunity. |
| Four-color | Treated as identity records Dune/Glint/Ink/Witch/Yore, with generated color loadings. | Missing-color semantics and recovered guardrails are metadata, not live gates. | Require exact four-color semantic evidence and reject generic breadth. |
| Colorless | Outside-WUBRG Gate channel plus targeted questions can drive selection. | Maximum observed share reaches 1.0; it never appears rank three in exhaustive paths. | Calibrate outside-color evidence, require positive minimum, and test all adjacent states. |
| WUBRG | All-five integration Gate channel plus targeted questions. | Can be confused with breadth/goodstuff; source-bound guardrails are not enforced. | Require all-five integration and tradeoff evidence, not mere access. |
| Invalid/incomplete | UI prevents completion before stage minima; clean result query returns landing. | Partial state silently disappears on refresh. | Validate versioned state, explain recovery, and never fabricate confidence. |

## Current classification tree

```text
Start
  -> ask four fixed Gate questions
  -> rank all 37 by additive score + softmax
  -> ask two Hall questions selected from current top-five identities
  -> if gap/collision says Crucible and pair exists: ask one pair question -> finish
  -> else if decisive gap >= 0.24: finish
  -> else ask a third Hall question
  -> optionally ask one Crucible question
  -> finish at no next question or eight total
  -> primary = rank 1
  -> adjacent = ranks 2 and 3
  -> confidence = rank-1 softmax share
```

## Required CECOS-informed classification tree

```text
Validate state and evidence provenance
  -> invalid or unknown? preserve unknown; do not classify
  -> evidence amount below identity/family minimum? insufficient evidence
  -> correlation-adjusted evidence agreement low? contradictory/mixed
  -> one or more identity contracts pass?
       no -> broad family hypothesis or insufficient evidence
       yes -> evaluate stability under answer perturbation
  -> primary strength calibrated and stable?
       no -> close alternatives / mixed result
       yes -> primary result
  -> secondary has independent positive evidence?
       no -> no adjacent result
       yes -> relationship contract passes?
            no -> close alternative, not adjacent
            yes -> adjacent result with relationship type
  -> generate only claims entailed by selected answers + reviewed identity evidence
  -> attach confidence state, evidence amount, agreement, and limitations
```

## Confidence state contract

Confidence must be a multi-part reviewed state, not one number:

| Dimension | Meaning | Prohibited substitute |
|---|---|---|
| Evidence amount | Independent, placement-relevant observations available | Question count alone |
| Evidence quality | Direct vs inferred/speculative, provenance, answer ambiguity | Weight magnitude |
| Agreement | Whether evidence supports a coherent identity contract | Top-two separation alone |
| Distinctiveness | Whether evidence separates neighboring identities | Absolute top score alone |
| Stability | Whether small answer changes preserve the result | Deterministic replay alone |
| Calibration | Empirical likelihood that a stated class is useful/correct at this band | Softmax share of arbitrary scores |

Allowed public states for MVP: `insufficient`, `mixed`, `emerging`, `supported`, `strongly supported`. Numeric percentages remain prohibited until calibrated and documented.

## State-transition matrix

| From | Event | Current state/result | Current persistence | Requirement |
|---|---|---|---|---|
| Start | Start quick reading | Gate question 1 | Memory | Version the reading session. |
| Question | Select answer | New immutable adaptive state; next question chosen | Memory | Persist stable answer IDs and model version. |
| Question | Change answer | Back, then choose another answer; replay from start | Memory | Recompute deterministically and preserve audit trail. |
| Question | Back | Pops one selection and replays | Memory | Maintain exact prior question/answer state. |
| Question | Forward | Not a separate operation; requires answer | Memory | Keep disabled/absent until valid selection. |
| Partial | Refresh | Returns to landing; answers lost | None | Either restore versioned partial state or explicitly warn before loss. |
| Partial | Invalid answer/model mismatch | Runtime depends on lookup/fallback behavior | None | Fail closed with recoverable explanation. |
| Completion | Finish rule passes | Build result and render dossier | Session cache; optional account save | Record evidence contract, model hash, and decision trace. |
| Result | Refresh | Restores same-origin completed result in session | `sessionStorage` | Validate schema/model compatibility; never invent missing confidence. |
| Clean browser | Direct result URL | Landing; query cannot create result | None | Use an opaque, validated saved-result reference or document that deep links require a saved result. |
| Result | Restart | Clears cached result and returns to landing | Cache cleared | Confirm intended reset and clear all versioned state. |
| Result | Navigate panels | Query changes `panel`/`layout` | Result remains cached | Preserve selected primary/adjacent target and accessible focus. |
| Result | View adjacent | Same result, different dossier target | Result unchanged | Label as adjacent only if adjacency contract passed; otherwise label close alternative. |
| Result | Commander recommendation | External or internal discovery route | Handoff/query context | Preserve placement as context, not proof. |
| Result | Maze/Archscry return | Uses handoff/cache where available | Session/context dependent | Version and validate handoff; state limitations must be visible. |

## Reproducibility evidence

The exhaustive analysis enumerated every terminal path reachable through current runtime question selection:

- 26,891 terminal paths.
- 3,004 six-question paths.
- 16,843 seven-question paths.
- 7,044 eight-question paths.
- 333 exact top-score and top-share ties.
- Confidence/share range: 0.055–1.000; mean 0.350311.
- Gap range: 0–1.000; mean 0.271024.

These are model outputs, not correctness rates. They must not be interpreted as empirical player-placement probabilities.

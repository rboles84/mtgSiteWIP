# VM-551 Gate B1 Identity/Lens Self-Report Contract

Status: owner-approved architecture integrated for final owner review; non-scoring and non-production.

## Evidence class

Stable evidence class: `IDENTITY_LENS_SELF_REPORT`

This class records a player's explicit affinity for an identity lens or relationship to a deck's tools when Commander behavior cannot honestly expose that layer. It is secondary self-report evidence. It is not a behavioral observation, construct, disguised scenario, personality diagnosis, or faction selector.

The behavioral ledger and lens ledger must remain separate. A result may say what Commander answers showed and, separately, what the player explicitly said resonates. It may not blend the two into one inferred behavioral claim.

## Eligibility

All conditions are mandatory:

1. At least two reasonably independent behavioral observations already exist.
2. Those observations produce a bounded unresolved candidate set.
3. The remaining ambiguity is a documented layer boundary that behavior cannot cleanly resolve, not merely a small numerical difference.
4. Every candidate in the lens item is already behaviorally plausible; the lens cannot introduce an excluded, absent, or strongly contradicted candidate.
5. The behavioral result is not already stable enough to close honestly.
6. No other lens item has appeared in the journey.
7. The item occupies the optional targeted unresolved-evidence slot, so the complete journey remains 6 to 8 questions with a hard maximum of 8.

If any condition fails, the lens question is not asked. The system preserves a close, tied, mixed, contradictory, or insufficient result instead of forcing closure.

## Hard safeguards

- A lens answer cannot independently create a named result or a one-answer identity flip.
- It cannot be sole support for an identity.
- It cannot override strong contradictory behavioral evidence.
- It cannot count as behavioral mapping-validation evidence.
- It cannot ask the player to choose a faction name, color combination, missing-color slogan, morality, intelligence, personality, skill, power, or budget.
- Responses must be atomic, neutral, and explicitly presented as preference or resonance.
- A neutral skip or uncertainty answer is required. It is non-directional, non-penalizing, and leaves the behavioral reading unchanged.
- At most one lens question may appear in a journey.
- Its provenance, eligibility reason, bounded candidate set, response, and contradiction state must be independently auditable.
- It cannot force closure at question eight.

## Separate ledger contract

An eventual implementation would add fields rather than reinterpret existing behavioral or saved-result fields:

| Field | Purpose |
|---|---|
| `evidence_class` | Exact value `IDENTITY_LENS_SELF_REPORT`. |
| `lens_question_id` | Stable lens-item identifier, versioned separately from behavioral question IDs. |
| `lens_answer_id` | Stable response identifier, including the neutral skip. |
| `candidate_set_before_lens` | Bounded candidates already made plausible by behavior. |
| `independent_behavioral_observations` | Count and locators used to establish eligibility. |
| `eligibility_reason` | Exact unresolved layer boundary. |
| `contradiction_status` | Whether the answer agrees with, is neutral to, or conflicts with behavioral evidence. |
| `scoring_status` | `NON_SCORING_SECONDARY_EVIDENCE`. |
| `provenance` | Source and instrument-version locators. |

These are design fields only. This task does not modify a production schema or saved-result contract.

## Player-facing explanation

When no lens question is asked or the player skips, the result remains behavior-only.

When a lens response is present, the result uses two visibly separate sections:

- **What your Commander answers showed** — behavioral observations only.
- **What you said resonates** — the player's explicit self-report only.

The remaining result may explain why an identity is plausible, the closest supported alternative, what distinguishes them, what remains unsettled, and useful Commander/Vox Mana continuations. It must state when the lens did not resolve or contradicted the behavior.

## Bounded Yore example

Prototype-only question:

> Two identity lenses still fit the Commander patterns you chose. Which relationship to a deck's tools feels more personally resonant?

- **Shape a system deliberately.** I like making the pieces follow a structure I chose, even when the deck has to rebuild around limits.
- **Let the route emerge.** I like adapting to the tools and openings that appear instead of preserving one designed structure.
- **Neither, or I'm not sure.** This distinction does not fit me, or it depends on the deck.

This item is eligible only when prior behavior has already narrowed the unresolved set to Yore and Glint and has not strongly contradicted either. It does not ask for a faction, does not establish constructed agency from behavior, and does not make Yore observable. The first response may add bounded secondary resonance for Yore; the second may add bounded secondary resonance for Glint; the third changes nothing. None can name or flip the result alone.

## Validation requirements for a later gate

Before any implementation or player use, validation must test comprehension, perceived steering, desirability bias, stability, skip use, contradiction handling, candidate-set leakage, and whether players understand the difference between observed behavior and explicit resonance. Lens responses must never be pooled as evidence validating behavioral mappings.

## Stop boundary

This contract authorizes no scoring, routing implementation, schema change, player recruitment, player validation, shadow test, migration, deployment, or production use.

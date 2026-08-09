# VM-551 Gate B1 placement-engine validation

This directory records deterministic model validation for `vm551-gate-b1-placement-engine-v1`. The reports are structural evidence about the approved model, not empirical player accuracy. The current mapping authority remains `MAPPING_HYPOTHESIS`.

## Ranking contract

Each answer becomes an immutable evidence-ledger entry. Unknown, conditional, and non-directional answers have zero identity effect. Behavioral and identity-lens evidence use separate ledgers; the lens never changes behavioral ranking.

For each identity, the engine keeps only the strongest positive and strongest contradiction inside each dependency group. A contradiction is multiplied by `0.75`. The directional term is the mean of `(positive - contradiction)` across identity-affected dependency groups, which prevents identities with more authored mappings from receiving automatic additive inflation. Structural coverage is the fraction of that identity's approved supporting constructs observed in the journey. The internal ordering score is:

`0.75 * directional mean + 0.25 * structural coverage`

Ties resolve by naming dependencies, positive dependencies, route affinity, structural coverage, then stable identity ID. Route affinity selects useful questions; it cannot create naming evidence or a public placement. Public alternatives require positive directional support and must remain within the configured `0.20` window. The engine never adds unsupported candidates merely to fill three slots. Internal scores and shares are implementation details, not calibrated confidence and not authorized for public percentage display.

A clear primary requires at least two affected dependency groups, at least one naming observation, at least two independent observed constructs, a `0.20` separation, and no material contradiction. Otherwise the engine returns a close, tied, mixed, contradictory, insufficient, or incomplete Gate A state as appropriate.

## Routing, stopping, and recovery

Gate questions C01-C04 are fixed. Later questions are ranked by their ability to change relative support or route affinity among the bounded candidate set, with approved pair coverage included. Used questions and dependency groups are ineligible. The main journey stops after 6-8 questions: early for a clear responsible result, at stable exhaustion when no useful approved question remains, or at the hard maximum of eight.

An insufficient result returns one of three refinement outcomes: an unused eligible targeted question; a materially relevant prior conditional/unknown answer to revisit; or an explicit statement that no approved discriminator exists. Refinement is outside the eight-question journey and does not manufacture a named result.

## Report index

- `invariant-validation.json`: approved counts, IDs, signals, and provenance.
- `focused-behavior.json`: neutral, contradiction, lens, top-three, and adaptive-usefulness assertions.
- `stopping-termination.json`: 5,000 generated journeys and deterministic replay totals.
- `identity-reachability.json`: all 37 identities and strongest in-model paths.
- `confusion-pair-resolution.json`: all 123 accepted confusion pairs.
- `synthetic-robustness.json`: synthetic identity variants, explicitly non-empirical.
- `sensitivity-mutation.json`: one-answer mutation outcomes.
- `insufficient-recovery.json`: recovery totals and aggregated audited patterns.
- `owner-summary.md`: concise owner-facing findings and blockers.

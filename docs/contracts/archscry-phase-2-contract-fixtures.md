# Archscry Phase 2 Contract Fixtures

Status: Normative design fixtures for [Archscry Product Contract v1](archscry-product-contract-v1.md)

Starting baseline: `e875c624d2c3463aa6af9b8ab473c7401a4d6d14`

## Fixture Rules

- `observed_gameplay_fit` is already finalized by the unchanged behavior-first placement owner before reconciliation runs.
- Observed identity sets contain only current responsible public named directions. Internal candidates, raw leader, and unqualified rank are excluded.
- Mechanic/playstyle preferences never enter identity-set reconciliation.
- Exploration directions are illustrative contract outputs, not UI count or ranking requirements.
- `EXPLORE_X` means a direction resolved by an existing approved downstream owner; Phase 2 does not invent its identity mapping.

## Compact Suite

| ID | Prior | Final observed result | Relationship | Allowed explanation | Allowed exploration directions / reasons | Prohibited behavior |
| --- | --- | --- | --- | --- | --- | --- |
| P2-01 | `some_preferences`; identities `{Orzhov}` | `primary`; public names `{Orzhov}` | `exact_overlap` | “You named Orzhov, and your gameplay answers independently supported Orzhov.” Agreement does not strengthen qualification. | Orzhov once, with separate `behavioral_primary` and `self_reported_identity` reasons if both are useful. | Add prior weight; stop because the two agree; present a more certain identity. |
| P2-02 | `identity_literate`; identities `{Orzhov}` | `primary`; public names `{Jund}` | `no_overlap` | “You came in thinking Orzhov; this reading’s behavior-first direction was Jund. Both facts remain visible.” | Jund as `behavioral_primary`; Orzhov as `self_reported_identity` if useful to compare. | Replace Jund with Orzhov; call the prior wrong; average them into a third result. |
| P2-03 | `some_preferences`; identities `{Orzhov}` | `close`; primary Jund, supported close Orzhov; public names `{Jund, Orzhov}` | `partial_overlap` | “Jund led this reading, while Orzhov remained directly supported and also matches what you named.” | Jund as `behavioral_primary`; Orzhov as `behavioral_close_or_adjacent` and optionally `self_reported_identity`. | Promote Orzhov to primary because of the prior; call every rank-two identity adjacent. |
| P2-04 | `identity_literate`; identities `{Orzhov, Golgari}` | `primary`; public names `{Golgari}` | `partial_overlap` | “One of the identities you named overlaps this reading; Orzhov remains a separate player claim.” | Golgari as `behavioral_primary` plus `self_reported_identity`; Orzhov as `self_reported_identity` if the comparison helps. | Pick a winner between the two priors before behavior; treat an unobserved Orzhov claim as behavioral support. |
| P2-05 | No prior snapshot | `primary`; public names `{Jund}` | `no_prior` | “No starting read was supplied. Your gameplay answers supported Jund.” | Jund as `behavioral_primary`; existing approved downstream outputs if they add a reason-bearing next step. | Infer a prior from Jund, experience level, saved placement, or dossier history. |
| P2-06 | No prior snapshot | `mixed`; public names `{Jund, Orzhov}` | `no_prior` | “No starting read was supplied. The answers left two independently supported directions.” | Jund and Orzhov only as current behavioral directions, each with `behavioral_primary` or `behavioral_close_or_adjacent` as the current public contract permits. | Invent a prior; force one winner; add all plausible internal candidates. |
| P2-07 | `identity_literate`; identities `{Yore}` | `insufficient`; public names `{}` | `not_comparable` | “You named Yore. This reading did not collect enough distinctive behavioral evidence for a responsible named result.” | Yore as `self_reported_identity`; any existing downstream Yore dossier or exploration path with its own approved reason. | Name or qualify Yore; convert `insufficient`; use legal Partner availability or common mechanics as placement evidence. |
| P2-08 | `identity_literate`; identities `{Yore}` | `primary`; public names `{Glint}` | `no_overlap` | “You named Yore; the independent behavioral result was Glint.” | Glint as `behavioral_primary`; Yore as `self_reported_identity` if comparison is useful. | Suppress Glint, force Yore, or call Glint the player’s truer identity. |
| P2-09 | `some_preferences`; identities `{Orzhov}`; one reviewed cross-identity mechanic preference | `primary`; public names `{Orzhov}` | `exact_overlap` | “Orzhov is the behavioral direction. A mechanic you named also opens another useful exploration path.” | Orzhov as `behavioral_primary` and `self_reported_identity`; `EXPLORE_X` only as `self_reported_mechanic_playstyle` with an approved downstream relationship and `why this appeared`. | Change placement to `EXPLORE_X`; create `Orzhov + mechanic = X`; map the mechanic from model memory. |
| P2-10 | `some_preferences`; identities `{}`; one reviewed mechanic preference | `primary`; public names `{Orzhov}` | `not_comparable` | “You did not name an identity. Orzhov came from gameplay answers; your mechanic preference is a separate exploration clue.” | Orzhov as `behavioral_primary`; `EXPLORE_X` only through an approved downstream owner. | Derive Orzhov from the mechanic; treat mechanic-only context as an identity claim; hide an unexpected observed result. |
| P2-11 | Reading R1 captured identities `{Orzhov}`; later current prior edited to `{Jund}` | R1 remains `primary` Jund with public names `{Jund}` | R1 remains `no_overlap`; a new optional comparison with the edited prior may be `exact_overlap` | Original: “At R1, you named Orzhov and behavior suggested Jund.” New comparison: “Your updated read now overlaps R1’s unchanged behavioral result.” | R1 directions remain bound to R1. A new comparison may use Jund as `self_reported_identity` without modifying R1. | Rewrite R1 prior, observed result, or original reconciliation; present the new comparison as the original history. |
| P2-12 | R1 identities `{Orzhov}`; R2 independently captures identities `{Orzhov}` | R1 `primary` Jund; R2 `primary` Orzhov | R1 `no_overlap`; R2 `exact_overlap` | Each reading explains only its own prior snapshot and observed result. Change between readings is allowed and not auto-classified as error. | R1: Jund behavioral and Orzhov self-reported. R2: Orzhov behavioral/self-reported. | Reuse R1 answers, relationship, mechanic attribution, or result in R2; mutate R1 when R2 completes. |

## Coherence Check

The suite passes only if one contract handles all 12 cases without fixture-specific states or exceptions. In every row:

- the prior leaves ranking, qualification, candidate membership, and stopping unchanged;
- `insufficient` remains valid;
- every additional direction has an allowed reason and plain-language `why this appeared`;
- no relationship becomes a score or replacement result;
- reading snapshots prevent stale attribution.

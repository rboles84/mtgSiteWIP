# VM-551 Gate B1 Evidence and Routing Remediation

- Status: **IMPLEMENTED WITH EXPLICIT AUTHORITY GAPS**
- Base engine candidate: `214a085739ba73a1146d5e09c3882114f7304d9f`
- Unbiased-routing baseline: `48c0f01`
- Evidence posture: `MAPPING_HYPOTHESIS`; not empirical player accuracy

## Preflight and authority

The accepted engine was deterministic and terminating, but only 13 of 37 identities had a responsible primary path. Fifteen identities had no naming evidence, nine had naming evidence their strongest route did not reach, and 73 confusion pairs had no answer-level differential effect. The prior engine reports, Gate B1 instrument records, final Esper/Yore architecture decision, certified identity records, current mapping source, Kanban state, and recent VM-551 handoffs were reviewed before remediation.

The authority chain used here is:

`certified identity truth → accepted CECOS/player-language evidence → approved B1 semantics → adjudicated mapping`

Certified placement/profile records establish what an identity means. Accepted Commander evidence establishes whether a situation and its wording are recognizable. It does not establish identity ownership. CECOS draft.4 at exact object `947bf45bf6a191839b5fb4fa6c65980ed9d5737e` requires observation/interpretation separation and source-role limits (lines 319–370), preservation of ambiguity (374–434), evidence before product (436–457), explicit false positives and neighboring experiences (459–483), and no construct invention merely to align an identity model (1895–1922; 1972–2016).

Historical and retired placement material was not used as mapping authority. It was eligible only as a search lead. No mapping below is justified by a retired question, legacy algorithm, faction label, color count, or prior manual route.

## Discrimination-first routing finding

`positiveTestBonus` was removed. Adaptive utility now comes only from symmetric answer-effect differences across the unresolved frontier. Neutral answers contribute zero. Pair metadata records coverage but cannot add utility. Stable question order and ID are the only tie-breakers.

The unchanged 40-rule baseline is frozen in `docs/reports/vm551-gate-b1-placement-engine/routing-unbiased-baseline.json`:

- candidate / primary / top-two / top-three reachability: **36 / 13 / 27 / 30**;
- routable direct / direct-not-reached / no-direct pairs: **41 / 9 / 73**;
- lens steps in 1,000 generated routing traces: **0**;
- leader-confirmation bonus: **absent**;
- metadata-only utility: **prohibited**.

The exhaustive bounded route search also proved the Yore/Glint lens unreachable under the unbiased 40-rule model. Lens eligibility remains enforced; no Yore-specific boost or metadata utility was added to manufacture access.

## Fifteen identities with zero naming evidence

The complete adjudication is in `zero-naming-identity-adjudication.tsv`. It includes certified JSON locators, current B1 rows/questions, Commander-language locators, counterexample limits, outcome, and mapping action for every identity.

| Outcome | Identities | Count |
|---|---|---:|
| Instrument change required | ABZAN, B, BR, G, JUND, MARDU, NAYA, R, RG, U, UB, W, WG, WU | 14 |
| Not cleanly observable | YORE | 1 |
| Existing mapping supported | — | 0 |
| Conjunctive naming supported | — | 0 |

No new directional mapping is authorized for these rows. The approved identity coverage matrix explicitly classifies the fourteen non-Yore identities as broad/family structural coverage with no direct identity-specific discriminator. Their existing questions observe real behavior, but the same behavior has documented neighboring uses. A conjunction of generic observations would reduce accidental one-answer naming, yet would not cure the missing identity-specific boundary; therefore no conjunctive rule was manufactured.

Yore remains `NOT_CLEANLY_OBSERVABLE`. C06/C09 describe engine structure and repeatability, not constructed agency. The optional lens remains a separate, secondary, non-scoring evidence class and cannot introduce or name Yore.

## Nine identities with existing naming evidence

The complete route adjudication is in `existing-naming-routing-adjudication.tsv`. The generic defect was an eligibility rule that rejected a bounded target when only one frontier identity was explicitly affected, even if its answer effects separated that candidate from every other frontier candidate. Eligibility now requires frontier overlap and positive differential utility. It does not require an explicit mapping on both sides and does not use rank, faction identity, leader status, or pair metadata as utility.

| Disposition | Identities | Count |
|---|---|---:|
| Responsible primary path restored by generic effect-based eligibility | GRIXIS, JESKAI | 2 |
| Naming target reached, but independent naming qualification remains insufficient | BANT | 1 |
| Naming question still loses or does not reach the single Question 8 slot | SILVERQUILL, SULTAI, TEMUR, UG, WB, WITCH | 6 |

Bant now reaches its bounded target, but its single mapped answer is not independently enough to name Bant: no second positive dependency/construct has approved directional authority. The remaining six are also not missing trigger mappings: each already has an approved naming trigger, but its blocker is frontier formation / Question 8 contention under the current one-targeted-question architecture. Promoting broad Hall observations to identity mappings merely to steer or qualify those questions would violate the authority chain. The engine retains bounded results and can recommend an unused approved target as post-reading refinement where eligible.

## Seventy-three no-direct confusion pairs

Every pair is individually traceable in `no-direct-confusion-pair-adjudication.tsv`. The cluster is assigned from the actual missing measurement condition, not from faction taxonomy:

| Cluster | Missing distinction | Disposition |
|---|---|---|
| `C1_YORE_NON_CLEAN_OBSERVABILITY` | Existing behavior cannot establish Yore's identity lens | Retain bounded; owner architecture decision required for any change |
| `C2_MONO_IDENTITY_NOT_SEPARATED_BY_BREADTH` | C15 separates breadth, not one mono identity from another | Retain bounded; identity-specific observation required |
| `C3_SHARED_CONSTRUCT_WITHOUT_DIFFERENTIAL_EFFECT` | Both identities share a construct but approved answers do not change relative support | Retain bounded; mapping or instrument authority required |
| `C4_SEPARATE_BROAD_CHANNELS_WITHOUT_DIRECT_BOUNDARY` | Different broad observations describe each side without directly comparing them | Retain bounded; direct boundary evidence required |

All 73 remain `BOUNDED_NO_DIRECT_DISCRIMINATOR`. Coverage metadata continues to document intended scope, but cannot turn identical answer effects into a discriminator.

## Responsible public naming contract

Every publicly named identity—primary, co-leader, close alternative, secondary, or tertiary—must independently satisfy:

1. behaviorally observable identity status;
2. an approved naming trigger/rule;
3. at least two independent positive dependency groups;
4. at least two positive observed constructs;
5. no disqualifying contradiction.

Qualification authorizes naming but adds no score. Alternatives do not need the primary's separation-from-runner-up threshold. Structural similarity, public rank, route affinity, and numeric second place are insufficient. The engine exposes satisfied rule IDs and a qualification record internally; existing public Gate A fields remain additive and unchanged.

The original 40 rules remain the `baseline_40` authority layer. The remediation overlay is separately versioned and currently contains **zero promotions**, because none of the 15 zero-naming rows met the authority threshold. This is a deliberate result, not an incomplete batch.

## Qualification correction to previously named close states

Applying the same qualification to every public identity exposed twelve additional prior close-state names that had one naming dependency but no second independently mapped positive construct: **BG, COLORLESS, DUNE, GLINT, INK, LOREHOLD, PRISMARI, QUANDRIX, UR, WITHERBLOOM, WR, and WUBRG**. Their complete disposition is in `responsible-naming-qualification-adjudication.tsv`.

These identities retain internal ranking and refinement usefulness, but they are no longer public names until a second independent positive observation is supported by authority. Their exact pair answer still matters; it simply cannot do two jobs at once by both creating and independently corroborating the placement.

Final responsible reachability is therefore:

- internal candidate frontier: **36/37**;
- responsible public candidate: **3/37**;
- responsible primary: **3/37**;
- responsible public top two: **3/37**;
- responsible public top three: **3/37**;
- responsible identities: **Esper, Grixis, Jeskai**.

This reduction is the intended consequence of the owner-approved naming contract, not a scoring regression to tune away.

## False-positive controls

- Generic control, sacrifice, recursion, artifacts, combat, theme, open mana, rebuilding, and setup tolerance remain observations, not identities.
- Color breadth can exclude an impossible breadth family only through its approved bounded role; it cannot name a mono color, guild, shard, wedge, college, or four-color identity.
- A question's competitor label and `pair_coverage` cannot contribute score or utility.
- One answer cannot satisfy public naming qualification.
- Neutral/conditional answers remain non-directional.
- Lens evidence remains separate from the behavioral ledger and cannot satisfy behavioral naming.
- A contradiction cannot become additional positive evidence.

## Owner decisions

Only irreducible authority or instrument decisions remain:

1. **Fourteen broad-only identities:** authorize separate evidence recovery to determine whether an existing question can be refined/replaced or a genuinely recurring construct is missing. Recommendation: do not promote current broad observations.
2. **Twelve formerly close-named identities:** obtain a second independent positive mapping or keep them bounded. Recommendation: do not weaken qualification or let the naming answer count twice.
3. **Six existing-naming route stalls:** decide whether post-reading refinement is sufficient or whether the one-targeted-question main-journey limit should be revisited. Recommendation: keep the eight-question main journey and evaluate the existing refinement contract before changing instrument architecture.
4. **Bant:** its target is now reachable, but independent corroboration is absent. Recommendation: treat it with the twelve qualification-blocked identities.
5. **Yore:** retain the approved non-clean-observability boundary unless new certified/player evidence supports a behavioral dimension. Recommendation: retain the boundary.
6. **Seventy-three bounded pairs:** choose clusters for future evidence work by product impact; do not convert coverage metadata into mappings. Recommendation: start with pairs involving otherwise nameable identities, then same-color and mono identity gaps.

No question, answer, construct, wording, stable ID, identity authority, UI, dossier, persistence, Matrix, Maze, scoring weight, or public confidence presentation changed in this adjudication.

# Loom Identity Lens v0 — evidence contract and research finding

## Disposition

**GO WITH CONDITIONS.** A Boros and a Lorehold expression can make different, useful, explainable choices over one unchanged W/R Commander pool. The proof is the difference between what the expression means and what it is allowed to do:

```text
hard query truth:  id<=wr f:commander  ──────────────── unchanged
requested function: draw / recovery / combat / etc. ─── primary relevance gate
explicit identity: none | Boros | Lorehold ──────────── bounded affinity + reason
```

This only earns trust if function relevance is protected, card facts are collected before explanation text, and a player can turn the expression off without altering eligibility.

## Repository pre-flight summary

- VM-592 established the shipped Commander-first W/R meaning: `id<=wr f:commander`. Its builder intentionally includes W/R subsets, including mono-white, mono-red, W/R, and colorless identities. `MazeQueryResult.query` remains the only executable-query contract.
- VM-591 froze a dormant semantic model where hard constraints, preferences, contexts, lenses, recommendation signals, and explanation provenance have separate roles. It explicitly says context does not imply query application and recommendation signals have `query_truth: false`.
- Boros raw source expresses public protection, peacekeeping, disciplined teamwork, and accountable immediate action. Its `commander_compass` calls combat/equipment/tokens auxiliary guidance and warns against generic aggression.
- Lorehold raw source expresses historical investigation, artifacts/tomes/spirits, fieldwork, and the tension of adventurous discovery with study/order. Its Commander material is likewise auxiliary product guidance.
- Neither raw packet authorizes direct ranking. Boros is Gate-3-remediated with generated artifacts stale until Gate 4; this research does not repair, regenerate, or promote either packet.
- `docs/research/maze-player-language/` already owns calibration vocabulary. The protected `corpus/vm578.zip` was not used; this package does not mint a competing language vocabulary.

Recent relevant work is VM-590 (Loom red-team), VM-591 (frozen semantic contract), and VM-592 (Commander-first usability). Do not touch Loom runtime, the frozen VM-591 schema, raw faction claims, generated faction artifacts, Placement, or the protected corpus archive.

## Evidence hierarchy and promise

| Evidence class | May support | May not support |
|---|---|---|
| Official worldbuilding | worldview, institution, direct setting affiliation | a card’s mechanical role or a global ranking weight |
| Official design intent | recurring/set-era mechanical expression and deliberate Boros/Lorehold contrast | permanent identity from a one-off Limited mechanic |
| Scryfall Oracle snapshot | card legality, identity, text, types, mechanics, zones | faction affinity or player taste |
| Existing Vox Mana raw packets | traceable local claim/source references and known limitations | a production affinity score merely because a field exists |
| Commander/population evidence | later behavioral calibration and discovery hypotheses | canon, worldview, or identity truth |
| Player language | wording and explicit user intent | unrequested inferred identity or query mutation |

The product promise should be: **“Your Commander colors decide what is eligible. Your selected expression may surface equally eligible cards that match how you want to play, and shows the evidence-based card traits behind that lift.”**

It must not promise that a card “is Boros” or “is Lorehold,” that the expression changed legality, or that it inferred identity from an Archscry reading.

## Shared W/R substrate versus differentiators

| Signal | Classification | Evidence strength / stability | Ranking role |
|---|---|---|---|
| Spot removal, combat tricks, haste, protection, token creation, Equipment, direct damage | Shared W/R substrate | Color-pie/card-fact; persistent but non-differentiating | Never identity evidence alone |
| Attacking with a coordinated team; growing/protecting that team; proactive intervention | Boros-weighted | Official institutional + Boros design; persistent/recurring | Deterministic bounded cue when card facts express it |
| Present-tense civic duty/accountability | Boros worldview | Official worldbuilding; persistent | Explanation/explicit-choice framing only; card text rarely entails it |
| Historic research, artifacts/tomes/spirits, recovery/replay, learning from prior resources | Lorehold-weighted | Official worldbuilding + recurring design | Deterministic bounded cue only where exact card fact implements recovery/history mechanics |
| Adventure/fieldwork and past-as-evidence | Lorehold worldview | Official worldbuilding; persistent | Explanation/explicit-choice framing only |
| Flashback; “leaves your graveyard” | Lorehold recurring implementation | 2021 and 2026 design; recurring, not exhaustive | Positive cue with a cap; never a sole identity test |
| Battalion, Mentor | Boros historical/recurring implementation | Historical, with Mentor later than Battalion | Positive card-fact cue; not required and never a direct affiliation proxy |
| Artifacts, Spirits, graveyards, combat, tokens | Strong overlap / ambiguous | Mechanical nouns are broad | Require an exact role pattern, not keyword/name matching |
| “Boros,” “Lorehold,” watermark, set code, flavor text alone | Direct affiliation / flavor only | Strong for literal affiliation, weak for off-plane mechanical affinity | Small separately displayed native-affiliation badge; flavor may never create a functional lift |

### Era stability

Boros’s setting role (protection through disciplined, coordinated action) is persistent. Battalion is era-specific; Mentor and team-combat patterns are recurring; generic speed/aggro is a shared W/R tendency and is too coarse to rank by itself. Lorehold’s history/archaeomancy/worldview is persistent. Graveyard departure and flashback are recurring 2021/2026 implementations, not exhaustive definitions. The 2026 material strengthens recovery/reuse as a current signal, but cannot turn `flashback = Lorehold forever` into a rule.

## Profiles for recommendation, not dossier replacement

### Boros

- **Worldview/purpose:** organized, accountable protection under present harm.
- **Temporal posture:** intervene now; develop a force that can act together.
- **Social/board posture:** coordinated attackers, leadership/team development, protection while acting.
- **Mechanical candidates:** attack-trigger team growth, multiple attackers, mentor, additional combat, protective effects bound to a creature/team, tactical threats that are also answers.
- **Anti-signals:** generic damage, solitary aggression, spectacle, conquest, or any haste card without a team/protection/action pattern.
- **Commander interpretation (inference):** someone selecting Boros may want a decisive, visible board plan with their creatures acting for one another; this is an explicit player-preference interpretation, not canon.

### Lorehold

- **Worldview/purpose:** active study of history through artifacts, sites, records, spirits, and discovery.
- **Temporal/resource posture:** previous cards/resources can be investigated, recovered, replayed, or transformed into present value.
- **Social/board posture:** cooperative expedition/research texture; not inherently slow or controlling.
- **Mechanical candidates:** card fact that recovers/recasts/replays an eligible card, cares about historic objects, rewards cards leaving the graveyard, or makes history/Spirit/artifact interactions operationally relevant.
- **Anti-signals:** bare graveyard mention, artifact type, Spirit type, Flashback keyword, or a relic-flavored name absent a matching card role.
- **Commander interpretation (inference):** someone selecting Lorehold may enjoy discovery and accumulating/recovering value, including cards outside Strixhaven; this does not promise a graveyard deck.

## Recommended v0 affinity contract

1. Retrieve the fixed legal universe from the selected hard query; do not alter, hide, or add query clauses for identity.
2. Apply the user’s explicit functional intent first. A candidate must pass the existing function/relevance classification before identity can help it rise.
3. Derive transparent, binary-or-enumerated card facts from Oracle/Scryfall and governed identity evidence. No LLM should author a card rationale or latent score.
4. Apply a **bounded affinity adjustment only inside a function-equivalent band**. Suggested initial cap: identity can order candidates with the same relevance tier; it cannot promote a lower-relevance card above a higher-relevance one solely on identity.
5. Record each uplift as independently inspectable contributions: `native_affiliation`, `mechanical_expression`, `worldview_explanation_available`, `flavor_texture`, `uncertainty`, and `anti_signal`. No public percentage is shown.
6. Show qualitative labels: **strong expression**, **clear expression**, **some overlap**, or **not enough evidence**. A low/anti-signal is an internal explanation state; public wording should say what the card does and why the selected expression did not move it.

An implementation should model affinity as a vector with source categories and caps, not one opaque score:

```text
affinity = function_guard
         + native_affiliation (separate, small)
         + exact_mechanical_expression (bounded)
         + optional flavor_texture (explanation only)
         - anti_signal (cannot hide a function match)
```

`function_guard` is a gate/invariant, not a numeric signal. The future implementation must retain each contribution and its source locator in the explanation payload. If a contribution lacks proof, it is omitted rather than replaced by generic prose.

### Why this is enough to prove H1–H8

- H1: the development pairs show different legitimate ordering in combat/protection versus recovery/history requests while query truth stays the same.
- H2: `Hero of Bladehold`, `Sevinne’s Reclamation`, `Teshar`, `Sun Titan`, and `Goblin Welder` make the proof depend on Oracle role rather than faction name or plane.
- H3: P01–P06 and P10–P12 require the functional match to remain first.
- H4: every proving-set explanation begins with an exact Oracle trait plus a source-led identity dimension.
- H5: `Sun Titan` and `Lorehold Command` are designed to remain legitimate overlap.
- H6: the anti-signals prevent generic W/R combat, artifacts, Spirits, or graveyards from pretending to be exclusive evidence.
- H7: the common abstraction is `identity profile → stability-tagged dimensions → sourced card facts → relevance-bounded affinity → explanation`; all five pairs are first-class research subjects and remain separately uncalibrated.
- H8: the source/affinity split enables one honest sentence: colors decide what appears; the selected expression changes what rises and why.

## Proving-set result

`proving-set.json` preserves the stopped-state W/R seed: 14 cards (8 development, 6 holdout) and 18 pairwise judgments (9/9). It is an architectural falsification seed, not an expanded five-pair proving corpus or statistically representative training set. The evidence maps and matrix establish the five-pair research frame, but the requested 120–180 card and 60–100 pairwise expansion remains an open owner-review condition.

The study supports different orderings for explicit function contexts. It does **not** support any claim about popularity, player satisfaction, calibrated magnitude, or unattended personalization. A production pilot needs a larger owner-reviewed adjudication set, sourced card classifications, and a blinded human acceptance check before the cap is tuned.

## VM-591 ownership recommendation

The final recommendation is **`PREFERENCE + RECOMMENDATION_HANDOFF`**, not `lenses[]`. Existing `lenses[]` are query-variant-oriented; placing a query-neutral expression there risks implying query application.

- `preferences[]`: one explicit `identity_expression` preference (`none` or a named expression) with `query_effect: ranking`, user-selected provenance, status, and evidence-profile version. It is never inferred from a dossier. `ranking` is downstream only: it creates no Scryfall clause, query variant, or membership change.
- `recommendation_handoff.classifications[]`: normalized card evidence dimensions and evidence class.
- `recommendation_handoff.signals[]`: deterministic affinity contributions with `query_truth: false`.
- `recommendation_handoff.explanation_provenance`: exact source/claim/card-fact locators.

The selection is **not** a hard constraint, query-changing context, or query variant. Passive Archscry/Placement/dossier context remains unapplied context; it may not prefill, hydrate, or infer this preference. Default is `none`.

## UX recommendation

The smallest honest mental model is a reversible control: **Expression: None / Boros / Lorehold** beneath, not inside, Commander colors. A short note states “Changes ordering, not eligibility.” A result might say:

> **Clear Lorehold expression** — recovers several kinds of cards from your graveyard, turning prior resources into a new hand.

The explanation names actual card behavior first. It should not say “85% Lorehold,” “this card is Lorehold,” or use an ungrounded personality explanation. Native affiliation can be visually distinct: “Lorehold-associated” describes provenance, while “fits your selected expression because…” describes a mechanically grounded reason.

## Red-team findings and guardrails

| Failure mode | Guardrail |
|---|---|
| Renamed Scryfall search / query mutation | Assert the same query and same candidate IDs for None/Boros/Lorehold. |
| “Boros = aggro” or “Lorehold = graveyard” | Require a shared-substrate classification, stability tag, anti-signal, and holdout counterexample for every deterministic cue. |
| Native branded card wins every time | Native affiliation is a small, separately displayed contribution and cannot pass the function gate alone. |
| LLM post-hoc rationale | Persist contribution IDs before rendering; template explanations from those IDs only. |
| Flavor/watermark false positives | Flavor can texture an explanation but cannot create a functional/ranking lift. |
| Bad function result rises because identity is selected | Cross-tier promotion is forbidden; add a deterministic witness for every new function family. |
| Artificial contrast | Allow equal affinity/overlap and an “insufficient evidence” result. |
| Passive dossier turns into personalization | Require explicit user selection; record `applied_to_query: false`. |
| Stale one-set mechanic becomes eternal truth | Add era stability to every profile signal and expire/re-review era-specific cues. |
| Scale turns into hand-authored weights | Keep profile evidence and feature extraction separate; expand only after pair-level validation for each new pair. |

## Alternatives rejected

- **Faction-name / watermark filter:** fails off-plane discovery and changes neither gameplay nor explanation honestly.
- **One scalar per identity:** hides evidence role, produces arbitrary tuning, and cannot show overlap.
- **Flavor embedding or LLM semantic ranker:** cannot guarantee a source-backed contribution or preserve the function gate.
- **Query-changing identity mode:** may be valuable later as an explicitly selected discovery mode, but contradicts this v0 proof’s same-universe question.
- **Passive Placement personalization:** lacks consent and confuses identity result with current card-search intent.

## Smallest next implementation story (proposal only)

**Title:** VM-next — Loom Identity Expression read-only five-pair proof adapter

**Purpose:** In a non-production/testable adapter, accept explicit `None | guild | college` over captured fixtures for all five pairs; prove identical candidate membership, relevance-bounded deterministic ordering, and contribution-first explanations.

**Acceptance criteria:**

1. Each of the five Commander fixtures has identical membership for None/guild/college, with a query-neutrality assertion.
2. The adapter accepts only explicit selection and emits structured source/card-fact contribution IDs; it does not use an LLM, dossier hydration, or Scryfall query mutation.
3. The development and holdout pairwise cases pass the function-relevance and overlap/anti-signal invariants.
4. Explanation templates render qualitative fit with contribution provenance and an explicit uncertainty/overlap path.
5. No Maze runtime, selector UI, parser, VM-591 schema, faction packet, Placement, or generated artifact changes occur.

**Explicit exclusions:** production ranking, UI, live data collection, all other identity pairs, popularity calibration, persistence, cross-face hydration, and automatic personalization.

## Research answers

1. **Meaningfully different recommendations?** Yes, only as relevance-preserving reordered results with evidence-backed reasons.
2. **Promise?** Expression changes affinity/order and explanation, never eligibility.
3. **Distinction?** Mechanical and canonical inputs are distinct; worldview is explanation scope; Commander attraction is labeled inference.
4. **Deterministic signals?** Exact, stability-tagged Oracle roles that implement sourced coordinated-action or recovery/history patterns.
5. **Explanation-only?** Worldview, flavor texture, and broad social/temporal posture.
6. **Too noisy?** Names, watermarks, set codes, bare types/keywords, popularity, generic W/R capabilities.
7. **Overlap?** Preserve it and say so; do not manufacture contrast.
8. **Anti-signals?** Restrict unsupported uplift; never suppress direct function relevance.
9. **Rerank or tie-break?** Bounded within relevance-equivalent bands initially.
10. **Modes?** One explicit combined expression mode now; later split playstyle/full identity only after separate evidence.
11. **User explanation?** Actual card action, selected expression’s supported dimension, and transparent “does not change eligibility.”
12. **Percentages?** No; use qualitative levels.
13. **VM-591 location?** Explicit `lens` plus recommendation-handoff classifications/signals/provenance.
14. **Explicit versus passive?** Explicit selection is required; passive context is unactioned context only.
15. **Generalization?** The model generalizes structurally, not semantically, pending per-pair proof sets.
16. **Existing data?** Query/builder truth, raw faction claims/sources, VM-591 seams, Scryfall snapshot/index pipeline, player-language vocabulary.
17. **New data?** Versioned identity-profile evidence, card-feature extraction/classification, adjudicated pair sets, explanation templates, calibration telemetry only with consent.
18. **Maintenance?** Signal stability review per relevant set, snapshot refresh, source ledger upkeep, regression judgments, and stale-evidence expiry.
19. **Misleading/gimmicky risks?** Query mutation, irrelevant themed cards, opaque weights, faction stereotypes, and unconsented dossier inference.
20. **Genuine utility?** Unexpected off-plane cards may rise because their real card roles fit a stated play expression while still satisfying the requested function.

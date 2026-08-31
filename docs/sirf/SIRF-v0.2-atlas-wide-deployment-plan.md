# SIRF v0.2 — Semantic Integrity & Repair Framework
## Atlas-Wide Deployment Plan for the Remaining 34 Vox Mana Identities

Version: 0.2  
Status: Deployment-ready draft  
Calibration identities complete: WUBRG, Temur, Lorehold  
Remaining target identities: 34  
Primary system components:

- SIRF semantic integrity framework
- VM-595 language-trust analyzer
- RobQA closed repair loop
- identity-specific semantic contracts
- rendered contract verification
- Native > Exact > Stretch recommendation integrity
- source-owned repair discipline
- Owner Review gates

---

# 1. Mission

SIRF v0.2 exists to make the remaining Vox Mana identities trustworthy, useful, distinct, and launch-ready without forcing the Owner to repeatedly discover the same semantic and product defects manually.

The framework must be capable of:

1. loading the audits and governed identity material already present in the repository;
2. checking the current rendered product against that material;
3. verifying uncertain claims against official Magic sources;
4. classifying defects as P0–P3;
5. identifying the true owner of each defect;
6. repairing the source/model/composer/runtime rather than patching visible symptoms;
7. regenerating derived artifacts through their builders;
8. validating the actual rendered product;
9. running the VM-595 language-trust checks;
10. repeating the repair cycle until the identity converges or hits a defined blocker;
11. explaining every material fix and why it was correct;
12. protecting the repaired behavior against regression;
13. moving through the remaining 34 identities with minimal Owner digging.

The central operating principle is:

> Fix the owner of the wrong meaning, not the place where the wrong sentence happened to appear.

The second central principle is:

> Correct source data is necessary but insufficient. SIRF must prove that the accepted meaning survives every downstream transformation and that the final assembled page is useful to the player.

---

# 2. Why v0.2 Exists

SIRF v0.1 established the evidence hierarchy, semantic layers, section ownership, P0–P3 model, RobQA loop, and the need to validate the rendered product.

The WUBRG, Temur, and Lorehold calibration cycles exposed additional failure modes that must now become generic framework behavior.

## WUBRG lesson

Correct semantic boundaries can still produce a poor product when the page becomes defensive and repetitive.

Example failure pattern:

- no universal role;
- no universal emotional pressure;
- no universal lore role;
- depends on the deck.

All statements may be correct independently while the assembled page stops helping the player.

Generalized lesson:

> Keep qualification in metadata and guardrails; use rendered prose to teach the player something useful.

## Temur lesson

Correct authored classification can still disappear downstream.

Temur Roar was correctly related to Temur in the repaired source chain, but a shared editorial de-duplication filter removed it before render because Eshki also appeared elsewhere.

Generalized lesson:

> Semantic relationships must survive filtering, de-duplication, ranking, composition, and rendering.

## Lorehold lesson

Correct curated taxonomy can still be expanded downstream.

Lorehold had three approved primary lanes, but the Start Here composer appended legacy `Spirit Tribal` from old archetype fallback data.

Generalized lesson:

> When an identity has an explicit curated semantic set, the final rendered set must equal the accepted set. Fallback data may not append extra meaning unless augmentation is explicitly authorized.

Together these produce the primary v0.2 expansion:

> SIRF must protect not only what meaning is authored, but also what downstream systems remove, add, repeat, reorder, duplicate, or over-explain before the player sees it.

---

# 3. Routine Player-Facing Scope

The atlas-wide cleanup is deliberately bounded.

Routine player-facing tuning is limited to:

1. Start Here
2. Test the Fit
3. How This Plays
4. Precon Starting Points
5. What to Look For

These are the five surfaces SIRF should tune across the remaining 34 identities.

The loop may inspect and repair upstream owners when these surfaces are wrong.

Upstream repair reach may include:

- identity.md
- metaphysics.md
- governed source ledgers
- governed claim ledgers
- raw faction/profile data
- identity layers
- faction relationship fields
- precon source
- source schema
- builders
- dossier source
- generated catalogs
- shared composers
- recommendation filters
- ranking/de-duplication
- runtime selectors
- renderer
- stale artifact/cache paths

This creates an important scope rule:

> Only five rendered sections are routine tuning targets, but any confirmed upstream owner necessary to make those sections correct may be repaired.

Do not rewrite unrelated dossier sections merely because the loop is active.

---

# 4. Evidence Policy

SIRF must not send Codex on a broad internet research project for every identity.

Use the repository’s existing governed evidence first.

External verification is only required when:

- an existing claim conflicts with the rendered product;
- a P1/P2 repair requires factual confirmation;
- the governed evidence is incomplete or contradictory;
- a current source is disallowed or weak;
- a product/commander/mechanic fact needs authoritative verification.

## 4.1 Allowed primary sources

Use:

1. official Wizards / Magic pages;
2. Mark Rosewater / Making Magic;
3. official Planeswalker's Guides;
4. official Magic Story;
5. official mechanics articles;
6. official release notes;
7. official product/decklist pages;
8. official card data / Gatherer;
9. verified local captures of the above.

## 4.2 Permitted secondary fallback

Only:

https://mtg.wiki/

Use mtg.wiki only when:

- first-party evidence cannot reasonably establish the claim;
- the page consolidates useful canonical information;
- the reason for fallback is recorded;
- its official citation is followed upstream where practical.

## 4.3 Not valid for identity/metaphysics truth

Do not use these to establish identity, philosophy, lore, or metaphysics:

- Reddit
- EDHREC
- Draftsim
- YouTube
- blogs
- Substack
- Moxfield
- community forums
- SEO articles
- AI-generated summaries
- Vox Mana generated output
- Vox Mana taxonomy validating itself

These may remain useful for:

- Commander discovery;
- catalog support;
- operator/player-language context;
- community sentiment;
- non-canonical recommendation enrichment.

They may not prove doctrine.

---

# 5. Semantic Layer Model

Every substantive claim must conceptually belong to one semantic layer.

## 5.1 Official Fact

Rules, colors, faction membership, commander/product facts.

## 5.2 Official Design Commentary

Designer explanation of color philosophy, mechanics, faction design, intended expression.

## 5.3 Official Lore

Worldbuilding, characters, history, locations, institutions, cosmology.

## 5.4 Official Mechanical Design

Mechanics directly tied to a faction, color combination, era, or product.

## 5.5 Strongly Supported Inference

A conclusion supported by primary evidence but not stated directly as doctrine.

## 5.6 Vox Mana Interpretation

Deliberate Vox Mana reading.

Examples already accepted:

- Survival Through Attunement
- Full-Spectrum Integrator
- History Fighting Back

These are valuable.

They must not be silently elevated into official Magic doctrine.

## 5.7 Archetype / Taxonomy

Reusable deck-expression category.

An archetype is not the identity itself.

## 5.8 Commander Guidance

Deckbuilding and search direction.

Examples:

- ramp;
- spells/copying;
- typal;
- artifact recursion;
- graveyard value.

## 5.9 Placement / Recommendation Logic

Signals used for routing or ranking.

Placement usefulness is not evidence of canonical meaning.

## 5.10 UX / Visual Metaphor

Animation, motion, translation hooks, narrative UI metaphors.

UX metaphor must not become metaphysical evidence.

---

# 6. Player-Language Principle

The content model should carry semantic qualification.

The player-facing prose should carry useful meaning.

Core rule:

> Never make the player carry epistemic machinery that the data model can carry for them.

Internal metadata may record:

- OFFICIAL_FACT
- OFFICIAL_DESIGN_COMMENTARY
- OFFICIAL_LORE
- VOX_MANA_INTERPRETATION
- COMMANDER_EXPRESSION
- ARCHETYPE
- CONDITIONAL
- TIMELINE_SCOPE
- PRODUCT_SCOPE
- SOURCE_IDS
- CLAIM_IDS

Rendered copy should not repeatedly say:

- Officially...
- Vox Mana interpretation...
- not universal...
- not proof of...
- verified...
- cataloged...
- recorded...

unless the qualifier is necessary to prevent material misunderstanding.

Example:

Bad rendered copy:

> Vox Mana play interpretation: the tension between building strength, assessing the moment, and acting decisively can create pressure. It is not a universal Temur table fact.

Better rendered copy:

> Pressure comes from not knowing which advantage will become decisive first: board strength, accumulated mana, held interaction, or an explosive spell turn.

The metadata retains the interpretation boundary.

---

# 7. Frozen Section Contracts

Each of the five scoped sections must have one primary responsibility.

## 7.1 Start Here

Question:

> What can I build from this identity?

Must provide:

- distinct broad Commander lanes;
- actionable help choosing where to begin building;
- no one-size-fits-all sequence unless canonically/structurally warranted.

Must not primarily explain metaphysics.

## 7.2 Test the Fit

Question:

> Does this identity actually match the deck or experience I want?

Must provide:

- positive fit;
- useful tension;
- false-positive boundary.

Must not become a mandatory checklist.

## 7.3 How This Plays

Question:

> How can this identity translate into table behavior?

Must provide:

- useful role translation;
- conditional opponent read;
- emotional/table pressure;
- lore translation;
- mechanical expression;
- table experience and behavior.

Must describe how the identity manifests at the table rather than repeat Start Here construction advice.

Must not become a list of disclaimers.

## 7.4 Precon Starting Points

Question:

> What real products give me useful starting points?

Must distinguish:

Native
> Exact-color
> Stretch

where a faction/college relationship exists.

For structural color identities such as WUBRG, exact color may itself be the primary relationship.

Each recommendation must add concrete recorded product and actual game-plan information rather than repeat its relationship badge.

## 7.5 What to Look For

Question:

> Which recognizable lanes, patterns, or archetypes should I notice?

Must align with Start Here.

Primary taxonomy must not diverge between these two sections.

Start Here and What to Look For must use the same curated taxonomy when one exists, but they must not contain identical explanatory content:

- Start Here helps the player choose a lane;
- What to Look For defines how to recognize that lane or pattern.

---

# 8. New v0.2 Rule — Rendered Contract Fidelity

This is a first-class acceptance gate.

For curated semantic sets, rendered output must equal the accepted contract.

Not:

expected items are somewhere upstream.

Not:

expected items are a subset of rendered items.

Required:

> expected rendered set = actual rendered set

Examples:

Lorehold:

Expected:

- Spirit Witnesses / Graveyard-Leaves
- Relic Reconstruction
- History & Spells

Actual must contain exactly those primary lanes.

Not:

those three plus Spirit Tribal.

Temur:

Expected Native precon:

- Temur Roar

Actual must show Temur Roar as Native, not merely contain the relationship upstream.

## 8.1 Required positive assertions

Assert approved items are present.

## 8.2 Required negative assertions

Assert deprecated/unapproved items are absent.

## 8.3 Required ordering assertions

Where ordering carries meaning:

Native before Exact before Stretch.

## 8.4 Required exclusivity assertions

A Native precon must not also appear as Exact or Stretch.

---

# 9. New v0.2 Rule — Curated Beats Fallback

Fallback data is for missing authority.

It is not authorized to augment explicit curated meaning by default.

General contract:

## If curated set exists

Render curated set only.

## If curated set does not exist

Use governed fallback.

This applies to any system that may combine:

- starterDirections;
- archetypes;
- tags;
- recommendations;
- mechanic families;
- taxonomy entries;
- precon groups;
- search seeds.

Fallback augmentation must be explicitly authorized.

The default is no augmentation.

---

# 10. New v0.2 Rule — Semantic Preservation Through Filters

Important relationships must survive downstream transformation.

For each curated/semantic relationship, verify survival through:

- filtering;
- editorial de-duplication;
- ranking;
- sorting;
- grouping;
- composer fallback;
- catalog normalization;
- runtime selection;
- renderer.

Temur Roar is the reference case.

Native was correct in source but removed by a downstream editorial de-duplication filter.

The final system must protect:

> authored Native relationship survives all downstream filters.

---

# 11. Recommendation Relationship Model

## 11.1 Native

Explicit authored relationship to the identity.

Examples:

- Temur Roar → TEMUR
- Lorehold Spirit → LOREHOLD
- Lorehold Legacies → LOREHOLD

Native outranks color coincidence.

## 11.2 Exact-color

Same color identity but no authored faction relationship.

Generic GUR is not Temur.

Generic RW is not Lorehold.

## 11.3 Stretch

Nearby color identity and/or mechanical adjacency.

Stretch is explicitly outside exact identity.

## 11.4 Structural identity exception

For WUBRG, exact W/U/B/R/G is meaningful because the identity itself is structural.

Do not invent a fake Native category where it does not semantically apply.

---

# 12. New v0.2 Rule — Surface Information Gain

Every visible block must add a new player decision or understanding.

RobQA must ask:

> What new decision or understanding does this block give the player?

If the answer is none, the block is redundant.

Examples:

Bad precon rationale:

> This deck shares the reading's Blue, Red, and Green color identity.

The badge already says Exact-color.

This adds no decision value.

Better:

Use the existing cataloged `mainStrategy`.

Example:

- spell copying;
- go-wide tokens;
- artifact sacrifice;
- big creatures.

This teaches what the deck actually does.

## 12.1 Section-level information gain

Opening:

identity thesis.

Start Here:

build choices.

Test the Fit:

suitability/boundary.

How This Plays:

table translation.

What to Look For:

lane definitions.

Precons:

concrete product examples.

## 12.2 Mandatory Acceptance Gate — Cross-Section Redundancy

For every identity, RobQA must compare the five scoped player-facing sections in the actual rendered dossier:

1. Start Here;
2. Test the Fit;
3. How This Plays;
4. Precon Starting Points;
5. What to Look For.

For each section, record:

- its principal responsibility;
- its principal claim;
- its mechanics or theme inventory;
- the player decision it supports;
- the unique information it contributes.

FAIL the identity when two sections communicate substantially the same claim for substantially the same purpose, even when:

- wording differs;
- synonyms are used;
- sentence order changes;
- one paragraph is shorter;
- exact-string or Jaccard similarity remains below the automated threshold.

Repeated terms are not automatically defects. A core term may appear in multiple sections when each occurrence performs a different section responsibility. For example:

- a mechanic may appear in Start Here as a build lane and in How This Plays as table translation;
- a precon may appear as a concrete example without becoming identity proof;
- a lore concept may support Test the Fit without being repeated as the full Start Here plan.

The failure condition is:

> Two visible blocks give the player substantially the same decision or understanding.

### Required repair behavior

When cross-section redundancy is found:

1. determine which section owns the repeated concept;
2. preserve the concept in its correct owner;
3. remove or rewrite the redundant occurrence;
4. identify the unique responsibility of the now-thinner section;
5. replace removed repetition with the nearest existing source-grounded detail that serves that section;
6. do not invent filler;
7. regenerate affected artifacts through their owners;
8. rerender the complete dossier;
9. rerun the scoped VM-595 checks;
10. repeat until every section adds distinct player value or a defined stop condition applies.

This gate preserves both governing rules:

> Every visible block must add a new player decision or understanding.

> If removing repetition creates an empty surface, replace it with the nearest existing source-grounded detail—not invented prose.

### Required positive and negative acceptance evidence

The RobQA report must include this compact section-role matrix for each identity:

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|
| Start Here | Choose a broad build lane and begin construction | identity-specific | distinct build choice | PASS / FAIL |
| Test the Fit | Establish fit, internal tension, and false-positive boundary | identity-specific | distinct suitability judgment | PASS / FAIL |
| How This Plays | Translate the identity into table behavior | identity-specific | distinct play-experience understanding | PASS / FAIL |
| Precon Starting Points | Show concrete recorded products and their actual game plans | identity-specific | distinct product/strategy decision | PASS / FAIL |
| What to Look For | Define the distinct lanes and patterns named by the identity | identity-specific | distinct recognition rule | PASS / FAIL |

PASS requires:

- every section has a distinct primary responsibility;
- no unresolved same-purpose semantic duplication remains;
- Start Here and What to Look For remain taxonomically aligned without becoming copies;
- Precon rationale adds strategy/product information rather than repeating badges;
- How This Plays describes table behavior rather than repeating Start Here construction advice.

---

# 13. New v0.2 Rule — Source-Grounded Replacement

When repetition is removed and a surface becomes too empty:

> Replace the removed information with the nearest existing source-grounded detail, not invented filler.

Repair sequence:

1. identify redundant content;
2. remove it;
3. inspect governed existing data;
4. choose the nearest useful field;
5. render that field;
6. do not invent prose merely to fill space.

Temur precon rationale is the reference implementation.

Removed:

redundant color identity explanation.

Replaced with:

existing `mainStrategy`.

This rule should be applied across all 34 identities.

---

# 14. Claim-Level Provenance

Attaching an official URL to a record does not validate all prose attached to the record.

Lorehold Osgir exposed this.

The source was rebound from third-party evidence to an official Wizards decklist, but inherited community-style prose remained:

- praised;
- major power upgrade;
- evaluative claims.

New rule:

> Provenance validation must operate at the claim/rationale level, not only the URL/source-record level.

For every material rationale:

- identify the claim;
- identify the source;
- determine whether the source entails the claim;
- downgrade/remove unsupported evaluation.

---

# 15. Terminology Collision Guard

Normal English may collide with actual Magic rules/design terminology.

Lorehold reference case:

historic
vs
historical

New rule:

> When ordinary prose uses a term that is also a defined Magic mechanic, batch, keyword, ability word, rules term, card type, or game concept, verify that the intended meaning matches the official term.

Potential examples beyond Lorehold may include:

- historic;
- devotion;
- discover;
- investigate;
- learn;
- venture;
- partner;
- domain;
- threshold;
- affinity;
- prowess;
- revolt;
- spectacle;
- exploit;
- raid.

Do not automatically rewrite these terms.

Flag only when the natural-language use creates actual semantic ambiguity.

---

# 16. Card Affiliation vs Product Inclusion

Being included in a faction precon is weaker evidence than direct faction affiliation.

Lorehold demonstrated this.

New classification:

## Direct affiliation

- watermark;
- explicit faction character;
- official named identity;
- official school/guild/clan connection.

## Product-original relationship

Created specifically for a native faction product and explicitly tied to it.

## Mechanical support

Supports the deck/faction mechanic but is not identity proof.

## Product inclusion only

Appears in the product.

## Same-color only

Shares colors.

SIRF should use this distinction when a card or Commander example is being used to justify:

- identity;
- lane;
- mechanic;
- lore;
- precon rationale.

---

# 17. VM-595 Language Trust Integration

VM-595 remains the horizontal detector.

Do not duplicate its functionality.

It currently detects:

- exact duplicate sentences;
- identity-substitution patterns;
- repeated openings;
- synthetic cadence;
- Jaccard similarity;
- within-dossier redundancy;
- section-role overlap;
- utility-copy dominance;
- process-language leakage;
- malformed grammar and composition.

VM-595 is a detector, not the complete semantic judgment. A low automated similarity score does not prove that section roles are separated. RobQA must still compare the actual rendered sections as one page and judge the player-facing information gain.

The combined acceptance gate is:

> VM-595 detection + section-role contract + rendered semantic comparison + information-gain review.

System relationship:

VM-595 = detector

SIRF = decision and ownership framework

RobQA = closed-loop verifier/remediator

---

# 18. Language-Trust Checks

## 18.1 Cross-identity cadence

Watch for universal identity-specific frames:

- This may fit if
- This is less likely to fit when
- Pressure through
- Opponents feel the deck

One instance may be fine.

Atlas-wide saturation is a trust defect.

## 18.2 Composer burden

Shared UI instruction may remain shared.

Shared identity interpretation is usually a defect.

## 18.3 Section-role collision

Start Here and How This Plays should not repeat the same sequence/mechanics/worldview.

## 18.4 Process-language leakage

Watch:

- officially
- verified
- cataloged
- recorded
- not universal
- not proof
- Vox Mana interpretation

## 18.5 Utility-copy dominance

Precon/Mana Notes text should not overwhelm identity-specific content.

## 18.6 Grammar/composition

Catch:

- when if
- duplicate punctuation
- repeated Start / Start here
- duplicate Commander
- awkward `when X is not Y`
- valid fragments composed into bad syntax

Composer-generated defects should be repaired at the composer.

---

# 19. Semantic Integrity Rubric

Each identity is scored 0–2.

2 = PASS  
1 = REPAIR  
0 = FAIL

## R1 — Factual Accuracy

Are claims true?

## R2 — Provenance Integrity

Are claims traceable and source-entailment sound?

## R3 — Semantic Altitude

Are canon, lore, interpretation, Commander guidance, placement, and UX metaphor separated?

## R4 — Universality

Are conditional/archetypal claims incorrectly universalized?

## R5 — Timeline / Product Scope

Are claims assigned to the correct era/product?

## R6 — Mechanical Classification

Are mechanics correctly classified?

## R7 — Commander Boundary

Does Commander guidance remain distinct from identity truth?

## R8 — Taxonomy Consistency

Do Start Here and What to Look For align?

## R9 — Recommendation Integrity

Are Native / Exact / Stretch and face commanders correct?

## R10 — Section Ownership

Does each section perform one distinct primary job, with a recorded principal claim and player decision?

## R11 — Player Usefulness

Does each section add a new player decision or understanding?

## R12 — Copy Quality

Does the prose read naturally?

## R13 — Cross-Identity Cadence

Does the identity sound distinct rather than templated?

## R14 — Composer Burden

Is shared prose only used where shared prose belongs?

## R15 — Section-Role Collision

Do any two scoped sections communicate substantially the same claim for substantially the same purpose, regardless of wording or automated similarity score?

## R16 — Process-Language Leakage

Is internal trust machinery unnecessarily visible?

## R17 — Utility-Copy Dominance

Is database/interface explanation overwhelming identity content?

## R18 — Rendered Contract Fidelity

Does visible output exactly match accepted sets, exclusions, and ordering?

## R19 — Surface Information Gain

Does every visible block contribute unique, section-owned information, with source-grounded replacement when repetition is removed?

The Cross-Section Redundancy Gate strengthens R10, R11, R15, and R19. It does not add another scored rubric dimension.

Maximum score: 38

Score is secondary to severity.

Any unresolved P0 or P1 blocks completion.

---

# 20. Severity Model

## P0 — Evidence / Architecture Violation

Examples:

- generated output used as upstream evidence;
- runtime strengthens interpretation into doctrine;
- source authority reversed;
- curated set cannot survive its producer chain;
- generated artifacts cannot be reproduced;
- wrong owning layer.

P0 blocks completion.

## P1 — Material Factual / Product Error

Examples:

- wrong commander;
- wrong product;
- missing Native;
- wrong mechanic;
- wrong timeline;
- wrong faction relationship;
- terminology misuse that changes factual meaning.

P1 blocks completion.

## P2 — Semantic / Responsibility Defect

Examples:

- optional archetype universalized;
- generic same-color play treated as identity;
- taxonomy mismatch;
- extra fallback lane appended to curated set;
- over-defensive copy that materially harms player meaning;
- Commander mechanic projected into lore;
- one product generalized into doctrine.

P2 should be repaired before launch.

## P3 — Presentation / Polish

Examples:

- duplicate punctuation;
- repeated instruction;
- rigid wording;
- semicolon-heavy prose;
- process-language leakage;
- generated cadence;
- minor grammar.

Known visible P3 should not intentionally ship.

---

# 21. Root-Cause Requirement

No material fix without naming root cause.

Possible owners:

- source evidence
- source ledger
- claim ledger
- identity.md
- metaphysics.md
- raw faction/profile
- identity layer
- factionRefs
- precon source
- schema
- builder
- generated catalog
- dossier source
- shared composer
- editorial de-duplication
- recommendation filter
- ranking
- runtime selector
- renderer
- stale artifact
- stale cache
- utility composer
- grammar composition

The QA report must identify the actual owner.

---

# 22. Bounded RobQA Repair Authority

## 22.1 RobQA may directly repair P3

Examples:

- punctuation;
- duplicate language;
- repeated instructions;
- obvious grammar;
- audit-language leakage;
- obvious taxonomy label drift where semantic contract is frozen.

## 22.2 RobQA may repair proven P2

Only when the accepted semantic contract already determines the correct answer.

Examples:

- optional archetype rendered as universal;
- Start Here vs What to Look For mismatch;
- unapproved fallback lane appended;
- Commander expression rendered as lore;
- repetitive section composition.

## 22.3 RobQA may repair proven P1 implementation defects

Only when:

- authoritative evidence is definitive;
- the root cause is demonstrated;
- the owning source is known.

## 22.4 RobQA must not invent uncertain semantics

If ambiguity remains:

- inspect governed evidence;
- verify with permitted official source;
- classify;
- repair only if supported.

Otherwise stop with blocker.

---

# 23. Standard Repair Order

Always:

## Gate 1 — P0

Fix provenance/architecture.

## Gate 2 — P1

Fix factual/product defect at owner.

## Gate 3 — P2

Fix semantic ownership and taxonomy.

## Gate 4 — Regenerate

Use owning builders.

## Gate 5 — Deterministic QA

Run focused tests.

## Gate 6 — Rendered Contract QA

Validate final visible sets, exclusions, ordering, and copy.

Apply the mandatory Cross-Section Redundancy Gate to the complete rendered dossier. Record the section-role matrix, not only lexical similarity results.

## Gate 7 — P3

Polish.

## Gate 8 — VM-595 Rescan

Check trust metrics.

---

# 24. Rendered Product Rule

Tests are necessary but insufficient.

Required:

> The actual dossier rendered through the Owner-facing path must match the accepted semantic contract.

For every curated list:

- expected items present;
- unapproved items absent;
- ordering correct;
- classification correct;
- no duplicate groups.

For every section:

- content role correct;
- information gain positive;
- no repeated thesis.

---

# 25. Golden Regression Contracts

Shared code changes must protect three calibration identities.

## 25.1 WUBRG

Must preserve:

- access to all five colors;
- no universal WUBRG philosophy;
- integration and access models both legitimate;
- Full-Spectrum Integrator optional;
- Rainbow Payoffs consistent;
- Domain nonexclusive;
- no superiority/completion/mastery;
- player copy useful rather than defensive.

## 25.2 Temur

Must preserve:

- Green-centered;
- savagery;
- Ferocious = Khans;
- Formidable = Atarka;
- Survival Through Attunement optional;
- generic GUR insufficient;
- Temur Roar Native first;
- Native survives de-duplication/filtering;
- Start Here = What to Look For primary taxonomy;
- no source-audit prose leakage.

## 25.3 Lorehold

Must preserve:

- archaeology/history center;
- Red/White preservation/discovery tension;
- primary lanes exactly:
  1. Spirit Witnesses / Graveyard-Leaves
  2. Relic Reconstruction
  3. History & Spells
- no generic Spirit Tribal primary lane;
- no Boros Artifacts primary lane;
- `historic` not misused;
- history fighting back remains Vox Mana play language;
- Lorehold Spirit and Lorehold Legacies Native first;
- exact RW remains separate;
- shared fallback cannot append extra primary lanes.

---

# 26. Semantic Contract Files

Each identity should eventually have a compact machine-readable contract.

The contract is the future QA authority for accepted semantic boundaries.

Suggested schema:

- identity_key
- display_name
- colors
- identity_type
- canonical_anchor
- official_design_claims
- official_lore_claims
- interpretation_claims
- timeline_or_product_guards
- primary_start_here_lanes
- what_to_look_for_lanes
- allowed_secondary_expressions
- prohibited_primary_lanes
- commander_not_identity
- false_positive_guardrails
- native_precons
- exact_color_rule
- stretch_rule
- mechanical_classification
- terminology_guards
- recommendation_guards
- rendered_exclusions
- source_ids
- claim_ids

Do not over-engineer immediately.

For the remaining 34, contracts may be generated progressively from accepted audit material.

---
# 27. Deployment Strategy for Remaining 34

Do not launch 34 simultaneous autonomous edits.

Use controlled batches.

Recommended batch size:

3–5 identities.

Reason:

- enough to reveal shared composer issues;
- small enough to review failures;
- reduces worktree collision;
- makes shared root causes obvious before they replicate across the atlas.

---

# 28. Deployment Phase 0 — Reconcile Current Worktree

Before atlas deployment:

1. close or reconcile concurrent WUBRG / Temur / Lorehold cards;
2. reconcile VM-595 owner-path/runtime drift;
3. restore a trusted shared baseline;
4. rerun the global VM-595 analyzer;
5. rerun golden WUBRG / Temur / Lorehold regressions;
6. confirm generated artifacts are current;
7. record baseline SHA and worktree state.

Do not begin 34-identity repair on an ambiguous dirty shared runtime baseline.

If the repository intentionally remains multi-card dirty, establish:

- exact protected paths;
- exact concurrent owners;
- exact allowed overlap.

---

# 29. Deployment Phase 1 — Shared VM-595 Field-Role Consolidation

Before bespoke identity loops, address broad shared defects whose ownership is already proven.

VM-595 reported likely shared families including:

- universal fit framing;
- universal boundary framing;
- Pressure through;
- Opponents feel the deck;
- generic instructional prose;
- mono grammar defects;
- utility-copy dominance;
- precon explanation patterns.

For every shared candidate:

1. classify semantic owner;
2. determine whether it is legitimate shared UI language;
3. determine whether it performs identity-specific work;
4. fix shared composer only when ownership is proven;
5. rerun golden three;
6. render affected sample identities;
7. rerun VM-595.

Do not rewrite all identities individually when one composer owns the defect.

---

# 30. Deployment Phase 2 — Diversity Validation Batch

Before all 34, run v0.2 against a small diversity sample.

Use:

- one mono-color;
- one guild;
- one other shard/wedge.

Choose identities with relatively strong governed evidence and differing architecture.

Purpose:

- validate SIRF against identity types not represented by WUBRG/Temur/Lorehold;
- detect mono-specific issues;
- detect guild/faction-specific relationship issues;
- detect another multicolor synthesis pattern;
- confirm shared fixes did not flatten voice.

If a new defect family appears, update framework before full rollout.

---

# 31. Deployment Phase 3 — Remaining Atlas Batches

After diversity validation, process remaining identities in batches of 3–5.

Operate by exception: RobQA autonomously repairs ordinary, clearly owned P2/P3 redundancy and advances the batch when all gates pass. Owner review is reserved for the explicit ambiguity, authority, golden-semantic, and non-convergence stop conditions in this plan.

Suggested grouping strategy:

## Group by identity type

Possible batches:

- remaining mono-colors;
- guilds;
- Strixhaven colleges;
- shards;
- wedges;
- other special identities;
- remaining structural/metaphysical identities.

Grouping similar identities increases the chance that shared root causes appear once and can be fixed once.

Do not force exact batch taxonomy if repository organization differs.

---

# 32. Per-Identity Loop

For each identity:

## Pass 0 — Load Baseline

Load:

- existing audit/research;
- source/claim ledgers;
- identity.md;
- metaphysics.md;
- raw faction/profile;
- current five-section rendered content;
- existing semantic contract if available;
- VM-595 findings for that identity.

## Pass 1 — Inspect

Inspect only:

- identity;
- metaphysics;
- faction/raw profile;
- Start Here;
- Test the Fit;
- How This Plays;
- Precon Starting Points;
- What to Look For.

## Pass 2 — Detect

Apply:

- R1–R19 rubric;
- VM-595 trust checks;
- recommendation relationship checks;
- taxonomy equality;
- terminology collision checks;
- rendered contract checks;
- information gain checks.

## Pass 3 — Classify

Assign:

- P0
- P1
- P2
- P3

and owner.

## Pass 4 — Verify Evidence

Use existing governed evidence first.

Only perform official-source verification for unresolved/contested claims.

## Pass 5 — Repair Owner

Repair source/model/composer/filter/runtime.

Do not patch renderer unless renderer is owner.

## Pass 6 — Regenerate

Use builders.

## Pass 7 — Deterministic QA

Run:

- semantic readiness;
- source/claim validation;
- relevant builder `--check`;
- identity-specific regression;
- recommendation tests;
- syntax/lint;
- diff check.

## Pass 8 — Rendered QA

Render real dossier.

Verify:

- five scoped sections;
- expected set equality;
- exclusions;
- ordering;
- information gain;
- section roles;
- the required Cross-Section Redundancy Gate matrix;
- semantic separation even when VM-595 lexical similarity is low.

## Pass 9 — VM-595 Rescan

Check:

- duplication;
- cadence;
- process tone;
- grammar;
- utility dominance;
- section overlap.

## Pass 10 — RobQA Repair

Repair proven remaining P1–P3.

## Pass 11 — Repeat

Maximum 3 cycles.

## Pass 12 — Batch Acceptance or Exception

Return a concise reasoned report. When all gates pass, advance the identity into the batch without a routine Owner pause. Escalate only under the controlling stop conditions.

---

# 33. Three-Cycle Guard

Maximum autonomous repair cycles per identity:

3

If unresolved after cycle 3:

- P0;
- P1;
- conflicting official evidence;
- semantic ambiguity;
- repeated rendered regression;
- ownership conflict;

STOP and report blocker.

Do not endlessly oscillate between:

accurate
→ awkward
→ pretty
→ inaccurate
→ overqualified
→ awkward

---

# 34. Batch-Level Loop

After each 3–5 identity batch:

1. rerun golden WUBRG/Temur/Lorehold;
2. rerun affected shared composer/recommender tests;
3. run VM-595 batch rescan;
4. compare before/after duplicate/cadence metrics;
5. review shared root causes;
6. apply any safe shared fix once;
7. rerun batch;
8. apply the Cross-Section Redundancy Gate to each complete rendered dossier;
9. produce the required section-role matrices and batch summary;
10. proceed only if no shared regression or unresolved same-purpose semantic duplication remains.

An automated batch may not commit or push while any identity fails the Cross-Section Redundancy Gate.

---

# 35. Shared Fix Promotion Rule

If the same defect appears in 2+ identities and root cause is a shared owner:

Do not keep patching identities.

Promote it to a shared repair.

Examples:

- generic `This may fit if`;
- shared precon rationale;
- fallback archetype append;
- de-duplication dropping Native;
- `when if` grammar.

Shared fix must be tested against:

- affected identities;
- golden three;
- at least one unaffected control.

---

# 36. Information Gain QA

For each visible block, RobQA must record:

## What does the player already know?

Examples:

- badge says Exact-color;
- heading already says Start Here;
- lane title already names artifact reconstruction.

## What new thing does this block add?

Examples:

- mainStrategy;
- specific fit boundary;
- table pressure;
- commander-specific lane definition.

If the block only restates visible metadata, flag P2/P3 depending impact.

If removal makes the block empty:

apply Source-Grounded Replacement.

---

# 37. Cross-Section Composition QA

Section 12.2 is the governing acceptance gate. Read the five sections as one rendered page, complete the required section-role matrix, and compare semantic purpose rather than depending on exact strings or thresholded similarity.

For every repeated concept, ask:

- why is this repeated?
- does each occurrence serve a different decision?
- can one section own the idea more clearly?

Typical collision examples:

Start Here:
- build direction

How This Plays:
- repeats same build direction

What to Look For:
- duplicates same lane explanation

Fix by assigning one owner.

After the repair, rerender the complete dossier and rerun the scoped VM-595 checks. A low similarity score is evidence from the detector, not proof of section-role separation.

---

# 38. Recommendation QA

For each identity with precons:

## Source

Verify:

- product;
- face commander;
- colors;
- explicit identity relationship.

## Classification

Verify:

- Native;
- Exact;
- Stretch.

## Survival

Verify relationship survives:

- de-duplication;
- ranking;
- grouping;
- composer;
- render.

## Information gain

Native/Exact cards should explain actual plan, not repeat badge.

Stretch may explain added-color relationship because that is decision-relevant new information.

## No duplicate group membership

One precon must not appear in multiple groups.

---

# 39. Rendered Contract QA

For each curated field:

Record:

- accepted set;
- actual set;
- missing;
- extras;
- order differences.

Pass requires:

missing = none

extras = none

order = contract-compliant where meaningful

This should be machine-readable where practical.

---

# 40. RobQA Fix Report

Every material fix must produce:

| Section | Finding | Severity | Root Cause | Evidence | Fix | Why | Protection | Rendered Result |
|---|---|---:|---|---|---|---|---|---|

For every identity, also include the Section 12.2 section-role matrix:

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|

The matrix is positive and negative acceptance evidence: it must show both the unique value each section contributes and that no unresolved same-purpose duplication remains.

Also report:

- P0 found/fixed/open;
- P1 found/fixed/open;
- P2 found/fixed/open;
- P3 found/fixed/open;
- tests run;
- rendered checks;
- VM-595 delta;
- golden regression status;
- remaining blockers.

---

# 41. Example Repair Patterns

## 41.1 Missing Native

Symptom:

Native precon absent.

Do not immediately patch recommender.

Trace:

source relationship
→ schema
→ builder
→ catalog
→ filter
→ de-dupe
→ ranking
→ render

Repair owner.

## 41.2 Extra primary lane

Symptom:

approved lanes plus legacy lane.

Trace:

curated directions
→ composer
→ fallback append

Repair composer.

Add exact-set regression.

## 41.3 Defensive copy

Symptom:

page repeats semantic disclaimers.

Do not remove metadata.

Rewrite player prose for usefulness.

## 41.4 Redundant precon rationale

Symptom:

rationale repeats Exact-color badge.

Replace with existing source-grounded `mainStrategy`.

## 41.5 Official URL with unsupported prose

Symptom:

record uses Wizards source but retains community evaluation.

Validate claim entailment.

Remove unsupported evaluation.

## 41.6 Terminology collision

Symptom:

natural English uses a defined Magic term inaccurately.

Verify term.

Use ordinary synonym when mechanic is not intended.

---

# 42. Concurrency and Dirty Worktree Handling

SIRF must not pretend blocked global validation is PASS.

If concurrent work prevents global replay/rescan:

Report:

- BLOCKED check;
- exact cause;
- owning concurrent card;
- protected paths;
- scoped substitute evidence;
- residual validation debt.

Do not create identity-specific workarounds for shared unrelated failures.

Before atlas-wide deployment, prefer a reconciled baseline.

---

# 43. Baseline Recording

At the start of the 34-identity rollout, record:

- branch;
- HEAD;
- origin divergence;
- dirty paths;
- generated-artifact state;
- VM-595 baseline metrics;
- golden identity status;
- all-37 rendered baseline status;
- shared suite status.

This becomes the rollout comparison point.

---

# 44. Rollout Tracking Table

Maintain a machine-readable and human-readable table.

Suggested fields:

| Identity | Type | Audit State | P0 | P1 | P2 | P3 | Cycles | Shared Fixes | Render PASS | VM-595 PASS | Owner | Contract |
|---|---|---|---:|---:|---:|---:|---|---|---|---|---|---|

Possible states:

- QUEUED
- AUDITING
- REPAIRING
- ROBQA
- OWNER_REVIEW
- ACCEPTED
- BLOCKED

---

# 45. Batch Acceptance Gate

A batch is complete when:

- every identity has no open P0/P1;
- material P2 resolved;
- known P3 dispositioned;
- rendered contracts pass;
- recommendations pass;
- golden three pass;
- VM-595 batch delta acceptable;
- every identity passes the Cross-Section Redundancy Gate in the actual rendered dossier;
- every identity has a complete section-role matrix with distinct responsibilities and information gain;
- shared fixes do not regress unaffected controls.

Unresolved cross-section redundancy prohibits batch commit and push.

---

# 46. Final Atlas Acceptance Gate

The remaining 34 are complete when:

## Evidence

- no unresolved P0;
- no unresolved P1.

## Semantics

- no known launch-critical P2.

## Taxonomy

- Start Here = What to Look For curated contract per identity.

## Recommendations

- Native / Exact / Stretch correct.

## Composition

- each section has unique role;
- information gain positive.

## Language trust

- VM-595 rescan shows reduced inappropriate templating;
- no mono grammar defects;
- redundancy candidates dispositioned;
- process language reduced;
- legitimate shared instructions preserved.

## Runtime

- all 37 rendered.

## Golden contracts

- WUBRG;
- Temur;
- Lorehold

all PASS.

## Owner

- targeted high-risk sample accepted.

---

# 47. VM-595 Before/After Metrics

Existing baseline:

- 37 identities
- 1,399 prose units
- 1,806 sentences
- 26,831 words
- 66 exact duplicate sentence groups
- 819 rendered duplicate occurrences
- 18 identity-substitution groups
- 57 repeated five-word openings
- 14 within-dossier redundancy candidates

Do not optimize mechanically toward zero.

Classify remaining duplicates as:

- intentional shared UI;
- unavoidable factual phrasing;
- defect;
- accepted.

Success means:

- inappropriate identity templating reduced;
- grammar defects eliminated;
- section-role overlap reduced;
- process tone reduced;
- utility dominance reduced;
- strong identity voice preserved.

---

# 48. Strong Voice Controls

Do not flatten identities that already work.

Known positive controls from VM-595 include:

- Rakdos — act, audience, consequence
- Orzhov — deck as a ledger
- Lorehold — history fighting back
- Prismari — art/medium framing
- White — compact hero thesis

Shared fixes must preserve these.

---
# 49. Master Deployment Prompt for Codex

Use the following as the atlas deployment instruction after the baseline is reconciled.

START PROMPT

# SIRF v0.2 Atlas Repair Loop — Remaining Vox Mana Identities

Work in:

C:\dev\voxmana.io

Use the repository's SIRF v0.2 plan as the governing framework.

The calibration identities WUBRG, Temur, and Lorehold are golden regression identities. Do not rewrite their accepted semantics except to repair a proven shared regression caused by this work.

The goal is to process the remaining identities through the SIRF closed loop without requiring the Owner to manually rediscover known defect families identity by identity.

## Scope

Routine player-facing tuning is limited to:

- Start Here
- Test the Fit
- How This Plays
- Precon Starting Points
- What to Look For

You may repair upstream identity, metaphysics, faction/profile, source, schema, builder, composer, recommender, filter, or runtime owners when a confirmed defect in those five sections originates upstream.

Do not broadly rewrite unrelated dossier sections.

## Evidence

Use existing governed repository evidence first.

When external verification is required, use only:

- official Wizards / Magic sources;
- Mark Rosewater / Making Magic;
- official Planeswalker's Guides;
- official Magic Story;
- official mechanics/release notes;
- official product/decklist/card sources;
- mtg.wiki only as secondary fallback with explicit reason.

Do not use Reddit, EDHREC, blogs, YouTube, Draftsim, Moxfield, or other community sources to establish identity/metaphysics truth.

## Core SIRF rules

1. Fix the owner of the wrong meaning.
2. Curated semantic sets beat fallback data.
3. Rendered output must equal accepted curated sets, not merely contain them.
4. Native relationship > Exact color > Stretch for faction identities.
5. Native relationships must survive filtering, de-duplication, ranking, composition, and rendering.
6. Same colors do not prove faction identity.
7. Commander mechanics do not prove lore/metaphysics.
8. Mechanics do not automatically equal philosophy.
9. Metadata carries evidence altitude; rendered prose carries player meaning.
10. Every visible block must add a new player decision or understanding.
11. If removing repetition creates an empty surface, replace it with the nearest existing source-grounded detail, not invented prose.
12. Start Here and What to Look For must use one coherent primary taxonomy.
13. Provenance is claim-level, not merely source-URL-level.
14. Verify normal-English collisions with actual Magic rules/mechanical terms.
15. Rendered product is the final truth surface.
16. Fallback data may not append to explicit curated sets unless augmentation is expressly authorized.
17. Positive assertions are insufficient: protect important exclusions and ordering too.
18. Tests proving source/catalog state do not substitute for actual rendered validation.
19. VM-595 is a detector, not complete semantic judgment; every identity must pass the rendered Cross-Section Redundancy Gate before batch commit or push.

## Per-identity loop

For each identity:

1. Load the existing audit/research/source/claim material.
2. Load any accepted semantic contract.
3. Inspect identity.md, metaphysics.md, faction/profile data, and the five scoped player-facing sections.
4. Load the identity's VM-595 findings.
5. Run SIRF R1–R19.
6. Classify findings as P0/P1/P2/P3.
7. Identify the actual root-cause owner.
8. Verify unresolved factual/semantic claims against the permitted evidence hierarchy only when needed.
9. Repair the owning source/model/schema/builder/composer/filter/runtime.
10. Regenerate through the owning builders.
11. Run focused deterministic semantic/provenance/recommendation tests.
12. Render the actual dossier through the same Owner-facing path.
13. Compare accepted semantic sets against actual rendered sets, including negative/exclusion assertions.
14. Verify Native / Exact / Stretch and face commander/product facts.
15. Complete the Cross-Section Redundancy Gate against the full rendered dossier: record each section's responsibility, claim, mechanics/theme inventory, player decision, and unique information.
16. FAIL when two sections provide substantially the same decision or understanding for substantially the same purpose, even if lexical similarity is below threshold.
17. Run VM-595 or a scoped language-trust rescan.
18. Repair remaining proven P1–P3 findings.
19. Rerender the complete dossier and repeat up to three autonomous cycles.
20. Stop at Owner Review only for a defined stop condition; otherwise advance when all gates pass.

Do not exceed three autonomous cycles per identity.

## Rendered contract rules

For every curated set record:

- expected items;
- actual rendered items;
- missing items;
- extra items;
- ordering differences.

PASS requires:

- no missing items;
- no unauthorized extras;
- correct ordering where ordering carries meaning;
- no duplicate classification/group membership.

Do not merely assert that the expected items exist somewhere upstream.

## Recommendation rules

For faction/college identities:

Native > Exact-color > Stretch.

Native requires an explicit authored identity relationship.

Same color is not Native.

Native relationships must survive:

- de-duplication;
- editorial filtering;
- ranking;
- grouping;
- runtime composition;
- rendering.

For structural identities such as WUBRG, follow the accepted identity-specific semantic contract rather than inventing a faction Native category.

## Information-gain rules

For every rendered block ask:

- What does the player already know from the badge, label, heading, or neighboring block?
- What new decision or understanding does this text add?

If it adds nothing, remove or replace the redundancy.

If removal leaves a useful surface empty, use the nearest existing source-grounded detail such as `mainStrategy`, a verified lane explanation, or another governed field.

Do not invent filler solely to populate the layout.

Repeated terms are allowed when each occurrence performs a different section responsibility. The defect is same-purpose semantic duplication, not shared vocabulary.

For each identity, record:

| Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result |
|---|---|---|---|---|

PASS requires distinct primary responsibilities, no unresolved same-purpose duplication, aligned-but-distinct Start Here and What to Look For, strategy-bearing precon rationales, and table-behavior-focused How This Plays copy.

## Shared defects

If the same defect appears in 2 or more identities and a shared composer/filter/renderer owns it:

- stop patching identities individually;
- repair the shared owner once;
- rerun all affected identities;
- rerun WUBRG, Temur, and Lorehold golden regressions;
- render at least one unaffected control.

## Language trust

Use VM-595 to detect:

- exact duplicate groups;
- identity-substitution templates;
- repeated openings;
- `This may fit if` saturation;
- `This is less likely to fit when` saturation;
- `Pressure through` saturation;
- `Opponents feel the deck` saturation;
- section-role overlap;
- process-language leakage;
- utility-copy dominance;
- grammar/composition defects.

VM-595 remains a detector. Low exact-string or Jaccard similarity does not prove section-role separation.

Use the combined gate:

> VM-595 detection + section-role contract + rendered semantic comparison + information-gain review.

Do not optimize raw duplicate count to zero.

Preserve legitimate shared UI instructions and strong identity-specific voice.

## RobQA authority

RobQA may directly repair:

- P3 copy/composition defects;
- proven P2 where the accepted semantic contract determines the answer;
- proven P1 implementation defects when authoritative evidence and root cause are definitive.

Ordinary, proven cross-section redundancy is a P2 or P3 that RobQA should repair autonomously when the correct section owner and existing source-grounded replacement are clear.

RobQA must not invent new metaphysics or identity doctrine when evidence is ambiguous.

If ambiguity remains after governed evidence and permitted verification, stop with a blocker.

For cross-section redundancy, stop for Owner input only when:

- the correct section owner is ambiguous;
- removing duplication would require a new semantic interpretation;
- official sources conflict;
- the repair would alter accepted golden semantics;
- three repair cycles fail to converge.

Do not stop for routine, clearly owned redundancy. These redundancy-specific rules do not weaken stricter P0/P1, evidence, or protected-workflow stop conditions elsewhere in SIRF.

## Golden identities

After any shared composer, recommender, filtering, taxonomy, or runtime change, rerun:

### WUBRG

Protect:

- no universal philosophy;
- access and integration both legitimate;
- Full-Spectrum Integrator optional;
- Rainbow Payoffs consistent;
- useful non-defensive player prose.

### Temur

Protect:

- Green-centered savagery;
- Ferocious Khans / Formidable Atarka;
- Survival Through Attunement optional;
- Temur Roar Native first;
- Native survives de-duplication;
- primary taxonomy aligned.

### Lorehold

Protect exactly these primary lanes:

1. Spirit Witnesses / Graveyard-Leaves
2. Relic Reconstruction
3. History & Spells

Protect:

- no Spirit Tribal fallback lane;
- no Boros Artifacts primary lane;
- `historic` terminology correctness;
- Native Lorehold products first;
- history fighting back as Vox Mana play language.

## Batch operation

Process identities in batches of 3–5.

Exception-based automation is enabled after the accepted diversity batch. Routine, clearly owned P2/P3 findings should be repaired in the loop without an Owner pause; only the defined stop conditions become exceptions.

After each batch:

1. rerun golden WUBRG/Temur/Lorehold;
2. rerun affected shared tests;
3. run VM-595 batch rescan;
4. report new shared root causes;
5. report before/after language-trust changes;
6. after source/model repairs and artifact regeneration, apply the Cross-Section Redundancy Gate to each actual rendered dossier;
7. record the required section-role matrix and rerun scoped VM-595 checks;
8. stop for Owner Review only when a defined exception or a new defect family/SIRF gap appears.

Even when commit and push are otherwise authorized, an automated batch may not commit or push with unresolved cross-section redundancy.

## Required fix report

For every material repair record:

- section;
- finding;
- severity;
- root cause;
- evidence;
- fix;
- why the fix is correct;
- regression protection;
- final rendered result.

Also report:

- P0 found/fixed/open;
- P1 found/fixed/open;
- P2 found/fixed/open;
- P3 found/fixed/open;
- deterministic test results;
- rendered contract results;
- recommendation results;
- VM-595 delta;
- golden regression status;
- blocked shared validation.

## Concurrency

Do not describe a blocked shared check as PASS.

If concurrent work invalidates the all-atlas baseline:

- report BLOCKED;
- identify the owning concurrent work;
- use bounded scoped evidence where possible;
- record residual validation debt;
- do not create identity-specific hacks for unrelated shared defects.

## Stop condition

For each identity stop at Owner Review when:

- no P0/P1 remain;
- material P2 is resolved;
- known P3 is repaired or explicitly shared/deferred;
- rendered contract passes;
- recommendations pass;
- section information gain passes;
- the rendered Cross-Section Redundancy Gate and section-role matrix pass;
- VM-595 scoped result is acceptable;
- golden identities remain stable if shared code changed.

Do not commit or push unless explicitly authorized.

END PROMPT

---

# 50. Recommended Batch Deployment Order

Use a staged rollout.

## Step 1 — Close/reconcile calibration work

- WUBRG
- Temur
- Lorehold
- VM-595 shared owner paths

## Step 2 — Diversity batch

Run:

- one mono-color;
- one guild;
- one additional shard/wedge.

This is the last deliberate framework-validation checkpoint before the broad atlas loop.

## Step 3 — Review v0.2 behavior

If the diversity batch produces no new major defect family:

- freeze v0.2 deployment rules;
- continue atlas rollout through exception-based batch automation.

If it exposes a new generic failure:

- patch SIRF once;
- rerun diversity batch;
- then continue.

## Step 4 — Mono batch(es)

Process remaining mono identities.

## Step 5 — Guild batch(es)

Process Ravnica guilds.

## Step 6 — College batch(es)

Process remaining Strixhaven colleges.

## Step 7 — Shard/wedge batch(es)

Process remaining three-color identities.

## Step 8 — Special/other identity batch(es)

Process remaining structural/special categories.

Exact order should follow repository inventory and risk.

---

# 51. Risk-Based Ordering

Within each batch, prioritize identities with:

- VM-595 HIGH findings;
- known grammar defects;
- known Start Here / How This Plays overlap;
- weak or old provenance;
- multiple Commander products;
- multiple timelines/products;
- generated archetype fallback;
- complicated recommendation relationships;
- unusual metaphysics;
- launch visibility.

Use strong positive controls between risk-heavy identities.

---

# 52. Suggested Owner Review Strategy

The Owner should not need to manually deep-read all 34 the way WUBRG, Temur, and Lorehold were calibrated.

Use exception-based Owner review. Risk-based sampling may happen separately, but it does not block an otherwise passing automated batch.

Stop the batch for Owner input when:

- an unresolved P0/P1 or ownership conflict remains;
- official sources conflict or a new semantic interpretation is required;
- a shared repair would alter accepted golden semantics;
- a new SIRF defect family appears;
- three repair cycles fail to converge.

Allow automated batch acceptance for identities with:

- no factual changes;
- clearly owned P2/P3 cleanup that converges within three cycles;
- rendered contract PASS;
- recommendation PASS;
- golden/shared regressions PASS;
- VM-595 improvement;
- Cross-Section Redundancy Gate PASS.

Routine, clearly owned cross-section redundancy that RobQA repairs and proves through the rendered gate does not require a separate Owner pause.

The loop must summarize exactly what changed and why so Owner review takes minutes rather than hours.

---

# 53. Required Per-Identity Owner Summary

Each identity should return:

## Identity

## Status

## Why it needed repair

## Final score / disposition

## P0

## P1

## P2

## P3

## Root causes

## Official sources consulted

## Upstream files changed

## Generated artifacts rebuilt

## Final Start Here lanes

## Final What to Look For lanes

## Taxonomy equality result

## Precon Native / Exact / Stretch

## Rendered contract result

## Information-gain review

## Cross-section section-role matrix

## VM-595 language delta

## Golden regression status

## Remaining blocked/shared debt

## Manual review questions

---

# 54. Framework Self-Protection

SIRF should progressively gain tests for proven generic assumptions.

Potential generic protections include:

- curated directions render exactly;
- fallback cannot augment curated direction sets;
- Native relationships survive de-duplication;
- Native/Exact/Stretch exclusive grouping;
- face commander metadata validity where authoritative data exists;
- exact-color rationale does not repeat color badge when a source-grounded `mainStrategy` exists;
- Stretch rationale preserves decision-relevant color relationship;
- generated output cannot validate itself;
- interpretation metadata survives render;
- accepted exclusions remain absent;
- terminology guard catches real natural-language/mechanic collisions;
- claim-level provenance requires source entailment.

Do not implement every theoretical generic test before rollout.

Promote identity-specific protections into generic protections when the defect repeats or is clearly structural.

---

# 55. What SIRF Should Not Do

Do not:

- broad-research every identity from scratch;
- rewrite all dossier prose;
- optimize duplicate count to zero;
- eliminate all shared instructions;
- remove strong identity voice;
- turn every interpretation into bland qualification;
- infer faction meaning from colors alone;
- infer lore from precon inclusion;
- patch renderers when source ownership is wrong;
- create identity-specific hacks for shared defects;
- call blocked global checks PASS;
- continue autonomous rewriting beyond three cycles;
- append fallback meaning to curated taxonomies;
- treat expected-set inclusion as equivalent to rendered-set equality;
- replace deleted redundancy with invented filler.
- treat a low VM-595 similarity score as proof that rendered section roles are distinct;
- commit or push a batch with unresolved cross-section redundancy.

---

# 56. Deployment Definition of Done

The remaining 34 identity cleanup is complete when:

> Every identity's five scoped surfaces are grounded in the correct semantic owners; confirmed upstream identity/metaphysics/faction defects are repaired; curated taxonomies and recommendation relationships survive every downstream transform; the rendered product equals the accepted semantic contracts; every visible block adds new player value; VM-595 language-trust defects are materially reduced without flattening identity voice; WUBRG, Temur, and Lorehold remain stable golden controls; RobQA can explain every material fix and why it was correct; and the Owner no longer has to manually rediscover the same defect families identity by identity.

---

# 57. Immediate Deployment Checklist

Before starting the remaining 34:

- [ ] Close or reconcile WUBRG work.
- [ ] Close or reconcile Temur VM-597.
- [ ] Close or reconcile Lorehold VM-598.
- [ ] Reconcile VM-595 shared owner-path/runtime baseline.
- [ ] Record branch / HEAD / origin state.
- [ ] Record dirty/protected paths.
- [ ] Run VM-595 baseline.
- [ ] Run WUBRG golden check.
- [ ] Run Temur golden check.
- [ ] Run Lorehold golden check.
- [ ] Confirm precon builder/catalog current.
- [ ] Confirm dossier builder/catalog current.
- [ ] Confirm rendered replay path trusted.
- [ ] Create SIRF rollout tracker.
- [ ] Run diversity batch.
- [ ] Review any framework gaps.
- [ ] Enable exception-based batches only after the rendered Cross-Section Redundancy Gate is mandatory.
- [ ] Begin remaining batches.

---

# 58. Operational Summary

SIRF v0.2 should operate like this:

> Load what Vox Mana already knows.  
> Check the five sections the player actually uses.  
> Compare them against identity, metaphysics, faction data, audits, and accepted semantic contracts.  
> Verify uncertain facts only with official Magic sources or mtg.wiki fallback.  
> Detect factual, semantic, recommendation, taxonomy, composition, and language-trust defects.  
> Find the true owner.  
> Fix the owner.  
> Regenerate.  
> Render.  
> Assert the visible set equals the accepted set.  
> Verify important exclusions and ordering.  
> Verify semantic relationships survive downstream filters.  
> Verify every block teaches something new.  
> Compare all five rendered sections semantically and record the section-role matrix.
> Replace removed redundancy with existing source-grounded detail when useful.  
> Run VM-595.  
> Let RobQA fix proven P1–P3.  
> Repeat up to three times.  
> Explain every fix and regression protection.  
> Move to the next identity only when the current identity is trustworthy, useful, and rendered correctly.

This is the deployment model for the remaining 34 identities.

---

# 59. VM-603 Post-Guild All-37 Checkpoint

The checkpoint from accepted Batch 04 baseline `dc680a0de967ff041a4f0f5861544abc75fb71ec` passes:

- 37/37 identities and 74/74 desktop/mobile Dossier Review renders collected;
- all five scoped surfaces present with reconciled desktop/mobile taxonomy and recommendation-group counts;
- all 16 promoted contracts and WUBRG/Temur/Lorehold golden controls pass;
- Yore retains its intentional bounded `NO_RESULT`; 36 other engine witnesses pass exactly;
- the fresh VM-595 producer/check passes with 1,376 prose units, 1,653 sentences, 26,644 words, 57 exact groups, 724 occurrences, 17 substitution groups, and 11 within-dossier candidates;
- the Owner-supplied Turtle Power! source correction reproduces normally with Leonardo, the Balance as face commander and Heroes in a Half Shell only as alternate;
- no new SIRF defect class, accepted-contract regression, or generated-artifact freshness uncertainty remains.

The Ravnica guild wave is complete. Continue exception automation with the remaining 18 identities, preferably the four remaining Strixhaven colleges next while retaining Lorehold as the college golden control. Full checkpoint evidence and disposition live at `docs/sirf/reports/2026-08-30-sirf-all-37-checkpoint.md`.

---

# 60. VM-607 Post-Wave-07 All-37 Checkpoint

The checkpoint from accepted Wave 07 baseline `232cd84168bd201f8ea0ed57bfd37f4bcb139896` passes after one Owner-authorized shared repair:

- 37/37 identities and 74/74 full-page desktop/mobile Dossier Review renders were freshly recollected;
- all five scoped surfaces are present, with zero horizontal overflow, zero duplicate product names, and exact desktop/mobile product relationship parity;
- all 28 promoted SIRF contracts and WUBRG/Temur/Lorehold goldens pass;
- Jund renders all six required Exact products, including `Power Hungry`, while Prossh remains available as a distinct editorial card;
- precon products now de-duplicate only by stable catalog slug, in Native → Exact → Stretch precedence; face or alternate commander overlap with editorial cards cannot remove a product;
- the full 155-product blast radius and eight restored products are covered by systemic regression tests;
- the current-state producer passes with 36 `PASS_MATCH`, bounded Yore `NO_RESULT`, and zero mismatch/error;
- the fresh VM-595 producer/check passes with 1,383 prose units, 1,642 sentences, 26,736 words, 53 exact groups, 702 occurrences, 17 substitution groups, and 8 within-dossier candidates;
- no Placement, scoring, routing, qualification, identity semantics, product facts, generated precon artifact, or CRIT-001 truth changed.

Continue exception automation with Wave 08: Dune, Glint, Ink, Witch, and Yore. Colorless remains queued after that wave. Full evidence and disposition live at `docs/sirf/reports/2026-08-30-sirf-post-wave-07-all-37-checkpoint.md`.

---

# 61. Wave 08 Four-Color Completion

The four-color wave from accepted VM-607 baseline `3c508e0bb1508a93e86054f7c13b5096720f76d9` passes:

- Dune, Glint, Ink, Witch, and Yore each converged in one exception-repair cycle;
- each contract pins the exact four-color combination, absent color, Vox Mana expression label, Commander 2016 support theme, and the absence of an official identity-wide philosophy;
- fifteen What to Look For lanes now resolve to certified raw claims rather than generated dossier output;
- each Start Here set exactly equals its accepted What to Look For set, with fallback/legacy extras excluded;
- Four-Color Spellcraft owns construction choice while Test the Fit owns suitability/boundary and How This Plays owns table behavior;
- Native remains empty and the actual renderer shows the appropriate Commander 2016 exact-color product before Stretch products;
- all five target dossiers and WUBRG, Temur, Lorehold, White, Rakdos, and Esper controls pass at 1280×720 and 375×812 without horizontal overflow;
- Yore retains its bounded engine `NO_RESULT` while its direct dossier and accepted contract pass;
- the fresh VM-595 producer/check passes with 1,378 prose units, 1,627 sentences, 26,493 words, 50 exact groups, 686 occurrences, 17 substitution groups, and 4 within-dossier candidates; every Wave 08 identity has zero candidates;
- all thirty-three promoted contracts and the WUBRG/Temur/Lorehold goldens pass, with Placement, scoring, routing, qualification, CRIT-001 truth, and precon provider facts unchanged.

Continue exception automation with the final endpoint Wave 09 for Colorless. After its independent commit and push, run the final 37/74 atlas checkpoint and closeout. Full evidence and disposition live at `docs/sirf/reports/2026-08-30-sirf-four-color-wave-08.md`.

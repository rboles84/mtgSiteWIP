# Vox Mana SIRF Workspace

## Purpose

This directory is the governed workspace for the Vox Mana **Semantic Integrity & Repair Framework (SIRF)**.

SIRF exists to verify that identity meaning survives the full path from evidence and authored semantic models through generated data, runtime composition, recommendations, and the final rendered dossier.

The framework is designed to reduce repeated manual investigation across the identity atlas by giving Codex and RobQA a repeatable closed-loop process:

**Inspect → classify → root-cause → verify evidence → repair owner → regenerate → test → render → re-scan → repeat → Owner Review**

The governing rule is:

> **Fix the owner of the wrong meaning, not the place where the wrong sentence happened to appear.**

The rendered application is the final truth surface.

---

# Directory Structure

```text
docs/
└── sirf/
    ├── SIRF-v0.2-atlas-wide-deployment-plan.md
    ├── README.md
    ├── contracts/
    ├── runs/
    └── reports/
```

## `SIRF-v0.2-atlas-wide-deployment-plan.md`

The governing process authority for SIRF v0.2.

Codex and RobQA must read this document before performing SIRF work.

It defines:

- evidence rules;
- semantic layers;
- P0–P3 severity;
- Start Here / Test the Fit / How This Plays / Precon Starting Points / What to Look For responsibilities;
- Native > Exact > Stretch recommendation semantics;
- rendered-contract equality;
- the mandatory rendered Cross-Section Redundancy Gate and section-role matrix;
- curated-directions-over-fallback behavior;
- root-cause requirements;
- RobQA repair authority;
- VM-595 language-trust integration;
- golden WUBRG / Temur / Lorehold protections;
- three-cycle repair guard;
- batch rollout for the remaining identities.

Do not substitute a remembered or abbreviated version of SIRF for the current governed file.

---

# `contracts/`

Stores accepted machine-readable semantic contracts for identities that have completed SIRF review.

Initial golden identities should eventually include:

- WUBRG
- TEMUR
- LOREHOLD

Each accepted contract should capture the important boundaries RobQA must protect in future shared-code changes, such as:

- canonical identity anchor;
- official design/lore claims;
- optional Vox Mana interpretations;
- timeline/product guards;
- primary Start Here / What to Look For lane set;
- false-positive guardrails;
- Native precons;
- Exact/Stretch behavior;
- mechanical classification;
- terminology guards;
- rendered exclusions.

Contracts should be derived from accepted audit/Owner decisions, not invented from runtime output.

---

# `runs/`

Stores execution records for SIRF batches and identity repair loops.

Recommended contents include:

- batch manifests;
- identity queue;
- starting SHA;
- branch/worktree state;
- cycle count;
- identities processed;
- shared defects discovered;
- shared fixes promoted;
- blocked validations;
- final disposition.

Suggested naming:

`YYYY-MM-DD-sirf-baseline-reconciliation.md`

`YYYY-MM-DD-sirf-batch-01.md`

`YYYY-MM-DD-sirf-batch-02.md`

Do not use run records as semantic evidence.

They are operational history.

---

# `reports/`

Stores SIRF audit and RobQA outputs.

Examples:

- semantic audit reports;
- P0–P3 finding registers;
- root-cause registers;
- VM-595 before/after language-trust summaries;
- rendered-contract reports;
- batch completion reports;
- Owner Review handoffs;
- SIRF framework-delta reports.

Reports explain what happened.

They do not outrank governed source/claim data.

---

# Source Authority

For identity, philosophy, lore, metaphysics, and canonical mechanics, use repository-governed evidence first.

When external verification is required, use only:

1. official Wizards / Magic sources;
2. Mark Rosewater / Making Magic;
3. official Planeswalker's Guides;
4. official Magic Story;
5. official mechanics and release notes;
6. official product/decklist/card sources;
7. `https://mtg.wiki/` only as a secondary fallback when first-party evidence is unavailable or insufficient.

Do not use Reddit, EDHREC, Draftsim, YouTube, blogs, Moxfield, or other community sources to establish identity/metaphysics truth.

Those sources may support Commander discovery or community context, but they do not prove canonical identity.

---

# Routine SIRF Player-Facing Scope

The atlas-wide cleanup is intentionally bounded to five player-facing surfaces:

1. **Start Here** — how to begin building;
2. **Test the Fit** — when the identity fits, its tension, and its boundary;
3. **How This Plays** — table behavior and texture;
4. **Precon Starting Points** — concrete product examples;
5. **What to Look For** — distinct lanes and recognizable patterns.

SIRF may repair upstream owners when these sections are wrong because of:

- `identity.md`;
- `metaphysics.md`;
- faction/raw profile data;
- claim/source ledgers;
- dossier source;
- precon source;
- schema;
- builder;
- shared composer;
- recommendation filter;
- de-duplication;
- ranking;
- runtime;
- renderer.

Do not broaden routine tuning into unrelated dossier rewriting.

---

# Core SIRF v0.2 Rules

## 1. Rendered contract fidelity

For curated semantic sets:

> **Accepted set = rendered set**

It is not enough that approved items exist somewhere upstream.

Tests must catch both:

- missing accepted items;
- extra unapproved items.

## 2. Curated beats fallback

If an identity has an explicit curated semantic set, legacy fallback data must not append extra primary meaning unless augmentation is explicitly authorized.

## 3. Semantic relationships must survive downstream transforms

Native relationships and curated semantics must survive:

- filtering;
- de-duplication;
- ranking;
- grouping;
- composition;
- runtime selection;
- rendering.

## 4. Native > Exact > Stretch

For named factions/colleges/clans:

**Native relationship > exact color identity > nearby/stretch identity**

Same colors do not prove faction identity.

Structural identities such as WUBRG may use a different appropriate relationship model.

## 5. Every visible block must add player value

Ask:

> **What new decision or understanding does this block give the player?**

If the answer is none, the block is redundant.

The governing plan's [Mandatory Acceptance Gate — Cross-Section Redundancy](SIRF-v0.2-atlas-wide-deployment-plan.md#122-mandatory-acceptance-gate--cross-section-redundancy) requires RobQA to compare Start Here, Test the Fit, How This Plays, Precon Starting Points, and What to Look For as one actual rendered dossier. Each section must have a distinct responsibility, principal claim, player decision, and unique contribution. Shared terms are allowed when they perform different section jobs; two blocks that give substantially the same decision or understanding for the same purpose FAIL even when wording and automated similarity scores differ.

The required report is a compact section-role matrix with:

`Section | Principal responsibility | Principal claim | New player decision or understanding | Redundancy result`

Unresolved cross-section redundancy prohibits batch commit and push.

## 6. Source-grounded replacement

If redundant copy is removed and a surface becomes too empty, replace it with the nearest existing governed/source-grounded detail.

Do not invent filler.

## 7. Metadata carries evidence altitude

The data model should preserve:

- official fact;
- design commentary;
- lore;
- Vox Mana interpretation;
- Commander expression;
- timeline/product scope.

The rendered prose should usually express the useful meaning rather than repeatedly expose provenance machinery.

## 8. Provenance is claim-level

An official URL does not validate every sentence attached to the record.

The source must actually support the claim.

## 9. Rendered product is final truth

Source tests and generated-catalog tests are necessary but insufficient.

The real rendered dossier must be checked.

---

# Golden Regression Identities

The following identities are SIRF calibration controls.

## WUBRG

Protect:

- all-five access;
- no universal Five-Color doctrine;
- integration and access models both legitimate;
- Full-Spectrum Integrator optional;
- no superiority/completion/mastery;
- useful rather than defensive prose.

## Temur

Protect:

- Green-centered savagery;
- Ferocious = Khans Temur;
- Formidable = Atarka;
- Survival Through Attunement optional Vox Mana lens;
- generic GUR is insufficient;
- Temur Roar Native first;
- Native survives downstream filters;
- Start Here and What to Look For align.

## Lorehold

Protect:

- archaeology/history center;
- Red/White preservation/discovery tension;
- primary lanes exactly:
  - Spirit Witnesses / Graveyard-Leaves
  - Relic Reconstruction
  - History & Spells
- no generic Spirit Tribal primary lane;
- no Boros Artifacts primary lane;
- `historic` not used as a synonym for historical;
- History fights back remains valid Vox Mana table language;
- Lorehold Spirit and Lorehold Legacies remain Native first.

Any shared composer/recommender/runtime change should rerun the golden identities.

---

# VM-595 Integration

VM-595 is the horizontal language-trust detector.

SIRF should reuse it to detect:

- exact duplicate sentence families;
- identity-substitution duplicates;
- repeated openings;
- synthetic cadence;
- section-role overlap;
- process-language leakage;
- utility-copy dominance;
- grammar/composition defects;
- within-dossier redundancy.

System relationship:

**VM-595 = detector**  
**SIRF = decision/root-cause framework**  
**RobQA = closed-loop verifier/remediator**

VM-595 continues to detect exact duplicates, identity-substitution patterns, repeated openings, Jaccard similarity, within-dossier redundancy, process-language leakage, and malformed grammar. A low automated score does not prove that section roles are separate.

The complete acceptance gate is:

**VM-595 detection + section-role contract + rendered semantic comparison + information-gain review**

---

# Exception-Based Atlas Automation

The accepted White/Rakdos/Esper diversity batch enables exception-based atlas batches. After source/model repair and artifact regeneration, RobQA must apply the Cross-Section Redundancy Gate to the actual rendered dossier and rerun scoped VM-595 before any batch commit or push.

RobQA should repair routine, clearly owned P2/P3 redundancy autonomously. Stop for Owner input only when the correct section owner is ambiguous, the repair needs a new semantic interpretation, official sources conflict, accepted golden semantics would change, or three repair cycles fail to converge. Other stricter SIRF stop conditions remain controlling.

---

# Baseline Reconciliation — Required Before Remaining Atlas Work

Before running SIRF against the remaining identities, establish one trusted shared baseline.

The reconciliation work must:

1. finish or reconcile WUBRG;
2. finish or reconcile VM-597 Temur;
3. finish or reconcile VM-598 Lorehold;
4. reconcile the VM-595 dirty/shared runtime baseline;
5. rerun the three golden identities;
6. rerun/re-establish the VM-595 baseline;
7. record the clean starting SHA;
8. record branch/origin divergence;
9. record dirty/protected paths;
10. record generated-artifact state;
11. record all blocked global validations;
12. create the initial SIRF rollout tracker.

Do not begin the remaining atlas repair loop until this baseline is understood.

The objective is not necessarily an empty worktree at any cost.

The objective is a **known and governed starting state** where concurrent work, protected paths, generated outputs, and validation baselines are explicit.

---

# Baseline Reconciliation Deliverables

The baseline phase should produce:

## Run record

Store under:

`docs/sirf/runs/`

Suggested file:

`YYYY-MM-DD-sirf-baseline-reconciliation.md`

Include:

- branch;
- starting HEAD;
- origin divergence;
- existing in-progress cards;
- accepted/Owner Review state of WUBRG, Temur, Lorehold;
- VM-595 state;
- dirty/protected paths;
- generated artifact status;
- golden regression results;
- VM-595 baseline metrics;
- global-suite PASS/FAIL/BLOCKED status;
- exact blockers and owners;
- recommended next batch.

## Baseline report

Store under:

`docs/sirf/reports/`

Suggested file:

`YYYY-MM-DD-sirf-baseline-readiness-report.md`

Include:

- readiness verdict;
- unresolved P0/P1;
- concurrent-work ownership;
- whether all-37 rendered baseline is trusted;
- whether VM-595 frozen baseline is trusted;
- golden identity status;
- exact conditions required before diversity batch begins.

## Rollout tracker

Create a human-readable and/or machine-readable identity tracker.

Suggested fields:

- identity;
- type;
- status;
- P0;
- P1;
- P2;
- P3;
- cycles;
- shared fixes;
- rendered PASS;
- VM-595 PASS;
- Owner state;
- semantic contract state.

---

# Stop Conditions

SIRF work must stop when:

- a required official fact remains unresolved;
- P0 architecture ownership is unclear;
- P1 remains unresolved;
- three autonomous repair cycles fail to converge;
- shared runtime baseline is too ambiguous to distinguish a new regression from concurrent drift;
- contradictory official evidence requires Owner adjudication.

Do not silently continue by guessing.

---

# Definition of Done for This Workspace

The SIRF workspace is operating correctly when:

> The governing plan is stable, accepted semantic contracts are recorded, each run has a reproducible baseline and report, RobQA can explain the root cause and reason for every material repair, golden identities protect shared infrastructure changes, VM-595 measures language trust, and the remaining atlas can be repaired in controlled batches without repeatedly rediscovering the same defect classes manually.

Every automated batch must also prove through the rendered section-role matrix that each of the five scoped sections adds distinct player value before commit and push.

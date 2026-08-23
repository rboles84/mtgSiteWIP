# Behavioral Model Integration Roadmap

Status: Architectural planning document.

This document consolidates the approved Loom v0/v1 direction, Commander Compass follow-up direction, placement-domain architecture, and existing Archscry/Maze/Strategium ownership model into one stable roadmap. It is a governing architecture note, not implementation approval.

## Archscry Redesign Phase Gate

### Phase 1 — Current Production Truth

Status: `ACCEPTED / FROZEN`

- Acceptance date: 2026-08-23
- Evidence authority: [VM-586](../kanban/done/VM-586-archscry-current-state-evidence-red-team-reconciliation.md)
- Yore evidence stop: [VM-587](../kanban/done/VM-587-yore-behavioral-placement-remediation.md)
- Exact baseline binding: the final synchronized `main` SHA reported by the Phase 1 integration closeout as `ARCHSCRY_PHASE_2_STARTING_BASELINE`
- Strategy decision: [Archscry Phase 1 — Current Production Truth Acceptance](../strategy/2026-08-23-archscry-phase-1-current-production-truth-acceptance.md)
- Yore constraint: Yore's valid dossier/metaphysical identity does not currently have sufficiently distinctive behavior-only evidence for responsible named placement.

Phase 1 is frozen for redesign planning. Reopen it only under the invalidation or recertification conditions in the strategy decision, not merely because Phase 2 explores a different design.

### Phase 2 — New Product Contract

Status: `NEXT`

Product-contract planning is authorized around `self_reported_prior`, `observed_gameplay_fit`, and explicit agreement/disagreement reconciliation. `self_reported_prior` is context, not automatic score or qualification. Yore is a mandatory design/test case.

Phase 2 implementation has not started. UI implementation, including self-identification UI, is not authorized until the product contract is accepted.

## Purpose

Vox Mana needs one shared behavioral model that can support placement, explanation, search, commander guidance, table-literacy education, and future discovery surfaces without forking into separate engines.

The durable model is:

```text
Foundations -> Interpretation -> Concepts -> Threads -> Queries / Cards / Archetypes -> Reviewable understanding
```

The matching product principle is:

```text
Parser for syntax.
Scryfall for real card results.
Tag taxonomy for canonical meanings.
Strategium for table archetype literacy.
Commander Compass for commander-facing guidance.
Placement evidence for personal context.
The Loom for seeing the hidden connections among them.
```

## Foundation Layers

### Commander Identity Corpus

The Commander Identity Corpus is the governed identity foundation for Vox Mana. It includes the canonical identity catalog, raw faction source packets, certified placement identities, and generated artifacts that Archscry reads.

It owns:

- color and expression identity;
- placement eligibility and routing identity;
- source-bounded identity language;
- adjacent-fit relationships;
- Commander-facing identity interpretation.

It should not be bypassed by route-local copy, ad hoc commander guidance, or generated-output edits.

### Commander Questions Corpus

The Commander Questions Corpus is the governed question and signal layer used to interpret player intent. It includes Gate, Hall, and Crucible question vocabulary, discriminator questions, answer signals, and future domain-aware question partitions.

It owns:

- the questions asked of a player;
- the behavioral signals each question is allowed to represent;
- stage-level intent for Gate, Hall, and Crucible;
- future domain-aware question routing.

It should not become a second product personality test separate from Archscry. Its purpose is to feed the shared behavioral model.

### Shared Behavioral Model

The shared behavioral model sits between the identity corpus and product surfaces. It turns source-bounded identity data, question signals, Commander concepts, Scryfall vocabulary, and table-literacy language into explainable product behavior.

It owns:

- interpretation of answers and evidence;
- concept and thread language;
- confidence and caution framing;
- links between identity, mechanics, archetypes, and search intent;
- guardrails against overconfident recommendation, legality, ranking, or lore claims.

This model should be adapter-driven. Each product surface receives the slice it needs without duplicating placement, parser, or recommendation logic.

## Product Relationships

### Archscry

Archscry is the guided reading surface. It asks questions, evaluates signals against the identity corpus, and renders a Commander-first dossier.

Archscry should:

- consume the Commander Questions Corpus;
- interpret answers through the shared behavioral model;
- present identity, tension, adjacent fits, and practical next steps;
- hand search intent into Maze through stable query and handoff contracts.

Archscry should not become a ranked commander database or a deckbuilder.

### The Implicit Maze And The Loom

Maze is the Scryfall research console. The current Loom tab is Loom v0: a visual query builder.

Loom v1 is the reviewed concept, thread, and query layer. Its first approved slice is Explorer Mode:

- load a reviewed concept registry;
- let users select approved concepts;
- show literal query fragments before search;
- explain selected concepts in Commander terms;
- run the existing Maze query/search contract;
- show Related Threads as explanatory copy, not deck advice.

No graph canvas, PACKAGE mode, Commander Finder, placement weighting, runtime GenAI, or custom card generation is approved for the first slice.

### Strategium

Strategium owns Commander table literacy. It teaches archetypes, table expectations, threat reading, readiness, and identity pressure.

Strategium should:

- explain archetype and table-perception language;
- provide depth when Loom or Commander Compass uses archetype words;
- remain an education surface rather than a search engine.

Strategium should not be merged into Loom.

### Commander Compass

Commander Compass owns commander-facing guidance. It bridges a reading into curated commander possibilities, fit explanations, caution notes, and future archetype-guided recommendations.

Commander Compass should:

- explain why a commander may fit;
- distinguish native fit from stretch fit;
- surface confidence and caution language;
- use archetype-guided reasoning without collapsing into popularity sorting.

Commander Compass is product guidance, not canon lore, legality proof, pricing guidance, or best-card ranking.

### Future Systems

Future discovery systems should consume the same model rather than inventing new foundations.

Likely future surfaces include:

- commander-seed discovery from commanders a player already likes;
- returning-user fit checks;
- Commander Finder mode after Loom v1 basics are stable;
- account or profile-aware journeys if persistence is reopened;
- concept-to-Strategium bridges for table behavior context.

All future systems should preserve the same boundary:

```text
Archscry interprets identity.
Maze searches real cards.
Loom explains concepts and query intent.
Strategium teaches table behavior.
Commander Compass guides commander exploration.
```

## Long-Term Roadmap

### 1. Stabilize The Governing Corpora

Keep identity data, question signals, tag taxonomy, and commander guidance source-bounded. Do not hand-edit generated artifacts when source files should be updated.

### 2. Define Adapters Between Layers

Create explicit adapters from identity/question evidence into concept, thread, search, and commander guidance surfaces. The adapter boundary prevents product routes from forking their own meaning systems.

### 3. Build Loom V1 Explorer Mode First

Start with the approved concept registry and deterministic query preview. Use the existing Maze query contract for execution.

### 4. Improve Commander Compass With Archetype Guidance

Use shared concepts and Strategium-owned table language to explain commander fit, tension, and next-step exploration.

### 5. Connect Strategium As A Learning Depth Layer

Let search and commander surfaces link into Strategium when a player needs archetype or table-literacy depth.

### 6. Add Future Personalization Carefully

Only add placement weighting, commander-seed discovery, returning profiles, or account-aware behavior after the unpersonalized model is stable and reviewed.

## Guardrails

The shared behavioral model may:

- generate Scryfall queries from concepts;
- explain query meaning;
- infer concepts from real card fields;
- show related strategy threads;
- connect to placement evidence when available;
- link to Strategium for table-literacy context;
- preserve Reading Finds as a local review loop.

It must not:

- invent Magic card facts;
- invent commander legality;
- claim synergy certainty;
- rank best cards;
- build decklists;
- replace Scryfall;
- duplicate the parser;
- run runtime GenAI;
- mutate generated data directly;
- publish custom card ideas as real cards.

## Source Trail

- [Loom V0/V1 Naming And Concept Seed Decision](../strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md)
- [The Loom Foundation Deep Dive](../strategy/2026-06-30-loom-foundation-deep-dive.md)
- [VM-008 - Commander Compass V1.5 Archetype-Guided Recommendations](../kanban/backlog/VM-008-commander-compass-v1-5-archetype-guided-recommendations.md)
- [VM-010 - The Loom Commander Finder Mode and Graph/Query Layer](../kanban/backlog/VM-010-the-loom-commander-finder-mode-graph-query-layer.md)
- [Placement Domains](placement-domains.md)
- [Project Atlas](project-atlas.md)
- [Data Flow Map](data-flow-map.md)

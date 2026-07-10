# The Loom Foundation Deep Dive

Status: Review draft
Related Card: VM-457
Created: 2026-06-30
Agent: Codex

Decision update, 2026-07-03: VM-466 approved the naming split: current `The Loom` / Visual Builder is Loom v0, graph-aware concept work is Loom v1, and the first v1 slice should be Explorer Mode with a 10-concept seed registry. See `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`.

## Purpose

This document gathers the recoverable Loom idea from current Kanban cards, repo docs, and the curated external Vox Mana vault. It focuses on the part of the idea where Vox Mana has a foundation layer and uses that foundation to generate or surface cards, concepts, strategies, archetypes, threads, and keyword-based searches.

This is a synthesis for owner review. It is not implementation approval.

## Executive Read

The remembered idea is real, but it appears across several lanes instead of one finished spec.

The core idea is:

```text
Foundations -> Interpretation -> Concepts -> Threads -> Queries / Cards / Archetypes -> Reviewable understanding
```

The strongest phrasing from the Loom vault plan is:

```text
Cards -> Mechanics -> Concepts -> Threads -> Placement Evidence -> User Understanding
```

That is the heart of The Loom. It should not merely be a visual card-search screen. It should be the visual reasoning layer that explains what a card, query, keyword, strategy, or placement is doing, then hands the user into the existing Maze/Scryfall search flow.

There are two different "generate cards" meanings in the current materials:

1. **Surface real MTG cards** from Scryfall by generating precise queries from concepts, keywords, placement evidence, and strategy threads.
2. **Generate custom card design ideas** from Vox Mana metaphysics and color foundations, as explored in `docs/design/CardHeuristics.md`.

These should stay separate. The first belongs to The Loom/Maze product path. The second is a design-ideation/research sandbox and should not be presented as factual MTG data.

## Source Hierarchy Used

The repo remains the authority. The external vault is curated memory, not a competing source of truth.

Primary repo sources:

- `docs/kanban/backlog/VM-010-the-loom-commander-finder-mode-graph-query-layer.md`
- `docs/kanban/done/VM-003-scryfall-discovery-foundation.md`
- `docs/kanban/done/VM-012-scryfall-parser-expansion-diagnostics.md`
- `docs/kanban/done/VM-022-maze-core-extraction.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/vox-mana-tag-taxonomy.md`
- `data/taxonomy/vox-mana-tags.json`
- `docs/design/CardHeuristics.md`
- `docs/kanban/backlog/VM-008-commander-compass-v1-5-archetype-guided-recommendations.md`
- `docs/kanban/backlog/VM-025-combo-discovery-placement-section.md`
- `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`
- `docs/kanban/done/VM-125-strategium-archetype-signal-searchable-library.md`
- `docs/kanban/done/VM-126-strategium-archetype-signal-intent-friendly-copy-pass.md`
- `docs/kanban/done/VM-416-strategium-content-pass.md`
- `docs/kanban/done/VM-426-reading-finds-dossier-reflection.md`
- `docs/kanban/done/VM-449-maze-return-loop-microcopy-tightening.md`

External vault sources read:

- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\05-the-loom\_index.md`
- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\05-the-loom\loom-master-implementation-plan.md`
- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\04-the-implicit-maze\_index.md`
- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\04-the-implicit-maze\maze-design-and-as-built-reference.md`
- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\03-parser-and-routing-logic\scryfall-parser-seed-repository.md`
- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\02-archscry\commander-compass\03-data-architecture.md`
- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\02-archscry\commander-compass\04-roadmap.md`
- `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh\02-archscry\placement-engine\archetype-theory-and-translation.md`

The older path referenced by early cards, `C:\dev\projectFiles\obsidianDocs\vox-mana-docs`, was not present in this workspace. The refreshed vault appears to preserve the relevant notes.

## Current State Versus Planned Loom

### What Ships Now

The current Maze has three modes:

- Plain Reading: natural-language input compiled by a deterministic local parser.
- Operator's Hand: raw Scryfall syntax.
- Visual Builder / Loom v0: filter-driven query construction.

The shipped Loom tab is a working filter builder. It can build query fragments from colors, card types, rarity, mana value, format, and keywords.

### What The Planned Loom Is

The planned Loom is the unbuilt graph-aware layer held by VM-010 and the vault plan. It is meant to be:

- a Commander Finder mode inside Maze,
- a visual concept graph,
- a concept registry,
- a thread registry,
- a card interpreter,
- a query reflection panel,
- a placement bridge,
- and a route into existing Scryfall/Maze results.

The planned Loom should not become:

- a second parser,
- a second Scryfall search engine,
- a deckbuilder,
- a recommendation-engine clone,
- a lore-only page,
- or a static decorative mockup.

## The Foundation Layers

### 1. Placement And Identity Foundation

The placement engine already treats each identity/faction as a hypothesis with evidence, likelihoods, positive/negative signals, lateral inhibition, poison-pill pruning, softmax scoring, and an evidence trail.

For Loom purposes, this foundation can provide:

- placement identity,
- adjacent fits,
- active dossier context,
- evidence trail,
- play-pattern hints,
- decision-style hints,
- mismatch warnings,
- and optional placement-aware concept/thread weighting.

Important guardrail: placement can enrich Loom explanations, but Loom must work without placement.

### 2. Parser And Query Foundation

The Maze parser and query contract already provide:

- deterministic local natural-language parsing,
- exact-name detection,
- raw syntax normalization,
- builder-to-query translation,
- diagnostic codes,
- recognized terms,
- assumptions,
- warnings,
- alternatives,
- API metadata,
- Archscry launch/source context,
- and one executable Scryfall query.

The key VM-022 rule matters:

```text
MazeQueryResult.query is the only executable Scryfall query.
plainReadingQuery is display and trace metadata only.
```

The Loom should sit on top of this contract, not beside it.

### 3. Keyword And Mechanic Foundation

VM-012 and the parser seed explicitly support keyword and mechanic-based interpretation.

Relevant signals:

- The parser dictionary exposes deterministic local keyword, subtype, card type, and format vocabulary.
- The current Visual Builder emits `kw:keyword` fragments.
- Multiple keywords become OR groups.
- The seed prioritizes supported keyword abilities with `kw:`.
- Oracle text fallbacks use `o:` when the idea is not a Scryfall keyword.
- Broad archetype hints should be lower confidence and visible in assumptions.

This confirms the user memory: keyword-based Loom generation is part of the idea.

### 4. Scryfall And Tag Taxonomy Foundation

VM-003 created the broader Scryfall discovery foundation:

- ignored local Scryfall bulk data,
- committed derived indexes,
- centralized tag taxonomy,
- rule-based mechanical/playstyle/identity/lore-tone tagging,
- Archscry discovery enrichment,
- Maze discovery paths,
- and local card capture foundations.

The tag taxonomy rule is the best phrasing for the Loom:

```text
MTG defines the nouns. Vox Mana defines the meaning.
```

That means The Loom should keep canonical terms like `tokens`, `aristocrats`, `stax`, `tempo`, `wheels`, `pillow-fort`, `typal`, and `storm`, then render Vox Mana's plain-language interpretation beside them.

### 5. Commander Compass Foundation

Commander Compass already contains product guidance fields and future V1.5 direction:

- curated commander candidates,
- why-this-fits,
- skip-if,
- gameplay summary,
- archetype tags,
- confidence,
- caution notes,
- Native Fit / Weird Stretch framing,
- and future archetype-guided recommendations.

For Loom purposes, Commander Compass can feed:

- Commander Finder filters,
- commander candidate pools,
- archetype explanation templates,
- "open in Maze" search handoffs,
- and confidence-labeled recommendation cards.

Guardrail: Commander Compass is product guidance, not canon lore.

### 6. Strategium Archetype Foundation

Strategium has a route-local Commander archetype library with:

- core/common versus advanced/specialist scope,
- axes such as Combat, Spells, Graveyard, Artifacts, Enchantments, Lands, Control, Politics, and Combo,
- table-read categories such as Fair, Snowball, Hidden Threat, and Salt Risk,
- aliases,
- likely colors,
- difficulty,
- table perception,
- and Commander-focused summaries.

Strategium should not be merged into Loom. Instead:

- Strategium teaches table literacy.
- Loom searches and explains card/query intent.
- A future bridge can let Loom strategy threads link to Strategium concepts when the user wants table behavior context.

### 7. Card Design Heuristics Foundation

`docs/design/CardHeuristics.md` is the closest existing artifact for the "generate cards from foundations" idea.

It extracts card-design heuristics from Vox Mana metaphysics and organizes them into templates by color and cross-color archetype. Each template includes:

- intent,
- trigger,
- cost pattern,
- balance notes,
- and example pseudocode.

This is not The Loom as currently scoped. It is a related ideation lane:

```text
Metaphysics / color foundation -> design heuristic -> custom card concept
```

If this is revived, it needs a separate sandbox with explicit labels such as "custom design ideation" or "not printed Magic cards." It must not be mixed with Scryfall real-card results.

## The Foundation-To-Generation Model

The safest model is adapter-driven:

```text
Foundation data
  -> Normalization adapters
  -> Concept registry
  -> Thread registry
  -> Query adapter
  -> Existing Maze search
  -> Result cards / panels / explanations
```

### Generated Output 1: Real Card Results

Input foundation:

- concept IDs,
- keyword vocabulary,
- parser seed rows,
- tags,
- placement context,
- Commander format defaults,
- and Scryfall syntax rules.

Generated output:

- executable Scryfall query,
- result cards,
- related Scryfall link,
- and Query Interpretation explanation.

Example:

```text
Concept: Flying Spells
Fragments: kw:flying, o:flying
Context: Commander, sorcery, common
Executable query: t:sorcery r:c kw:flying f:commander
```

### Generated Output 2: Concepts

Input foundation:

- tag taxonomy,
- parser vocabulary,
- Scryfall mechanical tags,
- archetype theory,
- common Commander themes,
- and initial Loom MVP concept list.

Generated output:

- concept registry entries,
- node labels,
- aliases,
- related concepts,
- query fragments,
- oracle patterns,
- and placement tags.

Recommended concept object:

```json
{
  "id": "flying",
  "label": "Flying Spells",
  "category": "Evasion",
  "description": "Cards that have, grant, care about, or synergize with flying.",
  "queryFragments": ["kw:flying", "o:flying"],
  "aliases": ["flyers", "airborne", "skyborne"],
  "oraclePatterns": ["\\bflying\\b"],
  "placementTags": ["tempo", "evasion", "pressure"],
  "connections": [
    { "targetId": "evasion", "strength": "strong" },
    { "targetId": "tempo", "strength": "strong" }
  ]
}
```

### Generated Output 3: Strategy Threads

Input foundation:

- selected concepts,
- concept connections,
- Strategium archetype categories,
- Commander Compass archetype tags,
- tag taxonomy adjacency,
- and optional placement evidence.

Generated output:

- Related Threads panel,
- strategy bundles,
- thread-level search queries,
- one-line intent,
- and explainable reason.

Recommended thread object:

```json
{
  "id": "skyborne_advantage",
  "title": "Skyborne Advantage",
  "subtitle": "Flying plus card flow",
  "nodeIds": ["flying", "evasion", "cardDraw", "tempo"],
  "query": "(kw:flying OR o:flying) (o:draw OR o:scry OR o:surveil)",
  "intent": "Turn evasive threats into sustained card advantage."
}
```

### Generated Output 4: Archetype Lanes

Input foundation:

- Strategium archetype entries,
- Commander Compass archetype tags,
- tag taxonomy,
- placement play patterns,
- and search/card evidence.

Generated output:

- archetype labels,
- table-read summaries,
- "this is what the deck is trying to do" copy,
- links to Strategium,
- and Maze queries for examples.

Example:

```text
Archetype: Aristocrats
Canonical meaning: sacrifice plus death-trigger payoffs.
Loom concepts: Sacrifice, Tokens, Recursion, Lifedrain.
Search thread: cards that create fodder, sacrifice creatures, or drain when creatures die.
Strategium link: table perception and Rule 0 implications.
```

### Generated Output 5: Keyword-Based Searches

Input foundation:

- Scryfall keyword vocabulary,
- `card.keywords`,
- parser seed keyword rows,
- Visual Builder keyword chips,
- and card interpreter rules.

Generated output:

- keyword node activation,
- `kw:` query fragments,
- oracle fallback fragments,
- card-detail inferred concepts,
- and keyword-heavy card comparison.

Example:

```text
Keyword input: flying
Concepts: Flying Spells, Evasion, Tempo
Query: kw:flying
Thread candidates: Skyborne Advantage, Aerial Tempo Engine
```

### Generated Output 6: Custom Card Concepts

Input foundation:

- color metaphysics,
- color-pie constraints,
- Commander format impact,
- card design heuristics,
- rarity/power mapping,
- and playtesting signals.

Generated output:

- custom card design briefs,
- pseudocode,
- balance notes,
- and color-authentic concept sketches.

This should remain outside The Loom MVP unless the owner explicitly wants a custom-design lab. If it does come back, it needs strong labeling:

```text
Custom design idea. Not a printed card. Not Scryfall data. Not a rules authority.
```

## Product Modes From The Loom Plan

### Explorer Mode

The user clicks concepts such as Flying, Card Draw, Token Generation, Removal, Recursion, Sacrifice, Tempo, or Storm / Spells Matter.

The system should:

- toggle selected nodes,
- light connected paths,
- update Selected Concept,
- update Query Interpretation,
- generate a Scryfall query,
- run existing Maze search,
- show example results,
- and update Related Threads.

### Card Detail Loom Mode

The user clicks a card from search results.

The card interpreter inspects:

- name,
- type line,
- oracle text,
- keywords,
- colors,
- and color identity.

Then it infers concepts such as Flying, Haste, Draw, Token Generation, Removal, Exile, Bounce, Recursion, Reanimate, Sacrifice, Control, Tempo, or Spells Matter.

This produces:

- active nodes,
- "what this card does" explanation,
- strongest connected concepts,
- related threads,
- and a "find similar cards" query.

### Query Reflection Mode

The user enters a Plain Reading or Operator's Hand query, then opens The Loom.

The Loom should explain:

- literal syntax,
- parsed fields,
- recognized keywords,
- mechanical concepts,
- inferred strategy,
- possible threads,
- final executable query,
- and assumptions or unresolved terms.

Example from the mockups:

```text
Input: t:sorcery r:c kw:flying
Literal: Sorcery, common, flying
Conceptual: Flying Spells, Evasion, Tempo
Focus: aerial and evasive spells
```

### Placement Bridge Mode

This should be future, not MVP.

After an Archscry result exists, The Loom can suggest placement-aware card-search threads.

Examples from the plan:

- Azorius -> Control Shell, Selection, Countermagic, Tax, Rule of Law.
- Boros -> Combat Pressure, Haste, Protection, Team Assault.
- Dimir -> Hidden Information, Selection, Graveyard, Control.
- Selesnya -> Token Generation, Go-Wide, Protection, Community Engine.
- Quandrix -> Ramp, Copy Effects, Fractals, Pattern Scaling.

The bridge should add context and weighting, not rewrite the query engine.

### Future Commander Finder Mode

The Commander Compass roadmap names a later Loom Commander Finder with:

- identity grid,
- mechanic chips,
- budget toggle,
- paper friction toggle,
- power band,
- pod comfort,
- weirdness slider,
- include/exclude chips,
- and 32-Deck Challenge gap filters.

This is larger than the first Loom graph slice and should be deferred until the concept graph is stable.

## Mockup Read

The provided Loom mockups support the same information architecture:

- left rail: quick searches, color filters, format filters,
- center: concept graph,
- bottom: example card results,
- right rail: Related Threads, Selected Concept, Query Interpretation,
- search row: Plain Reading / Operator's Hand / The Loom modes,
- active query example: `t:sorcery r:c kw:flying`,
- central node examples: Card Advantage, Flying Spells,
- surrounding clusters: Card Draw, Tempo, Token Generation, Evasion, Storm / Spells Matter, Removal, Control, Recursion.

The mockups show that The Loom should be both visual and textual. The graph provides orientation, but the right panels carry the explanation and accessibility fallback.

## Data Architecture Recommendation

### Proposed Files

Future implementation could add:

```text
data/loom/loom-concept-registry.json
data/loom/loom-thread-registry.json
data/loom/loom-node-map.json
data/loom/loom-card-interpreter-rules.json
data/loom/loom-placement-bridge.json
```

Route code should use adapters, likely under `research/` or a route-local Loom module folder, depending on the final route architecture.

### Proposed Runtime Flow

```text
User action
  -> Loom state update
  -> concept registry lookup
  -> query adapter builds fragments
  -> MazeQueryRequest
  -> resolveMazeQueryRequest()
  -> existing Maze search execution
  -> results + Query Interpretation + Related Threads
```

### Proposed State Shape

```json
{
  "selectedConceptIds": ["flying", "tempo"],
  "queryMode": "all",
  "source": "loom",
  "activeCardId": null,
  "placementContext": null,
  "lastGeneratedQuery": "kw:flying o:haste"
}
```

`queryMode` should exist from the beginning even if MVP only ships `all`.

## MVP Concept Set

The vault plan recommends starting with 8 concepts:

- Flying
- Card Draw
- Token Generation
- Removal
- Tempo
- Recursion
- Control
- Storm / Spells Matter

A sensible reviewed expansion to 20-25 could include:

- Sacrifice
- Aristocrats
- Evasion
- Haste
- Ramp
- Big Mana
- Graveyard
- Reanimator
- Spellslinger
- Spell Copy
- Voltron
- Equipment
- Enchantress
- Blink / Flicker
- Counters
- Proliferate
- Landfall / Lands Matter
- Treasure
- Stax / Taxes
- Politics / Deals
- Pillow Fort
- Typal

The first implementation should not try to model all of Magic.

## Query Semantics

The Loom plan names three query modes:

- `ALL`: selected concepts are ANDed together.
- `ANY`: selected concepts are ORed together.
- `PACKAGE`: selected concepts become a role package rather than one strict query.

MVP should implement `ALL`, but the design should not trap itself there. Pure AND logic can produce zero-result searches when users combine too many ideas.

Example:

```text
destroy + reanimate + extra combat + payoff
```

That may be too restrictive as one Scryfall query. PACKAGE mode would instead create a card-search package:

- removal cards,
- recursion cards,
- extra combat cards,
- payoff cards,
- and explanation of why the package exists.

This is powerful, but it also edges toward deckbuilding. It should be treated as future and reviewed carefully.

## Where The Idea Connects To Reading Finds

VM-426 reframed Maze local capture as Reading Finds:

```text
Maze captures. Archscry interprets.
```

For Loom v1, Reading Finds can be the memory loop:

1. Archscry gives a placement.
2. User enters Maze/Loom.
3. Loom explains a concept or thread.
4. User sets aside real cards into Finds, Sparks, or Anchors.
5. User returns to Archscry.
6. The dossier reflects the cards through reading/path/tag context.

Guardrail: Reading Finds must not score, rank, validate legality, grade synergy, or become account deck storage.

## Recommended Boundaries

The Loom should be allowed to:

- generate Scryfall queries from concepts,
- explain query meaning,
- infer concepts from real card fields,
- show related strategy threads,
- connect to placement evidence when available,
- link to Strategium for table-literacy context,
- and preserve Reading Finds as a local review loop.

The Loom should not:

- invent Magic card facts,
- invent commander legality,
- claim card synergy certainty,
- rank best cards,
- build decklists,
- replace Scryfall,
- duplicate the parser,
- run GenAI at runtime,
- mutate generated data,
- or publish custom card ideas as real cards.

## Review Questions For Owner

1. Is the current Visual Builder officially Loom v0, with the graph concept as Loom v1?
2. Should "The Loom" remain the tab label, or should v0 be renamed "Visual Builder" until v1 exists?
3. Should the first real Loom slice be Explorer Mode, Query Reflection Mode, or Card Detail Loom Mode?
4. Is custom card generation part of the Loom vision, or should it stay in a separate design lab?
5. Should The Loom own archetype language, or should it link into Strategium for archetype education?
6. Should Commander Finder be a future Loom mode, or remain a separate Commander Compass evolution?
7. How much placement evidence should influence Loom threads before it feels too personalized or too confident?
8. Should PACKAGE mode be allowed, given that it can start to resemble deckbuilding?
9. What labels feel most Vox Mana-native: Related Threads, Strategy Threads, Concept Paths, or something else?
10. Which 8-12 concepts should be the first reviewed concept registry seed?

## Suggested Next Work After Review

Do not jump directly into a full graph build. A safer sequence:

1. Decision note: confirm Loom v0/v1 naming, scope, and first mode.
2. Concept registry seed: review 8-12 concepts with query fragments, aliases, and guardrails.
3. Query adapter spike: concept click -> query preview -> existing Maze search.
4. Query Reflection spike: existing query -> literal fields -> inferred concepts.
5. Card Interpreter spike: card object -> obvious concepts -> similar-card query.
6. Related Threads spike: selected concepts -> 3-5 reviewed threads.
7. Placement Bridge design: optional weighting from Archscry evidence, after the base Loom works.

## Bottom Line

The Loom idea is strongest when treated as a bridge, not a replacement:

```text
Parser for syntax.
Scryfall for real card results.
Tag taxonomy for canonical meanings.
Strategium for table archetype literacy.
Commander Compass for commander-facing guidance.
Placement evidence for personal context.
The Loom for seeing the hidden connections among them.
```

That gives you the foundation-to-generation system you remembered, while keeping Vox Mana honest: mystical in presentation, but evidence-first in behavior.

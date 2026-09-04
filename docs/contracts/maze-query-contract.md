# Maze Query Contract

## Purpose And Scope

VM-022 defines a Maze-first v1 contract for the shared query core. The contract describes how route code passes user intent, builder state, and Archscry/dossier launch context into the core, and how the core returns one executable Scryfall query plus display and trace metadata.

This contract records current behavior. It is not a new product design and it should not change generated query strings, Scryfall request metadata, rendered result behavior, modal behavior, or handoff storage semantics unless a separate bug fix explicitly documents the change. VM-405 and VM-426 are the documented exceptions for the route-owned local capture layer: VM-405 replaced the V1 stash, and VM-426 reframed that layer as Reading Finds while preserving query, modal, result, and Archscry handoff behavior.

## Non-Goals

- No public API transport.
- No package publishing.
- No Maze UI redesign.
- No VM-010 Loom graph work.
- No Scryfall fetch, cache, or in-flight dedupe rewrite.
- No Archscry handoff storage key or payload rewrite.
- No modal, query, Scryfall result-rendering, or Archscry handoff behavior change.

## Ownership Boundary

Core-owned behavior:

- Plain Reading parse and translation.
- Raw syntax normalization.
- Builder-to-query translation.
- Parser mode classification, including `exact_name`.
- Launch/source normalization.
- Dossier/path query generation.
- Normalized Scryfall API metadata assembly.
- Source-context normalization.

UI-owned behavior:

- DOM reads and writes.
- Loading state and route boot sequencing.
- Button wiring and mode presentation.
- `localStorage` and `sessionStorage` persistence.
- Scryfall fetch execution through `assets/js/maze/research-search.js`.
- Query Inspector rendering, result grid rendering, card modal behavior, and Reading Finds behavior.

Preserved legacy adapter boundaries:

- `vm_archscry_maze_handoff_v1` storage key and semantics.
- `vm_maze_reading_finds_v1` Reading Finds storage key, with read-only migration from `vm_maze_deck_idea_v2` and legacy `vm_maze_card_stash_v1`.
- `vm_scryfall_api_v1:*` request caching and in-flight dedupe behavior.
- Current exact-name modal flow.
- Current route-local mode state transitions.

## Request Shape

`MazeQueryRequest`:

```js
{
  mode: "ai" | "raw" | "builder",
  origin?: "maze" | "archscry" | "path" | "placement" | "dossier",
  input: string,
  builderFilters?: MazeBuilderFilters,
  launchContext?: MazeLaunchContext,
  placementContext?: MazePlacementContext,
  options?: MazeQueryOptions
}
```

`mode` is how Maze searches. It must stay limited to `ai`, `raw`, and `builder`.

`origin` is where the request came from. Archscry/path launches can initialize Maze into raw execution, but `path` is not a search mode.

`MazeQueryOptions` v1:

```js
{
  format?: string,
  useFormatDefault?: boolean,
  order?: string,
  unique?: "cards" | "art" | "prints",
  dir?: "auto" | "asc" | "desc",
  endpoint?: "/cards/search" | "/cards/named"
}
```

## Result Shape

`MazeQueryResult`:

```js
{
  query: string,
  plainReadingQuery?: string,
  reason?: string,
  mode: "ai" | "raw" | "builder",
  parserMode?: "plain_reading" | "raw" | "exact_name" | "builder",
  diagnostics?: MazeDiagnostic[],
  api: MazeQueryApiMetadata,
  sourceContext?: MazeSourceContext,
  normalized: boolean
}
```

`query` is the only executable Scryfall query returned by the core.

`plainReadingQuery` is display and trace metadata only. It must not drive fetch execution unless it is passed through the core again.

`MazeDiagnostic`:

```js
{
  level: "info" | "warning" | "error",
  code: string,
  message: string,
  source?: "parser" | "raw" | "builder" | "launch" | "placement" | "contract",
  field?: string,
  details?: object
}
```

Contract tests should assert stable `code` values instead of full message text.

Current v1 diagnostic code groups:

| Code | Details | Query Inspector use |
|---|---|---|
| `parser_confidence` | `{ confidence: number }` | Confidence chip. |
| `parser_recognized` | Optional display details only. | Recognized chips. |
| `parser_ignored` | Optional display details only. | Ignored chips. |
| `parser_applied_default` | Optional display details only. | Applied-default chips. |
| `parser_assumption` | Optional display details only. | Assumption chips. |
| `parser_warning_N` | Optional display details only. | Warning chips. |
| `parser_unresolved_term` | `{ term: string }` | Unresolved chips. |
| `parser_alternative` | `{ query: string, api?: object }` | Alternative query buttons. |
| `parser_validation_plan` | `{ relaxations: Array<{ label, query, api?, category? }> }` | Hidden until a zero-result response needs repair suggestions. |
| `parser_validation_result` | `{ totalCards: 0 }` | Warning chip after the real Scryfall response returns no cards. |
| `parser_ambiguous` | Optional display details only. | Ambiguity/warning chips. |
| `parser_blocking_ambiguity` | `{ ambiguity: object }` | Blocking ambiguity warning derived from `queryModel.ambiguous`. |
| `parser_ambiguity_choice` | `{ query: string, api?: object, ambiguity?: object }` | Choice buttons for blocking ambiguity. |
| `raw_recognized` | Optional display details only. | Recognized chips for raw normalization. |
| `raw_assumption` | Optional display details only. | Assumption chips for raw normalization. |
| `raw_warning` | Optional display details only. | Warning chips for raw normalization. |
| `raw_alternative` | `{ query: string, api?: object }` | Alternative query buttons for raw normalization. |
| `raw_mixed_plain_reading` | Optional display details only. | Shows when Operator's Hand input was classified as mixed/plain English and routed through Plain Reading. |
| `raw_name_like` | Optional display details only. | Shows when Operator's Hand input was treated as a card-name lookup. |

The core owns structured diagnostic data. Query Inspector labels, button markup, and presentation remain UI-owned.

`MazeQueryApiMetadata`:

```js
{
  order?: string,
  unique?: "cards" | "art" | "prints",
  dir?: "auto" | "asc" | "desc",
  endpoint?: "/cards/search" | "/cards/named"
}
```

Do not add API metadata fields unless current code already uses them or the adapter explicitly normalizes them.

Plain Reading parser results currently carry default search metadata of `endpoint: "/cards/search"`, `unique: "cards"`, and `order: "name"`. That parser metadata remains authoritative over route sort/unique state unless the parser omits a field.

VM-471 adds a grounded Plain Reading compiler layer for catalog-backed type/subtype terms, keywords, set names, set families, glue words, basic commander candidate intent, basic color identity, and a small oracle-text acceptance slice. Grounded type/set-family searches can set `suppressFormatDefault` so the route-level format selector does not silently append Commander legality to raw type/set searches such as `all villains from the spiderman set`. When the compiler applies a visible product default such as `game:paper` or `prefer:best`, the core surfaces it as `parser_applied_default`.

VM-472 makes that grounded compiler the normal Plain Reading path when the local grounding artifact is loaded. The compiler consumes the generated Scryfall grounding artifact, the seed dictionary, and `data/scryfall/grounding/plain-reading-semantics.json`. It returns a query model, typed-span diagnostics, alternatives, and a response-based validation plan. Generic Plain Reading no longer receives route-level Commander filtering silently; Commander intent must be visible as query syntax such as `legal:commander` or `is:commander legal:commander`. Archscry initial launches are unchanged: stored `operatorQuery` values still execute as raw Scryfall syntax, while `plainReadingQuery` remains display/context text unless the user edits and reruns Plain Reading.

VM-473 adds deterministic mixed-mode routing for Operator's Hand. Pure Scryfall operator input remains raw, including quoted/operator-embedded English such as `o:"draw a card" f:commander`. Mixed input with explicit operators plus English outside operator values, such as `all heroes in the marvel set f:commander`, is routed through Plain Reading while preserving explicit fragments. No-operator, multi-word, name-like input with no recognized catalog/registry spans routes to the named-card endpoint instead of prose compilation. Blocking ambiguity is derived from `queryModel.ambiguous`; when a set family such as `marvel set` is ambiguous, Maze renders choices and does not execute Scryfall until one is selected.

VM-477 tightens Commander/color Plain Reading grammar. Bare `commanders` emits commander-candidate eligibility (`is:commander legal:commander`) plus resolved filters. Named, mono-color, and five-color commander identities are exact candidate searches (`id=... is:commander legal:commander`); includes-color wording such as `commanders with blue` uses `id>=...`; commander deck-support wording such as `cards for my Rakdos commander deck` uses `id<=... legal:commander`; no-color deck wording must not invent identity. Format-only wording such as `blue wizards legal in commander` keeps actual card color (`c:u`) and Commander legality. Alternatives, zero-result relaxations, and set-family choices must be derived from the normalized query model after color, role, format, set, type, oracle, keyword, and negation resolution. Friendly set-family names are display metadata only; executable Scryfall syntax may remain raw `set:`/`s:` clauses.

VM-481 narrows the retested compiler-semantics repairs without changing the public Maze search API. Single-color actual-card fixtures with explicit Commander legality can use exact card color (`blue wizards legal in commander` -> `type:wizard c=u legal:commander`), while named multicolor adjectives before actual card types use no-outside-color matching (`c<=...`) unless the phrase asks for exact multicolor cards. Explicit mono deck-support remains exact identity (`id=b legal:commander`), non-mono deck-support remains fit-based (`id<=br legal:commander`), and commander candidates keep exact identities for named/colorless/five-color/Glint or Chaos wording. Token-object searches such as `inkling tokens from Strixhaven legal in commander` compile to token objects (`type:inkling type:token` plus set/color context), warn that token objects are not Commander deck-legal cards, and do not add `legal:commander`.

VM-482 prevents the route-level format default from reintroducing Commander legality on token-object syntax. Automatic format appending is suppressed only for exact positive token-object clauses such as `type:token` and `t:token`, including a single outer grouping wrapper; explicit user format syntax is preserved. Token-making text such as `o:token`, quoted Oracle text, `st:token`, `include:extras`, plain token words, and negated token-type clauses still receive the normal format default. Generic four-color Commander candidate phrasing now emits `id=4 is:commander legal:commander`, while named four-color identities such as Glint/Chaos keep their exact named identity.

VM-483 scopes two umbrella-set exceptions into the compiler contract. `marvel set` and `tarkir set` no longer block; they expand to explicit OR groups made from the local set grounding data / VM-483 local mapping, while unrelated ambiguous family names still block until the user chooses one family. VM-483 also centralizes Commander format-default gating through `applyMazeFormatToQuery()` / `shouldApplyFormatDefault()`: raw and Plain Reading normal-card searches can still receive the selected `f:<format>` default, but token-object intent and positive `type:token` / `t:token` syntax suppress automatic `f:commander` and automatic `legal:commander`. Explicit raw legality remains raw-preserved, so user-authored `type:token f:commander` and `type:token legal:commander` are not stripped. The retest fixtures also pin the Spider-Man/Rakdos Villain exact-color exception (`c=br`), keep Mardu warriors at `c<=wbr`, bind `attack with tokens` as one Oracle-text constraint instead of loose `o:token o:attack`, and preserve full Glint/Chaos four-color span resolution as exactly `id=ubrg`.

VM-484 hardens the token-object boundary with regression coverage. Subtype/object phrases such as `pest tokens`, `treasure tokens`, and raw positive `type:token` / `t:token` clauses remain token-object searches and suppress automatic Commander legality. Token-maker card wording such as `cards that create tokens`, `cards that create creature tokens`, `cards that make tokens`, `o:token`, `oracle:token`, and quoted Oracle text containing `token` must not be treated as token-object intent; those searches keep normal card-search Commander legality/default behavior.

VM-487 supersedes the VM-483 fixture-specific Rakdos exact-color exception with a scoped actual-card pool rule. A named multicolor identity attached to a non-token printed type/subtype search emits `c<=<colors> -c:c`, including nonempty subsets of the named colors while excluding colorless and outside-color cards. Commander candidates, deck support, explicit identity wording, token objects, single colors, and exact-color phrasing retain their existing operators. Token-object compilation now detects object intent before set resolution, then refines resolved playable parent/product sets to locally grounded token children; true token sets are selected while substitute-card sets are excluded from inference, explicit token-set input remains exact, and token-maker searches keep playable set constraints. The current Silverquill fixture is `type:inkling type:token c<=wb s:tstx`. Validation plans may add one combined `abilities` relaxation after individual Oracle/functional/keyword relaxations; Commander candidates label it `Use any matching commander` and preserve identity, candidate, legality, set, and type clauses. `without mill` resolves to `-o:mill`, and redundant `legal in commander` wording is consumed when candidate detection already emitted Commander legality.

VM-490 adds two narrow search boundaries. Generic-card wording `cards with partner` emits Oracle text search `o:partner`; `all colors` means no color constraint and must never resolve to the Alliances set code. The exact unscoped `o:partner` query suppresses the selected format default in both Plain Reading and Operator's Hand, while Commander-candidate Partner searches, `partner with`, negative Partner clauses, and scoped Oracle searches retain their existing behavior. Conservative bare card-name input in Plain Reading emits executable `name:"..."` syntax and uses `/cards/search`, including `captain america` and punctuation-bearing names such as `A-Alrund, God of the Cosmos`. Explicit `!Name` and `card named Name` input keep the existing `/cards/named` modal path. Standalone name lookups and name lookups with display-only controls do not receive an implicit format; mixed filters such as `name:"Token Collector" c:w` retain normal format-default behavior.

## Path Entry Shape

`MazePathEntry`:

```js
{
  label: string,
  sidebarLabel?: string,
  hint?: string,
  pathType: string,
  query: string,
  plainReadingQuery?: string,
  description?: string,
  isBroad?: boolean,
  profileKey?: string,
  profileName?: string,
  readingSummary?: string,
  threads?: Array<{
    threadId: string,
    semanticKind: "mechanical" | "flavor-story",
    label: string,
    interpretation: string,
    query: string,
    sourceLocator: string
  }>,
  stretch?: {
    availability: "available" | "unavailable",
    interpretation: string
  }
}
```

Current stable dossier path types:

- `commanders-that-fit`
- `support-cards`
- `flavor-echoes`
- `weird-stretch-commanders`

Treat those four values as the v1 enum for dossier path entries. `resolveMazePathType()` can still preserve legacy string slugs for older non-dossier quick links, but VM-022 must not introduce new dossier `pathType` values.

VM-547 adds source-governed discovery metadata without changing the executable-query boundary or duplicating path ownership. `data/dossier/identity-dossier-content.source.json` remains the meaning owner for all 37 approved readings. `data/dossier/maze-discovery-profiles.source.json` owns the reviewed Scryfall projection of that meaning, and `scripts/build/build-maze-discovery-profiles.mjs` produces the runtime catalog consumed by both Archscry and Maze. `buildDossierMazePathEntries()` remains the only shared runtime factory.

Mechanical threads may carry a lane-specific projection override when the same governed idea needs tighter commander, support, or stretch syntax. An `available` override must provide a mechanical query clause. An `unavailable` override must provide an honest rationale and must not provide executable syntax. The shared factory retains the unavailable thread as explained Maze context while omitting it from the top-level OR query and suppressing its Search/query-inspection actions. This is a semantic-population boundary, not a new path type.

The commander path is an exact color-identity eligibility pool and must be labeled as broad, never as semantic fit or ranking. The support and stretch paths project three named mechanical threads. The story path uses only flavor-text vocabulary and explicitly disclaims mechanical fit. Thread syntax is inspection detail; the default presentation leads with the governed label and plain-English interpretation. Runtime AI is not part of this pipeline.

Colorless continues to use the established `colorless-identity`, `colorless-noncommander-support`, `colorless-story-echoes`, and `outside-color-stretch` aliases. WUBRG retains four governed top-level states but exposes only three executable paths: its outside-color state is `unavailable` because no Commander identity exists outside Five-Color. The UI must explain that boundary and must not generate a placeholder query.

`scripts/audit/vm547-projection-audit.mjs` is the deterministic card-level trust gate for this catalog. It evaluates all 367 lane projections against the pinned local Oracle corpus, requires every executable projection to be nonempty, and snapshots one positive, one plausible semantic negative, and one boundary card per executable projection in `tests/fixtures/vm547-projection-card-fixtures.json`. `docs/qa/2026-09-04-vm547-all-367-projection-evidence.md` is the review rendering of the same records. The gate also rejects standalone high-recall semantic branches when their labels promise narrower meaning, rejects conjunctive labels over top-level OR alternatives, and pins named false-positive regressions. These fixtures and checks are build-time QA only; they do not add runtime ranking, corpus lookup, or AI generation.

## Builder Filter Inventory

`MazeBuilderFilters` snapshots the current `bFilters` shape used by `assets/js/maze/research-init.js` and `assets/js/maze/research-builder.js`:

```js
{
  colors: string[],
  colorOp: "c" | "id" | "c<=" | "c>=" | string,
  types: string[],
  format: string,
  keywords: string[],
  cmcMin: string,
  cmcMax: string,
  releaseYear: string,
  printingScope: "any" | "first-printing" | "new-art",
  rarities: string[]
}
```

Current field behavior:

| Field | Current owner | Preserved behavior |
|---|---|---|
| `colors` | `research-init.js` toggles pips; `research-builder.js` reads it | Selected WUBRGC symbols are sorted and converted into a color or identity fragment. |
| `colorOp` | `research-init.js` reads `#color-op`; `research-builder.js` reads it | `c` emits exact color, `id` emits Commander identity, other values are preserved as operator prefixes. |
| `types` | `research-init.js` toggles type chips; `research-builder.js` reads it | One type emits `t:type`; multiple types emit an OR group. |
| `format` | `research-init.js` defaults `#bld-format` to `commander`; `research-builder.js` reads it | Emits `f:format` from builder state. This is separate from sidebar format options used by raw and Plain Reading requests. |
| `keywords` | `research-init.js` owns keyword chips; `research-builder.js` reads it | One keyword emits `kw:keyword`; multiple keywords emit an OR group, quoting multi-word keywords. |
| `cmcMin` | `research-init.js` reads `#cmc-min`; `research-builder.js` reads it | Emits `mv>=value` when present. |
| `cmcMax` | `research-init.js` reads `#cmc-max`; `research-builder.js` reads it | Emits `mv<=value` when present. |
| `releaseYear` | `research-init.js` reads `#release-year`; `research-builder.js` reads it | A non-empty valid four-digit year from 1993 onward emits `year=<year>` Scryfall release filtering; invalid values block route delivery locally and reveal recovery on attempted delivery. |
| `printingScope` | `research-init.js` reads `#printing-scope`; `research-builder.js` reads it | Disabled until `releaseYear` is valid. `any` adds no clause; `first-printing` adds `is:firstprinting`; `new-art` adds `new:art`. |
| `rarities` | `research-init.js` toggles rarity chips; `research-builder.js` reads it | One rarity emits `r:value`; multiple rarities emit an OR group. |

Do not limit the inventory to this table if future code reads additional fields. The table is the v1 field floor, not a license to ignore hidden state.

## Placement Context Inventory

Minimum `MazePlacementContext` v1 fields from current placement/path usage:

```js
{
  readingId?: string,
  fit?: string,
  pathType?: string,
  returnUrl?: string,
  guild?: string,
  factionName?: string,
  readingTitle?: string,
  identity?: string,
  oracleTerms?: string[],
  flavorTerms?: string[],
  placementResult?: object
}
```

Field notes:

| Field | Rule |
|---|---|
| `readingId` | Pass-through identity used with `fit` and `pathType` to detect return-banner dismissal continuity. |
| `fit` | Active Archscry view key. Current Maze sidebar generation prefers this over stale primary placement when present. |
| `pathType` | Pass-through path lane metadata. Dossier v1 values are the four enum values above. |
| `returnUrl` | Pass-through return target. UI owns URL persistence and banner rendering. |
| `guild` | Legacy fallback for active faction key. |
| `factionName` | Display name and path copy source. |
| `readingTitle` | Display/trace metadata and fallback decree text for active handoff recovery. |
| `identity` | Path-generation input for shared dossier paths. |
| `oracleTerms` | Path-generation input for commander/support/stretch lanes. |
| `flavorTerms` | Path-generation input for flavor/story lanes. |
| `placementResult` | Legacy adapter object used by UI-owned active placement recovery. |

## Launch And Source Context Rules

`MazeLaunchContext` is normalized from query parameters and/or the existing Archscry handoff. Current source function: `resolveMazeLaunchState(urlParams, existing)`.

```js
{
  from?: string,
  urlQ?: string,
  operatorQuery?: string,
  plainReadingQuery?: string,
  pathType?: string,
  returnUrl?: string,
  readingId?: string,
  fit?: string,
  factionName?: string,
  readingTitle?: string
}
```

`MazeSourceContext` is normalized output metadata derived from `origin`, `launchContext`, and `placementContext`.

Pass-through fields must stay byte-stable in tests. Transformed fields must document the transformation:

| Output field | Rule |
|---|---|
| `origin` | Normalized to one of `maze`, `archscry`, `path`, `placement`, or `dossier`; invalid values fall back to `maze`. |
| `readingId` | Pass-through from launch first, placement second. |
| `fit` | Pass-through from launch first, placement second. |
| `pathType` | Pass-through from launch first, placement second. |
| `returnUrl` | Pass-through from launch first, placement second. |
| `plainReadingQuery` | Pass-through display metadata; never executable by itself. |
| `operatorQuery` | Pass-through executable handoff query; core may expose it as `query` only after request resolution. |
| `factionName` | Pass-through display/path metadata. |
| `readingTitle` | Pass-through display metadata. |
| `from` | Legacy pass-through from launch context. |
| `urlQ` | Legacy pass-through URL query seed. |

## Exact-Name Behavior

The parser currently emits `parserResult.mode === "exact_name"` for explicit named-card lookup language such as `! Lightning Bolt`, `lookup Lightning Bolt`, or `find card named Lightning Bolt`.

The contract represents this as:

```js
{
  mode: "ai",
  parserMode: "exact_name",
  query: "Lightning Bolt",
  api: { endpoint: "/cards/named" }
}
```

Exact-name is parser/result behavior, not a Maze search mode. Maze route code still owns the distinct named-card fetch and modal rendering flow.

## Plain Reading Vs Executable Query

- `query` is executable Scryfall syntax or exact-name lookup text.
- `plainReadingQuery` is display/trace text used for mode switching, sidebar continuity, and human-readable handoff context.
- Path launches may set the search input to `plainReadingQuery` while executing `operatorQuery`, but the executable value must enter the contract as `query`.
- Raw mode normalization may rewrite `A AND B` into `A B` because Scryfall treats spaces as filter conjunctions.
- Format options may append `f:format` only when the query does not already include a format filter.

## Field-To-Code Mapping

| Contract field | Current source file/function | Current caller or owner | Preserved behavior | Coverage | Category |
|---|---|---|---|---|---|
| `request.mode` | `assets/js/maze/research-init.js` `currentMode`, `setMode()` | Maze route controls | Only `ai`, `raw`, and `builder` are search modes. | `research-mode-tests.js`, `maze-query-contract-tests.js` | UI-owned input, core-normalized |
| `request.origin` | URL/handoff source around `resolveMazeLaunchState()` | Maze launch adapter | Describes source without changing search mode. | `maze-query-contract-tests.js` | Core-owned normalization |
| `request.input` | `#search-input` in `doSearch()` and launch handling | Maze route | Raw user text or launch-seeded display text. | `maze-search-tests.js`, `maze-query-contract-tests.js` | UI-owned input |
| `request.builderFilters` | `bFilters`, `buildFilterQuery()` | Maze builder controls | Emits current builder query strings unchanged. | `research-builder-tests.js`, `maze-query-contract-tests.js` | Core-owned translation |
| `request.launchContext` | `assets/js/maze/maze-handoff.js` `resolveMazeLaunchState()` | Archscry/Maze handoff adapter | Preserves operator/plain/path/return metadata. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Pass-through plus core normalization |
| `request.placementContext` | `getStoredPlacementResult()`, `activePlacementResultFromArchscryHandoff()`, `createReadingPaths()` | Maze route sidebar adapter | Active handoff fit wins over stale primary placement for sidebar paths. | `maze-search-tests.js`, `archscry-adjacent-navigation-tests.js`, `maze-query-contract-tests.js` | Legacy adapter plus core path input |
| `request.options.format` | `#sb-format`, `applySelectedFormatToQuery()` | Maze route format select | Appends `f:format` only when absent. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned normalization |
| `request.options.order` | `currentOrder`, `changeOrder()` | Maze route sorting controls | Preserves Scryfall order metadata. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned metadata |
| `request.options.unique` | `currentUnique`, parser API metadata | Maze route and parser | Preserves `cards`, `art`, or `prints`. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned metadata |
| `request.options.dir` | `currentDir`, `normalizeSortDirection()` | Maze route and parser | Preserves `auto`, `asc`, or `desc`. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned metadata |
| `result.query` | Parser, raw normalizer, builder, path handoff | Maze search execution | Only executable query returned by the core. | All parser/builder/Maze tests | Core-owned |
| `result.plainReadingQuery` | Handoff/path metadata and Plain Reading input | Mode switching and sidebar continuity | Display/trace only; not fetch input unless reprocessed. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Pass-through/display |
| `result.reason` | Parser reason, raw normalization, format append | Query Inspector | Explanation copy remains diagnostic-only. | `scryfall-parser-tests.js`, `maze-query-contract-tests.js` | Core-owned metadata |
| `result.mode` | Request mode | Maze route | Search mode echoed after normalization. | `maze-query-contract-tests.js` | Core-owned normalization |
| `result.parserMode` | `parseScryfallNaturalLanguage()` and request mode | Core result | Represents `plain_reading`, `raw`, `exact_name`, or `builder`. | `maze-query-contract-tests.js` | Core-owned |
| `result.diagnostics` | Parser result and raw normalizer diagnostics | Contract tests and Query Inspector rendering | Stable diagnostic codes; messages remain non-contractual. | `maze-query-contract-tests.js`, `maze-search-tests.js` | Core-owned data, UI-owned rendering |
| `result.api` | Parser API metadata, route sort state, `research-search.js` URL builder | Maze search execution and links | Preserves endpoint/order/unique/dir currently used. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned metadata |
| `result.sourceContext` | Launch and placement context | Maze return/sidebar adapter | Normalized source metadata with pass-through stability. | `maze-query-contract-tests.js` | Core-owned normalization |
| `result.normalized` | Raw normalizer, format append, parse translation | Query Inspector | Indicates user-visible input changed before execution. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned |
| `MazePathEntry.label` | `buildDossierMazePathEntries()` | Archscry and Maze sidebar | Stable path label. | `quick-reading-tests.js`, `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned path output |
| `MazePathEntry.sidebarLabel` | `buildDossierMazePathEntries()` | Maze sidebar | Sidebar label may differ from route label. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned path output |
| `MazePathEntry.hint` | `buildDossierMazePathEntries()` | Maze sidebar | Short lane hint remains display metadata. | `maze-query-contract-tests.js` | Core-owned path output |
| `MazePathEntry.pathType` | `buildDossierMazePathEntries()`, `resolveMazePathType()` | Archscry and Maze handoff | Four dossier path types are stable v1 enum values. | `quick-reading-tests.js`, `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned path output |
| `MazePathEntry.query` | `buildDossierMazePathEntries()` | Maze execution | Executable path query. | `quick-reading-tests.js`, `maze-search-tests.js`, `maze-query-contract-tests.js` | Core-owned path output |
| `MazePathEntry.plainReadingQuery` | `buildDossierMazePathEntries()` | Maze display/mode switching | Optional display/trace metadata. | `quick-reading-tests.js`, `maze-search-tests.js`, `maze-query-contract-tests.js` | Pass-through/display |

## Contract Test Matrix

| Scenario | Assertion focus | Test location |
|---|---|---|
| Search mode union | `path` is not a mode; origins remain separate. | `tests/maze/maze-query-contract-tests.js` |
| Plain Reading request | Executable query, `parserMode: "plain_reading"`, format append, API metadata. | `tests/maze/maze-query-contract-tests.js` |
| Exact-name request/input | `parserMode: "exact_name"`, `/cards/named`, current modal flow preserved by adapter. | `tests/maze/maze-query-contract-tests.js`, `tests/maze/maze-search-tests.js` |
| Raw request | `A AND B` normalizes to `A B`, stable diagnostic code. | `tests/maze/maze-query-contract-tests.js`, `tests/maze/maze-search-tests.js` |
| Query Inspector diagnostics | Contract diagnostics render confidence, recognized, assumptions, warnings, unresolved terms, and alternatives without legacy adapter diagnostics. | `tests/maze/maze-search-tests.js` |
| Builder request | Current `bFilters` inventory emits unchanged query fragments. | `tests/maze/maze-query-contract-tests.js`, `tests/maze/research-builder-tests.js` |
| Archscry launch normalization | Origin/source metadata stays stable. | `tests/maze/maze-query-contract-tests.js`, `tests/maze/maze-search-tests.js` |
| Dossier path generation | Shared legacy fallback plus 37 canonical discovery profiles, four governed states per dossier, 147 executable top-level paths, and WUBRG's explicit unavailable stretch boundary. | `tests/maze/maze-query-contract-tests.js`, `tests/maze/maze-discovery-profile-tests.js`, `tests/placement/quick-reading-tests.js`, `tests/maze/maze-search-tests.js` |
| API metadata | `endpoint`, `order`, `unique`, and `dir` are normalized from current behavior only. | `tests/maze/maze-query-contract-tests.js`, `tests/maze/maze-search-tests.js` |
| Pass-through stability | Launch/source fields remain unchanged unless documented. | `tests/maze/maze-query-contract-tests.js` |
| Regression floor | Existing parser, builder, mode, Maze, placement, and presentation checks still pass. | `npm test`, `npm run test:parser`, `node tests/maze/maze-search-tests.js` |

## Implementation Notes

- The first reusable core surface is `assets/js/maze/maze-query-core.js`.
- `assets/js/maze/research-init.js` remains the route adapter and still owns fetch execution, DOM behavior, stash, modal, and storage.
- `prepareRawSyntaxQuery()` and format application now live in the shared core so raw normalization is not route-local.
- `buildDossierMazePathEntries()` remains the shared path factory for Archscry and Maze.
- VM-547 profile-owned entries add semantic threads and source locators to that same factory output. Archscry renders only the compact top-level links; Maze owns the expanded reading, thread, interpretation, and optional query-inspection presentation.

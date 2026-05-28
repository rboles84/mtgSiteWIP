# Maze Query Contract

## Purpose And Scope

VM-022 defines a Maze-first v1 contract for the shared query core. The contract describes how route code passes user intent, builder state, and Archscry/dossier launch context into the core, and how the core returns one executable Scryfall query plus display and trace metadata.

This contract records current behavior. It is not a new product design and it should not change generated query strings, Scryfall request metadata, rendered result behavior, stash behavior, modal behavior, or handoff storage semantics unless a separate bug fix explicitly documents the change.

## Non-Goals

- No public API transport.
- No package publishing.
- No Maze UI redesign.
- No VM-010 Loom graph work.
- No Scryfall fetch, cache, or in-flight dedupe rewrite.
- No Archscry handoff storage key or payload rewrite.
- No stash, modal, or result-rendering behavior change.

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
- Scryfall fetch execution through `research/research-search.js`.
- Query Inspector rendering, result grid rendering, card modal behavior, and stash behavior.

Preserved legacy adapter boundaries:

- `vm_archscry_maze_handoff_v1` storage key and semantics.
- `vm_maze_card_stash_v1` stash key and export shape.
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
| `parser_assumption` | Optional display details only. | Assumption chips. |
| `parser_warning_N` | Optional display details only. | Warning chips. |
| `parser_unresolved_term` | `{ term: string }` | Unresolved chips. |
| `parser_alternative` | `{ query: string, api?: object }` | Alternative query buttons. |
| `raw_recognized` | Optional display details only. | Recognized chips for raw normalization. |
| `raw_assumption` | Optional display details only. | Assumption chips for raw normalization. |
| `raw_warning` | Optional display details only. | Warning chips for raw normalization. |
| `raw_alternative` | `{ query: string, api?: object }` | Alternative query buttons for raw normalization. |

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

## Path Entry Shape

`MazePathEntry`:

```js
{
  label: string,
  sidebarLabel?: string,
  hint?: string,
  pathType: string,
  query: string,
  plainReadingQuery?: string
}
```

Current stable dossier path types:

- `commanders-that-fit`
- `support-cards`
- `flavor-echoes`
- `weird-stretch-commanders`

Treat those four values as the v1 enum for dossier path entries. `resolveMazePathType()` can still preserve legacy string slugs for older non-dossier quick links, but VM-022 must not introduce new dossier `pathType` values.

## Builder Filter Inventory

`MazeBuilderFilters` snapshots the current `bFilters` shape used by `research/research-init.js` and `research/research-builder.js`:

```js
{
  colors: string[],
  colorOp: "c" | "id" | "c<=" | "c>=" | string,
  types: string[],
  format: string,
  keywords: string[],
  cmcMin: string,
  cmcMax: string,
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
| `request.mode` | `research/research-init.js` `currentMode`, `setMode()` | Maze route controls | Only `ai`, `raw`, and `builder` are search modes. | `research-mode-tests.js`, `maze-query-contract-tests.js` | UI-owned input, core-normalized |
| `request.origin` | URL/handoff source around `resolveMazeLaunchState()` | Maze launch adapter | Describes source without changing search mode. | `maze-query-contract-tests.js` | Core-owned normalization |
| `request.input` | `#search-input` in `doSearch()` and launch handling | Maze route | Raw user text or launch-seeded display text. | `maze-search-tests.js`, `maze-query-contract-tests.js` | UI-owned input |
| `request.builderFilters` | `bFilters`, `buildFilterQuery()` | Maze builder controls | Emits current builder query strings unchanged. | `research-builder-tests.js`, `maze-query-contract-tests.js` | Core-owned translation |
| `request.launchContext` | `assets/js/maze-handoff.js` `resolveMazeLaunchState()` | Archscry/Maze handoff adapter | Preserves operator/plain/path/return metadata. | `maze-search-tests.js`, `maze-query-contract-tests.js` | Pass-through plus core normalization |
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
| Search mode union | `path` is not a mode; origins remain separate. | `research/maze-query-contract-tests.js` |
| Plain Reading request | Executable query, `parserMode: "plain_reading"`, format append, API metadata. | `research/maze-query-contract-tests.js` |
| Exact-name request/input | `parserMode: "exact_name"`, `/cards/named`, current modal flow preserved by adapter. | `research/maze-query-contract-tests.js`, `research/maze-search-tests.js` |
| Raw request | `A AND B` normalizes to `A B`, stable diagnostic code. | `research/maze-query-contract-tests.js`, `research/maze-search-tests.js` |
| Query Inspector diagnostics | Contract diagnostics render confidence, recognized, assumptions, warnings, unresolved terms, and alternatives without legacy adapter diagnostics. | `research/maze-search-tests.js` |
| Builder request | Current `bFilters` inventory emits unchanged query fragments. | `research/maze-query-contract-tests.js`, `research/research-builder-tests.js` |
| Archscry launch normalization | Origin/source metadata stays stable. | `research/maze-query-contract-tests.js`, `research/maze-search-tests.js` |
| Dossier path generation | Four stable `MazePathEntry` records and path types. | `research/maze-query-contract-tests.js`, `assets/js/quick-reading-tests.js`, `research/maze-search-tests.js` |
| API metadata | `endpoint`, `order`, `unique`, and `dir` are normalized from current behavior only. | `research/maze-query-contract-tests.js`, `research/maze-search-tests.js` |
| Pass-through stability | Launch/source fields remain unchanged unless documented. | `research/maze-query-contract-tests.js` |
| Regression floor | Existing parser, builder, mode, Maze, placement, and presentation checks still pass. | `npm test`, `npm run test:parser`, `node research/maze-search-tests.js` |

## Implementation Notes

- The first reusable core surface is `research/maze-query-core.js`.
- `research/research-init.js` remains the route adapter and still owns fetch execution, DOM behavior, stash, modal, and storage.
- `prepareRawSyntaxQuery()` and format application now live in the shared core so raw normalization is not route-local.
- `buildDossierMazePathEntries()` remains the shared path factory for Archscry and Maze.

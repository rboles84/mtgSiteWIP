# Core Logic And Algorithms

This document describes the project-specific logic that is easiest to lose track of when reading individual files in isolation.

## Adaptive Placement

Files: `assets/js/adaptive-placement.js`, `data/placement-model.json`, plus the external faction artifact builder in `C:\dev\projectFiles\voxmana-tools`.

The adaptive placement engine treats each faction as a hypothesis with an equal log prior. Each answer carries likelihoods for one or more factions. The engine converts likelihoods into configured log-score deltas, applies positive and negative evidence, optionally suppresses lookalike factions through lateral inhibition, prunes poison-pill matches, and converts scores into probabilities through softmax.

Main flow:

1. `createInitialAdaptiveState` seeds every faction with the same prior and empty trails.
2. `selectNextAdaptiveQuestion` asks all Gate questions first, then Hall questions targeted to top candidates, then a Crucible question when the top pair is close enough.
3. `applyAdaptiveAnswer` clones state, records the question/answer, applies deltas, suppression, broad-match penalties, pruning, and evidence trail entries.
4. `rankAdaptiveFactions` calls `softmaxScores` and sorts ranked matches.
5. `shouldFinishAdaptiveReading` finishes when stage limits, confidence gap, or question limits are satisfied.
6. `buildAdaptivePlacementResult` emits the shared result contract used by save/resume and dossier rendering.

Key ideas:

- Gate questions establish broad priors.
- Hall questions gather sharper evidence for the current likely candidate set.
- Crucible questions resolve close lookalike pairs.
- Lateral inhibition prevents a broad answer from rewarding every same-color or similar-expression faction.
- Pruned factions are assigned probability zero during softmax.
- Evidence trail and stage history make the result explainable.

## Legacy Quick Reading

File: `assets/js/quick-reading.js`.

This older quick engine scores fixed questions by summing mana weights and faction boosts, then ranks display factions by boost score plus a small color-affinity contribution. It remains in the repo for compatibility/history, while current placement tests and bias reports exercise the adaptive engine.

Main flow:

1. `QUICK_QUESTIONS` provides fixed answer cards with mana weights, faction boosts, and signals.
2. `scoreQuickReading` aggregates mana totals and faction totals.
3. `buildQuickReason` and `buildQuickDecree` create short explanatory text from selected signals and faction metadata.
4. `buildQuickPlacementResult` normalizes output into the shared result shape.
5. `runQuickReadingBiasSimulation` and `runQuickReadingExhaustiveAnalysis` measure distribution reachability.

## Archscry Frontend Flow

Files: `archscry/index.html`, `assets/js/index.js`, `assets/js/shared.js`.

`assets/js/index.js` is the current production Archscry controller. It imports adaptive placement helpers, uses global helpers from `shared.js`, exposes handlers for existing inline HTML attributes, then boots after `DOMContentLoaded`.

Flow:

1. Load `/data/factions.json` and `/data/placement-model.json`.
2. Render starter profile chips.
3. Resume Supabase/session state and pending OAuth saves.
4. Show a saved/cached result or the landing state.
5. Quick path creates adaptive state, renders answer cards, applies selections, and finalizes.
6. Interview path calls `vm_startInterview` and `vm_conductInterview`.
7. Result rendering switches between primary and adjacent fits, renders deck/source guidance, loads Scryfall card art, and exposes save actions.

## Scrying Terminal Backend

Files: `assets/js/shared.js`, `supabase/functions/guild-recruiter/index.ts`, `supabase/functions/guild-recruiter/faction-context.ts`.

Frontend helpers in `shared.js` keep interview history and call the edge function. The edge function sanitizes input, enforces simple in-memory rate limiting, builds a prompt from generated faction context, calls Anthropic, parses JSON, and normalizes a decision result before returning it.

Important constraints:

- `MAX_TURNS` is 5.
- `MAX_HISTORY_ITEMS` is 8.
- `MAX_MESSAGE_LENGTH` is 700.
- `MAX_CALLS_PER_MINUTE` is 7.
- The model must output JSON only.
- Decisions must include a usable `faction` and `decree` before being normalized.
- The edge function uses generated faction context instead of inventing lore at runtime.

Failure handling:

- Empty/too-long messages return `400`.
- Non-POST returns `405`.
- Rate-limit overflow returns `429`.
- Invalid model output falls back to a safe recovery question.
- Missing Anthropic key or service failures return a JSON error.

## Persistence And Resume

File: `assets/js/shared.js`.

Persistence centers on a normalized placement result.

Flow:

1. `normalizePlacementResult` fills compatibility fields and clamps values.
2. `vm_cachePlacementResult` stores guest/current results in `sessionStorage`.
3. `vm_savePlacementResult` writes Supabase profile fields plus full `placement_result`.
4. `vm_saveWithGoogle` stores a pending result and starts OAuth.
5. `vm_checkPendingSave` completes save after redirect.
6. `vm_resumeSession` loads Supabase auth/profile and syncs `VM_SESSION`.
7. `vm_clearPlacement` clears saved placement fields while preserving auth.

Legacy fallback:

- `makeLegacyPlacementResult` can build a minimal result from old profile rows containing `guild` and `scores`.

## Scryfall Natural-Language Parser

Files: `research/scryfall-parser.js`, `research/scryfall-dictionary.js`, `research/scryfall-parser-seed-2026.json`.

The parser converts plain-English search requests into Scryfall syntax with diagnostics.

Flow:

1. `loadDictionaryFromSeedUrl` loads seed rows.
2. `createDictionaryFromSeed` expands trigger phrases into dictionaries and oracle rows.
3. `parseScryfallNaturalLanguage` normalizes input, creates mutable parse state, detects exact-card intent, checks high-confidence special rules, then runs detector phases.
4. Detector phases add terms for formats, identities, colors, types, keywords, oracle phrases, mana value, power/toughness, rarity, price, sorting, and ambiguity.
5. `assembleQuery`, `scoreConfidence`, and `buildReason` finalize the result.
6. Alternatives and unresolved terms help users recover when the parser is unsure.

Design notes:

- Commander intent switches color handling toward identity queries.
- Exact color intent uses `c=` instead of broad `c:`.
- "Counter" ambiguity gets special handling to avoid confusing counterspells with +1/+1 counters.
- Protection phrases avoid accidentally interpreting target colors as card colors.

## Maze Research Workspace

Files: `maze.html`, `research/research-init.js`, `research/research-builder.js`, `research/research-mode.js`, `research/research-ui.js`, `research/research-search.js`.

The Maze has three modes:

- Plain Reading: parse natural language, then search Scryfall.
- Operator's Hand: accept raw Scryfall syntax and prepare diagnostics.
- Loom: build a query from visual filters.

The UI keeps mode state, filter state, search results, pagination, recent searches, keyword suggestions, query inspector content, and modal state in module-local variables. It exposes handlers for existing inline attributes after module load.

## Visual Builder Query Logic

File: `research/research-builder.js`.

`buildVisualBuilderQuery` joins independent filter fragments:

- Colors use selected symbols and a color operator.
- Types emit `t:<type>`.
- Format emits `f:<format>`.
- Rarity emits one or more rarity terms.
- Mana values emit `mv>=` and `mv<=`.
- Keywords emit `kw:<keyword>` or quoted keyword terms.

`parseKeywordInput` detects known multi-word keywords before falling back to cleaned freeform tokens.

## Scryfall Syntax Translation

Files: `research/research-syntax-language.js`, `research/research-mode.js`.

`translateScryfallSyntaxToPlainText` parses common Scryfall fragments into a readable phrase. `resolveModeInputValue` uses that translation when switching between raw syntax and Smart Search, preserving the last smart input/query pair to avoid surprising text replacement.

## Asset Source Generation

File: external asset-source generator in `C:\dev\projectFiles\voxmana-tools`.

This deterministic script writes SVG source files for icons, overlays, textures, and architecture fragments. It uses small template helpers (`svg`, `overlay`, `texture`, `arch`) and known output folders under `assets/img`.

It does not generate painterly WEBP backgrounds; those are tracked in the asset manifest as generation/review work.

## Faction Artifact Build

File: external faction artifact builder in `C:\dev\projectFiles\voxmana-tools`.

This script reads every raw faction folder, validates expected ids, normalizes placement/profile data, builds faction records, builds the adaptive model, writes the JSON schema, and emits the edge-function TypeScript context.

Important transforms:

- Raw folder ids are converted to runtime faction keys.
- Biological priors and known lateral inhibition targets are merged into placement records.
- Discriminator questions are normalized with fallback ids and collision targets.
- Good/poor indicators and inhibitor traps are flattened to plain lists.
- Context is condensed for prompt use while keeping display metadata.

## Command Panel

Files: external command panel in `C:\dev\projectFiles\voxmana-tools`.

The command panel is a local-only Node service for source-review workflow. The server reads allowlisted commands, imports external Apocrypha manifest/dry-run data, builds an inventory, persists state, serves static panel assets, exposes JSON APIs, and runs commands through `spawn`.

Safety-relevant behavior:

- Served run files are resolved through `safeResolve`.
- Commands are loaded from `commands.json`, not arbitrary user input.
- Run output is written to dedicated stdout/stderr logs.
- State writes use a temporary file plus rename.

The browser panel stores filters in `localStorage`, renders inventory/detail/queue/run views, and calls the server APIs to update state or run commands.

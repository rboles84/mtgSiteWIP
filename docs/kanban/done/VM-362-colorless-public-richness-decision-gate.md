# VM-362 - Colorless Public Richness Decision Gate

ID: VM-362
Title: Colorless Public Richness Decision Gate
Status: done
Type: governance / decision gate
Area: Colorless / public richness / product boundaries
Priority: high
Created: 2026-06-12
Completed: 2026-06-12

## Summary

Record a docs/Kanban-only decision gate for whether `COLORLESS` should expand beyond its controlled placeable, sparse public state.

Default outcome: conservative preservation. This card does not implement public expansion and does not approve any deferred surface without a later implementation card.

## Pre-Flight Findings

- `git status --short` showed broad unrelated dirty drift before edits, including runtime files, generated data, raw packets, Colorless image drift, docs, Kanban, and handoffs.
- VM-334 ratified `COLORLESS` as controlled placeable with `colors: []`, `core_color: "C"`, `aliases: ["COLORLESS"]`, `preview_eligible: false`, and `routing.suppress_directory_links: true`.
- VM-337 through VM-341 expanded and polished controlled dossier/source-authority surfaces only; Home preview, public routes, aliases, directory links, Commander Compass, broad deck advice, and image edits remained out of scope.
- VM-340 certified Colorless Layer 2 as gold for controlled source authority, not public product expansion.
- VM-359 is the direct precedent for Colorless public-richness source gating, but it does not fully cover this decision because it lacks explicit Approved, Deferred, and Blocked decision sections and does not clarify the `colorless.webp` dossier-hero boundary.
- VM-362 was confirmed unused across Kanban cards and handoffs before creation; VM-361 remains an unrelated in-progress mono source-inventory card.

## Decision Record

The decision record lives in `docs/architecture/colors/colorless/product-decision-gate.md` under `VM-362 Public Richness Decision Gate`.

## Approved To Preserve

- Current controlled placement.
- Current dossier visibility.
- Current `id=c` exact-Colorless Maze behavior and current `id<=c` Colorless-safe support/flavor Maze behavior.
- Existing source-safe snippets only.
- Controlled mana-primer and caution copy already present on controlled surfaces.
- Current controlled Colorless deck-start behavior if already implemented and strict `id=c` / Colorless-safe.
- Current `assets/img/identity-hero/colorless.webp` dossier hero usage.

Preserving `colorless.webp` dossier hero usage does not approve Home, public, or discovery hero rollout. It also does not approve image edits, replacement, recrop, broader asset deployment, or treating the image as source evidence.

## Deferred

- Home preview.
- Public route or public URL expansion.
- Lowercase `colorless` alias.
- `C` alias.
- Directory links.
- Broader public discovery.
- New or broader deck links.
- Research links.
- Land-package advice, deck advice, broad recommendations, exact deck-buying advice, prices, or metagame claims.
- Public raw-enrichment surfacing for timeline, figures, or flavor.
- Candidate Crucibles `COLORLESS/YORE`, `COLORLESS/ESPER`, and `COLORLESS/WITCH` until paired source support plus reproducible close-call evidence exists.

Any deferred surface later approved must be split into a separate implementation card with source authority, build changes, runtime changes, no-leak scans, and QA criteria.

## Blocked

- `COLORLESS/WUBRG` Crucible or comparison until `WUBRG` exists in Layer 1.
- Any decision based on generated/runtime copy, model memory, web claims, generic artifact preference, five-color Eldrazi, Phyrexia, or sixth-color framing as evidence.
- Any raw Colorless JSON, generated artifact, runtime route, Home preview, alias, directory, image, validator, builder, snippet, or UI implementation change under this card.

## Explicitly Out Of Scope

- No raw Colorless JSON edits.
- No generated artifact edits or rebuild acceptance.
- No runtime route, Home preview, alias, directory, validator, builder, snippet, image, or UI code edits.
- No source intake, web search, MTG/card/Commander claims, or generated-copy evidence.
- No movement of unrelated Kanban cards.
- No staging.

## Acceptance Gates

- [x] Decision record contains explicit Approved, Deferred, and Blocked sections.
- [x] The decision record explicitly distinguishes itself from VM-359 and records that VM-359 does not supersede it.
- [x] No deferred or blocked surface is implemented by this card.
- [x] Current Colorless Layer 1 contract remains unchanged.
- [x] Current controlled placement, dossier, Maze, hero, snippet, deck-start, and mana-primer behavior remains preserved.
- [x] No raw, generated, runtime, route, Home, alias, directory, image, validator, builder, or UI code files are modified.
- [x] Any approved future expansion is explicitly split into a separate implementation card.
- [x] Files are not staged.

## Test Plan

- Count/contract probe confirming 36 identity expressions, 36 display entries, 36 placement entries, 36 snippet entries, 20 Home preview entries, `COLORLESS.preview_eligible === false`, `routing.suppress_directory_links === true`, aliases exactly `["COLORLESS"]`, and `WUBRG` absent.
- `npm.cmd run validate:source-generated -- --targets=COLORLESS`; the known model-owned inhibitor warning remains acceptable.
- `npm.cmd run test:placement`.
- `npm.cmd run dossier:audit`.
- Targeted no-public-expansion scans for Colorless route/Home/alias/directory/Commander Compass/new deck-link/raw-enrichment leaks.
- Scoped `git diff --check` over touched docs/Kanban/handoff files.

## Validation Results

- Count/contract probe passed: 36 identity expressions, 36 display entries, 36 placement entries, 36 snippet entries, 20 Home preview entries, `COLORLESS.preview_eligible === false`, `routing.suppress_directory_links === true`, aliases exactly `["COLORLESS"]`, and `WUBRG` absent.
- `npm.cmd run validate:source-generated -- --targets=COLORLESS` passed with the known single model-owned inhibitor warning.
- `npm.cmd run test:placement` passed with 36 factions and 36 golden paths.
- `npm.cmd run dossier:audit` passed with 36 primary dossiers, 74 adjacent dossiers, 110 warnings, and 0 failures.
- Targeted no-public-expansion JSON probe passed: Colorless is absent from Home preview, has no lowercase `colorless` alias, has no `C` alias, keeps directory links suppressed, and has no Commander Compass, deck links, research links, or raw enrichment.
- Scoped route-link scan found no Colorless route, href, data-route, or location-link exposure.
- Broader no-public scan found only expected controlled/negative references in dossier copy and tests.
- Scoped `git diff --check` over touched docs/Kanban/handoff files passed with Git line-ending normalization warnings only.

## Not Touched

- `data/raw-factions/colorless/*.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- runtime JavaScript, CSS, or HTML
- routes, Home preview metadata, aliases, directory links, Commander Compass, validators, builders, snippets, images, or UI code
- VM-361 or other unrelated Kanban cards
- staging or commits

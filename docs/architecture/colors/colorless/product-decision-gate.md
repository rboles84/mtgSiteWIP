# Colorless Product Decision Gate

Status: Ratified by VM-334; public-richness addendum ratified by VM-362; support-only controlled richness addendum ratified by VM-372
Decision date: 2026-06-11
Related card: `docs/kanban/done/VM-334-colorless-product-decision-gate.md`

## Decision

`COLORLESS` is a controlled placeable Layer 1 identity in Vox Mana. It is not reference-only.

This decision ratifies the repo-current state established by VM-327 and repaired by VM-329 and VM-331. It does not add new runtime behavior, public routing, Home preview membership, aliases, generated artifact changes, raw evidence changes, Supabase manual context, or image edits.

## Accepted Contract

`COLORLESS` uses this controlled representation:

- `key: "COLORLESS"`
- `kind: "colorless"`
- `colors: []`
- `secondary_colors: []`
- `core_color: "C"`
- `display_code: "C"`
- `aliases: ["COLORLESS"]`
- `placement_eligible: true`
- `preview_eligible: false`
- `routing.suppress_directory_links: true`

`C` is a technical outside-WUBRG marker for the controlled Colorless lane. It is not a sixth color, not mono-color, not generic mana, and not five-color.

## Authority Boundary

Layer 1 authority is split by role:

- Claim evidence lives in the five raw Colorless files under `data/raw-factions/colorless/` and approved local source/evidence ledgers under `docs/research/colorless/`.
- Generated files such as `data/factions.json`, `data/placement-model.json`, `data/archscry-flavor-snippets.json`, and `supabase/functions/guild-recruiter/faction-context.ts` are build output, not evidence.
- `data/identity-layers.json` is Layer 1 registry/routing authority for expression membership, aliases, preview policy, routing, and display metadata. It is not claim evidence under VM-325.
- Old research folders, canon notes, drafts, audits, and architecture essays remain support material unless a later card explicitly promotes the relevant section into raw packets, claim ledgers, source ledgers, or an approved decision record.

## Accepted Surfaces

- `COLORLESS` remains controlled placeable and dossier-visible.
- Home preview remains disabled through `preview_eligible: false`.
- Public route, directory alias, public Colorless URL expansion, lowercase alias expansion, and Home carousel expansion are not approved by this decision.
- Generated Supabase context may include `COLORLESS` only as generated placement/recruiter context. It is not claim evidence and must not be hand-authored as part of this card.
- Existing or future approved dossier hero mapping may reference `assets/img/identity-hero/colorless.webp`, but VM-334 does not add, remove, regenerate, normalize, or edit that mapping or image.
- The accepted Maze query contract is `id=c` for exact Colorless commanders and `id<=c` for Colorless-legal support/flavor lanes. VM-334 does not alter Maze generation.

## VM-362 Public Richness Decision Gate

Status: conservative preservation.
Related card: `docs/kanban/done/VM-362-colorless-public-richness-decision-gate.md`
Precedent: VM-359 reviewed Colorless public-richness source readiness and preserved a no-expansion result. VM-359 does not supersede this addendum because it did not record the explicit approved, deferred, and blocked product-decision sections below.

This addendum does not implement any expansion. It preserves the existing controlled Colorless state and defers public-richness work unless a later card explicitly approves a scoped implementation with source, build, runtime, and QA criteria.

### Approved To Preserve

- Current controlled placement and dossier visibility.
- Current `id=c` exact-Colorless Maze behavior and current `id<=c` Colorless-safe support/flavor Maze behavior.
- Existing source-safe snippets only. VM-362 does not add, remove, regenerate, or expand snippet content.
- Controlled mana-primer and caution copy already present on controlled surfaces.
- Current controlled Colorless deck-start behavior if already implemented and strict `id=c` / Colorless-safe.
- Current `assets/img/identity-hero/colorless.webp` dossier hero usage.

Preserving `colorless.webp` for the dossier hero does not approve Home, public, or discovery hero rollout. It also does not approve image edits, replacement, recrop, broader asset deployment, or treating the image as source evidence.

### Deferred

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
- Exactly one canonical `COLORLESS/WUBRG` Crucible is approved by VM-369 after WUBRG Layer 1 existence, source-boundary support, and reproduced placement confusion. This approval does not add Colorless Compass links, deck links, research links, Home route, preview eligibility, directory links, aliases, schema/API expansion, or broader public richness.

Any deferred surface that is later approved must be split into a separate implementation card with source authority, build changes, runtime changes, no-leak scans, and QA criteria.

### Blocked

- Additional `COLORLESS/WUBRG` Crucibles, reverse-order `WUBRG/COLORLESS` duplicates, or public comparison surfaces beyond the single VM-369 placement Crucible.
- Any decision based on generated/runtime copy, model memory, web claims, generic artifact preference, five-color Eldrazi, Phyrexia, or sixth-color framing as evidence.
- Any raw Colorless JSON, generated artifact, runtime route, Home preview, alias, directory, image, validator, builder, snippet, or UI implementation change under VM-362.

## VM-372 Support-Only Controlled Richness Addendum

Status: narrow implementation approved.
Related card: `docs/kanban/done/VM-372-colorless-support-only-controlled-richness.md`

VM-372 approves only support-only controlled richness for:

- `commander_compass`
- The single named official precon `deck_links` row: `Eldrazi Unbound (Precon)`
- `research_links` as internal/source-context links

This approval does not approve public route, Home preview, directory links, lowercase aliases, `C` aliases, hero asset work, schema/API expansion, public raw enrichment, broad Commander recommendation surfaces, broad staples, EDHREC browse links, MTGDecks browse links, legality claims, popularity claims, metagame claims, price claims, or recommendation-quality claims.

`commander_legal: null` is intentional because VM-372 does not introduce legality assertions; legality remains outside the support-only row contract unless backed by a future source/governance card.

The approved Commander Compass rows are limited to `Zhulodok, Void Gorger` and `Omarthis, Ghostfire Initiate`. They may assert only that the current exact-name Scryfall `id:c` checks returned those card names with empty color identity, and that the official Commander Masters decklist names them inside Eldrazi Unbound. They must not use broader `id:c is:commander` searches as implementation input.

Research links remain source-context only. They must not enable public directory browsing, EDHREC, MTGDecks, derived browse links, or broad outbound recommendation surfaces.

## Expansion Blockers

The following remain blocked behind separate approval:

- Manual browser QA for Colorless dossier visual fit, hero crop, Matrix Boundary copy, mana-base panel, and Maze handoff labels.
- Source intake before richer Commander compass, deck advice, land-package advice, or Colorless recommendation expansion.
- Separate product approval for Home preview, public routes, public aliases, public URL expansion, broader hero rollout, or richer public copy.
- Any repair if validation proves current runtime contradicts the accepted `id=c` / `id<=c` Maze contract.

## Non-Goals

VM-334 does not:

- edit raw Colorless JSON
- regenerate or accept generated output diffs
- hand-edit generated artifacts as evidence
- change runtime code or product behavior
- change routes, Home preview, public aliases, schemas, Supabase manual context, or image files
- stage files

## Validation Contract

Completion requires:

- Current counts remain at 36 identity expressions, 36 generated display entries, 36 placement entries, 36 flavor-snippet entries, and 20 Home preview entries.
- `WUBRG` remains absent from controlled placement.
- All five `data/raw-factions/colorless/*.json` hashes match before and after VM-334.
- `npm.cmd run validate:source-generated -- --targets=COLORLESS` has no new failures; the known model-owned inhibitor warning remains acceptable.
- Regression tests are diagnostic only unless failures are caused by VM-334 documentation edits.

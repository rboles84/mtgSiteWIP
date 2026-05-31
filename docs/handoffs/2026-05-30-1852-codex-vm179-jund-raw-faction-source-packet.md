# VM-179 Jund Raw-Faction Source Packet Handoff

## Agent Name

Codex

## Task Requested

Implement VM-179 by creating Jund's authored-but-not-live raw-faction source packet under `data/raw-factions/jund/`, using VM-176 evidence rows and VM-177/VM-178 architecture shaping only, while avoiding runtime, generated, placement, schema, route, Home, Maze, Supabase, fixture, test, Naya, and existing Jund docs changes.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1754-codex-vm176-jund-source-packet.md`
- `docs/handoffs/2026-05-30-1812-codex-vm177-jund-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-1826-codex-vm178-jund-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-1035-codex-vm166-grixis-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-176-jund-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-177-jund-identity-metaphysics.md`
- `docs/kanban/done/VM-178-jund-docs-parity-fill.md`
- `docs/kanban/done/VM-166-grixis-raw-faction-source-packet.md`
- `docs/research/jund/jund-source-ledger.md`
- `docs/research/jund/jund-evidence-ledger.md`
- `docs/research/jund/jund-manual-fill.md`
- `docs/research/jund/jund-research-dossier.md`
- `docs/architecture/colors/jund/identity.md`
- `docs/architecture/colors/jund/metaphysics.md`
- `data/raw-factions/bant/*.json`
- `data/raw-factions/esper/*.json`
- `data/raw-factions/grixis/*.json`

## Files Changed

- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/raw-factions/jund/jund.changelog.json`
- `docs/kanban/done/VM-179-jund-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-1852-codex-vm179-jund-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added five Jund raw-faction JSON files in the same authored source-packet family as Bant, Esper, and Grixis.
- Created exactly 10 Jund raw claims with IDs `jund_claim_0001` through `jund_claim_0010`.
- Bound raw claims only to planned VM-176 rows: `JUND-EVID-001` through `JUND-EVID-010`, plus `JUND-EVID-012` and `JUND-EVID-013`.
- Classified every source as `claim-bearing`, `shaping-only`, or `support-only`.
- Kept VM-177/VM-178 architecture docs as shaping-only inputs for profile and placement wording, not raw-claim evidence.
- Kept support-only Commander/operator, Scryfall, color-philosophy, comparator, seed, generated HTML, and manual-fill material out of raw claims.
- Left `placement_axes` empty and kept Jund source-only, review-gated, and non-live.
- Created and completed the VM-179 Kanban card, then updated the board and handoff index.

## Why It Changed

VM-179 is the source-data airlock between Jund architecture docs and any later review or runtime work. It gives VM-180 a structured raw packet to review without wiring `JUND` or `BRG` into builder, generated, placement, route, fixture, Home, Maze, Supabase, or runtime surfaces.

## Decisions Made

- Used `jund_claim_0001`-style raw claim IDs to match the accepted raw packet family.
- Kept VM-176 `JUND-EVID-###` rows as evidence references only.
- Used only claim-bearing VM-176 sources in raw claims.
- Included VM-177/VM-178 architecture docs as shaping-only source entries.
- Left `BRG` as color-direction metadata only.
- Left `JUND` as source-packet identity text only, not a public expression key.
- Did not create placement axes, faction coordinates, route keys, fixture keys, aliases, generated keys, or app behavior.

## Risks / Uncertainties

- Detailed Jund geography, ecology, named figures, predator hierarchy, dragon rule, Conflux chronology, and devour-as-total-identity remain deferred.
- Commander/operator material is present in support-only profile notes and must not become raw claims without a later source review.
- The repository remains dirty from prior shard work; VM-179 validation used scoped status/diff checks instead of assuming a clean tree.
- Current raw-packet precedents include files that were later touched by runtime work. VM-179 followed the source-only structure and avoided copying later live/status metadata.
- A VM-183 Naya handoff/index row appeared while VM-179 was in progress. VM-179 preserved that row and did not edit Naya files.

## Tests Run

- `Test-Path data/raw-factions/jund` before implementation returned `False`.
- `rg -n "VM-179" docs/kanban docs/handoffs` confirmed no VM-179 card or handoff existed.
- Node parse check for all five Jund raw JSON files.
- Node top-level key comparison against accepted Bant/Esper/Grixis raw packet files.
- Node VM-179 JSON validation:
  - exactly five expected JSON files exist;
  - all five parse;
  - top-level raw packet shape matches the accepted raw packet family;
  - every source has a `claim-bearing`, `shaping-only`, or `support-only` role;
  - all claim source IDs resolve;
  - exactly 10 raw claims exist;
  - claim IDs are `jund_claim_0001` through `jund_claim_0010`;
  - raw claims reference only the planned VM-176 evidence rows;
  - raw claims reference only `claim-bearing` sources;
  - profile and placement claim references are subsets of the 10 raw claim IDs;
  - `placement_axes` is `[]`.
- `rg` scan confirming `jund.claims.json` contains no support-only, synthesis, reliability/non-live, or manual-fill row IDs.
- `rg` scan for blocked runtime/status/readiness terms across Jund raw JSON and the VM-179 Kanban card; no hits.
- `git diff --name-only -- docs/research/jund docs/architecture/colors/jund docs/research/naya docs/architecture/colors/naya data/raw-factions/naya`; no hits.
- `git diff --check` on scoped VM-179 files; passed with existing line-ending warnings on board/index.
- ASCII and trailing-whitespace scans on newly authored VM-179 JSON/card/handoff files.

Skipped:

- `npm run build:factions`, because VM-179 does not wire Jund into generation.
- Runtime or placement tests, because VM-179 adds source-only raw JSON and no runtime contracts.

## Not Touched

- `docs/research/jund/`
- `docs/architecture/colors/jund/`
- `docs/research/naya/`
- `docs/architecture/colors/naya/`
- `data/raw-factions/naya/`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/generated/`
- schemas
- Supabase files
- Home files
- Maze files
- route CSS/JS
- runtime JS
- placement fixtures
- route maps
- browser bundles
- tests

## Follow-Up Recommendations

- VM-180 should review the Jund raw packet before any further data or runtime work.
- Do not wire `JUND`, `BRG`, or `jund` into builders, generated data, fixtures, routes, Home, Maze, Supabase, or runtime surfaces until a later explicit card approves that step.
- If later Jund work needs geography, figures, predator hierarchy, devour theory, Conflux chronology, or card-specific facts, capture stronger local evidence first.

## Next Suggested Agent

JSON Cartographer for VM-180 raw-packet review gate, if approved.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-179-jund-raw-faction-source-packet.md`
- `docs/kanban/done/VM-176-jund-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-177-jund-identity-metaphysics.md`
- `docs/kanban/done/VM-178-jund-docs-parity-fill.md`
- `docs/research/jund/jund-evidence-ledger.md`
- `docs/architecture/colors/jund/identity.md`
- `docs/architecture/colors/jund/metaphysics.md`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.placement.json`

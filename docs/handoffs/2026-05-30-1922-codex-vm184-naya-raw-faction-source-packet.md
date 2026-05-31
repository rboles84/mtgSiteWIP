# VM-184 Naya Raw-Faction Source Packet Handoff

## Agent Name

Codex

## Task Requested

Implement VM-184 by creating Naya's authored-but-not-live raw-faction source packet under `data/raw-factions/naya/`, using VM-181 evidence rows and VM-182/VM-183 architecture shaping only, while avoiding runtime, generated, placement, schema, route, Home, Maze, Supabase, fixture, test, and existing Naya docs changes.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1817-codex-vm181-naya-source-packet.md`
- `docs/handoffs/2026-05-30-1828-codex-vm182-naya-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-1848-codex-vm183-naya-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-1852-codex-vm179-jund-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1922-codex-vm180-jund-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-181-naya-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-182-naya-identity-metaphysics.md`
- `docs/kanban/done/VM-183-naya-docs-parity-fill.md`
- `docs/kanban/done/VM-179-jund-raw-faction-source-packet.md`
- `docs/research/naya/naya-source-ledger.md`
- `docs/research/naya/naya-evidence-ledger.md`
- `docs/research/naya/naya-manual-fill.md`
- `docs/architecture/colors/naya/identity.md`
- `docs/architecture/colors/naya/metaphysics.md`
- `data/raw-factions/jund/*.json`
- `data/raw-factions/grixis/*.json`
- `data/raw-factions/bant/*.json`

## Files Changed

- `data/raw-factions/naya/naya.sources.json`
- `data/raw-factions/naya/naya.claims.json`
- `data/raw-factions/naya/naya.profile.json`
- `data/raw-factions/naya/naya.placement.json`
- `data/raw-factions/naya/naya.changelog.json`
- `docs/kanban/done/VM-184-naya-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-30-1922-codex-vm184-naya-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added five Naya raw-faction JSON files in the same authored source-packet family as Jund, Grixis, Esper, and Bant.
- Created exactly 10 Naya raw claims with IDs `naya_claim_0001` through `naya_claim_0010`.
- Bound raw claims only to planned VM-181 rows: `NAYA-EVID-001` through `NAYA-EVID-009`, plus `NAYA-EVID-011` and `NAYA-EVID-013`.
- Classified every source as `claim-bearing`, `shaping-only`, or `support-only`.
- Kept VM-182/VM-183 architecture docs as shaping-only inputs for profile and placement wording, not raw-claim evidence.
- Kept support-only Commander/operator, Scryfall, color-philosophy, comparator, seed, dossier, generated report, and manual-fill material out of raw claims.
- Left `placement_axes` empty and kept Naya source-only, review-gated, and non-live.
- Created and completed the VM-184 Kanban card, then updated the board and handoff index.

## Why It Changed

VM-184 is the source-data airlock between Naya architecture docs and any later review or runtime work. It gives a future VM-185-style review gate a structured raw packet to inspect without wiring `NAYA`, `RGW`, `GRW`, `WRG`, or `naya` into builder, generated, placement, route, fixture, Home, Maze, Supabase, or runtime surfaces.

## Decisions Made

- Used `naya_claim_0001`-style raw claim IDs to match the accepted raw packet family.
- Kept VM-181 `NAYA-EVID-###` rows as evidence references only.
- Used only claim-bearing VM-181 sources in raw claims.
- Included VM-182/VM-183 architecture docs as shaping-only source entries.
- Left `RGW`, `GRW`, and `WRG` as color-direction metadata only.
- Left `NAYA` as source-packet identity text only, not a public expression key.
- Did not create placement axes, faction coordinates, route keys, fixture keys, aliases, generated keys, public labels, or app behavior.

## Risks / Uncertainties

- Detailed Naya geography, named figures, religion, social structure, creature-culture hierarchy, Progenitus theology, Gahiji origin, Cylian/Nacatl polity claims, power-5 totalization, Commander canon, and post-Phyrexian outcomes remain deferred.
- Commander/operator material is present in support-only profile notes and must not become raw claims without a later source review.
- The repository remains dirty from prior work; VM-184 validation used scoped status/diff checks instead of assuming a clean tree.
- Current raw-packet precedents include files that were later touched by runtime work. VM-184 followed the source-only structure and avoided copying live/status metadata.
- A VM-180 Jund review-gate handoff/index row appeared while VM-184 was in progress. VM-184 preserved that row and did not edit Jund files.

## Tests Run

- `Test-Path data/raw-factions/naya` before implementation returned `False`.
- `rg -n "VM-184" docs/kanban docs/handoffs` confirmed no VM-184 card or handoff existed.
- PowerShell parse check for all five Naya raw JSON files.
- Top-level key comparison against accepted Jund raw packet files.
- JSON validation:
  - exactly five expected JSON files exist;
  - all five parse;
  - top-level raw packet shape matches the accepted raw packet family;
  - every source has a `claim-bearing`, `shaping-only`, or `support-only` role;
  - all claim source IDs resolve;
  - exactly 10 raw claims exist;
  - claim IDs are `naya_claim_0001` through `naya_claim_0010`;
  - raw claims reference only the planned VM-181 evidence rows;
  - raw claims reference only `claim-bearing` sources;
  - profile and placement claim references are subsets of the 10 raw claim IDs;
  - `placement_axes` is `[]`.
- `rg` scan confirming `naya.claims.json` contains no Commander row IDs, manual-fill IDs, seed IDs, support-only rows, or disallowed evidence rows.
- Guard scan for blocked active/live/status/preview/placement eligibility values; no hits.
- Metadata guard confirming search aliases/tags do not use RGW/GRW/WRG as alias or tag values.
- Claim source scan confirming no seed, dossier, architecture, or source-material references in `naya.claims.json`.
- `rg -n "naya|NAYA|RGW|GRW|WRG" research/build-faction-artifacts.mjs`; no hits.
- `git diff --name-only -- docs/research/naya docs/architecture/colors/naya data/raw-factions/naya`; only the new Naya raw packet is part of this task.
- ASCII and trailing-whitespace scans on newly authored VM-184 JSON/card files.
- `git diff --check` on scoped VM-184 files; passed with existing line-ending warning on `docs/kanban/board.md`.

Skipped:

- `npm run build:factions`, because VM-184 does not wire Naya into generation.
- Runtime or placement tests, because VM-184 adds source-only raw JSON and no runtime contracts.

## Not Touched

- `docs/research/naya/`
- `docs/architecture/colors/naya/`
- `data/raw-factions/jund/`
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

- VM-185 should review the Naya raw packet before any further data or runtime work.
- Do not wire `NAYA`, `RGW`, `GRW`, `WRG`, or `naya` into builders, generated data, fixtures, routes, Home, Maze, Supabase, or runtime surfaces until a later explicit card approves that step.
- If later Naya work needs geography, named figures, religion, creature-culture hierarchy, power-5 mechanics, Commander canon, or post-Phyrexian outcomes, capture stronger local evidence first.

## Next Suggested Agent

JSON Cartographer for VM-185 raw-packet review gate, if approved.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-184-naya-raw-faction-source-packet.md`
- `docs/kanban/done/VM-181-naya-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-182-naya-identity-metaphysics.md`
- `docs/kanban/done/VM-183-naya-docs-parity-fill.md`
- `docs/research/naya/naya-evidence-ledger.md`
- `docs/architecture/colors/naya/identity.md`
- `docs/architecture/colors/naya/metaphysics.md`
- `data/raw-factions/naya/naya.claims.json`
- `data/raw-factions/naya/naya.placement.json`

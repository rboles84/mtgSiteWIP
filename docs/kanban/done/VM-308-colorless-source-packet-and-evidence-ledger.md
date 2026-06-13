# VM-308 - Colorless Source Packet And Evidence Ledger

ID: VM-308
Title: Colorless Source Packet And Evidence Ledger
Status: done
Type: Research / Source Packet
Area: Colorless, Research, Evidence Control
Priority: high
Created: 2026-06-09
Completed: 2026-06-09

## Summary

Normalize the Colorless source packet and evidence ledger while keeping VM-308 source-only. This card does not authorize identity docs, raw packets, review gates, runtime promotion, generated artifacts, image cleanup, route changes, schemas, Supabase, Home, Maze, or builder work.

## Scope Completed

- Created the managed Colorless research packet under `docs/research/colorless/`.
- Created source-role classification for every current Colorless source-material file.
- Recorded the unmanaged relocation risk between `docs/research/canon/colorless/**` and `docs/research/colorless/**`.
- Created evidence, reliability, manual-fill, and guarded lore-source packet docs.
- Preserved unresolved downstream questions as manual-fill gaps for later cards.

## ID Adjustment

The original plan named VM-307 through VM-312. Pre-flight found VM-307 already occupied by the Lorehold mechanics and signal-balance repair, so the Colorless stack starts at VM-308. Future Colorless cards should use the next available IDs.

## Explicit Non-Goals

- Do not create `docs/architecture/colors/colorless/`.
- Do not edit `docs/architecture/colorless/`.
- Do not create `data/raw-factions/colorless/`.
- Do not edit runtime, generated, route, schema, Maze, Home, Supabase, builder, or package files.
- Do not stage or normalize the canon relocation/deletion.
- Do not treat `assets/img/identity-hero/colorless.webp` as evidence or cleanup scope.
- Do not decide final Colorless philosophy.

## Acceptance Criteria

- [x] All Colorless source-material files are inventoried and classified.
- [x] Source roles distinguish claim-bearing, support-only, synthesis-only, discovery-only, and excluded/distinction-only material.
- [x] Evidence rows preserve generic-mana/colorless-mana separation.
- [x] Evidence rows preserve artifact, Eldrazi, Wastes, and Ugin/Karn branch separation.
- [x] Commander support is bounded to `Eldrazi Unbound` unless future evidence is added.
- [x] Support-only sources cannot authorize raw claims.
- [x] No architecture, raw-faction, generated, runtime, image, route, schema, Maze, Home, Supabase, builder, or package work is bundled into VM-308.

## Files Changed

- `docs/research/colorless/README.md`
- `docs/research/colorless/source-material/README.md`
- `docs/research/colorless/colorless-source-ledger.md`
- `docs/research/colorless/colorless-evidence-ledger.md`
- `docs/research/colorless/colorless-reliability-audit.md`
- `docs/research/colorless/colorless-manual-fill.md`
- `docs/research/colorless/colorless-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-308-colorless-source-packet-and-evidence-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-09-2005-codex-vm308-colorless-source-packet.md`

## Tests Run

- Pre-flight file/path checks for `docs/research/colorless/`, `docs/architecture/colors/colorless/`, `docs/architecture/colorless/`, and `data/raw-factions/colorless/`.
- Scoped source inventory for `docs/research/colorless/`.
- Scoped git status check for Colorless research, old canon Colorless path, Colorless hero image, Colorless architecture, and Colorless raw-faction paths.
- Scoped text searches for Colorless, `{C}`, Wastes, Devoid, Eldrazi, Ugin, Karn, generic mana, Commander, Phyrexia, and sixth-color framing.

## Not Touched

- `docs/research/canon/colorless/**`
- `docs/architecture/colors/colorless/`
- `docs/architecture/colorless/`
- `data/raw-factions/colorless/`
- `assets/img/identity-hero/colorless.webp`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Generated artifacts, schemas, Maze files, route CSS/JS, runtime code

## Follow-Up Recommendations

- VM-309 should create the Colorless identity/metaphysics docs using this packet as the guarded evidence floor.
- VM-310 should fill parity and separator docs, especially generic-vs-colorless and artifact/Eldrazi/Wastes boundaries.
- VM-311 should create non-live raw-faction source data only after VM-309/VM-310 review.
- A future relocation card should prove and document the canon-path replacement mapping before staging old `docs/research/canon/colorless/**` deletes.

## Next Suggested Agent

Documentation Steward for VM-309 Colorless identity and metaphysics docs.

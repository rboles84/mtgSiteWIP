# VM-160 - Bant Controlled Placement Promotion

ID: VM-160
Title: Bant Controlled Placement Promotion
Status: done
Type: Data / Placement Promotion
Area: Bant, Identity Registry, Faction Artifact Build, Adaptive Placement
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Completed: 2026-05-29

## Summary

Promoted Bant from the authored VM-159 raw packet into the live Archscry placement expression key `BANT`, while keeping `WUG` as color-direction metadata only.

## Scope Completed

- Added Bant to the identity registry as active and placement-eligible but not preview-eligible.
- Mapped the raw `bant` source packet to generated key `BANT`.
- Added Bant-specific biological priors and active live collision targets limited to `WU`, `WG`, and `UG`.
- Preserved Home preview carousel behavior at the existing 20 preview entries.
- Rebuilt generated faction artifacts through `npm.cmd run build:factions`.
- Refreshed generated Archscry card-voice snippets so the existing dossier fixture covers all 21 current live factions.
- Updated placement, dossier, presentation snapshot, manual acceptance, and architecture docs for the 21-expression live placement baseline.

## Non-Goals Preserved

- No broad shard framework.
- No route CSS/JS changes.
- No Maze controller changes.
- No Home UI/carousel exposure.
- No hand edits to generated artifacts.
- No live `domain` field or upfront domain selector.
- No split of `ravnica_strixhaven`.

## Acceptance Evidence

- `npm.cmd run build:factions` passed and built 21 faction placement records.
- `npm.cmd run test:placement` passed with `21 factions, 21 golden paths`.
- `npm.cmd test` passed.
- Generated `data/factions.json`, `data/placement-model.json`, and Supabase faction context expose `BANT`.
- `BANT.institution_type` is `shard`.
- Bant placement identity uses `expression_key: "BANT"` and `expression_kind: "shard"`.
- Bant colors are `["W", "U", "G"]`.
- Generated faction/model/context top-level keys do not include `WUG`.
- `WUG` remains absent from aliases, generated top-level keys, placement result keys, raw-to-key targets, and `identity.expression_key`.
- Home preview registry/order remains unchanged and `BANT.preview_eligible === false`.
- Bant wins its golden path, beats Azorius/Selesnya/Simic overlap with WUG synthesis and living-order signals, and loses to Naya-style aggression and Simic-style adaptation when Bant order/duty/honor are absent.

## Notes

VM-160 depends on the VM-159 and VM-159A Bant raw packet trail. Bant lore limits remain source-bound; this promotion does not expand unsupported lore claims.

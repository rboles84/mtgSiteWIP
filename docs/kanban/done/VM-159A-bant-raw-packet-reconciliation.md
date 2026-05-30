# VM-159A - Bant Raw Packet Reconciliation

ID: VM-159A
Title: Bant Raw Packet Reconciliation
Status: done
Type: Data / Source Cleanup
Area: Bant, Raw Factions, Placement Prerequisite
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Completed: 2026-05-29

## Summary

Reconciled the accepted Bant lore-source packet with the VM-159 raw-faction JSON before VM-160 promotion.

## Scope Completed

- Added `src_vm_bant_lore_source_packet_20260529` to `data/raw-factions/bant/bant.sources.json`.
- Updated `bant_claim_0009` so the five-nation roster is no longer treated as unresolved.
- Preserved `bant_claim_0010` as the confirmed Jhess, Topa, and Eos upgrade while resolving its cited source ID.
- Removed stale five-nation runtime blockers from `bant.profile.json`.
- Added a VM-159A changelog entry documenting the five-nation confidence upgrade, Mubin correction boundary, and source-packet reconciliation.
- Tightened the Bant lore-source packet appendix so the Interactive Codex liturgy and alternate Mubin framing are not treated as evidence.

## Non-Goals Preserved

- Did not edit `data/identity-layers.json`.
- Did not edit `research/build-faction-artifacts.mjs`.
- Did not add Bant to `RAW_TO_KEY`.
- Did not edit generated artifacts, schemas, runtime files, Maze files, Home files, route CSS/JS, or Supabase source files.
- Did not run `npm run build:factions`.

## Acceptance Evidence

- All five Bant raw JSON files parse.
- `claim_count` remains `20` and matches the actual claim array length.
- Claim source references and profile/placement claim references resolve.
- Targeted stale-caveat search over Bant raw files has no matches.
- `research/build-faction-artifacts.mjs` is unchanged and contains no `bant` mapping.
- `git diff --check` passed with only pre-existing CRLF normalization warnings on board/index files.

## Follow-Up

VM-160 remains the controlled placement-promotion card for identity-layer registration, builder mapping, generated artifacts, and the 20-to-21 placement-test transition.

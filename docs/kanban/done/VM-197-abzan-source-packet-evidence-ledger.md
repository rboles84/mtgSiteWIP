# VM-197 - Abzan Houses Source Packet And Evidence Ledger

ID: VM-197
Title: Abzan Houses Source Packet And Evidence Ledger
Status: done
Type: Documentation / Research
Area: Abzan Houses, Tarkir Wedge, Source Evidence
Priority: high
Created: 2026-05-31
Updated: 2026-05-31
Completed: 2026-05-31

## Duplicate-ID Note

This is the user-declared Abzan stack VM-197. The repository already contains `VM-197 - Alara Shard Gold-Standard Parity Closeout`, and an earlier Abzan source-packet implementation was recorded as `VM-200 - Abzan Houses Source Packet And Evidence Ledger` because VM-197 through VM-199 were already occupied at that time.

This card preserves the existing Alara VM-197 and the historical Abzan VM-200 record. It closes the user-declared Abzan VM-197 by verifying that the normalized Abzan source packet exists, is evidence-bound, preserves the seed folder, and still satisfies the requested source-packet-only guardrails.

## Summary

Normalize local Abzan Houses seed material into a docs-only source packet with source/evidence ledgers, reliability and manual-fill tracking, copied seed artifacts under quarantine, Kanban bookkeeping, and a handoff only.

## Approved Packet Files

- `docs/research/abzan/README.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-reliability-audit.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `docs/research/abzan/abzan-research-dossier.md`
- `docs/research/abzan/abzan-lore-source-packet.md`

Supplemental audit files already present under the packet are retained and not treated as extra approved root packet files.

## Scope

- Run AGENTS.md pre-flight.
- Cite VM-169, VM-176 through VM-180, VM-181 through VM-185, VM-186/VM-188, and VM-192 through VM-196.
- Verify the seven approved Abzan packet files under `docs/research/abzan/`.
- Verify `docs/research/abzan/source-material/` contains the three seed artifacts from `docs/research/abzan houses/` with preserved filenames.
- Verify `docs/research/abzan houses/` still exists unchanged after this pass.
- Preserve `ABZAN-SRC-###`, `ABZAN-EVID-###`, `ABZAN-CMD-###`, and `ABZAN-MF-###` rows.
- Treat seed files as discovery/reference only.

## Non-Goals

- Do not create or modify Abzan architecture docs, raw-faction JSON, generated data, runtime identity, route, Home, Maze, schema, Supabase, fixture, or builder files for this VM-197 pass.
- Do not stage, modify, move, format, normalize, or delete unrelated files.
- Do not rename, reopen, or rewrite the existing Alara VM-197 card.
- Do not delete or recreate the spaced seed folder.

## Pre-Flight Summary

- VM-169 established Bant gold-standard cleanup and source/review discipline.
- VM-176 through VM-180 established the Jund source-packet, architecture, parity, raw-packet, and review-gate sequence.
- VM-181 through VM-185 established the Naya source-packet, architecture, parity, raw-packet, and review-gate sequence.
- VM-186 and VM-188 show the controlled runtime-promotion pattern for Jund and Naya.
- VM-192 through VM-196 show live parity hardening for Jund, Grixis, Bant, Esper, and Naya.
- Existing repo truth already had the Abzan research packet under a historical VM-200 source-packet card, followed by downstream Abzan VM-198 through VM-202 artifacts in the dirty baseline.

## Acceptance Criteria

- [x] Seven approved Abzan packet files exist under `docs/research/abzan/`.
- [x] Three seed artifacts exist under `docs/research/abzan/source-material/` with preserved filenames.
- [x] `docs/research/abzan houses/` still exists after VM-197 and was not modified by this pass.
- [x] Original seed paths and copied paths are recorded in the VM-197 handoff.
- [x] Expected labels appear: `ABZAN-SRC-###`, `ABZAN-EVID-###`, `ABZAN-CMD-###`, `ABZAN-MF-###`, `Manual fill required`, and `support-only`.
- [x] Dromoka's brood and generic WBG remain blocked as Abzan Houses proof.
- [x] Commander/operator rows remain support-only.
- [x] VM-197 made no architecture, raw-faction, generated, runtime, route, Home, Maze, schema, Supabase, fixture, or builder changes.

## Completion Notes

The packet was already present from the earlier historical Abzan VM-200 implementation. VM-197 therefore closed as a verification and duplicate-ID documentation pass rather than rewriting evidence rows or recopied source-material bytes. The restored spaced seed folder is line-equivalent to the quarantined source-material copies; byte hashes differ because of line-ending normalization from earlier restore/copy history.

# VM-200 - Abzan Houses Source Packet And Evidence Ledger

ID: VM-200
Title: Abzan Houses Source Packet And Evidence Ledger
Status: done
Type: Documentation / Research
Area: Abzan Houses, Tarkir Wedge, Source Evidence
Priority: high
Created: 2026-05-31
Updated: 2026-05-31
Completed: 2026-05-31

## Renumbering Note

The requested plan called this VM-197. Current repo truth already assigns VM-197, VM-198, and VM-199 to completed shard/merge-cleanup work, so this Abzan source-packet slice was assigned to VM-200 while preserving the requested VM-197 scope and guardrails.

## Summary

Normalize Abzan Houses research into a gold-standard source packet and evidence ledger before any architecture, raw-faction, generated, runtime, Maze, route, Home preview, schema, Supabase, or fixture work begins.

## Scope

- Perform the AGENTS.md pre-flight review.
- Cite VM-169, VM-176 through VM-180, VM-181 through VM-185, VM-186/VM-188, and VM-192 through VM-196 before implementation.
- Create only the approved Abzan packet files under `docs/research/abzan/`.
- Copy the three Abzan seed artifacts from the VM-198 stash's untracked `docs/research/abzan houses/` path into `docs/research/abzan/source-material/`, preserving filenames.
- Treat seed files as discovery/reference material only.
- Bind promoted claims to `ABZAN-SRC-###` and `ABZAN-EVID-###` rows.
- Extract exact WBG `ABZAN-CMD-###` Commander/operator support rows without treating them as canon.
- Record `ABZAN-MF-###` manual-fill rows.

## Non-Goals

- Do not create `docs/architecture/colors/abzan/`.
- Do not create `data/raw-factions/abzan/`.
- Do not create raw JSON, generated artifacts, runtime identity, routes, Maze, Home, schema, Supabase, fixture, builder, or placement-model changes.
- Do not promote seed-file wording, generated text, Commander rows, Dromoka's brood, or generic WBG as Abzan Houses evidence.
- Do not delete or recreate the spaced seed folder.

## Acceptance Criteria

- [x] Abzan root research folder contains the approved packet files plus `source-material/`.
- [x] Three seed artifacts exist under `source-material/` with original filenames.
- [x] Original stashed paths and copied paths are recorded.
- [x] Major claims are evidence-bound, support-bound, labeled `Vox Mana synthesis`, or marked `Manual fill required`.
- [x] Stable `ABZAN-SRC-###`, `ABZAN-EVID-###`, `ABZAN-CMD-###`, and `ABZAN-MF-###` rows are present.
- [x] Dromoka's brood and generic WBG are explicitly blocked as Abzan Houses proof.
- [x] `docs/architecture/colors/abzan/` and `data/raw-factions/abzan/` are not created.
- [x] No runtime, generated, route, Maze, Home, schema, Supabase, fixture, builder, placement model, or raw-faction files were changed for VM-200.

## Completion Notes

Completed VM-200 as a source-packet-only Abzan normalization pass.

- Created the approved Abzan packet: README, source ledger, evidence ledger, reliability audit, manual-fill register, research dossier, lore source packet, and source-material README.
- Copied the three Abzan seed artifacts from the VM-198 stash untracked tree into `docs/research/abzan/source-material/` with unchanged filenames.
- Bound the safe Abzan floor to local official source captures and prior source audits.
- Marked exact WBG Commander/operator rows as support-only.
- Added hard Dromoka, generic WBG, Commander-as-canon, seed-laundering, and manual-fill guardrails.

## Acceptance Evidence

- Approved packet files exist under `docs/research/abzan/`.
- Seed copies exist under `docs/research/abzan/source-material/`.
- Expected labels appear: `ABZAN-SRC-###`, `ABZAN-EVID-###`, `ABZAN-CMD-###`, `ABZAN-MF-###`, `Manual fill required`, `Support-only`, and `Vox Mana synthesis`.
- Abzan architecture and raw-faction directories remain absent.
- Git status shows only VM-200 allowed documentation, Kanban, and handoff/index changes.

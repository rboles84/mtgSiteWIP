# 2026-05-31 19:16 - Codex - VM-232 Jeskai Raw-Faction Source Packet

## Agent Name

Codex acting as JSON Cartographer.

## Task Requested

Implement VM-232 only: create an authored-but-not-live Jeskai Way raw-faction packet under `data/raw-factions/jeskai/`, matching the Mardu/Sultai five-file raw packet pattern while preserving VM-229 as the sole claim-bearing Jeskai evidence authority.

## Pre-Flight Summary

- Recent related work: VM-229 created the approved Jeskai research packet; VM-230 created Jeskai identity/metaphysics architecture; VM-231 added docs-only parity sections into the same two Jeskai architecture files; VM-212 and VM-226 provided Sultai/Mardu raw-packet precedent.
- Current known risks: the worktree remains broadly dirty with unrelated tracked and untracked work, including Sultai/Mardu/Temur/Abzan/Naya material. VM-214 is still independently in progress and was preserved.
- Relevant decisions already made: VM-229 is the only approved Jeskai evidence packet; VM-230/VM-231 architecture sections are shaping-only; Commander rows are support-only; seed artifacts and generated HTML are not raw-claim evidence; Ojutai is a timeline/discontinuity boundary; `JESKAI` remains future/planned only and non-live.
- Files recently changed by related work include Jeskai packet files, Jeskai architecture docs, Mardu/Sultai raw/review-gate files, and Kanban/handoff bookkeeping.
- Do not touch: VM-229 packet files, VM-230/VM-231 architecture files, `docs/research/jeskai way/`, runtime/generated/builder files, schema, Maze, Home, Supabase, routes, fixtures, tests, Sultai, Mardu, Temur, Abzan, Naya, or VM-233/VM-234 movement.
- `data/raw-factions/jeskai/` was absent before VM-232 authoring.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1757-codex-vm229-jeskai-source-packet.md`
- `docs/handoffs/2026-05-31-1819-codex-vm230-jeskai-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-1843-codex-vm231-jeskai-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-1810-codex-vm212-sultai-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1846-codex-vm226-mardu-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-232-jeskai-way-raw-faction-source-packet.md`
- `docs/research/jeskai/jeskai-source-ledger.md`
- `docs/research/jeskai/jeskai-evidence-ledger.md`
- `docs/research/jeskai/jeskai-manual-fill.md`
- `docs/architecture/colors/jeskai/identity.md`
- `docs/architecture/colors/jeskai/metaphysics.md`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/raw-factions/mardu/mardu.changelog.json`
- `data/raw-factions/sultai/sultai.sources.json`
- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.placement.json`
- `data/raw-factions/sultai/sultai.changelog.json`

## Files Changed

- `data/raw-factions/jeskai/jeskai.sources.json`
- `data/raw-factions/jeskai/jeskai.claims.json`
- `data/raw-factions/jeskai/jeskai.profile.json`
- `data/raw-factions/jeskai/jeskai.placement.json`
- `data/raw-factions/jeskai/jeskai.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-232-jeskai-way-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1916-codex-vm232-jeskai-raw-faction-source-packet.md`

## What Changed

- Created exactly five authored-but-not-live Jeskai raw JSON files under `data/raw-factions/jeskai/`.
- Added `jeskai.sources.json` with explicit source roles: `claim-bearing`, `shaping-only`, `support-only`, `manual-fill`, `discovery-only`, and `excluded-from-raw-claims`.
- Added `jeskai.claims.json` with exactly ten contiguous raw claims: `jeskai_claim_0001` through `jeskai_claim_0010`.
- Added `jeskai.profile.json`, `jeskai.placement.json`, and `jeskai.changelog.json` with `faction_id: "jeskai"`, `faction_name: "Jeskai Way"`, `faction_type: "wedge"`, and `plane_or_setting: "Tarkir"`.
- Set lifecycle/status fields to review-gated and non-live: `source_authored_review_gated`, `not_placement_eligible`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, `live_pilot: false`, and `placement_axes: []`.
- Moved VM-232 from backlog to in progress, then to done. VM-233 and VM-234 remained backlog.

## Why It Changed

VM-232 needed a source-data packet that can be reviewed by VM-233 before any possible VM-234 runtime promotion planning. This preserves the Jeskai source/evidence boundary while giving later cards a structured raw packet to inspect.

## Decisions Made

- VM-229 remained the sole claim-bearing Jeskai evidence packet.
- VM-230 and VM-231 architecture sections were treated as shaping-only packet context and were not cited from `jeskai.claims.json`.
- `JESKAI` remains a future/planned expression name only and non-live.
- `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, and lowercase forms remain metadata/query-only.
- Raw claims cite only `JESKAI-EVID-001` through `JESKAI-EVID-018`, plus `JESKAI-EVID-022` for lifecycle/boundary claims.
- `JESKAI-EVID-019`, `JESKAI-EVID-020`, `JESKAI-EVID-021`, all Commander rows, manual-fill rows, source rows, seed files, and generated HTML were excluded from raw-claim evidence.
- `jeskai_claim_0009` includes only modern Dragonstorm-era revived Jeskai details supported by VM-229 rows.
- No builder map, generated artifact, runtime key, alias, route key, placement key, Home preview key, Maze key, Supabase key, schema key, fixture key, or public interface was added.

## Risks / Uncertainties

- Exact mechanics, complete six-fire doctrine, complete three-Ways hierarchy, Narset's full biography, Shu Yun's full biography, and Ojutai continuity beyond explicit bridge rows remain deferred/manual-review areas.
- The broad worktree remains dirty with unrelated tracked and untracked work; VM-232 stayed scoped to the files listed above.
- `docs/architecture/colors/jeskai/` and `docs/research/jeskai/` are still untracked in the working tree from prior phases, so file-hash checks were used to verify they were not modified by VM-232.

## Tests Run

- Verified exactly five files exist under `data/raw-factions/jeskai/`.
- Parsed all five Jeskai JSON files with PowerShell `ConvertFrom-Json`.
- Compared top-level key shape against the Mardu raw packet; all five Jeskai files matched.
- Verified exactly ten contiguous claim IDs from `jeskai_claim_0001` through `jeskai_claim_0010`.
- Verified every raw-claim `source_id` points to a source classified `claim-bearing`.
- Verified every cited `JESKAI-EVID-###` row resolves to `docs/research/jeskai/jeskai-evidence-ledger.md`.
- Verified `jeskai.claims.json` contains no `JESKAI-EVID-019`, `JESKAI-EVID-020`, `JESKAI-EVID-021`, `JESKAI-CMD`, `JESKAI-MF`, `JESKAI-SRC`, or VM-230 architecture source IDs.
- Verified `placement_axes` is empty.
- Verified `data/raw-factions/jeskai/` was absent before authoring and contains exactly five JSON files after authoring.
- Verified VM-229 packet file hashes and VM-230/VM-231 architecture file hashes matched the pre-VM-232 baseline.
- Verified VM-233 and VM-234 remain backlog.
- Verified `JESKAI` mentions are framed as future/planned and non-live.
- Final scoped `git diff --check`, trailing-whitespace scan, and leakage scan were run after handoff creation.

## Not Touched

- VM-229 packet files
- VM-230/VM-231 architecture files
- `docs/research/jeskai way/`
- Runtime files
- Generated files
- Builder maps
- Schema files
- Maze files
- Home files
- Supabase files
- Route files
- Fixture files
- Test files
- Sultai files
- Mardu files
- Temur files
- Abzan files
- Naya files
- VM-233 or VM-234 movement/implementation

## Follow-Up Recommendations

- VM-233 should perform the Jeskai raw packet review gate before VM-234 is considered.
- VM-233 should verify raw source roles, evidence row use, lifecycle fields, `JESKAI` non-live status, and absence of runtime/generated leakage.
- Keep exact mechanics, full six-fire doctrine, complete three-Ways hierarchy, Narset/Shu Yun biographies, and Ojutai continuity gaps deferred until separate evidence work resolves them.

## Next Suggested Agent

JSON Cartographer or Test Strategist for VM-233 Jeskai Way Raw Packet Review Gate.

## Related Kanban Card, Docs, Or Plans

- VM-232 - Jeskai Way Raw-Faction Source Packet
- VM-229 - Jeskai Way Source Packet And Evidence Ledger
- VM-230 - Jeskai Way Identity And Metaphysics
- VM-231 - Jeskai Way Docs Parity Fill
- VM-233 - Jeskai Way Raw Packet Review Gate
- `data/raw-factions/jeskai/`
- `docs/research/jeskai/jeskai-evidence-ledger.md`
- `docs/architecture/colors/jeskai/identity.md`
- `docs/architecture/colors/jeskai/metaphysics.md`

## Explicit Final Scope Confirmation

VM-232 created exactly five authored-but-not-live Jeskai raw JSON files. VM-229 remained the sole claim-bearing Jeskai evidence source packet. VM-230/VM-231 were shaping-only and not raw-claim evidence. `JESKAI` remains a future/planned expression name only and non-live. `URW`, `WUR`, `RWU`, `UWR`, `RUW`, `WRU`, and lowercase forms remain metadata/query-only. VM-233 and VM-234 were not moved or implemented. No runtime, generated, builder, Maze, Home, route, Supabase, schema, fixture, test, Sultai, Mardu, Temur, Abzan, or Naya files were changed.

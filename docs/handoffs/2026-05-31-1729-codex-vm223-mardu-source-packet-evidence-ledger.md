# 2026-05-31 17:29 - Codex - VM-223 Mardu Source Packet And Evidence Ledger

## Agent Name

Codex

## Task Requested

Proceed with the next Mardu task after reservation: implement VM-223 only by creating the normalized Mardu Horde source packet and evidence ledger under `docs/research/mardu/`, preserving the unmanaged `docs/research/mardu horde/` seed files unchanged as discovery-only source material, updating Kanban bookkeeping, and stopping before architecture, raw-faction, runtime, generated, schema, Maze, route, Home preview, Supabase, builder, or placement fixture work.

## Pre-Flight Summary

Recent related work:

- VM-223 through VM-228 were reserved for Mardu Horde in the 2026-05-31 17:19 reservation handoff.
- VM-209 Sultai source packet and VM-210 Sultai identity/metaphysics are complete.
- VM-221 Temur live parity and VM-222 Temur dossier/Maze QA repair are complete.
- VM-215 through VM-220 remain reserved for Jeskai Way.
- Abzan, Temur, and Sultai source-packet work established the current source-airlock pattern used here.

Current known risks:

- The worktree was already broadly dirty before VM-223 with modified runtime/generated files, untracked Abzan/Temur/Sultai/Jeskai/Mardu Kanban and handoff files, and concurrent board/index changes.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` were already modified before this pass.
- The unmanaged Mardu seed packet includes broad synthesis, card/mechanics material, and community/product claims. VM-223 treated it as discovery-only and did not use it as approved evidence.

Relevant decisions already made:

- `MARDU` is the docs key and future public expression key for the lane.
- `RWB` and `WBR` remain metadata/query-only and are not runtime/public keys.
- Mardu Horde, Kolaghan clan, and modern Dragonstorm-era Mardu must remain timeline-distinct.
- Commander/operator rows are support-only.
- Color philosophy files may support color/metaphysics interpretation only, not Tarkir-specific lore.

Files recently changed before or outside this task:

- Runtime/generated files listed in starting `git status --short`.
- Abzan, Temur, Sultai, and Jeskai research/architecture/raw/Kanban/handoff paths.
- VM-223 through VM-228 Mardu reservation cards and handoff.
- Concurrent board state changed while this pass was running; VM-210 and VM-222 were completed by other work and were preserved.

What should not be touched:

- `docs/research/mardu horde/**`
- `docs/architecture/colors/mardu/**`
- `data/raw-factions/mardu/**`
- Runtime files, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, builders, placement fixtures, Abzan files, Temur files, Sultai files, and Jeskai files.

## Files Reviewed

- `AGENTS.md` instructions supplied in-thread
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1719-codex-vm223-228-mardu-kanban-reservation-only.md`
- `docs/handoffs/2026-05-31-1650-codex-vm209-sultai-source-packet-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-223-mardu-horde-source-packet-evidence-ledger.md`
- `docs/research/sultai/README.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-reliability-audit.md`
- `docs/research/sultai/sultai-manual-fill.md`
- `docs/research/sultai/sultai-research-dossier.md`
- `docs/research/sultai/sultai-lore-source-packet.md`
- `docs/research/canon/mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md`
- `docs/research/canon/source-material/tarkir/story-truth-of-names.md`
- `docs/research/canon/source-material/tarkir/story-khanfall.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-2.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-2.md`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- `docs/research/mardu horde/Mardu Horde Deep Research Report.md`
- `docs/research/mardu horde/mardu-horde-lore-source-packet.md`
- `docs/research/mardu horde/mardu_horde_tactical_archive.html`

## Files Changed

- `docs/research/mardu/README.md`
- `docs/research/mardu/source-material/README.md`
- `docs/research/mardu/source-material/Mardu Horde Deep Research Report.md`
- `docs/research/mardu/source-material/mardu-horde-lore-source-packet.md`
- `docs/research/mardu/source-material/mardu_horde_tactical_archive.html`
- `docs/research/mardu/mardu-source-ledger.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/mardu/mardu-reliability-audit.md`
- `docs/research/mardu/mardu-manual-fill.md`
- `docs/research/mardu/mardu-seed-source-crosscheck.md`
- `docs/research/mardu/mardu-research-dossier.md`
- `docs/research/mardu/mardu-lore-source-packet.md`
- `docs/kanban/done/VM-223-mardu-horde-source-packet-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1729-codex-vm223-mardu-source-packet-evidence-ledger.md`

## What Changed

- Created the normalized Mardu research packet under `docs/research/mardu/`.
- Copied the three unmanaged seed files into `docs/research/mardu/source-material/` with original filenames and matching SHA-256 hashes.
- Created `MARDU-SRC-###`, `MARDU-EVID-###`, `MARDU-CMD-###`, and `MARDU-MF-###` rows.
- Classified local official captures as claim-bearing only where inspected source material supports the claim.
- Classified Commander rows as support-only and seed artifacts as discovery-only.
- Recorded source boundaries across Khans-era Mardu Horde, Fate Reforged/Alesha context, Dragons-era Kolaghan clan, and modern Dragonstorm-era Mardu.
- Moved VM-223 to done while keeping VM-224 through VM-228 in Backlog.
- Added this handoff and indexed it.

## Why It Changed

VM-223 needed to establish the Mardu source/evidence airlock before VM-224 identity/metaphysics, VM-225 docs parity, VM-226 raw-faction data, VM-227 review, or VM-228 runtime promotion can begin. The evidence packet gives later work a controlled source spine and prevents seed prose, Commander rows, color-code hits, Kolaghan/Dragonstorm bleed, or exact mechanics/card claims from becoming unmarked canon.

## Decisions Made

- `docs/research/mardu/` is the approved VM-223 research packet root.
- `docs/research/mardu horde/` remains unmanaged seed material and was not edited.
- The three copied seed files are byte-identical to their originals and are discovery-only.
- Mardu Horde, Kolaghan clan, and Dragonstorm-era Mardu are separate evidence buckets.
- Modern Dragonstorm reforms cannot be backfilled into Khans-era Mardu.
- Color philosophy files support only future interpretation; they do not prove Tarkir-specific lore.
- Commander rows are support-only operator vocabulary.
- VM-223 does not finalize identity/metaphysics doctrine; VM-224 owns that step.

## Risks / Uncertainties

- Broad `git diff --name-only` still lists pre-existing and concurrent runtime/generated paths from the dirty worktree. VM-223 verification used starting status review, scoped checks, path guards, and direct forbidden Mardu path checks.
- Exact raid/dash/mobilize rules, card facts, commander legality, named modern card figures, and detailed Dragonstorm chronology remain manual-fill.
- The Mardu seed folder remains untracked and unmanaged by design.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` captured starting status.
- `Test-Path -LiteralPath docs/research/mardu` before packet creation returned `False`.
- `Test-Path -LiteralPath docs/architecture/colors/mardu` returned `False`.
- `Test-Path -LiteralPath data/raw-factions/mardu` returned `False`.
- `Get-FileHash -Algorithm SHA256` on all three seed originals and all three source-material copies confirmed matching hashes:
  - `4BA3F88DD9F325BA3BCA410867C44EEAF6DFC3AA445E3774903CFD92F05FB2BD`
  - `5918CDA91867C1458604FFC0D2EB16530C1EE55DB3D93022440F3D7AE9CF191B`
  - `CA77AAC4078ECE69C0DF7FCD92C661DB26377419B3BAC9E8546F38ADDF41D2E5`
- `rg --files docs\research\mardu` confirmed the approved packet files plus three copied source-material seed artifacts are present.
- `rg --files docs\kanban | rg "VM-223"` confirmed the VM-223 card lives in `docs\kanban\done\`.
- `rg -n "VM-223|VM-224|Backlog|Done" docs\kanban\board.md` confirmed VM-223 is in Done and VM-224 through VM-228 remain in Backlog.
- Required-pattern scans confirmed `MARDU-SRC-###`, `MARDU-EVID-###`, `MARDU-CMD-###`, `MARDU-MF-###`, `Manual fill required`, `support-only`, `discovery-only`, and `Vox Mana synthesis` appear in the approved packet.
- Reference-resolution scan confirmed every Mardu evidence, Commander, and manual-fill ID used outside its home ledger resolves to a row in the appropriate packet file.
- Commander proof-language scan found only support-only/not-lore-proof guardrail uses for `MARDU-CMD-###`.
- Source-material direct-citation scan confirmed claim-bearing rows use audited source/evidence classifications rather than treating copied seed files as approved evidence.
- Forbidden-path guards confirmed `docs\architecture\colors\mardu\` and `data\raw-factions\mardu\` do not exist.

Skipped:

- `npm test`, because VM-223 is docs/source-ledger work only.
- `npm run test:parser`, because parser behavior did not change.

## Not Touched

- `docs/research/mardu horde/**`
- `docs/architecture/colors/mardu/**`
- `data/raw-factions/mardu/**`
- Runtime files
- Generated artifacts
- Schemas
- Maze files
- Route files
- Home preview files
- Supabase files
- Builders
- Placement fixtures
- Abzan files
- Temur files
- Sultai files
- Jeskai files
- VM-224 through VM-228 card contents

## Follow-Up Recommendations

- Start VM-224 next for Mardu identity and metaphysics, using only `MARDU-EVID-###`, support-only rows, manual-fill rows, and clearly labeled Vox Mana synthesis.
- Keep VM-225 blocked until VM-224 is complete.
- Keep VM-226 blocked until VM-223 through VM-225 are complete.
- Keep VM-228 blocked until VM-227 records `review-approved-for-future-promotion-planning`.

## Next Suggested Agent

Documentation Steward for VM-224 Mardu identity and metaphysics.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-223-mardu-horde-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-224-mardu-horde-identity-and-metaphysics.md`
- `docs/research/mardu/mardu-source-ledger.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/mardu/mardu-research-dossier.md`
- `docs/research/mardu/mardu-lore-source-packet.md`
- `docs/handoffs/2026-05-31-1719-codex-vm223-228-mardu-kanban-reservation-only.md`

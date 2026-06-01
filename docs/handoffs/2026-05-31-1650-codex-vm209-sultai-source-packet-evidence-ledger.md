# 2026-05-31 16:50 - Codex - VM-209 Sultai Source Packet And Evidence Ledger

## Agent Name

Codex

## Task Requested

Implement VM-209 only: create the normalized Sultai Brood source packet and evidence ledger under `docs/research/sultai/`, preserve the unmanaged `docs/research/sultai brood/` seed files unchanged as discovery-only source material, update Kanban bookkeeping, and stop before architecture, raw-faction, runtime, generated, schema, Maze, route, Home preview, Supabase, Abzan, or Temur work.

## Pre-Flight Summary

Recent related work:

- VM-209 through VM-214 were reserved for Sultai Brood in the 2026-05-31 16:19 reservation handoff.
- VM-208 Temur controlled runtime promotion is complete, with `TEMUR` live and `GUR` preserved as metadata/query-only.
- VM-203 Temur and VM-197/VM-200 Abzan source-packet work established the current source-airlock pattern.
- VM-215 through VM-220 Jeskai were reserved after the Sultai reservation.

Current known risks:

- The worktree was already dirty at start with modified runtime/generated files, untracked Abzan and Temur research/architecture/raw data, and untracked Sultai/Jeskai backlog cards.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` were already modified before VM-209 and also carried concurrent board/index work during this pass.
- The unmanaged Sultai seed packet includes broad synthesis and external citation markers. VM-209 treated it as discovery-only and did not use it as approved evidence.

Relevant decisions already made:

- `SULTAI` is the docs key for the lane.
- `BGU` and color-order permutations remain metadata/query-only and are not runtime/public keys.
- Sultai Brood, Silumgar clan, and Dragonstorm-era Sultai must remain distinct.
- Commander/operator rows are support-only.
- Color philosophy files may support color/metaphysics interpretation only, not Tarkir-specific lore.

Files recently changed before or outside this task:

- Runtime/generated files listed in starting `git status --short`.
- Abzan and Temur research, architecture, raw-faction, Kanban, and handoff paths.
- Jeskai reservation cards and handoff.
- Concurrent board state includes VM-221 in progress and VM-215 Abzan manual-QA repair in done.

What should not be touched:

- `docs/research/sultai brood/**`
- `docs/architecture/colors/sultai/**`
- `data/raw-factions/sultai/**`
- Runtime files, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, and Temur files.

## Files Reviewed

- `AGENTS.md` instructions supplied in-thread
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1619-codex-vm209-214-sultai-kanban-reservation-only.md`
- `docs/handoffs/2026-05-31-1631-codex-vm208-temur-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-0844-codex-vm203-temur-source-packet.md`
- `docs/handoffs/2026-05-31-1615-codex-vm197-abzan-source-packet-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/research/temur/README.md`
- `docs/research/temur/temur-source-ledger.md`
- `docs/research/temur/temur-evidence-ledger.md`
- `docs/research/temur/temur-reliability-audit.md`
- `docs/research/temur/temur-manual-fill.md`
- `docs/research/temur/temur-research-dossier.md`
- `docs/research/temur/temur-lore-source-packet.md`
- `docs/research/canon/mark_rosewater_official_three_color/Sultai_Whatever It Takes _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md`
- `docs/research/canon/source-material/tarkir/story-khanfall.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-2.md`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- `docs/research/sultai brood/sultai-brood-deep-research-report.md`
- `docs/research/sultai brood/sultai-brood-lore-source-packet.md`

## Files Changed

- `docs/research/sultai/README.md`
- `docs/research/sultai/source-material/README.md`
- `docs/research/sultai/source-material/sultai-brood-deep-research-report.md`
- `docs/research/sultai/source-material/sultai-brood-lore-source-packet.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-reliability-audit.md`
- `docs/research/sultai/sultai-manual-fill.md`
- `docs/research/sultai/sultai-seed-source-crosscheck.md`
- `docs/research/sultai/sultai-research-dossier.md`
- `docs/research/sultai/sultai-lore-source-packet.md`
- `docs/kanban/done/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1650-codex-vm209-sultai-source-packet-evidence-ledger.md`

## What Changed

- Created the normalized Sultai research packet under `docs/research/sultai/`.
- Copied the two unmanaged seed files into `docs/research/sultai/source-material/` with original filenames and matching SHA-256 hashes.
- Created `SULTAI-SRC-###`, `SULTAI-EVID-###`, `SULTAI-CMD-###`, and `SULTAI-MF-###` rows.
- Classified local official captures as claim-bearing only where exact line ranges support the claim.
- Classified Commander rows as support-only and seed artifacts as discovery-only.
- Recorded source boundaries across Khans-era Sultai Brood, Fate Reforged/Tasigur context, Dragons-era Silumgar clan, and modern Dragonstorm-era Sultai.
- Moved VM-209 to done while keeping VM-210 through VM-214 in Backlog.
- Added this handoff and indexed it.

## Why It Changed

VM-209 needed to establish the Sultai source/evidence airlock before VM-210 identity/metaphysics, VM-211 docs parity, VM-212 raw-faction data, VM-213 review, or VM-214 runtime promotion can begin. The evidence packet gives later work a controlled source spine and prevents seed prose, Commander rows, color-code hits, or Silumgar/Dragonstorm bleed from becoming unmarked canon.

## Decisions Made

- `docs/research/sultai/` is the approved VM-209 research packet root.
- `docs/research/sultai brood/` remains unmanaged seed material and was not edited.
- The two copied seed files are byte-identical to their originals and are discovery-only.
- Sultai Brood, Silumgar clan, and Dragonstorm-era Sultai are separate evidence buckets.
- Modern Dragonstorm reforms cannot be backfilled into Khans-era Sultai.
- Color philosophy files support only future interpretation; they do not prove Tarkir-specific lore.
- Commander rows are support-only operator vocabulary.
- VM-209 does not finalize identity/metaphysics doctrine; VM-210 owns that step.

## Risks / Uncertainties

- Broad `git diff --name-only` still lists pre-existing and concurrent runtime/generated paths from the dirty worktree. VM-209 verification used starting status review, scoped checks, path guards, and direct forbidden Sultai path checks.
- `docs/kanban/board.md` contains concurrent non-VM-209 state: VM-221 in progress and VM-215 Abzan manual-QA repair in done. VM-209 preserved those lines.
- Exact delve/exploit rules, card facts, commander legality, named modern card figures, and detailed Dragonstorm chronology remain manual-fill.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` captured starting status.
- `Test-Path -LiteralPath docs/research/sultai` before packet creation returned `False`.
- `Test-Path -LiteralPath docs/architecture/colors/sultai` returned `False`.
- `Test-Path -LiteralPath data/raw-factions/sultai` returned `False`.
- `Get-FileHash -Algorithm SHA256` on both seed originals and both source-material copies confirmed matching hashes:
  - `686FF85652C192B073C513284017ADA4F20F5036EA7E20AF793B3FB6483A78AB`
  - `B3DA5A11D40E27CF647C4F2550983264A30E52E8D55EE550811AC925242728AB`
- `rg --files docs/research/sultai`
- `rg -n "SULTAI-(SRC|EVID|CMD|MF)-[0-9]{3}|Manual fill required|support-only|discovery-only|Vox Mana synthesis|Silumgar|Dragonstorm|BGU" docs/research/sultai`
- `Get-Content -Path docs/kanban/board.md | Select-Object -First 55` verified VM-209 in Done, VM-210 through VM-214 in Backlog, and no other Sultai card in In Progress or Done.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/research/sultai docs/kanban/board.md docs/kanban/done/VM-209-sultai-brood-source-packet-evidence-ledger.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs` passed with existing LF-to-CRLF warnings on tracked docs.
- `rg -n "[ \t]+$" docs/research/sultai docs/kanban/done/VM-209-sultai-brood-source-packet-evidence-ledger.md docs/kanban/board.md` found no trailing whitespace.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --name-only` was reviewed against the dirty starting status; broad output still includes pre-existing/concurrent runtime/generated paths not introduced by VM-209.

Skipped:

- `npm test`, because VM-209 is docs/source-ledger work only.
- `npm run test:parser`, because parser behavior did not change.

## Not Touched

- `docs/research/sultai brood/**`
- `docs/architecture/colors/sultai/**`
- `data/raw-factions/sultai/**`
- Runtime files
- Generated artifacts
- Schemas
- Maze files
- Route files
- Home preview files
- Supabase files
- Abzan files
- Temur files
- VM-210 through VM-214 card contents

## Follow-Up Recommendations

- Start VM-210 next for Sultai identity and metaphysics, using only `SULTAI-EVID-###`, support-only rows, manual-fill rows, and clearly labeled Vox Mana synthesis.
- Keep VM-211 blocked until VM-210 is complete.
- Keep VM-212 blocked until VM-209 through VM-211 are complete.
- Keep VM-214 blocked until VM-213 records `review-approved-for-future-promotion-planning`.

## Next Suggested Agent

Documentation Steward for VM-210 Sultai identity and metaphysics.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-209-sultai-brood-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-210-sultai-brood-identity-and-metaphysics.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-research-dossier.md`
- `docs/research/sultai/sultai-lore-source-packet.md`
- `docs/handoffs/2026-05-31-1619-codex-vm209-214-sultai-kanban-reservation-only.md`

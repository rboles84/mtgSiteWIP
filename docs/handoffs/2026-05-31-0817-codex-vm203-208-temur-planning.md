# VM-203-208 Temur Frontier Planning Handoff

## Agent name

Codex as Planning Architect / Kanban Steward

## Task requested

Make sure VM-203 through VM-208 are planned for the next card sequence, with VM-197 through VM-202 treated as Abzan Houses card-space by user instruction. The attached Planning Architect prompt targeted the second Tarkir addition, Temur Frontier, and requested a repo-truth-grounded gold-standard onboarding plan without runtime implementation.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0058-codex-vm197-alara-shard-parity-closeout.md`
- `docs/handoffs/2026-05-31-0118-codex-vm198-shard-bundle-worktree-cleanup.md`
- `docs/handoffs/2026-05-31-0140-codex-vm199-merge-hygiene-fix.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- `docs/handoffs/2026-05-31-0805-codex-vm201-tarkir-clan-source-restore.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-176-jund-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-177-jund-identity-metaphysics.md`
- `docs/kanban/done/VM-178-jund-docs-parity-fill.md`
- `docs/kanban/done/VM-179-jund-raw-faction-source-packet.md`
- `docs/kanban/done/VM-180-jund-raw-packet-review-gate.md`
- `docs/kanban/done/VM-181-naya-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-186-jund-controlled-runtime-promotion.md`
- `docs/architecture/placement-domains.md`
- `docs/research/temur fontier/temur-frontier-lore-source-packet.md`
- `docs/research/temur fontier/Temur Frontier Research Report.md`
- `docs/research/canon/mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md`
- `docs/research/canon/source-material/tarkir/`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- Attached `pasted-text.txt` Planning Architect prompt

## Files changed

- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-203-temur-frontier-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-204-temur-frontier-identity-and-metaphysics.md`
- `docs/kanban/backlog/VM-205-temur-frontier-docs-parity-fill.md`
- `docs/kanban/backlog/VM-206-temur-frontier-raw-faction-source-packet.md`
- `docs/kanban/backlog/VM-207-temur-frontier-raw-packet-review-gate.md`
- `docs/kanban/backlog/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0817-codex-vm203-208-temur-planning.md`

## What changed

- Added six Temur Frontier backlog cards:
  - VM-203 source packet / evidence ledger
  - VM-204 identity and metaphysics
  - VM-205 docs parity fill
  - VM-206 raw-faction source packet
  - VM-207 raw packet review gate
  - VM-208 optional controlled runtime promotion
- Added the six-card Temur lane to `docs/kanban/board.md`.
- Recorded that VM-202 is intentionally outside the Temur lane per user instruction that VM-197 through VM-202 belong to Abzan Houses card-space.
- Added this handoff and index entry.

## Why it changed

The repo now has restored Tarkir clan source drops, including `docs/research/temur fontier/`, but Temur does not yet have an approved source packet, architecture docs, raw-faction packet, review gate, or promotion plan. Planning VM-203 through VM-208 prevents ID collisions, preserves Abzan card-space intent, and keeps Temur work aligned with the established gold-standard source-first sequence.

## Decisions made

- Use VM-203 through VM-208 for Temur Frontier.
- Leave VM-202 out of the Temur sequence even though the local file search did not find an existing VM-202 card.
- Treat `docs/research/temur fontier/` as an unmanaged restored source drop until VM-203 audits it.
- Plan an approved normalized research root at `docs/research/temur/`.
- Keep `GUR` as color-direction/query metadata only until a promotion card explicitly approves `TEMUR`.
- Keep Commander/operator rows support-only.
- Keep Atarka Clan, Dragonstorm-era reformed Temur, generic GUR goodstuff, and community Commander shorthand behind explicit boundary labels.
- Keep VM-208 optional and blocked behind a VM-207 review result of `review-approved-for-future-promotion-planning`.

## Risks / uncertainties

- The worktree remains dirty from prior VM-200/VM-201 work and restored untracked Tarkir source drops.
- `docs/research/temur fontier/` preserves a typo from the restored source drop; VM-203 should not rename or delete it unless explicitly scoped.
- The restored Temur seed files may include generated synthesis, mojibake, stale source classifications, or claims that need demotion to support/manual-fill.
- Some Temur source-packet text says architecture authoring is ready, but VM-203 must still normalize evidence before VM-204 starts.
- Current repo truth has no VM-202 card, but the user explicitly reserved VM-197 through VM-202 for Abzan card-space.

## Tests run

- `Get-Content AGENTS.md` - reviewed current repo instructions.
- `rg -n "VM-202|VM-203|VM-204|VM-205|VM-206|VM-207|VM-208" docs\kanban docs\handoffs` - before editing, returned no matches for these IDs.
- `Test-Path "docs\research\temur fontier"` - returned `True`.
- `Test-Path "docs\architecture\colors\temur"` - returned `False`.
- `Test-Path "data\raw-factions\temur"` - returned `False`.
- `Get-ChildItem docs\kanban\backlog -File | Where-Object { $_.Name -match 'VM-20[3-8]-temur' }` - confirmed all six backlog files exist.
- `rg -n "VM-203|VM-204|VM-205|VM-206|VM-207|VM-208|Temur Frontier" docs\kanban\board.md docs\kanban\backlog\VM-203-temur-frontier-source-packet-evidence-ledger.md docs\kanban\backlog\VM-204-temur-frontier-identity-and-metaphysics.md docs\kanban\backlog\VM-205-temur-frontier-docs-parity-fill.md docs\kanban\backlog\VM-206-temur-frontier-raw-faction-source-packet.md docs\kanban\backlog\VM-207-temur-frontier-raw-packet-review-gate.md docs\kanban\backlog\VM-208-temur-frontier-controlled-runtime-promotion.md` - confirmed board/card references.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/kanban/board.md docs/kanban/backlog/VM-203-temur-frontier-source-packet-evidence-ledger.md docs/kanban/backlog/VM-204-temur-frontier-identity-and-metaphysics.md docs/kanban/backlog/VM-205-temur-frontier-docs-parity-fill.md docs/kanban/backlog/VM-206-temur-frontier-raw-faction-source-packet.md docs/kanban/backlog/VM-207-temur-frontier-raw-packet-review-gate.md docs/kanban/backlog/VM-208-temur-frontier-controlled-runtime-promotion.md` - passed with the existing LF-to-CRLF warning on `docs/kanban/board.md`.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` - confirmed changes are documentation/Kanban plus preexisting untracked VM-200/VM-201/restored research paths.

Skipped:

- `npm test` and `npm run test:parser`, because this was a Kanban planning/documentation-only task and touched no runtime or parser code.

## Not touched

- `docs/research/temur fontier/` contents
- `docs/research/temur/`
- `docs/architecture/colors/temur/`
- `data/raw-factions/temur/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- generated artifacts
- schemas
- Maze files
- route CSS/JS
- runtime code
- Home preview behavior
- Supabase code
- placement fixtures
- route maps
- browser bundles
- Abzan, Jeskai, Mardu, and Sultai source contents

## Follow-up recommendations

- Start VM-203 as the first execution pass for Temur; do not jump to architecture or raw JSON.
- Human-review the VM-203 evidence packet before VM-204.
- Keep `GUR` metadata-only and use `TEMUR` only after the review-gated optional promotion card.
- Decide separately whether VM-202 should become an Abzan continuation/reservation card, since no VM-202 file currently exists but the user reserved that ID range for Abzan.

## Next suggested agent

Documentation Steward for VM-203 Temur Frontier source packet and evidence ledger.

## Related Kanban card, docs, or plans

- `docs/kanban/backlog/VM-203-temur-frontier-source-packet-evidence-ledger.md`
- `docs/kanban/backlog/VM-204-temur-frontier-identity-and-metaphysics.md`
- `docs/kanban/backlog/VM-205-temur-frontier-docs-parity-fill.md`
- `docs/kanban/backlog/VM-206-temur-frontier-raw-faction-source-packet.md`
- `docs/kanban/backlog/VM-207-temur-frontier-raw-packet-review-gate.md`
- `docs/kanban/backlog/VM-208-temur-frontier-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- `docs/handoffs/2026-05-31-0805-codex-vm201-tarkir-clan-source-restore.md`

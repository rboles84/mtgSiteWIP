# 2026-06-13 14:42 - Planning Architect / Source-Authority Steward - VM-377 Mono Gold Source Intake Planning

## Agent Name

Planning Architect / Source-Authority Steward

## Task Requested

Create exactly one Kanban planning/source-intake card for the next mono-color gold upgrade step using `docs/research/mono_upgrade`, recommend the downstream mono-gold work stack, avoid raw packets, claim ledgers, runtime copy, generated artifacts, downstream cards, and mono source-file edits, then create the normal handoff and update the handoff index.

## Pre-Flight Summary

Recent related work:
- VM-335 records W/U/B/R/G as active mono registry/runtime identities under a transitional Layer 1 exception, not VM-325 claim evidence.
- VM-361 inventoried official mono source gaps and recommended clean official captures before mono raw packets or claim ledgers.
- `docs/research/mono_upgrade` now contains digest markdown plus local PDF captures for the 2015 Revisited series, 2025 My Words series, Mechanical Color Pie 2021, Mechanical Color Pie 2021 Changes, and The Council of Colors Revisited.
- Recent VM-367 through VM-376 work is WUBRG/Colorless/UI/data adjacent and out of this mono planning scope.

Current known risks:
- The worktree was broadly dirty before this task, including runtime, generated data, docs, board, handoff index, Colorless, WUBRG, and untracked source folders.
- `docs/research/mono_upgrade/00_SOURCES_MANIFEST.md` has source IDs and canonical URLs but lacks manifest cleanup for local PDFs, hashes, capture dates, source roles, source tiers, digest paths, and future anchor expectations.
- `Mechanical Color Pie 20211.pdf` appears to be a filename typo that should be annotated or explicitly renamed only under a future repo convention.
- `README.txt` is process chatter, not source evidence.
- Commander/rules source authority needs cleanup so exact commander eligibility and color-identity boundary claims prefer CR 903.3/903.4 over the public Commander format page.

Relevant decisions already made:
- Generated/runtime/registry surfaces are not canonical evidence.
- Mono source-backed parity requires separately approved raw packets, claim ledgers, or source-intake promotion.
- Digest markdown is source-intake material; local PDFs are official capture evidence.
- Drive to Work remains deferred unless clean provenance is found.
- Mono profile-axis values remain Vox Mana interpretation until claim-backed raw packets are reviewed.

Files recently changed:
- Existing dirty files include `docs/handoffs/HANDOFF_INDEX.md`, `docs/kanban/board.md`, runtime JS, generated data, Colorless raw/docs, WUBRG source/data files, and other unrelated artifacts.
- This task intentionally touched only the new backlog card, board, handoff index, and this handoff.

What should not be touched:
- Runtime JavaScript/CSS/HTML, generated JSON, `data/raw-factions/**`, Home, Maze, Supabase, Colorless, WUBRG, source captures in `docs/research/mono_upgrade`, staging, commits, or downstream card creation.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-335-mono-source-authority-decision.md`
- `docs/kanban/done/VM-361-mono-color-official-source-inventory.md`
- `docs/handoffs/2026-06-11-0718-planning-architect-vm335-mono-source-authority-decision.md`
- `docs/handoffs/2026-06-12-2213-codex-vm361-mono-source-inventory.md`
- `docs/research/canon/mono-color-official-source-gap-audit.md`
- `docs/research/mono_upgrade/00_SOURCES_MANIFEST.md`
- `docs/research/mono_upgrade/README.txt`
- `docs/research/mono_upgrade/10_white.md`
- `docs/research/mono_upgrade/11_blue.md`
- `docs/research/mono_upgrade/12_black.md`
- `docs/research/mono_upgrade/13_red.md`
- `docs/research/mono_upgrade/14_green.md`
- `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md`
- `docs/research/mono_upgrade/21_mechanical_color_pie_2021_changes.md`
- `docs/research/mono_upgrade/22_council_of_colors.md`
- `docs/research/mono_upgrade/30_commander_and_rules.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/identity-metaphysics-markdown-schema.md`
- `docs/kanban/backlog/VM-356-rakdos-quandrix-story-source-intake.md`

## Files Changed

- `docs/kanban/backlog/VM-377-mono-gold-source-intake-planning.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1442-planning-architect-vm377-mono-gold-source-intake-planning.md`

## What Changed

- Created one new backlog planning/source-intake card: VM-377.
- Added VM-377 to the Backlog section of `docs/kanban/board.md`.
- Added this handoff and indexed it in `docs/handoffs/HANDOFF_INDEX.md`.
- Documented source bundle classification, manifest cleanup requirements, Commander/rules correction, candidate commander verification boundaries, and the recommended downstream stack without executing or creating downstream cards.

## Why It Changed

VM-335 kept mono colors active only as a transitional Layer 1 exception, and VM-361 asked for clean official source capture before mono claim ledgers or raw packets. The new `docs/research/mono_upgrade` bundle is now ready for a source-intake planning card, but it still needs manifest/source-authority cleanup before it can safely feed claim ledgers.

## Decisions Made

- Use VM-377 because VM-376 is the highest existing card/handoff/board reference and `VM-377` was unused in repo text.
- Place the card in backlog because board convention says cards live in matching status folders and no different lane was required.
- Treat the mono bundle as source-intake ready as a candidate bundle, with manifest/rules cleanup blockers before claim-ledger promotion.
- Do not edit `docs/research/mono_upgrade` source files or manifest in this task.
- Do not create downstream implementation cards.
- Keep mono status transitional until raw packets and claim ledgers pass review.

## Risks / Uncertainties

- The worktree remains broadly dirty with unrelated user or prior-agent work.
- The current manifest does not yet record local PDF hashes, paths, capture dates, source tiers/roles, or anchor expectations.
- The PDF filename typo should be preserved unless an explicit future convention allows renaming.
- The public Commander format digest should not be the exact authority for commander eligibility; future source cleanup needs CR 903.3/903.4.
- Hashes should be recorded in the future source-intake promotion from actual local files, not copied from this handoff or assumptions.

## Tests Run

- `git status --short --branch` before edits.
- `rg -o "VM-[0-9]{3}" docs\kanban docs\handoffs ...` to confirm the highest existing VM number was 376.
- `rg -n "VM-377" --hidden --glob "!.git/**" .` returned no matches before creating VM-377.
- `Get-ChildItem docs\research\mono_upgrade -File | Select-Object Name,Length,LastWriteTime | Sort-Object Name` to verify expected bundle files were present.
- `Get-FileHash -Algorithm SHA256 docs\research\mono_upgrade\*` as a read-only proof that hashes can be generated from local files in the future.
- `rg -n "SOURCE_ID|URL|Captured|hash|PDF|pdf|anchor|README|Drive to Work|Commander|903\.3|903\.4|candidate|CANDIDATE|Mechanical Color Pie 20211" docs\research\mono_upgrade`
- `rg -n "VM-377|Mono Gold Source Intake Planning|mono-gold-source-intake-planning" docs\kanban\board.md docs\kanban\backlog\VM-377-mono-gold-source-intake-planning.md docs\handoffs\HANDOFF_INDEX.md docs\handoffs\2026-06-13-1442-planning-architect-vm377-mono-gold-source-intake-planning.md` - passed.
- `Get-ChildItem docs\kanban -Recurse -File -Filter "VM-377*" | Select-Object FullName` - confirmed exactly one VM-377 Kanban card file.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/kanban/backlog/VM-377-mono-gold-source-intake-planning.md docs/kanban/board.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-13-1442-planning-architect-vm377-mono-gold-source-intake-planning.md` - passed with existing LF-to-CRLF warnings for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.
- `rg -n "[ \t]+$" docs\kanban\backlog\VM-377-mono-gold-source-intake-planning.md docs\handoffs\2026-06-13-1442-planning-architect-vm377-mono-gold-source-intake-planning.md docs\kanban\board.md docs\handoffs\HANDOFF_INDEX.md` - no trailing-whitespace matches.
- `git status --short --branch` after edits - showed only the expected new VM-377 card and handoff plus pre-existing broad dirty worktree entries.

## Not Touched

- `docs/research/mono_upgrade/**`
- Runtime JavaScript, CSS, HTML, or routes
- Generated JSON artifacts
- `data/raw-factions/**`
- Home, Maze, Supabase, Colorless, WUBRG, hero assets, or unrelated source files
- Raw packets
- Claim ledgers
- Builder or validator mappings
- Staging or commits

## Follow-Up Recommendations

- Execute VM-377 later as a source-intake promotion card only when ready to edit the manifest and record hashes from actual local files.
- After source-intake promotion, create separate claim-ledger construction work for W/U/B/R/G.
- Keep candidate commanders out of Layer 2 support until Scryfall/Gatherer/current legality verification is complete.
- Defer Drive to Work unless clean episode metadata and transcript provenance are found.

## Next Suggested Agent

Source-Authority Steward / JSON Cartographer for source-intake promotion, then Documentation Steward for claim-ledger structure.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-377-mono-gold-source-intake-planning.md`
- `docs/kanban/done/VM-335-mono-source-authority-decision.md`
- `docs/kanban/done/VM-361-mono-color-official-source-inventory.md`
- `docs/research/canon/mono-color-official-source-gap-audit.md`
- `docs/research/mono_upgrade/`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/identity-metaphysics-markdown-schema.md`

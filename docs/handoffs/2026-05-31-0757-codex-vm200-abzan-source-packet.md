# VM-200 Abzan Houses Source Packet Handoff

## Agent Name

Codex

## Task Requested

Implement the requested VM-197 Abzan Houses Source Packet And Evidence Ledger, limited to `docs/research/abzan/**`, Kanban/board bookkeeping, and handoff/index updates. Current repo truth already had VM-197, VM-198, and VM-199 assigned, so the work was completed as VM-200 while preserving the requested VM-197 scope and guardrails.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-176-jund-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-181-naya-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`
- `docs/handoffs/2026-05-30-1754-codex-vm176-jund-source-packet.md`
- `docs/handoffs/2026-05-30-1812-codex-vm177-jund-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-1826-codex-vm178-jund-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-1852-codex-vm179-jund-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1922-codex-vm180-jund-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-1817-codex-vm181-naya-source-packet.md`
- `docs/handoffs/2026-05-30-1828-codex-vm182-naya-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-1848-codex-vm183-naya-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-1922-codex-vm184-naya-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-2042-codex-vm185-naya-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-2056-codex-vm186-jund-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2212-codex-vm188-naya-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2358-codex-vm192-jund-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0006-codex-vm193-grixis-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0019-codex-vm194-bant-live-parity-text-hardening.md`
- `docs/handoffs/2026-05-31-0026-codex-vm195-esper-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0022-codex-vm196-naya-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0058-codex-vm197-alara-shard-parity-closeout.md`
- `docs/handoffs/2026-05-31-0118-codex-vm198-shard-bundle-worktree-cleanup.md`
- `docs/handoffs/2026-05-31-0140-codex-vm199-merge-hygiene-fix.md`
- `docs/research/canon/mark_rosewater_official_three_color/Abzan_We Will Survive _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-2.md`
- `docs/research/canon/source-material/tarkir/story-khanfall.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-1.md`
- `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-2.md`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`

## Files Changed

- `docs/research/abzan/README.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-reliability-audit.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `docs/research/abzan/abzan-seed-source-crosscheck.md`
- `docs/research/abzan/abzan-research-dossier.md`
- `docs/research/abzan/abzan-lore-source-packet.md`
- `docs/research/abzan/source-material/README.md`
- `docs/research/abzan/source-material/Abzan Houses_ Deep Research Report.md`
- `docs/research/abzan/source-material/abzan-houses-lore-source-packet.md`
- `docs/research/abzan/source-material/abzan_houses_research_report.html`
- `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`

## What Changed

- Created `docs/research/abzan/` as the approved Abzan source-packet root.
- Created the approved packet files: README, source ledger, evidence ledger, reliability audit, manual-fill register, research dossier, lore source packet, and source-material README.
- Copied the three Abzan seed artifacts from the VM-198 stash untracked tree into `docs/research/abzan/source-material/` with original filenames.
- Created stable `ABZAN-SRC-###`, `ABZAN-EVID-###`, `ABZAN-CMD-###`, and `ABZAN-MF-###` rows.
- Classified seed files as discovery/reference material only.
- Classified exact WBG Commander/operator rows as support-only.
- Added Dromoka's brood, generic WBG, Commander-as-canon, seed-laundering, and manual-fill guardrails.
- Added a post-VM-201 restored-folder crosscheck confirming the live `docs/research/abzan houses/` files are line-equivalent to the VM-200 `source-material/` copies and that seed-cited but uncaptured sources remain unpromoted.
- Created and closed the VM-200 Kanban card and updated the board/index.

## Seed Artifact Copy Record

VM-198 stash commit: `46bf3951ba87207fa0ff4af794d3ebbcf1a03861`

VM-198 stash untracked tree: `91e275d5b7c6c318b185ef5ca0e9813ca074fd35`

| Original Path | Copied Path | Blob SHA |
|---|---|---|
| `docs/research/abzan houses/Abzan Houses_ Deep Research Report.md` | `docs/research/abzan/source-material/Abzan Houses_ Deep Research Report.md` | `84a1945e370cdd4b633d24519afdd8a5f3154078` |
| `docs/research/abzan houses/abzan-houses-lore-source-packet.md` | `docs/research/abzan/source-material/abzan-houses-lore-source-packet.md` | `42a1f44788d5396e5e8fb1db670bf0a3b5a4496f` |
| `docs/research/abzan houses/abzan_houses_research_report.html` | `docs/research/abzan/source-material/abzan_houses_research_report.html` | `5520eafb50ac7417fcc869e908f003e7ad28aefd` |

The spaced folder was not live in the worktree, was not recreated, and was not deleted.

## Why It Changed

Abzan needed the same evidence-first source-packet airlock used for Bant/Jund/Naya, but VM-197 was already occupied. VM-200 creates the Abzan research packet and stop gate so later identity, parity, raw-packet, and runtime work cannot start from stale seed files or generic WBG assumptions.

## Decisions Made

- Used VM-200 because VM-197, VM-198, and VM-199 are already completed current repo cards.
- Used only local sources and did not internet-fetch.
- Treated Mark Rosewater's Abzan article and local Tarkir Wizards captures as official only where local files or prior audits identify them that way.
- Treated the three Abzan seed artifacts as discovery/reference only.
- Treated Dromoka-era material as contrast/suppression context, not Abzan Houses continuity.
- Treated Commander/operator rows as support-only language for search/play patterns, not lore proof.
- Kept Abzan non-live and stopped before architecture, raw JSON, generated, runtime, route, Home, Maze, schema, Supabase, placement, and fixture work.

## Risks / Uncertainties

- Current repo truth differed from the prompt: `docs/research/abzan houses/` existed only inside the VM-198 stash, not as a live untracked folder.
- The seed packet and generated report may contain unsupported synthesis, stale labels, external citation drift, or copied packet wording.
- Modern Dragonstorm Abzan is source-rich in the local guide, but individual card/character legality and exact card text were not validated.
- Dromoka material can easily bleed into Abzan incorrectly unless later docs preserve the boundary.
- Generic WBG Commander rows can easily overtake Abzan identity unless kept support-only.
- After VM-200 packet verification, unexpected dirty files appeared from a separate VM-201 restore path. Per the VM-200 guardrail, implementation stopped after documenting them. Observed unexpected paths: `docs/kanban/in-progress/VM-201-tarkir-clan-source-folder-restore.md`, `docs/research/PROMPT_lore-source-packet.md`, `docs/research/abzan houses/`, `docs/research/jeskai way/`, `docs/research/mardu horde/`, `docs/research/sultai brood/`, and `docs/research/temur fontier/`. `docs/kanban/board.md` now contains both the VM-200 done row from this task and an unrelated VM-201 in-progress row that was not authored by VM-200.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` confirmed only allowed VM-200 paths are dirty: `docs/research/abzan/**`, `docs/kanban/board.md`, `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md`, `docs/handoffs/HANDOFF_INDEX.md`, and this handoff.
- `Get-ChildItem docs\research\abzan -Recurse -Force` confirmed the approved packet files and the three seed copies exist.
- `Test-Path docs\architecture\colors\abzan` returned `False`.
- `Test-Path data\raw-factions\abzan` returned `False`.
- `Test-Path "docs\research\abzan houses"` returned `False`; the spaced folder was not live in the worktree and was not recreated or deleted.
- `rg -n "ABZAN-(SRC|EVID|CMD|MF)-[0-9]{3}|Manual fill required|Support-only|Vox Mana synthesis|Dromoka|WBG" ...` confirmed expected labels and guardrails appear in the packet/card/handoff.
- `git -c safe.directory=C:/dev/mtgSiteWIP hash-object` on the three seed copies matched the VM-198 stash blob hashes:
  - `84a1945e370cdd4b633d24519afdd8a5f3154078`
  - `42a1f44788d5396e5e8fb1db670bf0a3b5a4496f`
  - `5520eafb50ac7417fcc869e908f003e7ad28aefd`
- Scoped allowed-path validator returned `OK allowed status paths`.
- ASCII scan across newly authored VM-200 root packet/card/handoff files passed. Quarantined seed artifacts were excluded from this check because they preserve original captured content.
- Trailing-whitespace scan across newly authored VM-200 root packet/card/handoff files passed.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/research/abzan docs/kanban/board.md docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md` passed with existing Windows LF-to-CRLF warnings on `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`.
- Post-VM-201 audit: line-by-line `Compare-Object` checks between the three restored `docs/research/abzan houses/` files and the three VM-200 `source-material/` copies returned no differences.
- Post-VM-201 audit: `rg` confirmed seed-cited but uncaptured sources such as `The Legends of Tarkir: Dragonstorm`, `Khans of Tarkir Design Handoff, Part 1`, `The Kin Tree`, and `The Bare Bones` are recorded as unpromoted/manual-fill in the VM-200 packet.
- Post-VM-201 audit: `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/research/abzan docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md` passed.

Skipped:

- `npm test` and `npm run test:parser`, because VM-200 is documentation/research-only and touches no runtime/parser code.
- Runtime, browser, generated-artifact, Supabase, Maze, route, Home, placement, and schema tests, because VM-200 explicitly did not touch those surfaces.

## Not Touched

- `docs/research/abzan houses/`
- `docs/architecture/colors/abzan/`
- `data/raw-factions/abzan/`
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
- test fixture rewrites
- unrelated Jeskai, Mardu, Sultai, or Temur stash files

## Follow-Up Recommendations

- Human-review VM-200 before starting an Abzan identity/metaphysics card.
- The next Abzan card should remain docs-only and use VM-200 evidence rows directly.
- Any raw-packet work should cite VM-200 evidence/source rows, not architecture prose, seed files, Commander rows, or generated HTML.
- Runtime promotion should remain blocked until after source packet review, architecture review, raw packet creation, and raw packet review.

## Next Suggested Agent

Documentation Steward for Abzan identity/metaphysics authoring only after human review of VM-200.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md`
- `docs/research/abzan/README.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-reliability-audit.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `docs/research/abzan/abzan-research-dossier.md`
- `docs/research/abzan/abzan-lore-source-packet.md`

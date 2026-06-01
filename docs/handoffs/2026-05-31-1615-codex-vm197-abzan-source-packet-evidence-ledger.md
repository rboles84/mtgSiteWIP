# VM-197 Abzan Houses Source Packet Handoff

## Agent Name

Codex

## Task Requested

Implement the user-declared VM-197 Abzan Houses Source Packet And Evidence Ledger with edits limited to `docs/research/abzan/**`, VM-197 Kanban/board bookkeeping, and handoff/index updates. The requested final state was a normalized research packet only, with seed artifacts copied into `source-material/`, the original spaced seed folder preserved, and no architecture/raw/runtime/generated changes made by this task.

## Files Reviewed

- `AGENTS.md` instructions supplied in-thread
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- `docs/handoffs/2026-05-30-1754-codex-vm176-jund-source-packet.md`
- `docs/handoffs/2026-05-30-1817-codex-vm181-naya-source-packet.md`
- `docs/research/abzan/README.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-reliability-audit.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `docs/research/abzan/abzan-research-dossier.md`
- `docs/research/abzan/abzan-lore-source-packet.md`
- `docs/research/abzan/abzan-seed-source-crosscheck.md`
- `docs/research/abzan/source-material/`
- `docs/research/abzan houses/`

## Files Changed

- `docs/research/abzan/README.md`
- `docs/kanban/done/VM-197-abzan-source-packet-evidence-ledger.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1615-codex-vm197-abzan-source-packet-evidence-ledger.md`

## What Changed

- Added the user-declared Abzan VM-197 closeout card while preserving the existing Alara VM-197 card.
- Added a duplicate-ID note to the board explaining the Abzan VM-197 stack duplicate.
- Added this VM-197 handoff and indexed it.
- Added a short VM-197 closeout note to the Abzan research README.
- Verified the existing normalized Abzan packet rather than rewriting its evidence rows.
- Verified the restored `docs/research/abzan houses/` folder still exists and was not modified by this pass.
- Verified the source-material copies preserve the three seed filenames and are line-equivalent to the restored spaced-folder files.

## Why It Changed

The user requested VM-197 specifically after earlier repo truth had recorded the Abzan source-packet work under VM-200 because VM-197 through VM-199 were already occupied. Current repo truth now contains both the historical Abzan VM-200 packet and later Abzan downstream artifacts in the dirty baseline. VM-197 therefore needed to close as a duplicate-ID verification/documentation pass without deleting, renaming, or retuning existing work.

## Decisions Made

- Preserved the existing `VM-197 - Alara Shard Gold-Standard Parity Closeout` card.
- Preserved the historical `VM-200 - Abzan Houses Source Packet And Evidence Ledger` card/handoff rather than rewriting history.
- Did not recopy the seed artifacts because current `source-material/` files are line-equivalent to the restored spaced-folder files and preserve the requested filenames; byte hashes differ from line-ending normalization history.
- Did not alter `ABZAN-SRC-###`, `ABZAN-EVID-###`, `ABZAN-CMD-###`, or `ABZAN-MF-###` rows because the existing packet already satisfies the requested labels and source boundaries.
- Did not cite seed files as official sources.
- Treated Dromoka's brood as contrast/suppression context only.
- Treated Commander/operator rows as support-only.

## Pre-Flight Citations

- VM-169: Bant gold-standard cleanup established source/review discipline and downstream parity expectations.
- VM-176 through VM-180: Jund source packet, identity/metaphysics, parity, raw packet, and review gate established the evidence-first onboarding sequence.
- VM-181 through VM-185: Naya source packet, identity/metaphysics, parity, raw packet, and review gate repeated the sequence with color-code metadata-only boundaries.
- VM-186 and VM-188: Jund and Naya controlled runtime promotions show that source packets remain upstream of raw review and live promotion gates.
- VM-192 through VM-196: Jund, Grixis, Bant, Esper, and Naya live-parity hardening show why source-bound support-only Commander language must not become lore proof.

## Seed Artifact Copy Record

The three copied seed artifacts are present with preserved filenames:

| Original Path | Copied Path | Result |
|---|---|---|
| `docs/research/abzan houses/Abzan Houses_ Deep Research Report.md` | `docs/research/abzan/source-material/Abzan Houses_ Deep Research Report.md` | Present; line-equivalent to restored seed folder. |
| `docs/research/abzan houses/abzan-houses-lore-source-packet.md` | `docs/research/abzan/source-material/abzan-houses-lore-source-packet.md` | Present; line-equivalent to restored seed folder. |
| `docs/research/abzan houses/abzan_houses_research_report.html` | `docs/research/abzan/source-material/abzan_houses_research_report.html` | Present; line-equivalent to restored seed folder. |

## Risks / Uncertainties

- The working tree was already dirty before VM-197 with downstream Abzan architecture/raw/runtime promotion artifacts and Temur packet artifacts. VM-197 did not create, delete, or modify those paths.
- During final status comparison, a new unexpected untracked path appeared outside the VM-197 allowed edit set: `docs/kanban/in-progress/VM-208-temur-frontier-controlled-runtime-promotion.md`, last written 2026-05-31 16:15:42. VM-197 did not touch this path. Per the guardrail, implementation stopped after documenting it here.
- The Abzan packet still carries historical VM-200 provenance because downstream VM-198 through VM-202 artifacts already refer to that trail.
- The source-material copies and restored spaced-folder files differ by byte hash due line endings, but line-by-line comparison returned no content differences.
- `docs/research/abzan/` contains supplemental audit files beyond the seven approved root packet files. They were present in the baseline and retained as audit support, not counted as additional approved packet files.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` captured the dirty baseline before edits.
- `Get-ChildItem docs/research/abzan -Recurse -Force` confirmed the approved packet files, source-material folder, and existing supplemental audit files.
- `Get-ChildItem "docs/research/abzan houses" -Force` confirmed the original spaced seed folder exists.
- `rg -n "ABZAN-(SRC|EVID|CMD|MF)-[0-9]{3}|Manual fill required|support-only|Support-only|Vox Mana synthesis|Dromoka|generic WBG" docs/research/abzan ...` confirmed expected packet labels and guardrails.
- `Compare-Object` line-by-line checks between each restored spaced-folder seed file and each source-material copy returned no differences.
- `Test-Path docs/kanban/done/VM-197-abzan-source-packet-evidence-ledger.md` returned `False` before creation.
- Scoped validation after edits:
  - Approved packet file existence.
  - Source-material seed copy existence.
  - Spaced seed folder existence.
  - Required label search.
  - Trailing whitespace checks on changed VM-197 files.
  - `git diff --check` on changed VM-197 files.
- Final `git status --short` comparison found the VM-197 additions plus the unexpected non-VM-197 `docs/kanban/in-progress/VM-208-temur-frontier-controlled-runtime-promotion.md` path noted above.
- Runtime/parser tests skipped because VM-197 is documentation-only.

## Not Touched

- `docs/research/abzan houses/`
- `docs/research/abzan/source-material/*` seed artifact bytes
- `docs/kanban/done/VM-197-alara-shard-gold-standard-parity-closeout.md`
- `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- `docs/architecture/colors/abzan/**`
- `data/raw-factions/abzan/**`
- generated data
- runtime identity files
- route files
- Home preview files
- Maze files
- schema files
- Supabase files
- fixtures
- builders
- unrelated dirty/untracked baseline files

## Follow-Up Recommendations

- Treat VM-197 and historical VM-200 as the same Abzan source-packet evidence foundation when reading the current handoff trail.
- Do not broaden Abzan evidence rows from seed files unless a later task captures and audits additional local sources.
- Keep downstream architecture/raw/runtime work tied to `ABZAN-EVID-###`, `ABZAN-MF-###`, and support-only labels rather than seed prose.

## Next Suggested Agent

Documentation Steward for any future source-packet reconciliation only if the team decides to rename historical VM-200 references. Otherwise, continue with the already planned downstream Abzan/Temur sequence.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-197-abzan-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md`
- `docs/research/abzan/README.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-reliability-audit.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `docs/research/abzan/abzan-research-dossier.md`
- `docs/research/abzan/abzan-lore-source-packet.md`

# VM-324 - Colorless Source Intake And UX Readiness Repair

ID: VM-324
Title: Colorless Source Intake And UX Readiness Repair
Status: done
Reservation State: Complete
Type: Source Intake / Raw Readiness Repair
Area: Colorless, Raw Factions, Evidence, Placement Readiness
Priority: high
Created: 2026-06-10
Completed: 2026-06-10

## Summary

VM-324 intakes the user-provided sourced Colorless notes into the managed Colorless research flow and repairs the non-live raw packet for UX readiness. It does not promote `COLORLESS`.

Result: readiness repair complete, pending VM-326 review gate because VM-325 is already occupied by the Source-Bound Gold Standard Rule.

## Pre-Flight Summary

Recent related work:
- VM-308 created the Colorless source/evidence ledgers.
- VM-309 and VM-310 created and filled current-standard Colorless architecture docs.
- VM-311 created the five-file non-live Colorless raw packet.
- VM-320 removed unapproved `COLORLESS` runtime/test leakage.
- VM-321 approved Colorless only for future promotion planning.
- VM-313 planned a controlled future promotion contract but did not promote.
- VM-325 is already complete as the Source-Bound Gold Standard Rule and is not available for Colorless review.

Current known risks:
- The worktree remains broadly dirty with unrelated runtime, generated/data, docs, route, asset, and raw-faction drift.
- `docs/research/canon/colorless/**` still appears deleted in the worktree and was not normalized.
- `assets/img/identity-hero/colorless.webp` remains dirty and out of scope.
- `COLORLESS` remains non-live and still needs runtime/data-model UX verification before any promotion.
- The copied source note has visible mojibake/non-ASCII from the supplied file; VM-324 preserves it as source intake rather than silently rewriting the source.

Relevant decisions already made:
- VM-324 is readiness first, not promotion.
- `COLORLESS-SRC-018` may support or shape claims only with its cited primary-source boundaries represented in the evidence ledger.
- `COLORLESS-SRC-018` is not sole authority for card legality, Commander legality, Oracle text, prices, metagame claims, or public deck advice.
- Phyrexia remains distinction/manual-fill context, not proof.

What should not be touched:
- Runtime JS
- Generated artifacts
- Schemas/builders
- Home, Maze, routes, Supabase
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `assets/img/identity-hero/colorless.webp`
- `docs/research/canon/colorless/**`

## Scope Completed

- Copied `C:\Users\obake\Downloads\colorless_mtg_notes_sourced_v2.md` to `docs/research/colorless/source-material/colorless_mtg_notes_sourced_v2.md`.
- Added `COLORLESS-SRC-018` to the managed source ledger and raw sources file.
- Added `COLORLESS-EVID-019` through `COLORLESS-EVID-024`.
- Added `COLORLESS-MF-013` through `COLORLESS-MF-016`.
- Repaired the non-live raw packet with:
  - `claim_count: 8`
  - new claims `colorless_claim_0006` through `colorless_claim_0008`
  - four non-live placement-axis candidates
  - six discriminator questions
  - positive attraction language for restriction, artifact machinery, Eldrazi spectacle, Wastes austerity, clean mana, and resource-denial/engine expression
  - strict Commander, Devoid, and five-color Eldrazi false-positive boundaries
- Updated `colorless.changelog.json` to record that VM-324 intentionally invalidates the VM-321 raw hash baseline.

## Raw Hashes After VM-324

VM-324 intentionally changes all five raw JSON hashes. VM-326 must establish the next reviewed baseline.

| File | SHA-256 |
|---|---|
| `colorless.changelog.json` | `0BDC01764FACAFDB18ACCBB930E1DD890AF6E6697505417CA1FCA63CDE5D6822` |
| `colorless.claims.json` | `01D370E961B9672C157E1C7B35824FE090719A3CDF9764786EF316DE61D976AA` |
| `colorless.placement.json` | `3E5D2D620ECD50DFCC6FE80BA7D87889675EC5EC11F96AFEC1F5E81F59C19E10` |
| `colorless.profile.json` | `6EC40CFD93DF3B863A3D0BE8FEEF8D1519CB4F257842D6240DB82C5B247225B3` |
| `colorless.sources.json` | `817DFE00144DC9535D51DE927A1572CF8C386DFF84C01C1288B5E2BFADDC4995` |

## Acceptance Criteria

- [x] `COLORLESS` remains non-live, non-preview, not placement eligible, not generated, not routed, and not public.
- [x] The downloaded source note is in managed source-material intake.
- [x] `COLORLESS-SRC-018` is classified with audit cautions.
- [x] The raw packet contains exactly five JSON files.
- [x] Raw claim count is 8 with contiguous `colorless_claim_0001` through `colorless_claim_0008`.
- [x] Placement readiness includes four candidate axes and six discriminator questions.
- [x] Phyrexia remains a manual-fill/discriminator gap, not proof.
- [x] No runtime, generated, schema, builder, Home, Maze, route, Supabase, image, or canon-relocation files were intentionally touched.

## Tests Run

- AGENTS.md pre-flight review.
- `rg -n "VM-324" docs/kanban docs/handoffs docs/research docs/architecture data -g "*.md" -g "*.json"`
- `Get-FileHash -Algorithm SHA256 data/raw-factions/colorless/*.json` before and after repair.
- JSON parse for all five Colorless raw files.
- Claim count and contiguous claim ID checks.
- Placement-axis and discriminator-question spot checks.
- Evidence/source/manual-fill reference resolver against the managed ledgers.
- Non-live flag checks.
- Targeted overclaim scans for sixth-color, generic/colorless conflation, artifact collapse, Eldrazi collapse, five-color Eldrazi confusion, Phyrexia collapse, Commander overreach, and WUBRG superiority.
- Scoped changed-file review for allowed VM-324 paths only.
- `git diff --check` on VM-324-touched files.

Not run:
- Generators
- Builders
- Formatters
- Snapshot updates
- Fixture updates
- Golden-file updates
- npm-wide suites

## Files Changed

- `docs/research/colorless/source-material/colorless_mtg_notes_sourced_v2.md`
- `docs/research/colorless/colorless-source-ledger.md`
- `docs/research/colorless/colorless-evidence-ledger.md`
- `data/raw-factions/colorless/colorless.sources.json`
- `data/raw-factions/colorless/colorless.claims.json`
- `data/raw-factions/colorless/colorless.profile.json`
- `data/raw-factions/colorless/colorless.placement.json`
- `data/raw-factions/colorless/colorless.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-324-colorless-source-intake-ux-readiness-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-1929-codex-vm324-colorless-readiness-repair.md`

## Not Touched

- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `assets/js/**`
- `assets/img/identity-hero/colorless.webp`
- `docs/research/canon/colorless/**`
- Home, Maze, route, generated, schema, builder, and Supabase generated surfaces

## Follow-Up Recommendations

- Execute VM-326 as the Colorless raw packet review gate.
- VM-326 should establish a new raw hash baseline and decide whether the VM-324 readiness repair is approved for future controlled promotion work.
- Do not resume VM-313/VM-327 promotion work until VM-326 records approval.
- Keep Phyrexia, named-card legality, price/metagame, and live Colorless rendering as manual-fill or later-card work.

## Next Suggested Agent

Test Strategist / JSON Cartographer for VM-326 Colorless raw packet review gate.

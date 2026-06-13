# VM-361 Mono Color Official Source Inventory Handoff

Agent name: Codex

Task requested: Use `docs/research/canon/mono-color-reference-audit.md` as a starting path guide, then deep-dive canon and related research to determine what local material is official and what official online/source material still needs to be fetched for the five mono colors.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent related handoffs for VM-023 through VM-034, VM-156, VM-325, VM-335, VM-338 through VM-340, and VM-343 through VM-360
- `docs/kanban/board.md`
- `docs/kanban/done/VM-335-mono-source-authority-decision.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/kanban/done/VM-156-canon-inventory-three-color-reference-audit.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/identity-metaphysics-markdown-schema.md`
- `docs/research/canon/mono-color-reference-audit.md`
- `docs/research/canon/mark_rosewater_official_misc/*`
- `docs/research/canon/misc/bibliography.md`
- `docs/research/canon/misc/sources.md`
- `docs/research/colorless/source-material/09_Sources_and_Bibliography.md`
- `docs/research/colorless/source-material/official/*`
- `docs/architecture/colors/{white,blue,black,red,green}/identity.md`
- `docs/architecture/colors/{white,blue,black,red,green}/metaphysics.md`
- `docs/architecture/system/color-pie-framework.md`
- `docs/architecture/system/cross-color-dynamics.md`
- Official online Wizards/Drive to Work pages listed in the new audit

## Files Changed

- `docs/research/canon/mono-color-official-source-gap-audit.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-361-mono-color-official-source-inventory.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-12-2213-codex-vm361-mono-source-inventory.md`

## What Changed

- Added a mono official-source gap audit that separates local official captures, noisy podcast transcript captures, internal synthesis/reference files, and missing official online captures.
- Recorded that the repo has official local framework/rules/support material, but does not have source-bound W/U/B/R/G mono raw packets or claim ledgers.
- Downgraded the existing Drive to Work transcript files to discovery pointers until clean provenance and transcript repair exist.
- Listed official source-intake targets for the 2015 Revisited series, the 2025 My Words series, The Council of Colors Revisited, Mechanical Color Pie 2021, Mechanical Color Pie 2021 Changes, current rules, Commander format boundaries, and official Drive to Work episode metadata if podcasts remain in scope.
- Closed VM-361 on the Kanban board.

## Why It Changed

The earlier mono reference audit was useful as a path guide, but it did not distinguish clean official captures from synthesis, bibliography-only references, noisy transcripts, and official internet sources that still need local capture. VM-325 and VM-335 require that distinction before future mono parity repair or claim-ledger work.

## Decisions Made

- Treat `docs/research/canon/mono-color-reference-audit.md` as a guide, not as the final claim ledger.
- Treat local Mark Rosewater Making Magic captures and colorless official rules captures as useful official/support material, with scope limits.
- Treat current Drive to Work transcript files as discovery-only until recaptured or cleaned.
- Treat architecture docs and `data/identity-layers.json` as active product/registry surfaces, not evidence.
- Recommend official source-intake before creating W/U/B/R/G raw packets or claim ledgers.

## Risks / Uncertainties

- The worktree was already broadly dirty; unrelated existing changes were not reverted.
- `docs/research/canon/` is ignored by `.gitignore`, so the new audit exists locally but will require intentional force-add or relocation if it should become tracked later.
- Some local article captures may include scrape artifacts or trailing unrelated content.
- The Drive to Work transcript files include official podcast content in intent, but appear to come from a third-party transcript archive and are textually interleaved.
- Official online sources may need a formal source-capture convention before future agents add them as local packets.

## Tests Run

- `node research\validate-mono-color-markdown.mjs` - passed: 5 color sets, 10 files.
- `rg -n "VM-361|mono-color-official-source-gap-audit|My Words: Blue|Mechanical Color Pie 2021|Drive to Work" docs\research\canon\mono-color-official-source-gap-audit.md docs\kanban\board.md docs\kanban\done\VM-361-mono-color-official-source-inventory.md` - passed, found expected anchors.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/research/canon/mono-color-official-source-gap-audit.md docs/kanban/board.md docs/kanban/done/VM-361-mono-color-official-source-inventory.md` - passed with existing Git line-ending warning for `docs/kanban/board.md`.
- Final full touched-file `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/research/canon/mono-color-official-source-gap-audit.md docs/kanban/board.md docs/kanban/done/VM-361-mono-color-official-source-inventory.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-12-2213-codex-vm361-mono-source-inventory.md` - passed with existing Git line-ending warnings for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.

## Not Touched

- Runtime JavaScript, CSS, HTML, route behavior, Maze behavior, Home behavior, hero assets, Supabase context, generated JSON, and `data/raw-factions/**`.
- Colorless source packets except read-only review.
- Existing WUBRG, Sultai, Ravnica, Strixhaven, shard/clan, and four-color repair artifacts.

## Follow-Up Recommendations

- Create a mono official-source intake card for clean local captures of the 2015 Revisited series and 2025 My Words series.
- Capture Mechanical Color Pie 2021, Mechanical Color Pie 2021 Changes, and The Council of Colors Revisited before current mechanical claims are authored.
- Decide whether Drive to Work transcripts remain a claim-bearing source lane; if yes, recapture episode URLs, metadata, and clean transcript provenance.
- After source capture, create W/U/B/R/G raw packets and claim ledgers, then reconcile architecture and registry surfaces against those ledgers.

## Next Suggested Agent

Kanban Steward for the source-intake follow-up card, then JSON Cartographer or Documentation Steward for source-packet/claim-ledger construction.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-361-mono-color-official-source-inventory.md`
- `docs/research/canon/mono-color-official-source-gap-audit.md`
- `docs/research/canon/mono-color-reference-audit.md`
- `docs/kanban/done/VM-335-mono-source-authority-decision.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`

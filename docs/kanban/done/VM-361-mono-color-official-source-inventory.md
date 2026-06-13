# VM-361 - Mono Color Official Source Inventory

ID: VM-361
Title: Mono Color Official Source Inventory
Status: done
Type: Documentation / Research / Source Audit
Area: mono colors, canon research, source authority
Priority: high
Created: 2026-06-12
Completed: 2026-06-12

## Summary

Audit local repo material for official W/U/B/R/G source coverage. Start from `docs/research/canon/mono-color-reference-audit.md` as a source-path guide, but do not treat it as the final claim ledger.

The outcome should separate:

- local official captures already present
- local synthesis/support material that is useful but not official claim evidence
- official internet/source material that still needs to be fetched or captured before future mono raw packets, claim ledgers, parity repair, placement discrimination, or Commander support work

## Outcome

Added `docs/research/canon/mono-color-official-source-gap-audit.md` to separate local official captures, noisy podcast transcript captures, synthesis/reference files, and official online sources that still need clean local intake.

Key outcome:

- The repo has official local framework/rules/support captures, but no mono W/U/B/R/G raw packet set.
- The existing Drive to Work transcript files are discovery pointers only until recaptured or cleaned.
- The 2015 Revisited series, 2025 My Words series, Council of Colors Revisited, and 2021 mechanical color pie sources should be fetched/captured before source-bound mono claim ledgers are written.

## Pre-Flight Findings

Recent related work:
- VM-023 through VM-034 created, activated, accepted, and normalized the mono identity/metaphysics docs.
- VM-156 inventoried the canon tree and set a prior audit pattern for exact reference work.
- VM-325 established the Source-Bound Gold Standard Rule: generated/runtime surfaces are comparison targets only, not evidence.
- VM-335 records W/U/B/R/G as active mono identities under a transitional Layer 1 exception, but not VM-325 claim evidence.
- VM-338 through VM-340 and VM-343 through VM-360 show the current source-readiness/readiness-matrix pattern for later cohort repair work.

Current known risks:
- The worktree is broadly dirty before VM-361.
- Older mono handoffs and docs may use pre-VM-325 source-first language.
- `data/identity-layers.json` is registry/runtime authority for mono, not claim evidence.
- Local architecture docs are useful synthesis but require explicit promotion before source-backed repairs.
- Existing Colorless/canon relocation changes are out of scope.

Relevant decisions already made:
- Official researched data must trace to approved local source material, source/evidence ledgers, raw packets, approved canon captures, or explicitly promoted architecture docs.
- Runtime/generated data may expose gaps but cannot prove source authority.
- Mono parity repair requires future raw packets, claim ledgers, or source-intake promotion first.

Files recently changed by related work:
- Mono docs and tests from VM-023 through VM-034.
- Source guardrails and data-contract docs from VM-325 and VM-335.
- Colorless source/readiness docs from VM-338 through VM-340.
- Cohort readiness matrices and source ledgers from VM-343 through VM-360.

What should not be touched:
- Runtime JavaScript, CSS, HTML, or route behavior.
- Generated JSON artifacts.
- `data/raw-factions/**`.
- Supabase context.
- Maze, Home, hero assets, and public placement behavior.
- Colorless, WUBRG, Sultai repair lanes, or existing cohort readiness matrices.

## Acceptance Criteria

- [x] Local official mono-color source captures are inventoried by path and source role.
- [x] Local synthesis/support material is separated from official claim-bearing material.
- [x] Missing official source captures are listed per mono color and by cross-color framework need.
- [x] The audit records what future source-intake/raw-packet work should fetch before claiming mono source-backed parity.
- [x] No runtime, generated, raw faction, Supabase, Maze, Home, Colorless, WUBRG, or unrelated cohort files are edited.
- [x] Required handoff and handoff index entries are created.

## Files Impacted

- `docs/research/canon/mono-color-official-source-gap-audit.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-361-mono-color-official-source-inventory.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-12-2213-codex-vm361-mono-source-inventory.md`

## Validation

- `node research\validate-mono-color-markdown.mjs` - passed: 5 color sets, 10 files.
- `rg -n "VM-361|mono-color-official-source-gap-audit|My Words: Blue|Mechanical Color Pie 2021|Drive to Work" docs\research\canon\mono-color-official-source-gap-audit.md docs\kanban\board.md docs\kanban\done\VM-361-mono-color-official-source-inventory.md` - passed, found expected anchors.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- docs/research/canon/mono-color-official-source-gap-audit.md docs/kanban/board.md docs/kanban/done/VM-361-mono-color-official-source-inventory.md` - passed with existing Git line-ending warning for `docs/kanban/board.md`.
- Final full touched-file `diff --check` passed with existing Git line-ending warnings for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.

## Notes

This card is documentation and source-audit work only. It does not create mono raw packets or claim ledgers.

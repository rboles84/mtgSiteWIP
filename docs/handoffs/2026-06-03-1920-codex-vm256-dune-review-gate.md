# 2026-06-03 19:20 - Codex - VM-256 Dune Review Gate

## Agent Name

Codex acting as JSON Cartographer, Test Strategist, and Kanban Steward.

## Task Requested

Implement VM-256 as a review-only Dune raw-packet gate plus VM-257 promotion-policy approval. Review without editing, repairing, formatting, regenerating, building, or promoting the raw JSON. Record the exact verdict string and keep VM-257 in Backlog.

## Pre-Flight Summary

Recent related work:

- VM-252 normalized the Dune source packet and evidence ledger.
- VM-253 created docs-only Dune identity and metaphysics architecture.
- VM-254 filled Dune docs-only parity with pair overlaps, separators, support-only Commander/operator anchors, false-positive risks, and prose-only placement guidance.
- VM-255 created exactly five source-grounded, review-gated, non-live Dune raw JSON files.
- VM-244 and VM-250 provided the direct four-color review-gate precedent through Yore and Glint.

Current known risks:

- The Dune raw packet is untracked in the current worktree, so before/after SHA-256 hashes are the main proof that VM-256 did not mutate it.
- Four-color canon remains thin and the Dune lane still relies on a carefully bounded evidence floor.
- Commander/support texture remains a source-laundering risk if Saskia, `Open Hostility`, or decklist material escapes support-only boundaries.
- `Aggression` alias leakage remains a naming risk because the raw packet uses `Dune / Aggression` display text while keeping `Aggression` non-public.
- `DUNE-MF-011` / `DUNE-MF-012` packet drift remains unresolved inside `docs/research/dune/**` and must not be repaired in VM-256.
- The worktree remains broadly dirty with unrelated runtime, generated, data, docs, and research changes.

Relevant decisions already made:

- `DUNE` remains future/planned only.
- `Aggression` remains Commander 2016 paired-framing support text only.
- `BRGW`, `WBRG`, and all same-color permutations remain metadata/query-only.
- Raw claims are limited to `DUNE-EVID-001`, `DUNE-EVID-002`, `DUNE-EVID-003`, `DUNE-EVID-004`, `DUNE-EVID-007`, and `DUNE-EVID-010`.
- Any future VM-257 work should treat `core_color: "BRGW"` as a technical aggregate only, not as a public alias or human-facing official name.
- VM-256 may approve promotion planning only; it may not approve a concrete `/dune/` route.

Files recently changed:

- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Unrelated dirty runtime/generated/data/docs files elsewhere in the worktree

What should not be touched:

- `data/raw-factions/dune/*.json`
- `docs/research/dune/**`
- `docs/architecture/colors/dune/**`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- Runtime files
- Generated artifacts
- Schemas
- Maze files
- Route CSS/JS
- Home preview
- Supabase files
- `docs/kanban/backlog/VM-257-dune-controlled-runtime-promotion.md`
- Any repair card
- Ink, Witch, Glint, Yore, and unrelated dirty worktree files

## Files Reviewed

- `AGENTS.md`
- `C:\Users\obake\.codex\attachments\de87d59e-c6ee-4bca-b1f7-646df5aa53b7\pasted-text.txt`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2343-codex-vm240-269-four-color-lane-reservation-only.md`
- `docs/handoffs/2026-06-03-0655-codex-vm252-dune-source-packet.md`
- `docs/handoffs/2026-06-03-0736-codex-vm253-dune-identity-metaphysics.md`
- `docs/handoffs/2026-06-03-1226-codex-vm254-dune-docs-parity-fill.md`
- `docs/handoffs/2026-06-03-1700-codex-vm255-dune-non-live-raw-packet.md`
- `docs/handoffs/2026-06-02-2049-codex-vm244-yore-review-gate.md`
- `docs/handoffs/2026-06-03-0718-codex-vm250-glint-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-256-dune-review-gate.md`
- `docs/kanban/backlog/VM-257-dune-controlled-runtime-promotion.md`
- `docs/research/dune/dune-source-ledger.md`
- `docs/research/dune/dune-evidence-ledger.md`
- `docs/architecture/colors/dune/identity.md`
- `docs/architecture/colors/dune/metaphysics.md`
- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `data/raw-factions/yore/yore.sources.json`
- `data/raw-factions/yore/yore.claims.json`
- `data/raw-factions/yore/yore.profile.json`
- `data/raw-factions/yore/yore.placement.json`
- `data/raw-factions/yore/yore.changelog.json`
- `data/raw-factions/glint/glint.sources.json`
- `data/raw-factions/glint/glint.claims.json`
- `data/raw-factions/glint/glint.profile.json`
- `data/raw-factions/glint/glint.placement.json`
- `data/raw-factions/glint/glint.changelog.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/archscry-flavor-snippets.json`
- `docs/research/dune/dune-brood-research-packet.html`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-256-dune-review-gate.md`
- `docs/kanban/done/VM-256-dune-review-gate.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-1920-codex-vm256-dune-review-gate.md`

## What Changed

- Moved VM-256 from Backlog to Done after review.
- Reviewed exactly five Dune raw JSON files without modifying them.
- Recorded `review-approved-for-future-promotion-planning` in the VM-256 done card and this handoff.
- Added before/after hash proof to the VM-256 done card and this handoff.
- Recorded VM-257 future placement and `core_color` policy in VM-256 bookkeeping and handoff surfaces only.
- Explicitly kept concrete `/dune/` route approval out of VM-256.
- Left VM-257 in Backlog.
- Updated the handoff index.

## Why It Changed

VM-256 is the review airlock between the VM-255 raw packet and any future VM-257 controlled runtime promotion planning. It confirms that the raw packet is structurally sound enough to plan from later, preserves the non-live boundary, and records the future VM-257 policy decisions needed for controlled promotion planning without executing any runtime or generated changes.

## Review Result

Status: `review-approved-for-future-promotion-planning`

This is a review-only approval. It means the VM-255 Dune raw packet is acceptable as future VM-257 planning input only. It does not make `DUNE` live, generated, routed, previewed, placed, public, or integrated into app surfaces.

## Before / After Raw JSON Hashes

Before and after SHA-256 hashes matched for all five Dune JSON files:

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `dune.changelog.json` | `1706F08BF84B97DF22CEF16E5A9AEF92C2B4705DF86D40AF117FD4C806B84D1B` | `1706F08BF84B97DF22CEF16E5A9AEF92C2B4705DF86D40AF117FD4C806B84D1B` |
| `dune.claims.json` | `496A4F15AD0CDB5818F989053A431C6A30F6404DEA8A953B833E0EB0E2600D13` | `496A4F15AD0CDB5818F989053A431C6A30F6404DEA8A953B833E0EB0E2600D13` |
| `dune.placement.json` | `55D829041F6A8895F1DE1E41CDEFF34D861C322A82F413D3D9FD5C9E257D8BF3` | `55D829041F6A8895F1DE1E41CDEFF34D861C322A82F413D3D9FD5C9E257D8BF3` |
| `dune.profile.json` | `F941A22FAF218871645FF87DBF272C2739C5568449070D8D8D532C9D8B76865E` | `F941A22FAF218871645FF87DBF272C2739C5568449070D8D8D532C9D8B76865E` |
| `dune.sources.json` | `F1466612A762BC19A4BFD35F29BDBCE4883DB6CC6A52CA1FEAAF39457E5B4853` | `F1466612A762BC19A4BFD35F29BDBCE4883DB6CC6A52CA1FEAAF39457E5B4853` |

Raw-packet hash comparison result: passed; all before and after hashes matched.

## Evidence / Source-Role Review Result

Passed.

- Exact five-file set found under `data/raw-factions/dune/`.
- All five raw JSON files parsed.
- Top-level raw-packet schema families matched both the VM-243 Yore and VM-249 Glint shapes.
- All five files use `schema_version: "1.0.0"`.
- `profile_version`, `placement_profile_version`, and `based_on_profile_version` are `0.1.0`.
- Exactly five contiguous claims exist: `dune_claim_0001` through `dune_claim_0005`.
- Raw claims cite only `DUNE-EVID-001`, `DUNE-EVID-002`, `DUNE-EVID-003`, `DUNE-EVID-004`, `DUNE-EVID-007`, and `DUNE-EVID-010`.
- Exact claim-to-evidence mapping matches the VM-255 contract.
- `DUNE-EVID-010` appears only in claims 0001 and 0002.
- Every raw-claim authority chain terminates in `source_role: claim-bearing`.

## Exclusion Review Result

Passed.

Support-only Saskia / `Open Hostility` rows, Commander/operator rows, precon support rows, VM-253 and VM-254 architecture docs, manual-fill rows, synthesis-only material, and the preserved discovery HTML draft were not used as raw-claim proof.

## Non-Live Status Result

Passed.

- `placement_axes: []`
- `source_status: source_grounded_review_gated`
- `placement_status: not_placement_eligible`
- `review_gated: true`
- `placement_eligible: false`
- `preview_eligible: false`
- `live_pilot: false`
- all 48 uppercase and lowercase BRGW metadata/query-only forms are present with no missing or extra forms

Raw-packet status remains distinct from future promotion policy. VM-256 kept the VM-255 raw packet non-live and may only authorize VM-257 to set live/generated placement eligibility later if VM-257 passes its own gates.

## Leakage Scan Result

Passed for VM-256 scope.

No active/public raw-packet wiring was found for `DUNE`, `/dune/`, `/brgw/`, `/wbrg/`, route aliases, generated keys, placement keys, preview/live flags, Home preview activation, Maze leakage, or Supabase leakage in the targeted live/generated surfaces reviewed for this pass.

Current live/generated baseline at review time:

- `data/identity-layers.json`: `DUNE` absent
- `data/factions.json`: `DUNE` absent
- `data/placement-model.json`: `DUNE` absent
- `data/archscry-flavor-snippets.json`: `DUNE` absent

Text matches from the raw-packet-only scan for `Aggression`, `BRGW`, `WBRG`, architecture-doc paths, and the discovery HTML draft were boundary, exclusion, or metadata-query-only references rather than active/public leakage.

## Overclaim Scan Result

Passed.

Matches for official-name, official-faction, institution, lore-proof, legality-proof, Saskia, `Open Hostility`, Dune-Brood, Nephilim, and generic Commander texture in the raw packet were boundary or exclusion language only. No reviewed match promoted those concepts into official faction proof, lore proof, legality proof, placement readiness, runtime readiness, or public alias authority.

## Placement Policy Decision

`vm257_placement_policy: approved_for_controlled_live_promotion_only`

This approval does not change the raw packet. It only allows future VM-257 to set live/generated placement eligibility if VM-257 passes its own gates.

Approval does not require VM-257 to promote. It only removes the VM-256 review blocker if VM-257 is later executed.

## Core Color Policy Decision

- `vm257_core_color_policy: technical_aggregate_brgw_only`
- `approved_core_color_value: "BRGW"`

Rationale: Dune is a four-color BRGW/non-Blue expression with no approved single-color center. `BRGW` is approved only as a technical aggregate to satisfy required runtime fields during VM-257. It is not a public alias, color-code route, official MTG name, single-color center, or human-facing label.

## Route Policy Decision

VM-256 does not approve a concrete `/dune/` route. A future `/dune/` surface is allowed only if VM-257 independently verifies that it matches an existing Vox Mana live dossier route precedent and can be added without exposing `BRGW`, `WBRG`, `Aggression`, or permutation routes. `/brgw/`, `/wbrg/`, and permutation routes remain forbidden.

## Decisions Made

- Approved the VM-255 raw packet for future VM-257 promotion planning input only.
- Did not approve runtime promotion, public visibility, generation, routing, Home preview, Maze visibility, schemas, Supabase, fixtures, aliases, lookup keys, or app integration.
- Did not edit, repair, reshape, reformat, regenerate, or rewrite any Dune raw JSON.
- Did not create a repair card because the review passed.
- Kept `DUNE` non-live and future/planned only.
- Kept `Aggression`, `BRGW`, `WBRG`, and all permutations non-public and metadata/query-only.
- Recorded VM-257 policy approvals only in VM-256 bookkeeping and handoff surfaces, not inside `data/raw-factions/dune/`.

## Risks / Uncertainties

- The worktree remains broadly dirty from prior and concurrent lanes.
- `data/raw-factions/dune/` is untracked in the current worktree, so before/after hash match is the primary proof that VM-256 did not mutate it.
- VM-256 approval is planning-only. VM-257 must still recompute baseline counts, validate raw hash stability against this handoff/card, and pass controlled runtime promotion tests before any live Dune integration.
- Future VM-257 must verify that technical `core_color: "BRGW"` does not break UI, flavor, or color-layer consumers.
- The unresolved `DUNE-MF-011` / `DUNE-MF-012` packet drift remains outside VM-256 scope.

## Tests Run

- AGENTS pre-flight review against handoff index, board, VM-256 card, VM-252 through VM-255 Dune handoffs, and VM-244 / VM-250 review-gate precedent files.
- `Get-FileHash data/raw-factions/dune/*.json -Algorithm SHA256 | Sort-Object Path | Select-Object File,Hash | ConvertTo-Json -Depth 3` before review for all five Dune JSON files.
- `Get-FileHash docs/research/dune/dune-brood-research-packet.html -Algorithm SHA256` to confirm the preserved HTML draft hash.
- `Select-String -Path data/identity-layers.json,data/factions.json,data/placement-model.json,data/archscry-flavor-snippets.json -Pattern 'DUNE' -CaseSensitive:$false | Measure-Object | Select-Object -ExpandProperty Count` to confirm `DUNE` is absent from the targeted live/generated surfaces.
- Exact file-set check for `data/raw-factions/dune/`.
- JSON parse check for all five Dune raw JSON files.
- Top-level key validation for all five files against the Yore VM-243 and Glint VM-249 raw-packet contracts.
- Schema/version validation for all five files.
- Claim count and contiguous claim ID validation.
- Exact evidence-row mapping validation for all five claims.
- Source-role resolver proving every raw-claim authority chain terminates in claim-bearing sources.
- Non-live status validation.
- BRGW metadata/query-only form validation for all 48 uppercase and lowercase forms with one-to-one lowercase derivation.
- Packet-date consistency validation across `source_review_date`, `last_updated`, and changelog metadata.
- Exclusion scan proving support-only, shaping-only, synthesis-only, discovery-only, Commander/operator, manual-fill, and unmanaged-draft material are absent from raw-claim authority.
- Raw packet overclaim scan.
- Raw packet leakage scan for `Aggression`, `BRGW`, `WBRG`, and numeric `DUNE-MF-011` / `DUNE-MF-012` drift leakage.
- `Get-FileHash data/raw-factions/dune/*.json -Algorithm SHA256 | Sort-Object Path | Select-Object File,Hash | ConvertTo-Json -Depth 3` after review for all five Dune JSON files.
- Scoped `git diff --check` on VM-256 bookkeeping files.
- Scoped trailing-whitespace scan on VM-256 bookkeeping files.

Validation note:

- Two initial scripted validation attempts failed because this PowerShell environment does not support `ConvertFrom-Json -Depth`, and one earlier version of the script assumed the wrong claim/evidence property names. The checks were corrected, rerun in the same environment, and passed.

Skipped:

- Builders and generators, because VM-256 is review-only and must not generate or promote.
- `npm test`, because VM-256 did not touch runtime contracts.
- `npm run test:parser`, because parser behavior did not change.
- Runtime promotion tests, because VM-256 does not promote.
- Formatters and fixers, because VM-256 is review-only.

## Not Touched

- `data/raw-factions/dune/*.json`
- `docs/research/dune/**`
- `docs/architecture/colors/dune/**`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- Runtime JS/CSS/HTML
- Generated artifacts
- Schemas
- Supabase files
- Maze files
- Home preview files
- Route files
- Fixtures
- Tests
- `docs/kanban/backlog/VM-257-dune-controlled-runtime-promotion.md`
- Ink, Witch, Glint, Yore, and unrelated dirty worktree files
- Staging or commits

## Follow-Up Recommendations

- Start VM-257 only as the controlled runtime promotion pass using this VM-256 approval file as the exact approval artifact.
- VM-257 must recompute current baseline counts, validate raw hash stability against this handoff/card, and prove technical `core_color: "BRGW"` works across runtime consumers.
- Keep `Aggression`, `BRGW`, `WBRG`, and all permutations non-public through VM-257.
- Do not treat VM-256 approval as mandatory promotion; VM-257 remains optional and gated.
- If a future packet-maintenance task is opened, keep the `DUNE-MF-011` / `DUNE-MF-012` drift repair separate from VM-257 runtime promotion work.

## Next Suggested Agent

Runtime Promotion / Placement steward for VM-257 Dune Controlled Runtime Promotion.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-256-dune-review-gate.md`
- `docs/kanban/done/VM-255-dune-non-live-raw-packet.md`
- `docs/kanban/backlog/VM-257-dune-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-0655-codex-vm252-dune-source-packet.md`
- `docs/handoffs/2026-06-03-0736-codex-vm253-dune-identity-metaphysics.md`
- `docs/handoffs/2026-06-03-1226-codex-vm254-dune-docs-parity-fill.md`
- `docs/handoffs/2026-06-03-1700-codex-vm255-dune-non-live-raw-packet.md`

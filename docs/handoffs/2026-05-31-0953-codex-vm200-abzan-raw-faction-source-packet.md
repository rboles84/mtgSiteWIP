# 2026-05-31 09:53 - Codex - VM-200 Abzan Raw-Faction Source Packet

## Agent Name

Codex

## Task Requested

Implement the user-declared duplicate Abzan `VM-200 - Raw-Faction Source Packet` by creating an authored-but-not-live raw-faction packet under `data/raw-factions/abzan/`, using normalized `ABZAN-EVID-###` rows as claim evidence and Abzan VM-198/VM-199 architecture docs as shaping-only context.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md`
- `docs/handoffs/2026-05-31-0859-codex-vm198-abzan-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-0919-codex-vm199-abzan-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-1852-codex-vm179-jund-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1922-codex-vm184-naya-raw-faction-source-packet.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/research/abzan/abzan-manual-fill.md`
- `docs/architecture/colors/abzan/identity.md`
- `docs/architecture/colors/abzan/metaphysics.md`
- `data/raw-factions/jund/*.json`
- `data/raw-factions/naya/*.json`

## Files Changed

- `data/raw-factions/abzan/abzan.sources.json`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.profile.json`
- `data/raw-factions/abzan/abzan.placement.json`
- `data/raw-factions/abzan/abzan.changelog.json`
- `docs/kanban/done/VM-200-abzan-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-0953-codex-vm200-abzan-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added five Abzan raw-faction JSON files in the same authored source-packet family as Jund and Naya.
- Created exactly 10 Abzan raw claims with IDs `abzan_claim_0001` through `abzan_claim_0010`.
- Bound raw claims only to normalized Abzan evidence rows.
- Classified sources as `claim-bearing`, `shaping-only`, or `support-only`.
- Preserved Abzan VM-198 and VM-199 architecture docs as shaping-only inputs for profile and placement wording, not raw-claim evidence.
- Kept support-only Commander/operator rows, manual-fill rows, seed files, generated material, and architecture prose out of raw claims.
- Left `placement_axes` empty and kept Abzan source-authored, review-gated, non-live, and not placement-eligible.
- Created and closed the duplicate Abzan VM-200 Kanban card.
- Added a duplicate Abzan VM-200 board row and handoff-index row.

## Why It Changed

VM-199 completed the Abzan docs parity layer. This duplicate VM-200 creates the next source-data airlock: structured raw JSON that a future VM-201 review gate can inspect without wiring Abzan, WBG, or any W/B/G permutation into builder, generated, placement, route, fixture, Home, Maze, Supabase, schema, or runtime surfaces.

## Decisions Made

- Treated this as the user-declared duplicate Abzan VM-200 raw-packet task, while preserving the existing `VM-200 - Abzan Houses Source Packet And Evidence Ledger` card and handoff untouched.
- Used `abzan_claim_0001`-style raw claim IDs to match the accepted raw packet family.
- Kept `ABZAN-EVID-###` rows as evidence references only.
- Used only claim-bearing source entries in raw claims.
- Included Abzan VM-198/VM-199 architecture docs as shaping-only source entries.
- Kept `WBG` and any W/B/G color-order permutations as metadata/query-only.
- Set non-live/review-gated status values explicitly: `source_authored_review_gated`, `not_placement_eligible`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, and `live_pilot: false`.
- Did not add `abzan` to `RAW_TO_KEY`, identity registries, generated placement files, route maps, Commander dossier runtime, Archscry presentation runtime, or any live-entry list.
- Did not edit `docs/research/abzan/**`.

## Duplicate-ID Handling

The new duplicate card is `docs/kanban/done/VM-200-abzan-raw-faction-source-packet.md`. It documents that the duplicate ID is intentional for the user-declared Abzan VM-197 through VM-202 stack. The existing source-packet card `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md` and handoff `docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md` were not edited, moved, reopened, renamed, or otherwise altered.

## Evidence Boundaries

- Raw claims use `ABZAN-EVID-001` through `ABZAN-EVID-026`, plus `ABZAN-EVID-029` and `ABZAN-EVID-031`.
- `ABZAN-EVID-030` appears only as labeled `Vox Mana synthesis` shaping language outside raw claims.
- `ABZAN-EVID-027`, `ABZAN-EVID-028`, and `ABZAN-CMD-001` through `ABZAN-CMD-006` remain support-only.
- `ABZAN-MF-001` through `ABZAN-MF-011` remain manual-fill boundaries.
- Seed files are discovery/reference only and are not cited as raw-claim evidence.
- VM-198 and VM-199 architecture docs are shaping-only and are not raw-claim evidence.

## Dirty Baseline

Captured before duplicate Abzan VM-200 implementation:

```text
 M docs/handoffs/HANDOFF_INDEX.md
 M docs/kanban/board.md
?? docs/architecture/colors/abzan/
?? docs/architecture/colors/temur/
?? docs/handoffs/2026-05-31-0757-codex-vm200-abzan-source-packet.md
?? docs/handoffs/2026-05-31-0805-codex-vm201-tarkir-clan-source-restore.md
?? docs/handoffs/2026-05-31-0817-codex-vm203-208-temur-planning.md
?? docs/handoffs/2026-05-31-0844-codex-vm203-temur-source-packet.md
?? docs/handoffs/2026-05-31-0859-codex-vm198-abzan-identity-metaphysics.md
?? docs/handoffs/2026-05-31-0911-codex-vm204-temur-identity-metaphysics.md
?? docs/handoffs/2026-05-31-0919-codex-vm199-abzan-docs-parity-fill.md
?? docs/kanban/backlog/VM-205-temur-frontier-docs-parity-fill.md
?? docs/kanban/backlog/VM-206-temur-frontier-raw-faction-source-packet.md
?? docs/kanban/backlog/VM-207-temur-frontier-raw-packet-review-gate.md
?? docs/kanban/backlog/VM-208-temur-frontier-controlled-runtime-promotion.md
?? docs/kanban/done/VM-198-abzan-identity-and-metaphysics.md
?? docs/kanban/done/VM-199-abzan-docs-parity-fill.md
?? docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md
?? docs/kanban/done/VM-201-tarkir-clan-source-folder-restore.md
?? docs/kanban/done/VM-203-temur-frontier-source-packet-evidence-ledger.md
?? docs/kanban/done/VM-204-temur-frontier-identity-and-metaphysics.md
?? docs/research/PROMPT_lore-source-packet.md
?? "docs/research/abzan houses/"
?? docs/research/abzan/
?? "docs/research/jeskai way/"
?? "docs/research/mardu horde/"
?? "docs/research/sultai brood/"
?? "docs/research/temur frontier/"
?? docs/research/temur/
```

Expected additions beyond that baseline:

- `data/raw-factions/abzan/`
- `docs/kanban/done/VM-200-abzan-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-0953-codex-vm200-abzan-raw-faction-source-packet.md`

Expected modifications to paths already dirty in baseline:

- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks / Uncertainties

- The working tree already had broad untracked Abzan, Temur, and restored clan source folders before this task. This task intentionally avoided normalizing, staging, deleting, or moving those unrelated baseline paths.
- While editing the allowed board and handoff index files, concurrent Temur VM-205 artifacts appeared (`docs/kanban/done/VM-205-temur-frontier-docs-parity-fill.md` and `docs/handoffs/2026-05-31-0950-codex-vm205-temur-docs-parity-fill.md`). This task preserved that existing board/index state and only added the duplicate Abzan VM-200 row.
- Current Jund/Naya raw-packet JSON has since been promoted to live-pilot metadata. Duplicate Abzan VM-200 followed the source-only raw-packet family while using explicit non-live/review-gated values from the prompt.
- Commander/operator material is present in support-only profile notes and must not become raw claims without later source review.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` before edits to capture dirty baseline.
- Pre-flight dependency check confirmed the Abzan evidence ledger, source ledger, identity doc, metaphysics doc, Abzan VM-198 handoff, and Abzan VM-199 handoff exist; `data/raw-factions/abzan` was absent before implementation.
- PowerShell parse check for all five Abzan raw JSON files.
- File-count check confirmed exactly five Abzan raw JSON files.
- Claim-count and ID check confirmed exactly 10 raw claims with IDs `abzan_claim_0001` through `abzan_claim_0010`.
- Status check confirmed `runtime_status=source_authored_review_gated`, `placement_status=not_placement_eligible`, `preview=False`, `raw_packet_status=source_authored_review_gated`, `placement_axes=0`, `review_gated=True`, `placement_eligible=False`, and `live_pilot=False`.
- Raw-claim cited evidence rows resolve in the normalized Abzan packet.
- Top-level key comparison against the latest Naya raw packet files passed for claims, sources, profile, placement, and changelog JSON.
- Raw-claim validation passed: exactly 10 IDs, only claim-bearing sources, no blocked support-only/synthesis/manual-fill rows in raw claim evidence, and no architecture/seed paths in raw claim material.
- Profile and placement claim-reference validation passed: all referenced `abzan_claim_####` IDs are subsets of the 10 raw claims.
- Source-role validation passed: all source roles are `claim-bearing`, `shaping-only`, or `support-only`.
- Runtime/generated/builder diff check passed: no tracked diffs in `research/build-faction-artifacts.mjs`, `data/factions.json`, `data/identity-layers.json`, `data/placement-model.json`, `data/placement-model.schema.json`, or `data/generated`.
- Route/Home/Maze/Supabase/schema/test/fixture scoped diff check passed with no tracked diffs.
- Scoped trailing-whitespace scan on changed duplicate Abzan VM-200 files passed.
- Scoped `git diff --check` on duplicate Abzan VM-200 allowed paths passed, with existing LF-to-CRLF warnings on `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.
- Final `git status --short` comparison showed the expected duplicate Abzan VM-200 additions (`data/raw-factions/abzan/`, `docs/kanban/done/VM-200-abzan-raw-faction-source-packet.md`, and this handoff) plus allowed board/index modifications. It also showed concurrent Temur VM-205 artifacts that were not part of this task and were not edited by this task.

Skipped:

- `npm test` and `npm run test:parser`, because duplicate Abzan VM-200 is source-authored raw data only and is not wired into runtime/parser surfaces.
- Runtime, browser, generated-artifact, schema, Supabase, Maze, route, Home, placement, fixture, and builder tests because this task explicitly did not touch those surfaces.

## Not Touched

- Existing Abzan source-packet VM-200 card
- Existing Abzan source-packet VM-200 handoff
- `docs/research/abzan/**`
- `docs/research/abzan houses/**`
- `docs/architecture/colors/abzan/**`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/generated/**`
- Schemas
- Supabase files
- Home files
- Maze files
- Route CSS/JS
- Runtime JS
- Placement fixtures
- Route maps
- Browser bundles
- Tests
- Staging or commits

## Follow-Up Recommendations

- Next user-declared Abzan stack card: VM-201 Raw Packet Review Gate.
- Do not wire `ABZAN`, `abzan`, `WBG`, or any W/B/G permutation into builders, generated data, fixtures, routes, Home, Maze, Supabase, schemas, or runtime surfaces until a later explicit controlled promotion card approves that step.
- If later Abzan work needs exact card facts, commander legality, detailed biographies, minor-house hierarchy, exact rebellion operations, post-rebellion integration, or long-term dragonstorm ecology, extend the normalized evidence packet first.

## Next Suggested Agent

JSON Cartographer for VM-201 raw-packet review gate, if approved.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-200-abzan-raw-faction-source-packet.md`
- `docs/kanban/done/VM-200-abzan-houses-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-198-abzan-identity-and-metaphysics.md`
- `docs/kanban/done/VM-199-abzan-docs-parity-fill.md`
- `docs/research/abzan/abzan-evidence-ledger.md`
- `docs/research/abzan/abzan-source-ledger.md`
- `docs/architecture/colors/abzan/identity.md`
- `docs/architecture/colors/abzan/metaphysics.md`
- `data/raw-factions/abzan/abzan.claims.json`
- `data/raw-factions/abzan/abzan.placement.json`

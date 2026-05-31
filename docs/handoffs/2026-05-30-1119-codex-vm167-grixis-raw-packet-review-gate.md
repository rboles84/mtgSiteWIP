# VM-167 Grixis Raw Packet Review Gate Handoff

## Agent Name

Codex

## Task Requested

Implement VM-167 as a review gate for the VM-166 Grixis authored-but-not-live raw packet. Validate the raw JSON packet, evidence binding, non-live status, and dirty-worktree boundaries without editing the raw packet or promoting Grixis.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1035-codex-vm166-grixis-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-0932-codex-vm165-grixis-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-0851-codex-vm164-grixis-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-166-grixis-raw-faction-source-packet.md`
- `data/raw-factions/grixis/grixis.sources.json`
- `data/raw-factions/grixis/grixis.claims.json`
- `data/raw-factions/grixis/grixis.profile.json`
- `data/raw-factions/grixis/grixis.placement.json`
- `data/raw-factions/grixis/grixis.changelog.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.changelog.json`
- `data/raw-factions/esper/esper.sources.json`
- `data/raw-factions/esper/esper.claims.json`
- `data/raw-factions/esper/esper.profile.json`
- `data/raw-factions/esper/esper.placement.json`
- `data/raw-factions/esper/esper.changelog.json`
- `research/build-faction-artifacts.mjs`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-167-grixis-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-1119-codex-vm167-grixis-raw-packet-review-gate.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Created and completed the VM-167 Kanban review card.
- Reviewed the five VM-166 Grixis raw JSON files without editing them.
- Marked the packet as `review-approved-for-future-promotion-planning` in this handoff only.
- Recorded that this review is not promotion-approved, runtime-ready, or placement-ready.
- Updated the handoff index.

## Why It Changed

VM-167 is the review airlock between the authored-but-not-live VM-166 raw packet and any future VM-168 promotion planning. It confirms that the packet is structurally usable for future review without wiring Grixis into live placement or generation.

## Decisions Made

- Treat the raw packet as approved for future promotion planning.
- Do not treat VM-167 approval as permission to promote `GRIXIS`.
- Keep `UBR` as metadata-only language.
- Keep `GRIXIS` out of live placement, `RAW_TO_KEY`, generated artifacts, and runtime surfaces.
- Treat the pre-existing Esper `RAW_TO_KEY` builder diff as an external dirty-worktree caveat, not a Grixis raw-packet defect.

## Risks / Uncertainties

- The repository remains dirty from earlier work. `git diff --name-only` still reports unrelated tracked changes in runtime/data/generated-adjacent areas including `data/factions.json`, `data/placement-model.json`, `assets/js/quick-reading-tests.js`, `research/build-faction-artifacts.mjs`, and Supabase context.
- `research/build-faction-artifacts.mjs` has a pre-existing Esper `RAW_TO_KEY` diff. It contains no `grixis` or `GRIXIS` diff, but VM-168 planning should account for it before any promotion work.
- `data/raw-factions/grixis/`, `docs/research/grixis/`, and `docs/architecture/colors/grixis/` are still untracked from earlier Grixis slices. VM-167 verified their content hashes before and after the review gate instead of assuming a clean status.

## Tests Run

- `Get-Content AGENTS.md`
- `Get-Content docs\handoffs\HANDOFF_INDEX.md | Select-Object -First 18`
- `Get-Content docs\kanban\board.md | Select-Object -First 80`
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short`
- Read the VM-164, VM-165, and VM-166 Grixis handoffs.
- Read the VM-166 Grixis Kanban card.
- Node top-level key comparison for Grixis, Bant, and Esper raw packet files.
- Node aggregate hash check for read-only Grixis packet paths before and after review:
  - `data/raw-factions/grixis` - 5 files - `a6b06731f8f5a6bb718d34537aae0dfd871a71b9cabf0e4b12262dabaa75f0e1`
  - `docs/research/grixis` - 10 files - `71e949e061b91ec836a3f40642e1a54976377337cbe8d8b3deb88da172ed8497`
  - `docs/architecture/colors/grixis` - 2 files - `75260437a6738a071a90f956142468f030ff5eff49ef4783128ea8aadc075c7b`
- Node VM-167 raw packet review validation:
  - exactly five expected JSON files exist;
  - all five parse;
  - top-level shape matches Bant/Esper precedent as closely as applicable;
  - all referenced source IDs resolve to `grixis.sources.json`;
  - exactly 8 raw claims exist;
  - claim IDs are `grixis_claim_0001` through `grixis_claim_0008`;
  - raw claims reference only VM-164 rows `GRIXIS-001` through `GRIXIS-008`;
  - VM-165 architecture docs are not primary raw-claim evidence;
  - profile and placement claim references are subsets of the 8 raw claim IDs;
  - `placement_axes` is `[]`;
  - blocked live/readiness fields and language are absent.
- `rg` scan for support/manual/comparator/operator/mechanics terms across the raw packet; hits are bounded review, support, or rejection contexts outside raw claims.
- `rg` scan for forbidden live/readiness language across the raw packet; no hits.
- `rg` scan confirming VM-165 architecture source IDs do not appear in `grixis.claims.json`; no hits.
- `git diff -- research/build-faction-artifacts.mjs | rg -n "grixis|GRIXIS"`; no hits.
- `git diff -- research/build-faction-artifacts.mjs | Select-Object -First 80`; confirmed the existing builder diff is Esper-related.
- `git diff --name-only`; confirmed global unrelated dirty files remain.
- `git diff --name-only -- data/raw-factions/grixis docs/research/grixis docs/architecture/colors/grixis`; no tracked diffs reported for those paths.

Skipped:

- `npm test`, because VM-167 did not touch runtime or generated contracts.
- `npm run build:factions`, because Grixis remains non-live and VM-167 is review-only.

## Not Touched

- `data/raw-factions/grixis/`
- `docs/research/grixis/`
- `docs/architecture/colors/grixis/`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/generated/`
- Supabase files
- Home files
- Maze files
- route CSS/JS
- runtime JS
- tests

## Follow-Up Recommendations

- Plan VM-168 only after acknowledging this handoff and the existing dirty builder/runtime/data caveat.
- Before VM-168 promotion, explicitly decide whether to include or isolate the pre-existing Esper builder/runtime/generated changes so Grixis promotion does not co-mingle unrelated deltas.
- VM-168, if approved, should be a controlled runtime promotion plan that adds `grixis` to `RAW_TO_KEY`, runs the approved build path, and verifies the live placement delta separately.

## Next Suggested Agent

Planning Architect for VM-168 controlled runtime promotion planning, if human review approves moving past this gate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-167-grixis-raw-packet-review-gate.md`
- `docs/kanban/done/VM-166-grixis-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1035-codex-vm166-grixis-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-0932-codex-vm165-grixis-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-0851-codex-vm164-grixis-source-packet.md`
- `data/raw-factions/grixis/grixis.claims.json`
- `data/raw-factions/grixis/grixis.placement.json`

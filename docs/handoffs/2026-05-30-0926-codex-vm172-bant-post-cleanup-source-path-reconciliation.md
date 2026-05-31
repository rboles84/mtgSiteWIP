# VM-172 Bant Post-Cleanup Source Path Reconciliation Handoff

## Agent
Codex

## Task Requested
Run the Bant counterpart to VM-171: restore `docs/research/bant/` as the active research packet path, keep `docs/research/bant_done/` as staging/recovery only, normalize stale live-status wording if found, rebuild generated artifacts through the source pipeline, and preserve the `BANT` live / `WUG` metadata-only boundary.

## Files Reviewed
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-29-2206-codex-vm168-bant-downstream-lore-reconciliation.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`
- `docs/handoffs/2026-05-29-2254-codex-vm170-bant-research-folder-cleanup.md`
- `docs/handoffs/2026-05-30-0847-codex-vm171-esper-post-promotion-lore-reconciliation.md`
- `docs/kanban/board.md`
- `docs/research/bant_done/`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.changelog.json`
- `docs/architecture/colors/bant/identity.md`
- `docs/architecture/colors/bant/metaphysics.md`
- `data/factions.json`
- `data/placement-model.json`
- `data/identity-layers.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.changelog.json`
- `docs/kanban/done/VM-172-bant-post-cleanup-source-path-reconciliation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-0926-codex-vm172-bant-post-cleanup-source-path-reconciliation.md`

`docs/research/bant/` was restored from `docs/research/bant_done/`, but the restored tracked packet files matched the index content and no diff remains there.

## What Changed
- Restored `docs/research/bant/` from `docs/research/bant_done/`, including the packet files and `source-material/`.
- Left `docs/research/bant_done/` untouched as staging/source-recovery material.
- Renamed Bant raw profile `search_and_filter_metadata.future_identity_note` to `live_identity_note`.
- Added `bant_change_006` to the Bant raw changelog for VM-172.
- Added and closed VM-172 in Kanban.
- Updated the handoff index.
- Ran `npm run build:factions` after the raw metadata edit.

## Why It Changed
After VM-170, the active Bant packet path had drifted into a deleted `docs/research/bant/` state with `docs/research/bant_done/` present as recovery/staging material. VM-172 restores the active path for future references without reopening Bant evidence, lore, scoring, or live routing decisions.

## Decisions Made
- `docs/research/bant/` is the active research packet path for references.
- `docs/research/bant_done/` remains staging/source-recovery only and should not become an active reference target.
- Bant remains live as `BANT`.
- `WUG` remains color-direction metadata/prose only.
- The restored `source-material/` relative paths were preserved exactly.
- No Bant claims, source tiers, Commander claims, named figures, or mechanical interpretations were added.

## Source-Path Resolution
```text
Start:
docs/research/bant/      absent
docs/research/bant_done/ present

Action:
Copied approved packet files and source-material/ from docs/research/bant_done/ to docs/research/bant/.
No files were deleted, moved, flattened, renamed, deduplicated, or rewritten inside source-material/.

Closeout:
docs/research/bant/ exists and contains:
- README.md
- bant-source-ledger.md
- bant-evidence-ledger.md
- bant-research-dossier.md
- bant-reliability-audit.md
- bant-manual-fill.md
- bant-lore-source-packet.md
- source-material/

source-material/ contains:
- addtInfoBant.txt
- Bant_Lore_Reference.docx
- README.md
```

## Final `git diff --name-only`
Tracked dirty paths at closeout include prior Esper/runtime work plus the VM-172 tracked edits:

```text
assets/js/quick-reading-tests.js
data/archscry-flavor-snippets.json
data/factions.json
data/identity-layers.json
data/placement-model.json
data/raw-factions/bant/bant.changelog.json
data/raw-factions/bant/bant.profile.json
docs/handoffs/HANDOFF_INDEX.md
docs/kanban/board.md
docs/research/esper/esper-lore-source-packet.md
research/archscry-dossier-followup-tests.js
research/build-faction-artifacts.mjs
supabase/functions/guild-recruiter/faction-context.ts
```

New untracked VM-172 files:

```text
docs/handoffs/2026-05-30-0926-codex-vm172-bant-post-cleanup-source-path-reconciliation.md
docs/kanban/done/VM-172-bant-post-cleanup-source-path-reconciliation.md
```

Unrelated dirty/untracked paths were present before VM-172 and were left untouched, including Esper VM-163A through VM-171 files, Grixis research/architecture/card files, generated/runtime Esper promotion diffs, and unrelated route/test diffs.

## JSON / Build Validation
```text
Parsed Bant raw JSON:
- bant.changelog.json
- bant.claims.json
- bant.placement.json
- bant.profile.json
- bant.sources.json

source_count: 21
claim_count: 21
declared_claim_count: 21
missing_reference_count: 0
```

```text
npm run build:factions
Built 22 faction placement records.
Wrote data\placement-model.json
Wrote data\placement-model.schema.json
Wrote supabase\functions\guild-recruiter\faction-context.ts
```

Generated artifacts were not hand-edited. The generated/runtime surface was already dirty from the Esper promotion/reconciliation trail; VM-172 did not edit builder logic, Hall prompts, scoring, aliases, Home preview, routes, Maze, or schemas by hand.

## Live-Count Checks
```json
{
  "BANT_live": true,
  "counts": {
    "factions": 22,
    "model": 22,
    "identity": 22
  },
  "home_preview": {
    "preview_eligible": 20,
    "preview_order": 20
  },
  "domain_keys": []
}
```

The pre-VM-172 starting baseline was 22 factions / 22 placement records / 22 identity expressions, and closeout remains 22 / 22 / 22.

## WUG Guard Scans
```json
{
  "factions_key": false,
  "model_key": false,
  "identity_key": false,
  "context_mentions": false,
  "builder_mentions": false
}
```

`rg WUG` finds only metadata/prose/source-bound references in Bant docs and raw Bant packet files. No generated/runtime `WUG` placement key, route key, identity key, alias, raw-to-key target, or live expression entry was found.

## Active Packet Closeout Listing
```text
docs/research/bant/
- README.md
- bant-evidence-ledger.md
- bant-lore-source-packet.md
- bant-manual-fill.md
- bant-reliability-audit.md
- bant-research-dossier.md
- bant-source-ledger.md
- source-material/

docs/research/bant/source-material/
- addtInfoBant.txt
- Bant_Lore_Reference.docx
- README.md
```

## Tests Run
```text
node raw Bant JSON/reference validation
PASS missing_reference_count: 0
```

```text
npm run build:factions
PASS Built 22 faction placement records.
```

```text
npm run test:placement
PASS adaptive placement tests: 22 factions, 22 golden paths
```

```text
npm test
PASS adaptive placement tests: 22 factions, 22 golden paths
PASS parser cases: 115
PASS builder cases: 6
PASS Maze query contract tests
PASS syntax translation cases: 14
PASS mode cases: 5
PASS Maze search metadata helper cases
PASS precon artifact tests
PASS archscry dossier follow-up tests
PASS presentation snapshot tests: 16 fixed cases
```

```text
git diff --check
PASS
```

## Additional Scans
```text
rg docs/research/bant_done|bant_done across active Bant/raw/generated/runtime surfaces
PASS no matches
```

```text
rg future_identity_note|not live|not placement eligible|not placement-eligible|future promotion|pre-live|reviewable source data only
Remaining matches:
- "Commander-specific claims are curation support, not live recommendation output."

Assessment:
Remaining matches are Commander/recommendation-output boundaries, not Bant pre-live status.
```

```text
git diff -- data/raw-factions/bant/bant.claims.json docs/architecture/colors/bant/identity.md docs/architecture/colors/bant/metaphysics.md docs/research/bant
PASS no diff
```

## Risks / Uncertainties
- The working tree remains broadly dirty from previous Esper/Bant/Grixis work. VM-172 did not attempt to normalize or revert unrelated paths.
- `docs/research/bant_done/` remains untracked staging/source-recovery material by design. A future cleanup card should decide whether to archive or delete exact duplicates.
- Generated artifacts were already dirty at start; VM-172 rebuild confirmed the current source pipeline still emits 22 placement records, but this handoff does not claim ownership of all pre-existing generated diffs.

## Not Touched
- Bant placement scoring
- Bant Hall prompts
- Home preview behavior
- Maze route
- Route maps
- Runtime logic
- Schema redesign
- Source-material file names or relative paths
- Bant claims / evidence / lore doctrine
- Esper, Grixis, Jund, Naya, Abzan, Sultai, or Temur research content

## Follow-Up Recommendations
- Keep `docs/research/bant/` as the active path in future Bant source notes.
- Do not update active references to point at `docs/research/bant_done/`.
- Open a separate cleanup card if the team wants to archive or delete `bant_done/` after proving exact duplicates.
- Review and stage the broader dirty tree as a bundle only after confirming ownership of the pre-existing Esper/Grixis/generated changes.

## Next Suggested Agent
Documentation Steward for optional duplicate/staging cleanup planning, only after the current dirty tree is reviewed.

## Related Kanban Card, Docs, Or Plans
- `docs/kanban/done/VM-172-bant-post-cleanup-source-path-reconciliation.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-29-2206-codex-vm168-bant-downstream-lore-reconciliation.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`
- `docs/handoffs/2026-05-29-2254-codex-vm170-bant-research-folder-cleanup.md`
- `docs/handoffs/2026-05-30-0847-codex-vm171-esper-post-promotion-lore-reconciliation.md`

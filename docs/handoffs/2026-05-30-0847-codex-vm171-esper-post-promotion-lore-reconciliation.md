# 2026-05-30 08:47 - Codex - VM-171 Esper Post-Promotion Lore Reconciliation

## Agent Name

Codex

## Task Requested

Implement VM-171: run a conservative post-VM-167 Esper reconciliation pass that restores the active Esper research path, fixes stale pre-live/review wording, keeps richer lore source-bound, and rebuilds generated placement copy without changing placement scoring, Home preview, routes, schemas, or runtime key structure.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-2124-codex-vm163-esper-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-29-2318-codex-vm163a-vm164-esper-packet-repair-base-docs.md`
- `docs/handoffs/2026-05-29-2349-codex-vm165-esper-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-0018-codex-vm166-esper-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-0119-codex-vm167-esper-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-29-2206-codex-vm168-bant-downstream-lore-reconciliation.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`
- `docs/kanban/board.md`
- `data/raw-factions/esper/`
- `docs/architecture/colors/esper/identity.md`
- `docs/architecture/colors/esper/metaphysics.md`
- `docs/research/esper_done/`
- `docs/research/esper/`

## Files Changed

- `data/raw-factions/esper/esper.profile.json`
- `data/raw-factions/esper/esper.placement.json`
- `data/raw-factions/esper/esper.sources.json`
- `data/raw-factions/esper/esper.changelog.json`
- `docs/architecture/colors/esper/identity.md`
- `docs/architecture/colors/esper/metaphysics.md`
- `docs/research/esper/esper-lore-source-packet.md`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-171-esper-post-promotion-lore-reconciliation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-0847-codex-vm171-esper-post-promotion-lore-reconciliation.md`

`data/factions.json`, `data/placement-model.json`, and `supabase/functions/guild-recruiter/faction-context.ts` changed only through `npm.cmd run build:factions`.

## What Changed

- Restored the active Esper research packet location by copying authoritative packet contents from `docs/research/esper_done/` back to `docs/research/esper/`.
- Left `docs/research/esper_done/` untouched as staging/source-recovery material and did not update references to point at it.
- Updated the repaired Esper lore-source packet status language so it reflects VM-167: `ESPER` is live, `WUB` remains metadata-only, and detailed lore remains unavailable for raw claims or live routing evidence.
- Reconciled Esper architecture docs from non-live/non-placement-eligible wording to VM-167 live-pilot wording.
- Updated raw profile and placement notes from pre-live/future-review wording to source-bound live-pilot wording.
- Removed stale `review_gated: true` markers from Esper placement core values and behavioral signals.
- Added `esper_change_003` to the Esper raw changelog for VM-171.
- Rebuilt generated placement copy so the generated model and Supabase context inherit the corrected review note.
- Created and closed the VM-171 Kanban card.

## Why It Changed

VM-167 made `ESPER` live, but several source-bound Esper surfaces still used VM-164/VM-166-era language such as future review, non-live, or promotion-required wording. VM-171 reconciles those labels without promoting richer Esper lore or altering placement behavior.

## Decisions Made

- Kept this as status cleanup and boundary reconciliation only, not evidence promotion.
- Preserved the VM-163 direct evidence floor and did not add new raw claims.
- Kept detailed lore terms in deferred/manual-fill/source-bound language only.
- Kept `WUB` as metadata-only color identity, not a generated/runtime key or alias.
- Did not delete `docs/research/esper_done/`; the duplicate/staging folder remains for later cleanup review.
- Did not touch unrelated Bant research deletions or untracked shard research folders.

## Risks / Uncertainties

- `docs/research/esper_done/` remains as an untracked staging/source-recovery folder after active path restoration.
- The working tree remains broadly dirty from earlier VM-163 through VM-167 work, unrelated Bant research-folder movement, and unrelated untracked shard folders.
- `data/raw-factions/esper/esper.claims.json` still contains VM-166 historical notes; VM-171 did not edit claims because the plan scoped raw edits to profile, placement, sources, and changelog.
- Rich Esper lore remains deferred until a separate evidence-promotion card adds stronger local support.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short`
- JSON parse and reference validation across all Esper raw JSON files
- Source-path scan for `docs/research/esper_done`
- Stale pre-live wording scan
- Lore-boundary scan for deferred/manual-fill terms
- `verified|confirmed|absolute` scan
- WUB key/alias guard script
- `npm.cmd run build:factions`
- `npm.cmd run test:placement` - passed, `22 factions, 22 golden paths`
- `npm.cmd test` - passed
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - line-ending warnings only

### Source-Path Resolution

```text
Restored active path: docs/research/esper/
Recovery source: docs/research/esper_done/
Canonical reference policy: keep references pointing at docs/research/esper/
References to docs/research/esper_done in active Esper/raw/generated surfaces: none
Research deletion policy: no research files deleted
Staging folder policy: docs/research/esper_done/ left untouched
```

### JSON Parse / Claim / Source Validation

```json
{
  "parsed": [
    "esper.changelog.json",
    "esper.claims.json",
    "esper.placement.json",
    "esper.profile.json",
    "esper.sources.json"
  ],
  "source_count": 13,
  "claim_count": 9,
  "profile_claim_refs": 9,
  "placement_axes": 0,
  "errors": []
}
```

### Artifact-Specific Live Counts

```json
{
  "factions_count": 22,
  "placement_model_count": 22,
  "identity_expression_count": 22,
  "home_preview_count": 20,
  "has_esper": {
    "factions": true,
    "placement": true,
    "identity": true
  },
  "has_wub": {
    "factions": false,
    "placement": false,
    "identity": false
  },
  "domain_keys": [],
  "esper_collision_targets": [
    "WU",
    "UB",
    "WB",
    "BANT"
  ],
  "esper_collision_has_null": false
}
```

### Lore-Boundary Scan Summary

```text
Manual-fill lore terms remain in deferred/source-bound/manual-fill language.
No Esper raw/generated routing surface promotes Carmot, Sangrite, Noble Work, Vectis, Tidehollow, Sharuum, Tezzeret, Silas Renn, Breya, Agatha, Sydri, Crucius, Conflux, post-Conflux, or post-Phyrexian topics as current routing evidence.
The only "verified" scan hit in Esper material is the guard sentence warning not to describe manual-fill material as currently verified.
The non-Esper "verified" hit is Lorehold generated copy and was not touched by VM-171.
```

### Promotion Guard Summary

```json
{
  "has_top_level_wub": false,
  "wub_alias_owners": [],
  "wub_mentions_are_metadata": true,
  "esper_live_key": "ESPER",
  "home_preview_count": 20,
  "domain_keys": []
}
```

### Final `git diff --name-only`

```text
assets/js/quick-reading-tests.js
data/archscry-flavor-snippets.json
data/factions.json
data/identity-layers.json
data/placement-model.json
docs/handoffs/HANDOFF_INDEX.md
docs/kanban/board.md
docs/research/bant/README.md
docs/research/bant/bant-evidence-ledger.md
docs/research/bant/bant-lore-source-packet.md
docs/research/bant/bant-manual-fill.md
docs/research/bant/bant-reliability-audit.md
docs/research/bant/bant-research-dossier.md
docs/research/bant/bant-source-ledger.md
docs/research/bant/source-material/Bant_Lore_Reference.docx
docs/research/bant/source-material/README.md
docs/research/bant/source-material/addtInfoBant.txt
docs/research/esper/esper-lore-source-packet.md
research/archscry-dossier-followup-tests.js
research/build-faction-artifacts.mjs
supabase/functions/guild-recruiter/faction-context.ts
```

Intentional VM-171 untracked paths include:

```text
?? docs/handoffs/2026-05-30-0847-codex-vm171-esper-post-promotion-lore-reconciliation.md
?? docs/kanban/done/VM-171-esper-post-promotion-lore-reconciliation.md
```

Pre-existing untracked Esper product paths from earlier cards remain present:

```text
?? data/raw-factions/esper/
?? docs/architecture/colors/esper/
```

## Not Touched

- `research/build-faction-artifacts.mjs`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/identity-layers.json`
- `data/archscry-flavor-snippets.json`
- Placement scoring or Hall prompts
- Home preview behavior
- Maze files
- route CSS/JS
- schema redesign
- hand-authored Supabase source
- Grixis, Jund, Naya, Sultai, Abzan, or Bant research cleanup

## Follow-Up Recommendations

- Open a separate evidence-promotion card if the project wants richer Esper lore, figures, geography, or material lore in live dossier copy.
- Open a research-folder cleanup card if `docs/research/esper_done/` should be removed after commit review.
- Review whether `data/raw-factions/esper/esper.claims.json` historical VM-166 notes should receive a future status-label cleanup, since VM-171 intentionally avoided claims edits.

## Next Suggested Agent

Documentation Steward for a future Esper evidence-promotion/source-capture card, or Kanban Steward for research-folder cleanup after commit review.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-171-esper-post-promotion-lore-reconciliation.md`
- `docs/kanban/done/VM-167-esper-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-166-esper-raw-faction-source-packet.md`
- `docs/kanban/done/VM-165-esper-docs-parity-fill.md`
- `docs/kanban/done/VM-163A-VM-164-esper-packet-repair-base-docs.md`
- `docs/handoffs/2026-05-30-0119-codex-vm167-esper-controlled-runtime-promotion.md`

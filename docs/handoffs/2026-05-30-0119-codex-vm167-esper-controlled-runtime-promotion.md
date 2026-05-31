# 2026-05-30 01:19 - Codex - VM-167 Esper Controlled Runtime Promotion

## Agent Name

Codex

## Task Requested

Implement VM-167: promote Esper from the VM-166 review-gated raw packet into one live Archscry placement expression key `ESPER`, keep `WUB` metadata-only, preserve Home preview at 20 entries, rebuild generated artifacts, update tests, and complete AGENTS bookkeeping.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-2124-codex-vm163-esper-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-29-2318-codex-vm163a-vm164-esper-packet-repair-base-docs.md`
- `docs/handoffs/2026-05-29-2349-codex-vm165-esper-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-0018-codex-vm166-esper-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-166-esper-raw-faction-source-packet.md`
- `docs/architecture/colors/esper/identity.md`
- `docs/architecture/colors/esper/metaphysics.md`
- `data/raw-factions/esper/`
- `data/raw-factions/bant/`
- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`

## Files Changed

- `assets/js/quick-reading-tests.js`
- `data/archscry-flavor-snippets.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/raw-factions/esper/esper.sources.json`
- `data/raw-factions/esper/esper.profile.json`
- `data/raw-factions/esper/esper.placement.json`
- `data/raw-factions/esper/esper.changelog.json`
- `research/archscry-dossier-followup-tests.js`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-167-esper-controlled-runtime-promotion.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-0119-codex-vm167-esper-controlled-runtime-promotion.md`

Pre-existing dirty/untracked files remain present from earlier Esper work, including `docs/research/esper/esper-lore-source-packet.md`, `docs/architecture/colors/esper/`, prior Esper handoffs/cards, and unrelated shard research folders. They were not cleaned or reverted.

## What Changed

- Promoted raw `esper` to live generated expression key `ESPER` through `RAW_TO_KEY`.
- Added `ESPER` to `data/identity-layers.json` as an active Alara shard with colors `["W","U","B"]`, core color `U`, `placement_eligible: true`, `preview_eligible: false`, and aliases `["ESPER","esper"]`.
- Updated Esper raw source metadata from source-only review gate to live pilot while keeping `WUB` metadata-only and expanded lore out of raw claims/routing anchors.
- Kept Esper `placement_axes: []` and added build-consumed calibration terms instead of numeric faction positions.
- Trimmed Esper collision guidance to active targets only: Azorius, Dimir, Orzhov, and Bant.
- Added Esper biological prior, lateral inhibition, limited Gate support, and two Esper Hall questions.
- Rebuilt generated faction artifacts through `npm run build:factions`.
- Regenerated `data/archscry-flavor-snippets.json` for 22 factions because existing dossier follow-up tests require snippets for every live faction key.
- Expanded placement and dossier tests for the 22-expression baseline and Esper-specific acceptance.
- Created and closed the VM-167 Kanban card.

## Why It Changed

VM-166 completed Esper as a reviewable raw packet, and the project owner explicitly authorized VM-167. The implementation follows the Bant VM-160 path: one controlled live shard expression, no broad shard framework, no Home preview expansion, and color-code metadata kept separate from the generated expression key.

## Decisions Made

- `ESPER` is the only live/generated Esper expression key.
- `WUB` remains color-direction metadata only; it is not a key, alias, fixture, route target, registry entry, or raw-to-key target.
- Esper live collision guidance omits Grixis, Jund, and Naya because they are not live placement targets and would normalize to null.
- Esper's expanded lore packet remains review-bounded support context, not raw claim evidence or runtime routing evidence.
- Home preview remains exactly the existing 20 entries.
- No runtime `domain` field was added.
- `data/archscry-flavor-snippets.json` regeneration was necessary for the existing all-live-faction snippet contract, matching the Bant promotion precedent.

## Risks / Uncertainties

- Esper live placement is calibrated only from the narrow VM-163 identity/design evidence floor plus VM-165 operator modeling. Detailed lore remains source-bound.
- The raw Esper packet still keeps geography, society, figures, material lore, chronology, and exact card-text-derived claims out of raw claims.
- The working tree includes pre-existing untracked Esper docs/cards and unrelated shard research folders; VM-167 did not attempt to normalize or stage them.
- Future Grixis/Jund/Naya promotions will need their own collision entries restored or authored after those targets become live.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP status --short`
- JSON parse across all five Esper raw files and `data/identity-layers.json`
- `node --check research/build-faction-artifacts.mjs`
- `node --check assets/js/quick-reading-tests.js`
- `npm.cmd run build:factions`
- `npm.cmd run test:placement` - passed, `22 factions, 22 golden paths`
- `node research/build-archscry-flavor-snippets.mjs`
- `npm.cmd test` - passed
- Raw packet claim/source/profile/placement reference validation
- WUB key/alias guard checks
- Domain/Home-preview/count/collision-target guard script
- Manual-fill term scan across Esper raw/generated/runtime-adjacent surfaces
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - line-ending warnings only

### Baseline And Final Counts

```json
{
  "baseline": {
    "factions": 21,
    "placement_model": 21,
    "identity_expressions": 21,
    "home_preview": 20,
    "has_bant": true,
    "has_esper": false,
    "has_wub": false
  },
  "final": {
    "factions": 22,
    "placement_model": 22,
    "identity_expressions": 22,
    "flavor_snippets": 22,
    "home_preview": 20,
    "has_bant": true,
    "has_esper": true,
    "has_wub_key": false,
    "wub_alias_owners": [],
    "domain_keys": [],
    "esper_collision_targets": ["WU", "UB", "WB", "BANT"],
    "esper_collision_has_null": false
  }
}
```

### Final `git diff --name-only`

Tracked diff output at closeout includes:

```text
assets/js/quick-reading-tests.js
data/archscry-flavor-snippets.json
data/factions.json
data/identity-layers.json
data/placement-model.json
docs/handoffs/HANDOFF_INDEX.md
docs/kanban/board.md
docs/research/esper/esper-lore-source-packet.md
research/archscry-dossier-followup-tests.js
research/build-faction-artifacts.mjs
supabase/functions/guild-recruiter/faction-context.ts
```

`docs/research/esper/esper-lore-source-packet.md` was already dirty before VM-167 and was not edited in this pass.

Intentional VM-167 new or untracked product/bookkeeping paths from status:

```text
?? data/raw-factions/esper/
?? docs/handoffs/2026-05-30-0119-codex-vm167-esper-controlled-runtime-promotion.md
?? docs/kanban/done/VM-167-esper-controlled-runtime-promotion.md
```

### JSON Parse / Claim / Source Validation Summary

```json
{
  "sources": 13,
  "claims": 9,
  "profile_claim_refs": 58,
  "placement_claim_refs": 25,
  "placement_axes": 0,
  "collision_targets": [
    "azorius_senate",
    "house_dimir",
    "orzhov_syndicate",
    "bant"
  ],
  "errors": []
}
```

### Placement / Promotion Guard Summary

```text
ESPER exists in data/factions.json, data/placement-model.json, data/identity-layers.json, and generated Supabase context.
WUB has no generated top-level key.
WUB has no identity alias owner.
RAW_TO_KEY maps esper -> ESPER and has no wub -> WUB target.
Home preview count remains 20 and order is unchanged.
No generated domain field was found.
ESPER collision guidance normalizes to WU, UB, WB, and BANT with no null target.
Manual-fill terms appear in Esper raw limitations/deferred language or pre-existing non-Esper content only, not as Esper raw claims or live routing anchors.
```

## Not Touched

- Home preview files and UI behavior
- Maze files
- route CSS/JS
- schema redesign
- hand-authored Supabase source outside generated faction context
- `docs/architecture/colors/esper/identity.md`
- `docs/architecture/colors/esper/metaphysics.md`
- Esper expanded lore as raw claim/routing evidence
- Grixis, Jund, Naya, or Abzan research folders

## Follow-Up Recommendations

- Run a browser/manual Archscry walkthrough for an Esper result card if visual QA is desired.
- Keep any Esper Home preview exposure as a separate card.
- If future lore reconciliation upgrades Esper geography, figures, or material lore, open a bounded VM-167A/VM-168-style downstream reconciliation instead of folding it into this promotion.
- Future shard promotions should repeat the live-target collision guard to avoid null collision targets.

## Next Suggested Agent

Test Strategist for an optional Archscry browser walkthrough of the new `ESPER` result path, then Documentation Steward if a post-promotion Esper lore reconciliation card is needed.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-167-esper-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-166-esper-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-0018-codex-vm166-esper-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`

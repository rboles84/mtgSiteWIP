# 2026-05-29 22:39 - Codex - VM-169 Bant Gold-Standard Parity Cleanup

## Agent Name

Codex

## Task Requested

Implement VM-169 as a status-label normalization pass so Bant can serve as the expansion template without claim drift. Preserve the current runtime truth: `BANT` is live, `WUG` remains metadata-only, Home preview stays off, and no placement/question/Home/Maze/route behavior changes occur.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-29-2206-codex-vm168-bant-downstream-lore-reconciliation.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-169-bant-gold-standard-parity-cleanup.md`
- `docs/architecture/colors/bant/identity.md`
- `docs/architecture/colors/bant/metaphysics.md`
- `docs/research/bant/bant-evidence-ledger.md`
- `docs/research/bant/bant-research-dossier.md`
- `docs/research/bant/bant-reliability-audit.md`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.changelog.json`

## Files Changed

- `docs/architecture/colors/bant/identity.md`
- `docs/architecture/colors/bant/metaphysics.md`
- `docs/research/bant/bant-evidence-ledger.md`
- `docs/research/bant/bant-research-dossier.md`
- `docs/research/bant/bant-reliability-audit.md`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.changelog.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-169-bant-gold-standard-parity-cleanup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-2239-codex-vm169-bant-gold-standard-parity-cleanup.md`

## What Changed

- Added VM-169 status notes to active Bant research docs so older VM-157 uncertainty labels are read through the VM-159A/VM-168 curated source-packet outcome.
- Normalized Asha to bounded presider / sacred-authority support only, with no founder or angel-creation-architect claim.
- Normalized Elspeth to source-supported Bant / Alara relevance only, with no governance or institution-building claim.
- Normalized Jhess, Topa, and Eos to bounded five-nation geography status while preserving direct-quotation and expanded-detail limits.
- Preserved Mubin as support context for Bant's communal champion pattern, not a standalone placement route.
- Updated active Bant architecture wording away from stale docs-phase / pre-live phrasing.
- Changed raw Bant `profile_version`, `placement_profile_version`, and `based_on_profile_version` to `1.0.0`.
- Replaced structured raw Bant `Medium-High` confidence labels with existing `Medium` conventions while preserving nuance in notes.
- Added `bant_change_005` for VM-169.
- Rebuilt generated placement artifacts through `npm.cmd run build:factions`.
- Moved VM-169 from in progress to done and updated the handoff index.

## Why It Changed

Bant was already live after VM-160 and reconciled after VM-168, but active docs and raw metadata still carried draft-era labels. VM-169 makes the Bant source packet read like the gold-standard expansion template without broadening lore claims or changing runtime behavior.

## Decisions Made

- Treated VM-169 as status normalization only, not lore enrichment.
- Kept historical notes only when explicitly marked as superseded or historical.
- Left broad archival Bant research files untouched.
- Did not hand-edit generated artifacts; only the builder regenerated them.
- Kept `WUG` out of aliases, generated top-level keys, raw-to-key targets, placement keys, and `identity.expression_key`.

## Expansion Template Reference

Bant is the current shard onboarding template after VM-160 live pilot promotion, VM-168 downstream lore reconciliation, and VM-169 gold-standard parity cleanup. Future shard additions, starting with Esper, should cite VM-169 during pre-flight before creating architecture docs, raw packets, or runtime promotion work. This is a quality and process reference only; it is not permission to promote another shard live.

Esper remains source-only/non-live after VM-163. Any future Esper architecture, raw-faction, or controlled promotion card should cite both VM-163 for the current Esper evidence boundary and VM-169 for the Bant expansion-template standard.

## Risks / Uncertainties

- Direct quote/source fetching remains deferred, so direct quotation and expanded detail for Jhess, Topa, Eos, Asha, Elspeth, and post-Phyrexia Bant remain source-bound.
- `git status` shows a pre-existing dirty tree with many prior VM files and untracked folders; VM-169 did not attempt to clean or revert unrelated work.
- `git diff --check` reports line-ending warnings only, consistent with the current Windows working tree.

## Tests Run

- `npm.cmd run build:factions` - passed; built 21 placement records.
- `npm.cmd run test:placement` - passed; `21 factions, 21 golden paths`.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed with line-ending warnings only.
- Targeted stale pre-live wording scan across active Bant architecture/research/raw/generated surfaces - no matches.
- Targeted `bant-source-draft-v0.1` / `Medium-High` scan across raw and generated Bant artifacts - no matches.
- WUG key/alias guard script - passed.

## Not Touched

- Placement scoring.
- Adaptive question bank.
- Home preview / carousel behavior.
- Maze behavior.
- Route CSS or route JS.
- Broad shard framework.
- Broad archival Bant research cleanup.
- Direct source fetching or quote verification.
- Manual edits to generated artifacts.

## Follow-Up Recommendations

- Create a separate verification card if direct quote/source fetching is needed for Asha, Elspeth, Jhess, Topa, Eos, Mubin, or post-Phyrexia Bant detail.
- Continue using Bant as the shard expansion template, but preserve the VM-169 rule: status-label normalization is not permission to expand claims.
- For future shard work, cite VM-169 as the expansion template reference and preserve source-bound status labels plus metadata-only color-code boundaries until a separate controlled promotion card says otherwise.

## Next Suggested Agent

JSON Cartographer for the next shard raw packet, with Documentation Steward review before runtime promotion.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-169-bant-gold-standard-parity-cleanup.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-29-2206-codex-vm168-bant-downstream-lore-reconciliation.md`

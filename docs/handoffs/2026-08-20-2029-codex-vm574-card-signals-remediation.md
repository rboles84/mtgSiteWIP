# 2026-08-20 20:29 - Codex VM-574 Card Signals Remediation

## Agent Name

Codex

## Task Requested

Implement VM-574 after the read-only audit: make Card Signals exactly 3 visible
Creatures, 3 visible Instants/Sorceries, and 3 visible Enchantments/Artifacts
for all 37 identities; perform bounded Mana Notes cleanup; preserve existing
dedupe/collision/rendering architecture; add a tiny single-category selector UI
fix; produce machine-readable all-37 evidence; stage but do not commit.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-20-1427-codex-vm573-archscry-runtime-decomposition.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-573-archscry-runtime-decomposition-pass-2.md`
- `docs/kanban/done/VM-559-archscry-authored-card-media-resolution.md`
- `docs/kanban/backlog/VM-569-ink-global-media-projection-reconciliation.md`
- `docs/reference/data-contracts.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `data/factions.json`
- `data/identity-layers.json`
- `data/scryfall/indexes/archscry-media-index.json`
- `scripts/archscry-media-projection-core.mjs`
- `scripts/build/build-faction-artifacts.mjs`
- `assets/js/archscry/dossier/reading.js`
- `assets/js/archscry/runtime/content.js`
- `assets/js/archscry/runtime/dossier-view.js`

## Files Changed

- `assets/js/archscry/runtime/dossier-view.js`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `package.json`
- `scripts/vm574-card-signals-validation.mjs`
- `docs/audits/vm574-card-signals/final-ledger.json`
- `docs/audits/vm574-card-signals/media-production-check.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-574-all-37-card-signals-mana-notes-remediation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-20-2029-codex-vm574-card-signals-remediation.md`

## What Changed

- Replaced sparse/colliding Card Signals with a frozen all-37 set that validates
  to exactly 111 visible Creatures, 111 visible Instants/Sorceries, and 111
  visible Enchantments/Artifacts.
- Preserved runtime collision order and dedupe behavior; no new selection engine
  or runtime fallback was added.
- Updated the source surfaces used by the faction builder: `data/factions.json`
  plus existing `data/identity-layers.json` display overrides where present.
- Performed bounded Mana Notes cleanup for weak/generic nonbasic choices in
  Dimir, Witherbloom, Silverquill, Grixis, Colorless, and WUBRG while preserving
  schema, tiers, layout, and basics.
- Suppressed redundant Card Signals segment controls when only one Card Signals
  category exists.
- Added `test:vm574-card-signals` and a deterministic all-37 JSON ledger.
- Added a media production comparison ledger. It reports 333 final slots, 278
  unique resolver keys, 144 keys already present in the committed VM-559
  production media index, and 134 missing keys.

## Why It Changed

VM-574 required Card Signals to become complete, visible, category-correct,
non-mana-primary teaching examples across every identity while leaving the
post-VM-573 runtime architecture intact.

## Decisions Made

- Selection freeze: once a pick passed correct slot type, legal color identity,
  non-mana-primary role, identity-teaching rationale, no predictable collision,
  and local Scryfall/media resolution, it was not reconsidered.
- Multiface commander cards remain valid when the presented card can be inspected
  and the authored slot has the required creature card identity; no blanket
  planeswalker ban was retained.
- The VM-559 production media index was not hand-edited. No supported deterministic
  partial projection/merge producer exists in the repo, and the full global
  projection remains blocked by VM-569.

## Risks / Uncertainties

- The 134 missing VM-574 media resolver keys require a supported partial
  projection/merge producer or VM-569 full-rebuild unblocking before the generated
  production media index can be updated under source/generated governance.
- `Crystal, Inhuman Princess` remains a VM-569 blocker because it is accepted Ink
  Sound content absent from the frozen 2026-05-14 raw Oracle snapshot.
- The unrelated VM-551 dossier-integrity source-string assertion remains outside
  VM-574.

## Tests Run

- `npm.cmd run build:factions` twice after final source changes: PASS; second run
  produced zero changed hashes.
- `npm.cmd run test:vm574-card-signals -- --write-ledger`: PASS, 37 identities,
  111/111/111 visible.
- Final VM-574 production media comparison: PASS for producing the limitation
  ledger; merge not applied, 134 keys remain missing by governance.
- `npm.cmd run lint:js`: PASS.
- `npm.cmd run test:source-generated`: PASS with inherited Jeskai/Mardu
  model-owned warnings.
- `npm.cmd run test:vm559-resolution`: PASS.
- `git diff --check`: PASS with line-ending warnings only.

Known non-VM-574 failures observed and not pursued:

- `npm.cmd run scryfall:index` / `npm.cmd run scryfall:inspect` / full
  `test:vm559-media-projection`: blocked by VM-569's `Crystal, Inhuman Princess`
  frozen raw-snapshot mismatch and/or stale global projection.
- `npm.cmd run test:vm551-dossier-integrity`: stops at an unrelated stale
  source-string assertion.

## Not Touched

- No runtime selector, collision, APP_STATE, modal, Scryfall lookup, or fallback
  redesign.
- No replacement of already-passing Card Signals.
- No VM-569 Crystal repair.
- No VM-551 dossier assertion repair.
- No commit, push, deployment, branch creation, or worktree creation.

## Follow-up Recommendations

- Add a governed VM-559 partial projection/merge producer, or complete VM-569 so
  the full projection can rebuild cleanly.
- Owner spot-check VM-574 using Silverquill, Dimir, Witherbloom, Grixis, Naya,
  Colorless, WUBRG, and Azorius.

## Next Suggested Agent

Owner review, then a VM-569 media projection reconciliation agent if production
media projection updates are required before integration.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-574-all-37-card-signals-mana-notes-remediation.md`
- `docs/audits/vm574-card-signals/final-ledger.json`
- `docs/audits/vm574-card-signals/media-production-check.json`
- `docs/kanban/backlog/VM-569-ink-global-media-projection-reconciliation.md`

## Compact Implementation Packet

- Changed behavior: Card Signals render exact 3x3 visible groups for all 37
  identities; redundant single-category selector is suppressed.
- Protected behavior: existing collision/dedupe order, renderer, APP_STATE,
  VM-573 module boundaries, Mana Notes layout/schema/basics, and VM-559/VM-569
  source authority.
- Consumers: Archscry dossier Card Signals/Mana Notes, faction builder generated
  artifacts, guild recruiter context, owner review ledgers.
- Realistic risks: media projection remains incomplete until a governed producer
  exists for the 134 VM-574 resolver additions or VM-569 unblocks full rebuild.
- Smallest complete implementation: source Card Signal/Mana Note patches,
  generated faction rebuild, focused VM-574 validator/ledger, tiny UI selector
  suppression, and documentation.
- Non-goals: card optimization, new selection engines, Crystal reconciliation,
  stale VM-551 source-string repair, commit/push/deploy.
- Stop conditions: stop before ad-hoc generated media patching; stop before
  additional content iteration once 37/37 and 111/111/111 pass.

## Owner-QA Readiness

- QA tier: focused content/runtime QA with generated-data guardrails.
- Changed behavior under review: visible Card Signals completeness and quality.
- Protected contracts: no runtime architecture redesign, no mana-primary signals,
  no collision loss, no unsupported generated media edits.
- Owner review packet: use
  `docs/audits/vm574-card-signals/final-ledger.json` and spot-check the eight
  named identities above.

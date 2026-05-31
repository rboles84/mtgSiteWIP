# 2026-05-31 00:19 - Codex - VM-194 Bant Live Parity Text Hardening

## Agent Name

Codex

## Task Requested

Implement the Bant live parity and Archscry text hardening plan, renumbered from the requested VM-193 to VM-194 because VM-192 and VM-193 were already occupied by Jund and Grixis hardening work.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-0926-codex-vm172-bant-post-cleanup-source-path-reconciliation.md`
- `docs/handoffs/2026-05-30-1746-codex-vm175-bant-esper-dossier-recommendation-parity-audit.md`
- `docs/handoffs/2026-05-30-2358-codex-vm192-jund-live-parity-archscry-text-hardening.md`
- `docs/kanban/board.md`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/precon-artifact-tests.js`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.changelog.json`

## Files Changed

- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `research/precon-artifact-tests.js`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-194-bant-live-parity-archscry-text-hardening.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0019-codex-vm194-bant-live-parity-text-hardening.md`

## What Changed

- Added a Bant-specific Commander guidance override covering supported champion, public trust, disciplined belonging, living order, refinement, protection, and support-only exalted/sigil texture.
- Added a Bant-specific Archscry presentation override so table role, thesis, fork/self-check, and mechanics copy no longer fall back to generic Commander phrasing.
- Added Bant exact-color precon fit summaries for the local catalog titles `Counter Blitz`, `Peace Offering`, `Deep Clue Sea`, `Adaptive Enchantment`, `Evasive Maneuvers`, `Aura of Courage`, `Blast From the Past`, and `Bedecked Brokers`.
- Normalized Bant Commander Compass support metadata to `support_only_live_pilot_curation` and added exact commander/support link targets.
- Rebuilt generated faction artifacts through `npm.cmd run build:factions`.
- Added regression coverage for Bant fallback copy, visible `WUG` leakage, exact commander query boundaries, support-only precon copy, and generated support metadata.
- Closed VM-194 in Kanban while preserving the separate VM-195 Esper in-progress card.

## Why It Changed

Bant was live and source-bound, but its Commander/Archscry presentation lagged behind the quality layer already added for Grixis, Jund, and Naya. VM-194 makes Bant a mature reference surface without adding lore claims or changing placement behavior.

## Decisions Made

- Treat `BANT` as the only live expression key and keep `WUG` to metadata, query strings, raw source references, and tests/internal assertions.
- Use exact commander discovery for Bant: `id=wug is:commander f:commander`.
- Keep support/starter-card discovery on subset identity where appropriate: `id<=wug`.
- Treat EDHREC, MTGDecks, Archidekt, Scryfall, precon, and Commander Compass material as support references only, not canon proof.
- Do not reserve VM-195 for future Bant lore deepening because VM-195 is already an Esper parity card in this worktree.

## Risks / Uncertainties

- The worktree already contained later Esper/Grixis/Jund/Naya changes; this pass intentionally scoped edits to Bant hardening surfaces and shared tests.
- Bant Commander Compass candidate fields remain shaped like the existing raw packet (`exact_card_name`, `display_name`, support notes). This task did not change shared candidate-normalization behavior.
- Maze path policy was not changed; Bant Maze query behavior should remain a separate card if a future UX review wants route/sidebar changes.

## Tests Run

- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node --check research/precon-artifact-tests.js`
- `npm.cmd run build:factions`
- `node assets/js/quick-reading-tests.js` — `PASS adaptive placement tests: 25 factions, 25 golden paths`
- `node research/archscry-dossier-followup-tests.js`
- `node research/precon-artifact-tests.js`
- `npm.cmd run test:placement` — `PASS adaptive placement tests: 25 factions, 25 golden paths`
- `npm.cmd test`
- Targeted scans for `WUG`, `Exact WUG`, raw-to-key/route-map misuse, stale pre-live Bant wording, and Bant Commander query boundaries
- `git diff --check`

## Not Touched

- Placement scoring
- Question bank
- Home preview exposure
- Maze behavior or route policy
- Route CSS/JS
- Broad shard framework
- Bant lore claims or source rows
- Hand edits to generated artifacts
- VM-195 Esper in-progress card

## Follow-Up Recommendations

- If a future Bant lore-deepening packet is needed, create it under the next open VM ID and keep it source-fetch/direct-quote scoped.
- Keep using VM-169/VM-172/VM-175 plus this VM-194 handoff as Bant onboarding quality references for future shards.
- Consider a separate shared Commander Compass normalization card if newer raw packet shapes should expose preview candidates uniformly.

## Next Suggested Agent

Documentation Steward or Test Strategist, only if more shard parity cards need cross-checking before commit.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-194-bant-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-29-2206-codex-vm168-bant-downstream-lore-reconciliation.md`
- `docs/handoffs/2026-05-30-0926-codex-vm172-bant-post-cleanup-source-path-reconciliation.md`
- `docs/handoffs/2026-05-30-1746-codex-vm175-bant-esper-dossier-recommendation-parity-audit.md`

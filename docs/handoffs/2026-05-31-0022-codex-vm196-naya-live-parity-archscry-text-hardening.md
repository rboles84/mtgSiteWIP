# VM-196 Naya Live Parity And Archscry Text Hardening Handoff

## Agent Name

Codex

## Task Requested

Implement the Naya live UX parity repair requested as VM-192. Pre-flight showed VM-191 and VM-192 were already occupied by Jund, VM-193 by Grixis, VM-194 by Bant, and VM-195 remained in progress for Esper, so this Naya-only work was completed as VM-196.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-188-naya-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-191-jund-archscry-placement-surface-completeness.md`
- `docs/kanban/done/VM-192-jund-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-193-grixis-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-194-bant-live-parity-archscry-text-hardening.md`
- `docs/kanban/in-progress/VM-195-esper-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-30-2212-codex-vm188-naya-controlled-runtime-promotion.md`
- `docs/handoffs/2026-05-30-2358-codex-vm192-jund-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0006-codex-vm193-grixis-live-parity-archscry-text-hardening.md`
- `docs/handoffs/2026-05-31-0019-codex-vm194-bant-live-parity-text-hardening.md`
- `data/raw-factions/naya/naya.profile.json`
- `data/raw-factions/naya/naya.claims.json`
- `data/identity-layers.json`
- `data/factions.json`
- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/maze-handoff.js`
- `assets/js/quick-reading-tests.js`
- `research/build-faction-artifacts.mjs`
- `research/archscry-dossier-followup-tests.js`
- `research/presentation-snapshot-tests.js`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`

## Files Changed

- `assets/js/commander-dossier.js`
- `assets/js/archscry-presentation.js`
- `assets/js/maze-handoff.js`
- `assets/js/quick-reading-tests.js`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/build-faction-artifacts.mjs`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-196-naya-live-parity-archscry-text-hardening.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-0022-codex-vm196-naya-live-parity-archscry-text-hardening.md`

## What Changed

- Added Naya-specific Commander dossier guidance for abundance, living-world belonging, creature-forward scale, ramp, protected boards, instinctive care, and support-texture tokens/counters.
- Added `NAYA` Archscry presentation copy covering table role, opponent read, emotional pressure, lore role, mechanics-as-support texture, thesis, close reason, fork question, direction, and self-check.
- Added Naya starter-card groups, deck links, and display-level support-only Commander Compass curation in `data/identity-layers.json`.
- Adjusted the faction builder so Naya can preserve display-level Commander Compass curation while the VM-184 raw packet remains intentionally thin.
- Preserved Naya Maze/package query identity as `rgw` for exact Commander searches and `id<=rgw` support searches without adding color-code aliases, routes, or generated labels.
- Added regressions for Naya visible-text leakage, starter tags, local Scryfall validation, support/precon boundaries, Cabaretti comparator framing, and exact Commander query shape.
- Rebuilt approved generated artifacts through `npm.cmd run build:factions`.
- Closed VM-196 on the board and handoff index.

## Why It Changed

After VM-188 promotion, Naya lacked mature live support/display overrides and fell through generic dossier copy. The visible Start Here text used Jund/Orzhov-style fallback language such as sacrifice, drain, attrition, and appetite. VM-196 brings Naya to the live UX parity expected of mature expressions without expanding canon beyond VM-181/VM-184.

## Decisions Made

- Used VM-196 because VM-191 and VM-192 were already Jund, VM-193 was Grixis, VM-194 was Bant, and VM-195 was already in progress for Esper.
- Kept `data/raw-factions/naya/`, VM-181 research packet files, and VM-182/VM-183 architecture docs unchanged.
- Treated Commander rows and local Scryfall records as support/display curation only, not as canon evidence.
- Required Commander-facing Naya recommendations to validate as exact `id=rgw`; support/starter cards may validate as `id<=rgw`.
- Omitted `Tifa, Lockhart of AVALANCHE` from Naya Commander-facing curation because it does not resolve in committed local Scryfall.
- Framed `Cabaretti Cacophony` only as same-color support/style comparator, never as Naya canon, Alara canon, or a Naya lore source.

## Risks / Uncertainties

- The worktree remains very dirty with concurrent shard work, including unrelated Bant/Esper/Grixis/Jund files and untracked research/card history. VM-196 only claims the files listed above.
- Generated artifacts changed through the approved builder; review should focus on Naya semantic additions and avoid attributing unrelated dirty-worktree changes to this card.
- Query metadata can still contain `rgw` where it is needed for Scryfall/Archidekt search construction; it must remain absent as a public expression key, alias, route, fixture key, or generated label.

## Tests Run

- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/maze-handoff.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/build-faction-artifacts.mjs`
- `node --check research/archscry-dossier-followup-tests.js`
- `npm.cmd run build:factions`
- `node assets/js/quick-reading-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node research/presentation-snapshot-tests.js`
- `npm.cmd test`
- Naya generated text leak scan: 0 hits for the VM-196 blocked fallback phrases.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` passed with existing LF-to-CRLF working-copy warnings.

## Not Touched

- `data/raw-factions/naya/`
- `docs/research/naya/`
- `docs/architecture/colors/naya/`
- Home preview membership
- Route maps, route CSS, and standalone `/naya/` or `/rgw/` routes
- Supabase deployment/config/function code beyond regenerated context output
- Jund raw files, docs, cards, and handoffs
- Grixis raw files, docs, cards, and handoffs
- Bant and Esper card scope except preserving board/index truth

## Follow-Up Recommendations

- Manually smoke test the Naya Archscry result and Commander dossier in browser once the concurrent Esper card settles.
- Plan the next Naya lore deepening packet separately for places, figures, culture, Progenitus/Gahiji/Mayael, mechanics/card facts, and post-Alara continuity.
- Keep future shard/live parity cards using exact-color Commander validation for commander-facing recommendations and subset validation only for support cards.

## Next Suggested Agent

Manual QA / Product Reviewer, then Lore Packet Planner for the separate Naya deepening packet.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-196-naya-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-188-naya-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-185-naya-raw-packet-review-gate.md`
- `docs/kanban/done/VM-181-naya-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-191-jund-archscry-placement-surface-completeness.md`
- `docs/kanban/done/VM-192-jund-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-193-grixis-live-parity-archscry-text-hardening.md`
- `docs/kanban/done/VM-194-bant-live-parity-archscry-text-hardening.md`
- `docs/kanban/in-progress/VM-195-esper-live-parity-archscry-text-hardening.md`

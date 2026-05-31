# VM-183 Naya Docs Parity Fill Handoff

## Agent Name

Codex

## Task Requested

Implement VM-183 as a docs-only parity fill for Naya architecture after VM-182, adding practical Bant/Esper-style parity sections while preserving VM-181 as the evidence floor and keeping Naya non-live.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1817-codex-vm181-naya-source-packet.md`
- `docs/handoffs/2026-05-30-1828-codex-vm182-naya-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-1826-codex-vm178-jund-docs-parity-fill.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-181-naya-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-182-naya-identity-metaphysics.md`
- `docs/research/naya/*.md`
- `docs/architecture/colors/naya/identity.md`
- `docs/architecture/colors/naya/metaphysics.md`
- `docs/architecture/colors/jund/identity.md`
- `docs/architecture/colors/jund/metaphysics.md`

## Files Changed

- `docs/architecture/colors/naya/identity.md`
- `docs/architecture/colors/naya/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-183-naya-docs-parity-fill.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1848-codex-vm183-naya-docs-parity-fill.md`

## What Changed

- Added Naya-side pair-overlap boundaries for Selesnya, Gruul, and Boros.
- Added Naya-side shard separators for Bant, Esper, Grixis, Jund, Abzan, and Temur.
- Extended `System Mapping (Docs-Only)` with Commander expression, primary tension, and main false positives.
- Expanded `Non-Runtime Identity Signals` with Commander/operator anchors, Placement Guidance, inhibitors, and Non-runtime Search Seed Shapes.
- Added explicit metaphysics primary tension: abundance and belonging can drift into overgrowth, over-identification with scale, or mistaking instinct for wisdom.
- Closed VM-183 on the board and moved its card to done.

## Why It Changed

VM-182 created the base Naya identity/metaphysics layer. VM-183 brings those docs to the current practical parity standard without promoting Naya into runtime, generated data, schemas, routes, Maze, Home preview, Supabase, placement model files, or source-packet changes.

## Decisions Made

- Kept all comparator language from Naya's side only; other identities are not positively reauthored here.
- Treated Cabaretti only as a false-positive/style drift comparator, not a Naya equivalent.
- Kept Commander/operator rows support-only and limited search examples to documentation-only shape examples.
- Used VM-181 row references for every substantial added claim and left unresolved Naya lore under `Manual fill required`.

## Risks / Uncertainties

- Detailed Naya geography, named figures, religion, social structure, creature-culture hierarchy, Progenitus theology, Gahiji origin, Cylian/Nacatl polity claims, power-5 totalization, and post-Phyrexian outcomes remain unresolved unless future work adds direct evidence.
- Jund remains docs-track comparator material here and should not be treated as runtime precedent.
- VM-184/raw packet work should validate against VM-181 row IDs directly, not against these architecture paragraphs.

## Tests Run

- Verified `docs/architecture/colors/naya/identity.md` exists.
- Verified `docs/architecture/colors/naya/metaphysics.md` exists.
- Verified `data/raw-factions/naya` remains absent.
- Ran required-anchor scan for parity headings, Naya identifiers, Alara/Green references, Vox Mana synthesis, and manual-fill references.
- Ran comparator scan for Selesnya, Gruul, Boros, Bant, Esper, Grixis, Jund, Abzan, Temur, Cabaretti, generic big creatures, and generic tokens.
- Validated all cited `NAYA-EVID-###`, `NAYA-MF-###`, `NAY-SRC-###`, and `NAY-CMD-###` IDs against VM-181 packet files; all cited IDs exist.
- Ran search-shape scan confirming exact Commander examples use `id=rgw` and support/deck texture examples use `id<=rgw` in documentation-only context.
- Ran hygiene scans for mojibake/non-ASCII and trailing whitespace on the changed Naya docs and VM-183 card.

## Not Touched

- Naya raw JSON
- Runtime code
- Generated artifacts
- Schemas
- Maze files
- Route/navigation files
- Home preview membership
- Supabase code
- Placement model files
- Builder wiring
- VM-181 packet files

## Follow-Up Recommendations

- Next reviewed card should be VM-184 for a Naya authored-but-not-live raw packet only after VM-183 human review.
- VM-184 should require every raw claim to trace directly to VM-181 evidence/source rows, not architecture prose.
- Keep color-direction codes metadata-only unless a later controlled promotion card explicitly changes runtime state.

## Next Suggested Agent

JSON Cartographer for VM-184 raw packet planning, after review.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-183-naya-docs-parity-fill.md`
- `docs/research/naya/naya-evidence-ledger.md`
- `docs/architecture/colors/naya/identity.md`
- `docs/architecture/colors/naya/metaphysics.md`

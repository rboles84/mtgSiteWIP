# VM-180 Jund Raw Packet Review Gate Handoff

## Agent Name

Codex

## Task Requested

Implement VM-180 as a review gate for the VM-179 Jund authored-but-not-live raw packet. Validate the raw JSON packet, source-role classifications, evidence binding, non-live boundary, and no-edit requirement without repairing the packet or promoting Jund.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1852-codex-vm179-jund-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1826-codex-vm178-jund-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-1812-codex-vm177-jund-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-1754-codex-vm176-jund-source-packet.md`
- `docs/handoffs/2026-05-30-1119-codex-vm167-grixis-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-179-jund-raw-faction-source-packet.md`
- `docs/kanban/done/VM-167-grixis-raw-packet-review-gate.md`
- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.profile.json`
- `data/raw-factions/jund/jund.placement.json`
- `data/raw-factions/jund/jund.changelog.json`
- Bant, Esper, and Grixis raw-packet files for top-level key parity.

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-180-jund-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-1922-codex-vm180-jund-raw-packet-review-gate.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Created and completed the VM-180 Kanban review card.
- Reviewed the five VM-179 Jund raw JSON files without editing them.
- Marked the packet as `review-approved-for-future-promotion-planning`.
- Recorded that the result is a review-only approval for later planning, not authorization to change runtime, placement, generated data, routes, fixtures, Home preview, Maze, or Supabase behavior.
- Updated the handoff index.

## Why It Changed

VM-180 is the review airlock between the authored-but-not-live VM-179 source packet and any future Jund runtime planning. It confirms that the packet is structurally clean enough to plan from later while preserving the non-live boundary.

## Decisions Made

- Treat VM-179 as approved for future promotion planning.
- Do not treat VM-180 approval as permission to promote `JUND`.
- Keep `BRG` as metadata-only language.
- Keep VM-177/VM-178 architecture docs as shaping-only inputs, not raw-claim evidence.
- Keep Commander/operator, Scryfall, color-philosophy, comparator, seed, and generated HTML sources out of `claim-bearing` classification.
- Require any future repair or runtime work to use a separate explicit card.

## Risks / Uncertainties

- The repository remains dirty from prior shard work and parallel Naya work. VM-180 used scoped status/diff checks rather than assuming the whole worktree was clean.
- `data/raw-factions/jund/` is part of the current dirty worktree. VM-180 used a before/after content hash to prove the raw packet was not edited during review.
- VM-180 does not validate future promotion behavior, generated artifacts, placement scoring, Home preview, routes, or runtime integration.

## Tests Run

- AGENTS pre-flight review of handoff index, current board, VM-179 handoff/card, VM-176 through VM-178 Jund handoffs, and Grixis VM-167 review precedent.
- Node aggregate hash check for `data/raw-factions/jund/` before review:
  - 5 files - `f1be4f81c150023bcf92a41b861a5784b1d8f962ba147dc31486131f1e9ef8d4`
- Node VM-180 raw packet validation:
  - exactly five expected JSON files exist;
  - all five parse;
  - top-level keys match accepted Bant/Esper/Grixis raw packet shapes;
  - every source has `source_role`;
  - source-role values are only `claim-bearing`, `shaping-only`, or `support-only`;
  - architecture docs, Commander/operator, Scryfall, color-philosophy, comparator, seed, manual-fill, and generated-HTML sources are not `claim-bearing`;
  - exactly 10 raw claims exist;
  - raw claim IDs are `jund_claim_0001` through `jund_claim_0010`;
  - all raw-claim source IDs resolve;
  - raw claims reference only `claim-bearing` sources;
  - raw claims reference only `JUND-EVID-001` through `JUND-EVID-010`, `JUND-EVID-012`, and `JUND-EVID-013`;
  - profile and placement claim references are subsets of the 10 raw claim IDs;
  - `placement_axes` is `[]`.
- Scan of `jund.claims.json` for forbidden support/manual row IDs; no hits.
- Guard scan of `data/raw-factions/jund/` for live-status, runtime, generated-data, Home preview, routing, fixture, and app-integration fields; no hits.
- Node aggregate hash check for `data/raw-factions/jund/` after review; hash remained unchanged.
- Scoped diff/status checks confirming VM-180 changed only the review card, board, handoff, and handoff index.
- `git diff --check` on VM-180 scoped files.
- ASCII and trailing-whitespace scans on VM-180 authored files.

Skipped:

- `npm test`, because VM-180 is review-only and did not touch runtime contracts.
- `npm run build:factions`, because Jund remains non-live and VM-180 must not build generated artifacts.

## Not Touched

- `data/raw-factions/jund/`
- `docs/research/jund/`
- `docs/architecture/colors/jund/`
- Naya paths
- Builders
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- Generated artifacts
- Placement fixtures
- Route maps
- Browser bundles
- Home files
- Maze files
- Supabase files
- route CSS/JS
- runtime code
- tests

## Follow-Up Recommendations

- Plan any future Jund runtime work as a separate controlled promotion card after human review.
- That future card should explicitly decide the expected live count delta, generated artifact rebuilds, placement test scope, and whether Home preview remains unchanged.
- Keep VM-180's approval phrase narrow: it is approval for future planning only, not an implementation authorization.

## Next Suggested Agent

Planning Architect for a future controlled Jund promotion plan, if human review approves moving past this gate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-180-jund-raw-packet-review-gate.md`
- `docs/kanban/done/VM-179-jund-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1852-codex-vm179-jund-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1826-codex-vm178-jund-docs-parity-fill.md`
- `docs/handoffs/2026-05-30-1812-codex-vm177-jund-identity-metaphysics.md`
- `docs/handoffs/2026-05-30-1754-codex-vm176-jund-source-packet.md`
- `data/raw-factions/jund/jund.claims.json`
- `data/raw-factions/jund/jund.sources.json`
- `data/raw-factions/jund/jund.placement.json`

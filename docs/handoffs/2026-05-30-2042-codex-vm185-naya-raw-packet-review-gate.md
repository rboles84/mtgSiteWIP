# VM-185 Naya Raw Packet Review Gate Handoff

## Agent Name

Codex

## Task Requested

Implement VM-185 as a review gate for the VM-184 Naya authored-but-not-live raw packet. Validate the raw JSON packet, exact claim-to-evidence mapping, source-role classifications, non-live boundary, and no-edit requirement without repairing the packet or promoting Naya.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-30-1922-codex-vm184-naya-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1922-codex-vm180-jund-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-1119-codex-vm167-grixis-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-184-naya-raw-faction-source-packet.md`
- `docs/kanban/done/VM-180-jund-raw-packet-review-gate.md`
- `docs/kanban/done/VM-167-grixis-raw-packet-review-gate.md`
- `docs/research/naya/naya-evidence-ledger.md`
- `docs/architecture/colors/naya/identity.md`
- `docs/architecture/colors/naya/metaphysics.md`
- `data/raw-factions/naya/naya.sources.json`
- `data/raw-factions/naya/naya.claims.json`
- `data/raw-factions/naya/naya.profile.json`
- `data/raw-factions/naya/naya.placement.json`
- `data/raw-factions/naya/naya.changelog.json`
- `data/raw-factions/jund/*.json` for top-level key parity
- `research/build-faction-artifacts.mjs`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/done/VM-185-naya-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-30-2042-codex-vm185-naya-raw-packet-review-gate.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Created and completed the VM-185 Kanban review card.
- Reviewed the five VM-184 Naya raw JSON files without editing them.
- Marked the packet as `review-approved-for-future-promotion-planning`.
- Recorded that the result is a review-only approval for later planning, not authorization to change runtime, placement, generated data, routes, fixtures, Home preview, Maze, or Supabase behavior.
- Updated the handoff index.

## Why It Changed

VM-185 is the review airlock between the authored-but-not-live VM-184 source packet and any future Naya runtime planning. It confirms that the packet is structurally clean enough to plan from later while preserving the non-live boundary.

## Decisions Made

- Treat VM-184 as approved for future promotion planning.
- Do not treat VM-185 approval as permission to promote `NAYA`.
- Keep `RGW`, `GRW`, and `WRG` as metadata/query/validation language only.
- Keep VM-182/VM-183 architecture docs as shaping-only inputs, not raw-claim evidence.
- Keep Commander/operator, manual-fill, comparator, seed, dossier, architecture, parity, and search-seed material out of raw claims.
- Require any future repair or runtime work to use a separate explicit card.

## Risks / Uncertainties

- The repository remains dirty from prior shard and runtime work. VM-185 used scoped status/diff checks and raw-packet hashes rather than assuming the whole worktree was clean.
- `data/raw-factions/naya/` is untracked in the current worktree, so VM-185 used before/after content hashes to prove the raw packet was not edited during review.
- `research/build-faction-artifacts.mjs` has pre-existing tracked changes. VM-185 confirmed it contains no Naya, RGW, GRW, or WRG references and did not edit it.
- VM-185 does not validate future promotion behavior, generated artifacts, placement scoring, Home preview, routes, or runtime integration.
- A broad wording scan found `route slugs` and `generated labels` only in the explicit negative boundary note that color-code strings do not become those surfaces; no affirmative leakage was found.

## Tests Run

- AGENTS pre-flight review of the handoff index, current board, VM-184 handoff/card, VM-180 Jund review gate, and VM-167 Grixis review precedent.
- `rg -n "VM-185|Naya Raw Packet Review Gate" docs/kanban docs/handoffs` confirmed VM-185 was not already taken.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` confirmed a dirty worktree with prior unrelated changes.
- `Get-FileHash data/raw-factions/naya/*.json -Algorithm SHA256` before review:
  - `naya.changelog.json` - `23E2B9168298395226EA6B6C3FDA45F0023410A75677D3AA45AC682585C74A13`
  - `naya.claims.json` - `973331C089D2777F7208AF5AA919DB1297FCCE3183711B20D38A259810A2A802`
  - `naya.placement.json` - `AEACA4383E1A22F543A6D51485801CF7639D1620CF3DEC2C8B3616C1A9E22F89`
  - `naya.profile.json` - `91A97FCB22D0605EC7DA2BD9318017999D48A9B149222C6ECF4B8AD1BC7CDC66`
  - `naya.sources.json` - `A3ED04E2A25A2D78E33239B390AFA9600CB9870B57D49829A6801FEB307CF89F`
- PowerShell VM-185 raw packet validation:
  - exactly five expected JSON files exist;
  - all five parse;
  - top-level keys match the accepted Jund raw packet shapes;
  - every source has a `claim-bearing`, `shaping-only`, or `support-only` role;
  - exactly 10 raw claims exist;
  - raw claim IDs are `naya_claim_0001` through `naya_claim_0010`;
  - exact claim-to-evidence mapping matches VM-184;
  - all allowed evidence rows exist in `docs/research/naya/naya-evidence-ledger.md`;
  - all raw-claim source IDs resolve;
  - raw claims reference only `claim-bearing` sources;
  - disallowed evidence rows, manual-fill rows, Commander rows, seed terms, dossier terms, architecture terms, parity terms, and search-seed terms do not appear in `naya.claims.json`;
  - profile and placement claim references are subsets of the 10 raw claim IDs;
  - `placement_axes` is `[]`.
- Guard scan of `data/raw-factions/naya/` for active/live/status/preview/placement eligibility fields, runtime-ready wording, alias leakage, route-slug leakage, and generated-label leakage.
- `rg -n "generated label|route slug" data/raw-factions/naya` found only the negative boundary note in `naya.claims.json`.
- `Get-FileHash research/build-faction-artifacts.mjs -Algorithm SHA256` before review: `1316CA60B5D00217D233E8118F82C2B10B8203FDAE6A8A09B54561172146975A`.
- `Get-FileHash data/raw-factions/naya/*.json -Algorithm SHA256` after review matched the before-review hashes, confirming no packet repair edits were made.
- `Get-FileHash research/build-faction-artifacts.mjs -Algorithm SHA256` after review remained `1316CA60B5D00217D233E8118F82C2B10B8203FDAE6A8A09B54561172146975A`.
- Scoped status check showed only VM-185 bookkeeping changes plus pre-existing dirty entries for `data/raw-factions/naya/` and `research/build-faction-artifacts.mjs`.
- `git diff --check` on VM-185 scoped board, card, handoff, and index paths passed with only existing CRLF warnings for tracked docs.
- ASCII and trailing-whitespace scans passed on VM-185 authored files.
- Read-only ASCII and trailing-whitespace scans passed on the five Naya raw JSON files.

Skipped:

- `npm test`, because VM-185 is review-only and did not touch runtime contracts.
- `npm run build:factions`, because Naya remains non-live and VM-185 must not build generated artifacts.

## Not Touched

- `data/raw-factions/naya/`
- `docs/research/naya/`
- `docs/architecture/colors/naya/`
- `research/build-faction-artifacts.mjs`
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

- Plan any future Naya runtime work as a separate controlled promotion card after human review.
- That future card should compute the current live baseline during pre-flight, assert exactly +1 live expression, +1 placement key, and +1 eligible snippet source from that baseline, and preserve Home preview membership unless separately approved.
- Keep VM-185's approval phrase narrow: it is approval for future planning only, not implementation authorization.

## Next Suggested Agent

Planning Architect for a future controlled Naya promotion plan, if human review approves moving past this gate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-185-naya-raw-packet-review-gate.md`
- `docs/kanban/done/VM-184-naya-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-30-1922-codex-vm184-naya-raw-faction-source-packet.md`
- `docs/kanban/done/VM-181-naya-source-packet-evidence-ledger.md`
- `docs/kanban/done/VM-182-naya-identity-metaphysics.md`
- `docs/kanban/done/VM-183-naya-docs-parity-fill.md`
- `data/raw-factions/naya/naya.claims.json`
- `data/raw-factions/naya/naya.sources.json`
- `data/raw-factions/naya/naya.placement.json`

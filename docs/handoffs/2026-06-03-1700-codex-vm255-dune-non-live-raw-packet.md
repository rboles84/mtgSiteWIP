# Agent Handoff - VM-255 Dune Non-Live Raw Packet

- Agent name: Codex
- Task requested: Implement VM-255 by creating the Dune non-live raw packet from the approved VM-252 evidence floor, preserve non-live `DUNE`, keep `BRGW` plus all same-color permutations metadata/query-only, and stop before review, runtime, or generated work.
- Related Kanban card, docs, or plans: `docs/kanban/done/VM-255-dune-non-live-raw-packet.md`, `docs/research/dune/dune-source-ledger.md`, `docs/research/dune/dune-evidence-ledger.md`, `docs/research/dune/dune-manual-fill.md`, `docs/architecture/colors/dune/identity.md`, `docs/architecture/colors/dune/metaphysics.md`, `data/raw-factions/yore/`, `data/raw-factions/glint/`

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2343-codex-vm240-269-four-color-lane-reservation-only.md`
- `docs/handoffs/2026-06-03-0655-codex-vm252-dune-source-packet.md`
- `docs/handoffs/2026-06-03-0736-codex-vm253-dune-identity-metaphysics.md`
- `docs/handoffs/2026-06-03-1226-codex-vm254-dune-docs-parity-fill.md`
- `docs/handoffs/2026-06-02-1622-codex-vm243-yore-non-live-raw-packet.md`
- `docs/handoffs/2026-06-02-2226-codex-vm249-glint-non-live-raw-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-255-dune-non-live-raw-packet.md`
- `docs/kanban/backlog/VM-256-dune-review-gate.md`
- `docs/kanban/backlog/VM-257-dune-controlled-runtime-promotion.md`
- `docs/research/dune/dune-source-ledger.md`
- `docs/research/dune/dune-evidence-ledger.md`
- `docs/research/dune/dune-manual-fill.md`
- `docs/research/dune/dune-research-dossier.md`
- `docs/architecture/colors/dune/identity.md`
- `docs/architecture/colors/dune/metaphysics.md`
- `data/raw-factions/yore/yore.sources.json`
- `data/raw-factions/yore/yore.claims.json`
- `data/raw-factions/yore/yore.profile.json`
- `data/raw-factions/yore/yore.placement.json`
- `data/raw-factions/yore/yore.changelog.json`
- `data/raw-factions/glint/glint.sources.json`
- `data/raw-factions/glint/glint.claims.json`
- `data/raw-factions/glint/glint.profile.json`
- `data/raw-factions/glint/glint.placement.json`
- `data/raw-factions/glint/glint.changelog.json`

## Files Changed

- `data/raw-factions/dune/dune.sources.json`
- `data/raw-factions/dune/dune.claims.json`
- `data/raw-factions/dune/dune.profile.json`
- `data/raw-factions/dune/dune.placement.json`
- `data/raw-factions/dune/dune.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-255-dune-non-live-raw-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-1700-codex-vm255-dune-non-live-raw-packet.md`

## What Changed

- Authored the five-file Dune raw packet under `data/raw-factions/dune/` using the Yore VM-243 and Glint VM-249 contract as the structural precedent.
- Added exactly five conservative Dune raw claims and limited raw-claim proof to `DUNE-EVID-001`, `DUNE-EVID-002`, `DUNE-EVID-003`, `DUNE-EVID-004`, `DUNE-EVID-007`, and `DUNE-EVID-010`.
- Classified raw sources into claim-bearing, support-only, shaping-only, and discovery-only roles, including explicit rejection of architecture docs, Commander and precon support rows, manual-fill rows, and the discovery HTML draft as raw-claim proof.
- Preserved `DUNE` as future/planned only, preserved `BRGW` plus all 23 same-color permutations as metadata/query-only, and kept `placement_axes` empty with review-gated placement status.
- Added explicit naming guardrails near each `Dune / Aggression` packet surface so `Aggression` stays paired-framing support text only and does not drift into public alias space.
- Closed out VM-255 bookkeeping by moving the card to Done, updating the board, and indexing this handoff.

## Why It Changed

- VM-255 is the required raw-packet step between the completed Dune docs work and the later VM-256 review gate.
- The packet needed to be grounded in current repo truth rather than inferred from architecture prose alone, so the implementation follows the established Yore/Glint four-color raw-packet shape and preserves the VM-252 evidence boundary.
- The lane remains evidence-thin in several areas, so the implementation deliberately stays conservative and keeps support, synthesis, and discovery material out of raw-claim authority.

## Decisions Made

- Mirrored the Yore VM-243 and Glint VM-249 five-file family at the top level instead of inventing a Dune-specific schema variant.
- Used exactly five raw claims: lifecycle boundary, naming guardrail, missing-color identity, Dune-Brood anchor boundary, and bounded missing-Blue pressure framing.
- Bound each raw claim to a fixed evidence-row matrix and kept `DUNE-EVID-010` limited to lifecycle, naming, and public-interface boundary support.
- Kept Saskia, Open Hostility, partner/decklist texture, and precon data support-only in profile and placement surfaces rather than elevating them into raw claims.
- Treated the VM-252 done card as claim-bearing lifecycle/scope support because that is the existing Yore/Glint precedent, but limited it to process-boundary use only.
- Carried the `DUNE-MF-011` / `DUNE-MF-012` packet drift forward as unresolved packet maintenance rather than repairing `docs/research/dune/**` inside VM-255.

## Risks / Uncertainties

- Direct official Dune-Brood card facts remain manual-fill territory.
- Saskia lore and Commander 2016 product/article grounding remain support-only.
- Four-color naming authority remains bounded by the VM-252 guardrail rather than a deeper naming dossier.
- Separator prose and placement guidance remain shaping-only until later review.
- The worktree contains unrelated dirty runtime/data/generated changes that were preserved and not normalized.

## Tests Run

- AGENTS pre-flight review against handoff index, the four-color reservation handoff, VM-252/VM-253/VM-254 Dune handoffs, VM-243/VM-249 raw packet precedents, board, VM-255 card, Dune packet, Dune docs, and Yore/Glint raw packet files.
- Exact five-file set check under `data/raw-factions/dune/`.
- JSON parse check for all five Dune raw files.
- Top-level JSON shape comparison against the Yore VM-243 and Glint VM-249 raw packet contract.
- Schema/version/faction/date field validation across all five files.
- Claim ID/count validation for `dune_claim_0001` through `dune_claim_0005`.
- Claim-to-evidence mapping validation for the required five-claim matrix.
- Evidence-row resolver against `docs/research/dune/dune-evidence-ledger.md`.
- Allowed-evidence-row validation limited to `DUNE-EVID-001`, `DUNE-EVID-002`, `DUNE-EVID-003`, `DUNE-EVID-004`, `DUNE-EVID-007`, and `DUNE-EVID-010`.
- `DUNE-EVID-010` usage validation limited to lifecycle and naming claims only.
- Source-role resolver proving all claim source IDs point to `claim-bearing` source records.
- Support/manual/synthesis/discovery/architecture exclusion scan for raw claims.
- Non-live/review-gated placement flag validation.
- BRGW permutation metadata-query-only list validation for all 24 uppercase forms plus lowercase one-to-one derivations.
- Dune research-packet hash validation showing `docs/research/dune/` remained unchanged, including `dune-brood-research-packet.html`.
- Scoped overclaim scan for official-name/faction drift, Nephilim-as-institution drift, Commander-as-lore drift, public alias leakage, and promotion-ready language.
- Scoped trailing-whitespace checks for new Dune raw JSON and bookkeeping files.
- Scoped `git diff --check` on tracked VM-255 bookkeeping files.

## Not Touched

- `docs/research/dune/`
- `docs/architecture/colors/dune/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime files
- Generated artifacts
- Maze files
- Route CSS/JS
- Home preview
- Supabase files
- VM-256 and VM-257 card files
- Unrelated dirty worktree changes

## Follow-Up Recommendations

- Run VM-256 as a separate review-gate pass before any promotion planning.
- Keep `DUNE` non-live and `BRGW`/permutations metadata-query-only until VM-256 approval and a later VM-257 promotion pass.
- Do not convert Saskia, Open Hostility, Commander/precon texture, architecture prose, or the discovery HTML draft into raw claims without a new approved evidence pass.
- If later public copy needs exact Dune-Brood or Commander facts, resolve the remaining manual-fill gaps before promotion.

## Next Suggested Agent

- JSON Cartographer or Test Strategist for VM-256 Dune review gate.

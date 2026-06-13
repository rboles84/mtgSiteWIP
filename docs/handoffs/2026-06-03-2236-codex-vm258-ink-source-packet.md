# 2026-06-03 22:36 - Codex - VM-258 Ink Source Packet And Evidence Ledger

## Agent Name

Codex acting as Planning Architect for scope control, with Documentation Steward / Kanban Steward execution support.

## Task Requested

Implement VM-258 only: normalize the Ink source packet and evidence ledger under `docs/research/ink/` without starting VM-259 or later cards, and double-check the Kanban board against current repo truth before proceeding.

## Pre-Flight Summary

Recent related work:

- VM-240 through VM-245 established the first completed four-color lane through Yore source, docs, raw, review, and promotion.
- VM-246 through VM-251 established the current Glint packet/docs/raw/review/promotion precedent, including discovery-draft quarantine.
- VM-252 through VM-257 established the Dune packet/docs/raw/review/promotion precedent, and the board now shows Dune already completed through VM-257.
- VM-276 later reinforced the Glint rule that source enrichment must preserve claim-bearing floors and quarantine support/discovery materials rather than laundering them into authority.
- VM-240 through VM-269 remain the reserved four-color onboarding lanes.

Current known risks:

- Four-color canon remains thinner than the shard and wedge lanes.
- `docs/research/ink/` already contained three unmanaged, polished drafts with external citations, deck rankings, and strategy prose, creating a high source-laundering risk.
- The user-provided plan snapshot was already stale on Dune completion, so VM-258 needed to follow current board truth rather than restating outdated Dune status.
- The worktree is broadly dirty across runtime, data, docs, and handoff surfaces, so shared bookkeeping files needed to preserve existing changes.

Relevant decisions already made:

- VM-258 is source-packet-only.
- `INK` is the future public key, while `RGWU`, `WURG`, and all same-color permutations remain metadata/query-only.
- `Ink` is Vox Mana's Nephilim-derived label and `Altruism` is the Commander 2016 theme alias; neither should be presented as an official exclusive MTG name for RGWU.
- Unmanaged Ink drafts may be classified and preserved, but not promoted into approved source authority.
- The `Stalwart Unity` Commander support record must be verified locally by content match, not trusted by fixed row number.

Files recently changed:

- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Yore VM-240 through VM-245 done cards and handoffs
- Glint VM-246 through VM-251 done cards/handoffs plus VM-276 reconciliation
- Dune VM-252 through VM-257 done cards and handoffs
- Existing unrelated docs, data, runtime, and image changes in the dirty worktree

What should not be touched:

- `docs/research/canon/**`
- `docs/architecture/colors/ink/`
- `data/raw-factions/ink/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze, route, Supabase, schema, and fixture files
- VM-259 through VM-263 implementation surfaces
- Yore, Glint, Dune, and Witch files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2343-codex-vm240-269-four-color-lane-reservation-only.md`
- `docs/handoffs/2026-06-02-1135-codex-vm240-yore-source-packet.md`
- `docs/handoffs/2026-06-02-1825-codex-vm246-glint-source-packet.md`
- `docs/handoffs/2026-06-03-0655-codex-vm252-dune-source-packet.md`
- `docs/handoffs/2026-06-03-2059-codex-vm276-glint-source-enrichment-reconciliation.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-258-ink-source-packet-and-evidence-ledger.md`
- `docs/kanban/done/VM-252-dune-source-packet-and-evidence-ledger.md`
- `docs/research/ink/ink-deep-research-report.md`
- `docs/research/ink/ink-treader-research-packet.html`
- `docs/research/ink/ink_altruism_rgwu_research_report.md`
- `docs/research/canon/canon-inventory-four-color-reference-audit.md`
- `docs/research/canon/misc/Magic Four-Color Identity Dossier.md`
- `docs/research/canon/misc/commander_deck_list.txt`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precon-catalog.json`
- `docs/research/dune/README.md`
- `docs/research/dune/dune-source-ledger.md`
- `docs/research/dune/dune-evidence-ledger.md`
- `docs/research/dune/dune-reliability-audit.md`
- `docs/research/dune/dune-manual-fill.md`
- `docs/research/dune/dune-research-dossier.md`
- `docs/research/dune/dune-lore-source-packet.md`
- Pasted roadmap attachment
- Starting `git status --short`

## Files Changed

- `docs/research/ink/README.md`
- `docs/research/ink/ink-source-ledger.md`
- `docs/research/ink/ink-evidence-ledger.md`
- `docs/research/ink/ink-reliability-audit.md`
- `docs/research/ink/ink-manual-fill.md`
- `docs/research/ink/ink-research-dossier.md`
- `docs/research/ink/ink-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-258-ink-source-packet-and-evidence-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2236-codex-vm258-ink-source-packet.md`

## What Changed

- Created the VM-258 Ink source packet under `docs/research/ink/`.
- Added source-role classification for the repo-truth four-color audit, support-only dossier and Commander/precon rows, explicit absence of standalone shaping/synthesis authority, and discovery-only treatment for the three existing Ink drafts.
- Added an evidence ledger with Ink/RGWU scope boundaries, naming guardrails, missing-Black framing, Ink-Treader anchor boundaries, Kynaios / `Stalwart Unity` support texture, and discovery-draft quarantine rules.
- Added a reliability audit that records the three draft hashes and enumerates unsupported comparative, ranking, and commander-pool claims that later cards must not inherit without new evidence.
- Added manual-fill, dossier, and lore-source-packet docs for controlled downstream use.
- Moved VM-258 from Backlog to Done while leaving VM-259 through VM-263 in Backlog.
- Added this handoff and indexed it.

## Why It Changed

The user asked to double-check the Kanban board, then proceed with the Ink gold-standard onboarding plan while keeping the pass inside VM-258 only. This implementation creates the approved Ink packet foundation without moving into architecture, raw JSON, review, runtime, generated, or later Ink lane work.

## Decisions Made

- Followed current board truth instead of the older plan snapshot: Dune is already complete through VM-257 and did not need any story-number repair.
- Treated `docs/research/canon/canon-inventory-four-color-reference-audit.md` as the primary claim-bearing floor for VM-258.
- Treated `Magic Four-Color Identity Dossier.md`, `commander_deck_list.txt`, the content-matched `Stalwart Unity` JSONL record, and repo-local `Stalwart Unity` precon data as support-only references.
- Preserved all three existing Ink drafts in place and explicitly denied them `INK-SRC-###` and `INK-EVID-###` authority.
- Classified the discovery drafts as unsupported for rankings, commander-pool breadth, Omnath/Aragorn/Fourteenth Doctor floor claims, EDHREC totals, format/power claims, and naming-authority claims unless later cards re-source them.
- Kept `INK` non-live and kept `RGWU`, `WURG`, and all permutations metadata/query-only.
- Did not touch VM-259 through VM-263 card files beyond moving VM-258 bookkeeping to Done/board/index surfaces.

## Risks / Uncertainties

- Later cards still need direct official/card-source verification before raw packet or runtime work.
- The current packet intentionally avoids promoting later RGWU commanders beyond discovery status because the approved local floor does not yet support them.
- The worktree remains dirty with unrelated Yore, Glint, Dune, runtime, and documentation changes that VM-258 did not normalize.
- The three discovery drafts contain enough polished unsupported prose that future cards could accidentally over-trust them unless they keep using the explicit unsupported-claim audit.

## Tests Run

- `Get-Date -Format "yyyy-MM-dd-HHmm"`
- `Get-FileHash docs\research\ink\ink-deep-research-report.md, docs\research\ink\ink-treader-research-packet.html, docs\research\ink\ink_altruism_rgwu_research_report.md -Algorithm SHA256`
- Verified `docs/research/ink/` ends with the exact expected 10-file state: 7 approved packet files plus 3 preserved unmanaged inputs.
- Validated that `docs/architecture/colors/ink/` and `data/raw-factions/ink/` do not exist.
- Verified the `Stalwart Unity` / `Kynaios and Tiro of Meletis` support record locally by content match across:
  - `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
  - `docs/research/canon/misc/commander_deck_list.txt`
  - `data/precons/vox-mana-precons.source.json`
  - `data/precons/vox-mana-precon-catalog.json`
- Ran an Ink packet reference validation that source IDs, evidence IDs, manual-fill IDs, dossier/lore references, and the 24 RGWU metadata/query-only permutations resolve cleanly with no missing IDs or duplicate codes.
- Ran scoped discovery-draft overclaim scans for official-name, official-faction, Nephilim-as-institution, Commander-support-as-lore, discovery-draft-as-canon, and public RGWU/WURG alias risks.
- Ran scoped trailing-whitespace scans on the VM-258 research, Kanban, board, and handoff files.
- Ran scoped `git diff --check` on tracked VM-258 bookkeeping files.

Not run:

- `npm test`
- `npm run test:parser`
- Runtime/build suites, because VM-258 was docs/source-only and touched no runtime/generated files.

## Not Touched

- `docs/research/ink/ink-deep-research-report.md`
- `docs/research/ink/ink-treader-research-packet.html`
- `docs/research/ink/ink_altruism_rgwu_research_report.md`
- `docs/research/canon/**`
- `docs/architecture/colors/ink/`
- `data/raw-factions/ink/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze, route, Supabase, schema, and fixture files
- VM-259 through VM-263 files
- Yore, Glint, Dune, and Witch files

## Follow-Up Recommendations

- Start VM-259 as a separate prompt only after accepting VM-258.
- VM-259 should use the Ink packet as a guarded source floor and treat the unsupported-claim audit as a stop list rather than a source list.
- Preserve the naming distinction between Vox Mana's `INK` expression label and Commander 2016's `Altruism` theme alias.
- Keep `RGWU`, `WURG`, and all same-color permutations metadata/query-only through every later Ink card.

## Next Suggested Agent

Documentation Steward for VM-259 Ink identity and metaphysics docs.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-258-ink-source-packet-and-evidence-ledger.md`
- `docs/kanban/backlog/VM-259-ink-identity-and-metaphysics-docs.md`
- `docs/kanban/backlog/VM-260-ink-docs-parity-fill.md`
- `docs/kanban/backlog/VM-261-ink-non-live-raw-packet.md`
- `docs/kanban/backlog/VM-262-ink-review-gate.md`
- `docs/kanban/backlog/VM-263-ink-controlled-runtime-promotion.md`
- `docs/research/ink/README.md`
- `docs/research/ink/ink-source-ledger.md`
- `docs/research/ink/ink-evidence-ledger.md`
- `docs/research/ink/ink-reliability-audit.md`
- `docs/research/ink/ink-manual-fill.md`
- `docs/research/ink/ink-research-dossier.md`
- `docs/research/ink/ink-lore-source-packet.md`
- `docs/handoffs/2026-05-31-2343-codex-vm240-269-four-color-lane-reservation-only.md`

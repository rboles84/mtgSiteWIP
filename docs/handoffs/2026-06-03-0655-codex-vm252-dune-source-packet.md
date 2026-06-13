# 2026-06-03 06:55 - Codex - VM-252 Dune Source Packet And Evidence Ledger

## Agent Name

Codex acting as Planning Architect for scope control, with Documentation Steward / Kanban Steward execution support.

## Task Requested

Implement VM-252 only: normalize the Dune source packet and evidence ledger under `docs/research/dune/` without starting VM-253 or later cards.

## Pre-Flight Summary

Recent related work:

- VM-240 through VM-245 established the first completed four-color lane through Yore source, docs, raw, review, and promotion.
- VM-246 through VM-249 established the current Glint packet/docs/raw precedent, including discovery-draft quarantine.
- VM-240 through VM-269 remain the reserved four-color onboarding lanes.
- VM-272 preserved the current live baseline and Home preview boundary.

Current known risks:

- Four-color canon remains thinner than the shard and wedge lanes.
- `docs/research/dune/dune-brood-research-packet.html` already existed as an unmanaged, polished draft with many unsupported claims, creating a high source-laundering risk.
- Commander support sources use `WBRG` order while Vox Mana lane naming is `BRGW`.
- The worktree is broadly dirty across runtime, data, docs, and handoff surfaces, so shared bookkeeping files needed to preserve existing changes.

Relevant decisions already made:

- VM-252 is source-packet-only.
- `DUNE` is the future public key, while `BRGW`, `WBRG`, and all same-color permutations remain metadata/query-only.
- Nephilim must remain historical/card anchors rather than factions or institutions.
- Saskia, `Open Hostility`, Tana/Tymna, Ravos, and decklist texture are support-only unless later cards upgrade them with stronger source capture.
- The existing Dune HTML draft may be preserved and audited, but not promoted into approved evidence authority.

Files recently changed:

- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Yore VM-240 through VM-245 done cards and handoffs
- Glint VM-246 through VM-249 done cards and handoffs
- Runtime/data/generated files tied to Yore promotion
- Existing unrelated docs, architecture, and image changes in the dirty worktree

What should not be touched:

- `docs/research/dune/dune-brood-research-packet.html`
- `docs/research/canon/**`
- `docs/architecture/colors/dune/`
- `data/raw-factions/dune/`
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
- Home preview membership
- Maze files
- Route CSS/JS
- Identity-hero assets or mapping
- VM-253 through VM-257 cards except unavoidable board/index references
- Yore, Glint, Ink, and Witch files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2343-codex-vm240-269-four-color-lane-reservation-only.md`
- `docs/handoffs/2026-06-02-1135-codex-vm240-yore-source-packet.md`
- `docs/handoffs/2026-06-02-1245-codex-vm241-yore-identity-metaphysics.md`
- `docs/handoffs/2026-06-02-1528-codex-vm242-yore-docs-parity-fill.md`
- `docs/handoffs/2026-06-02-1622-codex-vm243-yore-non-live-raw-packet.md`
- `docs/handoffs/2026-06-02-2049-codex-vm244-yore-review-gate.md`
- `docs/handoffs/2026-06-02-2211-codex-vm245-yore-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-02-1825-codex-vm246-glint-source-packet.md`
- `docs/handoffs/2026-06-02-2050-codex-vm247-glint-identity-metaphysics.md`
- `docs/handoffs/2026-06-02-2142-codex-vm248-glint-docs-parity-fill.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-252-dune-source-packet-and-evidence-ledger.md`
- `docs/kanban/backlog/VM-253-dune-identity-and-metaphysics-docs.md`
- `docs/kanban/backlog/VM-254-dune-docs-parity-fill.md`
- `docs/kanban/backlog/VM-255-dune-non-live-raw-packet.md`
- `docs/kanban/backlog/VM-256-dune-review-gate.md`
- `docs/kanban/backlog/VM-257-dune-controlled-runtime-promotion.md`
- `docs/research/dune/dune-brood-research-packet.html`
- `docs/research/canon/canon-inventory-four-color-reference-audit.md`
- `docs/research/canon/misc/Magic Four-Color Identity Dossier.md`
- `docs/research/canon/misc/commander_deck_list.txt`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precon-catalog.json`
- `docs/research/glint/README.md`
- `docs/research/glint/glint-source-ledger.md`
- `docs/research/glint/glint-evidence-ledger.md`
- `docs/research/glint/glint-reliability-audit.md`
- `docs/research/glint/glint-manual-fill.md`
- `docs/research/glint/glint-research-dossier.md`
- `docs/research/glint/glint-lore-source-packet.md`
- `docs/kanban/done/VM-246-glint-source-packet-and-evidence-ledger.md`
- Starting `git status --short`

## Files Changed

- `docs/research/dune/README.md`
- `docs/research/dune/dune-source-ledger.md`
- `docs/research/dune/dune-evidence-ledger.md`
- `docs/research/dune/dune-reliability-audit.md`
- `docs/research/dune/dune-manual-fill.md`
- `docs/research/dune/dune-research-dossier.md`
- `docs/research/dune/dune-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-252-dune-source-packet-and-evidence-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-0655-codex-vm252-dune-source-packet.md`

## What Changed

- Created the VM-252 Dune source packet under `docs/research/dune/`.
- Added source-role classification for the repo-truth four-color audit, support-only dossier and Commander/precon rows, explicit absence of standalone shaping/synthesis authority, and discovery-only treatment for the existing Dune HTML draft.
- Added an evidence ledger with Dune/BRGW scope boundaries, naming guardrails, missing-Blue framing, Dune-Brood anchor boundaries, Saskia/`Open Hostility` support texture, and discovery-draft quarantine rules.
- Added a reliability audit that records the Dune HTML draft hash and enumerates unsupported polished claims that later cards must not inherit without new evidence.
- Added manual-fill, dossier, and lore-source-packet docs for controlled downstream use.
- Moved VM-252 from Backlog to Done while leaving VM-253 through VM-257 in Backlog.
- Added this handoff and indexed it.

## Why It Changed

The user tightened the VM-252 execution prompt to make bookkeeping surfaces explicit and to force a concrete unsupported-claim audit for the existing Dune draft. This pass creates the approved Dune packet foundation without moving into architecture, raw JSON, review, runtime, generated, or later Dune lane work.

## Decisions Made

- Treated `docs/research/canon/canon-inventory-four-color-reference-audit.md` as the primary claim-bearing floor for VM-252.
- Treated `Magic Four-Color Identity Dossier.md`, `commander_deck_list.txt`, JSONL row 52, and repo-local `Open Hostility` precon data as support-only references.
- Preserved `docs/research/dune/dune-brood-research-packet.html` in place and explicitly denied it `DUNE-SRC-###` and `DUNE-EVID-###` authority.
- Classified the discovery draft as unsupported for comparative, statistical, exclusivity, media, commander-legality, and strategy-package claims unless later cards re-source them.
- Kept `DUNE` non-live and kept `BRGW`, `WBRG`, and all permutations metadata/query-only.
- Did not touch VM-253 through VM-257 card files beyond moving VM-252 bookkeeping to Done/board/index surfaces.

## Risks / Uncertainties

- Later cards still need direct official/card-source verification before raw packet or runtime work.
- The current packet intentionally avoids over-using detailed metaphysical language because long-form Dune worldview prose remains synthesis-heavy at this stage.
- The worktree remains dirty with unrelated Yore, Glint, runtime, and documentation changes that VM-252 did not normalize.
- The discovery draft contains enough polished unsupported prose that future cards could accidentally over-trust it unless they keep using the explicit unsupported-claim audit.

## Tests Run

- `Get-Date -Format "yyyy-MM-dd-HHmm"`
- `Get-FileHash docs\\research\\dune\\dune-brood-research-packet.html -Algorithm SHA256`
- Verified `docs/research/dune/` ends with the exact expected 8-file state: 7 approved packet files plus 1 preserved unmanaged input.
- Validated that `docs/architecture/colors/dune/` and `data/raw-factions/dune/` do not exist.
- Ran a Dune packet reference validation that source IDs, evidence IDs, manual-fill IDs, dossier/lore references, and the 24 BRGW metadata/query-only permutations resolve cleanly with no missing IDs or duplicate codes.
- Ran scoped discovery-draft overclaim scans for official-name, official-faction, Nephilim-as-institution, Commander-support-as-lore, discovery-draft-as-canon, and public BRGW/WBRG alias risks.
- Ran scoped diff guards against `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, `data/archscry-flavor-snippets.json`, builders, runtime, Maze, route, preview, identity-hero, Dune architecture, and Dune raw paths.
- Ran scoped trailing-whitespace scans on the VM-252 research, Kanban, board, and handoff files.
- Ran scoped `git diff --check` on tracked VM-252 bookkeeping files.

Not run:

- `npm test`
- `npm run test:parser`
- Runtime/build suites, because VM-252 was docs/source-only and touched no runtime/generated files.

## Not Touched

- `docs/research/dune/dune-brood-research-packet.html`
- `docs/research/canon/**`
- `docs/architecture/colors/dune/`
- `data/raw-factions/dune/`
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
- Home preview membership
- Maze files
- Route CSS/JS
- Identity-hero assets or mapping
- VM-253 through VM-257 cards
- Yore, Glint, Ink, and Witch files

## Follow-Up Recommendations

- Start VM-253 as a separate prompt only after accepting VM-252.
- VM-253 should use the Dune packet as a guarded source floor and treat the unsupported-claim audit as a stop list rather than a source list.
- Preserve the naming distinction between Vox Mana's `DUNE` expression label and Commander 2016's `Aggression` theme alias.
- Keep `BRGW`, `WBRG`, and all same-color permutations metadata/query-only through every later Dune card.

## Next Suggested Agent

Documentation Steward for VM-253 Dune identity and metaphysics docs.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-252-dune-source-packet-and-evidence-ledger.md`
- `docs/kanban/backlog/VM-253-dune-identity-and-metaphysics-docs.md`
- `docs/kanban/backlog/VM-254-dune-docs-parity-fill.md`
- `docs/kanban/backlog/VM-255-dune-non-live-raw-packet.md`
- `docs/kanban/backlog/VM-256-dune-review-gate.md`
- `docs/kanban/backlog/VM-257-dune-controlled-runtime-promotion.md`
- `docs/research/dune/README.md`
- `docs/research/dune/dune-source-ledger.md`
- `docs/research/dune/dune-evidence-ledger.md`
- `docs/research/dune/dune-reliability-audit.md`
- `docs/research/dune/dune-manual-fill.md`
- `docs/research/dune/dune-research-dossier.md`
- `docs/research/dune/dune-lore-source-packet.md`
- `docs/handoffs/2026-05-31-2343-codex-vm240-269-four-color-lane-reservation-only.md`

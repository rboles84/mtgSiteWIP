# 2026-06-04 12:06 - Codex - VM-264 Witch Source Packet And Evidence Ledger

## Agent Name

Codex acting as Planning Architect for scope control, with Documentation Steward / Kanban Steward execution support.

## Task Requested

Implement VM-264 only: normalize the Witch source packet and evidence ledger under `docs/research/witch/` without starting VM-265 or later cards, and preserve the three existing Witch drafts as discovery-only inputs instead of laundering them into approved evidence.

## Pre-Flight Summary

Recent related work:

- VM-240 through VM-245 established the first completed four-color lane through Yore source, docs, raw, review, and promotion.
- VM-246 through VM-251 established the Glint packet/docs/raw/review/promotion precedent, including discovery-draft quarantine.
- VM-252 through VM-257 established the Dune packet/docs/raw/review/promotion precedent.
- VM-258 through VM-263 established the current Ink packet/docs/raw/review/promotion precedent, including the exact seven-file packet shape used here.
- VM-280, VM-281, and VM-283 hardened the shared live four-color Maze and handoff contract, which remains out of scope for VM-264.

Current known risks:

- Four-color canon remains thinner than the shard and wedge lanes.
- `docs/research/witch/` already contained three unmanaged, polished drafts with external citations, ranking language, live-stat claims, and placement-heavy prose, creating a high source-laundering risk.
- Commander support rows use `WUBG` ordering while Vox Mana's Witch metadata direction is `GWUB`, so naming and color-order boundaries must stay explicit.
- The worktree is broadly dirty across runtime, data, docs, and handoff surfaces, so shared bookkeeping files needed to preserve existing unrelated changes.

Relevant decisions already made:

- VM-264 is source-packet-only.
- `WITCH` is the future public key, while `GWUB`, `WUBG`, and all same-color permutations remain metadata/query-only.
- `Witch` is Vox Mana's Nephilim-derived expression label and `Growth` is the Commander 2016 support/display alias; neither should be presented as an official exclusive MTG name for `GWUB`.
- The local four-color audit plus the Witch/Atraxa dossier sections are the claim-bearing floor for this packet.
- Unmanaged Witch drafts may be classified and preserved, but not promoted into approved source authority.

Files recently changed:

- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- Ink VM-258 through VM-263 done cards and handoffs
- `docs/reference/data-contracts.md`
- `docs/architecture/placement-domains.md`
- Existing unrelated docs, data, runtime, and handoff changes in the dirty worktree

What should not be touched:

- `docs/research/canon/**`
- `docs/architecture/colors/witch/`
- `data/raw-factions/witch/`
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
- VM-265 through VM-269 implementation surfaces
- Yore, Glint, Dune, and Ink files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-2343-codex-vm240-269-four-color-lane-reservation-only.md`
- `docs/handoffs/2026-06-03-2236-codex-vm258-ink-source-packet.md`
- `docs/handoffs/2026-06-04-0005-codex-vm259-ink-identity-metaphysics.md`
- `docs/handoffs/2026-06-04-0705-codex-vm260-ink-docs-parity-fill.md`
- `docs/handoffs/2026-06-04-0754-codex-vm261-ink-non-live-raw-packet.md`
- `docs/handoffs/2026-06-04-0815-codex-vm262-ink-review-gate.md`
- `docs/handoffs/2026-06-04-0911-codex-vm263-ink-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-264-witch-source-packet-and-evidence-ledger.md`
- `docs/kanban/done/VM-258-ink-source-packet-and-evidence-ledger.md`
- `docs/research/witch/GWUB Four-Color Identity Research.md`
- `docs/research/witch/the_systemic_altar.html`
- `docs/research/witch/witch-maw-research-packet.html`
- `docs/research/canon/canon-inventory-four-color-reference-audit.md`
- `docs/research/canon/misc/Magic Four-Color Identity Dossier.md`
- `docs/research/canon/misc/commander_deck_list.txt`
- `docs/research/canon/misc/MTG_Lore_Research_Enhanced_Final.md`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precon-catalog.json`
- `docs/research/ink/README.md`
- `docs/research/ink/ink-source-ledger.md`
- `docs/research/ink/ink-evidence-ledger.md`
- `docs/research/ink/ink-reliability-audit.md`
- `docs/research/ink/ink-manual-fill.md`
- `docs/research/ink/ink-research-dossier.md`
- `docs/research/ink/ink-lore-source-packet.md`
- Approved Witch onboarding plan from the user
- Starting `git status --short`

## Files Changed

- `docs/research/witch/README.md`
- `docs/research/witch/witch-source-ledger.md`
- `docs/research/witch/witch-evidence-ledger.md`
- `docs/research/witch/witch-reliability-audit.md`
- `docs/research/witch/witch-manual-fill.md`
- `docs/research/witch/witch-research-dossier.md`
- `docs/research/witch/witch-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-264-witch-source-packet-and-evidence-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1206-codex-vm264-witch-source-packet.md`

## What Changed

- Created the VM-264 Witch source packet under `docs/research/witch/`.
- Added source-role classification for the repo-truth four-color audit, the approved Witch/Atraxa dossier floor, support-only Commander/precon rows, the shaping-only lore compendium, explicit absence of standalone synthesis authority, and discovery-only treatment for the three existing Witch drafts.
- Added an evidence ledger with `WITCH` / `GWUB` scope boundaries, naming guardrails, missing-Red framing, Witch-Maw anchor boundaries, Atraxa / `Breed Lethality` support texture, shaping-only lore boundaries, and discovery-draft quarantine rules.
- Added a reliability audit that records the three draft hashes and enumerates unsupported comparative, ranking, popularity, Commander-culture, cEDH, and Phyrexia-collapse claims that later cards must not inherit without new evidence.
- Added manual-fill, dossier, and lore-source-packet docs for controlled downstream use.
- Moved VM-264 from Backlog to Done while leaving VM-265 through VM-269 in Backlog.
- Added this handoff and indexed it.

## Why It Changed

The user asked to implement the approved Witch gold-standard onboarding plan while explicitly stopping at VM-264. This implementation creates the approved Witch packet foundation without moving into architecture, raw JSON, review, runtime, generated, or later Witch lane work.

## Decisions Made

- Followed the approved implementation prompt exactly: VM-264 only, seven packet files, and no VM-265+ drift.
- Treated `docs/research/canon/canon-inventory-four-color-reference-audit.md` plus the Witch/Atraxa sections of `Magic Four-Color Identity Dossier.md` as the claim-bearing floor for VM-264.
- Treated `commander_deck_list.txt`, the current `Breed Lethality` / `Atraxa, Praetors' Voice` JSONL row, and repo-local `Breed Lethality` precon data as support-only references.
- Treated `MTG_Lore_Research_Enhanced_Final.md` as shaping-only rather than claim-bearing authority.
- Preserved all three existing Witch drafts in place and explicitly denied them `WITCH-SRC-###` and `WITCH-EVID-###` authority.
- Classified the discovery drafts as unsupported for EDHREC totals, Atraxa popularity rankings, house-rule commander claims, cEDH/Tymna-Thrasios claims, Phyrexia-totalization, and commander-pool breadth claims unless later cards re-source them.
- Kept `WITCH` non-live and kept `GWUB`, `WUBG`, and all permutations metadata/query-only.
- Did not touch VM-265 through VM-269 card files beyond moving VM-264 bookkeeping to Done/board/index surfaces.

## Risks / Uncertainties

- Later cards still need tighter official/product capture before raw packet or runtime work.
- The current packet intentionally avoids promoting Atraxa, Grand Unifier, partner shells, and popularity claims beyond discovery status because the approved local floor does not yet support them.
- The worktree remains dirty with unrelated Yore, Glint, Dune, Ink, runtime, and documentation changes that VM-264 did not normalize.
- The three discovery drafts contain enough polished unsupported prose that future cards could accidentally over-trust them unless they keep using the explicit unsupported-claim audit.

## Tests Run

- `Get-Date -Format "yyyy-MM-dd-HHmm"`
- `Get-FileHash docs\research\witch\GWUB Four-Color Identity Research.md, docs\research\witch\the_systemic_altar.html, docs\research\witch\witch-maw-research-packet.html -Algorithm SHA256`
- Verified `docs/research/witch/` ends with the exact expected 10-file state: 7 approved packet files plus 3 preserved unmanaged inputs.
- Validated that `docs/architecture/colors/witch/` and `data/raw-factions/witch/` do not exist.
- Verified the `Breed Lethality` / `Atraxa, Praetors' Voice` support record locally by content match across:
  - `docs/research/canon/misc/commander_deck_list.txt`
  - `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
  - `data/precons/vox-mana-precons.source.json`
  - `data/precons/vox-mana-precon-catalog.json`
- Ran a Witch packet reference validation that source IDs, evidence IDs, manual-fill IDs, dossier/lore references, and the 24 `GWUB` metadata/query-only permutations resolve cleanly with no missing IDs or duplicate codes.
- Ran scoped discovery-draft overclaim scans for official-name, official-faction, Nephilim-as-institution, Commander-support-as-lore, discovery-draft-as-canon, public `GWUB` / `WUBG` alias risks, EDHREC/ranking language, house-rule commander language, cEDH/Tymna-Thrasios claims, and Phyrexia-overfit language.
- Ran scoped trailing-whitespace scans on the VM-264 research, Kanban, board, and handoff files.
- Ran scoped `git diff --check` on tracked VM-264 bookkeeping files.

Not run:

- `npm test`
- `npm run test:parser`
- Runtime/build suites, because VM-264 was docs/source-only and touched no runtime/generated files.

## Not Touched

- `docs/research/witch/GWUB Four-Color Identity Research.md`
- `docs/research/witch/the_systemic_altar.html`
- `docs/research/witch/witch-maw-research-packet.html`
- `docs/research/canon/**`
- `docs/architecture/colors/witch/`
- `data/raw-factions/witch/`
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
- VM-265 through VM-269 files
- Yore, Glint, Dune, and Ink files

## Follow-Up Recommendations

- Start VM-265 as a separate prompt only after accepting VM-264.
- VM-265 should use the Witch packet as a guarded source floor and treat the unsupported-claim audit as a stop list rather than a source list.
- Preserve the naming distinction between Vox Mana's `WITCH` expression label and Commander 2016's `Growth` support/display alias.
- Keep `GWUB` canonical and keep `WUBG` plus all same-color permutations metadata/query-only through every later Witch card.
- Keep Atraxa and Phyrexian texture bounded as support/context rather than collapsing the entire Witch lane into one commander or one plane.

## Next Suggested Agent

Documentation Steward for VM-265 Witch identity and metaphysics docs.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-264-witch-source-packet-and-evidence-ledger.md`
- `docs/kanban/backlog/VM-265-witch-identity-and-metaphysics-docs.md`
- `docs/kanban/backlog/VM-266-witch-docs-parity-fill.md`
- `docs/kanban/backlog/VM-267-witch-non-live-raw-packet.md`
- `docs/kanban/backlog/VM-268-witch-review-gate.md`
- `docs/kanban/backlog/VM-269-witch-controlled-runtime-promotion.md`
- `docs/research/witch/README.md`
- `docs/research/witch/witch-source-ledger.md`
- `docs/research/witch/witch-evidence-ledger.md`
- `docs/research/witch/witch-reliability-audit.md`
- `docs/research/witch/witch-manual-fill.md`
- `docs/research/witch/witch-research-dossier.md`
- `docs/research/witch/witch-lore-source-packet.md`
- Approved Witch onboarding plan from the user

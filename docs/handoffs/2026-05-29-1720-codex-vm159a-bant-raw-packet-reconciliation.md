# VM-159A Bant Raw Packet Reconciliation Handoff

## Agent Name

Codex

## Task Requested

Implement VM-159A by reconciling the accepted Bant lore-source packet with the VM-159 Bant raw-faction JSON before VM-160 promotion, while avoiding identity-layer registration, builder mapping, generated artifacts, runtime, Maze, Supabase source, route CSS/JS, and Home changes.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-1249-codex-vm159-bant-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-159-bant-raw-faction-source-packet.md`
- `docs/research/bant/bant-lore-source-packet.md`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.changelog.json`
- `research/build-faction-artifacts.mjs`

## Files Changed

- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.changelog.json`
- `docs/research/bant/bant-lore-source-packet.md`
- `docs/kanban/done/VM-159A-bant-raw-packet-reconciliation.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-29-1720-codex-vm159a-bant-raw-packet-reconciliation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added `src_vm_bant_lore_source_packet_20260529` to Bant sources so existing claim citations resolve.
- Revised `bant_claim_0009` to treat Valeron, Akrasa, Jhess, Topa, and Eos as the accepted five-nation geography instead of a partly unresolved roster.
- Preserved `bant_claim_0010` as the confirmed Jhess, Topa, and Eos upgrade and changed its note to allow future runtime geography use while keeping direct quotation and expanded politics bounded.
- Removed the stale profile manual-review blocker that said the five-nation roster needed verification before runtime use.
- Added `bant_change_002` to the changelog for the VM-159A reconciliation.
- Tightened the source-packet appendix so the Interactive Codex liturgy and alternate Mubin framing are clearly excluded from evidence use.

## Why It Changed

The raw Bant packet cited a newly accepted lore-source packet but did not define that source ID, and parts of the raw JSON still treated five-nation geography as unresolved after the source packet had upgraded it. VM-159A cleans that seam before VM-160 attempts controlled promotion.

## Decisions Made

- Bant remains a raw-faction source packet only after VM-159A.
- Five-nation geography is now safe as future runtime geography input, but exact sourcebook quotation and detailed local political claims remain bounded.
- The Mubin carry-forward version remains the Esper mind-control and Sword of Asha version.
- The Interactive Codex liturgy remains composed UI text and is not an official Magic quote.
- VM-160 remains the first appropriate card for identity-layer registration, builder mapping, generated artifacts, and placement baseline changes.

## Risks / Uncertainties

- Direct sourcebook quotations for Bant nation descriptions still need verification before dossier prose quotes them.
- Asha, Elspeth, post-Conflux politics, and post-Phyrexia political condition remain bounded and should not be expanded without direct support.
- The working tree already contained pre-existing untracked VM-157/VM-158/VM-159 and Bant research files; this pass preserved them and did not revert user/source edits.

## Tests Run

- `node --input-type=module -e "...Bant JSON consistency check..."`:
  - Parsed all five Bant raw JSON files.
  - Confirmed `claim_count` is `20` and matches the actual claims length.
  - Confirmed every claim source ID exists in `bant.sources.json`.
  - Confirmed every profile/placement claim reference exists in `bant.claims.json`.
- `rg -n "exact nation roster should remain source-bound|before runtime use of the full five-nation roster|prosthetic|Bantian liturgy" data/raw-factions/bant`:
  - No matches.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- data/identity-layers.json research/build-faction-artifacts.mjs data/factions.json data/placement-model.json data/placement-model.schema.json supabase/functions/guild-recruiter/faction-context.ts`:
  - No diff.
- `Select-String -Path research\build-faction-artifacts.mjs -Pattern "bant" -CaseSensitive:$false`:
  - No matches; `RAW_TO_KEY` still does not include Bant.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`:
  - Passed with only CRLF normalization warnings on `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.

No placement test was run because VM-159A did not touch generated artifacts, runtime code, or placement behavior.

## Not Touched

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime code
- Maze files
- Home files
- Route CSS/JS
- Supabase source files
- Generated artifacts

## Follow-Up Recommendations

- Use VM-160 for controlled Bant promotion only after human review of the reconciled raw packet.
- VM-160 should explicitly handle identity-layer registration, builder mapping, generated artifacts, and the 20-to-21 placement-test transition.
- Keep Asha, Elspeth, post-Conflux, and post-Phyrexia political detail bounded unless direct source support is added.

## Next Suggested Agent

JSON Cartographer with Test Strategist support for VM-160 controlled placement promotion.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-159A-bant-raw-packet-reconciliation.md`
- `docs/kanban/done/VM-159-bant-raw-faction-source-packet.md`
- `docs/research/bant/bant-lore-source-packet.md`
- `docs/handoffs/2026-05-29-1249-codex-vm159-bant-raw-faction-source-packet.md`

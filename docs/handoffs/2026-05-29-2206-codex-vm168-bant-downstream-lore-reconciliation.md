# 2026-05-29 22:06 - Codex - VM-168 Bant Downstream Lore Reconciliation

## Agent Name

Codex

## Task Requested

Reconcile the user's updated Bant lore-source packet edits into the already-live VM-160 Bant setup, including removal of the remaining positive "The Great Resolution" proper-noun usage, Asha angel-creation boundaries, confirmed Elspeth beats, the full Mubin sequence, and the Section 12 resolved-thread register impacts.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/handoffs/2026-05-29-2124-codex-vm163-esper-source-packet-evidence-ledger.md`
- `docs/research/bant/bant-lore-source-packet.md`
- `docs/architecture/colors/bant/identity.md`
- `docs/architecture/colors/bant/metaphysics.md`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.changelog.json`

## Files Changed

- `docs/research/bant/bant-lore-source-packet.md`
- `docs/architecture/colors/bant/identity.md`
- `docs/architecture/colors/bant/metaphysics.md`
- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.changelog.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-168-bant-downstream-lore-reconciliation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-2206-codex-vm168-bant-downstream-lore-reconciliation.md`

## What Changed

- Removed the remaining positive proper-noun use of "The Great Resolution" from the Bant source packet and left only negative source-boundary references.
- Updated Bant identity and metaphysics docs from pre-promotion manual-fill language to live-pilot source-boundary language.
- Treated Asha as presider/supreme guardian/sacred authority while keeping Asha-founder and Asha-created-angel claims out of bounds.
- Treated Elspeth's Bant arc as a confirmed knightly and spiritual sequence while keeping governance and institution-building out of bounds.
- Added Mubin as source-bound support context for the Sword of Asha sequence and Bant's many-behind-the-champion pattern.
- Added `bant_claim_0021`, updated claim/source/profile/placement/changelog metadata, and rebuilt generated placement artifacts through `npm.cmd run build:factions`.
- Moved VM-168 from in-progress to done on the file-backed Kanban board.

## Why It Changed

The user's updated Bant source packet resolved several previously blocked lore threads after VM-160 had already promoted `BANT` as live. Downstream identity, metaphysics, raw packet, and generated placement surfaces needed to inherit those resolutions without expanding runtime scoring or inventing new lore.

## Decisions Made

- Used `VM-168` instead of `VM-164` because VM-163 explicitly reserves VM-164 through VM-167 for future Esper follow-ups.
- Kept Mubin as support context only, not a placement route or Commander anchor.
- Kept "The Great Resolution" visible only in negative guardrails that say not to use it as official Bant lore.
- Did not edit placement scoring, question-bank logic, Home preview behavior, route CSS/JS, Maze behavior, or Supabase source code by hand.
- Let generated placement artifacts update only through `npm.cmd run build:factions`.

## Risks / Uncertainties

- Source claims still depend on the approved local source packet and support-source trail; direct quotations from official articles/sourcebooks should still be verified before user-facing exact quote output.
- `data/factions.json` remains a registry/display surface and does not carry the new detailed Mubin claim; the generated placement model and Supabase context are the downstream surfaces that consume this raw placement/profile language.
- The working tree contains many pre-existing VM-157 through VM-163 changes and unrelated modified files. This task worked with that state and did not attempt to isolate or revert it.

## Tests Run

- `node -e "const fs=require('fs'); ... JSON.parse(...)"` for Bant raw JSON files
- `rg -n "The Great Resolution|Manual fill required|specific Elspeth story sequence|Verify Asha and Elspeth|not live placement-ready|20-expression|If Bant is promoted later|Promotion gate" ...`
- `npm.cmd run build:factions`
- `npm.cmd run test:placement` -> `PASS adaptive placement tests: 21 factions, 21 golden paths`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not Touched

- Placement scoring and adaptive question logic
- Home preview carousel exposure
- Maze controller/search behavior
- Route CSS/JS
- Supabase source code by hand
- `data/identity-layers.json`
- Broad shard framework work
- Esper VM-164 through VM-167 follow-up space

## Follow-Up Recommendations

- If exact user-facing lore quotations are desired, perform a focused direct-source verification pass for the official Asha, Elspeth, Mubin/Rafiq, and sourcebook passages.
- Keep any future Bant Home preview or dossier expansion as a separate card, since VM-168 intentionally preserved the VM-160 no-Home-exposure boundary.
- When committing the accumulated VM-157 through VM-168 work, review the large dirty tree carefully because multiple cards are currently represented in one uncommitted branch state.

## Next Suggested Agent

Documentation Steward for any future direct-quotation verification pass, or JSON Cartographer if the next task expands source-bound Bant lore into additional generated display fields.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-168-bant-downstream-lore-reconciliation.md`
- `docs/handoffs/2026-05-29-1757-codex-vm160-bant-controlled-placement-promotion.md`
- `docs/research/bant/bant-lore-source-packet.md`
- `docs/architecture/colors/bant/identity.md`
- `docs/architecture/colors/bant/metaphysics.md`

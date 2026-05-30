# VM-159 Bant Raw-Faction Source Packet Handoff

## Agent Name

Codex

## Task Requested

Implement VM-159 by creating Bant's canonical raw-faction source packet while keeping Bant out of the live 20-expression placement model and avoiding all identity-layer, builder, schema, generated, runtime, Maze, Supabase, route CSS/JS, and frontend changes.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-0738-codex-vm158-bant-docs-parity-fill-pass.md`
- `docs/handoffs/2026-05-28-2346-codex-vm157-bant-identity-metaphysics-authoring.md`
- `docs/handoffs/2026-05-28-1922-codex-vm013-placement-domains-prerequisite.md`
- `docs/handoffs/2026-05-28-2247-codex-vm156-canon-inventory-three-color-audit.md`
- `docs/kanban/board.md`
- `docs/architecture/colors/bant/identity.md`
- `docs/architecture/colors/bant/metaphysics.md`
- `docs/research/bant/bant-source-ledger.md`
- `docs/research/bant/bant-evidence-ledger.md`
- `docs/research/bant/bant-research-dossier.md`
- `docs/research/bant/bant-reliability-audit.md`
- `docs/research/bant/bant-manual-fill.md`
- `docs/research/bant/Bant_Lore_Reference.docx`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.xlsx`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`
- `data/raw-factions/azorius_senate/azorius_senate.profile.json`
- `data/raw-factions/azorius_senate/azorius_senate.placement.json`
- `data/raw-factions/azorius_senate/azorius_senate.claims.json`
- `data/raw-factions/azorius_senate/azorius_senate.sources.json`
- `data/raw-factions/azorius_senate/azorius_senate.changelog.json`
- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.claims.json`
- `data/raw-factions/lorehold/lorehold.sources.json`
- `data/raw-factions/lorehold/lorehold.changelog.json`
- `research/build-faction-artifacts.mjs`

## Files Changed

- `data/raw-factions/bant/bant.profile.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.sources.json`
- `data/raw-factions/bant/bant.changelog.json`
- `docs/kanban/done/VM-159-bant-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-29-1249-codex-vm159-bant-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`

Transient kickoff file moved to done:

- `docs/kanban/ready/VM-159-bant-raw-faction-source-packet.md`

## What Changed

Created the five-file Bant raw-faction packet:

- `bant.sources.json` records the approved evidence stack, accepted support sources, and excluded source classes.
- `bant.claims.json` records 20 source-bound claims and one explicit VM-159 non-promotion boundary claim.
- `bant.profile.json` captures Bant's draft source profile, color direction `WUG`, social structure, tension, source-bound history, mechanics, Commander Compass draft material, data-quality notes, and research limitations.
- `bant.placement.json` captures future placement guidance, discriminator scaffolding, drift guardrails, and collision guidance without making Bant placement-eligible.
- `bant.changelog.json` records the initial packet, manual-review requirements, and deliberate omissions.

## Why It Changed

Bant needed an authored source-data airlock between the VM-157/VM-158 architecture docs and any later runtime promotion work. VM-159 gives future VM-160 implementation a structured packet to review without changing the current live model.

## Decisions Made

- Bant remains `faction_id: "bant"` and `faction_name: "Bant"` in raw source only.
- Bant's future canonical color direction is documented as `WUG`, but no identity-layer registration, alias, generated artifact, or runtime mapping was added.
- Existing raw-packet conventions were used for draft/not-promoted state: `placement_quality`, `commander_compass.review_status`, `data_quality`, `research_limitations`, changelog `manual_review_required`, and audit-summary fields.
- Sensitive source-boundary claims were kept bounded: Asha is not promoted to sole founder, Elspeth is not promoted to Bant governor or institution builder, and post-Conflux/post-Phyrexia language does not assert complete political condition.
- `Bant Commander Analysis Framework.md`, fan-generated HTML/codex material, and unapproved generated deep-research notes were excluded from the evidence chain.
- `npm run build:factions` was not run because it would write generated artifacts.

## Structure Comparison Notes

Compared the new Bant packet against `azorius_senate` and `lorehold`.

- Bant uses the same five-file packet shape: profile, placement, claims, sources, and changelog.
- Bant mirrors the mature profile areas used by Lorehold: site surface, core identity, structure, great tension, historical timeline, key figures, flavor, faction views, mechanics, search metadata, data quality, limitations, and Commander Compass.
- Bant mirrors the mature placement areas used by Azorius/Lorehold: summary, moral profile, axes, values, signals, inhibitors, good/poor indicators, discriminator questions, chatbot guidance, placement quality, calibration tuning, and collision guidance.
- Intentional omissions are documented rather than backfilled: no live generated artifact fields, no builder map, no identity-layer entry, no runtime-ready placement eligibility, no final Commander deck URLs, and no unverified exact card-text claims.

## Risks / Uncertainties

- Bant's packet is source-rich enough for manual review, but still not runtime-calibrated against live placement questions or generated model behavior.
- Commander Compass material is draft curation from the workbook/manual-fill sources and needs later live deck/link verification before promotion.
- Nation, Asha, Elspeth, post-Conflux, and post-Phyrexia claims remain deliberately bounded because some support is indirect or secondary.
- Future VM-160 may need schema or builder changes; those were intentionally not performed here.

## Tests Run

- `node --input-type=module -e "...Bant JSON consistency check..."`:
  - Parsed all five Bant JSON files.
  - Confirmed `faction_id` and `faction_name` consistency.
  - Confirmed `claim_count` is `20` and matches the actual claim array length.
  - Confirmed no missing claim-source references.
  - Confirmed no missing profile/placement claim references.
- `node --input-type=module -e "...azorius_senate/lorehold/bant structure comparison..."`:
  - Confirmed Bant has the expected mature packet file family and broad top-level field coverage.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff -- research/build-faction-artifacts.mjs`:
  - No diff.
- `Select-String -Path research\build-faction-artifacts.mjs -Pattern "bant" -CaseSensitive:$false`:
  - No matches; `RAW_TO_KEY` does not include Bant.
- `rg -n "Bant Commander Analysis Framework|Interactive Codex|Magic_ The Gathering Bant Lore Research|TODO|TBD|shipped support|live placement support|placement_eligible.: true" data/raw-factions/bant`:
  - No matches after wording cleanup.
- `npm.cmd run test:placement`:
  - `PASS adaptive placement tests: 20 factions, 20 golden paths`.
- `git diff --check`:
  - Passed with line-ending warnings only for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short`:
  - VM-159 changes are limited to the Bant raw-faction packet plus Kanban and handoff files.
  - Pre-existing untracked VM-157/VM-158 architecture, handoff, Kanban, and Bant research files remain present and were not modified for VM-159.

## Not Touched

- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/raw-factions/azorius_senate/`
- `data/raw-factions/lorehold/`
- Runtime code
- Schemas
- Generated artifacts
- Maze controller files
- Route CSS/JS
- Supabase files
- Research source files

## Follow-Up Recommendations

- Human-review the Bant source packet before any live promotion.
- Open VM-160 only after review to handle identity-layer registration, builder integration, generated artifacts, schema implications, and the 20-to-21 placement-test transition.
- Add Commander Compass link/deck verification before any runtime-facing Bant recommendation surface.
- Calibrate Bant against Azorius, Selesnya, Simic, and especially Naya before enabling placement.

## Next Suggested Agent

JSON Cartographer for VM-160 planning after human review, with Test Strategist support for the eventual 20-to-21 placement baseline transition.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-159-bant-raw-faction-source-packet.md`
- `docs/architecture/colors/bant/identity.md`
- `docs/architecture/colors/bant/metaphysics.md`
- `docs/handoffs/2026-05-29-0738-codex-vm158-bant-docs-parity-fill-pass.md`
- `docs/handoffs/2026-05-28-2346-codex-vm157-bant-identity-metaphysics-authoring.md`
- `docs/handoffs/2026-05-28-1922-codex-vm013-placement-domains-prerequisite.md`

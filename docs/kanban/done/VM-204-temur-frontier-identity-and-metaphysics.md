# VM-204 - Temur Frontier Identity And Metaphysics

ID: VM-204
Title: Temur Frontier Identity And Metaphysics
Status: done
Type: Documentation / Architecture
Area: Temur Frontier, Tarkir Wedge, Architecture
Priority: high
Created: 2026-05-31
Completed: 2026-05-31

## Summary

Create the docs-only Temur architecture layer from the reviewed VM-203 source/evidence packet by adding `identity.md` and `metaphysics.md`.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Require VM-203 to be complete and human-reviewable before starting.
- Create `docs/architecture/colors/temur/identity.md`.
- Create `docs/architecture/colors/temur/metaphysics.md`.
- Use only VM-203 evidence rows as architecture foundations.
- Keep support-only, comparator-only, seed-only, generated-structure-only, Commander/operator, and manual-fill rows out of core identity foundations.
- Treat `TEMUR` as a planned public expression key only after promotion.
- Treat `GUR` as color-direction/query metadata only.
- Preserve the four-timeline boundary: Khans-era Temur, ancient Fate Reforged Temur, Atarka Clan, and reformed Dragonstorm Temur.
- Label `Vox Mana synthesis` and `Manual fill required` boundaries clearly.

## Non-Goals

- Do not add new lore sources or official captures.
- Do not add new evidence rows, source tiers, source claims, or manual-fill conclusions.
- Do not materially rewrite VM-203 packet files.
- Do not create `data/raw-factions/temur/`.
- Do not introduce `temur_claim_####` IDs.
- Do not add `TEMUR` or `GUR` to runtime/generated placement surfaces.
- Do not add `GUR` as an alias, route, raw key, fixture key, lookup key, or placement key.
- Do not change generated artifacts, schemas, routes, Maze, Home preview, Supabase, fixtures, route maps, browser bundles, or test fixtures.

## Acceptance Criteria

- [x] `docs/architecture/colors/temur/identity.md` exists.
- [x] `docs/architecture/colors/temur/metaphysics.md` exists.
- [x] Required anchors appear: `TEMUR`, `GUR`, `Green`, `Tarkir`, `Vox Mana synthesis`, `Manual fill required`, and VM-203 evidence references.
- [x] Cited `TEMUR-EVID-###` row IDs exist in the VM-203 evidence ledger.
- [x] No new source IDs, source tiers, evidence rows, manual-fill rows, or raw claim IDs are introduced.
- [x] Generated HTML and seed headings are not used as canon evidence.
- [x] Temur anti-bleed terms appear for Gruul, Simic, Izzet, Naya, Sultai, Jeskai, Atarka Clan, Dragonstorm Temur, and generic GUR goodstuff.
- [x] `data/raw-factions/temur/` remains absent.
- [x] No runtime/data/schema/generated/Maze/route/Supabase/fixture/Home-preview files change.

## Suggested Tests

- `Test-Path docs\architecture\colors\temur\identity.md`
- `Test-Path docs\architecture\colors\temur\metaphysics.md`
- `Test-Path data\raw-factions\temur`
- Evidence-row scan proving every `TEMUR-EVID-###` reference resolves in VM-203.
- Guard scan for absence of `temur_claim_####`.

## Completion Notes

- Created docs-only Temur `identity.md` and `metaphysics.md` architecture files from VM-203 evidence rows.
- Preserved `TEMUR` as a planned public expression only and `GUR` as color-direction/query metadata only.
- Preserved the Khans-era, Fate Reforged/Yasova-era, Atarka Clan, and modern Dragonstorm Temur timeline boundaries.
- Kept Commander/mechanics rows support-only and marked manual-fill or synthesis boundaries explicitly.
- No raw-faction packet, runtime key, generated artifact, route, schema, Supabase, Maze, or Home-preview work was performed.

## Tests Run

- `Test-Path docs\architecture\colors\temur\identity.md`
- `Test-Path docs\architecture\colors\temur\metaphysics.md`
- `Test-Path data\raw-factions\temur`
- VM-203 evidence-row resolution scan for cited `TEMUR-EVID-###` references.
- Guard scans for raw claim IDs, source IDs, direct seed artifact citation, and unauthorized runtime/raw/generated references.
- `git diff --check` on VM-204 changed documentation and Kanban/handoff files.

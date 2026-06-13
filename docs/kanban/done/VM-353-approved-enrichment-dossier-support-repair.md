# VM-353 - Approved Enrichment And Dossier Support Repair

ID: VM-353
Title: Approved Enrichment And Dossier Support Repair
Status: done
Type: dossier / raw-enrichment / support-surface repair
Area: raw-factions / generated display / Commander support
Priority: high
Created: 2026-06-12

## Summary

Surface only approved raw enrichment and dossier support where readiness matrices establish backing. Missing richness becomes intake, not filler.

## Guardrails

- Do not use generated snippets, dossier output, runtime copy, or existing affinity as source evidence.
- Do not add Commander Compass fields without approved Commander/product support rows.
- Mardu/Jeskai top-level deck/research links require public navigation support approval.
- Jeskai snippet repair must come from source/index-backed flavor work or builder term correction.

## Scope

- Strixhaven per-college enrichment readiness from Lorehold benchmark.
- Shard flavor/figure/timeline intake classification for Esper/Grixis/Jund/Naya.
- Tarkir Commander/deck/research support verification for Abzan/Temur/Sultai/Mardu/Jeskai.

## Acceptance Criteria

- [ ] Backed enrichment/support is surfaced only from canonical source.
- [ ] Unsupported fields are classified as `source-intake-needed` or `blocked-noncanonical`.
- [ ] No generated file is hand-edited as source.

## Test Plan

- JSON parse touched raw profile files.
- `npm.cmd run build:factions` after canonical source changes.
- `npm.cmd run dossier:audit` after display-impacting changes.

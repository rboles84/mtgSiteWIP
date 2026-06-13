# VM-322 - JUND Source-First Display Enrichment

Status: Done
Owner: Codex
Created: 2026-06-10
Completed: 2026-06-10

## Summary

Use VM-322 for JUND because the numbering sequence shifted before this pass. Do not rename, duplicate, reuse, or repurpose existing VM cards.

Repaired only JUND's display gap: JUND already passed VM-300 with one expected model-owned inhibitor warning, had non-empty mechanics plus deck/research metadata, and lacked `factions.JUND.raw_enrichment`.

## Scope Completed

- Added source-backed `data/factions.json::factions.JUND.raw_enrichment`.
- Mirrored the existing raw JUND profile timeline entry.
- Kept display `key_figures` empty.
- Kept display `canonical_flavor_text` empty.
- Preserved JUND deck/research metadata.
- Preserved all raw JUND files.

## Evidence Mirrored

- Timeline: `event_jund_0001`.
- Claims: `jund_claim_0001`, `jund_claim_0002`.
- Evidence rows: `JUND-EVID-001`, `JUND-EVID-002`, `JUND-EVID-003`.

## Raw Hash Guard

- `jund.claims.json`: `CC8EA67397C10AA5C2E3C76BE3BCA6845ABEF5CA6C1EBDE6408C924708830D6D`
- `jund.sources.json`: `271AED049694167A0720967D5F1A17A27C5A9E0D7494243C82E8C4B879AE6732`
- `jund.placement.json`: `F1DFEECB9E5F1BB02AB2B672D14E1CA95799AC8894E6A0623558CFD9F851BF53`
- `jund.profile.json`: `236E59786417204E0B71E0A3CC1C1332C6A11B8F5A03A9C36FA41D88BAB5F070`

All four matched before and after VM-322.

## Generated Acceptance

- Accepted `data/factions.json::factions.JUND.raw_enrichment` only.
- Accepted no `data/placement-model.json` diff.
- Accepted no schema, identity-layer, flavor-snippet, route, Maze, Home, or non-JUND faction drift.
- Full `build:factions` rewrote unrelated `WITCH` Supabase context; restored `supabase/functions/guild-recruiter/faction-context.ts` from snapshot and ran `npm.cmd run build:factions -- --context-targets=JUND`.
- Final Supabase context was byte-identical to the restored snapshot.

## Deferred / Skipped Topics

Jund geography/ecology, named figure biographies, Kresh, Meren, Rakka Mar, Karrthus, Sarkhan Vol, devour-as-whole-identity, Conflux/post-Conflux chronology, Modern Jund, Riveteers/New Capenna, generated seed claims, and exact card/flavor text remain out of scope.

## Tests

- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: JSON parse checks for touched display/generated/raw JSON.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed with expected model-owned warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT,ESPER,GRIXIS,JUND`.
- Passed: `npm.cmd run build:factions`.
- Passed: `npm.cmd run build:factions -- --context-targets=JUND`.
- Passed with expected default warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Passed: `npm.cmd run test:placement`.

## Follow-Up

Recommend NAYA next if comparable probes confirm the same raw-enrichment-only display gap.

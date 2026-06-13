# VM-323 - NAYA Source-First Display Enrichment

Status: Done
Owner: Codex
Created: 2026-06-10
Completed: 2026-06-10

## Summary

Used VM-323 after confirming no existing VM-323 card was present and VM-322 was complete.

Repaired only NAYA's display gap: NAYA already passed VM-300 with one expected model-owned inhibitor warning, had non-empty mechanics plus deck/research metadata, and lacked `factions.NAYA.raw_enrichment`.

## Scope Completed

- Added source-backed `data/factions.json::factions.NAYA.raw_enrichment`.
- Mirrored the existing raw NAYA profile timeline entry.
- Kept display `key_figures` empty.
- Kept display `canonical_flavor_text` empty.
- Preserved NAYA deck/research metadata.
- Preserved all raw NAYA files.

## Evidence Mirrored

- Timeline: `event_naya_0001`.
- Claims: `naya_claim_0001`, `naya_claim_0002`.
- Evidence rows: `NAYA-EVID-001`, `NAYA-EVID-002`, `NAYA-EVID-003`.

## Raw Hash Guard

- `naya.claims.json`: `6E9C6BCD37BE37354CF494DFF8B88D517DC1D7FF63B7D2C132E9693A76A37BEE`
- `naya.sources.json`: `779A405ED0C65E1B2E9075474C18B34ED22FC8410BD9FA0606BB6A0592F30F2B`
- `naya.placement.json`: `59B69E5B98F425923AEEE22ED374D086AF29B730E16C1B8164F217C0EE5D6999`
- `naya.profile.json`: `DCCCE0AED37CC1443693DD76F9DC3553CC61FE792AB986CA802B9FC0AFD9C6D1`

All four matched before and after VM-323.

## Generated Acceptance

- Accepted `data/factions.json::factions.NAYA.raw_enrichment` only.
- Accepted no `data/placement-model.json` diff.
- Accepted no schema, identity-layer, flavor-snippet, route, Maze, Home, or non-NAYA faction drift.
- Full `build:factions` rewrote unrelated `WITCH` Supabase context; restored `supabase/functions/guild-recruiter/faction-context.ts` from snapshot and ran `npm.cmd run build:factions -- --context-targets=NAYA`.
- Final Supabase context was byte-identical to the restored snapshot.

## Deferred / Skipped Topics

Naya places, figures, culture, Progenitus, Gahiji, Mayael, detailed creature ecology, mechanics/card facts, post-Alara continuity, generated seed claims, and exact card/flavor text remain out of scope.

## Tests

- Passed: `node --check research\build-faction-artifacts.mjs`.
- Passed: `node --check research\build-archscry-flavor-snippets.mjs`.
- Passed: JSON parse checks for touched display/generated/raw JSON.
- Passed: `npm.cmd run test:faction-context-isolation`.
- Passed with expected model-owned warnings: `npm.cmd run validate:source-generated -- --targets=LOREHOLD,YORE,DUNE,GLINT,INK,ABZAN,SULTAI,TEMUR,BANT,ESPER,GRIXIS,JUND,NAYA`.
- Passed: `npm.cmd run build:factions`.
- Passed: `npm.cmd run build:factions -- --context-targets=NAYA`.
- Passed with expected default warnings: `npm.cmd run test:source-generated`.
- Passed: `node research\archscry-dossier-followup-tests.js`.
- Passed: `node research\maze-search-tests.js`.
- Passed: `npm.cmd run test:placement`.

## Follow-Up

Review remaining non-shard display gaps from current board/probes rather than guessing by lore preference.

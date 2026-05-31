# VM-175 - Bant Esper Dossier Recommendation Parity Audit

ID: VM-175
Title: Bant Esper Dossier Recommendation Parity Audit
Status: done
Type: QA / Regression Coverage
Area: Bant, Esper, Archscry, Maze, Card Recommendations
Priority: high
Created: 2026-05-30
Updated: 2026-05-30

## Summary

Audit Bant and Esper for the same recommendation and Maze sidebar issues found during the Grixis QA repair.

## Scope

- Verify Bant and Esper card voices are Commander color-identity legal.
- Verify Bant and Esper starter UX cards and mana-base tiers resolve against committed Scryfall data and stay within their shard identities.
- Verify Bant and Esper commander package links use exact commander identity.
- Verify Bant and Esper support links keep subset identity.
- Verify Maze `From Your Dossier` sidebar paths use active Bant/Esper shard identity even when stored primary placement context is narrower.

## Non-Goals

- Do not add new lore sources, claims, or raw-faction data.
- Do not change live placement keys, routes, Home, schemas, or Supabase source code.
- Do not regenerate artifacts unless a defect requires a source-data correction.

## Acceptance Criteria

- Bant card voices and starter UX cards satisfy `id<=wug`.
- Esper card voices and starter UX cards satisfy `id<=wub`.
- Bant commander searches use `id=wug`; Esper commander searches use `id=wub`.
- Bant/Esper support searches use `id<=`.
- Bant/Esper Maze sidebars do not fall back to WU or another stored primary identity.

## Completion Notes

- Audited Bant and Esper card voices, starter UX data, commander package searches, and Maze sidebar reconstruction.
- Found no Bant/Esper product defect matching the Grixis issues.
- Added regression coverage so Bant and Esper card voices and starter UX cards must stay within `id<=wug` / `id<=wub`.
- Added commander package coverage for exact `id=wug` / `id=wub` commander searches with subset support searches.
- Expanded Maze sidebar coverage so active `BANT`, `ESPER`, and `GRIXIS` shard handoffs override stored WU primary placement context.

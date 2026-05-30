# VM-163 - Esper Source Packet Evidence Ledger

ID: VM-163
Title: Esper Source Packet Evidence Ledger
Status: done
Type: Documentation / Research
Area: Esper, Shard Research, Evidence Ledger
Priority: high
Created: 2026-05-29
Updated: 2026-05-29
Completed: 2026-05-29

## Summary

Normalize the untracked Esper research folder into a Bant-style curated research packet before any architecture, raw-faction, or runtime promotion work begins.

## Scope

- Audit all existing files under `docs/research/esper/`.
- Treat `esper-lore-source-packet.md` as salvageable draft input.
- Treat `Esper Lore Dossier Generation.md`, `esper_codex.html`, and `esper_lore_codex.html` as non-authoritative draft or presentation artifacts.
- Create or normalize the seven approved packet files:
  - `docs/research/esper/README.md`
  - `docs/research/esper/esper-source-ledger.md`
  - `docs/research/esper/esper-evidence-ledger.md`
  - `docs/research/esper/esper-reliability-audit.md`
  - `docs/research/esper/esper-manual-fill.md`
  - `docs/research/esper/esper-research-dossier.md`
  - `docs/research/esper/esper-lore-source-packet.md`

## Non-Goals

- Do not create Esper architecture docs.
- Do not create raw-faction JSON.
- Do not run faction generation.
- Do not change runtime, route, Maze, Home, schema, generated, or Supabase files.
- Do not begin VM-164, VM-165, VM-166, or VM-167.

## Acceptance Criteria

- Every retained major claim appears in `esper-evidence-ledger.md` with source path, source tier, confidence/status, and classification.
- Unsupported, MTG Wiki-dependent, missing-local-capture, or generated-artifact-only claims move to `esper-manual-fill.md`.
- No stale `VM-161` or `VM-162` references remain in approved packet files.
- End status confirms VM-163 changes are contained to the approved packet plus AGENTS-required bookkeeping.

## Closeout Notes

- Published the seven approved curated packet files under `docs/research/esper/`.
- Classified the unmanaged dossier-generation and codex HTML files as non-authoritative draft or presentation artifacts.
- Kept all architecture, raw-faction, generated, runtime, schema, Maze, Home, route, and Supabase files out of scope.
- Stopped at VM-163; VM-164 through VM-167 were not started.

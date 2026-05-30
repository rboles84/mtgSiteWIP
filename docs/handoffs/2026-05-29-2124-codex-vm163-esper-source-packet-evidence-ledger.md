# VM-163 Esper Source Packet Evidence Ledger Handoff

## Agent Name

Codex

## Task Requested

Execute only VM-163: audit the existing Esper research folder and Bant gold-standard trail, then create or normalize the seven approved curated Esper packet files under `docs/research/esper/` without starting VM-164 through VM-167.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- Recent VM-156 through VM-162 handoffs under `docs/handoffs/`
- `docs/kanban/board.md`
- VM-156 through VM-162 Kanban cards under `docs/kanban/done/`
- All current files under `docs/research/esper/`
- `docs/research/bant/` and Bant architecture/raw-packet precedent files
- `docs/analysis/canon-inventory-three-color-reference-audit.md`
- `docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md`
- `docs/research/canon/guild_research/Alara Shards Lore Dossier Protocol.rtf`
- `docs/architecture/system/cross-color-dynamics.md`
- `docs/research/canon/misc/The Metaphysical Ecology of Alara - Interactive Codex.html`
- `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`

## Files Changed

- `docs/research/esper/README.md`
- `docs/research/esper/esper-source-ledger.md`
- `docs/research/esper/esper-evidence-ledger.md`
- `docs/research/esper/esper-reliability-audit.md`
- `docs/research/esper/esper-manual-fill.md`
- `docs/research/esper/esper-research-dossier.md`
- `docs/research/esper/esper-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-163-esper-source-packet-evidence-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-29-2124-codex-vm163-esper-source-packet-evidence-ledger.md`

## What Changed

- Published the seven approved Esper research packet files.
- Converted the previous Esper lore packet into a conservative source packet grounded in local evidence.
- Added a source ledger, evidence ledger, reliability audit, manual-fill list, and research dossier.
- Classified `Esper Lore Dossier Generation.md`, `esper_codex.html`, and `esper_lore_codex.html` as non-authoritative draft or presentation artifacts.
- Moved unsupported lore and missing official-capture topics into manual-fill status.
- Closed VM-163 on the Kanban board and recorded this handoff.

## Why It Changed

Esper needed a Bant-style evidence floor before any architecture authoring, raw-faction packet work, or runtime promotion. VM-163 creates that floor while preventing generated drafts, presentation artifacts, MTG Wiki-dependent claims, and missing local captures from becoming promoted project truth.

## Decisions Made

- `Esper` remains source-only and non-live after VM-163.
- The official Mark Rosewater Esper article is the primary local authority for promoted identity claims.
- The canon audit, Alara protocol RTF, cross-color dynamics doc, interactive Alara codex, and WUB-equivalent Commander rows are supporting rails, not unrestricted lore authority.
- Commander recommendation JSONL rows may support operator/product language, but not canon geography, chronology, society, figures, or metaphysics.
- Unmanaged Esper draft/presentation artifacts remain in place but are explicitly non-authoritative.
- Stale references to unrelated later cards were removed from the approved packet files.

## Risks / Uncertainties

- Repo-local official captures remain incomplete for detailed Esper geography, figures, etherium/carmot/sangrite, the Noble Work, Conflux chronology, and post-Phyrexian status.
- The interactive Alara codex is useful for discovery but not sufficient as primary evidence.
- The working tree already contains unrelated dirty Bant/runtime/docs changes; those surfaces were not touched for VM-163.

## Tests Run

- Captured `git -c safe.directory=C:/dev/mtgSiteWIP status --short` at the start and during closeout.
- Ran scoped stale-reference scan across the seven approved packet files for old card references; no matches remained.
- Ran scoped ASCII scan across the seven approved packet files; no non-ASCII characters found.
- Counted 10 WUB-equivalent Commander/operator rows in `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` using `colors: "White; Blue; Black"`.
- Ran evidence marker scans for promoted, support-only, Vox Mana synthesis, and manual-fill classifications.

## Not Touched

- No architecture docs were created.
- No raw-faction JSON was created.
- No faction generation was run.
- No runtime, schema, generated, Maze, Home, route, CSS, JS, or Supabase files were edited for VM-163.
- VM-164, VM-165, VM-166, and VM-167 were not started.

## Follow-up Recommendations

- Open VM-164 only after reviewing the VM-163 packet as the evidence boundary for `docs/architecture/colors/esper/identity.md` and `metaphysics.md`.
- Keep manual-fill topics out of promoted architecture prose until local official captures or accepted internal decisions are added.
- If later work needs to archive or adopt the unmanaged Esper draft/presentation artifacts, do that as a separate documentation stewardship card.

## Next Suggested Agent

Documentation Steward or Planning Architect for VM-164, once the project owner authorizes the next Esper onboarding phase.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-163-esper-source-packet-evidence-ledger.md`
- `docs/research/esper/README.md`
- `docs/research/esper/esper-evidence-ledger.md`
- `docs/research/esper/esper-manual-fill.md`
- `docs/analysis/canon-inventory-three-color-reference-audit.md`

# Codex Handoff - Apocrypha Gate 3 Information Architecture

## Agent Name

Codex

## Task Requested

Define Gate 3 registry-driven information architecture for Apocrypha without changing runtime files, rendering, visible copy, sources, or the registry data.

## Files Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `data/apocrypha-source-registry.json`
- `docs/research/apocrypha-gate02-source-registry.md`
- `docs/research/apocrypha-gate02a-registry-audit.md`
- `docs/handoffs/2026-07-25-1346-codex-apocrypha-gate02a-registry-audit.md`

## Files Changed

- `docs/research/apocrypha-gate03-information-architecture.md`
- `docs/handoffs/2026-07-25-1402-codex-apocrypha-gate03-information-architecture.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added the Gate 3 authoritative information architecture model.
- Finalized shelf hierarchy, shelf rules, subgroup rules, deterministic ordering, badge semantics, authority presentation, source card contract, reader flow, registry-to-rendering mapping, future rendering contract, and gap classifications.
- Kept the rendering contract inside the Gate 3 IA document so there is one authoritative architecture model.
- Documented that future shelf/source-family enum values must be added to the registry before Gate 5 renders them.

## Why It Changed

Gate 3 needed a registry-driven structure so Gate 5 can render Apocrypha as an evidence library rather than a hardcoded bibliography.

## Decisions Made

- Primary shelf order is Official Design, Worldbuilding & Lore, Rules & Card Records, Official Archives, Supplemental References.
- Badges are semantic only and derive from registry fields.
- Current registry schema v2 remains unchanged in this gate.
- Rules/card-record and archive shelves are architectural requirements but must not render until matching registry enum values and records exist.
- Supplemental records are navigation-only and must not visually or semantically compete with official evidence.
- No separate `apocrypha-rendering-contract.md` was created to avoid a second competing architecture source.
- Kanban files were not changed because the Gate 3 allowed-file list did not include them.

## Risks / Uncertainties

- Current registry has no rules/card-record or official-archive records yet.
- Current registry has unresolved official-source gaps and canonical URL disagreements from Gate 2A.
- Gate 5 must avoid rendering future shelf names until registry schema and records support them.
- All registry records remain pending online verification.

## Tests Run

- `node scripts/validate-apocrypha-sources.mjs`
- `npm.cmd run test:route-metadata`
- `git diff --check`

## Not Touched

- Original main worktree `C:\dev\voxmana.io`
- `apocrypha/index.html`
- Apocrypha CSS
- Apocrypha JavaScript
- Apocrypha rendering
- Visible Apocrypha copy
- Rendered source URLs
- `data/apocrypha-source-registry.json`
- Strategium files
- Archscry files or placement logic
- CRIT-001 files
- CRIT semantic data
- Generated files
- Package files
- Kanban files
- GitHub remote, push, or PR

## Follow-up Recommendations

- Gate 4 should perform the voice pass against the Gate 3 IA model without changing rendering.
- Before Gate 5 rendering, reconcile source gaps and update registry schema/records for any shelf that will actually render.
- Gate 5 should run the registry validator before rendering work and calculate counts from registry records.

## Next Suggested Agent

Documentation Steward / voice-focused writer for Gate 4 voice pass, with JSON Cartographer support if wording exposes source-authority assumptions.

## Related Kanban Card, Docs, Or Plans

- Related Gate 3 report: `docs/research/apocrypha-gate03-information-architecture.md`
- Related Gate 2A report: `docs/research/apocrypha-gate02a-registry-audit.md`
- Related Gate 2 report: `docs/research/apocrypha-gate02-source-registry.md`
- Related Kanban area: `VM-011 - Apocrypha Source Atlas and Source Bridge`

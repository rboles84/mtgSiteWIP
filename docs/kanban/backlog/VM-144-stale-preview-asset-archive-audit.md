# VM-144 - Stale Preview Asset Archive Audit

ID: VM-144
Title: Stale Preview Asset Archive Audit
Status: backlog
Type: Documentation / Tech Debt
Area: Frontend Assets, Archives
Priority: low
Created: 2026-05-26

## Summary

Verify suspected stale or preview-only frontend assets and references, then archive anything confirmed obsolete instead of deleting it.

## Source

- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`
- Candidate assets surfaced during the route audit, including `assets/css/archscry-atlas.css`, `assets/css/home-preview.css`, `assets/js/archscry-index2.js`, and related preview-route references.

## Acceptance Criteria

- Each candidate stale asset or reference is checked against live routes, validators, tests, docs, and any archive/preview history.
- Confirmed obsolete items are archived according to project rules, not permanently deleted.
- Any docs that point to removed or archived preview routes are updated to describe the current state.
- Live public routes, local-file route compatibility, and validators remain unchanged unless explicitly scoped.

## Non-Goals

- Do not remove files based only on filename suspicion.
- Do not redesign Archscry, Home, or preview route behavior.
- Do not change runtime route targets.

## Files Likely Impacted

- `docs/reference/manual-test-cases.md`
- `docs/design/asset-manifest.md`
- `docs/architecture/route-ownership-matrix.md`
- Confirmed archive destinations for stale preview assets

## Risks / Uncertainties

- Some preview assets may be retained as historical design archive material.
- The `archscry/index2.html` references may reflect removed preview work rather than a current missing route.

## Implementation Prompt

Audit suspected stale preview assets and references, prove whether each one is live, archived, or obsolete, then archive only the confirmed obsolete pieces with a clear handoff trail.

## Human Review

Yes - archival decisions should be reviewed before moving historical design material.

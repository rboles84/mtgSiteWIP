# VM-033 - Non-UI Presentation Snapshot Harness

ID: VM-033
Title: Non-UI Presentation Snapshot Harness
Status: done
Type: Testing / reporting / presentation audit
Area: Archscry, placement, Commander dossier, Maze
Priority: high
Created: 2026-05-17

## Summary

Add a narrow Node-only harness that replays fixed adaptive answer sets through the existing placement engine and dossier presenter, then writes deterministic presentation-facing JSON, CSV, and Markdown snapshots.

## Acceptance Criteria

- Fixed answer-set fixtures can be replayed without browser automation or manual UI clicking.
- The harness writes `artifacts/presentation-snapshots/presentation-snapshots.json` with a `schema_version` field.
- The harness writes a flat CSV with one row per case and the required analysis columns.
- The harness writes a human-readable Markdown summary for quick review.
- Raw adjacent labels are preserved exactly, with any pair-family grouping included only as debug metadata.
- The implementation reuses existing placement and dossier logic and does not rewrite scoring, adjacent presentation policy, or Maze discovery contracts.

## Scope Guardrails

- Do not add a UI page.
- Do not use browser automation.
- Do not rewrite placement scoring.
- Do not redesign adjacent-fit presentation behavior.
- Do not hand-edit generated artifacts.
- Extract only the smallest pure presentation helpers needed for deterministic non-UI snapshots.

## Testing Notes

- Run syntax checks for touched JS/MJS files.
- Run the snapshot generator.
- Run the focused snapshot validation test.
- Run `npm run test:placement`.
- Run `npm test`.
- Run `npm run dossier:audit` if dossier/presentation helpers are touched.

## Outcome

Complete.

The harness now replays a 16-case fixed-answer baseline, writes deterministic JSON/CSV/Markdown snapshots under `artifacts/presentation-snapshots/`, includes `schema_version: "presentation-snapshot-v1"`, preserves raw adjacent labels, and records debug-only pair-family grouping.

The baseline covers five mono golden paths, five mono boundary paths, four guild golden paths, and two college golden paths.

## Human Review

Yes - snapshot output should be inspected after generation to confirm it reflects dossier-facing user presentation rather than raw scorer internals only.

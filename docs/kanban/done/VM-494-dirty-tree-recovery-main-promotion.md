# VM-494 - Dirty Tree Recovery And Main Promotion

## Status

Complete

## Summary

Reconstruct the heavily dirty `codex/docs-cleanup` working tree into evidence-backed local commits, validate the resulting repository, and push the completed state to remote `main` for GitHub Pages / `voxmana.io` publishing.

## Scope

- Preserve accumulated VM-428 through VM-493 work without destructive cleanup.
- Reconcile every dirty path to handoff, Kanban, runtime, data, docs, artifact, or residual-dirt evidence.
- Commit coherent functional groups instead of one undifferentiated dirty-tree snapshot.
- Commit this VM-494 governance record last, after reconstructed implementation/artifact commits.
- Push the final committed HEAD to remote `main` with a normal non-force push.

## Acceptance Criteria

- Dirty-tree paths are committed or explicitly documented as residual dirt with reason and disposition.
- Targeted checks were run for functional commit groups where practical.
- Final validation included `npm.cmd run lint:js`, `npm.cmd run lint:html`, `npm.cmd run test:browser-smoke`, `npm.cmd test`, and `git diff --check`.
- `git status --short --branch` is captured in the VM-494 handoff before and after push.
- Remote `main` receives the committed state without force-push.

## Completion Notes

- Recovered VM-428 through VM-493 documentation, runtime, Maze/Scryfall, vendor, CI, and workbook artifact work into a local commit series.
- Added one VM-494 validation hygiene commit to prevent `npm.cmd test` from dirtying the tree with timestamp-only gate-bias report changes.
- Sanitized generated workbook artifacts so checked-in workbook/source evidence does not embed a local Downloads path.
- Final promotion uses a normal push from `codex/docs-cleanup` to remote `main`; no force-push or upstream setup.

## Not In Scope

- Live Supabase validation.
- Visual baseline refresh.
- External Scryfall data refresh.
- Package upgrades or lockfile regeneration solely to make validation pass.
- Rewriting prior commit history.

## Related Work

- VM-428 through VM-493 accumulated implementation, docs, research, QA, and artifact work.
- VM-447 / VM-467 CI and browser-smoke workflow setup.
- VM-471 through VM-490 Maze/Scryfall compiler, parser, browser, and follow-up repairs.

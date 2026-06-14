# VM-386 - Publish Gate Dossier Cleanup Bundle

ID: VM-386
Title: Publish Gate Dossier Cleanup Bundle
Status: done
Type: Release Hygiene / Git
Area: Gate Compression, Archscry Dossier, Repo Cleanup
Priority: high
Created: 2026-06-14

## Summary

Classify, verify, commit, push, and clean the dirty tree containing documented VM-382 through VM-385 Gate compression and Archscry dossier UX work.

## Scope

- Preserve documented VM-382 through VM-385 work.
- Exclude scratch `._rc*` and `._relic_*` files.
- Rebuild generated placement output through the approved builder before staging generated files.
- Run publish-readiness tests.
- Commit and push to `origin/feature/ui-refactor-exploration` without force.
- Confirm final `git status --short --branch` is clean and aligned.

## Out Of Scope

- No new Gate redesign beyond documented VM-382 through VM-385 work.
- No lore, commander fact, source-claim, Home route, Maze route, API, schema, alias, or hero expansion.
- No hand edits to generated placement output.
- No scratch-file staging.

## Acceptance Criteria

- Dirty tree classification is documented in the VM-386 handoff.
- Scratch files are removed or otherwise excluded from the final status.
- Required verification gates pass or any known exceptions are documented.
- Staged bundle contains only classified publishable files.
- Commit hash, push target, and final clean status are recorded.

## Completion Notes

- Published bundle commit: `f0f066d1bd1efc6c352d8ddfb097582747ebe3a8` (`Publish gate compression dossier cleanup`).
- Push target confirmed: `origin/feature/ui-refactor-exploration`.
- Post-push divergence check returned `0 0` against `origin/feature/ui-refactor-exploration`.
- Scratch files were removed before staging and did not enter the bundle.

## Validation Checklist

- [x] Preflight docs reviewed.
- [x] Dirty tree classified.
- [x] Generated outputs rebuilt.
- [x] Tests run.
- [x] Classified files staged.
- [x] Bundle committed.
- [x] Branch pushed.
- [x] Final clean status confirmed.

# VM-365 - Full Test Sweep HTML Report

ID: VM-365
Title: Full Test Sweep HTML Report
Status: done
Type: Testing / Documentation
Area: Test Coverage, QA, Release Hygiene
Priority: high
Created: 2026-06-12

## Summary

Run every finite automated test, validation, lint, audit, visual, and Lighthouse command currently available in the repo, continue through failures, and produce an HTML report with command-by-command results.

## Scope

- Run all finite `npm.cmd run test:*` scripts except `test:watch`.
- Run `npm.cmd test`.
- Run lint, audit, and source/generated validators.
- Run direct markdown validators not exposed through `package.json`.
- Capture stdout, stderr, exit code, duration, timeout status, changed paths, and final repo status.
- Write an HTML report under `docs/audits/`.
- Create the required handoff and update `docs/handoffs/HANDOFF_INDEX.md`.

## Out Of Scope

- Do not change runtime code to make tests pass.
- Do not edit generated JSON manually.
- Do not refresh Scryfall/network data.
- Do not run infinite watch mode as a blocking command.
- Do not alter VM-364 scope.

## Acceptance Criteria

- Every finite test-like command is listed as pass, fail, timeout, or skipped with reason.
- `test:watch` is listed as skipped because it is non-terminating and wraps `npm.cmd test`.
- HTML report exists and links command logs or embeds trimmed command output.
- Handoff records files reviewed, files changed, tests run, risks, and follow-up recommendations.
- Final response points to the HTML report.

## Validation Checklist

- [x] Preflight docs reviewed.
- [x] Test command inventory completed.
- [x] Full test sweep executed.
- [x] HTML report generated.
- [x] Handoff updated.
- [x] Final repo status captured.

## Completion Notes

- HTML report: `docs/audits/2026-06-12-vm365-full-test-sweep.html`
- JSON results and logs: `artifacts/test-reports/vm365-full-test-sweep/`
- Result: 27 finite commands passed, 1 finite command failed, 0 timed out, 1 non-terminating watch command skipped.
- Failure: `npm.cmd run test:lighthouse:home` exited 1 because Lighthouse Performance was 86 against the required 90 threshold; Accessibility was 96.

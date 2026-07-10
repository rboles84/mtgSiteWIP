# Browser Smoke CI Pilot

Date: 2026-07-03
Related card: VM-467
Status: Manual/on-demand hosted pilot selected; hard gate not approved yet

## Decision

Do not add `npm run test:browser-smoke` to the push/PR validation gate yet.

Instead, add a manual GitHub Actions workflow at `.github/workflows/browser-smoke.yml` that runs `npm run test:browser-smoke` on `workflow_dispatch`.

## Why

VM-448 proved the browser smoke locally in Chromium/Edge, but it has not been proven on a GitHub-hosted runner. The test launches a browser, serves the static site, stubs Supabase/Scryfall calls, and exercises the Home -> Archscry -> Maze -> Reading Finds -> Archscry loop. That is valuable enough to test in CI, but not stable enough to block every push until one or more hosted runs are observed green.

## Hard-Gate Criteria

Promote browser smoke into `.github/workflows/validation.yml` only after:

- a hosted manual `Vox Mana Browser Smoke Pilot` run is green on the current branch;
- any GitHub-hosted browser path, sandbox, or binary discovery issues are fixed or documented;
- runtime is acceptable for normal PR/push validation;
- failures produce enough signal for a developer to act without local reproduction guesswork.

## Current Hosted Status

Hosted status: not observed in this workspace.

Hard-gate status: no-go until a hosted green run exists.

If the manual workflow fails repeatedly for runner/browser discovery reasons while the local smoke remains green, keep the test manual and document it as hosted-unstable rather than weakening the deterministic validation gate.

## Validation

Local checks for this decision:

- `npm.cmd run test:browser-smoke`
- `npm.cmd run test:frontend-smoke`
- workflow file review for `workflow_dispatch` only

Hosted check after push:

- Dispatch `Vox Mana Browser Smoke Pilot`.
- Record run URL, commit SHA, status, duration, and any failure cause in this note or the VM-467 card.

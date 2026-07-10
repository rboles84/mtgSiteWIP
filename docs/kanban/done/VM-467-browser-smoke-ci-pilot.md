# VM-467 - Browser Smoke CI Pilot

ID: VM-467
Title: Browser Smoke CI Pilot
Status: Complete
Type: QA / CI Decision
Area: GitHub Actions, Browser Smoke
Priority: High
Created: 2026-07-03
Completed: 2026-07-03

## Summary

Selected manual/on-demand hosted browser-smoke workflow first, rather than adding `npm run test:browser-smoke` to the push/PR hard gate immediately.

## Outcome

- Added `.github/workflows/browser-smoke.yml`.
- The workflow runs only on `workflow_dispatch`.
- Existing deterministic validation workflow remains unchanged as the push/PR gate.
- Hosted browser smoke is not a hard gate until a manual GitHub-hosted run is observed green.

## Acceptance Criteria

- [x] CI decision is documented.
- [x] Workflow behavior reflects the decision.
- [x] Hosted-run status is recorded as not observed / no-go for hard gate.
- [x] QA notes explain when the smoke can become blocking.

## Validation

- `npm.cmd run test:browser-smoke` - passed for desktop and mobile.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run lint:js` - passed.

## Related Work

- `.github/workflows/browser-smoke.yml`
- `docs/qa/2026-07-03-browser-smoke-ci-pilot.md`
- VM-447
- VM-448

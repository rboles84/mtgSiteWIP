# VM-427 - Repo Scan, Test Sweep, And Main Promotion

## Status

Done

## Summary

Scanned the accumulated VM-420 through VM-426 working tree, fetched `origin/main`, ran the local validation suite, applied one small Lighthouse/LCP markup hint, documented remaining waiver classes, and prepared the bundle for normal promotion to `main`.

## Collision Scan

- `VM-427` had no active local repo use except the VM-426 note that it was unused during that task's collision scan.
- `VM-428` remains unused except the same VM-426 note.
- `VM-427` was selected for this release-sweep wrapper.

## What Changed

- Added `decoding="async"` and `fetchpriority="high"` to shared topbar logo images on public routes after Lighthouse identified the logo as the Home LCP candidate.
- Preserved the chosen Home gateway background art; no visual asset swap or baseline refresh was made.
- Regenerated current Gate compression and Lighthouse audit artifacts through normal test commands.
- Recorded the pre-push scan and waiver state for the VM-420 through VM-426 bundle.

## Verification

- PASS `git fetch origin main`; `HEAD` and `origin/main` matched before the pending bundle.
- PASS `git diff --check` after generated Lighthouse whitespace cleanup, with LF-to-CRLF warnings only.
- PASS credential-shaped secret scan; broad first pass produced false positives from lore/docs/env-var names only.
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run test:frontend-smoke`
- PASS `npm.cmd test`
- PASS `npm.cmd run test:deck-links`
- PASS `npm.cmd run test:maze-finds`
- PASS `npm.cmd run test:maze-scratchpad`
- PASS `npm.cmd run test:parser`
- PASS `npm.cmd run test:builder`
- PASS `npm.cmd run test:placement`
- PASS `npm.cmd run test:mode`
- PASS `npm.cmd run test:syntax`
- PASS `npm.cmd run test:presentation-snapshots`
- PASS `npm.cmd run validate:source-generated` / `test:source-generated` with the existing JESKAI/MARDU model-owned warnings.
- PASS `npm.cmd run dossier:audit`: 0 failures, 113 warnings.
- PASS `npm.cmd run test:faction-context-isolation`
- PASS `npm.cmd run test:bias`
- PASS `npm.cmd run test:bias:all`
- PASS `npm.cmd run test:gate-compression`
- PASS `npm.cmd run test:gate-live-bias`

## Waivers / Not Run

- `npm.cmd run test:lighthouse:home` completed but failed the hard threshold with Performance 87 and Accessibility 96. This remains the existing Home performance waiver class; the report is current.
- Visual compares were not refreshed. Home, Apocrypha, Strategium, and now Archscry fail against stale baselines after accepted route/topbar/dossier changes.
- `npm.cmd run test:deck-links:live` was not run because `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and VM-422 test-user env vars were absent.

## Not Touched

- Visual baselines.
- Generated faction/precon source data.
- MTG lore, card facts, commander facts, or placement scoring.
- Live Supabase schema or RLS state.
- Local `main` branch checkout/reset/history.

## Follow-Up Recommendations

- Run VM-422 live Supabase RLS/account QA when service-role and two test-user credentials are available.
- Open a dedicated visual baseline acceptance card if the owner accepts the VM-422/423/424/426 route drift.
- Treat Home background image compression as a separate visual/performance card; the smaller existing gateway asset is a different composition.

## Related Work

- VM-420
- VM-422
- VM-423
- VM-424
- VM-405
- VM-426

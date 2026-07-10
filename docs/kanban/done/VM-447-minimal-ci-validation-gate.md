# VM-447 - Minimal CI Validation Gate

ID: VM-447
Title: Minimal CI Validation Gate
Status: Complete
Type: CI / Validation / Release Readiness
Area: GitHub Actions, Tests, Static Site
Priority: High
Created: 2026-06-30
Completed: 2026-06-30

## Summary

Add a no-secret GitHub Actions validation workflow that runs the repo's deterministic static and local checks. This should reduce future drift without requiring live Supabase credentials, visual baseline acceptance, Lighthouse, or external data downloads.

## Pre-Flight Carry-Forward

- VM-430 and VM-429 both identified absent CI as a release-readiness gap.
- VM-443 added `npm.cmd run test:copy-boundaries` for product-boundary copy drift.
- VM-446 is blocked on live Supabase owner/non-owner/service-role credentials; live RLS checks must not run in no-secret CI.
- The repo has `package-lock.json`, so GitHub Actions can use `npm ci`.
- Existing `test:frontend-smoke` is a static route/contract smoke and does not require a browser or secrets.

## Scope

- Add `.github/workflows/validation.yml`.
- Use existing package scripts only.
- Run local deterministic checks for HTML/JS lint, source/generated guardrails, parser, placement, Maze finds, deck-links local contract, copy-boundaries, and frontend smoke.
- Keep live Supabase, visual regression, Lighthouse, Scryfall downloads, and baseline refreshes out of this workflow.

## Explicit Non-Goals

- No live Supabase/RLS verification.
- No service-role secrets or GitHub secrets.
- No visual baseline refresh.
- No Lighthouse/performance gate.
- No runtime behavior changes.

## Acceptance Criteria

- [x] `.github/workflows/validation.yml` exists.
- [x] Workflow runs on pull requests, pushes to `main`, and manual dispatch.
- [x] Workflow uses `npm ci` and existing npm scripts.
- [x] Workflow includes `lint:html`, `lint:js`, `validate:source-generated`, `test:parser`, `test:placement`, `test:maze-finds`, `test:deck-links`, `test:copy-boundaries`, and `test:frontend-smoke`.
- [x] Workflow excludes `test:deck-links:live`, visual baseline tests, Lighthouse, and Scryfall download/index refresh.
- [x] The same command set passes locally or any failure is documented with exact output.

## Validation

- Local script runs for the workflow command set.
- `rg "test:deck-links:live|test:visual|lighthouse|scryfall:download|scryfall:refresh" .github/workflows/validation.yml` should have no matches.
- `git diff --check`

## Related Work

- `VM-430` - Vox Mana Comprehensive QA Test Plan
- `VM-443` - Copy Boundary Regression Guardrail
- `VM-446` - VM-422 Live Private Deck-Link RLS Proof

## Closeout

Added `.github/workflows/validation.yml` with a no-secret deterministic validation job using existing npm scripts only. Local command parity passed. GitHub-hosted execution remains unproven until the workflow is pushed and run.

## Tests Run

- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run validate:source-generated` - passed with existing warning-only JESKAI/MARDU inhibitor notes.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `npm.cmd run test:placement` - passed, 37 factions and 37 golden paths.
- `npm.cmd run test:maze-finds` - passed.
- `npm.cmd run test:deck-links` - passed.
- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- Workflow exclusion scan for live Supabase, visual, Lighthouse, and Scryfall refresh commands - no matches.

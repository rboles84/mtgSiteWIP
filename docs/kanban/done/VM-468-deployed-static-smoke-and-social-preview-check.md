# VM-468 - Deployed Static Smoke And Social Preview Check

ID: VM-468
Title: Deployed Static Smoke And Social Preview Check
Status: Complete - deployment metadata hold recorded
Type: QA / Deployment
Area: GitHub Pages, Metadata, Public Routes
Priority: High
Created: 2026-07-03
Completed: 2026-07-03

## Summary

Checked deployed `https://voxmana.io/` public routes in the browser. Routes loaded without critical console errors or broken rendered images, but deployed social/canonical metadata is stale compared with local VM-451 metadata.

## Outcome

- Home, Archscry, Maze, Strategium, Apocrypha, Library alias, Privacy, and Terms loaded.
- Browser console produced no observed error/warning logs for the visited deployed routes.
- Rendered image checks found no broken loaded images.
- `/library/` resolved to `https://voxmana.io/apocrypha/`.
- Deployed Home, Archscry, Maze, Strategium, Privacy, and Terms were missing route description, canonical, Open Graph, and Twitter tags.
- Deployed Apocrypha had an old description but lacked canonical, OG, and Twitter tags.
- Cache-busted deployed checks still showed stale metadata.
- Local `npm.cmd run test:route-metadata` passed, so the issue is current deployment drift/staleness rather than missing local route-head metadata.

## Acceptance Criteria

- [x] Deployed public route checks are documented under `docs/qa/`.
- [x] Critical console/network errors are absent or recorded.
- [x] `/library/` alias behavior is recorded.
- [ ] Deployed social previews are acceptable.

## Decision

Public route-load smoke: pass.

Social preview status: no-go until the local VM-451 metadata is deployed and rechecked on `voxmana.io`.

## Validation

- Manual deployed browser smoke of `https://voxmana.io/` routes.
- `npm.cmd run test:route-metadata` - passed locally for 8 public route heads.
- `npm.cmd run lint:html` - passed.

## Related Work

- `docs/qa/2026-07-03-deployed-static-smoke-social-preview-check.md`
- VM-451
- VM-452

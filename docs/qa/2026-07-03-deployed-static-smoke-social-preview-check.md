# Deployed Static Smoke And Social Preview Check

Date: 2026-07-03
Related card: VM-468
Status: Deployed route load pass; social preview metadata hold

## Summary

The current deployed `https://voxmana.io/` routes loaded in the browser without critical console errors or broken rendered images during this check. However, the deployed HTML does not include the VM-451 local canonical/Open Graph/Twitter metadata on most routes. The deployed social-preview state is therefore not acceptable for sharing until the current local metadata work is deployed and rechecked.

## Routes Checked

| Route | Requested URL | Final URL | Load / Console | Metadata Result |
|---|---|---|---|---|
| Home | `https://voxmana.io/` | `https://voxmana.io/` | No console errors observed | Missing description, canonical, OG, and Twitter tags on deployed HTML |
| Archscry | `https://voxmana.io/archscry/` | `https://voxmana.io/archscry/` | No console errors observed | Missing description, canonical, OG, and Twitter tags on deployed HTML |
| Maze | `https://voxmana.io/maze/` | `https://voxmana.io/maze/` | No console errors observed | Missing description, canonical, OG, and Twitter tags on deployed HTML |
| Strategium | `https://voxmana.io/strategium/` | `https://voxmana.io/strategium/` | No console errors observed | Missing description, canonical, OG, and Twitter tags on deployed HTML |
| Apocrypha | `https://voxmana.io/apocrypha/` | `https://voxmana.io/apocrypha/` | No console errors observed | Has old description only; missing canonical, OG, and Twitter tags on deployed HTML |
| Library alias | `https://voxmana.io/library/` | `https://voxmana.io/apocrypha/` | No console errors observed | Alias resolves to Apocrypha; deployed metadata is still stale |
| Privacy | `https://voxmana.io/privacy/` | `https://voxmana.io/privacy/` | No console errors observed | Missing description, canonical, OG, and Twitter tags on deployed HTML |
| Terms | `https://voxmana.io/terms/` | `https://voxmana.io/terms/` | No console errors observed | Missing description, canonical, OG, and Twitter tags on deployed HTML |

## Evidence Notes

- Browser check reported no error/warning console logs for the visited routes.
- Rendered critical image checks found no broken loaded images in the visited pages.
- Cache-busted checks on Home, Archscry, and Apocrypha still showed missing deployed metadata.
- Local files already include route descriptions, canonical URLs, Open Graph tags, and Twitter tags from VM-451.
- This looks like deployment drift or a stale public deploy, not a local metadata implementation gap.

## Decision

Public route-load status: pass for this smoke.

Social preview status: no-go until redeployed local metadata is visible on `voxmana.io`.

Do not use deployed social previews as portfolio/demo evidence until a follow-up check confirms:

- `link[rel="canonical"]` is present on all public routes;
- `meta[name="description"]` is route-specific;
- `og:title`, `og:description`, `og:url`, and `og:image` are present;
- `twitter:card` and route Twitter description tags are present;
- `/library/` continues to resolve or canonicalize to Apocrypha as intended.

## Validation

Local validation to keep using:

- `npm.cmd run test:route-metadata`

Deployed validation after next push/deploy:

- Reopen all checked URLs on `https://voxmana.io/`.
- Re-run browser console and metadata checks.
- Optionally test one share URL through a social preview debugger after crawler caches refresh.

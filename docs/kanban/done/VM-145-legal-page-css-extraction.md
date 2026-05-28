# VM-145 - Legal Page CSS Extraction

ID: VM-145
Title: Legal Page CSS Extraction
Status: done
Type: Frontend / Documentation Shell
Area: Privacy, Terms, CSS Architecture
Priority: low
Created: 2026-05-26
Completed: 2026-05-27

## Summary

Extract the remaining inline legal-page CSS into a scoped route stylesheet while preserving legal copy, shared topbar behavior, and current local-file-safe navigation.

## Source

- `docs/architecture/route-ownership-matrix.md`
- `privacy/index.html`
- `terms/index.html`
- `scripts/validate-frontend-html.mjs`

## Acceptance Criteria

- `privacy/index.html` and `terms/index.html` no longer carry large inline `<style>` blocks.
- Extracted legal CSS is route-scoped and loaded after shared CSS in a predictable order.
- Legal page copy, glossary spans, atmosphere canvas, topbar links, and local-file-safe relative routes are unchanged.
- `npm.cmd run lint:html` and `npm.cmd run test:frontend-smoke` pass.

## Completion Notes

- Confirmed the inline CSS blocks in `privacy/index.html` and `terms/index.html` were identical before extraction.
- Lifted the shared legal-page CSS verbatim into `assets/css/legal.css`.
- Replaced both inline `<style>` blocks with `../assets/css/legal.css` loaded after `components.css`.
- Added legal-page-specific validator coverage requiring `legal.css` as the last stylesheet and rejecting inline `<style>` blocks on only the two legal pages.
- Updated the route ownership docs to reference `assets/css/legal.css` instead of inline legal CSS.

## Tests Run

- `npm.cmd run lint:html`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Headless browser visual QA for Privacy and Terms at desktop `1365x1000` and mobile `390x900`

## Non-Goals Preserved

- Legal copy was not changed.
- Page structure, topbar markup, route links, background shell, glossary spans, and script tags were not changed.
- Shared CSS architecture and CDN/font dependency review were not reopened.

## Human Review

Yes - legal copy should be visually checked after extraction.

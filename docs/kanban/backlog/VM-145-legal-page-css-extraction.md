# VM-145 - Legal Page CSS Extraction

ID: VM-145
Title: Legal Page CSS Extraction
Status: backlog
Type: Frontend / Documentation Shell
Area: Privacy, Terms, CSS Architecture
Priority: low
Created: 2026-05-26

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

## Non-Goals

- Do not rewrite legal language.
- Do not redesign the legal pages.
- Do not change shared topbar or shared component CSS unless explicitly scoped.

## Files Likely Impacted

- `privacy/index.html`
- `terms/index.html`
- A new or existing legal route stylesheet under `assets/css/`
- `scripts/validate-frontend-html.mjs` only if validation rules need a scoped update

## Risks / Uncertainties

- Legal pages currently use inline CSS as a contained exception; extraction should not broaden into shared CSS refactoring.
- Glossary and service wording must stay consistent with actual runtime behavior.

## Implementation Prompt

Extract only the legal-page styling into a scoped stylesheet and preserve behavior, text, route links, and shared shell semantics.

## Human Review

Yes - legal copy should be visually checked after extraction.

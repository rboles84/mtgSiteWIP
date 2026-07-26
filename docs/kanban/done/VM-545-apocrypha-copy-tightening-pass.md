# VM-545 - Apocrypha Copy Tightening Pass

ID: VM-545
Title: Apocrypha Copy Tightening Pass
Status: done
Type: Editorial
Area: Apocrypha
Priority: medium
Created: 2026-07-25
Completed: 2026-07-25
Updated: 2026-07-25

## Summary

Tightened Apocrypha source-library copy to reduce repeated card and shelf language while preserving all authority boundaries, registry metadata, source counts, grouping, source ordering, badges, verification status, and legal disclaimers.

## Scope

- Copy-only edits.
- Preserved source registry metadata, source records, shelf names, counts, grouping, source ordering, badges, verification status, and external-link safety.
- Did not change CSS, navigation, component hierarchy, registry logic, rendering behavior, or accessibility labels.

## Acceptance Criteria

- Redundant visible Evidence Role body copy is removed when badges already communicate the role.
- Card `usedFor` copy is shorter and specific.
- Card `notFor` boundaries remain visible and legally/epistemically strong.
- Shelf introductions are shorter and easier to scan.
- Official, supplemental, archive, link-check, and rules/card-record boundaries remain explicit.
- Static fallback and runtime-rendered copy stay aligned.

## Testing Notes

- PASS `node --check assets/js/apocrypha.js`
- PASS `node --check scripts/validate-apocrypha-rendering.mjs`
- PASS `node --check scripts/validate-apocrypha-sources.mjs`
- PASS `node scripts/validate-apocrypha-sources.mjs`
- PASS `node scripts/validate-apocrypha-rendering.mjs`
- PASS `node scripts/validate-apocrypha-rendering.mjs --write-fallback`
- PASS `npm.cmd run test:route-metadata`
- PASS `git diff --check` with LF-to-CRLF warnings only
- PASS old-label scan found no `Evidence role:`, `Used for:`, `Does not support:`, or `Not proving:` strings in rendered/runtime/generator copy.
- PASS manual-QA follow-up fix: opening a lower source shelf now preserves the shelf header position instead of dropping the reader toward the page bottom when the taller shelf above collapses.

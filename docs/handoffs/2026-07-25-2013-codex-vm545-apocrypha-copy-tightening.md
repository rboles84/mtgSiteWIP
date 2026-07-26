# 2026-07-25 20:13 - Codex - VM-545 Apocrypha Copy Tightening

## Agent Name

Codex

## Task Requested

Perform a production-quality copy tightening pass on the publicly deployed Apocrypha source library, reducing redundant visible copy while preserving source authority boundaries, metadata, counts, badges, grouping, source ordering, legal disclaimers, registry behavior, and rendering behavior.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
- `docs/handoffs/2026-07-25-1412-codex-apocrypha-gate04-voice-contract.md`
- `docs/handoffs/2026-07-25-1525-codex-apocrypha-gate05-static-rendering.md`
- `docs/handoffs/2026-07-25-1626-codex-apocrypha-gate07-publish-readiness.md`
- `docs/research/apocrypha-gate04-voice-copy-contract.md`
- `apocrypha/index.html`
- `assets/js/apocrypha.js`
- `data/apocrypha-source-registry.json`
- `scripts/validate-apocrypha-rendering.mjs`
- `scripts/validate-apocrypha-sources.mjs`

## Files Changed

- `apocrypha/index.html`
- `assets/js/apocrypha.js`
- `data/apocrypha-source-registry.json`
- `scripts/validate-apocrypha-rendering.mjs`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-545-apocrypha-copy-tightening-pass.md`
- `docs/handoffs/2026-07-25-2013-codex-vm545-apocrypha-copy-tightening.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Removed the repeated visible `Evidence role:` paragraph from source cards while preserving `data-evidence-role`, evidence-role validation, and badges.
- Changed source-card labels from `Used for:` / `Does not support:` to `Supports:` / `Not for:`.
- Shortened shelf introductions and changed shelf boundary labels from `Not proving:` to `Not for:`.
- Tightened registry `usedFor` and `notFor` copy for rendered sources while preserving all source records, metadata, source ordering, counts, groups, subgroups, badges, tags, verification state, URLs, and external-link safety.
- Regenerated the static no-JavaScript Apocrypha fallback from the registry so fallback and runtime rendering remain aligned.
- Added a manual-QA follow-up fix for source-shelf expansion so opening a lower shelf preserves the clicked shelf header's viewport position while the taller shelf above collapses.
- Bumped the Apocrypha JS cache-buster from `20260725g5` to `20260725g6` after the shelf-scroll fix.
- Recorded and completed VM-545 in the Kanban board.

## Why It Changed

The public Apocrypha page repeated authority and boundary concepts at several hierarchy levels. The tightening pass reduces card-level repetition and scrolling while preserving the core source-authority model: source cards still say what each source supports, what it cannot support, and whether official/supplemental/link-check authority applies.

## Decisions Made

- Kept supplemental `usedFor` copy explicitly saying it does not carry official claims because `scripts/validate-apocrypha-sources.mjs` requires that guardrail.
- Kept `notFor` visible on every source card because the authority boundary is central to Apocrypha.
- Fixed the shelf jump in JavaScript instead of changing shelf markup, CSS, hierarchy, or native details semantics.
- Left the registry schema, rendering architecture, shelf names, source ordering, counts, badges, accessibility labels, CSS, and navigation untouched.
- Did not update the Gate 4 copy contract because this was a production copy tightening pass after Gate 7, not a change to the historical Gate 4 approval record.

## Risks / Uncertainties

- Browser visual QA was not rerun; the change is copy-only but may reduce card height and scrolling.
- Manual retest is recommended for the shelf-expansion jump because the fix targets browser scroll behavior.
- LF-to-CRLF working-copy warnings appeared during Git checks, matching existing repository behavior.
- Supplemental cards retain a compact repeated official-claims boundary to satisfy source-authority validation.

## Tests Run

- PASS `node --check assets/js/apocrypha.js`
- PASS `node --check scripts/validate-apocrypha-rendering.mjs`
- PASS `node --check scripts/validate-apocrypha-sources.mjs`
- PASS `node scripts/validate-apocrypha-sources.mjs`
- PASS `node scripts/validate-apocrypha-rendering.mjs`
- PASS `node scripts/validate-apocrypha-rendering.mjs --write-fallback`
- PASS `npm.cmd run test:route-metadata`
- PASS `git diff --check` with LF-to-CRLF warnings only
- PASS old-label scan found no `Evidence role:`, `Used for:`, `Does not support:`, or `Not proving:` strings in rendered/runtime/generator copy.
- PASS manual-QA follow-up validation: `node --check assets/js/apocrypha.js`, `node scripts/validate-apocrypha-rendering.mjs`, `node scripts/validate-apocrypha-sources.mjs`, and `git diff --check` with LF-to-CRLF warnings only.
- PASS post-cache-buster validation: `node --check assets/js/apocrypha.js`, `node --check scripts/validate-apocrypha-rendering.mjs`, `node scripts/validate-apocrypha-rendering.mjs`, `node scripts/validate-apocrypha-sources.mjs`, `npm.cmd run test:route-metadata`, and `git diff --check` with LF-to-CRLF warnings only.

## Not Touched

- CSS
- Navigation
- Component hierarchy
- Shelf names
- Registry schema
- Registry source counts
- Registry grouping, ordering, or source logic
- Publisher, author, publication date, tags, verification status, authority classification, evidence-role data, URLs, badges, or accessibility labels
- Source validation policy
- Rules & Card Records suppression behavior
- Strategium, Archscry, Maze, Home, CRIT semantic data, generated identity files, package files, deployment, push, or PR

## Follow-Up Recommendations

- Optional browser spot-check of `/apocrypha/` at desktop and mobile widths to confirm the shorter copy improves scanability without layout surprises.
- Keep future Apocrypha copy changes registry-driven where possible so static fallback and runtime rendering stay aligned.

## Next Suggested Agent

Browser QA agent only if the owner wants a visual spot-check after copy compression.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-545-apocrypha-copy-tightening-pass.md`
- `docs/research/apocrypha-gate04-voice-copy-contract.md`
- `docs/research/apocrypha-gate05-registry-rendering.md`
- `docs/research/apocrypha-gate07-publish-readiness.md`

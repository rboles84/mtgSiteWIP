# VM-062 - Expression Schema Tuning Pass

ID: VM-062
Status: Done
Type: Documentation
Priority: High
Owner: Codex

## Summary

Completed a repo-bound audit-and-fix pass over 15 expression-level faction targets:

- 10 Ravnica guilds
- 5 Strixhaven schools
- 30 `identity.md` / `metaphysics.md` files total

Used `docs/reference/identity-metaphysics-markdown-schema.md` as structural authority only. Confirmed file presence, H1/H2 order, optional-section handling, evidence boundaries, support framing, and guild/school drift guardrails.

## What Changed

- Created the missing `docs/architecture/colors/prismari/metaphysics.md`.
- Normalized boundary/support language in the older Azorius, Dimir, Gruul, Izzet, Rakdos, Selesnya, Quandrix, and Witherbloom drafts where support framing or relationship framing was inconsistent.
- Added explicit placement-calibration framing to relationship sections that previously implied the distinction without stating it.
- Preserved structurally sound files without rewriting them.

## Validation

- All 15 targets now have both `identity.md` and `metaphysics.md`.
- All 30 target files pass H1/H2 schema order validation.
- Required support phrase scan passes across all 30 target files.
- Boundary-language scan passes for `Vox Mana synthesis`, `compression-only`, `not MTG canon`, `internal architecture`, and `placement-calibration contrasts`.
- `node research/validate-mono-color-markdown.mjs`: PASS.
- ASCII scan on VM-062-changed files: PASS.
- `git diff --check`: PASS for VM-062 scope, with only the existing `board.md` line-ending warning.
- Scoped status check separated VM-062 work from the broader pre-existing dirty/untracked repo state.

## Decisions

- Used `VM-062` because `VM-061` is the latest unique completed coordination ID and current repo state already shows `VM-044` and `VM-049` collisions.
- Treated the mono-color schema doc as structural authority only, not content authority.
- Kept guild/school relationship language as placement-calibration architecture, not canon inter-faction doctrine.
- Used approved raw faction packages and existing repo canon research as evidence authority; prior handoffs/cards remained summary aids only.

## Not Touched

- Runtime, build, placement, and UI logic
- Raw JSON
- Generated artifacts
- Mono-color files
- Unrelated faction/school docs

## Follow-Up

- If the team wants stronger automated QA, add a guild/school-aware validator instead of relying on the mono-color validator as a regression-only check.
- Existing repo coordination collisions (`VM-044`, `VM-049`) remain historical state; this pass avoided extending them.

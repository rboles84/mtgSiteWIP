# Agent Handoff - VM-486 Robboles Recurring Ideas

Agent name: Codex
Task requested: Mine candidate recurring ideas from the Vox Mana vault for the robboles.com voice engine, with evidence-backed, field-safe, transferable QA/systems convictions.
Related Kanban card: VM-486
Status: Complete

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/audits/2026-06-30-vox-mana-voice-audit.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`
- `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`
- `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`
- `docs/strategy/2026-07-03-external-reviewer-two-week-test.md`
- Relevant recent handoff summaries from VM-422, VM-427 through VM-485 via index/board context.

## Pre-Flight Summary

Recent related work repeatedly emphasizes source authority, release-readiness caveats, copy/product boundaries, live-proof requirements, visual waivers, and deterministic validation. The most relevant recent artifacts are VM-428 deep audit, VM-429/459/460 self-snapshots, VM-430 QA plan, VM-439 voice audit, VM-447/467 CI and browser-smoke work, VM-450 visual waivers, VM-452 public demo/case study, VM-458/461/470 account scope deferral, and VM-471 through VM-485 Maze/compiler test-hardening work.

Current known risks include stale or superseded docs, visual baselines that remain waiver-governed, account-backed deck-link behavior that is intentionally deferred until live RLS proof passes, and the possibility of over-reading repeated product-specific Vox Mana language as transferable blog convictions.

Relevant decisions already made: the repo is authority over external vault memory; generated/runtime artifacts are not source evidence; account/community/deckbuilder-like surfaces stay deferred until explicit proof and owner approval; copy should not overclaim source, AI, recommendation, legality, or privacy behavior.

Files recently changed by related work include audit docs, QA docs, route metadata/copy-boundary docs, source guardrails, Kanban cards, handoffs, and recent Maze/compiler test docs. Runtime code and generated data should not be touched for this task.

## Files Changed

- `docs/strategy/2026-07-09-robboles-recurring-idea-candidates.md`
- `docs/kanban/done/VM-486-robboles-recurring-idea-candidates.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-07-09-1923-codex-vm486-robboles-recurring-ideas.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a self-contained Phase 1 recurring-idea candidate document for robboles.com.
- Ranked eight evidence-backed candidate through-lines.
- Added post-seed and considered/cut transparency sections.
- Added a completed Kanban card and handoff entry.

## Why It Changed

The user requested a tight, paste-ready voice-engine artifact grounded in the Vox Mana vault, with explicit recurrence evidence and no invented convictions.

## Decisions Made

- Treated broad repeated vault patterns as stronger than clever one-off phrases.
- Generalized away from MTG/product vocabulary unless it was needed as evidence.
- Kept "Scope Is A Quality Tool" and "Boundaries Build Trust" separate because one is governance/internal and the other is user-facing trust, even though they overlap.
- Ranked AI as medium-high rather than high because it is strongly demonstrated but less often named directly as a standalone principle.

## Risks / Uncertainties

- Frequency counts are rough text-search signals, not formal corpus analysis.
- The external blog-side repo was not available here, so blog-fit references are based on the user's supplied lanes and known through-lines.
- Some candidates intentionally overlap; final selection should pick 2-3 durable names and demote nearby variants into post seeds.

## Tests Run

- No runtime tests were run; this was a docs/analysis task.
- Ran targeted `rg` searches across docs and reviewed the resulting source files.
- Ran `Get-Date -Format "yyyy-MM-dd-HHmm"` for handoff timestamping.

## Not Touched

- Runtime application code.
- Generated JSON/data.
- MTG lore, card, commander, or precon facts.
- Supabase SQL/live state.
- Visual baselines.
- Existing audit artifacts other than adding this new adjacent strategy artifact and traceability docs.

## Follow-Up Recommendations

- Pick 2-3 recurring ideas to become named robboles.com through-lines.
- Move the remaining candidates into the blog backlog as post seeds.
- In Phase 2, cross-check against actual robboles.com posts/notes to confirm which names already sound like Robert's public voice.

## Next Suggested Agent

Documentation Steward or Planning Architect for Phase 2 blog-side synthesis.

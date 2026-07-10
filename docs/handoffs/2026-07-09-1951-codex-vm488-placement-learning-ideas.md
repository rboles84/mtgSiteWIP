# Agent Handoff - VM-488 Placement Learning Ideas

Agent name: Codex
Task requested: Mine more recurring ideas from Vox Mana's research, placement logic, and learning surfaces for the robboles.com voice engine.
Related Kanban card: VM-488
Status: Complete

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/strategy/2026-07-09-robboles-recurring-idea-candidates.md`
- `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`
- `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`
- `docs/architecture/placement-domains.md`
- `docs/architecture/identity-layer1-coverage-and-wubrg-plan.md`
- `assets/js/adaptive-placement.js`
- `assets/js/strategium.js`
- `research/maze-query-core.js`
- `research/scryfall-grounded-compiler.js`
- `data/placement/gate-compression.source.json`
- `docs/research/wubrg/wubrg-depth-readiness-matrix.md`
- `docs/research/colorless/colorless-layer2-gap-analysis.md`
- `docs/research/glint/glint-reliability-audit.md`
- `docs/research/mardu/mardu-reliability-audit.md`

## Pre-Flight Summary

Recent related work includes VM-486, which produced the first recurring-idea candidate document from broad vault governance and QA evidence. The new request narrows the evidence lens toward research, placement, and learning logic. Current board context also shows VM-487 in flight for Maze/Scryfall checklist follow-up, so this task avoided runtime and active parser/compiler work.

Current known risks include a dirty worktree with many unrelated modified/untracked files, active VM-487 work, and the chance of over-weighting product-domain language. Transferable ideas were generalized away from MTG specifics.

Relevant decisions already made: Loom v0/v1 split is approved; first Loom v1 slice should be text-first Explorer Mode; no graph canvas, PACKAGE mode, placement weighting, Commander Finder, runtime GenAI, or custom card generation is approved for the first slice. Placement domains remain future architecture, not a second live placement system.

Files recently changed by related work include VM-486 docs, board/index traceability, and active VM-487 board/card state. Do not touch VM-487 implementation or generated data from this task.

## Files Changed

- `docs/strategy/2026-07-09-robboles-recurring-idea-candidates-placement-learning.md`
- `docs/kanban/done/VM-488-robboles-placement-learning-recurring-ideas.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-07-09-1951-codex-vm488-placement-learning-ideas.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a supplemental recurring-idea candidate document focused on placement, research, and learning logic.
- Added nine ranked candidates plus post-seed and considered/cut sections.
- Added VM-488 Kanban and handoff traceability.

## Why It Changed

The user asked for the same type of analysis as VM-486, but using research, placement logic, and learning surfaces to surface more recurring ideas.

## Decisions Made

- Kept the supplement separate from the original VM-486 document for clean provenance.
- Ranked "Translation Is The Work," "Teach The Model, Not Just The Answer," "Near Misses Matter," and "Evidence Has Altitude" highest because they recur across both logic and docs.
- Treated Loom graph-first ideas as cut or post seeds because the vault explicitly defers graph work until semantics are stable.

## Risks / Uncertainties

- Frequency counts are rough `rg` signals, not formal corpus analysis.
- Some candidates overlap with VM-486 principles, especially scope and evidence, but the supplement frames them through placement/learning behavior.
- External robboles.com repo evidence was not available in this workspace.

## Tests Run

- No runtime tests were run; this was docs/analysis only.
- Ran targeted `rg`, `Select-String`, and `Get-Content` review passes across relevant docs/code.
- Ran `Get-Date -Format "yyyy-MM-dd-HHmm"` for handoff timestamping.

## Not Touched

- Runtime application code.
- Generated JSON/data.
- Research/source facts.
- MTG lore, card, commander, precon, or rules claims.
- Supabase SQL/live state.
- Visual baselines.
- Active VM-487 runtime/parser/compiler work.

## Follow-Up Recommendations

- Merge VM-486 and VM-488 into a single shortlist of 3-5 durable robboles.com through-lines.
- Promote the rest into post seeds, especially "Evidence Has Altitude," "Near Misses Matter," and "Social Systems Are Interfaces."
- Cross-check names against existing blog-side voice before final naming.

## Next Suggested Agent

Documentation Steward or Planning Architect for Phase 2 synthesis across both candidate documents.

# VM-420 - Docs Bloat Audit And Evidence-Preserving Consolidation

ID: VM-420
Status: done
Owner: Codex
Created: 2026-06-24
Closed: 2026-06-24
Related: VM-417 reserved note, VM-170, VM-394, VM-418, VM-419

## Summary

Audit the tracked documentation footprint, classify duplicate/archive candidates, and consolidate only provable duplicate or stale non-authoritative documentation with a manifest trail.

VM-420 is the chosen VM number because `VM-417` is referenced as potentially reserved and `VM-418`/`VM-419` are already closed.

## Guardrails

- Do not rewrite Git history, force-push, or remove historical evidence from prior commits.
- Do not compact `docs/handoffs/` or `docs/kanban/done/`.
- Do not alter runtime code, generated data, placement behavior, source authority, MTG lore, or Commander facts.
- Treat moves like removals for reference safety: old paths must have no active references or must be updated in the same change.
- Prefer docs-only consolidation. Touch raw metadata only if a byte-identical removed path is actively referenced and the replacement path is verified.
- Do not zip by default.

## Candidate Buckets

- `remove-now`: byte-identical duplicate with verified canonical replacement.
- `manifest-only`: obsolete but historically meaningful; leave recovery trail.
- `archive-indexed`: keep but move into an indexed VM-420 archive location.
- `retain-authority`: cited, evidence-bearing, source-authoritative, or active reference.
- `defer`: unclear ownership, non-identical content, or active references.

## Acceptance Checks

- Fresh before/after `git ls-files docs/` counts and size summary are recorded.
- Exact duplicate hash groups are generated before and after.
- `git check-ignore -v --no-index` explains tracked files that match ignore rules by class.
- Fixed-string reference scans are run for every removed or moved path.
- VM-420 names, archive paths, manifests, card titles, and handoff references are consistent.
- `git diff --check` passes on touched files.

## Result

- Created `docs/analysis/vm-420-docs-bloat-retention-audit.md`.
- Created `docs/analysis/vm-420-consolidation-manifest.md`.
- Removed two byte-identical duplicate files from the current tree:
  - `docs/research/archive/bant-pre-push-cleanup/duplicate-canon-captures/Alara Shards Lore Dossier Protocol.rtf`
  - `docs/research/ui_research/siteUpgradeInfo_Good.html`
- Reduced exact duplicate groups from `16` to `14`, duplicate files from `32` to `28`, and redundant exact-duplicate bytes from about `2.91 MB` to about `0.61 MB`.
- Deferred the Abzan/Jeskai/Mardu/Sultai source-drop folder cleanup because active packet docs, source ledgers, seed crosschecks, and some raw metadata still cite those folders as preserved provenance.
- No raw metadata, generated data, runtime code, source authority, handoffs, or done-card compaction changed.

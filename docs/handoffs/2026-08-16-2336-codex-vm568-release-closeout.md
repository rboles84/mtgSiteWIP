# VM-568 Release Closeout Handoff

## Agent

Codex

## Task Requested

Reconcile dirty `main` without blind stash/reset/clean, integrate approved VM-568
candidate `5a5c04c859e25d7c7c3ea97e10c66fd59d66d045`, preserve exact VM-565 and VM-567
lineage, run post-merge checks, push `main`, verify Pages/production, and clean merged
VM-565/567/568 branches and worktrees only after production verification.

## Files Reviewed

- `AGENTS.md`, `docs/dev/RobDevPass.md`, and `docs/qa/RobQAPass.md`
- VM-564, VM-565, VM-567, and VM-568 cards, audits, handoffs, branches, worktrees,
  exact SHAs, and protected diffs
- All 34 dirty-main paths against final VM-568
- GitHub workflow runs and cache-bypassed production assets

## Files Changed

- `research/apply-vm565-owner-review-remediation.mjs`
- `docs/kanban/done/VM-568-vm565-vm567-owner-candidate-integration.md`
- `docs/kanban/backlog/VM-569-ink-global-media-projection-reconciliation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What Changed

- Audited dirty `main`: 10 paths were identical, four were newline-only, 18 were
  substantive but older/superseded VM-564/565 drafts, and two were earlier in-progress
  cards superseded by completed VM-568 records. No unique work remained.
- Preserved that audited state in labeled stash
  `pre-vm568-dirty-main-audited-superseded-2026-08-16` before cleaning `main`.
- Fast-forwarded `main` to VM-568 and added a two-line newline normalization so the
  remediation freshness check works under Windows CRLF checkout.
- Pushed release commit `514c045d5dd9b282ccba69177c475983ac0bbf7d`.
- Isolated the optional VM-559 projection mismatch as VM-569 maintenance.
- Removed the registered VM-565/568 and VM-567 worktrees and deleted both merged
  local branches after production verification. VM-567's directory is gone; an
  external process still holds the empty, unregistered
  `C:\dev\voxmana-vm565-final` directory open, so Windows could not remove that
  final empty directory object.

## Why It Changed

The owner approved the combined candidate but required proof that dirty-main work was
not lost and prohibited blind cleanup. The release also needed deterministic Windows
verification and exact production evidence before branch/worktree cleanup.

## Decisions Made

- No dirty-main path was unique; preserve the recoverable stash anyway through
  production verification and do not drop it in this closeout.
- Direct `main` push was owner-authorized; no PR was opened.
- Treat VM-559 projection reconciliation as separate maintenance, not release scope.
- Use exact deployed-asset comparison after the browser safety gate blocked accepting
  the saved-reading reset confirmation; do not bypass that gate.

## Risks / Uncertainties

- The safety stash remains intentionally present and may be dropped later only after
  an explicit owner cleanup decision.
- Interactive production replacement of the browser's pre-existing saved Mardu
  reading was blocked by the browser safety gate. Production runtime/data assets match
  the validated release exactly, and the four requested states passed deterministic
  rendered QA before release.
- VM-569 remains a non-blocking maintenance item.
- `C:\dev\voxmana-vm565-final` is an empty, unregistered directory locked by another
  process. It is safe to remove after that process releases it; no repository files
  or branch/worktree registrations remain there.

## Tests Run

- Required post-merge lint, parser, placement, Maze, deck-link, copy-boundary,
  frontend-smoke, source/generated, VM-565 education, remediation, and diff checks:
  PASS.
- VM-565 remediation check: PASS with Crystal + Group Project, zero lands, and Kynaios
  protected as Play.
- Exact ancestor checks for VM-565 `97989e1...` and VM-567 `697e0c1...`: PASS.
- GitHub Validation run `31998022444`: PASS.
- GitHub Pages run `31998022101`: PASS.
- Production assets (renderer, stylesheet, factions, education catalog, card-voice
  catalog, exact printings): HTTP 200 and exact normalized content match.
- `git diff --check`: PASS before release commit and closeout.

## RobDevPass Implementation Packet

- Product outcome: one deployed build contains both owner-accepted candidates.
- Changed behavior: no additional product semantics; only Windows verification became
  newline-portable.
- Protected behavior: placement, identity meaning, recommendations, accepted
  education, Start Here zero-card rule, and accepted Sound/Play relationships.
- Consumers: release verification on Windows and the deployed all-37 Archscry dossier.
- Smallest implementation: exact fast-forward plus a two-line check-only normalization.
- Stop condition honored: VM-559 projection architecture was split out.

## RobQAPass Readiness

- Tier: QA-2 release integration.
- Evidence: exact lineage, required local checks, exact-SHA CI/Pages, and deployed
  runtime/data parity.
- Owner judgment remaining: optional later removal of the safety stash and eventual
  VM-569 prioritization. The empty locked directory may be removed opportunistically.

## Not Touched

- Placement scoring, qualification, result states, or identity semantics
- Commander recommendation data or Start Here guidance copy
- VM-559 producer, frozen raw Oracle snapshot, or unrelated media projection
- The owner-accepted Ink relationship

## Follow-Up Recommendations

1. Keep VM-569 separate from feature work and resolve its source/frozen-snapshot
   authority before implementation.
2. Drop the labeled safety stash only after the owner no longer wants the audited
   pre-release recovery point.

## Next Suggested Agent

Maintenance agent for VM-569 when prioritized.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-568-vm565-vm567-owner-candidate-integration.md`
- `docs/kanban/backlog/VM-569-ink-global-media-projection-reconciliation.md`
- `docs/handoffs/2026-08-16-2307-codex-vm568-owner-candidate-integration.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

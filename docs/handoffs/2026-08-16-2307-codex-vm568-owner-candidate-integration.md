# VM-568 Owner-Candidate Integration Handoff

## Agent

Codex

## Task Requested

Combine owner-accepted VM-565 at
`97989e1be35757b53593c0e3b620648c8d46b05a`, its included VM-564 baseline, and exact
VM-567 Start Here preview removal at
`697e0c1ba8a655199cb29c2ae11ae0d719e3b449` into one clean build suitable for a later
merge.

## Files Reviewed

- `AGENTS.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- VM-564, VM-565, and VM-567 handoffs, audits, and Kanban cards
- Exact sibling commit lineages and both clean worktrees
- Shared renderer, all-37 replay, authored-card replay, CI workflows, source/generated
  guardrails, and VM-559 projection contracts

## Files Changed

- Exact VM-567 commit files merged into the VM-565 branch, including the one-line
  `assets/js/index.js` Start Here presentation change and its direct tests/docs
- `docs/audits/vm551-all-37-dossier-closeout/live-ui-witness-replay.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-565-curated-player-vocabulary-education.md`
- `docs/kanban/in-progress/VM-568-vm565-vm567-owner-candidate-integration.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- This handoff

## What Changed

- Preserved exact VM-565 as durable history and merged exact VM-567 as a second
  parent instead of recreating either patch.
- Reconciled only the two additive governance conflicts. Product code and the
  combined all-37 replay merged automatically.
- Updated current all-37 replay evidence to record the retained Start Here guidance
  and zero card-bearing descendants for all named dossiers.
- Recorded owner acceptance of VM-565 and moved its card to Done.

## Why It Changed

The owner needed one reviewable build containing both accepted product states. The
separate worktrees each began from `c190be7c7eb49ff55313213dfc2c0b696289537b`, so an
exact-history merge on the existing VM-565 branch preserves provenance and avoids a
third worktree or hand-reimplemented patch.

## Decisions Made

- Continue `C:\dev\voxmana-vm565-final` on
  `codex/vm-565-final-owner-review`; create no new branch/worktree.
- Keep the Start Here section and Commander-plan prose; remove only actual Commander
  preview descendants.
- Preserve every accepted VM-565 definition, teaching target, Boros style correction,
  Ink relationship, and card-detail behavior.
- Do not modernize the two already-documented historical source-string suites.
- Do not broaden into VM-559 producer/raw-snapshot architecture. The accepted Ink
  runtime continues to use its dedicated exact card-voice printing source.

## Risks / Uncertainties

- The optional VM-559 projection verifier reports the accepted Ink inventory change
  against its older global projection, including Crystal's absence from the frozen raw
  Oracle snapshot. Required CI does not invoke this verifier, and focused Ink runtime
  detail resolution passes without API fallback.
- The two historical broad source suites remain blocked on obsolete assertions that
  predate this integration and were already recorded by VM-565/VM-567.
- No production merge, push, or deployment has occurred. The combined SHA still
  requires the owner's normal integration decision.

## Tests Run

- VM-565 candidates/audit/education/remediation deterministic checks: PASS
- `npm.cmd run lint:js`: PASS
- `npm.cmd run lint:html`: PASS
- `npm.cmd run validate:source-generated`: PASS with only the existing JESKAI/MARDU
  model-owned warnings
- Every required `.github/workflows/validation.yml` command: PASS
- `node assets/js/quick-reading-tests.js`: PASS, 37 factions / 37 golden paths
- Full all-37 desktop rendered replay: PASS, 37 / 36 named / zero failures
- White and Bant mobile replay: PASS
- Boros desktop/mobile authored-card replay: PASS
- Ink desktop/mobile authored-card replay: PASS
- `node --check` for every reconciled JavaScript file: PASS
- Protected-path diff from exact VM-565: empty
- `git diff --check`: PASS before closeout
- Optional VM-559 projection: expected bounded non-pass described above
- Historical dossier-followup and Gate owner-QA suites: known pre-existing assertion
  blocks described above

## RobDevPass Implementation Packet

- Product outcome: one build contains both accepted candidate states.
- Owner: existing VM-565 branch; shared Start Here renderer owns preview placement.
- Changed behavior: only Start Here preview absence is added to accepted VM-565.
- Protected behavior: all placement, identity, recommendation, media architecture,
  non-Start-Here cards, vocabulary, Bant, Boros, and Ink contracts.
- Consumers: all 37 dossiers, desktop/mobile, education and card-detail interactions.
- Smallest implementation: exact-history merge plus additive governance resolution.
- Stop conditions were honored; no protected semantic or architecture expansion.

## RobQAPass Readiness

- Tier: QA-2 integration of two shared-presenter candidates.
- Deterministic coverage: exact lineage, all-37 combined replay, focused mobile and
  authored-card interactions, accessibility, source/generated, CI, and protected diff.
- Owner review surface: confirm Start Here has guidance but no Commander cards, then
  spot-check Bant Enchantress, Boros Play controls, and Ink Sound/Play.
- Status: combined local build ready for owner-directed merge after the containing
  integration and closeout SHAs are reported.

## Not Touched

- Main branch, origin, deployment, production
- Placement, scoring, qualification, routing, result states, or identity meaning
- Commander recommendation data, precons, Card Signals, Mana Notes, Matrix, or Maze
- VM-559 media producer, Scryfall raw snapshot, and unrelated generated indexes
- Main dirty worktree and `C:\dev\voxmana-vm567`

## Follow-Up Recommendations

1. Review the final combined SHA only.
2. Merge/push/deploy only under the owner's normal release authorization.
3. If desired, schedule the historical source-suite assertions and global Ink media
   projection reconciliation as separately scoped maintenance rather than hiding them
   inside this accepted integration.

## Next Suggested Agent

Owner/integration agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-568-vm565-vm567-owner-candidate-integration.md`
- `docs/kanban/done/VM-565-curated-player-vocabulary-education.md`
- `docs/kanban/done/VM-567-remove-start-here-commander-card-previews.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

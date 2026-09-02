# VM-620 + VM-621 — Final combined Owner Review handoff

- Agent: Codex.
- Requested: record Owner final Home-copy verification PASS, remove NVDA as a blocker truthfully, rerun
  proportional combined regression, preserve separate card ownership, recommend binding and stop at review.
- Branch/base: one worktree on `codex/vm-620-shared-guide-beacon`; HEAD/main/origin/main unchanged at
  `9c572edb0232161c860ea199a508a73f99a5d6fd`. Combined candidate remains uncommitted.
- Gates: repo-local `robdev` / `robqa`, frozen RobDevPass / RobQAPass, current explicit Owner QA decision.

## Reviewed / changed

Reviewed skills/gates, cost policy, workflow, board/cards, relevant handoffs, both QA reports, VM-621 preflight,
Beacon inventory, source configs/shared assets, candidate diffs and requested regression harnesses.

Changed this pass:

- `scripts/vm620-guide-beacon-browser.mjs`: optional existing-pattern `VM_OWNER_REVIEW_OUTPUT` override,
  preserving the default and all assertions, so fresh evidence cannot overwrite prior VM-620 witnesses.
- VM-620/621 active cards, board, original QA reports, VM-621 preflight and two earlier VM-621 handoffs:
  current review status, truthful Owner evidence and supersession of required/pending NVDA wording.
- Added `docs/qa/2026-09-02-vm620-vm621-combined-owner-review.md`, this handoff and index entry; removed only
  the accidental duplicate index row for the previous copy-correction handoff (the handoff remains).
- New untracked evidence: `outputs/vm620-vm621-final-review-20260902/` only. No production changes.

## RobDev compact packet

- Authority/producer: Owner decision updates card/QA status; runtime remains route-local configs consuming
  unchanged accepted VM-619 helper. VM-620 shared CSS/JS owns visuals/attention only.
- Outcome: tested combined opt-in Beacon → orientation → static Guide promise, with separate card authorities.
- Protected: four Home/dossier steps, exact approved copy, three eligible Beacons, primary hierarchies,
  ordinary static links, vendor/helper/Maze, semantic/data/Placement producers, persistence and VM-617.
- Consumers: Home, certified dossier, Maze, all three Guides, topbar/mobile navigation.
- Smallest change: review documentation plus evidence-output override. No product defect was found.
- Stop: no new route, scope, engine, dependency, branch, acceptance, commit, push or merge.

## RobQA readiness and evidence

- Tier: combined QA-3 navigation plus QA-2 shared interaction; prior final copy patch QA-1.
- PASS: HTML/JS lint, copy boundaries, route metadata, frontend smoke, VM-615/616/619/620/621 static and
  browser suites, Guide browser, topbar browser and diff whitespace. The strengthened VM-621 suite now runs.
- Browser coverage includes keyboard/focus, inert actions/restoration, cleanup, motion, mobile/reflow,
  Back/refresh/replay, missing-target/Driver-load fallback and static direct-route boundaries.
- Self-QA: inspected all six fresh 1440×1000/390×844 Beacon renders; confirmed recognizable shared anatomy
  and primary hierarchy. Prior in-app Home/dossier flows and final Home Steps 1/4 rendered copy sanity remain
  valid because production bytes are unchanged; Owner manually verified both flows and final correction.
- Integrity: 58 captured production/test/evidence file hashes matched after validation (baseline taken after
  the harness-only output override). Shared helper/Maze config/Guide/vendor/data/lock diff against HEAD clean.
- Owner finding invariant: actual contextual Beacon reaches matching first guided step, not static-document
  dropping; exact final Home copy regressions retained. No new defect requiring remediation.
- CPU-heavy: NOT REQUIRED. Placement/SIRF/parser calibration/mutation/all-identity/account/live-service suites
  skipped because producers unchanged. Real screen-reader validation NOT PERFORMED; optional future audit,
  not a blocker per Owner. No browser/NVDA version or VoiceOver/screen-reader PASS invented.
- Disposition: RobQA READY, Owner Review only. Final acceptance remains the Owner's decision.

## Follow-up

Use the combined packet for separate file ownership, exact routes/steps, all 20 requested answers and only
five product-judgment questions. Recommended future binding: two scope-owned commits on this branch,
review/accept both at the combined tip, never integrate the visual-only intermediate state. Not executed;
repository workflow does not require a commit before this review.

Next suggested agent: Owner for combined judgment, then authorized lifecycle closeout if accepted.
VM-617 remains unstarted. Existing Owner Review directories and prior six VM-620 witnesses are untouched,
untracked and recoverable as before; nothing was removed except the redundant index listing.

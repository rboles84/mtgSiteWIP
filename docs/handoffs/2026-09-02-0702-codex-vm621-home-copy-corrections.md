# VM-621 — Two Home copy corrections

Later Owner disposition (2026-09-02): final manual Home copy/Done recheck PASS. Real screen-reader validation
NOT PERFORMED, optional future audit/nonblocking; no pending NVDA gate. Combined final regression now passes;
see `docs/qa/2026-09-02-vm620-vm621-combined-owner-review.md`. This handoff otherwise preserves its earlier state.

- Agent: Codex.
- Requested: apply only the Owner's exact Home Step 1/4 descriptions; narrow verification; stop at Owner Review.
- Authority: Owner wording; repo-local `robdev`/`robqa` and frozen `docs/dev/RobDevPass.md` /
  `docs/qa/RobQAPass.md`. RobDev grounded the two-string patch; RobQA selected QA-1 validation.
- Reviewed: skill/gate docs, cost policy, handoff index and prior VM-621 handoff, board, VM-621 card/preflight/
  QA report, Home/dossier/Maze configs, shared helper, relevant static/browser tests and protected file hashes.
- Changed: `assets/js/guide/intro-walkthrough.js` (two descriptions only),
  `scripts/vm621-guide-walkthrough-tests.mjs` (exact copy/headings/no-guesses invariants), VM-621 card,
  `docs/kanban/board.md`, VM-621 QA report, this handoff and `HANDOFF_INDEX.md`.
- Why: accurately describe recorded answers and reduce relationship-step density without changing meaning.
- Producer/consumers: existing route-local Home config feeds the unchanged shared Driver helper and popovers.
- Smallest complete change: exact Step 1/4 string replacements plus narrow regression/documentation updates.
- Protected/non-goals: four steps/headings/Steps 2–3; dossier/Maze copy; all runtime interaction, focus,
  history/motion, static Guides/relationship map, URLs, styles/Beacon, vendor bytes and VM-617.
- Decisions: continue existing combined branch; no redesign, new dependency, broad suites or acceptance.
- Tests: static regression RED before patch, GREEN after; `test:vm621-guided-reading`, `lint:html`,
  `test:copy-boundaries`, `git diff --check` PASS. Browser suite does not pin these descriptions; not rerun.
- Rendered self-QA: Home Steps 1/4 at `/guide/?guided=vox-mana-intro`, 1440×1000 and 390×844 PASS; readable
  exact copy, visible controls, contained popovers. Viewport reset. No screenshot files created.
- Scope proof: pre/post Home config equals only the two replacements; four steps. Twelve protected-file
  SHA-256 comparisons unchanged, including dossier/Maze/helper/Guide HTML/Beacon/Driver assets.
- Risks/uncertainties: prior strengthened browser-suite launch limitation remains historical; no new behavior
  changed. Native NVDA was not run; Owner's latest direction is to handle testing, so agent work stops here.
- Readiness: copy correction complete; Owner mechanically/visually approved flows. Owner Review remains open;
  no self-acceptance or invented NVDA PASS. Focused manual check is handed to Owner, not an agent blocker.
- Worktree: existing combined VM-620/621 dirty worktree preserved on `codex/vm-620-shared-guide-beacon`.
  No stage/commit/push/merge; the three protected Owner Review directories remain untracked and untouched.
- Follow-up / next suggested agent: Owner for remaining review; only respond to concrete findings or acceptance.
- Related: VM-621 card, `docs/qa/2026-09-01-vm621-guided-reading-owner-review.md`, VM-620, prior VM-621 handoff.

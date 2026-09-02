# VM-619 Opt-In Guided Reading — Discovery Handoff

- **Agent:** Codex
- **Task requested:** Red-team an explicitly opt-in Field Guide guided-reading proposition; do not implement it.
- **Files reviewed:** VM-619/620/617 cards; board; VM-616 closeout; Field Guide onboarding contract and sequence; RobDev/RobQA authorities; `/guide/maze/`; Guide/Maze CSS and JS; motion/shared conventions; telemetry/CSP note; official Driver.js documentation, npm metadata, release/issues, and exact 1.8.0 package.
- **Files changed:** `docs/reports/2026-09-01-vm619-guided-reading-redteam.md`; VM-619 card moved to `in-progress/` and updated; `docs/kanban/board.md`; this handoff; handoff index.
- **What changed:** Registered VM-619 as In Progress — Discovery, recorded five bounded criteria, and created the Owner decision packet. No runtime or third-party package changed.
- **Why:** The Owner asked for an evidence-led architecture decision before granting any production implementation authority.
- **Decision:** Conditional recommendation: local pinned Driver.js 1.8.0 plus a deliberately narrow lifecycle adapter and Maze-only route configuration—only if the Owner accepts strict opt-in, stateless URL, focus, accessibility-compensation, and manual screen-reader boundaries.
- **Risks / uncertainties:** Driver has no observed `aria-modal` or inert background; highlighted content remains in the focus cycle; screen-reader behavior was not testable. Real Guide sticky-topbar geometry and any future CSP remain candidate-stage validation items.
- **Tests run:** Remote/ancestor/worktree/status pre-flight; exact package inspection; local rendered 1.8.0 evaluation at 390×844, 768×900, and 1440×900 with keyboard, Escape, resize, scroll, missing-target, cleanup, and overflow observations. No production suite: this is QA-0 documentation/Kanban work.
- **Not touched:** package.json, package lock, production assets, Guide pages, Maze Beacon, vendor assets, VM-620, VM-617, storage, telemetry, query/result/Placement/Reading Finds behavior, and preserved Owner Review output directories.
- **Follow-up:** Owner makes the five decisions in the report. Only then may a separately authorized implementation card start and rerun RobDev/RobQA.
- **Next suggested agent:** Owner review; a bounded implementation agent only if approved.
- **Related:** VM-619; `docs/reports/2026-09-01-vm619-guided-reading-redteam.md`; accepted Field Guide onboarding contract.

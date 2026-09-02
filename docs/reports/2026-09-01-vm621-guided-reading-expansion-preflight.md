# VM-621 Guided-Reading Expansion Preflight

**Verdict:** Proceed on the existing branch under a separately registered card.
**Smallest safe version:** two route-local four-step configurations plus two exact Beacon URLs; reuse the
accepted shared lifecycle and local vendor assets unchanged.
**Review level:** QA-3 navigation/state transition with QA-2 focus/accessibility checks. Updated by explicit
Owner decision on 2026-09-02: real screen-reader testing is NOT PERFORMED, optional future audit coverage,
and not a VM-620/621 Owner Review blocker. Automated and Owner keyboard/visual testing passed.
**Stop condition:** any need to generalize the lifecycle into a framework, change Guide semantics, alter
Placement/Maze, or create a second branch/worktree.

## Current-state recon

- `VM-621` was absent from Kanban, handoffs, reports, QA, plans, and branches, so the ID is free.
- One worktree and one related branch exist: `codex/vm-620-shared-guide-beacon` at accepted baseline
  `9c572edb0232161c860ea199a508a73f99a5d6fd`, with the complete uncommitted VM-620 candidate.
- Creating a second VM-621 branch would violate the single-active-worktree rule and risk splitting a known
  inconsistent interaction across candidates.
- Recommendation: keep main unchanged; complete and review VM-620 visual language plus VM-621 guided
  interaction as a combined branch candidate, while retaining separate cards, tests, evidence, and later
  lifecycle disposition. Integrate only after both cards are accepted.

## Existing lifecycle fit

`assets/js/shared/guide-walkthrough.js` is already the narrow shared owner. Its `config` supplies only the
guided ID, static targets/focus destinations, local assets, and step copy. It already provides:

- exact one-value `guided` parsing and unsupported-value cleanup;
- four-target preflight and safe static fallback;
- lazy local Driver/theme loading;
- one active session;
- target actionable suppression and exact `tabindex` restoration;
- Next/Done focus, Previous, Close, Escape, URL cleanup, Back/pagehide/popstate teardown;
- Done-to-top and Close/Escape-to-current-heading focus;
- OS/Vox reduced motion and live preference cleanup;
- no storage, progress, completion state, cookies, account state, or telemetry.

The helper intentionally accepts exactly four steps. Home and Reading each have exactly four existing
authoritative teaching regions, so no helper change is necessary beyond extending the shared quiet-completion
focus selector to the two existing H1 targets.

## Route decisions

### `/guide/?guided=vox-mana-intro`

1. `#guide-archscry` / `#guide-archscry-title` — find a Commander direction.
2. `#guide-maze` / `#guide-maze-title` — find cards.
3. `#guide-strategium` / `#guide-strategium-title` — learn the table.
4. `#how-vox-connects` / `#guide-relationship-title` — see the primary flow and Apocrypha's supporting
   source role.

The fourth target is the relationship section rather than a fifth tour step for Apocrypha; this keeps the
orientation at four steps and uses the static relationship model as the teaching authority.

### `/guide/reading/?guided=dossier-reading`

1. accepted Section I / `#placement-meaning-title` — what the result means.
2. accepted Section II / `#where-to-start-title` — where to start.
3. `#dossier-map` / `#dossier-map-title` — how the dossier is organized.
4. accepted Section IV / `#reading-next-title` — what to do next.

Only stable section IDs and programmatic heading focusability are added. No public dossier or Placement copy
changes.

## Failure and history contracts

- Direct routes remain static because route adapters return before importing the shared helper when no
  `guided` value exists.
- Unknown/duplicate IDs, missing targets, blocked local assets, missing Driver API, or startup errors remove
  only `guided` and leave the corresponding static Guide intact.
- Done replaces the guided entry with the static route, scrolls to top, and quietly focuses the H1. Close and
  Escape preserve the current reading position and focus its section heading.
- Back during a walkthrough returns to the invoking product route. Back after Done/Close does not create a
  guided/static loop. Refresh with a valid guided URL restarts Step 1; refresh after cleanup remains static.

## Protected boundaries

- VM-620 continues to own Beacon anatomy, animation, visibility, and once-per-page state.
- VM-621 owns only Home/Reading Beacon destinations and two route configurations.
- VM-619's Maze config, vendor files/hashes, accessibility contract, and accepted behavior remain frozen.
- `/guide/` and `/guide/reading/` content remain the teaching authority.
- No Placement, parser, query, Reading Finds, dossier content, persistence, account, telemetry, navigation,
  or VM-617 change.

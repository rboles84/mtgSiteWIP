# VM-124 - Strategium Targeted Commander Portal Lift

ID: VM-124
Title: Strategium Targeted Commander Portal Lift
Status: done
Type: Frontend / Content Lift / Commander UX
Area: Strategium Route
Priority: high
Created: 2026-05-25
Completed: 2026-05-25

## Summary

Lift the best fitting ideas from `C:\Users\obake\Downloads\vox_mana_commander_portal.html` into the live Strategium route without turning Strategium into a large portal or changing its current Commander-first information architecture.

## Scope

- Keep the live Strategium page flow and shared shell intact.
- Deepen the `Pod Readiness`, `Threat Reading`, and `Archetype Signal` console lanes with targeted donor patterns.
- Upgrade the existing readiness checklist with a visual gauge and stronger tiered feedback.
- Add the Kanban/docs/handoff trail for the Strategium-only enhancement.

## Non-Goals

- Do not import the donor portal shell, navigation, Tailwind stack, CDN dependencies, or calculator runtime.
- Do not add saved state, persistence, or new cross-route product logic.
- Do not alter shared topbar behavior, shared backgrounds, Archscry logic, Maze logic, or route targets.

## Source

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1405-codex-vm112b-strategium-rename.md`
- `docs/handoffs/2026-05-24-1936-codex-vm120-container-queries-subgrid.md`
- `docs/handoffs/2026-05-24-2346-codex-vm122-strategium-commander-learning-console-redesign.md`
- `docs/handoffs/2026-05-15-2106-codex-vm018-commander-table-fit-rule-zero-card.md`
- `docs/kanban/board.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `strategium/index.html`
- `C:\Users\obake\Downloads\vox_mana_commander_portal.html`

## Acceptance Criteria

- Strategium keeps its current section order and compact Commander-console framing.
- `Pod Readiness` gains a practical Rule 0 / pre-game script helper without presenting bracket language as official scoring.
- `Threat Reading` gains a numbered cognitive checklist.
- `Archetype Signal` gains a compact static archetype mini-library.
- The readiness checklist gains a progress gauge and richer status feedback with no persistence.
- The route remains responsive, visually consistent with Vox Mana, and free of browser console errors.

## Outcome

- Added `Best next move` and `Watch for this` guidance to the five existing Commander entry rows without changing the section structure.
- Expanded `Pod Readiness` with a `Recommended Pre-Game Script` block containing three static conversation patterns for battlecruiser, tuned-casual, and sharper optimized pods.
- Expanded `Threat Reading` with a five-step `The cognitive checklist` subpanel focused on immediate wins, resource advantage, removal timing, beneficiary analysis, and table aggro.
- Expanded `Archetype Signal` with a six-card mini-library covering `Tokens`, `Aristocrats`, `Spellslinger`, `Voltron`, `Ramp / Lands`, and `Stax`, each with likely colors and table perception.
- Upgraded the readiness area with a live percent label, progress bar, and tiered `Conversation status` plus `Table kit status` diagnostics while keeping the checklist local and non-persistent.
- Updated the board, route atlas wording, manual QA guidance, and handoff index to reflect the targeted Strategium lift.

## Files Changed

- `strategium/index.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-124-strategium-targeted-commander-portal-lift.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Verification

- `node --check` on a temporary extract of the inline Strategium script
- `npm.cmd run lint:html`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser QA on `http://127.0.0.1:4173/strategium/` confirming:
  - `Pod Readiness` shows the new three-script Rule 0 helper only in that tab
  - `Threat Reading` shows the numbered cognitive checklist
  - `Archetype Signal` shows the six-card quick library within the tab panel
  - the readiness percent, meter, summary, and status cards update together
  - the new Strategium additions stack cleanly at mobile width with no console errors

## Human Review

Yes. The lift is content-dense and should get a quick human browser pass for copy clarity, mobile rhythm, and visual weight balance inside the Strategium console.

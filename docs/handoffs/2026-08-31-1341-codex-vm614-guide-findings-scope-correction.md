# Codex Handoff - VM-614 Guide Findings and Scope Correction

- **Agent name:** Codex
- **Task requested:** Apply the owner's final bounded Guide findings while preserving the current visual treatment of every existing page.
- **Related work:** VM-614 Field Guide foundation and global discoverability
- **Disposition:** RobQA READY - Owner Review required

## Files Reviewed

- `.agents/skills/robdev/SKILL.md`, `.agents/skills/robdev/robdev.md`, and `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md` and the four prior VM-614 handoffs
- `docs/kanban/board.md` and the VM-614 card
- `docs/kanban/done/VM-069-remove-bubble-atmosphere-newindex2.md`
- `docs/kanban/done/VM-070-keep-stars-remove-only-home-bubble-layers.md`
- Guide, Home, Archscry, Maze, Strategium, Apocrypha, legal-route, shared-atmosphere, and validation sources relevant to the finding boundary

## Files Changed

- `guide/index.html`
- `assets/css/guide.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/guide-browser-smoke.mjs`
- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/kanban/board.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- this handoff

## What Changed

- Replaced the Guide's self-scrolling third primary control with a whole-control Strategium destination.
- Moved **If unsure, start here.** inside the Archscry control and removed the redundant standalone advice.
- Removed the duplicate Strategium continuation link.
- Raised the final Strategium/Apocrypha map note to the normal readable Maze body-copy color.
- Updated focused invariants to require three real product exits, the integrated note, and readable final copy.
- Recorded the owner's clarified visual boundary: existing page atmosphere is protected.
- Reverted every attempted cross-route/shared atmosphere edit made during this finding pass before handoff.

## Why It Changed

The owner found that one primary Guide action was not meaningful, one prompt was redundant, and the final map note was difficult to read. The owner also clarified that the rejected "soap bubble" criticism applied to the prior Guide presentation, not to the current orb, mote, star, nebula, painted-background, or route-local atmosphere already used elsewhere.

## RobDev Compact Packet

- **Owning authority:** the Owner-Accepted VM-613 Guide contract, the live Maze shell inherited by Guide, and the owner's final bounded findings in this task.
- **Producer:** `guide/index.html` plus the route-local `assets/css/guide.css` adapter; focused validation is produced by the three VM-614 scripts listed above.
- **Changed behavior:** the third primary Guide control opens Strategium, the unsure note appears once inside Archscry, and the final map note has readable contrast.
- **Protected behavior:** all existing atmosphere on Home, Archscry, Maze, Strategium, Apocrypha, privacy, terms, and shared runtime owners; Guide meaning and order; specialist semantics, state, persistence, and telemetry.
- **Consumers:** Guide visitors, canonical navigation consumers, Home Guide discovery, and VM-614 owner-review automation.
- **Risks:** visual judgment remains owner-controlled; a future Guide-only adapter could drift from Maze; a later cleanup could again mistake historical rejected Guide styling for authorization to change established routes.
- **Smallest complete implementation:** three Guide markup/copy changes, one Guide contrast token change, and narrow static/browser regression updates.
- **Non-goals:** no redesign of another page, no removal of orbs/motes/stars/nebula, no specialist behavior change, no VM-615 work.
- **Stop condition:** stop at uncommitted Owner Review after the targeted static and rendered checks pass.

## Decisions Made

- Existing route atmosphere is explicitly preserved. The temporary broader cleanup was not part of the accepted scope and was fully reverted.
- The third primary intent points to Strategium because it provides an actual orientation/tablecraft destination; the on-page product map remains supporting content.
- The Guide remains an exact Maze-shell consumer with only route-content adapters.

## Risks / Uncertainties

- Final optical balance and product feel remain owner judgment.
- The current branch contains the full uncommitted VM-614 candidate, including earlier navigation and Home discoverability work; this pass did not independently accept those broader VM-614 changes.

## Tests Run

- `npm.cmd run lint:html` - PASS
- `npm.cmd run lint:js` - PASS
- `npm.cmd run test:frontend-smoke` - PASS
- `npm.cmd run test:route-metadata` - PASS
- `npm.cmd run test:copy-boundaries` - PASS
- `npm.cmd run test:guide-browser` - PASS
- `git diff --check` - PASS with existing line-ending warnings only
- Atmosphere-only diff audit across shared and route-local CSS/JS owners - PASS; no atmosphere-related
  hunk remains, while the earlier intentional Home Guide-discovery CSS remains
- Canonical `.vm-bg__nebula` markup-presence check - PASS across all previously carrying public/prototype shells

## RobQA Readiness

- **Classification:** QA-3 shared navigation/routing plus visible product UI.
- **Changed contract tested:** three real Guide exits, integrated unsure note, readable final note, exact Maze surface inheritance, keyboard activation, responsive containment, reduced motion, and 200% zoom equivalence.
- **Protected contract tested:** established atmosphere CSS/JS owners have zero content diff; canonical nebula markup remains present; specialist domain runtimes are not imported into Guide.
- **Rendered evidence:** the current 1440 x 1000 and 390 x 844 Guide witnesses pass self-QA.
- **Owner judgment remaining:** desired Guide product feel, hierarchy, wording, and optical balance.
- **Disposition:** RobQA READY - Owner Review required.

## Not Touched

- No existing page's orb, mote, star, nebula, background, or route-local atmosphere behavior.
- No Placement, Archscry reading/dossier, Maze query/result, Strategium lesson, Apocrypha source, telemetry, or persistence behavior.
- No commit, push, PR, merge, VM-615 branch, registration, or implementation.

## Follow-up Recommendations

- Owner manually verifies only the current Guide candidate.
- If accepted, close and integrate VM-614 using the repository's normal workflow without broadening into VM-615.

## Next Suggested Agent

Owner reviewer, then integration agent only after explicit acceptance.

## Related Kanban, Docs, and Plans

- `docs/kanban/in-progress/VM-614-field-guide-foundation-global-discoverability.md`
- `docs/qa/2026-08-31-vm614-field-guide-owner-review.md`
- `docs/handoffs/2026-08-31-1137-codex-vm614-exact-maze-contract.md`
- Owner-Accepted VM-613 authority and closeout

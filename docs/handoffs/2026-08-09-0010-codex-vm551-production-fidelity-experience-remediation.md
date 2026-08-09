# VM-551 Gate B1 Production-Fidelity Experience Remediation

## Agent name

Codex

## Task requested

Implement the owner disposition **APPROVE WITH NAMED EXPERIENCE REMEDIATION** for the isolated Gate B1 production-fidelity preview, including the three storage/authority/parity hardening additions, without reopening architecture or changing production.

## Files reviewed

- Prior VM-551 preview handoff, Kanban card, owner-review packet, preview source, branching map, and validators.
- Production `archscry/index.html`, `assets/js/index.js`, `assets/css/archscry.css`, `assets/js/shared.js`, presentation, dossier, radar, identity, precon, card, and Maze data contracts.

## Files changed

- Preview HTML, CSS, controller, README, branching review map, structural validator, new production-dossier bridge, and new browser validator under `docs/prototypes/vm551-gate-b1-production-fidelity-preview/`.
- `docs/plans/vm551-gate-b1-product-fit/production-fidelity-owner-review.md`.
- Kanban board and completed remediation card.
- Handoff index and this handoff.

## What changed

- Three-answer desktop layouts now use three balanced columns, with a full-width third card at intermediate widths; four answers remain 2×2 and mobile uses one column.
- Gate→Hall and result transitions now wait for **Continue into the Hall** and **Open my reading**.
- Progress reports stage-local position and the landing copy states the overall 6–8-moment expectation.
- Q3 no longer repeats the board-wipe definition.
- B1 summaries render selected answer titles and observations. Static authored route prose appears only when all expected selections match; deviations are explicitly bounded.
- Composite branch metadata resolves after all four Gate answers for free and authored routes.
- Removed the locally defined six-panel dossier. The new bridge fetches current production `assets/js/index.js`, strips the boot/session-controller boundary in memory, rewrites only import/data locators, and calls the production result/dossier functions and section definitions.
- The bridge does not bind the live Archscry action controller. It binds only safe production dossier navigation functions, intercepts Begin Again back to the preview, and blocks account/save mutations.
- Placement cache, profile cache, Maze handoff writes, and Scryfall card-art cache/fetch decoration are disabled within the preview result lifetime and restored on exit.
- Production bounded-result shells and the production endcap remain authoritative.

## Why it changed

The first preview preserved the questionnaire direction but replaced the production result/dossier experience with a materially thinner approximation. The repair makes B1 additive above the existing production dossier and closes answer-summary, progress, transition, layout, and reviewer-truth defects.

## Decisions made

- Reused production source as rendering authority without modifying production or initializing its questionnaire/session/persistence boot.
- Did not fabricate scores or identity evidence to expose optional close-result content.
- Preserved bounded insufficient/mixed/contradictory behavior rather than forcing a named dossier.
- Intentionally disabled account persistence and Scryfall cache/fetch decoration; omitted no production dossier section.
- Used no preview session payload. Any future payload remains required to be namespaced and consumed/deleted.

## Risks / uncertainties

- The preview adapter relies on the production source’s documented boot-boundary marker and will fail closed if that marker moves.
- This remains an authored, non-scoring experience preview. It does not validate any identity mapping or placement algorithm.
- Owner visual re-review remains required before any later gate.

## Tests run

- `node docs/prototypes/vm551-gate-b1-production-fidelity-preview/validate-preview.mjs` — PASS.
- Node syntax checks for `app.js`, `production-dossier-bridge.js`, and `validate-preview-browser.mjs` — PASS.
- `node docs/prototypes/vm551-gate-b1-production-fidelity-preview/validate-preview-browser.mjs` — PASS.
  - Run A: C09 Repeatability / `visible-recovery-growth`.
  - Run B: C07 Pressure / `visible-burst-pressure`.
  - Desktop 4-answer 2×2, desktop 3-answer balanced row, mobile single column.
  - Both transitions remain user-paced.
  - Esper **Use the opening now** and Colorless **Keep the on-theme card** remain truthful in summaries.
  - Colorless retains the production insufficient shell.
  - Named preview dossier matches production tab/panel/ARIA contracts and all available sections are reachable.
  - One production endcap.
  - `vm_last_result`, `vm_profile`, and all pre-existing `localStorage` values remain byte-identical through result rendering and Begin Again.
- In-app browser spot checks — PASS; no console warnings/errors.
- `git diff --check` — PASS.

## Not touched

Production Archscry and Gate A files; approved construct/question/answer/signal artifacts; scoring; placement routing/stopping; persistence and saved-result contracts; schemas; identity authority; Matrix values; recommendations; migration; player validation; recruitment; shadow testing; deployment; certification.

## Follow-up recommendations

Owner should visually review the repaired desktop three-answer layout, both user-paced transitions, one named rich production dossier, one bounded Colorless result, the production endcap, and the exact Run A/Run B adaptive paths.

## Next suggested agent

Owner review only. Do not begin implementation or player-validation preparation.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-551-gate-b1-production-fidelity-experience-remediation.md`
- `docs/plans/vm551-gate-b1-product-fit/production-fidelity-owner-review.md`
- `docs/prototypes/vm551-gate-b1-production-fidelity-preview/README.md`

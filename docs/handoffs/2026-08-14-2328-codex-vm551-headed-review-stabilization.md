# VM-551 Headed Review Stabilization Handoff

- Agent name: Codex
- Task requested: Fix the intermittent `WITHERBLOOM rationale trigger did not receive a real hover` failure in the owner review command.
- Related Kanban card: `docs/kanban/in-progress/VM-551-all-37-dossier-closeout-program.md`

## Files reviewed

- Owner failure transcript: `C:\Users\obake\.codex\attachments\ec853bcf-0093-4182-ae7a-1d814251a78e\pasted-text.txt`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `docs/handoffs/2026-08-14-2317-codex-vm551-identity-card-modal-value.md`
- VM-551 Kanban and handoff index.

## Files changed

- `scripts/vm551-all-37-live-ui-replay.mjs`
- VM-551 Kanban record and board summary.
- This handoff and `docs/handoffs/HANDOFF_INDEX.md`.

## What changed and why

The visible review browser was interactive before its deterministic checks completed. Its synthetic pointer moved toward a rationale card while the owner's real mouse could move elsewhere or open a card dialog, so the test intermittently observed the body, top bar, or dialog instead of the intended `:hover` target.

Headed review now:

1. Displays a pointer-blocking `Preparing deterministic review...` guard immediately after document creation.
2. Runs deterministic route, dossier, modal, mana, focus-restoration, and containment checks using DOM actions.
3. Skips the synthetic real-pointer hover assertion only in headed owner-review mode.
4. Removes the guard only when `Visual review ready` is printed.
5. Closes idle and active local-server connections during teardown so pressing Enter ends the command cleanly.

The non-review desktop replay still executes the full real-hover and stale-preview regression. Product hover behavior was not weakened or changed.

## Decisions made

- Treat headed mode as a human review handoff, not as a simultaneous synthetic-pointer test.
- Keep the exact hover contract in automated headless certification, where no owner pointer can race it.
- Make no Archscry runtime, modal, content, or placement change.

## Risks / uncertainties

- None observed. Two consecutive headed runs completed without the former intermittent assertion.

## Tests run

- `node --check scripts/vm551-all-37-live-ui-replay.mjs`: PASS.
- `node scripts/vm551-all-37-live-ui-replay.mjs --case=witherbloom --viewport=desktop`: PASS, including unchanged real-hover checks.
- `npm.cmd run review:vm551 -- --case=witherbloom`: PASS repeatedly; each reached `Visual review ready`, accepted Enter, and the final teardown regression exited without a batch-termination prompt.
- `git diff --check`: PASS.

## Not touched

- Archscry runtime/product code, card catalogs, dossier copy, identity authority, Gate A, placement, routing, scoring, qualification, Matrix, persistence, or schemas.
- No placement stress suite, push, merge, or deployment.

## Follow-up recommendation

Run the normal owner review command and wait for `Visual review ready` before interacting:

```powershell
npm.cmd run review:vm551 -- --case=witherbloom
```

Press Enter in the terminal when the visual review is complete.

## Next suggested agent

Owner acceptance review; if passed, proceed to the separately authorized integration and closeout task.

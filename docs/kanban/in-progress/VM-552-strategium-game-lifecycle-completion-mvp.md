# VM-552 - Strategium Game-Lifecycle Completion MVP

ID: VM-552
Title: Strategium Game-Lifecycle Completion MVP
Status: Implementation complete; awaiting owner hand review and independent review
Type: Product implementation
Area: Strategium
Priority: High
Created: 2026-07-30

## Summary

Complete the first player-facing Strategium lifecycle slice by adding Finding a Table, Before the Game, and During the Game while preserving the accepted After-the-Game review and Commander Console.

## Source

- User task brief: Strategium Game-Lifecycle Completion MVP
- VM-550 Strategium After-the-Game implementation and handoff chain
- Read-only research repository `C:\dev\mtg-research-data`, HEAD `4bada2afa22460b7d8232117a31d5e24f0ee79c0`

## Acceptance Criteria

- `/strategium/` presents all four chronological lifecycle moments inside the accepted Help Me Understand hub architecture.
- Finding a Table provides a compact, heuristic compatibility read without scores, ratings, matchmaking, or permanent labels.
- Before the Game produces five useful output cards and a short natural pregame statement with safe optional-field handling.
- During the Game provides six neutral reset entry points and no tactical, target, board-state, or rules-ruling advice.
- All new routes support direct loading, keyboard activation, visible focus, back navigation, reset, mobile layout, and clear return paths.
- After the Game and Commander Console regression tests remain green.
- Claim evidence, decision tables, classification trees, state matrix, route architecture, exclusions, and limitations are documented.
- No push, merge, deploy, certify, Archscry placement change, Maze change, Apocrypha change, or VM-551 work occurs.

## Files Likely Impacted

- `strategium/index.html`
- `strategium/find-a-table/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `assets/js/strategium-lifecycle.js`
- `assets/css/strategium.css`
- `scripts/strategium-lifecycle-tests.mjs`
- `docs/research/strategium-game-lifecycle-claim-evidence-register.md`
- `docs/qa/strategium-game-lifecycle-mvp.md`
- `docs/handoffs/` and `docs/kanban/board.md`

## Risks

- Regressing accepted VM-550 route navigation, result history, focus behavior, or Console lesson behavior.
- Turning research heuristics or evolving bracket policy into definitive public claims.
- Introducing a generic survey framework or false-precision scoring model.
- Mobile overflow, inaccessible controls, or result dead ends.

## Implementation Prompt

Extend the existing Strategium static HTML/CSS/JavaScript patterns with a small shared lifecycle flow. Keep After-the-Game implementation intact. Keep route-specific question data and result logic deterministic and explainable. Treat player-model material as internal design input only.

## Notes

- VM-551 is explicitly excluded by the task brief.
- Brackets remain optional, approximate, or unknown; no current count, card list, or restriction is hard-coded.
- Rules-dispute output must direct the table to an official lookup or agreed judge/resource without inventing a ruling.

## Completion record

- Runtime, focused tests, claim register, QA matrix, and manual-test checklist are implemented.
- Candidate branch: `codex/strategium-game-lifecycle-completion`.
- Candidate worktree: `C:\dev\voxmana.io-strategium-lifecycle-completion`.
- Exact control base: `5ae7d873cd09d6bd9cfd45f3564d8cad8126e3e9`.
- Reviewable commits: `4d04962` (`feat(strategium): add game lifecycle flows`) and `dcc462b` (`test(strategium): add lifecycle QA coverage`), followed by the documentation/handoff commit recorded in the final handoff.
- Next gate: owner hand review of the exact candidate SHA, followed by independent review. No integration or certification is authorized without explicit approval of that exact SHA.

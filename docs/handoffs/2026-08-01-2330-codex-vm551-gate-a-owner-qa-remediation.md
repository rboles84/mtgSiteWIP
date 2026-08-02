# VM-551 Gate A Owner-QA Remediation Handoff

- Agent name: Codex
- Task requested: Remediate the owner-rejected Gate A implementation candidate without entering Gate B1.
- Related authority: approved design `c6b1c9e6940b67201c8c2f999409a7103ba52b88`; rejected implementation `f657ac5aea9b7aeaf3855a1af42148744271dc7e`.

## Files reviewed

- Governing Gate A design package and compatibility contracts.
- `archscry/index.html`, the Archscry presentation/runtime/dossier modules, Archscry CSS, current placement tests, committed precon catalog, local Scryfall commander index, Azorius source/profile records, Kanban, QA, and prior handoffs.

## Files changed

- Archscry HTML/CSS and presentation/runtime/dossier JavaScript.
- Placement regressions plus `scripts/vm551-gate-a-owner-qa-tests.mjs`.
- Gate A implementation status, owner-QA record, Kanban card/board, this handoff, and the handoff index.

## What changed

- Separated explicit current unknown from legacy and valid primary states.
- Gated incomplete Continue on a real resumable question.
- Isolated tie/co-leader content by target identity and historical legacy copy.
- Removed repeated sibling copy and stale atlas language.
- Reflowed cramped cards, removed the negative-margin overlap, enlarged card/land presentation, and adopted established Mana Font symbols.
- Added established inline educational help for specialist Commander terms.
- Made flavor-card Scryfall actions explicit and card-specific.
- Classified every art candidate before named-card lookup; precons use known main commander art or an intentional fallback.
- Added explicit validated EDHREC precon research routes.
- Reframed Start Here and Azorius/card claims as bounded exploration supported by local Oracle and identity records.

## Why it changed

Owner QA found public trust, usability, accuracy, and layout defects in the first implementation candidate. This pass fixes only those presentation/state defects while preserving the approved Gate A/B1 boundary.

## Decisions made

- Kept the 1120px main boundary and repaired component reflow instead of widening the route globally.
- Kept deliberate “Image unavailable” text as the failure affordance; removed raw data labels from loading placeholders.
- Used an explicit seven-route EDHREC allowlist; no inferred slug generation.
- Preserved request deduplication and existing pacing; non-card records never reach the named-card request.

## Risks / uncertainties

- The owner still needs to inspect the fixture-only unknown, incomplete, tie, and legacy shells visually.
- Signed-in profile/OAuth round trips were not executed against a live account; the unchanged contracts are covered structurally.
- Remote Scryfall availability, CORS, and rate limits remain environmental; deliberate fallbacks are in place.

## Tests run

- Focused VM-551 owner-QA checks: PASS.
- Placement: PASS, 37/37 golden paths.
- Bias, Gate compression/live bias, parser (226), source/generated: PASS; two pre-existing model-owned warnings remain.
- JS/HTML lint, copy boundaries, frontend smoke, route metadata, deck links, Maze scratchpad, browser smoke: PASS.
- In-app desktop and 390px inspection: no document overflow or sibling-card overlap; established mana symbols rendered.
- `git diff --check`: PASS before handoff finalization.

## Not touched

- Questions, answers, deltas, suppression, inhibition, scoring, softmax, ranking, branching, stopping, minimum-hit/guardrails, identity semantics, canonical/generated data, recommendation datasets, Matrix values/resolvers, schemas, migrations, deck-link logic, or Maze implementation.
- No merge, push, deployment, certification, or Gate B1 work.

## Follow-up recommendations

- Owner performs only the focused visual spot checks listed in the QA record.
- If accepted, authorize the normal integration step separately. Do not begin Gate B1 from this handoff.

## Next suggested agent

Owner visual QA reviewer.

## Related Kanban, docs, or plans

- `docs/kanban/in-progress/VM-551-gate-a-trust-containment-design.md`
- `docs/plans/vm551-gate-a-trust-containment/`
- `docs/qa/2026-08-01-vm551-gate-a-owner-qa.md`

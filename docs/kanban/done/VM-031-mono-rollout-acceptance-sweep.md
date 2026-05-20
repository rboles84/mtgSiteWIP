# VM-031 - Mono Rollout Acceptance Sweep

ID: VM-031
Title: Mono Rollout Acceptance Sweep
Status: done
Type: QA / regression / documentation
Area: Archscry, placement, Commander dossier, mono colors
Priority: high
Created: 2026-05-17

## Summary

Run one full post-rollout mono acceptance sweep across all five live mono colors so Vox Mana validates the system as a whole instead of relying on the earlier per-color rollout passes in isolation.

This card is intentionally a regression-and-audit pass, not a fix bundle. It may add narrow regression coverage, update QA/reference docs, and record triage outcomes, but it must not widen into scoring, routing, presenter, or prose rewrites.

## Source

- User-provided `Mono Rollout Acceptance Sweep` plan on 2026-05-17.
- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md`
- `docs/handoffs/2026-05-17-1201-codex-vm026-white-mono-stabilization-pass.md`
- `docs/handoffs/2026-05-17-1305-codex-vm027-black-mono-authoring-pass.md`
- `docs/handoffs/2026-05-17-1342-codex-vm028-blue-mono-authoring-pass.md`
- `docs/handoffs/2026-05-17-1445-codex-vm029-red-mono-authoring-pass.md`
- `docs/handoffs/2026-05-17-1504-codex-vm030-green-mono-authoring-pass.md`
- `docs/reference/manual-test-cases.md`

## Acceptance Criteria

- A standalone regression card exists for the full mono acceptance sweep.
- Automated mono regression coverage confirms the active baseline remains `20 factions / 20 golden paths`.
- Routing checks still pass for `mono-white`, `mono-blue`, `mono-black`, `mono-red`, and `mono-green`.
- Adjacent-fit boundary checks keep each mono result inside its expected pair-expression shells:
  - `W` vs `WU` / `WB` / `WG` / `WR`
  - `U` vs `WU` / `UB` / `UR` / `UG`
  - `B` vs `UB` / `WB` / `BG` / `BR`
  - `R` vs `WR` / `UR` / `BR` / `RG`
  - `G` vs `WG` / `UG` / `BG` / `RG`
- Mono dossiers still use authored mono-specific recommendation ownership/guidance instead of merely exposing any Commander Compass candidates.
- `npm run dossier:audit` reports zero failures.
- The sweep resolves cleanly into one of two outcomes:
  - `PASS with triage notes`
  - `FAIL with follow-up cards`

## Scope Guardrails

- Allowed:
  - narrow regression coverage additions
  - QA/reference documentation updates
  - Kanban and handoff triage outputs
- Not allowed:
  - placement scoring edits
  - adjacent-fit presentation changes
  - discovery-path behavior changes
  - dossier prose rewrites
  - stealth implementation bundled into the sweep

## Outcome

FAIL with follow-up cards.

The sweep exposed one blocking regression in the new mono boundary coverage:

- White still resolves to `W` as the primary result.
- White adjacent output currently resolves to `LOREHOLD` and `WU`.
- The failing assertion expected the narrow label shell `WU` / `WB` / `WG` / `WR`, but `LOREHOLD` is a valid `WR`-family adjacent, so the blocker is now triaged as an adjacent-family assertion/presenter-policy question rather than a confirmed White boundary escape.

Follow-up created:

- `VM-032 - White Mono Adjacent Family Assertion Triage`

## Testing Notes

- `npm run test:placement` -> failed on White mono adjacent boundary assertion
- `npm test` -> failed on the same White mono adjacent boundary assertion
- `npm run dossier:audit` -> passed with `failures: 0`, `warnings: 43`

## Human Review

Yes - this is a regression-sensitive acceptance pass that should remain auditable and scoped.

## Notes

This card is complete because the sweep was executed and triaged. Any repair work belongs to follow-up cards instead of widening the sweep into a patch bundle.

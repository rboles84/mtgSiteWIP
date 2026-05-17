# VM-030 - Green Mono Authoring Pass

ID: VM-030
Title: Green Mono Authoring Pass
Status: done
Type: data / model authoring / regression
Area: Archscry, placement, Commander dossier, mono Green
Priority: high
Created: 2026-05-17

## Summary

Author Green as the fifth live mono color expression using White, Black, Blue, and Red as the reference bar, keeping the work scoped to source identity data, minimum Green-owned model authoring, regenerated artifacts, and focused Green regression coverage.

## Source

- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md`
- `docs/handoffs/2026-05-17-1201-codex-vm026-white-mono-stabilization-pass.md`
- `docs/handoffs/2026-05-17-1305-codex-vm027-black-mono-authoring-pass.md`
- `docs/handoffs/2026-05-17-1342-codex-vm028-blue-mono-authoring-pass.md`
- `docs/handoffs/2026-05-17-1445-codex-vm029-red-mono-authoring-pass.md`
- User-requested Green implementation plan and constraints on 2026-05-17

## Acceptance Criteria

- Green is active in `data/identity-layers.json`.
- Green routes to `/commanders/mono-green` and `/Commander/mono-green-commanders`.
- Generated display data includes `G` as `institution_type: color`.
- Generated placement model includes Green biological expression, Hall support, Crucible support, and lateral targets `WG`, `UG`, `BG`, and `RG`.
- Green golden path resolves to `G` with `identity.expression_kind === "color"` and `purity === 1`.
- Green adjacent matches remain Green-adjacent pair expressions.
- Green Commander recommendations come from authored Commander Compass data, not fallback.
- Dossier audit has zero failures, with only unrelated warning noise acceptable.
- Existing White, Black, Blue, and Red mono checks still pass.
- Active placement count moves from `19 factions / 19 golden paths` to `20 factions / 20 golden paths`.

## Dependencies / Related Work

- `VM-023` mono identity layer pilot
- `VM-026` White mono stabilization pass
- `VM-027` Black mono authoring pass
- `VM-028` Blue mono authoring pass
- `VM-029` Red mono authoring pass

## Files Likely Impacted

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/quick-reading-tests.js`
- `assets/js/commander-dossier.js` only if dossier audit requires narrow Green guidance ownership
- Regenerated artifacts from `npm run build:factions`

## Risks / Uncertainties

- Green evidence can easily absorb Selesnya harmony, Simic biomancy, Golgari decay-cycle, or Gruul wild-force lanes if it is too broad.
- Green token language must stay about biological abundance, not White institutional mobilization.
- Existing source-land warning noise may remain unrelated to this pass.

## Delivery / Removal Criteria

Complete. Green is authored, regenerated into runtime artifacts, covered by focused tests, and verified against the White/Black/Blue/Red-equivalent mono acceptance bar.

## Human Review

Yes - mono-color rollout is regression-sensitive.

## Notes

No broader mono cleanup, runtime presenter rewrite, placement scoring rewrite, adjacent-fit presentation work, discovery-path contract redesign, or generated-artifact manual patching belongs to this card.

Mono rollout completion checkpoint: Green closed the mono phase at the final baseline of `20 factions / 20 golden paths`. Post-v1 faction expansion remains future work under `VM-013`.

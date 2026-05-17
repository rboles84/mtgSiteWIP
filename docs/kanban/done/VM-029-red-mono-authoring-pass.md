# VM-029 - Red Mono Authoring Pass

ID: VM-029
Title: Red Mono Authoring Pass
Status: done
Type: data / model authoring / regression
Area: Archscry, placement, Commander dossier, mono Red
Priority: high
Created: 2026-05-17

## Summary

Author Red as the fourth live mono color expression using White, Black, and Blue as the reference bar, keeping the work scoped to source identity data, minimum Red-owned model authoring, regenerated artifacts, and focused Red regression coverage.

## Source

- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md`
- `docs/handoffs/2026-05-17-1201-codex-vm026-white-mono-stabilization-pass.md`
- `docs/handoffs/2026-05-17-1305-codex-vm027-black-mono-authoring-pass.md`
- `docs/handoffs/2026-05-17-1342-codex-vm028-blue-mono-authoring-pass.md`
- User-requested Red implementation plan and constraints on 2026-05-17

## Acceptance Criteria

- Red is active in `data/identity-layers.json`.
- Red routes to `/commanders/mono-red` and `/Commander/mono-red-commanders`.
- Generated display data includes `R` as `institution_type: color`.
- Generated placement model includes Red biological expression, Hall support, Crucible support, and lateral targets `WR`, `UR`, `BR`, and `RG`.
- Red golden path resolves to `R` with `identity.expression_kind === "color"` and `purity === 1`.
- Red adjacent matches remain Red-adjacent pair expressions.
- Red Commander recommendations come from authored Commander Compass data, not fallback.
- Dossier audit has zero failures, with only unrelated warning noise acceptable.
- Existing White, Black, and Blue mono checks still pass.
- Active placement count moved from `18 factions / 18 golden paths` to `19 factions / 19 golden paths`.

## Dependencies / Related Work

- `VM-023` mono identity layer pilot
- `VM-026` White mono stabilization pass
- `VM-027` Black mono authoring pass
- `VM-028` Blue mono authoring pass

## Files Impacted

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- Regenerated artifacts from `npm run build:factions`

## Risks / Uncertainties

- Red evidence was kept narrow around immediacy, freedom, impulse, emotion, ignition, and direct action so it does not absorb Rakdos, Gruul, Izzet, or Prismari lanes.
- `assets/js/commander-dossier.js` needed one minimal Red guidance entry after dossier audit proved Red guidance ownership was missing.
- Existing source-land warning noise remains unrelated to the Red pass.

## Delivery / Removal Criteria

Complete. Red is authored, generated into runtime artifacts, covered by focused tests, and verified against the White/Black/Blue-equivalent mono acceptance bar.

## Human Review

Yes - mono-color rollout is regression-sensitive.

## Notes

No broader mono cleanup, runtime presenter rewrite, placement scoring rewrite, adjacent-fit presentation work, discovery-path contract redesign, or Green backfill was included.

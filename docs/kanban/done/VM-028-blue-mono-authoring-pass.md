# VM-028 - Blue Mono Authoring Pass

ID: VM-028
Title: Blue Mono Authoring Pass
Status: done
Type: data / model authoring / regression
Area: Archscry, placement, Commander dossier, mono Blue
Priority: high
Created: 2026-05-17

## Summary

Author Blue as the third live mono color expression using White and Black as the reference bar, keeping the work scoped to source identity data, minimum model authoring, regenerated artifacts, and focused Blue regression coverage.

## Source

- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md`
- `docs/handoffs/2026-05-17-1201-codex-vm026-white-mono-stabilization-pass.md`
- `docs/handoffs/2026-05-17-1305-codex-vm027-black-mono-authoring-pass.md`
- User-requested Blue implementation plan and constraints on 2026-05-17

## Acceptance Criteria

- Blue is active in `data/identity-layers.json`.
- Blue routes to `/commanders/mono-blue` and `/Commander/mono-blue-commanders`.
- Generated display data includes Blue as `institution_type: color`.
- Generated placement model includes Blue biological expression, Hall support, Crucible support, and lateral targets `WU`, `UB`, `UR`, and `UG`.
- Blue golden path resolves to `U` with `identity.expression_kind === "color"` and `purity === 1`.
- Blue adjacent matches remain Blue-adjacent pair expressions.
- Blue Commander recommendations come from authored Commander Compass data, not fallback.
- Dossier audit has zero failures, with only unrelated warning noise acceptable.
- Existing White and Black mono checks still pass.
- Active placement count moves from `17 factions / 17 golden paths` to `18 factions / 18 golden paths`.

## Dependencies / Related Work

- `VM-023` mono identity layer pilot
- `VM-026` White mono stabilization pass
- `VM-027` Black mono authoring pass

## Files Impacted

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- Regenerated artifacts from `npm run build:factions`

## Risks / Uncertainties

- `assets/js/commander-dossier.js` needed one minimal Blue guidance entry so dossier audit could validate Blue-owned and Blue-adjacent copy.
- Blue gate evidence required a tiny reciprocal Black Hall suppressor calibration so existing Black adjacent behavior stayed inside the Black-owned bar.
- Existing source-land warning noise remains unrelated to the Blue pass.
- Red should follow the same source-first pattern, but it has more overlap with Rakdos, Gruul, and Prismari lanes.

## Delivery / Removal Criteria

Complete when Blue is authored, generated into runtime artifacts, covered by focused tests, and verified against the White/Black-equivalent mono acceptance bar.

## Human Review

Yes - mono-color rollout is regression-sensitive.

## Notes

No broader mono cleanup, runtime presenter rewrite, placement scoring rewrite, adjacent-fit presentation work, discovery-path contract redesign, or Red/Green backfill belongs to this card.

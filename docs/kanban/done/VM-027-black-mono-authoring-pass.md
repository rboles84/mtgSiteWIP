# VM-027 - Black Mono Authoring Pass

ID: VM-027
Title: Black Mono Authoring Pass
Status: done
Type: data / model authoring / regression
Area: Archscry, placement, Commander dossier, mono Black
Priority: high
Created: 2026-05-17

## Summary

Author Black as the second live mono color expression using White as the reference bar, keeping the work scoped to source identity data, minimum model authoring, regenerated artifacts, and focused Black regression coverage.

## Source

- `docs/handoffs/2026-05-17-0229-codex-vm023-mono-identity-layer-refactor-white-pilot.md`
- `docs/handoffs/2026-05-17-1201-codex-vm026-white-mono-stabilization-pass.md`
- User-requested Black implementation constraints on 2026-05-17

## Acceptance Criteria

- Black is active in `data/identity-layers.json`.
- Black has full mono display, placement, biological-expression, routing, and Commander Compass authoring.
- Black EDHREC mono directory resolves to `/commanders/mono-black`.
- Black MTGDecks mono directory resolves to `/Commander/mono-black-commanders`.
- Generated display data includes Black as `institution_type: color`.
- Generated placement model includes Black biological prior, Hall support, Crucible support, and lateral collision support.
- Black golden-path behavior resolves to Black with purity `1`.
- Black adjacent matches remain Black-adjacent expressions.
- Black Commander recommendations come from authored Commander Compass data, not generic fallback.
- No placement scoring rewrite, adjacent-fit presentation change, or discovery-path redesign is introduced.

## Dependencies / Related Work

- `VM-023` mono identity layer pilot
- `VM-026` White mono stabilization pass

## Files Impacted

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- Regenerated artifacts from `npm run build:factions`

## Risks / Uncertainties

- `assets/js/commander-dossier.js` needed one minimal Black guidance entry so dossier audit could validate Black-owned and Black-adjacent copy.
- Existing source-land warning noise remains unrelated to the Black pass.
- Blue should follow the same source-first pattern, but it may need its own model-guidance entry before dossier audit can pass.

## Delivery / Removal Criteria

Complete when Black is authored, generated into runtime artifacts, covered by focused tests, and verified against the White-equivalent mono acceptance bar.

## Human Review

Yes - mono-color rollout is regression-sensitive.

## Notes

No broader mono cleanup, runtime presenter rewrite, placement scoring rewrite, adjacent-fit presentation work, or discovery-path contract redesign belongs to this card.

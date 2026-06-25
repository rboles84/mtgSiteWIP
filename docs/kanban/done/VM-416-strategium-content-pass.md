# VM-416 - Strategium Content Pass

Title: Strategium Content Pass
Status: Done
Area: Strategium Route
Owner: Codex

## Summary

Implement the approved Strategium Content Pass V2 as a content and information-layer update without redesigning the route.

## Pre-Flight Summary

- Recent Strategium work: VM-125 added the route-local searchable archetype library, VM-126 softened its framing, VM-128 extracted Strategium into route-local CSS/JS, VM-133 stabilized the visual/readability treatment, and VM-391 formally waived stale Strategium visual baselines without refreshing them.
- Current known risks: the worktree is already dirty with unrelated VM-413/VM-414/VM-415-era route, font, audit, and docs changes; Strategium visual compare is expected to remain sensitive/stale; several deferred specialist archetypes already exist in route-local data.
- Relevant decisions: keep Strategium archetype data route-local in `assets/js/strategium.js`; update existing Politics/Stax entries in place; choose Option B with Politics as `core` / Common and Stax as `advanced` / Specialist; do not refresh visual baselines.
- Files recently changed before this pass include `strategium/index.html`, `assets/css/strategium.css`, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md` from unrelated prior work.
- Do not touch generated data, placement models, Maze parser/search/stash behavior, Archscry radar/dossier behavior, Home identity signal, Apocrypha reference library, Library route/aliases, Commander/lore/source packets, or visual baselines.

## Scope

- Update Strategium route-local content, console tabs, persona routing, bracket copy, readiness checklist wording, and archetype metadata.
- Preserve existing visual language, route architecture, dependencies, and generated data boundaries.
- Create/update handoff documentation after verification.

## Outcome

- Updated the existing `politics` and `stax-lockout` route-local entries in place, preserving their keys while changing display names, copy, metadata, and the Politics family assignment.
- Added Heat Management as the sixth Strategium console module and routed relevant personas into it.
- Added bracket, commander-damage, checklist, Opening Hand, Closing Window, Beyond WUBRG, and likely-color copy from the approved brief and V2 plan.
- Confirmed official bracket facts against the Wizards Commander format page; no delta from the brief baseline was needed.
- Kept generated data, CSS redesign, and visual baselines untouched.

## Verification

- `node --check assets/js/strategium.js` passed.
- `npm.cmd run lint:html` passed.
- `npm.cmd run lint:js` passed.
- `npm.cmd run test:frontend-smoke` passed.
- Targeted Strategium source assertions passed: 50 total archetype entries, 23 core/Common entries, 27 advanced/Specialist entries, preserved `politics` and `stax-lockout` IDs, no old Politics/Stax display-name duplicates.
- `npm.cmd run test:visual:strategium` ran in compare mode and failed against stale baselines: `landing-desktop` 6968, `landing-mobile` 2347, `console-pod-readiness` 147808, `library-search` 40741 mismatched pixels. No baselines were refreshed.

## Acceptance Criteria

- Politics / Deals and Stax / Resource Denial exist as unique updated archetype entries with no duplicate Politics/Stax variants.
- Politics / Deals is `core` / Common; Stax / Resource Denial remains `advanced` / Specialist.
- Global archetype entry count stays the same; default Common/core visible count becomes 23.
- Heat Management exists as a sixth console module using existing tab/console patterns.
- Persona cards include Start with routing, including Precon Pilot to Beyond WUBRG and Brewer / Upgrader plus Competitive-Curious to Heat Management.
- Bracket copy follows official/source-checked or brief-baseline facts and documents the source path in the handoff.
- Typal is plain `Any`; required likely-color rows are normalized.
- Readiness checklist, commander-damage, Eldrazi, Phyrexian, tone, Opening Hand, and Closing Window copy are updated from the approved brief.
- Relevant checks are run and documented.

## Not In Scope

- New archetype expansion beyond the requested Politics/Stax update.
- Full mulligan or closing-the-game modules.
- CSS redesign, new design tokens, new dependencies, build tooling, route architecture changes, generated data edits, or visual baseline refreshes.

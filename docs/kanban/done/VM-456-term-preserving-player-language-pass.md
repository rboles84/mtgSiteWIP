# VM-456 - Term-Preserving Player-Language Pass

ID: VM-456
Title: Term-Preserving Player-Language Pass
Status: Complete
Type: UX Copy / Product Voice / Regression Guardrail
Area: Live Copy, Archscry, Strategium, Privacy, Dossier Copy Guardrails
Priority: High
Created: 2026-06-30
Completed: 2026-06-30

## Summary

Tightened player-facing copy so Vox Mana keeps accurate Magic and Commander vocabulary while removing internal model language, product fog, QA/audit phrasing, and over-literary phrasing around those terms.

## Scope

- Keep real MTG/Commander terms when they are accurate: Commander, color identity, decklist, ramp, draw, interaction, graveyard, recursion, turn cycle, mana base, archetype, precon, pod, and Rule 0.
- Replace visible internal/editorial phrasing such as `source-bound`, `sourced breadth`, `false positive`, `Commander-facing proof`, `deck guidance`, and vague player-facing uses of `leverage`.
- Add short context or direct player-action language instead of filtering Magic vocabulary into generic wording.
- Expand `test:copy-boundaries` with an internal-language-in-player-copy category.

## Explicit Non-Goals

- No broad find-and-replace.
- No generated/source-derived JSON edits.
- No new MTG lore, rules, Commander policy, commander, card, legality, ranking, or recommendation claims.
- No route, storage, placement, parser, Supabase/RLS, visual baseline, or behavior changes.

## Acceptance Criteria

- [x] Scoped live/public copy no longer contains the identified internal/editorial phrases.
- [x] Accurate Magic and Commander terms remain intact where they teach or orient the player.
- [x] `test:copy-boundaries` reports internal-language-in-player-copy failures with path, phrase/category, and replacement direction.
- [x] Existing content/static checks pass for touched surfaces.

## Closeout

Replaced leftover player-facing internal language in Privacy, Strategium, Archscry presentation copy, and selected dossier support lines. Expanded the copy-boundary checker so future live-copy regressions catch internal source/QA wording and vague leverage phrases without banning accurate Magic or Commander terms.

## Tests Run

- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:presentation-snapshots` - passed.
- `npm.cmd run dossier:audit` - passed with 0 failures and 113 existing warnings.
- `npm.cmd run test:frontend-smoke` - passed.
- Scoped phrase sweep for blocked internal/player-language phrases - no matches.
- `git diff --check` - passed with line-ending warnings only.

## Related Work

- `VM-439` - Vox Mana Voice And Copy Audit
- `VM-440` through `VM-443` - Voice Copy Repair
- `VM-449` - Maze Return Loop Microcopy Tightening
- `VM-455` - Remaining Readiness Residuals

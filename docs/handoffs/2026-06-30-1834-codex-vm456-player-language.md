# Codex Handoff - VM-456 Term-Preserving Player-Language Pass

## Agent Name

Codex

## Task Requested

Implement the term-preserving player-language pass: keep accurate Magic and Commander vocabulary, remove internal model language and vague player-facing phrasing around it, expand the live-copy guardrail, and avoid generated/source-derived data edits.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-30-1351-codex-vm440-443-voice-copy-repair.md`
- `docs/handoffs/2026-06-30-1436-codex-vm449-maze-copy.md`
- `docs/handoffs/2026-06-30-1806-codex-vm455-readiness-residuals.md`
- `docs/kanban/done/VM-443-copy-boundary-regression-guardrail.md`
- `docs/kanban/done/VM-449-maze-return-loop-microcopy-tightening.md`
- `docs/qa/vox-mana-test-plan.md`
- `scripts/check-copy-boundaries.mjs`
- `privacy/index.html`
- `assets/js/strategium.js`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`

## Files Changed

- `privacy/index.html`
- `assets/js/strategium.js`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `scripts/check-copy-boundaries.mjs`
- `docs/qa/vox-mana-test-plan.md`
- `docs/kanban/done/VM-456-term-preserving-player-language-pass.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-30-1834-codex-vm456-player-language.md`

## What Changed

- Replaced Privacy's visible `deck guidance` phrasing with Commander browsing notes.
- Replaced Strategium's vague `turn-cycle leverage` and `repeatedly leveraged` wording with turn-cycle advantage and multi-turn commander usefulness.
- Rewrote selected Archscry presentation phrases from over-literary/internal wording into clearer player-facing table actions while preserving Commander terms.
- Replaced selected dossier support lines that used vague leverage language with pressure, advantage, payoff, protected finish, or winning-opening language.
- Added an internal-language-in-player-copy category to `scripts/check-copy-boundaries.mjs`.
- Updated the QA plan to describe the expanded copy-boundary guardrail.

## Why It Changed

The owner clarified that plain player language must not flatten Magic language. New players should learn real terms, while returning and veteran players should not see generic wording that misrepresents Commander. This pass keeps accurate MTG vocabulary and removes the surrounding internal, vague, or over-literary phrasing.

## Decisions Made

- Used `VM-456`; collision scan found no existing VM-456, VM-457, VM-458, VM-459, or VM-46x card.
- Kept this pass to scoped live/player-facing copy and the checker.
- Did not ban every use of `deck`, `decklist`, `guidance`, or `leverage`; only player-facing vague/internal patterns were blocked.
- Left remaining `leverage` hits in `assets/js/commander-dossier.js` when they are matcher/config vocabulary rather than blocked visible sentence patterns.
- Did not edit `data/factions.json`, `data/identity-layers.json`, raw faction files, generated artifacts, route behavior, storage keys, or placement logic.

## Risks / Uncertainties

- The deeper generated/source data still contains source-facing and internal phrasing; this pass intentionally avoided those files until a source-authority mapping pass is created.
- Existing broader worktree changes from VM-428 through VM-455 remain dirty and were not staged or reverted.
- Dossier audit still reports 113 existing warnings and 0 failures.
- Manual browser/content review by new, regular, and veteran Commander readers remains useful.

## Tests Run

- `npm.cmd run test:copy-boundaries` - passed across 14 live-copy files.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:presentation-snapshots` - passed.
- `npm.cmd run dossier:audit` - passed with 0 failures and 113 existing warnings.
- `npm.cmd run test:frontend-smoke` - passed.
- Scoped phrase sweep for blocked internal/player-language phrases - no matches.
- `git diff --check` - passed with line-ending warnings only.

## Not Touched

- Generated/source-derived JSON and raw faction files.
- MTG lore, rules, Commander policy, commander, card, legality, ranking, or recommendation claims.
- Route structure, storage keys, parser behavior, Scryfall behavior, Supabase/RLS, account/deck-link live proof, visual baselines, placement scoring, or data models.
- Git staging, committing, pushing, branch changes, or deployment.

## Follow-Up Recommendations

- Create a separate mapped data-fed identity copy pass before editing canonical raw/source files or generated JSON.
- Add a manual content review checklist that tests copy with new, regular, and veteran Commander readers.
- Keep VM-446 blocked until live Supabase credentials are available.

## Next Suggested Agent

JSON Cartographer for source-authority mapping of data-fed identity copy, or Test Strategist for manual player-language QA.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-456-term-preserving-player-language-pass.md`
- `docs/kanban/done/VM-443-copy-boundary-regression-guardrail.md`
- `docs/kanban/done/VM-449-maze-return-loop-microcopy-tightening.md`
- `docs/kanban/done/VM-455-remaining-readiness-residuals-release-caveat-sweep.md`
- `docs/qa/vox-mana-test-plan.md`

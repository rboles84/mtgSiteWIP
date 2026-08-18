# Codex handoff — Official-art hero proof main push

## Agent name

Codex

## Task requested

Keep Ink as proof-override-only, then commit and push the owner-approved all-37 official-art hero proof work to `main`, leaving the branch and worktree clean.

## Files reviewed

- `AGENTS.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `assets/img/identity-hero/official/*`
- `docs/kanban/board.md`
- `docs/kanban/done/*official-art-hero-proof.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-18-0854-codex-official-art-hero-main-push.md`

## What changed

- Preserved the `INK` implementation as an explicit official-art proof override only.
- Confirmed no `assets/img/identity-hero/ink.webp` fallback/rollback asset exists or was invented.
- Tightened two route-hard-code regression regexes so approved official hero asset paths for `COLORLESS` and `WUBRG` are not mistaken for forbidden route aliases.
- Moved the owner-approved official-art hero proof cards from `in-progress` to `done`.

## Why it changed

The owner approved the visual proof rollout and requested that the accumulated work be pushed to `main` with a clean branch/worktree. Ink had no repo evidence of a prior production hero asset, so the safest fix was to keep the proof override rather than fabricate a rollback asset.

## Decisions made

- `INK` remains proof-override-only.
- No old Ink hero asset was created, renamed, or backfilled.
- The quick-reading route invariant remains active but now matches only true root route aliases such as `"/wubrg"` / `"/colorless"`, not nested asset paths.

## Risks / uncertainties

- `npm test` currently stops after earlier passing sections because `research/import-precon-mechanics-validation.mjs` cannot import local dependency `xlsx`, despite `xlsx` being declared in `package.json`.
- `research/archscry-dossier-followup-tests.js` still stops before hero checks on the pre-existing `expected the approved card-rationale surface` assertion.
- No visual testing was performed by Codex; owner performed visual QA by request.

## Tests run

- `git diff --check` — pass, with CRLF normalization warnings only.
- `node --check assets/js/index.js` — pass.
- `node --check assets/js/quick-reading-tests.js` — pass.
- `node --check research/archscry-dossier-followup-tests.js` — pass.
- Focused hero invariant — pass: 37 live identities, 37 proof mappings, all proof assets exist, `INK` override-only.
- `npm test` — partial pass, then blocked by missing local `xlsx` package.
- `node research/archscry-dossier-followup-tests.js` — blocked by pre-existing approved card-rationale surface assertion before hero checks.

## Not touched

- Placement/scoring logic.
- Questionnaire logic.
- Dossier copy in `data/factions.json`.
- Routing aliases.
- Production deployment.
- Any generated Ink rollback asset.

## Follow-up recommendations

- If full `npm test` is required later, restore/install local dependencies so `xlsx` resolves.
- Separately decide whether `research/archscry-dossier-followup-tests.js` should be updated for the current approved card-rationale surface.

## Next suggested agent

No next agent required unless the owner wants deployment verification or the unrelated test dependency/card-rationale blockers repaired.

## Related Kanban card, docs, or plans

- `docs/kanban/done/abzan-official-art-hero-proof.md`
- `docs/kanban/done/bant-official-art-hero-proof.md`
- `docs/kanban/done/grixis-official-art-hero-proof.md`
- `docs/kanban/done/naya-esper-official-art-hero-proof.md`
- `docs/kanban/done/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md`
- `docs/kanban/done/guild-five-official-art-hero-proof.md`
- `docs/kanban/done/guild-five-two-official-art-hero-proof.md`
- `docs/kanban/done/strixhaven-five-official-art-hero-proof.md`
- `docs/kanban/done/monocolor-five-official-art-hero-proof.md`
- `docs/kanban/done/frontier-five-official-art-hero-proof.md`

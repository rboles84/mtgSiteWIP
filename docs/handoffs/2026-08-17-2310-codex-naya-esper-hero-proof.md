# 2026-08-17 23:10 — Codex — Naya + Esper Hero Official-Art Proof

## Agent name

Codex

## Task requested

Continue the official-art hero proof by adding exactly two more approved identities for owner visual review. Keep execution efficient, with basic unit/code testing only and visual testing left to the owner.

## Files reviewed

- `AGENTS.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/scryfall/raw/oracle-cards.json`
- `C:\WIP\VoxManaHeroArt\approved\naya_ohop-27-naya.jpg`
- `C:\WIP\VoxManaHeroArt\approved\naya_ohop-27-naya.png`
- `C:\WIP\VoxManaHeroArt\approved\esper_moc-49-esper.jpg`
- `C:\WIP\VoxManaHeroArt\approved\esper_moc-49-esper.png`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/naya-esper-official-art-hero-proof.md`
- `assets/img/identity-hero/official/naya-plane-alara.jpg`
- `assets/img/identity-hero/official/esper-plane-alara.jpg`
- `docs/handoffs/2026-08-17-2310-codex-naya-esper-hero-proof.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added rollback-safe Naya and Esper official-art assets.
- Extended the proof override map so `ABZAN`, `BANT`, `GRIXIS`, `NAYA`, and `ESPER` use official proof assets.
- Set Naya focal position to `50% 48%` and Esper focal position to `50% 50%`.
- Reused the proof-only hero credit mechanism with local Scryfall artist metadata.
- Updated focused helper assertions for the two new proofs.

## Why it changed

The owner approved the prior proof and requested two more identities to review in the same manner. Naya and Esper were chosen as clean approved art-crop pairs with existing production hero slugs and distinct visual profiles.

## Decisions made

- Selected the JPGs because both are wide art crops (`1214x543`), while the PNGs are full card frames.
- Named the assets `naya-plane-alara.jpg` and `esper-plane-alara.jpg` to keep them distinct from rollback `.webp` assets.
- Used local Scryfall metadata: `Zoltan Boros & Gabor Szikszai` for Naya and `Bruce Brenneise` for Esper.
- Combined Kanban/handoff closeout for efficiency while preserving the required implementation record.
- Did not perform browser/visual automation because the owner reserved visual testing.

## RobDevPass compact implementation packet

- Changed behavior: only Naya and Esper join the existing proof-only official-art hero override path.
- Owning authority / producer: `assets/js/index.js` controls hero mapping/background generation; `assets/css/archscry.css` controls scoped credit style; `data/factions.json` remains the identity content authority and was not edited.
- Existing machinery reused: the existing Archscry `.guild-banner`, background shorthand, `IDENTITY_HERO_OVERLAY`, identity banner fallback, and conditional proof credit.
- Protected behavior: prior Abzan/Bant/Grixis proofs remain intact; non-proof identities remain on existing local `.webp` mapping; scoring, routing, questionnaire, generated data, dossier copy, shared layout, typography, and deployment are untouched.
- Consumers inspected: hero mapping helper, background helper, attribution helper, focused dossier test helper, static asset server path.
- Smallest complete implementation: two new assets, two proof map entries, scoped credit selector extension, focused assertion updates, combined Kanban/handoff closeout.
- Non-goals: no visual approval by Codex, no full 37-identity rollout, no production deploy, no commit.

## Risks / uncertainties

- Naya focal `50% 48%` and Esper focal `50% 50%` are authored starting points and await owner visual approval.
- The full broad dossier follow-up test is known to fail earlier on an unrelated approved-rationale assertion, so validation used targeted helper invariants instead.
- Visual review was intentionally not performed by Codex at owner direction.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for Abzan, Bant, Grixis, Naya, Esper, all existing mapped non-proof hero paths, rollback assets, proof attribution, and `INK` exclusion — PASS
- `git diff --check` — PASS, with CRLF warnings only
- `Invoke-WebRequest` for both new official assets — PASS, HTTP 200

## Not touched

- `assets/img/identity-hero/naya.webp`
- `assets/img/identity-hero/esper.webp`
- Existing Abzan/Bant/Grixis rollback assets
- `data/factions.json`
- Placement, scoring, routing, questionnaire, generated JSON, dossier copy, layout, typography, deployment, and all non-proof identity mappings

## Follow-up recommendations

- Owner should review Naya and Esper visually and adjust only the second background layer focal coordinates in DevTools if needed.
- Continue in small batches only after owner approval of the crop/focal pattern.

## Next suggested agent

Owner visual QA for Naya and Esper.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/naya-esper-official-art-hero-proof.md`
- Existing Abzan, Bant, and Grixis proof handoffs/cards
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

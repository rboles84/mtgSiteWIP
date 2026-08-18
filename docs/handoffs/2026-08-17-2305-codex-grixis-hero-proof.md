# 2026-08-17 23:05 — Codex — Grixis Hero Official-Art Proof

## Agent name

Codex

## Task requested

Continue the official-art hero proof by choosing exactly one more approved identity after owner approval of the prior proof. Keep execution more efficient, with basic unit/code testing only and visual testing left to the owner.

## Files reviewed

- `AGENTS.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-08-17-2249-codex-abzan-hero-proof.md`
- `docs/handoffs/2026-08-17-2301-codex-bant-hero-proof.md`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `data/scryfall/raw/oracle-cards.json`
- `C:\WIP\VoxManaHeroArt\approved\grixis_ohop-15-grixis.jpg`
- `C:\WIP\VoxManaHeroArt\approved\grixis_ohop-15-grixis.png`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/grixis-official-art-hero-proof.md`
- `assets/img/identity-hero/official/grixis-plane-alara.jpg`
- `docs/handoffs/2026-08-17-2305-codex-grixis-hero-proof.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Selected Grixis as the one additional proof identity.
- Added a new rollback-safe Grixis official-art asset at `assets/img/identity-hero/official/grixis-plane-alara.jpg`.
- Extended the proof override map so only `ABZAN`, `BANT`, and `GRIXIS` use official proof assets.
- Set Grixis's initial focal position to `50% 48%`.
- Reused the proof-only hero credit mechanism with `Art: Nils Hamm - Grixis`.
- Added a Grixis Kanban card and updated focused helper assertions.

## Why it changed

The owner approved one more same-style proof and asked for a more efficient pass. Grixis was chosen from the curated approved folder as a clean plane/art-crop pair with strong visual contrast to Bant and an existing production hero slug.

## Decisions made

- Selected the JPG, not the PNG, because the JPG is the wide art crop (`1214x543`, `126496` bytes), while the PNG is the full card frame (`1040x1490`, `3051750` bytes). No art was generated, edited, cropped, or substituted.
- Named the production asset `grixis-plane-alara.jpg` to keep it clearly distinct from the rollback asset `assets/img/identity-hero/grixis.webp`.
- Used local Scryfall data for artist metadata: `Nils Hamm`.
- Did not perform browser/visual automation because the owner reserved visual testing.

## RobDevPass compact implementation packet

- Changed behavior: only Grixis joins the existing Abzan/Bant proof-only official-art hero override path.
- Owning authority / producer: `assets/js/index.js` controls hero mapping/background generation; `assets/css/archscry.css` controls scoped credit style; `data/factions.json` remains the identity content authority and was not edited.
- Existing machinery reused: the existing Archscry `.guild-banner`, background shorthand, `IDENTITY_HERO_OVERLAY`, identity banner fallback, and conditional proof credit.
- Protected behavior: Abzan and Bant proofs remain intact; non-proof identities remain on existing local `.webp` mapping; scoring, routing, questionnaire, generated data, dossier copy, shared layout, typography, and deployment are untouched.
- Consumers inspected: hero mapping helper, background helper, attribution helper, focused dossier test helper, static asset server path.
- Smallest complete implementation: one new asset, one new proof map entry, one scoped credit selector extension, focused assertion updates, Kanban/handoff closeout.
- Non-goals: no visual approval by Codex, no 37-identity rollout, no production deploy, no commit.

## Risks / uncertainties

- Grixis focal position `50% 48%` is only an authored starting point and awaits owner visual approval.
- The full broad dossier follow-up test is known to fail earlier on an unrelated approved-rationale assertion, so validation used targeted helper invariants instead.
- Visual review was intentionally not performed by Codex at owner direction.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for Abzan, Bant, Grixis, all existing mapped non-proof hero paths, rollback assets, proof attribution, and `INK` exclusion — PASS
- `git diff --check` — PASS, with CRLF warnings only
- `Invoke-WebRequest http://127.0.0.1:4173/assets/img/identity-hero/official/grixis-plane-alara.jpg` — PASS, HTTP 200

## Not touched

- `assets/img/identity-hero/grixis.webp`
- Existing Abzan/Bant rollback assets
- `data/factions.json`
- Placement, scoring, routing, questionnaire, generated JSON, dossier copy, layout, typography, deployment, and all non-proof identity mappings

## Follow-up recommendations

- Owner should review Grixis visually and adjust only the second background layer focal coordinates in DevTools if needed.
- Continue one-at-a-time proofs until the official-art crop/focal/credit pattern is approved.

## Next suggested agent

Owner visual QA for Grixis only.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/grixis-official-art-hero-proof.md`
- `docs/kanban/in-progress/bant-official-art-hero-proof.md`
- `docs/kanban/in-progress/abzan-official-art-hero-proof.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

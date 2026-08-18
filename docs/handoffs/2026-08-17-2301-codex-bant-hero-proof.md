# 2026-08-17 23:01 — Codex — Bant Hero Official-Art Proof

## Agent name

Codex

## Task requested

Continue the official-art hero proof by choosing exactly one more approved identity for owner visual review. Owner specified that Codex should do basic unit/code testing only and leave all browser/visual testing to the owner.

## Files reviewed

- `AGENTS.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-08-17-2249-codex-abzan-hero-proof.md`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json`
- `C:\WIP\VoxManaHeroArt\approved\bant_ohop-4-bant.jpg`
- `C:\WIP\VoxManaHeroArt\approved\bant_ohop-4-bant.png`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/bant-official-art-hero-proof.md`
- `assets/img/identity-hero/official/bant-plane-alara.jpg`
- `docs/handoffs/2026-08-17-2301-codex-bant-hero-proof.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Selected Bant as the one additional owner-review proof identity.
- Added a new rollback-safe Bant official-art asset at `assets/img/identity-hero/official/bant-plane-alara.jpg`.
- Extended the existing proof override map so only `ABZAN` and `BANT` use official proof assets.
- Set Bant's initial focal position to `52% 48%`.
- Reused the minimal proof-only hero credit mechanism for Bant with `Art: Michael Komarck - Bant`.
- Added a Bant Kanban card and updated focused helper assertions.

## Why it changed

The owner approved moving from Abzan to exactly one additional same-style review. Bant was chosen from the curated approved folder because it is a clean identity/place pair with no filename ambiguity and offers a useful visual contrast to Abzan.

## Decisions made

- Selected the JPG, not the PNG, because the JPG is the wide art crop (`1214x543`, `128506` bytes), while the PNG is the full card frame (`1040x1490`, `3045219` bytes). No art was generated, edited, cropped, or substituted.
- Named the production asset `bant-plane-alara.jpg` to keep it clearly distinct from the rollback asset `assets/img/identity-hero/bant.webp`.
- Kept non-proof identities on their existing `/assets/img/identity-hero/{slug}.webp` paths with `center center` focal position and no credit.
- Did not perform browser/visual automation because the owner explicitly reserved visual testing.

## RobDevPass compact implementation packet

- Changed behavior: only Bant now joins Abzan in the proof-only official-art hero override path.
- Owning authority / producer: `assets/js/index.js` controls hero mapping/background generation; `assets/css/archscry.css` controls scoped credit style; `data/factions.json` remains the identity content authority and was not edited.
- Existing machinery reused: the existing Archscry `.guild-banner`, background shorthand, `IDENTITY_HERO_OVERLAY`, identity banner fallback, and conditional proof credit.
- Protected behavior: Abzan proof remains intact; other identities remain on existing local `.webp` mapping; scoring, routing, questionnaire, generated data, dossier copy, shared layout, typography, and deployment are untouched.
- Consumers inspected: hero mapping helper, background helper, attribution helper, focused dossier test helper, static asset server path.
- Smallest complete implementation: one new asset, one new proof map entry, one scoped credit selector extension, focused assertion updates, Kanban/handoff closeout.
- Non-goals: no visual approval by Codex, no 37-identity rollout, no production deploy, no commit.

## Risks / uncertainties

- Bant focal position `52% 48%` is only an authored starting point and awaits owner visual approval.
- The full broad dossier follow-up test is known to fail earlier on an unrelated approved-rationale assertion, so validation used targeted helper invariants instead.
- Visual review was intentionally not performed by Codex at owner direction.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for Abzan, Bant, all existing mapped non-proof hero paths, rollback assets, proof attribution, and `INK` exclusion — PASS
- `git diff --check` — PASS, with CRLF warnings only
- `Invoke-WebRequest http://127.0.0.1:4173/assets/img/identity-hero/official/bant-plane-alara.jpg` — PASS, HTTP 200

## Not touched

- `assets/img/identity-hero/bant.webp`
- `assets/img/identity-hero/abzan.webp`
- `data/factions.json`
- Placement, scoring, routing, questionnaire, generated JSON, dossier copy, layout, typography, deployment, and all non-proof identity mappings

## Follow-up recommendations

- Owner should review Bant visually and adjust only the second background layer focal coordinates in DevTools if needed.
- Keep further identities as one-at-a-time visual proofs until the owner approves the official-art crop/focal/credit pattern.

## Next suggested agent

Owner visual QA for Bant only.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/bant-official-art-hero-proof.md`
- `docs/kanban/in-progress/abzan-official-art-hero-proof.md`
- `docs/handoffs/2026-08-17-2249-codex-abzan-hero-proof.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

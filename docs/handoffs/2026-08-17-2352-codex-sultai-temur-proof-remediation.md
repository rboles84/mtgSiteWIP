# 2026-08-17 23:52 — Codex — Sultai/Temur Proof Remediation

## Agent name

Codex

## Task requested

Apply owner visual-review findings from the five-identity proof batch: improve Sultai hero text readability and replace the active Temur proof image with the owner-provided `Ureni, the Song Unending` art crop. Keep the rest unchanged.

## Files reviewed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md`
- `C:\Users\obake\Downloads\temur_tdm-233-ureni-the-song-unending.jpg`
- `C:\Users\obake\Downloads\temur_tdm-233-ureni-the-song-unending.png`

## Files changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md`
- `assets/img/identity-hero/official/temur-ureni-song-unending.jpg`
- `docs/handoffs/2026-08-17-2352-codex-sultai-temur-proof-remediation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added Sultai-only hero text readability treatment:
  - lighter Sultai title color;
  - title text outline via `-webkit-text-stroke`;
  - stronger title/body/tagline/lore-summary shadows.
- Changed Temur's active proof mapping from `temur-ureni-unwritten.jpg` to the owner-provided `temur-ureni-song-unending.jpg`.
- Updated Temur focal position to `50% 42%`.
- Updated Temur credit to `Art: Alexander Ostrowski - Ureni, the Song Unending`.
- Updated focused helper assertions to protect the new Temur mapping and old asset preservation.

## Why it changed

Owner visual review found Sultai's text color blending with the art and rejected the prior Temur image as sideways/poor-fit. The changes are scoped to those two findings.

## Decisions made

- Used the owner-provided JPG because it is the art crop (`626x457`, `58391` bytes); the PNG is the full card frame (`745x1040`, `1115182` bytes).
- Preserved the prior Temur proof asset as a rollback option instead of replacing it in place.
- Used a Sultai-only text outline/shadow rather than changing global gradient, typography, layout, or hero structure.
- Did not perform browser/visual automation because visual testing remains owner-owned.

## RobDevPass compact implementation packet

- Changed behavior: Sultai hero text readability only; Temur active proof image/focal/credit only.
- Owning authority / producer: `assets/js/index.js` controls hero mapping/background generation; `assets/css/archscry.css` controls scoped presentation; `data/factions.json` remains untouched.
- Existing machinery reused: proof override map, existing `.guild-banner`, background shorthand, and proof credit.
- Protected behavior: all other proof mappings remain intact; non-proof identities remain on existing `.webp` paths; placement/scoring/routing/questionnaire/generated data/dossier copy/layout/deployment remain untouched.
- Smallest complete implementation: one new Temur asset path, one Temur map update, one Sultai-only CSS readability block, focused test updates.
- Non-goals: no global readability redesign, no full suite, no commit, no deploy.

## Risks / uncertainties

- Sultai readability improvement and Temur crop/focal remain owner-judgment surfaces.
- The Sultai title color is intentionally overridden only inside the Sultai hero to solve the reported art-color collision.

## Tests run

- `node --check assets\js\index.js` — PASS
- `node --check research\archscry-dossier-followup-tests.js` — PASS
- Focused in-memory Node helper assertions for Temur replacement, old Temur proof preservation, original Temur rollback preservation, Sultai CSS guard, and non-proof Prismari preservation — PASS
- `git diff --check` — PASS, with CRLF warnings only
- `Invoke-WebRequest` for `temur-ureni-song-unending.jpg` — PASS, HTTP 200

## Not touched

- Previous Temur proof asset `assets/img/identity-hero/official/temur-ureni-unwritten.jpg`
- Original Temur rollback asset `assets/img/identity-hero/temur.webp`
- Sultai asset mapping
- Data/dossier copy, scoring, routing, questionnaire, generated JSON, layout, deployment, and unrelated identities

## Follow-up recommendations

- Owner should re-review Sultai and Temur visually and adjust only scoped focal/CSS values if needed.

## Next suggested agent

Owner visual QA for Sultai and Temur.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md`
- `docs/handoffs/2026-08-17-2330-codex-five-hero-proofs.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`

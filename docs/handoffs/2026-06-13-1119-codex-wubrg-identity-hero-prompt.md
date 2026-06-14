# 2026-06-13 11:19 - Codex - WUBRG Identity Hero Prompt

## Agent Name

Codex

## Task Requested

Research WUBRG against the other local identity hero cards, inspect their visual language, and create a prompt to generate the WUBRG identity hero card.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-0750-codex-vm367-wubrg-gold-layer1-layer2.md`
- `docs/handoffs/2026-06-13-0912-codex-wubrg-source-bound-deepening.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/2026-06-05-0736-codex-vm293-witch-identity-hero-background.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-367-wubrg-gold-layer1-layer2.md`
- `docs/kanban/done/VM-368-wubrg-commander-support-verification.md`
- `docs/kanban/done/VM-369-colorless-wubrg-crucible-readiness.md`
- `docs/kanban/done/VM-370-wubrg-claim-backed-lore-depth.md`
- `data/raw-factions/wubrg/wubrg.profile.json`
- `data/raw-factions/wubrg/wubrg.placement.json`
- `data/raw-factions/wubrg/wubrg.claims.json`
- `docs/research/wubrg/wubrg-depth-readiness-matrix.md`
- `docs/research/wubrg/wubrg-layer2-gold-findings.md`
- Representative files in `assets/img/identity-hero/`

## Files Changed

- `docs/kanban/done/VM-371-wubrg-identity-hero-generation-prompt.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-13-1119-codex-wubrg-identity-hero-prompt.md`

## What Changed

- Created and closed VM-371 as a prompt-only creative direction card.
- Added this handoff and indexed it.
- Produced a WUBRG identity hero generation prompt for final delivery to the user.

## Why It Changed

The existing hero set has a consistent wide, cinematic, environment-led dossier-background language, while WUBRG has no hero asset yet and prior WUBRG cards intentionally kept hero rollout out of scope. This pass gives the user a source-bound generation prompt without wiring or generating any asset.

## Decisions Made

- Treat the requested output as a prompt only, not as approval to generate or wire a `wubrg.webp` asset.
- Keep the prompt centered on Five-Color as negotiated synthesis, not superiority, completion, official doctrine, Colorless restriction, four-color missing-color identity, or generic goodstuff.
- Preserve the local visual grammar: wide banner, symbolic landscape, readable center, no typography, no logos, no literal MTG card frame.

## Risks / Uncertainties

- Future asset generation may need several iterations to avoid rainbow clutter and preserve overlay readability.
- If a generated asset is later accepted, a separate implementation card should add `assets/img/identity-hero/wubrg.webp`, explicit mapping, focused tests, and visual QA.
- The worktree was broadly dirty before this task; unrelated changes were preserved.

## Tests Run

- Local file and image inspection only.
- No automated tests were run because this is a prompt/bookkeeping-only task.

## Not Touched

- No image generation.
- No `assets/img/identity-hero/` asset bytes.
- No runtime mapping.
- No generated data.
- No WUBRG raw fact/content changes.
- No routes, aliases, Home preview, public directory, schema, API, Maze, Commander support, or Supabase changes.
- No staging or commits.

## Follow-Up Recommendations

- Generate a candidate at the same wide banner aspect as the existing identity hero assets.
- Before wiring it, create a separate WUBRG identity-hero hookup card that explicitly approves the asset and adds mapping/tests.
- Visually QA desktop and mobile dossier overlays before accepting the image.

## Next Suggested Agent

Frontend implementation agent if the user wants the generated asset wired into Archscry later.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-371-wubrg-identity-hero-generation-prompt.md`
- `docs/kanban/done/VM-367-wubrg-gold-layer1-layer2.md`
- `docs/kanban/done/VM-368-wubrg-commander-support-verification.md`
- `docs/kanban/done/VM-369-colorless-wubrg-crucible-readiness.md`
- `docs/kanban/done/VM-370-wubrg-claim-backed-lore-depth.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`

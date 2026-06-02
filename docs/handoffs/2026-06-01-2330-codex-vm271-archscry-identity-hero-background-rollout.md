# VM-271 Archscry Identity-Hero Background Rollout Handoff

## Agent Name

Codex

## Task Requested

Roll out the Jeskai hero-image treatment to all 30 currently dossier-backed Archscry factions using the mapped `assets/img/identity-hero/*.webp` hero assets required by the current helper, while keeping the work dossier-only and preserving generated data, raw/research docs, Maze, routes, and Supabase surfaces outside the scoped asset bundle.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-01-0836-codex-vm270-jeskai-hero-background-image-trial.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-270-jeskai-archscry-hero-background-image-trial.md`
- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `data/factions.json`
- `assets/img/identity-hero/*.webp`

## Files Changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `research/archscry-dossier-followup-tests.js`
- `assets/img/identity-hero/abzan.webp`
- `assets/img/identity-hero/azorius.webp`
- `assets/img/identity-hero/bant.webp`
- `assets/img/identity-hero/black.webp`
- `assets/img/identity-hero/blue.webp`
- `assets/img/identity-hero/boros.webp`
- `assets/img/identity-hero/dimir.webp`
- `assets/img/identity-hero/esper.webp`
- `assets/img/identity-hero/golgari.webp`
- `assets/img/identity-hero/green.webp`
- `assets/img/identity-hero/grixis.webp`
- `assets/img/identity-hero/gruul.webp`
- `assets/img/identity-hero/izzet.webp`
- `assets/img/identity-hero/jeskai.webp`
- `assets/img/identity-hero/jund.webp`
- `assets/img/identity-hero/lorehold.webp`
- `assets/img/identity-hero/mardu.webp`
- `assets/img/identity-hero/naya.webp`
- `assets/img/identity-hero/orzhov.webp`
- `assets/img/identity-hero/prismari.webp`
- `assets/img/identity-hero/quandrix.webp`
- `assets/img/identity-hero/rakdos.webp`
- `assets/img/identity-hero/red.webp`
- `assets/img/identity-hero/selesnya.webp`
- `assets/img/identity-hero/silverquill.webp`
- `assets/img/identity-hero/simic.webp`
- `assets/img/identity-hero/sultai.webp`
- `assets/img/identity-hero/temur.webp`
- `assets/img/identity-hero/white.webp`
- `assets/img/identity-hero/witherbloom.webp`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`

## What Changed

- Replaced the VM-270 Jeskai-only hero background path with a shared dossier helper that maps the 30 current dossier-backed mono, guild, college, shard, and wedge keys to identity hero image slugs.
- Added `heroBannerImageSlugForFaction(faction)` using `faction.key` as the only lookup source and preserving the existing two-color key order.
- Kept `heroBannerBackgroundForFaction(faction)` as the shared background helper, composing image-backed heroes as:
  - `overlay, image, faction.banner` when a mapped faction has a banner.
  - `overlay, image` when a mapped faction has no banner.
  - `faction.banner || ""` for unmapped factions.
- Added `data-hero-background="identity-image"` to image-backed `.guild-banner` markup while preserving `data-faction-key`.
- Replaced the Jeskai-only overlay suppression CSS with the generic image-backed selector:
  - `.guild-banner[data-hero-background="identity-image"]::before`
- Expanded the focused dossier regression tests to cover the 30-key mapping, asset path existence, fallback behavior, markup hook, CSS hook, and excluded identities.
- Included the mapped hero assets for the 30 dossier-backed identities in the closeout bundle while leaving `assets/img/identity-hero/colorless.webp`, `WUBRG`, and four-color rollout work out of scope.
- Moved VM-271 through the Kanban board to Done.

## Why It Changed

The repo now has a mapped identity-hero asset bundle for the current 30-identity Archscry dossier rollout set. VM-271 generalizes the successful VM-270 Jeskai hero background trial without changing canonical faction data or generated display sources.

## Decisions Made

- `faction.key` is the authoritative lookup key. The helper does not derive image slugs from names, titles, colors, existing banners, or filenames.
- The image mapping intentionally includes exactly the 30 current dossier-backed mono, guild, college, shard, and wedge keys.
- `COLORLESS`, `WUBRG`, and four-color keys remain unmapped.
- The key-to-slug map stays private and frozen; tests validate behavior through the exported helper.
- The CSS suppression is generic for identity-image heroes instead of faction-specific.

## Risks / Uncertainties

- Visual QA showed the image-backed treatment working on desktop and mobile. Mobile copy remains naturally tight for some long dossier text, which predates this rollout and was not changed here.
- The mapping depends on the current `data/factions.json` key set; future dossier-backed identities should add an explicit image mapping and asset in the same pattern.

## Tests Run

- `node --check assets/js/index.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- assets/js/index.js assets/css/archscry.css research/archscry-dossier-followup-tests.js docs/kanban/board.md docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-01-2330-codex-vm271-archscry-identity-hero-background-rollout.md`
- Visual QA with a temporary local preview harness for representative `W`, `WU`, `LOREHOLD`, `MARDU`, and `JESKAI` heroes at desktop and mobile widths.

## Not Touched

- No generated faction data or generated display sources were edited.
- No raw faction packets, research docs, or architecture docs were edited.
- No Maze logic, routes, Home preview membership, Supabase context, schema, fixtures, or builder outputs were edited.
- The scoped asset bundle includes only the mapped hero assets for the 30 dossier-backed identities; `assets/img/identity-hero/colorless.webp`, `WUBRG`, and future four-color image-rollout work remain out of scope.
- No image assets were regenerated, renamed, converted, decoded, optimized, or otherwise processed.

## Follow-Up Recommendations

- If future four-color or five-color dossiers become live, add their image assets and explicit mappings in a dedicated card.
- Consider a later copy/layout polish card for very long dossier hero prose on narrow mobile widths.

## Next Suggested Agent

Frontend implementation agent for any follow-up visual QA polish, or Kanban Steward if reserving the next image rollout follow-up.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-271-archscry-identity-hero-background-rollout.md`
- `docs/handoffs/2026-06-01-0836-codex-vm270-jeskai-hero-background-image-trial.md`

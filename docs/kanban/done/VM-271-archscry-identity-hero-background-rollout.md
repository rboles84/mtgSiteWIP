# VM-271 - Archscry Identity-Hero Background Rollout

ID: VM-271
Title: Archscry Identity-Hero Background Rollout
Status: done
Type: Runtime QA Polish / Archscry Hero
Area: Archscry Dossier, Identity Hero Assets
Priority: medium
Created: 2026-06-01

## Summary

Roll out the VM-270 Jeskai hero-image treatment to the 30 currently dossier-backed Archscry factions, including the mapped `assets/img/identity-hero/*.webp` hero assets required by the current helper while leaving `COLORLESS`, `WUBRG`, and four-color identities out of scope.

## Scope

- Perform AGENTS.md pre-flight before editing.
- Generalize the current Jeskai hero background helper to all current dossier-backed mono, guild, college, shard, and wedge keys.
- Use `faction.key` as the only lookup source and preserve existing two-color key order.
- Add a generic `data-hero-background="identity-image"` mode for mapped image-backed heroes.
- Replace the Jeskai-only overlay suppression with a generic image-backed overlay suppression rule.
- Preserve current `faction.banner` values as bottom accent layers when present.
- Do not edit generated data, raw docs, research docs, builder outputs, Maze logic, routes, or Supabase context.
- Keep image-asset scope limited to the 30 mapped dossier-backed hero assets included in this closeout bundle, leaving `assets/img/identity-hero/colorless.webp`, `WUBRG`, and four-color rollout work out of scope.

## Acceptance Criteria

- [x] All 30 current dossier-backed faction keys resolve to an identity hero image slug.
- [x] `COLORLESS`, `WUBRG`, and four-color keys remain unmapped.
- [x] Mapped heroes compose `overlay, image, faction.banner` when a banner exists.
- [x] Mapped heroes compose `overlay, image` when no banner exists.
- [x] Unmapped heroes preserve `faction.banner || ""`.
- [x] `.guild-banner` keeps `data-faction-key` and gains the explicit hero-background mode.
- [x] CSS uses the generic image-backed `::before` suppression selector.
- [x] Focused dossier follow-up regressions cover mapping, asset existence, fallback behavior, markup, and CSS.

## Closeout

Completed as a dossier-only runtime/test polish pass. Visual QA covered representative mono, guild, college, wedge, and Jeskai heroes on desktop and mobile widths; image-backed hero treatment loaded and remained readable without double-darkening. The closeout bundle includes the mapped hero assets for the 30 dossier-backed identities and excludes `assets/img/identity-hero/colorless.webp` plus any future `WUBRG` or four-color rollout work.

# VM-270 - Jeskai Archscry Hero Background Image Trial

ID: VM-270
Title: Jeskai Archscry Hero Background Image Trial
Status: done
Type: Runtime QA Polish / Archscry Hero
Area: Archscry Dossier, Jeskai
Priority: medium
Created: 2026-06-01

## Summary

Apply a Jeskai-only dossier hero background image treatment using the existing `assets/img/identity-hero/jeskai.webp` asset, while preserving all non-Jeskai hero behavior and avoiding generated banner-source changes.

## Scope

- Perform AGENTS.md pre-flight before editing.
- Add a Jeskai-only hero-background helper in the Archscry dossier renderer.
- Add a faction-key hook directly on the `.guild-banner` element.
- Suppress the shared hero overlay for Jeskai only so the supplied background stack renders without double darkening.
- Keep copy, layout, mana pips, accent color, routes, generated data, Maze logic, and non-Jeskai heroes unchanged.

## Acceptance Criteria

- [x] `assets/img/identity-hero/jeskai.webp` is referenced only by the Jeskai dossier hero.
- [x] The `.guild-banner` hero element carries `data-faction-key="${faction.key}"`.
- [x] Jeskai uses the exact supplied gradient / image / gradient background stack.
- [x] Jeskai-only overlay suppression is scoped to `.guild-banner[data-faction-key="JESKAI"]::before`.
- [x] Non-Jeskai heroes keep existing background behavior.
- [x] Focused dossier follow-up regression covers the Jeskai hook, background stack, image path, and CSS override.

## Closeout

Completed: 2026-06-01

Result: The Archscry dossier hero now applies the exact Jeskai-only gradient / image / gradient background stack through a dedicated runtime helper, the `.guild-banner` element exposes a faction-key hook for targeted styling, and the shared hero overlay is suppressed only for `JESKAI` so the new image treatment renders without double darkening while non-Jeskai heroes continue to use their existing banner flow.

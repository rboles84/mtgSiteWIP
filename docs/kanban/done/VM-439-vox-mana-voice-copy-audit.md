# VM-439 - Vox Mana Voice And Copy Audit

Status: Done
Owner: Codex
Created: 2026-06-30
Completed: 2026-06-30

## Summary

Run a full Vox Mana product voice, UX writing, MTG/Commander-aware, and anti-slop audit across public-facing copy, data-fed identity copy, route microcopy, legal/product boundary copy, and source-library framing.

## Scope

- Review Home, Archscry, identity dossiers, Maze, Strategium, Apocrypha, navigation, labels, empty/error states, and data-fed identity surfaces.
- Check product boundary language against "Commander identity and taste compass, not a deckbuilder".
- Run a high-risk language sweep for generic AI phrasing, fantasy inflation, and deckbuilder/recommendation drift.
- Produce a durable 14-section report with exact paths, quote evidence, replacement patterns, voice guide, regression checklist, and recommended tickets.
- Preserve runtime code, generated data, source packets, external vault files, and active VM-422 behavior.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-27-1903-codex-vm424-homepage-positioning.md`
- `docs/handoffs/2026-06-29-0013-codex-vm426-reading-finds.md`
- `docs/handoffs/2026-06-23-2033-codex-vm416-strategium-content-pass.md`
- `docs/handoffs/2026-06-29-1856-codex-vm428-deep-audit-report.md`
- `docs/handoffs/2026-06-29-2332-codex-vm429-self-snapshot.md`
- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `docs/design/visual-style-guide.md`
- `docs/reference/source-generated-guardrails.md`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `assets/js/index.js`
- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/adaptive-placement.js`
- `assets/js/strategium.js`
- `research/research-init.js`
- `research/maze-scratchpad-store.js`
- `data/identity-layers.json`
- `data/factions.json`
- `data/taxonomy/vox-mana-tags.json`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precon-catalog.json`

## Files Changed

- `docs/audits/2026-06-30-vox-mana-voice-audit.md`
- `docs/kanban/done/VM-439-vox-mana-voice-copy-audit.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-30-0001-codex-vm439-voice-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Acceptance Criteria

- [x] Report gives a PASS/REVISION NEEDED/BLOCKED voice verdict.
- [x] Report separates confirmed repo evidence, reasonable inference, and unknowns.
- [x] Report includes exact file paths and visible phrases for meaningful copy issues.
- [x] Report evaluates product boundary, anti-slop gates, identity consistency, and MTG/Commander accuracy risk.
- [x] Report proposes a concise Vox Mana voice guide and surgical rewrite samples.
- [x] Report includes a voice regression checklist and practical recommended tickets.
- [x] Runtime code, generated data, source packets, and VM-422 behavior remain untouched.

## Validation

- Documentation-only audit; no runtime tests required.
- `git diff --check` run after documentation updates.

## Follow-Up

Recommended next implementation ticket: repair Archscry + Privacy/Terms + dossier labels first, then run the voice regression checklist against the changed surfaces.

# VM-440 - Voice Boundary Copy Repair

Status: Done
Owner: Codex
Created: 2026-06-30
Completed: 2026-06-30
Source audit: VM-439

## Summary

Repair the release-blocking Vox Mana voice boundary issues called out by VM-439: Archscry stale scope, Privacy/Terms stale AI and guild/college language, and dossier labels that imply deckbuilding.

## Scope

- Rewrite visible Archscry entry copy around Commander identity, placement readings, dossier cues, and external browsing context.
- Remove stale 10-guild/5-college and AI-powered reading language from Privacy and Terms.
- Rename visible dossier labels and export headings while preserving internal IDs, classes, selectors, storage keys, route paths, and placement behavior.
- Keep changes to visible copy only.

## Acceptance Criteria

- No public Archscry landing copy says "guild or college", "staple cards", "land guidance", or "Commander deck-start links".
- Privacy/Terms no longer claim old 15-faction scope or active AI-powered readings.
- Dossier-visible labels use support/browsing language instead of build-plan language.
- No internal key, CSS hook, localStorage value, or route is renamed.

## Validation

- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:placement` - passed after expected copy-assertion updates.
- `npm.cmd run test:presentation-snapshots` - passed.
- `npm.cmd run dossier:audit` - passed with 0 failures and existing warning-only dossier audit output.
- `npm.cmd test` - passed.
- `git diff --check` - passed with line-ending warnings only.

## Related

- `docs/audits/2026-06-30-vox-mana-voice-audit.md`
- `docs/handoffs/2026-06-30-0001-codex-vm439-voice-audit.md`

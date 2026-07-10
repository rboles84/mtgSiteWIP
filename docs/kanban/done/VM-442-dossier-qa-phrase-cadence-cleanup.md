# VM-442 - Dossier QA Phrase And Cadence Cleanup

Status: Done
Owner: Codex
Created: 2026-06-30
Completed: 2026-06-30
Source audit: VM-439

## Summary

Remove user-visible internal QA phrasing and repetitive generated cadence from hardcoded Archscry presentation/dossier copy.

## Scope

- Replace visible "false-positive boundaries", "source-bound ... identity", and "Commander-facing proof" phrasing with plain separation/support language.
- Rewrite repeated "The reading was not one-note" adjacent-fit text with varied, plain patterns.
- Reduce repeated "leverage" only in hardcoded visible copy.
- Do not hand-edit `data/factions.json` or `data/identity-layers.json`.

## Acceptance Criteria

- User-visible Archscry presentation copy no longer exposes internal QA phrases.
- Adjacent-fit fallback copy varies enough to avoid repeated "not one-note" cadence.
- Source/generated authority remains intact.
- No placement scoring, result shape, or data model changes.

## Validation

- `npm.cmd run test:placement` - passed after expected copy-assertion updates.
- `npm.cmd run test:presentation-snapshots` - passed.
- `npm.cmd run dossier:audit` - passed with 0 failures and existing warning-only dossier audit output.
- `npm.cmd test` - passed.
- `git diff --check` - passed with line-ending warnings only.

## Related

- `docs/audits/2026-06-30-vox-mana-voice-audit.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md`

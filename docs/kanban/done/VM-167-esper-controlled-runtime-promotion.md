# VM-167 - Esper Controlled Runtime Promotion

## Status

Done

## Summary

Promoted Esper from the VM-166 review-gated raw packet into one live Archscry placement expression key: `ESPER`.

## Scope

- Promoted raw `esper` to generated expression key `ESPER`.
- Kept `WUB` as color-direction metadata only.
- Kept Home preview unchanged and `preview_eligible: false`.
- Updated source raw status, identity registry, builder mapping/scoring, generated faction artifacts, placement tests, Kanban, and handoff.

## Guardrails

- Did not create a live/generated `WUB` key, alias, fixture key, route key, registry key, or `RAW_TO_KEY` target.
- Did not add a runtime `domain` field.
- Did not expand Home preview.
- Did not add route, Maze, Home UI, CSS, schema redesign, or hand-authored Supabase source changes.
- Did not turn expanded Esper lore into raw claim or placement evidence.
- Trimmed live collision guidance to active targets only.

## Acceptance Checks

- Passed: baseline count was captured before edits at 21 factions / 21 placement records.
- Passed: final generated count is 22 factions / 22 placement records.
- Passed: `ESPER` appears in factions, placement model, identity layers, and generated Supabase context.
- Passed: `WUB` remains metadata-only and absent from generated keys/aliases.
- Passed: Esper golden path wins `ESPER`.
- Passed: Home preview remains exactly 20 entries.
- Passed: `npm run build:factions`, `npm run test:placement`, and `npm test`.

## Notes

`data/archscry-flavor-snippets.json` was regenerated because the existing Archscry dossier follow-up test requires card-voice snippets for every live faction key. This follows the VM-160 Bant promotion precedent.

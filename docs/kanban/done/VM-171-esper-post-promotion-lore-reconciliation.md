# VM-171 - Esper Post-Promotion Lore Reconciliation

## Status

Done

## Summary

Run a conservative post-VM-167 reconciliation pass now that `ESPER` is live. Fix stale pre-live and review-gated wording, restore the active Esper research packet path to `docs/research/esper/`, and keep richer Esper lore deferred or source-bound unless promoted evidence already supports it.

## Scope

- Restore active Esper research packet references to `docs/research/esper/`.
- Update bounded Esper authored surfaces:
  - `data/raw-factions/esper/esper.profile.json`
  - `data/raw-factions/esper/esper.placement.json`
  - `data/raw-factions/esper/esper.sources.json`
  - `data/raw-factions/esper/esper.changelog.json`
  - `docs/architecture/colors/esper/identity.md`
  - `docs/architecture/colors/esper/metaphysics.md`
- Allow generated placement artifacts only as deterministic `npm run build:factions` output.
- Preserve `ESPER` as the live key and `WUB` as metadata-only color identity.

## Acceptance Notes

- No new Esper lore claims, named figures, faction terms, or mechanical interpretations were promoted.
- Manual-fill topics remain deferred/source-bound.
- Placement scoring, Hall prompts, lateral inhibition, Home preview, routes, schemas, and runtime key structure were not hand-edited.
- Generated copy was rebuilt from raw/source changes.

## Tests

- JSON parse and source/claim reference validation across all Esper raw JSON files.
- Source-path check for `docs/research/esper/`.
- Stale pre-live wording scan.
- Lore-boundary scan by claim posture.
- `npm run build:factions`
- `npm run test:placement`
- `npm test`
- `git diff --check`

## Related

- `docs/handoffs/2026-05-30-0847-codex-vm171-esper-post-promotion-lore-reconciliation.md`
- `docs/kanban/done/VM-167-esper-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-166-esper-raw-faction-source-packet.md`
- `docs/kanban/done/VM-165-esper-docs-parity-fill.md`
- `docs/kanban/done/VM-163A-VM-164-esper-packet-repair-base-docs.md`

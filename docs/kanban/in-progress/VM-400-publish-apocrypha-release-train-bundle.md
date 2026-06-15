# VM-400 - Publish Apocrypha Release Train Bundle

ID: VM-400
Title: Publish Apocrypha Release Train Bundle
Status: in-progress
Type: Release Hygiene / Git
Area: Apocrypha, Home, Release Readiness
Priority: high
Created: 2026-06-15

## Summary

Classify, verify, commit, and push the documented VM-387 through VM-399 dirty tree on `feature/ui-refactor-exploration`.

## Scope

- Preserve documented VM-387 through VM-399 work.
- Include VM-393-classified `docs/research/vox-mana-decomposition-*.html` design-archive candidates if verification remains clean.
- Include VM-394 `.gitignore` hardening and documented exposure-audit records.
- Exclude transient `TEMPvm*.log` scratch logs.
- Push to `origin/feature/ui-refactor-exploration` without force.

## Out Of Scope

- No main promotion, tag, merge, or force-push.
- No new product redesign beyond documented VM-387 through VM-399 work.
- No lore, Commander fact, placement-generation, Maze, API/schema, alias, Supabase policy, visual-baseline, or Lighthouse-score changes.
- No broad docs/archive scrub beyond the documented publish bundle.

## Acceptance Criteria

- Dirty tree classification is documented in the VM-400 handoff.
- Scratch logs are excluded or removed before staging.
- Required verification gates pass or documented waivers from VM-390 through VM-394 are carried forward.
- Staged bundle contains only classified files.
- Commit hash, push target, and final clean/aligned status are recorded.

## Verification Notes

- Scratch logs were removed before staging.
- `build:factions` passed and left the expected source/generated identity diff pair: `data/identity-layers.json` and `data/factions.json`.
- Core, parser, placement, source/generated, lint, dossier, frontend-smoke, Gate compression, Gate live-bias, Apocrypha visual, and diff hygiene gates passed.
- Home, Archscry, Strategium visual compares and Home Lighthouse remain documented waivers from VM-390 through VM-392.

## Validation Checklist

- [x] Preflight docs reviewed.
- [x] Dirty tree classified.
- [x] Scratch logs excluded or removed.
- [x] Tests run.
- [x] Classified files staged.
- [ ] Bundle committed.
- [ ] Branch pushed.
- [ ] Final clean status confirmed.

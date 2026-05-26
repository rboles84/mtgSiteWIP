# VM-135 - Archscry Card Voices, Identity Story, And Land Deduping

## Status

Done

## Summary

Replace the decorative Archscry radar companion animation with source-grounded card flavor snippets, reshape Layered Identity into a lighter self-understanding story, and fix mana-base duplicate rendering for double-faced and repeated lands.

## Scope

- Add a small derived Archscry flavor snippet data file generated from committed Scryfall indexes.
- Backfill college `core_tension` into `data/identity-layers.json` from existing college-specific faction copy.
- Rework Layered Identity into `Belief`, `Tension`, and `Self-Check`, with Belief carrying the visual weight.
- Remove expression glyph / percentage-style presentation from Layered Identity.
- Replace `vm-faction-signal-panel` with `Cards That Sound Like This`.
- Canonicalize land recommendation dedupe across DFC face names and all visible tiers.

## Non-Goals

- No placement scoring changes.
- No saved-result schema changes.
- No auth or Supabase changes.
- No Maze handoff contract changes.
- No route rewrite or framework migration.
- No invented or paraphrased card flavor text.

## Acceptance Criteria

- `/archscry/` no longer renders the decorative faction signal panel.
- Placement panel renders 2-3 grounded card flavor snippets for mono, guild, and college placements.
- Layered Identity reads as a weighted self-understanding sequence: Belief, Tension, Self-Check.
- College tensions are distinct from matching guild tensions.
- White mana-base output does not duplicate `Emeria's Call`, `Emeria, Shattered Skyclave`, or `War Room`.
- Protected land card-art prefixes remain stable: `lp_`, `lm_`, `lb_`, `lu_`.
- Tests and Archscry visual baselines are updated intentionally.

## Notes

- Builds on VM-130, VM-131, and VM-132.
- Keep the broad existing dirty worktree intact.

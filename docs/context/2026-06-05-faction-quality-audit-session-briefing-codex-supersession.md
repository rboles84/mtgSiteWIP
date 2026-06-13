# Codex Supersession Note For 2026-06-05 Faction Quality Audit Briefing

This note supersedes `docs/context/2026-06-05-faction-quality-audit-session-briefing.md` for workflow and source-of-truth purposes.

The briefing remains preserved as symptom inventory. Do not delete it. Do not follow it as an implementation recipe.

## Correction

The briefing describes `data/factions.json`, `data/placement-model.json`, and `data/archscry-flavor-snippets.json` as direct authoring targets for faction quality work. That is unsafe.

The active source-of-truth contract is:

- Durable placement authoring belongs in `data/raw-factions/**` and approved builder/source inputs.
- `data/placement-model.json`, `data/placement-model.schema.json`, and Supabase faction context are generated outputs from `research/build-faction-artifacts.mjs`.
- `data/factions.json` is a generated display surface that the builder also reads and preserves as display input. Public copy may survive generation, but it is not raw proof or placement calibration authority.
- `data/archscry-flavor-snippets.json` is generated or generated-adjacent runtime display data. Flavor copy must be source-verified and contract-safe before it is treated as durable.
- Source roles are binding. Support-only, synthesis-only, shaping-only, manual-fill, and discovery-only material cannot become proof.

## Current Codex Status

VM-294 Jeskai, VM-295 Witch, and VM-296 Mardu are completed but untrusted pending source repair. Their generated/display copy may contain useful material, but VM-297 found that the placement-model authoring is not source-durable.

The next work is not Yore, Dune, Glint, Ink, five-color, colorless, or another faction-quality placement pass.

Required next cards:

- VM-298: Witch repair.
- VM-299: Jeskai and Mardu source-durability repair.
- VM-300: Generated/source guardrails.

## Stop Rule

No additional faction-quality placement pass may proceed until VM-298, VM-299, and VM-300 are created or explicitly scoped from VM-297 audit findings.

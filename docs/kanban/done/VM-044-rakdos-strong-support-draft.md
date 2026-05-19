# VM-044 - Rakdos Strong Support Draft

ID: VM-044
Title: Rakdos Strong Support Draft
Status: done
Type: Documentation / content architecture
Area: Cult of Rakdos, guild identity, metaphysics, support matrix
Priority: high
Created: 2026-05-18

## Summary

Create the missing Cult of Rakdos `identity.md` and `metaphysics.md` architecture files using the VM-034 identity/metaphysics schema anchors as structure, while treating Rakdos as an expression-level guild pilot rather than a mono-color source set.

The final draft must bring every required identity/metaphysics section to strong support. The `Color Relationships` row must use exact paired repo-relative anchors for Gruul, Prismari, Boros, Orzhov, Izzet, Dimir, mono Black, and mono Red.

## Acceptance Criteria

- `docs/architecture/colors/rakdos/identity.md` exists and follows the VM-034 required section anchors.
- `docs/architecture/colors/rakdos/metaphysics.md` exists and follows the VM-034 required section anchors.
- `identity.md / Color Relationships` includes paired Rakdos/neighbor evidence anchors for all requested contrasts.
- Metaphysical thesis and matrix language are explicitly framed as Vox Mana internal architecture, not MTG canon.
- No runtime, build, placement, UI, raw JSON, source research, other guild, school, or mono-color files are modified.
- `node research/validate-mono-color-markdown.mjs` passes as regression.
- Manual Rakdos H2 anchor/order checks pass for both new files.
- Required boundary phrase checks pass.
- A handoff file is created and `docs/handoffs/HANDOFF_INDEX.md` is updated.

## Scope Guardrails

- Do not invent MTG lore, card facts, commander facts, or project decisions.
- Do not reduce Rakdos to generic evil chaos.
- Do not treat Rakdos as a blind merge of Black and Red.
- Do not treat Vox Mana metaphysics as official MTG canon.
- Do not edit Boros, Azorius, Gruul, Dimir, Izzet, Orzhov, other guilds, schools, mono files, raw faction data, runtime code, or generated artifacts.

## Status Notes

- Complete: drafted Rakdos `identity.md` and `metaphysics.md` with all required schema sections present.
- Complete: upgraded `identity.md / Color Relationships` to strong support with exact paired anchors for Gruul, Prismari, Boros, Orzhov, Izzet, Dimir, mono Black, and mono Red.
- Complete: framed metaphysical thesis, system mapping, and matrix language as Vox Mana internal architecture, not MTG canon.
- Complete: left runtime, build, placement, UI, raw data, other guild, school, and mono-color files untouched.

## Tests Run

- `node research/validate-mono-color-markdown.mjs` - pass.
- Manual/scripted Rakdos H2 order check for `identity.md` and `metaphysics.md` - pass after correcting PowerShell quoting on the first attempt.
- Required phrase search for `Vox Mana internal architecture`, `not MTG canon`, `compression-only`, `no new nouns`, and `no new doctrine` - pass.
- Exact anchor search for all requested paired contrast anchors - pass.
- ASCII scan on new Rakdos docs, this card after move to `done/`, handoff, handoff index, and board - pass.
- `git status --short` - checked; broader worktree already contains unrelated dirty/untracked changes outside this Rakdos pass.

# VM-045 - Selesnya Identity Metaphysics Draft

ID: VM-045
Title: Selesnya Identity Metaphysics Draft
Status: done
Type: Documentation / content architecture
Area: Selesnya Conclave, guild identity, metaphysics, support matrix
Priority: high
Created: 2026-05-18

## Summary

Create the missing Selesnya Conclave `identity.md` and `metaphysics.md` architecture files using `docs/reference/identity-metaphysics-markdown-schema.md` as the structural source of truth.

Selesnya must be handled as an expression-level guild pilot. The draft should be evidence-backed from approved source files and should not be treated as a mono-color document or a blind Green plus White merge.

## Evidence Scope

Direct authority:

- `data/raw-factions/selesnya_conclave/`
- `data/factions.json`
- `docs/reference/commander-faction-guidance.md`
- Approved canon and research files listed in the task

Prior project synthesis only:

- `docs/research/selesnya/`
- `docs/research/guild_college_identity_metaphysics/`

## Acceptance Criteria

- `docs/architecture/colors/selesnya/identity.md` exists and follows the required schema section anchors.
- `docs/architecture/colors/selesnya/metaphysics.md` exists and follows the required schema section anchors.
- Each required section is supported by the current Selesnya evidence map.
- Direct evidence, light Vox Mana synthesis, and missing or unsupported material are kept separate.
- Metaphysical thesis, Vox Mana Read, system mapping, and matrix language are explicitly framed as project synthesis or Vox Mana internal architecture, not MTG canon.
- Boundary language includes `compression-only`, `no new nouns, mechanics, or doctrine`, `Vox Mana internal architecture derived from approved evidence`, and `not MTG canon`.
- No runtime, build, placement, UI, raw faction JSON, generated data, mono-color, other guild, or school files are modified.
- Manual H1/H2 schema-order checks pass for both new files.
- `node research/validate-mono-color-markdown.mjs` passes as regression.
- A handoff file is created and `docs/handoffs/HANDOFF_INDEX.md` is updated.

## Scope Guardrails

- Do not invent MTG lore, card facts, commander facts, or project decisions.
- Do not reduce Selesnya to generic good community.
- Center belonging, harmony, collective identity, peace through shared life, interdependence, duty, and spiritual/social unity.
- Suppress generic GW goodstuff, generic tokens-only, generic lifegain-only, generic enchantress-only, generic nature = Green only, and generic order/community = White only.
- Preserve the read shape: shared life -> collective body -> preservation through unity.
- Do not confuse Selesnya with Azorius procedure, Boros urgent justice, Orzhov hierarchy/debt, Gruul anti-civilization rage, or Simic managed adaptation.
- Treat `docs/research/selesnya/` as prior architecture/synthesis only, not doctrine authority.

## Status Notes

- Complete: created Selesnya `identity.md` and `metaphysics.md` with required schema sections.
- Complete: kept Selesnya as an expression-level guild pilot, not a mono-color merge.
- Complete: separated direct evidence, light Vox Mana synthesis, and unsupported/missing material in source notes.
- Complete: framed metaphysical thesis, Vox Mana Read, system mapping, and matrix language as Vox Mana internal architecture and not MTG canon.
- Complete: added Selesnya-specific false-positive guardrails for generic GW goodstuff, generic tokens-only, generic lifegain-only, generic enchantress-only, generic nature = Green only, and generic order/community = White only readings.
- Complete: left runtime, build, placement, UI, raw faction JSON, generated data, mono-color files, other guild files, and school files untouched.

## Tests Run

- Manual/scripted H1/H2 schema-order checks for both new files - pass.
- `node research/validate-mono-color-markdown.mjs` - pass.
- Required boundary phrase search for `compression-only`, `no new nouns, mechanics, or doctrine`, `Vox Mana internal architecture derived from approved evidence`, and `not MTG canon` - pass.
- Selesnya false-positive guardrail search - pass.
- ASCII scan on new Selesnya docs and this card - pass.
- `git status --short` - checked; broader worktree already contained unrelated dirty/untracked files outside this VM-045 pass.

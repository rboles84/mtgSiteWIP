# VM-050 - Golgari Identity Metaphysics

ID: VM-050
Title: Golgari Identity Metaphysics
Status: done
Type: Documentation / content architecture
Area: Golgari Swarm, guild identity, metaphysics, schema-compatible authoring
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Created Golgari Swarm `identity.md` and `metaphysics.md` using `docs/reference/identity-metaphysics-markdown-schema.md` as the structural source of truth.

Golgari is treated as an expression-level Ravnica guild, not as mono Black plus mono Green, not as generic black-green, and not as Witherbloom at city scale. Metaphysical thesis, Core Axiom, system mapping, and matrix language are framed as Vox Mana internal synthesis, not MTG canon.

## Outcome

- Created `docs/architecture/colors/golgari/identity.md`.
- Created `docs/architecture/colors/golgari/metaphysics.md`.
- Used the canonical identity H2 anchors in order, with optional `Source Notes` before `Summary`.
- Used the canonical metaphysics H2 anchors in order, with optional `Metaphysical Thesis` before `Philosophical Foundations`.
- Kept direct evidence, light Vox Mana synthesis, prior art, and unsupported material separated.
- Centered the expression on life/death continuity, decay as nourishment, rot as infrastructure, undercity survival, graveyard recursion, sacrifice, dredge, scavenge, undergrowth, rot farms, and swarm identity.
- Left runtime, build, placement, UI, raw JSON, generated artifact, mono-color, other guild, and school files untouched.

## Support Matrix

| Section | Support | Notes |
|---|---:|---|
| identity.md / Identity Overview | strongly supported | Raw Golgari profile/claims, `data/factions.json`, and enhanced research support guild identity, Ravnica setting, death, decay, survival, and renewal. |
| identity.md / Core Drive | strongly supported | "Death, decay, survival, and renewal are one cycle" plus Rosewater BG life/death philosophy support the drive. |
| identity.md / Vox Mana Read (Core Axiom) | strongly supported as Vox Mana synthesis | Compression-only; no new doctrine beyond "nothing wasted / endings become material." |
| identity.md / Philosophical Foundations | strongly supported | Rosewater BG context and raw Golgari sources support life/death continuity, graveyard resources, recursion, resilience, and growth through death. |
| identity.md / Mechanical Identity | strongly supported | Undergrowth is direct raw evidence; dredge, scavenge, graveyard recursion, sacrifice, and attrition are supported by Golgari research and Commander guidance. |
| identity.md / Gameplay Philosophy | strongly supported | Graveyard-as-resource, recursive pressure, attrition, and value from discarded or dead material are repeatedly supported. |
| identity.md / Philosophical Weaknesses | strongly supported | Rosewater supports lack of control/finesse; raw profile supports political instability; placement supports poor-fit signals around purity, denial of loss, and rejection of decay/mortality. |
| identity.md / Color Relationships | partially supported | Strong guardrails exist for Witherbloom, Simic, Selesnya, Gruul, Rakdos, Orzhov, Dimir, and Lorehold bleed, but full exact-anchor formalization needs a later pass. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture | Derived from raw profile, placement axes, Commander guidance, and matrix terms; explicitly not MTG canon. |
| identity.md / Operator Translation Signals (Maze / Scryfall) | strongly supported | Placement JSON and Commander guidance provide search/quiz signals, false-positive guardrails, and required positive terms. |
| identity.md / Source Notes | strongly supported | Separates direct evidence, light Vox Mana synthesis, prior art, and unsupported material. |
| identity.md / Summary | strongly supported | Summarizes supported evidence and the synthesis boundary. |
| metaphysics.md / Metaphysical Thesis | strongly supported as Vox Mana synthesis | Optional section; frames life/death continuity, decay nourishment, rot infrastructure, and undercity continuity as project metaphysics. |
| metaphysics.md / Philosophical Foundations | strongly supported | Supported by BG life/death philosophy, Golgari raw profile, undercity/food role, and graveyard-cycle mechanics. |
| metaphysics.md / Vox Mana Read | strongly supported as Vox Mana synthesis | Compression-only and explicitly not MTG canon. |
| metaphysics.md / Structural & Mechanical Architecture | strongly supported | Strong evidence for undergrowth, graveyard count, recursion, sacrifice, scavenge, dredge, fungus/insects/saprolings, rot farms, and attrition. |
| metaphysics.md / Ludological Matrix Mapping | partially supported as Vox Mana internal architecture | Draftable from placement/matrix evidence, but should remain explicitly non-canon internal architecture. |

## Evidence Sources

- `docs/reference/identity-metaphysics-markdown-schema.md`
- `data/factions.json`
- `data/raw-factions/golgari_swarm/`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/MTG_Lore_Research_Enhanced.md`
- `docs/research/canon/MTG_Lore_Confidence_Tagged.md`
- `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md`
- `docs/research/golgari/`
- `docs/research/guild_college_identity_metaphysics/`
- `docs/architecture/colors/witherbloom/identity.md`
- `docs/architecture/colors/witherbloom/metaphysics.md`

## Tests / Verification

- Passed: scripted H1/H2 order check for `docs/architecture/colors/golgari/identity.md` and `docs/architecture/colors/golgari/metaphysics.md`.
- Passed: `node research/validate-mono-color-markdown.mjs`.
- Passed: boundary phrase search for `Vox Mana internal architecture`, `not MTG canon`, `compression-only`, `not generic black-green`, `Witherbloom`, `Jund-style`, and `rot is infrastructure`.
- Passed: `Source Notes` separation scan for direct evidence, light Vox Mana synthesis, and missing/unsupported material.
- Passed: wording scan found no Witherbloom body-exchange phrasing in Golgari docs.
- Passed: ASCII scan on new Golgari docs, VM-050 tracking, board, and handoff index.
- Checked: `git status --short`; pre-existing unrelated dirty/untracked files remain separate from VM-050 scope.

## Guardrails

- Did not edit runtime/build/placement/UI logic.
- Did not edit raw JSON or generated artifacts.
- Did not edit mono-color files.
- Did not edit Boros, Azorius, Gruul, Dimir, Izzet, Orzhov, Rakdos, Selesnya, Simic, Prismari, Witherbloom, other guild, or other school files.
- Did not invent MTG lore, card facts, commander facts, mechanics, or project decisions.

## Human Review

Recommended for the Color Relationships section before this becomes a reusable remaining-guild template. A guild/school-aware Markdown validator still does not exist.

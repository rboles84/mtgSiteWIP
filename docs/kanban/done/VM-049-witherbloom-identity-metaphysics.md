# VM-049 - Witherbloom Identity Metaphysics

ID: VM-049
Title: Witherbloom Identity Metaphysics
Status: done
Type: Documentation / content architecture
Area: Witherbloom College, school identity, metaphysics, schema-compatible authoring
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Created Witherbloom College `identity.md` and `metaphysics.md` using `docs/reference/identity-metaphysics-markdown-schema.md` as the structural source of truth.

Witherbloom is treated as an expression-level Strixhaven school pilot, not a mono-color source set, not mono Black plus mono Green, and not generic Golgari with school language. Metaphysical thesis, Core Axiom, system mapping, and matrix language are framed as Vox Mana internal synthesis, not MTG canon.

Note: the user plan called this VM-047, but VM-047 and VM-048 were already occupied by completed Prismari cards in the repo. This pass used VM-049 to avoid overwriting existing work.

## Outcome

- Created `docs/architecture/colors/witherbloom/identity.md`.
- Created `docs/architecture/colors/witherbloom/metaphysics.md`.
- Used the canonical identity H2 anchors in order, with optional `Source Notes` before `Summary`.
- Used the canonical metaphysics H2 anchors in order, with optional `Metaphysical Thesis` before `Philosophical Foundations`.
- Kept direct evidence, Vox Mana synthesis, prior art, and unsupported material separated.
- Used resource conversion language and avoided unsupported named-mechanic dependence.
- Left runtime, build, placement, UI, raw JSON, generated artifact, mono-color, other guild, and other school files untouched.

## Support Matrix

| Section | Support | Notes |
|---|---:|---|
| identity.md / Identity Overview | strongly supported | Raw profile/claims, `data/factions.json`, and enhanced lore support Witherbloom as BG Strixhaven College of Essence Studies. |
| identity.md / Core Drive | strongly supported | Life/death essence, healing/harm, exchanging/weaponizing life force, and care/exploitation tension are direct raw evidence. |
| identity.md / Vox Mana Read (Core Axiom) | strongly supported as Vox Mana synthesis | Compression-only; no new nouns, mechanics, or doctrine. |
| identity.md / Philosophical Foundations | strongly supported | Official Witherbloom claims plus BG color-pie support life/death without flattening into Golgari. |
| identity.md / Mechanical Identity | strongly supported | Lifegain/drain, pests, sacrifice, healing/harm, biological exchange, and resource conversion are supported. |
| identity.md / Gameplay Philosophy | strongly supported | Commander guidance and raw profile support pestcraft, sacrifice, drain, recursive vitality, and practical life/death engines. |
| identity.md / Philosophical Weaknesses | partially supported | Placement poor-fit and false-positive guardrails support this as Vox Mana interpretation, not canon psychology. |
| identity.md / Color Relationships | partially supported | Strong for Golgari/Selesnya/Simic; other contrasts stay as brief guardrails. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture | Explicitly labeled not MTG canon. |
| identity.md / Operator Translation Signals (Maze / Scryfall) | strongly supported as Vox Mana internal architecture | Raw placement and Commander terms support search/operator signals. |
| identity.md / Source Notes | strongly supported | Separates direct evidence, prior art, Vox Mana synthesis, and unsupported material. |
| identity.md / Summary | strongly supported | Restates evidence-backed identity and bounded synthesis. |
| metaphysics.md / Metaphysical Thesis | strongly supported as Vox Mana synthesis | Optional section; frames life/death as essence exchange only as project metaphysics. |
| metaphysics.md / Philosophical Foundations | strongly supported | Direct claims support embodied life/death craft and practical natural magic. |
| metaphysics.md / Vox Mana Read | strongly supported as Vox Mana synthesis | Compression-only, explicitly not MTG canon. |
| metaphysics.md / Structural & Mechanical Architecture | strongly supported | Pests, sacrifice, lifegain/drain, healing/harm, natural components, living essence, and disciplines are direct evidence. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture | Supported by raw placement axes and Commander signals when bounded as internal architecture. |

## Evidence Sources

- `docs/reference/identity-metaphysics-markdown-schema.md`
- `data/factions.json`
- `data/raw-factions/witherbloom/`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/MTG_Lore_Research_Enhanced.md`
- `docs/research/canon/MTG_Lore_Confidence_Tagged.md`
- `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md`
- `docs/research/witherbloom/`
- `docs/research/guild_college_identity_metaphysics/`

## Tests / Verification

- Passed: scripted H1/H2 order check for `docs/architecture/colors/witherbloom/identity.md` and `docs/architecture/colors/witherbloom/metaphysics.md`.
- Passed: `node research/validate-mono-color-markdown.mjs`.
- Passed: boundary phrase search for `Vox Mana internal architecture`, `not MTG canon`, `compression-only`, `no new nouns, mechanics, or doctrine`, `resource conversion`, and `Source Notes`.
- Passed: wording scan found no ambiguous payment wording, unsupported named-mechanic dependency, or disallowed metabolism language in Witherbloom docs or VM-049 tracking.
- Passed: ASCII scan on new Witherbloom docs and VM-049 tracking.
- Checked: `git status --short`; pre-existing unrelated dirty/untracked files remain separate from VM-049 scope.

## Guardrails

- Did not edit runtime/build/placement/UI logic.
- Did not edit raw JSON or generated artifacts.
- Did not edit mono-color files.
- Did not edit Boros, Azorius, Gruul, Dimir, Izzet, Orzhov, Rakdos, Selesnya, Prismari, other guilds, or other schools.
- Did not invent MTG lore, card facts, commander facts, mechanics, or project decisions.

## Human Review

Recommended for the Golgari/Selesnya/Simic relationship language before this becomes a template for the remaining schools. A guild/school-aware Markdown validator still does not exist.

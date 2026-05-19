# VM-037 - Azorius Identity Metaphysics Pilot

ID: VM-037
Title: Azorius Identity Metaphysics Pilot
Status: done
Type: Documentation / content architecture
Area: Azorius Senate, guild identity, metaphysics, authoring schema
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Draft Azorius Senate `identity.md` and provisional `metaphysics.md` files using the VM-034 identity/metaphysics schema anchors as a structural target and the expanded Azorius evidence set as the content basis.

Azorius is an expression-level guild pilot, not a mono-color source set. The identity file is evidence-backed. The metaphysics file is explicitly framed as Vox Mana project metaphysics, not canon doctrine.

## Outcome

- Created `docs/architecture/colors/azorius/identity.md`.
- Created `docs/architecture/colors/azorius/metaphysics.md`.
- Added source notes at the top of both files.
- Used the expanded pre-draft evidence set requested in the Azorius pass, including `Deep_Dive_MTG_Color_Pie_Research.md`, `azorius_Slow and Steady`, `color_pie_articles_for_apocrypha.md`, and `mark_rosewater_official_misc/`.
- Kept runtime, build, placement, UI, generated artifact, mono-color, Boros, other guild, and school files untouched for this pass.

## Support Matrix

| Section | Support | Notes |
|---|---:|---|
| identity.md / Identity Overview | strongly supported | `data/factions.json`, raw claims/profile, Rosewater Azorius article, and lore summaries all support law/order/procedure identity. |
| identity.md / Core Drive | strongly supported | Strong direct support for rules, precedent, enforceable systems, restraint, and civilization/order framing. |
| identity.md / Vox Mana Read (Core Axiom) | strongly supported | Compression-only project synthesis from already-strong sections; no new nouns, mechanics, or doctrine. |
| identity.md / Philosophical Foundations | strongly supported | Rosewater White-Blue material directly supports shared restraint, long-term planning, order, and internal tension. |
| identity.md / Mechanical Identity | strongly supported | Addendum, Detain, control, taxation, permission, draw-go, prison, and tempo signals are present. |
| identity.md / Gameplay Philosophy | strongly supported | Commander Compass, deck links, Rosewater "slowest but moving toward victory," and faction archetypes support this. |
| identity.md / Philosophical Weaknesses | strongly supported | Slowness, over-analysis, paralysis, and inability to respond quickly are directly supported. |
| identity.md / Color Relationships | strongly supported | Direct neighbor contrasts with exact file-path evidence anchors for Boros, Orzhov, Dimir, Selesnya, Izzet, and Simic. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture where applicable | Official Vox Mana internal mapping derived from approved evidence; not claimed as MTG canon. |
| identity.md / Operator Translation Signals (Maze / Scryfall) | strongly supported | Placement required terms, commander guidance, search keywords, and known mechanics support this directly. |
| identity.md / Summary | strongly supported | Summary restates strongly supported law/procedure/control/tension evidence. |
| metaphysics.md / Philosophical Foundations | strongly supported | White-Blue philosophy and Azorius civic role are well supported. |
| metaphysics.md / Vox Mana Read | partially supported | Interpretive by nature; concise and marked as Vox Mana synthesis. |
| metaphysics.md / Structural & Mechanical Architecture | strongly supported | Permission, taxation, Detain, Addendum, card advantage/control, and rule enforcement are well evidenced. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture where applicable | Matrix axes are defined, repeatable, and derived from approved Azorius evidence; not claimed as MTG canon. |

## Approved Evidence Sources

- `data/factions.json`
- `data/raw-factions/azorius_senate/`
- `docs/research/canon/mark_rosewater_official_two_color/azorius_Slow and Steady _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/mark_rosewater_official_misc/`
- `docs/research/canon/MTG_Lore_Confidence_Tagged.md`
- `docs/research/MTG_Lore_Research_Enhanced.md`
- `docs/research/Deep_Dive_MTG_Color_Pie_Research.md`
- `docs/research/canon/color_pie_articles_for_apocrypha.md`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/azorius/`
- `docs/research/guild_college_identity_metaphysics/`

## Scope Guardrails

- Do not invent MTG lore, card facts, commander facts, or project decisions.
- Do not treat Azorius as a blind merge of White and Blue.
- Do not treat project metaphysics as Magic canon.
- Do not treat every White-Blue archetype as Azorius Senate evidence.
- Do not edit Boros, other guilds, or schools.
- Do not modify runtime/build/placement/UI logic.

## Tests / Verification

- Passed: `node research/validate-mono-color-markdown.mjs`
- Passed: manual Azorius schema-anchor check for required VM-034 H2 anchors.
- Passed: non-ASCII scan of new Azorius files, VM-037 card, and handoff.
- Checked: `git status --short` to confirm no unexpected runtime/build/UI side effects were introduced by this task.

## Human Review

Recommended. The identity file is strongly evidence-backed. The metaphysics file uses Azorius-specific project synthesis; its mapping language is formal Vox Mana internal architecture, not MTG canon, until a guild/college-aware schema and validator exist.

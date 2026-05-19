# VM-060 - Quandrix Identity Metaphysics

Status: Done
Owner: Codex
Date: 2026-05-18

## Task

Create Quandrix College identity and metaphysics docs as an expression-level Strixhaven school pilot, using the canonical identity/metaphysics markdown schema and approved repo evidence.

## Scope

- Create `docs/architecture/colors/quandrix/identity.md`.
- Create `docs/architecture/colors/quandrix/metaphysics.md`.
- Keep Quandrix distinct from mono Blue-Green and Simic Combine.
- Do not modify runtime, build, placement, UI logic, raw JSON, generated files, mono files, or other guild/school architecture files.

## Evidence Sources

- `docs/reference/identity-metaphysics-markdown-schema.md`
- `data/factions.json`
- `data/raw-factions/quandrix/quandrix.profile.json`
- `data/raw-factions/quandrix/quandrix.placement.json`
- `data/raw-factions/quandrix/quandrix.claims.json`
- `data/raw-factions/quandrix/quandrix.sources.json`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/canon/`
- `docs/research/canon/mark_rosewater_official_two_color/`
- `docs/research/canon/mark_rosewater_official_misc/`
- Official Wizards Strixhaven and Secrets of Strixhaven references represented by Quandrix raw source IDs

## Support Matrix

| Section | Support | Notes |
|---|---:|---|
| identity.md / Identity Overview | strongly supported | Raw profile/claims and `data/factions.json`. |
| identity.md / Core Drive | strongly supported | Mathematical structure, reveal/model/reshape reality. |
| identity.md / Vox Mana Read (Core Axiom) | strongly supported as Vox Mana synthesis | Compression-only; no new doctrine. |
| identity.md / Philosophical Foundations | strongly supported | Numeromancy, patterns, fractals, symmetries, found-vs-made math. |
| identity.md / Mechanical Identity | strongly supported | Mana, counters, Fractals, scaling, doubling, land growth. |
| identity.md / Gameplay Philosophy | strongly supported | Commander guidance and raw mechanics support math-of-more play. |
| identity.md / Philosophical Weaknesses | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Exact raw placement anchors. |
| identity.md / Color Relationships | strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon | Exact calibration contrasts only. |
| identity.md / System Mapping (Canonical) | strongly supported as Vox Mana internal architecture | Explicitly non-canon. |
| identity.md / Operator Translation Signals (Maze / Scryfall) | strongly supported as Vox Mana internal architecture | Raw placement and commander terms. |
| identity.md / Summary | strongly supported | Evidence-backed restatement. |
| metaphysics.md / Metaphysical Thesis | strongly supported as Vox Mana synthesis | Optional section; reality as equation. |
| metaphysics.md / Philosophical Foundations | strongly supported | Mathematical structure and nature/magic patterns. |
| metaphysics.md / Vox Mana Read | strongly supported as Vox Mana synthesis | Compression-only; no new doctrine. |
| metaphysics.md / Structural & Mechanical Architecture | strongly supported | Fractals, counters, scaling, mana/land growth, doubling. |
| metaphysics.md / Ludological Matrix Mapping | strongly supported as Vox Mana internal architecture | Placement axes and mechanics, explicitly non-canon. |

## Decisions

- Used `VM-060` because `VM-051` is already a completed Golgari coordination card, `VM-057` and `VM-058` are already completed, and `VM-059` is in progress in this repo.
- Treated `Source Notes` as optional documentation, not a required schema support-table row.
- Framed Philosophical Weaknesses as Vox Mana placement/project weaknesses, not MTG canon psychology.
- Framed Color Relationships as placement-calibration contrasts, not canon inter-faction opinions.
- Kept weaker faction comparisons as cautionary non-claims.

## Tests / Verification

- H1/H2 schema order check for `identity.md` and `metaphysics.md`: PASS.
- `node research/validate-mono-color-markdown.mjs`: PASS.
- Boundary phrase scan for `Vox Mana internal architecture`, `not MTG canon`, `compression-only`, and `no new doctrine`: PASS.
- Evidence-anchor scan for `data/raw-factions/quandrix/`, `data/factions.json`, and `docs/reference/commander-faction-guidance.md`: PASS.
- ASCII scan on new Quandrix docs and VM-060 coordination files: PASS.
- `git status --short`: PASS; showed expected Quandrix docs/card/handoff plus board/index updates, with substantial pre-existing dirty and untracked worktree files left untouched.

## Not Touched

- Runtime/build/placement/UI logic
- Raw JSON and generated files
- Mono-color architecture files
- Other guild or school architecture files

## Follow-Up

Reuse this schema-first, evidence-map process for remaining guilds and schools. Keep expression-level factions distinct from mono-color and two-color guild files, and preserve non-canon labels for Vox Mana synthesis.

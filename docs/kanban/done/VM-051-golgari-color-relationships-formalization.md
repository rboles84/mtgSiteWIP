# VM-051 - Golgari Color Relationships Formalization

ID: VM-051
Title: Golgari Color Relationships Formalization
Status: done
Type: Documentation / content architecture
Area: Golgari Swarm, color relationships, placement calibration
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Formalized only the `Color Relationships` section in `docs/architecture/colors/golgari/identity.md`.

The section now marks relationship support as "strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon" and frames all relationships as placement-calibration contrasts, not official faction opinions or canon inter-faction psychology.

## Outcome

- Replaced the prior partially supported relationship prose with exact evidence-anchored placement contrasts.
- Promoted five strong relationship contrasts: Witherbloom, Selesnya, Simic, Orzhov, and Gruul.
- Kept Rakdos, Dimir, and Quandrix as brief guardrails only.
- Added repo-relative JSON-path-style anchors for every relationship claim in the section.
- Did not edit Golgari `metaphysics.md`.
- Did not edit raw JSON, generated files, runtime/build/placement/UI logic, other faction docs, or VM-050 history.

## Evidence Anchors

- `data/raw-factions/golgari_swarm/`
- `data/raw-factions/witherbloom/`
- `data/raw-factions/selesnya_conclave/`
- `data/raw-factions/simic_combine/`
- `data/raw-factions/orzhov_syndicate/`
- `data/raw-factions/gruul_clans/`
- `data/raw-factions/cult_of_rakdos/`
- `data/raw-factions/house_dimir/`
- `data/raw-factions/quandrix/`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md`

## Tests / Verification

- Passed: Golgari identity H1/H2 order check with optional `Source Notes` allowed.
- Passed: `node research/validate-mono-color-markdown.mjs`.
- Passed: 30 JSON anchors in the Golgari identity file exist as files and JSON paths.
- Passed: required support wording is present.
- Passed: placement-calibration/non-canon faction-opinion framing is present.
- Passed: Rakdos, Dimir, and Quandrix remain brief guardrails only and are not promoted to `### Golgari and ...` headings.
- Passed: ASCII scan on VM-051 changed files.
- Checked: scoped changed-file status for VM-051 paths only.

## Risks / Uncertainties

- No guild/school-aware markdown validator exists.
- Relationship language is strong as Vox Mana placement-calibration architecture, not as official Magic canon.
- Rakdos, Dimir, and Quandrix are intentionally limited to brief guardrails because the repo does not yet provide equally strong explicit Golgari-bilateral anchors.

## Not Touched

- `docs/architecture/colors/golgari/metaphysics.md`
- Raw JSON
- Generated files
- Runtime, build, placement, and UI logic
- Other faction docs
- VM-050 history
- Existing unrelated dirty/untracked files

## Follow-Up Recommendations

Use this format for future relationship formalization passes: first promote only relationships with exact repo anchors, then leave lower-confidence adjacent factions as brief guardrails until direct evidence exists.

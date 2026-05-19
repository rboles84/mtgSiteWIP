# VM-058 - Golgari Ludological Matrix Formalization

ID: VM-058
Title: Golgari Ludological Matrix Formalization
Status: done
Type: Documentation / content architecture
Area: Golgari Swarm, metaphysics, ludological matrix, placement architecture
Priority: high
Created: 2026-05-18
Completed: 2026-05-18

## Summary

Formalized only the `Ludological Matrix Mapping` section in `docs/architecture/colors/golgari/metaphysics.md`.

The section now marks matrix support as "strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon" and states: "This matrix is Vox Mana ludological architecture, not official MTG doctrine."

Coordination note: this Golgari cleanup was renumbered to VM-058 after a coordination-ID cleanup. Current repo state also contains VM-053 for Silverquill, VM-056 for Lorehold, VM-057 for Witherbloom, and VM-059 for Simic; VM-058 is unique to this Golgari pass. Existing Silverquill, Lorehold, Witherbloom, and Simic entries were left untouched.

## Outcome

- Replaced the prior partially supported matrix prose with anchored matrix architecture.
- Added direct evidence anchors for Golgari life/death continuity, graveyard resource logic, recursion, sacrifice, attrition, dredge, scavenge, undergrowth, rot farms, food role, undercity survival, reclamation, and inevitability.
- Labeled matrix labels and compression language as Vox Mana synthesis.
- Explicitly omitted unsupported material and avoided generic black-green doctrine.
- Did not edit `docs/architecture/colors/golgari/identity.md`.
- Did not edit raw JSON, generated files, runtime/build/placement/UI logic, other faction docs, or VM-050/VM-051 history.

## Evidence Anchors

- `data/raw-factions/golgari_swarm/golgari_swarm.profile.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.claims.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.placement.json`
- `docs/reference/commander-faction-guidance.md`
- `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md`
- `docs/research/golgari/golgari-structural-matrix.csv`

## Tests / Verification

- Passed: Golgari metaphysics H1/H2 order check with optional `Metaphysical Thesis` allowed.
- Passed: `node research/validate-mono-color-markdown.mjs`.
- Passed: 32 repo anchors in the Golgari metaphysics file exist as files, JSON paths, or markdown section anchors.
- Passed: required support wording is present.
- Passed: required ludological architecture / not official doctrine framing is present.
- Passed: `identity.md` was not modified in this pass.
- Passed: ASCII scan on VM-058 changed files.
- Checked: scoped changed-file status for VM-058 paths.

## Risks / Uncertainties

- No guild/school-aware markdown validator exists.
- The support upgrade is for Vox Mana ludological architecture, not official Magic doctrine.
- Fungus, insects, saprolings, and swarm-body language uses approved Golgari research as support alongside raw Swarm/keyword evidence; it should not be treated as a new canon doctrine.
- The Golgari coordination artifact was renumbered to VM-058 after the collision was identified and nearby coordination IDs were found occupied or in motion.

## Not Touched

- `docs/architecture/colors/golgari/identity.md`
- Raw JSON
- Generated files
- Runtime, build, placement, and UI logic
- Other faction docs
- VM-050 or VM-051 history
- Existing unrelated dirty/untracked files
- Existing Silverquill, Lorehold, Witherbloom, and Simic coordination entries

## Follow-Up Recommendations

Use this matrix pattern for future metaphysics formalization passes: promote only sections with exact repo anchors, label matrix language as Vox Mana architecture, and keep unsupported doctrine out of the matrix.

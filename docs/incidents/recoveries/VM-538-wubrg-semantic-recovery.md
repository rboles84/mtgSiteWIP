# VM-538 WUBRG Semantic Recovery

Status: Certified semantically ready under CRIT-001 Contract v1.1

Identity: `WUBRG` / `Five-Color` / `Five-Color / WUBRG`

Program base: `7f615d4fe5a19cf8f9d2a58a8026f837378c06b2`

Gate 1+2 governance: `a5e678bea5d92a2addc184e3564d37b7e098140d`

Exact semantic candidate: `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`

Candidate parent proof: `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b^ = a5e678bea5d92a2addc184e3564d37b7e098140d`

Candidate workflow: `54a9f54e13d425e96a5f7a56e40c5b6719438208`

Independent review: `6eed742627d67ba9f36ffabe102c76b0b0c1f0fa`

Approval decision: `APPROVE EXACT SHA c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`

Certification commit: `PENDING_VM538_CERTIFICATION_COMMIT_SHA`

Candidate files changed: `data/factions.json`; `data/placement-model.json`; `data/raw-factions/wubrg/wubrg.changelog.json`; `data/raw-factions/wubrg/wubrg.claims.json`; `data/raw-factions/wubrg/wubrg.placement.json`; `data/raw-factions/wubrg/wubrg.profile.json`; `data/raw-factions/wubrg/wubrg.sources.json`; `data/semantic-readiness-provenance.json`; `research/fixtures/semantic-readiness/wubrg.semantic-fixtures.json`.

Summary: The exact candidate remediates WUBRG only. It classifies all 8 claims as substantive, adds bounded evidence locations, narrows substantive chains to eligible sources, restores `WUBRG-LOCAL-002` as shaping/discovery-only without using it as substantive proof, adds three native profile IDs, maps eight guidance strings, replaces foreign Colorless collision claims with WUBRG-owned proof, regenerates WUBRG-owned placement/faction/provenance output, and adds 41 semantic fixtures.

Baseline: before candidate, WUBRG had 8 unclassified claims, 19 sources with missing `WUBRG-LOCAL-002`, 13 provenance rows, 3 null canonical IDs, zero missing hashes, no fixture, eight unmapped guidance strings, and three foreign Colorless claims in the canonical collision chain. After candidate, WUBRG has 8 substantive claims, 20 sources, 21 provenance rows, zero null canonical IDs/hashes, 41 fixtures, eight complete guidance mappings, and WUBRG-owned collision proof.

Alias and endpoint behavior: accepted aliases remain exactly `["WUBRG", "Five-Color"]`. Lowercase `wubrg`, lowercase `five-color`, unhyphenated `Five Color`, compact `FiveColor`, and every noncanonical five-color order permutation fail closed as public aliases. Exact colors and secondary colors remain `["W", "U", "B", "R", "G"]`; `core_color` and `display_code` remain `WUBRG`. Generic five-color Commander, goodstuff, all-colors access, fixing-only, default-high-complexity, completion/final-form, superiority, universal-superset, official-faction, five-color-Eldrazi, and support-only evidence forms reject WUBRG.

Neighbor and collision behavior: all 37 required identity, generic, endpoint, alias, and permutation rejection boundaries are present. The sole canonical inhibiting `COLORLESS/WUBRG` pair keeps its separator, boundary question, pair key, and lateral inhibition. Its proof chain is now WUBRG-owned. Four axes, five discriminator questions, three collision IDs, min-hits `2`, broad penalty `0.16`, calibration lists, and 21 lateral targets remain frozen.

Preview invariant: `data/identity-layers.json` was not modified. Its WUBRG expression is unchanged from Gate 1+2 and exactly equals the embedded `data/factions.json` expression. Home preview remains enabled at order 36; Commander routing remains exact `WUBRG`; directory links remain suppressed; no public route expansion occurred.

Validation: `npm.cmd ci`, canonical builds, WUBRG semantic readiness, fixture validation, strict 2079-entry provenance verification, source/generated guardrails, faction-context isolation, parser (226 cases), placement (37 factions / 37 golden paths), semantic candidate-scope regression, exact candidate scope, generator determinism, full `npm.cmd test`, and direct alias/endpoint/neighbor/collision/preview probes passed during candidate, review, and certification. The certification full suite used the ignored local hardlink `data/scryfall/raw/oracle-cards.json`.

Unstaged byproducts: `data/placement-model.schema.json` and `supabase/functions/guild-recruiter/faction-context.ts` are stat/CRLF-only generator touches with no content diff. `docs/audits/gate-compression/live-gate-bias.json` and `.md` are validation output. Ignored `node_modules/` and ignored `data/scryfall/raw/oracle-cards.json` remain local-only.

Warnings: Git reports permission denied for `C:\Users\obake/.config/git/ignore`.

Certification: VM-538 WUBRG is certified from exact approved candidate `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`. Certified count is 37 of 37. VM-538 was the final uncertified identity. CRIT-001 37-Identity Semantic Recovery Program is complete after protected program-base advancement.

Non-goals: No remediation, replacement candidate, further independent review, Excel update, GitHub remote authority, recruiter edit, identity-layer source edit, package/lockfile edit, validator/test edit, push, PR, merge, rebase, cherry-pick, reset, clean, stash, amend, force operation, or public route expansion occurred.

CERTIFIED EXACT SHA `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`

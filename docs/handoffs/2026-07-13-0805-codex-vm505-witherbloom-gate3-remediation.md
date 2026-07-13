# Codex Handoff - VM-505 Witherbloom Gate 3 Canonical Remediation

Agent name: Codex

Task requested: Complete VM-505 Witherbloom Gate 3 canonical remediation only under CRIT-001 Contract v1.1, without generated rebuilds, candidate creation, certification, or other identity work.

Files reviewed:

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-505-witherbloom-semantic-recovery.md`
- `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md`
- `data/raw-factions/witherbloom/witherbloom.claims.json`
- `data/raw-factions/witherbloom/witherbloom.sources.json`
- `data/raw-factions/witherbloom/witherbloom.profile.json`
- `data/raw-factions/witherbloom/witherbloom.placement.json`
- `data/raw-factions/witherbloom/witherbloom.changelog.json`
- `docs/research/canon/strixhaven/witherbloom/README.md`
- `docs/research/canon/strixhaven/witherbloom/SOURCES.md`
- `docs/research/canon/strixhaven/witherbloom/witherbloom-narrative-taxonomy.md`
- `docs/research/canon/strixhaven-college-reference-audit.md`
- `docs/research/canon/ten-guild-reference-audit.md`
- `docs/architecture/colors/witherbloom/identity.md`
- `docs/architecture/colors/witherbloom/metaphysics.md`
- `docs/architecture/colors/golgari/identity.md`
- `docs/architecture/colors/golgari/metaphysics.md`

Files changed:

- `data/raw-factions/witherbloom/witherbloom.claims.json`
- `data/raw-factions/witherbloom/witherbloom.profile.json`
- `data/raw-factions/witherbloom/witherbloom.placement.json`
- `data/raw-factions/witherbloom/witherbloom.changelog.json`
- `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md`
- `docs/kanban/in-progress/VM-505-witherbloom-semantic-recovery.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-13-0805-codex-vm505-witherbloom-gate3-remediation.md`

What changed:

- Added `semantic_role` to all existing Witherbloom claims.
- Classified existing claims as 6 substantive, 10 discovery, and 2 support records.
- Added bounded `evidence_locations` to substantive claims.
- Added eight minimal substantive claims, `witherbloom_claim_0019` through `witherbloom_claim_0026`, covering practical life/death craft, internal tension, embodied method, mechanics identity, mature expression, unhealthy expression, pressure behavior, and required-neighbor boundaries.
- Removed discovery records from authoritative profile and placement proof chains.
- Kept discovery records only as discovery/search metadata.
- Removed support/product records from authoritative key-figure and Commander Compass identity-basis proof chains.
- Kept support/product records only as auxiliary product/card support.
- Replaced search-term-backed placement core values, behavioral signal, placement axis, inhibitor, and summary evidence chains with source-backed substantive claims.
- Added recruiter guidance evidence mappings.
- Added bounded required-neighbor evidence for BG/Golgari, Selesnya, Simic, and Quandrix.
- Added Witherbloom-side BG/Golgari collision guidance.
- Updated the changelog/readiness evidence to describe Gate 3.
- Updated the VM-505 report and card with Gate 3 status.

Why it changed:

- Gate 1 found Witherbloom had the same thin Strixhaven packet defect pattern: discovery/search records and support/product records were flowing into authoritative semantic chains.
- Gate 2 confirmed existing listed official/local source trails were sufficient for bounded canonical remediation without broad or targeted online discovery.
- Gate 3 repaired canonical source-of-truth data only so Gate 4 can rebuild generated artifacts and provenance from a defensible packet.

Decisions made:

- Required neighbors are BG/Golgari, `SELESNYA_CONCLAVE`, `SIMIC_COMBINE`, and `QUANDRIX`.
- Product/card rows `witherbloom_claim_0017` and `witherbloom_claim_0018` remain support-only and cannot prove identity meaning.
- Discovery rows `witherbloom_claim_0007` through `witherbloom_claim_0016` remain discovery-only.
- No broad or targeted online source discovery was performed.
- Generated artifacts remain stale until Gate 4.

Risks / uncertainties:

- Gate 4 must verify generated public/recruiter copy does not preserve stale discovery-backed Witherbloom wording.
- Gate 4 must regenerate provenance and add semantic fixtures.
- Story archive rows remain discovery metadata until a later separately authorized source-reading pass extracts bounded substantive story claims.
- Candidate-scope guard may still inspect frozen confidence/calibration fields at Gate 5; Gate 3 preserved existing confidence values and did not intentionally change calibration fields.

Tests run:

- `git status --short --branch`
- JSON parse checks for changed Witherbloom canonical files
- `npm.cmd run audit:semantic-readiness -- --targets=WITHERBLOOM`
- `git diff --check`
- Raw/generated/provenance diff check for prohibited generated files
- Raw packet diff check for Prismari, Lorehold, Quandrix, and Silverquill
- Original dirty main worktree status check

Not touched:

- Generated artifacts: `data/factions.json`, `data/identity-layers.json`, `data/placement-model.json`, `supabase/functions/guild-recruiter/faction-context.ts`, `data/semantic-readiness-provenance.json`
- Non-Witherbloom raw packets
- Contract v1.1
- Shared schema, validators, builder scripts, and VM-501 infrastructure
- Hall or Crucible content
- Scoring, inhibition, confidence behavior, scheduling, tie ordering, and global recruiter behavior
- Main worktree at `C:\dev\mtgSiteWIP`
- Prismari, Lorehold, Quandrix, and Silverquill certification records

Follow-up recommendations:

- Proceed to VM-505 Gate 4 generation and validation only when authorized.
- Gate 4 should rebuild generated artifacts, regenerate semantic provenance, add semantic fixtures, run source/generated parity, inspect public Witherbloom copy, and run generated-diff isolation.
- Do not create a candidate commit until Gate 4 has passed.

Next suggested agent:

- Codex Gate 4 validation pass for VM-505 Witherbloom.

Related Kanban card, docs, or plans:

- `docs/kanban/in-progress/VM-505-witherbloom-semantic-recovery.md`
- `docs/incidents/recoveries/VM-505-witherbloom-semantic-recovery.md`
- `docs/incidents/CRIT-001-faction-semantic-readiness-integrity.md`
- `docs/reference/semantic-readiness-contract.md`

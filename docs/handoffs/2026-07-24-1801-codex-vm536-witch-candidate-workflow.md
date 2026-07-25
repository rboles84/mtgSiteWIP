# VM-536 Witch Candidate Workflow Handoff

Agent name: Codex

Task requested: Continue VM-536 Witch semantic recovery after Gate 1+2; create a WITCH-only semantic candidate ready for independent exact-SHA review.

Files reviewed: `AGENTS.md`; `docs/handoffs/HANDOFF_INDEX.md`; `docs/kanban/board.md`; `docs/kanban/in-progress/VM-536-witch-semantic-recovery.md`; `docs/incidents/CRIT-001-drift-control-template.md`; `docs/incidents/CRIT-001-drift-register.md`; `docs/incidents/CRIT-001-identity-recovery-ledger.json`; `docs/incidents/CRIT-001-identity-recovery-ledger.md`; `data/raw-factions/witch/*`; prior Dune/Ink/Yore semantic packets and fixtures; semantic readiness validators.

Files changed: `data/factions.json`; `data/placement-model.json`; `data/raw-factions/witch/witch.changelog.json`; `data/raw-factions/witch/witch.claims.json`; `data/raw-factions/witch/witch.placement.json`; `data/raw-factions/witch/witch.profile.json`; `data/semantic-readiness-provenance.json`; `research/fixtures/semantic-readiness/witch.semantic-fixtures.json`; governance docs and Kanban trackers.

What changed: Final candidate `acaf51a4f7e11d73b59fcc61397dcab2cb39e490` classifies all 5 WITCH claims as substantive, adds bounded evidence locators, replaces foreign INK/YORE collision proof IDs with WITCH-owned chains, adds recruiter guidance evidence, adds 37 semantic fixtures, regenerates WITCH generated placement/provenance, and repairs WITCH provenance native IDs to 12 rows with zero null canonical IDs.

Why it changed: Gate 1+2 found WITCH blocked by unclassified claims, missing semantic fixtures, missing recruiter guidance evidence mapping, foreign collision claim references, and null canonical provenance IDs.

Decisions made: Kept canonical key `WITCH`; kept display name `Witch / Growth`; kept display color order `GWUB`; kept accepted aliases exactly `["WITCH"]`; kept GWUB, WUBG, and all 24 same-color permutations metadata-query-only; kept Growth support/display-only; kept raw preview disabled; did not introduce a `data/identity-layers.json` preview-source exception.

Risks / uncertainties: Direct Witch-Maw card facts, Commander legality, product/article grounding, cEDH/ranking claims, and Phyrexia-only readings remain deferred/support-only. Superseded candidate `96f8ee3259a5010e96ba92aea35ae271eb692ac8` is preserved because it had three null WITCH provenance canonical IDs.

Tests run: `npm.cmd ci`; `npm.cmd run build:factions`; `node research/validate-semantic-readiness.mjs --targets=WITCH --fixtures`; `npm.cmd run validate:source-generated -- --target=WITCH`; `npm.cmd run build:semantic-provenance -- --check`; `npm.cmd run audit:semantic-readiness -- --targets=WITCH`; `npm.cmd run test:faction-context-isolation -- --identity=WITCH`; `npm.cmd run test:parser`; `npm.cmd run test:placement`; `npm.cmd run validate:semantic-candidate-scope -- --identity=WITCH --base=b16e8f60c73e868fee628f3510cdd1aa670cdfc0 --target=HEAD`; `npm.cmd test` passed after locked dependency install and ignored Scryfall corpus hardlink.

Not touched: VM-537 Colorless; VM-538 WUBRG; Excel/external tracker; GitHub remote authority; certification; independent review; runtime scoring, Hall/Crucible behavior, inhibition, scheduling, global recruiter tuning, and `data/identity-layers.json`.

Follow-up recommendations: Independent review should review only exact candidate `acaf51a4f7e11d73b59fcc61397dcab2cb39e490` against Gate 1+2 `b16e8f60c73e868fee628f3510cdd1aa670cdfc0`, preserve superseded candidate `96f8ee3259a5010e96ba92aea35ae271eb692ac8` as unapproved, and rerun candidate-scope/semantic/source-generated/full tests plus alias/permutation, preview, neighbor, and null-ID controls.

Next suggested agent: Independent Reviewer for exact-SHA VM-536 Witch review.

Related Kanban card, docs, or plans: `docs/kanban/in-progress/VM-536-witch-semantic-recovery.md`; `docs/handoffs/2026-07-24-1744-codex-vm536-witch-gate1-gate2.md`; `docs/incidents/CRIT-001-identity-recovery-ledger.json`; `docs/incidents/CRIT-001-drift-register.md`.

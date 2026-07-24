# VM-535 Ink Independent Exact-SHA Review

Agent name: Codex

Task requested: Independent review-only pass for VM-535 Ink exact semantic candidate.

Ticket: VM-535

Identity: INK / Ink / Altruism

Exact base SHA: 8a4f273e75842f97debbcdbc70009da7845e41d4

Gate 1+2 governance SHA: 4305482967f21be4a5c58c2f97fda2a848fc60c2

Exact candidate SHA: 9cefe57611552e563ab7601f2f32fc2c9eeac566

Candidate-workflow SHA: fb50d26f011a75d35032f4e1bd1db83eeb70c752

Review branch: codex/vm-535-ink-independent-review

Review worktree: C:\dev\mtgSiteWIP-crit001-vm535-ink-independent-review

Parent proofs:
- 9cefe57611552e563ab7601f2f32fc2c9eeac566^ = 4305482967f21be4a5c58c2f97fda2a848fc60c2
- fb50d26f011a75d35032f4e1bd1db83eeb70c752^ = 9cefe57611552e563ab7601f2f32fc2c9eeac566
- Review commit parent target = fb50d26f011a75d35032f4e1bd1db83eeb70c752
- codex/crit001-program-base = 8a4f273e75842f97debbcdbc70009da7845e41d4

Candidate file list reviewed:
- data/factions.json
- data/placement-model.json
- data/raw-factions/ink/ink.changelog.json
- data/raw-factions/ink/ink.claims.json
- data/raw-factions/ink/ink.placement.json
- data/raw-factions/ink/ink.profile.json
- data/semantic-readiness-provenance.json
- research/fixtures/semantic-readiness/ink.semantic-fixtures.json

Candidate/workflow separation: PASS. The exact candidate commit changes only the eight expected INK semantic/generated/fixture/provenance files. The candidate-workflow commit changes governance only. No semantic files changed after 9cefe57611552e563ab7601f2f32fc2c9eeac566 and no remediation occurred in this review window. Program-base-to-candidate diff includes the earlier Gate 1+2 governance commit by ancestry; the candidate commit itself is scoped to the eight expected files.

Semantic review: PASS. INK remains canonical, display name remains Ink / Altruism, display color order remains RGWU, and INK remains the only accepted alias. RGWU, WURG, and all 24 same-color permutations remain metadata/query-only. The candidate records 5 substantive claims, 13 sources, 30 fixtures, 13 INK provenance rows, zero null canonical IDs, zero null canonical content hashes, raw preview disabled, and generated identity-layer preview equal to the embedded data/factions.json preview.

Boundary review: PASS. Fixture review covers DUNE, WITCH, BANT, JESKAI, NAYA, TEMUR, GENERIC_RGWU, GENERIC_FOUR_COLOR_COMMANDER, GENERIC_GROUP_HUG, GENERIC_SHARED_RESOURCES, KYNAIOS_ONLY, STALWART_UNITY_ONLY, INK_TREADER_ONLY, COMMANDER_LEGALITY, OFFICIAL_NAME, BLACK_PRESENT_COLLAPSE, WURG_METADATA_ONLY, and COLOR_ORDER_AS_KEY. RGWU is rejected as an unknown identity target.

Validation commands and results:
- npm.cmd ci: PASS
- npm.cmd test: initial run blocked by missing ignored Scryfall corpus; PASS after adding ignored hardlink data/scryfall/raw/oracle-cards.json from the control repository
- node research\validate-semantic-readiness.mjs --fixtures --targets=INK: PASS
- node research\build-semantic-readiness-provenance.mjs --check: byte-level stale warning in review worktree
- Normalized provenance parity check: PASS; rendered and existing manifests match after CRLF normalization, 2063 entries
- node research\validate-source-generated-guardrails.mjs --targets=INK: PASS, 0 warnings
- node research\faction-context-isolation-tests.js: PASS
- npm.cmd run test:parser: PASS, 226 parser cases
- npm.cmd run test:placement: PASS, 37 factions / 37 golden paths
- node research\semantic-candidate-scope-tests.js: PASS
- node research\validate-semantic-candidate-scope.mjs --base=4305482967f21be4a5c58c2f97fda2a848fc60c2 --target=9cefe57611552e563ab7601f2f32fc2c9eeac566 --identity=INK: PASS
- npm.cmd run test:semantic-readiness: readiness and candidate-scope portions PASS; final provenance byte check reports stale because of line endings, with normalized parity PASS above
- node research\audit-semantic-readiness.mjs --targets=INK: PASS; reports 5 substantive claims, 13 sources, 13 reference sites, DUNE/WITCH neighbors, and no missing references

Approval rationale: The exact candidate scope is INK-only, semantic role and evidence coverage is complete under Contract v1.1, fixture/provenance content is aligned after normalized comparison, aliases and color-order permutations fail closed, preview invariants are preserved, workflow changes are governance-only, and no approval-blocking semantic or scope finding remains. The provenance checker warning is line-ending-only and not a manifest content mismatch.

No remediation performed: confirmed.

No certification performed: confirmed.

Program base unchanged: 8a4f273e75842f97debbcdbc70009da7845e41d4

VM-536 through VM-538 untouched: confirmed backlog/not started; no files or worktree changes made for Witch, Colorless, or WUBRG.

Excel not updated by Codex: confirmed.

Warnings:
- Git repeatedly warned that C:\Users\obake/.config/git/ignore could not be accessed due permission denial.
- npm.cmd test wrote gate-bias audit byproducts that were left unstaged.
- Ignored node_modules/ and ignored data/scryfall/raw/oracle-cards.json hardlink were created for validation and left unstaged.
- Provenance byte check reports stale in this Windows review worktree; normalized manifest parity passes with 2063 entries.

Not touched: No semantic candidate edits, replacement candidate, certification, program-base advancement, Excel update, VM-536 Witch work, VM-537 Colorless work, VM-538 WUBRG work, GitHub remote authority, push, PR, merge, reset, clean, stash, amend, rebase, cherry-pick, or force operation occurred.

Follow-up recommendations: Proceed to a separate certification-only window for VM-535 Ink if this review commit is accepted.

Next suggested agent: Certification-only agent for VM-535 Ink.

Related Kanban card, docs, or plans:
- docs/kanban/in-progress/VM-535-ink-semantic-recovery.md
- docs/incidents/recoveries/VM-535-ink-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-drift-control-template.md

APPROVE EXACT SHA 9cefe57611552e563ab7601f2f32fc2c9eeac566

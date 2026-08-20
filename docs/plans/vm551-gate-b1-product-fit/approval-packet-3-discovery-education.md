# VM-551 Approval Packet 3 — Discovery And Education

## Current VM-565 extension

VM-565 extends this authority without changing placement or identity semantics. The current generated catalog contains 65 glossary records and four instructional microcopy records. Source ownership remains in `scripts/build/build-vm551-discovery-education-approval-packet.mjs`; the curated VM-565 additions, aliases, definitions, and exact per-identity teaching targets are declared in `scripts/lib/vm565-player-vocabulary-authority.mjs` and promoted through the existing VM-551 automatic-adjudication producer.

Runtime selection is now field-aware. A glossary record can declare either `EXPLICIT_TARGETS` (render only at an accepted identity/surface/field) or `LEGACY_WITH_OVERRIDES` (preserve legacy one-per-concept allocation except for named better locations). `assets/js/index.js` still enforces one rendered decoration per canonical record per dossier. Text-only surfaces are not globally enabled: What to Look For titles, How This Plays fields, and the Colorless mana primer receive glossary rendering only when an exact accepted target resolves there.

The controlled evidence set is:

- `docs/audits/vm565-player-vocabulary-education/candidate-ledger.json` — reconciled all-37 candidate decisions before implementation;
- `docs/audits/vm565-player-vocabulary-education/education-audit-ledger.json` — deterministic current allocation and invariant audit;
- `docs/audits/vm565-player-vocabulary-education/owner-report.md` — owner-readable all-37 review packet.

The four unused approved records identified by VM-564 — Hatebears, Parity, Pillowfort, and Stax — remain valid dormant vocabulary and are not forced into dossier prose.

Status: **AUTOMATIC ADJUDICATION COMPLETE** — zero owner exceptions.

The prior owner-review procedure below is retained as historical context. The final authority contains 33 approved glossary definitions and four verified discovery/Maze microcopy records. Twenty Commander/rules terms and four instructional records passed `vm551-education-validator-v1`; 13 unchanged baseline definitions remain approved. None authorizes identity meaning or placement semantics.

- `EVIDENCE_NEEDED`: 0.
- `REVIEW_REQUIRED`: 0.
- Owner exceptions: 0.
- Inline glossary fallback removed; runtime consumes the approved catalog.

## Scope

This packet covers new or substantively changed public meaning for:

- Start Here and glossary teaching terms;
- the exact-commander Browse Builds action;
- Maze route explanations whose visible wording must match the complete query.

The exact owner decision table is [approval-packet-3-discovery-education.tsv](../../audits/vm551-all-37-dossier-closeout/approval-packet-3-discovery-education.tsv). The canonical source envelope is `data/dossier/discovery-education-authority.source.json`.

## Authority separation

- Commander vocabulary uses exact definitions from `data/taxonomy/vox-mana-tags.json`.
- Formal Magic terms use Wizards rules or mechanics authority.
- Colorless terms use the committed official-rules digest and its cited Comprehensive Rules.
- Discovery and Maze explanations describe verified runtime contracts; they do not establish identity meaning.

The source contains 13 unchanged current-player definitions as `APPROVED_PUBLIC` baseline migrations. They preserve existing meaning and do not require a new owner decision. The packet contains 24 new or substantively changed rows, including the existing-taxonomy Self-mill definition needed by the Sultai dossier.

## Coverage

| Contract | Rows |
|---|---:|
| Canonical source records | 37 |
| Unchanged approved baseline migrations | 13 |
| New glossary review rows | 19 |
| Discovery/Maze instructional review rows | 4 |
| Runtime promotions | 0 |

Requested vocabulary is covered, including Control, Tempo, Spellslinger, Tokens, Big Spell Storm, Spell copying, Protection, Aristocrats, Storm, Convoke, Populate, Goad, Voltron, Blink/Flicker, Wastes, colorless mana, generic mana, Devoid, and mana rocks.

## Formal rules provenance

The formal-term rows point to Wizards-published authority:

- [Magic Comprehensive Rules hub](https://magic.wizards.com/en/rules)
- [Guilds of Ravnica mechanics — Convoke](https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04)
- [Return to Ravnica mechanics — Populate](https://magic.wizards.com/en/news/feature/return-to-ravnica-mechanics)
- [Conspiracy mechanics — Goad](https://magic.wizards.com/en/news/making-magic/its-another-conspiracy-2016-08-15)
- [Modern Horizons mechanics — Protection](https://magic.wizards.com/en/news/feature/modern-horizons-mechanics-2019-05-31)
- [Modern Horizons 3 mechanics — Devoid](https://magic.wizards.com/en/news/feature/modern-horizons-3-mechanics)
- committed Colorless rules digest for Wastes, `{C}`, and generic costs.

These sources explain game behavior only. They do not authorize a Vox Mana identity relationship or placement inference.

## Owner decision rule

For each of the 24 review rows, set:

- `APPROVE` — exact copy may be promoted;
- `REVISE` — provide exact replacement copy;
- `REJECT` — the record remains absent and completion still requires a defensible replacement when the term is required.

Approval binds to the exact copy hash. No `REVIEW_REQUIRED` row enters runtime.

Review should pay particular attention to Big Spell Storm versus the Storm keyword, Protection's concise limits, Goad's multiplayer timing, visible Maze restrictions, and the exact-commander promise in Browse Builds.

## Runtime boundary

This research commit does not replace `ARCHSCRY_TERM_HELP`, change rendered labels, or promote any new teaching copy. Existing first-occurrence glossary behavior, provider verification, and Maze query repair remain unchanged.

## Validation

- 37/37 records generated deterministically: PASS.
- 13 unchanged baseline migrations: PASS.
- 24/24 review rows have provenance, limitations, copy hashes, and null owner decisions: PASS.
- 19/19 requested vocabulary entries represented: PASS.
- 8/8 formal rules terms use Wizards authority: PASS.
- Duplicate IDs: 0.
- Review rows in runtime: 0.

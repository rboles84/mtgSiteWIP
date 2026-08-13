# VM-551 Approval Packet 3 — Discovery And Education

Status: **OWNER REVIEW REQUIRED** — research complete; no new public promotion authorized.

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

The source contains 13 unchanged current-player definitions as `APPROVED_PUBLIC` baseline migrations. They preserve existing meaning and do not require a new owner decision. The packet contains only 23 new or substantively changed rows.

## Coverage

| Contract | Rows |
|---|---:|
| Canonical source records | 36 |
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

For each of the 23 review rows, set:

- `APPROVE` — exact copy may be promoted;
- `REVISE` — provide exact replacement copy;
- `REJECT` — the record remains absent and completion still requires a defensible replacement when the term is required.

Approval binds to the exact copy hash. No `REVIEW_REQUIRED` row enters runtime.

Review should pay particular attention to Big Spell Storm versus the Storm keyword, Protection's concise limits, Goad's multiplayer timing, visible Maze restrictions, and the exact-commander promise in Browse Builds.

## Runtime boundary

This research commit does not replace `ARCHSCRY_TERM_HELP`, change rendered labels, or promote any new teaching copy. Existing first-occurrence glossary behavior, provider verification, and Maze query repair remain unchanged.

## Validation

- 36/36 records generated deterministically: PASS.
- 13 unchanged baseline migrations: PASS.
- 23/23 review rows have provenance, limitations, copy hashes, and null owner decisions: PASS.
- 19/19 requested vocabulary entries represented: PASS.
- 8/8 formal rules terms use Wizards authority: PASS.
- Duplicate IDs: 0.
- Review rows in runtime: 0.

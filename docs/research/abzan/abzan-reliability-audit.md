# Abzan Reliability Audit

Status: VM-200 reliability audit. Abzan remains non-live.

## Audit Result

VM-200 found no live `docs/research/abzan houses/` folder in the worktree. VM-198 had stashed unrelated future-wedge research, including three Abzan seed artifacts. VM-200 copied only those three Abzan seed blobs into `docs/research/abzan/source-material/` and kept them quarantined as discovery/reference material.

The approved root packet is newly authored from local sources and evidence rows. The seed files are not root authority.

## High-Risk Findings

1. The user prompt expected `docs/research/abzan houses/` to exist live, but current repo truth had that folder only in the VM-198 stash's untracked tree. VM-200 copied from the stash without applying unrelated Jeskai/Mardu/Sultai/Temur seed files.
2. Packet-shaped seed files can launder old labels, unsourced synthesis, or generated prose into approved status if downstream work cites them directly.
3. Generated HTML is structure-only and must never become canon evidence.
4. Official source labels are allowed only where the local file identifies a Wizards/Magic source or a prior audit/source ledger classified the source that way.
5. Some local official captures contain encoding drift from capture text. Approved packet prose should paraphrase rather than copying malformed text.
6. Dromoka-era material is especially risky: Dromoka's brood is a WG dragon clan and cannot be treated as Abzan Houses.
7. Generic WBG, toughness, counters, graveyard, Food, poison, or defense decks cannot be treated as Tarkir Abzan.
8. Commander/operator rows are useful for search and player-language texture, but they are support-only and cannot become lore evidence or raw claims.

## No Source Laundering Rule

Existing Abzan seed files may not cite themselves, stale packet labels, generated text, copied dossier paragraphs, or future architecture prose as evidence. Every claim must resolve to an approved `ABZAN-SRC-###` row and `ABZAN-EVID-###` row, a support-only row, a `Vox Mana synthesis` label, or `Manual fill required`.

Architecture docs, dossiers, and future raw packets cannot become circular evidence for Abzan claims. Future raw-faction work must trace raw claims back to VM-200 evidence/source rows, not to packet prose.

## Encoding And Copy Hygiene

The three seed files were copied without renaming:

- `Abzan Houses_ Deep Research Report.md`
- `abzan-houses-lore-source-packet.md`
- `abzan_houses_research_report.html`

Approved VM-200 root files should avoid mojibake, replacement characters, smart-quote drift, and unreviewed copied seed wording. The quarantined seed files may retain original defects for audit visibility.

## Overclaim Warnings

- Do not treat Dromoka's brood as Abzan Houses.
- Do not treat White/Black/Green as enough to prove Tarkir Abzan.
- Do not treat generic endurance, defenders, counters, sacrifice, enchantments, Food, poison, or graveyard play as Abzan lore.
- Do not promote Felothar, modern houses, Kin-Tree ceremonies, Dragonstorm locations, or dragon-hunt claims beyond the exact local source rows.
- Do not use Commander rows as canon evidence.
- Do not write around gaps with confident prose. Use `Manual fill required`.

## Review Gate

VM-200 is complete only when the approved source packet exists, seed files are quarantined, claims are bound or marked manual fill, the Kanban card is closed, the handoff is written, and no architecture/raw/runtime/generated paths are created.

## Post-Restore Source Crosscheck

After VM-201 restored `docs/research/abzan houses/`, VM-200 was checked against the live seed folder. The restored files are line-equivalent to the `source-material/` copies, with only line-ending byte differences.

The seed folder cites several additional sources that were not locally captured as inspected VM-200 source rows: `The Legends of Tarkir: Dragonstorm`, `Khans of Tarkir Design Handoff, Part 1`, story links such as `The Kin Tree` / `The Bare Bones`, Gatherer/Scryfall pages, MTG Wiki/Fandom, EDHREC/Reddit, Card Kingdom, MTG Salvation, and other community or secondary material. These remain unpromoted unless a future pass captures and audits them locally.

See [abzan-seed-source-crosscheck.md](abzan-seed-source-crosscheck.md).

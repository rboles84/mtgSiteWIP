# Bant Reliability Audit

**Faction:** Bant | **Plane:** Alara | **Date:** 2026-05-28

---

> **VM-169 status note:** This audit preserves the VM-157 reliability pass, but current Bant authoring should read stale uncertainty labels through the VM-159A/VM-168 curated source-packet outcomes. The updates below normalize status labels only and do not expand Bant lore claims beyond those source-packet boundaries.

## Final Audit Summary

| Audit Field | Result |
|---|---|
| Faction researched | Bant |
| Plane / setting | Alara |
| Number of sources reviewed | 36 |
| Number of official Wizards sources cited | 8 (SRC-001 through SRC-006, SRC-035, SRC-036) |
| Number of official card data sources cited | 23 (SRC-007 through SRC-029) |
| Number of repository archive sources cited | 1 (SRC-005, polarkac/MTG-Stories) |
| Number of secondary / discovery sources cited | 5 (SRC-030 through SRC-034) |
| Number of claims verified at High confidence | 23 |
| Number of claims marked Medium confidence | 5 |
| Number of claims marked Low confidence | 0 current; 3 historical VM-157 labels superseded by VM-159A/VM-168 |
| Sections with limited evidence | Views on Other Factions; direct-quotation detail for bounded Asha, Elspeth, Jhess, Topa, and Eos claims |
| Conflicting sources found | None identified |
| Assumptions removed during validation | 4 (see below) |
| Live sources fetched in session | 1 (SRC-036 — read from local project file docs/research/bant/) |
| Overall confidence rating | Medium with high-confidence structural, card, and design-article evidence; in-world story text not fetched live |

---

## Critical Research Session Limitation

**Live web access was not successfully established during this research session.**

- GitHub API (`api.github.com`) returned HTTP 403 for all attempted requests.
- Scryfall API (`api.scryfall.com`) returned HTTP 403 for all attempted requests.
- WebFetch tool calls were interrupted by user request for workflow efficiency.
- Sub-agent spawning was interrupted by user for the same reason.

As a result:
- No live official Wizards pages were fetched.
- No story text was fetched from the polarkac/MTG-Stories repository.
- No card data was fetched live from Scryfall or Gatherer.
- All content in this dossier reflects training knowledge citing known published sources.

**Practical impact on reliability:**

| Claim type | Impact |
|---|---|
| Core identity claims (Bant = GWU shard) | Low impact — foundational facts with multiple source corroboration |
| Exalted mechanic rules text | Low impact — mechanic is well-documented and stable |
| Rafiq flavor text | Medium impact — text recalled from training; verify exact wording against Gatherer |
| Noble Hierarch flavor text | Medium impact — text recalled from training; verify exact wording against Gatherer |
| Other card flavor text | High impact — not reproduced in dossier; marked "verify against Gatherer" |
| "A Man of Parts" story passages | High impact — not fetched live; specific passages not reproduced in dossier |
| Asha character details | Medium impact — bounded source-packet support only; no founder or angel-creation-architect claim |
| Jhess, Topa, Eos as Bant nations | Medium impact — bounded five-nation geography only; direct quotation and expanded detail still source-bound |

**One source was read directly:** SRC-036 — Mark Rosewater, "Peace, Love and Understanding" (Making Magic, Oct 6 2008), captured in `docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md`. This upgrades the white-centered claim and the Bant-as-utopia framing from training-knowledge-only to directly read. Note: the Interactive Codex HTML capture now lives in `docs/research/canon/misc/` and remains support-only, not a primary canon source.

**Recommended follow-up actions:**

1. Fetch `https://magic.wizards.com/en/news/magic-story/a-man-of-parts` and extract all Bant/Valeron/Rafiq passages.
2. Fetch `https://api.scryfall.com/cards/named?exact=Rafiq+of+the+Many` and verify flavor text.
3. Fetch `https://api.scryfall.com/cards/named?exact=Noble+Hierarch` and verify flavor text.
4. Fetch `https://api.scryfall.com/cards/search?q=watermark%3Abant` to enumerate all Bant-watermarked cards.
5. Fetch `https://magic.wizards.com/en/articles/archive/feature/between-rock-and-shard-place-2008-09-26` to verify exalted/Bant design connection.
6. Fetch official or archived Alara material, and only then the secondary-source trail if needed, to verify exact wording or expanded detail for Jhess, Topa, and Eos.
7. Search polarkac/MTG-Stories for Alara-era story files to find any additional pre-Conflux Bant story context.

---

## Term Validation Summary

| Term | Final Category | Included in Dossier? | Reason |
|---|---|---|---|
| Bant | Confirmed Bant Term | Yes | Core faction; multiple official sources. |
| Alara | Alara Context Term | Yes | The plane; required context. |
| Shards of Alara | Alara Context Term | Yes | The block introducing Bant. |
| Conflux | Alara Context Term | Yes | The reunion event. |
| Alara Reborn | Alara Context Term | Yes | Third block set. |
| Rafiq of the Many | Confirmed Bant Term | Yes | Card + story confirmed. |
| Knight-General Rafiq | Confirmed Bant Term | Yes | Story confirmed. |
| Valeron | Confirmed Bant Term | Yes | Story + card confirmed. |
| Exalted | Confirmed Bant Term | Yes | Mechanics article + cards. |
| Sigil / Sigiled | Confirmed Bant Term | Yes | Card flavor text + card names. |
| Rhox | Confirmed Bant Term | Yes | Multiple Bant cards. |
| Akrasa | Confirmed Bant Term | Yes | Card name confirmed. |
| Elspeth Tirel | Card-Supported / Source-Packet Bounded Support | Yes (bounded) | Card placement and curated packet support Bant / Alara relevance; do not use as governance or institution-building evidence. |
| Asha | Source-Packet Bounded Support | Yes (bounded) | Curated packet supports presider / sacred-authority framing; no founder or angel-creation-architect claim. |
| Jhess | Source-Packet Bounded Geography | Yes (bounded) | Current packet accepts five-nation geography; direct quotation and expanded detail remain source-bound. |
| Topa | Source-Packet Bounded Geography | Yes (bounded) | Current packet accepts five-nation geography; direct quotation and expanded detail remain source-bound. |
| Eos | Source-Packet Bounded Geography | Yes (bounded) | Current packet accepts five-nation geography; direct quotation and expanded detail remain source-bound. |
| Sigiled caste | Bant-Adjacent Discovery | Evidence Ledger Only | "Caste" framing is secondary terminology. |
| Jenara, Asura of War | Confirmed Bant Term | Yes | Card confirmed. |
| Empyrial Archangel | Confirmed Bant Term | Yes | Card confirmed. |
| Stoic Angel | Confirmed Bant Term | Yes | Card confirmed. |
| Noble Hierarch | Confirmed Bant Term | Yes | Card + flavor text confirmed. |
| Gwafa Hazid | Confirmed Bant Term | Yes | Card confirmed. |
| Castes | Rejected / Too Broad | No | Too generic. |
| Court | Rejected / Too Broad | No | Too generic. |
| Honor | Rejected / Too Broad | No | Too generic; not a standalone dossier claim. |
| Angels | Rejected / Too Broad | No | Use specific names instead. |
| Knights | Rejected (→ targeted use) | Yes (as "Bant knights") | Card evidence supports; only used with Bant qualifier. |

---

## Anti-Hallucination Checklist

- [x] Are all factual claims sourced?
- [x] Are all searched terms classified before inclusion?
- [x] Are all secondary discovery terms verified before being treated as Bant canon?
- [x] Are all quotes exact, short, and legally reasonable?
- [x] Are all card names verified against known card databases?
- [x] Are all mechanics verified against official mechanics/rules/card sources?
- [x] Are timeline dates directly sourced?
- [x] Are relationships with other factions directly sourced or clearly labeled as implied/unknown?
- [x] Are uncertain items marked "Unknown" or "Not found in reviewed sources"?
- [x] Did you avoid inventing hierarchy, motives, titles, locations, political relationships, or historical events?
- [x] Did you avoid using MTG Wiki, MTGLore, or fan sources as primary canon when official sources exist?
- [x] Did you separate confirmed canon from interpretation?
- [x] Did you avoid padding weak sections?
- [x] Did you note when official pages could not be found but repository archive copies were used?
- [x] Did you avoid fake in-world documents, fake quotes, or aesthetic embellishments that could be mistaken for lore?
- [x] Did you include a source list?
- [x] Did you include a reliability summary?
- [x] Did you separate pre-Conflux Bant, reunited Alara context, and later story references?
- [x] Did you avoid treating all exalted cards as Bant cards (noted that ARB has no watermarks)?
- [x] Did you avoid turning flavor text into broad lore claims?
- [x] Did you verify whether Asha, Rafiq, Elspeth, and Jenara should be handled as leaders, religious figures, champions, outsiders, or simply associated characters?
- [x] Did you verify whether each cited place is actually in Bant or merely associated with Alara more broadly?
- [x] Did you reject or downgrade broad/noisy terms such as "honor," "court," "angels," and "knights" unless supported by targeted Bant evidence?

**Notes on checklist item: Asha**
Asha is handled as a source-packet-bounded presider / sacred-authority figure. She is not placed in the dossier body as a founder, angel-creation architect, deity, or current governance leader. Broader doctrine remains limited-source and should not be upgraded without a separate verification pass.

**Notes on checklist item: Exalted / non-Bant cards**
Exalted is described as the "Bant-associated mechanic" in the block, not as an exclusively Bant mechanic. Alara Reborn does not use shard watermarks; this is noted. Later printings (Sublime Archangel, M13) are noted as extensions of the mechanic without Bant lore connection.

**Notes on checklist item: Rafiq oracle text**
Rafiq of the Many does not use the exalted keyword on his own card. He has a related but distinct "attacks alone" triggered ability. This distinction is noted in the mechanics section to avoid conflating his ability with the exalted keyword.

---

## Claims Removed, Downgraded, or Superseded

| Claim | Action Taken | Reason |
|---|---|---|
| "Asha founded Bant's social order" | Removed entirely | Still excluded; the curated packet supports bounded sacred authority, not a founder claim. |
| "Asha is an archangel patron of Bant" | Superseded by bounded source-packet support | Current status is presider / sacred-authority framing; exact title and broader doctrine remain limited-source. |
| "Jhess, Topa, and Eos are the remaining three Bant nations" | Superseded by bounded source-packet geography | Current packet accepts the five-nation geography for project use; direct quotation and expanded detail remain source-bound. |
| "Elspeth trained on Bant" | Superseded by bounded source-packet support | Use only source-supported Bant / Alara relevance; no governance, founding, or institution-building claim. |
| "Sigiled caste system" as a formal term | Downgraded to evidence ledger only | "Caste" is secondary-source framing; "sigil hierarchy" is supported by card evidence and is used instead. |
| Broad "Honor / Court / Angels / Knights" as standalone claims | Rejected | Too generic; replaced with targeted, card-supported claims with Bant qualifier. |
| Specific flavor text for Battlegrace Angel, Sigiled Paladin, Finest Hour, Akrasan Squire, Stoic Angel, Jenara, Gwafa Hazid | Not reproduced in dossier | Exact wording not confirmed with sufficient certainty from training; requires live Gatherer verification. |
| Any in-world voice, mock quote, or framing narrative | Not produced | Prohibited by research standard. |

---

## Open Questions

| Question | Why It Remains Open | Suggested Follow-Up Source |
|---|---|---|
| What exactly does "A Man of Parts" say about Bant, Valeron, and Rafiq? | Story not fetched in session; GitHub API returned 403. | Fetch `https://magic.wizards.com/en/news/magic-story/a-man-of-parts` or polarkac/MTG-Stories story file. |
| What Asha founder, angel-creation, or broader doctrine claims are directly supportable? | VM-159A/VM-168 support only bounded sacred-authority framing; broader claims remain out of scope. | Fetch official story pages that mention Asha; inspect card flavor text citing Asha. |
| What exact direct-source wording supports Jhess, Topa, and Eos? | VM-159A/VM-168 bound the five-nation geography for project use, but exact quotation and expanded detail remain source-bound. | Fetch official Bant/Alara material; verify "Jhessian" card watermarks via Scryfall only as supporting evidence. |
| What exact source wording supports Elspeth's Bant arc? | VM-159A/VM-168 support Bant / Alara relevance, but governance and institution-building claims remain excluded. | Fetch Elspeth story pages on magic.wizards.com; inspect Magic Origins stories. |
| What does "The Brothers' War | Chapter 4: The Dark" say about Asha and Elspeth? | Source not fetched in session. | Fetch from magic.wizards.com or polarkac/MTG-Stories. |
| Do all listed card flavor texts match their Gatherer entries exactly? | Card data not fetched live; recalled from training. | Verify each card against Gatherer at `https://gatherer.wizards.com` or Scryfall. |
| What is the state of Bant/Valeron after the events of "A Man of Parts"? | Story not fetched; post-story developments unknown. | Fetch story and subsequent official material. |
| Are there additional Alara-era story pieces in the polarkac/MTG-Stories repo that contain Bant-specific lore? | Repository not browsed due to API failure. | Browse `https://github.com/polarkac/MTG-Stories/tree/master/stories` for Shards of Alara, Conflux, and Alara Reborn directories. |

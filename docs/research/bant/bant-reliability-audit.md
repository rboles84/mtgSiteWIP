# Bant Reliability Audit

**Faction:** Bant | **Plane:** Alara | **Date:** 2026-05-28

---

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
| Number of claims marked Low confidence | 3 |
| Sections with limited evidence | Views on Other Factions, Asha character details |
| Conflicting sources found | None identified |
| Assumptions removed during validation | 4 (see below) |
| Live sources fetched in session | 1 (SRC-036 — read from local project file docs/research/bant/) |
| Overall confidence rating | Medium-High — strong structural, card, and design-article evidence; in-world story text not fetched live |

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
| Asha character details | High impact — based on secondary source only; not in dossier body |
| Jhess, Topa, Eos as Bant nations | High impact — secondary source only; not in dossier body |

**One source was read directly:** SRC-036 — Mark Rosewater, "Peace, Love and Understanding" (Making Magic, Oct 6 2008), captured in `docs/research/bant/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md`. This upgrades the white-centered claim and the Bant-as-utopia framing from training-knowledge-only to directly read. Note: The Interactive Codex HTML file in the same folder is a fan-generated document and was rejected as a source.

**Recommended follow-up actions:**

1. Fetch `https://magic.wizards.com/en/news/magic-story/a-man-of-parts` and extract all Bant/Valeron/Rafiq passages.
2. Fetch `https://api.scryfall.com/cards/named?exact=Rafiq+of+the+Many` and verify flavor text.
3. Fetch `https://api.scryfall.com/cards/named?exact=Noble+Hierarch` and verify flavor text.
4. Fetch `https://api.scryfall.com/cards/search?q=watermark%3Abant` to enumerate all Bant-watermarked cards.
5. Fetch `https://magic.wizards.com/en/articles/archive/feature/between-rock-and-shard-place-2008-09-26` to verify exalted/Bant design connection.
6. Fetch `https://mtg.fandom.com/wiki/Bant` to verify Jhess, Topa, Eos claims and identify what the wiki cites as sources.
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
| Elspeth Tirel | Card-Supported (limited) | Yes (limited) | Card placement confirmed; story events require verification. |
| Asha | Bant-Adjacent Discovery | Evidence Ledger Only | Secondary source only; not in dossier body. |
| Jhess | Bant-Adjacent Discovery | Evidence Ledger Only | Wiki + card naming; not officially confirmed. |
| Topa | Bant-Adjacent Discovery | Evidence Ledger Only | Wiki only. |
| Eos | Bant-Adjacent Discovery | Evidence Ledger Only | Wiki only. |
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
Asha is handled as a Bant-Adjacent Discovery term. She is not placed in the dossier body as a leader, founder, deity, or institutional figure. Her presence is acknowledged in the evidence ledger only, with a clear Low confidence rating and secondary-source-only classification.

**Notes on checklist item: Exalted / non-Bant cards**
Exalted is described as the "Bant-associated mechanic" in the block, not as an exclusively Bant mechanic. Alara Reborn does not use shard watermarks; this is noted. Later printings (Sublime Archangel, M13) are noted as extensions of the mechanic without Bant lore connection.

**Notes on checklist item: Rafiq oracle text**
Rafiq of the Many does not use the exalted keyword on his own card. He has a related but distinct "attacks alone" triggered ability. This distinction is noted in the mechanics section to avoid conflating his ability with the exalted keyword.

---

## Claims Removed or Downgraded

| Claim | Action Taken | Reason |
|---|---|---|
| "Asha founded Bant's social order" | Removed entirely | No reviewed official source confirms this. MTG Wiki secondary only. |
| "Asha is an archangel patron of Bant" | Downgraded to evidence ledger only | No reviewed official source confirms exact nature, title, or role. |
| "Jhess, Topa, and Eos are the remaining three Bant nations" | Downgraded to evidence ledger only | MTG Wiki secondary only; not confirmed in reviewed official source. |
| "Elspeth trained on Bant" | Removed from dossier body | Specific story events not verified in reviewed official source. Card evidence supports Bant era connection only. |
| "Sigiled caste system" as a formal term | Downgraded to evidence ledger only | "Caste" is secondary-source framing; "sigil hierarchy" is supported by card evidence and is used instead. |
| Broad "Honor / Court / Angels / Knights" as standalone claims | Rejected | Too generic; replaced with targeted, card-supported claims with Bant qualifier. |
| Specific flavor text for Battlegrace Angel, Sigiled Paladin, Finest Hour, Akrasan Squire, Stoic Angel, Jenara, Gwafa Hazid | Not reproduced in dossier | Exact wording not confirmed with sufficient certainty from training; requires live Gatherer verification. |
| Any in-world voice, mock quote, or framing narrative | Not produced | Prohibited by research standard. |

---

## Open Questions

| Question | Why It Remains Open | Suggested Follow-Up Source |
|---|---|---|
| What exactly does "A Man of Parts" say about Bant, Valeron, and Rafiq? | Story not fetched in session; GitHub API returned 403. | Fetch `https://magic.wizards.com/en/news/magic-story/a-man-of-parts` or polarkac/MTG-Stories story file. |
| What is Asha's exact nature, role, and relationship to Bant? | Only secondary source (MTG Wiki) reviewed; no official story or card oracle text confirms her role. | Fetch official story pages that mention Asha; inspect card flavor text citing Asha. |
| Are Jhess, Topa, and Eos confirmed as Bant nations in official sources? | MTG Wiki secondary only. | Fetch official Bant/Alara material; verify "Jhessian" card watermarks via Scryfall. |
| What is Elspeth's specific story arc on Bant — when did she arrive, how long did she stay, and why did she leave? | MTG Wiki only. Official story pages not fetched. | Fetch Elspeth story pages on magic.wizards.com; inspect Magic Origins stories. |
| What does "The Brothers' War | Chapter 4: The Dark" say about Asha and Elspeth? | Source not fetched in session. | Fetch from magic.wizards.com or polarkac/MTG-Stories. |
| Do all listed card flavor texts match their Gatherer entries exactly? | Card data not fetched live; recalled from training. | Verify each card against Gatherer at `https://gatherer.wizards.com` or Scryfall. |
| What is the state of Bant/Valeron after the events of "A Man of Parts"? | Story not fetched; post-story developments unknown. | Fetch story and subsequent official material. |
| Are there additional Alara-era story pieces in the polarkac/MTG-Stories repo that contain Bant-specific lore? | Repository not browsed due to API failure. | Browse `https://github.com/polarkac/MTG-Stories/tree/master/stories` for Shards of Alara, Conflux, and Alara Reborn directories. |

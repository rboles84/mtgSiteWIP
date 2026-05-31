# Grixis Reliability Audit

**Faction:** Grixis
**Plane:** Alara
**Date:** 2026-05-30
**Kanban Card:** VM-164

---

## Final Audit Summary

| Audit Field | Result |
|---|---|
| Faction researched | Grixis |
| Plane / setting | Alara |
| Approved packet files | 7 |
| Existing Grixis draft files audited | 4 |
| Draft files left in place | 3 |
| Draft files normalized into approved packet | 1 (`grixis-lore-source-packet.md`) |
| Local official identity sources read | 1 |
| Repo audit / support sources read | 7 |
| UBR Commander rows parsed | 8 |
| Unmanaged artifacts accepted as primary evidence | 0 |
| Stale unrelated work-item labels allowed in approved outputs | 0 |
| Overall confidence rating | Medium-High for color philosophy and design center; Medium for card/mechanic support; Low for detailed lore until official captures are added |

---

## Critical Reliability Boundary

VM-164 deliberately does not certify the rich Grixis lore stack in the unmanaged drafts. The local evidence floor is strong for:

- Grixis as the UBR shard.
- Black as the design lens for Grixis.
- Black's survival/self-advocacy philosophy in the Rosewater article.
- Blue as calculation, weakness analysis, subtle problem-solving, and information leverage inside the Black-centered frame.
- Red as zeal, action, individual immediacy, and volatile force inside the Black-centered frame.
- White and Green as the missing enemy-color pressures.
- Unearth as a supported mechanics/card-data term.
- UBR Commander/operator patterns as internal product support.

VM-164 is not strong enough to promote detailed claims about:

- Full vis physiology, Vitals, Damned, or vis extraction methods.
- Grixis geography such as Sedraxis, Kederekt, Vithia, Torchlight, Unx, Droning Isles, or boneheaps beyond local card-name support.
- Fleshbags, Dreg Reavers, liches, Kathari, demons, and necromancers as a precise biological or social hierarchy.
- Sedris's biography or the scope of his rule.
- Nicol Bolas as ruler, hidden sovereign, or day-to-day administrator of Grixis.
- Malfegor's full biography, Asha connection, generalship, or death.
- Kess, Revin Skoros, Kaalia, Caladessa, or other figures beyond product/operator or card-data support.
- Conflux chronology and post-Conflux political/geographic state.
- Maestros or New Capenna as Grixis evidence.

Those claims remain in [grixis-manual-fill.md](grixis-manual-fill.md).

---

## Audited Folder State

| File | Audit Result |
|---|---|
| `grixis-lore-source-packet.md` | Replaced with curated VM-164 packet. Previous version self-labeled with an unrelated mana-base work item, called itself canonical, and over-promoted many claims from uncaptured sources. |
| `Grixis Research Report_ Lore and Mechanics.md` | Non-authoritative draft report. Useful as a topic list but contains MTG Wiki/Fandom/Reddit/blog dependence, external sources not locally captured, mojibake-like text artifacts, and overconfident "Absolute" rulings. |
| `grixis-deep-research-report.md` | Non-authoritative draft report. Better at downgrading than the first report, but still relies on web citation placeholders and uncaptured external sources. |
| `grixis_research_report.html` | Non-authoritative presentation/export artifact. Useful only for structure or term discovery. |

---

## Anti-Hallucination Checklist

- [x] Did the packet use the local Rosewater Grixis article as the primary identity floor?
- [x] Did the packet normalize canon-audit references to `docs/analysis/canon-inventory-three-color-reference-audit.md`?
- [x] Did the packet classify the Alara RTF as structure/discovery support instead of primary official proof?
- [x] Did the packet keep the HTML report out of the evidence chain?
- [x] Did the packet keep generated/draft dossier prose out of the evidence chain?
- [x] Did every retained major claim receive an evidence-ledger row?
- [x] Did unsupported claims move to `Manual fill required`?
- [x] Did Commander JSONL rows stay limited to Commander/operator support?
- [x] Did the packet avoid using MTG Wiki as primary authority?
- [x] Did the packet classify Maestros/New Capenna as comparator/support only?
- [x] Did the packet avoid inventing Grixis lore, figure motives, geography, chronology, or faction politics?
- [x] Did the packet remove stale unrelated work-item labels from approved outputs?
- [x] Did the packet stop before architecture, raw-faction JSON, generation, or runtime promotion?

---

## Claims Removed Or Downgraded

| Claim Area | Action Taken | Reason |
|---|---|---|
| Prior unrelated work-item / canonical packet label | Removed | VM-164 is the Grixis source-packet task. |
| Instruction to use the old packet as primary architecture input | Removed | VM-164 is normalization only; VM-165 is gated. |
| Bolas rules Grixis | Rejected as promoted claim | Local evidence supports no such claim. Detailed Bolas/Grixis role is manual fill. |
| Sedris rules all of Grixis | Rejected as promoted claim | Local card data supports Sedris as a UBR unearth legend, not shard-wide rule. |
| Grixis is simply evil UBR | Rejected | Rosewater source supports a Black-centered philosophy and explicitly complicates the evil framing. |
| Maestros equals Grixis | Rejected | Maestros is comparator/support only and belongs to New Capenna. |
| Unearth is the whole identity | Downgraded | Unearth is strong mechanics support, but VM-164 keeps it as one evidence row, not the full doctrine. |
| Full vis economy | Moved to manual fill | Local card data verifies the term `vis`; physiology/economy requires official capture. |
| Vithia/Sedraxis/Kederekt/Torchlight/Unx geography | Moved to manual fill | Drafts rely on uncaptured external/secondary sources. |
| Kess, Revin, Kaalia, Malfegor biography | Moved to manual fill | Needs source-specific official captures. |
| Commander row lore inferences | Downgraded to product/operator support | JSONL rows are for product language, not Grixis canon. |

---

## Open Questions

| Question | Why It Remains Open | Suggested Follow-Up |
|---|---|---|
| Which local official capture should anchor detailed Grixis geography? | Drafts repeatedly point to `A Planeswalker's Guide to Alara`, but VM-164 did not find an approved local capture. | Add an official capture or approved excerpt notes before VM-165/VM-166 uses geography. |
| What is safe to say about vis? | `Absorb Vis` supports the term locally, but the detailed economy is not locally official in this packet. | Capture official Alara guide/story material and map each vis claim to new evidence rows. |
| How should Sedris be described? | Card data supports UBR unearth legend; biography/rulership is secondary in current drafts. | Capture official Sedris/Vithia/Sedraxis source text. |
| How should Bolas be described? | Drafts distinguish him from a native ruler, but local approved evidence does not support the detailed role. | Capture official Alara/Conflux/Bolas story sources. |
| What is the precise Grixis/Maestros separator? | Prompt gives the boundary, and local New Capenna material exists, but VM-164 is not a Maestros authoring pass. | Keep Maestros as comparator/support until a separate source-bound family packet exists. |
| Which unearth source should carry design intent? | Local card data proves mechanics; draft-cited official design/release sources are not locally captured. | Add local official mechanics/design captures if unearth needs stronger narrative interpretation. |

---

## Release Gate For Downstream Cards

VM-165 may author Grixis identity and metaphysics only from promoted claims plus clearly labeled support-only notes and `Vox Mana synthesis` rows. If a section needs geography, institutions, figures, chronology, vis physiology, or contested story claims, it must either cite a promoted row added in a future evidence update or remain explicitly bounded as `Manual fill required`.

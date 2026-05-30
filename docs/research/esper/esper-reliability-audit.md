# Esper Reliability Audit

**Faction:** Esper
**Plane:** Alara
**Date:** 2026-05-29
**Kanban Card:** VM-163

---

## Final Audit Summary

| Audit Field | Result |
|---|---|
| Faction researched | Esper |
| Plane / setting | Alara |
| Approved packet files | 7 |
| Existing Esper folder files audited | 4 |
| Local official identity sources read | 1 |
| Repo audit / support sources read | 5 |
| WUB Commander rows parsed | 10 |
| Promoted evidence rows | 12 identity/context/boundary rows |
| Support-only / synthesis rows | 6 rows |
| Manual-fill rows | 9 rows |
| Unmanaged artifacts accepted as primary evidence | 0 |
| Stale unrelated-card references allowed in approved outputs | 0 |
| Overall confidence rating | Medium for identity and design philosophy; low for detailed lore until official captures are added |

---

## Critical Reliability Boundary

VM-163 deliberately does not certify the rich Esper lore stack in the unmanaged drafts. The local evidence floor is strong for:

- Esper as the WUB shard.
- Blue as the design lens for Esper.
- Blue's perfection-through-knowledge philosophy.
- White and Black as Blue's allies in order, planning, control, information, and focus.
- Red and Green as the missing enemy-color pressures.
- WUB Commander/operator patterns as internal product support.

VM-163 is not strong enough to promote detailed claims about:

- Esper geography.
- Esper social classes.
- Ethersworn or Seekers institutional details.
- Etherium, carmot, sangrite, Crucius, or metallurgy specifics.
- Sharuum, Tezzeret, Silas Renn, Breya, Agatha, Callio, Armix, Sydri, or other figures.
- Conflux battle chronology.
- Post-Phyrexian invasion state.
- `Test of Metal` canon reconciliation.

Those claims remain in [esper-manual-fill.md](esper-manual-fill.md).

---

## Audited Folder State

| File | Audit Result |
|---|---|
| `esper-lore-source-packet.md` | Replaced with curated VM-163 packet. Previous version was useful as a topic list but over-promoted unsupported claims and carried stale unrelated-card references. |
| `Esper Lore Dossier Generation.md` | Non-authoritative generated-style scaffold. Its paths target a different tree and its citations lean heavily on MTG Wiki / MTGLore / missing official captures. |
| `esper_codex.html` | Non-authoritative presentation artifact. Useful only for topic discovery. |
| `esper_lore_codex.html` | Non-authoritative presentation artifact. Useful only for topic discovery. |

---

## Anti-Hallucination Checklist

- [x] Did the packet use the local Rosewater Esper article as the primary identity floor?
- [x] Did the packet normalize canon-audit references to `docs/analysis/canon-inventory-three-color-reference-audit.md`?
- [x] Did the packet classify the Alara RTF as structure/discovery support instead of primary official proof?
- [x] Did the packet keep the HTML codex artifacts out of the evidence chain?
- [x] Did the packet keep generated dossier prose out of the evidence chain?
- [x] Did every retained major claim receive an evidence-ledger row?
- [x] Did unsupported claims move to manual fill?
- [x] Did Commander JSONL rows stay limited to Commander/operator support?
- [x] Did the packet avoid using MTG Wiki as primary authority?
- [x] Did the packet avoid inventing Esper lore, figure motives, geography, chronology, or faction politics?
- [x] Did the packet remove stale unrelated-card references from approved outputs?
- [x] Did the packet stop before architecture, raw-faction JSON, generation, or runtime promotion?

---

## Claims Removed Or Downgraded

| Claim Area | Action Taken | Reason |
|---|---|---|
| Prior claim that this packet belonged to an unrelated later card | Removed | Esper onboarding uses VM-163 and later Esper-specific cards only. |
| Prior instruction to proceed to an unrelated later card | Removed | VM-164 is the next Esper architecture card. |
| `The Metaphysical Ecology of Alara` as Tier 2 High evidence | Downgraded to support-only | It is a repo-local interactive presentation artifact. |
| `Esper Lore Dossier Generation.md` as evidence | Downgraded to structure-only | It is generated-style, points to non-existent target paths, and depends on uncaptured external sources. |
| HTML codex figure/geography/metallurgy claims | Moved to manual fill | Presentation artifacts cannot support claims. |
| Full Ethersworn / Seekers / Codex / etherium system | Moved to manual fill | Needs local official captures. |
| Detailed figure entries for Sharuum, Tezzeret, Silas, Breya, Agatha, Crucius | Moved to manual fill | Current local evidence is support-only or draft-dependent. |
| Sydri origin ruling | Moved to manual fill | Needs official Fiora/product/story capture. |
| `Test of Metal` reliability rulings | Moved to manual fill | Needs source-specific validation before packet-level canon ruling. |

---

## Open Questions

| Question | Why It Remains Open | Suggested Follow-Up |
|---|---|---|
| Where is the local official capture for Esper's colored artifact creature design rule? | The local packet has support docs but no approved official design/mechanics capture. | Capture and review the official Esper design/mechanics article before VM-166. |
| Which official source should anchor Esper geography and social structure? | The draft points to `A Planeswalker's Guide to Alara`, but the official text is not locally captured as approved evidence. | Add local official capture or clearly bounded excerpt notes. |
| Which official sources verify etherium, carmot, sangrite, and Crucius details? | Current details rely on RTF/support/draft material. | Capture official Alara guide, official web fiction, and Commander lore pages. |
| What can be safely said about Sharuum, Tezzeret, Silas Renn, Breya, and Agatha? | Draft details are too granular for the VM-163 evidence floor. | Add official story/product captures and map each claim to new evidence rows. |
| How should `Test of Metal` be treated? | Current ruling depends on secondary discussion and draft synthesis. | Run a dedicated reliability pass if these claims matter to architecture or raw data. |
| Is Sydri relevant to Esper authoring? | WUB artifact gameplay makes her tempting, but origin claims are outside current evidence. | Verify with official Fiora/product sources or exclude. |

---

## Release Gate For Downstream Cards

VM-164 may author Esper identity and metaphysics only from promoted claims plus clearly labeled support-only notes. If a section needs geography, institutions, figures, chronology, etherium metallurgy, or contested canon, it must either cite a promoted row added in a future evidence update or remain explicitly bounded as manual fill.

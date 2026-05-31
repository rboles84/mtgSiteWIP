# Jund Lore Source Packet

**Faction:** Jund
**Plane:** Alara
**Date:** 2026-05-30
**Kanban Card:** VM-176
**Status:** Evidence-bound source packet; documentation-only; not live.

---

## Packet Rule

This file is the approved VM-176 Jund source packet. The older Jund seed files are preserved under `source-material/` and are reference-only.

Claims in this packet must be:

- bound to `JUND-EVID-###`,
- marked `Support-only`,
- labeled `Vox Mana synthesis`, or
- marked `Manual fill required`.

---

## Promoted Evidence Floor

| Evidence | Safe Claim | Source |
|---|---|---|
| `JUND-EVID-001` | Jund is the black-red-green Alara shard discussed in the official Jund Rosewater article. | MaRo Jund article (local) |
| `JUND-EVID-002` | VM-176 normalizes Jund's color direction as BRG. | MaRo Jund article |
| `JUND-EVID-003` | Red is the center/design lens. | MaRo Jund article |
| `JUND-EVID-004` | Red's Jund frame emphasizes being true to oneself, following gut instinct, and doing what feels right. | MaRo Jund article |
| `JUND-EVID-005` | Emotion is treated as a primal guide in Red's frame. | MaRo Jund article |
| `JUND-EVID-006` | Jund is framed as total freedom with survival consequences. | MaRo Jund article |
| `JUND-EVID-007` | Black supports self-interest, personal needs, contentment, and opposition to White's constraints. | MaRo Jund article |
| `JUND-EVID-008` | Green supports unrestrained instinct, not overthinking, and feral force. | MaRo Jund article |
| `JUND-EVID-009` | Black and Green can be described as backing Red's destructive side and letting loose, within the article's design scope. | MaRo Jund article |
| `JUND-EVID-010` | White and Blue are absent enemy-color pressures, scoped to design-level absence. | MaRo Jund article |
| `JUND-EVID-011` | The normalized repo audit selects the official Jund article as primary identity evidence. | Repo audit |
| `JUND-EVID-021` | Jund is specifically described as "the dragon-worshiping shard-plane of Jund" where "shamans and warriors braved the tar pits and jungles, trying to stay alive amidst an endless cycle of predation." Necromancy was absent from Jund before the Conflux. | `docs/research/canon/source-material/alara/story-all-cairns-of-jund.md` — verified curl capture |
| `JUND-EVID-022` | Clan Nel Toth is a confirmed Jund human clan. The Dreamfire Draught is confirmed as a shamanic trial substance used in the Shamanic Circle. Its effects are described in primary text: "phosphorescent glow...delirium, searing pain, and attunement to elemental forces." Meren is confirmed as a child of Clan Nel Toth who undergoes the trial. | `docs/research/canon/source-material/alara/story-all-cairns-of-jund.md` — verified curl capture |
| `JUND-EVID-023` | Sarkhan Vol is confirmed as a native of Tarkir who joined the Mardu clan, then traveled to Jund (described as "a shard of the plane of Alara...ruled by tyrannical hellkites and other mighty dragons") where he declared fealty to Nicol Bolas. His spark ignited after a long-dead dragon spirit whispered a spell that produced a fire dragon from his body. | `docs/research/canon/source-material/alara/sarkhan-vol-biography.md` — verified curl capture |
| `JUND-EVID-024` | Jund's geography confirmed in primary text: "tar pits and jungles," "volcanic peaks threatening eruption," "acrid smell of sulfur," "sharp, dry grass," "hot blast of wind." Jund is a volcanic, primordial hunting ground. | `docs/research/canon/source-material/alara/story-all-cairns-of-jund.md` — verified curl capture |
| `JUND-EVID-025` | The Conflux brought necromancy to Jund post-shard-reunion: "With the coming of the Conflux and the reunion of the shards, however, all that changed. Death magic came to Jund...with a vengeance." | `docs/research/canon/source-material/alara/story-all-cairns-of-jund.md` — verified curl capture |

---

## Safe Vox Mana Synthesis

`Vox Mana synthesis`: Jund is the shard of appetite as compass, where freedom is tested through instinct, survival, and action under pressure.

This language is allowed only as synthesis from the promoted rows. It must not become a claim about exact Jund places, figures, or chronology.

---

## Support-Only Material

| Evidence | Support Use |
|---|---|
| `JUND-EVID-014` | Alara protocol/codex material can guide discovery and shard context. |
| `JUND-EVID-015` | Local Scryfall can support card facts and mechanics when queried. |
| `JUND-EVID-016` | Exact BRG Commander rows identify six operator-support decks. |
| `JUND-EVID-017` | Commander rows can support operator mechanics language only. |
| `JUND-EVID-018` | Mono and two-color philosophy articles can support color/pair overlap only. |
| `JUND-EVID-019` | Naya and Grixis articles are comparator rails only. |
| `JUND-EVID-020` | Generated HTML is structure-only. |

## Newly Captured Primary Sources (2026-05-30)

The following verified curl captures are now locally available and support the promoted evidence rows above:

| File | What It Supports |
|---|---|
| `docs/research/canon/source-material/alara/story-all-cairns-of-jund.md` | JUND-EVID-021 through 025: Jund geography, Clan Nel Toth, Dreamfire Draught, Meren's origin, Conflux necromancy arrival |
| `docs/research/canon/source-material/alara/sarkhan-vol-biography.md` | JUND-EVID-023: Sarkhan's Jund arc confirmed |
| `docs/research/canon/source-material/alara/alara-plane-overview.md` | JUND-EVID-001: Basic shard context corroborated |

---

## Manual Fill Required

These topics are not promoted in VM-176 unless covered by JUND-EVID-021–025:

- detailed geography beyond confirmed volcanic/jungle/tar-pit character (JUND-EVID-024 promoted);
- Clan Nel Toth internal structure beyond Meren's confirmed trial (JUND-EVID-022 promoted for Dreamfire Draught effects);
- named figure biographies beyond Meren (JUND-EVID-022) and Sarkhan (JUND-EVID-023);
- devour as the whole Jund identity;
- full Conflux/post-Conflux chronology beyond "necromancy arrived at Conflux" (JUND-EVID-025 promoted);
- Kresh, Rakka Mar, Karrthus detailed biographies;
- Modern Jund midrange as canon;
- any seed-file or generated-HTML claim without approved evidence.

See [jund-manual-fill.md](jund-manual-fill.md).

---

## Distinction Guardrails

Jund must remain distinct from:

- Naya's communal/behemoth ecology;
- Grixis's death/necromancy shard identity;
- Gruul's civilization-rejection axis;
- Rakdos's performance/cruelty axis;
- Golgari's lifecycle/rot axis;
- Witherbloom life-drain or pest ecology;
- Riveteers labor/family identity;
- generic Modern Jund midrange.

---

## Stop Gate

VM-176 stops here. Do not create architecture docs, raw-faction JSON, builders, generated artifacts, schemas, runtime code, Maze files, route CSS/JS, Home preview changes, Supabase logic, generated data snapshots, placement fixtures, route maps, browser bundles, or test fixture rewrites as part of this packet.

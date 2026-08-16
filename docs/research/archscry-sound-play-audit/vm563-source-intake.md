# VM-563 Targeted Source Intake

## Feather, the Redeemed / Boros Legion

- Inspected primary source: https://magic.wizards.com/en/news/making-magic/war-games-2019-04-22#feather-the-redeemed
- The source explicitly identifies Feather as a Boros Legion member and explains the combat-oriented design that returns a resolved instant or sorcery which targeted your creature.
- Result: `SOURCE_INTAKE_RESOLVED`; card retained and copy narrowed to the verified recurrence play pattern.

## Ruric Thar, the Unbowed / Gruul Clans

- Inspected primary source: https://magic.wizards.com/en/news/feature/planeswalkers-guide-to-gatecrash-part-2#the-gruul-clans
- The now-readable guide identifies Ruric Thar as Ghor leader and the Ghor as conducting frequent savage assaults. Exact Oracle text separately verifies mandatory attacks and the six-damage noncreature-spell trigger.
- Result: `SOURCE_INTAKE_RESOLVED`; card retained.

## Atarka, World Render / Glint

- Inspected primary source: https://magic.wizards.com/en/news/magic-story/planeswalkers-guide-dragons-tarkir-part-2-2015-03-18#the-atarka-clan
- The guide establishes Atarka's endless hunger and destructive appetite. It does not establish a universal four-color philosophy.
- Result: `SOURCE_INTAKE_RESOLVED`; exact flavor retained, while the modal stays at Vox Mana synthesis altitude.

## Dune owner-acceptance correction

- Owner rendered review rejected Scour from Existence at candidate `f5ede39a7f03caf6c0644c80142c201643605b85`: its cross-identity voice still required too much explanation and the authority bridge remained insufficient.
- The replacement is Dune-Brood Nephilim, exact printing `15b4ee44-28c4-4a39-9c06-aca43787954f`. The committed Scryfall record verifies both the exact line and the combat-damage trigger that creates one Sand for each land controlled.
- Dune-Brood is already the governed card anchor in `dune_claim_0004`; `dune_claim_0005` and DUNE-EVID-009 bound the interpretation to physical momentum and territorial-swarm synthesis. The relationship does not treat the Nephilim as a faction or doctrine.
- The older VM-558 rejection of a generic Dune-Brood swarm bridge and the VM-563 owner rejection of Scour both remain in the relationship revision history.
- Result: `RELATIONSHIP_REPLACED`; evidence status `PASS_GOVERNED_DUNE_ANCHOR_AND_EXACT_CARD_EVIDENCE`.

## Witch authority exception

- No new doctrine was introduced. Amphin Cutthroat remains narrowed to Witch's already-governed patient development and calculated expansion facets.
- Result: relationship retained; unsupported missing-color psychology removed.

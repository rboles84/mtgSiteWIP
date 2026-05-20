# Lorehold Narrative Taxonomy

**School:** Lorehold  
**Color Pair:** Red/White  
**Core Axiom:** Lorehold believes the past is not behind us; it is buried power waiting to be interpreted, preserved, and revived.

**Primary Question:** Do you meet history as a rule to preserve, a ruin to explore, a witness to summon, or a relic to rebuild into action?

## Taxonomy Nodes

### Founder Axiom (`founder_axiom`)

Velomachus/Lorehold-style identity: the founder turns attack, memory, and archive into immediate present action.

- **Signals:** founder dragon, attack excavation, historic spell, revived precedent
- **Example Cards:** Velomachus Lorehold, Lorehold, the Historian
- **UI Panel Copy:** You do not study the past to escape the present. You study it because the right recovered truth can change the present immediately.

### Order vs. Chaos (`order_vs_chaos`)

White wants history preserved and classified; red wants to experience the dangerous, emotional truth of the find.

- **Signals:** deans, rules and guardrails, reckless discovery, field risk
- **Example Cards:** Augusta, Dean of Order // Plargg, Dean of Chaos, Augusta, Order Returned, Plargg, Dean of Chaos
- **UI Panel Copy:** Your reading sits between the archive and the cliff edge: preserve enough to understand it, but move close enough to feel it.

### Reconstruction Loop (`reconstruction_loop`)

Relics are not static trophies. They can be rebuilt, copied, sacrificed, and returned as tools.

- **Signals:** artifact recursion, graveyard artifacts, token copies, rebuild from ruins
- **Example Cards:** Osgir, the Reconstructor, Reconstruct History, Wake the Past, Alibou, Ancient Witness
- **UI Panel Copy:** Broken does not mean finished. Lorehold asks what the ruin can become when rebuilt with purpose.

### Spirit Witnesses (`spirit_conscripting`)

The dead are witnesses, teachers, soldiers, and memory-bearers rather than generic graveyard fuel.

- **Signals:** Spirit tokens, Spirit buffs, afterlife service, statue bodies
- **Example Cards:** Hofri Ghostforge, Spirit Summoning, Returned Pastcaller, Illustrious Historian // Archive Haunt
- **UI Panel Copy:** The past still has a voice. Sometimes it whispers from a scroll; sometimes it stands beside you in stone and light.

### Gravebreak Engine (`gravebreak_engine`)

Lorehold often cares when cards leave the graveyard, making excavation itself the trigger.

- **Signals:** cards leave graveyard, graveyard exile, Spirit creation, damage/growth from disturbed history
- **Example Cards:** Quintorius, Field Historian, Stonebinder's Familiar, Fuming Effigy, Tome Shredder
- **UI Panel Copy:** Your graveyard is not a tomb. It is a dig layer. Every removed piece reveals pressure, evidence, or a witness.

### Archival Method (`archival_method`)

Maps, scrolls, classifications, and campus sites turn chaotic discovery into reliable knowledge.

- **Signals:** maps, scrying, classification, field routes, lessons
- **Example Cards:** Archaeomancer's Map, Lorehold Campus, Study Break, Lorehold Command
- **UI Panel Copy:** The map matters because the ruins are dangerous. Method is how Lorehold keeps discovery from becoming disaster.

### Reckless Discovery (`reckless_discovery`)

Red Lorehold is boots-on-cliffs adventure: crack the seal, chase the anecdote, and accept that truth may be messy.

- **Signals:** discard/draw, risk, seal breaking, impulsive exploration
- **Example Cards:** Thrilling Discovery, Antiquities on the Loose, Laelia, the Blade Reforged, Audacious Reshapers
- **UI Panel Copy:** Some discoveries do not wait politely in a catalog. You may have to break the seal and run toward the dust cloud.

### War Memory (`war_memory`)

Lorehold combat is not generic aggression; it is battle doctrine, memorial force, and ancestral example.

- **Signals:** battle history, double strike, combat recursion, war songs
- **Example Cards:** Blade Historian, Venerable Warsinger, Spectacular Showdown, Velomachus Lorehold
- **UI Panel Copy:** You fight with more than muscle. You fight with every remembered tactic, every memorialized mistake, and every story that refused to die.

### Site Restoration (`site_restoration`)

Some history must be cleared, rescued, protected, or stabilized before it can teach.

- **Signals:** rescue, exile threats, defensive guardians, ruin cleanup
- **Example Cards:** Angel of the Ruins, Pillardrop Rescuer, Pillardrop Warden, Rip Apart
- **UI Panel Copy:** Not every ruin is ready to be opened. First secure the site; then ask what it has been trying to say.

### Relic Bodies (`relic_body`)

Lorehold often gives history a body: construct, statue, machine, sloth, angel, or artifact companion.

- **Signals:** artifact creatures, statue spirits, constructs, bronze guardians
- **Example Cards:** Bronze Guardian, Relic Sloth, Digsite Engineer, Losheel, Clockwork Scholar
- **UI Panel Copy:** History is not only written. Sometimes it walks, guards, attacks, and asks to be repaired.

## False-Positive Guardrails

- Do not classify ordinary red-white aggro as Lorehold unless it carries history, relic, spirit, graveyard, or precedent signals.
- Do not classify every artifact deck as Lorehold. Lorehold artifacts should read as relics, maps, monuments, dig tools, or recovered evidence.
- Do not classify generic reanimation as Lorehold unless it feels like excavation, witness-calling, Spirit-statue work, or reconstruction.
- Keep Lorehold distinct from Boros: less army-command justice, more archaeology, archive tension, and history made active.

## UX Mapping

- **placement_result_title:** Lorehold — The Relic Historian
- **short_read:** You do not leave the past behind. You excavate it, test it, preserve what matters, and rebuild the useful pieces into action now.
- **maze_search_seed:** ci=rw (o:artifact OR o:graveyard OR o:Spirit OR o:"exile" OR o:"return" OR o:"historic")
- **deckbuilder_tags:** ['artifacts', 'artifact recursion', 'Spirits', 'graveyard leaves', 'historic matters', 'equipment/relics', 'combat recursion', 'Boros value']

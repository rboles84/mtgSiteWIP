# Golgari Swarm Metaphysics - Rot As Infrastructure

Source boundary: this document uses the canonical metaphysics shape from `docs/reference/identity-metaphysics-markdown-schema.md`, but Golgari is an expression-level Ravnica guild rather than a mono-color source. Metaphysical thesis, Vox Mana Read, and matrix language are Vox Mana internal architecture, not MTG canon. Direct evidence is limited to the approved repo sources named in the companion identity file.

## Metaphysical Thesis

Golgari metaphysics, as Vox Mana project synthesis, is the thesis that life and death are not two worlds but one civic/ecological process. A body ends, feeds, shelters, returns, or becomes useful to another body. Waste descends into the undercity and comes back as food, fungus, insects, saprolings, zombies, counters, memory, pressure, or political power.

This thesis is not official Magic doctrine. It is a bounded translation of direct evidence: the raw Golgari profile's life/death/decay/survival/renewal cycle, the claims file's underground and food-production roles, the Undergrowth mechanic, the Commander guidance around recursion and reclamation, and black-green color-pie support for graveyard recursion and growth through death.

The shortest Vox Mana thesis is: rot is infrastructure.

## Philosophical Foundations

### Continuity Over Opposition

Direct evidence supports Golgari as a guild that refuses to divide life and death into clean moral opposites. Its raw philosophy states that death, decay, survival, and renewal are one cycle. The black-green color-pie article supports the larger life/death intersection through graveyard manipulation, recursion, resilience, and growth through death.

Vox Mana synthesis: Golgari's world is not arranged as life above and death below. The below is how the above keeps living.

### Waste Becomes System

Direct evidence ties Golgari to forgotten places, food production, rot farms, graveyard value, and reclamation. The guild does not merely occupy Ravnica's waste stream; it converts that stream into civic function.

Vox Mana synthesis: waste is not outside the city. Waste is one of the city's hidden organs.

### The Undercity As Continuity Engine

Direct evidence places Golgari underground in unwanted and forgotten places. It also names the guild's food-production role and its association with Undercity, rot farms, scavenge, and graveyard mechanics.

Vox Mana synthesis: the undercity is a continuity engine. It is where abandoned matter and abandoned people are processed by the city, but Golgari should not be reduced to Witherbloom-style life-force craft. The emphasis is civic ecology: burial, shelter, food, swarm, and return.

### Reclamation As Power

Direct evidence from placement and Commander guidance supports value from what others discard, acceptance of endings as material, graveyard resources, sacrifice, attrition, and reclamation.

Vox Mana synthesis: Golgari power rises because the surface misreads loss as disappearance. The Swarm reads loss as inventory, compost, and delayed force.

### The Shadow: Instability And Over-Acceptance

Direct evidence names Golgari political instability around succession, overthrow, and reanimation. The black-green color-pie article names lack of control and lack of finesse as weaknesses.

Vox Mana synthesis: Golgari can over-trust the cycle. Because nearly everything can be reclaimed, it can become slow to prevent harm, too comfortable with corruption, or too willing to let failure become someone else's compost.

## Vox Mana Read

This is a compression-only project read, not MTG canon and not a replacement for source evidence.

Golgari's metaphysical grammar is:

1. Death enters the system.
2. The system refuses to treat death as absence.
3. Decay converts death into available material.
4. Available material feeds life, bodies, cards, counters, food, tokens, lands, or political pressure.
5. The renewed system remains marked by what it consumed.

In Vox Mana language, Golgari is the undercity cycle where endings gain civic function. Its sacred problem is not "How do we avoid death?" but "What does the city owe to everything it buries?"

This read should preserve uncertainty where the evidence is thin. It can support operator language, placement logic, and architecture docs, but it should not be presented as an official Wizards metaphysical thesis.

## Structural & Mechanical Architecture

| Structure | Direct / Supported Evidence | Vox Mana Metaphysical Reading |
|---|---|---|
| Undergrowth | Direct raw evidence as Golgari signature mechanic | The dead count as present material. |
| Graveyard recursion and reanimation | Raw profile, Commander guidance, black-green color-pie context | Loss becomes a second access zone. |
| Dredge | Supported by Golgari research and Commander guidance | The deck feeds the graveyard to thicken future resources. |
| Scavenge | Supported by Golgari research and search keywords | A dead body becomes growth on another body. |
| Sacrifice | Commander guidance and placement signals | Ending one object funds another stage. |
| Attrition | Commander guidance, black-green resilience | The system wins because clean answers do not stay final. |
| Fungus, insects, saprolings, swarm bodies | Research and faction theming | Small decomposer bodies become distributed civic mass. |
| Rot farms and undercity places | Raw profile/claims and search keywords | Food production, burial, and city infrastructure are linked. |
| Political succession and overthrow | Raw profile | The cycle applies to leadership as well as bodies. |
| Vraska, Jarad, Svogthir, Izoni, Savra | Raw claims/research anchors | Leadership is legible as recurrence, overthrow, swarm, and buried authority. |

### Practical Deck Pattern

Golgari decks often become most legible when they convert death into a resource loop:

- Creatures die or are milled.
- The graveyard accumulates useful matter.
- Sacrifice, recursion, dredge, scavenge, or undergrowth converts that matter.
- Attrition makes the opponent's clean answers less final.
- The battlefield returns thicker, lower, and harder to fully erase.

This is not a requirement that every Golgari deck use every listed mechanic. It is the structure to look for when deciding whether a card, commander, or theme is Golgari in the Vox Mana sense.

## Ludological Matrix Mapping

**Support status:** strongly supported as Vox Mana internal architecture derived from approved evidence; not MTG canon.

This matrix is Vox Mana ludological architecture, not official MTG doctrine. It translates Golgari's source-supported gameplay patterns into reusable placement and design architecture.

| Gameplay Pattern | Source-Supported Basis | Vox Mana Matrix Read |
|---|---|---|
| Life/death continuity | `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::profile.philosophy`; `data/raw-factions/golgari_swarm/golgari_swarm.claims.json::claims`; `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md` | Life and death are read as one playable loop, not as separate moral states. |
| Graveyard as resource | `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::profile.mechanics_and_play_pattern`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::mechanics.summary`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::commander_compass.identity_basis.owned_themes`; `docs/reference/commander-faction-guidance.md::Golgari` | The discarded becomes usable material. |
| Recursion and return | `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::commander_compass.recommendation_philosophy`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::commander_compass.identity_basis.owned_themes`; `docs/reference/commander-faction-guidance.md::Golgari` | Endings become delayed continuity. |
| Sacrifice and attrition | `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::commander_compass.identity_basis.owned_themes`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::commander_compass.identity_basis.allowed_phrases`; `docs/reference/commander-faction-guidance.md::Golgari` | Cost is converted into survival pressure. |
| Dredge / scavenge / undergrowth | `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::profile.mechanics_and_play_pattern`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::search_and_filter_metadata.known_mechanics`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::search_and_filter_metadata.search_keywords`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::commander_compass.identity_basis.owned_themes`; `docs/research/golgari/golgari-structural-matrix.csv` | The past body of the game powers the next body of the game. |
| Swarm bodies / fungus / insects / saprolings | `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::faction_name`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::search_and_filter_metadata.search_keywords`; `docs/research/golgari/golgari-structural-matrix.csv` | Life persists through multiplication, compost, and distributed pressure. |
| Rot farms / undercity survival / food role | `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::profile.social_or_institutional_role`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::structure.summary`; `data/raw-factions/golgari_swarm/golgari_swarm.claims.json::claims`; `data/raw-factions/golgari_swarm/golgari_swarm.profile.json::search_and_filter_metadata.search_keywords` | Decay becomes infrastructure. |
| Reclamation and inevitability | `data/raw-factions/golgari_swarm/golgari_swarm.placement.json::ideal_fit_indicators`; `data/raw-factions/golgari_swarm/golgari_swarm.placement.json::placement_summary.calibrated_primary_read`; `data/raw-factions/golgari_swarm/golgari_swarm.placement.json::calibration_tuning.required_positive_evidence_terms`; `data/raw-factions/golgari_swarm/golgari_swarm.placement.json::calibration_tuning.strengthen_when_user_centers`; `docs/reference/commander-faction-guidance.md::Golgari` | What the game spends, mills, sacrifices, buries, or loses can return as pressure. |

### Evidence Boundary

Direct evidence in this matrix comes from raw Golgari profile/claims/placement data, raw Commander Compass fields in the Golgari profile, and `docs/reference/commander-faction-guidance.md` where it names Golgari recursion, graveyard value, sacrifice, attrition, and reclamation.

Vox Mana synthesis is limited to the matrix labels and compression language: "discarded becomes usable material," "endings become delayed continuity," "past body of the game," "distributed pressure," and "decay becomes infrastructure." Those are project architecture terms, not canon claims.

Unsupported material is omitted. This section does not claim that every black-green graveyard deck is Golgari, does not turn Golgari into generic black-green philosophy, and does not use another faction as schema authority.

### Matrix Floor

For Golgari placement, require at least one of these to be central and preferably two or more:

- Death-to-life realism.
- Decay or rot as useful truth.
- Graveyard value or recursion.
- Reclamation from waste, failure, burial, or discard.
- Undercity survival, food, rot farms, or forgotten populations.
- Swarm identity through fungus, insects, saprolings, zombies, or other decomposer bodies.

Without those signals, the safer result is usually not Golgari, even if the card or user language is black-green.

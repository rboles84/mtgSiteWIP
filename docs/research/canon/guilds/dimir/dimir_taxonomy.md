 Narrative taxonomy (matching Dimir)
House Dimir is described as secrecy/manipulation/underhanded operations; treat this taxonomy as the doc spine that turns mechanics into story logic. [mtg.fandom.com], [mtg.fandom.com]
Top-level domains

secrecy

nonexistence
compartmentalization
deniable assets


misinformation

propaganda loops
narrative substitution
record tampering


intrusion

infiltration
interception
extraction


identity

impersonation
memory editing
false provenance


curation

filtering / “signal-to-noise”
archive selection
decay vs retention



Mechanic ↔ narrative hooks (anchors you can link in the docs)

Transmute → “prepared answers”

story: the right tool appears because the plan was written earlier [mtg.fandom.com], [scryfall.com]


Cipher → “standing orders”

story: one act of access turns into repeated exploitation [scryfall.com], [scryfall.com]


Surveil → “curation of truth”

story: you decide what becomes history vs what disappears [mtg.fandom.com], [scryfall.com], [scryfall.com]



Taxonomy-to-function mapping (for your translation layer)

secrecy

ConstraintField(scope="visibility", enforce=mask/unmask)
Override(provenance="redacted")


misinformation

Override(patch={ publicNarrative: "…" })
AccretionEngine(engineId="rumor-mill", policy="retain")


intrusion

Detain(target, duration, reason="compromised")
AccretionEngine_Sample(engineId="surveil", datum=event)


identity

Override(subject, patch={ identity: "spoof" }, provenance="impersonation")


curation

AccretionEngine(policy="decay", halfLife=n) to model “memory fades”
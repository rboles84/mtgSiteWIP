# Rakdos Narrative Taxonomy

Generated: 2026-05-18  
Faction: Rakdos Cult  
Purpose: Narrative, UI, and deck-discovery taxonomy for Rakdos placement/dossier/Maze flows.

## Core Thesis

Rakdos believes the cleanest truth arrives when restraint fails in public.

Rakdos is not simply chaos. It is **performance under pressure**:
- Pain creates permission.
- Appetite reveals priority.
- The crowd changes the act.
- Costs are not hidden; they are part of the show.
- If the world is temporary, intensity becomes honesty.

## Taxonomy Table

| Taxon ID | Label | Plain-English Read | Mechanical Signals | Narrative Signals | Example Anchors | UI Use |
|---|---|---|---|---|---|---|
| `RAKDOS_SPECTACLE` | The Show Must Hurt | You act after someone has already been affected. | spectacle, damage gates, life-loss gates | applause, show, stage, public consequence | Rix Maadi Reveler, Skewer the Critics, Light Up the Stage | Maze combo/deck links, spectacle callouts |
| `RAKDOS_APPETITE` | Want Without Apology | Desire is treated as honest data. | impulse draw, life payment, aggressive choices | hunger, indulgence, appetite, immediate want | Kroxa, Theater of Horrors, Blood Crypt | identity panels, flavor text |
| `RAKDOS_UNLEASH` | Power Over Restraint | More force now is worth losing defensive options. | unleash, +1/+1 counters, cannot block | modified body, no retreat, self-limitation rejected | Exava, Rakdos Cackler, Hellhole Flailer | rules explanation, card badges |
| `RAKDOS_SACRIFICE` | Break It for Value | Things become meaningful when spent. | sacrifice, dies triggers, treasure after death | bodies as tickets, props as fuel, final bows | Lyzolda, Mayhem Devil, Mahadi | deck starts, aristocrats path |
| `RAKDOS_DISCARD` | No Plans Backstage | Hands and plans are stripped until everyone improvises. | discard, hand attack, hellbent-adjacent patterns | confession, humiliation, no privacy | Sire of Insanity, Rakdos Augermage, Rakdos's Return | disruption path |
| `RAKDOS_PUNISHMENT` | The Cover Charge | Defense, excess, or hesitation is made painful. | punisher effects, blocking punishment, goad, life drain | cover charge, tax, forced participation | Captive Audience, Carnage Gladiator, Mogis | control/punisher branch |
| `RAKDOS_CARNIVAL` | The Crowd Is a Machine | The audience is not passive; it powers the act. | attack incentives, table pressure, goad, multiplayer damage | crowd, arena, heckling, participation | Kardur, Rakdos the Showstopper | multiplayer politics |
| `RAKDOS_DEMONIC_PATRONAGE` | Favor Has Teeth | Power is granted, but the patron decides the shape of the cost. | demons, devils, risky advantage, choice pressure | patron, pact, unstable blessing | Rakdos Patron of Chaos, Rakdos Lord of Riots | lore and commander panels |
| `RAKDOS_REMOVAL` | No Encore | The cleanest answer is final. | destroy creature, destroy planeswalker, destroy artifact | execution, hard cut, dragged offstage | Bedevil, Dreadbore, Terminate | staple card module |
| `RAKDOS_MOMENTUM` | Now, Not Later | Action is more truthful before it is made safe. | haste, low curve aggression, combat pressure | lunge, riot, immediate release | Spike Jester, Rakdos Shred-Freak, Carnival Hellsteed | aggro path |
| `RAKDOS_RESOURCE_FIRE` | Spend the Room | Mana, cards, bodies, and life become fuel. | treasure, cost reduction, impulse access, sacrifice draw | bill comes due, souvenir with fuse | Rakdos Signet, Rakdos Locket, Mahadi | deck-start economy |
| `RAKDOS_LOCATION` | Rix Maadi / The Venue | Place matters: Rakdos is staged in specific dangerous rooms. | lands, gates, location cards, mana identity | dungeon, theater, guildgate, carnarium | Rix Maadi, Theater of Horrors, Rakdos Guildgate | breadcrumbs, worldbuilding |

## Taxon Relationships

```text
RAKDOS_SPECTACLE
  feeds: RAKDOS_APPETITE, RAKDOS_PUNISHMENT, RAKDOS_CARNIVAL
  UI motion: stage-lamp-pop, solo-spotlight, curtain-fire

RAKDOS_UNLEASH
  feeds: RAKDOS_MOMENTUM, RAKDOS_SACRIFICE
  UI motion: counter-spark, shred-dash, flailer-burst

RAKDOS_SACRIFICE
  feeds: RAKDOS_RESOURCE_FIRE, RAKDOS_PUNISHMENT
  UI motion: spark-chain, blood-ink-burst, locket-crack

RAKDOS_DISCARD
  feeds: RAKDOS_PUNISHMENT, RAKDOS_APPETITE
  UI motion: hand-ash-fall, handflare

RAKDOS_DEMONIC_PATRONAGE
  feeds: every high-intensity branch
  UI motion: demon-shadow-pulse, patron-flicker, stage-collapse
```

## Placement Copy Patterns

### Short Placement Line

> You do not trust purity. You trust the moment when masks fail, the room reacts, and the cost becomes impossible to ignore.

### Dossier Panel Intro

> Rakdos turns pressure into performance. It does not ask whether desire is polite. It asks what people do when the stage lights come on, the door locks, and the consequences become part of the entertainment.

### Maze Link Intro

> These searches follow Rakdos through damage gates, sacrifice engines, discard pressure, spectacle payoffs, and commanders that turn the whole table into an audience.

## Anti-Drift Checks

1. Does it include performance, audience, stage, or public consequence?
2. Does it include cost, pain, life loss, sacrifice, discard, or damage?
3. Does it preserve both colors?
   - Black: cost, appetite, survival, power, extraction.
   - Red: immediacy, release, emotion, spectacle, impulse.
4. Does it avoid generic “evil chaos” phrasing?
5. Does it explain why the card/search/action is Rakdos, not merely black-red?

## Recommended UI Branches

| Branch | Use When | Primary Taxa |
|---|---|---|
| Spectacle Burn | damage gates, spectacle cards, burn payoffs | `RAKDOS_SPECTACLE`, `RAKDOS_MOMENTUM` |
| Aristocrats Carnival | death triggers, sacrifice value, treasure after death | `RAKDOS_SACRIFICE`, `RAKDOS_RESOURCE_FIRE` |
| Hellbent / Discard Pressure | hand stripping, forced improvisation | `RAKDOS_DISCARD`, `RAKDOS_PUNISHMENT` |
| Demon Patron | demons, devils, unstable bargains | `RAKDOS_DEMONIC_PATRONAGE`, `RAKDOS_APPETITE` |
| Combat Riot | haste, goad, attacks, blockers punished | `RAKDOS_MOMENTUM`, `RAKDOS_CARNIVAL` |
| Hard Removal | practical kill spells and no-encore answers | `RAKDOS_REMOVAL`, `RAKDOS_PUNISHMENT` |

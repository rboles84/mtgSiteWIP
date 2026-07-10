# Update Packet — Strategium "Play Sequencing" Console Module

Status: Proposal / research packet only. **No live files should be changed on the basis of this
document until an owner assigns a card number and approves the build.**

Author: Claude (research pass)
Date: 2026-07-04
Target route: Strategium (`strategium/index.html` + `assets/js/strategium.js` + `assets/css/strategium.css`)

> **ID note:** `VM-473` is already taken by *Mixed-Mode Classifier And Ambiguity Blocking*
> (`docs/kanban/in-progress/`). When this is turned into a card, use the next free ID
> (VM-474 or later — confirm against `docs/kanban/board.md` first). This packet deliberately
> does **not** assign a number.

---

## 1. Purpose

Strategium currently teaches *table-decision* sequencing — reading threats, timing windows,
closing-window checks — but has no dedicated lesson on how a player should **order their own
plays** within a turn and across turns. This packet is the research and build spec for a new
console module, **"Play Sequencing,"** that fills that gap.

The module is deliberately a *table-habits* lesson (how to think, not a card list to copy), to
stay inside Vox Mana's "not a deckbuilder" boundary.

---

## 2. Implementation Prompt (build-ready)

**Task:** Add a seventh Strategium console module, `play-sequencing`, teaching within-turn and
cross-turn play sequencing, grounded in the cited sources in §5.

**Where / how:**

1. **`assets/js/strategium.js`** — add a new key `"play-sequencing"` to the `basics` object,
   placed **between `threat-reading` and `heat-management`**. Use the same HTML-string structure
   the other modules use: `.vm-console-body` > `<h3>` + intro `<p>` + a `.vm-console-stack`
   wrapping `.vm-console-grid` / `.vm-console-note` blocks, a `.vm-console-subpanel` with a
   `.vm-cognitive-list` numbered walk (mirror the Threat Reading "cognitive checklist"), a closing
   `.vm-console-note`, and a final `.vm-console-subpanel` source panel. Proposed copy is in §4.
2. **`strategium/index.html`** — add a matching tab button
   `<button class="vm-tab" data-topic="play-sequencing" role="tab" aria-selected="false">` in the
   `.vm-tabs` tablist, between the Threat Reading and Heat Management tabs. Optionally route it into
   one entry-point persona's "Start with" line (the **Returning Player** card is the best fit).
3. **`assets/css/strategium.css`** — the base rule is `a { color: inherit; text-decoration: none; }`,
   so in-module source links have no affordance. Add a small **additive** rule set (new selectors
   only, reuse existing `--gold-2` / `--accent` tokens) for a `.vm-source-list` class. Do **not**
   restyle anything else.

**Guardrails (hard):**

- Reuse existing console + `vm-cognitive-list` patterns and existing theme tokens. **No redesign,
  no new design tokens, no new dependencies, no route-architecture change.**
- Do **not** touch generated data, placement models, or Maze/Archscry/Home/Apocrypha behavior.
- Do **not** refresh visual baselines. Strategium visual compare is already on a standing waiver
  (VM-391 / VM-416); adding a module will drift console screenshots further. Document the expected
  drift; leave baselines alone.
- **Copy-boundary compliance** (`scripts/check-copy-boundaries.mjs` scans `strategium/index.html`
  and `assets/js/strategium.js`). Avoid every blocked phrase, notably: `Mana Base` (capitalized),
  `Starter Cards`, `staple cards`, `land guidance`, `deck guidance`, `Game Changers`,
  `Best counterspells`, `deep dives`, and the "leverage" phrase list. Lowercase "mana," "ramp,"
  "mana rocks," "board wipe," "counterspell examples" are all fine.
- Keep MTG/Commander facts accurate; only reference well-known, verifiable examples (Sol Ring,
  Rhystic Study, board wipes, fetchlands, commander tax). Do not invent card text or lore.

**Verification to run:** `node --check assets/js/strategium.js`, `npm run test:copy-boundaries`,
`npm run lint:js`, `npm run lint:html`, `npm run test:frontend-smoke`; confirm every `data-topic`
in `strategium/index.html` has a matching key in the `basics` object.

**Docs after build:** create the Kanban card (next free ID), update `docs/kanban/board.md`, add a
handoff in `docs/handoffs/` and index it in `HANDOFF_INDEX.md`.

---

## 3. Research Synthesis (comprehensive)

Grouped by theme. Each principle notes its supporting source(s) from §5.

### 3.1 The core premise: efficient mana usually wins
- **The player who spends the most mana most efficiently usually wins a game of Commander**;
  minor inefficiencies and awkward sequencing compound into missed opportunities. So *the order
  you cast in is often worth more than the individual cards.* [S1, S3, TCG]
- Efficiency ≠ "spend everything." Emptying your hand is only efficient when it advances the win.
  [S1, S3]

### 3.2 Casting order inside a turn
- **Think through the whole turn before you tap a land.** Take a few seconds at the start of the
  turn to plan the entire sequence. [S2/TCG, S1]
- **Cast your most expensive relevant spell each turn** when it advances the plan (a big-picture
  efficiency heuristic), but not at the cost of your gameplan enabler. [S2/TCG, S1]
- **Resolve ramp / mana rocks before the payoffs** they exist to pay for. [S1, general]
- **Cast card draw before committing land drops**, so you act on the most information (you might
  draw a land and change what you keep or play). [S2/TCG, Reid Duke fundamentals]
- **Play tapped lands on early / quiet turns**, so their downside is paid when you don't need the
  mana — but plan so a critical on-curve turn (e.g. the turn you cast your commander or a key
  sweeper) has its land enter **untapped**. [S1, S6/Reid Duke]
- **Fetchlands: crack them before you draw / before shuffle-sensitive effects**, and remember
  cracking a fetch is not a mana ability (do it before you start casting). [S7, S6]

### 3.3 Cross-turn planning
- **Plan the next few turns, not just this one**, even though the plan may change. Evaluating a
  turn in isolation leaves value on the table. [S1, S2/TCG]

### 3.4 Information management (your info up, theirs down)
- **Proper sequencing is about managing information**: you want the *most* information for your
  decisions, and you want opponents deciding with the *least*. [S2/TCG, S6]
- **Force opponents to reveal answers**; accumulate knowledge of "what they have, could have, and
  chose not to play." Good players win by observation, not by card power. [S3]
- Sequence so the table learns as little as possible about what you're holding.

### 3.5 Holding interaction (the efficiency-vs-tempo tension)
- **Cheap (1–2 mana) instant-speed answers** let you develop your own board **and** still
  threaten a response on someone else's turn — the "hold up interaction while advancing" balance.
  [S4, S8]
- **Open mana reads as interaction.** Representing an answer changes how opponents sequence their
  own turns; bluffing/baiting around open mana is a real tactic (Pact-style bait-and-counter). [S4, S8]
- **Don't fire removal / counters just because you can.** Counters and spot removal are inherently
  card-disadvantageous; spend them on plays that can run away with the game. [S1, S4, S8]
- **The tension is real:** in a fast pod you often can't afford to sit on open mana every turn —
  which is why cheap answers are prized. [S8]

### 3.6 Playing around board wipes (restraint as insurance)
- **Don't overextend.** Keep roughly **two or three** creatures deployed while still applying
  pressure; hold the rest so a wrath can't blow you out. Rebuild after the wipe. [S5a, S5b]
- **Develop non-creature threats between wipes** (planeswalkers, enchantments, equipment, card
  draw, disruption) so a sweeper doesn't reset your whole position. [S5a]
- Corollary for the sweeper's owner: **maximize the trade** — a wrath that kills eight across three
  players is backbreaking; one that kills two is a wasted card. (Useful context for reading when
  the table is holding a wipe.) [S5b]

### 3.7 Turn-order / seat awareness
- **Taking a turn before another player is the most powerful edge in Magic.** In multiplayer,
  earlier seats accumulate more resources and more chances to resolve threats unimpeded; data cited
  shows player one winning ~30–35% and player four ~20%. [S9, S9b]
- **Some cards scale with turn order / player count** (Burgeoning, Esper Sentinel, Rhystic Study,
  Thalia, Smothering Tithe): sequence them out as early as your seat allows. [S9, S9b]
- Practical read: **later seats lean more reactive**; earlier seats can push proactive development.

### 3.8 Commander-cast sequencing (format-specific)
- **Commander tax** adds {2} per prior cast from the command zone, so *when* you recommit your
  commander is a sequencing decision keyed to its mana value: cheap commanders can be recast
  repeatedly; mid-cost feel it by the 2nd–3rd cast; expensive commanders should be **protected in
  play** rather than recast. Sequence protection (e.g. haste/hexproof enablers) with the cast. [S10]
- Tax only applies from the command zone — casting/putting a commander in from hand, graveyard, or
  via bounce-to-hand effects avoids it, which changes optimal recast timing. [S10]

---

## 4. Proposed Module Copy (expanded from the version the owner approved)

> This is the copy to adapt into the `basics["play-sequencing"]` HTML string. It keeps the
> approved five-step pass and adds seat-awareness and a commander-recast note surfaced by the new
> research. Trim to taste during build.

**Heading:** Play Sequencing
**Tab sub-copy:** "order your turn so mana and information both pay off"

**Intro:**
> Sequencing is the order you take your plays inside a turn, and the order you plan them across
> several turns. In Commander the player who spends mana most efficiently usually pulls ahead, so
> the order you cast in is often worth more than which cards you hold.

**Note grid — "Order the turn on purpose":**
- Think through the whole turn before you tap a single land.
- Resolve ramp and mana rocks before the payoffs they are meant to pay for.
- Cast card draw before you commit land drops, so you act on the most information.
- Drop tapped lands on quiet early turns, but leave a key turn's land untapped when you need it.

**Note grid — "Protect your information":**
- Sequence so the table learns as little as possible about what you are holding.
- Open mana reads as interaction and can change how opponents sequence their turns.
- Plan the next few turns, not just this one, even if the plan later changes.
- Fetchlands and shuffles are cheaper before you draw, not after you have seen the top.

**Subpanel — "The one-turn sequencing pass" (numbered `vm-cognitive-list`):**
1. **What is my mana ceiling this turn?** Count lands, rocks, and rituals so you know the most you
   can actually do before you start tapping.
2. **What has to happen first?** Resolve ramp and card draw early so later plays in the same turn
   see more mana and more information.
3. **Am I casting into a wipe?** If a board wipe is likely or already known, deploy fewer threats
   (two or three is often enough pressure) and keep a follow-up in reserve.
4. **Do I want to hold up an answer?** Cheap instant-speed interaction lets you develop your own
   board and still threaten a response on someone else's turn.
5. **Does spending everything advance the plan?** Emptying your hand is only efficient when it
   moves you toward the win, not when it just uses up mana.

**Closing note — "Efficiency is not the same as speed":**
> Using all your mana is powerful, but firing off removal or dumping threats just because you can is
> how a turn gets wasted. Hold answers for the plays that can run away with the game, and spend
> freely once the closing window is actually open.

**Optional second note — "Mind your seat and your commander" (new, from research):**
> Taking a turn before an opponent is one of the strongest edges in the game, so from an early seat
> lean proactive and land your engines fast; from a late seat, more reactive lines are fine. And
> because recasting your commander from the command zone costs more each time, decide early whether
> your commander is meant to stay protected on the battlefield or to be recast — that choice changes
> how you spend the rest of your mana.

**Source subpanel — "Where this comes from":** links from §5 (S1, TCG, S3 as the primary in-product
trio; optionally add S5a and S9 if a longer list is acceptable).

---

## 5. Sources

Primary (recommended for the in-product "Where this comes from" panel):

- **[S1] EDHREC — "Solve the Equation: Mana Efficiency vs Sequencing"**
  https://edhrec.com/articles/solve-the-equation-mana-efficiency-vs-sequencing
  Supports: efficient-mana premise, casting order, tapped lands early, plan multiple turns ahead,
  hold removal for high-impact threats (Sol Ring / Rhystic Study), enable gameplan over strict
  efficiency.
- **[TCG] TCGplayer — "How Do You Sequence Correctly in MTG?" (Reid Duke)**
  https://www.tcgplayer.com/content/article/How-Do-You-Sequence-Correctly-in-MTG/70e479b5-cf36-47a9-8432-ae0c2eed915e/
  Supports: think through the whole turn, cast most expensive relevant spell, plan untapped land for
  a key turn, sequencing = information management (your info up, theirs down).
- **[S3] Card Kingdom — "The Cards You Play in Commander Don't Matter"**
  https://blog.cardkingdom.com/the-cards-you-play-in-commander-dont-matter/
  Supports: decisions/observation over card choice, "spends the most mana most efficiently usually
  wins," tempo over greedy play, force opponents to reveal answers, information wins games.

Supporting (informed copy; optional to link):

- **[S2] TCGplayer sequencing (same as TCG above)** — duplicate anchor for the "think through the
  whole turn / mana efficiency" points.
- **[S4] EDHREC — "How to Stop Losing to Counterspell in Commander"**
  https://edhrec.com/articles/how-to-stop-losing-to-counterspell-in-commander
  Supports: bluffing/baiting, holding 1-mana answers, open mana as denial.
- **[S5a] MTG Salvation — "Anti Board Wipe Tactics" (community thread)**
  https://www.mtgsalvation.com/forums/the-game/commander-edh/719579-anti-board-wipe-tactics
  Supports: don't overextend, keep 2–3 pressuring creatures, rebuild after the wipe, develop
  non-creature threats.
- **[S5b] Draftsim — "How Many Board Wipes Should You Really Play in Commander?"**
  https://draftsim.com/edh-how-many-board-wipes/
  Supports: maximize the sweep (wipe when opponents over-commit), restraint / sandbagging threats.
- **[S6] Reid Duke — "Level One" fundamentals (WotC) / Star City "Tips And Tricks For Proper Land
  Sequencing"**
  https://magic.wizards.com/en/news/feature/level-one-full-course-2015-10-05 ·
  https://articles.starcitygames.com/articles/tips-and-tricks-for-proper-land-sequencing/
  Supports: land-sequencing fundamentals, scry/information, plan untapped land for the important
  on-curve turn. (60-card fundamentals that transfer to EDH.)
- **[S7] MTG Wiki / MTG Judges "All about fetchlands"**
  https://mtg.fandom.com/wiki/Fetch_land · https://blogs.magicjudges.org/rulestips/2014/11/all-about-fetchlands/
  Supports: fetch/shuffle timing, "cracking a fetch is not a mana ability."
- **[S8] Geeky Domain — "Ultimate MTG Commander Interaction Guide: Removal & Counterspells"**
  https://geekydomain.com/blogs/guides/ultimate-guide-commander-interaction
  Supports: 1–2 mana efficiency rule for interaction, hold-up-vs-develop tension, card-disadvantage
  nature of counters/removal.
- **[S9] Commander's Herald — "Revising the Rules – Mitigating Turn Order Advantage"**
  https://commandersherald.com/revising-the-rules-mitigating-turn-order-advantage/
  Supports: turn-order edge, win-rate-by-seat data (~30–35% P1 vs ~20% P4), cards that scale with
  turn order (Burgeoning, Esper Sentinel, Rhystic Study, Thalia).
- **[S9b] Draftsim — "Commander Rules Guide: Quick Start & FAQ"**
  https://draftsim.com/mtg-edh-rules/
  Supports: multiplayer turn structure (first player still draws), seating/turn-order determination.
- **[S10] Draftsim — "How Does the Commander Tax Work in EDH?"**
  https://draftsim.com/mtg-commander-tax-edh/
  Supports: commander tax mechanics and mana-value-based recast timing; tax applies only from the
  command zone.

---

## 6. Evidence Table (principle → source → support)

| Module principle | Source(s) | What the source supports |
|---|---|---|
| Efficient mana usually wins; order > individual cards | S1, S3, TCG | "spends the most mana most efficiently usually wins" |
| Think through the whole turn before acting | TCG, S1 | plan the entire turn up front |
| Ramp/rocks before payoffs; draw before land drops | S1, S6, TCG | information + on-curve enablers |
| Tapped lands early; untapped for the key turn | S1, S6 | land sequencing fundamentals |
| Fetch before draw; fetch isn't a mana ability | S7, S6 | shuffle/timing rules |
| Plan the next few turns, not just this one | S1, TCG | multi-turn evaluation |
| Information up for you, down for them | TCG, S3, S6 | sequencing = managing information |
| Hold cheap (1–2 mana) interaction while developing | S4, S8 | hold-up-vs-tempo balance |
| Open mana reads as interaction; bluff/bait | S4, S8 | representing/ baiting answers |
| Don't fire answers just because you can | S1, S4, S8 | card-disadvantage of counters/removal |
| Don't overextend into a wipe; keep 2–3 threats | S5a, S5b | anti-board-wipe restraint |
| Turn-order/seat edge; proactive early, reactive late | S9, S9b | win-rate-by-seat, scaling cards |
| Commander recast timing by mana value | S10 | commander tax mechanics |

---

## 7. Scope boundaries / do-not-touch (for whoever builds this)

- Content module only; **no** deckbuilding advice, card recommendations, or "staple" lists.
- Reuse existing patterns/tokens; **no** CSS redesign beyond the additive `.vm-source-list` rule.
- **No** generated-data, placement-model, Maze, Archscry, Home, or Apocrypha changes.
- **No** visual baseline refresh (standing VM-391 / VM-416 waiver); document expected console drift.
- Respect `test:copy-boundaries` blocked phrases (see §2).
- Assign the next free `VM-###` — **not** VM-473 (taken by Mixed-Mode Classifier).

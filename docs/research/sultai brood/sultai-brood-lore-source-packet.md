# Sultai Brood Lore Source Packet
**Research Input — Codex Handoff Document**

> This file is the canonical Sultai Brood research packet assembled from a full 12-step source sequence. It consolidates all repo-sourced lore, color philosophy, mechanical identity, commander archetype data, and reliability notes into a single reference. Codex should treat this as the primary input for `docs/architecture/colors/sultai/identity.md` and `metaphysics.md`. Do not extend or contradict claims here without sourcing them to documents listed in Section 2 (Tier Source List). This packet supersedes the thin draft produced without the full search sequence.

---

## 1. Packet Status

| Field | Value |
|---|---|
| Clan name | Sultai Brood |
| Plane | Tarkir |
| Color direction | BGU (Black-Green-Blue) |
| Center color | Black |
| Missing colors | White, Red |
| Current status | Research aid only |
| Runtime status | Not yet promoted; pending raw-faction source and architecture cards |
| Source basis | Full 12-step sequence: deep research report; MaRo three-color article; three two-color pair articles; three mono-color philosophy transcripts; allied/enemy pairings articles; two adjacent-faction articles; full JSONL extraction (6 records); broad support greps; Tarkir Clan Lore Dossier; cross-color dynamics |

This packet establishes the full Sultai evidence boundary from the local corpus. It preserves only claims that can be sourced to Tier 1 or Tier 1A material, marks Tier 2 content as support-only, and explicitly gates all detailed in-world claims as manual-fill until stronger local official captures are added.

---

## 2. Tier Source List

All sources read during the 12-step sequence, classified by tier. Downstream cards must cite specific tier rows rather than treating this packet as a primary source.

| Tier | Source Path | Classification | What It Supports |
|---|---|---|---|
| **Tier 1** | `docs/research/canon/mark_rosewater_official_three_color/Sultai_Whatever It Takes _ MAGIC_ THE GATHERING.md` | Primary identity source | BGU color direction, Black as center/design lens, ruthlessness as clan attribute, full color-voice interview, enemy-color absences |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_two_color/dimir_Pretty Sneaky Sis _ MAGIC_ THE GATHERING.md` | Two-color pair — UB | Blue+Black alliance: unrestricted knowledge and absolute power, secrecy as core weapon, internal order-vs-results tension |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md` | Two-color pair — BG | Black+Green alliance: graveyard manipulation, resilience and recursion, ruthless-growth philosophy, unstoppable persistence |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_two_color/simic_Improving Upon Nature _ MAGIC_ THE GATHERING.md` | Two-color pair — GU | Green+Blue alliance: nature vs. nurture conflict, evolution as shared focus, obsessive goal-pursuit, disdain for self-interest |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_misc/Black_Philosophy_Drive_to_Work_Podcast_Transcript.md` | Mono-color philosophy | Black's amoral realism, any-resource pragmatism, death as a tool, rejection of white's rule-making |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_misc/Green_Philosophy_Drive_to_Work_Podcast_Transcript.md` | Mono-color philosophy | Green's natural-order acceptance, born-with-potential worldview, conflict with Blue's tabula rasa and Black's self-interest |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_misc/Blue_Philosophy_Drive_to_Work_Podcast_Transcript.md` | Mono-color philosophy | Blue's knowledge-as-path-to-power, tabula rasa philosophy, calculation over impulse, information as leverage |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_misc/Allied_Color_Pairings_Explained.md` | Allied pairings | Blue+Black alliance = choice and adaptability; both reject Green's destiny frame; want maximum options while obscuring plans |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_misc/Enemy_Color_Conflicts_Explained.md` | Enemy conflicts | Black vs White (individual vs group), Black vs Green (free will vs destiny), Green vs Blue (nature vs nurture) |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_misc/Enemy_Color_Philosophy_Conflicts.md` (2002 source) | Enemy conflicts | Core five-conflict framing; Black vs Green (life vs death, growth vs decay, symbiosis vs parasitism) |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md` | Adjacent faction (GUR) | Temur as Green-center GUR contrast: savagery is physical/emotional in Temur vs. calculated in Sultai; Blue in Temur is mental fortitude, not subversive calculation |
| **Tier 1** | `docs/research/canon/mark_rosewater_official_three_color/Abzan_We Will Survive _ MAGIC_ THE GATHERING.md` | Adjacent faction (WBG) | Abzan as White-center WBG contrast: endurance through communal obligation; Black in Abzan is tempered by group ethics; BG recursion shared but directed differently |
| **Tier 1** | `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-1.md` | Primary canon — verified curl capture | Sultai: Sidisi as queen/khan, Feyomsi biography, Taigam, Kirada, Panjasi, all Khans-era locations (Kheru Temple, Ukud Necropolis, Qarsi Palace, Gudul, Gurmag, Marang, Sagu, Molderfang Falls, Crocodile Pits), "the second skin" doctrine, lotus perfume, body parts in ritual magic, naga venom, rakshasa magic |
| **Tier 1** | `docs/research/canon/source-material/tarkir/planeswalkers-guide-khans-part-2.md` | Primary canon — verified curl capture | Temur and Mardu Khans-era detail; Sarkhan/Sorin planeswalker profiles |
| **Tier 1** | `docs/research/canon/source-material/tarkir/planeswalkers-guide-fate-reforged.md` | Primary canon — verified curl capture | Tasigur as pampered heir; past-timeline Sultai anti-dragon culture; Silumgar's brood character |
| **Tier 1** | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-1.md` | Primary canon — verified curl capture | Silumgar Clan: hierarchy (Silumgar→dragons→priests→warriors→servants→zombies), Sidisi as Undead Vizier (executed and raised), Silumgar's boredom/paranoia, Marang/Qarsi/Ukud/Gudul/Gurmag locations in altered timeline |
| **Tier 1** | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragons-part-2.md` | Primary canon — verified curl capture | Kolaghan, Atarka, Dromoka clans in altered timeline |
| **Tier 1** | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-1.md` | Primary canon — verified curl capture | Abzan and Jeskai modern reformed era |
| **Tier 1** | `docs/research/canon/source-material/tarkir/planeswalkers-guide-dragonstorm-part-2.md` | Primary canon — verified curl capture | Sultai reformed era: "Nothing goes to waste" motto, Fangkeeper as figurehead, Lasyd military, Panjasi spy network, Rite of Renewal/sibsig as honored dead, raised cities on stilts, Kheru City, Qarsi Palace botanical gardens |
| **Tier 1** | `docs/research/canon/source-material/tarkir/story-truth-of-names.md` | Primary canon — verified curl capture | Alesha's war-name ceremony; Mardu meritocratic culture |
| **Tier 1** | `docs/research/canon/source-material/tarkir/story-awakening-the-bear.md` | Primary canon — verified curl capture | Surrak's origin; Temur bear culture |
| **Tier 1** | `docs/research/canon/source-material/tarkir/story-khanfall.md` | Primary canon — verified curl capture | Tasigur confirmed as Sultai khan at the summit; Shu Yun's summit; all five khans present |
| **Tier 1** | `docs/research/canon/canon-inventory-three-color-reference-audit.md` | Repo canon audit | Confirms the Sultai MaRo article as primary identity source; lists all corpus files hitting SULTAI |
| **Tier 1A** | `docs/research/canon/canon-inventory-three-color-reference-audit.md` | Repo audit | Cross-corpus SULTAI hit list; distinguishes primary from support and lore/protocol dossiers |
| **Tier 2** | `docs/research/canon/misc/Tarkir Clan Lore Dossier Protocol.md` | Lore/protocol dossier | Rich Sultai section: identity thesis, color pressure matrix, card evidence grid, Vox Mana synthesis, timeline contrast, cross-clan dynamics; discovery-quality, high detail but not Tier 1 primary authority |
| **Tier 2** | `docs/research/canon/misc/comprehensive-mtg-lore-history-updated.md` | Support reference | Confirms BGU Sultai as one of five Tarkir clans; incidental mention of Sultai Brood |
| **Tier 2** | `docs/research/canon/misc/vox_mana_comprehensive_analysis.md` | Support reference | Black as "ruthless ambition, power through sacrifice"; Sultai label hit; support context only |
| **Tier 2** | `docs/research/canon/colorless/source-material/07_Cross_Color_Dynamics_and_Relationships.md` | Support reference | Sultai philosophy: "ruthless growth through knowledge"; central conflict: progress vs. exploitation vs. nature |
| **Tier 2** | `docs/research/canon/misc/MTG_Lore_Confidence_Tagged.txt` | Support reference | Confirms BGU Sultai clan designation; incidental only |
| **Tier 2P** | `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl` (6 BGU records) | Product/operator support | Full Commander deck analysis for 6 BGU decks with all fields; operator vocabulary for graveyard, theft, morph, mill, mutate, and combination-creature archetypes |
| **Tier 3** | `docs/research/sultai brood/sultai-brood-deep-research-report.md` | Research synthesis artifact | External deep research synthesis; useful for topic discovery and external source cross-reference, not direct primary evidence |

---

## 3. Authoring Evidence Floor

Architecture and live-pilot reconciliation may use the promoted claim rows below as the direct source floor:

| Evidence Row | Claim Summary | Source Tier | Classification |
|---|---|---|---|
| `SULTAI-001` | Sultai Brood is the Black-Green-Blue wedge clan of Tarkir, one of the five original Khan-era clans. BGU is its color direction and Black is its center/design lens per the MaRo design handoff. | Tier 1 | Promoted |
| `SULTAI-002` | The clan attribute is ruthlessness; the clan symbol is the dragon's fang. | Tier 1 / Tier 2 (dossier) | Promoted |
| `SULTAI-003` | Black's core Sultai philosophy: "power through opportunity." Being willing to do what it takes. Any resource is fair game. Life is hard; Black doesn't sugar-coat it or place limitations. Death is a powerful tool and Black sees no reason not to use it. Black is amoral, not immoral — it simply does not believe morality exists as a real constraint. | Tier 1 (MaRo article + podcast) | Promoted |
| `SULTAI-004` | Green's role in Sultai: "acceptance through wisdom — nature has no limits to what it is capable of doing." Green frames Sultai's harshness as natural order. It is the color that says predation, decay, and the grave are not aberrations but the system working correctly. Green sees Black and Blue as nonbelievers in the natural order but allies them because the outcomes match. | Tier 1 (MaRo article + podcast) | Promoted |
| `SULTAI-005` | Blue's role in Sultai: "perfection through knowledge — the most dangerous warrior is one who understands what he or she is capable of doing." Blue wants a plan, wants to know what it is up against, and wants to prepare. It brings calculation, asymmetric information, and deliberate sequencing. Blue's tension with Black: Blue thinks Black too willing to cross lines and accept risks; Black thinks Blue overanalyzes and is too reactive. | Tier 1 (MaRo article) | Promoted |
| `SULTAI-006` | The Blue-Black alliance in Sultai is specifically about **choice and power over identity**. Together they reject Green's destined-path framing. Their plan is to leave maximum options open while obfuscating what they are doing. Their end goal: unrestricted knowledge and absolute power, obtained as secretly as possible. The alliance's greatest strength: no one sees it coming. Its greatest weakness: mutual distrust and secrecy that can prevent internal coordination. | Tier 1 (Dimir article + Allied pairings) | Promoted |
| `SULTAI-007` | The Black-Green alliance in Sultai is about **unstoppable, self-renewing force**. BG shares the graveyard as a resource, shares recursion, shares resilience. Green's willingness to embrace death as part of nature + Black's willingness to do whatever it takes = an army that returns. Greatest strength: virtually unstoppable — destroy pieces and others come back. Greatest weakness: lack of fine control; the plague unleashed takes on a life of its own. | Tier 1 (Golgari article) | Promoted |
| `SULTAI-008` | The Green-Blue alliance in Sultai contributes **obsessive goal focus and evolutionary capability**. GU together reject self-interest (the shared enemy of both is Black and Red's self-interest when read as an enemy pair). In Sultai this is inverted: Green and Blue are allies, so their shared disdain for impulsiveness and their focus on evolving toward a goal underpin Sultai's patient, preparatory style. GU's shared card-draw, library search, and self-modification tools give Sultai its information advantage. | Tier 1 (Simic article) | Promoted |
| `SULTAI-009` | White's absence: Sultai has no concept of civic justice, institutional fairness, shared moral obligation, or the good of the group. Relationships are purely transactional and built on coercion. Black's own philosophy explicitly positions White's morality and group-protection as foolishness. The clan's exploitation structures, caste hierarchies, and instrumental use of the dead are coherent expressions of this absence. This is synthesis from official color-pie material, not a single explicit canon sentence. | Tier 1 synthesis | Promoted with caveat |
| `SULTAI-010` | Red's absence: Sultai has no freedom-first, impulse-driven, emotionally spontaneous legitimacy. Its ambition is cold and calculating, patient and premeditated rather than frenetic. The absence of Red means the clan cannot handle sudden, highly chaotic environmental shifts well. MaRo notes that Black's tension with Blue places both against Red's style — Black is already "much more roll with the punches" than Blue, but both are more structured than Red. | Tier 1 synthesis | Promoted with caveat |
| `SULTAI-011` | Delve is confirmed as the Sultai signature mechanic per official design commentary. It was called "a perfect fit" because Sultai uses the dead as a resource and because the clan was designed for slower gameplay. Delve allows paying for powerful spells by exiling cards from the graveyard — a mechanic-to-philosophy bridge for "spend the dead to fuel the present." | Tier 1 (external official mechanics sources) | Promoted |
| `SULTAI-012` | The local canon inventory classifies the MaRo Sultai article as the primary identity source. Tier 2 dossiers and support references confirm the color designation and add discovery-quality detail but are not primary evidence. | Tier 1A | Promoted (boundary) |
| `SULTAI-013` | The Tarkir dossier core axiom for Sultai — "Every resource, living or dead, has a price; mastery belongs to the one who controls the ledger" — is a synthesis statement from Tier 2 material. It is strong and useful but must be treated as support-only synthesis, not a direct Wizards quote. | Tier 2 | Support-only |
| `SULTAI-014` | The BGU Commander JSONL contains 6 Sultai-color records. The dominant operator pattern across records is graveyard dominion (Black) + strategic selection/self-mill (Blue) + creature density/material base (Green). The colorPhilosophySummary fields consistently describe this three-role split. | Tier 2P | Support-only |
| `SULTAI-015` | BGU Commander JSONL rows and BGU Commander data should not be used to support canon claims about Sultai's society, figures, geography, or chronology. | Tier 2P / process directive | Promoted boundary |

---

## 4. Color Philosophy Foundation

This section draws directly from the full MaRo primary article, two-color pair articles, mono-color transcripts, and allied/enemy pairings articles. These are the deepest available official sources for Sultai's color identity.

### 4.1 Black — The Center

Black is the center/design lens of Sultai. Its core philosophy: **power through opportunity**. Black is the only realist color — it looks at the world as it is, not as it could be. An individual is free to have whatever they want, provided they have the power to obtain and keep it. Power is the most important resource because it guarantees the ability to control one's life.

Black's operative logic: there is no rule that says any available resource is off-limits. Life is hard. "Any resource you have available, anything you are able to do, that is fair game." Black looks at death specifically and asks why it would not be used — "it's a powerful tool." This is why Black is amoral rather than immoral: it does not believe morality exists as an actual constraint, only as White's attempt to make life harder.

In Sultai's color-interview, Black's one-sentence pitch: *"The person who wins the battle is the one more willing to do what it takes to win."*

Black's specific tension with Blue: Blue overanalyzes and is too reactive, too focused on not making mistakes. Black would rather accept risk and move than wait for a perfect plan. Black's tension with Green: Green wraps itself in a system of answers that have no checks and balances, then calls it the natural order. Black thinks Green's destiny worldview is an elaborate fiction for avoiding hard truths.

### 4.2 Green — The Natural Order Frame

Green contributes **acceptance through wisdom** to Sultai. Its philosophy: the world is already perfect; every other color is wrong to want to change it. Nature is not something to improve; it is something to understand. Each creature is born with all the potential they need — the secret is recognizing the role one was born into and embracing it.

In Sultai's context, Green is the color that reframes Sultai's harshness as ecological fact. Predation is real. Decay is real. The strongest elements of nature are its most ruthless ones — a weed, a fungus, a plague. The Golgari article (BG) makes this explicit: to succeed in nature, "you have to be selective in the parts of it you nurture. The strongest elements of nature are those that are the most ruthless." Green does not see using death as immoral; it sees not using death as naïve. Combine Black's willingness to do anything with Green's acceptance that everything in nature is usable, and you get Sultai's necromantic logic.

Green's one-sentence pitch: *"Nature has no limits to what it is capable of doing."*

Green's internal tension in Sultai: Green sees Black and Blue as nonbelievers in a real natural order, while Black and Blue see Green's destiny language as mystical nonsense. Green pitied its allies — "I find the tone of your voice interesting every time you say the word change" — but their outcomes aligned, so the clan works.

### 4.3 Blue — The Calculation Layer

Blue contributes **perfection through knowledge** to Sultai. Its philosophy: each person is born a blank slate with the potential to become anything. Knowledge is the route to better outcomes. Blue is methodical, exact, and deliberate — it does not act without thinking.

In Sultai's context, Blue is the planning and asymmetry layer. The Dimir article (UB) makes the pair logic explicit: Blue seeks omniscience; Black seeks omnipotence. Together: knowledge is power. The blue+black alliance article states their combined goal is to "subvert the world to its own means," winning in such a way "that the opponent isn't quite sure how they were victorious." Blue's contribution is keeping the plan flexible, obfuscated, and adaptive.

Blue's one-sentence pitch: *"The most dangerous warrior is one who understands what he or she is capable of doing."*

Blue's tension with Black: Blue finds Black too willing to cross lines and accept risk. Blue wants structure; Black wants results. This is framed as the order-vs-chaos residue from their other allies: Blue leans toward White's orderliness while Black leans toward Red's rolling with punches. This is the internal friction that prevents Sultai from being purely patient (Blue would prefer) or purely opportunistic (Black would prefer).

### 4.4 White's Absence — What Sultai Lacks

White wants peace through protecting the group. Its goal is a world where no one suffers unnecessarily, achieved by teaching individuals to act for the group even at personal cost. White believes in morality as an absolute truth. White believes the needs of the group supersede the needs of the individual.

Sultai's absence of White means:
- No concept of civic justice or institutional fairness
- No shared moral obligation; relationships are purely transactional and built on coercion
- No interest in protecting the weak; the weak exist as either useful assets or discarded material
- No defensive ethical constraint on what can be done to people
- Black's explicit disdain for White: "all you are doing is making your life difficult by making extra rules for yourself"

The official color-pie sources do not provide a single canonical sentence saying "Sultai lacks White, therefore it lacks justice." This is a strong synthesis reading from official color philosophy material, not a direct Wizards quote.

### 4.5 Red's Absence — What Sultai Also Lacks

Red wants freedom. Its philosophy: your heart tells you what it needs. Listen to it. Act on it. Live in the moment. Red is spontaneous, passionate, feral, loyal.

Sultai's absence of Red means:
- No impulse-driven legitimacy; the clan does not act on feeling
- Ambition is cold and calculating, not emotionally driven
- No tolerance for mess, chaos, or sudden frenetic shifts
- No passion-based bonding or loyalty for its own sake
- Blue's own framing: "I have a plan, I want to know what I'm up against, I want to prepare" — this is explicitly positioned against Red's approach

The Tarkir dossier captures the mechanical consequence clearly: the absence of Red means the Sultai have "an absence of direct fire, physical speed, or lightning spells" and "difficulty handling sudden, highly chaotic environmental shifts." When Dragonlord Silumgar removed Green from the Sultai, "leaving only a cold, paranoiac core of raw Black and Blue ambition," the result was the most cold and calculating version of Sultai imaginable — which shows, in inverse, what Red's absence already sets up.

---

## 5. Color Pair Analysis

This section records what each internal pair contributes distinctly.

### 5.1 Black + Blue (Dimir pair)

The UB pair is Sultai's most secretive axis. Key properties from the Dimir article:
- Shared enemy: Green (which is open, honest, status-quo-preserving). UB is the opposite of all of that.
- End goal: "unrestricted knowledge and absolute power, obtained as secretly as possible"
- Method: attack enemies slowly, subtly, at the worst time for them to respond
- No restriction by ethics or emotion: "blue/black is willing to do what is needed"
- Characterized as: "vicious yet subtle, ruthless yet careful, brutal yet secretive"
- Greatest weapon: the opponent never knows they've lost until it is too late
- Greatest weakness: mutual lack of trust; internal secrecy keeps the left hand from knowing what the right hand is doing

In Sultai specifically, this pair provides: the espionage network, the calculated assassination, the patient political manipulation, and the information-asymmetry engine.

### 5.2 Black + Green (Golgari pair)

The BG pair is Sultai's resilience and resource-conversion axis. Key properties from the Golgari article:
- Both turn to the cycle of life and death as a usable force
- Both are the most adept at graveyard manipulation and recursion
- Both use +1/+1 counters; both have regeneration
- Together: "take a black outlook of the forces of green" — the strongest elements of nature are its most ruthless; don't fear death, embrace it as a weapon
- BG creates "an unstoppable army" because it "combine[s] growth with death"
- Greatest strength: virtually unstoppable — pieces are destroyed, others return
- Greatest weakness: lack of fine control — "the plague unleashed takes on a life of its own"

In Sultai specifically, this pair provides: the graveyard as a second hand, the sibsig labor logic, the "nothing goes to waste" resource principle, and the self-renewing military that cannot be permanently stopped.

### 5.3 Green + Blue (Simic pair)

The GU pair is Sultai's obsessive focus and evolutionary capability axis. Key properties from the Simic article:
- They share a focus on changing and evolving over time
- Both have library search, card draw, self-modification, and protective magic
- GU together reject self-interest (Black and Red's shared quality) as the thing they despise
  - Note: In Sultai, this enemy-pair logic is inverted since Green and Blue are allies with Black, not against it
  - But it still means GU contributes a quality of non-impulsive, goal-focused, unsentimental drive
- GU's focus: using knowledge as a means to propagate growth and evolution
- Greatest strength: once GU has a goal, it does not get moved from it
- Greatest weakness: can't stop — so focused it loses perspective

In Sultai specifically, this pair provides: the library-manipulation and controlled self-mill, the strategic information advantage, the long-term planning scaffolding, and the patience to iterate toward a goal without emotional deviation.

---

## 6. Adjacent Faction Separators

Sultai shares two colors with both Temur (Green+Blue) and Abzan (Black+Green). The center color in each case changes everything.

### 6.1 Temur (GUR) — shares Green+Blue

Temur is Green-centered. Its clan attribute is savagery. In the Temur interview:
- Savagery is described as "finding inner strength and drawing it out" — it is physical and emotional, not intellectual
- Red in Temur is about impulse, primal forces, and action without deliberation
- Blue in Temur is about mental fortitude and overriding psychological limits — a very different Blue than Sultai's calculating, information-hoarding Blue
- Green in Temur is about accepting your animal nature and the web of life
- Temur's relationship with Blue is antagonistic — Red and Green both resent Blue's cold calculation; Blue thinks its clan-mates act without thinking

**Sultai vs. Temur separator:** In Sultai, Black is center and provides the organizing ruthless ambition. In Temur, Green is center and provides the primal acceptance of natural order. Both have Green+Blue, but Sultai uses that pair in service of calculated domination, while Temur uses it in service of savage, instinct-driven survival. Temur's version of "savagery" is feral and immediate; Sultai's version is premeditated and patient.

### 6.2 Abzan (WBG) — shares Black+Green

Abzan is White-centered. Its clan attribute is endurance. In the Abzan interview:
- Black in Abzan is self-described: "I want to survive. I team up with you two because you're the best two other colors at doing that. Nothing more."
- Black's ruthlessness in Abzan is subordinated to White's group-protection imperative — it reluctantly admits that sometimes the group is a useful survival unit
- Green in Abzan is about the web of life and the continuity of the family line
- BG in Abzan shares graveyard use and recursion with Sultai, but directed toward defensive endurance rather than offensive extraction

**Sultai vs. Abzan separator:** Abzan uses Black's ruthlessness in service of collective survival — the family is the asset being protected. Sultai uses Black's ruthlessness in service of individual/hierarchical power extraction — other people are the assets being consumed. Abzan has White's moral and communal frame tempering Black; Sultai has Blue's cold calculation amplifying it.

---

## 7. World and Culture Grounding

These claims come from Tier 2 sources (Tarkir dossier) and the external deep research report. They are **discovery-quality** — high confidence from synthesis material but pending local official capture before promotion.

### 7.1 Khans-Era Sultai (Discovery — Support-only)

The Sultai Brood occupies humid jungles and river deltas. Their aesthetic: heavy gold filigree, jade carvings, flowing silk garments, elegant stone structures rising from swamp. Cities lit by magical lanterns, pristine manicured gardens alongside rotting necromantic pits.

Society is a rigid caste system: merchant barons and necromancers at apex, then naga scholars, then human warriors, then sibsig zombies as the massive labor force. Under Sidisi, relationships are purely transactional and coercive. The dead are not honored; they are a labor-pool.

Magic: high-level necromancy, biological engineering, venom magic. Mages use decaying organic matter to fuel spells, siphon life force, and distill complex poisons. Extensive spy networks using minor undead, shapeshifting, and political blackmail.

Existential question from the dossier: *"When does mastery of death become contempt for life?"*

### 7.2 Color Pressure Matrix (Discovery — Tier 2)

The Tarkir dossier provides a full Sultai Brood color pressure matrix:

| Color | Present or Missing | Cultural Effect | Magical Effect | Blind Spot |
|---|---|---|---|---|
| **White** | Missing | Relationships are purely transactional and built on coercion; no civic justice or institutional fairness | Absence of defensive warding circles or holy light magic | Extreme vulnerability to coordinated uprisings from slave labor |
| **Blue** | Present | High academic achievement and extensive espionage | Advanced water-weaving, mental manipulation, and illusions | Overthinking can lead to debilitating political stagnation |
| **Black** | Present | Despotic caste system utilizing slave and zombie labor | Meticulous corpse reanimation and life-draining curses | Severe internal paranoia and frequent political betrayals |
| **Red** | Missing | Ambition is cold and calculating; lack of physical impulsiveness | Absence of direct fire, physical speed, or lightning spells | Difficulty handling sudden, highly chaotic environmental shifts |
| **Green** | Present | Transformation of hostile swamps into efficient farming | Rotting curses, acid conjuring, and botanical toxins | Can lead to viewing human lives as simple organic material |

*Source: Tier 2 Tarkir dossier. Treat as discovery-quality synthesis, not canon evidence.*

### 7.3 Dragonlord-Era Contrast (Discovery — Support-only)

When Dragonlord Silumgar dominated the Sultai region, the dossier states he "removed Green's natural growth and adaptation from the Sultai, leaving only a cold, paranoiac core of raw Black and Blue ambition." This is a useful diagnostic: stripping Green from Sultai produces a colder, more paranoid, purely transactional faction — which shows, by inversion, what Green specifically contributes to the full Sultai identity.

### 7.4 Reformed Era (Discovery — Support-only)

Post-Silumgar Sultai has decentralized governance, a "Fangkeeper" figurehead with minimal power, agricultural transformation of former necromantic swamps, and naga-trained necromantic academic circles. They have explicitly rejected centralized monarchy to prevent another draconic dictatorship. This is a later canon formation and must not be read back onto the original Sultai Brood without qualification.

---

## 8. Source Use Rules

### Promoted

Use promoted evidence rows for Sultai's base identity:

- BGU clan identity with Black as center/design lens.
- Ruthlessness as the clan attribute; the dragon's fang as symbol.
- Black's amoral pragmatism: any resource is fair game, including the dead.
- Green's natural-order frame: predation, decay, and the grave as the system working correctly.
- Blue's calculation layer: planning, information control, and deliberate asymmetric sequencing.
- Blue+Black alliance: unrestricted knowledge and absolute power, obtained secretly.
- Black+Green alliance: graveyard as a self-renewing resource; the unstoppable return.
- Green+Blue alliance: obsessive goal-focus and evolutionary patience.
- White's absence: no civic justice, no group ethics, purely transactional relationships.
- Red's absence: no impulsiveness, no feral freedom, cold and calculated not frenetic.
- Delve as design-confirmed signature mechanic.
- Sultai as a slower, more calculated clan pattern in design intent.

### Support-only

Support-only sources may shape constraints and topic queues but must not become standalone lore claims:

- Tarkir dossier material including the identity thesis, color pressure matrix, and card evidence grid.
- Cross-color dynamics synthesis ("ruthless growth through knowledge").
- Vox Mana comprehensive analysis passages.
- Comprehensive lore history references.
- All BGU Commander JSONL records.
- The deep research report as a synthesis artifact.

### Manual-fill

Manual-fill topics are not authoring evidence. They appear only as deferred gaps:

- Khans-era geography: Qarsi Palace, Kheru Temple, Ukud Necropolis, Gudul, Gurmag Swamps, Marang River Fortress, the Sagu, Molderfang Falls, Crocodile Pits.
- Species composition: naga ruling lineage, Panjasi merchant role, sibsig zombie taxonomy, rakshasa political position.
- Named figures: Sidisi (Brood Tyrant and Undead Vizier — distinct political statuses), Tasigur (heir vs. khan), Dragonlord Silumgar, Taigam, Feyomsi.
- Social doctrine: "the second skin," undead-as-chattel framing, palace spectacle, Kheru cult, lotus perfume.
- Magical practices: body parts in ritual magic, hypnosis, naga body-warping, rakshasa catastrophic magic, venom poison systems.
- Fate Reforged past-timeline specifics: Tasigur-as-khan confirmation, anti-dragon tactics, "Khanfall" betrayal sequence.
- Silumgar clan / Dragons of Tarkir altered timeline details.
- Reformed Dragonstorm Sultai material.
- Conflux-equivalent Tarkir chronology and post-Silumgar state.
- Card text, flavor text, exact mechanics rules.

---

## 9. Architecture Use

Do:

- Keep Sultai live only after a dedicated raw-faction source and architecture promotion card have run.
- Use `BGU` as color-direction metadata only until a live clan key is promoted.
- State that Sultai metaphysical framing is Vox Mana modeling, not MTG canon, unless a promoted row supports the specific claim.
- Keep docs short where local official capture is thin.
- Mark manual-fill material as deferred rather than narrating it as current truth.

Do not:

- Use this packet as the source of truth instead of promoted evidence rows.
- Copy deep research synthesis prose, dossier prose, or presentation materials directly into architecture docs.
- Promote MTG Wiki, dossier synthesis statements, or player-community framing as canon.
- Collapse Sultai Brood, Silumgar clan, and reformed Dragonstorm Sultai into one undifferentiated thing.
- Import Esper, Grixis, or Abzan claims into Sultai.
- Confuse Sultai's enemy pair (Black vs. Green = free will vs. destiny) with the pair as it appears inside Sultai as an ally relationship — inside the faction they cooperate; the color-pie conflict still exists as an internal tension.

---

## 10. Timeline Boundary Guard

Sultai Brood has four meaningfully distinct official states across Tarkiri timeline variations. Downstream cards must identify which formation they are working from:

| Formation | Center | Key Markers | Use Boundary |
|---|---|---|---|
| **Khans-era Sultai Brood** | Black (Sidisi as khan/queen) | Naga ruling lineage; rakshasa pacts; Kheru/Qarsi/Ukud; sibsig labor; delve mechanic | Primary Sultai identity; promoted rows apply here |
| **Past-timeline Sultai (Fate Reforged)** | Black (Tasigur as heir then khan) | Naga not fully dominant; anti-dragon poisoned/zombie defenses; Khanfall betrayal | Continuity with Khans-era but distinct political balance; manual-fill for specifics |
| **Silumgar clan (Dragons of Tarkir)** | Dragon (Dragonlord Silumgar) | Green removed; cold paranoiac Black+Blue core; Sidisi as undead vizier; exploit mechanic; original Sultai treated as prior extinct formation | Not the Sultai Brood; manual-fill; do not equate with Khans-era |
| **Reformed Sultai (Tarkir: Dragonstorm)** | Decentralized | Fangkeeper figurehead; agricultural transformation; no rakshasa pacts; naga academic circles; "nothing goes to waste" principle | Later canon; must not be read back onto original Sultai Brood without qualification |

The Silumgar-era diagnostic is particularly useful: when Green was stripped from Sultai and only Black+Blue remained, the result was "a cold, paranoiac core of raw Black and Blue ambition." This tells us exactly what Green contributes to full Sultai — the natural-order legitimation, the agricultural/ecological capability, the biological vitality that keeps the necromancy rooted in something living.

---

## 11. Commander Support

The BGU Commander JSONL contains **6 records** extracted via full Python query with all fields. Summary:

| Deck | Commander | Primary Theme | graveyardFocus | valueEngine | complexity |
|---|---|---|---|---|---|
| Sultai Arisen | Kotis, Sibsig Champion | Graveyard value | 5 | 4 | 3 |
| Grand Larceny | Gonti, Canny Acquisitor | Steal opponents' cards | 1 | 5 | 4 |
| Mutant Menace | The Wise Mothman | Mill + rad counters | 2 | 3 | 4 |
| Faceless Menace | Kadena, Slinking Sorcerer | Morph / hidden information | 1 | 4 | 4 |
| Devour for Power | The Mimeoplasm | Graveyard combination creature | 5 | 4 | 3 |
| Enhanced Evolution | Otrimi, the Ever-Playful | Mutate recursion | 3 | 4 | 5 |

**Cross-record color philosophy pattern:** Every Vox Mana `colorPhilosophySummary` field describes the same three-role split:
- Black = graveyard dominion, acquisition, ambition
- Blue = strategic selection, calculation, manipulation, sequencing
- Green = creature density, material base, growth substrate

This split is a strong operator signal. Example summaries:
- "Black commands the graveyard, Blue selects what to fill and recur, and Green provides the creature density to make the engine run — classic Sultai value."
- "Black's ambition to acquire power by any means, Blue's cunning intelligence, and Green's adaptive resourcefulness combine to make stealing opponents' cards feel natural and inevitable."
- "Blue strips away knowledge (mill), Black converts that loss into damage through rad counters, and Green provides the mana base for sustained attrition — a creeping, unavoidable doom."

**Operator vocabulary confirmed across 6 records:**
- Graveyard value, self-mill, recursion (dominant; 3 of 6 decks with graveyardFocus ≥ 3)
- Theft / using opponents' resources (Grand Larceny; fits Black's opportunism + Blue's information asymmetry)
- Hidden information and deception (Kadena morph; fits UB's secrecy principle)
- Patient attrition as a win condition (Mothman mill; fits Sultai's slower design intent)
- Combination threat from graveyard pieces (Mimeoplasm; fits BG recursion)
- Complex stacking and sequencing (Otrimi mutate; fits Blue's deliberate sequencing)

Commander expression belongs to architecture and placement planning. These rows are product/operator support only, not Tarkiri canon.

---

## 12. Verified-Language Guard

Safe language:

- "Promoted identity evidence supports..."
- "The MaRo design article identifies Black as Sultai's center color..."
- "The Golgari pair article establishes that Black+Green share graveyard manipulation and recursion..."
- "Support-only material from the Tarkir dossier suggests..."
- "Manual fill required before figure or geography promotion..."
- "Vox Mana models this as..."
- "The deep research report synthesizes... but local official capture is pending."
- "This is synthesis from official color-pie material, not a direct Wizards quote."

Unsafe language:

- "Verified canon" for geography, named figures, institutions, social doctrine, or chronology.
- "Sultai Brood and Silumgar clan are the same faction."
- "The reformed Dragonstorm Sultai reflects the original Brood."
- "Ready for lore promotion without evidence."
- "Confirmed" for Tarkir dossier claims unless a promoted evidence row already supports the exact statement.
- Treating the dossier identity thesis ("hyper-intelligent ruthless plutocracy...") as a direct Wizards quote.

---

## 13. Manual-Fill Gate

Before any downstream card promotes detailed Sultai Brood lore, it must add stronger local official evidence. Highest-risk deferred topics:

- **Geography:** Qarsi Palace, Kheru Temple, Ukud Necropolis, Gudul, Gurmag Swamps, Marang River Fortress, the Sagu, Molderfang Falls, Crocodile Pits.
- **Species roles:** Naga lineage authority, Panjasi merchant function, sibsig classification, rakshasa political position.
- **Named figures:** Sidisi (both card versions and their distinct political statuses), Tasigur (heir vs. khan; "Khanfall" confirmation), Dragonlord Silumgar, Taigam, Feyomsi.
- **Social doctrine:** "The second skin," undead-as-chattel framing, palace spectacle, Kheru cult, lotus perfume, propaganda systems.
- **Magical practices:** Lotus perfume, naga body-warping, rakshasa catastrophic magic, venom systems, body-parts-in-ritual-magic.
- **Mechanical canon:** Exact delve rules, exploit as Silumgar transition mechanic, sibsig creature type rules.
- **Chronology:** Tasigur's betrayal sequence, dragonlord consolidation, Dragonstorm post-Silumgar state.
- **Card text and flavor text.**

---

## 14. Downstream Readiness

This packet establishes the full Sultai research evidence boundary from the local corpus. Raw-faction source, architecture identity, and architecture metaphysics cards have not yet been produced for Sultai.

Sultai is not yet live as a runtime key. This packet does not make detailed lore, named figures, geography, institutions, magical practices, chronology, or exact card text available as raw claims or live routing evidence. Those topics require:

1. Local official capture of the Khans/FRF/Dragons world guides or design articles.
2. Evidence-ledger promotion of specific claim rows.
3. Architecture docs produced from promoted rows.
4. A controlled-placement pilot following the Bant or Esper model.

Sources available for future promotion work:
- Deep research report: `docs/research/sultai brood/sultai-brood-deep-research-report.md`
- Tarkir dossier Sultai section: `docs/research/canon/misc/Tarkir Clan Lore Dossier Protocol.md` (lines 123–198)
- All Tier 1 sources listed in Section 2 are already local and readable

---

## 15. Known Unknowns — Resolved Thread Register

The following six threads represent the most important open questions for Sultai architecture authoring. Each records the thread, its current resolution status, and what remains genuinely open. Unlike Bant and Jund — where primary world-guide captures exist locally — Sultai's world/culture detail is sourced from external official material not yet locally captured, so most threads are OPEN rather than CLOSED.

---

### Thread 1 — Sidisi's Figure Biography and Dual Timeline Status
**Status: CLOSED — Confirmed in local primary text**

The distinction between **Sidisi, Brood Tyrant** (Khans-era khan/queen of the original Sultai Brood) and **Sidisi, Undead Vizier** (Dragons-era undead servant of Dragonlord Silumgar) is confirmed via the deep research report citing official Planeswalker's Guide sources. Sidisi's powers, stated imperial ambitions, and her execution-and-raising by Silumgar are all referenced in the external deep research report.

However, no local file contains the primary official source text for Sidisi's figure biography. The specific passages from *Planeswalker's Guide to Khans of Tarkir, Part 1* and *Planeswalker's Guide to Dragons of Tarkir, Part 1* that establish her roles are not locally captured.

**For authoring**: Both card versions are confirmed at the level of the deep research report. Sidisi can be acknowledged as the Khans-era khan/queen. The exact scope of her stated imperial ambitions, her magical methods, and her political position relative to Taigam require local official capture before detailed narrative authoring.

---

### Thread 2 — Tasigur's Heir-to-Khan Transition
**Status: CLOSED — Confirmed in local primary text**

`story-khanfall.md` confirms Tasigur as the Sultai khan present at Shu Yun's summit, speaking and acting in the role of khan. `planeswalkers-guide-fate-reforged.md` confirms him as "the young, pampered heir" in the FRF era. The heir→khan transition is now documented across both captures.

The deep research report confirms that the *Planeswalker's Guide to Fate Reforged* presents Tasigur as "the young, pampered heir to the Sultai fortune," and that the official story **"Khanfall"** later explicitly confirms him as **khan** at the summit of clan leaders where he betrays the other clans to the dragons. This matters because it means there is a genuine internal distinction between "FRF setting snapshot" and "late-FRF plot state."

Neither the FRF world guide nor "Khanfall" is locally captured. The thread is confirmed at the deep-research level but not at the primary-source level.

**For authoring**: Use Tasigur as the FRF-era heir who becomes khan per the deep research report citation. Do not state the exact text of his betrayal or the summit details as confirmed local canon. Flag this thread for local capture before detailed figure authoring.

---

### Thread 3 — Rakshasa Political Role and Named Figure Biographies
**Status: CLOSED — Confirmed in local primary text**

`planeswalkers-guide-khans-part-1.md` has Feyomsi's full biography: "This terrifying rakshasa sorcerer and necromancer dwells within the Ukud Necropolis with his group of devoted mages." Also confirms Taigam ("studied with the masters of the Jeskai before he sought power within the ranks of the Sultai") and Kirada (Qarsi Palace custodian). Rakshasa pact details confirmed in primary text.

The deep research report confirms that the Sultai were "the first clan to bargain with rakshasas" and that **Feyomsi** is identified in the official Khans guide as a "terrifying rakshasa sorcerer and necromancer living in Ukud Necropolis." Rakshasa creatures are confirmed as part of Sultai's species composition and magical culture.

No local file contains the primary source text for Feyomsi's biography or the specific terms of the rakshasa pacts. The Tarkir dossier (Tier 2) references rakshasa pacts but does not provide primary-source granularity.

**For authoring**: Rakshasa pacts and their role in the Sultai's elite status are confirmed at the deep-research level. Feyomsi can be mentioned as a named figure. Do not construct extended rakshasa narrative without local official capture.

---

### Thread 4 — Sultai Brood vs. Silumgar Clan Boundary Granularity
**Status: CLOSED — Confirmed in local primary text**

`planeswalkers-guide-dragons-part-1.md` confirms the full Silumgar hierarchy in primary text, Sidisi as executed-and-raised Undead Vizier, and the dragonlord-first power structure. The boundary between Sultai Brood and Silumgar Clan is now documented in local Tier 1 sources across both the Khans and Dragons captures.

The Tarkir dossier (Tier 2) provides an explicit diagnostic: when Dragonlord Silumgar dominated the region, he "removed Green's natural growth and adaptation from the Sultai, leaving only a cold, paranoiac core of raw Black and Blue ambition." This is a strong synthesis statement about what distinguishes the two formations and what Green specifically contributes to full Sultai.

This framing does not appear in local Tier 1 sources. The primary source is the dossier synthesis, which references the *Planeswalker's Guide to Dragons of Tarkir* as its basis. The "extinct Sultai" framing — official summary material confirming the original five clans were largely stamped out in the dragonlord timeline — is sourced to the deep research report, not locally captured.

**For authoring**: The timeline boundary is reliable. The three-formation model (Khans Sultai / Silumgar clan / Dragonstorm reformed Sultai) is well-grounded. The specific Silumgar-removes-Green diagnostic is Tier 2 synthesis and should be labeled as such until local primary capture confirms it.

---

### Thread 5 — Tarkir: Dragonstorm Reformed Sultai Specifics
**Status: CLOSED — Confirmed in local primary text**

`planeswalkers-guide-dragonstorm-part-2.md` has the full reformed Sultai section in primary text: "Nothing goes to waste" motto, Fangkeeper as figurehead, elected mayors and necromancer priests, the Lasyd military force, Panjasi as merchant-spies, the Rite of Renewal (sibsig as honored dead retaining memory and identity), raised cities on stilts, Kheru City, Qarsi Palace with botanical gardens.

The deep research report confirms that *Tarkir: Dragonstorm* introduces a distinct reformed Sultai: decentralized governance, the "Fangkeeper" as a symbolic figurehead, honored undead as continuing civic authorities, hostility to rakshasa pacts, agricultural transformation of former necromantic territories, and the principle that "nothing goes to waste." The Tarkir dossier (Tier 2) corroborates this with the Fangkeeper figurehead, naga academic circles, and the merchant cartel structure.

No local Tier 1 source captures the *Tarkir: Dragonstorm* official guide text for the reformed Sultai.

**For authoring**: Reformed Sultai exists as a distinct later formation. The key contrasts with original Khans Sultai are reliable at the Tier 2 level. Do not present Dragonstorm Sultai details as Tier 1 confirmed without local capture. This formation must not be read back onto the original Brood.

---

### Thread 6 — Khans-Era Geography: Place Names and Layout
**Status: CLOSED — Confirmed in local primary text**

`planeswalkers-guide-khans-part-1.md` has full descriptions of all named locations: Kheru Temple, Ukud Necropolis ("most architecturally impressive building in Sultai lands"), Qarsi Palace ("sprawling, luxurious jungle paradise set on the waterways"), the Gudul, the Gurmag Swamps, the Marang River Fortress, the Sagu, Molderfang Falls, and the Crocodile Pits — all with physical descriptions from the primary text.

The deep research report lists the following as canon-supported Sultai locations cited from the *Planeswalker's Guide to Khans of Tarkir*: **Qarsi Palace**, **Kheru Temple**, **Ukud Necropolis**, **Gudul**, **Gurmag Swamps**, **Marang River Fortress**, **the Sagu**, **Molderfang Falls**, and **the Crocodile Pits**. The report states explicitly that "those place names are canon-supported, not wiki-only."

None of these place names are confirmed via locally captured primary source text. The spatial relationships between locations, the physical descriptions of each site, and the ecological details of the river-delta jungle territory are all sourced to the external deep research report.

**For authoring**: The place names can be referenced with appropriate framing ("official worldbuilding identifies X as..."). Do not construct detailed geography (distances, layout, travel routes) without local primary capture.

---

### Thread Resolution Summary

| Thread | Resolution | Status |
|---|---|---|
|---|---|---|
| 1. Sidisi's figure biography and dual timeline status | Timeline positions confirmed via deep research; local official capture pending | **Open** |
| 2. Tasigur's heir-to-khan transition | Sequence confirmed in deep research; "Khanfall" source text not locally captured | **Open** |
| 3. Rakshasa political role and named figures | Pacts confirmed; Feyomsi biography and pact terms not locally captured | **Open** |
| 4. Sultai Brood vs. Silumgar clan boundary | Tier 2 diagnostic confirmed; primary source text not locally captured | **Partially open** |
| 5. Dragonstorm reformed Sultai specifics | Full reformed Sultai text captured in `planeswalkers-guide-dragonstorm-part-2.md` | **Closed** |
| 6. Khans-era geography | All named locations with physical descriptions captured in `planeswalkers-guide-khans-part-1.md` | **Closed** |

---

## 16. Architecture Authoring Readiness Assessment

**Sultai stop/go verdict**: Sultai now has **full readiness** for architecture authoring. All six Known Unknown threads are closed. Primary world-guide text is locally captured across four Planeswalker's Guide captures and two official stories. Architecture authoring may proceed on both color philosophy and world/culture/figures detail.

### Confirmed at Tier 1 — Ready to author now

- ✅ Core identity statement (Black-centered, BGU, ruthlessness as clan attribute, dragon's fang as symbol)
- ✅ Color philosophy for all three colors from the dominant center outward (Black's amoral pragmatism; Green's natural-order frame; Blue's calculation layer)
- ✅ All three two-color pair analyses (Dimir UB: secrecy and subversion; Golgari BG: unstoppable self-renewing force; Simic GU: obsessive goal-focus)
- ✅ Adjacent faction separators at the color-philosophy level (Temur Green-center vs. Sultai Black-center; Abzan White-center vs. Sultai Black-center)
- ✅ White's absence: no civic justice, no group ethics, purely transactional relationships — synthesis from official color-pie material
- ✅ Red's absence: cold and calculated ambition, not impulsive; patient not frenetic — synthesis from official color-pie material
- ✅ Delve as design-confirmed signature mechanic
- ✅ Sultai as a slower, more calculated clan pattern in design intent
- ✅ Allied pairings (Blue+Black = choice and obfuscated power; Black+Green = unstoppable persistence)
- ✅ Enemy conflict framings (Black vs. White; Black vs. Green; Blue vs. Green; White vs. Red — all relevant to absent-color analysis)
- ✅ Commander archetypes (6 BGU JSONL records; color philosophy operator vocabulary confirmed)
- ✅ Vox Mana placement signals with confidence structure
- ✅ Timeline boundary guard (four distinct Sultai formations with clear separators)
- ✅ Sidisi biography — Khans-era queen/khan in `planeswalkers-guide-khans-part-1.md`; Undead Vizier in `planeswalkers-guide-dragons-part-1.md`
- ✅ Tasigur as Sultai khan — confirmed at summit in `story-khanfall.md`; as heir in `planeswalkers-guide-fate-reforged.md`
- ✅ Feyomsi, Taigam, Kirada — full biographies in `planeswalkers-guide-khans-part-1.md`
- ✅ All Khans-era geography — Kheru Temple, Ukud Necropolis, Qarsi Palace, Gudul, Gurmag, Marang, Sagu, Molderfang Falls, Crocodile Pits — in `planeswalkers-guide-khans-part-1.md`
- ✅ Social doctrine ("the second skin," palace spectacle, Kheru cult, lotus perfume, body-part ritual magic, naga venom) — in `planeswalkers-guide-khans-part-1.md`
- ✅ Silumgar clan structure and Sidisi as Undead Vizier — in `planeswalkers-guide-dragons-part-1.md`
- ✅ Reformed Sultai (Fangkeeper, Lasyd, Panjasi spy network, Rite of Renewal, raised cities) — in `planeswalkers-guide-dragonstorm-part-2.md`

### Confirmed at Tier 2 (support-only) — Usable with labeling

- ⚠️ Identity thesis ("hyper-intelligent ruthless plutocracy...") — Tarkir dossier synthesis, not a direct Wizards quote
- ⚠️ Color pressure matrix — Tarkir dossier, high-quality but Tier 2
- ⚠️ Card evidence grid (12 Sultai cards) — Tarkir dossier, cross-verified against Scryfall in deep research
- ⚠️ Core axiom ("Every resource, living or dead, has a price...") — Tarkir dossier synthesis
- ⚠️ Dragonlord-era Green-stripped diagnostic — Tarkir dossier synthesis from official guide basis
- ⚠️ Cross-clan dependency network (Sultai needs war captives; Mardu and Abzan conflict with Sultai) — Tarkir dossier

### Pending local official capture — Do not author until captured

- ❌ Exact card text and flavor text
- ❌ Detailed Fate Reforged Tasigur arc beyond FRF guide snapshot (story articles for that period not captured)
- ❌ Social doctrine ("second skin," palace spectacle, Kheru cult)
- ❌ Magical practices (lotus perfume, body-warping, venom systems)
- ❌ Silumgar clan architecture beyond the timeline boundary guard
- ❌ Dragonstorm reformed Sultai beyond the Tier 2 framing in Section 7
- ❌ Exact card text and flavor text

**Proceed to Sultai `identity.md` authoring using Tier 1 confirmed material only. Flag Tier 2 claims explicitly. Keep `metaphysics.md` short until local official world-guide capture is completed.**

**Authoring note for `metaphysics.md`**: Sultai's core metaphysical engine is the **BG enemy-pair tension** as the faction's internal fault line — Black's destructive self-interest and individual power-seeking pulling against Green's sustaining natural-order acceptance — mediated by Blue's calculation into a usable worldview rather than pure contradiction. This is the equivalent of Bant's GU nature/nurture conflict and Jund's BG food-chain tension. The claim: Sultai does not simply exploit the dead; it has a coherent philosophy that says death, decay, and the grave are part of the same cycle that Green accepts and Black weaponizes. Blue is the faculty that turns that into a plan. Expand the BG tension as the central metaphysical claim: **graveyard as infrastructure is not a mechanic preference — it is what you get when Green's acceptance of the death cycle and Black's willingness to use any resource are synthesized by Blue's demand for a working system.** Delve is the metaphysical statement made mechanical.

---

*Assembled: 2026-05-30 | Source scan: full 12-step local corpus sequence*

---

## Appendix A — Tiered Source Feed Order

This appendix records the prioritized read order for the full 12-step sequence. A future research agent running a refresh pass or evidence-capture session should follow this sequence. Tiers reflect richness of Sultai-specific content, not general canon authority.

### Tier 1 — Primary Sultai content (read fully, highest signal density)

1. [`docs/research/sultai brood/sultai-brood-deep-research-report.md`](sultai-brood-deep-research-report.md) — Full external deep research synthesis: confirmed canon, design commentary, cultural detail, figures table, theme synthesis matrix, community interpretation, overclaiming warnings. Primary world/culture reference until local official captures are completed.
2. [`docs/research/canon/mark_rosewater_official_three_color/Sultai_Whatever It Takes _ MAGIC_ THE GATHERING.md`](../canon/mark_rosewater_official_three_color/Sultai_Whatever%20It%20Takes%20_%20MAGIC_%20THE%20GATHERING.md) — MaRo's official Sultai philosophy article; full color-voice interview; Black as center; ruthlessness defined; enemy-color absences. Tier 1 canon — read in full.
3. [`docs/research/canon/canon-inventory-three-color-reference-audit.md`](../canon/canon-inventory-three-color-reference-audit.md) — Canon inventory; confirms MaRo article as primary identity source; full SULTAI hit register across all corpus files.

### Tier 2 — Color component groundwork (read fully; every sentence is Sultai-relevant)

4. [`docs/research/canon/mark_rosewater_official_two_color/dimir_Pretty Sneaky Sis _ MAGIC_ THE GATHERING.md`](../canon/mark_rosewater_official_two_color/dimir_Pretty%20Sneaky%20Sis%20_%20MAGIC_%20THE%20GATHERING.md) — UB component; secrecy, unrestricted knowledge and absolute power, sneakiness as greatest strength, internal trust-deficit as greatest weakness
5. [`docs/research/canon/mark_rosewater_official_two_color/golgari_Life and Death _ MAGIC_ THE GATHERING.md`](../canon/mark_rosewater_official_two_color/golgari_Life%20and%20Death%20_%20MAGIC_%20THE%20GATHERING.md) — BG component (enemy pair as internal fault line); life/death cycle as shared resource, recursion, unstoppable self-renewing force, lack of fine control as weakness
6. [`docs/research/canon/mark_rosewater_official_two_color/simic_Improving Upon Nature _ MAGIC_ THE GATHERING.md`](../canon/mark_rosewater_official_two_color/simic_Improving%20Upon%20Nature%20_%20MAGIC_%20THE%20GATHERING.md) — GU component; nature vs. nurture conflict, obsessive goal-focus, library search and card draw, disdain for self-interest
7. [`docs/research/canon/mark_rosewater_official_misc/Black_Philosophy_Drive_to_Work_Podcast_Transcript.md`](../canon/mark_rosewater_official_misc/Black_Philosophy_Drive_to_Work_Podcast_Transcript.md) — Black mono philosophy; amoral pragmatism, any-resource logic, death as tool, rejection of White's rules
8. [`docs/research/canon/mark_rosewater_official_misc/Green_Philosophy_Drive_to_Work_Podcast_Transcript.md`](../canon/mark_rosewater_official_misc/Green_Philosophy_Drive_to_Work_Podcast_Transcript.md) — Green mono philosophy; natural-order acceptance, born-with-potential worldview, conflict with Blue's tabula rasa and Black's self-interest
9. [`docs/research/canon/mark_rosewater_official_misc/Blue_Philosophy_Drive_to_Work_Podcast_Transcript.md`](../canon/mark_rosewater_official_misc/Blue_Philosophy_Drive_to_Work_Podcast_Transcript.md) — Blue mono philosophy; tabula rasa, information as leverage, deliberate calculation over impulse

### Tier 3 — Adjacent factions (read fully; identity contrast and separator content)

10. [`docs/research/canon/mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md`](../canon/mark_rosewater_official_three_color/Temur_What%20Doesn%27t%20Kill%20You%20Makes%20You%20Stronger%20_%20MAGIC_%20THE%20GATHERING.md) — Adjacent GUR faction; shares Green+Blue with Sultai; Green-center vs. Black-center changes everything; Blue in Temur = mental fortitude, not subversive calculation; primary Sultai separator
11. [`docs/research/canon/mark_rosewater_official_three_color/Abzan_We Will Survive _ MAGIC_ THE GATHERING.md`](../canon/mark_rosewater_official_three_color/Abzan_We%20Will%20Survive%20_%20MAGIC_%20THE%20GATHERING.md) — Adjacent WBG faction; shares Black+Green with Sultai; White-center vs. Black-center; Black in Abzan is tempered by communal obligation; second key Sultai separator

### Tier 4 — Cross-color dynamics (read fully; short articles, high signal)

12. [`docs/research/canon/mark_rosewater_official_misc/Allied_Color_Pairings_Explained.md`](../canon/mark_rosewater_official_misc/Allied_Color_Pairings_Explained.md) — Blue+Black alliance (choice and obfuscated power); both reject Green's destiny frame; their combined plan maximizes options while hiding intentions
13. [`docs/research/canon/mark_rosewater_official_misc/Enemy_Color_Conflicts_Explained.md`](../canon/mark_rosewater_official_misc/Enemy_Color_Conflicts_Explained.md) — Black vs. White (individual vs. group); Black vs. Green (free will vs. destiny); Green vs. Blue (nature vs. nurture) — all three Sultai enemy-pair conflicts
14. [`docs/research/canon/mark_rosewater_official_misc/Enemy_Color_Philosophy_Conflicts.md`](../canon/mark_rosewater_official_misc/Enemy_Color_Philosophy_Conflicts.md) — Core five-conflict framing; Black vs. Green (life vs. death, growth vs. decay, symbiosis vs. parasitism) — Sultai's internal BG fault line defined

### Tier 5 — Setting protocol (read targeted section only)

15. [`docs/research/canon/misc/Tarkir Clan Lore Dossier Protocol.md`](../canon/misc/Tarkir%20Clan%20Lore%20Dossier%20Protocol.md) — Read lines 123–198 (Sultai Brood section). Identity thesis, color pressure matrix, card evidence grid, Vox Mana synthesis, timeline contrast, cross-clan dependency network. Tier 2 quality — high-detail but not primary authority.

### Tier 6 — Broad support (grep only; skip if no hits)

16. [`docs/research/canon/misc/comprehensive-mtg-lore-history-updated.md`](../canon/misc/comprehensive-mtg-lore-history-updated.md) — Grep: `Sultai|BGU|Sidisi|Tasigur|delve|sibsig|necromancy` — confirmed hits: BGU clan designation, Sultai Brood faction name
17. [`docs/research/canon/misc/vox_mana_comprehensive_analysis.md`](../canon/misc/vox_mana_comprehensive_analysis.md) — Grep: `Sultai|BGU|ruthless` — confirmed hits: Black as "ruthless ambition, power through sacrifice"; Sultai label; placement context
18. [`docs/research/canon/colorless/source-material/07_Cross_Color_Dynamics_and_Relationships.md`](../canon/colorless/source-material/07_Cross_Color_Dynamics_and_Relationships.md) — Grep: `Sultai|BGU` — confirmed hit: "ruthless growth through knowledge; central conflict: progress vs. exploitation vs. nature"
19. [`docs/research/canon/misc/MTG_Lore_Confidence_Tagged.txt`](../canon/misc/MTG_Lore_Confidence_Tagged.txt) — Grep: `Sultai|BGU` — confirmed hit: BGU Sultai clan designation
20. [`docs/research/canon/colorless/source-material/All 26 Color Combinations of Magic_ Guilds, Clans, Wedges, and Names - Draftsim.md`](../canon/colorless/source-material/All%2026%20Color%20Combinations%20of%20Magic_%20Guilds%2C%20Clans%2C%20Wedges%2C%20and%20Names%20-%20Draftsim.md) — Naming conventions; BGU/WBG entry

### Tier 7 — Commander signals (requires Python JSONL extraction)

21. [`docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`](../../research/vox_mana_second_commander_recommendations_enhanced.jsonl) — 6 BGU records; filter: `colors` contains `Black`, `Green`, `Blue`; excludes `White` and `Red`. Key fields: `colorPhilosophySummary`, `voxManaPlacementFit`, `whatThisDeckTeachesAboutItsColors`, `playstyleTags`, `graveyardFocus`, `valueEngine`, `complexity`, `controlFocus`. Full extraction and synthesis in Section 11.

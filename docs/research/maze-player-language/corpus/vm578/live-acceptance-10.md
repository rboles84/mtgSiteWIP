# VM-578 Recommended Live Acceptance 10

## VM578-001: I want colorless but only wolves or other creatures like wolves and i would like deathouch and haste if possible

- Why selected: Known owner failure covering colorless hard constraint, typo recovery, optionality, and unsupported family similarity.
- What owner should inspect: Whether Maze keeps colorless and Wolf as hard constraints while being honest about optional deathtouch/haste and wolf-like similarity.
- Expected interpretation characteristics: The hard parts are colorless and Wolf. Haste/deathtouch are optional in the sentence, and wolf-like similarity is not a verified deterministic Scryfall mapping.
- What would constitute failure: Dropping colorless or Wolf, treating all optional terms as mandatory without explanation, or inventing unsupported wolf-like expansions.

## VM578-003: cards I can run in my simic commander deck

- Why selected: Representative Commander deck-fit color identity case.
- What owner should inspect: Whether Simic deck language becomes Commander-legal identity containment rather than exact actual card color.
- Expected interpretation characteristics: Deck-support wording asks for cards legal in a Simic Commander deck, not exactly blue-green cards.
- What would constitute failure: Using exact blue-green card color, omitting Commander legality, or failing to explain deck-fit interpretation.

## VM578-052: removal for my deck bonus if it exiles

- Why selected: Preference and optionality case using bonus language.
- What owner should inspect: Whether exile is treated as a bonus preference layered on removal instead of the whole query.
- Expected interpretation characteristics: Removal is the core ask. Exile is explicitly bonus language and should not crowd out removal.
- What would constitute failure: Making the bonus condition mandatory without explanation or losing the core removal function.

## VM578-033: cards that let me reuse my etbs

- Why selected: Functional ETB-support case, one of the most important semantic gaps.
- What owner should inspect: Whether Maze distinguishes ETB support from cards that merely contain enter text.
- Expected interpretation characteristics: The player wants support for ETB triggers, not merely cards that themselves contain the word enters.
- What would constitute failure: Confidently collapsing reuse ETBs into only o:enters or hiding unresolved support roles.

## VM578-064: elves or druids that tap for mana

- Why selected: OR scope case with two alternative creature types and a shared mana-production function.
- What owner should inspect: Whether Elf/Druid remains an alternative relationship instead of becoming both required.
- Expected interpretation characteristics: Elf and Druid are alternatives under OR, while mana production is a shared function.
- What would constitute failure: Flattening OR into AND or dropping the tap-for-mana function without diagnostic honesty.

## VM578-072: wurm creatures not worm

- Why selected: Typal spelling boundary preserving Wurm versus Worm.
- What owner should inspect: Whether Wurm and Worm remain distinct in the visible query and diagnostics.
- Expected interpretation characteristics: Wurm and Worm are distinct verified creature types and must not normalize into each other.
- What would constitute failure: Normalizing Wurm into Worm, ignoring the negative Worm exclusion, or merging the two creature types.

## VM578-084: stax pieces that are still fun for a casual table

- Why selected: Semantic/archetype case with stale VM-577 stax evidence and social fit language.
- What owner should inspect: Whether Maze avoids confidently mapping stale or subjective stax/fun-table language.
- Expected interpretation characteristics: This is valuable precisely because it should not confidently emit stale stax mappings or measure fun as syntax.
- What would constitute failure: Emitting stale stax mapping as settled truth or pretending casual fun is executable syntax.

## VM578-091: counter cards

- Why selected: Ambiguous counter term collision.
- What owner should inspect: Whether Maze offers or reports counterspell/counter-object ambiguity instead of selecting a hidden winner.
- Expected interpretation characteristics: Counter can mean counterspells, counters on permanents, or broader counter objects; expected behavior should be ambiguity-aware.
- What would constitute failure: Resolving counter globally without context or presenting high confidence with no ambiguity.

## VM578-097: exactly blue and green cards but no blue cards

- Why selected: Zero-result-risk contradictory color case.
- What owner should inspect: Whether exact blue-green plus no blue is exposed as contradictory or risky.
- Expected interpretation characteristics: This deliberately contradicts itself; a conservative diagnostic is preferable to quiet confidence.
- What would constitute failure: Silently dropping either the exact color constraint or the no-blue exclusion.

## VM578-031: ramp for a six mana commander

- Why selected: Generally representative natural Commander functional search.
- What owner should inspect: Whether ramp for a six mana commander is useful without mistaking the commander cost for card mana value.
- Expected interpretation characteristics: This is a representative functional Commander request: it asks for acceleration, not necessarily cards costing six.
- What would constitute failure: Searching for six-mana cards instead of ramp support or failing to surface functional uncertainty.

# Placement Language Trust Audit

Card: [VM-595](../kanban/done/VM-595-placement-language-trust-audit.md)
Audit disposition (2026-08-29): **STOP AT OWNER REVIEW — audit and remediation design complete; no prose remediation performed**
Lifecycle: **Closed 2026-09-05** — SIRF VM-599 through VM-610 absorbed the material structural/language remediation; [VM-629](../kanban/backlog/VM-629-placement-language-repetition-reduction.md) owns only the bounded remaining boilerplate concern.
Current production baseline: `fbea856b2a480d722db58401598c9d8a9b704baf`

## Executive verdict

Vox Mana's dossier language has a real launch-trust problem, but it is not an all-37 identity-truth failure and it does not justify rewriting every dossier.

The dominant pattern is **mixed**:

1. approved identity-specific source fields use the same visible sentence frames across all 37 identities;
2. the composer adds a second layer of exact instructional boilerplate across every dossier;
3. otherwise useful identity, gameplay, and boundary fragments sometimes repeat one another when Start Here, Test the Fit, and How This Plays are read in sequence;
4. a small set of authored boundary sentences contains visibly broken conditional grammar.

No unsupported or over-strengthened Placement claim was proven in this audit. The launch issue is primarily voice, information-role overlap, and polish. Classification: **launch-critical remediation**, not a Placement blocker and not acceptable as-is for the stated launch-quality bar.

```text
PLACEMENT LANGUAGE AUDIT
────────────────────────
37 / 37 dossiers analyzed
1,399 prose units
1,806 sentences
26,831 words

66 exact cross-identity duplicate sentence groups
819 occurrences inside those groups
18 identity-substitution duplicate groups
57 repeated five-word openings
14 within-dossier cross-section redundancy candidates

OWNER REVIEW — 10 TARGETED DOSSIERS
Zero Owner collection work
```

Important caveat: 819 / 1,806 sentences (45.3%) participate in an exact cross-identity duplicate group, but this is **not** a defect rate. The count includes legitimate shared instructions and Mana Notes guidance. It proves how much of the reading experience is shared language and supplies candidates for editorial judgment.

## Corpus and method

The primary evidence is the complete VM-586 browser-rendered corpus at `docs/audits/archscry-current-state-2026-08-22/dossier/dossier-review-current-state.json`. VM-586 collected all 37 identities through VM-579 Dossier Review and the production dossier composer, including section boundaries, interactive segments, complete visible text, and rendered HTML evidence.

That corpus was accepted at `db9a16a40c2bfb7d0d493eacef348f19d70bb05a`. VM-595 deterministically compares every dossier-owning path and input between that SHA and `fbea856…`; there is zero committed or working-tree drift in the inspected Archscry dossier runtime, CSS, identity registry, faction artifact, dossier catalogs, placement model, precon data, or relevant taxonomy. The current `npm run test:dev-review` pass separately re-composes all 37 current dossiers. This makes the existing rendered corpus current-equivalent without creating a second browser harness or regenerating ceremonial screenshots.

The analyzer at `scripts/audit/placement-language-trust-audit.mjs`:

- confirms the authoritative current registry contains exactly the same 37 identities;
- confirms every record is a direct Dossier Review render with all six required panel boundaries;
- extracts prose-like rendered lines while excluding headings, control labels, card names, URLs, and all-caps structure;
- measures exact and identity-normalized duplicates, repeated openings, five-word sequences, hedge and transition frequency, cross-identity lexical similarity, and within-dossier cross-section similarity;
- uses quantitative results only as candidate signals;
- keeps the seven material findings as separate editorial classifications with source ownership.

No AI-content detector, authorship probability, or automatic “AI-written” score was used.

## Defect model

| Dimension | Values used |
| --- | --- |
| Severity | `BLOCKER`, `HIGH`, `MEDIUM`, `LOW` |
| Truth | supported / operational, over-strengthened, unsupported, unclear provenance |
| Language | natural, repetitive, templated, generic, synthetic cadence, redundant, verbose, unclear |
| Scope | one identity, identity family, systemic composer, shared utility copy |
| Owner | `AUTHORED_SOURCE`, `COMPOSER_TEMPLATE`, `MULTIPLE_GOOD_FRAGMENTS_BADLY_COMPOSED`, `GENERATED_PROJECTION`, `PLACEMENT_RESULT_LANGUAGE`, `COMMANDER_GUIDANCE`, `SHARED_UI_COPY`, `UNKNOWN_REQUIRES_TRACE` |

Structural consistency was not treated as linguistic repetition by itself. Stable headings, section order, card category labels, and navigation labels remain useful. Findings require repeated or overlapping prose that changes how the product reads.

## Quantitative findings

### Exact and normalized repetition

There are 66 exact cross-identity duplicate sentence groups with 819 rendered occurrences. The largest exact families occur in all 37 dossiers:

- “Cards whose verified play patterns give you a concrete way to explore this reading.”
- “Choose only the lanes that fit the deck you want to explore.”
- “Compare these lanes to see which one matches the deck you want to build.”
- “Open live searchable paths shaped by this dossier.”
- “Start here, then adjust the budget, complexity, and table role to fit your deck.”
- “Ready-made Commander decks compared through verified color identity and cataloged deck facts.”
- “Use these Commander starting points to turn this identity into decks, cards, and searches you can compare.”

Mana Notes also deliberately repeats utility guidance: the Premium sentence appears in 36 identities, Midrange in 36, and Budget wording in 35. These are legitimate structural candidates for consolidation, not identity-copy defects.

Identity substitution adds 18 normalized duplicate groups. These are mostly precon/color-lane explanations and Mana Notes color substitutions. Pairwise near-similarity produces 1,412 pairs after exact duplicates are removed; that number is deliberately not used as a defect count because pairwise combinations inflate one template family.

### Cadence

Six sentence openings are effectively universal:

| Opening | Occurrences | Identities |
| --- | ---: | ---: |
| `Pressure through …` | 38 | 37 |
| `One way to …` | 37 | 37 |
| `Start here …` | 37 | 37 |
| `This is less likely to fit when …` | 37 | 37 |
| `This may fit if …` | 37 | 37 |
| `Watch for this tension …` | 37 | 37 |

`Opponents feel the deck …` appears in 26 identities. These are not banned phrases. Their all-population or near-all-population use creates the synthetic rhythm: hypothesis, tension, boundary, opponent impression, pressure summary, repeated for every identity.

### Qualification density

`may` appears 42 times across all 37 identities, including the universal `This may fit if` frame. `can` appears 149 times across all 37, but many uses describe actual game capability rather than uncertainty. The other requested hedges (`often`, `tends to`, `in some cases`, `at times`, `generally`, `usually`, `sometimes`, `could`) did not appear in the extracted corpus.

The finding is therefore not “too many hedge words” in general. It is the uniform placement of one honest hedge at the same rhetorical position in every dossier.

### Semantic redundancy

The lexical second pass found 14 high-confidence cross-section candidates. Strong examples include:

- WUBRG repeats the Domain/converge/sunburst/mana-infrastructure list almost exactly in Start Here and How This Plays.
- Yore repeats artifacts/sacrifice/recursion/control/value-engine language across Start Here and How This Plays.
- Temur's Start Here plan and positive self-check both say grow resources, wait for the signal/opening, and convert dragons/copying/counters/force into attuned survival.
- Dune, Glint, Ink, Bant, Esper, Grixis, Lorehold, White, and Colorless repeat gameplay inventories across Start Here and How This Plays.

This is not proof that every paired sentence should be removed. It proves that the current section roles are not reliably additive.

## Material trust findings

| ID | Severity | Finding | Earliest responsible owner | Scope |
| --- | --- | --- | --- | --- |
| F01 | HIGH | Universal Test the Fit / How This Plays frames make identity voice mechanically interchangeable. | Authored dossier source fields | 37/37 |
| F02 | HIGH | Exact instructional and navigation prose repeats through every dossier and competes with identity-specific copy. | Composer templates | systemic |
| F03 | HIGH | Good Commander and identity fragments restate one another across Start Here, Test the Fit, and How This Plays. | Composition / section-role overlap | identity family |
| F04 | MEDIUM | Honest uncertainty is delivered through the same hedge frame everywhere, making it feel evasive. | Authored dossier source fields | 37/37 |
| F05 | MEDIUM | Five mono boundary sentences visibly say `when if`; 18 other boundaries use the difficult `when X is not Y` construction. | Authored dossier source fields | targeted family |
| F06 | MEDIUM | Precon and Mana Notes utility explanations constitute a large, generic share of each dossier. | Composer templates | shared utility |
| F07 | LOW | Repeated `verified`, `cataloged`, and `recorded` wording exposes audit-adjacent process language. | Shared UI copy | shared utility |

### F01 — Authored cadence, not a renderer illusion

`positive_self_check`, `certified_boundary_self_check`, `how_opponents_read_it`, and `emotional_pressure` are approved public-copy fields in `data/dossier/identity-dossier-content.source.json`. They are promoted to `data/dossier/identity-dossier-content.catalog.json` and rendered by `assets/js/archscry/runtime/dossier-view.js`.

The renderer does not invent the universal `This may fit if`, `This is less likely to fit when`, `Opponents feel the deck`, or `Pressure through` frames. The source already contains them. This is a source-content cadence defect with a generated projection downstream.

The content inside many frames is strong and specific. The problem is the visible sameness of the frame, not the identity truth it contains.

### F02 — Composer boilerplate

The repeated Start Here, precon, Card Signals, Mana Notes, and Maze instructions are literal shared strings in:

- `assets/js/archscry/runtime/dossier-view.js`;
- `assets/js/archscry/dossier/reading.js`;
- `assets/js/archscry/dossier-card-review-text.js`.

This is one composer defect family, not 37 separate content defects. The shared text often states a sensible safety or navigation promise, but several sentences within the same dossier repeat “start,” “explore,” “compare,” “fit,” “reading,” and “verified/recorded/cataloged” without adding identity information.

### F03 — Composition collisions

Start Here often lists a Commander plan, mechanics, and table caution. How This Plays then lists role, opponent impression, emotional pressure, mechanical expression, and table experience. Because those sources have overlapping information jobs, specific mechanics and worldview boundaries recur lower on the page.

The clearest cases are WUBRG, Yore, Temur, Dune, Glint, Ink, Bant, Esper, and Grixis. Fixing only one sentence would leave the same section-role collision elsewhere.

### F05 — Visible grammar failures

White, Blue, Black, Red, and Green each render `This is less likely to fit when if …`. The malformed phrase is already present in the approved source field; it is not created by concatenation at render time. Eighteen additional identities use `This is less likely to fit when [examples] is not [identity] without …`, which is technically recoverable but difficult to parse aloud.

This is supported meaning expressed in trust-breaking prose. It is not a Placement-semantics defect.

## Source ownership trace

| Rendered family | Runtime consumer | Projection / source | Classification | Correct repair layer |
| --- | --- | --- | --- | --- |
| Test the Fit / How This Plays identity copy | `assets/js/archscry/runtime/dossier-view.js` | `data/dossier/identity-dossier-content.catalog.json` generated from `data/dossier/identity-dossier-content.source.json` | `AUTHORED_SOURCE` | source field role/cadence, then existing catalog producer |
| Start Here plan wrapper | `assets/js/archscry/runtime/dossier-view.js` | `assets/js/archscry/dossier/reading.js` plus Commander guidance | `COMPOSER_TEMPLATE` / `COMMANDER_GUIDANCE` | field-aware composer reduction; preserve guidance truth |
| Precon explanations | `assets/js/archscry/runtime/dossier-view.js` | generated precon catalog from canonical precon source | `COMPOSER_TEMPLATE` / `GENERATED_PROJECTION` | composer explanation; never hand-edit generated precon rows |
| Card voice / play introductions | `assets/js/archscry/runtime/dossier-view.js` | `assets/js/archscry/dossier-card-review-text.js` | `SHARED_UI_COPY` | shared intro copy |
| Card-specific rationales | dossier renderer | approved card-rationale source → generated catalog | `AUTHORED_SOURCE` / `GENERATED_PROJECTION` | source relationship only if the rationale itself is defective |
| Mana Notes tier guidance | dossier renderer | shared tier copy plus faction land data | `COMPOSER_TEMPLATE` | shared utility copy; preserve land facts |
| Maze discovery introduction | dossier renderer | shared route/presenter copy | `COMPOSER_TEMPLATE` | shared UI/composer copy; preserve links/context |

All referenced paths resolve. Generated catalogs are symptoms/consumers and must not be hand-edited.

## Truth versus voice

VM-595 found no proven `BLOCKER` truth defect, unsupported claim, or composer strengthening of cautious evidence. The authority chain remains structurally intact: certified identity truth → approved public-copy source → generated catalog → renderer.

The material failures are:

- supported claims written with synthetic cadence;
- accurate instructions repeated too often;
- distinct source fragments composed into redundant sections;
- supported boundaries expressed with broken or overworked grammar;
- operational trust language that reads like process documentation.

This finding does not recertify semantic support. It only reports that no new truth defect was established by this language audit.

## Strong controls to preserve

- **Rakdos — hero and How This Plays:** “the act, the audience, and the consequence” plus “the deck as a dare” are concrete, memorable, and difficult to swap into another identity.
- **Orzhov — How This Plays:** “the deck as a ledger” makes debt, attacks, death, and favors cohere in one distinct table image.
- **Lorehold — hero and Start With This Commander Plan:** ruins, lessons, spirits, artifacts, and history attacking back establish a recognizable college voice.
- **Prismari — hero:** “magic and art,” medium, technique, expression, and performance are specific without requiring generic personality-test abstraction.
- **White — hero:** “peace is not a mood … rules that hold, shelter that lasts” is compact and trustworthy; the lower grammar defect should not trigger a rewrite of this control.

These controls show that Vox Mana can sound natural and identity-aware inside the existing authority. The audit does not support a wholesale voice reset.

## Owner Review queue

Use `/archscry/?vm-dev-review=1` → **Dossier Review**. Review only the named sections.

| # | Identity | Exact section(s) | Defect hypothesis / locating snippet | Why human judgment is required |
| ---: | --- | --- | --- | --- |
| 1 | White | Test the Fit → Check the boundary | `This is less likely to fit when if rules …` | Confirm this is visibly trust-breaking and that the otherwise strong White voice should be preserved. |
| 2 | Temur | Start Here → Start With This Commander Plan; Test the Fit → A useful self-check | both repeat resources, signal/opening, dragons/copying/counters/force, and attunement | Decide which section actually earns the idea and which should become additive. |
| 3 | Lorehold | Start Here; How This Plays | `history attack back`, artifact recursion, Spirit tokens, graveyard artifacts | Judge whether vivid distinctiveness outweighs the repeated mechanics inventory. |
| 4 | Boros | Test the Fit; How This Plays | `visible harm answered now`; `line is public`; `Pressure through action …` | Same-color positive control against Lorehold; judge whether the pair sounds genuinely distinct. |
| 5 | Orzhov | Test the Fit; How This Plays | `deck as a ledger`; debt / deals / hierarchy / repayment | Same-color control for the Silverquill comparison and a strong natural metaphor. |
| 6 | Silverquill | Hero; Start Here; How This Plays | language/rhetoric appears in each, plus `Pressure through rhetoric …` | Decide whether necessary boundary repetition has crossed into over-explanation. |
| 7 | Yore | Start Here; Test the Fit; How This Plays | artifacts/sacrifice/recursion/control/value engines repeat; `not the source of the name or identity` | Boundary-critical case where compression must not blur the non-Green distinction. |
| 8 | Ink | Start Here; Test the Fit; How This Plays | commons/gift/guarded abundance/anti-hoarding recur under several headings | Four-color case for deciding how much repeated boundary language is necessary. |
| 9 | WUBRG | Start Here; How This Plays | Domain/converge/sunburst/WUBRG/mana-infrastructure list repeats almost exactly | Strongest machine-detectable within-dossier duplication; judge which section should own it. |
| 10 | Rakdos | Hero; How This Plays | `act, audience, consequence`; `deck as a dare` | Positive control for natural, distinctive voice that remediation should not flatten. |

The queue covers mono, guild, college, wedge, four-color, five-color, same-color comparisons, Yore boundary language, worst grammar, worst internal duplicate, and a positive control. The Owner is not being asked to prove any machine-counted duplication.

## Remediation recommendation

Recommend a **mixed, field-role consolidation** rather than an all-37 rewrite.

The smallest systemic correction is:

1. reduce or consolidate approximately 10–12 exact shared instructional sentences in the composer/UI, retaining only explanations that add unique utility or trust value;
2. make the five approved Test the Fit / How This Plays field roles body-owned rather than frame-owned, removing the universal lead-ins from the authoritative source through the existing producer contract instead of hiding them with a global word ban;
3. repair the five mono `when if` sources and add a field-level grammar invariant so the catalog cannot promote the same defect class;
4. resolve the 14 measured cross-section candidates at the section-role level, using the 10-case Owner queue to decide which paragraph owns each idea;
5. preserve the strong controls and all factual, identity, card, Commander, and Placement authority.

Estimated scope: roughly 10–12 shared composer strings, five public-copy field families across the existing 37-record source/catalog producer, five certain mono grammar repairs, and a targeted set drawn from 14 redundancy candidates. This is materially smaller than bespoke rewriting of every paragraph in all 37 dossiers.

## Launch assessment

**Launch-critical remediation.** The copy remains factually governed and usable, so this is not a Placement or route blocker. It nevertheless fails the Owner's explicit launch-quality requirement because a normal cross-dossier reading exposes universal frames, repeated instructions, duplicated gameplay inventories, and five obvious grammar errors.

## Exactly one next story

**Placement Language Field-Role Consolidation** — mixed source/composer remediation; no ID assigned or implementation begun.

Acceptance criteria:

1. The approved dossier source and producer preserve all 37 identity meanings while removing universal frame text from the five affected Test the Fit / How This Plays roles; malformed conditional grammar cannot enter the generated catalog.
2. Shared composer/UI prose is reduced to the smallest useful set, and no substantial exact instructional sentence appears in all 37 dossiers unless a documented comprehension or trust role requires it.
3. Each of the 14 VM-595 redundancy candidates receives a preserve/consolidate/rewrite disposition at its owning layer, with no Placement, mapping, scoring, qualification, card-fact, or generated-artifact hand edit.
4. Deterministic all-37 rendered checks pass, and Owner review is limited to the 10 VM-595 cases plus any changed positive control required to protect natural identity voice.

Stop after Owner Review. Do not implement this story inside VM-595.

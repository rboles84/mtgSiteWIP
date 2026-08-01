# VM-551 Copy, Evidence, Recommendation, and Rendering Audit

## Copy-generation inventory

The 37-identity corpus is exported in `copy-comparison-corpus.json`. Each record includes the golden-path result, selected questions, decree, hero, signal copy, summary strip, Commander path, reading omens, archetypes, Commander candidates, precon lanes, presentation record, dossier audit, and complete rendered text.

The source of each public layer is mixed:

| Public layer | Primary source | Conditional behavior |
|---|---|---|
| Title/tagline/philosophy/lore/tension | `data/factions.json` and model identity metadata | Identity substitution only. |
| Decree | `buildAdaptiveDecree` plus faction voice/content | Top and runner-up plus recent evidence. |
| Hero narrative | `buildHeroNarrative` | Shared template; a small set of identity/pair overrides. |
| Reading signal | `buildReadingSignalCopy` | Shared strength language; limited pair overrides. |
| Result summary | `buildResultSummaryStrip` | Numeric adjacent plus shared contrast and Commander-path fragments. |
| Answer omens | `buildDossierReadingOmens` | Converts evidence-trail signals into identity/Commander interpretation. |
| Adjacent explanation | `explainAdjacentFit` / `resolveSummaryAdjacentFit` | Positive adjacent evidence when available, otherwise identity fallbacks. |
| Commander path/table caution | hard-coded guidance plus curated identity data | Not generated from a validated answer-to-recommendation contract. |
| Card signals | taxonomy + optional Scryfall/flavor indexes | Optional and corpus-snapshot dependent. |
| Precons | generated precon catalog/taxonomy | Exact or one-extra-color lane plus phrase/tag/profile ranking. |
| Maze paths | taxonomy and presentation routing | Exploration handoff, not placement evidence. |

## Systematic copy comparison

- All 37 primary dossiers generated without the dossier audit's hard failure.
- All 37 generated one or more dossier warnings; the internal warning contract is therefore not discriminating at current content quality.
- No normalized exact duplicate was found in the decree, hero, reading-signal, or full rendered-text fields.
- After identity-name normalization, 609 of 666 decree pairs exceeded token Jaccard 0.65. The result is identity-detailed but heavily template-shaped.
- Fourteen reading-signal pairs exceeded 0.65. Hero and full rendered dossier text did not cross that threshold.
- Shared structure is not itself a defect, but it often carries certainty and causal language that the evidence trail does not entail.

Material copy defects:

1. A runner-up can be described as adjacent even when its serialized share is 1%.
2. The same adjacent page can say `Strong adjacent signal`, `Emerging`, and `1%`.
3. The adjacent body emitted `with a emerging signal`.
4. Answer omens repeatedly translate an abstract response into a specific Commander/table claim without a claim-level bridge.
5. Table-perception prose says how opponents feel or learn as a generalized fact; it should be qualified as a possible play pattern.
6. Primary and adjacent views reuse identity-owned Commander claims even when the selected answers supplied no direct evidence for that deck behavior.
7. Confidence bands are applied to uncalibrated shares and become more authoritative through prose such as “landed cleanly.”
8. The all-sections page repeats core identity philosophy and direction text across hero, Placement, Why This Fits, and summary blocks.

## Claim-evidence register

`claim-evidence-register.csv` contains 1,224 rows:

- 868 raw identity claims.
- 356 live answer/copy claims.
- 449 raw claims heuristically classified as official-source-supported within their recorded scope.
- 417 raw claims classified as internal synthesis/editorial interpretation grounded in cited sources.
- 2 raw claims with missing provenance.
- 356 live answer mappings with no answer-level claim/source link.

The official/editorial count is an audit-routing heuristic based on recorded source metadata, not a new canon determination. Every public claim must still be checked for scope and interpretive level.

CECOS boundary assessment:

- Official lore/mechanics facts may support identity context.
- Community Commander patterns may support a qualified heuristic.
- Editorial synthesis may support exploration language when labeled.
- None of those automatically proves how a player behaves or what they should build.
- An answer choice is a product observation, not source evidence.
- A placement result is a derived product output, not evidence for itself.

The largest grounding gap is not the raw identity corpus; it is the missing bridge from player answer -> controlled signal -> identity evidence -> permitted public claim.

## Recommendation audit

The primary 37-identity corpus surfaced 101 recommendation entries:

- 66 from `commander_compass`.
- 17 from starter-legendary staples.
- 18 deck links routed through the same recommendation collection.
- 82 non-deck-link names matched the committed Commander index and all 82 had exact expected color identity.
- One recommendation, `Hearthhull, the Worldseed`, was absent from the committed Commander index.

The missing Hearthhull row is not an illegal recommendation. Current official Edge of Eternities release notes state that a Spacecraft with printed power and toughness can be a commander. The local index, last downloaded 2026-05-15, detects practical candidates but explicitly does not attempt perfect legality solving; it missed this non-creature commander rule. This establishes both a stale-data limit and a legality-resolver gap.

Recommendation evidence classifications:

| Recommendation property | Current support | Audit conclusion |
|---|---|---|
| Color identity | Local index comparison for 82 cards | Exact for all locally matched candidates. |
| Commander legality | Practical local detector plus curated records | Not fully proven; special commander rules can be missed. |
| Currentness | Scryfall bulk snapshot updated 2026-05-14 | Stale relative to the 2026-08-01 audit. |
| Identity appropriateness | Curated identity records | Editorially reviewed in places, not answer-evidence-derived. |
| Behavioral alignment | Identity tags/phrases/guidance | Useful heuristic, not empirical player fit. |
| Popularity | Occasional prose or curated choice | No current popularity dataset/contract. |
| Strategic suitability | Narrative and taxonomy match | Not proof that the player should build it. |
| Precon legality | Exact identity or one-extra-color stretch lane | Stretch must not be described as exact identity. |

Required public separation:

- placement interpretation,
- color-identity legality,
- mechanical similarity,
- strategic recommendation,
- popularity signal,
- editorial exploration.

No placement result should say or imply that the user ought to build a named commander. Recommended language is “an example to inspect because…” with the reason and evidence class shown.

## Runtime rendering audit

Representative path: four all-five-integration Gate answers, a WUBRG Hall answer, then `Build from the rot`. This produced WUBRG primary at 92%, Golgari rank two at 1%, and Rakdos rank three.

Desktop (1265x720) observations:

- Correct WUBRG title, primary status, Golgari/Rakdos adjacent cards, Commander/Maze sections, and generic route metadata rendered.
- No duplicate element IDs, empty visible sections, page-wide horizontal overflow, console warnings, or console errors were observed.
- `View All` produced a 10,059 px page. Major dossier sections were not represented as semantic headings; only the dossier H2 and identity H3 appeared in the visible heading map.
- Core WUBRG philosophy sentence appeared three times in the all-section result.
- Keyboard activation of the `Adjacent Fits` tab with Enter selected the expected panel.

Mobile (390x844 override; document client width 375) observations:

- No page-wide horizontal overflow.
- The tab rail is horizontally contained; later tabs sit outside the initial viewport and require horizontal discovery.
- No clipping was found outside the scrollable tab rail.
- The all-section result reached 17,159 px height.

State observations:

- Completed result restored after refresh within the same origin/session.
- A clean-origin direct `?view=WUBRG&panel=placement` URL showed the landing experience; it did not independently resolve a result.
- One answered question was lost after refresh and the experience returned to landing.
- Primary-to-adjacent view worked without changing the original result.
- Generic document title, description, social title, and canonical URL remained fixed at `/archscry/`.

## Rendering requirements derived

1. Use one reviewed strength state across hero, summary, panel, metadata, and adjacent copy.
2. Give all major dossier sections semantic headings in both focused and all-section layouts.
3. Preserve scrollable mobile tabs but add a discoverable overflow affordance and test keyboard scroll/focus.
4. Treat clean deep links as invalid unless backed by a validated saved-result reference.
5. Either persist partial state with model/version validation or warn that refresh discards it.
6. Align shareability metadata with actual route semantics; do not imply that query state is a durable identity result.
7. Qualify table-perception and deck-style text as possible expressions, not facts about the player or opponents.

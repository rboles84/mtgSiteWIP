# Placement Language Contract

## Core claim chain

Every public placement explanation must keep four layers separate:

1. **Answer:** what the player literally selected.
2. **Observation:** the bounded table preference stated or reasonably entailed by that answer.
3. **Signal effect:** the controlled identity signal/delta the authored model applied.
4. **Limit:** what the answer and score do not prove.

Required pattern:

> You chose **{answer title}** for **{question context}**. In this reading, that was treated as **{bounded observation}** and contributed to **{identity signal}**. It does not establish **{unsupported trait, motive, deck behavior, or correctness claim}**.

When stable answer identifiers or provenance are absent, Gate A may quote the recorded prompt/title from `evidence_trail`; it must not invent an ID. Stable IDs/provenance repair remains Gate B1.

## Reusable before/after specification

| Surface | Current pattern | Gate A pattern | Likely source |
|---|---|---|---|
| Initial reveal | Immediate rank-one dossier or “the glass has spoken.” | State heading, named identity only when permitted, one bounded answer summary, visible limitation, then Open dossier. | `index.js:finalizeQuickReading()`, `revealDecree()` |
| Primary statement | “This is your primary … fit.” | “Among the identities scored by this reading, {Identity} is the current best fit for the recorded answers.” | `commander-dossier.js:buildCommanderDossier()` |
| Shape of the Reading | “Why X Rose First” plus percent/band. | “What moved this reading toward X” plus two answer-grounded observations and state card. | `index.js:buildDiscoverySummaryHtml()`, `archscry-presentation.js` |
| Why This Fits | Identity thesis presented as about the user. | Separate “Your recorded signals” from “How this identity is expressed in Vox Mana.” | `buildDossierInterpretationHtml()`, `buildLayeredIdentityHtml()` |
| Signals From Your Answers | Authored omen copy may blend answer and identity. | Show answer → observation → contributed signal → limitation. | `commander-dossier.js:buildReadingOmens()` |
| Close alternative | “Adjacent fit,” “nearby,” strength band. | “Close alternative under this reading’s relative comparison rule”; show exact supporting observations and return to original. | `resolveSummaryAdjacentFit()`, adjacent panel, hero/status |
| Decree contract | Stored decree says an identity recognizes the player/stronger match and is rendered by the optional terminal reveal. `buildCommanderDossier()` carries `decreeCopy`, but the browser dossier, text renderer, and audit do not currently consume it. | Preserve stored `decree`/`decreeCopy`; use a separate bounded public copy only at a proven existing reveal/consumer. Do not add a new dossier decree surface in Gate A. | `buildAdaptiveDecree()`, `index.js:revealDecree()`, `buildCommanderDossier()` |
| Table behavior | “Opponents feel/read…” as fact. | “A Commander deck built around this expression may be read as…” | `buildPlayPatternSummary()`, presentation records |
| Commander recommendation | “This is where the reading leads.” | “If this expression sounds useful, these are identity-legal/curated starting points to inspect; placement does not prove you should build them.” | `buildCommanderStartingLane()`, recommendation cards |
| Matrix explanation | Numeric profile may look like measurement. | “Authored identity shape across five editorial axes; not placement score or confidence.” | `vm-radar.js:MATRIX_NOTE`, `dossier-radar.js` |
| Legacy result | Fabricated numeric strength and retake-to-unlock copy. | “Legacy reading — {Identity} was saved, but answer/evidence detail is unavailable. Retake only if you want a current explanation.” | `shared.js:makeLegacyPlacementResult()`, result renderer |
| Insufficient/mixed | Falls through to rank one. | State-specific explanation; no owned primary or identity recommendation unless contract permits it. | New additive state renderer |

## Claim rules

- “Your answers…” is preferred to “You are…”, “you trust…”, “you want…”, or “X recognizes you.”
- Use “favored,” “contributed,” “was interpreted as,” and “in this reading” for modeled effects.
- Identity definitions may explain Vox Mana’s authored identity, but must be visually/sequentially separate from claims about the user.
- Deck mechanics and Commander recommendations are possible expressions, not evidence that selected answers predict a specific deck.
- Table perception is conditional and belongs in Commander translation, not placement rationale.
- Lore may illustrate identity context; it does not prove player behavior.
- Never call numerical ranks two/three adjacent, neighboring, or philosophically related without a semantic contract.
- Never expose a softmax share, gap, band, or Matrix axis as confidence.

## Representative examples

Examples are reusable contracts, not final all-37 dossier rewrites. Bracketed evidence must be populated only from the actual recorded trail.

### Boros

Before: “Boros recognizes the shape of your game… Boros was the stronger match.”

After:

> **Current best fit: Boros.** Your answers most consistently favored visible intervention, responsibility, and acting before the opportunity closes. In this reading those choices contributed to Boros’s Protective Intervener signal. They do not prove an enduring personality, a preferred power level, or that every Boros commander will suit you.

### Izzet

> **Current best fit: Izzet.** Your recorded choices favored testing an opening, learning through iteration, and accepting some uncertainty in exchange for discovery. The authored model treated those observations as support for Izzet’s Experimental Spark. This does not by itself establish spectacle, chaos, combo preference, or a specific deck style.

### Prismari

> **Current best fit: Prismari.** Your recorded choices favored felt expression and making the moment itself part of the result. The model treated those observations as support for Prismari’s Elemental Expressionist. This is not interchangeable with every blue-red experiment, and it does not prove that you prefer high-variance or high-power play.

Izzet/Prismari copy must name the discriminator actually present in the trail: iterative experiment versus expression/performance. Same colors are not evidence of equivalence.

### Bant

> **Current best fit: Bant.** Your answers favored accountable strength carried for a living community, with planning and protection supporting that responsibility. The model treated those observations as support for Bant’s Communal Champion. This does not prove a fixed social role or that opponents will experience every Bant deck the same way.

### Colorless

> **Current best fit: Colorless.** Your answers favored a chosen construction constraint and solving within a narrower resource vocabulary. The model treated those observations as support for the Outside-System Architect. This does not mean generic mana, all artifacts, Eldrazi, Devoid, or five-color Eldrazi are interchangeable with Colorless.

### WUBRG

> **Current best fit: Five-Color / WUBRG.** Your answers supported integrating several distinct approaches without treating one as the whole answer. The model treated those observations as support for the Full-Spectrum Integrator. This does not prove that generic goodstuff, maximum color access, or every five-color commander fits your goals.

### Yore (four-color)

> **Current best fit: Yore / Artifice.** Your answers favored constructed agency when inherited or natural limits felt final. The model treated those observations as support for the Engineered Agency Architect. This does not make every WUBR artifact, recursion, control, or combo shell a Yore expression.

### Tied result

> **This reading ended tied: Izzet and Prismari.** The stored scores did not separate them. Your answers supplied evidence for both iterative experiment and expressive performance. This tie does not tell us which distinction matters more to you; compare the two identity descriptions or retake later.

### Close result

> **Close result: Izzet, with Prismari also supported.** Izzet is the current numerical leader. Prismari remained close under the reading’s bounded comparison rule and received direct support from **{recorded answer}**. “Close” is relative within this reading, not a confidence percentage or semantic-adjacency claim.

### Insufficient result

> **Not enough evidence to distinguish a fit.** The available record does not contain enough usable directional detail for a named placement. No identity-specific recommendation is shown. Continue or retake the reading rather than treating the stored numerical leader as a conclusion.

### Legacy result

> **Legacy reading — Boros was saved.** This record does not contain the answer and evidence detail needed to describe why or how strongly. The Boros dossier and Matrix can still be explored as identity context; they do not reconfirm the historical placement.

## Template boundaries

Gate A changes reusable presentation functions/templates, not all 37 authored identity dossiers:

- replace `buildSignalStrengthCardHtml()` with state-card rendering;
- add safe reveal/status/decree copy helpers in the presentation layer;
- constrain `buildReadingSignalCopy()` and `buildHeroNarrative()` to recorded evidence and identity-context separation;
- change `resolveSummaryAdjacentFit()`/summary labels to optional Close alternative behavior;
- qualify summary, table, and recommendation lead-ins in dossier rendering;
- preserve identity records, canonical semantics, recommendation datasets, and stored `decree`/reason fields.

Identity-specific copy exposed by these templates still requires regression examples for Boros, Izzet, Prismari, Bant, Colorless, WUBRG, and a four-color identity before implementation acceptance.

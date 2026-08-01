# VM-551 Placement Voice and Explanation Audit

Machine traces: `explanation-trace-audit.json`.

## Full-experience voice

| Surface | Current promise / tone | Audit disposition |
|---|---|---|
| Landing | Identity reading with mystical discovery framing | Distinctive, but accuracy/identity language needs an explicit editorial-exploration boundary before answering. |
| Quick Reading | Implies a fast path to a meaningful placement | Overpromises when forced abstract answers, adaptive branch exclusions, and no unknown state can still produce a named result. |
| Gate / Hall / Crucible | Ritualized progression and escalating discernment | Strong product voice; terminology can hide that Gate is mandatory broad scoring, Hall is top-five routing, and Crucible is conditional numeric-pair disambiguation. |
| Questions | Poetic, scenario-driven, identity-flavored | Frequently high abstraction, mood-dependent, double-barreled, or low in direct Commander relevance. |
| Answers | Evocative fragments and compact explanations | Often blend observation, philosophy, motive, social stance, aesthetic, and lore; no explicit uncertainty answer. |
| Progress | Presents forward movement toward resolution | Does not explain branch exclusion, stopping uncertainty, discarded partial state, or whether enough evidence exists. |
| Result reveal | “Recognizes the shape of your game” and named archetypal title | Diagnosis-adjacent when the evidence is forced/editorial; disclaimer arrives after confident identity language. |
| Confidence | Numeric share plus strength prose | Fake precision: arbitrary softmax share is not calibrated confidence. |
| Primary | Identity-owned behavior and Commander translation | Broader than selected evidence; may infer motivation/deck/table behavior. |
| Adjacent | Rank-two/rank-three framed as meaningful neighboring fit | Numerical proximity is mistaken for conceptual adjacency, including very weak shares. |
| Source visibility | Sources live mainly in underlying identity data/Apocrypha | Answer-to-signal and signal-to-copy derivations are not visible or traceable. |
| Commander translation | Concrete commander/precon/archetype examples | Useful exploration, but looks personalized by answer evidence when mostly identity/color/tag curated. |
| Strategium consistency | Shared interpretive language and guidance posture | Must remain a downstream route; Strategium framing cannot become placement evidence. |
| Maze handoff | Search packages based on identity/color/taxonomy | Appropriate as exploration if labeled; not proof of identity or personalized card fit. |

## Cross-cutting voice defects

- Generic personality-test framing: archetypal titles and “your answers repeatedly expressed” compress mixed product choices into a stable-seeming self-description.
- Fake precision: softmax percentages and strong/emerging bands imply measured correctness.
- Diagnosis-like claims: disclaimers say “not a diagnosis,” but confident behavioral/motivational sentences still sound diagnostic.
- Unsupported motivation: several templates convert a selected scenario preference into why the player acts.
- Table perception as fact: opponent reactions are described as if observed.
- AI-shaped repetition: all 37 dossiers are content-rich, yet decree syntax is strongly shared and repeated transitions make identity differences feel post-hoc.
- Terminology opacity: mystical stage names are not accompanied by the actual evidence/branch meaning.

## Explanation traces

The JSON contains traces for:

- mono-color (Blue);
- guild (Izzet);
- college (Prismari);
- shard (Bant);
- wedge (Mardu);
- four-color (Glint);
- Colorless;
- WUBRG;
- a guild/college collision (Witherbloom/Golgari boundary);
- an exact tie;
- a weak rank-two result labeled adjacent;
- the requested negative-only case.

Each runnable trace records exact answer, free-text observation signal, controlled-signal absence, applied positive/suppression/inhibition deltas, branch path, final rank, displayed share, public strength language, decree claims, adjacent claims, Commander recommendations, and Maze/other handoff.

The negative-only trace is deliberately `NOT-INSTANTIABLE`: corrected delta-level analysis finds zero genuine negative-only winners. Fabricating a trace would repeat the rejected audit’s evidence error. The 2,901 below-minimum strong-hit proxy paths are the correct weak-evidence population for future stratified review.

## Explanation contract required

For the first implementation pass, every result sentence must be reconstructable as:

```text
selected answer
  -> bounded observation (not motive)
  -> controlled signal or explicit unresolved mapping
  -> score effect and dependency group
  -> decision state (primary / tied / close / insufficient)
  -> qualified explanation claim
  -> separately typed exploration recommendation
```

If any link is missing, the output must fall back to uncertainty or a simpler observation summary rather than generating a confident identity claim.

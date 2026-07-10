# Phase 1 Supplement - MTG / Commander Recurring Idea Candidates

These are candidate recurring ideas mined from Vox Mana's faction files, placement logic, dossier presentation, and research/vault docs. They are written as blog-side through-lines, not product copy.

## 1. Magic Has A Hidden Middle Layer

**The claim:** Magic becomes more useful when you read the layer between card text, lore, color philosophy, mechanics, and table behavior.

**Definition:** Vox Mana is not just sorting players into colors or recommending cards. It keeps translating from source-backed identity to play pattern to Commander table meaning, so players can understand why a deck feels the way it feels.

**Where it recurs:** High recurrence across `assets/js/archscry-presentation.js` dossier fields (`tableRole`, `opponentRead`, `emotionalPressure`, `loreRole`, `mechanics`, `tableExperience`, `thesis`, `selfCheck`); `assets/js/commander-dossier.js` commander plans/spellcraft/table caution rules; `data/raw-factions/**` profile + placement packets; `docs/research/canon/strixhaven/lorehold/lorehold_narrative_taxonomy.md`; `docs/research/canon/strixhaven/lorehold/lorehold_translation_layer_functions.js`.

**Why it's ownable:** The project keeps treating Magic as an interpretive system with a table-facing layer, not as trivia, decklists, or personality typing.

**Blog fit:** Table Talk, Learning Lab, QA Field Guide. Connects to the existing "reducing uncertainty" idea because the hidden layer is made useful only when it becomes observable.

**Strength:** High - repeated across placement, faction packets, presentation copy, and research translation layers.

## 2. Commander Is Applied Color Philosophy

**The claim:** Commander turns color philosophy into a public table promise: what your deck threatens, protects, delays, spends, reveals, or makes everyone answer.

**Definition:** In Vox Mana, Commander identity is not just legal color access. It is the format where abstract color/faction convictions become table roles, threat posture, pacing, restraint, and social pressure.

**Where it recurs:** High recurrence in `assets/js/commander-dossier.js` (`COMMANDER_FACTION_GUIDANCE`, `COMMANDER_PATH_RULES`, exact Commander identity package queries, table caution text); `assets/js/archscry-presentation.js` table-role and self-check copy; `docs/reference/commander-faction-guidance.md`; raw packets such as `data/raw-factions/wubrg/wubrg.profile.json`, `data/raw-factions/glint/glint.profile.json`, and `data/raw-factions/colorless/colorless.profile.json` where Commander support is explicitly separated from lore/placement proof.

**Why it's ownable:** This is more specific than "color identity matters." It frames Commander as the applied lab where philosophy becomes visible to other people.

**Blog fit:** Table Talk, Learning Lab, Automation Cookbook if discussing search/query tools that support identity-aware browsing.

**Strength:** High - very visible in dossier presentation and Commander guidance.

## 3. Same Colors Are Not Same Identity

**The claim:** Shared mana colors are a starting constraint, not an identity verdict.

**Definition:** Vox Mana repeatedly distinguishes color pair from expression layer: Izzet is not Prismari, Boros is not Lorehold, Golgari is not Witherbloom, and broad color access is not proof of fit.

**Where it recurs:** High recurrence in `docs/design/placementLogic_deep-research-report.md` on same-color duplicate pairs and "layered classification"; raw profiles for `data/raw-factions/izzet_league/izzet_league.profile.json` and `data/raw-factions/prismari/prismari.profile.json`; `docs/reference/commander-faction-guidance.md` bleed warnings; `assets/js/commander-dossier.js` banned phrases / bleed warnings / table-caution review rules; `data/raw-factions/azorius_senate/azorius_senate.placement.json` warning not to score from color identity alone.

**Why it's ownable:** This is one of Vox Mana's clearest MTG convictions: colors are necessary evidence, but not enough evidence.

**Blog fit:** QA Field Guide, Learning Lab, Table Talk. Strong bridge to "coverage is not confidence": color coverage is not placement confidence.

**Strength:** High - repeats in architecture critique, source packets, generated guidance, and dossier safeguards.

## 4. Absence Is Evidence

**The claim:** What an identity excludes can be as meaningful as what it includes.

**Definition:** Four-color identities, Colorless, and WUBRG only work when absence and boundary are modeled positively. Missing White, no WUBRG colors, and all five colors each carry different evidence burdens.

**Where it recurs:** High recurrence in `docs/design/placementLogic_deep-research-report.md` on four-color missing-color channels and Colorless boundary evidence; `data/raw-factions/glint/glint.profile.json` ("UBRG without White"); `data/raw-factions/colorless/colorless.profile.json` (outside-WUBRG branches and false-positive boundaries); `data/raw-factions/wubrg/wubrg.profile.json` (integration vs goodstuff drift); `assets/js/archscry-presentation.js` four-color presentation entries for Yore/Glint/Dune/Ink/Witch.

**Why it's ownable:** This is a distinctive systems-thinking move inside Magic: treating absence as a real signal instead of an empty slot.

**Blog fit:** QA Field Guide, Learning Lab, Table Talk. Connects to risk/evidence posts because negative evidence prevents false positives.

**Strength:** High - a durable architecture and lore-placement principle.

## 5. Placement Is A Reading

**The claim:** A placement should be definite inside its model but honest about being interpretive, unofficial, and evidence-based.

**Definition:** Vox Mana avoids both fake objectivity and mushy hedging. It can say "best fit" while showing confidence, adjacent matches, evidence trail, and canon boundaries.

**Where it recurs:** High recurrence in `assets/js/adaptive-placement.js` evidence trail, stage history, confidence, adjacent matches, and decree text ("not an objective diagnosis or official canon"); `data/raw-factions/*/*.placement.json` `never_claim_as_canon` and interpretation warnings; `docs/design/placementLogic_deep-research-report.md` on results language; `docs/reference/source-generated-guardrails.md`.

**Why it's ownable:** It combines fandom playfulness with QA discipline: the reading can have a point of view without pretending to be canon or psychology.

**Blog fit:** QA Field Guide, Learning Lab, Table Talk. Strong bridge to "QA owns quality by making risk visible."

**Strength:** High - core placement posture and source-boundary discipline.

## 6. The Near Miss Teaches

**The claim:** Adjacent fits are not noise; they explain the shape of the primary fit.

**Definition:** Vox Mana treats runner-up identities, close rivals, lateral inhibition, and Crucible questions as part of the user's understanding rather than just discarded alternatives.

**Where it recurs:** Medium-high recurrence in `assets/js/adaptive-placement.js` top matches, adjacent matches, confidence gaps, Hall/Crucible selection, and "remained adjacent" reasons; `docs/design/placementLogic_deep-research-report.md` on close rivals and pairwise discrimination; raw placement files with collision targets and suppressions such as `data/raw-factions/azorius_senate/azorius_senate.placement.json`; `assets/js/archscry-presentation.js` self-checks and close reasons.

**Why it's ownable:** The project does not just declare a winner. It uses the shape of the almost-winner to teach the boundary.

**Blog fit:** Learning Lab, QA Field Guide, Table Talk.

**Strength:** High - repeatedly built into scoring, UX, and source packets.

## 7. Lore Should Touch The Table

**The claim:** Lore earns its place when it changes how a player understands play, pressure, choices, or deck texture.

**Definition:** Vox Mana does not use lore as decoration. It translates lore into table roles, mechanical signals, false-positive guardrails, Commander support texture, and player-facing self-checks.

**Where it recurs:** High recurrence in `assets/js/archscry-presentation.js` `loreRole` plus `mechanics` plus `tableExperience`; `docs/research/canon/strixhaven/lorehold/lorehold_narrative_taxonomy.md` and `lorehold_structural_matrix.json`; raw faction profiles' `mechanics_and_play_pattern`; `docs/reference/commander-faction-guidance.md`.

**Why it's ownable:** The stance is not "lore matters." It is "lore matters when it becomes playable understanding."

**Blog fit:** Table Talk, Learning Lab, Automation Cookbook when discussing lore-to-query or lore-to-search translation.

**Strength:** High - central to the project voice and the dossier design.

## 8. Mechanics Are Echoes, Not Proof

**The claim:** A mechanic can support an identity, but it should not become the whole identity by itself.

**Definition:** Vox Mana repeatedly warns against turning one mechanic, card type, commander, or deck shell into placement proof. Mechanics are treated as texture that must fit the broader evidence cluster.

**Where it recurs:** High recurrence in `data/raw-factions/glint/glint.profile.json` (cascade/chaos as support-only, not proof); `data/raw-factions/wubrg/wubrg.profile.json` (mana fixing/goodstuff not proof); `data/raw-factions/colorless/colorless.profile.json` (artifacts, Eldrazi, Wastes, Devoid not interchangeable); `docs/reference/commander-faction-guidance.md` table-caution templates; `assets/js/commander-dossier.js` banned phrases and review rules.

**Why it's ownable:** This is a Magic-specific version of source discipline: don't confuse a visible surface with the underlying system.

**Blog fit:** QA Field Guide, Table Talk, Automation Cookbook.

**Strength:** High - recurs across boundary-heavy packets and commander guidance.

## 9. The Deck Is A Social Signal

**The claim:** A Commander deck communicates before it wins: it tells the table what kind of pressure, trust, threat, or bargain has entered the room.

**Definition:** Vox Mana's dossier repeatedly describes how opponents experience a deck, not only what the pilot likes. That makes Commander identity relational and social, not just internal taste.

**Where it recurs:** Medium-high recurrence in `assets/js/archscry-presentation.js` `opponentRead`, `emotionalPressure`, and `tableExperience`; `assets/js/commander-dossier.js` table caution text and table-facing plans; Silverquill/Orzhov/Dimir/Boros/Rakdos guidance around social leverage, obligation, public threat, secrecy, and spectacle.

**Why it's ownable:** It reframes deck identity as communication in a multiplayer social system.

**Blog fit:** Table Talk, Learning Lab.

**Strength:** Medium-high - very strong in presentation, somewhat less explicit in source architecture.

## 10. Source-Governed Imagination

**The claim:** The most interesting fan-made Magic interpretation needs stricter source boundaries, not looser ones.

**Definition:** Vox Mana is imaginative, but it keeps a hard distinction between official source evidence, local synthesis, support-only Commander texture, generated runtime display, and public claims.

**Where it recurs:** High recurrence in `docs/reference/source-generated-guardrails.md`; raw faction `boundary`, `support_only`, `deferred`, and `never_claim_as_canon` fields; `data/raw-factions/wubrg/wubrg.profile.json`; `data/raw-factions/colorless/colorless.profile.json`; `data/raw-factions/glint/glint.profile.json`; source/generated validator contract.

**Why it's ownable:** It is a QA builder's way of doing fandom: freer interpretation through better evidence boundaries.

**Blog fit:** QA Field Guide, Learning Lab, Table Talk.

**Strength:** High - one of the repo's most repeated project governance ideas.

## Better As Post Seeds Than Recurring Ideas

- **Izzet vs Prismari is the proof case** - excellent single post showing why same colors do not equal same identity.
- **Colorless is not empty** - strong post seed about outside-WUBRG identity, but narrower than the broader "absence is evidence" through-line.
- **WUBRG is not goodstuff** - useful Commander article seed about breadth, integration, and false-positive discipline.
- **Lorehold as a translation demo** - strong walkthrough post: axiom to cards to mechanics to table role.
- **Crucible questions as trust builders** - good QA/product post about why close-call questions should feel fair and face-valid.

## Considered And Cut

- **Magic is about identity** - too generic; the repo's stronger claim is about evidence-backed translation into Commander table meaning.
- **Commander is social** - true, but too broad unless sharpened into deck-as-signal or applied color philosophy.
- **Lore matters** - generic; the repo-specific version is that lore must touch table behavior.
- **Decklists are not enough** - true but mostly implied; weaker than "mechanics are echoes, not proof" or "Commander is applied color philosophy."
- **Players need better recommendations** - product-adjacent and too backlog-shaped, not a durable intellectual claim.
- **Every faction has a vibe** - too vague; the repo is stricter about source-backed identity, placement evidence, and false-positive guardrails.

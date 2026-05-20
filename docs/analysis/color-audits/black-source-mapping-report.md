# Black Source Mapping Report

## Scope And Source Boundary

This report maps the generated mono-Black identity, model, Commander guidance, and regression-test concepts back to the allowed source documents used for the Black authoring pass.

Allowed direct sources:

- `docs/architecture/colors/black/identity.md`
- `docs/analysis/color-audits/black-intra-color-audit.md`
- Relevant Black sections of `docs/architecture/system/color-pie-framework.md`
- Relevant Black, UB, BR, WB, and BG sections of `docs/architecture/system/cross-color-dynamics.md`

Important constraint: `docs/architecture/colors/black/metaphysics.md` was not directly read for the Black authoring pass and is not cited here as a direct source. Any metaphysics-adjacent content is attributed only to the summary and analysis that appears inside `docs/analysis/color-audits/black-intra-color-audit.md`.

Generated or authored Black outputs covered:

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- Regenerated runtime artifacts derived from those source changes

## Concept / Claim: Core Black Activation And Identity Shell

- Code: `data/identity-layers.json` -> `expressions.B`
- Concept / Claim: Mono-Black identity shell
- Description: Black is active as mono `B`, with `kind: color`, `world: The Color Pie`, mono-Black routing, no secondary colors, and an identity blend stating Black is expressed without a secondary color.
- Source(s):
  - `docs/architecture/system/color-pie-framework.md` - "The Wheel Structure"; Black is one of the five WUBRG colors.
  - `docs/architecture/system/color-pie-framework.md` - "The Five Fundamental Questions"; Black is a standalone philosophical answer centered on power through any means necessary.
  - `docs/architecture/system/color-pie-framework.md` - "Structural Dimensions: A Comparative Matrix"; Black has its own paradigm, value, ethical frame, self-model, and weakness.
- Type: Structural Borrowing
- Notes: The activation flags, route slugs, JSON shape, and `identity_blend` are Vox Mana implementation structures. The sources establish Black as a standalone color identity; the local data layer expresses that identity in runtime form.

## Concept / Claim: Philosophy, Tagline, And Lore Summary

- Code: `data/identity-layers.json` -> `expressions.B.display.tagline`, `philosophy`, `lore_summary`
- Concept / Claim: Power as self-protection in an indifferent world
- Description: The generated Black copy says power protects agency when no one is guaranteed to rescue you; life, death, loyalty, and resources are costs that can be paid for control; self-preservation is not the same as cruelty.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Identity Overview"; Black is self-preservation in an indifferent world, and power prevents being controlled or erased.
  - `docs/architecture/colors/black/identity.md` - "Core Drive"; power is a tool for personal agency, not an end in itself.
  - `docs/architecture/colors/black/identity.md` - "The Empowerment Doctrine"; Black is agency and control rather than inherent evil.
  - `docs/architecture/colors/black/identity.md` - "Philosophical Framework"; absolute self-interest, cost, transactional reality, and pragmatic realism.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Executive Summary"; recommends the transactional cost framing over pure seizure framing.
  - `docs/architecture/system/color-pie-framework.md` - "The Five Fundamental Questions"; Black seeks power and acts by paying costs for power.
- Type: Paraphrase
- Notes: The exact tagline "Power is protection when no one is coming to save you" is authored Vox Mana wording derived from the identity overview and audit recommendation. It is not a direct quote.

## Concept / Claim: Vox Mana Read And Decree Voice

- Code: `data/identity-layers.json` -> `expressions.B.display.decree_voice`
- Concept / Claim: Black speaks as a survivor who prices every bargain
- Description: The generated decree voice is clear-eyed, unsentimental, and empowering. It frames Black as asking what can be paid, reclaimed, and converted into leverage so fate stays self-owned.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Vox Mana Read (Core Axiom)"; Black is willing to pay costs because survival belongs to those who refuse powerlessness.
  - `docs/architecture/colors/black/identity.md` - "The Axiom of Cost"; everything has a price and power belongs to those willing to pay it.
  - `docs/architecture/colors/black/identity.md` - "Transactional Reality"; life, loyalty, and power are resources.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Concept Mapping"; documents the tension between seizure language and cost-willingness language.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Recommendations"; recommends making the transactional version primary.
- Type: Inference
- Notes: The decree voice is presentation-layer language, not a direct source quote. It intentionally follows the audit's transactional recommendation.

## Concept / Claim: Emotional And Psychological Cluster

- Code: `data/identity-layers.json` -> `expressions.B.display.affinity`, `core_tension`, `biological_expression`, `placement`
- Concept / Claim: Self-sovereignty, agency, leverage, and pragmatic clarity
- Description: Generated Black treats survival as personal responsibility, distrusts unsupported fairness, and values leverage, self-sufficiency, and cost-aware agency. Its psychological risk is isolation when every bond becomes a liability.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "The Self-Champion Principle"; every individual must be their own champion and reliance on others is risky.
  - `docs/architecture/colors/black/identity.md` - "The Self-Preservation Principle"; self-protection, future security, and fate control are core.
  - `docs/architecture/colors/black/identity.md` - "Philosophical Weaknesses"; isolation, overextension, and control obsession are Black weaknesses.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Concept Mapping"; Black's emotional tone is ambition, ruthlessness, confidence, pragmatic isolation, and inevitability.
  - `docs/architecture/system/color-pie-framework.md` - "Structural Dimensions: A Comparative Matrix"; Black is the sovereign individual and risks isolation/greed.
- Type: Paraphrase
- Notes: The biological labels `The Self-Sovereign Operator`, `Liberty`, `Authority`, and `high agency risk` are Vox Mana model-authoring interpretations of the source cluster.

## Concept / Claim: Core Tension And Weakness

- Code: `data/identity-layers.json` -> `expressions.B.display.core_tension`, `placement.inhibitor_traps`
- Concept / Claim: Control protects the self but can turn into isolation
- Description: The generated Black identity says power and leverage protect the self, but the same clarity can harden into isolation when bonds are treated as liabilities. Placement traps reject outsourcing survival, equating self-interest with cruelty by default, or refusing asymmetrical advantage under threat.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Philosophical Weaknesses"; isolation, overextension, and control obsession.
  - `docs/architecture/colors/black/identity.md` - "Absolute Self-Interest"; trust is conditional and dependence is vulnerability.
  - `docs/architecture/system/color-pie-framework.md` - "Structural Dimensions: A Comparative Matrix"; Black's weakness is isolation/greed.
  - `docs/architecture/system/color-pie-framework.md` - "Black's Honesty and Cruelty"; Black's noble expression includes self-determination, while its horror includes exploitation.
- Type: Paraphrase
- Notes: This section keeps Black from being flattened into villainy while preserving the risk profile described by the sources.

## Concept / Claim: Affinity: Drawn-To Signals

- Code: `data/identity-layers.json` -> `expressions.B.display.affinity.drawn_to`
- Concept / Claim: Positive Black evidence
- Description: Black is drawn to self-determination without guarantees, power gained by paying costs, resources converted into durable leverage, and death/loss/sacrifice turned into advantage.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Core Drive"; power prevents one's fate from being decided by others.
  - `docs/architecture/colors/black/identity.md` - "The Axiom of Cost"; power belongs to those willing to pay.
  - `docs/architecture/colors/black/identity.md` - "Mechanical Identity"; life payment, tutoring, removal, reanimation, and sacrifice convert resources into advantage.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; pay costs others will not and convert resources aggressively.
  - `docs/architecture/system/color-pie-framework.md` - "Black's Philosophy -> Mechanics"; price, sacrifice, reanimation, and elimination map to mechanics.
- Type: Paraphrase
- Notes: The generated phrasing condenses Black philosophy and mechanics into placement-readable evidence terms.

## Concept / Claim: Affinity: Repelled-By Signals

- Code: `data/identity-layers.json` -> `expressions.B.display.affinity.repelled_by`
- Concept / Claim: Negative Black evidence
- Description: Black is repelled by passive faith in fairness, moral purity that leaves people powerless, dependence presented as virtue, and systems that demand sacrifice without returning agency.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Identity Overview"; there is no guaranteed fairness or external rescue.
  - `docs/architecture/colors/black/identity.md` - "The Reality Principle"; Black accepts and exploits reality as it is.
  - `docs/architecture/colors/black/identity.md` - "Pragmatic Realism"; expecting fairness is weakness and adaptation outranks idealism.
  - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; White vs. Black is altruism vs. egoism.
  - `docs/architecture/system/cross-color-dynamics.md` - "White-Black: The Hierarchy"; WB adds rules, obligation, hierarchy, and mutual benefit structures.
- Type: Inference
- Notes: The repelled-by language operationalizes Black's contrast with White and WB while keeping mono-Black centered on self-owned agency.

## Concept / Claim: Interview Tells And Core Question

- Code: `data/identity-layers.json` -> `expressions.B.display.affinity.core_question`, `interview_tells`
- Concept / Claim: Black asks what cost preserves self-owned fate
- Description: The generated core question asks what the user is willing to pay so fate stays theirs. Interview tells look for survival as personal responsibility, costs, leverage, agency, loss-as-material, and distrust of fairness without power.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Vox Mana Read (Core Axiom)"; willingness to pay costs and refusal to be powerless.
  - `docs/architecture/colors/black/identity.md` - "The Self-Preservation Principle"; protect yourself, secure your future, and prevent external fate control.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; turn loss states into advantage states.
  - `docs/architecture/system/color-pie-framework.md` - "How should one act?"; Black does what benefits the self and pays costs for power.
- Type: Paraphrase
- Notes: The generated question is an adaptive-placement prompt. It is source-informed but not quoted.

## Concept / Claim: Not-To-Be-Confused-With Boundaries

- Code: `data/identity-layers.json` -> `expressions.B.display.affinity.not_to_be_confused_with`
- Concept / Claim: Mono-Black is separated from Dimir, Rakdos, Golgari, and Orzhov
- Description: The generated boundary says Dimir hides leverage through knowledge; Rakdos spends restraint in public intensity; Golgari turns death into ecosystem and cycle; Orzhov makes power visible through debt and obligation.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Color Relationships"; Blue and Red are Black allies, while White and Green are enemies.
  - `docs/architecture/system/color-pie-framework.md` - "Adjacent (Allied) Colors"; UB prioritizes power/capability over ethics and BR embraces freedom from constraint.
  - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; White vs. Black is altruism vs. egoism and Black vs. Green is ambition vs. acceptance.
  - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Black: The Ambition"; UB combines knowledge, planning, optimization, and Black willingness to pay costs.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Red: The Chaos"; BR adds hedonism, immediate gratification, transgression, and sacrifice-forward aggression.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Green: The Cycle"; BG turns death into natural selection, organic growth, recursion, and renewal.
  - `docs/architecture/system/cross-color-dynamics.md` - "White-Black: The Hierarchy"; WB uses hierarchy, debt, obligation, and enforceable roles.
- Type: Inference
- Notes: The separator wording is authored to keep mono-Black from absorbing adjacent or enemy-pair identities.

## Concept / Claim: Mechanical Cluster: Life Payment Engines

- Code: `data/identity-layers.json` -> `expressions.B.display.archetypes`, `staples`, `placement`; `assets/js/commander-dossier.js` -> `COMMANDER_FACTION_GUIDANCE.B`
- Concept / Claim: Life is a spendable resource
- Description: Generated Black recognizes life payment engines, risk-to-reach conversion, life-as-resource Commander guidance, and cards such as Necropotence, Phyrexian Arena, Bolas's Citadel, and K'rrik as fitting mono-Black's center.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Life as a Resource"; Black pays life for cards, mana, or advantage.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; life is a resource, not merely a score.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Mechanical Analysis"; life-as-resource is Black's defining mechanical trait.
  - `docs/architecture/system/color-pie-framework.md` - "Black's Philosophy -> Mechanics"; everything has a price maps to life payment.
  - `docs/architecture/system/color-pie-framework.md` - "Resource Dimension"; Black life-as-resource beats White life protection.
- Type: Paraphrase
- Notes: Specific Commander and staple selections are curated applications of the mechanical cluster and should not be treated as claims made by the source documents.

## Concept / Claim: Mechanical Cluster: Sacrifice And Aristocrats

- Code: `data/identity-layers.json` -> `expressions.B.display.archetypes`, `staples`, `commander_compass`; `research/build-faction-artifacts.mjs` -> Black Hall/Crucible answers
- Concept / Claim: Sacrifice converts expendable material into advantage
- Description: Generated Black includes Aristocrats and sacrifice as repeated exchange: creatures become cards, drain, removal, and inevitability. Yawgmoth and Ayara are used as examples of sacrifice or exchange engines.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Sacrifice Engines (Conversion of Resources)"; creatures or life can be traded for greater advantage.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; convert resources aggressively and create asymmetrical advantage.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Mechanical Analysis"; sacrifice engines are mechanically consistent across audited sources.
  - `docs/architecture/system/color-pie-framework.md` - "Black's Philosophy -> Mechanics"; power at any cost maps to tutoring and sacrifice.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Red: The Chaos"; BR also uses aggressive sacrifice, which informs boundary checks.
- Type: Paraphrase
- Notes: The generated file treats sacrifice as mono-Black when it serves controlled cost and leverage, and as BR-adjacent when it becomes release, appetite, or spectacle.

## Concept / Claim: Mechanical Cluster: Reanimation And Graveyard Use

- Code: `data/identity-layers.json` -> `expressions.B.display.archetypes`, `staples`, `placement`; `research/build-faction-artifacts.mjs` -> `hall_B_graveyard`, `crucible_B_BG`
- Concept / Claim: The graveyard is a resource line
- Description: Generated Black says death is temporary, the graveyard can function like a second resource line, and reanimator control uses death and spent material as future advantage.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Reanimation (Subversion of Death)"; the graveyard is a resource.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; the graveyard is an extension of the hand.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Mechanical Analysis"; graveyard recursion is aligned across audited sources.
  - `docs/architecture/system/color-pie-framework.md` - "Black's Philosophy -> Mechanics"; death is not the end maps to reanimation.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Green: The Cycle"; BG also uses graveyard strategies, death triggers, and recursion through cycle/renewal framing.
- Type: Paraphrase
- Notes: The generated Black-vs-BG separator turns the same graveyard mechanic into a question of personal leverage versus ecological cycle.

## Concept / Claim: Mechanical Cluster: Tutoring And Determinism

- Code: `data/identity-layers.json` -> `expressions.B.display.staples`, `placement`, `display.archetypes`; `assets/js/commander-dossier.js` -> Black guidance
- Concept / Claim: Black rejects randomness when a needed answer can be found
- Description: Generated Black includes Demonic Tutor, deterministic access, and search/library language as evidence of Black's willingness to get the necessary resource directly.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Tutoring (Determinism)"; Black searches for exactly what it needs.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Mechanical Analysis"; tutors are framed as eliminating randomness or deterministic certainty.
  - `docs/architecture/system/color-pie-framework.md` - "Black's Philosophy -> Mechanics"; power at any cost maps to tutoring.
- Type: Paraphrase
- Notes: Exact card selections are implementation examples; the source-backed claim is the deterministic access pattern.

## Concept / Claim: Mechanical Cluster: Removal And Control

- Code: `data/identity-layers.json` -> `expressions.B.display.staples`, `placement`; regenerated runtime artifacts
- Concept / Claim: Obstacles are removed rather than negotiated with
- Description: Generated Black includes removal/control language, Toxic Deluge, and elimination of threats as gameplay-adjacent evidence of Black securing control and leverage.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Removal (Elimination of Threats)"; Black destroys creatures and disrupts opponents.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Mechanical Analysis"; removal is a dedicated primer pillar and implicit in other summaries.
  - `docs/architecture/system/color-pie-framework.md` - "Black's Philosophy -> Mechanics"; eliminate opposition maps to creature destruction.
  - `docs/architecture/system/color-pie-framework.md` - "Mechanical Checks and Balances"; Black checks White by exploiting symmetrical effects and destroying fair game states.
- Type: Paraphrase
- Notes: The generated control framing remains mono-Black when it centers paid control and threat removal, rather than Blue patience or WB oppressive order.

## Concept / Claim: Commander Compass And Dossier Guidance

- Code: `data/identity-layers.json` -> `expressions.B.display.commander_compass`; `assets/js/commander-dossier.js` -> `COMMANDER_FACTION_GUIDANCE.B`
- Concept / Claim: Black Commander recommendations should come from authored mono-Black identity
- Description: Generated Black recommends K'rrik, Ayara, Chainer, Toshiro, and Yawgmoth, and dossier guidance looks for life, sacrifice, graveyard, resource, cost, and shadow language while avoiding generic fallback.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Mechanical Identity"; life payment, tutoring, removal, reanimation, and sacrifice engines.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; resource conversion, asymmetrical advantage, and loss-to-advantage play.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Mechanical Analysis"; life, sacrifice, tutors, graveyard recursion, and removal are aligned Black mechanical signatures.
  - `docs/architecture/system/color-pie-framework.md` - "Black Players"; Black players value efficiency, power, combo, resource conversion, overwhelming advantage, and ruthless optimization.
  - `docs/architecture/system/cross-color-dynamics.md` - UB, BR, WB, and BG pair sections for boundary terms that should not become mono-Black defaults.
- Type: Inference
- Notes: Commander picks, Scryfall/EDHREC URLs, and exact tag choices are local authored data and verification artifacts, not source-document claims.

## Concept / Claim: Land Base And External Routing

- Code: `data/identity-layers.json` -> `expressions.B.display.land_base`, `deck_links`, `routing`
- Concept / Claim: Mono-Black routes to mono-Black Commander discovery paths
- Description: Generated Black uses mono-black EDHREC and MTGDecks routing and lists Black-oriented lands such as Cabal Coffers, Urborg, Takenuma, Castle Locthwain, Bojuka Bog, and War Room.
- Source(s):
  - `docs/architecture/system/color-pie-framework.md` - "The Wheel Structure"; Black is one of the five colors.
  - `docs/architecture/colors/black/identity.md` - "Operator Translation Signals"; Black-aligned queries include sacrifice, pay life, graveyard return, removal, search, death triggers, and recursion loops.
- Type: Structural Borrowing
- Notes: External URL slugs and exact land-base lists are implementation choices. The source documents justify Black's mono-color identity and search semantics, not the particular URL or land curation.

## Concept / Claim: Placement: Good Fit Indicators

- Code: `data/identity-layers.json` -> `expressions.B.placement.good_fit_indicators`
- Concept / Claim: Strong Black placement evidence
- Description: Black fit strengthens when a user treats cost as a tool, protects agency through leverage/self-sufficiency, and turns loss/death/spent resources into future advantage.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "The Axiom of Cost"; cost is the path to power rather than only a warning.
  - `docs/architecture/colors/black/identity.md` - "The Self-Preservation Principle"; self-protection and fate control.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; turn loss states into advantage states.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Mechanical Analysis"; life, sacrifice, graveyard, tutors, and removal are aligned cost/resource signatures.
- Type: Paraphrase
- Notes: These indicators translate source concepts into placement scoring evidence.

## Concept / Claim: Placement: Poor Fit Indicators And Inhibitor Traps

- Code: `data/identity-layers.json` -> `expressions.B.placement.poor_fit_indicators`, `inhibitor_traps`
- Concept / Claim: Black should not trigger on moral cleanliness, passive fairness, or generic darkness
- Description: Generated Black weakens when users require power to feel morally clean, expect fairness to protect without leverage, reject ambition/self-prioritization as inherently corrupt, outsource survival, or confuse self-interest with cruelty by default.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "The Empowerment Doctrine"; Black is not the philosophy of evil but of agency.
  - `docs/architecture/colors/black/identity.md` - "Pragmatic Realism"; expecting fairness is weakness and success is determined by action.
  - `docs/architecture/system/color-pie-framework.md` - "Not Beginner Archetypes"; Black is not simply evil.
  - `docs/architecture/system/color-pie-framework.md` - "Black's Honesty and Cruelty"; noble Black includes self-determination and honest ambition.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Intra-Color Consistency"; supports the honest-villain nuance where present.
- Type: Inference
- Notes: These are guardrails against false positives and against flattening Black into villain-coded aesthetics.

## Concept / Claim: Placement Axes And Evidence Terms

- Code: `data/identity-layers.json` -> `expressions.B.placement.placement_axes`
- Concept / Claim: Required Black evidence terms and broad-match guardrail
- Description: Required terms include power, cost, agency, leverage, survival, self-preservation, resource conversion, graveyard, sacrifice, and pay life. Black strengthens around power-at-cost and self-preservation, and suppresses when answers center group safety, procedure, wild expression, or natural-role acceptance. Generic ambition, darkness, or cruelty is insufficient.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Identity Overview"; self-preservation, no guarantees, and power as protection.
  - `docs/architecture/colors/black/identity.md` - "Mechanical Identity"; life as resource, tutoring, removal, reanimation, and sacrifice.
  - `docs/architecture/colors/black/identity.md` - "Color Relationships"; White and Green are Black enemies, while Blue and Red are allies.
  - `docs/architecture/system/color-pie-framework.md` - "Black's Philosophy -> Mechanics"; cost, sacrifice, reanimation, and destruction.
  - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; White vs. Black and Black vs. Green boundaries.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Red: The Chaos"; wild/public release and appetite belong to BR when mixed with Red.
- Type: Inference
- Notes: The `broad_match_penalty` number is implementation calibration, not sourced from any document.

## Concept / Claim: Chatbot Guidance

- Code: `data/identity-layers.json` -> `expressions.B.placement.chatbot_guidance`
- Concept / Claim: Recognize Black through cost, agency, survival, and resource conversion without making canon/personality claims
- Description: Generated chatbot guidance tells the system to recognize Black through cost-as-tool, leverage, self-sufficiency, and loss-to-advantage conversion; to ask about paid agency and resource conversion when uncertain; and to avoid official-canon or deterministic-personality claims.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - Core drive, self-preservation, cost, transactional reality, and mechanical sections.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Recommendations"; transactional framing should be primary.
  - `docs/architecture/system/color-pie-framework.md` - "Not Beginner Archetypes"; color identities are philosophical commitments rather than simplistic labels.
- Type: Inference
- Notes: The canon disclaimer is a Vox Mana product safety convention rather than a claim from the Black source documents.

## Concept / Claim: Discriminator Questions

- Code: `data/identity-layers.json` -> `expressions.B.placement.discriminator_questions`
- Concept / Claim: Black discrimination asks about fairness failure, cost, and control
- Description: Black discriminator questions ask what a user trusts when fairness fails and what makes a sacrifice acceptable when control must be preserved. They separate mono-Black from UB secrecy, BR release, BG cycle, and WB debt or obligation.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "The Self-Preservation Principle"; no one is looking out for you, so you must protect yourself.
  - `docs/architecture/colors/black/identity.md` - "The Axiom of Cost"; everything has a price and power belongs to those willing to pay.
  - `docs/architecture/colors/black/identity.md` - "Mechanical Identity"; sacrifice and graveyard conversion.
  - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Black: The Ambition"; UB adds hidden information, knowledge, and unconstrained planning.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Red: The Chaos"; BR adds release, appetite, and transgression.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Green: The Cycle"; BG adds death-as-cycle and organic growth.
  - `docs/architecture/system/cross-color-dynamics.md` - "White-Black: The Hierarchy"; WB adds debt, rules, and obligation.
- Type: Inference
- Notes: Question IDs and exact answer-pattern wording are model scaffolding choices.

## Concept / Claim: Hall Support: Cost And Graveyard

- Code: `research/build-faction-artifacts.mjs` -> `hall_B_cost`, `hall_B_graveyard`
- Concept / Claim: Black Hall questions test cost payment and spent-material conversion
- Description: `hall_B_cost` tests whether a user treats life, comfort, or loyalty as an honest exchange for agency. `hall_B_graveyard` tests whether death, failure, or spent material becomes a resource line.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "The Axiom of Cost"; everything has a price.
  - `docs/architecture/colors/black/identity.md` - "Transactional Reality"; life, loyalty, and power are resources.
  - `docs/architecture/colors/black/identity.md` - "Reanimation (Subversion of Death)"; the graveyard is a resource.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; loss states become advantage states.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - "Mechanical Analysis"; life-as-resource and graveyard recursion are aligned.
- Type: Inference
- Notes: Hall answer labels, likelihoods, suppressions, and exact prompt wording are authored model choices.

## Concept / Claim: Crucible Support: B vs UB

- Code: `research/build-faction-artifacts.mjs` -> `crucible_B_UB`; `data/identity-layers.json` -> `collision_black_dimir`
- Concept / Claim: Direct cost versus hidden information
- Description: The Black-vs-UB Crucible asks whether power should be bought directly through cost or held until hidden information and timing make the move safer.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "The Axiom of Cost"; power is bought by those willing to pay.
  - `docs/architecture/colors/black/identity.md` - "Color Relationships"; Blue provides knowledge and Black provides execution.
  - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Black: The Ambition"; UB combines knowledge, planning, optimization, ruthlessness, cost willingness, and power through capability.
  - `docs/architecture/system/color-pie-framework.md` - "Adjacent (Allied) Colors"; UB prioritizes power and capability over ethics.
- Type: Inference
- Notes: "Cost or Secret" is separator language derived from Black's direct paid agency and UB's information advantage.

## Concept / Claim: Crucible Support: B vs BR

- Code: `research/build-faction-artifacts.mjs` -> `crucible_B_BR`; `data/identity-layers.json` -> `collision_black_rakdos`
- Concept / Claim: Control through cost versus release through rupture
- Description: The Black-vs-BR Crucible asks whether the cost matters because it preserves control and agency, or because it releases restraint, appetite, and pressure.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Color Relationships"; Red acts while Black ensures survival.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; Black secures control, leverage, and resource dominance.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Red: The Chaos"; BR centers individual freedom from constraint, immediate gratification, hedonism, transgression, and aggressive sacrifice.
  - `docs/architecture/system/color-pie-framework.md` - "Adjacent (Allied) Colors"; BR embraces individual freedom from constraint.
- Type: Inference
- Notes: The generated separator keeps mono-Black sacrifice attached to agency/control rather than public release or spectacle.

## Concept / Claim: Crucible Support: B vs BG

- Code: `research/build-faction-artifacts.mjs` -> `crucible_B_BG`; `data/identity-layers.json` -> `collision_black_golgari`
- Concept / Claim: Death as personal asset versus death as cycle
- Description: The Black-vs-BG Crucible asks whether the graveyard matters because it belongs to a personal plan or because decay feeds the next life.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Reanimation (Subversion of Death)"; death is relocation of assets.
  - `docs/architecture/colors/black/identity.md` - "Gameplay Philosophy"; the graveyard is an extension of the hand.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Green: The Cycle"; BG resolves fighting fate versus accepting destiny through natural selection, organic growth, death feeding life, graveyard strategies, and recursion.
  - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; Black vs. Green is ambition vs. acceptance.
- Type: Inference
- Notes: BG is included because the generated Black file contains BG/Golgari collision guidance, even though the user's minimum verification focus is Black/WB/UB/BR.

## Concept / Claim: Crucible Support: B vs WB

- Code: `research/build-faction-artifacts.mjs` -> `crucible_B_WB`; `data/identity-layers.json` -> `collision_black_orzhov`
- Concept / Claim: Private sovereignty versus enforceable debt
- Description: The Black-vs-WB Crucible asks whether leverage should remain self-owned or be bound into public obligation, debt, hierarchy, and enforceable relationship.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Color Relationships"; White protects the group while Black protects the self.
  - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; White vs. Black is altruism vs. egoism.
  - `docs/architecture/system/cross-color-dynamics.md` - "White-Black: The Hierarchy"; WB balances collective good and individual ambition through hierarchy, imposed order, transactional community, debt, roles, and resource manipulation.
- Type: Inference
- Notes: The separator translates WB hierarchy/debt into a model prompt that can distinguish Orzhov from mono-Black self-sovereignty.

## Concept / Claim: Cross-Color Boundary: UB / Dimir

- Code: `data/identity-layers.json` -> `collision_black_dimir`; `research/build-faction-artifacts.mjs` -> `KNOWN_LATERAL_INHIBITION.B`, `crucible_B_UB`
- Concept / Claim: UB adds hidden information, planning, and secrecy to Black ambition
- Description: Mono-Black secures agency by paying costs directly; UB turns power through knowledge, planning, secrecy, timing, and information advantage.
- Source(s):
  - `docs/architecture/system/color-pie-framework.md` - "Adjacent (Allied) Colors"; Blue-Black prioritizes power and capability over ethics.
  - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Black: The Ambition"; Blue contributes knowledge/planning/optimization, Black contributes ruthlessness/cost willingness/ambition, and the combined worldview is intellectual ambition unconstrained by ethics.
  - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Black: The Ambition"; mechanical identity includes card advantage through draw, tutors, life payment, and control with kill spells and counters.
- Type: Inference
- Notes: This boundary supports Black/UB adjacency while preventing hidden-information language from being scored as purely mono-Black.

## Concept / Claim: Cross-Color Boundary: BR / Rakdos

- Code: `data/identity-layers.json` -> `collision_black_rakdos`; `research/build-faction-artifacts.mjs` -> `KNOWN_LATERAL_INHIBITION.B`, `crucible_B_BR`
- Concept / Claim: BR adds immediate gratification, appetite, and public release
- Description: Mono-Black spends resources for survival and control; BR spends restraint for release, appetite, transgression, and spectacle.
- Source(s):
  - `docs/architecture/system/color-pie-framework.md` - "Adjacent (Allied) Colors"; Black-Red embraces individual freedom from constraint.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Red: The Chaos"; Black contributes self-interest/rejection of morality/ruthlessness, Red contributes emotional freedom/passion/impulse, and the synthesis becomes unrestricted hedonism and anarchic freedom.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Red: The Chaos"; mechanical identity includes aggressive sacrifice, direct damage with removal, and fast ruthless strategies.
- Type: Inference
- Notes: This boundary informs Black's suppression of answers where sacrifice or cost is primarily about release rather than control.

## Concept / Claim: Cross-Color Boundary: WB / Orzhov

- Code: `data/identity-layers.json` -> `collision_black_orzhov`; `research/build-faction-artifacts.mjs` -> `KNOWN_LATERAL_INHIBITION.B`, `crucible_B_WB`
- Concept / Claim: WB turns Black power into obligation, hierarchy, and enforceable social structure
- Description: Mono-Black protects self-sovereignty privately; WB makes power durable through debt, hierarchy, obligation, rules, and transactional community.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Color Relationships"; White protects the group and Black protects the self.
  - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; White vs. Black is altruism vs. egoism.
  - `docs/architecture/system/cross-color-dynamics.md` - "White-Black: The Hierarchy"; WB resolves collective good versus individual ambition through imposed order or transactional community.
  - `docs/architecture/system/cross-color-dynamics.md` - "White-Black: The Hierarchy"; mechanical identity includes resource manipulation, removal plus protection, and oppressive control.
- Type: Inference
- Notes: The generated "private leverage versus binding obligation" language is operational separator text, not a direct source phrase.

## Concept / Claim: Cross-Color Boundary: BG / Golgari

- Code: `data/identity-layers.json` -> `collision_black_golgari`; `research/build-faction-artifacts.mjs` -> `KNOWN_LATERAL_INHIBITION.B`, `crucible_B_BG`
- Concept / Claim: BG turns Black death-use into cycle, renewal, and organic survival
- Description: Mono-Black treats death and the graveyard as assets for personal leverage; BG treats death as a survival cycle, renewal process, and natural reclamation pattern.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - "Color Relationships"; Green accepts its role while Black defines its fate.
  - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; Black vs. Green is ambition vs. acceptance.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Green: The Cycle"; BG balances Black's refusal of limits with Green's acceptance of boundaries through natural selection and organic growth.
  - `docs/architecture/system/cross-color-dynamics.md` - "Black-Green: The Cycle"; mechanical identity includes graveyard strategies, sacrifice for growth, death triggers, and recursion.
- Type: Inference
- Notes: BG is a generated Black collision target and therefore included for completeness, even though the verification asks explicitly for Black/WB/UB/BR coverage.

## Concept / Claim: Regression Coverage

- Code: `assets/js/quick-reading-tests.js` -> Black regression block
- Concept / Claim: Black should meet the same practical mono bar as White, Blue, Red, and Green
- Description: Black regression tests verify golden-path resolution to `B`, expression kind `color`, purity `1`, Black-adjacent matches limited to `UB`, `BR`, `BG`, and `WB`, Hall support, Crucible support, primary color fit in dossier output, Black commander path language, and Commander Compass recommendations from authored data.
- Source(s):
  - `docs/architecture/colors/black/identity.md` - Provides the Black philosophy and mechanics being tested.
  - `docs/analysis/color-audits/black-intra-color-audit.md` - Provides audit concerns and supports the transactional Black framing.
  - `docs/architecture/system/color-pie-framework.md` - Provides mono-color structure, Black philosophical identity, and adjacent/enemy relationship context.
  - `docs/architecture/system/cross-color-dynamics.md` - Provides UB, BR, WB, and BG pair boundaries for lateral/collision checks.
- Type: Structural Borrowing
- Notes: The assertion syntax and exact test structure are local implementation patterns. The source documents inform expected identity, mechanics, and boundaries.

## Concept / Claim: Generated Runtime Artifacts

- Code: `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, `supabase/functions/guild-recruiter/faction-context.ts`
- Concept / Claim: Runtime Black data is derived from authored source changes
- Description: Generated runtime artifacts contain Black display data, placement data, schema, and Supabase context derived from source-of-truth Black authoring and model scaffolding.
- Source(s):
  - `data/identity-layers.json` - Authored Black identity source of truth.
  - `research/build-faction-artifacts.mjs` - Authored Black model scaffold source of truth.
- Type: Structural Borrowing
- Notes: These artifacts are not independent lore sources. They should be regenerated from source changes rather than manually patched.

## Unattributed or Emergent Content

- Code: `data/identity-layers.json`, `research/build-faction-artifacts.mjs`, `assets/js/commander-dossier.js`, `assets/js/quick-reading-tests.js`
- Concept / Claim: Vox Mana-authored implementation details and inferred connective tissue
- Description: The following content came from Vox Mana implementation judgment, local product style, or source-informed reasoning rather than a specific direct source statement:
  - Exact wording such as "Power is protection when no one is coming to save you."
  - Exact decree voice phrasing and the survivor/bargain/leverage presentation voice.
  - Biological foundations such as `The Self-Sovereign Operator`, `Liberty`, `Authority`, and `high agency risk`.
  - Numeric likelihoods and suppression values in Gate, Hall, and Crucible answers.
  - `broad_match_penalty`.
  - JSON field names, schema placement, active flags, route aliases, external service slugs, and runtime artifact structure.
  - Exact Commander picks: K'rrik, Ayara, Chainer, Toshiro, and Yawgmoth.
  - Exact staples and land-base lists.
  - Exact generated question wording, answer wording, collision IDs, and Hall/Crucible IDs.
  - Operational phrases such as "private sovereignty," "binding obligation," "hidden timing," "unrestrained release," and "graveyard leverage."
- Source(s):
  - No direct source document claim.
- Type: Inference
- Notes: These elements should be treated as authored Vox Mana interpretation. They are consistent with the allowed source set but should not be represented as direct quotations or direct claims from the source documents.

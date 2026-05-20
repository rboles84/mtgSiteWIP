# Blue Source Mapping Report

## Scope And Source Boundary

This report maps the generated mono-Blue identity, model, Commander guidance, and regression-test concepts back to the allowed source documents used for the Blue authoring pass.

Allowed direct sources:

- `docs/architecture/colors/blue/identity.md`
- `docs/analysis/color-audits/blue-intra-color-audit.md`
- Relevant Blue sections of `docs/architecture/system/color-pie-framework.md`
- Relevant Blue, WU, UB, UR, and UG sections of `docs/architecture/system/cross-color-dynamics.md`

Important constraint: `docs/architecture/colors/blue/metaphysics.md` was not directly read for the Blue authoring pass and is not cited here as a direct source. Any metaphysics-adjacent content is attributed only to the summary and analysis that appears inside `docs/analysis/color-audits/blue-intra-color-audit.md`.

Generated or authored Blue outputs covered:

- `data/identity-layers.json`
- `research/build-faction-artifacts.mjs`
- `assets/js/commander-dossier.js`
- `assets/js/quick-reading-tests.js`
- Regenerated runtime artifacts derived from those source changes

## Concept / Claim: Core Blue Activation And Identity Shell

- Description: Blue is active as mono `U`, with `kind: color`, `world: The Color Pie`, mono-Blue routing, no secondary colors, and an identity blend stating Blue is expressed without a secondary color.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Blue: The Seeker of Possibility"; establishes Blue as a standalone color identity.
    - `docs/architecture/system/color-pie-framework.md` - "The Wheel Structure"; Blue as one of the five WUBRG color identities.
    - `docs/architecture/system/color-pie-framework.md` - "The Five Fundamental Questions"; Blue rows defining Blue as a distinct philosophical answer.
    - `docs/architecture/system/color-pie-framework.md` - "Structural Dimensions: A Comparative Matrix"; Blue as rationalist tabula rasa with its own values, self-model, time relation, strength, and weakness.
- Type: Structural Borrowing
- Notes: Activation flags, JSON keys, route slugs, and the `identity_blend` field are Vox Mana implementation structures. The source material establishes Blue as a standalone color identity; the file shape is local system design inherited from the mono identity-layer pattern.

## Concept / Claim: Philosophy, Tagline, And Lore Summary

- Description: The generated Blue copy says possibility opens when hidden patterns are understood. Blue treats people and worlds as unfinished by default, and knowledge, practice, education, tools, precise systems, and planning allow them to exceed their starting shape.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Core Philosophy"; Blue is defined by tabula rasa, infinite potential, optimization, perfection, and systematic knowledge.
    - `docs/architecture/colors/blue/identity.md` - "The Self-Improvement Imperative"; life is about becoming the best version of yourself through knowledge, experience, and informed decisions.
    - `docs/architecture/colors/blue/identity.md` - "The Tabula Rasa: Infinite Potential"; Blue rejects predetermined destiny and treats education as liberation.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Executive Summary"; Blue's core drive is knowledge-based control, tabula rasa epistemology, and stable mechanical identity.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Concept Mapping"; core drive is knowledge and control through understanding, with everything optimized, predicted, or improved.
    - `docs/architecture/system/color-pie-framework.md` - "The Five Fundamental Questions"; Blue pursues perfection through knowledge and optimization.
- Type: Paraphrase
- Notes: The generated tagline "Possibility opens when the pattern is understood" is authorial Blue-facing language derived from the source cluster. It is not a direct quotation.

## Concept / Claim: Vox Mana Read And Decree Voice

- Description: The generated decree voice frames Blue as precise, patient, curious, and cool without contempt. It asks the user to map hidden variables, preserve options, act after understanding, and shape the future once the structure is clear.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Vox Mana Read (Foundational Psychic Axiom)"; Blue does not act until it understands and then shapes what comes next.
    - `docs/architecture/colors/blue/identity.md` - "Gameplay Philosophy"; Blue observes, analyzes, accumulates information, responds optimally, and shapes the environment.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Concept Mapping"; emotional tone is curiosity, detachment, and precision.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Intra-Color Consistency"; knowledge and control through understanding are aligned across source tiers.
    - `docs/architecture/system/color-pie-framework.md` - "How should one act?"; Blue thinks before acting and understands before deciding.
- Type: Inference
- Notes: The generated decree is presentation-layer language. It is not directly quoted from a source, but it renders the source ideas of knowledge-first action, precision, and option preservation.

## Concept / Claim: Emotional, Psychological, And Philosophical Cluster

- Description: Blue is modeled as curiosity, detachment, precision, patience, intellectual confidence, and faith in the learnability of systems. Placement and dossier guidance treat knowledge as a resource and planning as preparation rather than domination.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Ludological Execution"; emotional tone is curiosity, detachment, and precision.
    - `docs/architecture/colors/blue/identity.md` - "Information Asymmetry as Victory"; Blue wins by knowing more, having more options, and responding to opponents.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Executive Summary"; Blue is internally consistent around knowledge-based control and tabula rasa epistemology.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Metaphysical Analysis"; Blue is framed through an epistemological lens and knowledge-as-power.
    - `docs/architecture/system/color-pie-framework.md` - "Blue Players"; Blue players value intelligence, decision quality, reactive control, perfect information, and earned wins.
- Type: Paraphrase
- Notes: "Planning as preparation rather than domination" is an inference used to keep mono-Blue distinct from UB/Dimir leverage.

## Concept / Claim: Core Tension And Weakness

- Description: Blue protects possibility through understanding, but its virtue can harden into paralysis when perfect information matters more than timely action. It risks over-analysis, passivity, resource dependence, and hubris around omniscience.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Philosophical Weaknesses"; over-analysis, passivity, hubris of omniscience, and resource dependence.
    - `docs/architecture/colors/blue/identity.md` - "The Hubris of Omniscience"; Blue can overbelieve in intellectual solutions and predictive models.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Metaphysical Analysis"; omniscience is Blue's aspirational endpoint and possible downfall.
    - `docs/architecture/system/color-pie-framework.md` - "Structural Dimensions: A Comparative Matrix"; Blue's primary weakness is over-analysis and passivity.
    - `docs/architecture/system/color-pie-framework.md` - "Red checks Blue"; speed, direct damage, and chaos disrupt Blue's planning.
- Type: Paraphrase
- Notes: "Perfect information matters more than timely action" is a generated compression of analysis paralysis and Blue's time/resource weakness.

## Concept / Claim: Affinity, Interview Tells, And Core Question

- Description: The generated Blue affinity says Blue is drawn to information as the first resource, systems that improve through study and iteration, patience before commitment, and tools, education, and planning that expand possible futures. It is repelled by acting before understanding, treating fate or instinct as final, discarding options for immediate motion, and using power without a model.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Core Philosophy"; information is the ultimate resource.
    - `docs/architecture/colors/blue/identity.md` - "The Tabula Rasa: Infinite Potential"; education, universal potential, and rejection of predetermined destiny.
    - `docs/architecture/colors/blue/identity.md` - "The Rejection of Nature"; Blue rejects biological boundaries and natural limits as final.
    - `docs/architecture/colors/blue/identity.md` - "Gameplay Philosophy"; observe, analyze, accumulate information, and respond optimally.
    - `docs/architecture/system/color-pie-framework.md` - "What should be changed and what accepted?"; Blue changes everything through understanding.
- Type: Paraphrase
- Notes: The interview-tell format is Vox Mana placement scaffolding. The evidence terms are derived from Blue's knowledge, optimization, anti-determinism, and patience-before-action claims.

## Concept / Claim: Not-To-Be-Confused-With Boundaries

- Description: The generated Blue identity distinguishes mono-Blue from Azorius, Dimir, Izzet, and Simic. Azorius turns understanding into formal procedure; Dimir hides information as leverage; Izzet accelerates discovery into volatile testing; Simic applies improvement through living adaptation.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Allied Color Relationships"; Blue-White, Blue-Black, Blue-Red, and Blue-Green relationship summaries.
    - `docs/architecture/colors/blue/identity.md` - "Enemy Color Conflicts"; Blue vs. Red and Blue vs. Green.
    - `docs/architecture/system/cross-color-dynamics.md` - "White-Blue: The Bureaucracy"; WU combines rational planning, optimization, knowledge, fair laws, educated citizens, and permission-based control.
    - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Black: The Ambition"; UB combines knowledge, planning, optimization, ruthlessness, and ambition unconstrained by ethics.
    - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Red: The Innovation"; UR resolves planning vs spontaneous action through rapid iteration, testing, creative chaos, and spell-slinging.
    - `docs/architecture/system/cross-color-dynamics.md` - "Green-Blue: The Evolution"; UG resolves natural perfection vs artificial improvement through guided evolution, biomancy, bioengineering, and organic/mechanical synthesis.
- Type: Inference
- Notes: UG/Simic is included as a generated Blue lateral boundary and is mapped from both Blue identity material and the Green-Blue cross-color dynamics section.

## Concept / Claim: Mechanical Cluster - Card Draw And Information Access

- Description: Generated Blue archetypes, starter cards, Commander guidance, and placement terms identify card draw, hand size, option density, and information access as Blue gameplay signals.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Card Draw: The Accumulation of Knowledge"; card draw represents systematic knowledge acquisition and expanding the ability to respond.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Mechanical Analysis"; card draw is consistent across primer and metaphysics summary, with Brainstorm, Ponder, Rhystic Study, and Consecrated Sphinx cited in the primer.
    - `docs/architecture/system/color-pie-framework.md` - "Blue's Philosophy -> Mechanics"; knowledge is power maps to card draw and deck manipulation.
    - `docs/architecture/system/color-pie-framework.md` - "Resource Dimension"; Blue card advantage beats Red card disadvantage.
- Type: Paraphrase
- Notes: Exact Commander picks and starter-card lists are curated implementation decisions. The source-backed claim is that card draw and information access are Blue mechanics.

## Concept / Claim: Mechanical Cluster - Counterspells And Permission

- Description: Generated Blue recognizes counterspells, stack interaction, answering key spells, and permission control as mono-Blue signals.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Counterspells: Negation Through Understanding"; understanding a spell allows complete negation.
    - `docs/architecture/colors/blue/identity.md` - "The Stack as Battlefield"; Blue intercepts threats before they manifest and exercises veto power over actions.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Mechanical Analysis"; counterspells are a consistent Blue pillar across audited sources.
    - `docs/architecture/system/color-pie-framework.md` - "Blue's Philosophy -> Mechanics"; understanding enables control maps to counterspells.
    - `docs/architecture/system/color-pie-framework.md` - "Blue checks Red"; counterspells stop impulsive plays.
- Type: Paraphrase
- Notes: The dossier phrase "hold mana for the important spell" is practical Commander guidance inferred from permission play.

## Concept / Claim: Mechanical Cluster - Bounce, Tempo, And Resetting Systems

- Description: Generated Blue treats tempo, bounce, resetting permanents, and delaying threats as Blue gameplay-adjacent evidence.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Bounce/Tempo: Resetting the System"; resolved objects can be undone, progress can be reversed, and time advantage can be created.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Mechanical Analysis"; bounce/tempo is consistent across primer and metaphysics summary.
    - `docs/architecture/system/color-pie-framework.md` - "Blue's Philosophy -> Mechanics"; nothing is permanent maps to bounce and transformation.
    - `docs/architecture/system/color-pie-framework.md` - "Blue checks Red"; bounce undoes hasty threats.
- Type: Paraphrase
- Notes: Generated placement terms use "tempo" and "reset" as mechanical evidence, not as direct source quotations.

## Concept / Claim: Mechanical Cluster - Deck Manipulation And Prediction

- Description: Generated Blue includes prediction, deck manipulation, probability, planning, and preserving future options as positive evidence.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Scrying/Deck Manipulation: Perfect Information"; the future is a variable that can be manipulated through probability and understanding.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Mechanical Analysis"; deck manipulation is acknowledged in both audited source tiers, with a structural difference over whether it is standalone or part of card draw.
    - `docs/architecture/system/color-pie-framework.md` - "Blue's Philosophy -> Mechanics"; knowledge is power maps to card draw and deck manipulation.
- Type: Paraphrase
- Notes: This cluster informed terms like "prediction," "preserve options," and "hidden structure" in the generated identity and model text.

## Concept / Claim: Mechanical Cluster - Cloning, Copying, Artifacts, And Engines

- Description: Generated Blue recognizes copy effects, clones, artifacts, tools, and engine play as Blue-aligned ways to turn observed structures into advantage.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Cloning/Copying: Imitation Through Analysis"; understanding enables replication, mimicry, and adaptation.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Mechanical Analysis"; cloning is consistent across sources, even when examples vary.
    - `docs/architecture/system/color-pie-framework.md` - "Blue's Philosophy -> Mechanics"; perfection through optimization maps to copy and clone effects.
    - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Red: The Innovation"; UR includes artifact synergies and spell-slinging strategies, which informed the need to distinguish mono-Blue artifacts/tools from Izzet volatility.
- Type: Paraphrase
- Notes: Specific artifact Commander recommendations are implementation curation, not direct source claims.

## Concept / Claim: Mechanical Cluster - Control And Commander Gameplay

- Description: Generated Blue Commander copy frames the deck path as drawing cards, preserving options, answering key spells, and letting information become inevitability.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "The Mechanics of Information Dominance"; Blue asserts control through information dominance and stack control.
    - `docs/architecture/colors/blue/identity.md` - "Control Through Understanding"; Blue observes, accumulates information, responds optimally, and shapes the environment.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Issues and Flags"; Blue's Commander section is sparse because Blue naturally thrived in Commander.
    - `docs/architecture/system/color-pie-framework.md` - "Slow Formats (Commander)"; Blue card advantage is strong in Commander.
- Type: Inference
- Notes: The Commander framing translates source-backed mechanics into Vox Mana Commander-first presentation. Exact deck path language is generated.

## Concept / Claim: Placement Good-Fit And Poor-Fit Indicators

- Description: Blue good-fit indicators look for waiting to understand before committing, treating knowledge, cards, and options as resources, and improving systems through study, iteration, and precise control. Poor-fit indicators reject immediate motion before understanding, fate or instinct as final, and planning dismissed as sterile delay.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Gameplay Philosophy"; observe and analyze, accumulate information, respond optimally, and shape the environment.
    - `docs/architecture/colors/blue/identity.md` - "The Rejection of Nature"; Blue opposes biological limitation and fixed natural truth.
    - `docs/architecture/colors/blue/identity.md` - "Philosophical Weaknesses"; over-analysis and passivity are risks.
    - `docs/architecture/system/color-pie-framework.md` - "How should one act?"; Blue thinks before acting.
    - `docs/architecture/system/color-pie-framework.md` - "What is the source of wisdom?"; Blue uses accumulated knowledge and logical analysis.
- Type: Paraphrase
- Notes: These indicators combine philosophical and mechanical source claims into scoring evidence.

## Concept / Claim: Placement Axes And Evidence Terms

- Description: Required Blue evidence terms include knowledge, information, understanding, study, optimization, prediction, control, card draw, counterspell, tempo, copy, and possibility. Blue strengthens when users center information as resource, acting after understanding, optimizing through knowledge, control through prediction, and improving the system.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Core Philosophy"; information as ultimate resource and systematic acquisition of knowledge.
    - `docs/architecture/colors/blue/identity.md` - "Ludological Execution"; core drive, belief, playstyle, and emotional tone.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Concept Mapping"; knowledge, control through understanding, optimization, prediction, and improvement are aligned.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Strategic pillars"; card draw, counterspells, bounce/tempo, and clone/copy.
    - `docs/architecture/system/color-pie-framework.md` - "Blue's Philosophy -> Mechanics"; card draw, counterspells, bounce, transformation, and clone effects.
- Type: Inference
- Notes: Evidence terms are operational scoring vocabulary. Numeric thresholds and penalties are implementation calibration and not document claims.

## Concept / Claim: Placement Guardrails And Broad-Match Penalty

- Description: Blue should not be awarded for generic intelligence, generic control, or indecision without clear knowledge, options, optimization, prediction, or patience-before-action language.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Philosophical Weaknesses"; Blue's strength can become analysis paralysis.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Executive Summary"; Blue is coherent around knowledge-based control rather than generic cleverness.
    - `docs/architecture/system/color-pie-framework.md` - "Structural Dimensions: A Comparative Matrix"; Blue's strength is intelligence and planning, while its weakness is over-analysis and passivity.
- Type: Inference
- Notes: The `broad_match_penalty` value is implementation calibration. The guardrail exists to prevent false positives from generic caution or smart-sounding answers.

## Concept / Claim: Chatbot Guidance And Canon Disclaimer

- Description: Generated chatbot guidance tells the system to recognize Blue through explicit knowledge, information, options, prediction, and optimization language; to ask clarifying questions when uncertain; and to avoid presenting Vox Mana placement as official canon.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - Blue philosophical and mechanical sections listed above.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Executive Summary"; confirms Blue as highly consistent across sources.
    - `docs/architecture/system/color-pie-framework.md` - Blue philosophical rows and Blue player archetype.
- Type: Inference
- Notes: The canon disclaimer is a Vox Mana product safety convention rather than a claim from the Blue source documents.

## Concept / Claim: Discriminator Questions

- Description: Blue discriminator questions ask what must happen before action in an unstable situation and what makes progress trustworthy rather than merely lucky. They separate Blue from procedure, secrecy, volatile experiment, and biological adaptation.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Vox Mana Read"; Blue does not act until it understands.
    - `docs/architecture/colors/blue/identity.md` - "The Self-Improvement Imperative"; knowledge, experience, and informed decisions build improvement.
    - `docs/architecture/colors/blue/identity.md` - "Allied Color Relationships"; Blue-White, Blue-Black, Blue-Red, and Blue-Green relationship summaries.
    - `docs/architecture/system/color-pie-framework.md` - "How should one act?"; Blue thinks before acting and understands before deciding.
    - `docs/architecture/system/cross-color-dynamics.md` - White-Blue, Blue-Black, Blue-Red, and Green-Blue sections for procedure, leverage, experiment, and adaptation boundaries.
- Type: Inference
- Notes: The questions are generated scaffolding that translates sourced conceptual boundaries into adaptive-placement prompts.

## Concept / Claim: Hall Support - Understanding And Possibility

- Description: Blue Hall questions test mapping variables before action and improving a person or system through education, tools, repeatable practice, and model-building. Adjacent answers route toward WU procedure, UB leverage, UR experiment, or UG adaptation.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Gameplay Philosophy"; observe, analyze, accumulate information, respond optimally, and shape the environment.
    - `docs/architecture/colors/blue/identity.md` - "The Tabula Rasa: Infinite Potential"; education as liberation and self-improvement as purpose.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Intra-Color Consistency"; tabula rasa doctrine and strategic pillars align.
    - `docs/architecture/system/color-pie-framework.md` - Blue rows for perfection through knowledge, blank slate, and understanding before deciding.
    - `docs/architecture/system/cross-color-dynamics.md` - White-Blue, Blue-Black, Blue-Red, and Green-Blue sections.
- Type: Inference
- Notes: Hall IDs, answer titles, likelihood values, and suppression values are model-authoring choices, not directly sourced claims.

## Concept / Claim: Crucible Support - U vs WU

- Description: The Blue-vs-WU Crucible asks whether trust begins with understanding the system or with a rule no one can bend.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Blue-White: Systemic Progress & Authority"; structured, systematic improvement and control strategies with defensive elements.
    - `docs/architecture/system/cross-color-dynamics.md` - "White-Blue: The Bureaucracy"; WU combines rational planning with moral framework, fair laws, educated citizens, and permission-based control protecting order.
    - `docs/architecture/system/color-pie-framework.md` - "Adjacent (Allied) Colors"; White-Blue both value order and structure.
- Type: Inference
- Notes: "Model or Procedure" is authored separator language. It operationalizes Blue understanding vs WU rule/procedure.

## Concept / Claim: Crucible Support - U vs UB

- Description: The Blue-vs-UB Crucible asks whether information matters because it improves the future or because no one knows the user has it.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Blue-Black: Knowledge as Power"; information and capability trump morality, and optimization can ignore ethical constraints.
    - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Black: The Ambition"; UB pursues knowledge without moral limits, uses intelligence to dominate, and combines Blue answers with Black threats.
    - `docs/architecture/system/color-pie-framework.md` - "Adjacent (Allied) Colors"; Blue-Black both prioritize power and capability over ethics.
- Type: Inference
- Notes: "Understanding or Secret" is authored separator language derived from the difference between mono-Blue knowledge and UB leverage.

## Concept / Claim: Crucible Support - U vs UR

- Description: The Blue-vs-UR Crucible asks whether the user waits for the model or fires the prototype when an idea is promising but unstable.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Blue-Red: Innovation Through Experimentation"; Blue-Red combines pushing boundaries, rapid iteration, and creative breakthroughs.
    - `docs/architecture/colors/blue/identity.md` - "Blue vs. Red: Calculation vs. Passion"; Blue needs time and Red denies it.
    - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Red: The Innovation"; core tension is careful planning vs spontaneous action, resolved through experimental creativity and passionate research.
    - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; Blue vs. Red is thought vs feeling.
- Type: Inference
- Notes: "Prototype" and "spark" are generated separator terms derived from UR's rapid testing and creative-risk identity.

## Concept / Claim: Crucible Support - U vs UG

- Description: The Blue-vs-UG Crucible asks whether the next change should refine the model or alter the living thing that must survive.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Blue-Green: Evolution & Adaptation"; growth through iterative improvement and natural development accelerated by understanding.
    - `docs/architecture/colors/blue/identity.md` - "Blue vs. Green: Artifice vs. Nature"; engineered improvement opposes natural perfection, and Blue says become anything while Green says become what you are.
    - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; Green vs. Blue is nature vs artifice.
    - `docs/architecture/system/color-pie-framework.md` - "What should be changed and what accepted?"; Blue changes everything through understanding, while Green accepts natural order.
    - `docs/architecture/system/cross-color-dynamics.md` - "Green-Blue: The Evolution"; UG balances natural perfection and artificial improvement through guided evolution, biomancy, and technology inspired by evolution.
- Type: Inference
- Notes: This section maps the generated UG boundary directly to both Blue's identity document and the Green-Blue cross-color dynamics section now required by the verification scope.

## Concept / Claim: WU / Azorius Boundary

- Description: Mono-Blue seeks understanding and possibility. WU/Azorius turns understanding into public procedure, precedent, legitimacy, rules, and structured progress.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Blue-White: Systemic Progress & Authority"; structured, systematic improvement of society, ethical frameworks, and defensive control.
    - `docs/architecture/system/cross-color-dynamics.md` - "White-Blue: The Bureaucracy"; WU combines order, rational planning, optimization, knowledge, fair laws, educated citizens, and permission-based control.
    - `docs/architecture/system/color-pie-framework.md` - "Adjacent (Allied) Colors"; White-Blue both value order and structure.
- Type: Inference
- Notes: This boundary informs `collision_blue_azorius`, `crucible_U_WU`, and WU lateral checks.

## Concept / Claim: UB / Dimir Boundary

- Description: Mono-Blue studies to expand possible futures. UB/Dimir keeps information hidden so leverage, mastery, and advantage arrive at the safest or most powerful moment.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Blue-Black: Knowledge as Power"; information and capability trump morality, and card draw, tutoring, and control can operate without regard for cost.
    - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Black: The Ambition"; UB combines knowledge, planning, optimization, ruthlessness, willingness to pay costs, and ambition.
    - `docs/architecture/system/color-pie-framework.md` - "Adjacent (Allied) Colors"; Blue-Black both prioritize power and capability over ethics.
- Type: Inference
- Notes: This boundary informs `collision_blue_dimir`, `crucible_U_UB`, and UB lateral checks. "Hidden leverage" is an operational separator phrase, not a direct source quotation.

## Concept / Claim: UR / Izzet Boundary

- Description: Mono-Blue tests patiently until the pattern is reliable. UR/Izzet accelerates discovery through volatile experiment, creative risk, spell-slinging, artifacts, and playful or passionate research.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Blue-Red: Innovation Through Experimentation"; pushing boundaries, rapid iteration, creative breakthroughs, and instant-speed spell-slinging.
    - `docs/architecture/colors/blue/identity.md` - "Blue vs. Red: Calculation vs. Passion"; slow planning conflicts with immediate emotional action.
    - `docs/architecture/system/cross-color-dynamics.md` - "Blue-Red: The Innovation"; experimental creativity, rapid iteration and testing, creative chaos guided by curiosity, passionate research, and spell-slinging.
    - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; Blue vs. Red is thought vs feeling.
- Type: Inference
- Notes: This boundary informs `collision_blue_izzet`, `crucible_U_UR`, and UR lateral checks.

## Concept / Claim: UG / Simic Boundary

- Description: Mono-Blue believes possibility can be engineered through plans, tools, knowledge, and models. UG/Simic applies improvement through living adaptation, organismal change, and biology.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "Blue-Green: Evolution & Adaptation"; natural development accelerated by understanding and growth through iterative improvement.
    - `docs/architecture/colors/blue/identity.md` - "Blue vs. Green: Artifice vs. Nature"; engineered improvement versus natural perfection and limitless potential versus predetermined nature.
    - `docs/architecture/system/color-pie-framework.md` - "Opposite (Enemy) Colors"; Green vs. Blue is nature vs artifice.
    - `docs/architecture/system/color-pie-framework.md` - "Structural Dimensions: A Comparative Matrix"; Blue has unlimited potential and Green has a predetermined natural role.
    - `docs/architecture/system/cross-color-dynamics.md` - "Green-Blue: The Evolution"; UG combines Blue's optimization impulse with Green's natural development through guided evolution, biomancy, bioengineering, and organic/mechanical synthesis.
- Type: Inference
- Notes: This boundary is included because the generated Blue model includes `UG` as a lateral target and collision target.

## Concept / Claim: Commander Dossier Guidance

- Description: `COMMANDER_FACTION_GUIDANCE.U` gives Blue owned themes of knowledge, information, card draw, counterspells, tempo, bounce, copy, clones, artifacts, options, control, and spellslinger. It warns against collapsing Blue into Azorius procedure, Dimir secrecy, Izzet volatility, or Simic biology.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - "The Mechanics of Information Dominance"; card draw, counterspells, bounce/tempo, deck manipulation, and cloning/copying.
    - `docs/architecture/colors/blue/identity.md` - "Gameplay Philosophy"; control through understanding, stack battlefield, and information asymmetry.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - "Mechanical Analysis"; card draw, counterspells, bounce/tempo, cloning, and deck manipulation are consistent Blue mechanics.
    - `docs/architecture/system/cross-color-dynamics.md` - White-Blue, Blue-Black, Blue-Red, and Green-Blue sections for procedure, hidden leverage, volatile experiment, and biological adaptation separator terms.
- Type: Inference
- Notes: The dossier guidance entry was added because the dossier audit required Blue-owned guidance. It did not require runtime presenter changes.

## Concept / Claim: Regression Coverage

- Description: Blue regression tests verify mono-Blue external routing, generated color institution type, biological expression presence, lateral targets `WU`, `UB`, `UR`, `UG`, golden path resolution to `U`, identity expression kind `color`, purity `1`, Blue-adjacent matches, Hall support, Crucible support, Commander path language, and Commander Compass recommendations from authored data.
- Source(s):
    - `docs/architecture/colors/blue/identity.md` - Provides the Blue identity and mechanics being tested.
    - `docs/analysis/color-audits/blue-intra-color-audit.md` - Confirms Blue's intra-color consistency and mechanical categories.
    - `docs/architecture/system/color-pie-framework.md` - Provides mono color structure, Blue philosophical identity, and adjacent/enemy relationship context.
    - `docs/architecture/system/cross-color-dynamics.md` - Provides WU, UB, UR, and UG pair boundaries for Blue collision and lateral checks.
- Type: Structural Borrowing
- Notes: The exact test assertions come from the implementation acceptance contract and existing mono test pattern. The source documents inform expected content and boundaries, not assertion syntax.

## Concept / Claim: Generated Runtime Artifacts

- Description: `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, and `supabase/functions/guild-recruiter/faction-context.ts` contain Blue runtime data derived from the authored source changes.
- Source(s):
    - `data/identity-layers.json` - Authored Blue identity source of truth.
    - `research/build-faction-artifacts.mjs` - Authored model scaffold source of truth.
- Type: Structural Borrowing
- Notes: These are generated artifacts, not independent lore sources. They should be regenerated from source changes rather than manually patched.

## Unattributed or Emergent Content

- Description: The following content came from Vox Mana implementation judgment, local product style, Commander practicality, or source-informed reasoning rather than a specific allowed source statement:
    - Exact wording such as "Possibility opens when the pattern is understood."
    - The title `The Possibility Architect`.
    - Biological foundations such as Fairness primary and Authority secondary.
    - Risk labels such as `low-medium risk`.
    - Numeric likelihoods and suppression values in Gate, Hall, and Crucible answers.
    - `broad_match_penalty`.
    - JSON field names, schema placement, active flags, route aliases, and runtime artifact structure.
    - Exact Commander picks: Talrand, Azami, Minn, Orvar, and Urza.
    - Exact staples and land-base lists.
    - Exact generated question wording, answer wording, collision IDs, and Hall/Crucible IDs.
    - The operational phrases "model before procedure," "hidden leverage," "volatile experiment," and "biological adaptation" as separator labels.
- Source(s):
    - No direct source document claim.
- Type: Inference
- Notes: These elements should be treated as authored Vox Mana interpretation. They are consistent with the allowed source set but should not be represented as direct quotations or direct claims from the source documents.

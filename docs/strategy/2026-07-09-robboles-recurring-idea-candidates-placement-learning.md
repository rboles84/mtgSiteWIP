# Phase 1 Supplement — Recurring Idea Candidates (research, placement, and learning logic)

## 1. Translation Is The Work

**The claim** - The hard part of building useful systems is translating hidden structure into language people can actually use.

**Definition** - The vault repeatedly turns machine-readable or expert-only structure into readable bridges: placement evidence into a dossier, concepts into Scryfall queries, archetypes into table expectations, and raw syntax into Plain Reading.

**Where it recurs** - Very high recurrence across `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`, `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`, `research/maze-query-core.js`, `research/scryfall-grounded-compiler.js`, `assets/js/strategium.js`, `assets/js/adaptive-placement.js`, and `docs/architecture/placement-domains.md`. Broad search found 600+ docs/code hits around translation, explanation, interpretation, readable output, and table-read language.

**Why it's ownable** - The phrasing is not just "make things user-friendly." The vault's recurring move is to preserve the underlying system while building a human-facing translation layer that keeps assumptions visible.

**Blog fit** - Learning Lab, QA Field Guide, Automation Cookbook. Connects to posts about making technical risk legible, turning data into decisions, and designing test output people can act on.

**Strength** - High, because it appears in placement, Maze, Loom, Strategium, and dossier logic.

## 2. Teach The Model, Not Just The Answer

**The claim** - A good tool should leave the user better at thinking, not merely satisfied with one result.

**Definition** - Vox Mana keeps exposing the reasoning path: query interpretation, recognized terms, assumptions, evidence trails, stage history, related threads, and table-read explanations. The product is often a learning surface wearing the clothes of a tool.

**Where it recurs** - High recurrence in `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`, `research/maze-query-core.js`, `assets/js/adaptive-placement.js`, `assets/js/strategium.js`, `docs/qa/vox-mana-test-plan.md`, and VM-416/457/466 handoffs. Maze explicitly preserves diagnostics and alternatives; placement stores evidence and stage history; Strategium teaches table literacy rather than giving isolated tips.

**Why it's ownable** - The vault prefers explainable scaffolds over opaque answers. Even search is framed as learning the search shape, not just getting results.

**Blog fit** - Learning Lab, Automation Cookbook, Table Talk. Strong fit for posts about QA tools, AI assistants, dashboards, and internal systems that should train judgment.

**Strength** - High, because it repeats across both user-facing learning and internal diagnostics.

## 3. Near Misses Matter

**The claim** - The almost-right answer is often where the system teaches the most.

**Definition** - The placement engine treats adjacent fits, collisions, suppressions, false positives, and Crucible discriminator questions as first-class signals. Learning comes from why one option won and why a nearby option did not.

**Where it recurs** - Very high recurrence in `assets/js/adaptive-placement.js`, `docs/architecture/placement-domains.md`, `docs/reference/data-contracts.md`, `docs/research/*/reliability-audit.md`, VM-477 through VM-483 Maze repair docs, and `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`. Broad search found 900+ hits around adjacent, collision, Crucible, discriminator, inhibition, false positive, suppress, prune, and negative evidence.

**Why it's ownable** - This is sharper than generic "edge cases matter." The vault treats near misses as explanatory material, not just bugs or ranking leftovers.

**Blog fit** - QA Field Guide, Learning Lab. Strong seed for articles about boundary cases, false positives, classifier behavior, and why QA should preserve examples that nearly passed.

**Strength** - High, because it is baked into both the placement model and the test/repair trail.

## 4. Evidence Has Altitude

**The claim** - Evidence is not all the same height; a source can support one kind of claim while being useless or unsafe for another.

**Definition** - The research layer repeatedly labels material as claim-bearing, support-only, discovery-only, negative-only, texture, boundary repair, or deferred. The conviction is that confidence depends on matching the claim to the right evidence altitude.

**Where it recurs** - Very high recurrence in `docs/research/wubrg/wubrg-depth-readiness-matrix.md`, `docs/research/colorless/colorless-layer2-gap-analysis.md`, `docs/research/glint/glint-reliability-audit.md`, `docs/research/mardu/mardu-reliability-audit.md`, source-readiness matrices, `docs/reference/source-generated-guardrails.md`, and raw faction packets. Broad search found 450+ docs hits around support-only, discovery-only, claim-bearing, timeline, anti-bleed, deferred, and not-authorized boundaries.

**Why it's ownable** - The vault does not merely ask "is there a citation?" It asks what kind of work that citation is allowed to do.

**Blog fit** - QA Field Guide, Learning Lab, Table Talk. Strong bridge to evidence design, requirements ambiguity, AI evaluation, and risk review.

**Strength** - High, because this is a deeply repeated research habit and one of the most transferable ideas from the vault.

## 5. Start Text-First

**The claim** - If the words cannot explain the system, the graph or interface is not ready to save it.

**Definition** - The Loom decision explicitly chooses a text-first Explorer Mode before a graph canvas. The broader vault repeatedly privileges concepts, registries, query previews, explanations, and readable panels before visual spectacle.

**Where it recurs** - Medium-high recurrence in `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`, `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`, Strategium content work, voice/copy audits, and visual-readiness handoffs. The specific Loom decision says no graph canvas until concept semantics and queries are stable.

**Why it's ownable** - This is a practical design conviction: visual systems should follow stable semantics, not substitute for them.

**Blog fit** - Learning Lab, Automation Cookbook, Table Talk. Works for posts about dashboards, visualizations, AI explainability, and building complex tools without getting seduced by the demo.

**Strength** - Medium-high, because it is especially strong in Loom/learning work but less universal than source authority or risk visibility.

## 6. Social Systems Are Interfaces

**The claim** - Teams, tables, and users behave better when expectations are made readable before pressure hits.

**Definition** - Strategium repeatedly frames Commander play as an expectation interface: Rule 0, table texture, threat posture, heat, deals, and archetype signals. Transferred out of MTG, this is a systems-thinking stance about social calibration.

**Where it recurs** - High recurrence in `assets/js/strategium.js`, VM-416 Strategium content pass, `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`, Commander/table-fit backlog cards, and Archscry placement/dossier work. Strategium phrases this as what the pod reads, what the commander promises, and how archetype language translates intent.

**Why it's ownable** - The vault treats social friction as an information-design problem. The point is not etiquette; it is making risk, intent, and power visible before the system reacts badly.

**Blog fit** - Table Talk, QA Field Guide. Strong fit for posts about stakeholder communication, release readiness, handoffs, incident prevention, and team calibration.

**Strength** - High, because it is central to Strategium and echoes the user's known QA-risk-visibility theme.

## 7. Adapters Beat Rewrites

**The claim** - When a system already has a reliable core, the next layer should adapt to it instead of rebuilding it.

**Definition** - Loom is planned as concept registry -> query fragments -> existing Maze search, not a second parser. Placement domains are future grouping, not a second placement system. Reading Finds reflects back into dossiers without becoming account storage or deckbuilding.

**Where it recurs** - Medium-high recurrence in `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`, `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`, `docs/architecture/placement-domains.md`, `docs/reference/data-contracts.md`, VM-022 Maze core extraction, VM-426 Reading Finds, and VM-471/472 compiler foundation work.

**Why it's ownable** - The vault keeps resisting parallel engines. New capability is routed through contracts and adapters, which is a very QA/systems-builder way to manage complexity.

**Blog fit** - Automation Cookbook, QA Field Guide. Strong for architecture posts about testable seams, contract-first extension, and avoiding accidental second systems.

**Strength** - Medium-high, because it is strongly demonstrated in Loom/Maze/placement architecture.

## 8. Negative Evidence Is Evidence

**The claim** - Knowing what something is not can be as useful as knowing what it is.

**Definition** - The vault uses prunes, suppressions, anti-bleed rules, negative-only source roles, false-positive guardrails, and not-authorized sections to prevent confident drift. Negative evidence becomes a protective signal.

**Where it recurs** - High recurrence in `assets/js/adaptive-placement.js`, `docs/research/mardu/mardu-reliability-audit.md`, `docs/research/colorless/colorless-layer2-gap-analysis.md`, `docs/research/glint/glint-reliability-audit.md`, source-generated guardrails, copy-boundary audits, and Maze ambiguity/negation repair work.

**Why it's ownable** - This is more specific than "avoid mistakes." The vault actively models exclusions and non-authority as data.

**Blog fit** - QA Field Guide, Learning Lab, Automation Cookbook. Strong for posts on regression tests, validation rules, AI hallucination control, and source qualification.

**Strength** - High, because it appears in both code behavior and research governance.

## 9. Concepts Before Coverage

**The claim** - Broad coverage is less valuable than a small set of well-named, well-bounded concepts.

**Definition** - Loom v1 starts with ten reviewed concepts; Strategium splits common from specialist concepts; placement domains postpone broad expansion; source packets gate promotion instead of normalizing everything. The repeated habit is to stabilize meaning before scaling inventory.

**Where it recurs** - Medium-high recurrence in `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`, `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`, `assets/js/strategium.js`, `docs/architecture/placement-domains.md`, `docs/architecture/identity-layer1-coverage-and-wubrg-plan.md`, and source-readiness/gold-standard docs.

**Why it's ownable** - This is the "scope beats scale" idea with more texture: the unit of quality is a concept that can survive explanation, query behavior, and edge cases.

**Blog fit** - Learning Lab, Automation Cookbook. Good for posts about taxonomy design, test taxonomy, AI prompt libraries, and knowledge systems.

**Strength** - Medium-high, because it is highly visible in learning/placement planning but slightly less distinct from scope discipline.

## Better as post seeds than recurring ideas

- **Why graphs should come last** - Strong Loom post seed under "Start Text-First," but too narrow as a top-level recurring idea.
- **The almost-right answer deserves a UI** - Strong post seed under "Near Misses Matter."
- **Support-only is not weak evidence** - Excellent post seed under "Evidence Has Altitude."
- **Negative tests are product knowledge** - Post seed under "Negative Evidence Is Evidence."
- **A concept registry is a promise** - Useful Automation Cookbook seed about naming, aliases, query fragments, and review gates.
- **Rule 0 for software teams** - Table Talk seed translating Strategium's calibration ideas into team/release communication.
- **Adapter layers are how small projects stay sane** - Architecture post seed under "Adapters Beat Rewrites."

## Considered and cut

- **Everything is a graph** - Cut as too clever and not accurate; the vault repeatedly delays graph work until semantics are stable.
- **Users love transparency** - Cut as generic; the stronger pattern is teaching the model and exposing assumptions.
- **Taxonomies matter** - Cut as too broad; "Concepts Before Coverage" is the sharper vault-specific version.
- **Ambiguity is bad** - Cut because the vault does not simply eliminate ambiguity; it preserves, labels, and sometimes blocks on it.
- **Learning should be fun** - Cut as generic and weakly evidenced; the vault is more about learning as judgment-building.
- **Commander is a social format** - Cut as product/domain-specific; the transferable principle is that social systems are interfaces.
- **Classification should be accurate** - Cut as generic; the vault's ownable stance is that nearby classifications and negative evidence are part of the explanation.

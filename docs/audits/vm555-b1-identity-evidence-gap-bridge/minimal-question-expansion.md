# VM-555 - Minimal B1 Question Expansion

Status: Documentation-only candidate design. No question, answer, signal, route, score, or runtime change is authorized or implemented.

## Outcome

The 37-row gap matrix does not justify one new question per identity. It supports six reusable boundary-item candidates covering the unresolved observation families, plus routing-only work for UG, WB, and Witch, diagnosis before authoring for Ink, and an intentional no-item result for Yore.

These are candidate substitutions or research items, not six approved additions to the 34-item bank. Owner decision `OD-B1-02` still fixes the 4/12/18 pool. Any net increase or replacement requires a later owner decision and full answer-semantic review.

The candidates do not create scoring authority. An answer may provide a bounded observation hypothesis; it cannot name an identity alone.

## Independence Rule

Each candidate remains in the dependency group of its one primary construct. A candidate does not become independent merely because its scenario is more identity-specific.

- `VM555-Q01` remains `DG_C03` and cannot stack with Gate C03 as a second observation.
- `VM555-Q02` remains `DG_C13` and cannot stack with the current Hall or Crucible C13 items.
- `VM555-Q03` remains `DG_C07`.
- `VM555-Q04` remains `DG_C06`.
- `VM555-Q05` remains `DG_C08`.
- `VM555-Q06` remains `DG_C14`.

Their purpose is to make an existing construct more boundary-specific when that boundary is unresolved. Independent corroboration must still come from another construct and behavioral context.

## Conceptual Set Cover

| Candidate | Construct | Primary gap families helped | Explicit exclusions |
|---|---|---|---|
| `VM555-Q01` | C03 disruption response | B, G, R, RG, BR, Jund; corroboration for BG, Glint, Lorehold | Does not count independently from Gate C03; does not name Yore |
| `VM555-Q02` | C13 public commitment | W, WU, WG, Abzan, Mardu; possible Bant and WUBRG corroboration | Does not stack with any other C13 item; does not solve Ink frontier failure |
| `VM555-Q03` | C07 pressure channel | R, BR, RG, Jund, Naya, Mardu; corroboration for WR, Dune, Prismari | Must not infer motive from combat alone |
| `VM555-Q04` | C06 engine reconstruction | U, UB; corroboration for UR, BG, Lorehold, Quandrix, Witherbloom, Sultai, Colorless, WUBRG | Machinery does not imply Colorless or Yore |
| `VM555-Q05` | C08 commitment window | U, UB, WU; possible Glint or Silverquill corroboration only after semantic review | Does not stack with either existing C08 Hall context |
| `VM555-Q06` | C14 development horizon | G, WG, Abzan, Naya; corroboration for BG, Quandrix, Witherbloom, Bant, Temur | Long setup does not imply Witch or Quandrix by itself |

Six is the smallest current candidate set because removing any one leaves at least one broad-only family without an identity-specific boundary opportunity or leaves a one-signal family without a construct-independent corroboration candidate. That is a design-coverage statement, not empirical proof that six items will work.

## VM555-Q01 - The Plan Breaks

- Question ID: `VM555-Q01`
- One construct: C03, disruption response
- Commander situation: An opponent removes the piece your deck was built around after committing most of their mana and cards. Your turn begins with the rest of your board still available. What do you try first?
- Exact missing boundary closed: separates preservation, reclamation, conversion, board-led adaptation, immediate action, and deliberate reconstruction without asking for color or faction preference.
- Evidence role: primary boundary opportunity for broad-only identities; corroborating hypothesis only when the existing naming signal uses a non-C03 construct.
- Independence: `DG_C03`; never count separately from `b1.gate.disruption.v1`.
- Routing trigger: ask only when the current frontier is separated by disruption response and the route needs a more specific C03 boundary, not another evidence count.
- Novice readability: uses removal, mana, cards, board, and turn in direct context; “piece your deck was built around” replaces “engine” if the term is not already explained.

| Answer choice | Observation produced | Identities helped | Guardrail |
|---|---|---|---|
| Preserve the pieces that still protect the plan. | Prioritizes continuity through preservation. | W; WG; Abzan | Protection alone does not name any of them. |
| Reuse what was lost as part of the next cycle. | Prefers reclamation and continuity after loss. | BG; Lorehold | Graveyard use alone is insufficient. |
| Turn the loss into a different resource now. | Prefers opportunistic conversion after disruption. | B; Witherbloom; Sultai | Conversion alone does not establish Black-led identity. |
| Use the board that exists and change course. | Prefers board-led adaptation over restoring the ideal plan. | G; RG; Temur; Glint | Adaptation alone does not establish Green or Glint. |
| Act before the remaining opening closes. | Prefers immediate action after disruption. | R; BR; Jund; Grixis | Urgency alone does not distinguish appetite, instinct, or survival. |
| Reconstruct the deliberate plan. | Prefers returning to a designed system. | U; Esper | Rebuilding alone does not establish perfectibility. |

## VM555-Q02 - The Table's Commitment

- Question ID: `VM555-Q02`
- One construct: C13, public commitment
- Commander situation: The table agrees to stop a repeatable threat. Before your next turn, the board changes and the original threat is weaker but still present. What should the agreement require now?
- Exact missing boundary closed: separates public procedure, shared access, binding obligation, bounded coordinated action, and revisable influence.
- Evidence role: primary boundary opportunity for W, WU, WG, Abzan, and Mardu; possible corroboration for Bant and WUBRG.
- Independence: `DG_C13`; cannot stack with Hall commitment or any existing C13 Crucible.
- Routing trigger: ask only when a public-order, community, obligation, or oath boundary is live and the player has relevant table-deal experience.
- Novice readability: “repeatable threat” must retain the existing plain-language help; every option states what happens to the agreement rather than using political labels.

| Answer choice | Observation produced | Identities helped | Guardrail |
|---|---|---|---|
| Keep one clear rule and apply it to everyone. | Prefers public procedural consistency. | W; WU; Bant | Procedure alone is not Azorius or Bant. |
| Preserve access for everyone affected by the threat. | Prefers a protected commons. | WG; Ink; WUBRG | Shared access does not prove Ink, especially before frontier diagnosis. |
| Keep the terms because the promise still binds. | Prefers durable obligation despite changed advantage. | WB; Abzan | A kept deal alone is not Orzhov or Abzan. |
| Keep only the coordinated action needed for this opening. | Prefers bounded oath-like coordination. | WR; Mardu | Short commitment does not prove martial identity. |
| Reopen the agreement because the facts changed. | Prefers revisable present influence. | Silverquill | Revisability alone is not Silverquill. |

## VM555-Q03 - The Opening To End The Game

- Question ID: `VM555-Q03`
- One construct: C07, pressure channel
- Commander situation: The player ahead taps out and leaves one turn where the table can take control. Which kind of pressure do you want your deck to create?
- Exact missing boundary closed: distinguishes coordinated combat, instinctive combat, visible mass pressure, personal burst, resource restriction, and a noncombat finish while keeping all choices within how the deck moves the game toward an ending.
- Evidence role: primary boundary opportunity for R, BR, RG, Jund, Naya, and Mardu; corroboration candidate for WR, Dune, and Prismari.
- Independence: `DG_C07`; independent of existing C03, C04, C11, C12, and C13 naming signals, but not of Hall C07.
- Routing trigger: ask when several candidates agree on proactive play but differ in the pressure they create.
- Novice readability: avoids “tempo,” “clock,” and faction-coded language; “taps out” requires the existing community-standard explanation.

| Answer choice | Observation produced | Identities helped | Guardrail |
|---|---|---|---|
| Coordinate the board into one disciplined attack. | Prefers formation-based combat pressure. | WR; Mardu; Dune | Combat coordination does not prove duty or missing-Blue metaphysics. |
| Attack with the bodies and opening already present. | Prefers immediate embodied combat pressure. | R; RG; Jund | Combat alone does not distinguish Red, Gruul, or Jund. |
| Turn a wide living board into sustained pressure. | Prefers abundance-based board pressure. | WG; Naya | A wide board does not prove belonging. |
| Build one visible turn that changes the game. | Prefers a concentrated exposed payoff. | BR; Prismari | A large turn does not prove appetite or expression. |
| Narrow the opponents' remaining options first. | Prefers resource-control pressure. | WU; WB; U | Control pressure does not name an identity. |
| Finish through a noncombat engine. | Prefers engine-based ending pressure. | UR; U; Colorless | A noncombat engine does not imply artifacts, Izzet, or Colorless. |

## VM555-Q04 - Rebuilding The Engine

- Question ID: `VM555-Q04`
- One construct: C06, engine concentration
- Commander situation: Opponents have learned how to stop your main engine. When you revise the deck, what structure do you want next?
- Exact missing boundary closed: distinguishes exact central reconstruction, replaceable function, and overlapping modules in a second context focused on deck revision rather than one in-game board state.
- Evidence role: primary boundary opportunity for U and UB; corroboration candidate for UR, BG, Lorehold, Quandrix, Witherbloom, Sultai, Colorless, and WUBRG.
- Independence: `DG_C06`; does not stack with Hall C06 or any C06 Crucible. It is independent of current C04, C12, C14, and C15 naming signals.
- Routing trigger: ask only when engine structure remains a live separator and no C06 item has already supplied the boundary.
- Novice readability: uses the existing operational definition of “engine”; answers describe card roles rather than redundancy jargon.

| Answer choice | Observation produced | Identities helped | Guardrail |
|---|---|---|---|
| Rebuild the same central engine and protect it better. | Accepts one designed central dependency. | U; Esper; Quandrix | Centrality alone does not establish perfection or mathematics. |
| Add several cards that can perform the same job. | Prefers replaceable functional redundancy. | Colorless; Yore; Lorehold | Machinery or redundancy must not name Colorless or Yore. |
| Use several smaller engines that overlap. | Prefers modular adaptation. | UG; UR; BG; Witherbloom | Modularity alone does not name any pair or college. |
| Keep one purpose but change which tool reaches it. | Prefers stable purpose with flexible implementation. | UB; Sultai; WUBRG | Toolbox play does not prove secrecy, opportunity, or five-color integration. |

## VM555-Q05 - When The Plan Becomes Visible

- Question ID: `VM555-Q05`
- One construct: C08, commitment and interaction window
- Commander situation: An opponent begins a decisive turn, but you do not yet know which card matters most. When do you want your deck to commit its answer?
- Exact missing boundary closed: separates early prevention, response after the key piece is visible, action during the opponent's commitment, and a split line that advances while preserving one bounded answer.
- Evidence role: primary boundary opportunity for U, UB, and WU; possible corroboration for UR, Glint, and Silverquill only if later semantic review supports the identity association.
- Independence: `DG_C08`; this is a candidate consolidation or replacement, not a third stackable C08 observation.
- Routing trigger: ask only when information use and interaction timing separate the remaining candidates and neither existing C08 item has been used.
- Novice readability: “decisive turn” is explained by the scenario; “commit its answer” should be rendered as “use the card or mana you kept available” for newer-player review.

| Answer choice | Observation produced | Identities helped | Guardrail |
|---|---|---|---|
| Act before the decisive action can begin. | Prefers early prevention. | W; WU | Prevention alone does not establish public procedure. |
| Wait until the key piece is visible. | Prefers information before commitment. | U; UB | Waiting alone does not establish Blue or secrecy. |
| Act while the opponent commits the decisive resources. | Prefers the commitment window. | UB; Grixis; Glint | Timing alone does not prove leverage or survival. |
| Advance the plan but preserve one precise answer. | Prefers split commitment. | UR; Jeskai | Split mana does not prove experiment or trained action. |

## VM555-Q06 - Growth While The Table Moves

- Question ID: `VM555-Q06`
- One construct: C14, development horizon
- Commander situation: Your deck becomes much stronger after several setup turns, but the table is already developing threats. What must the setup do along the way?
- Exact missing boundary closed: distinguishes early contribution, staged value, protected long setup, and abandonment of the long plan when it cannot participate.
- Evidence role: primary boundary opportunity for G, WG, Abzan, and Naya; corroboration candidate for BG, Quandrix, Witherbloom, Bant, and Temur.
- Independence: `DG_C14`; cannot stack with Hall C14 or the Ink/Witch C14 Crucible. It is independent of C06, C12, C13, and C15 naming signals.
- Routing trigger: ask when development horizon separates the current frontier and no C14 observation has already been selected.
- Novice readability: “setup” uses its existing operational explanation; each answer states when the deck helps the current game.

| Answer choice | Observation produced | Identities helped | Guardrail |
|---|---|---|---|
| Help the table or protect something immediately. | Requires early useful participation. | WG; Ink; Bant | Helpfulness alone does not prove community identity. |
| Let every setup step create some value. | Prefers staged cultivation. | G; BG; Abzan; Witherbloom | Incremental value does not prove growth philosophy. |
| Protect one pattern even if the payoff comes much later. | Accepts long concentrated development. | Quandrix; Witch | Long setup does not establish mathematics or missing Red. |
| Change plans if the setup cannot affect this game. | Prefers board-responsive development. | Temur; Glint; R | Abandoning setup does not prove attunement or freedom. |

## Routing-Only Corrections

No new question is recommended for these identities:

- UG: route C03 and C14 before the existing C06 UG/Quandrix Crucible; do not also count Hall C06.
- WB: route an independent C12 or C09 observation before the existing C13 WB/Silverquill Crucible; do not also count Hall C13.
- Witch: route C09, then select either the C14 Ink/Witch boundary or the C06 Witch/Yore boundary based on the live competitor. The one-Crucible limit is expected and does not require a third Witch item.

Bant, Silverquill, Sultai, and Temur remain `ROUTING_AND_CORROBORATION`. Before selecting a candidate question for them, prove that the route cannot already assemble the required independent constructs. A larger bank does not repair an eligibility defect.

## Ink Diagnostic Before Authoring

Ink receives no candidate question in this pass. First classify its failure using an exact frontier trace:

1. `OBSERVATION`: no current answer expresses defended circulation strongly enough;
2. `ROUTING`: the Dune/Ink or Ink/Witch item is eligible but never reached;
3. `COMPETITION`: W, WG, Naya, Bant, Witch, or another identity absorbs the same evidence;
4. `REPRESENTATION`: the available answer wording fails to describe how a player would enact the behavior.

Only an `OBSERVATION` or `REPRESENTATION` finding may justify a new Ink item. `ROUTING` requires route correction, and `COMPETITION` requires a sharper boundary or stopping rule rather than more Ink-flavored wording.

## Yore Boundary

No Yore question is proposed. Existing C06 redundancy and C09 repeatability observations do not directly expose constructed agency against natural limits. Until an ordinary Commander decision can do that without artifact, optimization, or consistency proxies, Yore remains semantically meaningful and behaviorally unnameable at the current evidence standard.

## Required Review Before Any Bank Change

For each candidate retained later:

1. adjudicate every answer for one-construct fidelity, desirability, novice clarity, and identity giveaway;
2. declare exact competitor scope and `do_not_ask_when` boundaries;
3. prove dependency handling against the existing Gate/Hall/Crucible items;
4. decide whether it replaces an existing pool item or reopens `OD-B1-02`;
5. obtain player comprehension and mapping evidence before any scoring authority;
6. preserve close, tied, mixed, contradictory, and insufficient outcomes.

No candidate in this document is implementation-ready.

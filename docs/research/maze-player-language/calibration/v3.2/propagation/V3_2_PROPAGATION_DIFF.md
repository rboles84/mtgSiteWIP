# Calibration V3.2 Propagation Diff

**Disposition:** OWNER ACCEPTED — promoted as governed workbook authority; no runtime authority or implementation is implied.

## Population Reconciliation

- Baseline Master Lexicon population: **1,138** unique rows.
- Already explicitly governed in the V3.2 authority workbook: **3** rows (Counterspell, Reanimator, Group Slug).
- Eligible automatic-evaluation population: **1,135** rows.
- Expected business estimate: **1,038** remaining rows.
- Reconciled discrepancy: **+97** eligible rows. The 100 VM-578 calibration cases are request-level fixtures, not one-to-one Master Lexicon rows; only three prior changes are row-addressable in Master_Lexicon.
- Changed eligible rows: **24**.
- Unchanged eligible rows: **1,111**.
- Reconciliation: **24 changed + 1,111 unchanged = 1,135 eligible**.

## Candidate Outcome

- Promotions: **7** (Creature destruction, mass (Destroy all), Destroy all creatures controlled by one player, "Flicker", Mana production, permanent, Mana production, temporary, "Reanimation" (creatures), Treasure creation).
- Downgrades: **1** (Treasure).
- Candidate Production-ready total: **666**.
- Candidate Review total: **287**.
- Candidate Semantic total: **185**.
- Multi-Lens conversions: **12** (Creature destruction, mass (Destroy all), Destroy all creatures controlled by one player, "Flicker", Increasing counters and/or tokens, Mana production, permanent, Mana production, temporary, Tokens, Aristocrats, Treasure, Blink / Flicker, Sacrifice, ETB Value).
- Confidence changes: **19 increased**, **2 decreased**, **3 unchanged among changed rows**.

## Owner Finding Remediation Delta

- Prior 24-row owner-review candidate SHA-256: `8f0aa0411d15509574fd0aab4111a8bbe7e7739d00e0446a604a575cc9361129`.
- Remediated candidate SHA-256: `f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5`.
- Relative workbook and CSV comparison found exactly one changed Master source row: `ColorPie!A36:E36`; the other 23 accepted propagation rows are unchanged.
- Row 909: Mechanical pattern → Multi-Lens function; ownership-specific Oracle lens → governed Multi-Lens recipe; all-opponents query → target-one-opponent primary lane; survivor-only alternate → separately labeled all-opponents/spare-my-board plus survivor lanes; Production-ready / 0.90 → Review / 0.68.
- Four Dashboard formula results recalculated from the status/classification change; formula definitions did not change.
- Finding-to-invariant: one-player intent and all-opponents/spare-my-board intent must remain separately named lanes, and an unvalidated major branch cannot be Production-ready.

## Rule Frequency

- CAL-053: 12
- CAL-043: 9
- CAL-010: 8
- CAL-022: 8
- CAL-013: 7
- CAL-033: 5
- CAL-017: 3
- CAL-018: 2
- CAL-020: 2
- CAL-026: 2
- CAL-029: 2
- CAL-037: 2
- CAL-044: 2
- CAL-045: 2
- CAL-055: 2
- CAL-056: 2
- CAL-009: 1
- CAL-016: 1
- CAL-023: 1
- CAL-050: 1
- CAL-054: 1

## Highest-Risk Changes

1. Board-wipe rows now keep distinct governed lanes. The EV-003 intersection/alternate-lane model remains the broad-wipe contract, while the one-player row separates target-one-opponent wording from EV-001's all-opponents/spare-my-board wording and remains Review pending targeted-lane validation.
2. Mana-production rows now use produces: only as a capability signal. Duration, self-production, land-untap acceleration, and grantor/support roles remain post-retrieval classifications.
3. Composite archetypes (Tokens, Aristocrats, Blink/Flicker, Sacrifice, ETB Value) now expose named roles instead of opaque OR queries; most remain Review because the lanes are governed but not mechanically exhaustive.
4. Treasure is downgraded from Production-ready to Review because a bare o:Treasure query conflates generators, token objects, payoffs, and spenders.

## Unresolved Classes for Future Targeted Calibration

- Broad subjective archetypes such as Control, Stax, Chaos, Goodstuff, Midrange Value, and Group Hug remain Semantic rather than receiving invented proxies.
- Mana-production duration and repeatability need a targeted classifier calibration beyond the broad produces: capability signal.
- Graveyard Value, Spellslinger, Enchantress, Lands Matter, and similar relationship archetypes need role-specific calibration rather than one text query.
- The existing Reanimator fallback references otag:reanimate, which is not present in the current Tagger_Allowlist. It predates this pass and was preserved as frozen V3.2 history; this pass introduced no non-allowlisted Tagger value.
- No direct Master Lexicon row exists for the full grindy-draw phrase, soft-preference vocabulary, session-context contract, or contradiction UX. Their frozen behavior remains in Learned_Rules, Translation_Contract, Resolved_29_V3, and Evidence_Closure_V3_2 rather than being guessed into unrelated rows.

## Supporting-Sheet Treatment

- README A1:A2 is the only direct supporting-sheet edit; it clearly labels the workbook as a candidate and not production authority.
- Dashboard formulas were preserved and recalculate from the propagated Master_Lexicon state.
- Plain_Language, Archetype_Map, Query_Recipes, Regex_Library, Parser_Schema, Tagger_Allowlist, Learned_Rules, Translation_Contract, Archscry_Enrichment, all owner/evidence sheets, and scryall_data_accumulation were not rewritten.

## Detailed Changed Rows

| Row | Term | Status | Strategy / Query | Trace | Reason |
| --- | --- | --- | --- | --- | --- |
| 340 / Keywords!A3:C3 | Counter | Review → Review | oracle: → governed intent branch; o:"Counter" → (blank) | CAL-029; CAL-037 | Replace an unsafe bare Oracle search with the governed polysemy branch. |
| 620 / KeywordActions!A19:B19 | Counter | Review → Review | oracle: → governed intent branch; o:"Counter" → (blank) | CAL-029; CAL-037 | Apply the same governed polysemy branch to the duplicate source vocabulary row. |
| 908 / ColorPie!A35:E35 | Creature destruction, mass (Destroy all) | Review → Production-ready | Oracle regex → governed Multi-Lens recipe; o:/destroy all.*creature/ → otag:board-wipe (o:"destroy all creatures" or o:"exile all creatures" or o:"each creature gets -" or o:"damage to each creature" or o:"sacrifice all") | CAL-020; CAL-044; CAL-055; EV-003 | Convert the single destroy-all regex into the frozen board-wipe differential architecture. |
| 909 / ColorPie!A36:E36 | Destroy all creatures controlled by one player | Semantic → Review | Semantic concept → governed Multi-Lens recipe; (blank) → (o:"destroy all creatures target opponent controls" or o:"exile all creatures target opponent controls") | CAL-020; CAL-043; CAL-044; CAL-055; EV-001; EV-003 | Separate the unvalidated target-one-opponent family from EV-001's all-opponents/spare-my-board family and retain Review status. |
| 964 / ColorPie!A91:E91 | "Flicker" | Semantic → Review | Semantic concept → governed Multi-Lens recipe; (blank) → o:"exile target" o:return o:battlefield | CAL-017; CAL-043 | Replace an unresolved Flicker concept with the governed three-role recipe while retaining Review status. |
| 987 / ColorPie!A114:E114 | Increasing counters and/or tokens | Review → Review | Oracle regex → governed Multi-Lens recipe; o:/create.*token/ → (blank) | CAL-033; CAL-043 | Remove a token-only query that silently discarded the counter branch. |
| 1002 / ColorPie!A129:E129 | Mana production, permanent | Semantic → Review | Semantic concept → structured signal + role classifier; (blank) → produces:[MANA] | CAL-023; CAL-045; CAL-056; EV-004 | Introduce the documented structured signal and the frozen mana-source role classifier. |
| 1003 / ColorPie!A130:E130 | Mana production, temporary | Semantic → Review | Semantic concept → structured signal + role classifier; (blank) → produces:[MANA] | CAL-045; CAL-056; EV-004 | Use the structured capability signal without inventing a direct duration operator. |
| 1031 / ColorPie!A158:E158 | "Reanimation" (creatures) | Semantic → Review | Semantic concept → order-independent Oracle recipe; (blank) → (o:put or o:return) o:"creature card" o:graveyard o:battlefield | CAL-022; CAL-054 | Apply the corrected put-or-return reanimation family while preserving semantic limits. |
| 1034 / ColorPie!A161:E161 | Return target card from graveyard to hand | Review → Review | Oracle regex → destination-specific Oracle lens; o:/return.*graveyard/ → o:"return target card" o:graveyard o:hand | CAL-010; CAL-013; CAL-022; CAL-053 | Replace the generic ordered recursion regex with a card-specific graveyard-to-hand candidate lens. |
| 1035 / ColorPie!A162:E162 | Return target artifact from graveyard to hand | Review → Review | Oracle regex → destination-specific Oracle lens; o:/return.*graveyard/ → o:"return target artifact" o:graveyard o:hand | CAL-010; CAL-013; CAL-022; CAL-053 | Replace the generic ordered recursion regex with a artifact-specific graveyard-to-hand candidate lens. |
| 1036 / ColorPie!A163:E163 | Return target creature from graveyard to hand | Review → Review | Oracle regex → destination-specific Oracle lens; o:/return.*graveyard/ → o:"return target creature" o:graveyard o:hand | CAL-010; CAL-013; CAL-022; CAL-053 | Replace the generic ordered recursion regex with a creature-specific graveyard-to-hand candidate lens. |
| 1037 / ColorPie!A164:E164 | Return target enchantment from graveyard to hand | Review → Review | Oracle regex → destination-specific Oracle lens; o:/return.*graveyard/ → o:"return target enchantment" o:graveyard o:hand | CAL-010; CAL-013; CAL-022; CAL-053 | Replace the generic ordered recursion regex with a enchantment-specific graveyard-to-hand candidate lens. |
| 1038 / ColorPie!A165:E165 | Return target instant from graveyard to hand | Review → Review | Oracle regex → destination-specific Oracle lens; o:/return.*graveyard/ → o:"return target instant" o:graveyard o:hand | CAL-010; CAL-013; CAL-022; CAL-053 | Replace the generic ordered recursion regex with a instant-specific graveyard-to-hand candidate lens. |
| 1039 / ColorPie!A166:E166 | Return target land from graveyard to hand | Review → Review | Oracle regex → destination-specific Oracle lens; o:/return.*graveyard/ → o:"return target land" o:graveyard o:hand | CAL-010; CAL-013; CAL-022; CAL-053 | Replace the generic ordered recursion regex with a land-specific graveyard-to-hand candidate lens. |
| 1040 / ColorPie!A167:E167 | Return target sorcery from graveyard to hand | Review → Review | Oracle regex → destination-specific Oracle lens; o:/return.*graveyard/ → o:"return target sorcery" o:graveyard o:hand | CAL-010; CAL-013; CAL-022; CAL-053 | Replace the generic ordered recursion regex with a sorcery-specific graveyard-to-hand candidate lens. |
| 1063 / ColorPie!A190:E190 | Token generation | Review → Review | Oracle regex → Oracle creation pattern; o:/create.*token/ → o:create o:token | CAL-010; CAL-033; CAL-053 | Replace an ordered create.*token regex with the governed generator pattern and explicit payoff branch. |
| 1066 / ColorPie!A193:E193 | Treasure creation | Semantic → Production-ready | Semantic concept → Oracle creation pattern; (blank) → o:create o:"Treasure token" | CAL-009; CAL-033; CAL-053 | Promote the exact Treasure-creation concept using the governed creation wording. |
| 1085 / DeckArchetypes!B2 | Tokens | Review → Review | native / tag / regex recipe → governed Multi-Lens recipe; o:/create.*token/ → o:create o:token | CAL-033; CAL-043; CAL-053 | Convert the archetype to named roles and remove a non-allowlisted Tagger shortcut. |
| 1091 / DeckArchetypes!B8 | Aristocrats | Review → Review | native / tag / regex recipe → governed Multi-Lens recipe; o:sacrifice → (o:"sacrifice a creature:" or o:"sacrifice another creature:") | CAL-018; CAL-026; CAL-043 | Turn Aristocrats into the governed small-role bundle instead of a generic sacrifice search. |
| 1096 / DeckArchetypes!B13 | Treasure | Production-ready → Review | native / tag / regex recipe → governed Multi-Lens recipe; o:Treasure → o:create o:"Treasure token" | CAL-033; CAL-043; CAL-053 | Downgrade an overconfident bare-Treasure query to transparent role lanes. |
| 1101 / DeckArchetypes!B18 | Blink / Flicker | Production-ready → Production-ready | native / tag / regex recipe → governed Multi-Lens recipe; o:/exile.*return.*battlefield/ → otag:blink | CAL-017; CAL-043; CAL-053 | Replace one ordered regex with the allowlisted candidate tag plus named mechanical lanes. |
| 1114 / DeckArchetypes!B31 | Sacrifice | Review → Review | native / tag / regex recipe → governed role recipe; o:sacrifice → o:sacrifice | CAL-018; CAL-026; CAL-043 | Make sacrifice direction and outlet intent explicit while preserving Review status. |
| 1133 / DeckArchetypes!B50 | ETB Value | Review → Review | native / tag / regex recipe → governed Multi-Lens recipe; o:/when ~ enters\|whenever .* enters/ → (o:"when ~ enters" or o:"whenever ~ enters") | CAL-016; CAL-017; CAL-043; CAL-050 | Split ETB value into the governed trigger/watcher/target/doubler roles. |

The companion CSV contains every required old/new field, authority/evidence source, rule trace, status movement, and rationale without Markdown truncation.

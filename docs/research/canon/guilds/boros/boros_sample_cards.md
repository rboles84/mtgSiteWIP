# Sample Cards — Implementation Notes

## Aurelia, the Warleader
**Mechanics composition:** `ExtraCombat(times=1)` + `Radiance(filter=is_attacking, effect=+1/+0)` + `LeadershipAura(range=allied)`  
**Implementation note:** Insert an extra combat phase for the controller and apply a temporary buff to attacking allied nodes; the Radiance aura applies to all allied attackers. Use `ExtraCombat` to duplicate the combat resolution and `Radiance` to apply the buff.  
**Flavor (paraphrase):** "Her strike calls the legion; the legion answers."

## Boros Charm
**Mechanics composition:** modal `HardinessFlag(duration=1)` OR `DamageRedirect(target=player)` OR `Boost(allied, +X)`  
**Implementation note:** Implement as a modal effect chooser. The `HardinessFlag` sets an indestructible flag for a tick; `DamageRedirect` reroutes damage; `Boost` applies a temporary power/toughness increase.  
**Flavor (paraphrase):** "A sudden flare of unbreakable will."

## Sunhome Guildmage
**Mechanics composition:** `TokenCreation(type=Soldier)` + `Radiance(effect=+1/+0 to tokens)` + `TeamPump`  
**Implementation note:** Use a generator primitive to spawn token nodes and a field generator to buff them. The Guildmage is a small engine that seeds formation and then amplifies it.  
**Flavor (paraphrase):** "Order is taught, and zeal follows."

## Boros Reckoner
**Mechanics composition:** `ConditionalDamage(on_receive)` + `Scaling(factor=damage_received)`  
**Implementation note:** When the Reckoner receives damage, compute a conditional retaliation effect scaled by the incoming damage; use a `HardinessFlag` only if a modal effect grants it.  
**Flavor (paraphrase):** "Measured fury that answers with precision."

## Firemane Avenger
**Mechanics composition:** `CombatTriggerDamage(trigger=on_attack)` + `Vengeance(target=attacker)`  
**Implementation note:** On successful combat triggers, apply targeted damage to an opponent or opposing node. Use this to model retributive purification.  
**Flavor (paraphrase):** "Justice that burns away the stain."

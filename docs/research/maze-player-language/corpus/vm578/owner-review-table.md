# VM-578 Owner Review Table

| Case | Baseline | Input | Current Query | Review reason |
|---|---|---|---|---|
| VM578-001 | PARTIAL | I want colorless but only wolves or other creatures like wolves and i would like deathouch and haste if possible | type:wolf type:creature c:c kw:haste kw:deathtouch | optionality needs owner review |
| VM578-002 | PARTIAL | blue and green worm creatures that help me trigger etb effects | type:worm type:creature c:ug o:enters | optionality needs owner review; functional-language unresolved |
| VM578-003 | PASS | cards I can run in my simic commander deck | id<=ug legal:commander |  |
| VM578-004 | PASS | exactly blue and green cards | c=ug |  |
| VM578-005 | PARTIAL | no colors outside blue and green for commander | c:ug legal:commander | required constraint missing; color-vs-identity interpretation; OR/exclusion/scope handling |
| VM578-006 | FAIL | mono black cards for my golgari deck | c:bg | required constraint missing; color-vs-identity interpretation; OR/exclusion/scope handling |
| VM578-007 | PARTIAL | colorless cards for my five color deck | c:wubrg c:c | required constraint missing; color-vs-identity interpretation |
| VM578-008 | PARTIAL | blue or green but not multicolor | c<=ug | required constraint missing; color-vs-identity interpretation; OR/exclusion/scope handling |
| VM578-009 | PARTIAL | rakdos commanders that make treasure | id=br o:treasure is:commander legal:commander | optionality needs owner review |
| VM578-010 | PARTIAL | cards for a mono red commander that are not red | -c:r is:commander legal:commander | required constraint missing; color-vs-identity interpretation; OR/exclusion/scope handling |
| VM578-011 | FAIL | azorius cards with white or blue identity | c<=wu | required constraint missing; color-vs-identity interpretation; OR/exclusion/scope handling |
| VM578-012 | PARTIAL | green white enchantments for my selesnya commander list | type:enchantment id<=wg legal:commander | required constraint missing; color-vs-identity interpretation |
| VM578-013 | PARTIAL | five color commanders that care about lands | type:land id=wubrg is:commander legal:commander | optionality needs owner review |
| VM578-014 | PARTIAL | colorless commanders that make colorless mana | id:c is:commander legal:commander produces:c | required constraint missing; color-vs-identity interpretation; high-confidence bad or incomplete interpretation |
| VM578-015 | PARTIAL | cards legal in commander with no color identity | is:commander legal:commander | required constraint missing; color-vs-identity interpretation |
| VM578-016 | PASS | red dragons with haste | type:dragon c:r kw:haste |  |
| VM578-017 | PASS | black creatures with deathtouch | type:creature c:b kw:deathtouch |  |
| VM578-018 | FAIL | two mana counterspells | otag:counterspell | required constraint missing |
| VM578-019 | PARTIAL | cheap removal spells in black | c:b otag:removal usd<=1 | optionality needs owner review |
| VM578-020 | PASS | creatures with flying and vigilance | type:creature kw:flying kw:vigilance |  |
| VM578-021 | PARTIAL | artifacts with equip | t:artifact kw:equip | required constraint missing; high-confidence bad or incomplete interpretation |
| VM578-022 | PASS | green cards with landfall | c:g kw:landfall |  |
| VM578-023 | PASS | white creatures with ward | type:creature c:w kw:ward |  |
| VM578-024 | PARTIAL | instant speed card draw | type:instant otag:draw | optionality needs owner review |
| VM578-025 | PARTIAL | red burn spells that hit players | c:r o:damage | optionality needs owner review |
| VM578-026 | PARTIAL | cards with surveil for dimir | c:ub kw:surveil | required constraint missing; color-vs-identity interpretation |
| VM578-027 | PARTIAL | spells with flashback in izzet | c:ur kw:flashback | required constraint missing; color-vs-identity interpretation |
| VM578-028 | PARTIAL | cheap creatures with menace or deathtouch | type:creature (kw:menace OR kw:deathtouch) usd<=1 | optionality needs owner review |
| VM578-029 | PARTIAL | vehicles that crew easily | type:vehicle o:crew | functional-language unresolved |
| VM578-030 | PARTIAL | sagas in enchantress colors | type:saga type:enchantment | owner interpretation review |
| VM578-031 | PARTIAL | ramp for a six mana commander | otag:ramp legal:commander | owner interpretation review |
| VM578-032 | FAIL | cheap interaction for izzet | c:ur usd<=1 | required constraint missing; color-vs-identity interpretation |
| VM578-033 | PARTIAL | cards that let me reuse my etbs | * | functional-language unresolved |
| VM578-034 | PARTIAL | things that care when my creatures die | type:creature | owner interpretation review |
| VM578-035 | PARTIAL | ways to protect my commander | legal:commander | owner interpretation review |
| VM578-036 | FAIL | cards that help a token deck without making tokens | o:token | forbidden component present; OR/exclusion/scope handling; functional-language unresolved |
| VM578-037 | FAIL | draw engines for a grindy black deck | c:b otag:draw | required constraint missing |
| VM578-038 | FAIL | graveyard recursion in abzan | c:wbg o:return o:graveyard | required constraint missing; color-vs-identity interpretation |
| VM578-039 | PARTIAL | sacrifice outlets for meren | o:sacrifice | functional-language unresolved |
| VM578-040 | FAIL | blink payoffs for bant | c:wug o:exile o:return o:battlefield | required constraint missing; color-vs-identity interpretation |
| VM578-041 | PARTIAL | board wipes that spare my creatures | type:creature otag:board-wipe | functional-language unresolved |
| VM578-042 | PARTIAL | graveyard hate that doesn't hurt my own graveyard | o:/exile.*graveyard/ | functional-language unresolved |
| VM578-043 | FAIL | mana dorks under two mana | t:creature o:"{T}: add" | required constraint missing |
| VM578-044 | PARTIAL | cards that punish opponents for drawing extra cards | * | functional-language unresolved |
| VM578-045 | PARTIAL | finishers for go wide tokens | o:token | functional-language unresolved |
| VM578-046 | PARTIAL | recursion pieces that bring creatures back from the graveyard | type:creature c:b o:return o:graveyard | owner interpretation review |
| VM578-047 | PARTIAL | cards that double my death triggers | o:double otag:death-trigger | functional-language unresolved; high-confidence bad or incomplete interpretation |
| VM578-048 | FAIL | ways to make treasures in rakdos | c:br o:treasure | required constraint missing; color-vs-identity interpretation |
| VM578-049 | PARTIAL | cards that care about combat damage to players | type:wombat | owner interpretation review |
| VM578-050 | PARTIAL | interaction that stops combos without being stax | otag:stax | functional-language unresolved |
| VM578-051 | PARTIAL | counterspells preferably two mana or less | otag:counterspell | owner interpretation review |
| VM578-052 | PARTIAL | removal for my deck bonus if it exiles | otag:removal | owner interpretation review |
| VM578-053 | PARTIAL | green ramp spells if possible on creatures | type:creature c:g otag:ramp | optionality needs owner review |
| VM578-054 | PARTIAL | draw cards maybe artifacts would be nice | t:artifact otag:draw | owner interpretation review |
| VM578-055 | PASS | show me dragons, preferably not super expensive | type:dragon usd>=20 |  |
| VM578-056 | PARTIAL | i need board wipes but not too many colors | otag:board-wipe | functional-language unresolved |
| VM578-057 | PARTIAL | cheap protection spells under three mana if possible | kw:protection usd<=1 | owner interpretation review |
| VM578-058 | FAIL | tokens stuff for selesnya, bonus if it draws cards | c:wg o:token | required constraint missing; color-vs-identity interpretation |
| VM578-059 | FAIL | something like Sol Ring for a green deck | c:g | required constraint missing; color-vs-identity interpretation |
| VM578-060 | PARTIAL | little creatures that replace themselves would be great | type:creature | optionality needs owner review |
| VM578-061 | PASS | dragons with haste or trample | type:dragon (kw:haste OR kw:trample) |  |
| VM578-062 | PASS | creatures with flying and not defender | type:creature kw:flying -kw:defender |  |
| VM578-063 | PARTIAL | only goblins that make treasure | type:goblin o:treasure | optionality needs owner review |
| VM578-064 | PARTIAL | elves or druids that tap for mana | (type:elf OR type:druid) | owner interpretation review |
| VM578-065 | PASS | equipment but not creatures | type:equipment -type:creature |  |
| VM578-066 | FAIL | artifacts except vehicles | t:artifact type:vehicle | required constraint missing; OR/exclusion/scope handling |
| VM578-067 | PARTIAL | at least three toughness walls | type:wall | required constraint missing; OR/exclusion/scope handling |
| VM578-068 | FAIL | no more than two mana rocks | otag:mana-rock | required constraint missing; OR/exclusion/scope handling |
| VM578-069 | FAIL | either removal or counterspells for dimir | c:ub kw:wither otag:counterspell otag:removal | required constraint missing; color-vs-identity interpretation; OR/exclusion/scope handling; high-confidence bad or incomplete interpretation |
| VM578-070 | PARTIAL | lifegain without lifelink | o:"gain life" -kw:lifelink | optionality needs owner review |
| VM578-071 | PARTIAL | deathouch creatures | type:creature kw:deathtouch | optionality needs owner review |
| VM578-072 | PASS | wurm creatures not worm | type:wurm type:creature -type:worm |  |
| VM578-073 | FAIL | etb creatures in bant | c:wug is:etb t:creature | required constraint missing; color-vs-identity interpretation |
| VM578-074 | FAIL | aristos stuff for orzhov | c:wb | required constraint missing; color-vs-identity interpretation |
| VM578-075 | FAIL | boardwipes for esper | c:wub | required constraint missing; color-vs-identity interpretation |
| VM578-076 | FAIL | mana dorkes for green | c:g | required constraint missing |
| VM578-077 | FAIL | izzet spellslinger cantrips | c:ur o:whenever o:cast (o:instant OR o:sorcery) mv=1 o:draw | required constraint missing; color-vs-identity interpretation; high-confidence bad or incomplete interpretation |
| VM578-078 | FAIL | cheap rocks for colorless | c:c usd<=1 | required constraint missing; color-vs-identity interpretation |
| VM578-079 | FAIL | token doublers naya | c:wrg o:token | required constraint missing; color-vs-identity interpretation |
| VM578-080 | PARTIAL | recure creatures from graveyard | type:creature o:return o:graveyard | owner interpretation review |
| VM578-081 | PARTIAL | stuff for my aristocrats deck | otag:death-trigger | functional-language unresolved |
| VM578-082 | PARTIAL | draw go control cards | o:draw | functional-language unresolved |
| VM578-083 | FAIL | group slug cards in rakdos | type:slug c<=br -c:c | required constraint missing; color-vs-identity interpretation |
| VM578-084 | PARTIAL | stax pieces that are still fun for a casual table | otag:stax | functional-language unresolved |
| VM578-085 | PARTIAL | pet cards for a zombie deck | type:zombie | owner interpretation review |
| VM578-086 | PARTIAL | creepy graveyard cards that fit zombies | type:zombie o:graveyard | functional-language unresolved |
| VM578-087 | PARTIAL | cards like Blood Artist | type:blood | functional-language unresolved; similarity unsupported |
| VM578-088 | PARTIAL | something like craterhoof for tokens | o:token | functional-language unresolved; similarity unsupported |
| VM578-089 | PARTIAL | hidden gems for enchantress | type:enchantment | owner interpretation review |
| VM578-090 | FAIL | cards that make my artifacts deck actually go wide | t:artifact o:token | required constraint missing |
| VM578-091 | PARTIAL | counter cards | o:counter | owner interpretation review |
| VM578-092 | PARTIAL | blink cards | o:exile o:return o:battlefield | owner interpretation review |
| VM578-093 | PARTIAL | chaos commanders | id=ubrg is:commander legal:commander | high-confidence bad or incomplete interpretation |
| VM578-094 | PARTIAL | equipment for creatures but not equipment | -type:equipment type:creature | high-confidence bad or incomplete interpretation |
| VM578-095 | PASS | goblins but not creatures | type:goblin -type:creature |  |
| VM578-096 | PARTIAL | show me mono black cards for my simic commander deck | id=ubg c:ug legal:commander | required constraint missing; color-vs-identity interpretation |
| VM578-097 | PARTIAL | exactly blue and green cards but no blue cards | c=g -c:u | required constraint missing; OR/exclusion/scope handling |
| VM578-098 | PASS | legendary instant creatures | type:legendary type:instant type:creature |  |
| VM578-099 | PARTIAL | cards with storm but no spells | kw:storm | required constraint missing |
| VM578-100 | PARTIAL | all the goodstuff staples for casual commander | legal:commander | owner interpretation review |

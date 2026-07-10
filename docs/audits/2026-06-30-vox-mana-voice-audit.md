# Vox Mana Voice, Copy, And Anti-Slop Audit

Date: 2026-06-30
Agent: Codex
Related card: VM-439
Scope: User-facing product copy, data-fed visible copy, public-route metadata, empty/error states, and copy-boundary risks.

## Pre-Flight Review Summary

Reviewed before audit work:

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-27-1903-codex-vm424-homepage-positioning.md`
- `docs/handoffs/2026-06-29-0013-codex-vm426-reading-finds.md`
- `docs/handoffs/2026-06-23-2033-codex-vm416-strategium-content-pass.md`
- `docs/handoffs/2026-06-29-1856-codex-vm428-deep-audit-report.md`
- `docs/handoffs/2026-06-29-2332-codex-vm429-self-snapshot.md`
- Related Kanban cards: `VM-236`, `VM-334`, `VM-374`, `VM-422`, `VM-424`, `VM-426`, `VM-428`, `VM-429`, `VM-431`, `VM-432`.
- Related docs/audits: `docs/audits/2026-06-29-vox-mana-deep-audit.md`, `docs/audits/2026-06-29-vox-mana-self-snapshot.md`, `docs/design/visual-style-guide.md`, `docs/reference/source-generated-guardrails.md`.

Recent related work:

- VM-424 clarified Home as "a Commander identity and taste compass" and added explicit not-a-deckbuilder copy.
- VM-426 reframed Maze capture as local Reading Finds rather than deckbuilding, recommendation, pricing, legality, or analyzer scope.
- VM-416 positioned Strategium as a Commander field-guide learning surface, with Rule 0/table-read/archetype language.
- VM-428 and VM-429 both flagged stale Privacy/Terms copy, Archscry deck-start drift, and the need to preserve source-governed product boundaries.
- VM-422 remains in progress around private saved deck links; public community ledger scope is deferred.

Current known risks:

- Archscry and legal pages still contain stale "guild or college", "10 Ravnica guilds + 5 Strixhaven colleges", and AI-reading language.
- Dossier labels such as "Commander Deck Starts", "Starter Cards", and "Mana Base" can imply deckbuilding or recommendation scope.
- Sultai/Jeskai/four-color presentation copy still exposes internal QA phrases such as "source-bound" and "false-positive boundaries".
- "current Game Changers" is time-sensitive Commander copy and needs source/date governance before release confidence.
- Existing visual and Lighthouse waivers remain documented elsewhere and were not revalidated here.

Relevant decisions already made:

- Vox Mana is a Commander identity and taste compass, not a deckbuilder, decklist importer, legality checker, card recommendation engine, EDHREC clone, wiki, or official rules source.
- Maze can support search and local set-aside behavior, but copy should present it as a support loop for reading and browsing, not a deck construction tool.
- Apocrypha should show source support and research boundaries without becoming an archive dump.
- Colorless and WUBRG require strict boundary language: Colorless is not a sixth color or five-color absence; WUBRG is not "everything, therefore nothing".

Files recently changed by related work:

- Home: `index.html`, `assets/css/home.css`, `assets/js/home.js`
- Archscry/dossier: `archscry/index.html`, `assets/js/index.js`, `assets/js/archscry-presentation.js`, `assets/js/commander-dossier.js`
- Maze: `maze/index.html`, `research/research-init.js`, `research/maze-scratchpad-store.js`
- Strategium: `strategium/index.html`, `assets/js/strategium.js`
- Apocrypha: `apocrypha/index.html`
- Docs/audits/handoffs/kanban files

What should not be touched in this audit:

- Runtime code, generated JSON, source packets, Supabase/RLS work, external vault files, visual baselines, and VM-422 behavior.

Evidence standard used below:

- Confirmed repo evidence: Direct file/path/line evidence from the repository scan.
- Reasonable inference: Risk inferred from product framing, labels, or a user-visible phrase without a live browser trace.
- Unknowns: Current production deployment state, live A/B state, and current Commander policy truth were not verified by web lookup in this docs-only audit.

## 1. Voice Verdict

REVISION NEEDED - Vox Mana has a strong core product voice, but several high-visibility surfaces need cleanup before the voice is publishable as a strict QA gate. The strongest voice areas are Home, Strategium, Apocrypha source-boundary copy, Colorless, and WUBRG. The weakest area is the Archscry landing/dossier language, especially where stale 15-faction copy and deck-start wording remain. The biggest product-copy risk is deckbuilder/recommendation drift, amplified by stale legal copy that still describes AI-powered readings and old guild/college scope. The most urgent fix is a boundary copy pass across `archscry/index.html`, `privacy/index.html`, `terms/index.html`, and the dossier navigation labels in `assets/js/index.js`.

## 2. Vox Mana Voice Readback

Vox Mana currently sounds like a source-governed Commander identity field guide with a dark archive aesthetic, practical table literacy, and a measured mythic register. At its best, it names a player's color identity and table instincts without pretending to build a deck for them. At its weakest, it slips into old quiz/faction language, generated dossier cadence, and deck-support labels that make the app sound closer to a recommendation engine than an identity compass.

"Vox Mana should sound like..." a Commander identity field guide that helps a player name their color instincts, compare nearby play patterns, and browse external Commander tools with better taste and clearer questions.

## 3. Product Boundary Check

| Area | Boundary Clear? | Evidence | Risk | Fix |
| --- | --- | --- | --- | --- |
| Home | Yes | `index.html:115` says "Vox Mana is a Commander identity and taste compass"; `index.html:116` says "Not a deckbuilder..." | Minor stale scope in `index.html:714-715`: "colors, guilds, and colleges" understates the current 37-identity system. | Preserve the hero boundary. Replace preview scope with "colors and placement identities". |
| Archscry | Partial | `archscry/index.html:108` says "guild or college"; `archscry/index.html:110` promises "staple cards, land guidance, and Commander deck-start links". | Sounds like a deckbuilder/recommendation tool and describes the old 15-faction scope. | Rewrite around "Commander identity reading", "dossier", "nearby fits", and "what to look for when browsing elsewhere". |
| Maze | Partial | `maze/index.html:89-91` clearly says it translates human language/Scryfall syntax; `maze/index.html:296-318` frames "Reading Finds". | Search, EDHREC sort, price sort, and saved finds can imply a card database or deck tool if the support-loop sentence is missed. | Add/retain helper copy that Maze supports a reading and uses Scryfall; it does not rank, legalize, or build decks. |
| Strategium | Yes | `strategium/index.html:81-84` says "Learn the Commander table"; `assets/js/strategium.js:120-123` says likely colors "are not deckbuilding limits". | "current Game Changers" in `assets/js/strategium.js:43` and `:1018` is time-sensitive. | Add source/date governance or replace with "Commander bracket/watch-list topics your pod should name". |
| Apocrypha | Yes | `apocrypha/index.html:100` says "Where Vox Mana shows its work"; `:477` says video sources are not standalone canon; `:488` says only reviewed public references support claims. | `apocrypha/index.html:417` says "deck-start framing"; "deep dives" repeats at `:184`, `:229`, `:427`. | Replace with "Commander browsing/playstyle context"; rename "Video Lore And Deep Dives" to "Video Lore And Overviews". |
| Identity dossiers | Partial | `assets/js/adaptive-placement.js:580` warns results are not objective diagnosis or official canon; `assets/js/index.js:155-159` labels "Commander Deck Starts", "Starter Cards", "Mana Base". | Dossier nav sounds like a build plan, not a reading companion. | Rename panels to "Commander Browsing Starts", "Card Signals", and "Mana Notes" or add support-only helper text. |
| Commander/precon sections | Partial | `assets/js/index.js:3158` renders "Commander Deck Starts"; `assets/js/commander-dossier.js:3971-3972` exports "Use the deck-start links..." and "Commander Deck-start Links". | External links may read as recommendations, not navigation aids. | Frame as "external browsing starts", "support links", and "examples to inspect elsewhere". |

Confirmed repo evidence: The boundary is explicitly clear on Home, Strategium, and Apocrypha.
Reasonable inference: Archscry/dossier wording creates expectation of actual deck guidance because it names staples, lands, and deck starts.
Unknowns: Whether deployed copy differs from the repo was not checked.

## 4. Anti-Slop Copy Gate

| Gate | Status | Evidence | Fix |
| --- | --- | --- | --- |
| Says something specific | Partial | Strong: `index.html:115-116`, `maze/index.html:89-91`, `apocrypha/index.html:100`. Weak: `maze/index.html:267` "The Archives await". | Preserve specific job-based copy; replace ornamental empty states with recovery instructions. |
| Avoids generic AI cadence | Partial | Repeated "The reading was not one-note" in `assets/js/archscry-presentation.js:800`, `:804`, `:811`, `:815`, `:818`. | Vary adjacent-fit explanations by actual user value. |
| Avoids fake mystical fog | Partial | `archscry/index.html:132` says an identity "answers back"; `maze/index.html:267` says "The Archives await". | Use metaphor only after the literal job is clear. |
| Avoids corporate/product fluff | Pass | The sweep did not find meaningful use of "robust", "seamless", "streamline", "cutting-edge", or "game-changing" in prioritized visible surfaces. | Keep current restraint. |
| Avoids overclaiming | Partial | `research/research-init.js:307` says "Best counterspells"; `terms/index.html:168` names staple cards and land recommendations. | Replace "best" with "examples"; call deck/card material exploratory support. |
| Uses MTG terms correctly | Partial | Strong Colorless/WUBRG guardrails in `assets/js/commander-dossier.js:973-983`, `:990-998`; stale "guild or college" in `archscry/index.html:108`. | Remove outdated scope references and current-rules claims without source/date checks. |
| Explains user value clearly | Partial | Home and Maze do. Archscry says what it opens but overstates output into staples/lands/deck links. | Name the actual value: identity, play-pattern instincts, adjacent fits, and browsing questions. |
| Has useful buttons/labels | Partial | "Start the Quick Reading", "Search the Maze", and "Read the quick guide" are clear. "Step into the maze" and "Open Apocrypha" are more branded than task-specific. | Prefer verb + object labels when a user is deciding what to do next. |
| Handles empty/error states clearly | Partial | `research/research-init.js:856` "Add at least one filter before searching" is useful; "The Archives await" is not. | Empty states should say what to try next. |
| Keeps each identity distinct | Partial | Colorless and WUBRG are distinct. Sultai, some four-color copy, and adjacent-fit fallbacks lean template-heavy. | Reduce repeated "leverage", "source-bound", and "not one-note" language. |

## 5. Exact Copy Flags

| Priority | File/path | Current copy | Problem type | Why it fails | Suggested replacement |
| --- | --- | --- | --- | --- | --- |
| P1 | `archscry/index.html:6` | "Vox Mana - MTG Guild and College Reading" | Inconsistent tone / stale scope | The title only covers the old guild/college surface, not 37 live placement identities. | "Vox Mana - Commander Identity Reading" |
| P1 | `archscry/index.html:108` | "Find the guild or college that actually fits how you play." | Deckbuilder drift / stale scope | "Guild or college" is no longer the product scope and undersells Commander placement. | "Find the Commander identity and play pattern that fit how you approach the table." |
| P1 | `archscry/index.html:110` | "staple cards, land guidance, and Commander deck-start links you can use" | Deckbuilder drift | Sounds like a card recommendation/deck-start product. | "your color identity, table instincts, nearby fits, and what to look for when browsing commanders or decklists elsewhere" |
| P1 | `archscry/index.html:132` | "then opens the guild or college that answers back" | Too mystical / stale scope | "Answers back" creates quiz-fog; "guild or college" is stale. | "then opens the identity dossier that best matches those signals" |
| P0 | `privacy/index.html:84` | "10 Ravnica guilds + 5 Strixhaven colleges" | MTG terminology risk / stale scope | Legal/privacy copy contradicts current 37-identity product scope. | "the Commander identity or placement expression most closely matched by your reading" |
| P0 | `terms/index.html:123` | "AI is used to evaluate responses..." | Rules/source overclaim / stale feature claim | The repo's current quick reading is not presented elsewhere as active AI evaluation; this creates trust risk. | "The reading compares your answers against a curated placement model; it does not invent lore or gameplay content." |
| P1 | `terms/index.html:168` | "staple cards, and land recommendations" | Deckbuilder drift | Makes Vox Mana sound like a recommendation engine. | "card examples, external deck links, and mana notes are exploratory support, not legality, performance, or deckbuilding advice." |
| P1 | `assets/js/index.js:155-159` | "Commander Deck Starts", "Decks Saved", "Starter Cards", "Mana Base" | Deckbuilder drift | These labels read as build-plan sections. | "Commander Browsing Starts", "External Deck Links", "Card Signals", "Mana Notes" |
| P2 | `assets/js/index.js:1794-1795` | "Decks Saved For This Reading" | Deckbuilder drift | Could imply Vox Mana hosts or validates decks. | "External Deck Links Saved For This Reading" |
| P2 | `maze/index.html:267`; `research/research-init.js:2403` | "The Archives await" | Too mystical / empty-state weakness | It does not help the user recover or start. | "Start with a card idea, a Scryfall query, or one visual filter." |
| P2 | `research/research-init.js:307` | "Best counterspells" | Overclaiming | "Best" implies ranking authority. | "Counterspell examples" |
| P2 | `apocrypha/index.html:184`, `:229`, `:427` | "Video Lore And Deep Dives" | Generic AI copy / inflated category | "Deep dive" is a high-risk slop phrase and not needed. | "Video Lore And Overviews" |
| P2 | `apocrypha/index.html:417` | "Playstyle and deck-start framing." | Deckbuilder drift | "Deck-start" repeats the wrong product boundary. | "Commander browsing and playstyle context; not deckbuilding authority." |
| P1 | `assets/js/archscry-presentation.js:370`, `:384`, `:398`, `:440`, `:454`, `:468`, `:482` | "strict ... false-positive boundaries" | Too technical / internal QA leak | Users should not see validator language. | Replace with identity-specific separation language such as "clear separation from nearby same-color paths." |
| P2 | `assets/js/archscry-presentation.js:800-818` | "The reading was not one-note" repeated | Repetitive fallback | The repeated cadence sounds generated. | Rotate patterns: "A nearby path stayed close...", "The adjacent signal mattered because...", "The deciding difference was..." |
| P2 | `assets/js/commander-dossier.js:3971-3972` | "Use the deck-start links below for commander discovery." / "Commander Deck-start Links" | Deckbuilder drift / fallback | Generic and deck-tool adjacent. | "Use the external browsing links below to compare Commander examples elsewhere." |
| P1 | `assets/js/strategium.js:43`, `:1018` | "current Game Changers" | MTG accuracy risk | The term is time-sensitive and should not go stale silently. | "Commander bracket/watch-list topics your pod should name" or add a visible source/date note. |
| P2 | `data/identity-layers.json:3685`; `data/factions.json:24467` | "The College's most honest answer is that Esix exists and they're not entirely sure why." | Too clever / personal-blog drift | Funny, but the voice becomes a wink instead of a field guide. | "Esix makes Quandrix's uncertainty visible: pattern can become real before anyone fully explains it." |

## 6. Banned / High-Risk Language Sweep

Prioritized files searched: route HTML, route JS, dossier/presentation JS, research JS, `data/identity-layers.json`, `data/factions.json`, `data/taxonomy/vox-mana-tags.json`, and precon data.

| Found term | Quote/path | Decision | Replacement |
| --- | --- | --- | --- |
| deep dive / deep dives | `apocrypha/index.html:184`, `:229`, `:427`; video titles at `:441`, `:445` | Replace category copy; allow when it is part of a linked video title. | "Video Lore And Overviews" / "YouTube lore overviews..." |
| leverage | Many identity files, including `data/identity-layers.json:631`, `:1371`, `:2845`, `:3133`; `assets/js/archscry-presentation.js:368`; `assets/js/strategium.js:187` | Allow in Black/Dimir/Grixis/Orzhov contexts, but reduce repetition. It has become a template odor. | Use "pressure", "advantage", "bargain", "opening", "control", "resource conversion", or a concrete table behavior. |
| powerful | `data/taxonomy/vox-mana-tags.json:19`, `data/factions.json:18120`, `:23407`, `:25971` | Mostly allowed when describing complexity or actual card behavior; avoid as praise. | "high-impact", "rules-dense", "table-shaping", or concrete behavior. |
| unlock | `assets/js/strategium.js:24`; `data/taxonomy/vox-mana-tags.json:21`; `assets/js/commander-dossier.js:3537` | Allowed when literal sequencing is meant; avoid as generic benefit language. | "open", "reveal", "enable", "make available", depending context. |
| elevate | `data/identity-layers.json:978`; `data/factions.json:21760` | Allowed in Bant/Voltron context where it means raising one attacker/champion. | No change if literal; avoid in marketing copy. |
| arcane | `data/identity-layers.json:1175`, `:1185`, `:1186`, `:1316`; `data/factions.json:13877`, `:14298`, etc. | Allow as card/precon/source name, especially "Arcane Signet" and "Arcane Wizardry". | No replacement when it names a Magic object. |
| ancient | `data/taxonomy/vox-mana-tags.json:96`; `data/factions.json:17293`, `:17320`, `:17328` | Allow in lore/source context and as a taxonomy tag; do not use as generic atmosphere. | "old", "historical", "source-era", or specific era label if not lore-facing. |
| mystical | `data/factions.json:17748` | Allow as Jeskai source-summary vocabulary if it reflects source material; avoid as product voice. | "spiritual", "discipline-based", or the exact source term when cited. |
| fate / destiny | `data/taxonomy/vox-mana-tags.json:43`; `data/identity-layers.json:4046`, `:4073`, `:4209`, `:4224` | Mixed. In Black/Quandrix calibration, "fate" can be color-philosophy shorthand; "destiny" is risky if user-facing. | Prefer "agency", "future", "outcome", "choice", "possibility". |
| essence | `assets/js/commander-dossier.js:343`, `:421`; `data/factions.json:16793`, `:16935` | Allow when part of a card name or source term such as "Willowdusk, Essence Seer" or "life essence". | No replacement for names; otherwise use "life magic" or "vitality". |
| unleash | `data/factions.json:1576`, `:1597` | Replace if visible product copy; allow if a mechanics/source term. | "release", "spend", "send", "act". |
| utilize | `data/factions.json:8356` | Replace. It sounds like generic report prose. | "uses" |
| realm | `data/factions.json:12983`, `:12984`, `:13092`, `:13097` | Allow as card name "Roon of the Hidden Realm". | No replacement. |
| robust, seamless, streamline, cutting-edge, game-changing, unpack, embark, journey, discover your true, harness, immerse, immersive, tapestry, testament to, in order to, it's worth noting, at the end of the day, in today's fast-paced world, the takeaway is clear | No prioritized live-copy hits found in the sweep. | Keep absent. | No action. |

## 7. Surface-by-Surface Voice Review

### Home

Home is the cleanest public positioning surface. It answers what the product is and what the user should do first: `index.html:115-116` names the identity compass and not-a-deckbuilder boundary, while the route cards explain Archscry, Maze, Strategium, and Apocrypha in user-job terms. The main weakness is stale preview copy at `index.html:714-715`, which still narrows the color system to "colors, guilds, and colleges." The first viewport answers "what is this?" and "is this a deckbuilder?" well; it should only update the identity-preview scope and keep the current plain boundary sentence.

### Archscry

Archscry is the highest-risk surface because it is the product's main reading entry. The quiz framing is close to right when it says "table moments" and listens for color, tempo, risk, and game feel, but `archscry/index.html:108`, `:110`, and `:132` still use stale "guild or college" language and promise staples/lands/deck-start links. That is the strongest deckbuilder drift in the repo. The result/dossier language becomes useful when it explains adjacent fits and confidence, but some generated sections use internal QA language and repetitive cadence.

### Identity Dossiers

The identity system has real voice. Colorless and WUBRG are the best examples because they solve hard identity problems without collapsing into "nothing" or "everything": `data/identity-layers.json:3394-3395` and `:3542-3543`. The weak spots are not missing imagination; they are excess template and exposed internal vocabulary. "Source-bound", "false-positive boundaries", "not one-note", and repeated "leverage" make some dossiers sound like generated validation notes instead of product copy.

### Maze

Maze has a clear tool job: translate intent into Scryfall syntax and keep the translation visible. `maze/index.html:89-91` is good product copy, and Reading Finds is a strong replacement for old deck tray language. The weak spots are empty state and boundary reinforcement. "The Archives await" is less useful than "Start with a card idea..." and sort labels around EDHREC/price/power should avoid sounding like Vox Mana ranks or prices cards.

### Strategium

Strategium is the most field-guide-like surface. It explains Commander table behavior without becoming a wiki dump, especially in `strategium/index.html:81-84`, `:100-123`, and `assets/js/strategium.js:120-123`. The beginner and competitive-curious tracks are practical and not condescending. The copy risk is accuracy freshness: "current Game Changers" should be source/date-checked or rephrased to avoid stale Commander-policy language.

### Apocrypha

Apocrypha has the best source-library framing. "Where Vox Mana shows its work" at `apocrypha/index.html:100` is short, precise, and on-brand. `apocrypha/index.html:477` and `:488` correctly separate source support from canon and working notes. The main cleanup is low-risk wording: replace "deep dives" and "deck-start framing" so the archive does not drift toward generic content-marketing or deckbuilder scope.

### Navigation / Buttons / Microcopy

Most route CTAs are understandable: "Start the Quick Reading", "Search the Maze", "Learn Commander", and "Read the quick guide" are usable. Some branded labels are acceptable only because plain labels sit nearby: "The Plain Reading", "The Operator's Hand", and "The Loom" work as mode subtitles, not standalone labels. Empty and error states should stay literal; `research/research-init.js:856` is a good recovery message, while "The Archives await" is not.

## 8. Identity Voice Consistency

| Group | Best copy example | Weakest copy example | Repeated patterns / risks |
| --- | --- | --- | --- |
| Mono-color identities | White at `data/identity-layers.json:554-555` is plain and useful; Black at `:4564-4565` names agency cleanly. | Green at `:5364` "beneath the noise" is a little personality-quiz adjacent. | Mono copy is clear but can feel underdeveloped compared with shards/wedges. |
| Guilds | Golgari at `:859-860` and Orzhov at `:783-784` are specific without overdoing it. | Simic at `:898-899` leans generic because "optimization, and becoming" is broad. | Many guild previews use "blends X with Y"; acceptable for preview, dull if repeated deeper. |
| Colleges | Silverquill at `:3733-3734` is clear; Prismari at `:3657-3658` is distinct. | Quandrix/Esix phrasing at `data/identity-layers.json:3685` is too wink-heavy. | College copy sometimes sounds like school flavor more than Commander behavior. |
| Shards | Grixis at `:1370-1371`, Jund at `:1528-1529`, and Naya at `:1881-1882` are strong. | Esper at `:1212-1213` is accurate but colder and more abstract. | Shards are generally the strongest identity group. |
| Wedges | Abzan at `:2020-2021`, Temur at `:2159-2160`, and Jeskai at `:2554-2555` have clear internal motion. | Sultai at `:2298-2299` is specific but shares too much "resource conversion/leverage/source-bound" texture with other Black-heavy copy. | Tarkir wedge copy risks long, ceremonial sentence stacks. |
| Four-color identities | Witch at `:3277-3278` is the cleanest four-color preview; Ink at `:3132-3133` has a strong commons/private-hoarding boundary. | Glint at `:2844-2845` repeats "leverage" and abstracts civic restraint. | Four-color identities can blur because each is framed as "four colors without X"; keep the missing color's absence concrete. |
| Colorless | `data/identity-layers.json:3394-3395`: "Outside the wheel. Not above it." | None major in preview. | Preserve strict true-colorless/generic-mana/Eldrazi boundaries. Do not make Colorless sound like empty WUBRG. |
| WUBRG | `data/identity-layers.json:3542-3543`: "Every color present. Every shortcut questioned." | Some support-copy must avoid "goodstuff" proof. | Preserve negotiation among colors. Do not make WUBRG sound like "everything, therefore nothing." |

Missing/blank/fallback content:

- No major blank identity copy was found in this audit.
- Repetitive fallback risk appears in exported or generated dossier text, especially `assets/js/commander-dossier.js:3922-3979` and `assets/js/archscry-presentation.js:800-818`.

## 9. MTG / Commander Accuracy Risk

| File/path | Current copy | Risk | Needed source or safer rewrite | Block release? |
| --- | --- | --- | --- | --- |
| `archscry/index.html:108`, `:132` | "guild or college" | Incorrect current scope. The live system is 37 placement expressions per `data/identity-layers.json:8-9`. | "Commander identity", "placement expression", or "identity dossier". | Partial - block polished public copy. |
| `privacy/index.html:84`, `:127`; `terms/index.html:123` | "10 Ravnica guilds + 5 Strixhaven colleges" / "guild or college placement" | Stale legal/product explanation. | "Commander identity or placement result" with no fixed outdated count unless maintained. | Yes for legal-copy readiness. |
| `terms/index.html:123`; `privacy/index.html:173` | "AI is used..." / "AI-powered readings" | Feature-truth risk if current quick reading is deterministic or terminal-hidden. | State that readings compare answers against a curated model. Only mention AI if a live surface actually uses it. | Yes for trust/legal readiness. |
| `archscry/index.html:110`; `terms/index.html:168` | "staple cards, land guidance..." / "staple cards, and land recommendations" | Presents exploratory support as recommendations. | "card examples, mana notes, and external browsing links are exploratory support." | Partial. |
| `assets/js/strategium.js:43`, `:1018` | "current Game Changers" | Commander policy terms can change. | Add source/date governance or use "bracket/watch-list topics your pod should name." | Partial until source-checked. |
| `research/research-init.js:307` | "Best counterspells" | "Best" implies ranking or card authority. | "Counterspell examples." | No, but fix before polish. |
| `assets/js/archscry-presentation.js:479` | "Commander-facing proof" | "Proof" sounds authoritative. | "Commander-facing signal" or "Commander-facing support." | No, but fix in voice pass. |
| `data/factions.json:20715`, `:20722` | "deck-construction and Vox Mana synthesis identity" / "A guild or college overlap..." | Internal source support is likely fine, but "deck-construction" and old faction examples can leak if surfaced. | Keep internal if needed; if visible, rewrite as "full-color Commander browsing context" and "two-color or college overlap." | No if internal; partial if surfaced. |

Unknowns:

- This audit did not verify current Commander bracket/Game Changer policy through live official sources. Any copy asserting "current" must be source-checked before release.

## 10. Proposed Vox Mana Voice Guide

### Voice Statement

Vox Mana speaks like a Commander identity field guide: clear enough to help a player act, source-aware enough to avoid pretending to be official truth, and mythic only when the metaphor explains real play behavior. It names instincts, tensions, adjacent paths, and browsing questions. It does not build the deck, certify the rules, rank the cards, or tell the player who they "really" are.

### Use

- Lead with the user job before the metaphor.
- Say "Commander identity", "placement", "reading", "dossier", "play pattern", and "browsing signal" when those are the actual product objects.
- Use MTG terms as exact nouns, not decoration.
- Describe behavior at the table: pressure, patience, threat assessment, risk appetite, resource conversion, sequencing, conversation.
- Use "suggests", "points toward", "fits", "supports", and "helps you compare" for interpretive claims.
- State source boundaries when lore, rules, legality, or Commander policy is involved.
- Keep CTA labels literal enough to work outside context.
- Keep identity copy distinct by naming the conflict or decision each identity cares about.
- Treat card/deck/precon material as external browsing support, not recommendations.
- Use plain recovery copy for empty and error states.
- Vary generated patterns so adjacent-fit text does not sound templated.
- Keep Colorless and WUBRG boundary language strict.

### Avoid

- Do not claim Vox Mana builds, imports, optimizes, ranks, legalizes, or validates decks.
- Do not call exploratory support "best", "must", "always", or "guaranteed".
- Do not use "true destiny", "discover your true self", or personality-quiz fate language.
- Do not use "ancient tome", "arcane mystery", or fantasy fog where a direct label works.
- Do not expose internal validation phrases such as "false-positive boundaries".
- Do not repeat "source-bound", "leverage", or "not one-note" until the copy sounds generated.
- Do not describe current Commander rules without a source/date.
- Do not reduce the live identity system to guilds and colleges.
- Do not make Robert's personal voice the product voice.
- Do not turn Apocrypha into a lore encyclopedia or archive dump.
- Do not make Maze sound like a replacement for Scryfall, EDHREC, Archidekt, Moxfield, or official tools.
- Do not hide important recovery instructions behind cute labels.

### Preferred Verbs

Start, read, compare, search, set aside, return, browse, check, name, map, trace, learn, review, inspect, save link, revisit, translate, filter, sort, test, calibrate.

### Risky Verbs

Build, optimize, recommend, rank, prove, unlock, unleash, harness, legalize, validate, import, host, diagnose, certify, guarantee, discover your true, embark.

### Good Sentence Pattern

- "This result points toward [play behavior], especially when [table condition] matters."
- "Use this section to compare [external examples], not to treat them as a finished list."
- "[Identity] differs from [nearby identity] because it protects [value] through [specific behavior]."

### Bad Sentence Pattern

- "Embark on a mystical journey to unlock your true Commander destiny."
- "This powerful recommendation gives you the best cards and mana base for your faction."
- "The reading was not one-note: [template], [template], [template]."

### Metaphor Rules

- Default to plain meaning first.
- Use one metaphor family at a time.
- Metaphor must clarify actual play behavior.
- No fantasy fog.
- No personality-quiz destiny language.
- No "ancient tome" overuse.
- No metaphor where a direct label would work better.

## 11. Rewrite Samples

| Surface | Original copy if found | Suggested replacement | Why it is better |
| --- | --- | --- | --- |
| Home hero | `index.html:115`: "Vox Mana is a Commander identity and taste compass..." | "Vox Mana is a Commander identity and taste compass. It helps you name your colors, read your table instincts, and browse commanders or decklists elsewhere with clearer questions." | Keeps the strong identity compass phrase and adds concrete user value. |
| Not-a-deckbuilder sentence | `index.html:116`: "Not a deckbuilder: Vox Mana helps you choose a direction before you build or browse decklists somewhere else." | "Not a deckbuilder: Vox Mana helps you choose a direction before you build, import, optimize, or check a deck somewhere else." | Makes the boundary sharper without sounding defensive. |
| Archscry intro | `archscry/index.html:110`: "staple cards, land guidance, and Commander deck-start links..." | "Archscry turns a quick reading into a Commander identity dossier: color signals, play-pattern instincts, nearby fits, and browsing cues for commanders and decklists elsewhere." | Removes deckbuilder promises and names actual dossier value. |
| Dossier intro pattern | Proposed pattern | "This result points toward [identity] because your answers favored [specific table behavior]. Nearby fits stayed close where you also showed [adjacent behavior]." | Gives the renderer a reusable structure without generic mysticism. |
| Maze helper text | `maze/index.html:91`: "Maze keeps the translation visible so you can learn while you search." | "Maze keeps the Scryfall translation visible so you can learn the search shape and set aside cards to revisit with your reading." | Connects search to Reading Finds and source tool. |
| Apocrypha intro | `apocrypha/index.html:100`: "Where Vox Mana shows its work." | Preserve. Optional support: "Use this library to see which public sources support the model, and where Vox Mana stops short of canon." | The original is excellent; the support sentence clarifies boundary. |
| Empty state | `maze/index.html:267`: "The Archives await" | "Start with a card idea, a Scryfall query, or one visual filter." | Tells the user what to do next. |
| Error state | `research/research-init.js:899`: "Search failed: ..." | "Search failed. Check the query, remove one filter, or try again in a moment." | Adds recovery without blame. |
| CTA set | Mixed route CTAs | "Start reading" / "Search cards" / "Learn the table" / "Check sources" / "Return to dossier" / "Copy finds" | Understandable out of context and still on-brand. |

## 12. Voice Regression Checklist

- [ ] The first sentence tells the user what the surface does.
- [ ] The copy does not imply Vox Mana builds, imports, optimizes, ranks, legalizes, or validates decks.
- [ ] Any card, commander, deck, precon, rules, or lore claim has traceable support or is framed as exploratory.
- [ ] No generic AI phrasing appears without a specific product job.
- [ ] No fake-mystical fog hides the actual action.
- [ ] No repeated fallback phrase appears across multiple identities without variation.
- [ ] No over-clever label appears without a plain label nearby.
- [ ] The CTA is understandable out of context.
- [ ] Empty states tell the user what to try next.
- [ ] Error states help the user recover.
- [ ] Identity copy is distinct from nearby colors/factions.
- [ ] Source-backed claims are traceable to source files or public references.
- [ ] Mobile labels remain clear when shortened.
- [ ] Screen-reader text is useful and not only atmospheric.
- [ ] Colorless does not sound like empty WUBRG.
- [ ] WUBRG does not sound like "everything, therefore nothing."
- [ ] The copy still sounds like Vox Mana: precise, Commander-aware, field-guide-like, and product-bound.

## 13. Recommended VM Tickets

| Ticket ID | Title | Why it matters | Scope | Files likely touched | Acceptance criteria | Manual validation | Risk if skipped |
| --- | --- | --- | --- | --- | --- | --- | --- |
| VM-XXX | Archscry Boundary Copy Pass | Archscry is the main conversion surface and currently carries the strongest deckbuilder drift. | Landing title, hero, intro, quick-reading helper, result/dossier intro. | `archscry/index.html`, `assets/js/index.js`, maybe `assets/js/adaptive-placement.js` | No "guild or college" landing copy; no staples/lands/deck-start promise in hero; clear identity compass framing. | Visit Archscry first viewport and complete a reading. | Users expect deck recommendations or old 15-faction output. |
| VM-XXX | Privacy/Terms Scope And AI Wording Repair | Legal/trust copy is stale and potentially misleading. | Replace 10+5 scope, guild/college placement, AI-powered readings, staple/land recommendation framing. | `privacy/index.html`, `terms/index.html` | Legal pages match current 37-identity model and product boundary. | Read pages on mobile and desktop; confirm no stale AI/guild-college claims. | Public trust and release-readiness risk. |
| VM-XXX | Dossier Label Boundary Repair | Section labels imply deckbuilding. | Rename or qualify deck-start/starter/mana panels. | `assets/js/index.js`, `assets/js/commander-dossier.js` | Dossier labels read as browsing/support, not build steps. | Complete readings for mono, guild, four-color, Colorless, WUBRG. | Vox Mana sounds like a recommendation engine. |
| VM-XXX | Internal QA Phrase Removal | "false-positive boundaries" and "source-bound" leak implementation language. | Rewrite adjacent-fit/close-reason strings. | `assets/js/archscry-presentation.js`, `assets/js/commander-dossier.js` | No user-visible "false-positive" or "source-bound" unless in internal logs. | Inspect rendered adjacent-fit and dossier copy. | Dossiers sound generated/technical. |
| VM-XXX | Repeated Leverage And Template Reduction | Repetition weakens identity distinctiveness. | Reduce repeated "leverage" and "not one-note" patterns. | `data/identity-layers.json`, `data/factions.json`, `assets/js/archscry-presentation.js` | High-frequency phrases are reduced or intentionally scoped to Black-heavy identities. | Compare Dimir, Grixis, Sultai, Glint, Ink, Orzhov. | Identities blur together. |
| VM-XXX | Maze Support-Loop Microcopy | Maze is close, but empty state and sorting labels need boundary polish. | Empty states, mode helper, Reading Finds helper, sort disclaimers if needed. | `maze/index.html`, `research/research-init.js` | Empty states are actionable; Maze is framed as Scryfall-supported search and Reading Finds, not deckbuilding. | Search empty, invalid, and successful states. | Users mistake Maze for a card database replacement or deck tray. |
| VM-XXX | Apocrypha Label Cleanup | Small phrases create archive-dump/content-marketing energy. | Replace deep-dive labels and deck-start source use. | `apocrypha/index.html` | No generic "deep dives" category label; source use says playstyle/browsing context. | Read Apocrypha source groups. | Source library sounds generic. |
| VM-XXX | Strategium Current Commander Terms Source Check | "Current Game Changers" can go stale. | Source/date governance or safer wording. | `assets/js/strategium.js`, maybe Apocrypha/source docs | Time-sensitive Commander terms have source/date or are generalized. | Review Rule 0/checklist modules. | Rules/policy copy becomes wrong. |
| VM-XXX | Identity Voice Regression Sweep | Future source/data changes need a copy gate. | Add a doc checklist or lightweight script/search recipe for high-risk language. | `docs/qa/`, `docs/reference/`, maybe test scripts | Checklist exists and is linked from relevant docs/cards. | Run sweep against visible copy files. | AI-sounding drift returns. |
| VM-XXX | Precon Support-Navigation Copy Audit | Precon/commander copy is useful but closest to recommendation scope. | Precon fit summaries, support labels, export text. | `assets/js/commander-dossier.js`, precon data files | External examples are framed as comparison/support, not recommendations. | Inspect at least WUBRG, Colorless, Sultai, and a guild dossier. | Product boundary weakens at the moment users browse decks. |

## 14. Final Voice QA Verdict

Current voice quality: Good core voice; not publish-perfect as a QA gate.
Biggest voice strength: Source-governed Commander field-guide copy on Home, Strategium, Apocrypha, Colorless, and WUBRG.
Biggest voice risk: Deckbuilder/recommendation drift in Archscry, dossier labels, and legal pages.
Most AI-sounding area: Repeated generated dossier patterns: "The reading was not one-note", "source-bound", "strict false-positive boundaries", and repeated "leverage".
Most over-mystical area: Archscry "answers back" and Maze "The Archives await".
Most unclear product-boundary area: Archscry landing plus "Commander Deck Starts" / "Starter Cards" / "Mana Base" dossier labels.
Best copy to preserve: `index.html:115-116`, `apocrypha/index.html:100`, `data/identity-layers.json:3394-3395`, and `data/identity-layers.json:3542-3543`.
First copy fix to make: Update Archscry, Privacy, Terms, and dossier nav labels to current identity-compass language.
Should this block release? Partial. It should block a polished public positioning/legal-copy release, but it does not require blocking internal QA or docs-only work.
Recommended next move: Open a focused copy-boundary repair ticket for Archscry + Privacy/Terms + dossier labels, then run the voice regression checklist against the changed surfaces.

# Apocrypha Gate 4 Voice And Copy Contract

Date: 2026-07-25

Branch: `codex/apocrypha-gate01-source-inventory`

Worktree: `C:\dev\voxmana.io-apocrypha-gate01`

Starting SHA: `585eb5e0bf588bae13d0ad549c94b3fd7ff46a91`

## Scope

This is the authoritative Gate 4 copy and voice contract for Apocrypha. It does not implement page rendering, edit runtime files, rewrite the live page, change source records, verify links, or change the Apocrypha visual system.

Gate 5 should use this document with:

- `data/apocrypha-source-registry.json`
- `scripts/validate-apocrypha-sources.mjs`
- `docs/research/apocrypha-gate03-information-architecture.md`

Apocrypha is Vox Mana's evidence library. It should help a reader answer three questions quickly:

1. What kind of source is this?
2. What is this source authoritative for?
3. Why is Vox Mana citing it?

## Inputs Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/reference/workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/research/apocrypha-gate01-baseline-inventory.md`
- `docs/research/apocrypha-gate02-source-registry.md`
- `docs/research/apocrypha-gate02a-registry-audit.md`
- `docs/research/apocrypha-gate03-information-architecture.md`
- `docs/handoffs/2026-07-25-1320-codex-apocrypha-gate01-source-inventory.md`
- `docs/handoffs/2026-07-25-1247-codex-apocrypha-gate02-source-registry.md`
- `docs/handoffs/2026-07-25-1346-codex-apocrypha-gate02a-registry-audit.md`
- `docs/handoffs/2026-07-25-1402-codex-apocrypha-gate03-information-architecture.md`
- `docs/audits/2026-06-30-vox-mana-voice-audit.md`
- `docs/kanban/done/VM-439-vox-mana-voice-copy-audit.md`
- `docs/kanban/done/VM-440-voice-boundary-copy-repair.md`
- `docs/handoffs/2026-06-30-1351-codex-vm440-443-voice-copy-repair.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `data/apocrypha-source-registry.json`

## Voice Principles

Apocrypha should sound like a source-conscious Commander field guide: plain enough to be trusted, specific enough to be useful, and mythic only where the metaphor clarifies a real source boundary.

Use:

- Direct statements of source authority.
- "Supports", "helps explain", "is useful for", "points to", "records", and "gives context".
- "Official publisher source", "pending link check", "supplemental navigation", and "not a claim source" when those are the facts.
- MTG terms as exact nouns, not atmosphere.
- Short sentences when explaining authority.

Avoid:

- "Verified" unless a registry link check records successful GET-based verification.
- "Near-official", "canon-adjacent", "proof", "settles", "guarantees", "definitive", or "complete" unless the registry and source authority justify it.
- "Deep dive", "journey", "discover your true", "unlock", "harness", "tapestry", "arcane", or vague fantasy fog in structural copy.
- Deckbuilder drift such as "recommended cards", "best cards", "deck starts", "staples", "build path", or "mana base guidance".
- Exposed implementation language such as raw enum names, validator terminology, or internal audit classifications in reader-facing copy.

## Page Identity

Final page direction:

| Surface | Approved direction |
|---|---|
| Browser title | `Vox Mana - Apocrypha Source Library` |
| H1 | `The Apocrypha` |
| Eyebrow | `Source Library` |
| Short line | `Where Vox Mana shows its work.` |
| Intro paragraph | `Apocrypha lists the public sources behind Vox Mana's color, lore, rules, and Commander identity work. Each source card should say what the source is, what it can support, and where its authority stops.` |
| Support explanation | `Official sources can support design, lore, rules, card-record, or archive claims according to their source type. Supplemental references can help with navigation and context, but they do not carry official claims by themselves.` |
| Reader instruction | `Start with the official shelves when checking a Vox Mana claim. Use supplemental references only as wayfinding aids or context trails.` |

The current H1 and short line should be kept. The current introductory support copy should be revised in Gate 5 so source authority and supplemental boundaries appear before the source list.

## Trust Explanation

Approved trust copy:

`Vox Mana is not an official Magic source, rules engine, legality checker, deckbuilder, wiki, or purchasing guide. Apocrypha shows the public evidence Vox Mana uses and the limits on that evidence. A source being listed here does not make every claim official, current, complete, or verified. Authority comes from the source type, publisher, evidence role, and verification state recorded in the registry.`

Short form:

`Official sources support only the claims their source type can carry. Supplemental sources help readers navigate; they do not prove canon, rules, card records, or design intent.`

Do not say:

- `These sources verify Vox Mana.`
- `Every source here is official.`
- `Near-official story material.`
- `Complete Magic source library.`
- `Trusted by the community.`

## Shelf Intro Contract

Each shelf needs a heading, short description, "useful for" text, "not proving" text, and empty/unavailable state. Gate 5 may shorten labels for mobile, but must preserve the authority boundary.

### Official Design

| Field | Approved copy |
|---|---|
| Heading | `Official Design` |
| Badge | `Design` |
| Short description | `Official Wizards design articles used to understand color philosophy, mechanics, faction design, and design intent.` |
| Useful for | `Use these sources when checking why Vox Mana treats a color, guild, shard, wedge, or mechanic as design-supported.` |
| Not proving | `These sources do not replace rules text, Oracle records, story canon, legality checks, or deckbuilding advice.` |
| Empty state | `No official design sources are ready for this shelf yet. Gate 5 should hide the shelf or show this state only when the registry has no design records.` |
| Gap state | `Some official design coverage is still being reconciled. Missing or disputed entries should appear in the gap section, not as implied completeness.` |

### Worldbuilding & Lore

| Field | Approved copy |
|---|---|
| Heading | `Worldbuilding & Lore` |
| Badge | `Lore` |
| Short description | `Official story, plane, setting, and flavor material used for lore and identity context.` |
| Useful for | `Use these sources when checking official setting details, guild flavor, plane context, or story support.` |
| Not proving | `These sources do not prove design intent, rules meaning, card-record truth, or every community interpretation.` |
| Empty state | `No official lore sources are ready for this shelf yet. Leave lore claims unsupported until the registry adds official lore records.` |
| Gap state | `Lore coverage is partial until the missing official plane, guide, and story archive sources are reconciled.` |

### Rules & Card Records

| Field | Approved copy |
|---|---|
| Heading | `Rules & Card Records` |
| Badge | `Rules` or `Card Record` |
| Short description | `Canonical game references for rules text, Oracle/card records, and rules-facing source checks.` |
| Useful for | `Use these sources when a page needs rules wording, Oracle text, card identity, or card-record confirmation.` |
| Not proving | `These sources do not explain design philosophy, story meaning, deck quality, price, or format advice by themselves.` |
| Empty state | `Rules and card-record sources are not ready in the registry yet. Do not render this shelf as populated until official records exist.` |
| Gap state | `Rules and Gatherer-style references are required before this shelf can support public rendering.` |

### Official Archives

| Field | Approved copy |
|---|---|
| Heading | `Official Archives` |
| Badge | `Archive` |
| Short description | `Historical Wizards material kept for source lineage and older official context.` |
| Useful for | `Use these sources when checking where an older official statement came from or how an idea was framed at the time.` |
| Not proving | `Archive sources should not be treated as current guidance unless the registry marks them as current and verified.` |
| Empty state | `No official archive sources are ready for this shelf yet. Do not fold unofficial mirrors into this shelf.` |
| Gap state | `Archive coverage is future work and must stay visually distinct from current official guidance.` |

### Supplemental References

| Field | Approved copy |
|---|---|
| Heading | `Supplemental References` |
| Badge | `Supplemental` and `Navigation Only` |
| Short description | `Community, wiki, video, social, and archive links kept only for navigation or context.` |
| Useful for | `Use these links to find chronology, terminology, community framing, or source trails that still need official support.` |
| Not proving | `Supplemental references do not prove official canon, rules meaning, card records, design intent, legality, recommendations, or Vox Mana claims by themselves.` |
| Empty state | `No supplemental references are listed. This is acceptable; official evidence should remain the primary path.` |
| Gap state | `Move or remove candidates remain visible only until a later gate records an official replacement or removal path.` |

## Badge Vocabulary

Badges are semantic labels. This contract does not define colors or visual styling.

| Badge | Trigger | Visible explanation | Help text |
|---|---|---|---|
| `Official` | `official: true` | `Official publisher source` | `The source is published by an approved official domain. Link health may still be pending.` |
| `Design` | `sourceType: "official-design"` | `Design source` | `Supports color philosophy, mechanics, faction design, or design intent.` |
| `Lore` | `sourceType: "official-lore"` | `Lore source` | `Supports official story, setting, plane, or flavor context.` |
| `Rules` | `sourceType: "official-rules"` | `Rules source` | `Supports official rules-facing checks when present in the registry.` |
| `Card Record` | `sourceType: "official-card-record"` | `Card record source` | `Supports Oracle or card-record truth when present in the registry.` |
| `Archive` | `sourceType: "official-archive"` or `group: "official-archives"` | `Official archive` | `Historical official material. Check lifecycle status before treating it as current.` |
| `Historical` | Historical lifecycle status | `Historical` | `Useful for older context; not current guidance unless the registry says so.` |
| `Supplemental` | `sourceType: "supplemental-reference"` | `Supplemental` | `Non-official context or navigation only.` |
| `Navigation Only` | `evidenceRole: "supplemental-navigation-only"` | `Navigation only` | `May help locate context; does not carry official claims.` |
| `Pending Link Check` | `verification.status: "not-checked"` | `Pending link check` | `This link has not been verified online with a GET request.` |
| `Unavailable` | Future unavailable verification/status | `Unavailable` | `The source or link is unavailable; use archive or replacement notes if present.` |
| `Moved` | Future redirect/moved verification/status | `Moved` | `The source now resolves somewhere else; show final URL when recorded.` |

Badge combination rules:

- Always show one authority badge: `Official` or `Supplemental`.
- Show one source-family badge: `Design`, `Lore`, `Rules`, `Card Record`, or `Archive`.
- Show `Navigation Only` for supplemental records.
- Show a verification badge when `verification.status` is not confirmed available.
- Suppress duplicate meanings. For example, do not show both `Supplemental` and a second label that implies official evidence.
- Do not show raw registry enum values to readers.

## Evidence Role Language

### Official Support Pending Verification

Registry trigger: `evidenceRole: "official-support-pending-verification"`

| Surface | Approved language |
|---|---|
| Badge or compact label | `Official support, link pending` |
| Card sentence | `Vox Mana may use this official source for the listed design or lore role, but the link still needs an online verification check.` |
| Shelf sentence | `Official status describes publisher authority. Link verification is tracked separately.` |
| May support | `Publisher-specific design, lore, rules, card-record, or archive claims that match the source type.` |
| May not support | `Claims outside its source type, current link health, completeness, deck quality, legality, prices, or unofficial community interpretations.` |

### Supplemental Navigation Only

Registry trigger: `evidenceRole: "supplemental-navigation-only"`

| Surface | Approved language |
|---|---|
| Badge or compact label | `Navigation only` |
| Card sentence | `This supplemental source may help with navigation or context. It does not carry official claims by itself.` |
| Shelf sentence | `Supplemental links are kept separate so readers can use them without mistaking them for official evidence.` |
| May support | `Wayfinding, chronology checks, terminology lookup, community context, and leads for later official-source replacement.` |
| May not support | `Official canon, design intent, rules meaning, Oracle/card records, legal advice, deck recommendations, or source verification.` |

## Verification Language

Current Gate 4 state: all 49 registry records have `verification.status: "not-checked"`. Public copy must not say these links are verified.

| State | Approved page-level language | Approved card language | Notes |
|---|---|---|---|
| Pending | `Links are listed from the registry, but online verification is still pending.` | `Pending link check.` | Use for current records. |
| Checked available | `Links checked on {date}.` | `Checked {date}.` | Only after GET-based verification is recorded. |
| Redirected or moved | `Some sources now resolve at updated URLs.` | `Moved to {finalUrl}. Checked {date}.` | Show final URL only if registry records it. |
| Failed or unavailable | `Some source links are unavailable. Records remain visible so the audit trail is not lost.` | `Unavailable at last check. See notes for replacement status.` | Do not delete without audit record. |
| Official archive | `Historical official material is separated from current guidance.` | `Official archive; not current guidance unless noted.` | Applies to future archive shelf. |

Fallback sentence for network limitations:

`Network verification was not available during this audit. Treat link health as pending until a later GET-based check records status.`

## Historical And Archive Treatment

Historical and archive records must retain official publisher authority while avoiding current-guidance overclaims.

Approved copy:

- `Official archive`
- `Historical official material`
- `Useful for source lineage`
- `Not current guidance unless the registry marks it current`

Do not say:

- `Current official guidance` for historical records.
- `Verified archive` without link verification.
- `Official archive` for unofficial mirrors, fan PDF archives, Reddit links, GitHub mirrors, wikis, or copied article text hosted away from the original publisher.

## Supplemental Treatment

Supplemental records are not bad sources. They are limited sources.

Approved page copy:

`Supplemental references stay visible because they can help readers follow a trail. They are separated from official evidence because they cannot carry Vox Mana's official claims by themselves.`

Approved card boundary:

`Use for navigation or context only; replace with official sources before using it as claim support.`

Current supplemental records include GitHub archive, Reddit, MTGLore, Fandom, Draftsim, and YouTube links. Gate 5 must place them in Supplemental References unless a later gate edits the registry with a documented replacement path.

## Source Card Microcopy

Required source-card fields and copy behavior:

| Card area | Registry field | Approved behavior |
|---|---|---|
| Title | `title` | Use the registry title as the link label. Do not rewrite titles unless the registry is updated in a later source gate. |
| Publisher | `publisher` | Show `Publisher: {publisher}`. If null, show `Publisher not recorded` only in an expanded detail area. |
| Authority badge | `official`, `sourceType` | Use the badge vocabulary above. |
| Evidence role | `evidenceRole` | Render approved evidence role language, not raw enum values. |
| Description | `usedFor` | Introduce with `Used for:` or a short sentence. Must be specific. |
| Boundary | `notFor` | Introduce with `Not for:` or `Does not support:`. Always show for supplemental records. |
| Topics | `topics` | Render as filters/tags when useful; omit if display space is constrained only after search/filter support remains available. |
| Verification | `verification.status`, `verification.checkedAt` | Use verification language above. |
| Link | `url` | External link text should be `Open source`. Keep destination visible or accessible. |
| Notes | `notes` | Do not render audit notes as primary copy. Use a details disclosure or research-only view. |

Approved compact card pattern:

```text
{Title}
{Publisher} - {Authority badges}
Used for: {usedFor}
Does not support: {notFor}
{Verification label}
Open source
```

Unknown field fallback:

- Missing required field: fail validation before rendering.
- Optional null author/date: omit.
- Unknown publisher: `Publisher not recorded`.
- Unknown verification: `Verification state unavailable. Do not use this as verified evidence.`

## Counts And Completeness Rules

Counts must be calculated from registry records. Do not store manual source counts in public HTML.

Approved count language:

- `{count} sources in this shelf`
- `{officialCount} official sources`
- `{supplementalCount} supplemental references`
- `{pendingCount} links pending verification`

Approved completeness language:

- `Current registry coverage`
- `Known gaps remain`
- `Partial lore coverage`
- `Rules and card-record sources pending`

Do not say:

- `Complete source library`
- `All sources`
- `Fully verified`
- `Definitive canon list`
- `Every source Vox Mana uses`

When a required official source is missing:

`This shelf has known gaps. Gate records list the missing official sources before Apocrypha can claim full coverage.`

## No-JavaScript Fallback Copy Rules

No-JavaScript output should remain useful and complete.

Rules:

- All source cards must remain visible in deterministic registry order.
- Shelf headings, authority badges, and evidence boundaries must be readable without JavaScript.
- Accordions may default open or native-collapsed, but no source may require JavaScript to exist in the DOM.
- Counts should be server/static generated from registry data, not computed only in client JavaScript.
- Filtering, rail sync, and accordion enhancement may be JavaScript-only enhancements.

Approved fallback note:

`JavaScript is off. Source shelves remain available below; filtering and navigation enhancements are disabled.`

## Error And Unknown State Copy

Unknown states should protect trust first.

| State | Approved copy |
|---|---|
| Registry fails to load | `Source registry unavailable. Apocrypha cannot show source cards safely right now.` |
| Unsupported schema | `Source registry version unsupported. Rendering stopped to avoid mislabeling sources.` |
| Unknown enum | `Source classification unavailable. Rendering stopped for this record.` |
| Missing required field | `Source record incomplete. Rendering stopped for this record.` |
| Unknown verification | `Verification state unavailable. Do not treat this link as verified.` |
| Supplemental conflict | `Source classification conflict. Supplemental records cannot carry official claims.` |
| Official conflict | `Source classification conflict. Official shelves require official source records.` |

Gate 5 should fail closed for registry/schema errors rather than guessing copy.

## Copy Mapping Contract

| Copy key | Surface | Trigger / registry field | Approved copy | Fallback | Gate 5 note |
|---|---|---|---|---|---|
| `page.title` | Browser title | Route | `Vox Mana - Apocrypha Source Library` | Current title may remain until Gate 5. | Static route metadata update in Gate 5 only. |
| `page.eyebrow` | Header | Route | `Source Library` | Omit if crowded. | Do not use raw gate labels. |
| `page.h1` | Header | Route | `The Apocrypha` | None. | Preserve current H1. |
| `page.shortLine` | Header | Route | `Where Vox Mana shows its work.` | None. | Preserve current line. |
| `page.intro` | Header | Route | `Apocrypha lists the public sources behind Vox Mana's color, lore, rules, and Commander identity work. Each source card should say what the source is, what it can support, and where its authority stops.` | Use trust short form. | Replace current broad website/video/archive wording. |
| `page.trust` | Header or method section | Route | Trust explanation from this document. | Trust short form. | Must appear before supplemental shelf. |
| `shelf.design.title` | Shelf heading | `group: "design"` | `Official Design` | Fail if unknown group. | Primary shelf 1. |
| `shelf.design.intro` | Shelf intro | `group: "design"` | Official Design short description. | `Official design sources pending.` | Use with count. |
| `shelf.lore.title` | Shelf heading | `group: "lore"` | `Worldbuilding & Lore` | Fail if unknown group. | Primary shelf 2. |
| `shelf.lore.intro` | Shelf intro | `group: "lore"` | Worldbuilding & Lore short description. | `Official lore sources pending.` | Mention partial coverage if gaps remain. |
| `shelf.rules.title` | Shelf heading | `group: "rules-card-records"` | `Rules & Card Records` | Do not render populated shelf without records. | Primary shelf 3 when registry supports it. |
| `shelf.archives.title` | Shelf heading | `group: "official-archives"` | `Official Archives` | Do not render populated shelf without records. | Primary shelf 4 when registry supports it. |
| `shelf.supplemental.title` | Shelf heading | `group: "supplemental"` | `Supplemental References` | Fail if supplemental records are outside this shelf. | Primary shelf 5. |
| `badge.official` | Badge | `official: true` | `Official` | Fail on conflict. | Must not imply link verification. |
| `badge.supplemental` | Badge | `official: false` | `Supplemental` | Fail on conflict. | Pair with navigation-only. |
| `badge.design` | Badge | `sourceType: "official-design"` | `Design` | Unknown source type fails. | Family badge. |
| `badge.lore` | Badge | `sourceType: "official-lore"` | `Lore` | Unknown source type fails. | Family badge. |
| `badge.rules` | Badge | `sourceType: "official-rules"` | `Rules` | Unknown source type fails. | Future family badge. |
| `badge.cardRecord` | Badge | `sourceType: "official-card-record"` | `Card Record` | Unknown source type fails. | Future family badge. |
| `badge.archive` | Badge | `sourceType: "official-archive"` | `Archive` | Unknown source type fails. | Future family badge. |
| `badge.navigationOnly` | Badge | `evidenceRole: "supplemental-navigation-only"` | `Navigation Only` | Required for supplemental. | Do not show for official records. |
| `badge.pendingVerification` | Badge | `verification.status: "not-checked"` | `Pending Link Check` | `Verification state unavailable` for unknown. | Current all records. |
| `role.officialPending` | Card evidence role | `evidenceRole: "official-support-pending-verification"` | `Official support, link pending.` | Do not render as verified. | Use sentence in expanded card. |
| `role.supplementalNavigation` | Card evidence role | `evidenceRole: "supplemental-navigation-only"` | `Navigation only.` | Required for supplemental. | Pair with boundary. |
| `card.usedFor.label` | Card field | `usedFor` | `Used for:` | Missing field fails validation. | Must stay specific. |
| `card.notFor.label` | Card field | `notFor` | `Does not support:` | Missing field fails validation. | Always visible for supplemental. |
| `card.link` | External link | `url` | `Open source` | `Source link unavailable` if no URL, but validator should fail. | Preserve external-link safety attributes. |
| `empty.rules` | Empty shelf | No records for rules/card-record group | `Rules and card-record sources are not ready in the registry yet.` | Hide shelf if preferred. | Do not imply available rules support. |
| `empty.archives` | Empty shelf | No official archive records | `No official archive sources are ready for this shelf yet.` | Hide shelf if preferred. | Do not promote unofficial mirrors. |
| `gap.known` | Gap section | Gate 3/4 gap list | `Known source gaps remain before Apocrypha can claim full coverage.` | Omit if no gaps. | Link to docs or show concise public gap note. |
| `error.registryLoad` | Error | Registry unavailable | `Source registry unavailable. Apocrypha cannot show source cards safely right now.` | Static no-JS source list if already generated. | Fail closed. |

## Current-Copy Disposition Audit

This audit classifies current live Apocrypha copy for future Gate 5 work. No live copy was changed in Gate 4.

| Current surface / phrase | Disposition | Reason | Gate 5 direction |
|---|---|---|---|
| `The Apocrypha` | Keep | Strong route identity and already recognized by the site. | Preserve as H1. |
| `Where Vox Mana shows its work.` | Keep | Clear, concise, source-conscious. | Preserve as short line. |
| Current broad intro naming websites, videos, archives, GitHub projects, and lore references | Replace | Lists media types before authority boundaries, which can flatten official and supplemental sources. | Use approved intro and trust explanation. |
| `Public links first.` | Revise | True but too weak for source authority. | Replace with source-authority language. |
| `Public references only` | Revise | Useful boundary, but does not explain official versus supplemental. | Keep concept inside trust copy. |
| `Grouped for browsing` | Revise | Browsing is useful but should not be the primary authority frame. | Use shelf and evidence-role framing. |
| `Reviewed support only` | Revise | Can sound verified; all links are currently pending online checks. | Use `registry-listed support` or `source roles recorded`. |
| `Official Lore: strongest lore foundation` | Revise | Good priority idea, but current lore shelf is incomplete. | Use Worldbuilding & Lore intro with partial-coverage caveat. |
| `Community References: useful for structure and interpretation` | Replace | May let supplemental sources carry interpretation claims. | Use Supplemental References and Navigation Only language. |
| `Video Lore: helpful for review and cross-checking` | Replace | Video sources are supplemental and should not imply claim support. | Use navigation/context only. |
| `Project Archives: useful for navigation and continuity` | Relocate | Project/archive wording currently mixes unofficial mirrors with official archives. | Keep unofficial mirrors supplemental unless official archive records exist. |
| `Official Wizards / Mark Rosewater` | Replace | Too narrow and mixes MaRo and non-MaRo Wizards material. | Use Official Design with subgroups from registry. |
| `Official Lore And Story` | Replace | Shelf has one official lore source; future language should admit partial coverage. | Use Worldbuilding & Lore. |
| `Story Archives And Indexes` | Relocate | Current records are non-official supplemental links. | Move under Supplemental References until official archive records exist. |
| `Wiki And Community References` | Replace | Accurate enough but not strong on authority boundary. | Use Supplemental References, Navigation Only. |
| `Video Lore And Overviews` | Revise | Better than "deep dives" but still needs supplemental boundary. | Place under Supplemental References. |
| Hardcoded shelf counts | Remove | Counts must be calculated from the registry. | Gate 5 renderer calculates counts. |
| `Verified Wizards links` or any similar claim | Replace | Link verification is not complete. | Use `Official publisher source; link pending`. |
| `near-official` | Remove | Ambiguous authority category. | Use only official or supplemental. |
| Footer unofficial fan-project boundary | Keep | Correct trust boundary. | Preserve or integrate with trust section. |

## Gap Handling

Gate 4 does not add sources. It only defines safe language for known gaps.

| Gap | Gate 4 classification | Safe public handling |
|---|---|---|
| Official color-pie index | Required before rendering | Keep in internal gap list; do not claim color-pie coverage is complete. |
| Original and revisited color essay canonical disagreements | Required before rendering | Render only after registry reconciliation or show partial coverage. |
| Ten two-color essay canonical disagreements | Required before rendering | Do not imply all guild design references are final until reconciled. |
| Five shard essay canonical disagreements | Required before rendering | Do not imply all shard references are final until reconciled. |
| Five wedge essays | Required before publication | Prototype may show partial coverage; publication copy must not claim completeness. |
| Ravnica Design Handoff Document | Future enhancement | Do not mention publicly until official URL and role are confirmed. |
| Ravnica plane page | Required before publication | Lore shelf should state partial coverage if rendered before this is added. |
| Alara plane page | Required before publication | Lore shelf should state partial coverage if rendered before this is added. |
| Two Ravnica flavor guides | Required before rendering | Do not present the lore shelf as complete with only one guide. |
| Magic Story archive | Required before publication | Supplemental story indexes cannot replace official story/archive coverage. |
| Rules page | Required before rendering if Rules shelf is shown | Hide or empty-state the shelf until a registry record exists. |
| Gatherer or approved card-record source | Required before rendering if Card Records shelf is shown | Hide or empty-state card-record content until a registry record exists. |

Approved gap copy:

`Known source gaps remain. Vox Mana should show partial coverage honestly rather than imply a complete official library.`

## Manual Voice QA Checklist

Use this checklist before Gate 5 applies copy to the page.

- [ ] Page intro says what Apocrypha does before using any metaphor.
- [ ] Page intro distinguishes official evidence from supplemental navigation.
- [ ] No public copy says links are verified while registry verification is `not-checked`.
- [ ] No public copy treats supplemental links as canon, rules, card-record, or design proof.
- [ ] No shelf title collapses unofficial archives into official archives.
- [ ] No source card exposes raw enum values.
- [ ] Every card explains `Used for` and `Does not support`.
- [ ] Supplemental records always show `Navigation Only` or equivalent.
- [ ] Historical/archive language does not imply current guidance.
- [ ] Counts are calculated from registry data and avoid completeness claims.
- [ ] Empty states tell the reader what is unavailable and why.
- [ ] Error states fail closed rather than guessing authority.
- [ ] No deckbuilder, recommendation, legality, pricing, or optimization claims appear.
- [ ] No generic AI or fantasy-fog phrases replace source authority.
- [ ] The copy still sounds like Vox Mana: precise, source-conscious, Commander-aware, and readable.

Gate 4 manual QA result:

- PASS: The approved contract distinguishes official evidence, pending verification, historical/archive boundaries, and supplemental navigation.
- PASS: Approved page, shelf, badge, evidence-role, verification, card, count, no-JavaScript, and error-state language avoids official overclaiming.
- PASS: The contract does not approve deckbuilder, legality, price, recommendation, canon-proof, or completeness claims.
- PASS: The current-copy disposition audit preserves strong existing phrases and flags weak phrases for Gate 5 without editing runtime files.
- NOTE: This QA is document/manual review only. No browser rendering was changed or tested because Gate 4 has no runtime output.

## Future Gate 5 Requirements

Gate 5 should:

- Render from `data/apocrypha-source-registry.json`.
- Apply the Gate 3 shelf architecture.
- Apply this Gate 4 copy contract.
- Calculate counts from registry records.
- Preserve external link safety attributes.
- Preserve no-JavaScript access to source cards.
- Fail closed on registry/schema/classification errors.
- Keep supplemental records visibly separate from official evidence.

Gate 5 should not:

- Treat current `not-checked` links as verified.
- Add official sources without a source-intake/audit record.
- Remove supplemental records without an audit trail.
- Render Rules & Card Records or Official Archives as populated shelves until records exist.

## Confirmations

- No runtime files were changed by this Gate 4 contract.
- No Apocrypha HTML, CSS, or JavaScript was changed.
- No source registry records were changed.
- No visible rendering was changed.
- No source URLs were added, removed, verified, or edited.
- No Strategium files were changed.
- No Archscry files or placement logic were changed.
- No CRIT-001 semantic data was changed.
- No generated files were changed.

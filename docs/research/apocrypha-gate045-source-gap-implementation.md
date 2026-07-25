# Apocrypha Gate 4.5 Source Gap Implementation

Date: 2026-07-25

Branch: `codex/apocrypha-gate01-source-inventory`

Worktree: `C:\dev\voxmana.io-apocrypha-gate01`

Starting SHA: `e2e905f662948571f238b16c9d8547f57992cb2b`

Starting parent: `585eb5e0bf588bae13d0ad549c94b3fd7ff46a91`

## Scope

Gate 4.5 updates the Apocrypha source registry, validator, research record, and handoff only. It does not implement registry rendering, edit Apocrypha HTML/CSS/JS, change visible copy, remove any existing source, add Gatherer, or modify package/generated/Strategium/Archscry/CRIT/Kanban files.

The expected final registry population is met:

| Measure | Count |
|---|---:|
| Existing records preserved | 49 |
| New official records added | 11 |
| Final records | 60 |
| Official records | 51 |
| Supplemental records | 9 |
| Verified records | 40 |
| Network-unchecked records | 20 |
| Move/remove candidates | 9 |

## Starting State

| Check | Result |
|---|---|
| Worktree | `C:/dev/voxmana.io-apocrypha-gate01` |
| Branch | `codex/apocrypha-gate01-source-inventory` |
| HEAD | `e2e905f662948571f238b16c9d8547f57992cb2b` |
| HEAD parent | `585eb5e0bf588bae13d0ad549c94b3fd7ff46a91` |
| Apocrypha worktree status | Clean before edits |
| Original main worktree | Present but not used as edit location |

The original main worktree already had unrelated dirty files before this gate. Gate 4.5 did not edit that worktree.

## Inputs Used

- `AGENTS.md`
- `data/apocrypha-source-registry.json`
- `scripts/validate-apocrypha-sources.mjs`
- `docs/research/apocrypha-gate02-source-registry.md`
- `docs/research/apocrypha-gate02a-registry-audit.md`
- `docs/research/apocrypha-gate03-information-architecture.md`
- `docs/research/apocrypha-gate04-voice-copy-contract.md`
- `docs/handoffs/2026-07-25-1346-codex-apocrypha-gate02a-registry-audit.md`
- `docs/handoffs/2026-07-25-1402-codex-apocrypha-gate03-information-architecture.md`
- `docs/handoffs/2026-07-25-1412-codex-apocrypha-gate04-voice-contract.md`
- `apocrypha/index.html`
- Attachment search result: `C:\Users\obake\.codex\attachments\23218ae3-d229-47ed-8624-7f527f18040b\goal-objective.md`

Important limitation: the attachment available locally is the prompt for the read-only shadow audit, not the completed report titled `Apocrypha Pre-Render Official Source Gap Audit`. This implementation therefore treated the Gate 4.5 prompt's approved candidate IDs as the controlling candidate set and independently checked the official Wizards URLs by GET.

## Audit Reconciliation

| Gap cluster | Result | Difference from expected shadow audit | Registry action |
|---|---|---|---|
| Official color-pie index | Accepted | Added the official index from direct GET evidence. | Added `apoc-design-lets-talk-color-pie`. |
| Original mono-color essays | Accepted | No URL corrections beyond existing registry; author/date/verification added where supported. | Corrected 5 records. |
| Revisited mono-color essays | Accepted | No URL corrections beyond existing registry; author/date/verification added where supported. | Corrected 5 records. |
| Two-color essay titles and metadata | Accepted with correction | Publisher titles do not include guild parentheticals; old migrated metadata has one date limitation. | Corrected 10 records. |
| Azorius canonical URL | Accepted with correction | Official GET check supports `slow-and-steady-2006-05-01-0`; hardcoded HTML still has unsuffixed URL. | Corrected registry URL only. |
| Shard essay titles and metadata | Accepted with correction | Publisher titles do not include shard parentheticals; two dates differ from URL suffixes. | Corrected 5 records. |
| Existing Ravnica flavor guide | Accepted | Added author/date/verification. | Corrected `apoc-lore-flavorful-guide-guilds-ravnica`. |
| Pie Fights and Mechanical Color Pie 2021 records | Accepted with correction | Verified and metadata-normalized; `The` removed from 2021 title per publisher H1. | Corrected 3 design records. |
| Five wedge essays | Accepted | Added complete five-record wedge set. Existing `Khan Do Attitude` records were preserved but not used to claim full wedge coverage. | Added 5 records. |
| Second Ravnica flavor guide | Accepted | Added Ravnica Allegiance guide. | Added `apoc-lore-flavorful-guide-ravnica-allegiance`. |
| Ravnica and Alara plane pages | Accepted | Added official story plane pages; author/date remain null. | Added 2 lore records. |
| Magic Story archive | Accepted | Added current official story surface as archive/navigation; does not solve pre-2014 completeness. | Added `apoc-archive-magic-story`. |
| Official rules page | Accepted with boundary | Added rules landing page, but no card-record source. | Added `apoc-rules-magic-rules`; Rules & Card Records shelf remains suppressed. |
| Gatherer / card-record authority and Ravnica Design Handoff Document | Deferred | Explicitly out of Gate 4.5 scope. | No records added. |

## Added Records

| ID | Title | URL | Source type | Group | Evidence role | Verification | Target Gate 3 shelf | Reason |
|---|---|---|---|---|---|---|---|---|
| `apoc-design-lets-talk-color-pie` | Let's Talk Color Pie | `https://magic.wizards.com/en/news/making-magic/lets-talk-color-pie` | `official-design` | `design` | `official-support` | `verified` | Official Design | Official color-pie index and article trail. |
| `apoc-design-we-will-survive-abzan` | We Will Survive | `https://magic.wizards.com/en/news/making-magic/we-will-survive-2014-09-29` | `official-design` | `design` | `official-support` | `verified` | Official Design | Abzan wedge design coverage. |
| `apoc-design-smart-thinking-jeskai` | Smart Thinking | `https://magic.wizards.com/en/news/making-magic/smart-thinking-2014-11-03` | `official-design` | `design` | `official-support` | `verified` | Official Design | Jeskai wedge design coverage. |
| `apoc-design-whatever-it-takes-sultai` | Whatever It Takes | `https://magic.wizards.com/en/news/making-magic/whatever-it-takes-2015-02-02` | `official-design` | `design` | `official-support` | `verified` | Official Design | Sultai wedge design coverage. |
| `apoc-design-finishing-first-mardu` | Finishing First | `https://magic.wizards.com/en/news/making-magic/finishing-first-2014-11-17` | `official-design` | `design` | `official-support` | `verified` | Official Design | Mardu wedge design coverage. |
| `apoc-design-what-doesnt-kill-you-makes-you-stronger-temur` | What Doesn't Kill You Makes You Stronger | `https://magic.wizards.com/en/news/making-magic/what-doesnt-kill-you-makes-you-stronger-2015-02-23` | `official-design` | `design` | `official-support` | `verified` | Official Design | Temur wedge design coverage. |
| `apoc-lore-flavorful-guide-ravnica-allegiance` | A Flavorful Guide to the Guilds of Ravnica Allegiance | `https://magic.wizards.com/en/news/feature/flavorful-guide-guilds-ravnica-allegiance-2019-02-07` | `official-lore` | `lore` | `official-support` | `verified` | Worldbuilding & Lore | Second official Ravnica guild flavor guide. |
| `apoc-lore-ravnica-plane` | RAVNICA | `https://magic.wizards.com/en/story/ravnica-plane` | `official-lore` | `lore` | `official-support` | `verified` | Worldbuilding & Lore | Official Ravnica plane context. |
| `apoc-lore-alara-plane` | ALARA | `https://magic.wizards.com/en/story/alara-plane` | `official-lore` | `lore` | `official-support` | `verified` | Worldbuilding & Lore | Official Alara plane context. |
| `apoc-archive-magic-story` | MTG Story, Planes, and Planeswalkers | `https://magic.wizards.com/en/story` | `official-archive` | `official-archives` | `official-support` | `verified` | Official Archives | Official story archive and story-source discovery surface. |
| `apoc-rules-magic-rules` | RULES | `https://magic.wizards.com/en/rules` | `official-rules` | `rules-card-records` | `official-support` | `verified` | Suppressed Rules & Card Records | Official rules-document landing page. |

## Existing-Record Corrections

### Metadata-Only Changes

These records received confirmed author/date metadata, verified-state metadata, evidence role `official-support`, and verification notes without title or URL changes:

| ID | Metadata change |
|---|---|
| `apoc-design-great-white-way` | Author `Mark Rosewater`; published `2003-02-03`; verification `verified`. |
| `apoc-design-true-blue` | Author `Mark Rosewater`; published `2003-08-11`; verification `verified`. |
| `apoc-design-in-the-black` | Author `Mark Rosewater`; published `2004-02-02`; verification `verified`. |
| `apoc-design-seeing-red` | Author `Mark Rosewater`; published `2004-07-19`; verification `verified`. |
| `apoc-design-not-easy-being-green` | Author `Mark Rosewater`; published `2002-10-21`; verification `verified`. |
| `apoc-design-great-white-way-revisited` | Author `Mark Rosewater`; published `2015-07-13`; verification `verified`. |
| `apoc-design-true-blue-revisited` | Author `Mark Rosewater`; published `2015-07-20`; verification `verified`. |
| `apoc-design-in-the-black-revisited` | Author `Mark Rosewater`; published `2015-07-27`; verification `verified`. |
| `apoc-design-seeing-red-revisited` | Author `Mark Rosewater`; published `2015-08-03`; verification `verified`. |
| `apoc-design-not-easy-being-green-revisited` | Author `Mark Rosewater`; published `2015-08-10`; verification `verified`. |
| `apoc-design-pie-fights` | Author `Mark Rosewater`; published `2016-11-15`; verification `verified`. |
| `apoc-design-mechanical-color-pie-2021-changes` | Author `Mark Rosewater`; published `2021-10-18`; verification `verified`. |
| `apoc-lore-flavorful-guide-guilds-ravnica` | Author `Cassie LaBelle`; published `2018-10-03`; verification `verified`. |

### Title Normalization

| ID | Previous title | New publisher-facing title |
|---|---|---|
| `apoc-design-mechanical-color-pie-2021` | The Mechanical Color Pie 2021 | Mechanical Color Pie 2021 |
| `apoc-design-group-think-selesnya` | Group Think (Selesnya) | Group Think |
| `apoc-design-life-and-death-golgari` | Life and Death (Golgari) | Life and Death |
| `apoc-design-pretty-sneaky-sis-dimir` | Pretty Sneaky, Sis (Dimir) | Pretty Sneaky Sis |
| `apoc-design-disorderly-conduct-boros` | Disorderly Conduct (Boros) | Disorderly Conduct |
| `apoc-design-aaaargh-gruul` | Aaaargh! (Gruul) | Aaaargh!!! |
| `apoc-design-creative-differences-izzet` | Creative Differences (Izzet) | Creative Differences |
| `apoc-design-playing-own-rules-orzhov` | Playing by Their Own Rules (Orzhov) | Playing By Their Own Rules |
| `apoc-design-slow-and-steady-azorius` | Slow and Steady (Azorius) | Slow and Steady |
| `apoc-design-hedonism-attitude-rakdos` | Hedonism with Attitude (Rakdos) | Hedonism With Attitude |
| `apoc-design-improving-upon-nature-simic` | Improving Upon Nature (Simic) | Improving Upon Nature |
| `apoc-design-peace-love-understanding-bant` | Peace, Love and Understanding (Bant) | Peace, Love and Understanding |
| `apoc-design-striving-for-perfection-esper` | Striving for Perfection (Esper) | Striving For Perfection |
| `apoc-design-looking-out-number-one-grixis` | Looking Out For Number One (Grixis) | Looking Out For Number One |
| `apoc-design-following-your-heart-jund` | Following Your Heart (Jund) | Following Your Heart |
| `apoc-design-searching-within-naya` | Searching Within (Naya) | Searching Within |

### URL Correction

| ID | Previous URL | New URL | Notes |
|---|---|---|---|
| `apoc-design-slow-and-steady-azorius` | `https://magic.wizards.com/en/news/making-magic/slow-and-steady-2006-05-01` | `https://magic.wizards.com/en/news/making-magic/slow-and-steady-2006-05-01-0` | GET check confirmed the official `-0` page. `apocrypha/index.html` remains unchanged until Gate 5. |

### Verification-State Changes

The 29 corrected existing records changed from:

```json
"verification": {
  "status": "not-checked",
  "checkedAt": null,
  "method": null,
  "httpStatus": null,
  "finalUrl": null,
  "redirectChain": []
}
```

to verified GET evidence:

```json
"verification": {
  "status": "verified",
  "checkedAt": "2026-07-25",
  "method": "GET",
  "httpStatus": 200,
  "finalUrl": "...",
  "redirectChain": [
    { "url": "...", "status": 200, "location": null }
  ]
}
```

All verified records now use `evidenceRole: "official-support"`.

## Verification Results

| Measure | Result |
|---|---:|
| Total registry records | 60 |
| Existing records preserved | 49 |
| New records | 11 |
| GET attempts | 40 |
| Successful GET checks | 40 |
| Failed or inconclusive GET checks | 0 |
| Redirects observed | 0 |
| Verified records | 40 |
| Network-unchecked records | 20 |
| Duplicate IDs | 0 |
| Duplicate canonical URLs | 0 |

Formal verified-state standard used in Gate 4.5:

- `verification.status: "verified"`
- `verification.checkedAt: "2026-07-25"`
- `verification.method: "GET"`
- observed `verification.httpStatus` in the 2xx/3xx range
- non-null `verification.finalUrl`
- structured `verification.redirectChain`
- `evidenceRole: "official-support"`

The 20 remaining not-checked records are the unaffected official records and the 9 supplemental records not in the Gate 4.5 correction set.

## Schema And Validator Changes

Added enum values:

| Enum | Added values |
|---|---|
| `sourceType` | `official-archive`, `official-rules` |
| `group` | `official-archives`, `rules-card-records` |
| `evidenceRole` | `official-support` |
| `verificationStatus` | `verified` |

Validator hardening added:

- `official-design` must map to `design`.
- `official-lore` must map to `lore`.
- `official-archive` must map to `official-archives`.
- `official-rules` must map to `rules-card-records`.
- `rules-card-records` may only contain `official-rules` until card-record authority is approved.
- Verified official records must use `official-support`.
- Pending official records must use `official-support-pending-verification`.
- Verified records must include GET method, check date, observed HTTP status, final URL, and structured redirect-chain evidence.
- HEAD-only verification cannot pass as verified because method must be `GET`.
- Unknown/orphan enums, duplicate IDs, duplicate canonical URLs, undocumented fields, missing documented fields, supplemental no-claims policy, and replacement lineage rules continue to be enforced.

Intentionally rejected or deferred:

- No `official-card-record` enum was added.
- No Gatherer domain or record was added.
- No blocked/unavailable enum was added solely for deferred Gatherer work.
- No Ravnica Design Handoff Document record was added.

## Deferred Work

| Item | Status |
|---|---|
| Gatherer | Deferred; no record added. |
| Official card-record support | Deferred; no `official-card-record` enum added. |
| Rules & Card Records shelf rendering | Suppressed until approved official card-record source is inspected and added. |
| Ravnica Design Handoff Document | Deferred; not added in this gate. |
| Current hardcoded `Verified` copy | Still present in `apocrypha/index.html`; Gate 5 must replace it using Gate 4 copy contract. |
| Hardcoded Azorius URL mismatch | Registry uses verified `-0` URL; hardcoded HTML remains unsuffixed until Gate 5. |
| Pre-2014 Magic Story archive completeness | Still limited; current story surface is official but does not guarantee complete older story coverage. |
| Missing shadow audit result | Only the shadow-audit prompt was available locally; field values were independently checked from official pages. |

## Gate 5 Readiness

Gate 5 may render:

- Official Design
- Worldbuilding & Lore
- Official Archives
- Supplemental References

Gate 5 must suppress:

- Rules & Card Records, despite the official rules record, until a card-record source such as Gatherer or an approved replacement is independently inspected and added.

Gate 5 must use:

- `docs/research/apocrypha-gate03-information-architecture.md`
- `docs/research/apocrypha-gate04-voice-copy-contract.md`
- `data/apocrypha-source-registry.json`
- `scripts/validate-apocrypha-sources.mjs`

No registry issue blocks Gate 5 for the permitted shelves. Gate 5 still must avoid completeness claims and must replace the hardcoded page mismatch rather than treating current HTML copy as registry truth.

## Validation

Commands run:

```bash
node --check scripts/validate-apocrypha-sources.mjs
node scripts/validate-apocrypha-sources.mjs
```

Current validator result:

```text
Apocrypha source registry validation PASS: 60 records, 51 official, 9 supplemental, 20 not checked, 9 move/remove candidates.
```

Additional required validations are recorded in the Gate 4.5 handoff and final task report.

## Confirmations

- No Apocrypha HTML, CSS, or JavaScript was changed.
- No Gate 4 copy contract was changed.
- No Gate 3 architecture document was changed.
- No Strategium files were changed.
- No Archscry files or placement logic were changed.
- No CRIT-001 semantic data was changed.
- No generated files were changed.
- No package files were changed.
- No Kanban files were changed.
- No original main worktree files were edited by this gate.

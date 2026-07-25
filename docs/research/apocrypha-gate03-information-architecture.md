# Apocrypha Gate 3 Information Architecture

Date: 2026-07-25

Branch: `codex/apocrypha-gate01-source-inventory`

Worktree: `C:\dev\voxmana.io-apocrypha-gate01`

Starting SHA: `dcb3328be42884af177b2ee4376bd4c7b1343bf0`

## Scope

This document is the single authoritative Gate 3 model for how Apocrypha should be organized. It is an architecture contract only. Gate 3 does not edit Apocrypha HTML, CSS, JavaScript, visible copy, rendered sources, or the registry data.

Gate 5 should render from `data/apocrypha-source-registry.json` using this model. Any future shelf, badge, enum, or source-family value that is not already present in the registry must be added to the registry schema before rendering consumes it. No classification rule should exist only in HTML.

## Core Reader Questions

Every Apocrypha source card should answer:

1. What kind of source is this?
2. What is this source authoritative for?
3. Why is Vox Mana citing it?

Apocrypha is an evidence library, not a bibliography. Sources are organized by source authority and evidence use, not by collector convenience.

## Authoritative Data Model

The registry remains the source of truth. Rendering should read these registry fields directly:

- `group` for primary shelf.
- `subgroup` for shelf section.
- `sourceType` for authority family.
- `evidenceRole` for claim-use policy.
- `status` and `auditDisposition` for treatment and visibility.
- `verification.status` for verification state.
- `topics`, `colors`, `identities`, and `planes` for filtering/search.

Gate 3 defines the complete shelf taxonomy below. Current schema v2 contains only values used by the current 49 records: `design`, `lore`, and `supplemental`. Before Gate 5 renders rules/card-record or archive shelves, the registry schema must be extended with the documented group/sourceType values and corresponding records.

## Shelf Hierarchy

Canonical primary shelf order:

1. Official Design
2. Worldbuilding & Lore
3. Rules & Card Records
4. Official Archives
5. Supplemental References

Canonical shelf-to-registry mapping:

| Shelf | Registry `group` | Registry `sourceType` families |
|---|---|---|
| Official Design | `design` | `official-design` |
| Worldbuilding & Lore | `lore` | `official-lore` |
| Rules & Card Records | `rules-card-records` | `official-rules`, `official-card-record` |
| Official Archives | `official-archives` | `official-archive` |
| Supplemental References | `supplemental` | `supplemental-reference` |

Current Gate 3 registry status:

| Shelf | Current records | Gate 5 readiness |
|---|---:|---|
| Official Design | 39 | Ready for rendering after Gate 4 voice review. |
| Worldbuilding & Lore | 1 | Structurally ready, content incomplete. |
| Rules & Card Records | 0 | Requires registry enum extension and source records before rendering. |
| Official Archives | 0 | Requires registry enum extension and source records before rendering. |
| Supplemental References | 9 | Ready only as visually de-emphasized navigation records. |

## Shelf Rules

| Shelf | Purpose | Intended reader | Evidence authority | Inclusion criteria | Exclusion criteria | Badge | Ordering |
|---|---|---|---|---|---|---|---|
| Official Design | Show official design rationale behind color philosophy, mechanics, color pie, faction design, and design intent. | Reader checking why Vox Mana treats a color or faction idea as design-supported. | Official design evidence, pending link verification until `verification.status` changes. | `group: "design"`, `sourceType: "official-design"`, `official: true`, `evidenceRole: "official-support-pending-verification"` or later verified official support role. | Lore-only sources, rules/card-record references, unofficial summaries, fan commentary. | `Official`, `Design`, plus verification badge. | Subgroup order, then record order. |
| Worldbuilding & Lore | Show official story, setting, plane, and flavor material used for identity context. | Reader checking what lore or setting support exists. | Official lore evidence, pending link verification until checked. | `group: "lore"`, `sourceType: "official-lore"`, `official: true`. | Design-only articles unless they also carry official lore/source role in registry; supplemental story indexes. | `Official`, `Lore`, plus verification badge. | Subgroup order, then record order. |
| Rules & Card Records | Show canonical game references for rules text, Oracle/card records, and legality-adjacent truth. | Reader checking game-reference authority rather than interpretation. | Highest practical rules/card-record authority once verified. | Future `group: "rules-card-records"` with `sourceType: "official-rules"` or `official-card-record`. | Design philosophy, lore articles, deckbuilding guides, third-party card pages unless intentionally supplemental. | `Official`, `Rules` or `Card Record`, plus verification badge. | Rules before card records; then record order. |
| Official Archives | Preserve official historical Wizards material that is useful but not current guidance. | Reader checking historical source lineage or older official statements. | Historical official reference, not current guidance unless registry says otherwise. | Future `group: "official-archives"`, `sourceType: "official-archive"`, `status` indicating historical/archive lifecycle. | Current official guidance; unofficial mirrors; copied articles away from publisher. | `Official`, `Archive`, `Historical`, plus verification badge. | Current relevance note first, then publication chronology. |
| Supplemental References | Keep navigation/context helpers separate from official evidence. | Reader trying to navigate story chronology, fandom terminology, or community context without mistaking it for proof. | Non-claim-bearing navigation only. | `group: "supplemental"`, `sourceType: "supplemental-reference"`, `official: false`, `evidenceRole: "supplemental-navigation-only"`. | Anything that must carry official claims, canon proof, rules authority, card-record truth, or standalone source support. | `Supplemental`, `Navigation Only`, plus verification badge. | Supplemental subtype order, then publisher/title. |

## Subgroup Rules

`subgroup` is the second-level shelf. It must remain registry-owned and must not be hardcoded from title text.

Canonical current subgroup display order:

| Shelf | Subgroup | Purpose |
|---|---|---|
| Official Design | `foundational-color-philosophy` | Original and revisited color philosophy foundations. |
| Official Design | `current-color-voice-governance` | Current color voice, council, and mechanical color-pie maintenance. |
| Official Design | `ravnica-guild-design` | Ravnica guild and two-color design evidence. |
| Official Design | `alara-shard-and-three-color-design` | Three-color shard/wedge design evidence currently rendered. |
| Worldbuilding & Lore | `official-lore-and-story` | Official lore, flavor, and setting material. |
| Supplemental References | `story-archives-and-indexes` | Navigation helpers for story archives/chronology. |
| Supplemental References | `wiki-and-community-references` | Community or wiki context only. |
| Supplemental References | `video-lore-and-overviews` | Video review surfaces only. |

Future subgroups must be introduced in the registry schema or a registry-owned ordering table before Gate 5 renders them. HTML must not infer subgroup order.

## Ordering Rules

Ordering must be deterministic and data-driven.

Primary ordering:

1. Shelf order from this architecture: `design`, `lore`, `rules-card-records`, `official-archives`, `supplemental`.
2. Subgroup order from registry-owned subgroup metadata.
3. Evidence role priority:
   - verified official support, when introduced later
   - `official-support-pending-verification`
   - historical/archive official support, when introduced later
   - `supplemental-navigation-only`
4. Record order inside subgroup:
   - Use explicit registry `sortKey` only if a later schema adds it.
   - Until `sortKey` exists, preserve registry source-array order for current rendered records.
   - For newly added official records without `sortKey`, use publication chronology when `publishedDate` is known, then title alphabetically.
   - For supplemental records without `sortKey`, order by supplemental subtype, publisher, then title.

Gate 5 should not sort by DOM position, current HTML section labels, or visual card placement. If future maintainers need a custom order, add a registry field rather than hiding the rule in rendering code.

## Badge Vocabulary

Badges are semantic labels only; Gate 3 does not define colors or visuals.

| Badge | Source | Meaning |
|---|---|---|
| `Official` | `official: true` | Publisher/authority is official according to registry rules. |
| `Design` | `sourceType: "official-design"` | Source supports design philosophy, mechanics, color pie, or design intent. |
| `Lore` | `sourceType: "official-lore"` | Source supports official story, setting, plane, or flavor context. |
| `Rules` | Future `sourceType: "official-rules"` | Source supports comprehensive rules or official rules reference. |
| `Card Record` | Future `sourceType: "official-card-record"` | Source supports Oracle/card-record truth. |
| `Archive` | Future `sourceType: "official-archive"` or `group: "official-archives"` | Source is official historical/reference material. |
| `Historical` | Future historical/archive lifecycle status | Source is not current guidance by default. |
| `Supplemental` | `sourceType: "supplemental-reference"` | Source is non-official supplemental context. |
| `Navigation Only` | `evidenceRole: "supplemental-navigation-only"` | Source may help locate/contextualize but cannot carry claims. |
| `Pending Verification` | `verification.status: "not-checked"` | Link has not been checked online. |

Badge precedence:

1. Authority badge: `Official` or `Supplemental`.
2. Source family badge: `Design`, `Lore`, `Rules`, `Card Record`, or `Archive`.
3. Evidence role badge: `Navigation Only` when supplemental, or future official evidence-role labels.
4. Verification badge: `Pending Verification` until GET checks are recorded.

## Authority Presentation

Every source card must expose:

- Authority family: derived from `sourceType`.
- Claim-use role: derived from `evidenceRole`.
- Positive use: `usedFor`.
- Boundary: `notFor`.
- Verification state: `verification.status`.

Official records currently use `evidenceRole: "official-support-pending-verification"`, which means the source is official-looking by registry authority but not link-verified. Gate 5 must not phrase these as verified until `verification.status` records a successful GET-based check.

Supplemental records must never be displayed in a way that competes visually or semantically with official evidence. Their card text must make clear that they are navigation/context helpers only.

## Source Card Contract

Required rendered fields:

| Card field | Registry field | Required behavior |
|---|---|---|
| Title | `title` | Render as the source card heading and external link label. |
| Publisher | `publisher` | Show when present; if null, show a neutral unknown-publisher fallback in Gate 5 copy. |
| Authority badge | `official`, `sourceType` | Render semantic badge stack. |
| Evidence role | `evidenceRole` | Render as the source's claim-use explanation. |
| Short description | `usedFor` | Render concise "why Vox Mana cites this" text. |
| Boundary | `notFor` | Render or disclose the prohibited-use boundary, especially for supplemental records. |
| Topics | `topics` | Render tags or make available for filtering/search. |
| Verification status | `verification.status` | Render `Pending Verification` for `not-checked`. |
| External link | `url` | Use as the outbound link; preserve `rel="noopener"` in Gate 5. |

Optional rendered fields:

| Card field | Registry field | Behavior |
|---|---|---|
| Author | `author` | Show only when non-null. |
| Publication date | `publishedDate` | Show only when non-null; can support chronology sorting later. |
| Color filters | `colors` | Use only when non-empty. |
| Identity filters | `identities` | Use only when non-empty. |
| Plane filters | `planes` | Use only when non-empty. |
| Audit note | `notes` | Use in admin/research view or details disclosure, not as primary reader text unless needed. |
| Replacement lineage | `replacementFor`, `replacedBy` | Use for source migration reports or archive details. |

Future additions should not redesign the card. Add optional fields only when they describe authority, evidence use, verification, filtering, or lineage.

## Reader Flow

Natural page flow:

```text
Introduction: how to read Apocrypha as evidence
  -> Official Design: why color/faction interpretation is supported
  -> Worldbuilding & Lore: official setting/story context
  -> Rules & Card Records: canonical game truth once added
  -> Official Archives: historical official material, visually distinct
  -> Supplemental References: navigation only, clearly lower authority
  -> Gaps and future additions: transparent missing-source queue
```

The page should make official evidence easy to find before supplemental context appears. Supplemental references should not be the default route for understanding a claim.

## Registry Mapping

| Registry field | Rendering behavior | Hidden logic allowed? |
|---|---|---|
| `schemaVersion` | Gate 5 must require supported schema version. | No. Unsupported version must fail closed. |
| `schema.fields` | Defines required fields for renderer assumptions. | No. Renderer should not expect undocumented fields. |
| `schema.enums` | Defines allowed enum values. | No. Unknown enum values must fail closed or render in an explicit unknown state. |
| `group` | Primary shelf. | No. |
| `subgroup` | Secondary section within shelf. | No. |
| `sourceType` | Source-family badges and authority summary. | No. |
| `official` | Official/supplemental fast filter. | No; must agree with `sourceType` and `group`. |
| `status` | Lifecycle treatment and rendering eligibility. | No. |
| `evidenceRole` | Evidence explanation and claim-bearing rules. | No. |
| `usedFor` | Why Vox Mana cites the source. | No. |
| `notFor` | Boundary/prohibited-use explanation. | No. |
| `topics` | Search/filter tags. | No. |
| `colors` | Future color filtering. | No. |
| `identities` | Future identity filtering. | No. |
| `planes` | Future plane filtering. | No. |
| `verification.status` | Verification indicator badge/text. | No. |
| `verification.checkedAt` | Verification date when available. | No. |
| `verification.httpStatus` | Link-health detail when available. | No. |
| `verification.finalUrl` | Redirect/final URL detail when available. | No. |
| `auditDisposition` | Move/remove/keep audit state, especially for supplemental handling. | No. |

## Future Rendering Contract

Gate 5 must consume the registry as follows:

- Load `data/apocrypha-source-registry.json`.
- Require `schemaVersion: 2` unless a later committed migration updates this contract.
- Run `node scripts/validate-apocrypha-sources.mjs` before rendering work.
- Group records by `group`, then `subgroup`.
- Apply shelf order from this document only after the registry schema contains the corresponding group values.
- Render each card from the source card contract above.
- Calculate source counts from records; never store manual count chips in HTML.
- Preserve every current rendered source until a future audit records its replacement/removal path.

Missing-field behavior:

- Required fields missing: fail the Gate 5 build or local validation.
- Optional null fields: omit field from public card or show a neutral fallback only if required for layout.
- Empty `topics` or `linkedFrom`: fail validation.
- Empty `colors`, `identities`, or `planes`: allowed; render no filter chips.

Unknown enum behavior:

- Unknown `group`, `sourceType`, `status`, `evidenceRole`, `verification.status`, or `auditDisposition`: fail closed.
- Unknown but documented future enum values must not render until Gate 5 defines their shelf/card behavior.

No-JavaScript fallback:

- The final rendered HTML should include all source cards in deterministic shelf order without requiring JavaScript.
- JavaScript may enhance filtering, search, accordion state, or rail navigation, but it must not be the only path to source evidence.

## Gap Resolution Plan

| Gap from Gate 2A | Gate 3 classification | Future shelf | Rendering blocker? | Notes |
|---|---|---|---|---|
| Official color-pie index | Required before rendering | Official Design | Yes | Needed to anchor color-pie index support before the page claims completeness. |
| Original and revisited color essay canonical disagreements | Required before rendering | Official Design | Yes | Current rendered records are preserved, but exact canonical URLs/titles must be reconciled before registry-driven rendering goes live. |
| My Words series | Accounted | Official Design | No | Current records exist; still pending verification. |
| Mechanical Color Pie 2021 | Accounted | Official Design | No | Current record exists; still pending verification. |
| Mechanical Color Pie 2021 Changes | Accounted | Official Design | No | Current record exists; still pending verification. |
| Council of Colors, Revisited | Accounted | Official Design | No | Current record exists; still pending verification. |
| Ten two-color essay canonical disagreements | Required before rendering | Official Design | Yes | Current rendered records differ from retained audit; reconcile before rendering consumes registry. |
| Five shard essay canonical disagreements | Required before rendering | Official Design | Yes | Current rendered records differ from retained audit; reconcile before rendering consumes registry. |
| Five wedge essays | Required before publication | Official Design | No for prototype, yes before claiming completeness | Current rendered set has two wedge/Tarkir records. |
| Ravnica Design Handoff Document | Future enhancement | Official Design or Official Archives | No | Add only after official URL and authority role are confirmed. |
| Ravnica plane page | Required before publication | Worldbuilding & Lore | No for prototype, yes before lore shelf is presented as complete. |
| Alara plane page | Required before publication | Worldbuilding & Lore | No for prototype, yes before lore shelf is presented as complete. |
| Two Ravnica flavor guides | Required before rendering | Worldbuilding & Lore | Yes | One guide exists; second guide must be identified or the shelf must state partial coverage. |
| Magic Story archive | Required before publication | Worldbuilding & Lore or Official Archives | No for prototype, yes before story/archive claims. |
| Rules page | Required before rendering if Rules shelf is shown | Rules & Card Records | Yes if shelf rendered | Otherwise keep shelf as documented gap only. |
| Gatherer | Required before rendering if Card Records shelf is shown | Rules & Card Records | Yes if shelf rendered | Otherwise keep shelf as documented gap only. |

## Assumptions

- Gate 3 is documentation-only by instruction, so registry enum expansion for future shelves is deferred.
- `data/apocrypha-source-registry.json` remains the runtime source of truth once Gate 5 begins.
- Current `verification.status: "not-checked"` means no public copy should imply online verification.
- Current supplemental records remain in the model only as navigation/context records, not official support.
- Gate 4 voice work should rewrite explanatory language in docs/page copy only after this model is accepted.

## Validation Checklist

Gate 3 architecture is internally consistent if:

- Every shelf derives from a registry `group`.
- Every badge derives from a registry field.
- Every ordering rule uses registry fields or an explicit registry-owned order.
- Supplemental records cannot appear as official evidence.
- Rules/card-record and archive shelves do not render until registry records and enum values exist.
- Source counts are calculated from records.
- Missing official-source gaps have a shelf assignment and rendering blocker classification.

## Confirmations

- No runtime files were changed.
- No Apocrypha HTML, CSS, or JavaScript was changed.
- No rendering was changed.
- No visible copy was changed.
- No sources were added, removed, or URL-edited.
- No registry data was changed in Gate 3.
- No Strategium files were changed.
- No Archscry files or placement logic were changed.
- No CRIT-001 semantic data was changed.

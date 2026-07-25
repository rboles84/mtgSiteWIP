# Apocrypha Gate 2A Registry Audit and Hardening

Date: 2026-07-25

Branch: `codex/apocrypha-gate01-source-inventory`

Worktree: `C:\dev\voxmana.io-apocrypha-gate01`

Starting SHA: `b630777243a4c7fdc441c0b70d77c3229e004c34`

Starting parent: `4ef43d17f817a1a633d897f06dfa603256c8e2c4`

## Scope

Gate 2A audits and hardens the Gate 2 registry as a production metadata artifact. It does not begin Gate 3 information architecture, wire data into rendering, alter visible copy, change shelves, add or remove sources, or edit Apocrypha HTML/CSS/JS.

## Files Reviewed

- `data/apocrypha-source-registry.json`
- `scripts/validate-apocrypha-sources.mjs`
- `docs/research/apocrypha-gate02-source-registry.md`

## Files Changed

- `data/apocrypha-source-registry.json`
- `scripts/validate-apocrypha-sources.mjs`
- `docs/research/apocrypha-gate02-source-registry.md`
- `docs/research/apocrypha-gate02a-registry-audit.md`
- `docs/handoffs/2026-07-25-1346-codex-apocrypha-gate02a-registry-audit.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Audit Findings

Gate 2 validation passed, but the first registry shape still had maintenance risks:

- `status` mixed record lifecycle with online link verification by using `not-checked` as a source status.
- `linkStatus` and `lastVerified` were too flat for future GET checks, final URLs, HTTP status, and redirect chains.
- Canonical enums lived only in the validator, so the registry was not fully self-describing.
- The validator allowed unused future enum members for records that do not exist yet.
- The validator checked field presence but did not fully reject contradictory classification combinations.
- Required arrays such as `topics` and `linkedFrom` were not meaningfully enforced.
- Supplemental source policy was expressed in prose but not enforced as a semantic combination.

## Schema Changes

The registry migrated from `schemaVersion: 1` to `schemaVersion: 2`.

Top-level additions:

- `schema.fields`: documents every record field inside the registry.
- `schema.enums`: makes the active enum contract explicit and auditable.
- `schema.approvedOfficialDomains`: defines the current official-domain allowlist used by validation.

Record-level changes:

- Replaced flat `linkStatus` and `lastVerified` with structured `verification`.
- Changed `status` from mixed verification/lifecycle values to lifecycle values only.
- Added `evidenceRole` to encode claim-use policy.
- Kept `official` as a compatibility boolean, but the validator now treats `sourceType`, `group`, `official`, `status`, `evidenceRole`, and `auditDisposition` as a locked classification set.

Structured verification shape:

```json
{
  "status": "not-checked",
  "checkedAt": null,
  "method": null,
  "httpStatus": null,
  "finalUrl": null,
  "redirectChain": []
}
```

## Canonical Fields

| Field | Purpose | Intended consumer / future gate use |
|---|---|---|
| `id` | Stable readable source identifier. | Gate 5 rendering keys, audits, future source replacement links. |
| `title` | Source title. | Cards, filters, search, audit reports. |
| `url` | Currently rendered Gate 1 URL. | Rendering preservation and link checks. |
| `canonicalUrl` | Tracking-free dedupe URL. | Validator, duplicate checks, source replacement review. |
| `publisher` | Known publisher or host. | Badges, filtering, authority explanation. |
| `author` | Confirmed author when known. | Attribution after verification. |
| `publishedDate` | Confirmed publication date. | Sorting, dated/historical status later. |
| `sourceType` | Source family. | Badges, grouping, authority rules. |
| `group` | High-level shelf. | Gate 3 grouping and Gate 5 rendering. |
| `subgroup` | Lower-level shelf. | Shelf organization and source compass mapping. |
| `official` | Boolean official/supplemental filter. | Compatibility and fast filtering. |
| `status` | Registry lifecycle status. | Rendering eligibility and audit workflow. |
| `evidenceRole` | Claim-use policy. | Evidence explanations and claim-bearing safeguards. |
| `usedFor` | Positive use explanation. | Source cards and audit display. |
| `notFor` | Explicit prohibited uses. | Source integrity warnings and review checks. |
| `topics` | Search/filter tags. | Future search and topic filters. |
| `colors` | Optional color tags. | Future color filters when safely populated. |
| `identities` | Optional identity tags. | Future identity filters when safely populated. |
| `planes` | Optional plane tags. | Future plane filters when safely populated. |
| `linkedFrom` | Current rendered locator. | No-source-disappears audits and migration checks. |
| `verification` | Online verification state. | GET verification pass and link health reporting. |
| `replacementFor` | Source IDs replaced by this record. | Source migration lineage. |
| `replacedBy` | Source IDs replacing this record. | Source migration lineage. |
| `notes` | Audit limitations and context. | Review, handoff, and gap triage. |
| `auditDisposition` | Gate audit recommendation. | Move/remove/keep reporting independent from lifecycle. |

## Canonical Enums

Only enum values used by current records are enabled. Future official rules, card-record, or archive records must update the enum contract when those records are actually added.

| Enum | Values | Notes |
|---|---|---|
| `sourceType` | `official-design`, `official-lore`, `supplemental-reference` | Removed unused future source families from the active contract. |
| `group` | `design`, `lore`, `supplemental` | Removed unused future groups from the active contract. |
| `status` | `active`, `candidate-move` | Lifecycle only; no verification values. |
| `evidenceRole` | `official-support-pending-verification`, `supplemental-navigation-only` | Separates official candidate support from non-claim-bearing navigation. |
| `verification.status` | `not-checked` | No source is online verified yet. |
| `auditDisposition` | `keep`, `move` | Preserves Gate 1 audit recommendation. |

## Validator Hardening

The validator now fails on:

- Missing registry schema metadata.
- Schema enum values that are empty, duplicated, uppercase, or unused.
- Record fields not documented in `schema.fields`.
- Missing documented fields.
- Non-kebab-case IDs or IDs not starting with `apoc-`.
- Duplicate semantic source keys, not just duplicate IDs.
- Invalid or contradictory `sourceType`/`group`/`official`/`status`/`evidenceRole`/`auditDisposition` combinations.
- Official sources on domains outside `schema.approvedOfficialDomains`.
- Supplemental records that do not explicitly state they do not carry official claims.
- Missing or empty `topics` and `linkedFrom`.
- `linkedFrom` values outside `apocrypha/index.html#...`.
- Invalid `verification` object shape.
- `not-checked` verification records with non-null check artifacts.
- Invalid `replacementFor` / `replacedBy` shapes.

It continues to fail on tracking parameters, duplicate canonical URLs, banned social domains, Reddit outside supplemental records, YouTube outside supplemental records, vague `usedFor` language, invalid dates, and manual count fields.

## Contradictions Found and Resolved

| Issue | Resolution |
|---|---|
| Official records had `status: "not-checked"`, which described verification rather than lifecycle. | Official records now use `status: "active"` and `verification.status: "not-checked"`. |
| Supplemental records had `status: "supplemental"`, which duplicated `sourceType` and `group`. | Supplemental records now use `status: "candidate-move"` and `evidenceRole: "supplemental-navigation-only"`. |
| Validator allowed future enum values not present in records. | Active enum contract now includes only values present in the current registry. |
| Supplemental non-claim-bearing policy was prose-only. | Validator now requires supplemental records to use the supplemental classification set and state that they do not carry official claims. |
| Link verification state lacked GET-ready fields. | `verification` now has `method`, `httpStatus`, `finalUrl`, and `redirectChain` fields. |

## Future Gate Compatibility

The schema can drive later gates without another broad redesign:

- Gate 3 shelf organization: `group`, `subgroup`, `status`, and `auditDisposition`.
- Gate 5 rendering: `id`, `title`, `url`, `sourceType`, `group`, `publisher`, `usedFor`, `notFor`, `evidenceRole`, and `verification`.
- Filtering and future search: `topics`, `colors`, `identities`, `planes`, `publisher`, and `sourceType`.
- Source badges: `sourceType`, `official`, `evidenceRole`, and `verification.status`.
- Evidence explanations: `usedFor`, `notFor`, `evidenceRole`, `notes`, and `verification`.

Known future additions should be incremental: add the missing official records, extend enum values only when those records exist, and keep validation strict.

## Gap Classification

| Minimum source area | Classification | Gate 2A disposition |
|---|---|---|
| Official color-pie index | Pending Gate 3 | Not rendered. Retained audit names `The Color Pie Philosophy`, but Gate 2A did not add or verify sources. |
| Original and revisited color essays | Pending Gate 3 | Rendered records are preserved; URL/title disagreements with retained audit need canonical reconciliation. |
| My Words series | Intentionally accounted | Five rendered records are present. |
| Mechanical Color Pie 2021 | Intentionally accounted | Rendered record is present. |
| Mechanical Color Pie 2021 Changes | Intentionally accounted | Rendered record is present. |
| Council of Colors, Revisited | Intentionally accounted | Rendered record is present. |
| Ten two-color essays | Pending Gate 3 | Ten rendered records are present, but retained audit lists a different canonical set. |
| Five shard essays | Pending Gate 3 | Five rendered records are present, but retained audit lists a different canonical set. |
| Five wedge essays | Actual omission from current rendered set | Current registry preserves only two rendered wedge/Tarkir records; full five-source set needs source discovery/reconciliation later. |
| Ravnica Design Handoff Document | Pending Gate 3 | Not rendered and not verified; do not add until exact official URL is confirmed. |
| Ravnica plane page | Pending Gate 3 | Not rendered and not verified; do not add until exact official URL is confirmed. |
| Alara plane page | Pending Gate 3 | Not rendered and not verified; do not add until exact official URL is confirmed. |
| Two Ravnica flavor guides | Actual omission from current rendered set | One rendered guide exists; the second remains unidentified/unverified. |
| Magic Story archive | Pending Gate 3 | Current story/archive records are supplemental only; official archive URL must be confirmed later. |
| Rules page | Future enhancement / pending Gate 3 | Not rendered and not verified; official rules source should be added only with a confirmed URL and enum extension. |
| Gatherer | Future enhancement / pending Gate 3 | Not rendered and not verified; card-record source should be added only with a confirmed URL and enum extension. |

No vague TODOs remain as Gate 2A deliverables. Every missing minimum category is either accounted, pending canonical reconciliation, an actual current-rendered-set omission, or a future source-family addition.

## Validation Results

Command:

```bash
node scripts/validate-apocrypha-sources.mjs
```

Result:

```text
Apocrypha source registry validation PASS: 49 records, 40 official, 9 supplemental, 49 not checked, 9 move/remove candidates.
```

## Confirmations

- No Apocrypha HTML, CSS, or JavaScript files were edited.
- No visible rendering changed.
- No visible copy changed.
- No rendered sources were added, removed, or URL-edited.
- No Gate 3 information architecture work began.
- No Strategium files were changed.
- No Archscry files or placement logic were changed.
- No CRIT-001 or CRIT semantic data files were changed.
- No generated files were changed.
- No package files were changed.
- The original main worktree at `C:\dev\voxmana.io` was not edited.

## Next Recommended Task

Gate 3 should use schema v2 as the authoritative registry contract, reconcile missing official source categories and canonical URL disagreements, then design the registry-driven shelf/group model before any rendering changes.

# VM-551 Approval Packet 1 — Card Content

Status: **OWNER REVIEW REQUIRED** — research complete; no new public promotion authorized.

## Scope and authority

This packet resolves the 125-row historical card-rationale candidate inventory to terminal research dispositions and presents separately traceable review proposals for the content still needed by the all-37 closeout.

The authority chain remains:

`certified identity truth → canonical card data → curated relationship adjudication → owner-approved public copy`

- Certified claims establish the identity meaning.
- Committed canonical Scryfall fields establish card identity and behavior.
- Exact committed flavor excerpts establish the proposed card voice.
- Neither color identity, product membership, tag overlap, nor a mechanic alone establishes the public relationship.
- Every new bridge remains `REVIEW_REQUIRED`; it is absent from runtime until an owner decision is applied.

## Inventory result

| Surface | Existing approved | Terminal rejected historical rows | New review rows | Identity coverage in review packet |
|---|---:|---:|---:|---:|
| Card rationale | 26 relationships / 24 displayed records | 99 of 125 historical candidates | 25 | 25 current Gap identities |
| Card voice | 0 newly promoted | 81 rejected after relationship review | 37 source-complete proposals | 37 identities, one owner-decision row each |

Historical unresolved state is now zero: no historical row remains `EVIDENCE_NEEDED` or `REVIEW_REQUIRED`. Rejection is of the historical row in its current evidence form; a rejected row can be replaced only by a separately provenance-complete proposal.

## Rationale proposals

The 25 review rows cover:

`ABZAN`, `B`, `COLORLESS`, `DUNE`, `ESPER`, `G`, `GLINT`, `GRIXIS`, `INK`, `JESKAI`, `JUND`, `MARDU`, `NAYA`, `PRISMARI`, `QUANDRIX`, `R`, `SILVERQUILL`, `SULTAI`, `TEMUR`, `U`, `W`, `WITCH`, `WITHERBLOOM`, `WUBRG`, and `YORE`.

Each row records:

- exact canonical card name and Oracle ID;
- exact proposed copy and SHA-256;
- the verified Oracle observation;
- certified claim IDs plus the certified statements they resolve to;
- separate identity-ownership, card-behavior, and proposed-bridge evidence roles;
- relationship lead, limitation, and replacement locator;
- blank owner decision.

The proposed wording is deliberately bounded. Four-color and WUBRG rows retain their support-only/non-proof limitations. Yore remains a content proposal only and does not alter its behavioral naming boundary.

## Card-voice proposals

All 111 original exact-excerpt candidates were relationship-adjudicated. Seven source-complete replacement candidates were added where the original heuristic set could not cleanly reach certified identity meaning. The complete 118-row audit now records relationship class, exact certified claim IDs, the semantic bridge, false-positive analysis, adjacent-identity risk, and an agent recommendation.

Only 37 source-complete proposals—one genuinely useful candidate per identity—remain in the owner decision workload. The other 81 rows are terminally `REJECTED` and remain visible in [the voice adjudication audit](../../audits/vm551-all-37-dossier-closeout/approval-packet-1-voice-adjudication.tsv). No `GENERIC_THEMATIC_ANALOGY` row reaches owner review. Exact excerpts remain unchanged; this hardening supplies the missing relationship authority without promoting public content.

The restored public surface remains semantically separate:

- **Cards That Sound Like This**: approved flavor, lore, or card voice.
- **Why These Cards Echo This Reading**: an approved explanation of why the card is a useful identity example.

Page-level reuse remains disallowed unless a future approved `critical_repeat` record explains two distinct teaching roles.

## Owner decision procedure

Use the exact rows in [approval-packet-1-card-content.tsv](../../audits/vm551-all-37-dossier-closeout/approval-packet-1-card-content.tsv).

For a review-oriented presentation, use [Packet 1 — Card Content Owner Review](../../audits/vm551-all-37-dossier-closeout/approval-packet-1-owner-review.md). It contains the complete summary plus one section per identity with retained approvals, any new rationale proposal, selection basis, certified and canonical evidence, limitations, terminal alternate candidates, and the single source-complete voice proposal selected for owner decision. Each voice row shows the card, exact excerpt, relationship class, certified claims, identity bridge, false-positive/neighbor limitation, exact source, and `APPROVE / REVISE / REJECT` field.

For every row, set one decision:

- `APPROVE` — exact copy/relationship may be promoted.
- `REVISE` — provide exact replacement copy or replacement card/excerpt.
- `REJECT` — relationship must remain absent publicly.

Approval applies to the exact row and copy hash. A materially different copy requires a new review row. Packet approval must leave no proposal undecided before promotion begins.

## Runtime boundary

Current runtime remains unchanged at 24 displayed card-rationale records from 26 already approved relationships. All 25 rationale proposals and all 37 source-complete voice proposals remain review-only and absent from public runtime. No card-voice runtime authority has been promoted by this hardening commit.

## Validation

- Historical candidates: 125.
- Historical terminal dispositions: 125.
- Historical unresolved: 0.
- New rationale review rows: 25.
- Original exact voice candidates adjudicated: 111.
- Source-complete replacement candidates researched: 7.
- Voice review rows: 37.
- Terminal rejected voice rows: 81.
- Voice review coverage: 37/37 identities, exactly one source-complete owner-decision row per identity.
- Generic thematic analogies in owner workload: 0.
- Duplicate proposal IDs: 0.
- Unresolved certified claim IDs in rationale proposals: 0.
- Unresolved canonical card IDs: 0.
- Review rows in runtime: 0.
- Generated packet freshness: PASS.

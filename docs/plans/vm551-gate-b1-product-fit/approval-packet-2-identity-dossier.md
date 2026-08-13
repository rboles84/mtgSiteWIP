# VM-551 Approval Packet 2 — Identity Dossier

Status: **AUTOMATIC ADJUDICATION COMPLETE** — zero owner exceptions.

The prior owner-review procedure below is retained as historical context. Current authority is exception-only: all 37 identity records and 123 bidirectional comparison records passed `vm551-evidence-validator-v1` as bounded restatements of existing certified identity claims and the approved relationship guide. No new identity meaning, placement semantic, or generic fallback was introduced.

- Test the Fit: 111 approved semantic roles.
- How This Plays: 222 approved identity-specific fields.
- What to Look For: 111 approved actionable entries.
- Comparisons: 123 approved bidirectional pair records.
- Internal/audit vocabulary flags: 0.
- `EVIDENCE_NEEDED`: 0; `REVIEW_REQUIRED`: 0; owner exceptions: 0.

## Scope

This packet covers all new or substantively changed public meaning for:

- Test the Fit;
- How This Plays;
- What to Look For;
- nearby, close, and co-leader identity comparisons.

The exact review table is [approval-packet-2-identity-dossier.tsv](../../audits/vm551-all-37-dossier-closeout/approval-packet-2-identity-dossier.tsv). The canonical proposal envelope is `data/dossier/identity-dossier-review-proposals.source.json`.

## Authority chain

`certified identity truth → approved 37-identity relationship guide → bounded Commander translation → owner-approved public copy`

Certified claim records and the approved relationship guide establish identity meaning. Existing runtime presentation and generated archetype copy are treated only as authored leads pending owner review. B1 confusion-pair metadata supplies overlap/routing context; it cannot authorize identity meaning or public comparison copy by itself.

## Coverage

| Contract | Rows |
|---|---:|
| Identities | 37 |
| Test the Fit semantic roles | 111 (3 per identity) |
| How This Plays fields | 222 (6 per identity) |
| What to Look For items | 111 (3 per identity) |
| Pair-specific bidirectional comparisons | 123 |
| Runtime promotions | 0 |

Each Test the Fit proposal has three distinct roles:

1. positive/self-check;
2. tension/failure mode;
3. certified boundary self-check.

The third role does not fabricate an adjacent placement. It remains useful when no actual qualified alternative exists.

## Confirmed current defects

Research confirmed that the runtime presentation map has no identity-specific How This Plays record for `U`, `B`, `R`, or `G`. Those four currently fall through to the identity-agnostic “The pilot” presentation. Packet 2 supplies specific, claim-grounded review proposals for all four; they are not active until approved.

Nineteen current identity records contain at least one known internal/audit term such as `texture`, `source-backed`, or `guardrail`. These rows are explicitly flagged for owner revision or rejection. They are not treated as approval-ready merely because the existing runtime already contains them.

The current runtime comparison function has a generic fallback for pairs without a hard-coded case. Packet 2 supplies one pair-specific bidirectional review record for every approved confusion pair. The proposal states the distinct identity centers; a future tied/co-leader introduction must separately compose only the shared observations that actually occurred in the player's answer ledger.

## Review rules

For each of the 160 records, the owner sets:

- `APPROVE` — exact structured copy may be promoted;
- `REVISE` — exact replacement fields are required;
- `REJECT` — the public record remains absent and final completion still requires another defensible proposal.

Approval is bound to the exact copy hash. No row enters runtime while `REVIEW_REQUIRED`.

Review should pay particular attention to:

- fixed claims about how opponents react;
- any personality inference;
- mechanics presented as identity proof;
- the 19 internal-vocabulary flags;
- four-color support-only boundaries;
- pair comparisons that are specific but still too broad for useful public contrast;
- actionability of each What to Look For item.

## Runtime boundary

This research commit does not edit `FACTION_PRESENTATION`, `buildContrastCopy()`, dossier renderers, placement, or generated public content. The generic mono fallback and generic comparison fallback remain visible defects until exact owner-approved authority is promoted in later scoped commits.

## Validation

- 37/37 identity records: PASS.
- Exactly three Test the Fit roles per identity: PASS.
- Exactly six How This Plays fields per identity: PASS.
- At least three What to Look For items per identity: PASS.
- 123/123 pair records, both directions: PASS.
- Certified claim resolution: PASS.
- Duplicate IDs/pairs: 0.
- Known generic mono fallbacks identified: `U`, `B`, `R`, `G`.
- Packet replacements for those fallbacks: 4.
- Packet rows in runtime: 0.

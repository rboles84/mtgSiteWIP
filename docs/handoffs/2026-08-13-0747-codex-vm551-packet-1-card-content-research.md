# VM-551 Packet 1 Card-Content Research Handoff

- **Agent:** Codex
- **Task requested:** Research and prepare Approval Packet 1 for all-37 card rationales and card voices without promoting unapproved public meaning.
- **Related Kanban:** `docs/kanban/in-progress/VM-551-all-37-dossier-closeout-program.md`
- **Branch/worktree:** `codex/vm551` / `C:\dev\voxmana.io-vm551`

## Files reviewed

- Existing card-rationale authority, catalog, schemas, audits, and approved owner decisions.
- All 125 historical rationale candidates.
- Certified claim ledgers for all 37 identities.
- Committed commander and flavor indexes.
- Existing three-per-identity flavor snippet inventory.
- Active all-37 program plan, Kanban, and matrix.

## Files changed

- `research/build-vm551-card-content-approval-packet.mjs`
- `scripts/vm551-card-content-packet-tests.mjs`
- `data/dossier/vm551-card-rationale-candidate-adjudication.source.schema.json`
- `data/dossier/vm551-card-content-review-proposals.source.schema.json`
- `data/dossier/card-rationale-candidate-adjudication.source.json`
- `data/dossier/card-content-review-proposals.source.json`
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-1-card-content.tsv`
- `docs/plans/vm551-gate-b1-product-fit/approval-packet-1-card-content.md`
- `docs/plans/vm551-gate-b1-product-fit/all-37-dossier-closeout-program.md`
- `docs/kanban/in-progress/VM-551-all-37-dossier-closeout-program.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `package.json`
- this handoff.

## What changed

- Terminally adjudicated the 125 historical candidates: 26 existing approved, 99 rejected in their historical form, zero unresolved.
- Prepared 25 source-hardened rationale proposals for the current Gap identities.
- Prepared 111 exact card-voice proposals, three per all 37 identities.
- Resolved every proposed rationale against certified claim statements and canonical Oracle excerpts.
- Added freshness, uniqueness, provenance, coverage, exact-excerpt, and runtime-isolation checks.
- Kept every new proposal `REVIEW_REQUIRED`; no public catalog promotion occurred.

## Why it changed

Final closeout requires 37/37 useful rationale and voice coverage, but content-integrity rules forbid fallback prose or heuristic promotion. This packet creates an auditable owner gate without weakening the evidence bar.

## Decisions made

- Historical rejection does not prevent a separately sourced replacement proposal.
- Existing commander/profile copy is not automatically public authority.
- Product membership and color match are insufficient.
- Card voice uses exact committed text; the identity relationship still requires approval.
- Four-color, WUBRG, Colorless, and Yore limitations remain explicit.
- Packet 1 promotion is blocked pending complete owner decisions.

## Risks / uncertainties

- Owner may reject or revise any of the 136 proposals.
- A rejected identity's last useful rationale or voice candidate requires further research before 37/37 promotion.
- The two already-known local commander-record gaps, Hearthhull and Inspirit, remain separate final-matrix risks.
- Runtime card-voice rendering and page-level selection remain unimplemented until approved authority exists.

## Tests run

- `node --check research/build-vm551-card-content-approval-packet.mjs`
- `node --check scripts/vm551-card-content-packet-tests.mjs`
- `npm run test:vm551-card-content-packet`

All passed.

## Not touched

Placement questions, answers, constructs, evidence mappings, scoring, ranking, routing, stopping, refinement, naming qualification, Yore observability, result states, persistence, Matrix calculations, and live card-content runtime.

## Follow-up recommendations

1. Owner reviews all Packet 1 rows and supplies APPROVE/REVISE/REJECT decisions.
2. Continue independent Packet 2 and Packet 3 research without promoting Packet 1.
3. Apply Packet 1 decisions in its own scoped commit only after the packet is complete.

## Next suggested agent

Codex on the same canonical branch/worktree for Packet 2 research; owner retains Packet 1 promotion authority.

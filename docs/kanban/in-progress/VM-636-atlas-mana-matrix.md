# VM-636 — Restore the Mana Alignment Matrix in Atlas dossiers

ID: VM-636
Status: Owner Review
Branch: codex/vm-636-atlas-mana-matrix
Admission baseline: 29115b84dc6f628916c7a2f7cf07bac8dc4c5241
Candidate: 58ddae537f5f93fa5b1a5b8ade2cb6aac659ad6e
RobQA: PASS at 58ddae537f5f93fa5b1a5b8ade2cb6aac659ad6e; QA-2, Codex same-agent distinct post-commit phase. Source/profile/initializer, lint and three browser variants passed; supplementary saved-reading browser witness unavailable, with isolation verified deterministically.
Owner: PENDING
Integration: PENDING; stop at Owner Review.
Evidence: [Indexed implementation and QA handoff](../../handoffs/2026-09-06-1215-codex-vm636-atlas-mana-matrix.md).

## Request and grounding

Owner noticed the missing Mana Alignment Matrix on the public Blue exploration dossier and wants it on every explored identity. VM-625 deliberately hides personal Placement; its matrix was excluded along with that panel. VM-635 backgrounds and VM-634 hidden philosophy strip are integrated and protected. VM-625 is completed; its retained old local pointer is not active enhancement work. Use one new scoped branch in the existing clean checkout, leaving unrelated branches alone.

## Implementation contract

Reuse the existing matrix renderer/profile resolver in the exploration dossier's default Start Here panel. Resolve the browsed faction's existing identity-layer preview scores and components without a reading. Keep existing axis detail interactions and multicolor trace/synthesis controls. Use identity-profile wording and a non-placement accessible chart label in exploration only. Initialize on first load and when the containing panel becomes visible, without drawing from a saved result.

Preserve personal Placement matrix/controls/labels, local dev-review behavior, dossier tabs and URL/history/Maze-return contracts, saved-reading bytes and schema, scoring/placement logic, all registry/data/prose, official/other artwork, Scryfall behavior, and black backgrounds. No new identity data, assessment claims, chart implementation, matrix design, or storage keys.

Use the existing module-cache revision convention to refresh the connected graph and its validation expectations. Outside the matrix integration, module changes must be revision-only.

## Acceptance / QA selection

- Every active explored identity includes one existing matrix in Start Here, with correct registry-based profile and no personal Placement panel or claims.
- Fresh exploration works without a result; a saved result does not influence the explored identity's matrix or change while browsing.
- Mono, multicolor, and Colorless profiles keep correct existing controls, accessible labels, values, fallback behavior, and axis interactions.
- Panel switching and View All initialize/reveal the matrix correctly; normal result matrix and local direct-review presentation remain unchanged.
- QA-2 component presentation/initialization: same-agent distinct post-commit review. Focused profile/render/initialization assertions, HTML/JS lint and source preservation; bounded browser Blue, a multicolor identity, Colorless, and existing-reading witness. No broad Atlas navigation, screenshot, viewport, or engine suite.
- Owner judges matrix placement and appearance on the linked Blue exploration page.

## Boundaries

Stop if canonical identity meaning/preview scores, scoring, stored reading contract, unrelated dirty work, or a new chart engine becomes necessary. Use RobDev and RobQA frozen gates and indexed exact-candidate handoff. No integration before Owner accepts this candidate.

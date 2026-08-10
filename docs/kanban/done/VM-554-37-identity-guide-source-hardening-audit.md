# VM-554 - 37-Identity Guide Source-Hardening Audit

ID: VM-554

Status: Done

Owner request: Audit the existing 37-Identity Player Relationship Guide against controlling Vox Mana identity sources and official Rosewater/Wizards evidence. Preserve supported wording, distinguish guide synthesis from upstream semantic defects, and do not rebuild the guide from scratch.

## Frozen Audit Target

- File: `docs/reference/37-identity-player-relationship-guide.md`
- SHA-256: `C946B08366F45F8C356EDFBED96AEBBBD8A0DF1DF3AD133E9D196D5A5A31E189`
- Repository HEAD at intake: `f44382271f94e9832526bbc10313f0f8c38533b9`
- Branch: `main`

## Classification Contract

Every identity-level substantive statement receives exactly one classification:

- `UPSTREAM-DIRECT` - explicitly present in a controlling Vox Mana source.
- `OFFICIAL-DIRECT` - explicitly supported by official Rosewater/Wizards material.
- `SUPPORTED-SYNTHESIS` - conservative combination of supported evidence.
- `PROJECT-SYNTHESIS` - useful Vox Mana interpretation not directly established by Wizards.
- `REMEDIATE-GUIDE` - relationship-guide wording overreaches or obscures a required boundary while upstream remains sound.
- `REMEDIATE-UPSTREAM` - the questionable concept exists in controlling Vox Mana semantic architecture.

The audit matrix covers each identity's center/title, `Resonates`, `Connects`, `Pushes back`, and `Rejects` statement. Introductory cross-identity framework claims receive a separate framework review.

## Source Hierarchy

1. Controlling Vox Mana sources: `docs/architecture/colors/*/identity.md`, `metaphysics.md`, certified raw identity records, and generated `data/factions.json` as a read-only consumer/display cross-check.
2. Official corroboration: official Wizards/Rosewater pages only.
3. Excluded as audit authority: the supplied Player Atlas, supplied PDF captures, community summaries, search-result snippets, deck statistics, and generated mechanics alone.

## Drift-Control Boundary

- This is a read-only semantic audit of a documentation application layer, not a CRIT-001 identity candidate, review, or certification gate.
- No identity is activated for semantic remediation.
- No `REMEDIATE-UPSTREAM` finding authorizes an upstream edit; it stops at a documented finding and requires a separately governed identity task.
- Frozen placement, confidence, calibration, native IDs, lateral/collision targets, golden paths, scoring, generated artifacts, public/recruiter copy, and CRIT records remain untouched.
- Existing dirty baseline is preserved and enumerated in the handoff.
- The final result may issue a source-hardening audit verdict for the frozen file hash. It must not claim CRIT-001 semantic certification or exact-SHA approval.

## Deliverables

- `docs/audits/vm554-37-identity-guide-source-hardening/README.md`
- `docs/audits/vm554-37-identity-guide-source-hardening/claim-matrix.tsv`
- `docs/audits/vm554-37-identity-guide-source-hardening/official-source-register.md`
- Closed Kanban card and indexed handoff.

## Stop Conditions

- Any audit-target hash drift.
- Any attempted upstream semantic, generated, runtime, scoring, or CRIT governance edit.
- Any claim classified from a non-authoritative source.
- Any unresolved `UNKNOWN` source disposition.
- Any unrelated dirty-file contamination.

## Acceptance Checks

- Frozen target hash is unchanged at audit close.
- Exactly 185 identity-level statement rows: 37 identities by five statement types.
- Each row has one allowed classification, controlling locator(s), rationale, and disposition.
- High-risk families receive explicit official corroboration review: mono color goals/conflicts, ten shard/wedge lead-color frames, five missing-color four-color frames, Colorless, WUBRG, and all `Connects` claims.
- Every `REMEDIATE-GUIDE` and `REMEDIATE-UPSTREAM` result is enumerated with exact wording and responsible layer.
- No source, generated, runtime, placement, or unrelated file changed.

## Completion

- Audited all 185 identity-level statements without changing the frozen guide or any controlling identity source.
- Classified 148 statements as `UPSTREAM-DIRECT`, 25 as `SUPPORTED-SYNTHESIS`, one as `PROJECT-SYNTHESIS`, and 11 as `REMEDIATE-GUIDE`.
- Found zero `REMEDIATE-UPSTREAM` statements.
- Isolated all required correction to the ten shard/wedge `Connects` statements and the WUBRG `Connects` statement.
- Recorded exact recommended guide-only replacements and a bounded follow-up certification path.

## Tests Run

- Regenerated `claim-matrix.tsv` from the frozen guide: 185 rows across 37 identities.
- Verified 185 unique claim IDs, exactly five claims per identity, allowed classifications only, and the expected classification totals.
- Verified all 76 unique controlling source files resolve and all nine used official-source IDs exist in the source register.
- Recomputed the frozen guide SHA-256 and confirmed it remains `C946B08366F45F8C356EDFBED96AEBBBD8A0DF1DF3AD133E9D196D5A5A31E189`.
- Ran `git diff --check` successfully.

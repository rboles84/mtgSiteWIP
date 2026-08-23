# VM-587 Yore Behavioral-Evidence Decision

## Decision

`NOT_SUPPORTED`

The corrected evidence materially changes the legal population: Yore is not a Breya-only Commander space. The current corpus resolves to 12 legal exact-WUBR command zones—Breya plus 11 paired zones. It does **not** establish two independent, behaviorally observable constructs that responsibly name Yore's semantic center. Placement qualification, naming rules, current witness, and dossier implementation therefore stop unchanged.

This is an evidence-bound stop, not a claim that Yore can never be behaviorally expressed.

## Reproducible legal inventory

The inventory is generated from `data/scryfall/raw/oracle-cards.json`, whose manifest records a 2026-08-20 bulk snapshot. Run:

```powershell
node docs/audits/vm587-yore-behavioral-placement-remediation/build-command-zone-evidence.mjs data/scryfall/raw/oracle-cards.json docs/audits/vm587-yore-behavioral-placement-remediation/command-zone-evidence.json
```

The generator enforces exact combined color identity and the actual pairing mechanism. Generic Partner, same-name Partner variants, named Partner, and Doctor's companion are not treated as interchangeable. The independent enriched workbook's older snapshot also reports 11 WUBR legal pairs, corroborating the pair count. The requested 15–25 zone target cannot be met without adding illegal or non-exact configurations.

## Four-axis construct verdict

| Candidate construct | Independence | Observability | Semantic necessity | Anti-proxy robustness | Verdict |
| --- | --- | --- | --- | --- | --- |
| Modular resource conversion | Independent of recovery in principle | Direct in Breya and Bjorna/Wernog; indirect through Clues in two Cecily pairs | Compatible with constructed agency but not necessary to it | Fails: sacrifice, Clues, artifacts, and modal conversion occur outside Yore and commonly express Black, artifact, or ordinary value play | Rejected as naming evidence; retain only as a bounded hypothesis |
| Engineered replacement / repeatable function | C06 and C09 are distinct dependency groups | Not observed by the command-zone texts; it is a deck-construction or player-choice claim | Closer to the semantic center but still does not expose the contested natural-limit relationship | Fails: the generic Commander negative control explicitly recommends functional equivalence, redundancy, recursion, and resilience under singleton constraints | Rejected as naming evidence |
| Recovery / reconstruction after loss | Independent of immediate conversion in principle | Artifact recovery appears in two Silas pairs; creature recovery in two Ravos pairs; one Yore-Tiller player calls the deck reanimator | Continuity may support the frame but does not establish constructed agency against natural surrender | Fails: recursion is generic and appears in non-Yore controls; current adjudication already warns that recursion cannot establish an identity | Rejected as naming evidence |

The constructs are mechanically distinguishable, but none passes all four axes. “Two different mechanics” is not equivalent to “two responsible behavioral observations.”

## Legal exact-WUBR findings

- Artifact-forward or artifact-token command zones: Breya; Akiri/Silas; Bjorna/Wernog; Cecily/Hargilde; Cecily/Sophina; Cecily/Wernog.
- Explicit recovery command zones: Akiri/Silas; Bruse/Silas; Kraum/Ravos; Ludevic/Ravos.
- Exact-WUBR zones with neither artifact nor recovery text: Ishai/Vial Smasher; Kraum/Tymna; Ludevic/Tymna.
- No command-zone text asks whether a player deliberately designs functions to be replaceable, reconstructs a system because built agency is preferred to inherited conditions, or contests a natural limit through construction.

The full rows and bounded dispositions are in `legal-exact-wubr-command-zones.tsv`; exact Oracle text and the other four-color controls are in generated `command-zone-evidence.json`.

## Direct-player evidence

The available direct-player evidence is sparse and mechanic-centered:

- one player calls rule-zero Yore-Tiller “a really fun reanimator”;
- one Breya builder describes artifact focus, possible artifact reanimation, utility lands, and discard setup;
- one Breya player describes an established Ashnod's Altar/Nim Deathmantle combo and multiple win options.

These observations support real deckbuilding/play vocabulary. They do not repeat one stable preference across independent players, do not distinguish Yore from artifact/combo/reanimator identities, and do not supply the missing relationship to constructed systems.

## False-positive controls

The current corpus supplies five representative command zones for each other exact four-color identity. The controls defeat the proposed proxies:

- Akiri's artifact-count text occurs in exact WBRG and WURG Partner zones as well as WUBR.
- Friends-forever Clue creation and artifact sacrifice occur in exact UBRG, WBRG, WURG, and WUBR zones.
- Ravos recursion occurs in exact WUBG and WUBR zones.
- Card draw, combat conversion, resource reuse, and recursion span all four-color samples.
- Generic Commander guidance independently recommends functional redundancy, role overlap, recursion, modular utility, and commander-independent resilience because the format is singleton.

Therefore a rule that names Yore from any two among artifacts, sacrifice, recursion, redundancy, repeatability, or optimization would produce foreseeable false positives across both four-color and ordinary Commander controls.

## Questionnaire fit

The current instrument already contains the nearest legitimate measurements:

- `b1.hall.engine-shape.v1.replace` observes C06 replaceable functional redundancy, supports Yore only directionally, and explicitly excludes Yore from qualification.
- `b1.crucible.yore-glint.v1.engineered` observes C09 engineered repeatability and is explicitly non-naming because Yore is not cleanly observable.
- `b1.crucible.witch-yore.v1.convert` observes C06 conversion and is explicitly non-naming for the same reason.

VM-555 already found C06 and C09 independent but semantically insufficient. The new legal inventory broadens examples without adding the missing observation. Adding a question would force a proxy rather than measure a newly evidenced behavior, so no question, mapping, qualification, naming rule, or witness is changed.

## Dossier disposition

No dossier source or generated dossier artifact changes. The legal-inventory correction is research evidence, not a public identity claim. Breya remains support-only; Partner configurations do not become Yore exemplars merely because their combined color identity is WUBR. The current dossier's metaphysical center and its warnings against generic artifacts, graveyard play, sacrifice, optimization, and WUBR goodstuff remain controlling.

## Bounded product result

Yore remains behaviorally bounded in the current placement flow. This is the correct current-engine result because responsible naming would require an observable player relationship that the evidence does not yet contain. A future non-scoring Phase 2 lens or self-report may be the appropriate place to ask directly about constructed agency, but this pass does not design or implement that deferred work.

## Protected behavior

- No placement source, generated model, identity score, routing rule, current witness, dossier source, generated dossier, runtime, or UI file changed.
- The other 36 identities therefore require no replay: their producer inputs and generated artifacts are byte-unchanged.
- Owner-provided untracked corpus material remains untouched.

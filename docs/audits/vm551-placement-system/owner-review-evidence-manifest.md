# VM-551 Owner-Review Evidence Manifest

Exact accepted audit-content candidate reconciled: `bff929d603727cbf1fa043e9881b10cbbc346c3c`.

Exact workflow-record starting HEAD: `797fb14d08209c310dbc0087a3940e0a74edf21d`.

The new reconciliation commit SHA is necessarily assigned after this file is written; the dated reconciliation handoff and final response record that exact SHA. Hashes below cover the exact files in the reconciliation worktree and are validated before commit.

This manifest identifies the bounded owner-review evidence package. It does not duplicate, replace, or upgrade the authority of the listed artifacts.

| Relative path | Bytes | SHA-256 | Rows / records | Controlling purpose | Known limitation | Reconciliation state |
|---|---:|---|---|---|---|---|
| docs/audits/vm551-placement-system/audit-input-manifest.json | 3718 | `061d91f8b36218fd479eee968c784cb918bda63ca35367f58d274263d1f298ad` | 1 manifest; 5 runtime inputs; 6 preserved artifacts | Immutable input authority, hashes, and preserved-artifact pins | Pins inputs; does not validate semantic correctness. | MODIFIED |
| docs/audits/vm551-placement-system/cecos-conclusion-adjudication.csv | 3444 | `ee2ce2323f6bde047a96cbb133838da8b34e4bfecefd9d8dd5cf2d90f7a8eaf4` | 15 data rows | Major-conclusion classification under exact CECOS draft.4 | Classification is audit adjudication, not implementation approval. | MODIFIED |
| docs/audits/vm551-placement-system/question-quality-adjudication.csv | 129343 | `1031ea2705488682d8c8531984484100394ad5ee9ab8972d3c434ded0eabe2da` | 113 data rows | Complete 113-question quality dispositions | Deterministic documentation review; no player-response validation. | UNCHANGED |
| docs/audits/vm551-placement-system/answer-quality-adjudication.csv | 203630 | `3c5f4d0bb3af1feb0c3c59dadf66a6a2595951ac411e266a9562db4c08bb7eb4` | 356 data rows | Complete 356-answer quality dispositions | Most answer IDs/provenance are absent in production source. | UNCHANGED |
| docs/audits/vm551-placement-system/question-disposition-summary.json | 1813 | `cfaa486873e39d50d4c8f47f682c47acc20e2d1ff604f68805e94c95d4dc54f3` | 113 questions; 356 answers | Reconciled question/answer totals and risk counts | Summarizes the detailed adjudication; does not replace it. | UNCHANGED |
| docs/audits/vm551-placement-system/identity-distinctiveness-matrix.csv | 117188 | `8d1f3414caf54ba804d5b7a65bfd3fd57402b7cb673600cfd48bed232d3ebcbf` | 37 data rows | All-37 distinctiveness, opportunity, boundary, and evidence status | Mechanical/lexical audit only; no empirical confusion rates. | UNCHANGED |
| docs/audits/vm551-placement-system/profile-scenario-matrix.csv | 109132 | `36d3686fcd1359f02453d24a2c226128e9404b64ac6d418f4a9fca927900dcad` | 37 data rows | All-37 profile scoring outputs, origins, and completeness | All probes are golden-path-derived and incomplete. | MODIFIED |
| docs/audits/vm551-placement-system/profile-scenario-details.json | 157504 | `299728ec1dc801bc9677ef59578f64b5d42adff524469acb21bdc72b2155611c` | 37 records | Full exact-answer and rendered-output profile records | Target-seeking reachability evidence, not independent profiles. | MODIFIED |
| docs/audits/vm551-placement-system/adversarial-scenario-matrix.csv | 10709 | `8a0803c305cce9cfba4cf211e9c406d4f435a57929f52f8cd2f71a7bb6b6c00b` | 9 data rows | Nine representational stress tests with reconciled dispositions | Synthetic audit cases, not player prevalence or accuracy evidence. | MODIFIED |
| docs/audits/vm551-placement-system/sensitivity-dependency-collision-analysis.json | 21007 | `4e67b5e465fdc341dc0f62dbcc6dff52db2ec741211d4ea2d1f07fade49edb5d` | 26891 terminal paths; 44005 matched comparisons; 28 non-monotonic rows | Terminal-path sensitivity, ties, dependencies, dead coverage, and collisions | Combinatorial frequencies are not empirical player frequencies. | MODIFIED |
| docs/audits/vm551-placement-system/repeated-signal-dependency-audit.csv | 27691 | `833852645db9b54709c01f3f152be51686a0208b8e5687040894ed362ae52399` | 11 data rows | Eleven repeated-construct/dependency groups | Potential double-count; no empirical statistical correlation is claimed. | UNCHANGED |
| docs/audits/vm551-placement-system/evidence-integration-matrix.csv | 46166 | `1f6d712da3047e25d4275c904665e1be1eae61bd4705e792548594d1f1815511` | 140 data rows | Permitted roles for ten evidence families across fourteen product uses | Role classification requires owner/independent review before implementation. | UNCHANGED |
| docs/audits/vm551-placement-system/explanation-trace-audit.json | 310210 | `6dd72cc03d7ab65a47078f243cb506d47b46628ab041dbad335f5f58fdc2d946` | 12 records | Representative answer-to-output explanation traces | Representative traces are not exhaustive player-path validation. | UNCHANGED |
| docs/audits/vm551-placement-system/defect-register-remediated.csv | 29003 | `a48bb3ed70a13758278d01006aa8aa7236262c19c15528c57a65ee65b71c28ce` | 40 data rows | Authoritative 40-defect register with reproduction and traceability | Severity is audit judgment; no fix is authorized. | MODIFIED |
| docs/audits/vm551-placement-system/requirements-traceability-matrix.csv | 4636 | `6d2b6f49e2a65779858d13b85340534576daca457beac87f27443709bf33b0d3` | 16 data rows | Authoritative finding-to-risk-to-requirement-to-validation Gate map | Implementation boundary only; no implementation authorization. | MODIFIED |
| docs/audits/vm551-placement-system/remediation-analysis-summary.json | 4604 | `7a65394bfe56b43a443e9ae11df65a691d58c0079db7fa236525d5ada30bb21d` | 1 summary; 37 identities; 113 questions; 356 answers | Reconciled quantitative audit summary | Summary must be read with detailed sources and limitations. | MODIFIED |

Boundary precedence: `bounded-mvp-repair-plan.md` and `requirements-traceability-matrix.csv` govern Gate A/B1/B2. Narrative summaries must agree with them.

No production implementation, merge, push, deployment, integration, or certification is authorized by this package.

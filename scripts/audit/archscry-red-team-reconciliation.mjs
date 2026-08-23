import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../..");
const AUDIT_DIR = path.join(ROOT, "docs/audits/archscry-current-state-2026-08-22");
const RECON_DIR = path.join(AUDIT_DIR, "reconciliation");
const DOSSIER_PATH = path.join(AUDIT_DIR, "dossier/dossier-review-current-state.json");
const ENGINE_PATH = path.join(AUDIT_DIR, "engine/engine-validation-current-state.json");
const MANIFEST_PATH = path.join(AUDIT_DIR, "manifest.json");

const readJson = (target) => JSON.parse(fs.readFileSync(target, "utf8"));
const sha256 = (target) => crypto.createHash("sha256").update(fs.readFileSync(target)).digest("hex");
const rel = (target) => path.relative(ROOT, target).replaceAll("\\", "/");
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const writeCsv = (target, rows) => {
  const headers = Object.keys(rows[0] ?? {});
  const body = [headers, ...rows.map((row) => headers.map((header) => row[header]))]
    .map((row) => row.map(csvCell).join(","))
    .join("\n");
  fs.writeFileSync(target, `${body}\n`, "utf8");
};

const sources = [
  {
    id: "SRC-AUTHORITY",
    path: "docs/audits/vm551-placement-system/audit-input-authority.md",
    locator: "lines 8-41",
    authority: "accepted audit-input authority",
    currentness: "CURRENT_GOVERNANCE",
    use: "Exact CECOS draft.4 object and withdrawal of draft.2 authority."
  },
  {
    id: "SRC-DEFECTS",
    path: "docs/audits/vm551-placement-system/defect-register-remediated.csv",
    locator: "VM551-D001 through VM551-D040 and later rows",
    authority: "historical red-team finding register",
    currentness: "HISTORICAL_RECONCILIATION_INPUT",
    use: "Finding hypotheses only; every row must be retested against current evidence."
  },
  {
    id: "SRC-SENSITIVITY",
    path: "docs/audits/vm551-placement-system/sensitivity-dependency-collision-analysis.md",
    locator: "entire report",
    authority: "historical machine-analysis narrative",
    currentness: "HISTORICAL_RECONCILIATION_INPUT",
    use: "Prior sensitivity, dependency, and collision claims; not proof about the current engine."
  },
  {
    id: "SRC-ARCHITECTURE",
    path: "docs/plans/vm551-gate-b1-product-fit/final-b1-architecture-decision.md",
    locator: "lines 9-21, 35-51, 153-205",
    authority: "owner-approved current design authority",
    currentness: "CURRENT_DESIGN",
    use: "Behavior-first design, mapping-hypothesis state, Yore observability, and lens boundaries."
  },
  {
    id: "SRC-LENS",
    path: "docs/plans/vm551-gate-b1-placement-instrument/identity-lens-self-report-contract.md",
    locator: "lines 3-79",
    authority: "owner-approved non-production design contract",
    currentness: "CURRENT_DESIGN_NON_PRODUCTION",
    use: "Separate non-scoring lens ledger and bounded Yore example."
  },
  {
    id: "SRC-PLAYER-VALIDATION",
    path: "docs/plans/vm551-gate-b1-placement-instrument/player-validation-plan.md",
    locator: "lines 3-17 and protocol sections",
    authority: "approved protocol design",
    currentness: "CURRENT_PROTOCOL_NOT_EXECUTED",
    use: "Explicit boundary between structural validation and player evidence."
  },
  {
    id: "SRC-ENGINE-CONTRACT",
    path: "docs/reports/vm551-gate-b1-placement-engine/README.md",
    locator: "lines 3-30",
    authority: "current engine validation contract",
    currentness: "CURRENT_ENGINE",
    use: "Dependency caps, neutral answers, bounded states, and non-empirical scope."
  },
  {
    id: "SRC-ENGINE-SUMMARY",
    path: "docs/reports/vm551-gate-b1-placement-engine/owner-summary.md",
    locator: "lines 11-18, 77-87",
    authority: "current deterministic validation summary",
    currentness: "CURRENT_ENGINE",
    use: "36 responsible named paths, intentionally bounded Yore, synthetic evidence limitation."
  },
  {
    id: "SRC-INVARIANTS",
    path: "docs/reports/vm551-gate-b1-placement-engine/invariant-validation.json",
    locator: "root validation fields",
    authority: "current deterministic validation output",
    currentness: "CURRENT_ENGINE",
    use: "Stable IDs, provenance, mapping, lens, and public-confidence invariants."
  },
  {
    id: "SRC-FOCUSED",
    path: "docs/reports/vm551-gate-b1-placement-engine/focused-behavior.json",
    locator: "root focused behavior assertions",
    authority: "current deterministic validation output",
    currentness: "CURRENT_ENGINE",
    use: "Tie, neutral, uncertainty, qualification, dependency, lens, and confidence behavior."
  },
  {
    id: "SRC-MUTATION",
    path: "docs/reports/vm551-gate-b1-placement-engine/sensitivity-mutation.json",
    locator: "root status and mutation cases",
    authority: "current deterministic validation output",
    currentness: "CURRENT_ENGINE_REPRESENTATIVE",
    use: "Representative current-engine mutation evidence, not real-player stability."
  },
  {
    id: "SRC-SYNTHETIC",
    path: "docs/reports/vm551-gate-b1-placement-engine/synthetic-robustness.json",
    locator: "root status and identity rows",
    authority: "current synthetic diagnostic",
    currentness: "CURRENT_ENGINE_NON_EMPIRICAL",
    use: "Structural robustness only; cannot establish accuracy or population fairness."
  },
  {
    id: "SRC-DOSSIER-EVIDENCE",
    path: rel(DOSSIER_PATH),
    locator: "37 direct Dossier Review rows",
    authority: "current exact-baseline rendered evidence",
    currentness: "CURRENT_BASELINE_DB9A16A",
    use: "Direct identity dossier rendering and provenance-boundary evidence."
  },
  {
    id: "SRC-ENGINE-EVIDENCE",
    path: rel(ENGINE_PATH),
    locator: "37 current-engine witness rows and trace locators",
    authority: "current exact-baseline engine evidence",
    currentness: "CURRENT_BASELINE_DB9A16A",
    use: "Current witness compatibility, named outcomes, bounded states, and exact traces."
  }
];

const findings = [
  {
    id: "RT-001",
    origin: "VM551-D035",
    claim: "The earlier audit used the wrong CECOS draft and an unpreserved external legality claim.",
    disposition: "DISPROVEN_CURRENT",
    severity: "NOTE",
    confidence: "HIGH",
    source_ids: "SRC-AUTHORITY; SRC-DEFECTS",
    current_evidence: "The accepted authority now pins CECOS draft.4 to exact object 947bf45bf6a191839b5fb4fa6c65980ed9d5737e and explicitly withdraws draft.2. This finding is resolved as governance, while implementation-derived claims still require individual retest.",
    action: "Keep the exact-object rule; do not revive the rejected draft.2 framing.",
    owner_required: "NO"
  },
  {
    id: "RT-002",
    origin: "VM551-D002; VM551-D003; VM551-D007; VM551-D023",
    claim: "The public result presents heuristic scores as Bayesian probability, calibrated confidence, or fabricated legacy certainty.",
    disposition: "DISPROVEN_CURRENT",
    severity: "NOTE",
    confidence: "HIGH",
    source_ids: "SRC-DEFECTS; SRC-ENGINE-CONTRACT; SRC-INVARIANTS; SRC-FOCUSED; SRC-ENGINE-EVIDENCE",
    current_evidence: "The current engine uses bounded named states and public labels such as current-best-fit/close/insufficient; numeric public confidence is explicitly unauthorized. All 37 traces retain internal scores without treating them as calibrated player-facing probability.",
    action: "Protect the no-public-probability invariant.",
    owner_required: "NO"
  },
  {
    id: "RT-003",
    origin: "VM551-D005; VM551-D006",
    claim: "Lexicographic order silently chooses ties and numerical rank is mislabeled as adjacency.",
    disposition: "DISPROVEN_CURRENT",
    severity: "NOTE",
    confidence: "HIGH",
    source_ids: "SRC-DEFECTS; SRC-FOCUSED; SRC-ENGINE-CONTRACT; SRC-ENGINE-EVIDENCE",
    current_evidence: "Current focused validation requires deterministic ordering without manufacturing a clear primary, and the public contract preserves close/tied/mixed/insufficient states plus independently qualified alternatives. The Jund witness currently returns close rather than forced primary certainty.",
    action: "Retain explicit bounded states and qualification rules.",
    owner_required: "NO"
  },
  {
    id: "RT-004",
    origin: "VM551-D008",
    claim: "Every questionnaire item forces directional evidence.",
    disposition: "DISPROVEN_CURRENT",
    severity: "NOTE",
    confidence: "HIGH",
    source_ids: "SRC-DEFECTS; SRC-ENGINE-CONTRACT; SRC-FOCUSED; SRC-INVARIANTS",
    current_evidence: "Unknown, conditional, and non-directional answers are neutral in the current engine and excessive uncertainty yields insufficient rather than a forced identity.",
    action: "Keep uncertainty responses neutral and separately auditable.",
    owner_required: "NO"
  },
  {
    id: "RT-005",
    origin: "VM551-D009; VM551-D012",
    claim: "Answers lack stable IDs and malformed or untraceable contracts can validate.",
    disposition: "DISPROVEN_CURRENT",
    severity: "NOTE",
    confidence: "HIGH",
    source_ids: "SRC-DEFECTS; SRC-INVARIANTS; SRC-ENGINE-EVIDENCE",
    current_evidence: "The current invariant report has no duplicate IDs, orphan signals, missing constructs, or answers missing provenance; all current witness traces pin model and witness hashes.",
    action: "Protect schema and semantic validation in the build gate.",
    owner_required: "NO"
  },
  {
    id: "RT-006",
    origin: "VM551-D010; VM551-D020",
    claim: "Answer-to-identity and lore-to-behavior bridges are editorial hypotheses without player validation.",
    disposition: "NEEDS_PLAYER_DATA",
    severity: "HIGH",
    confidence: "HIGH",
    source_ids: "SRC-DEFECTS; SRC-ARCHITECTURE; SRC-PLAYER-VALIDATION; SRC-ENGINE-CONTRACT",
    current_evidence: "Current mappings remain explicitly MAPPING_HYPOTHESIS. Deterministic reproduction verifies implementation, not whether real players interpret the items or identity associations as intended.",
    action: "Run the separately authorized player-validation protocol before any empirical accuracy claim.",
    owner_required: "YES"
  },
  {
    id: "RT-007",
    origin: "VM551-D014",
    claim: "The Gate relies on broad metaphorical identity philosophy before observable Commander behavior.",
    disposition: "DISPROVEN_CURRENT",
    severity: "NOTE",
    confidence: "MEDIUM",
    source_ids: "SRC-DEFECTS; SRC-ARCHITECTURE; SRC-ENGINE-CONTRACT; SRC-INVARIANTS",
    current_evidence: "The current architecture is behavior-first and construct-led, with four fixed Gate questions and later adaptive questions. This establishes current structural intent; player comprehension remains covered by RT-010.",
    action: "Protect behavior-first wording while testing comprehension with players.",
    owner_required: "NO"
  },
  {
    id: "RT-008",
    origin: "VM551-D015; VM551-D040",
    claim: "Unequal authored opportunity and target reachability may conceal population bias or neighbor confusion.",
    disposition: "NEEDS_PLAYER_DATA",
    severity: "HIGH",
    confidence: "HIGH",
    source_ids: "SRC-DEFECTS; SRC-SYNTHETIC; SRC-ENGINE-SUMMARY; SRC-PLAYER-VALIDATION; SRC-ENGINE-EVIDENCE",
    current_evidence: "The current engine has 36 responsible named witness paths and one intentional bounded state, but its synthetic report is explicitly non-empirical. Targeted witness success does not establish ordinary-player outcome distribution, fairness, or neighbor distinctiveness.",
    action: "Measure confusion, representational failure, and outcome distribution with recruited players.",
    owner_required: "YES"
  },
  {
    id: "RT-009",
    origin: "VM551-D017",
    claim: "One inferred answer can be narrated as broad personality or Commander truth.",
    disposition: "DISPROVEN_CURRENT",
    severity: "NOTE",
    confidence: "MEDIUM",
    source_ids: "SRC-DEFECTS; SRC-DOSSIER-EVIDENCE; SRC-ENGINE-CONTRACT; SRC-FOCUSED",
    current_evidence: "All 37 direct Dossier Review records mark placement provenance NOT_ASSERTED and render canonical identity content without implying it was entailed by a single answer. Current engine qualification prevents one answer from creating a clear primary.",
    action: "Preserve the direct-review provenance boundary and qualification minimums.",
    owner_required: "NO"
  },
  {
    id: "RT-010",
    origin: "VM551-D038",
    claim: "Question wording may remain abstract, double-barreled, or hard for novice and experienced players to interpret consistently.",
    disposition: "NEEDS_PLAYER_DATA",
    severity: "HIGH",
    confidence: "HIGH",
    source_ids: "SRC-DEFECTS; SRC-PLAYER-VALIDATION; SRC-ARCHITECTURE",
    current_evidence: "The design was narrowed and approved structurally, but the player-validation plan explicitly remains protocol-only. Current engine tests cannot establish comprehension, recall, or response stability.",
    action: "Authorize cognitive interviews and the planned novice/experienced-player validation slices.",
    owner_required: "YES"
  },
  {
    id: "RT-011",
    origin: "VM551-D029",
    claim: "A user-visible result does not itself carry exact input, model, and evidence-contract provenance.",
    disposition: "CONFIRMED_CURRENT",
    severity: "MEDIUM",
    confidence: "HIGH",
    source_ids: "SRC-DEFECTS; SRC-DOSSIER-EVIDENCE; SRC-ENGINE-EVIDENCE",
    current_evidence: "This audit can reconstruct exact model, witness, trace, screenshot, and rendered-record hashes, but the current direct Dossier Review surface does not expose an exact evidence manifest to the user. The audit packet mitigates review reproducibility without changing the product serializer.",
    action: "Owner decision: keep provenance audit-only or authorize a future bounded result-manifest/export surface.",
    owner_required: "YES"
  },
  {
    id: "RT-012",
    origin: "VM551-D036",
    claim: "One-answer perturbations frequently flip the primary without stability disclosure.",
    disposition: "UNCLEAR_CURRENT",
    severity: "MEDIUM",
    confidence: "MEDIUM",
    source_ids: "SRC-DEFECTS; SRC-SENSITIVITY; SRC-MUTATION; SRC-ENGINE-CONTRACT; SRC-ENGINE-EVIDENCE",
    current_evidence: "The historical rate applies to the superseded engine. Current representative mutation validation passes and the public contract can return close/insufficient, but the current audit did not recreate the historical exhaustive 44,005 comparison universe under the new engine.",
    action: "Keep current mutation witnesses; only authorize a new exhaustive sweep if owner risk judgment requires it.",
    owner_required: "YES"
  },
  {
    id: "RT-013",
    origin: "VM551-D039",
    claim: "Repeated constructs can be counted as independent evidence and inflate stopping or confidence.",
    disposition: "DISPROVEN_CURRENT",
    severity: "NOTE",
    confidence: "HIGH",
    source_ids: "SRC-DEFECTS; SRC-ENGINE-CONTRACT; SRC-FOCUSED; SRC-INVARIANTS",
    current_evidence: "The current engine keeps only the strongest positive and contradiction within each dependency group, and current focused validation covers dependency and neutral-evidence behavior.",
    action: "Protect dependency-group caps and separate behavioral/lens ledgers.",
    owner_required: "NO"
  },
  {
    id: "RT-014",
    origin: "Yore current observability boundary",
    claim: "All 37 identities should be forceable as behaviorally named results.",
    disposition: "PRODUCT_DESIGN",
    severity: "NOTE",
    confidence: "HIGH",
    source_ids: "SRC-ARCHITECTURE; SRC-LENS; SRC-ENGINE-SUMMARY; SRC-ENGINE-EVIDENCE",
    current_evidence: "The approved architecture says Yore is not cleanly observable from Commander behavior. ENGINE-YORE responsibly returns insufficient while the other 36 witnesses reproduce their named outcomes.",
    action: "Owner confirms the intentional bounded Yore behavior remains preferable to forced closure.",
    owner_required: "YES"
  },
  {
    id: "RT-015",
    origin: "Owner-approved identity-lens architecture",
    claim: "A self-report lens should be treated as behavioral scoring or allowed to name/flip an identity.",
    disposition: "PRODUCT_DESIGN",
    severity: "NOTE",
    confidence: "HIGH",
    source_ids: "SRC-LENS; SRC-ARCHITECTURE; SRC-FOCUSED",
    current_evidence: "The approved lens is optional, non-scoring, separate, bounded to already plausible candidates, and cannot independently name or flip a result. It remains non-production and needs separate validation.",
    action: "Owner decides whether to retain the future lens obligation or remain behavior-only with explicit uncertainty.",
    owner_required: "YES"
  },
  {
    id: "RT-016",
    origin: "VM-579 direct Dossier Review provenance seam",
    claim: "A direct dossier render can be mistaken for evidence that the placement engine reached that identity.",
    disposition: "DISPROVEN_CURRENT",
    severity: "NOTE",
    confidence: "HIGH",
    source_ids: "SRC-DOSSIER-EVIDENCE; SRC-ENGINE-EVIDENCE",
    current_evidence: "The current packet keeps separate audit IDs and artifacts for direct dossier rendering versus current-engine witnesses. All dossier rows say NOT_ASSERTED; all engine rows independently record witness provenance and trace hashes.",
    action: "Keep the two evidence seams separate in review and future automation.",
    owner_required: "NO"
  }
];

const dossier = readJson(DOSSIER_PATH);
const engine = readJson(ENGINE_PATH);
const dossierRows = dossier.records ?? dossier.rows ?? dossier.identities ?? [];
const engineRows = engine.rows ?? [];
if (dossierRows.length !== 37 || engineRows.length !== 37) {
  throw new Error(`Expected 37 dossier and engine rows; received ${dossierRows.length} and ${engineRows.length}.`);
}
if (!engineRows.some((row) => row.audit_id === "ENGINE-YORE" && row.match_status === "NO_RESULT")) {
  throw new Error("Current evidence does not contain the expected bounded ENGINE-YORE no-result.");
}
for (const source of sources) {
  const target = path.join(ROOT, source.path);
  if (!fs.existsSync(target)) throw new Error(`Missing red-team source: ${source.path}`);
  source.sha256 = sha256(target);
}

fs.mkdirSync(RECON_DIR, { recursive: true });

const sourceTable = sources
  .map((source) => `| ${source.id} | \`${source.path}\` | ${source.locator} | ${source.authority} | ${source.currentness} | \`${source.sha256}\` | ${source.use} |`)
  .join("\n");
fs.writeFileSync(
  path.join(RECON_DIR, "red-team-source-inventory.md"),
  `# Red-Team Source Inventory\n\n` +
    `Generated: 2026-08-22\nBaseline: \`db9a16a40c2bfb7d0d493eacef348f19d70bb05a\`\n\n` +
    `The register is a historical hypothesis inventory, not current truth. The accepted CECOS draft.4 object controls methodology; owner-approved design files control current intended behavior; current deterministic reports and this run's 37-by-37 evidence control implementation claims. Synthetic evidence is never promoted to player accuracy.\n\n` +
    `| ID | Path | Locator | Authority | Currentness | SHA-256 | Use |\n|---|---|---|---|---|---|---|\n${sourceTable}\n`,
  "utf8"
);

writeCsv(path.join(RECON_DIR, "red-team-reconciliation.csv"), findings);
const findingBlocks = findings.map((finding) =>
  `## ${finding.id} — ${finding.disposition}\n\n` +
  `- Origin: ${finding.origin}\n` +
  `- Claim: ${finding.claim}\n` +
  `- Severity: ${finding.severity}\n` +
  `- Confidence: ${finding.confidence}\n` +
  `- Sources: ${finding.source_ids}\n` +
  `- Current evidence: ${finding.current_evidence}\n` +
  `- Action: ${finding.action}\n` +
  `- Owner review required: ${finding.owner_required}\n`
).join("\n");
const dispositionCounts = Object.fromEntries(
  [...new Set(findings.map((finding) => finding.disposition))]
    .sort()
    .map((disposition) => [disposition, findings.filter((finding) => finding.disposition === disposition).length])
);
fs.writeFileSync(
  path.join(RECON_DIR, "red-team-reconciliation.md"),
  `# Current-State Red-Team Reconciliation\n\n` +
    `Baseline: \`db9a16a40c2bfb7d0d493eacef348f19d70bb05a\`\n` +
    `Findings reconciled: ${findings.length}\n\n` +
    `## Disposition summary\n\n` +
    Object.entries(dispositionCounts).map(([key, value]) => `- ${key}: ${value}`).join("\n") +
    `\n\n${findingBlocks}`,
  "utf8"
);

const dossierReviewIds = ["W", "UB", "LOREHOLD", "BANT", "ABZAN", "DUNE", "COLORLESS", "WUBRG"];
const engineReviewIds = ["G", "JUND", "LOREHOLD", "WITCH", "YORE"];
const dossierReview = dossierReviewIds.map((key) => dossierRows.find((row) => (row.identity_key ?? row.identity_id) === key));
const engineReview = engineReviewIds.map((key) => engineRows.find((row) => row.expected_identity_key === key));
if ([...dossierReview, ...engineReview].some((row) => !row)) throw new Error("Owner review sample could not be resolved.");
const ownerFindings = findings.filter((finding) => finding.owner_required === "YES");
fs.writeFileSync(
  path.join(RECON_DIR, "owner-review-queue.md"),
  `# Bounded Owner Review Queue\n\n` +
    `This queue is the smallest product-judgment pass after deterministic QA. The automation has already collected all 37 identities; the owner is not being asked to repeat the corpus.\n\n` +
    `## 1. Exceptions first\n\n` +
    `- Dossier blockers/majors/minors: **0**. All 37 dossier notes are the same bounded environment limitation: sandbox-blocked optional Scryfall media.\n` +
    `- Engine mismatches/stale/missing/error: **0**.\n` +
    `- Intentional bounded result: **ENGINE-YORE** returns insufficient/no responsible named placement.\n\n` +
    `## 2. Representative dossier judgment — 8 of 37\n\n` +
    dossierReview.map((row) => `- ${row.audit_id}: ${row.identity_name ?? row.identity_label}; inspect its screenshot and dossier workbook sheet for identity fidelity, full-section coherence, Commander usefulness, link purpose, and endpoint behavior.`).join("\n") +
    `\n\n## 3. Representative engine judgment — 5 of 37\n\n` +
    engineReview.map((row) => `- ${row.audit_id}: expected ${row.expected_identity_name}; state ${row.final_result_state}; raw leader ${row.raw_numeric_leader || "none"}; selected ${row.actual_final_identity || "none"}; refinement answers ${row.refinement_question_count}.`).join("\n") +
    `\n\n## 4. Red-team decisions — ${ownerFindings.length}\n\n` +
    ownerFindings.map((finding) => `- ${finding.id} (${finding.disposition}, ${finding.severity}): ${finding.action}`).join("\n") +
    `\n\n## 5. Owner acceptance questions\n\n` +
    `1. Do the eight sampled dossiers feel faithful, readable, and useful enough to approve the current direct-review surface despite unavailable optional card art in this environment?\n` +
    `2. Are the sampled engine states—including Jund close and Yore insufficient—honest enough for player-facing review?\n` +
    `3. Does Yore remain intentionally bounded rather than forced, and should the future non-scoring lens obligation remain?\n` +
    `4. Should exact result provenance remain audit-only or become a future bounded export/surface?\n` +
    `5. Is the next empirical step the already-designed player-validation protocol, with no accuracy claim before data?\n`,
  "utf8"
);

const manifest = readJson(MANIFEST_PATH);
manifest.red_team = {
  status: "COMPLETE",
  source_count: sources.length,
  finding_count: findings.length,
  disposition_counts: dispositionCounts,
  owner_review_count: ownerFindings.length,
  source_inventory: rel(path.join(RECON_DIR, "red-team-source-inventory.md")),
  reconciliation_markdown: rel(path.join(RECON_DIR, "red-team-reconciliation.md")),
  reconciliation_csv: rel(path.join(RECON_DIR, "red-team-reconciliation.csv")),
  owner_review_queue: rel(path.join(RECON_DIR, "owner-review-queue.md"))
};
manifest.completion_status = manifest.completion_status ?? {};
manifest.completion_status.red_team_reconciliation = "COMPLETE";
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(JSON.stringify({
  status: "PASS",
  sources: sources.length,
  findings: findings.length,
  dispositions: dispositionCounts,
  owner_review_items: ownerFindings.length
}, null, 2));

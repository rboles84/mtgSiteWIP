import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLAN = path.join(ROOT, "docs", "plans", "vm551-gate-b1-evidence-routing-remediation");
const REPORTS = path.join(ROOT, "docs", "reports", "vm551-gate-b1-placement-engine");

function json(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function tsv(rows) {
  const headers = Object.keys(rows[0]);
  const clean = (value) => String(Array.isArray(value) ? value.join(";") : value ?? "").replace(/[\t\r\n]+/g, " ");
  return `${headers.join("\t")}\n${rows.map((row) => headers.map((header) => clean(row[header])).join("\t")).join("\n")}\n`;
}

const coverage = fs.readFileSync(
  path.join(ROOT, "docs", "plans", "vm551-gate-b1-placement-instrument", "identity-coverage-matrix.tsv"),
  "utf8"
).trimEnd().split(/\r?\n/);
const headers = coverage.shift().split("\t");
const identityRows = coverage.map((line) => Object.fromEntries(line.split("\t").map((value, index) => [headers[index], value])));
const byIdentity = new Map(identityRows.map((row) => [row.identity_id, row]));
const currentReachability = json(path.join(REPORTS, "identity-reachability.json"));
const currentPairs = json(path.join(REPORTS, "confusion-pair-resolution.json"));

const folderByIdentity = {
  ABZAN: "abzan", B: "black", BR: "cult_of_rakdos", G: "green", JUND: "jund", MARDU: "mardu",
  NAYA: "naya", R: "red", RG: "gruul_clans", U: "blue", UB: "house_dimir", W: "white",
  WG: "selesnya_conclave", WU: "azorius_senate", YORE: "yore",
};

const zeroNamingIds = ["ABZAN", "B", "BR", "G", "JUND", "MARDU", "NAYA", "R", "RG", "U", "UB", "W", "WG", "WU", "YORE"];
const identityAdjudication = zeroNamingIds.map((identity) => {
  const row = byIdentity.get(identity);
  const folder = folderByIdentity[identity];
  assert(row && folder);
  const outcome = identity === "YORE" ? "NOT_CLEANLY_OBSERVABLE" : "INSTRUMENT_CHANGE_REQUIRED";
  return {
    identity,
    existing_b1_observations: row.supporting_constructs,
    boundary_constructs: row.boundary_constructs,
    competitors: row.strongest_likely_competitors,
    certified_locator: `data/raw-factions/${folder}/${folder}.placement.json#placement_summary,behavioral_signals,false_positive_patterns;data/raw-factions/${folder}/${folder}.profile.json#core_identity,guardrails`,
    b1_locator: `docs/plans/vm551-gate-b1-placement-instrument/identity-coverage-matrix.tsv#identity_id=${identity};${row.pilot_question_ids}`,
    player_language_locator: "docs/research/placementResearch/YT-how-to-find-the-right-commander-refined-player-evidence.md;docs/research/placementResearch/YT-new-new-commander-brackets-refined-player-evidence.md;docs/research/placementResearch/YT-edhrecast-real-reason-commander-players-hate-combo-refined-player-evidence.md;CECOS@947bf45bf6a191839b5fb4fa6c65980ed9d5737e",
    counterexample_and_false_positive: row.uncovered_risks,
    outcome,
    mapping_action: "NONE",
    rationale: identity === "YORE"
      ? "C06/C09 can describe engine structure and repeatability but cannot establish constructed agency; the approved lens remains secondary and non-naming."
      : "The approved matrix classifies coverage as broad/family-only with no direct identity-specific discriminator; promoting a broad answer would convert structural similarity into identity ownership.",
  };
});

const baselineNine = {
  BANT: "b1.crucible.bant.v1", GRIXIS: "b1.crucible.grixis.v1", JESKAI: "b1.crucible.jeskai.v1",
  SILVERQUILL: "b1.crucible.wb.v1", SULTAI: "b1.crucible.sultai.v1", TEMUR: "b1.crucible.temur.v1",
  UG: "b1.crucible.ug.v1", WB: "b1.crucible.wb.v1", WITCH: "b1.crucible.ink-witch.v1;b1.crucible.witch-yore.v1",
};
const currentByIdentity = new Map(currentReachability.rows.map((row) => [row.identity, row]));
const formerCloseNamed = ["BG", "COLORLESS", "DUNE", "GLINT", "INK", "LOREHOLD", "PRISMARI", "QUANDRIX", "UR", "WITHERBLOOM", "WR", "WUBRG"];
const namingQualificationFindings = formerCloseNamed.map((identity) => {
  const current = currentByIdentity.get(identity);
  return {
    identity,
    prior_public_path: "NAMED_THROUGH_CLOSE_STATE_WITH_ONE_NAMING_DEPENDENCY",
    current_responsible_candidate_reachable: current.can_become_responsible_public_candidate,
    current_primary_reachable: current.can_become_primary,
    blocker: "The approved exact/bounded naming answer supplies one positive dependency/construct; no second independently mapped behavioral observation exists.",
    disposition: "BOUND_UNTIL_SECOND_INDEPENDENT_POSITIVE_AUTHORITY_EXISTS",
    evidence_locator: `docs/reports/vm551-gate-b1-placement-engine/identity-reachability.json#identity=${identity};data/placement/gate-b1-mapping.source.json#mapping_rules`,
  };
});
const routingNine = Object.entries(baselineNine).map(([identity, questionIds]) => {
  const current = currentByIdentity.get(identity);
  const targetIds = questionIds.split(";");
  const namingQuestionReached = targetIds.some((questionId) => current.routing_questions_encountered.includes(questionId));
  const disposition = current.can_become_primary
    ? "RESOLVED_BY_EFFECT_BASED_ELIGIBILITY"
    : namingQuestionReached
      ? "REACHED_BUT_INDEPENDENT_NAMING_QUALIFICATION_NOT_MET"
      : "REMAINS_Q8_FRONTIER_CONTENTION";
  return {
    identity,
    approved_naming_question_ids: questionIds,
    unbiased_baseline: "NAMING_EVIDENCE_EXISTS_BUT_PRIMARY_UNREACHABLE",
    candidate_frontier_presence: current.can_enter_candidate_set,
    current_primary_reachable: current.can_become_primary,
    current_top_2_reachable: current.can_appear_top_2,
    current_top_3_reachable: current.can_appear_top_3,
    dependency_and_q8_interaction: current.can_become_primary
      ? "One-sided bounded target became eligible because its answer effects genuinely separated frontier candidates."
      : namingQuestionReached
        ? "The target is reachable, but the answer supplies only one positive dependency/construct and cannot independently satisfy responsible naming."
        : "The naming question remains outside the strongest deterministic route or loses the single Question 8 slot to a higher-utility unresolved boundary.",
    generic_fix_disposition: disposition,
    evidence_locator: `data/placement/gate-b1-mapping.source.json#mapping_rules(answer_id prefix ${questionIds});docs/plans/vm551-gate-b1-placement-instrument/pilot-question-bank.tsv#${questionIds}`,
  };
});

const boundedPairs = currentPairs.rows.filter((row) => row.resolution === "BOUNDED_NO_DIRECT_DISCRIMINATOR");
assert.equal(boundedPairs.length, 73);
const confusionRows = boundedPairs.map((row) => {
  const [left, right] = row.identities;
  const bothMono = left.length === 1 && right.length === 1;
  const hasYore = row.identities.includes("YORE");
  const cluster = hasYore
    ? "C1_YORE_NON_CLEAN_OBSERVABILITY"
    : bothMono
      ? "C2_MONO_IDENTITY_NOT_SEPARATED_BY_BREADTH"
      : row.shared_constructs.length
        ? "C3_SHARED_CONSTRUCT_WITHOUT_DIFFERENTIAL_EFFECT"
        : "C4_SEPARATE_BROAD_CHANNELS_WITHOUT_DIRECT_BOUNDARY";
  return {
    pair_id: row.pair_id,
    identity_a: left,
    identity_b: right,
    cluster,
    shared_constructs: row.shared_constructs,
    approved_question_ids: row.approved_question_ids,
    observable_distinction_recorded: row.observable_distinction,
    baseline_disposition: "BOUNDED_NO_DIRECT_DISCRIMINATOR",
    final_disposition: hasYore ? "RETAIN_BOUNDED_NOT_CLEANLY_OBSERVABLE" : "RETAIN_BOUNDED_INSTRUMENT_CHANGE_REQUIRED",
    mapping_action: "NONE",
    provenance: `docs/plans/vm551-gate-b1-placement-instrument/confusion-pair-coverage.tsv#${row.pair_id};docs/reports/vm551-gate-b1-placement-engine/confusion-pair-resolution.json#${row.pair_id}`,
  };
});

fs.mkdirSync(PLAN, { recursive: true });
fs.writeFileSync(path.join(PLAN, "zero-naming-identity-adjudication.tsv"), tsv(identityAdjudication));
fs.writeFileSync(path.join(PLAN, "existing-naming-routing-adjudication.tsv"), tsv(routingNine));
fs.writeFileSync(path.join(PLAN, "responsible-naming-qualification-adjudication.tsv"), tsv(namingQualificationFindings));
fs.writeFileSync(path.join(PLAN, "no-direct-confusion-pair-adjudication.tsv"), tsv(confusionRows));
console.log("Wrote VM-551 evidence-routing adjudication tables: 15 identities, 9 routing rows, 12 naming-qualification findings, 73 bounded pairs.");

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { finalizeReading, replaySelections, runJourney } from "../assets/js/gate-b1-placement-engine.js";

const root = process.cwd();
const check = process.argv.includes("--check");
const outputPath = path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "visual-review-manifest.json");
const model = JSON.parse(fs.readFileSync(path.join(root, "data", "gate-b1-placement-model.json"), "utf8"));
const factions = JSON.parse(fs.readFileSync(path.join(root, "data", "factions.json"), "utf8")).factions;
const witnesses = JSON.parse(fs.readFileSync(path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json"), "utf8")).rows;

function rng(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

function generatedStateCase(state, caseId, label) {
  for (let seed = 1; seed <= 50000; seed += 1) {
    const random = rng(seed * 104729);
    const journey = runJourney({ model, factions, strategy: (question) => Math.floor(random() * question.answers.length) });
    if (journey.result.result_state !== state) continue;
    return {
      case_id: caseId,
      review_label: label,
      identity_key: journey.result.faction || state.toUpperCase(),
      identity_name: journey.result.faction_name || label,
      expected_public_contract: ["primary", "close", "tied"].includes(state) ? "NAMED_DOSSIER" : "BOUNDED_STATE",
      expected_state: state,
      result_faction: journey.result.faction || null,
      selections: journey.selections.map(({ question_id, answer_id }) => ({ question_id, answer_id })),
      result: journey.result,
      witness_authority: "Deterministic current-engine journey; no authored preview route.",
      seed,
    };
  }
  throw new Error(`Could not generate a deterministic ${state} visual-review case`);
}

const byIdentity = new Map(witnesses.map((row) => [row.identity_key, row]));
const identityCases = witnesses.map((row) => ({
  ...row,
  case_id: `identity-${row.identity_key.toLowerCase()}`,
  review_label: row.identity_key === "YORE" ? "Yore intentional bounded reading" : `${row.identity_name} named dossier`,
  witness_authority: "Certified current-engine all-37 witness; no authored preview route.",
}));
const frozenJundSelections = [
  ["b1.gate.initiative.v1", "b1.gate.initiative.v1.advance"],
  ["b1.gate.visibility.v1", "b1.gate.visibility.v1.held"],
  ["b1.gate.disruption.v1", "b1.gate.disruption.v1.protect"],
  ["b1.gate.tempo.v1", "b1.gate.tempo.v1.depends"],
  ["b1.hall.commitment.v1", "b1.hall.commitment.v1.procedure"],
  ["b1.hall.interaction-window.v1", "b1.hall.interaction-window.v1.before"],
  ["b1.hall.pressure.v1", "b1.hall.pressure.v1.combat"],
  ["b1.crucible.disruption-boundary.v1", "b1.crucible.disruption-boundary.v1.convert"],
];
const frozenJundState = replaySelections(model, frozenJundSelections.map(([question_id, answer_id]) => ({ question_id, answer_id })));
const frozenJundResult = finalizeReading({ state: frozenJundState, model, factions });
assert.equal(frozenJundResult.result_state, "mixed");
assert.deepEqual(frozenJundResult.top_matches.map((match) => match.faction), ["W", "JUND", "RG"]);
const jundMixed = {
  case_id: "jund-mixed",
  review_label: "Jund / White / Gruul mixed directions",
  identity_key: "JUND_MIXED",
  identity_name: "Jund / White / Gruul mixed directions",
  expected_public_contract: "BOUNDED_STATE",
  expected_state: "mixed",
  result_faction: null,
  selections: frozenJundSelections.map(([question_id, answer_id]) => ({ question_id, answer_id })),
  result: frozenJundResult,
  seed: 5083,
  witness_authority: "Frozen owner Jund evidence ledger vm551-gate-b1-placement-engine-v1-quick-jund-4.",
};

const cleanPrimary = witnesses.find((row) => row.expected_state === "primary" && row.expected_public_contract === "NAMED_DOSSIER");
const closeOrTied = witnesses.find((row) => ["close", "tied"].includes(row.expected_state)) || generatedStateCase("tied", "close-or-tied", "Qualified co-leader reading");
const featured = [
  { ...cleanPrimary, case_id: "clean-primary", review_label: `Clean primary: ${cleanPrimary.identity_name}` },
  { ...closeOrTied, case_id: "close-or-tied", review_label: `Close/co-leader: ${closeOrTied.identity_name}`, focus_identity_keys: (closeOrTied.result?.top_matches || []).map((match) => match.faction).filter(Boolean) },
  jundMixed,
  generatedStateCase("insufficient", "insufficient", "Insufficient reading with recovery"),
  generatedStateCase("contradictory", "conflicting", "Conflicting reading with recovery"),
  { ...byIdentity.get("YORE"), case_id: "bounded-yore", review_label: "Yore intentional bounded reading" },
  { ...byIdentity.get("COLORLESS"), case_id: "colorless", review_label: "Colorless named dossier" },
  { ...byIdentity.get("WUBRG"), case_id: "wubrg", review_label: "Five-Color named dossier" },
];

assert.equal(identityCases.length, 37);
assert.equal(identityCases.filter((row) => row.expected_public_contract === "NAMED_DOSSIER").length, 36);
assert.ok(featured.every((row) => row?.selections?.length));
const cases = [...identityCases, ...featured];
const output = `${JSON.stringify({
  schema_version: "1.0.0",
  model_version: model._meta.model_version,
  authority: "Real current-engine witness evidence only; authored preview routes are excluded.",
  review_command: "npm run review:vm551 -- --case=<case-id>",
  featured_case_ids: featured.map((row) => row.case_id),
  cases,
}, null, 2)}\n`;

if (check) assert.equal(fs.readFileSync(outputPath, "utf8").replace(/\r\n/g, "\n"), output, "stale visual-review manifest");
else fs.writeFileSync(outputPath, output);

console.log(JSON.stringify({ status: "PASS", identity_cases: identityCases.length, featured_cases: featured.length, total_cases: cases.length }, null, 2));

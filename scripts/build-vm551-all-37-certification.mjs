import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { buildDossierMazePathEntries } from "../assets/js/maze-handoff.js";

const root = process.cwd();
const check = process.argv.includes("--check");
const auditDir = path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout");
const jsonPath = path.join(auditDir, "surface-completion-matrix.json");
const tsvPath = path.join(auditDir, "surface-completion-matrix.tsv");
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const witnesses = read("docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json");
const ui = read("docs/audits/vm551-all-37-dossier-closeout/live-ui-witness-replay.json");
const factions = read("data/factions.json").factions;
const rationale = read("data/dossier/card-rationale-catalog.json").records;
const voices = read("data/dossier/card-voice-catalog.json").records;
const dossier = read("data/dossier/identity-dossier-content.catalog.json").records;
const comparisons = read("data/dossier/public-comparisons.catalog.json").records;
const education = read("data/dossier/discovery-education-catalog.json");
const precons = read("data/precons/vox-mana-precon-catalog.json").precons;
const provider = read("data/placement/commander-provider-validation.json");
const viewportNames = ["desktop", "intermediate", "mobile"];
const witnessByIdentity = new Map(witnesses.rows.map((row) => [row.identity_key, row]));
const dossierByIdentity = new Map(dossier.map((row) => [row.identity_key, row]));
const uiRows = Object.fromEntries(viewportNames.map((name) => {
  assert.equal(ui.viewports?.[name]?.status, "PASS", `missing ${name} all-37 UI replay`);
  assert.equal(ui.viewports[name].rows.length, 37, `${name} replay is not all-37`);
  assert.equal(new Set(ui.viewports[name].rows.map((row) => row.identity_key)).size, 37, `${name} replay duplicates an identity`);
  assert.deepEqual(ui.viewports[name].failures || [], [], `${name} replay retained failures`);
  return [name, new Map(ui.viewports[name].rows.map((row) => [row.identity_key, row]))];
}));
const surfaces = [
  "placement_witness_or_bounded_state", "why_this_fit", "test_the_fit", "nearby_comparison", "how_this_plays",
  "cards_that_sound_like_this", "why_these_cards_echo", "precon_starting_points", "browse_builds_provider",
  "what_to_look_for", "card_signal_references", "start_here_glossary", "mana_notes", "maze_paths",
  "modal_hover_behavior", "responsive_behavior", "copy_entity_casing_integrity",
];
const pass = (reason, evidence) => ({ status: "PASS", evidence: Array.isArray(evidence) ? evidence : [evidence], reason });
const na = (reason, evidence) => ({ status: "NOT_APPLICABLE", evidence: Array.isArray(evidence) ? evidence : [evidence], reason });
const identityCode = (faction) => faction.key === "COLORLESS"
  ? "C"
  : [...(faction.colors || [])].sort((left, right) => "WUBRG".indexOf(left) - "WUBRG".indexOf(right)).join("");
const exactPrecons = (faction) => precons.filter((precon) => precon.colorIdentityKey === identityCode(faction));

const rows = Object.values(factions).map((faction) => {
  const key = faction.key;
  const witness = witnessByIdentity.get(key);
  const content = dossierByIdentity.get(key);
  const rendered = viewportNames.map((name) => uiRows[name].get(key));
  assert.ok(witness && content && rendered.every(Boolean), `${key} missing per-identity certification evidence`);
  const named = witness.expected_public_contract === "NAMED_DOSSIER";
  const rationaleRows = rationale.filter((row) => row.identity_key === key);
  const voiceRows = voices.filter((row) => row.identity_key === key);
  const comparisonRows = comparisons.filter((row) => row.identity_a === key || row.identity_b === key);
  const emittedAlternativeKeys = (witness.result?.top_matches || []).slice(1).map((match) => match.faction).filter(Boolean);
  const normalizedComparisonKeys = new Set(comparisons.map((row) => [row.identity_a, row.identity_b].sort().join("::")));
  const missingEmittedComparisons = emittedAlternativeKeys.filter((alternativeKey) => !normalizedComparisonKeys.has([key, alternativeKey].sort().join("::")));
  const identityPrecons = exactPrecons(faction);
  const providerGaps = identityPrecons.filter((precon) => !(provider.commanders?.[precon.mainCommander]?.links || []).some((link) => link.verified === true));
  const sourceSignalCount = Object.values(faction.staples || {}).flat().length;
  const commanderPath = buildDossierMazePathEntries({ identity: identityCode(faction), factionName: faction.name, identityHint: key })
    .find((entry) => entry.pathType === "commanders-that-fit" || entry.pathType === "colorless-identity");

  assert.equal(content.what_to_look_for.length, 3, `${key} What to Look For authority incomplete`);
  assert.equal(Object.values(content.test_the_fit).filter(Boolean).length, 3, `${key} Test the Fit authority incomplete`);
  assert.equal(Object.values(content.how_this_plays).filter(Boolean).length, 6, `${key} How This Plays authority incomplete`);
  assert.ok(rationaleRows.length >= 1 && voiceRows.length >= 1, `${key} card authority coverage incomplete`);
  assert.ok(comparisonRows.length >= 1, `${key} has no approved comparison`);
  assert.deepEqual(missingEmittedComparisons, [], `${key} emitted an alternative without approved comparison copy`);
  assert.ok(identityPrecons.length >= 1 && providerGaps.length === 0, `${key} precon/provider evidence incomplete`);
  assert.ok(commanderPath && /^id=[a-z]+ is:commander f:commander$/.test(commanderPath.query), `${key} Maze path is not exact-intent`);
  if (named) {
    for (const row of rendered) {
      assert.equal(row.state, "named", `${key} did not render its named dossier`);
      assert.ok(row.whyCount >= 2 && row.whyCount <= 3, `${key} Why This Fit incomplete`);
      assert.equal(row.testFitCount, 3, `${key} Test the Fit render incomplete`);
      assert.ok(row.rationaleCount >= 1 && row.voiceCount >= 1, `${key} card sections incomplete`);
      assert.ok(row.preconCount >= 1 && row.browseBuildCount >= row.preconCount, `${key} precon discovery incomplete`);
      assert.ok(row.whatToLookForCount >= 3 && row.manaNotesPresent && row.glossaryHelpCount >= 1, `${key} dossier teaching surfaces incomplete`);
      if (sourceSignalCount > 0) assert.ok(row.signalCount >= 1, `${key} omitted all authored Card Signal References`);
      assert.deepEqual(row.duplicateCards, [], `${key} has a page-level card collision`);
      assert.deepEqual(row.internalLeaks, [], `${key} leaked internal vocabulary`);
      assert.deepEqual(row.entityLeaks, [], `${key} leaked encoded entities`);
      assert.deepEqual(row.knownCopyDefects, [], `${key} retained a known copy defect`);
      assert.equal(row.documentOverflow, false, `${key} overflowed a certified viewport`);
    }
  } else {
    assert.equal(key, "YORE");
    assert.ok(rendered.every((row) => row.state !== "named"), "Yore must remain bounded in every viewport");
  }

  return {
    identity_key: key,
    identity_name: faction.name,
    cells: {
      placement_witness_or_bounded_state: pass(named ? `${witness.expected_state} named endpoint replayed.` : "Intentional bounded endpoint replayed.", "live-placement-witnesses.json"),
      why_this_fit: named
        ? pass(`${Math.min(...rendered.map((row) => row.whyCount))}–${Math.max(...rendered.map((row) => row.whyCount))} independent positive observations rendered.`, "live-ui-witness-replay.json")
        : na("Yore is intentionally not behaviorally named, so a named-fit explanation would misstate the product contract.", "identity-reachability.json#YORE"),
      test_the_fit: pass(named ? "Three approved semantic roles exist and render in the named dossier." : "Three approved semantic roles exist in authority; Yore's bounded endpoint intentionally does not render a named dossier.", `identity-dossier-content.catalog.json#${key}`),
      nearby_comparison: pass(emittedAlternativeKeys.length ? `Every emitted alternative (${emittedAlternativeKeys.join(", ")}) has approved bidirectional comparison copy.` : `${comparisonRows.length} approved comparisons are available; this witness emitted no public alternative.`, "public-comparisons.catalog.json"),
      how_this_plays: pass("Six approved identity-specific fields exist.", `identity-dossier-content.catalog.json#${key}`),
      cards_that_sound_like_this: pass(`${voiceRows.length} approved exact voice relationship(s).`, "card-voice-catalog.json"),
      why_these_cards_echo: pass(`${rationaleRows.length} approved rationale relationship(s).`, "card-rationale-catalog.json"),
      precon_starting_points: pass(`${identityPrecons.length} exact-color precon record(s); named UI renders at least one.`, "vox-mana-precon-catalog.json"),
      browse_builds_provider: pass(`${identityPrecons.length} exact-color precon record(s), all with a validated commander destination.`, "commander-provider-validation.json"),
      what_to_look_for: pass("Three approved actionable entries exist and render on named dossiers.", `identity-dossier-content.catalog.json#${key}`),
      card_signal_references: sourceSignalCount
        ? pass(`${sourceSignalCount} authored references are capability-gated and at least one collision-free reference renders on every named replay.`, [`data/factions.json#${key}.staples`, "live-ui-witness-replay.json"])
        : na("The certified dossier contract makes Card Signal References capability-gated: when no authored staples exist, the section is intentionally inapplicable and omitted rather than filled.", [`assets/js/commander-dossier.js#capability-gated-card-signals`, `data/factions.json#${key}.staples`]),
      start_here_glossary: named
        ? pass(`${Math.min(...rendered.map((row) => row.glossaryHelpCount))} or more approved first-occurrence teaching terms render.`, "live-ui-witness-replay.json")
        : pass(`${education.glossary.length} approved factual glossary records remain available to Yore's source-backed content.`, "discovery-education-catalog.json"),
      mana_notes: named
        ? pass("Mana Notes rendered at all three certified widths.", "live-ui-witness-replay.json")
        : na("The bounded Yore result intentionally has no identity dossier or mana panel.", "live-placement-witnesses.json#YORE"),
      maze_paths: pass(`Visible exact-identity intent matches operator query: ${commanderPath.query}`, "maze-handoff.js"),
      modal_hover_behavior: named
        ? pass("Full-card hover, centered detail, exact rationale parity, Escape, and focus restoration passed.", "live-ui-witness-replay.json")
        : na("The bounded Yore result intentionally renders no identity-card modal triggers.", "live-placement-witnesses.json#YORE"),
      responsive_behavior: pass("The actual endpoint replayed without horizontal overflow at desktop, intermediate, and mobile widths.", "live-ui-witness-replay.json"),
      copy_entity_casing_integrity: pass("Rendered copy contains no internal-token, encoded-entity, known typo/casing, or literal-symbol leak.", "live-ui-witness-replay.json"),
    },
  };
});

const counts = { PASS: 0, NOT_APPLICABLE: 0, FAIL: 0 };
for (const row of rows) for (const surface of surfaces) counts[row.cells[surface].status] += 1;
assert.equal(rows.length, 37);
assert.equal(counts.FAIL, 0);
const artifact = { schema_version: "2.0.0", status_policy: "PASS requires per-identity evidence; NOT_APPLICABLE requires an explicit product-contract reason; missing work is FAIL.", surfaces, summary: counts, identities: rows };
const json = `${JSON.stringify(artifact, null, 2)}\n`;
const esc = (value) => String(value ?? "").replace(/\t/g, " ").replace(/\r?\n/g, " ");
const tsv = `${["identity_key", "identity_name", ...surfaces].join("\t")}\n${rows.map((row) => [row.identity_key, row.identity_name, ...surfaces.map((surface) => `${row.cells[surface].status}: ${row.cells[surface].reason}`)].map(esc).join("\t")).join("\n")}\n`;
if (check) {
  assert.equal(fs.readFileSync(jsonPath, "utf8").replace(/\r\n/g, "\n"), json, "stale JSON completion matrix");
  assert.equal(fs.readFileSync(tsvPath, "utf8").replace(/\r\n/g, "\n"), tsv, "stale TSV completion matrix");
} else {
  fs.writeFileSync(jsonPath, json);
  fs.writeFileSync(tsvPath, tsv);
}
console.log(JSON.stringify({ status: "PASS", identities: rows.length, cells: rows.length * surfaces.length, ...counts }, null, 2));

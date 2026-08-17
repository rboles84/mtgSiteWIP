import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const auditDir = path.join(repoRoot, "docs", "audits", "vm565-player-vocabulary-education");
const audit = JSON.parse(fs.readFileSync(path.join(auditDir, "education-audit-ledger.json"), "utf8"));
const candidates = JSON.parse(fs.readFileSync(path.join(auditDir, "candidate-ledger.json"), "utf8"));
const reportPath = path.join(auditDir, "owner-report.md");
const checkOnly = process.argv.includes("--check");

const escapeCell = (value) => String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
const locationLabel = (allocation) => `${allocation.surface} — ${allocation.field}`;
const statusLabel = (allocation) => {
  if (allocation.allocation_kind === "NEW_EXPLICIT_TARGET") return "New canonical education";
  if (allocation.allocation_kind === "EXISTING_OVERRIDE") return "Existing definition; location changed";
  return "Existing education retained";
};
const rationale = (allocation) => {
  if (allocation.allocation_kind === "NEW_EXPLICIT_TARGET") return "Specialized player vocabulary taught once where it informs a deck or play decision.";
  if (allocation.allocation_kind === "EXISTING_OVERRIDE") return "The established definition is more useful at this central, context-reinforcing occurrence.";
  return "Current approved definition remains useful and is still limited to one occurrence in this dossier.";
};
const classification = (allocation) => allocation.allocation_kind === "NEW_EXPLICIT_TARGET"
  ? "ESTABLISHED_MTGO_COMMANDER_TERM_MISSING"
  : "EXISTING_CANONICAL_TERM";

const rejectedGroups = candidates.candidate_decisions
  .filter((candidate) => !candidate.accepted)
  .reduce((groups, candidate) => {
    groups.set(candidate.classification, (groups.get(candidate.classification) || 0) + 1);
    return groups;
  }, new Map());

const changedByIdentity = new Map();
for (const resolution of audit.accepted_resolution) {
  const records = changedByIdentity.get(resolution.identity_key) || [];
  records.push(resolution.record_id);
  changedByIdentity.set(resolution.identity_key, records);
}

const lines = [
  "# VM-565 Curated Player Vocabulary Education — Owner Report",
  "",
  `Status: **OWNER REVIEW**. Deterministic audit status: **${audit.status}**.`,
  "",
  "## Executive summary",
  "",
  `VM-565 reviewed **${candidates.summary.strategy_label_occurrences_reviewed + candidates.summary.additional_candidate_decisions} candidate expressions** across all **${audit.summary.identities} identities**: ${candidates.summary.strategy_label_occurrences_reviewed} strategy-label occurrences plus ${candidates.summary.additional_candidate_decisions} independently discovered vocabulary decisions. It accepted **${audit.summary.accepted_candidate_decisions} education actions** and deliberately left **${audit.summary.rejected_candidate_decisions} candidates** undecorated.`,
  "",
  `The implementation adds **${audit.summary.new_canonical_definitions} canonical definitions**, **${audit.summary.aliases_added} aliases**, and **${audit.summary.new_term_target_entries} new exact teaching targets**. It reuses approved definitions for **${audit.summary.existing_term_override_entries} better teaching-location selections**, for **${audit.summary.exact_target_entries} total exact target entries**. One definition was corrected: Mana rocks now teaches what the artifact is, rather than repeating the generic Ramp definition.`,
  "",
  `The current all-37 result contains **${audit.summary.total_teaching_allocations} single-concept teaching allocations**, with **${audit.summary.unresolved_accepted_targets} unresolved targets**, **${audit.summary.duplicate_canonical_teachings} duplicate canonical teachings**, and **${audit.summary.blanket_text_only_surface_allocations} blanket text-only surface allocations**.`,
  "",
  "The result intentionally does not chase glossary utilization or whole-phrase coverage. Compound labels such as Protective Tokens remain undecorated when their useful component concepts are already taught, and Vox Mana editorial labels remain prose.",
  "",
  "## Before and after education coverage",
  "",
  "| Measure | VM-564 baseline | VM-565 | Interpretation |",
  "|---|---:|---:|---|",
  `| Canonical glossary records | ${audit.baseline.vm564_glossary_records} | ${audit.summary.glossary_records} | Added only established vocabulary with a specific learner problem. |`,
  `| Actual one-per-dossier teaching allocations | ${audit.baseline.vm564_hover_identity_term_assignments} | ${audit.summary.total_teaching_allocations} | The increase is ${audit.summary.exact_target_entries} intentional exact targets, not wholesale renderer expansion. |`,
  `| Better locations for existing concepts | 0 explicit overrides | ${audit.summary.existing_term_override_entries} | Existing definitions moved to more useful contexts without duplication. |`,
  `| Unresolved accepted targets | n/a | ${audit.summary.unresolved_accepted_targets} | Every accepted action resolves deterministically. |`,
  `| Duplicate canonical teaching in one dossier | not enforced by the VM-564 evidence report | ${audit.summary.duplicate_canonical_teachings} | One decoration per canonical concept is enforced. |`,
  `| Deliberately rejected independent candidates | n/a | ${audit.summary.rejected_candidate_decisions} | Nonessential annotation was avoided. |`,
  "",
  "The useful outcome is qualitative: terms such as Dredge, Impulse draw, Enchantress, Group Hug, Politics, Treasure, Typal, and colorless mana now have one intentional teaching moment where the player is choosing or interpreting a deck direction.",
  "",
  "## Per identity",
  "",
  "Only actual teaching allocations are shown below. Ordinary prose and rejected editorial labels are omitted.",
  "",
];

for (const identity of audit.identities) {
  const allocations = identity.allocations.filter((allocation) => allocation.rendered);
  lines.push(`### ${identity.identity_name} (${identity.identity_key})`, "");
  lines.push("| Term or phrase | Classification | Definition | Teaching location | Existing or new | Rationale |", "|---|---|---|---|---|---|");
  for (const allocation of allocations) {
    lines.push(`| ${escapeCell(allocation.matched_label || allocation.term)} | ${classification(allocation)} | ${escapeCell(allocation.definition)} | ${escapeCell(locationLabel(allocation))} | ${statusLabel(allocation)} | ${rationale(allocation)} |`);
  }
  lines.push("");
}

lines.push(
  "## Rejected candidate summary",
  "",
  "| Reason group | Count | Decision rule |",
  "|---|---:|---|",
  `| Vox Mana editorial labels | ${rejectedGroups.get("VOX_MANA_EDITORIAL_LABEL") || 0} | Preserve authored identity expression as prose; do not invent technical definitions. |`,
  `| Secondary list terms | ${rejectedGroups.get("SECONDARY_LIST_TERM") || 0} | A real term can still be a poor teaching interruption when it is peripheral in this placement. |`,
  `| Context already sufficient | ${rejectedGroups.get("CONTEXT_ALREADY_SUFFICIENT") || 0} | The surrounding sentence already teaches enough. |`,
  `| Established terms not accepted here | ${rejectedGroups.get("ESTABLISHED_MTGO_COMMANDER_TERM_MISSING") || 0} | Established vocabulary was rejected when this occurrence was incidental, already explained, or not important enough to interrupt. |`,
  `| Compound of already taught concepts | ${rejectedGroups.get("COMPOUND_OF_ALREADY_TAUGHT_CONCEPTS") || 0} | Teach the useful components once; do not add a redundant whole-phrase definition. |`,
  `| Ordinary language | ${rejectedGroups.get("ORDINARY_LANGUAGE") || 0} | Do not glossary-decorate plain English. |`,
  `| Too trivial to interrupt | ${rejectedGroups.get("TOO_TRIVIAL_TO_INTERRUPT") || 0} | Even accurate help is rejected when the reading cost exceeds the learner benefit. |`,
  `| Existing alias rejected in this context | ${rejectedGroups.get("EXISTING_ALIAS") || 0} | The alias did not create an additional learner need at this occurrence. |`,
  "",
  `Total deliberately left alone: **${audit.summary.rejected_candidate_decisions}**. The detailed reasons and exact source fields remain in \`candidate-ledger.json\`.`,
  "",
  "The four approved VM-564 glossary records with zero audited matches — Hatebears, Parity, Pillowfort, and Stax — remain dormant. They were neither deleted nor forced into dossier copy.",
  "",
  "## Owner review list",
  "",
  `Manually inspect these **${changedByIdentity.size} changed identities** and exact terms:`,
  "",
);

for (const identity of audit.identities.filter((entry) => changedByIdentity.has(entry.identity_key))) {
  const changedRecords = new Set(changedByIdentity.get(identity.identity_key));
  const changed = identity.allocations
    .filter((allocation) => allocation.rendered && changedRecords.has(allocation.record_id))
    .map((allocation) => `${allocation.matched_label || allocation.term} (${locationLabel(allocation)})`);
  lines.push(`- **${identity.identity_name}:** ${changed.join("; ")}.`);
}

lines.push(
  "",
  "Specific judgment calls worth attention: White Board wipe in How This Plays; Blue Artifacts in a What to Look For title; Black Aristocrats and Reanimator; Red Impulse Draw and Treasures; Golgari Dredge and BGx Midrange; Boros Heroic, Burn, Go-wide, and Voltron; Bant Exalted, Enchantments, and Enchantress; Ink Group Hug and Politics; and the Colorless mana / mana rocks teaching pair.",
  "",
  "## Owner Review Remediation",
  "",
  "### Bug 1 — Bant Enchantress definition",
  "",
  "- Original: `Drawing cards or gaining value when you cast enchantments or when enchantments enter.`",
  "- Revised: `An enchantment-focused strategy that draws cards or generates value when you cast enchantments or when enchantments enter the battlefield.`",
  "- Placement: unchanged at Bant What to Look For, item 3 title; one canonical teaching allocation remains.",
  "- Focused desktop tooltip interaction and deterministic exact-placement checks: PASS.",
  "",
  "### Bug 2 — Boros Play-card control clipping",
  "",
  "- Reproduced at the governed 1440 × 1100 desktop viewport: all three controls were visible but each `width: max-content` control extended about 110 px beyond its three-column card boundary.",
  "- Minimal correction: only three-item public card grids use `width: fit-content`, `max-width: 100%`, normal wrapping, and an explicit line height for the control.",
  "- The replay now enforces visible, fully contained controls with at least 12 px bottom spacing. Boros desktop and mobile: PASS; the same three cards, order, rationale, tags, and modal behavior remain.",
  "",
  "### Bug 3 — Ink Sound selection",
  "",
  "- Rejected: Command Tower (land) and Danitha Capashen, Paragon (weak mono-white representation for this pair).",
  "- Replacement anchor: **Crystal, Inhuman Princess** (`MSC` 80; RGWU; Legendary Creature — Inhuman Noble Hero). Direct flavor support: `\"Attilan can't stay hidden forever. It's time we showed them how fantastic we are.\"`",
  "- Replacement complement: **Group Project** (`SOS` 17; W; Sorcery), discovered in owner `ink2.csv`. Direct flavor support: `\"Never be afraid to ask for help. Success is much sweeter when it's shared.\" —Quintorius Kand`",
  "- Both relationships are Sound because their exact voices express collective flourishing, mutual aid, and shared success; their mechanics were not the selection basis.",
  "- No lands remain. Kynaios and Tiro of Meletis remains unchanged and Play-only. Ink desktop and mobile rendering, previews, and details: PASS.",
  "- Full candidate evidence: `docs/research/ink/owner-evidence/vm565/ink-sound-candidate-ledger.json`.",
  "",
  "## Validation evidence",
  "",
  "- Deterministic candidate reconciliation: PASS.",
  "- Deterministic all-37 education audit: PASS.",
  "- All-37 desktop live replay: PASS (37 identities, 36 named dossiers plus bounded Yore).",
  "- Representative mobile live replay: PASS (Red and Colorless).",
  "- Hover, keyboard focus, Escape dismissal, and tap-equivalent activation: PASS.",
  "- No duplicate canonical teaching, unresolved target, or blanket text-only allocation: PASS.",
  "- Owner product judgment: PENDING.",
  ""
);

const output = `${lines.join("\n").trimEnd()}\n`;
if (checkOnly) {
  const current = fs.existsSync(reportPath) ? fs.readFileSync(reportPath, "utf8") : "";
  if (current !== output) {
    console.error("VM-565 owner report is stale. Run node scripts/build-vm565-owner-report.mjs");
    process.exitCode = 1;
  } else {
    console.log("VM-565 owner report is current.");
  }
} else {
  fs.writeFileSync(reportPath, output);
  console.log(`Wrote ${path.relative(repoRoot, reportPath)}`);
}

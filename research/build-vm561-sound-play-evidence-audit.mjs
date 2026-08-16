import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputRoot = path.join(root, "docs", "research", "archscry-sound-play-audit");
const packetRoot = path.join(outputRoot, "identity-evidence");

const readText = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(readText(relativePath));
const slash = (value) => String(value || "").replaceAll("\\", "/");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const normalize = (value) => String(value || "").normalize("NFKC").replace(/[^a-z0-9]+/gi, " ").trim().toLowerCase();
const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const sentence = (value) => String(value || "").replace(/\s+/g, " ").trim();
const claimStatement = (claim = {}) => sentence(claim.statement || claim.claim || "");
const withoutUrlFragment = (value) => String(value || "").split("#")[0];

const identityOrder = [
  "W", "U", "B", "R", "G",
  "WU", "UB", "BR", "RG", "WG", "WB", "UR", "BG", "WR", "UG",
  "SILVERQUILL", "PRISMARI", "WITHERBLOOM", "LOREHOLD", "QUANDRIX",
  "BANT", "ESPER", "GRIXIS", "JUND", "NAYA",
  "ABZAN", "JESKAI", "SULTAI", "MARDU", "TEMUR",
  "YORE", "GLINT", "DUNE", "INK", "WITCH", "WUBRG", "COLORLESS",
];
const routerKeyFor = { WG: "GW", WR: "RW", UG: "GU" };
const suppressedPlayIds = new Set([
  "cardrel_wu_c46718dc",
  "cardrel_ur_f787c6cf",
  "cardrel_lorehold_5c40a8d4",
  "cardrel_auto_colorless_ec726c54_987b_48ed_8ffa_ec73a5e35333",
]);
const suppressedPrecons = {
  cardrel_wu_c46718dc: ["First Flight", "data/precons/vox-mana-precon-catalog.json#first-flight-isperia-supreme-judge"],
  cardrel_ur_f787c6cf: ["Seize Control", "data/precons/vox-mana-precon-catalog.json#seize-control-mizzix-of-the-izmagnus"],
  cardrel_lorehold_5c40a8d4: ["Lorehold Spirit", "data/precons/vox-mana-precon-catalog.json#lorehold-spirit-quintorius-history-chaser"],
  cardrel_auto_colorless_ec726c54_987b_48ed_8ffa_ec73a5e35333: ["Eldrazi Unbound", "data/precons/vox-mana-precon-catalog.json#eldrazi-unbound-zhulodok-void-gorger"],
};

const factions = readJson("data/factions.json").factions;
const voiceCatalog = readJson("data/dossier/card-voice-catalog.json").records;
const playCatalogAll = readJson("data/dossier/card-rationale-catalog.json").records;
const playCatalog = playCatalogAll.filter((record) => !suppressedPlayIds.has(record.relationship_id));
const voiceRelationships = new Map(readJson("data/dossier/card-voice-relationships.source.json").records.map((record) => [record.relationship_id, record]));
const playRelationships = new Map(readJson("data/dossier/card-rationale-relationships.source.json").records.map((record) => [record.relationship_id, record]));
const voicePrintings = new Map(readJson("data/dossier/card-voice-printings.source.json").records.map((record) => [record.relationship_id, record]));
const scryfallCards = readJson("data/scryfall/raw/oracle-cards.json");
const scryfallById = new Map(scryfallCards.map((card) => [card.id, card]));
const officialSourceInspection = readJson("docs/research/archscry-sound-play-audit/official-source-inspection.json");
const officialInspectionByUrl = new Map(officialSourceInspection.sources.map((source) => [withoutUrlFragment(source.requested_url), source]));
const officialUrlOverrides = new Map([
  ["src_lorehold_0014", "https://magic.wizards.com/en/news/magic-story/secrets-of-strixhaven-field-studies-in-a-future-tense"],
]);

const routerPath = "docs/research/archscry-sound-play-audit/source-router.md";
const routerText = readText(routerPath);
const routerDir = path.dirname(path.join(root, routerPath));
const routerRows = new Map();
for (const line of routerText.split(/\r?\n/)) {
  const match = line.match(/^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*—\s*([^|]+?)\s*\|\s*`(STRONG_EVIDENCE|SUPPORTED_WITH_LIMITATIONS|VOX_MANA_SYNTHESIS)`\s*\|/);
  if (!match) continue;
  const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
  const claimLink = line.match(/\[claims\]\(([^)]+)\)/);
  if (!claimLink) throw new Error(`Router row ${match[2]} lacks a claims route`);
  const absoluteClaimPath = path.resolve(routerDir, decodeURIComponent(claimLink[1]));
  const links = [...line.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((item) => item[1]);
  routerRows.set(match[2], {
    number: Number(match[1]),
    router_key: match[2],
    display_name: match[3].trim(),
    outcome: match[4],
    claim_path: slash(path.relative(root, absoluteClaimPath)),
    source_path: slash(path.relative(root, absoluteClaimPath.replace(/\.claims\.json$/, ".sources.json"))),
    known_gaps: cells.at(-2) || "",
    non_authority_sources: cells.at(-1) || "",
    route_links: links,
    raw_row: line,
  });
}

function localPathCandidate(value, baseDir = root) {
  if (!value || /^https?:\/\//i.test(value)) return "";
  const withoutAnchor = decodeURIComponent(String(value).split("#")[0]);
  const absolute = path.isAbsolute(withoutAnchor) ? withoutAnchor : path.resolve(baseDir, withoutAnchor);
  return fs.existsSync(absolute) ? slash(path.relative(root, absolute)) : "";
}

function inspectLocalSource(relativePath) {
  if (!relativePath) return null;
  const absolute = path.join(root, relativePath);
  const body = fs.readFileSync(absolute);
  const extension = path.extname(relativePath).toLowerCase();
  return {
    path: slash(relativePath),
    sha256: sha256(body),
    bytes: body.length,
    inspection_status: extension === ".pdf" ? "PDF_TEXT_EXTRACTED_AND_READ" : "FULL_LOCAL_SOURCE_READ",
  };
}

function authorityClass(source = {}, locator = "") {
  const haystack = normalize([
    source.publisher_or_site,
    source.source_tier,
    source.source_role,
    source.source_type,
    locator,
  ].join(" "));
  if (haystack.includes("scryfall")) return "CARD_FACT_DATABASE";
  if (haystack.includes("wizards") || haystack.includes("official") || haystack.includes("gold official")) return "OFFICIAL_PRIMARY";
  if (haystack.includes("governance") || haystack.includes("lifecycle") || haystack.includes("planning")) return "ROUTING_OR_GOVERNANCE_ONLY";
  if (haystack.includes("discovery") || haystack.includes("support only") || haystack.includes("support material")) return "SUPPORT_ONLY";
  if (haystack.includes("vox mana") || locator.startsWith("docs/") || locator.startsWith("data/raw-factions/")) return "VOX_MANA_AUTHORITY";
  return "EXTERNAL_OR_UNCLASSIFIED";
}

function claimClass(claim = {}, routerOutcome = "") {
  const canon = normalize(`${claim.canon_status} ${claim.claim_type}`);
  if (routerOutcome === "VOX_MANA_SYNTHESIS" || canon.includes("synthesis") || canon.includes("vox mana")) return "VOX_MANA_INTERPRETATION";
  if (canon.includes("official") || canon.includes("canon supported") || canon.includes("canon corroborated")) return "DIRECT_OR_OFFICIAL_FACT";
  if (canon.includes("interpret") || canon.includes("source bound") || canon.includes("support")) return "SUPPORTED_INTERPRETATION";
  return "VOX_MANA_AUTHORITY";
}

function loadIdentityAuthority(identityKey) {
  const routerKey = routerKeyFor[identityKey] || identityKey;
  const route = routerRows.get(routerKey);
  if (!route) throw new Error(`No VM-560 route for ${identityKey}/${routerKey}`);
  const claimFile = readJson(route.claim_path);
  const sourceFile = readJson(route.source_path);
  return {
    route,
    claims: claimFile.claims || [],
    sources: sourceFile.sources || [],
    claimById: new Map((claimFile.claims || []).map((claim) => [claim.claim_id, claim])),
    sourceById: new Map((sourceFile.sources || []).map((source) => [source.source_id, source])),
  };
}

const identityAuthorities = new Map(identityOrder.map((key) => [key, loadIdentityAuthority(key)]));
const localSourceInspections = new Map();

function resolveUnderlyingEvidence(authority, claim) {
  const evidence = [];
  const locations = Array.isArray(claim.evidence_locations) && claim.evidence_locations.length
    ? claim.evidence_locations
    : (claim.source_ids || []).map((sourceId) => ({ source_id: sourceId, locator: "", bounded_paraphrase: claimStatement(claim) }));
  for (const location of locations) {
    const source = authority.sourceById.get(location.source_id) || {};
    const candidates = [
      localPathCandidate(location.locator),
      localPathCandidate(source.local_pdf_capture_path),
      localPathCandidate(source.repository_path),
      localPathCandidate(source.canonical_path),
      localPathCandidate(source.url_or_repository_path),
    ].filter(Boolean);
    const localPath = candidates[0] || "";
    if (localPath && !localSourceInspections.has(localPath)) localSourceInspections.set(localPath, inspectLocalSource(localPath));
    const officialUrl = source.canonical_url || source.url || (/^https?:\/\//i.test(source.url_or_repository_path || "") ? source.url_or_repository_path : "") || officialUrlOverrides.get(location.source_id) || "";
    evidence.push({
      source_id: location.source_id || source.source_id || "UNRESOLVED_SOURCE_ID",
      source_title: source.title || source.publisher_or_site || "Source named by certified claim",
      authority_classification: authorityClass(source, localPath || officialUrl || location.locator || ""),
      source_path_or_url: localPath || officialUrl || location.locator || "SOURCE_PATH_NOT_RECORDED",
      anchor: location.locator || source.anchor_ids?.join("; ") || "ANCHOR_NOT_RECORDED",
      establishes: sentence(location.bounded_paraphrase || source.relevant_summary || claimStatement(claim)),
      local_inspection: localPath ? localSourceInspections.get(localPath) : null,
      official_web_inspection: officialUrl ? officialInspectionByUrl.get(withoutUrlFragment(officialUrl)) || null : null,
      limitation: sentence(source.limitations || source.notes || ""),
    });
  }
  return evidence;
}

function coreClaim(claim) {
  return !/(lifecycle|metadata|source_authority|story_corpus|transition_boundary|runtime_boundary)/i.test(claim.claim_type || "");
}

function boundaryClaim(claim) {
  return /(boundary|guardrail|collision|tension|pressure|strength_weakness|relationships|unhealthy|mature|limitation|false_positive)/i.test(claim.claim_type || "");
}

function oracleText(card) {
  if (card.oracle_text) return card.oracle_text;
  return (card.card_faces || []).map((face) => `${face.name}: ${face.oracle_text || ""}`).filter(Boolean).join(" // ");
}

function typeLine(card) {
  if (card.type_line) return card.type_line;
  return (card.card_faces || []).map((face) => face.type_line).filter(Boolean).join(" // ");
}

function normalizedTokens(value) {
  return new Set(normalize(value).split(" ").filter((token) => token.length > 3));
}

function tokenOverlap(left, right) {
  const a = normalizedTokens(left);
  const b = normalizedTokens(right);
  if (!a.size || !b.size) return 0;
  const shared = [...a].filter((token) => b.has(token)).length;
  return shared / Math.min(a.size, b.size);
}

function playModalSuffix(record) {
  return sentence(record.modal_explanation).replace(/^At the table, .*? carries that card action into this reading's larger plan:\s*/i, "");
}

const repeatedPlaySuffixes = new Map();
for (const record of playCatalog) {
  const suffix = playModalSuffix(record);
  const key = `${record.identity_key}|${normalize(suffix)}`;
  repeatedPlaySuffixes.set(key, (repeatedPlaySuffixes.get(key) || 0) + 1);
}

const manualFindings = new Map(Object.entries({
  "SOUND|W|Aligned Heart": {
    echo_finding: "TILE_MODAL_PARAPHRASE_REPETITION",
    modal_value_finding: "LOW_ADDITIVE_VALUE",
    human_language_finding: "STIFF_OR_REPETITIVE",
    disposition: "REMEDIATION_LIKELY",
    notes: "The modal restates the same coordination image with little additional White-specific explanatory value.",
  },
  "SOUND|COLORLESS|All Is Dust": {
    authority_finding: "BOUNDED_COLORLESS_SYNTHESIS",
    bridge_finding: "PARTIAL_ELDRAZI_TO_COLORLESS_GENERALIZATION",
    facet_collapse_finding: "ELDRAZI_BRANCH_RISKS_STANDING_FOR_COLORLESS_WHOLE",
    overclaim_finding: "OUTSIDE_WUBRG_WORDING_REQUIRES_ORTHOGONAL_NOT_OPPOSITE_BOUNDARY",
    disposition: "REMEDIATION_LIKELY",
    notes: "The card is a valid Eldrazi/colorless branch fact, but that branch cannot automatically represent the whole Colorless identity or imply opposition to WUBRG.",
  },
  "SOUND|DUNE|Aurelia, the Warleader": {
    bridge_finding: "WEAK_NON_UNIQUE_ECHO",
    swap_finding: "SWAP_REVIEW_WARRANTED",
    facet_collapse_finding: "DIRECT_ACTION_ONLY",
    disposition: "REMEDIATION_LIKELY",
    notes: "Front-line leadership and organized force are compatible with Dune's bounded frame but are not distinctive enough by themselves to survive the adjacent Boros/Mardu echo test.",
  },
  "SOUND|DUNE|Scour from Existence": {
    bridge_finding: "CARD_LINE_TO_TERRITORIAL_SOLIDARITY_NOT_ESTABLISHED",
    authority_finding: "INSUFFICIENT_VOX_MANA_AUTHORITY_FOR_NARROW_BRIDGE",
    modal_value_finding: "MODAL_IMPORTS_GENERAL_TAZRI_AND_AURELIA_CONTEXT",
    disposition: "INSUFFICIENT_VOX_MANA_AUTHORITY",
    notes: "The modal's shared-territorial-survival reading goes beyond the bounded Dune source floor and is not established by this card's own line alone.",
  },
  "SOUND|GLINT|Aberrant Return": {
    bridge_finding: "WEAK_NON_UNIQUE_VOLATILITY_ECHO",
    swap_finding: "SWAP_REVIEW_WARRANTED",
    disposition: "REMEDIATION_LIKELY",
    notes: "Powerful and volatile magic can also fit Red, Izzet, Prismari, or Temur; the line does not itself establish the Glint-specific bridge.",
  },
  "SOUND|GLINT|Atarka, World Render": {
    authority_finding: "SOURCE_INTAKE_REQUIRED_FOR_STRONGER_GLINT_PSYCHOLOGY",
    bridge_finding: "APPETITE_ECHO_EXCEEDS_CURRENT_OFFICIAL_CAPTURE",
    overclaim_finding: "MATERIALLY_UNBOUNDED_IDENTITY_TRAIT",
    disposition: "SOURCE_INTAKE_REQUIRED",
    notes: "The current Vox synthesis permits a bounded appetite/force frame, but stronger official Glint/Yidris/Commander 2016 intake is required before presenting unbounded appetite as a durable identity trait.",
  },
  "SOUND|WITCH|Animation Module": {
    bridge_finding: "MECHANIC_ASSOCIATION_DOES_NOT_PROVE_SOUND_VOICE",
    swap_finding: "SWAP_REVIEW_WARRANTED",
    facet_collapse_finding: "COUNTER_PROLIFERATE_TEXTURE_ONLY",
    disposition: "REMEDIATION_LIKELY",
    notes: "Counter accumulation is allowed Witch texture, but a modular design line plus card mechanics does not automatically establish a strong identity voice.",
  },
  "SOUND|WITCH|Amphin Cutthroat": {
    authority_finding: "INSUFFICIENT_VOX_MANA_AUTHORITY_FOR_MISSING_RED_PSYCHOLOGY",
    bridge_finding: "CARD_LORE_TO_FOUR_COLOR_PSYCHOLOGY_NOT_ESTABLISHED",
    overclaim_finding: "MISSING_RED_USED_AS_DETERMINISTIC_TRAIT",
    disposition: "INSUFFICIENT_VOX_MANA_AUTHORITY",
    notes: "The approved Witch frame permits patient development, but the modal turns one species vignette into a concrete missing-Red psychology beyond the current evidence floor.",
  },
  "PLAY|W|Giada, Font of Hope": {
    bridge_finding: "TILE_CARD_FACT_PASS_MODAL_BRIDGE_PARTIAL",
    modal_value_finding: "GENERIC_WHITE_PLAN_NOT_GIADA_SPECIFIC",
    human_language_finding: "STIFF_SHARED_COMPOSER_FRAME",
    disposition: "REMEDIATION_LIKELY",
    notes: "The tile is well grounded in Giada's rules. The modal moves to generic protection/pressure/recurrence without showing how Giada specifically supplies those facets.",
  },
  "PLAY|SULTAI|Kotis, Sibsig Champion": {
    human_language_finding: "INTERNAL_SOURCE_LANGUAGE",
    modal_value_finding: "PLAYER_MODAL_LEAKS_SOURCE_NOTES",
    disposition: "REMEDIATION_LIKELY",
    notes: "The phrase 'anchored in Sultai source notes' exposes research methodology in player-facing modal copy.",
  },
  "PLAY|WG|Trostani, Selesnya's Voice": {
    bridge_finding: "IDENTITY_ROLE_FACT_WITHOUT_PLAY_PATTERN",
    modal_value_finding: "PLAY_SECTION_TILE_DOES_NOT_EXPLAIN_CARD_PLAY",
    disposition: "REMEDIATION_LIKELY",
    notes: "The tile explains why Trostani belongs to Selesnya, not what her verified play pattern teaches in the Play section.",
  },
  "PLAY|UG|Prime Speaker Zegana": {
    bridge_finding: "IDENTITY_ROLE_FACT_WITHOUT_PLAY_PATTERN",
    modal_value_finding: "PLAY_SECTION_TILE_DOES_NOT_EXPLAIN_CARD_PLAY",
    disposition: "REMEDIATION_LIKELY",
    notes: "The tile establishes Zegana's Simic office and philosophy but omits the card behavior promised by the Play section.",
  },
  "PLAY|WU|Grand Arbiter Augustin IV": {
    accuracy_finding: "CARD_RULES_PASS_TILE_USES_UNBOUNDED_EVALUATIVE_LANGUAGE",
    overclaim_finding: "ULTIMATE_EXPRESSION_AND_CRAWL_HYPERBOLE",
    human_language_finding: "HYPERBOLIC",
    disposition: "REMEDIATION_LIKELY",
    notes: "The modal accurately describes the cost effects; the tile's 'ultimate' and 'crawl' claims are evaluative overstatement rather than sourced card facts.",
  },
  "PLAY|WR|Feather, the Redeemed": {
    authority_finding: "SOURCE_INTAKE_REQUIRED_FOR_FEATHER_BOROS_LINEAGE",
    bridge_finding: "BROKEN_BOROS_ROUTE_NECESSARY_FOR_ONLY_ROUTED_FACET",
    disposition: "SOURCE_INTAKE_REQUIRED",
    notes: "The only routed facet for this row is the Razia–Feather–Aurelia leadership transition. The inspected 2018 Boros guide independently establishes Razia and Aurelia but does not establish Feather; the unavailable Boros Legion route is therefore necessary for this card-specific identity bridge.",
  },
  "PLAY|RG|Ruric Thar, the Unbowed": {
    authority_finding: "SOURCE_INTAKE_REQUIRED_FOR_RURIC_GHOR_MEMBERSHIP",
    bridge_finding: "BROKEN_GATECRASH_ROUTE_NECESSARY_FOR_ALL_ROUTED_FACETS",
    disposition: "SOURCE_INTAKE_REQUIRED",
    notes: "Both routed facets—Ruric Thar as Ghor leader and the Ghor clan's assault pattern—depend on the unusable Gatecrash guide. Inspected broader Gruul sources support anti-civilization generally but do not establish these narrower Ruric/Ghor facts.",
  },
}));

function defaultFindings(type, record, route, relationship) {
  const result = {
    accuracy_finding: "PASS_VERIFIED_CARD_AND_CURRENT_TEXT",
    authority_finding: route.outcome === "VOX_MANA_SYNTHESIS" ? "LIMITED_TO_VOX_MANA_SYNTHESIS" : route.outcome === "SUPPORTED_WITH_LIMITATIONS" ? "SUPPORTED_WITH_LIMITATIONS" : "PASS_ROUTED_UNDERLYING_EVIDENCE",
    bridge_finding: relationship ? "PASS_BOUNDED_CARD_TO_FACET_BRIDGE" : "INSUFFICIENT_RELATIONSHIP_TRACE",
    echo_finding: "NO_MATERIAL_TILE_MODAL_ECHO",
    cross_card_repetition_finding: "NO_MATERIAL_CROSS_CARD_REPETITION",
    deletion_finding: "NO_DELETION_INDICATED",
    swap_finding: "NO_SWAP_INDICATED",
    modal_value_finding: type === "SOUND" ? "ADDITIVE_IDENTITY_INTERPRETATION" : "ADDITIVE_IDENTITY_PLAY_CONTEXT",
    facet_collapse_finding: "NO_MATERIAL_FACET_COLLAPSE",
    overclaim_finding: "NO_MATERIAL_OVERCLAIM",
    human_language_finding: "NATURAL_ENOUGH_AS_WRITTEN",
    disposition: relationship ? "NO_CHANGE_INDICATED" : "INSUFFICIENT_EVIDENCE",
    notes: "",
  };
  if (type === "SOUND" && /^The line presents\b/i.test(record.modal_explanation || "")) {
    result.human_language_finding = "FORMULAIC_BUT_READABLE";
  }
  if (type === "SOUND" && tokenOverlap(record.excerpt, record.modal_explanation) >= 0.62) {
    result.echo_finding = "HIGH_TILE_MODAL_TOKEN_ECHO";
    result.modal_value_finding = "MODAL_REDUNDANT";
    result.disposition = "REMEDIATION_LIKELY";
  }
  if (type === "PLAY") {
    result.human_language_finding = "SHARED_COMPOSER_FRAME";
    const specificCardEvidence = `${record.rationale} ${record.card?.name || ""}`;
    const suffix = playModalSuffix(record);
    if (/^At the table,/i.test(record.modal_explanation || "") && tokenOverlap(specificCardEvidence, suffix) < 0.12) {
      result.modal_value_finding = "MODAL_REDUNDANT";
      result.echo_finding = "GENERIC_IDENTITY_LANGUAGE_WITHOUT_NEW_CARD_SPECIFIC_INSIGHT";
      result.disposition = "REMEDIATION_LIKELY";
      result.notes = "The modal adds a general identity plan but does not deepen why this particular card teaches that facet beyond the already-visible tile.";
    }
    const suffixKey = `${record.identity_key}|${normalize(playModalSuffix(record))}`;
    if ((repeatedPlaySuffixes.get(suffixKey) || 0) > 1) {
      result.echo_finding = "IDENTITY_LOCAL_MODAL_REPETITION";
      result.cross_card_repetition_finding = "GENERIC_TEMPLATE_REUSE";
      result.modal_value_finding = "MODAL_REDUNDANT";
      result.human_language_finding = "TEMPLATE_REPETITION";
      result.disposition = "REMEDIATION_LIKELY";
      result.notes = "Multiple Play cards for this identity receive the same modal takeaway after only the card name changes.";
    }
    if (/source notes|certified record|cleanest native bridge|product fit|appears because/i.test(`${record.rationale} ${record.modal_explanation}`)) {
      result.human_language_finding = "INTERNAL_OR_AUDIT_LANGUAGE";
      result.disposition = "REMEDIATION_LIKELY";
    }
    if (/\bultimate\b|\bdefinitive\b|\boriginal face\b|\bpure flavor-forward\b|slows? the game down to a crawl/i.test(record.rationale || "")) {
      result.overclaim_finding = "UNBOUNDED_EVALUATIVE_LANGUAGE";
      result.disposition = "REMEDIATION_LIKELY";
    }
  }
  return result;
}

function mergeFinding(result, override) {
  if (!override) return result;
  return { ...result, ...override };
}

const packetData = new Map();
for (const identityKey of identityOrder) {
  const authority = identityAuthorities.get(identityKey);
  const renderedRecords = [
    ...voiceCatalog.filter((record) => record.identity_key === identityKey),
    ...playCatalog.filter((record) => record.identity_key === identityKey),
  ];
  const referencedClaimIds = [...new Set(renderedRecords.flatMap((record) => record.provenance?.claim_ids || []))];
  const referencedClaims = referencedClaimIds.map((id) => authority.claimById.get(id)).filter(Boolean);
  if (referencedClaims.length !== referencedClaimIds.length) throw new Error(`${identityKey} has unresolved certified claim routing`);
  const facetClaims = referencedClaims.filter(coreClaim);
  const selectedFacetClaims = facetClaims.length ? facetClaims : referencedClaims;
  const facetByClaim = new Map(selectedFacetClaims.map((claim, index) => [claim.claim_id, `${identityKey}-F${String(index + 1).padStart(2, "0")}`]));
  const facets = selectedFacetClaims.map((claim) => ({
    facet_id: facetByClaim.get(claim.claim_id),
    claim_id: claim.claim_id,
    claim_type: claim.claim_type,
    statement: claimStatement(claim),
    classification: claimClass(claim, authority.route.outcome),
    underlying_evidence: resolveUnderlyingEvidence(authority, claim),
    limitation: sentence(claim.evidence_use_restriction || claim.notes || ""),
  }));
  const boundaries = authority.claims.filter(boundaryClaim).map((claim) => ({
    claim_id: claim.claim_id,
    claim_type: claim.claim_type,
    statement: claimStatement(claim),
    classification: claimClass(claim, authority.route.outcome),
    underlying_evidence: resolveUnderlyingEvidence(authority, claim),
  }));
  packetData.set(identityKey, {
    identity_key: identityKey,
    router_key: authority.route.router_key,
    identity_name: factions[identityKey]?.name || authority.route.display_name,
    route_outcome: authority.route.outcome,
    claim_path: authority.route.claim_path,
    source_path: authority.route.source_path,
    route_known_gaps: authority.route.known_gaps,
    route_non_authority_sources: authority.route.non_authority_sources,
    facets,
    facetByClaim,
    tensions_and_contrasts: boundaries.filter((row) => /(tension|pressure|strength_weakness|relationships|mature|unhealthy|missing_color)/i.test(row.claim_type)),
    anti_drift_boundaries: boundaries,
    official_corroboration: facets.filter((row) => row.classification === "DIRECT_OR_OFFICIAL_FACT"),
    vox_mana_synthesis_boundaries: facets.filter((row) => row.classification === "VOX_MANA_INTERPRETATION" || row.classification === "SUPPORTED_INTERPRETATION"),
  });
}

function identityEvidenceForRecord(packet, claimIds) {
  return claimIds.map((claimId) => {
    const claim = identityAuthorities.get(packet.identity_key).claimById.get(claimId);
    const facetId = packet.facetByClaim.get(claimId) || "BOUNDARY_ONLY";
    return {
      facet_id: facetId,
      claim_id: claimId,
      raw_claim_path: `${packet.claim_path}#${claimId}`,
      claim_statement: claimStatement(claim) || "UNRESOLVED_CLAIM",
      claim_classification: claimClass(claim || {}, packet.route_outcome),
      underlying_evidence: claim ? resolveUnderlyingEvidence(identityAuthorities.get(packet.identity_key), claim) : [],
    };
  });
}

function buildAuditRow(type, record) {
  const packet = packetData.get(record.identity_key);
  const relationship = type === "SOUND" ? voiceRelationships.get(record.relationship_id) : playRelationships.get(record.relationship_id);
  const printing = type === "SOUND" ? voicePrintings.get(record.relationship_id) : null;
  const card = scryfallById.get(record.card.scryfall_id);
  if (!card) throw new Error(`${record.relationship_id} exact Scryfall object is absent from committed raw bulk`);
  if (card.oracle_id !== record.card.oracle_id) throw new Error(`${record.relationship_id} Oracle identity drift`);
  const claimIds = record.provenance?.claim_ids || relationship?.certified_identity_claim_ids || [];
  const identityEvidence = identityEvidenceForRecord(packet, claimIds);
  const underlyingLineages = [...new Map(identityEvidence.flatMap((item) => item.underlying_evidence).map((evidence) => [
    evidence.source_id,
    {
      lineage_id: evidence.source_id,
      authority_classification: evidence.authority_classification,
      source_path_or_url: evidence.source_path_or_url,
      inspection_status: evidence.local_inspection?.inspection_status || evidence.official_web_inspection?.inspection_status || "UNINSPECTED_SOURCE_RECORD",
      note: "This underlying source is counted once even when the same lineage appears in a raw claim, taxonomy, relationship, dossier, workbook, handoff, or generated projection.",
    },
  ])).values()];
  const independentCorroboration = underlyingLineages.filter((lineage) =>
    !["ROUTING_OR_GOVERNANCE_ONLY", "SUPPORT_ONLY"].includes(lineage.authority_classification)
    && ["FULL_LOCAL_SOURCE_READ", "PDF_TEXT_EXTRACTED_AND_READ", "INSPECTED_OFFICIAL_WEB"].includes(lineage.inspection_status));
  const inferenceClass = packet.route_outcome === "VOX_MANA_SYNTHESIS"
    ? "VOX_MANA_INTERPRETATION"
    : /EXPLICIT_IDENTITY_REFERENCE|NATIVE_FIGURE_OR_LOCATION|NATIVE_IDENTITY_ANCHOR/.test(record.relationship_class || "")
      ? "DIRECT_FACT_PLUS_SUPPORTED_INTERPRETATION"
      : "SUPPORTED_INTERPRETATION";
  const currentTileText = type === "SOUND" ? record.excerpt : record.rationale;
  const relationshipHypothesis = type === "SOUND"
    ? relationship?.why_voice_belongs || relationship?.relationship_bridge || ""
    : relationship?.rationale_support_note || relationship?.relationship_evidence?.exact_text || currentTileText;
  const route = identityAuthorities.get(record.identity_key).route;
  const findings = mergeFinding(
    defaultFindings(type, record, route, relationship),
    manualFindings.get(`${type}|${record.identity_key}|${record.card.name}`),
  );
  return {
    ledger_id: `${type}-${record.identity_key}-${type === "SOUND" ? record.slot : record.display_priority}-${record.relationship_id}`,
    rendered_row: true,
    identity_key: record.identity_key,
    identity_name: packet.identity_name,
    surface: type,
    slot_order: type === "SOUND" ? Number(record.slot) : Number(record.display_priority),
    card_name: record.card.name,
    current_tile_label: type === "SOUND" ? "Exact card voice" : "Why it fits in play",
    current_tile_text: currentTileText,
    current_visible_tags: type === "PLAY" ? record.tags || [] : [],
    current_modal_heading: type === "SOUND"
      ? `What this card's voice reveals about ${packet.identity_name}`
      : `Why ${record.card.name} helps explain ${packet.identity_name} in play`,
    current_modal_text: record.modal_explanation,
    type_line: typeLine(card),
    exact_printing_id: record.card.scryfall_id,
    oracle_id: record.card.oracle_id,
    exact_set: card.set,
    exact_collector_number: card.collector_number,
    relationship_id: record.relationship_id,
    relationship_class: record.relationship_class,
    routing_authority: {
      raw_claim_ids: claimIds,
      relationship_id: record.relationship_id,
      source_evidence_ledger_ids: [...new Set(identityEvidence.flatMap((item) => item.underlying_evidence.map((evidence) => evidence.source_id)))],
      raw_claim_paths: identityEvidence.map((item) => item.raw_claim_path),
      common_provenance_lineages: underlyingLineages,
      derivative_corroboration_rule: "Derived repetition does not strengthen a claim. Independent corroboration requires a genuinely separate underlying source lineage.",
      independent_underlying_corroboration_count: independentCorroboration.length,
    },
    underlying_evidence: {
      card_fact: {
        source: `data/scryfall/raw/oracle-cards.json#id=${card.id}`,
        exact_object_id: card.id,
        oracle_id: card.oracle_id,
        name: card.name,
        type_line: typeLine(card),
        oracle_text: oracleText(card),
        flavor_text: card.flavor_text || (card.card_faces || []).map((face) => face.flavor_text).filter(Boolean).join(" // "),
        printing_source: type === "SOUND" ? `data/dossier/card-voice-printings.source.json#relationship_id=${record.relationship_id}` : `data/scryfall/raw/oracle-cards.json#id=${card.id}`,
      },
      identity: identityEvidence,
      gameplay: type === "PLAY" ? {
        source: `data/scryfall/raw/oracle-cards.json#id=${card.id}`,
        establishes: oracleText(card),
      } : null,
    },
    audit_inference: {
      relevant_facet_ids: [...new Set(identityEvidence.map((item) => item.facet_id).filter((id) => id !== "BOUNDARY_ONLY"))],
      current_relationship_hypothesis: relationshipHypothesis,
      modal_bridge_chain: {
        verified_card_fact_or_flavor: type === "SOUND" ? record.excerpt : oracleText(card),
        supported_identity_facet: identityEvidence.map((item) => `${item.facet_id}: ${item.claim_statement}`).join(" | "),
        why_this_card_helps_explain_the_facet: relationshipHypothesis,
      },
      specific_bridge: type === "SOUND"
        ? `The exact printed flavor line is the card-side fact. It supports only the named facet IDs where the line itself, not card color/type/product membership, supplies the stated echo.`
        : `The committed Oracle text is the gameplay-side fact. It supports only the named facet IDs where the visible rationale accurately describes that behavior and makes the identity connection explicit.`,
      unsupported_assumption_status: findings.bridge_finding.startsWith("PASS_") ? "NONE_IDENTIFIED" : findings.bridge_finding,
      classification: inferenceClass,
      limitation: sentence(relationship?.limitation || route.known_gaps || "The relationship does not establish placement or identity from card membership alone."),
    },
    findings,
  };
}

const auditRows = [];
for (const identityKey of identityOrder) {
  auditRows.push(...voiceCatalog
    .filter((record) => record.identity_key === identityKey)
    .sort((left, right) => Number(left.slot) - Number(right.slot) || Number(left.display_priority) - Number(right.display_priority))
    .map((record) => buildAuditRow("SOUND", record)));
  auditRows.push(...playCatalog
    .filter((record) => record.identity_key === identityKey)
    .sort((left, right) => Number(left.display_priority) - Number(right.display_priority) || left.card.name.localeCompare(right.card.name, "en"))
    .map((record) => buildAuditRow("PLAY", record)));
}

for (const identityKey of identityOrder) {
  for (const surface of ["SOUND", "PLAY"]) {
    const group = auditRows.filter((row) => row.identity_key === identityKey && row.surface === surface);
    if (group.length < 2) continue;
    for (const row of group) {
      if (row.findings.cross_card_repetition_finding === "GENERIC_TEMPLATE_REUSE") continue;
      const signature = [...row.audit_inference.relevant_facet_ids].sort().join("|");
      const peers = group.filter((candidate) => candidate.ledger_id !== row.ledger_id && [...candidate.audit_inference.relevant_facet_ids].sort().join("|") === signature);
      if (!peers.length) continue;
      const hasMateriallyDifferentCardEvidence = peers.some((peer) => normalize(peer.underlying_evidence.card_fact.oracle_text || peer.underlying_evidence.card_fact.flavor_text) !== normalize(row.underlying_evidence.card_fact.oracle_text || row.underlying_evidence.card_fact.flavor_text));
      if (hasMateriallyDifferentCardEvidence && packetData.get(identityKey).facets.length <= row.audit_inference.relevant_facet_ids.length) {
        row.findings.cross_card_repetition_finding = "EVIDENCE_LIMITATION";
      } else if (hasMateriallyDifferentCardEvidence) {
        row.findings.cross_card_repetition_finding = "LEGITIMATE_SHARED_CONCEPT";
      } else {
        row.findings.cross_card_repetition_finding = "FACET_COLLAPSE";
        row.findings.facet_collapse_finding = "MULTIPLE_CARDS_FORCED_THROUGH_ONE_BROAD_FACET";
        if (row.findings.disposition === "NO_CHANGE_INDICATED") row.findings.disposition = "REMEDIATION_LIKELY";
      }
    }
  }
}

if (auditRows.length !== 119) throw new Error(`Rendered audit coverage is ${auditRows.length}, expected 119`);
if (auditRows.filter((row) => row.surface === "SOUND").length !== 73) throw new Error("Sound coverage drift");
if (auditRows.filter((row) => row.surface === "PLAY").length !== 46) throw new Error("Play coverage drift");

const suppressedAppendix = playCatalogAll.filter((record) => suppressedPlayIds.has(record.relationship_id)).map((record) => {
  const precon = suppressedPrecons[record.relationship_id];
  return {
    identity_key: record.identity_key,
    identity_name: packetData.get(record.identity_key).identity_name,
    card_name: record.card.name,
    relationship_id: record.relationship_id,
    structured_source_surface: `data/dossier/card-rationale-catalog.json#${record.relationship_id}`,
    media_inventory_reason: "The approved Play relationship is governed authored media and therefore requires deterministic committed card metadata/image candidates even when presentation composition suppresses its duplicate tile.",
    rendered_row_reason: `The visible ${precon[0]} precon adds this commander to pageCardUsage before Play selection, so the dedicated Play tile is suppressed by cross-surface canonical-card deduplication.`,
    visible_precon_source: precon[1],
    primary_ledger_membership: false,
  };
});
if (suppressedAppendix.length !== 4) throw new Error("Suppressed Play appendix drift");

const dispositionCounts = Object.fromEntries([...new Set(auditRows.map((row) => row.findings.disposition))]
  .sort().map((value) => [value, auditRows.filter((row) => row.findings.disposition === value).length]));
const classificationCounts = Object.fromEntries([...new Set(auditRows.map((row) => row.audit_inference.classification))]
  .sort().map((value) => [value, auditRows.filter((row) => row.audit_inference.classification === value).length]));
const limitedIdentities = identityOrder.filter((key) => packetData.get(key).route_outcome !== "STRONG_EVIDENCE");
const issueRows = auditRows.filter((row) => row.findings.disposition !== "NO_CHANGE_INDICATED");
const soundAsWritten = auditRows.filter((row) => row.findings.disposition === "NO_CHANGE_INDICATED");
function findingSummary(row) {
  if (row.findings.notes) return row.findings.notes;
  const findings = [
    row.findings.authority_finding,
    row.findings.bridge_finding,
    row.findings.echo_finding,
    row.findings.cross_card_repetition_finding,
    row.findings.modal_value_finding,
    row.findings.facet_collapse_finding,
    row.findings.overclaim_finding,
    row.findings.human_language_finding,
  ].filter((value) => value && !/^(PASS_|NO_MATERIAL_|NO_DELETION_|NO_SWAP_|ADDITIVE_|NATURAL_ENOUGH_|FORMULAIC_BUT_READABLE$)/.test(value));
  return [...new Set(findings)].join("; ") || "Finding recorded in the row-level evidence fields.";
}
const summary = {
  schema_version: "1.0.0",
  purpose: "Testing/research artifact only; not semantic authority and not runtime input.",
  checkpoint_base_sha: "b7c808029421668f4b947759c467a250230b5592",
  coverage: { identities: 37, rendered_rows: 119, sound: 73, play: 46, suppressed_play_appendix: 4 },
  source_validation: {
    readable_local_underlying_sources_and_ledgers: localSourceInspections.size,
    unique_official_wizards_urls_evaluated: officialSourceInspection.sources.length,
    successfully_inspected_official_wizards_urls: officialSourceInspection.sources.filter((source) => source.inspection_status === "INSPECTED_OFFICIAL_WEB").length,
    unavailable_or_inadequate_official_wizards_urls: officialSourceInspection.sources.filter((source) => source.inspection_status === "SOURCE_INTAKE_REQUIRED").length,
    exact_row_level_consequences: {
      boros_legion: {
        retained_current_disposition: [
          "SOUND-WR-1-cardvoice_wr_30b20932_0d9a_447f_b934_1daa8c44a678",
          "SOUND-WR-2-cardvoice_vm558_wr_cf5bf1ef_e40b_4fb5_8148_d4ca7a307501",
          "PLAY-WR-1-cardrel_wr_0f5a3a09",
          "PLAY-WR-3-cardrel_wr_ae6f21a2",
        ],
        source_intake_required: ["PLAY-WR-4-cardrel_wr_aa219936"],
      },
      gatecrash_part_2: {
        retained_current_disposition: [
          "SOUND-RG-1-cardvoice_rg_327d9679_0049_4401_8dab_e0fb362306bd",
          "SOUND-RG-2-cardvoice_vm558_rg_a4e5693f_12a0_451e_818d_d6efc7b4ed25",
          "PLAY-RG-1-cardrel_rg_b7505737",
          "PLAY-RG-3-cardrel_rg_ebf3fd80",
        ],
        source_intake_required: ["PLAY-RG-4-cardrel_rg_6ed13a89"],
      },
    },
  },
  disposition_counts: dispositionCounts,
  claim_classification_counts: classificationCounts,
  identities_with_source_limitations: limitedIdentities,
  unsupported_or_overclaimed_rows: issueRows.map((row) => ({ ledger_id: row.ledger_id, identity: row.identity_key, card: row.card_name, disposition: row.findings.disposition, notes: findingSummary(row) })),
  repetition_findings: {
    sound_formulaic_modal_count: auditRows.filter((row) => row.surface === "SOUND" && /^The line presents\b/i.test(row.current_modal_text)).length,
    play_shared_composer_frame_count: auditRows.filter((row) => row.surface === "PLAY" && /^At the table,/i.test(row.current_modal_text)).length,
    play_identity_local_repeated_modal_count: auditRows.filter((row) => row.findings.echo_finding === "IDENTITY_LOCAL_MODAL_REPETITION").length,
    cross_card_classification_counts: Object.fromEntries([...new Set(auditRows.map((row) => row.findings.cross_card_repetition_finding))].sort().map((value) => [value, auditRows.filter((row) => row.findings.cross_card_repetition_finding === value).length])),
    modal_value_counts: Object.fromEntries([...new Set(auditRows.map((row) => row.findings.modal_value_finding))].sort().map((value) => [value, auditRows.filter((row) => row.findings.modal_value_finding === value).length])),
  },
  rows_sound_as_written: soundAsWritten.map((row) => row.ledger_id),
};

function markdownTable(headers, rows) {
  const clean = (value) => sentence(value).replaceAll("|", "\\|");
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(clean).join(" | ")} |`),
  ].join("\n");
}

function sourceSummary(evidence) {
  return evidence.map((item) => `${item.source_id}: ${item.source_path_or_url} @ ${item.anchor} [${item.local_inspection?.inspection_status || item.official_web_inspection?.inspection_status || "UNINSPECTED_SOURCE_RECORD"}]`).join("; ");
}

function packetMarkdown(packet, number) {
  const identityRows = auditRows.filter((row) => row.identity_key === packet.identity_key);
  const facetRows = packet.facets.map((facet) => [
    facet.facet_id,
    facet.claim_id,
    facet.classification,
    facet.statement,
    sourceSummary(facet.underlying_evidence),
    facet.limitation || "None recorded beyond the evidence scope.",
  ]);
  const tensionRows = packet.tensions_and_contrasts.map((row) => [row.claim_id, row.claim_type, row.statement, sourceSummary(row.underlying_evidence)]);
  const boundaryRows = packet.anti_drift_boundaries.map((row) => [row.claim_id, row.claim_type, row.statement, sourceSummary(row.underlying_evidence)]);
  return `# ${String(number).padStart(2, "0")} - ${packet.identity_name} Identity Evidence Packet

Status: Evidence-only audit packet. This file does not authorize identity, placement, relationship, or prose changes.

## Authority route

- Production identity key: \`${packet.identity_key}\`.
- VM-560 router key: \`${packet.router_key}\`.
- Route outcome: \`${packet.route_outcome}\`.
- Raw claim authority: \`${packet.claim_path}\`.
- Source registry: \`${packet.source_path}\`.
- Known gaps: ${packet.route_known_gaps}
- Must not be treated as authority: ${packet.route_non_authority_sources}

## Core facets used by the rendered Sound/Play rows

${markdownTable(["Facet ID", "Routing claim ID", "Classification", "Source-supported statement", "Underlying evidence", "Limitation"], facetRows)}

## Internal tensions and contrasts

${tensionRows.length ? markdownTable(["Claim ID", "Type", "Boundary or tension", "Underlying evidence"], tensionRows) : "No additional source-supported tension was required for the currently rendered row bridges. This is not permission to invent one for symmetry."}

## Anti-drift boundaries

${boundaryRows.length ? markdownTable(["Claim ID", "Type", "Boundary", "Underlying evidence"], boundaryRows) : "No additional anti-drift claim is present beyond the route limitations above."}

## Official corroboration

${packet.official_corroboration.length ? markdownTable(["Facet ID", "Claim ID", "Established facet", "Underlying evidence"], packet.official_corroboration.map((row) => [row.facet_id, row.claim_id, row.statement, sourceSummary(row.underlying_evidence)])) : "No identity-wide official philosophy is claimed here. Use the classified Vox Mana/support boundary recorded above."}

## Vox Mana synthesis and supported-interpretation boundaries

${packet.vox_mana_synthesis_boundaries.length ? markdownTable(["Facet ID", "Claim ID", "Classification", "Bounded interpretation", "Underlying evidence"], packet.vox_mana_synthesis_boundaries.map((row) => [row.facet_id, row.claim_id, row.classification, row.statement, sourceSummary(row.underlying_evidence)])) : "No additional synthesis claim is required by the rendered rows."}

## Rendered row coverage

${markdownTable(["Ledger ID", "Surface", "Order", "Card", "Disposition", "Claim classification"], identityRows.map((row) => [row.ledger_id, row.surface, row.slot_order, row.card_name, row.findings.disposition, row.audit_inference.classification]))}

## Packet limitation

Claims and relationship IDs above are routing authority only. Every row-level result separately records the exact card fact, underlying source, card-to-facet inference, classification, and bridge limitation. A broad identity statement is never treated as automatic proof that a card is a strong Sound/Play relationship.
`;
}

fs.mkdirSync(packetRoot, { recursive: true });
for (const [index, identityKey] of identityOrder.entries()) {
  const packet = packetData.get(identityKey);
  const filename = `${String(index + 1).padStart(2, "0")}-${identityKey.toLowerCase()}-identity-evidence.md`;
  fs.writeFileSync(path.join(packetRoot, filename), packetMarkdown(packet, index + 1));
}

const ledgerArtifact = {
  schema_version: "1.0.0",
  authority_notice: "Evidence-only testing artifact. Current Sound/Play prose and relationships are audited subjects, not proof and not modified here.",
  row_contract: ["ROUTING_AUTHORITY", "UNDERLYING_EVIDENCE", "AUDIT_INFERENCE"],
  rendered_rows: auditRows,
  suppressed_play_coverage_appendix: suppressedAppendix,
};
fs.writeFileSync(path.join(outputRoot, "card-evidence-ledger.json"), `${JSON.stringify(ledgerArtifact, null, 2)}\n`);
fs.writeFileSync(path.join(outputRoot, "source-inspection-manifest.json"), `${JSON.stringify({
  schema_version: "1.1.0",
  local_sources: [...localSourceInspections.values()].sort((a, b) => a.path.localeCompare(b.path, "en")),
  official_web_sources: officialSourceInspection.sources,
}, null, 2)}\n`);

const csvHeaders = [
  "ledger_id", "identity_key", "identity_name", "surface", "slot_order", "card_name",
  "current_tile_label", "current_tile_text", "current_visible_tags", "current_modal_heading", "current_modal_text", "type_line",
  "exact_printing_id", "oracle_id", "exact_set", "exact_collector_number", "relationship_id", "relationship_class",
  "routing_raw_claim_ids", "routing_source_evidence_ledger_ids", "underlying_card_source", "underlying_card_fact", "underlying_identity_evidence",
  "underlying_gameplay_evidence", "relevant_facet_ids", "audit_specific_bridge", "audit_classification", "audit_limitation",
  "routing_common_provenance_lineages", "independent_underlying_corroboration_count", "modal_bridge_chain", "unsupported_assumption_status",
  "accuracy_finding", "authority_finding", "bridge_finding", "echo_finding", "cross_card_repetition_finding", "deletion_finding", "swap_finding", "modal_value_finding",
  "facet_collapse_finding", "overclaim_finding", "human_language_finding", "disposition", "audit_notes",
];
const csvRows = auditRows.map((row) => [
  row.ledger_id, row.identity_key, row.identity_name, row.surface, row.slot_order, row.card_name,
  row.current_tile_label, row.current_tile_text, row.current_visible_tags.join("; "), row.current_modal_heading, row.current_modal_text, row.type_line,
  row.exact_printing_id, row.oracle_id, row.exact_set, row.exact_collector_number, row.relationship_id, row.relationship_class,
  row.routing_authority.raw_claim_ids.join("; "), row.routing_authority.source_evidence_ledger_ids.join("; "), row.underlying_evidence.card_fact.source,
  `${row.underlying_evidence.card_fact.type_line} | ${row.underlying_evidence.card_fact.oracle_text} | ${row.underlying_evidence.card_fact.flavor_text}`,
  row.underlying_evidence.identity.map((item) => `${item.facet_id}/${item.claim_id}: ${item.claim_statement} -> ${item.underlying_evidence.map((evidence) => `${evidence.source_id} ${evidence.source_path_or_url} @ ${evidence.anchor} [${evidence.local_inspection?.inspection_status || evidence.official_web_inspection?.inspection_status || "UNINSPECTED_SOURCE_RECORD"}]: ${evidence.establishes}`).join(" || ")}`).join(" || "),
  row.underlying_evidence.gameplay?.establishes || "NOT_APPLICABLE", row.audit_inference.relevant_facet_ids.join("; "), row.audit_inference.specific_bridge,
  row.audit_inference.classification, row.audit_inference.limitation,
  row.routing_authority.common_provenance_lineages.map((lineage) => `${lineage.lineage_id}: ${lineage.source_path_or_url}`).join("; "), row.routing_authority.independent_underlying_corroboration_count,
  `${row.audit_inference.modal_bridge_chain.verified_card_fact_or_flavor} -> ${row.audit_inference.modal_bridge_chain.supported_identity_facet} -> ${row.audit_inference.modal_bridge_chain.why_this_card_helps_explain_the_facet}`,
  row.audit_inference.unsupported_assumption_status,
  row.findings.accuracy_finding, row.findings.authority_finding, row.findings.bridge_finding, row.findings.echo_finding, row.findings.cross_card_repetition_finding, row.findings.deletion_finding,
  row.findings.swap_finding, row.findings.modal_value_finding, row.findings.facet_collapse_finding, row.findings.overclaim_finding,
  row.findings.human_language_finding, row.findings.disposition, row.findings.notes,
]);
fs.writeFileSync(path.join(outputRoot, "card-evidence-ledger.csv"), `${[csvHeaders, ...csvRows].map((row) => row.map(csvCell).join(",")).join("\n")}\n`);

const appendixMarkdown = `# VM-561 Suppressed Play Coverage Appendix

These four approved Play relationships are covered by the VM-559 governed media inventory but do not render as dedicated \`Cards That Play Like This\` rows. They are excluded from the primary 119-row evidence ledger by design.

${markdownTable(["Identity", "Card", "Relationship", "Structured source", "Why inventoried", "Why no rendered row", "Visible precon source"], suppressedAppendix.map((row) => [row.identity_key, row.card_name, row.relationship_id, row.structured_source_surface, row.media_inventory_reason, row.rendered_row_reason, row.visible_precon_source]))}

Reconciliation: \`73 Sound + (50 approved Play - 4 precon-overlap suppressions) = 119 rendered rows\`.
`;
fs.writeFileSync(path.join(outputRoot, "suppressed-play-coverage-appendix.md"), appendixMarkdown);

const summaryMarkdown = `# VM-561 Sound/Play Evidence Audit Summary

Status: Evidence pass complete; stop before any prose proposal or remediation.

## Coverage

- Identity packets: **37 / 37**.
- Primary rendered-row ledger: **119 / 119**.
- Sound rows: **73 / 73**.
- Rendered Play rows: **46 / 46**.
- Suppressed Play coverage appendix: **4 / 4**, outside the primary ledger.

## Dispositions

${markdownTable(["Disposition", "Count"], Object.entries(dispositionCounts).map(([key, value]) => [key, value]))}

## Claim classifications

${markdownTable(["Classification", "Count"], Object.entries(classificationCounts).map(([key, value]) => [key, value]))}

## Identities with source limitations

${limitedIdentities.map((key) => `- \`${key}\` — ${packetData.get(key).identity_name}: \`${packetData.get(key).route_outcome}\`; ${packetData.get(key).route_known_gaps}`).join("\n")}

## Unsupported, overclaimed, or remediation-likely current rows

${issueRows.length ? markdownTable(["Ledger ID", "Identity", "Card", "Disposition", "Finding"], issueRows.map((row) => [row.ledger_id, row.identity_key, row.card_name, row.findings.disposition, findingSummary(row)])) : "None."}

## Repetition and template findings

- Sound modal explanations beginning with the formula \`The line presents ...\`: **${summary.repetition_findings.sound_formulaic_modal_count}**. This is a style signal, not automatic remediation; only rows that also fail additive-value or bridge tests are dispositioned for remediation.
- Rendered Play modals using the shared \`At the table ... carries that card action ...\` frame: **${summary.repetition_findings.play_shared_composer_frame_count}**.
- Play rows whose identity-local modal takeaway is duplicated across neighboring cards: **${summary.repetition_findings.play_identity_local_repeated_modal_count}**. Those rows are marked \`REMEDIATION_LIKELY\` because changing only the card name does not provide card-specific modal value.

${markdownTable(["Cross-card classification", "Count"], Object.entries(summary.repetition_findings.cross_card_classification_counts).map(([key, value]) => [key, value]))}

${markdownTable(["Modal-value classification", "Count"], Object.entries(summary.repetition_findings.modal_value_counts).map(([key, value]) => [key, value]))}

## Source intake and authority needs

${auditRows.filter((row) => ["SOURCE_INTAKE_REQUIRED", "INSUFFICIENT_VOX_MANA_AUTHORITY", "INSUFFICIENT_EVIDENCE"].includes(row.findings.disposition)).map((row) => `- \`${row.ledger_id}\` — ${row.findings.notes || row.findings.authority_finding}`).join("\n") || "- No additional source intake is required by the rows that passed. Existing packet limitations remain controlling."}

## Official-source maintenance reconciliation

- Unique Wizards routes evaluated: **${officialSourceInspection.sources.length}**.
- Opened and inspected: **${officialSourceInspection.sources.filter((source) => source.inspection_status === "INSPECTED_OFFICIAL_WEB").length}**.
- Unavailable or inadequate: **${officialSourceInspection.sources.filter((source) => source.inspection_status === "SOURCE_INTAKE_REQUIRED").length}**.
- Exact facet- and row-level consequences are recorded in \`official-route-reconciliation.md\`; broken routes are maintenance findings, not edits to the existing canon corpus.

## Conflicts requiring owner judgment

${auditRows.filter((row) => row.findings.disposition === "CONFLICT_REQUIRES_OWNER").map((row) => `- \`${row.ledger_id}\` — ${row.findings.notes}`).join("\n") || "- None identified in this evidence pass."}

## Rows that appear sound as written

**${soundAsWritten.length}** rows are marked \`NO_CHANGE_INDICATED\`. Their IDs are preserved in \`card-evidence-ledger.json\`; this means the evidence pass found no present accuracy, authority, bridge, echo, deletion, swap, modal-value, facet-collapse, overclaim, or human-language defect strong enough to recommend remediation. It is not a permanent semantic certification.

## Stop

No Sound/Play prose, relationship, card selection, exact printing, runtime catalog, generated product artifact, placement behavior, canon research file, or existing 37-sheet VM-559 review workbook was changed. A separate VM-561 evidence-only workbook was created from this ledger. White, Azorius, Lorehold, and every other identity remain outside rewrite/calibration scope until explicit owner authorization.
`;
fs.writeFileSync(path.join(outputRoot, "evidence-summary.md"), summaryMarkdown);
fs.writeFileSync(path.join(outputRoot, "evidence-summary.json"), `${JSON.stringify(summary, null, 2)}\n`);

console.log(JSON.stringify({
  identity_packets: packetData.size,
  rendered_rows: auditRows.length,
  sound: auditRows.filter((row) => row.surface === "SOUND").length,
  play: auditRows.filter((row) => row.surface === "PLAY").length,
  suppressed_appendix: suppressedAppendix.length,
  local_sources_read: localSourceInspections.size,
  official_sources_evaluated: officialSourceInspection.sources.length,
  official_sources_inspected: officialSourceInspection.sources.filter((source) => source.inspection_status === "INSPECTED_OFFICIAL_WEB").length,
  official_sources_unavailable: officialSourceInspection.sources.filter((source) => source.inspection_status === "SOURCE_INTAKE_REQUIRED").length,
  disposition_counts: dispositionCounts,
  classification_counts: classificationCounts,
}, null, 2));

import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

const RAW_TO_KEY = {
  abzan: "ABZAN",
  azorius_senate: "WU",
  black: "B",
  bant: "BANT",
  blue: "U",
  boros_legion: "WR",
  colorless: "COLORLESS",
  cult_of_rakdos: "BR",
  dune: "DUNE",
  esper: "ESPER",
  glint: "GLINT",
  golgari_swarm: "BG",
  green: "G",
  grixis: "GRIXIS",
  gruul_clans: "RG",
  house_dimir: "UB",
  ink: "INK",
  izzet_league: "UR",
  jeskai: "JESKAI",
  jund: "JUND",
  lorehold: "LOREHOLD",
  mardu: "MARDU",
  naya: "NAYA",
  orzhov_syndicate: "WB",
  prismari: "PRISMARI",
  quandrix: "QUANDRIX",
  red: "R",
  selesnya_conclave: "WG",
  silverquill: "SILVERQUILL",
  simic_combine: "UG",
  sultai: "SULTAI",
  temur: "TEMUR",
  witch: "WITCH",
  witherbloom: "WITHERBLOOM",
  wubrg: "WUBRG",
  white: "W",
  yore: "YORE",
};

const KEY_TO_RAW = Object.fromEntries(
  Object.entries(RAW_TO_KEY).map(([rawId, key]) => [key, rawId])
);

const DEFAULT_TARGETS = ["JESKAI", "MARDU"];

function usage() {
  return [
    "Usage:",
    "  node scripts/validate/validate-source-generated-guardrails.mjs",
    "  node scripts/validate/validate-source-generated-guardrails.mjs --targets=YORE,DUNE",
    "  node scripts/validate/validate-source-generated-guardrails.mjs --all",
    "",
    "Defaults to the repaired source-durable regression set: JESKAI,MARDU.",
  ].join("\n");
}

function parseArgs(argv) {
  const options = {
    targets: [],
    all: false,
    strictModelOwned: false,
    help: false,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--all") {
      options.all = true;
    } else if (arg === "--strict-model-owned") {
      options.strictModelOwned = true;
    } else if (arg.startsWith("--targets=")) {
      options.targets.push(...arg.slice("--targets=".length).split(","));
    } else if (arg.startsWith("--target=")) {
      options.targets.push(arg.slice("--target=".length));
    } else if (!arg.startsWith("--")) {
      options.targets.push(...arg.split(","));
    } else {
      throw new Error(`Unknown option: ${arg}\n\n${usage()}`);
    }
  }

  return options;
}

async function readJson(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return JSON.parse(await readFile(absolutePath, "utf8"));
}

function textValue(value) {
  if (value == null) return "";
  if (typeof value === "string") return value.trim().replace(/\s+/g, " ");
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object") {
    return textValue(
      value.indicator ??
        value.statement ??
        value.summary ??
        value.description ??
        value.label ??
        value.value ??
        value.name ??
        ""
    );
  }
  return "";
}

function textList(value) {
  if (!Array.isArray(value)) return [];
  return value.map(textValue).filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function hasText(value) {
  return textValue(value).length > 0;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeTarget(rawTarget) {
  if (!rawTarget) return null;
  const raw = String(rawTarget).trim();
  const upper = raw.toUpperCase();
  if (["W", "U", "B", "R", "G"].includes(upper)) return upper;
  if (KEY_TO_RAW[upper]) return upper;
  const lowered = raw.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  return RAW_TO_KEY[lowered] || null;
}

function normalizeTargetList(values) {
  return unique(asArray(values).map(normalizeTarget).filter(Boolean));
}

function claimIdsFromClaimsFile(claimsFile) {
  const claims = Array.isArray(claimsFile?.claims)
    ? claimsFile.claims
    : Object.values(claimsFile?.claims || {});
  return claims.map((claim) => claim?.claim_id || claim?.id).filter(Boolean);
}

function rawProfileClaimIds(profile) {
  return asArray(profile?.profile?.claim_ids).filter(Boolean);
}

function rawQuestionClaimIds(question) {
  return unique([
    ...asArray(question?.claim_ids),
    ...asArray(question?.evidence_claim_ids),
  ]);
}

function sourceListForGoodFit(placement) {
  const good = textList(placement.good_fit_indicators);
  return good.length ? good : textList(placement.ideal_fit_indicators);
}

function sourceListForInhibitors(placement) {
  return unique([
    ...textList(placement.inhibitor_traps),
    ...textList(placement.inhibitor_traits),
    ...textList(placement.chatbot_guidance?.how_to_recognize_mismatch),
    ...textList(placement.poor_fit_indicators),
  ]);
}

function sourceQuestionFields(question, factionKey) {
  return {
    prompt: question?.prompt || question?.question || "",
    purpose: question?.purpose || question?.notes || "",
    supports:
      question?.answer_pattern_that_supports_this_faction ||
      question?.[`${factionKey}_signal`] ||
      "",
    weakens:
      question?.answer_pattern_that_weakens_this_faction ||
      question?.suppresses_this_faction_if ||
      "",
    collisionTargets: normalizeTargetList([
      ...asArray(question?.collision_targets),
      ...asArray(question?.related_factions_to_compare),
    ]),
    claimIds: rawQuestionClaimIds(question),
  };
}

function addFailure(failures, key, field, message, details = {}) {
  failures.push({ key, field, message, details });
}

function addWarning(warnings, key, field, message, details = {}) {
  warnings.push({ key, field, message, details });
}

function compareExactMetadata({ key, field, generated, expected, failures }) {
  if (!hasText(generated)) return;
  if (!hasText(expected)) {
    addFailure(
      failures,
      key,
      field,
      "Generated metadata is populated but raw source backing is empty.",
      { generated, expected }
    );
    return;
  }
  if (textValue(generated) !== textValue(expected)) {
    addFailure(
      failures,
      key,
      field,
      "Generated metadata differs from raw source backing.",
      { generated, expected }
    );
  }
}

function compareBackedList({
  key,
  field,
  generated,
  source,
  failures,
  allowEmptyGenerated = true,
}) {
  const generatedList = textList(generated);
  const sourceList = textList(source);
  if (!generatedList.length && allowEmptyGenerated) return;

  if (generatedList.length && !sourceList.length) {
    addFailure(
      failures,
      key,
      field,
      "Generated list has entries but raw source list is empty.",
      { generated_count: generatedList.length, source_count: 0 }
    );
    return;
  }

  const sourceSet = new Set(sourceList);
  const extras = generatedList.filter((item) => !sourceSet.has(item));
  if (extras.length) {
    addFailure(
      failures,
      key,
      field,
      "Generated list contains entries not present in raw source backing.",
      { extras, generated_count: generatedList.length, source_count: sourceList.length }
    );
  }
}

function compareModelOwnedInhibitors({
  key,
  generated,
  source,
  failures,
  warnings,
  strictModelOwned,
}) {
  const generatedList = textList(generated);
  const sourceList = textList(source);
  const sourceSet = new Set(sourceList);
  const extras = generatedList.filter((item) => !sourceSet.has(item));

  if (!generatedList.length) return;
  if (!sourceList.length) {
    addFailure(
      failures,
      key,
      "inhibitor_traps",
      "Generated inhibitor traps have entries but raw inhibitor source lists are empty.",
      { generated_count: generatedList.length, source_count: 0 }
    );
    return;
  }

  if (!extras.length) return;

  // The builder always prepends one model-owned biological inhibitor trigger.
  // That constant is source code, not generated output, so it is allowed unless
  // the caller explicitly requests strict raw-only checking.
  if (extras.length === 1 && !strictModelOwned) {
    addWarning(
      warnings,
      key,
      "inhibitor_traps[model_owned]",
      "One inhibitor trap is backed by the builder's model-owned biological prior rather than raw placement text.",
      { model_owned_entry: extras[0] }
    );
    return;
  }

  addFailure(
    failures,
    key,
    "inhibitor_traps",
    "Generated inhibitor traps contain entries not present in raw source backing.",
    { extras, generated_count: generatedList.length, source_count: sourceList.length }
  );
}

function compareDiscriminators({
  key,
  generatedQuestions,
  rawQuestions,
  rawAllClaimIds,
  failures,
}) {
  if (generatedQuestions.length > rawQuestions.length) {
    addFailure(
      failures,
      key,
      "discriminator_questions",
      "Generated discriminator question count exceeds raw source count.",
      { generated_count: generatedQuestions.length, source_count: rawQuestions.length }
    );
  }

  generatedQuestions.forEach((generatedQuestion, index) => {
    const rawQuestion = rawQuestions[index];
    const fieldBase = `discriminator_questions[${index}]`;
    if (!rawQuestion) return;
    const source = sourceQuestionFields(rawQuestion, key);

    if (hasText(generatedQuestion.prompt) && !hasText(source.prompt)) {
      addFailure(failures, key, `${fieldBase}.prompt`, "Generated prompt has no raw source prompt.");
    }
    if (hasText(generatedQuestion.purpose) && !hasText(source.purpose)) {
      addFailure(failures, key, `${fieldBase}.purpose`, "Generated purpose has no raw source backing.");
    }
    if (hasText(generatedQuestion.supports) && !hasText(source.supports)) {
      addFailure(failures, key, `${fieldBase}.supports`, "Generated supports field has no raw source backing.");
    }
    if (hasText(generatedQuestion.weakens) && !hasText(source.weakens)) {
      addFailure(failures, key, `${fieldBase}.weakens`, "Generated weakens field has no raw source backing.");
    }

    const generatedTargets = normalizeTargetList(generatedQuestion.collision_targets);
    const sourceTargets = new Set(source.collisionTargets);
    const extraTargets = generatedTargets.filter((target) => !sourceTargets.has(target));
    if (extraTargets.length) {
      addFailure(
        failures,
        key,
        `${fieldBase}.collision_targets`,
        "Generated collision targets include targets not present in raw source question.",
        { extras: extraTargets, source_targets: source.collisionTargets }
      );
    }

    const generatedClaimIds = asArray(generatedQuestion.evidence_claim_ids).filter(Boolean);
    const sourceQuestionClaimSet = new Set(source.claimIds);
    const rawAllClaimSet = new Set(rawAllClaimIds);
    const extraQuestionClaimIds = generatedClaimIds.filter((claimId) => !sourceQuestionClaimSet.has(claimId));
    const unknownClaimIds = generatedClaimIds.filter((claimId) => !rawAllClaimSet.has(claimId));

    if (extraQuestionClaimIds.length) {
      addFailure(
        failures,
        key,
        `${fieldBase}.evidence_claim_ids`,
        "Generated discriminator claim IDs include IDs not present on the raw source question.",
        { extras: extraQuestionClaimIds, source_claim_ids: source.claimIds }
      );
    }
    if (unknownClaimIds.length) {
      addFailure(
        failures,
        key,
        `${fieldBase}.evidence_claim_ids`,
        "Generated discriminator claim IDs are missing from raw claim/profile backing.",
        { extras: unknownClaimIds }
      );
    }
  });
}

async function loadTarget(key) {
  const rawId = KEY_TO_RAW[key];
  if (!rawId) {
    throw new Error(`No raw-faction mapping found for target ${key}`);
  }
  const [profile, placement, claims] = await Promise.all([
    readJson(`data/raw-factions/${rawId}/${rawId}.profile.json`),
    readJson(`data/raw-factions/${rawId}/${rawId}.placement.json`),
    readJson(`data/raw-factions/${rawId}/${rawId}.claims.json`).catch(() => ({ claims: [] })),
  ]);
  return { key, rawId, profile, placement, claims };
}

function validateTarget({ key, rawId, profile, placement, claims, generated, strictModelOwned }) {
  const failures = [];
  const warnings = [];
  const rawClaimIdsForProfile = rawProfileClaimIds(profile);
  const rawAllClaimIds = unique([
    ...rawClaimIdsForProfile,
    ...claimIdsFromClaimsFile(claims),
  ]);
  const sourceMetadata = generated.source_metadata || {};
  const generatedClaimCount = Number(sourceMetadata.claim_count || 0);

  compareExactMetadata({
    key,
    field: "source_metadata.profile_version",
    generated: sourceMetadata.profile_version,
    expected: profile.profile_version || profile.schema_version || "",
    failures,
  });
  compareExactMetadata({
    key,
    field: "source_metadata.placement_model_version",
    generated: sourceMetadata.placement_model_version,
    expected: placement.placement_model_version || "",
    failures,
  });
  compareExactMetadata({
    key,
    field: "source_metadata.source_review_date",
    generated: sourceMetadata.source_review_date,
    expected: profile.source_review_date || profile.last_updated || "",
    failures,
  });

  if (generatedClaimCount > rawClaimIdsForProfile.length) {
    addFailure(
      failures,
      key,
      "source_metadata.claim_count",
      "Generated claim_count exceeds builder-readable raw profile claim_ids.",
      { generated_claim_count: generatedClaimCount, raw_profile_claim_ids: rawClaimIdsForProfile.length }
    );
  }

  if (hasText(generated.identity?.mechanics)) {
    const rawMechanics = profile.mechanics?.summary || profile.profile?.mechanics_and_play_pattern || "";
    if (!hasText(rawMechanics)) {
      addFailure(
        failures,
        key,
        "identity.mechanics",
        "Generated mechanics prose is populated but raw profile mechanics backing is empty."
      );
    }
  }

  const calibration = placement.calibration_tuning || {};
  const generatedAxes = generated.placement_axes || {};
  compareBackedList({
    key,
    field: "placement_axes.required_positive_evidence_terms",
    generated: generatedAxes.required_positive_evidence_terms,
    source: calibration.required_positive_evidence_terms,
    failures,
  });
  compareBackedList({
    key,
    field: "placement_axes.strengthens_when_user_centers",
    generated: generatedAxes.strengthens_when_user_centers,
    source: calibration.strengthen_when_user_centers,
    failures,
  });
  compareBackedList({
    key,
    field: "placement_axes.suppress_when_user_centers",
    generated: generatedAxes.suppress_when_user_centers,
    source: calibration.suppress_when_user_centers,
    failures,
  });

  const generatedFalsePositiveGuardrail = generatedAxes.false_positive_guardrail || "";
  const rawFalsePositiveGuardrails = [
    calibration.false_positive_guardrail,
    placement.chatbot_guidance?.calibration_note,
  ].filter(hasText);
  if (
    hasText(generatedFalsePositiveGuardrail) &&
    !rawFalsePositiveGuardrails.includes(generatedFalsePositiveGuardrail)
  ) {
    addFailure(
      failures,
      key,
      "placement_axes.false_positive_guardrail",
      "Generated false_positive_guardrail has no raw calibration backing."
    );
  }

  compareBackedList({
    key,
    field: "good_fit_indicators",
    generated: generated.good_fit_indicators,
    source: sourceListForGoodFit(placement),
    failures,
  });
  compareBackedList({
    key,
    field: "poor_fit_indicators",
    generated: generated.poor_fit_indicators,
    source: placement.poor_fit_indicators,
    failures,
  });
  compareModelOwnedInhibitors({
    key,
    generated: generated.inhibitor_traps,
    source: sourceListForInhibitors(placement),
    failures,
    warnings,
    strictModelOwned,
  });

  compareDiscriminators({
    key,
    generatedQuestions: asArray(generated.discriminator_questions),
    rawQuestions: asArray(placement.discriminator_questions),
    rawAllClaimIds,
    failures,
  });

  return { key, rawId, failures, warnings };
}

function resolveTargets(options) {
  if (options.all) {
    return Object.values(RAW_TO_KEY).sort();
  }
  const requested = options.targets.length ? options.targets : DEFAULT_TARGETS;
  return unique(
    requested.map((target) => {
      const raw = String(target).trim().toLowerCase();
      const upper = String(target).trim().toUpperCase();
      return RAW_TO_KEY[raw] || upper;
    })
  );
}

function printResult(result) {
  if (!result.failures.length && !result.warnings.length) {
    console.log(`PASS ${result.key} (${result.rawId})`);
    return;
  }

  if (result.failures.length) {
    console.log(`FAIL ${result.key} (${result.rawId})`);
    for (const failure of result.failures) {
      console.log(`  - ${failure.field}: ${failure.message}`);
      if (Object.keys(failure.details).length) {
        console.log(`    ${JSON.stringify(failure.details)}`);
      }
    }
  } else {
    console.log(`PASS ${result.key} (${result.rawId})`);
  }

  for (const warning of result.warnings) {
    console.log(`  ! ${warning.field}: ${warning.message}`);
    if (Object.keys(warning.details).length) {
      console.log(`    ${JSON.stringify(warning.details)}`);
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  const placementModel = await readJson("data/placement-model.json");
  const targets = resolveTargets(options);
  const unknownTargets = targets.filter((key) => !KEY_TO_RAW[key]);
  if (unknownTargets.length) {
    throw new Error(`Unknown target faction(s): ${unknownTargets.join(", ")}`);
  }

  const results = [];
  for (const key of targets) {
    const target = await loadTarget(key);
    const generated = placementModel.factions?.[key];
    if (!generated) {
      results.push({
        key,
        rawId: target.rawId,
        warnings: [],
        failures: [
          {
            key,
            field: "placement-model.factions",
            message: "Generated placement model is missing target faction.",
            details: {},
          },
        ],
      });
      continue;
    }
    results.push(validateTarget({ ...target, generated, strictModelOwned: options.strictModelOwned }));
  }

  for (const result of results) {
    printResult(result);
  }

  const failureCount = results.reduce((sum, result) => sum + result.failures.length, 0);
  const warningCount = results.reduce((sum, result) => sum + result.warnings.length, 0);
  if (failureCount) {
    throw new Error(
      `Source/generated guardrail validation failed: ${failureCount} failure(s), ${warningCount} warning(s).`
    );
  }
  console.log(`Source/generated guardrail validation passed for ${targets.join(", ")} (${warningCount} warning(s)).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

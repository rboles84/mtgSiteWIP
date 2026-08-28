const AUTHORITY = [
  "Calibration V3.2 accepted workbook f1a529c6f3d2739bfec15272767f24329b9017f97abf313a32897bb59b9a35e5"
];

function constraint(id, category, field, relation, value, options = {}) {
  return {
    id,
    category,
    field,
    relation,
    value,
    polarity: options.polarity || "include",
    source_text: options.sourceText || "",
    provenance: options.provenance || AUTHORITY,
    ...(options.contextRef ? { context_ref: options.contextRef } : {})
  };
}

function preference(id, category, relation, value, sourceText, options = {}) {
  return {
    id,
    category,
    relation,
    value,
    source_text: sourceText,
    query_effect: options.queryEffect || "preferred_variant",
    status: options.status || "active",
    provenance: options.provenance || AUTHORITY,
    ...(options.threshold ? { threshold: options.threshold } : {})
  };
}

function ref(constraintId) {
  return { kind: "constraint_ref", constraint_id: constraintId };
}

function group(operator, ...children) {
  return { kind: "group", operator, children };
}

function not(child) {
  return { kind: "not", child };
}

function variant(id, kind, queryCandidate, reason, options = {}) {
  return {
    id,
    kind,
    query_candidate: queryCandidate,
    executable_candidate: queryCandidate !== null && options.executable !== false,
    reason,
    differences: options.differences || [],
    authority_class: options.authorityClass || (queryCandidate === null ? "illustrative_only" : "candidate_retrieval"),
    authority_status: options.authorityStatus || "Contract fixture",
    evidence_level: options.evidenceLevel || "R1",
    provenance: options.provenance || AUTHORITY,
    ...(options.lensId ? { lens_id: options.lensId } : {})
  };
}

function lens(id, concept, role, label, variantIds) {
  return {
    id,
    concept,
    role,
    label,
    query_variant_ids: variantIds,
    provenance: AUTHORITY
  };
}

function makeState(id, options) {
  const hardConstraints = options.hardConstraints || [];
  const preferences = options.preferences || [];
  const lenses = options.lenses || [];
  const queryVariants = options.queryVariants || [];
  const selectedVariant = options.selectedVariant || null;
  const selected = queryVariants.find((item) => item.id === selectedVariant);
  const executionStatus = options.executionStatus || (selected ? "ready" : "no_query");
  const operatorTokens = options.operatorTokens || [
    ...hardConstraints.map((item) => ({
      semantic_ref: item.id,
      field: item.field,
      relation: item.relation,
      value: item.value,
      polarity: item.polarity,
      group_id: null,
      softness: "hard"
    })),
    ...preferences.map((item) => ({
      semantic_ref: item.id,
      field: item.category,
      relation: item.relation,
      value: item.value,
      polarity: "include",
      group_id: null,
      softness: "soft"
    }))
  ];

  return {
    schema_version: "1.0.0",
    state_id: id,
    source: options.source || {
      mode: "plain",
      input_kind: "natural_language",
      input_value: options.input
    },
    normalization: options.normalization || {
      status: "normalized",
      operations: [],
      authority_refs: AUTHORITY
    },
    confidence: options.confidence || {
      score: 1,
      tier: "high",
      provenance: options.provenance || AUTHORITY
    },
    query_explanation: options.queryExplanation || hardConstraints.map((item) => ({
      semantic_ref: item.id,
      explanation: item.source_text
        ? `Preserves the governed meaning of: ${item.source_text}`
        : `Preserves hard constraint ${item.id}.`,
      provenance: item.provenance
    })),
    semantic_provenance: options.semanticProvenance || {
      evidence_level: "R1",
      calibration_rules: [],
      evidence_refs: AUTHORITY
    },
    validation_state: options.validationState || "valid",
    execution_mode: options.executionMode,
    hard_constraints: hardConstraints,
    boolean_expression: options.booleanExpression || (
      hardConstraints.length ? group("and", ...hardConstraints.map((item) => ref(item.id))) : { kind: "empty" }
    ),
    preferences,
    contexts: options.contexts || [],
    lenses,
    assumptions: options.assumptions || [],
    conflicts: options.conflicts || [],
    unresolved_terms: options.unresolvedTerms || [],
    query_variants: queryVariants,
    execution_selection: {
      status: executionStatus,
      selected_variant_id: selectedVariant,
      maze_query_projection: executionStatus === "ready" ? selected.query_candidate : null
    },
    diagnostics: options.diagnostics || [],
    display: {
      plain_text: options.plainDisplay ?? options.input ?? null,
      operator_syntax: options.operatorSyntax ?? (selected?.query_candidate || null),
      operator_tokens: operatorTokens
    },
    recommendation_handoff: {
      candidate_truth_variant_id: selectedVariant,
      hard_constraint_ids: hardConstraints.map((item) => item.id),
      preference_ids: preferences.map((item) => item.id),
      lens_ids: lenses.map((item) => item.id),
      classifications: options.classifications || [],
      signals: options.signals || [],
      explanation_provenance: options.explanationProvenance || AUTHORITY
    }
  };
}

const simicFitConstraints = [
  constraint("hc-color-id", "color_identity", "id", "subset", "UG", { sourceText: "for my Simic Commander deck" }),
  constraint("hc-format", "format_legality", "format", "equals", "commander", { sourceText: "Commander deck" })
];

const fixtures = [
  {
    id: "01-simic-deck-fit-not-exact",
    requirement: "Simic Commander deck-fit remains a color-identity subset relation, not exact identity.",
    state: makeState("fixture-01", {
      input: "cards for my Simic Commander deck",
      executionMode: "direct_exact",
      hardConstraints: simicFitConstraints,
      queryVariants: [variant("q-strict", "strict", "id<=ug f:commander", "Deck-fit color identity plus Commander legality.")],
      selectedVariant: "q-strict",
      plainDisplay: "Cards that fit within Simic color identity and are Commander legal"
    }),
    expect: { colorDomain: "color_identity", colorRelation: "subset", query: "id<=ug f:commander" }
  },
  {
    id: "02-printed-black-in-golgari",
    requirement: "Printed black and Golgari deck identity remain separate dimensions.",
    state: makeState("fixture-02", {
      input: "black cards for my Golgari Commander deck",
      executionMode: "component_exact",
      hardConstraints: [
        constraint("hc-printed-black", "printed_color", "c", "equals", "B", { sourceText: "black cards" }),
        constraint("hc-golgari-fit", "color_identity", "id", "subset", "BG", { sourceText: "for my Golgari deck" }),
        constraint("hc-format", "format_legality", "format", "equals", "commander", { sourceText: "Commander" })
      ],
      queryVariants: [variant("q-strict", "strict", "c=b id<=bg f:commander", "Printed color and deck-fit identity are both required.")],
      selectedVariant: "q-strict"
    }),
    expect: { distinctColorDomains: true }
  },
  {
    id: "03-azorius-without-implicit-format",
    requirement: "Azorius identity does not imply Commander format.",
    state: makeState("fixture-03", {
      input: "cards within Azorius color identity",
      executionMode: "direct_exact",
      hardConstraints: [constraint("hc-azorius", "color_identity", "id", "subset", "WU", { sourceText: "within Azorius color identity" })],
      queryVariants: [variant("q-strict", "strict", "id<=wu", "No format was explicit or actively inherited.")],
      selectedVariant: "q-strict"
    }),
    expect: { excludesQueryFragment: "f:commander", contextDimensions: [] }
  },
  {
    id: "04-cheap-izzet-interaction-preference",
    requirement: "An inferred cheap threshold remains a removable soft preference.",
    state: makeState("fixture-04", {
      input: "cheap Izzet interaction, preferably mana value 2 or less",
      executionMode: "preference_branch",
      hardConstraints: [
        constraint("hc-izzet", "color_identity", "id", "subset", "UR", { sourceText: "Izzet" }),
        constraint("hc-interaction", "function", "function", "has", "interaction", { sourceText: "interaction" })
      ],
      preferences: [preference("pref-mv", "mana_value", "at_most", 2, "preferably mana value 2 or less", {
        threshold: { value: 2, unit: "mana_value", inferred: false, editable: true }
      })],
      queryVariants: [
        variant("q-strict", "strict", "id<=ur otag:interaction", "Hard requirements only."),
        variant("q-preferred", "preferred", "id<=ur otag:interaction mv<=2", "Adds the removable mana-value preference.", { differences: ["Added preference pref-mv"] })
      ],
      selectedVariant: "q-strict",
      signals: [{ kind: "efficiency", value: { preferred_mv_max: 2 }, query_truth: false, provenance: ["pref-mv"] }]
    }),
    expect: { preferenceId: "pref-mv", baseQuery: "id<=ur otag:interaction" }
  },
  {
    id: "05-counterspell-lens-with-preference",
    requirement: "Counterspells retain a governed spell-counter lens and optional MV preference.",
    state: makeState("fixture-05", {
      input: "counterspells, preferably mana value 2 or less",
      executionMode: "mechanical_pattern",
      hardConstraints: [constraint("hc-counterspell", "function", "function", "has", "spell_counter", { sourceText: "counterspells" })],
      preferences: [preference("pref-mv", "mana_value", "at_most", 2, "preferably mana value 2 or less", {
        threshold: { value: 2, unit: "mana_value", inferred: false, editable: true }
      })],
      lenses: [
        lens("lens-spell-counter", "counterspell", "targeted_spell", "Targeted-spell counters", ["q-counter", "q-counter-cheap"]),
        lens("lens-counter-tagger", "counterspell", "tagger_discovery", "Tagger/taxonomy discovery", ["q-counter-tagger"])
      ],
      queryVariants: [
        variant("q-counter", "lens", "t:instant o:/counter target.*spell/", "Frozen EV-007 targeted-spell counter lens.", { lensId: "lens-spell-counter" }),
        variant("q-counter-cheap", "preferred", "t:instant o:/counter target.*spell/ mv<=2", "Adds optional MV preference to the frozen targeted-spell lens.", { lensId: "lens-spell-counter", differences: ["Added preference pref-mv"] }),
        variant("q-counter-tagger", "broadened", "otag:counterspell", "Secondary Tagger/taxonomy discovery lane; not the primary targeted-spell truth.", { lensId: "lens-counter-tagger", differences: ["Broadened to Tagger discovery taxonomy"] })
      ],
      selectedVariant: "q-counter"
    }),
    expect: { lensRoles: ["targeted_spell", "tagger_discovery"] }
  },
  {
    id: "06-board-wipe-multi-lens",
    requirement: "Board wipes remain a named Multi-Lens bundle rather than one opaque OR query.",
    state: makeState("fixture-06", {
      input: "board wipes",
      executionMode: "multi_lens_bundle",
      hardConstraints: [constraint("hc-wipe", "function", "function", "has", "board_wipe", { sourceText: "board wipes" })],
      lenses: [
        lens("lens-core", "board_wipe", "tagger_oracle_intersection", "Tagger ∩ Oracle-floor high-confidence core", ["q-core"]),
        lens("lens-tagger-only", "board_wipe", "tagger_only_classified", "Tagger-only alternate/classified lane", ["q-tagger-only"]),
        lens("lens-oracle-only", "board_wipe", "oracle_only_review", "Oracle-only alternate/review lane", ["q-oracle-only"])
      ],
      queryVariants: [
        variant("q-core", "lens", "otag:board-wipe (o:\"destroy all creatures\" or o:\"exile all creatures\" or o:\"each creature gets -\" or o:\"damage to each creature\" or o:\"sacrifice all\")", "Frozen CAL-055 / EV-003 intersection core.", { lensId: "lens-core" }),
        variant("q-tagger-only", "lens", "otag:board-wipe", "Broader Tagger candidate lane; subtract the core and classify roles after retrieval.", { lensId: "lens-tagger-only" }),
        variant("q-oracle-only", "lens", "(o:\"destroy all creatures\" or o:\"exile all creatures\" or o:\"each creature gets -\" or o:\"damage to each creature\" or o:\"sacrifice all\")", "Oracle-floor candidate lane; subtract the core and review self-board false positives.", { lensId: "lens-oracle-only" })
      ],
      selectedVariant: "q-core",
      signals: [{ kind: "role", value: ["tagger_oracle_intersection", "tagger_only_classified", "oracle_only_review"], query_truth: false, provenance: ["CAL-055", "EV-003"] }]
    }),
    expect: { lensRoles: ["tagger_oracle_intersection", "tagger_only_classified", "oracle_only_review"] }
  },
  {
    id: "07-one-sided-vs-target-opponent",
    requirement: "Whole-board one-sided and target-one-opponent meanings remain distinct.",
    state: makeState("fixture-07", {
      input: "a one-sided wipe or a wipe for one target opponent",
      executionMode: "multi_lens_bundle",
      hardConstraints: [constraint("hc-wipe", "function", "function", "has", "board_wipe", { sourceText: "wipe" })],
      lenses: [
        lens("lens-one-sided", "board_wipe", "all_opponents_spare_my_board", "All opponents / spare my board", ["q-one-sided"]),
        lens("lens-target-opponent", "board_wipe", "target_one_opponent", "Target one opponent", ["q-target-opponent"])
      ],
      queryVariants: [
        variant("q-target-opponent", "lens", "(o:\"destroy all creatures target opponent controls\" or o:\"exile all creatures target opponent controls\")", "Accepted row-909 primary lane for one target opponent; remains Review.", { lensId: "lens-target-opponent" }),
        variant("q-one-sided", "lens", "(o:\"destroy all creatures you don't control\" or o:\"exile all creatures you don't control\" or o:\"destroy all creatures your opponents control\" or o:\"exile all creatures your opponents control\")", "Separate EV-001 all-opponents / spare-my-board family.", { lensId: "lens-one-sided" })
      ],
      selectedVariant: "q-target-opponent",
      confidence: { score: 0.68, tier: "medium", provenance: ["Master_Lexicon row 909", "VM-589 owner acceptance"] }
    }),
    expect: { distinctVariantIds: ["q-target-opponent", "q-one-sided"] }
  },
  {
    id: "08-mana-dork-role-bundle",
    requirement: "Direct self-production, alternative self-production, land untap, and grantor/support roles remain separate.",
    state: makeState("fixture-08", {
      input: "mana dorks",
      executionMode: "multi_lens_bundle",
      hardConstraints: [constraint("hc-mana-dork", "function", "function", "has", "mana_acceleration", { sourceText: "mana dorks" })],
      lenses: [
        lens("lens-direct", "mana_dork", "direct_self", "Direct self-producers", ["q-direct"]),
        lens("lens-alternative", "mana_dork", "alternative_self", "Alternative self-producers", ["q-alternative"]),
        lens("lens-untap", "mana_dork", "land_untap", "Land-untap accelerants", ["q-untap"]),
        lens("lens-grantor", "mana_dork", "grantor_support", "Ability grantors / support", ["q-grantor"])
      ],
      queryVariants: [
        variant("q-direct", "lens", "t:creature o:/^{T}: Add/", "Frozen strict direct-self-tap subset.", { lensId: "lens-direct" }),
        variant("q-alternative", "lens", "t:creature produces:[MANA]", "Broad capability retrieval; post-retrieval classification must prove alternative self-production.", { lensId: "lens-alternative" }),
        variant("q-untap", "lens", "t:creature o:\"untap target land\"", "Land-untap acceleration candidate lane.", { lensId: "lens-untap" }),
        variant("q-grantor", "lens", "t:creature produces:[MANA]", "Broad capability retrieval; post-retrieval classification separates grantor/support cards.", { lensId: "lens-grantor" })
      ],
      selectedVariant: "q-direct",
      signals: [{ kind: "role", value: ["direct_self", "alternative_self", "land_untap", "grantor_support"], query_truth: false, provenance: ["CAL-056", "EV-004"] }]
    }),
    expect: { lensRoles: ["direct_self", "alternative_self", "land_untap", "grantor_support"] }
  },
  {
    id: "09-grindy-black-draw-adjacency",
    requirement: "Draw class and recommendation adjacency remain recommendation metadata, not query truth.",
    state: makeState("fixture-09", {
      input: "grindy black draw engines",
      executionMode: "mechanical_pattern",
      hardConstraints: [
        constraint("hc-black", "color_identity", "id", "subset", "B", { sourceText: "black" }),
        constraint("hc-advantage", "function", "function", "has", "card_advantage", { sourceText: "draw engines" }),
        constraint("hc-permanent", "type", "is", "is", "permanent", { sourceText: "engines" })
      ],
      queryVariants: [variant("q-strict", "strict", "id<=b is:permanent otag:card-advantage", "Frozen EV-006 candidate retrieval pool.")],
      selectedVariant: "q-strict",
      classifications: [{ dimension: "draw_engine_class", value: { A: "autonomous draw", B: "conditional draw", C: "finite draw/value", D: "non-draw card advantage/access", E: "poor fit" }, provenance: ["CAL-058", "EV-006"] }],
      signals: [
        { kind: "repeatability", value: "A/B/C/D/E is post-retrieval mechanical truth", query_truth: false, provenance: ["CAL-058", "EV-006"] },
        { kind: "adjacency", value: "Archscry semantic ranking is separate; strong D may outrank weak A/B", query_truth: false, provenance: ["CAL-058", "EV-006", "Archscry_Enrichment"] }
      ]
    }),
    expect: { signalKinds: ["repeatability", "adjacency"] }
  },
  {
    id: "10-group-slug-engine-burst",
    requirement: "Group Slug engine, burst, and action-tax lanes remain distinct, with repeatability classified after retrieval.",
    state: makeState("fixture-10", {
      input: "group slug cards",
      executionMode: "multi_lens_bundle",
      hardConstraints: [constraint("hc-group-slug", "function", "function", "has", "group_slug", { sourceText: "group slug" })],
      lenses: [
        lens("lens-engine", "group_slug", "repeatable_candidate", "Repeatable-engine candidates", ["q-engine"]),
        lens("lens-burst", "group_slug", "burst", "Burst spells", ["q-burst"]),
        lens("lens-action-tax", "group_slug", "action_tax_supplement", "\"a player\" action-tax supplement", ["q-action-tax"])
      ],
      queryVariants: [
        variant("q-engine", "lens", "(t:artifact or t:enchantment or t:creature) (o:\"each player\" or o:\"each opponent\") (o:deal or o:deals or o:lose or o:loses)", "Frozen repeatable-engine candidate lane; permanent type does not prove repeatability.", { lensId: "lens-engine" }),
        variant("q-burst", "lens", "(t:instant or t:sorcery) (o:\"each player\" or o:\"each opponent\") o:damage", "Frozen burst-spell lane.", { lensId: "lens-burst" }),
        variant("q-action-tax", "lens", "o:\"a player\"", "Frozen supplemental wording lane for action-tax cards such as Manabarbs; classify after retrieval.", { lensId: "lens-action-tax" })
      ],
      selectedVariant: "q-engine",
      signals: [{ kind: "repeatability", value: ["repeatable", "conditional_repeatable", "one_shot_self_event", "generic_poor_fit"], query_truth: false, provenance: ["CAL-057", "EV-005", "Archscry_Enrichment"] }]
    }),
    expect: { lensRoles: ["repeatable_candidate", "burst", "action_tax_supplement"] }
  },
  {
    id: "11-blink-watcher-vs-target",
    requirement: "Blink watchers and blink targets remain separate roles.",
    state: makeState("fixture-11", {
      input: "blink watchers and good blink targets",
      executionMode: "multi_lens_bundle",
      hardConstraints: [constraint("hc-blink", "function", "function", "has", "blink", { sourceText: "blink" })],
      lenses: [
        lens("lens-watcher", "blink", "watcher", "Blink watchers", ["q-watcher"]),
        lens("lens-target", "blink", "target", "Blink targets", ["q-target"])
      ],
      queryVariants: [
        variant("q-watcher", "lens", "o:/whenever.*exile/", "Rewards or watches blink events.", { lensId: "lens-watcher" }),
        variant("q-target", "lens", "t:creature o:/when.*enters/", "Creature with an enter trigger worth reusing.", { lensId: "lens-target" })
      ],
      selectedVariant: "q-watcher",
      unresolvedTerms: [{ id: "ut-good", term: "good", source_text: "good blink targets", reason: "Quality requires recommendation policy or an explicit proxy.", status: "unresolved", provenance: ["CAL-027", "Parser_Schema.subjective_qualifiers"] }]
    }),
    expect: { lensRoles: ["watcher", "target"], unresolvedTerms: ["good"] }
  },
  {
    id: "12-reanimation-put-return-family",
    requirement: "Put and return wording remain an OR family inside the same reanimation lane.",
    state: makeState("fixture-12", {
      input: "reanimate creatures from my graveyard",
      executionMode: "mechanical_pattern",
      hardConstraints: [
        constraint("hc-put", "oracle_text", "o", "matches", "put", { sourceText: "reanimate" }),
        constraint("hc-return", "oracle_text", "o", "matches", "return", { sourceText: "reanimate" }),
        constraint("hc-creature-card", "oracle_text", "o", "matches", "creature card", { sourceText: "creatures" }),
        constraint("hc-graveyard", "oracle_text", "o", "matches", "graveyard", { sourceText: "from my graveyard" }),
        constraint("hc-battlefield", "oracle_text", "o", "matches", "battlefield", { sourceText: "reanimate" })
      ],
      booleanExpression: group("and", group("or", ref("hc-put"), ref("hc-return")), ref("hc-creature-card"), ref("hc-graveyard"), ref("hc-battlefield")),
      queryVariants: [variant("q-strict", "strict", "(o:put or o:return) o:\"creature card\" o:graveyard o:battlefield", "Accepted governed reanimation fallback with creature-card scope and put/return OR.")],
      selectedVariant: "q-strict"
    }),
    expect: { containsBooleanOperator: "or" }
  },
  {
    id: "13-contradictory-colors",
    requirement: "Contradictory blue/green/no-blue intent blocks execution without dropping a hard constraint.",
    state: makeState("fixture-13", {
      input: "blue and green cards but no blue cards",
      executionMode: "conflict",
      validationState: "conflict",
      hardConstraints: [
        constraint("hc-blue", "printed_color", "c", "contains", "U", { sourceText: "blue" }),
        constraint("hc-green", "printed_color", "c", "contains", "G", { sourceText: "green" }),
        constraint("hc-no-blue", "printed_color", "c", "contains", "U", { sourceText: "no blue", polarity: "exclude" })
      ],
      booleanExpression: group("and", ref("hc-blue"), ref("hc-green"), not(ref("hc-no-blue"))),
      conflicts: [{
        id: "conflict-blue",
        constraint_ids: ["hc-blue", "hc-no-blue"],
        explanation: "Blue is both required and excluded.",
        suggested_alternate: { choices: ["Keep blue", "Exclude blue"] },
        status: "pending",
        provenance: ["CAL-036", "Translation_Contract.Conflict"]
      }],
      queryVariants: [variant("q-conflict", "conflict", null, "No query until the conflict is resolved.", { executable: false })],
      executionStatus: "blocked",
      diagnostics: [{ id: "diag-conflict", kind: "contradiction", severity: "error", blocking: true, message: "Blue is both required and excluded.", related_ids: ["conflict-blue", "hc-blue", "hc-no-blue"] }],
      operatorSyntax: null
    }),
    expect: { noExecutableQuery: true, conflictId: "conflict-blue" }
  },
  {
    id: "14-explicit-scryfall-preservation",
    requirement: "Valid user-authored Scryfall syntax remains preservable and semantically grouped.",
    state: makeState("fixture-14", {
      source: { mode: "operator", input_kind: "scryfall_syntax", input_value: "(t:artifact OR t:enchantment) -is:reserved", explicit_syntax_preserved: true },
      normalization: { status: "preserved", operations: [], authority_refs: ["maze-query-contract.md"] },
      executionMode: "component_exact",
      hardConstraints: [
        constraint("hc-artifact", "type", "type", "is", "artifact", { sourceText: "t:artifact", provenance: ["user-authored syntax"] }),
        constraint("hc-enchantment", "type", "type", "is", "enchantment", { sourceText: "t:enchantment", provenance: ["user-authored syntax"] }),
        constraint("hc-not-reserved", "other", "is", "is", "reserved", { sourceText: "-is:reserved", polarity: "exclude", provenance: ["user-authored syntax"] })
      ],
      booleanExpression: group("and", group("or", ref("hc-artifact"), ref("hc-enchantment")), not(ref("hc-not-reserved"))),
      queryVariants: [variant("q-strict", "strict", "(t:artifact OR t:enchantment) -is:reserved", "Preserved explicit syntax.")],
      selectedVariant: "q-strict",
      operatorSyntax: "(t:artifact OR t:enchantment) -is:reserved",
      plainDisplay: "Artifacts or enchantments, excluding Reserved List cards"
    }),
    expect: { exactOperatorSyntax: "(t:artifact OR t:enchantment) -is:reserved" }
  },
  {
    id: "15-plain-operator-plain-roundtrip",
    requirement: "Plain to Operator to Plain preserves semantic meaning, including soft and unresolved state.",
    state: makeState("fixture-15", {
      input: "cheap Azorius flyers, not artifacts, preferably mana value 2 or less, and fun",
      executionMode: "preference_branch",
      hardConstraints: [
        constraint("hc-azorius", "color_identity", "id", "subset", "WU", { sourceText: "Azorius" }),
        constraint("hc-flying", "keyword", "kw", "has", "flying", { sourceText: "flyers" }),
        constraint("hc-no-artifact", "type", "type", "is", "artifact", { sourceText: "not artifacts", polarity: "exclude" })
      ],
      booleanExpression: group("and", ref("hc-azorius"), ref("hc-flying"), not(ref("hc-no-artifact"))),
      preferences: [preference("pref-mv", "mana_value", "at_most", 2, "cheap / preferably mana value 2 or less", {
        threshold: { value: 2, unit: "mana_value", inferred: false, editable: true }
      })],
      contexts: [{ id: "ctx-ui", dimension: "ui_mode", source: "Maze mode", value: "plain", inherited: false, applied_to_query: false, application_reason: "Source mode is provenance only.", provenance: ["VM-591"] }],
      lenses: [lens("lens-flyers", "evasion", "flying", "Flying cards", ["q-strict", "q-preferred"])],
      assumptions: [{ id: "assume-cheap", statement: "Cheap is represented by the explicit MV<=2 preference in this request.", material: true, status: "accepted", provenance: ["CAL-025"] }],
      unresolvedTerms: [{ id: "ut-fun", term: "fun", source_text: "and fun", reason: "Fun is subjective and has no accepted query proxy here.", status: "unresolved", provenance: ["CAL-027", "Parser_Schema.subjective_qualifiers"] }],
      queryVariants: [
        variant("q-strict", "strict", "id<=wu kw:flying -t:artifact", "Hard constraints only."),
        variant("q-preferred", "preferred", "id<=wu kw:flying -t:artifact mv<=2", "Adds MV preference.", { differences: ["Added preference pref-mv"] })
      ],
      selectedVariant: "q-strict"
    }),
    expect: { roundTripModes: ["plain", "operator", "plain"], semanticEquality: true }
  },
  {
    id: "16-loom-adapter-roundtrip",
    requirement: "Loom builder filters plus explicit color relation survive Operator rendering and Loom restoration.",
    state: makeState("fixture-16", {
      source: {
        mode: "loom",
        input_kind: "builder_filters",
        input_value: {
          builderFilters: { colors: ["W", "U"], colorOp: "id", types: ["creature"], format: "commander", keywords: ["flying"], cmcMin: "", cmcMax: "", rarities: [] },
          color_relation: { domain: "color_identity", relation: "subset", colors: ["W", "U"] }
        }
      },
      executionMode: "component_exact",
      hardConstraints: [
        constraint("hc-loom-color", "color_identity", "id", "subset", "WU", { sourceText: "selected W,U + identity relation", provenance: ["builderFilters.colorOp=id", "explicit color_relation"] }),
        constraint("hc-loom-type", "type", "type", "is", "creature", { sourceText: "Creature" }),
        constraint("hc-loom-format", "format_legality", "format", "equals", "commander", { sourceText: "Commander" }),
        constraint("hc-loom-keyword", "keyword", "kw", "has", "flying", { sourceText: "Flying" })
      ],
      queryVariants: [variant("q-strict", "strict", "id<=wu t:creature f:commander kw:flying", "Deterministic Loom adapter projection.")],
      selectedVariant: "q-strict",
      plainDisplay: "Commander-legal flying creatures within Azorius color identity",
      operatorSyntax: "id<=wu t:creature f:commander kw:flying"
    }),
    expect: { loomColorRelation: { domain: "color_identity", relation: "subset", colors: ["W", "U"] }, roundTripModes: ["loom", "operator", "loom"] }
  },
  {
    id: "17-dossier-context-not-applied",
    requirement: "Dossier context can exist with provenance while remaining unapplied to the query.",
    state: makeState("fixture-17", {
      input: "creatures with vigilance",
      executionMode: "direct_exact",
      hardConstraints: [
        constraint("hc-creature", "type", "type", "is", "creature", { sourceText: "creatures" }),
        constraint("hc-vigilance", "keyword", "kw", "has", "vigilance", { sourceText: "vigilance" })
      ],
      contexts: [{
        id: "ctx-dossier",
        dimension: "dossier",
        source: "Archscry handoff",
        value: { fit: "JUND", reading_id: "reading-17" },
        inherited: true,
        applied_to_query: false,
        application_reason: "VM-591 preserves context but does not authorize placement-aware filtering.",
        provenance: ["vm_archscry_maze_handoff_v1", "VM-590"]
      }],
      queryVariants: [variant("q-strict", "strict", "t:creature kw:vigilance", "Only explicit request constraints are projected.")],
      selectedVariant: "q-strict",
      signals: [{ kind: "context_provenance", value: { context_id: "ctx-dossier", applied_to_query: false }, query_truth: false, provenance: ["ctx-dossier"] }]
    }),
    expect: { contextId: "ctx-dossier", appliedToQuery: false, excludesQueryFragment: "jund" }
  },
  {
    id: "18-invalid-mv-range",
    requirement: "Minimum MV greater than maximum MV is a blocking pre-execution diagnostic with no query.",
    state: makeState("fixture-18", {
      source: {
        mode: "loom",
        input_kind: "builder_filters",
        input_value: { builderFilters: { colors: [], colorOp: "c", types: [], format: "commander", keywords: [], cmcMin: "5", cmcMax: "2", rarities: [] }, color_relation: null }
      },
      executionMode: "component_exact",
      validationState: "invalid",
      hardConstraints: [
        constraint("hc-mv-min", "mana_value", "mv", "at_least", 5, { sourceText: "minimum mana value 5" }),
        constraint("hc-mv-max", "mana_value", "mv", "at_most", 2, { sourceText: "maximum mana value 2" })
      ],
      queryVariants: [],
      executionStatus: "blocked",
      diagnostics: [{ id: "diag-mv-range", kind: "invalid_range", severity: "error", blocking: true, message: "Minimum mana value 5 is greater than maximum mana value 2.", related_ids: ["hc-mv-min", "hc-mv-max"] }],
      operatorSyntax: null
    }),
    expect: { noExecutableQuery: true, diagnosticKind: "invalid_range" }
  }
];

const AUTHORITY_AUDITS = {
  "01-simic-deck-fit-not-exact": audit(["CAL-001", "CAL-004", "Query_Recipes.Commander cards that fit a color identity"], "exact_governed_truth", "Production-ready", "R6", true, "Exact accepted identity-ceiling and Commander-legality behavior."),
  "02-printed-black-in-golgari": audit(["CAL-001", "CAL-003", "CAL-004"], "exact_governed_truth", "Production-ready", "R6", true, "Printed color and deck color identity are governed independent dimensions."),
  "03-azorius-without-implicit-format": audit(["CAL-004", "CAL-047"], "exact_governed_truth", "Production-ready", "R6", true, "Accepted context gate forbids implicit Commander legality."),
  "04-cheap-izzet-interaction-preference": audit(["CAL-007", "CAL-042", "Translation_Contract.Preference Branch"], "candidate_retrieval", "Contract candidate", "R1", true, "The interaction pool is illustrative candidate retrieval; the governed truth is removable preference behavior."),
  "05-counterspell-lens-with-preference": audit(["CAL-007", "CAL-053", "CAL-054", "EV-007"], "exact_governed_truth", "Production-ready", "R6", true, "EV-007 freezes the Oracle targeted-spell regex as primary and Tagger as secondary.", {
    "q-counter-tagger": variantAudit("alternate_lens", "Secondary discovery", "R6")
  }),
  "06-board-wipe-multi-lens": audit(["CAL-020", "CAL-044", "CAL-055", "EV-003"], "exact_governed_truth", "Production-ready", "R6", true, "The selected intersection is the frozen high-confidence core; neither raw source is complete.", {
    "q-tagger-only": variantAudit("alternate_lens", "Alternate/classified", "R6"),
    "q-oracle-only": variantAudit("alternate_lens", "Alternate/review", "R6")
  }),
  "07-one-sided-vs-target-opponent": audit(["CAL-020", "CAL-043", "CAL-044", "CAL-055", "EV-001", "EV-003", "Master_Lexicon row 909"], "candidate_retrieval", "Review", "R5", true, "The selected target-one-opponent lane is owner-accepted at Review/0.68, not Production-ready.", {
    "q-one-sided": variantAudit("alternate_lens", "Production-ready alternate family", "R6")
  }),
  "08-mana-dork-role-bundle": audit(["CAL-023", "CAL-045", "CAL-056", "EV-002", "EV-004"], "exact_governed_truth", "Production-ready direct subset", "R6", true, "The strict direct-self-tap subset is selected; broad produces evidence requires four-way role classification.", {
    "q-alternative": variantAudit("candidate_retrieval", "Role-classified candidate", "R6"),
    "q-untap": variantAudit("alternate_lens", "Land-untap lane", "R6"),
    "q-grantor": variantAudit("candidate_retrieval", "Support-classified candidate", "R6")
  }),
  "09-grindy-black-draw-adjacency": audit(["CAL-026", "CAL-039", "CAL-058", "EV-006", "Query_Recipes.Grindy draw-engine candidates"], "candidate_retrieval", "Production-ready governed behavior", "R6", true, "The query retrieves candidates; A/B/C/D/E truth and Archscry ranking remain separate."),
  "10-group-slug-engine-burst": audit(["CAL-011", "CAL-026", "CAL-057", "CAL-059", "EV-005", "Query_Recipes.Group slug"], "candidate_retrieval", "Production-ready governed behavior", "R6", true, "All three accepted retrieval lanes require a post-retrieval repeatability classifier.", {
    "q-burst": variantAudit("alternate_lens", "Burst lane", "R6"),
    "q-action-tax": variantAudit("alternate_lens", "Supplemental lane", "R6")
  }),
  "11-blink-watcher-vs-target": audit(["CAL-016", "CAL-017", "CAL-027", "CAL-043", "Archetype_Map.Blink / Flicker"], "candidate_retrieval", "Governed recipe candidate", "R6", true, "Blink roles are governed; quality remains unresolved rather than query truth."),
  "12-reanimation-put-return-family": audit(["CAL-022", "CAL-054", "Query_Recipes.Reanimation effects", "Archetype_Map.Reanimator"], "candidate_retrieval", "Review governed fallback", "R6", true, "The accepted high-recall fallback preserves creature-card scope and the put/return OR."),
  "13-contradictory-colors": audit(["CAL-036", "CAL-048", "Translation_Contract.Conflict"], "exact_governed_truth", "Conflict", "R6", false, "The governed outcome is no executable query until the conflict is resolved."),
  "14-explicit-scryfall-preservation": audit(["Parser_Schema.explicit_syntax_tokens", "CAL-008", "maze-query-contract.md"], "exact_governed_truth", "Production-ready syntax contract", "R6", true, "Valid explicit syntax and Boolean grouping are preserved exactly."),
  "15-plain-operator-plain-roundtrip": audit(["CAL-008", "CAL-027", "CAL-038", "CAL-042", "Toggle_Roundtrip"], "exact_governed_truth", "Release-blocking contract", "R6", true, "The shared semantic state, not reparsed display text, governs both views."),
  "16-loom-adapter-roundtrip": audit(["CAL-004", "CAL-038", "Parser_Schema.color_domain", "Parser_Schema.color_relation", "VM-590"], "exact_governed_truth", "VM-591 adapter contract", "R6", true, "The explicit color domain/relation is semantic content and survives both mode transitions."),
  "17-dossier-context-not-applied": audit(["CAL-047", "Parser_Schema.context_source", "Archscry_Enrichment.Context inheritance"], "exact_governed_truth", "Production architecture rule", "R6", true, "Inherited context is traceable but cannot change query truth unless explicitly applied."),
  "18-invalid-mv-range": audit(["Parser_Schema.mana_value_constraints", "Parser_Schema.validation_state", "VM-590"], "exact_governed_truth", "Invalid / blocked", "R6", false, "The governed outcome is a blocking diagnostic and no query projection.")
};

for (const fixture of fixtures) {
  const authorityAudit = AUTHORITY_AUDITS[fixture.id];
  if (!authorityAudit) throw new Error(`Missing authority audit for ${fixture.id}`);
  fixture.authority_audit = authorityAudit;
  fixture.state.semantic_provenance = {
    evidence_level: authorityAudit.evidence_level,
    calibration_rules: authorityAudit.controlling_refs.filter((ref) => ref.startsWith("CAL-")),
    evidence_refs: authorityAudit.controlling_refs.filter((ref) => !ref.startsWith("CAL-"))
  };
  for (const queryVariant of fixture.state.query_variants) {
    const override = authorityAudit.variant_overrides[queryVariant.id];
    queryVariant.authority_class = override?.authority_class || authorityAudit.authority_class;
    queryVariant.authority_status = override?.authority_status || authorityAudit.authority_status;
    queryVariant.evidence_level = override?.evidence_level || authorityAudit.evidence_level;
    queryVariant.provenance = authorityAudit.controlling_refs;
  }
}

function audit(controllingRefs, authorityClass, authorityStatus, evidenceLevel, selectedAllowed, rationale, variantOverrides = {}) {
  return {
    controlling_refs: controllingRefs,
    authority_class: authorityClass,
    authority_status: authorityStatus,
    evidence_level: evidenceLevel,
    selected_variant_executable_allowed: selectedAllowed,
    rationale,
    variant_overrides: variantOverrides
  };
}

function variantAudit(authorityClass, authorityStatus, evidenceLevel) {
  return { authority_class: authorityClass, authority_status: authorityStatus, evidence_level: evidenceLevel };
}

export { fixtures };

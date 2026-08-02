(() => {
  const RESULT_KEY = "vm_last_result";
  const BASE_KEY = "vm_gate_a_qa_base";
  const FIXTURES = new Set([
    "tie",
    "close",
    "mixed",
    "contradictory",
    "insufficient",
    "unknown",
    "invalid",
    "incomplete",
    "legacy-with-confidence",
    "legacy-without-confidence",
  ]);

  const readObject = (key) => {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    try {
      const value = JSON.parse(raw);
      return value && typeof value === "object" ? value : null;
    } catch (_) {
      return null;
    }
  };
  const reportError = (message) => {
    console.error(`[VM-551 QA] ${message}`);
    return false;
  };

  const current = readObject(RESULT_KEY);
  if (!current) {
    reportError("No vm_last_result was found. Complete one normal Quick Reading, return to the result screen, and paste this helper again.");
    return;
  }
  if (!readObject(BASE_KEY)) sessionStorage.setItem(BASE_KEY, JSON.stringify(current));

  window.vmGateAQa = (kind) => {
    if (!FIXTURES.has(kind)) {
      return reportError(`Unknown fixture "${kind}". Supported fixtures: ${[...FIXTURES].join(", ")}.`);
    }
    const base = readObject(BASE_KEY);
    if (!base) return reportError("The vm_gate_a_qa_base fixture is missing or unreadable. Complete a normal reading and reinstall this helper.");
    const result = JSON.parse(JSON.stringify(base));
    result.legacy_result = false;
    result.source_mode = "quick";
    result.result_state = ["mixed", "contradictory", "insufficient", "unknown", "invalid", "incomplete"].includes(kind) ? kind : null;
    if (kind === "tie") {
      if (!Array.isArray(result.top_matches) || result.top_matches.length < 2) {
        return reportError("The saved base result does not contain two ranked identities, so the tie fixture cannot be created.");
      }
      result.top_matches[1].score = result.top_matches[0].score;
    }
    if (kind === "close") {
      if (!Array.isArray(result.top_matches) || result.top_matches.length < 2) {
        return reportError("The saved base result does not contain a rank-two identity, so the close fixture cannot be created.");
      }
      result.confidence_gap = 0.01;
      result.stage_history = [...(result.stage_history || []), { stage: "crucible", qa_fixture: true }];
      result.evidence_trail = [...(result.evidence_trail || []), {
        answer_title: "Owner QA close-alternative probe",
        signal: "a direct authored comparison signal",
        deltas: [{ faction: result.top_matches[1].faction, delta: 1 }],
      }];
    }
    if (kind === "legacy-with-confidence" || kind === "legacy-without-confidence") {
      result.result_state = "unknown";
      result.legacy_result = true;
      result.source_mode = "legacy";
      result.evidence_trail = [];
      result.stage_history = [];
      if (kind === "legacy-with-confidence") result.confidence = 0.82;
      else delete result.confidence;
    }
    sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
    location.reload();
    return true;
  };

  window.vmGateARestore = () => {
    const base = readObject(BASE_KEY);
    if (!base) return reportError("The vm_gate_a_qa_base fixture is missing or unreadable. Complete a normal reading and reinstall this helper.");
    sessionStorage.setItem(RESULT_KEY, JSON.stringify(base));
    location.reload();
    return true;
  };

  console.info("[VM-551 QA] Fixture helper installed. A page reload clears window.vmGateAQa and window.vmGateARestore; paste this helper again after every reload.");
})();

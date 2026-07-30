(() => {
  const entries = [
    ["after-game/won-unclear", "won-unclear", ["threat-reading", "heat-management", "archetype-signal"]],
    ["after-game/one-sided", "one-sided", ["threat-reading", "pod-readiness"]],
    ["after-game/couldnt-follow", "game-flow", ["archetype-signal", "threat-reading"]],
    ["after-game/table-bad", "social-friction", ["pod-readiness", "heat-management"]],
    ["after-game/unsure", "uncertain", ["threat-reading", "readiness-checklist"]],
    ["after-game/lost/opening-hand", "opening-hand", ["pod-readiness", "readiness-checklist"]],
    ["after-game/lost/mana-draw", "mana-development", ["pod-readiness", "readiness-checklist"]],
    ["after-game/lost/wrong-order", "sequencing", ["threat-reading", "command-zone"]],
    ["after-game/lost/never-started/resources-late", "mana-development", ["pod-readiness", "readiness-checklist"]],
    ["after-game/lost/never-started/commander-needed", "commander-dependence", ["command-zone"]],
    ["after-game/lost/never-started/pod-fast", "power-mismatch", ["pod-readiness", "readiness-checklist"]],
    ["after-game/lost/never-started/unsure", "uncertain", ["threat-reading", "readiness-checklist"]],
    ["after-game/lost/stopped/commander-stopped", "commander-dependence", ["command-zone"]],
    ["after-game/lost/stopped/key-spells", "open-mana", ["threat-reading"]],
    ["after-game/lost/stopped/visible-engine", "targeting", ["heat-management", "threat-reading"]],
    ["after-game/lost/stopped/unsure", "uncertain", ["threat-reading", "readiness-checklist"]],
    ["after-game/lost/other-plan/engine-hidden", "other-plan", ["archetype-signal", "threat-reading"]],
    ["after-game/lost/other-plan/wrong-piece", "wrong-target", ["threat-reading", "archetype-signal"]],
    ["after-game/lost/other-plan/artifact-confusion", "beyond-wubrg", ["beyond-wubrg", "archetype-signal"]],
    ["after-game/lost/other-plan/plan-unsure", "game-flow", ["archetype-signal", "threat-reading"]],
    ["after-game/lost/focused", "targeting", ["heat-management", "threat-reading"]],
    ["after-game/lost/stronger", "power-mismatch", ["pod-readiness", "readiness-checklist"]],
    ["after-game/lost/nothing-mattered", "one-sided", ["threat-reading", "pod-readiness"]],
    ["after-game/lost/unsure", "uncertain", ["threat-reading", "readiness-checklist"]]
  ].map(([path, resultId, lessonIds]) => Object.freeze({
    path,
    resultId,
    lessonIds: Object.freeze(lessonIds.slice())
  }));

  const frozenEntries = Object.freeze(entries);
  const byPath = Object.freeze(Object.fromEntries(frozenEntries.map(entry => [entry.path, entry])));

  globalThis.vmStrategiumReviewPaths = Object.freeze({
    entries: frozenEntries,
    byPath
  });
})();

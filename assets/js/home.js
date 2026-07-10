// SVG BOOT: Populate the Home WUBRG spiral paths after the inline SVG definitions exist.
(function() {
  const d = 'M -38 -39 C -16 -56 26 -42 34 -8 C 42 26 8 54 -28 42 C -58 32 -56 -4 -28 4 C -6 10 18 4 20 -14 C 22 -35 -25 -35 -37 -40';
  ['cag-spiralW','cag-spiralU','cag-spiralB','cag-spiralR','cag-spiralG'].forEach(function(id) {
    const g = document.getElementById(id);
    if (!g) return;
    g.querySelectorAll('path').forEach(function(p) { p.setAttribute('d', d); });
  });
})();

// HERO MANA LENS: Registry-backed identity preview data and Chart.js helpers.
const vmRadar = globalThis.VMRadar;
const axisLabels = vmRadar.AXIS_LABELS;

const heroManaPreviewUrl = "./data/identity-layers.json";
const heroManaChartRuntimeUrl = "./assets/js/graph.js";
const heroManaPreviewScoreKeys = vmRadar.SCORE_KEYS;
const heroManaColorNames = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green"
};
let heroManaPreviewIdentities = [];
let heroManaPreviewAliases = new Map();
let heroManaColorProfiles = new Map();
let heroManaPreviewRequest = null;
let heroManaChartRuntimeRequest = null;

function loadHeroManaChartRuntime() {
  if (window.Chart) {
    return Promise.resolve(window.Chart);
  }
  if (heroManaChartRuntimeRequest) {
    return heroManaChartRuntimeRequest;
  }

  heroManaChartRuntimeRequest = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = heroManaChartRuntimeUrl;
    script.async = true;
    script.dataset.vmChartRuntime = "home-lazy";
    script.addEventListener("load", () => {
      if (window.Chart) {
        resolve(window.Chart);
        return;
      }
      reject(new Error("Chart runtime loaded without exposing Chart."));
    }, { once: true });
    script.addEventListener("error", () => {
      reject(new Error("Chart runtime could not be loaded."));
    }, { once: true });
    document.head.appendChild(script);
  });

  return heroManaChartRuntimeRequest;
}

function scheduleHeroManaPreview() {
  const registryRequest = loadHeroManaPreviewRegistry();
  const initialize = () => {
    Promise.all([registryRequest, loadHeroManaChartRuntime()])
      .then(initHeroManaPreview)
      .catch(initHeroManaPreview);
  };
  const afterLoad = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(initialize, { timeout: 2000 });
      return;
    }
    window.setTimeout(initialize, 0);
  };

  if (document.readyState === "complete") {
    afterLoad();
    return;
  }
  window.addEventListener("load", afterLoad, { once: true });
}

function normalizeHeroManaAlias(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function uniqueHeroManaAliases(values) {
  const seen = new Set();
  const aliases = [];
  values.forEach(value => {
    const alias = String(value || "").trim();
    const normalized = normalizeHeroManaAlias(alias);
    if (!alias || seen.has(normalized)) return;
    seen.add(normalized);
    aliases.push(alias);
  });
  return aliases;
}

function heroManaPreviewKindLabel(kind) {
  switch (String(kind || "").toLowerCase()) {
    case "color":
      return "Color";
    case "college":
      return "College";
    case "guild":
      return "Guild";
    case "shard":
      return "Shard";
    case "wedge":
      return "Wedge";
    case "four_color":
      return "Four-color";
    case "five_color":
      return "Five-Color";
    case "colorless":
      return "Colorless";
    default:
      return "Signal";
  }
}

function buildHeroManaPreviewIdentity(key, expression) {
  const radarProfile = vmRadar.resolveRadarProfile(key, { expressions: { [key]: expression } }, expression);
  const canonicalComponents = Array.isArray(expression.colors) ? expression.colors.slice() : [];
  const displayComponents = String(expression.display_code || "")
    .toUpperCase()
    .split("")
    .filter(component => heroManaColorNames[component]);
  const aliases = uniqueHeroManaAliases([
    key,
    expression.display_code,
    expression.preview_label,
    expression.name,
    ...(expression.aliases || [])
  ]);

  return {
    id: key,
    key,
    kind: expression.kind,
    code: expression.display_code || key,
    name: radarProfile.name,
    title: radarProfile.title,
    text: radarProfile.text,
    components: displayComponents.length === canonicalComponents.length ? displayComponents : radarProfile.components,
    data: heroManaPreviewScoreKeys.map((scoreKey, index) => Number(radarProfile.scores?.[scoreKey]) || Number(radarProfile.data[index]) || 0),
    hex: radarProfile.hex,
    aliases,
    previewOrder: Number(expression.preview_order) || 0
  };
}

function indexHeroManaPreviewIdentities(identities) {
  heroManaPreviewIdentities = identities;
  heroManaPreviewAliases = new Map();
  heroManaColorProfiles = new Map();

  identities.forEach(identity => {
    if (identity.kind === "color" && identity.components.length === 1) {
      heroManaColorProfiles.set(identity.components[0], identity);
    }

    uniqueHeroManaAliases([
      identity.id,
      identity.key,
      identity.code,
      identity.name,
      ...(identity.aliases || [])
    ]).forEach(alias => {
      const normalized = normalizeHeroManaAlias(alias);
      if (normalized && !heroManaPreviewAliases.has(normalized)) {
        heroManaPreviewAliases.set(normalized, identity);
      }
    });
  });
}

function loadHeroManaPreviewRegistry() {
  if (heroManaPreviewIdentities.length) return Promise.resolve(heroManaPreviewIdentities);
  if (heroManaPreviewRequest) return heroManaPreviewRequest;

  heroManaPreviewRequest = fetch(heroManaPreviewUrl)
    .then(response => response.ok ? response.json() : Promise.reject(new Error("Identity preview registry unavailable")))
    .then(data => {
      const identities = Object.entries(data?.expressions || {})
        .filter(([, expression]) => expression?.preview_eligible === true)
        .map(([key, expression]) => buildHeroManaPreviewIdentity(key, expression))
        .sort((left, right) => left.previewOrder - right.previewOrder || left.name.localeCompare(right.name));
      indexHeroManaPreviewIdentities(identities);
      return identities;
    })
    .catch(() => {
      indexHeroManaPreviewIdentities([]);
      return [];
    });

  return heroManaPreviewRequest;
}

function heroManaComponentProfile(componentKey) {
  const key = String(componentKey || "").toUpperCase();
  return heroManaColorProfiles.get(key) || {
    key,
    name: vmRadar.componentName(key) || heroManaColorNames[key] || key,
    data: [0, 0, 0, 0, 0],
    hex: vmRadar.componentHex(key) || "#ffffff"
  };
}

function heroManaIdentityMatches(identity, value) {
  const normalized = normalizeHeroManaAlias(value);
  if (!identity || !normalized) return false;
  return uniqueHeroManaAliases([
    identity.id,
    identity.key,
    identity.code,
    identity.name,
    ...(identity.aliases || [])
  ]).some(alias => normalizeHeroManaAlias(alias) === normalized);
}

function findIdentity(id) {
  const normalized = normalizeHeroManaAlias(id);
  return heroManaPreviewAliases.get(normalized) ||
    heroManaCycleIdentities.find(identity => heroManaIdentityMatches(identity, id)) ||
    null;
}

// HERO MANA PREVIEW: Small, independent radar preview for the homepage hero.
let heroManaChart = null;
let heroManaCycleInterval = null;
let heroManaCycleIndex = 0;
let heroManaCycleIdentities = [];
let heroManaReducedMotion = false;
let heroManaPausedByReader = false;
let heroManaHoverPaused = false;
let heroManaFocusPaused = false;
let heroManaLatched = false;
let heroManaCurrentIdentity = null;
let heroManaLoreIndex = null;
let heroManaLoreRequest = null;

// HERO CYCLE TIMING: Bigger number = slower identity cycle; smaller number = faster cycle.
const heroManaCycleMs = 9000;
const heroManaBlackDisplayHex = vmRadar.COMPONENT_COLORS.B;
const heroManaLoreUrl = "./data/factions.json";

function heroManaComponentHex(componentKey) {
  return componentKey === "B" ? heroManaBlackDisplayHex : heroManaComponentProfile(componentKey).hex;
}

function heroManaIdentityHex(identity) {
  return identity.components.length === 1 && identity.components[0] === "B"
    ? heroManaBlackDisplayHex
    : identity.hex;
}

function heroManaRadarPlugins() {
  return [
    vmRadar.createHaloPlugin({ id: "heroManaHaloPlugin", centerAlpha: 0.02, midAlpha: 0.012 }),
    vmRadar.createGlowPlugin({ id: "heroManaGlowPlugin", reducedMotion: heroManaReducedMotion }),
    vmRadar.createTierLabelPlugin({ id: "heroManaTierLabelPlugin", minWidth: 360 }),
  ];
}

function buildHeroManaDataset(identity) {
  return vmRadar.buildDatasets({
    ...identity,
    hex: heroManaIdentityHex(identity),
  }, {
    chart: heroManaChart,
    showComponents: true,
    showComposite: true,
    includeTierLabels: true,
  });
}

function setHeroManaGlow(identity) {
  const glow = document.getElementById("heroManaGlow");
  if (!glow) return;

  const componentHexes = identity.components.length
    ? identity.components.map(key => heroManaComponentHex(key))
    : [heroManaIdentityHex(identity)];
  glow.style.background = vmRadar.blendGradient(componentHexes);
}

function summarizeHeroManaText(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences) return text;
  return sentences.slice(0, 2).join(" ").replace(/\s+/g, " ").trim();
}

function heroManaIdentityKind(identity) {
  return heroManaPreviewKindLabel(identity?.kind);
}

function cleanHeroManaLoreText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function trimHeroManaLoreText(text, maxLength = 240) {
  const cleaned = cleanHeroManaLoreText(text);
  if (cleaned.length <= maxLength) return cleaned;

  const sentences = cleaned.match(/[^.!?]+[.!?]+/g) || [];
  const compact = sentences.reduce((current, sentence) => {
    const next = `${current} ${sentence}`.trim();
    return next.length <= maxLength ? next : current;
  }, "");

  return compact || `${cleaned.slice(0, maxLength - 1).trim()}…`;
}

function heroManaLoreKey(identity) {
  if (!identity) return "";
  return identity.key || identity.id || "";
}

function loadHeroManaLoreIndex() {
  if (heroManaLoreIndex) return Promise.resolve(heroManaLoreIndex);
  if (heroManaLoreRequest) return heroManaLoreRequest;

  heroManaLoreRequest = fetch(heroManaLoreUrl)
    .then(response => response.ok ? response.json() : Promise.reject(new Error("Lore index unavailable")))
    .then(data => {
      heroManaLoreIndex = data?.factions || {};
      return heroManaLoreIndex;
    })
    .catch(() => {
      heroManaLoreIndex = {};
      return heroManaLoreIndex;
    });

  return heroManaLoreRequest;
}

function heroManaLoreEntry(identity) {
  const key = heroManaLoreKey(identity);
  return key && heroManaLoreIndex ? heroManaLoreIndex[key] : null;
}

function heroManaLoreNote(identity) {
  const lore = heroManaLoreEntry(identity);
  return trimHeroManaLoreText(
    lore?.lore_summary || lore?.tagline || lore?.philosophy || identity?.text || ""
  );
}

function heroManaLoreTension(identity, note) {
  const lore = heroManaLoreEntry(identity);
  const tension = trimHeroManaLoreText(lore?.core_tension || "", 170);
  if (!tension || tension === note || note.includes(tension)) return "";
  return tension;
}

function updateHeroManaLatchDisplay() {
  const latch = document.getElementById("heroManaSignalLatch");
  const latchText = document.getElementById("heroManaSignalLatchText");
  const state = document.getElementById("heroManaSignalState");
  const details = document.getElementById("heroManaSignalDetails");

  if (latch) {
    latch.setAttribute("aria-pressed", String(heroManaLatched));
    latch.setAttribute("aria-expanded", String(heroManaLatched));
  }

  if (latchText) {
    latchText.textContent = heroManaLatched ? "Release signal" : "Hold signal";
  }

  if (state) {
    state.textContent = heroManaLatched ? "Held" : heroManaReducedMotion ? "Still" : "Cycling";
  }

  if (details) {
    details.hidden = !heroManaLatched;
  }
}

function renderHeroManaSignalDetails(identity) {
  const kind = document.getElementById("heroManaSignalKind");
  const name = document.getElementById("heroManaSignalName");
  const note = document.getElementById("heroManaSignalLore");
  const tension = document.getElementById("heroManaSignalTension");

  if (!identity) return;

  const loreNote = heroManaLoreNote(identity);
  const loreTension = heroManaLoreTension(identity, loreNote);

  if (kind) kind.textContent = `${heroManaIdentityKind(identity)} note`;
  if (name) name.textContent = identity.name;
  if (note) note.textContent = loreNote;

  if (tension) {
    tension.textContent = loreTension ? `Tension: ${loreTension}` : "";
    tension.hidden = !loreTension;
  }
}

function setHeroManaLatch(latched) {
  heroManaLatched = Boolean(latched);

  if (heroManaLatched) {
    stopHeroManaCycle();
    renderHeroManaSignalDetails(heroManaCurrentIdentity);
    loadHeroManaLoreIndex().then(() => {
      if (heroManaLatched) renderHeroManaSignalDetails(heroManaCurrentIdentity);
    });
  }

  updateHeroManaLatchDisplay();

  if (!heroManaLatched) {
    startHeroManaCycle();
  }
}

function updateHeroManaPreview(identityId) {
  const identity = findIdentity(identityId);
  const title = document.getElementById("heroManaTitle");
  const text = document.getElementById("heroManaText");
  if (!identity || !title || !text) return;

  heroManaCurrentIdentity = identity;
  title.textContent = identity.title;
  text.textContent = summarizeHeroManaText(identity.text);
  setHeroManaGlow(identity);
  updateHeroManaDatasetPills(identity);
  renderHeroManaSignalDetails(identity);

  if (!heroManaChart) return;
  const datasets = buildHeroManaDataset(identity);
  heroManaChart.data.datasets = datasets;
  heroManaChart.update();
  updateHeroManaRadarDetails(identity, datasets);
}

function updateHeroManaDatasetPills(identity) {
  const root = document.getElementById("heroManaDatasetPills");
  if (!root || !identity) return;
  root.setAttribute(
    "aria-label",
    identity.components.length <= 1
      ? `${identity.name} profile dataset`
      : `${identity.name} overlay dataset`
  );

  if (identity.components.length <= 1) {
    const identityHex = heroManaIdentityHex(identity);
    root.innerHTML = `
      <span class="vm-hero-mana-dataset-label">Profile:</span>
      <span class="vm-hero-mana-dataset-pill" style="--dataset-color:${identityHex};">${identity.name}</span>
    `;
    return;
  }

  const componentPills = identity.components.map(key => {
    const component = heroManaComponentProfile(key);
    return `<span class="vm-hero-mana-dataset-pill" style="--dataset-color:${heroManaComponentHex(key)};">${component.name}</span>`;
  }).join(`<span class="vm-hero-mana-dataset-join"> + </span>`);

  root.innerHTML = `
    <span class="vm-hero-mana-dataset-label">Overlay:</span>
    ${componentPills}
    <span class="vm-hero-mana-dataset-join"> -> </span>
    <span class="vm-hero-mana-dataset-pill" style="--dataset-color:${heroManaIdentityHex(identity)};">${identity.name}</span>
  `;
}

function updateHeroManaRadarDetails(identity, datasets) {
  const caption = document.getElementById("heroManaRadarCaption");
  const pills = document.getElementById("heroManaRadarPills");

  if (caption) {
    caption.textContent = "";
  }

  if (!pills) return;

  pills.innerHTML = "";
}

function buildHeroManaCycleIdentities() {
  return heroManaPreviewIdentities.slice();
}

function randomizeHeroManaCycleIndex() {
  if (!heroManaCycleIdentities.length) {
    heroManaCycleIndex = 0;
    return;
  }

  heroManaCycleIndex = Math.floor(Math.random() * heroManaCycleIdentities.length);
}

function applyVisualRegressionHeroIdentityHook() {
  if (typeof window === "undefined") return false;
  const forcedIdentityId = typeof window.__vmVisualRegressionHeroIdentityId === "string"
    ? window.__vmVisualRegressionHeroIdentityId.trim()
    : "";
  if (!forcedIdentityId) return false;

  const forcedIndex = heroManaCycleIdentities.findIndex(identity => heroManaIdentityMatches(identity, forcedIdentityId));
  if (forcedIndex < 0) return false;

  heroManaCycleIndex = forcedIndex;
  return true;
}

function isHeroManaReaderActive() {
  const heroManaPanel = document.querySelector(".vm-hero-mana");
  return Boolean(heroManaPanel && (heroManaPanel.matches(":hover") || heroManaPanel.contains(document.activeElement)));
}

function advanceHeroManaCycle() {
  if (!heroManaCycleIdentities.length) return;
  if (heroManaLatched) return;
  if (isHeroManaReaderActive()) {
    heroManaPausedByReader = true;
    stopHeroManaCycle();
    return;
  }

  heroManaCycleIndex = (heroManaCycleIndex + 1) % heroManaCycleIdentities.length;
  updateHeroManaPreview(heroManaCycleIdentities[heroManaCycleIndex].id);
}

function stopHeroManaCycle() {
  window.clearInterval(heroManaCycleInterval);
  heroManaCycleInterval = null;
}

function startHeroManaCycle() {
  if (heroManaReducedMotion || heroManaLatched || document.hidden || heroManaPausedByReader || isHeroManaReaderActive() || heroManaCycleInterval) return;
  heroManaCycleInterval = window.setInterval(advanceHeroManaCycle, heroManaCycleMs);
}

function pauseHeroManaCycleForReader() {
  heroManaPausedByReader = heroManaHoverPaused || heroManaFocusPaused;
  if (heroManaPausedByReader) {
    stopHeroManaCycle();
  }
}

function resumeHeroManaCycleForReader() {
  heroManaPausedByReader = heroManaHoverPaused || heroManaFocusPaused;
  if (!heroManaPausedByReader) {
    startHeroManaCycle();
  }
}

function setHeroManaHoverPause(paused) {
  heroManaHoverPaused = paused;
  if (paused) {
    pauseHeroManaCycleForReader();
    return;
  }

  resumeHeroManaCycleForReader();
}

function setHeroManaFocusPause(paused) {
  heroManaFocusPaused = paused;
  if (paused) {
    pauseHeroManaCycleForReader();
    return;
  }

  resumeHeroManaCycleForReader();
}

function initHeroManaPreview() {
  const heroCanvas = document.getElementById("vmHeroManaChart");
  const fallback = document.querySelector("[data-hero-radar-fallback]");
  if (!heroCanvas) return;
  if (!window.Chart) {
    heroCanvas.hidden = true;
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = "Identity signal radar unavailable right now. The compact signal caption remains available.";
    }
    return;
  }
  if (fallback) {
    fallback.hidden = true;
  }
  heroCanvas.hidden = false;
  const heroManaPanel = document.querySelector(".vm-hero-mana");
  const heroManaLatch = document.getElementById("heroManaSignalLatch");
  heroManaReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  heroManaCycleIdentities = buildHeroManaCycleIdentities();
  if (!heroManaCycleIdentities.length) return;
  if (!applyVisualRegressionHeroIdentityHook()) {
    randomizeHeroManaCycleIndex();
  }

  heroManaChart = new Chart(heroCanvas.getContext("2d"), {
    type: "radar",
    data: {
      labels: axisLabels,
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: heroManaReducedMotion ? 0 : 1000,
        easing: "easeInOutQuart"
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            display: false,
            backdropColor: "transparent",
            stepSize: 20
          },
          grid: { color: "rgba(240, 197, 106, 0.22)" },
          angleLines: { color: "rgba(240, 197, 106, 0.25)" },
          pointLabels: {
            color: "#ffffff",
            font: { size: 12, weight: "700", family: "Fraunces, Georgia, serif" }
          }
        }
      }
    },
    plugins: heroManaRadarPlugins()
  });

  updateHeroManaPreview(heroManaCycleIdentities[heroManaCycleIndex]?.id || "W");
  updateHeroManaLatchDisplay();

  heroManaLatch?.addEventListener("click", () => {
    setHeroManaLatch(!heroManaLatched);
  });

  heroManaPanel?.addEventListener("pointerenter", () => setHeroManaHoverPause(true));
  heroManaPanel?.addEventListener("mouseenter", () => setHeroManaHoverPause(true));
  heroManaPanel?.addEventListener("pointerleave", () => setHeroManaHoverPause(false));
  heroManaPanel?.addEventListener("mouseleave", () => setHeroManaHoverPause(false));
  heroManaPanel?.addEventListener("focus", () => setHeroManaFocusPause(true));
  heroManaPanel?.addEventListener("blur", () => setHeroManaFocusPause(false));
  heroManaPanel?.addEventListener("focusin", () => setHeroManaFocusPause(true));

  heroManaPanel?.addEventListener("focusout", event => {
    if (heroManaPanel.contains(event.relatedTarget)) return;
    setHeroManaFocusPause(false);
  });

  document.addEventListener("pointerdown", event => {
    if (!heroManaPanel || heroManaPanel.contains(event.target)) return;
    heroManaHoverPaused = false;
    heroManaFocusPaused = false;
    resumeHeroManaCycleForReader();
  });

  document.addEventListener("focusin", event => {
    if (!heroManaPanel || heroManaPanel.contains(event.target)) return;
    heroManaFocusPaused = false;
    resumeHeroManaCycleForReader();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopHeroManaCycle();
      return;
    }

    startHeroManaCycle();
  });

  window.addEventListener("beforeunload", stopHeroManaCycle);
  startHeroManaCycle();
}

// HOME ATMOSPHERE: Route-local star-particle canvas retained from the original Home extraction.
// ATMOSPHERE FEATURE FLAG: Keeps the star-particle atmosphere enabled for this home skeleton.
const ARCHSCRY_ENABLED = true;
// ATMOSPHERE INITIALIZER: Sets up animated star particles, responsive canvas sizing, mouse glow coordinates, and reduced-motion safety.
function initArchscryAtmosphere() {
  if (!ARCHSCRY_ENABLED) return;

  const canvas = document.querySelector('.vm-bg__stars');
  if (!canvas) return;
  // ROOT CANVAS LAYER: Move the existing decorative canvas to the body so it can render outside the lower vm-bg stack.
  if (canvas.parentElement !== document.body) {
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [];
  let orbs = [];
  let tick = 0;
  let animationFrame = null;
  let isHidden = document.hidden;

  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  // STAR RESET: Builds the fixed star layer that mostly stays in place and twinkles.
  function resetStars() {
    // STAR COUNT KNOB: Lower the max/min for a cleaner sky; raise them for a denser celestial field.
    const count = Math.min(165, Math.max(72, Math.floor(window.innerWidth / 8)));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      // STAR SIZE KNOB: Raise this range for chunkier stars; lower it for finer dust.
      r: Math.random() * 1.25 + 0.35,
      // STAR BRIGHTNESS KNOBS:
      // - baseAlpha sets the resting brightness.
      // - pulse controls how dramatic the twinkle swing feels.
      baseAlpha: Math.random() * 0.34 + 0.12,
      pulse: Math.random() * 0.28 + 0.10,
      // STAR TWINKLE SPEED: Raise for more active shimmer, lower for calmer stars.
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      // BURST CHANCE: Raise for more frequent cross-flash glints.
      burstChance: Math.random() * 0.004 + 0.001
    }));
  }

  // ORB RESET: Builds the softer floating orb layer that drifts upward above the stars.
  function resetOrbs() {
    // ORB COUNT KNOB: Keep this lower than stars so the orbs stay secondary.
    const count = Math.min(32, Math.max(14, Math.floor(window.innerWidth / 44)));
    orbs = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      // ORB SIZE KNOB: Raise for dreamy lantern-like orbs; lower for subtle dust motes.
      r: Math.random() * 2.2 + 1.25,
      // ORB SPEED KNOB: Raise v for faster upward motion, lower it for lazier drift.
      v: Math.random() * 0.12 + 0.028,
      // ORB BRIGHTNESS KNOB: Raise alpha for stronger magical haze; lower it if stars should dominate.
      alpha: Math.random() * 0.08 + 0.02,
      // ORB SIDE-DRIFT KNOB: Raise drift for more wandering motion left/right.
      drift: Math.random() * 0.24 + 0.05,
      phase: Math.random() * Math.PI * 2
    }));
  }

  // CANVAS RESIZE: Keeps the particle canvas sharp and sized correctly when the browser window changes.
  function resizeCanvas() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    resetStars();
    resetOrbs();
    drawStaticAtmosphere();
  }

  // STAR DRAW: Draws the distant star field first so it sits behind the floating orbs.
  function drawStars() {
    for (const star of stars) {
      const twinkle = star.baseAlpha + Math.sin(tick * star.speed + star.phase) * star.pulse;
      // STAR ALPHA CLAMP:
      // - Raise the first number if the dimmest stars disappear too much.
      // - Lower the second number if the brightest stars feel too sharp.
      const alpha = Math.max(0.08, Math.min(0.95, twinkle));
      const isBursting = alpha > 0.56 && star.r > 0.8 && Math.random() < star.burstChance;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(247, 215, 132, ${alpha})`;
      ctx.fill();

      if (star.r > 0.95 && alpha > 0.62) {
        ctx.beginPath();
        // HALO SIZE KNOB: Raise 2.6 for a larger glow bloom around bright stars.
        ctx.arc(star.x, star.y, star.r * 2.6, 0, Math.PI * 2);
        // HALO STRENGTH KNOB: Raise 0.12 for more glow, lower it for crisp pinpoints.
        ctx.fillStyle = `rgba(247, 215, 132, ${alpha * 0.12})`;
        ctx.fill();
      }

      if (isBursting) {
        ctx.save();
        ctx.globalAlpha = Math.min(0.45, alpha + 0.12);
        ctx.strokeStyle = "rgba(247, 215, 132, 0.72)";
        ctx.lineWidth = 0.45;
        ctx.beginPath();
        ctx.moveTo(star.x - star.r * 3.2, star.y);
        ctx.lineTo(star.x + star.r * 3.2, star.y);
        ctx.moveTo(star.x, star.y - star.r * 3.2);
        ctx.lineTo(star.x, star.y + star.r * 3.2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  // ORB DRAW: Draws larger magical orbs after the stars so they feel closer to the viewer.
  function drawOrbs(animate = true) {
    for (const orb of orbs) {
      if (animate) {
        orb.y -= orb.v;
        orb.x += Math.sin(tick * 0.006 + orb.phase) * orb.drift * 0.035;

        if (orb.y < -14) {
          orb.y = window.innerHeight + 14;
          orb.x = Math.random() * window.innerWidth;
        }
      }

      const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r * 5);
      // ORB GLOW KNOBS:
      // - The center stop controls the visible core.
      // - The middle stop controls the warm haze around it.
      // - Raise orb.r * 5 for wider softer blooms; lower it for tighter orbs.
      glow.addColorStop(0, `rgba(247, 215, 132, ${orb.alpha})`);
      glow.addColorStop(0.42, `rgba(216, 162, 60, ${orb.alpha * 0.38})`);
      glow.addColorStop(1, "rgba(216, 162, 60, 0)");

      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(orb.x, orb.y, orb.r * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // STATIC DRAW: Paints one still frame so the atmosphere remains visible without motion.
  function drawStaticAtmosphere() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawStars();
    drawOrbs(false);
  }

  // ATMOSPHERE DRAW LOOP: Runs both background layers on one canvas to keep the home route self-contained.
  function drawAtmosphere() {
    if (document.body.classList.contains('still') || prefersReducedMotion || isHidden) {
      drawStaticAtmosphere();
      animationFrame = requestAnimationFrame(drawAtmosphere);
      return;
    }

    tick += 1;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawStars();
    drawOrbs(true);

    animationFrame = requestAnimationFrame(drawAtmosphere);
  }

  // RESIZE LISTENER: Recalculates the canvas and particle positions when the viewport size changes.
  window.addEventListener('resize', resizeCanvas, { passive: true });
  // VISIBILITY LISTENER: Pauses particle movement when the tab/document is hidden.
  document.addEventListener('visibilitychange', () => {
    isHidden = document.hidden;
  });

  // POINTER MOVE LISTENER: Updates CSS variables for mouse-follow glow and card hover hotspots.
  document.addEventListener('pointermove', event => {
    document.body.style.setProperty('--mx', `${event.clientX}px`);
    document.body.style.setProperty('--my', `${event.clientY}px`);
    document.querySelectorAll('.vm-card, .vm-panel').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--x', `${Math.max(0, Math.min(100, x))}%`);
      el.style.setProperty('--y', `${Math.max(0, Math.min(100, y))}%`);
    });
  }, { passive: true });

  // ATMOSPHERE STARTUP: Size the canvas first, then begin the animation loop.
  resizeCanvas();
  drawAtmosphere();
}

// REVEAL AND PAGE BOOTSTRAP: Scroll reveals and Home route startup.
// REVEAL OBSERVER INITIALIZER: Uses IntersectionObserver to add .is-visible when reveal elements enter the viewport.
function initRevealObserver() {
  const reveals = document.querySelectorAll(".reveal, .vm-reveal");
  if (!reveals.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    reveals.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => {
    el.addEventListener("focusin", () => el.classList.add("is-visible"));
    observer.observe(el);
  });
}

// PAGE BOOTSTRAP: Starts route behavior, then loads the large chart runtime after initial paint.
document.addEventListener("DOMContentLoaded", () => {
  initArchscryAtmosphere();
  scheduleHeroManaPreview();
  initRevealObserver();

  // BACK-TO-TOP SETUP: Stores the button and toggles its visibility based on scroll distance.
  const backTop = document.getElementById("backTop");
  // SCROLL LISTENER: Shows the back-to-top button only after the page has been scrolled down 500px.
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("show", window.scrollY > 500);
    });
  }
});

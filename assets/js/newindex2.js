            (function() {
              var d = 'M -38 -39 C -16 -56 26 -42 34 -8 C 42 26 8 54 -28 42 C -58 32 -56 -4 -28 4 C -6 10 18 4 20 -14 C 22 -35 -25 -35 -37 -40';
              ['cag-spiralW','cag-spiralU','cag-spiralB','cag-spiralR','cag-spiralG'].forEach(function(id) {
                var g = document.getElementById(id);
                if (!g) return;
                g.querySelectorAll('path').forEach(function(p) { p.setAttribute('d', d); });
              });
            })();

// SINGLE-COLOR PROFILE DATA: Source data for W/U/B/R/G, including title, descriptive text, chart color, and five axis scores. Preview the color system colors.
const colorProfiles = {
  W: {
    key: "W",
    name: "White",
    title: "White — Peace through Order",
    text: "White values structure, protection, community, duty, and shared stability. It asks how life can be made safer through order.",
    hex: "#f7f0d0",
    data: [96, 42, 24, 30, 58]
  },
  U: {
    key: "U",
    name: "Blue",
    title: "Blue — Perfection through Knowledge",
    text: "Blue values learning, patience, improvement, planning, and possibility. It asks what life could become with enough understanding.",
    hex: "#58b8ff",
    data: [38, 98, 36, 34, 54]
  },
  B: {
    key: "B",
    name: "Black",
    title: "Black — Power through Opportunity",
    text: "Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.",
    hex: "#230a41",
    data: [30, 56, 98, 62, 42]
  },
  R: {
    key: "R",
    name: "Red",
    title: "Red — Freedom through Action",
    text: "Red values emotion, impulse, authenticity, passion, and expression. It asks what is true when you stop pretending.",
    hex: "#ff6b55",
    data: [36, 34, 58, 98, 62]
  },
  G: {
    key: "G",
    name: "Green",
    title: "Green — Growth through Acceptance",
    text: "Green values nature, instinct, tradition, interdependence, and belonging. It asks what you already are beneath the noise.",
    hex: "#63e58d",
    data: [62, 48, 38, 58, 98]
  }
};

// IDENTITY DATASET: Combined list of selectable profiles. It starts with mono colors, then adds guilds and colleges.
const identities = [
  ...Object.values(colorProfiles).map(color => ({
    id: color.key,
    type: "mono",
    group: "mono",
    code: color.key,
    name: color.name,
    title: color.title,
    text: color.text,
    components: [color.key],
    data: color.data,
    hex: color.hex
  })),

  // Two-Color - Allied Guilds
  {
    id: "azorius",
    group: "allied",
    code: "WU",
    name: "Azorius",
    title: "Azorius — Law through Knowledge",
    text: "Azorius blends White order with Blue planning. It seeks peace through systems, procedure, control, and carefully managed improvement.",
    components: ["W", "U"],
    data: [82, 78, 28, 26, 54],
    hex: "#a8d9f5"
  },
  {
    id: "dimir",
    group: "allied",
    code: "UB",
    name: "Dimir",
    title: "Dimir — Secrets through Control",
    text: "Dimir blends Blue knowledge with Black ambition. It favors hidden information, memory, leverage, deception, and quiet control.",
    components: ["U", "B"],
    data: [34, 86, 76, 48, 46],
    hex: "#7f93f2"
  },
  {
    id: "rakdos",
    group: "allied",
    code: "BR",
    name: "Rakdos",
    title: "Rakdos — Appetite through Expression",
    text: "Rakdos blends Black ambition with Red freedom. It turns desire, spectacle, indulgence, danger, and provocation into identity.",
    components: ["B", "R"],
    data: [32, 48, 84, 88, 48],
    hex: "#d86e9a"
  },
  {
    id: "gruul",
    group: "allied",
    code: "RG",
    name: "Gruul",
    title: "Gruul — Instinct through Action",
    text: "Gruul blends Red freedom with Green instinct. It values impulse, survival, body-truth, terrain, revolt, and the wild beyond civilization.",
    components: ["R", "G"],
    data: [44, 38, 48, 86, 84],
    hex: "#c7a96a"
  },
  {
    id: "selesnya",
    group: "allied",
    code: "GW",
    name: "Selesnya",
    title: "Selesnya — Harmony through Belonging",
    text: "Selesnya blends Green growth with White order. It seeks harmony, stewardship, collective purpose, shared life, and belonging.",
    components: ["G", "W"],
    data: [86, 44, 30, 42, 84],
    hex: "#cde9a4"
  },

  // Two-Color - Enemy Guilds
  {
    id: "orzhov",
    group: "enemy",
    code: "WB",
    name: "Orzhov",
    title: "Orzhov — Obligation through Power",
    text: "Orzhov blends White structure with Black ambition. It frames duty, debt, hierarchy, devotion, sacrifice, and power as binding systems.",
    components: ["W", "B"],
    data: [78, 48, 78, 42, 50],
    hex: "#d3aedc"
  },
  {
    id: "izzet",
    group: "enemy",
    code: "UR",
    name: "Izzet",
    title: "Izzet — Discovery through Impulse",
    text: "Izzet blends Blue knowledge with Red freedom. It favors experiment, inspiration, volatility, invention, and sudden impossible insight.",
    components: ["U", "R"],
    data: [36, 86, 46, 82, 54],
    hex: "#88a9d6"
  },
  {
    id: "golgari",
    group: "enemy",
    code: "BG",
    name: "Golgari",
    title: "Golgari — Survival through Recursion",
    text: "Golgari blends Black ambition with Green growth. It sees decay, hunger, grave-soil, renewal, inevitability, and survival as one cycle.",
    components: ["B", "G"],
    data: [42, 52, 82, 58, 82],
    hex: "#84b68b"
  },
  {
    id: "boros",
    group: "enemy",
    code: "RW",
    name: "Boros",
    title: "Boros — Conviction through Action",
    text: "Boros blends Red freedom with White order. It channels courage, discipline, justice, coordinated force, and immediate moral action.",
    components: ["R", "W"],
    data: [84, 38, 46, 82, 62],
    hex: "#efad84"
  },
  {
    id: "simic",
    group: "enemy",
    code: "GU",
    name: "Simic",
    title: "Simic — Adaptation through Knowledge",
    text: "Simic blends Green growth with Blue knowledge. It values mutation, research, guided evolution, optimization, and becoming.",
    components: ["G", "U"],
    data: [52, 84, 38, 46, 88],
    hex: "#67d8c5"
  },

  // Two-Color - Strixhaven Colleges
  {
    id: "silverquill",
    group: "strixhaven",
    code: "WB",
    name: "Silverquill",
    title: "Silverquill — Language through Pressure",
    text: "Silverquill overlays White structure and Black ambition through rhetoric, charisma, status, moral pressure, sharp critique, and words as weapons.",
    components: ["W", "B"],
    data: [82, 54, 74, 52, 42],
    hex: "#efe2ff"
  },
  {
    id: "prismari",
    group: "strixhaven",
    code: "UR",
    name: "Prismari",
    title: "Prismari — Art through Volatility",
    text: "Prismari overlays Blue knowledge and Red freedom through elemental art, spectacle, inspiration, creativity, and expressive mastery.",
    components: ["U", "R"],
    data: [34, 78, 42, 88, 58],
    hex: "#8bd0ff"
  },
  {
    id: "witherbloom",
    group: "strixhaven",
    code: "BG",
    name: "Witherbloom",
    title: "Witherbloom — Life through Exchange",
    text: "Witherbloom overlays Black ambition and Green growth through life-death craft, medicine, decay, nourishment, pests, and resource exchange.",
    components: ["B", "G"],
    data: [38, 46, 78, 58, 88],
    hex: "#9bd36d"
  },
  {
    id: "lorehold",
    group: "strixhaven",
    code: "RW",
    name: "Lorehold",
    title: "Lorehold — History through Action",
    text: "Lorehold overlays Red freedom and White order through history, artifacts, memory, rhetoric, spirits, and action through legacy.",
    components: ["R", "W"],
    data: [78, 48, 42, 82, 64],
    hex: "#ffce84"
  },
  {
    id: "quandrix",
    group: "strixhaven",
    code: "GU",
    name: "Quandrix",
    title: "Quandrix — Pattern through Growth",
    text: "Quandrix overlays Green growth and Blue knowledge through mathematics, pattern, scale, nature as equation, and impossible geometry.",
    components: ["G", "U"],
    data: [48, 88, 34, 46, 84],
    hex: "#78e6ca"
  }
];

// RADAR AXES: Labels used both by the radar chart and the horizontal score list.
const axisLabels = ["Order", "Knowledge", "Ambition", "Freedom", "Growth"];

// COLOR HELPER: Converts hex colors like #ff6b55 into rgba(...) strings with transparency.
function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// GLOW GRADIENT HELPER: Builds CSS radial-gradient strings for one or more component colors.
function blendGradient(hexes) {
  if (!hexes || !hexes.length) {
    return `radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 62%)`;
  }

  if (hexes.length === 1) {
    return `radial-gradient(circle at center, ${hexToRgba(hexes[0], 0.35)}, transparent 62%)`;
  }

  const stops = hexes.map((hex, index) => {
    const position = ["35% 38%", "65% 62%", "50% 50%"][index] || "50% 50%";
    return `radial-gradient(circle at ${position}, ${hexToRgba(hex, 0.35 / (index + 1))}, transparent 62%)`;
  });

  return [
    ...stops,
    `radial-gradient(circle at center, ${hexToRgba(hexes[0], 0.18)}, transparent 68%)`
  ].join(",");
}

// CHART FILL HELPER: Creates a radial canvas gradient used as the radar dataset fill color.
function radialFill(chart, hexes) {
  if (!chart || !chart.chartArea) {
    return hexToRgba(hexes?.[0] || "#ffffff", 0.12);
  }

  const { left, right, top, bottom } = chart.chartArea;
  const cx = (left + right) / 2;
  const cy = (top + bottom) / 2;
  const radius = Math.max(right - left, bottom - top) / 2;
  const gradient = chart.ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  const stops = Math.max(2, hexes.length);

  hexes.forEach((hex, index) => {
    gradient.addColorStop(index / (stops - 1), hexToRgba(hex, 0.22));
  });

  gradient.addColorStop(1, "rgba(0,0,0,0)");
  return gradient;
}

// IDENTITY LOOKUP: Finds the selected identity by id/key from the identities array.
function findIdentity(id) {
  return identities.find(identity => identity.id === id || identity.key === id);
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

// HERO CYCLE TIMING: Bigger number = slower identity cycle; smaller number = faster cycle. 4800ms is 25% faster than 6000ms.
const heroManaCycleMs = 4800;
const heroManaBlackDisplayHex = "#a46bea";
const heroManaLoreUrl = "./data/factions.json";
const heroManaLoreKeys = {
  W: "W",
  U: "U",
  B: "B",
  R: "R",
  G: "G",
  azorius: "WU",
  dimir: "UB",
  rakdos: "BR",
  gruul: "RG",
  selesnya: "WG",
  orzhov: "WB",
  izzet: "UR",
  golgari: "BG",
  boros: "WR",
  simic: "UG",
  lorehold: "LOREHOLD",
  prismari: "PRISMARI",
  witherbloom: "WITHERBLOOM",
  quandrix: "QUANDRIX",
  silverquill: "SILVERQUILL"
};

function heroManaComponentHex(componentKey) {
  return componentKey === "B" ? heroManaBlackDisplayHex : colorProfiles[componentKey].hex;
}

function heroManaIdentityHex(identity) {
  return identity.components.length === 1 && identity.components[0] === "B"
    ? heroManaBlackDisplayHex
    : identity.hex;
}

function heroManaTierLabel(value) {
  // if (value <= 20) return "Dormant";
  // if (value <= 40) return "Stirring";
  // if (value <= 60) return "Aligned";
  // if (value <= 80) return "Resonant";
  return "";
}

const heroManaGlowPlugin = {
  id: "heroManaGlowPlugin",
  beforeDatasetDraw(chart, args) {
    const dataset = chart.data.datasets[args.index];
    if (dataset?._vmGlowBlur === false) return;

    const ctx = chart.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.shadowColor = dataset._vmGlowColor || dataset.borderColor || "rgba(255,255,255,0.6)";
    ctx.shadowBlur = dataset._vmGlowBlur ?? 18;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  },
  afterDatasetDraw(chart, args) {
    const dataset = chart.data.datasets[args.index];
    if (dataset?._vmGlowBlur === false) return;
    chart.ctx.restore();
  }
};

const heroManaHaloPlugin = {
  id: "heroManaHaloPlugin",
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const cx = (chartArea.left + chartArea.right) / 2;
    const cy = (chartArea.top + chartArea.bottom) / 2;
    const radius = Math.max(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top) / 2;
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, "rgba(216,194,122,0.042)");
    gradient.addColorStop(0.58, "rgba(88,184,255,0.025)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = gradient;
    ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
    ctx.restore();
  }
};

const heroManaTierLabelPlugin = {
  id: "heroManaTierLabelPlugin",
  afterDatasetDraw(chart, args) {
    const dataset = chart.data.datasets[args.index];
    if (!dataset?.tierLabels || chart.width < 360) return;

    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(args.index);
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.font = "500 10px Cinzel";
    ctx.textAlign = "center";

    meta.data.forEach((point, index) => {
      const axis = chart.data.labels[index];
      if (axis === "Order") return;

      const tier = heroManaTierLabel(Number(dataset.data[index]));
      const offsetY = point.y < centerY ? -9 : 14;
      const offsetX = point.x < chart.chartArea.left + 18 ? 12 : point.x > chart.chartArea.right - 18 ? -12 : 0;
      ctx.fillText(tier, point.x + offsetX, point.y + offsetY);
    });

    ctx.restore();
  }
};

function buildHeroManaDataset(identity) {
  const datasets = [];
  const componentHexes = identity.components.map(key => heroManaComponentHex(key));

  if (identity.components.length > 1) {
    identity.components.forEach(componentKey => {
      const component = colorProfiles[componentKey];
      const componentHex = heroManaComponentHex(componentKey);
      datasets.push({
        label: component.name,
        data: component.data,
        backgroundColor: hexToRgba(componentHex, 0.05),
        borderColor: hexToRgba(componentHex, 0.82),
        borderWidth: 2,
        borderDash: [6, 5],
        pointBackgroundColor: componentHex,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 3,
        tension: 0.22,
        _vmGlowBlur: componentKey === "B" ? 22 : 13,
        _vmGlowColor: hexToRgba(componentHex, componentKey === "B" ? 0.82 : 0.58)
      });
    });
  }

  const identityHex = heroManaIdentityHex(identity);
  datasets.push({
    label: identity.name,
    data: identity.data,
    backgroundColor: identity.components.length > 1
      ? radialFill(heroManaChart, componentHexes)
      : hexToRgba(identityHex, 0.22),
    borderColor: identityHex,
    borderWidth: identity.components.length > 1 ? 3 : 2.6,
    pointBackgroundColor: identityHex,
    pointBorderColor: "#ffffff",
    pointBorderWidth: 2,
    pointRadius: identity.components.length > 1 ? 5 : 4.5,
    pointHoverRadius: 10,
    pointHoverBorderWidth: 4,
    tension: 0.22,
    tierLabels: true,
    _vmGlowBlur: 26,
    _vmGlowColor: hexToRgba(identityHex, 0.72)
  });

  return datasets;
}

function setHeroManaGlow(identity) {
  const glow = document.getElementById("heroManaGlow");
  if (!glow) return;

  const componentHexes = identity.components.map(key => heroManaComponentHex(key));
  glow.style.background = blendGradient(componentHexes);
}

function summarizeHeroManaText(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences) return text;
  return sentences.slice(0, 2).join(" ").replace(/\s+/g, " ").trim();
}

function heroManaIdentityKind(identity) {
  if (!identity) return "Signal";
  if (identity.group === "mono") return "Color";
  if (identity.group === "strixhaven") return "College";
  return "Guild";
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
  return heroManaLoreKeys[identity.id] || heroManaLoreKeys[identity.key] || heroManaLoreKeys[identity.code] || "";
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

  if (identity.components.length === 1) {
    const identityHex = heroManaIdentityHex(identity);
    root.innerHTML = `
      <span class="vm-hero-mana-dataset-label">Profile:</span>
      <span class="vm-hero-mana-dataset-pill" style="--dataset-color:${identityHex};">${identity.name}</span>
    `;
    return;
  }

  const componentPills = identity.components.map(key => {
    const component = colorProfiles[key];
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
  return [
    ...identities.filter(identity => identity.group === "mono"),
    ...identities.filter(identity => identity.group === "allied"),
    ...identities.filter(identity => identity.group === "enemy"),
    ...identities.filter(identity => identity.group === "strixhaven")
  ];
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
    ? window.__vmVisualRegressionHeroIdentityId.trim().toLowerCase()
    : "";
  if (!forcedIdentityId) return false;

  const forcedIndex = heroManaCycleIdentities.findIndex(identity => identity.id === forcedIdentityId);
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
  if (!heroCanvas || !window.Chart) return;
  const heroManaPanel = document.querySelector(".vm-hero-mana");
  const heroManaLatch = document.getElementById("heroManaSignalLatch");
  heroManaReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  heroManaCycleIdentities = buildHeroManaCycleIdentities();
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
            font: { size: 12, weight: "700", family: "Cinzel" }
          }
        }
      }
    },
    plugins: [heroManaHaloPlugin, heroManaGlowPlugin, heroManaTierLabelPlugin]
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

// WEB COMPONENT: Defines a reusable <vm-dossier-card> custom element with its own Shadow DOM styling and click event.
class VMDossierCard extends HTMLElement {
  // WEB COMPONENT CONSTRUCTOR: Creates a shadow root so this component can own isolated markup/styles.
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // WEB COMPONENT MOUNT: Runs when <vm-dossier-card> is added to the page; reads attributes and renders internal HTML.
  connectedCallback() {
    const title = this.getAttribute('title') || 'Placeholder Dossier';
    const kind = this.getAttribute('kind') || 'Placeholder Type';
    const tone = this.getAttribute('tone') || 'Placeholder Tone';
    const signal = this.getAttribute('signal') || 'Placeholder signal';
    const details = this.getAttribute('details') || 'Placeholder details.';
    const bullets = (this.getAttribute('bullets') || 'Evidence one|Evidence two|Evidence three').split('|');
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'button');
    this.setAttribute('aria-label', `${title}: ${signal}`);
    this.shadowRoot.innerHTML = `
      <style>
        :host{ display:block; container-type:inline-size; }
        .card{ min-height:230px; height:100%; padding:1.1rem; position:relative; overflow:hidden; color:#f5ead2; background:linear-gradient(180deg, rgba(7,10,14,.92), rgba(3,4,6,.72)); border:1px solid rgba(215,162,60,.34); box-shadow:0 24px 70px rgba(0,0,0,.42); clip-path:polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px); transition:transform .28s ease, border-color .28s ease, box-shadow .28s ease; transform-style:preserve-3d; }
        .card::before{ content:""; position:absolute; inset:-30%; background:radial-gradient(circle at var(--x,50%) var(--y,10%), rgba(247,215,132,.2), transparent 16rem); opacity:.8; mix-blend-mode:screen; }
        .card:hover,.card:focus-within{ transform:translateY(-5px) rotateX(3deg) rotateY(-2deg); border-color:rgba(247,215,132,.82); box-shadow:0 32px 90px rgba(0,0,0,.5),0 0 32px rgba(215,162,60,.2); }
        button{ all:unset; display:block; width:100%; height:100%; position:relative; z-index:2; }
        .kind{ font-family:ui-monospace,Menlo,monospace; color:#d7a23c; letter-spacing:.16rem; text-transform:uppercase; font-size:.68rem; }
        h3{ font-family:Georgia,serif; font-weight:400; color:#f7d784; font-size:1.65rem; letter-spacing:.07em; margin:.75rem 0 .35rem; }
        p{ color:#a89b84; line-height:1.6; margin:.4rem 0; }
        .tone{ color:#58baff; font-family:ui-monospace,Menlo,monospace; font-size:.75rem; text-transform:uppercase; letter-spacing:.12rem; }
        ul{ margin:.7rem 0 0; padding-left:1rem; color:#cdbf9e; line-height:1.45; }
        @container (max-width:260px){ h3{font-size:1.25rem}.card{min-height:190px} }
      </style>
      <div class="card">
        <button type="button">
          <div class="kind">${kind}</div><h3>${title}</h3><div class="tone">${tone}</div><p>${signal}</p><ul>${bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        </button>
      </div>`;
    this.shadowRoot.querySelector('button').addEventListener('click', () => this.select(title, kind, details, bullets));
    this.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.select(title, kind, details, bullets);
      }
    });
    this.shadowRoot.querySelector('.card').addEventListener('mousemove', e => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--x', `${((e.clientX - r.left) / r.width * 100)}%`);
      e.currentTarget.style.setProperty('--y', `${((e.clientY - r.top) / r.height * 100)}%`);
    });
  }

  // WEB COMPONENT SELECT EVENT: Emits a custom event so outer page code can react to a dossier card selection.
  select(title, kind, details, bullets) {
    this.dispatchEvent(new CustomEvent('dossier-select', { bubbles: true, detail: { title, kind, details, bullets } }));
  }
}
// CUSTOM ELEMENT REGISTRATION: Tells the browser that <vm-dossier-card> should use the VMDossierCard class.
customElements.define('vm-dossier-card', VMDossierCard);

// REDUCED MOTION CHECK: Reads the user/browser setting. This variable is currently declared but not used later.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// SECOND REVEAL OBSERVER: Preserves the old hero-card-specific reveal path without re-observing .reveal elements.
const archscryRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      archscryRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
// PAGE BOOTSTRAP: Waits for deferred head scripts like graph.js, then starts page behavior.
document.addEventListener("DOMContentLoaded", () => {
  initArchscryAtmosphere();
  document.querySelectorAll('.hero-card').forEach(el => archscryRevealObserver.observe(el));
  initHeroManaPreview();
  initRevealObserver();

  // PLACEHOLDER NAV GUARD: Keeps future-page placeholder nav links visually clickable without scrolling or navigating yet.
  document.querySelectorAll("[data-vm-placeholder-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
    });
  });

  // BACK-TO-TOP SETUP: Stores the button and toggles its visibility based on scroll distance.
  const backTop = document.getElementById("backTop");
  // SCROLL LISTENER: Shows the back-to-top button only after the page has been scrolled down 500px.
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("show", window.scrollY > 500);
    });
  }
});

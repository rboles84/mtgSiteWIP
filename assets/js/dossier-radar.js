const DOSSIER_RADAR_AXES = ["Order", "Knowledge", "Ambition", "Freedom", "Growth"];

const DOSSIER_RESONANCE_TIERS = [
  { max: 20, label: "Dormant" },
  { max: 40, label: "Stirring" },
  { max: 60, label: "Aligned" },
  { max: 80, label: "Resonant" },
  { max: 100, label: "Dominant" },
];

const DOSSIER_COLOR_PROFILES = {
  W: {
    key: "W",
    name: "White",
    title: "White — Peace through Order",
    text: "White values structure, protection, community, duty, and shared stability. It asks how life can be made safer through order.",
    hex: "#f7f0d0",
    data: [96, 42, 24, 30, 58],
  },
  U: {
    key: "U",
    name: "Blue",
    title: "Blue — Perfection through Knowledge",
    text: "Blue values learning, patience, improvement, planning, and possibility. It asks what life could become with enough understanding.",
    hex: "#58b8ff",
    data: [38, 98, 36, 34, 54],
  },
  B: {
    key: "B",
    name: "Black",
    title: "Black — Power through Opportunity",
    text: "Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.",
    hex: "#a46bea",
    data: [30, 56, 98, 62, 42],
  },
  R: {
    key: "R",
    name: "Red",
    title: "Red — Freedom through Action",
    text: "Red values emotion, impulse, authenticity, passion, and expression. It asks what is true when you stop pretending.",
    hex: "#ff6b55",
    data: [36, 34, 58, 98, 62],
  },
  G: {
    key: "G",
    name: "Green",
    title: "Green — Growth through Acceptance",
    text: "Green values nature, instinct, tradition, interdependence, and belonging. It asks what you already are beneath the noise.",
    hex: "#63e58d",
    data: [62, 48, 38, 58, 98],
  },
};

const DOSSIER_RADAR_PROFILES = {
  W: {
    key: "W",
    name: "White",
    title: "White — Peace through Order",
    text: DOSSIER_COLOR_PROFILES.W.text,
    components: ["W"],
    data: DOSSIER_COLOR_PROFILES.W.data,
    hex: DOSSIER_COLOR_PROFILES.W.hex,
  },
  U: {
    key: "U",
    name: "Blue",
    title: "Blue — Perfection through Knowledge",
    text: DOSSIER_COLOR_PROFILES.U.text,
    components: ["U"],
    data: DOSSIER_COLOR_PROFILES.U.data,
    hex: DOSSIER_COLOR_PROFILES.U.hex,
  },
  B: {
    key: "B",
    name: "Black",
    title: "Black — Power through Opportunity",
    text: DOSSIER_COLOR_PROFILES.B.text,
    components: ["B"],
    data: DOSSIER_COLOR_PROFILES.B.data,
    hex: DOSSIER_COLOR_PROFILES.B.hex,
  },
  R: {
    key: "R",
    name: "Red",
    title: "Red — Freedom through Action",
    text: DOSSIER_COLOR_PROFILES.R.text,
    components: ["R"],
    data: DOSSIER_COLOR_PROFILES.R.data,
    hex: DOSSIER_COLOR_PROFILES.R.hex,
  },
  G: {
    key: "G",
    name: "Green",
    title: "Green — Growth through Acceptance",
    text: DOSSIER_COLOR_PROFILES.G.text,
    components: ["G"],
    data: DOSSIER_COLOR_PROFILES.G.data,
    hex: DOSSIER_COLOR_PROFILES.G.hex,
  },
  WU: {
    key: "WU",
    name: "Azorius",
    title: "Azorius — Law through Knowledge",
    text: "Azorius blends White order with Blue planning. It seeks peace through systems, procedure, control, and carefully managed improvement.",
    components: ["W", "U"],
    data: [82, 78, 28, 26, 54],
    hex: "#a8d9f5",
  },
  UB: {
    key: "UB",
    name: "Dimir",
    title: "Dimir — Secrets through Control",
    text: "Dimir blends Blue knowledge with Black ambition. It favors hidden information, memory, leverage, deception, and quiet control.",
    components: ["U", "B"],
    data: [34, 86, 76, 48, 46],
    hex: "#7f93f2",
  },
  BR: {
    key: "BR",
    name: "Rakdos",
    title: "Rakdos — Appetite through Expression",
    text: "Rakdos blends Black ambition with Red freedom. It turns desire, spectacle, indulgence, danger, and provocation into identity.",
    components: ["B", "R"],
    data: [32, 48, 84, 88, 48],
    hex: "#d86e9a",
  },
  RG: {
    key: "RG",
    name: "Gruul",
    title: "Gruul — Instinct through Action",
    text: "Gruul blends Red freedom with Green instinct. It values impulse, survival, body-truth, terrain, revolt, and the wild beyond civilization.",
    components: ["R", "G"],
    data: [44, 38, 48, 86, 84],
    hex: "#c7a96a",
  },
  WG: {
    key: "WG",
    name: "Selesnya",
    title: "Selesnya — Harmony through Belonging",
    text: "Selesnya blends Green growth with White order. It seeks harmony, stewardship, collective purpose, shared life, and belonging.",
    components: ["W", "G"],
    data: [86, 44, 30, 42, 84],
    hex: "#cde9a4",
  },
  WB: {
    key: "WB",
    name: "Orzhov",
    title: "Orzhov — Obligation through Power",
    text: "Orzhov blends White structure with Black ambition. It frames duty, debt, hierarchy, devotion, sacrifice, and power as binding systems.",
    components: ["W", "B"],
    data: [78, 48, 78, 42, 50],
    hex: "#d3aedc",
  },
  UR: {
    key: "UR",
    name: "Izzet",
    title: "Izzet — Discovery through Impulse",
    text: "Izzet blends Blue knowledge with Red freedom. It favors experiment, inspiration, volatility, invention, and sudden impossible insight.",
    components: ["U", "R"],
    data: [36, 86, 46, 82, 54],
    hex: "#88a9d6",
  },
  BG: {
    key: "BG",
    name: "Golgari",
    title: "Golgari — Survival through Recursion",
    text: "Golgari blends Black ambition with Green growth. It sees decay, hunger, grave-soil, renewal, inevitability, and survival as one cycle.",
    components: ["B", "G"],
    data: [42, 52, 82, 58, 82],
    hex: "#84b68b",
  },
  WR: {
    key: "WR",
    name: "Boros",
    title: "Boros — Conviction through Action",
    text: "Boros blends Red freedom with White order. It channels courage, discipline, justice, coordinated force, and immediate moral action.",
    components: ["W", "R"],
    data: [84, 38, 46, 82, 62],
    hex: "#efad84",
  },
  UG: {
    key: "UG",
    name: "Simic",
    title: "Simic — Adaptation through Knowledge",
    text: "Simic blends Green growth with Blue knowledge. It values mutation, research, guided evolution, optimization, and becoming.",
    components: ["U", "G"],
    data: [52, 84, 38, 46, 88],
    hex: "#67d8c5",
  },
  SILVERQUILL: {
    key: "SILVERQUILL",
    name: "Silverquill",
    title: "Silverquill — Language through Pressure",
    text: "Silverquill overlays White structure and Black ambition through rhetoric, charisma, status, moral pressure, sharp critique, and words as weapons.",
    components: ["W", "B"],
    data: [82, 54, 74, 52, 42],
    hex: "#efe2ff",
  },
  PRISMARI: {
    key: "PRISMARI",
    name: "Prismari",
    title: "Prismari — Art through Volatility",
    text: "Prismari overlays Blue knowledge and Red freedom through elemental art, spectacle, inspiration, creativity, and expressive mastery.",
    components: ["U", "R"],
    data: [34, 78, 42, 88, 58],
    hex: "#8bd0ff",
  },
  WITHERBLOOM: {
    key: "WITHERBLOOM",
    name: "Witherbloom",
    title: "Witherbloom — Life through Exchange",
    text: "Witherbloom overlays Black ambition and Green growth through life-death craft, medicine, decay, nourishment, pests, and resource exchange.",
    components: ["B", "G"],
    data: [38, 46, 78, 58, 88],
    hex: "#9bd36d",
  },
  LOREHOLD: {
    key: "LOREHOLD",
    name: "Lorehold",
    title: "Lorehold — History through Action",
    text: "Lorehold overlays Red freedom and White order through history, artifacts, memory, rhetoric, spirits, and action through legacy.",
    components: ["W", "R"],
    data: [78, 48, 42, 82, 64],
    hex: "#ffce84",
  },
  QUANDRIX: {
    key: "QUANDRIX",
    name: "Quandrix",
    title: "Quandrix — Pattern through Growth",
    text: "Quandrix overlays Green growth and Blue knowledge through mathematics, pattern, scale, nature as equation, and impossible geometry.",
    components: ["U", "G"],
    data: [48, 88, 34, 46, 84],
    hex: "#78e6ca",
  },
};

let dossierManaRadarChart = null;

function escapeDossierHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function dossierTierLabel(value) {
  const tier = DOSSIER_RESONANCE_TIERS.find((entry) => value <= entry.max);
  return tier ? tier.label : "";
}

function dossierHexToRgba(hex, alpha) {
  const clean = String(hex || "").replace("#", "");
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function dossierBlendGradient(hexes) {
  if (!hexes?.length) {
    return "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 62%)";
  }

  if (hexes.length === 1) {
    return `radial-gradient(circle at center, ${dossierHexToRgba(hexes[0], 0.35)}, transparent 62%)`;
  }

  const positions = ["24% 24%", "76% 28%", "50% 72%"];
  const gradients = hexes.map((hex, index) => (
    `radial-gradient(circle at ${positions[index] || "50% 50%"}, ${dossierHexToRgba(hex, 0.28 / (index + 1))}, transparent 62%)`
  ));

  gradients.push(`radial-gradient(circle at center, ${dossierHexToRgba(hexes[0], 0.18)}, transparent 68%)`);
  return gradients.join(",");
}

function dossierSelectedGlow(profile) {
  const hexes = (profile.components || [])
    .map((key) => DOSSIER_COLOR_PROFILES[key]?.hex)
    .filter(Boolean);
  return dossierBlendGradient(hexes.length ? hexes : [profile.hex]);
}

function dossierRadialFill(chart, hexes) {
  if (!chart || !chart.chartArea) {
    return dossierHexToRgba(hexes?.[0] || "#ffffff", 0.12);
  }

  const { left, right, top, bottom } = chart.chartArea;
  const cx = (left + right) / 2;
  const cy = (top + bottom) / 2;
  const radius = Math.max(right - left, bottom - top) / 2;
  const gradient = chart.ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  const stops = Math.max(2, hexes.length);

  hexes.forEach((hex, index) => {
    gradient.addColorStop(index / (stops - 1), dossierHexToRgba(hex, 0.22));
  });
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  return gradient;
}

function buildDossierFallbackProfile(result, faction) {
  const components = Array.isArray(faction?.colors) && faction.colors.length
    ? [...faction.colors]
    : ["W"];
  const sourceProfiles = components
    .map((key) => DOSSIER_COLOR_PROFILES[key])
    .filter(Boolean);
  const averaged = DOSSIER_RADAR_AXES.map((_, index) => {
    const values = sourceProfiles.map((profile) => profile.data[index]);
    const sum = values.reduce((total, value) => total + value, 0);
    return Math.round(sum / Math.max(values.length, 1));
  });
  const titleName = faction?.name || result?.faction || "Identity";
  return {
    key: String(result?.faction || faction?.key || "UNKNOWN").toUpperCase(),
    name: titleName,
    title: `${titleName} — Composite Reading`,
    text: "This synthesis blends the active color pressures in the reading into one previewable identity shape.",
    components,
    data: averaged,
    hex: sourceProfiles[0]?.hex || "#d6a84e",
  };
}

function normalizeProfileComponents(profile, faction) {
  const factionColors = Array.isArray(faction?.colors) && faction.colors.length
    ? faction.colors.filter((color) => DOSSIER_COLOR_PROFILES[color])
    : [];
  if (factionColors.length === profile.components.length) {
    return factionColors;
  }
  return profile.components.filter((color) => DOSSIER_COLOR_PROFILES[color]);
}

function getDossierRadarProfile(result, faction) {
  const factionKey = String(result?.faction || faction?.key || "").toUpperCase();
  const direct = DOSSIER_RADAR_PROFILES[factionKey];
  if (!direct) {
    return buildDossierFallbackProfile(result, faction);
  }

  return {
    ...direct,
    components: normalizeProfileComponents(direct, faction),
  };
}

function renderDossierAxisList(profile) {
  return DOSSIER_RADAR_AXES.map((label, index) => {
    const value = Number(profile.data[index] || 0);
    const tier = dossierTierLabel(value);
    return `
      <div class="vm-axis">
        <span>${escapeDossierHtml(label)}</span>
        <span class="vm-axis-bar">
          <span class="vm-axis-fill" style="width:${value}%; background:${escapeDossierHtml(profile.hex)};"></span>
        </span>
        <span>${value} — ${escapeDossierHtml(tier)}</span>
      </div>`;
  }).join("");
}

function renderDossierOverlayLine(profile) {
  if ((profile.components || []).length <= 1) {
    return `
      <span>Profile:</span>
      <span class="vm-overlay-dot vm-overlay-dot-final" style="border-color:${escapeDossierHtml(profile.hex)};">${escapeDossierHtml(profile.name)}</span>`;
  }

  const componentDots = profile.components.map((componentKey) => {
    const component = DOSSIER_COLOR_PROFILES[componentKey];
    return `<span class="vm-overlay-dot" style="border-color:${escapeDossierHtml(component.hex)};">${escapeDossierHtml(component.name)}</span>`;
  }).join('<span class="vm-overlay-arrow" aria-hidden="true">→</span>');

  return `
    ${componentDots}
    <span class="vm-overlay-arrow" aria-hidden="true">→</span>
    <span class="vm-overlay-dot vm-overlay-dot-final" style="border-color:${escapeDossierHtml(profile.hex)};">${escapeDossierHtml(profile.name)}</span>`;
}

function renderDossierDatasetPills(profile, showComponents, showComposite) {
  const pills = [];
  const multiColor = (profile.components || []).length > 1;

  if (multiColor && showComponents) {
    profile.components.forEach((componentKey, index) => {
      const component = DOSSIER_COLOR_PROFILES[componentKey];
      const hasArrow = showComposite && index === profile.components.length - 1;
      pills.push(`
        <span class="vm-pill${hasArrow ? " has-arrow" : ""}" data-label="${escapeDossierHtml(component.name)}" style="border-color:${escapeDossierHtml(component.hex)};">${escapeDossierHtml(component.name)}</span>`);
    });
  }

  if (showComposite || !multiColor) {
    pills.push(`
      <span class="vm-pill active" data-label="${escapeDossierHtml(profile.name)}" style="border-color:${escapeDossierHtml(profile.hex)};">${escapeDossierHtml(profile.name)}</span>`);
  }

  return pills.join("");
}

function renderDossierRadarSection({ result, faction }) {
  const profile = getDossierRadarProfile(result, faction);
  const multiColor = (profile.components || []).length > 1;
  const controlsHtml = multiColor
    ? `
      <div class="vm-controls">
        <label class="vm-toggle">
          <input id="dossierComponentToggle" type="checkbox" checked>
          <span>show component colors</span>
        </label>
        <label class="vm-toggle">
          <input id="dossierCompositeToggle" type="checkbox" checked>
          <span>show synthesis</span>
        </label>
      </div>`
    : "";

  return `
    <div class="scores-section vm-dossier-matrix-section">
      <div class="section-label">Mana Alignment Matrix</div>
      <div class="vm-panel vm-lab-panel vm-dossier-radar-panel">
        <div class="vm-lab-layout">
          <div class="vm-selector-panel">
            <div class="vm-selector-title">
              <h3>Identity Matrix</h3>
              <span>${multiColor ? "Placement Synthesis" : "Placement Profile"}</span>
            </div>
            <div class="vm-selected-card" id="dossierSelectedCard">
              <div class="vm-selected-kicker" id="dossierSelectedKicker">${multiColor ? "Selected Synthesis" : "Selected Profile"}</div>
              <h3 id="dossierColorTitle">${escapeDossierHtml(profile.title)}</h3>
              <p id="dossierColorText">${escapeDossierHtml(profile.text)}</p>
              <div class="vm-overlay-line" id="dossierOverlayLine">${renderDossierOverlayLine(profile)}</div>
            </div>
            <div class="vm-axis-list" id="dossierAxisList">${renderDossierAxisList(profile)}</div>
            <div class="vm-placeholder-note">Mana alignment translates your placement into philosophical pressure: Order, Knowledge, Ambition, Freedom, and Growth.</div>
          </div>
          <div class="vm-radar-card">
            ${controlsHtml}
            <div class="vm-chart-wrap">
              <div class="vm-radar-glow" id="dossierRadarGlow"></div>
              <div class="vm-radar-wrap">
                <canvas id="dossierManaRadar" aria-label="Vox Mana placement radar chart"></canvas>
                <div class="vm-radar-fallback" data-dossier-radar-fallback hidden></div>
              </div>
              <p class="vm-radar-caption" id="dossierRadarCaption">Current profile: ${escapeDossierHtml(profile.name)}</p>
              <div class="vm-dataset-pills" id="dossierDatasetPills">${renderDossierDatasetPills(profile, multiColor, true)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function destroyDossierManaRadar() {
  if (dossierManaRadarChart) {
    dossierManaRadarChart.destroy();
    dossierManaRadarChart = null;
  }
}

function buildDossierRadarDatasets(profile, showComponents, showComposite) {
  const datasets = [];
  const multiColor = (profile.components || []).length > 1;

  if (multiColor && showComponents) {
    profile.components.forEach((componentKey) => {
      const component = DOSSIER_COLOR_PROFILES[componentKey];
      datasets.push({
        label: component.name,
        data: component.data,
        backgroundColor: dossierHexToRgba(component.hex, 0.05),
        borderColor: dossierHexToRgba(component.hex, 0.82),
        borderWidth: 2,
        borderDash: [6, 5],
        pointBackgroundColor: component.hex,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 3,
        tension: 0.22,
        _vmGlowBlur: 12,
      });
    });
  }

  if (showComposite || !multiColor) {
    datasets.push({
      label: profile.name,
      data: profile.data,
      backgroundColor: multiColor
        ? dossierRadialFill(dossierManaRadarChart, profile.components.map((key) => DOSSIER_COLOR_PROFILES[key]?.hex).filter(Boolean))
        : dossierHexToRgba(profile.hex, 0.22),
      borderColor: profile.hex,
      borderWidth: 3,
      pointBackgroundColor: profile.hex,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 11,
      pointHoverBorderWidth: 4,
      tension: 0.22,
      tierLabels: true,
      _vmGlowBlur: 26,
    });
  }

  return datasets;
}

function initDossierManaRadar({ result, faction, profile }) {
  const resolvedProfile = profile || getDossierRadarProfile(result, faction);
  const card = document.getElementById("dossierSelectedCard");
  const glow = document.getElementById("dossierRadarGlow");
  const caption = document.getElementById("dossierRadarCaption");
  const pills = document.getElementById("dossierDatasetPills");
  const fallback = document.querySelector("[data-dossier-radar-fallback]");
  const canvas = document.getElementById("dossierManaRadar");
  const componentToggle = document.getElementById("dossierComponentToggle");
  const compositeToggle = document.getElementById("dossierCompositeToggle");
  const controls = document.querySelector(".vm-controls");

  destroyDossierManaRadar();

  if (!card || !glow || !caption || !pills || !canvas) {
    return;
  }

  card.style.setProperty("--selected-glow", dossierSelectedGlow(resolvedProfile));
  glow.style.background = dossierBlendGradient(
    (resolvedProfile.components || [])
      .map((component) => DOSSIER_COLOR_PROFILES[component]?.hex)
      .filter(Boolean)
  );
  caption.textContent = `Current profile: ${resolvedProfile.name}`;

  let showComponents = (resolvedProfile.components || []).length > 1;
  let showComposite = true;

  const updatePills = () => {
    pills.innerHTML = renderDossierDatasetPills(resolvedProfile, showComponents, showComposite);
  };

  const fallbackMessage = "Radar preview unavailable right now. The placement synthesis details still appear at left.";
  const ChartCtor = globalThis.Chart;
  if (typeof ChartCtor !== "function") {
    canvas.hidden = true;
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = fallbackMessage;
    }
    if (controls) {
      controls.querySelectorAll("input").forEach((input) => {
        input.disabled = true;
      });
    }
    caption.textContent = "Current profile: placement details only";
    updatePills();
    return;
  }

  if (fallback) {
    fallback.hidden = true;
  }
  canvas.hidden = false;
  if (controls) {
    controls.querySelectorAll("input").forEach((input) => {
      input.disabled = false;
    });
  }

  const dossierGlowPlugin = {
    id: "dossierGlow",
    beforeDatasetDraw(chart, args) {
      const dataset = chart.data.datasets[args.index];
      const ctx = chart.ctx;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowColor = dataset.borderColor || "rgba(255,255,255,0.6)";
      ctx.shadowBlur = dataset._vmGlowBlur ?? 18;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    afterDatasetDraw(chart) {
      chart.ctx.restore();
    },
  };

  const dossierHaloPlugin = {
    id: "dossierHalo",
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) {
        return;
      }
      const cx = (chartArea.left + chartArea.right) / 2;
      const cy = (chartArea.top + chartArea.bottom) / 2;
      const radius = Math.max(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top) / 2;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, "rgba(216,194,122,0.035)");
      gradient.addColorStop(0.6, "rgba(216,194,122,0.02)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = gradient;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.restore();
    },
  };

  const dossierTierLabelsPlugin = {
    id: "dossierTierLabels",
    afterDatasetDraw(chart, args) {
      const dataset = chart.data.datasets[args.index];
      if (!dataset?.tierLabels) {
        return;
      }

      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(args.index);
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "500 11px Cinzel";
      ctx.textAlign = "center";

      meta.data.forEach((point, index) => {
        const axis = chart.data.labels[index];
        if (axis === "Order") {
          return;
        }

        const value = dataset.data[index];
        const tier = dossierTierLabel(Number(value));
        if (!tier) {
          return;
        }

        const x = point.x;
        const y = point.y;
        const offsetY = y < centerY ? -10 : 16;
        const offsetX = x < chart.chartArea.left + 20 ? 14 : x > chart.chartArea.right - 20 ? -14 : 0;

        ctx.fillText(tier, x + offsetX, y + offsetY);
      });

      ctx.restore();
    },
  };

  const syncDatasets = () => {
    if (componentToggle && compositeToggle && !componentToggle.checked && !compositeToggle.checked) {
      compositeToggle.checked = true;
    }

    showComponents = componentToggle ? componentToggle.checked : false;
    showComposite = compositeToggle ? compositeToggle.checked : true;

    dossierManaRadarChart.data.datasets = buildDossierRadarDatasets(resolvedProfile, showComponents, showComposite);
    dossierManaRadarChart.update();
    updatePills();
  };

  dossierManaRadarChart = new ChartCtor(canvas.getContext("2d"), {
    plugins: [dossierHaloPlugin, dossierGlowPlugin, dossierTierLabelsPlugin],
    type: "radar",
    data: {
      labels: DOSSIER_RADAR_AXES,
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 850,
        easing: "easeInOutQuart",
      },
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label(context) {
              const value = context.raw ?? context.parsed?.r ?? context.formattedValue;
              const tier = dossierTierLabel(Number(value));
              return `${context.dataset.label}: ${context.formattedValue}${tier ? ` — ${tier}` : ""}`;
            },
          },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            color: "rgba(255,255,255,0.55)",
            backdropColor: "transparent",
            stepSize: 20,
            callback: () => "",
          },
          angleLines: {
            color: "rgba(240, 197, 106, 0.25)",
          },
          grid: {
            color: "rgba(240, 197, 106, 0.22)",
          },
          pointLabels: {
            color: "#ffffff",
            font: {
              size: 14,
              weight: "700",
            },
          },
        },
      },
    },
  });

  dossierManaRadarChart.data.datasets = buildDossierRadarDatasets(resolvedProfile, showComponents, showComposite);
  dossierManaRadarChart.update();

  if (componentToggle) {
    componentToggle.addEventListener("change", syncDatasets);
  }
  if (compositeToggle) {
    compositeToggle.addEventListener("change", syncDatasets);
  }

  updatePills();
}

export {
  DOSSIER_RADAR_AXES,
  destroyDossierManaRadar,
  getDossierRadarProfile,
  initDossierManaRadar,
  renderDossierAxisList,
  renderDossierDatasetPills,
  renderDossierOverlayLine,
  renderDossierRadarSection,
};

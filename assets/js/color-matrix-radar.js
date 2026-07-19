/**
 * Vox Mana - Color Matrix Radar Chart
 * Portable identity radar for home, dossier, and result surfaces.
 * Requires Chart.js to be loaded before this script.
 */

(function () {
  "use strict";

  // ============================================================================
  // COLOR PROFILES & IDENTITY DATA
  // ============================================================================

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
      hex: "#a46bea",
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
      text: "Green accepts a role within the web of life and lets inherent nature unfold. Its growth is patient, purposeful, and wary of mistaking every change for wisdom.",
      hex: "#63e58d",
      data: [62, 48, 38, 58, 98]
    }
  };

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

  const axisLabels = ["Order", "Knowledge", "Ambition", "Freedom", "Growth"];

  const resonanceTiers = [
    { max: 20, label: "Dormant" },
    { max: 40, label: "Stirring" },
    { max: 60, label: "Aligned" },
    { max: 80, label: "Resonant" },
    { max: 100, label: "Dominant" }
  ];

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  function valueToResonanceTier(value) {
    const tier = resonanceTiers.find(t => value <= t.max);
    return tier ? tier.label : "";
  }

  function hexToRgba(hex, alpha) {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

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

  function manaSymbols(code) {
    return code.split("").map(symbol => `{${symbol}}`).join("");
  }

  function findIdentity(id) {
    return identities.find(identity => identity.id === id || identity.key === id);
  }

  function renderAxisList(identity) {
    const axisList = document.getElementById("axisList");
    if (!axisList) return;

    axisList.innerHTML = axisLabels.map((label, index) => {
      const value = identity.data[index];
      return `
        <div class="vm-axis">
          <span>${label}</span>
          <span class="vm-axis-bar">
            <span class="vm-axis-fill" style="width:${value}%; background:${identity.hex};"></span>
          </span>
          <span>${value} — ${valueToResonanceTier(value)}</span>
        </div>
      `;
    }).join("");
  }

  // ============================================================================
  // CHART.JS PLUGINS
  // ============================================================================

  const vmGlow = {
    id: "vmGlow",
    beforeDatasetDraw(chart, args) {
      const ds = chart.data.datasets[args.index];
      const ctx = chart.ctx;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowColor = ds.borderColor || "rgba(255,255,255,0.6)";
      ctx.shadowBlur = ds._vmGlowBlur ?? 18;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    afterDatasetDraw(chart) {
      chart.ctx.restore();
    }
  };

  const vmHalo = {
    id: "vmHalo",
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
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
    }
  };

  const vmTierLabels = {
    id: "vmTierLabels",
    afterDatasetDraw(chart, args) {
      const dataset = chart.data.datasets[args.index];
      if (!dataset.tierLabels) return;

      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(args.index);
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "500 11px Fraunces, Georgia, serif";
      ctx.textAlign = "center";

      meta.data.forEach((point, index) => {
        const axis = chart.data.labels[index];
        if (axis === "Order") return;

        const value = dataset.data[index];
        const tier = valueToResonanceTier(Number(value));
        if (!tier) return;

        const x = point.x;
        const y = point.y;
        const offsetY = y < centerY ? -10 : 16;
        const offsetX = x < chart.chartArea.left + 20 ? 14 : x > chart.chartArea.right - 20 ? -14 : 0;

        ctx.fillText(tier, x + offsetX, y + offsetY);
      });

      ctx.restore();
    }
  };

  // ============================================================================
  // CHART INITIALIZATION
  // ============================================================================

  let radarChart;

  function initRadarChart() {
    const radarCanvas = document.getElementById("vmRadar");
    if (!radarCanvas) {
      console.warn("vmRadar canvas not found - radar chart will not initialize");
      return null;
    }

    const radarContext = radarCanvas.getContext("2d");

    radarChart = new Chart(radarContext, {
      plugins: [vmHalo, vmGlow, vmTierLabels],
      type: "radar",
      data: {
        labels: axisLabels,
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 850,
          easing: "easeInOutQuart"
        },
        interaction: {
          mode: "nearest",
          intersect: false
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "rgba(255,255,255,0.84)",
              padding: 14,
              font: {
                size: 12,
                family: "Fraunces, Georgia, serif"
              }
            }
          },
          tooltip: {
            callbacks: {
              label: context => {
                const value = context.raw ?? context.parsed?.r ?? context.formattedValue;
                const tier = valueToResonanceTier(Number(value));
                return `${context.dataset.label}: ${context.formattedValue}${tier ? ` — ${tier}` : ""}`;
              }
            }
          }
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              color: "rgba(255,255,255,0.55)",
              backdropColor: "transparent",
              stepSize: 20,
              callback: value => {
                const ringLabels = {};
                return ringLabels[value] || "";
              }
            },
            angleLines: {
              color: "rgba(240, 197, 106, 0.25)"
            },
            grid: {
              color: "rgba(240, 197, 106, 0.22)"
            },
            pointLabels: {
              color: "#ffffff",
              font: {
                size: 14,
                weight: "700"
              }
            }
          }
        }
      }
    });

    return radarChart;
  }

  // ============================================================================
  // DATASET BUILDING
  // ============================================================================

  function buildDatasets(identity) {
    const datasets = [];
    const compOn = document.getElementById("componentToggle")?.checked ?? true;
    const synOn = document.getElementById("compositeToggle")?.checked ?? true;

    if (identity.components.length > 1 && compOn) {
      identity.components.forEach(componentKey => {
        const component = colorProfiles[componentKey];
        datasets.push({
          label: component.name,
          data: component.data,
          backgroundColor: hexToRgba(component.hex, 0.05),
          borderColor: hexToRgba(component.hex, 0.82),
          borderWidth: 2,
          borderDash: [6, 5],
          pointBackgroundColor: component.hex,
          pointBorderColor: "#ffffff",
          pointBorderWidth: 1,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointHoverBorderWidth: 3,
          tension: 0.22,
          _vmGlowBlur: 12
        });
      });
    }

    if (synOn || identity.components.length === 1) {
      datasets.push({
        label: identity.name,
        data: identity.data,
        backgroundColor: identity.components.length > 1
          ? radialFill(radarChart, identity.components.map(key => colorProfiles[key].hex))
          : hexToRgba(identity.hex, 0.22),
        borderColor: identity.hex,
        borderWidth: 3,
        pointBackgroundColor: identity.hex,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 11,
        pointHoverBorderWidth: 4,
        tension: 0.22,
        tierLabels: true,
        _vmGlowBlur: 26
      });
    }

    return datasets;
  }

  function updateGlow(identity) {
    const radarGlow = document.getElementById("radarGlow");
    if (!radarGlow) return;

    const glowHexes = identity.components.length > 1
      ? identity.components.map(key => colorProfiles[key].hex)
      : [identity.hex];

    radarGlow.style.background = blendGradient(glowHexes);
  }

  // ============================================================================
  // LENS STATE & GRID RENDERING
  // ============================================================================

  const lensState = {
    mode: "mono",
    guildGroup: "allied",
    selectedId: "W"
  };

  function blendChoiceGlow(identity) {
    if (identity.components.length === 1) {
      return `radial-gradient(circle at top right, ${hexToRgba(identity.hex, 0.38)}, transparent 70%)`;
    }

    const first = colorProfiles[identity.components[0]].hex;
    const second = colorProfiles[identity.components[1]].hex;

    return `
      radial-gradient(circle at 20% 20%, ${hexToRgba(first, 0.34)}, transparent 55%),
      radial-gradient(circle at 80% 80%, ${hexToRgba(second, 0.34)}, transparent 55%)
    `;
  }

  function getVisibleIdentities() {
    if (lensState.mode === "mono") {
      return identities.filter(identity => identity.group === "mono");
    }

    if (lensState.mode === "guilds") {
      return identities.filter(identity => identity.group === lensState.guildGroup);
    }

    return identities.filter(identity => identity.group === "strixhaven");
  }

  function renderIdentityGrid() {
    const grid = document.getElementById("identityGrid");
    if (!grid) return;

    const visibleIdentities = getVisibleIdentities();

    grid.classList.toggle("mono", lensState.mode === "mono");

    grid.innerHTML = visibleIdentities.map(identity => `
      <button
        class="vm-lens-choice ${identity.id === lensState.selectedId ? "active" : ""}"
        data-id="${identity.id}"
        style="--choice-glow:${blendChoiceGlow(identity).replace(/\n/g, " ")}"
      >
        <span class="vm-lens-symbols">${manaSymbols(identity.code)}</span>
        <span class="vm-lens-name">${identity.name}</span>
        <span class="vm-lens-mini">${identity.components.length > 1 ? identity.components.map(key => colorProfiles[key].name).join(" + ") : "Core color profile"}</span>
      </button>
    `).join("");

    document.querySelectorAll(".vm-lens-choice").forEach(choice => {
      choice.addEventListener("click", () => updateRadar(choice.dataset.id));
    });
  }

  function setLensMode(mode) {
    lensState.mode = mode;

    document.querySelectorAll(".vm-lens-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.mode === mode);
    });

    const guildSubtabs = document.getElementById("guildSubtabs");
    if (guildSubtabs) {
      guildSubtabs.classList.toggle("show", mode === "guilds");
    }

    const visibleIdentities = getVisibleIdentities();
    const currentlyVisible = visibleIdentities.some(identity => identity.id === lensState.selectedId);

    if (!currentlyVisible && visibleIdentities.length) {
      lensState.selectedId = visibleIdentities[0].id;
    }

    renderIdentityGrid();
    updateRadar(lensState.selectedId, false);
  }

  function setGuildGroup(group) {
    lensState.guildGroup = group;

    document.querySelectorAll(".vm-lens-subtab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.guildGroup === group);
    });

    const visibleIdentities = getVisibleIdentities();
    lensState.selectedId = visibleIdentities[0].id;

    renderIdentityGrid();
    updateRadar(lensState.selectedId, false);
  }

  // ============================================================================
  // UPDATE FUNCTIONS
  // ============================================================================

  function updateSelectedCard(identity) {
    const selectedKicker = document.getElementById("selectedKicker");
    const colorTitle = document.getElementById("colorTitle");
    const colorText = document.getElementById("colorText");
    const selectedCard = document.getElementById("selectedCard");
    const overlayLine = document.getElementById("overlayLine");

    if (selectedKicker) {
      selectedKicker.textContent =
        identity.components.length > 1 ? "Selected Synthesis" : "Selected Profile";
    }

    if (colorTitle) {
      colorTitle.textContent = identity.title;
    }

    if (colorText) {
      colorText.textContent = identity.text;
    }

    if (selectedCard) {
      selectedCard.style.setProperty("--selected-glow", blendChoiceGlow(identity));
    }

    if (!overlayLine) return;

    if (identity.components.length === 1) {
      overlayLine.innerHTML = `
        <span>Profile:</span>
        <span class="vm-overlay-dot" style="border-color:${identity.hex};">${identity.name}</span>
      `;
      return;
    }

    const componentDots = identity.components.map(key => {
      const component = colorProfiles[key];
      return `<span class="vm-overlay-dot" style="border-color:${component.hex};">${component.name}</span>`;
    }).join("");

    overlayLine.innerHTML = `
      <span>Overlay:</span>
      ${componentDots}
      <span>→</span>
      <span class="vm-overlay-dot" style="border-color:${identity.hex}; color:${identity.hex};">${identity.name}</span>
    `;
  }

  function updateActiveLensChoice(identity) {
    lensState.selectedId = identity.id;

    document.querySelectorAll(".vm-lens-choice").forEach(choice => {
      choice.classList.toggle("active", choice.dataset.id === identity.id);
    });
  }

  function updateDatasetPills(datasets, identity) {
    const datasetPills = document.getElementById("datasetPills");
    if (!datasetPills) return;

    datasetPills.innerHTML = datasets.map(dataset => {
      const isActive = identity && dataset.label === identity.name;
      const lastComponentName = identity && identity.components.length > 1
        ? colorProfiles[identity.components[identity.components.length - 1]].name
        : null;
      const showArrow = identity && identity.components.length > 1 && dataset.label === lastComponentName;
      return `
        <span class="vm-pill${isActive ? " active" : ""}${showArrow ? " has-arrow" : ""}" data-label="${dataset.label}" style="border-color:${dataset.borderColor};">${dataset.label}</span>
      `;
    }).join("");
  }

  function updateRadar(identityId, refreshGrid = true) {
    if (!radarChart) return;

    const identity = findIdentity(identityId);
    if (!identity) return;

    const datasets = buildDatasets(identity);

    const radarCaption = document.getElementById("radarCaption");
    if (radarCaption) {
      radarCaption.textContent = `Current profile: ${identity.name}`;
    }

    radarChart.data.datasets = datasets;
    radarChart.update();

    renderAxisList(identity);
    updateGlow(identity);
    updateSelectedCard(identity);
    updateActiveLensChoice(identity);
    updateDatasetPills(datasets, identity);

    if (refreshGrid) {
      renderIdentityGrid();
    }
  }

  // ============================================================================
  // EVENT LISTENERS
  // ============================================================================

  function attachEventListeners() {
    const componentToggle = document.getElementById("componentToggle");
    if (componentToggle) {
      componentToggle.addEventListener("change", () => updateRadar(lensState.selectedId, false));
    }

    const compositeToggle = document.getElementById("compositeToggle");
    if (compositeToggle) {
      compositeToggle.addEventListener("change", () => updateRadar(lensState.selectedId, false));
    }

    document.querySelectorAll(".vm-lens-tab").forEach(tab => {
      tab.addEventListener("click", () => setLensMode(tab.dataset.mode));
    });

    document.querySelectorAll(".vm-lens-subtab").forEach(tab => {
      tab.addEventListener("click", () => setGuildGroup(tab.dataset.guildGroup));
    });
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function init() {
    // Check if Chart.js is available
    if (typeof Chart === "undefined") {
      console.error("Chart.js is required but not loaded. Please load Chart.js before color-matrix-radar.js");
      return;
    }

    // Initialize the radar chart
    const chart = initRadarChart();
    if (!chart) {
      console.warn("Radar chart could not be initialized - canvas element may be missing");
      return;
    }

    // Render initial state
    renderIdentityGrid();
    updateRadar("W", false);

    // Attach event listeners
    attachEventListeners();
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();

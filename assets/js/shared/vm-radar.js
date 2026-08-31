(function attachVMRadar(global) {
  "use strict";

  const SCORE_KEYS = ["order", "knowledge", "ambition", "freedom", "growth"];
  const AXIS_LABELS = ["Order", "Knowledge", "Ambition", "Freedom", "Growth"];
  const MATRIX_NOTE = "See how this identity is expressed across Order, Knowledge, Ambition, Freedom, and Growth.";
  const WUBRG_LORE_SUMMARY = "Five-Color brings all five colors into one Commander plan: breadth, coalition, synthesis, and the responsibility to make every included tool earn its place.";

  const AXIS_MEANING = Object.freeze({
    Order: "Rules, protection, teamwork",
    Knowledge: "Planning, card draw, control",
    Ambition: "Power, sacrifice, ruthlessness",
    Freedom: "Speed, emotion, aggression",
    Growth: "Creatures, ramp, big nature",
  });

  const AXIS_ICON = Object.freeze({
    Order: "O",
    Knowledge: "K",
    Ambition: "A",
    Freedom: "F",
    Growth: "G",
  });

  const STRATEGIUM_AXIS = Object.freeze({
    Order: "Plays as protection, taxes and board wipes that keep the game fair.",
    Knowledge: "Plays as card draw, counterspells and the long control game.",
    Ambition: "Plays as sacrifice, removal and grinding the table down.",
    Freedom: "Plays as fast aggression, burn and impulsive swings.",
    Growth: "Plays as ramp, big creatures and value that snowballs.",
  });

  const COMPONENT_COLORS = Object.freeze({
    W: "#f7f0d0",
    U: "#58b8ff",
    B: "#7b7287",
    R: "#ff6b55",
    G: "#63e58d",
  });

  const COMPONENT_NAMES = Object.freeze({
    W: "White",
    U: "Blue",
    B: "Black",
    R: "Red",
    G: "Green",
  });

  const COMPONENT_PROFILES = Object.freeze({
    W: Object.freeze({ key: "W", name: "White", data: [96, 42, 24, 30, 58], hex: COMPONENT_COLORS.W }),
    U: Object.freeze({ key: "U", name: "Blue", data: [38, 98, 36, 34, 54], hex: COMPONENT_COLORS.U }),
    B: Object.freeze({ key: "B", name: "Black", data: [30, 56, 98, 62, 42], hex: COMPONENT_COLORS.B }),
    R: Object.freeze({ key: "R", name: "Red", data: [36, 34, 58, 98, 62], hex: COMPONENT_COLORS.R }),
    G: Object.freeze({ key: "G", name: "Green", data: [62, 48, 38, 58, 98], hex: COMPONENT_COLORS.G }),
  });

  const COLORLESS_DATA = [50, 54, 50, 46, 48];

  const AXES = Object.freeze(AXIS_LABELS.map((label, index) => Object.freeze({
    key: SCORE_KEYS[index],
    label,
    meaning: AXIS_MEANING[label],
    icon: AXIS_ICON[label],
    strategium: STRATEGIUM_AXIS[label],
  })));

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function normalizeKey(value) {
    return String(value || "").trim().toUpperCase();
  }

  function normalizeAlias(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "");
  }

  function inferKey(input, fallbackFaction) {
    if (typeof input === "string") return normalizeKey(input);
    return normalizeKey(
      fallbackFaction?.key ||
      input?.key ||
      input?.faction ||
      input?.primary ||
      input?.top ||
      input?.id ||
      ""
    );
  }

  function findExpression(key, identityLayers) {
    const expressions = identityLayers?.expressions || {};
    const direct = expressions[key];
    if (direct) return direct;

    const normalizedKey = normalizeAlias(key);
    return Object.entries(expressions).find(([expressionKey, expression]) => {
      const aliases = [
        expressionKey,
        expression?.key,
        expression?.display_code,
        expression?.preview_label,
        expression?.name,
        ...(Array.isArray(expression?.aliases) ? expression.aliases : []),
      ];
      return aliases.some((alias) => normalizeAlias(alias) === normalizedKey);
    })?.[1] || null;
  }

  function normalizeComponents(values) {
    return (Array.isArray(values) ? values : [])
      .map((value) => normalizeKey(value))
      .filter((value, index, array) => COMPONENT_PROFILES[value] && array.indexOf(value) === index);
  }

  function expressionComponents(expression, fallbackFaction) {
    return normalizeComponents(
      expression?.colors?.length ? expression.colors :
      expression?.display?.colors?.length ? expression.display.colors :
      fallbackFaction?.colors?.length ? fallbackFaction.colors :
      []
    );
  }

  function componentProfile(componentKey) {
    return COMPONENT_PROFILES[normalizeKey(componentKey)] || null;
  }

  function componentHex(componentKey) {
    return componentProfile(componentKey)?.hex || "#ffffff";
  }

  function componentName(componentKey) {
    return componentProfile(componentKey)?.name || COMPONENT_NAMES[normalizeKey(componentKey)] || normalizeKey(componentKey);
  }

  function hasPreviewScores(expression) {
    return SCORE_KEYS.every((scoreKey) => Number.isFinite(Number(expression?.preview_scores?.[scoreKey])));
  }

  function previewScores(expression) {
    return SCORE_KEYS.map((scoreKey) => clamp(Math.round(Number(expression?.preview_scores?.[scoreKey]) || 0), 0, 100));
  }

  function averageComponentScores(components) {
    const profiles = normalizeComponents(components)
      .map((component) => COMPONENT_PROFILES[component])
      .filter(Boolean);

    if (!profiles.length) {
      return COLORLESS_DATA.slice();
    }

    return AXIS_LABELS.map((_, index) => {
      const total = profiles.reduce((sum, profile) => sum + Number(profile.data[index] || 0), 0);
      return Math.round(total / profiles.length);
    });
  }

  function displayHex(expression, fallbackFaction, components) {
    if (components.length === 1) {
      return componentHex(components[0]);
    }
    return expression?.preview_hex ||
      expression?.display?.accent ||
      fallbackFaction?.display?.accent ||
      fallbackFaction?.accent ||
      (components[0] ? componentHex(components[0]) : "#c7c8bd");
  }

  function displayName(key, expression, fallbackFaction) {
    return expression?.preview_label ||
      expression?.display?.name ||
      expression?.name ||
      fallbackFaction?.name ||
      fallbackFaction?.label ||
      key ||
      "Identity";
  }

  function displayTitle(key, expression, fallbackFaction) {
    return expression?.preview_title ||
      expression?.display?.tagline ||
      expression?.display?.name ||
      fallbackFaction?.preview_title ||
      fallbackFaction?.name ||
      key ||
      "Identity";
  }

  function displayText(expression, fallbackFaction, components) {
    if (expression?.preview_text) return expression.preview_text;
    if (expression?.display?.philosophy) return expression.display.philosophy;
    if (expression?.identity_blend) return expression.identity_blend;
    if (fallbackFaction?.preview_text) return fallbackFaction.preview_text;
    if (fallbackFaction?.philosophy) return fallbackFaction.philosophy;
    if (components.length <= 0) {
      return "This synthesis translates the reading into one previewable identity shape while keeping Colorless outside the five-color grammar.";
    }
    return "This synthesis blends the active color pressures in the reading into one previewable identity shape.";
  }

  function displayLore(expression, fallbackFaction) {
    if (String(expression?.key || fallbackFaction?.key || "").toUpperCase() === "WUBRG") {
      return WUBRG_LORE_SUMMARY;
    }
    return fallbackFaction?.lore_summary ||
      fallbackFaction?.display?.lore_summary ||
      expression?.display?.lore_summary ||
      expression?.lore_summary ||
      expression?.display?.philosophy ||
      "";
  }

  function displayTension(expression, fallbackFaction) {
    return fallbackFaction?.core_tension ||
      fallbackFaction?.display?.core_tension ||
      expression?.core_tension ||
      expression?.display?.core_tension ||
      "";
  }

  function scoresToObject(data) {
    return SCORE_KEYS.reduce((scores, scoreKey, index) => {
      scores[scoreKey] = Number(data[index] || 0);
      return scores;
    }, {});
  }

  function resolveRadarProfile(input, identityLayers, fallbackFaction) {
    const key = inferKey(input, fallbackFaction);
    const expression = findExpression(key, identityLayers);
    const components = expressionComponents(expression, fallbackFaction);
    const data = hasPreviewScores(expression)
      ? previewScores(expression)
      : averageComponentScores(components);
    const resolvedKey = normalizeKey(expression?.key || expression?.display_code || key || fallbackFaction?.key || "");
    const name = displayName(resolvedKey, expression, fallbackFaction);

    return {
      key: resolvedKey || key || "UNKNOWN",
      name,
      title: displayTitle(resolvedKey, expression, fallbackFaction),
      text: displayText(expression, fallbackFaction, components),
      loreSummary: displayLore(expression, fallbackFaction),
      coreTension: displayTension(expression, fallbackFaction),
      components,
      data,
      scores: scoresToObject(data),
      hex: displayHex(expression, fallbackFaction, components),
      kind: expression?.kind || fallbackFaction?.kind || "",
      expression,
      scoreSource: hasPreviewScores(expression) ? "preview_scores" : "component_average",
      note: MATRIX_NOTE,
    };
  }

  function strengthWord(value) {
    const numeric = Number(value) || 0;
    if (numeric >= 80) return "Defining";
    if (numeric >= 60) return "Strong";
    if (numeric >= 40) return "Present";
    if (numeric >= 20) return "Faint";
    return "Absent";
  }

  function pipCount(value) {
    return clamp(Math.round((Number(value) || 0) / 20), 0, 5);
  }

  function strategiumReading(axisLabel) {
    return STRATEGIUM_AXIS[axisLabel] || "";
  }

  function dominantAxisIndex(profile) {
    const data = Array.isArray(profile?.data) ? profile.data : [];
    if (!data.length) return 0;
    return data.reduce((bestIndex, value, index) => (
      Number(value) > Number(data[bestIndex] || 0) ? index : bestIndex
    ), 0);
  }

  function primaryAxisSet(profile) {
    const data = Array.isArray(profile?.data) ? profile.data : [];
    const components = Array.isArray(profile?.components) ? profile.components : [];
    const count = components.length ? clamp(components.length, 1, AXIS_LABELS.length) : AXIS_LABELS.length;
    return new Set(
      data
        .map((value, index) => ({ value: Number(value) || 0, index }))
        .sort((left, right) => right.value - left.value || left.index - right.index)
        .slice(0, count)
        .map((entry) => entry.index)
    );
  }

  function hexToRgba(hex, alpha) {
    const clean = String(hex || "#ffffff").replace("#", "");
    const normalized = clean.length === 3
      ? clean.split("").map((part) => `${part}${part}`).join("")
      : clean.padEnd(6, "f").slice(0, 6);
    const r = Number.parseInt(normalized.slice(0, 2), 16);
    const g = Number.parseInt(normalized.slice(2, 4), 16);
    const b = Number.parseInt(normalized.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function blendGradient(hexes) {
    const colors = (Array.isArray(hexes) ? hexes : []).filter(Boolean);
    if (!colors.length) {
      return "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 62%)";
    }
    if (colors.length === 1) {
      return `radial-gradient(circle at center, ${hexToRgba(colors[0], 0.36)}, transparent 62%)`;
    }

    const positions = ["28% 32%", "70% 30%", "72% 70%", "30% 72%", "50% 50%"];
    const stops = colors.map((hex, index) => {
      const alpha = colors.length > 3 ? Math.max(0.12, 0.31 - index * 0.035) : 0.36 / (index + 1);
      return `radial-gradient(circle at ${positions[index] || "50% 50%"}, ${hexToRgba(hex, alpha)}, transparent 62%)`;
    });
    return [...stops, `radial-gradient(circle at center, ${hexToRgba(colors[0], 0.18)}, transparent 68%)`].join(",");
  }

  function radialFill(chart, hexes, baseHex) {
    const colors = (Array.isArray(hexes) ? hexes : []).filter(Boolean);
    const fallback = colors[0] || baseHex || "#ffffff";
    if (!chart || !chart.chartArea || !chart.ctx) {
      return hexToRgba(fallback, 0.16);
    }

    const { left, right, top, bottom } = chart.chartArea;
    const cx = (left + right) / 2;
    const cy = (top + bottom) / 2;
    const radius = Math.max(right - left, bottom - top) / 2;
    const gradient = chart.ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, hexToRgba(baseHex || fallback, 0.18));

    if (colors.length === 1) {
      gradient.addColorStop(0.42, hexToRgba(colors[0], 0.30));
      gradient.addColorStop(1, hexToRgba(colors[0], 0.02));
      return gradient;
    }

    const stops = Math.max(2, colors.length);
    colors.forEach((hex, index) => {
      gradient.addColorStop(index / (stops - 1), hexToRgba(hex, 0.24));
    });
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    return gradient;
  }

  function drawPolygonPath(ctx, points) {
    if (!points.length) return false;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
        return;
      }
      ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    return true;
  }

  function createLayeredFillPlugin(options = {}) {
    const id = options.id || "vmRadarLayeredFillPlugin";
    return {
      id,
      beforeDatasetDraw(chart, args) {
        const dataset = chart.data.datasets[args.index];
        if (!dataset?._vmLayeredFill) return;

        const meta = chart.getDatasetMeta(args.index);
        const points = (meta?.data || [])
          .map((point) => ({ x: Number(point?.x), y: Number(point?.y) }))
          .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
        const scale = chart.scales?.r;
        const chartArea = chart.chartArea;
        const ctx = chart.ctx;
        if (!ctx || !chartArea || !scale || points.length < 3) return;

        const cx = Number(scale.xCenter);
        const cy = Number(scale.yCenter);
        const radius = Number(scale.drawingArea) || Math.max(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top) / 2;
        if (!Number.isFinite(cx) || !Number.isFinite(cy) || !Number.isFinite(radius) || radius <= 0) return;

        const hexes = (Array.isArray(dataset._vmLayeredFillHexes) ? dataset._vmLayeredFillHexes : [])
          .filter(Boolean);
        const fillHexes = hexes.length ? hexes : [dataset._vmLayeredFillBase || dataset.borderColor || "#ffffff"];
        const baseHex = dataset._vmLayeredFillBase || fillHexes[0] || "#ffffff";

        ctx.save();
        if (!drawPolygonPath(ctx, points)) {
          ctx.restore();
          return;
        }
        ctx.clip();

        ctx.fillStyle = hexToRgba(baseHex, options.baseAlpha ?? 0.1);
        ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);

        const lobeDistance = fillHexes.length === 1 ? 0 : radius * (options.lobeDistance ?? 0.5);
        const lobeRadius = radius * (options.lobeRadius ?? 0.95);
        fillHexes.forEach((hex, index) => {
          const angle = (-90 + index * (360 / fillHexes.length)) * Math.PI / 180;
          const gx = cx + lobeDistance * Math.cos(angle);
          const gy = cy + lobeDistance * Math.sin(angle);
          const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, lobeRadius);
          gradient.addColorStop(0, hexToRgba(hex, options.componentAlpha ?? 0.55));
          gradient.addColorStop(1, hexToRgba(hex, 0));
          ctx.fillStyle = gradient;
          ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        });

        ctx.restore();
      },
    };
  }

  function componentHexes(profile) {
    const components = Array.isArray(profile?.components) ? profile.components : [];
    return components.map(componentHex).filter(Boolean);
  }

  function buildDatasets(profile, options = {}) {
    const chart = options.chart || null;
    const showComponents = options.showComponents !== false;
    const showComposite = options.showComposite !== false;
    const includeTierLabels = options.includeTierLabels !== false;
    const layeredFill = options.layeredFill === true;
    const components = Array.isArray(profile?.components) ? profile.components : [];
    const multiColor = components.length > 1;
    const datasets = [];

    if (multiColor && showComponents) {
      components.forEach((componentKey) => {
        const component = componentProfile(componentKey);
        if (!component) return;
        datasets.push({
          label: component.name,
          data: component.data.slice(),
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: hexToRgba(component.hex, 0.5),
          borderWidth: 1.2,
          borderDash: [5, 4],
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0,
          fill: false,
          _vmComponent: true,
          _vmGlowBlur: false,
          _vmGlowColor: hexToRgba(component.hex, 0.34),
        });
      });
    }

    if (showComposite || !multiColor) {
      const identityHex = profile?.hex || componentHex(components[0]) || "#ffffff";
      const fillHexes = componentHexes(profile);
      datasets.push({
        label: profile?.name || "Identity",
        data: Array.isArray(profile?.data) ? profile.data.slice() : COLORLESS_DATA.slice(),
        backgroundColor(context) {
          if (layeredFill) {
            return "rgba(0,0,0,0)";
          }
          return fillHexes.length > 1
            ? radialFill(context.chart || chart, fillHexes, identityHex)
            : hexToRgba(identityHex, 0.22);
        },
        borderColor: identityHex,
        borderWidth: multiColor ? 2.8 : 2.4,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: identityHex,
        pointBorderWidth: 2,
        pointRadius: multiColor ? 4.8 : 4.3,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 3,
        tension: 0,
        fill: true,
        tierLabels: includeTierLabels,
        _vmComposite: true,
        _vmGlowBlur: 24,
        _vmGlowColor: hexToRgba(identityHex, 0.72),
        _vmLayeredFill: layeredFill,
        _vmLayeredFillBase: identityHex,
        _vmLayeredFillHexes: (fillHexes.length ? fillHexes : [identityHex]).slice(),
      });
    }

    return datasets;
  }

  function createGlowPlugin(options = {}) {
    const id = options.id || "vmRadarGlowPlugin";
    return {
      id,
      beforeDatasetDraw(chart, args) {
        const dataset = chart.data.datasets[args.index];
        if (dataset?._vmGlowBlur === false) return;
        const reducedMotion = options.reducedMotion ||
          (typeof global.matchMedia === "function" && global.matchMedia("(prefers-reduced-motion: reduce)").matches);
        const pulse = reducedMotion ? 0.7 : (Math.sin(Date.now() / 575) + 1) / 2;
        const ctx = chart.ctx;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.shadowColor = dataset?._vmGlowColor || dataset?.borderColor || "rgba(255,255,255,0.6)";
        ctx.shadowBlur = (dataset?._vmGlowBlur ?? 18) * (0.72 + pulse * 0.36);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      },
      afterDatasetDraw(chart, args) {
        const dataset = chart.data.datasets[args.index];
        if (dataset?._vmGlowBlur === false) return;
        chart.ctx.restore();
      },
    };
  }

  function createHaloPlugin(options = {}) {
    const id = options.id || "vmRadarHaloPlugin";
    return {
      id,
      beforeDraw(chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const cx = (chartArea.left + chartArea.right) / 2;
        const cy = (chartArea.top + chartArea.bottom) / 2;
        const radius = Math.max(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top) / 2;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(255,255,255,${options.centerAlpha ?? 0.028})`);
        gradient.addColorStop(0.65, `rgba(88,184,255,${options.midAlpha ?? 0.014})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = gradient;
        ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        ctx.restore();
      },
    };
  }

  function createTierLabelPlugin(options = {}) {
    const id = options.id || "vmRadarTierLabelPlugin";
    return {
      id,
      afterDatasetDraw(chart, args) {
        const dataset = chart.data.datasets[args.index];
        if (!dataset?.tierLabels || dataset?._vmComponent || chart.width < (options.minWidth || 360)) return;
        const meta = chart.getDatasetMeta(args.index);
        const ctx = chart.ctx;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.save();
        ctx.fillStyle = options.color || "rgba(255,255,255,0.72)";
        ctx.font = options.font || "500 10px Outfit, system-ui, sans-serif";
        ctx.textAlign = "center";
        meta.data.forEach((point, index) => {
          const tier = strengthWord(Number(dataset.data[index]));
          const offsetY = point.y < centerY ? -9 : 14;
          const offsetX = point.x < chart.chartArea.left + 18 ? 12 : point.x > chart.chartArea.right - 18 ? -12 : 0;
          ctx.fillText(tier, point.x + offsetX, point.y + offsetY);
        });
        ctx.restore();
      },
    };
  }

  global.VMRadar = Object.freeze({
    AXES,
    AXIS_ICON,
    AXIS_LABELS,
    AXIS_MEANING,
    COMPONENT_COLORS,
    COMPONENT_NAMES,
    COMPONENT_PROFILES,
    MATRIX_NOTE,
    SCORE_KEYS,
    STRATEGIUM_AXIS,
    averageComponentScores,
    blendGradient,
    buildDatasets,
    componentHex,
    componentName,
    componentProfile,
    createGlowPlugin,
    createHaloPlugin,
    createLayeredFillPlugin,
    createTierLabelPlugin,
    dominantAxisIndex,
    hexToRgba,
    normalizeComponents,
    pipCount,
    primaryAxisSet,
    radialFill,
    resolveRadarProfile,
    strengthWord,
    strategiumReading,
  });
})(globalThis);

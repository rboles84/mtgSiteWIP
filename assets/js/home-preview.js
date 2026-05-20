(function () {
  "use strict";

  var AXES = ["order", "knowledge", "ambition", "freedom", "growth"];

  var BASELINES = {
    azorius: {
      label: "Azorius baseline",
      values: { order: 88, knowledge: 76, ambition: 24, freedom: 18, growth: 34 },
      summary: "High order and procedural knowledge. It stabilizes the table through structure, pacing, and rules pressure."
    },
    dimir: {
      label: "Dimir baseline",
      values: { order: 42, knowledge: 90, ambition: 84, freedom: 38, growth: 24 },
      summary: "Information-first and opportunistic. The profile stays analytical, but ambition and concealment pull it away from public order."
    },
    gruul: {
      label: "Gruul baseline",
      values: { order: 18, knowledge: 22, ambition: 42, freedom: 91, growth: 76 },
      summary: "Low order, high freedom, and lived momentum. It prefers pressure, instinct, and direct expression over optimization."
    },
    selesnya: {
      label: "Selesnya baseline",
      values: { order: 76, knowledge: 34, ambition: 18, freedom: 28, growth: 92 },
      summary: "A communal growth pattern. It trades private leverage for coherence, resilience, and shared rhythm."
    }
  };

  var SIGNALS = {
    "wild-savant": {
      label: "Your signal - Wild Savant",
      values: { order: 32, knowledge: 48, ambition: 84, freedom: 88, growth: 48 },
      summary: "High ambition and freedom with enough knowledge to stay deliberate. This reading wants risk, agency, and velocity more than calm order."
    },
    "table-architect": {
      label: "Your signal - Table Architect",
      values: { order: 78, knowledge: 64, ambition: 30, freedom: 22, growth: 52 },
      summary: "This read shapes the table from the outside. It values long lines, structure, and protected decision space over explosive turns."
    },
    "shadow-scholar": {
      label: "Your signal - Shadow Scholar",
      values: { order: 38, knowledge: 92, ambition: 64, freedom: 48, growth: 22 },
      summary: "Knowledge leads, but not innocently. The pattern stays patient until leverage appears, then turns precise information into pressure."
    },
    "root-reader": {
      label: "Your signal - Root Reader",
      values: { order: 44, knowledge: 36, ambition: 20, freedom: 42, growth: 94 },
      summary: "Growth is the engine here. The read prefers compounding advantage, natural timing, and resilient board texture over fast assertion."
    }
  };

  var state = {
    baselineKey: "gruul",
    signalKey: "wild-savant"
  };

  var mounts = {
    primary: null,
    echo: null
  };

  function reducedMotionEnabled() {
    return (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
      document.documentElement.getAttribute("data-reduce-motion") === "true";
  }

  function sortedAxes(series) {
    return AXES.map(function (axis, index) {
      return {
        axis: axis,
        value: Number(series[index] || 0)
      };
    }).sort(function (left, right) {
      return right.value - left.value;
    });
  }

  function axisTitle(axis) {
    return axis.charAt(0).toUpperCase() + axis.slice(1);
  }

  function activeBaseline() {
    return BASELINES[state.baselineKey];
  }

  function activeSignal() {
    return SIGNALS[state.signalKey];
  }

  function setButtonState(selector, activeValue, attribute) {
    document.querySelectorAll(selector).forEach(function (button) {
      var isActive = button.getAttribute(attribute) === activeValue;
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function renderAxisList(signalValues, baselineValues) {
    var list = document.getElementById("signal-axis-list");
    if (!list) {
      return;
    }

    list.innerHTML = AXES.map(function (axis, index) {
      var signalValue = Number(signalValues[index] || 0);
      var baselineValue = Number(baselineValues[index] || 0);
      return (
        '<div class="vm-preview-axis-row">' +
          '<span class="vm-preview-axis-label">' + axisTitle(axis) + "</span>" +
          '<div class="vm-preview-axis-track">' +
            '<span class="vm-preview-axis-fill" style="--vm-axis-size:' + signalValue + '%"></span>' +
          "</div>" +
          '<span class="vm-preview-axis-value">' + signalValue + " / " + baselineValue + "</span>" +
        "</div>"
      );
    }).join("");
  }

  function renderSummary(signal, baseline) {
    var signalSeries = buildIdentityRadarSeries(signal.values);
    var baselineSeries = buildIdentityRadarSeries(baseline.values);
    var signalTop = sortedAxes(signalSeries)[0];
    var baselineTop = sortedAxes(baselineSeries)[0];
    var gap = signalSeries.map(function (value, index) {
      return {
        axis: AXES[index],
        value: Math.abs(value - baselineSeries[index])
      };
    }).sort(function (left, right) {
      return right.value - left.value;
    })[0];

    var title = document.getElementById("radar-summary-title");
    var copy = document.getElementById("radar-summary-copy");
    var baselineCopy = document.getElementById("baseline-copy");
    var signalCopy = document.getElementById("signal-copy");

    if (title) {
      title.textContent = signal.label + " vs " + baseline.label;
    }

    if (copy) {
      copy.textContent =
        signal.summary +
        " The sharpest divergence from " + baseline.label.toLowerCase() +
        " sits on " + axisTitle(gap.axis) +
        ", while the strongest present axis is " + axisTitle(signalTop.axis) +
        ". " + baseline.label + " peaks on " + axisTitle(baselineTop.axis) + ".";
    }

    if (baselineCopy) {
      baselineCopy.textContent = baseline.summary;
    }

    if (signalCopy) {
      signalCopy.textContent = signal.summary;
    }

    renderAxisList(signalSeries, baselineSeries);
  }

  function setMountStatus(message) {
    var status = document.getElementById("radar-mount-status");
    if (status) {
      status.textContent = message;
    }
  }

  function primaryRadarPayload() {
    return {
      target: "#identity-radar",
      primary: {
        label: activeSignal().label,
        values: activeSignal().values
      },
      comparison: {
        label: activeBaseline().label,
        values: activeBaseline().values
      },
      options: {
        scaleMax: 100,
        reducedMotion: reducedMotionEnabled(),
        showLegend: true,
        semanticScaleLabels: true
      }
    };
  }

  function echoRadarPayload() {
    return {
      target: document.getElementById("identity-radar-echo"),
      primary: {
        label: activeSignal().label,
        values: buildIdentityRadarSeries(activeSignal().values)
      },
      comparison: {
        label: activeBaseline().label,
        values: activeBaseline().values
      },
      options: {
        scaleMax: 100,
        reducedMotion: reducedMotionEnabled(),
        showLegend: false,
        semanticScaleLabels: false
      }
    };
  }

  function updateRadars(forceRemount) {
    if (typeof renderIdentityRadar !== "function" || typeof buildIdentityRadarSeries !== "function") {
      setMountStatus("Chart helper unavailable. Text summary remains active.");
      return;
    }

    var primaryPayload = primaryRadarPayload();
    var echoPayload = echoRadarPayload();

    if (forceRemount && mounts.primary) {
      mounts.primary.destroy();
      mounts.primary = null;
    }

    if (forceRemount) {
      destroyIdentityRadar(echoPayload.target);
      mounts.echo = null;
    }

    if (!mounts.primary) {
      mounts.primary = renderIdentityRadar(primaryPayload);
    } else {
      mounts.primary.update(primaryPayload);
    }

    if (!mounts.echo) {
      mounts.echo = renderIdentityRadar(echoPayload);
    } else {
      updateIdentityRadar(echoPayload.target, echoPayload);
    }

    renderSummary(activeSignal(), activeBaseline());
    setMountStatus(forceRemount ? "Mount recast cleanly on both targets." : "Signal updated without duplicate chart instances.");
  }

  function bindChoiceButtons() {
    document.querySelectorAll("[data-baseline]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.baselineKey = button.getAttribute("data-baseline");
        syncChoiceState();
        updateRadars(false);
      });
    });

    document.querySelectorAll("[data-signal]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.signalKey = button.getAttribute("data-signal");
        syncChoiceState();
        updateRadars(false);
      });
    });

    var remount = document.getElementById("radar-remount");
    if (remount) {
      remount.addEventListener("click", function () {
        updateRadars(true);
      });
    }
  }

  function syncChoiceState() {
    setButtonState("[data-baseline]", state.baselineKey, "data-baseline");
    setButtonState("[data-signal]", state.signalKey, "data-signal");
  }

  function initRevealObserver() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) {
      return;
    }

    if (reducedMotionEnabled() || !window.IntersectionObserver) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    });

    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function initSectionRail() {
    var sections = document.querySelectorAll("[data-rail-section]");
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-rail-link]"));
    if (!sections.length || !links.length || !window.IntersectionObserver) {
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        links.forEach(function (link) {
          var active = link.getAttribute("data-rail-link") === entry.target.id;
          link.setAttribute("aria-current", active ? "true" : "false");
        });
      });
    }, {
      threshold: 0.42,
      rootMargin: "-10% 0px -48% 0px"
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function watchMotionChanges() {
    if (window.matchMedia) {
      var query = window.matchMedia("(prefers-reduced-motion: reduce)");
      var listener = function () {
        updateRadars(false);
      };

      if (query.addEventListener) {
        query.addEventListener("change", listener);
      } else if (query.addListener) {
        query.addListener(listener);
      }
    }

    var mutationObserver = new MutationObserver(function () {
      updateRadars(false);
    });

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-reduce-motion"]
    });
  }

  function init() {
    syncChoiceState();
    bindChoiceButtons();
    initRevealObserver();
    initSectionRail();
    watchMotionChanges();
    updateRadars(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

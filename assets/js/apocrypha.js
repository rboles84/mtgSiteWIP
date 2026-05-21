(function () {
  "use strict";

  var DECK_IDS = {
    canon: "deck-canon",
    scholarship: "deck-scholarship",
    media: "deck-media",
    codex: "deck-codex",
    logic: "deck-logic"
  };

  var DECK_PANELS = {
    canon: "deck-panel-canon",
    scholarship: "deck-panel-scholarship",
    media: "deck-panel-media",
    codex: "deck-panel-codex",
    logic: "deck-panel-logic"
  };

  function reducedMotionEnabled() {
    return (
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
      document.documentElement.getAttribute("data-reduce-motion") === "true"
    );
  }

  function hashSeed(value) {
    var hash = 2166136261;
    var index;

    for (index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
  }

  function createRng(seed) {
    var state = seed >>> 0;

    return function () {
      state += 0x6D2B79F5;
      var t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function paletteForTone(tone) {
    var palettes = {
      canon: {
        base: "#0b1423",
        primary: "#d7b264",
        secondary: "#7ca2d8",
        accent: "#f2dfb1"
      },
      scholarship: {
        base: "#07161d",
        primary: "#66c5ca",
        secondary: "#d9e3b3",
        accent: "#dffcfb"
      },
      media: {
        base: "#09131f",
        primary: "#77a0e8",
        secondary: "#98d5e2",
        accent: "#e3eeff"
      },
      codex: {
        base: "#17110e",
        primary: "#b9805f",
        secondary: "#e1bb8d",
        accent: "#f7e2cf"
      },
      logic: {
        base: "#120d1f",
        primary: "#a87dec",
        secondary: "#6f9ede",
        accent: "#efe4ff"
      }
    };

    return palettes[tone] || palettes.canon;
  }

  function buildCardArtSvg(tone, seedKey) {
    var palette = paletteForTone(tone);
    var rng = createRng(hashSeed(seedKey));
    var circles = "";
    var stars = "";
    var lines = "";
    var orbitCount = 3 + Math.floor(rng() * 3);
    var starCount = 18 + Math.floor(rng() * 10);
    var lineCount = 3 + Math.floor(rng() * 4);
    var index;

    for (index = 0; index < orbitCount; index += 1) {
      var radius = 38 + rng() * 122;
      var stroke = (0.12 + rng() * 0.22).toFixed(3);
      circles += '<circle cx="210" cy="150" r="' + radius.toFixed(2) + '" fill="none" stroke="' + palette.primary + '" stroke-opacity="' + stroke + '" stroke-width="' + (0.7 + rng() * 1.1).toFixed(2) + '" />';
    }

    for (index = 0; index < starCount; index += 1) {
      var x = 24 + rng() * 372;
      var y = 20 + rng() * 260;
      var radiusStar = 0.8 + rng() * 2.2;
      var alpha = 0.24 + rng() * 0.46;
      stars += '<circle cx="' + x.toFixed(2) + '" cy="' + y.toFixed(2) + '" r="' + radiusStar.toFixed(2) + '" fill="' + palette.accent + '" fill-opacity="' + alpha.toFixed(3) + '" />';
    }

    for (index = 0; index < lineCount; index += 1) {
      var startX = 28 + rng() * 364;
      var startY = 24 + rng() * 252;
      var controlX = 40 + rng() * 340;
      var controlY = 30 + rng() * 240;
      var endX = 24 + rng() * 372;
      var endY = 20 + rng() * 260;
      lines += '<path d="M' + startX.toFixed(2) + " " + startY.toFixed(2) + " Q" + controlX.toFixed(2) + " " + controlY.toFixed(2) + " " + endX.toFixed(2) + " " + endY.toFixed(2) + '" fill="none" stroke="' + palette.secondary + '" stroke-opacity="' + (0.16 + rng() * 0.24).toFixed(3) + '" stroke-width="' + (0.7 + rng() * 1.4).toFixed(2) + '" />';
    }

    return [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" role="presentation">',
      "<defs>",
      '<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
      '<stop offset="0%" stop-color="' + palette.base + '" />',
      '<stop offset="55%" stop-color="#050a13" />',
      '<stop offset="100%" stop-color="#03060d" />',
      "</linearGradient>",
      '<radialGradient id="glow" cx="50%" cy="26%" r="66%">',
      '<stop offset="0%" stop-color="' + palette.primary + '" stop-opacity="0.24" />',
      '<stop offset="58%" stop-color="' + palette.secondary + '" stop-opacity="0.12" />',
      '<stop offset="100%" stop-color="#000000" stop-opacity="0" />',
      "</radialGradient>",
      "</defs>",
      '<rect width="420" height="300" rx="22" fill="url(#bg)" />',
      '<rect x="16" y="16" width="388" height="268" rx="16" fill="url(#glow)" />',
      '<rect x="16" y="16" width="388" height="268" rx="16" fill="none" stroke="' + palette.primary + '" stroke-opacity="0.26" stroke-width="1.2" />',
      circles,
      lines,
      stars,
      '<path d="M38 246 L132 214 L210 244 L286 196 L382 234" fill="none" stroke="' + palette.primary + '" stroke-opacity="0.20" stroke-width="1.1" />',
      '<circle cx="210" cy="150" r="8" fill="' + palette.accent + '" fill-opacity="0.82" />',
      '<circle cx="210" cy="150" r="16" fill="none" stroke="' + palette.primary + '" stroke-opacity="0.32" stroke-width="1.2" />',
      "</svg>"
    ].join("");
  }

  function initCardArt() {
    var nodes = document.querySelectorAll("[data-card-art]");

    Array.prototype.forEach.call(nodes, function (node) {
      var tone = node.getAttribute("data-deck-tone") || "canon";
      var seedKey = node.getAttribute("data-art-seed") || tone;
      var svg = buildCardArtSvg(tone, seedKey);
      node.style.backgroundImage = 'url("data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg) + '")';
    });
  }

  function initArchiveAtmosphere() {
    var canvas = document.querySelector(".vm-bg__stars");
    if (!canvas) {
      return;
    }

    if (canvas.parentElement !== document.body) {
      document.body.appendChild(canvas);
    }

    var ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    var stars = [];
    var motes = [];
    var width = 0;
    var height = 0;
    var dpr = 1;
    var tick = 0;
    var hidden = document.hidden;

    function buildStars() {
      var starCount = Math.min(220, Math.max(90, Math.floor(window.innerWidth / 10)));
      var moteCount = Math.min(28, Math.max(14, Math.floor(window.innerWidth / 54)));

      stars = Array.from({ length: starCount }, function () {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.45 + 0.35,
          speed: Math.random() * 0.03 + 0.008,
          alpha: Math.random() * 0.28 + 0.18,
          pulse: Math.random() * 0.18 + 0.04,
          phase: Math.random() * Math.PI * 2
        };
      });

      motes = Array.from({ length: moteCount }, function () {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.07 + 0.02,
          drift: Math.random() * 0.22 + 0.05,
          rise: Math.random() * 0.12 + 0.03,
          phase: Math.random() * Math.PI * 2
        };
      });
    }

    function resizeCanvas() {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
      drawFrame(true);
    }

    function drawFrame(staticOnly) {
      var index;
      ctx.clearRect(0, 0, width, height);

      for (index = 0; index < stars.length; index += 1) {
        var star = stars[index];
        var twinkle = star.alpha + Math.sin(tick * star.speed + star.phase) * star.pulse;

        ctx.beginPath();
        ctx.fillStyle = "rgba(247, 215, 132, " + Math.max(0.06, twinkle).toFixed(3) + ")";
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (index = 0; index < motes.length; index += 1) {
        var mote = motes[index];

        if (!staticOnly) {
          mote.y -= mote.rise;
          mote.x += Math.sin(tick * 0.012 + mote.phase) * mote.drift;

          if (mote.y < -12) {
            mote.y = height + 12;
            mote.x = Math.random() * width;
          }
        }

        var glow = ctx.createRadialGradient(mote.x, mote.y, 0, mote.x, mote.y, mote.radius * 8);
        glow.addColorStop(0, "rgba(247, 215, 132, " + mote.alpha.toFixed(3) + ")");
        glow.addColorStop(0.4, "rgba(145, 185, 255, " + (mote.alpha * 0.42).toFixed(3) + ")");
        glow.addColorStop(1, "rgba(145, 185, 255, 0)");

        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(mote.x, mote.y, mote.radius * 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame() {
      if (!hidden) {
        var staticOnly = reducedMotionEnabled();
        drawFrame(staticOnly);
        if (!staticOnly) {
          tick += 1;
        }
      }

      window.requestAnimationFrame(frame);
    }

    document.addEventListener("visibilitychange", function () {
      hidden = document.hidden;
    });

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    window.requestAnimationFrame(frame);
  }

  function revealAll(nodes) {
    Array.prototype.forEach.call(nodes, function (node) {
      node.classList.add("is-visible");
    });
  }

  function initRevealObserver() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) {
      return;
    }

    if (reducedMotionEnabled() || !window.IntersectionObserver) {
      revealAll(nodes);
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

    Array.prototype.forEach.call(nodes, function (node) {
      observer.observe(node);
    });
  }

  function initSectionRail() {
    var sections = document.querySelectorAll("[data-rail-section]");
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-rail-link]"));
    if (!sections.length || !links.length) {
      return;
    }

    function setActiveSection(id) {
      links.forEach(function (link) {
        var active = link.getAttribute("data-rail-link") === id;
        link.setAttribute("aria-current", active ? "true" : "false");
      });
    }

    function syncSectionFromHash() {
      if (!window.location.hash || window.location.hash.indexOf("#deck-") === 0) {
        return;
      }

      setActiveSection(window.location.hash.slice(1));
      window.setTimeout(function () {
        setActiveSection(window.location.hash.slice(1));
      }, 220);
    }

    if (!window.IntersectionObserver) {
      setActiveSection("top");
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        setActiveSection(entry.target.id);
      });
    }, {
      threshold: 0.42,
      rootMargin: "-10% 0px -48% 0px"
    });

    Array.prototype.forEach.call(sections, function (section) {
      observer.observe(section);
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        var href = link.getAttribute("href") || "";
        if (href.indexOf("#deck-") === 0 || href.charAt(0) !== "#") {
          return;
        }

        setActiveSection(href.slice(1));
      });
    });

    window.addEventListener("hashchange", function () {
      syncSectionFromHash();
    });

    syncSectionFromHash();
  }

  function initDeckBrowser() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-deck-trigger]"));
    var panels = Array.prototype.slice.call(document.querySelectorAll("[data-deck-panel]"));
    var deckLinks = Array.prototype.slice.call(document.querySelectorAll("[data-deck-link]"));
    if (!triggers.length || !panels.length) {
      return;
    }

    function activateDeck(key, options) {
      var settings = options || {};
      var anchorId = DECK_IDS[key];
      var panelId = DECK_PANELS[key];
      var anchor = document.getElementById(anchorId);
      var panel = document.getElementById(panelId);

      if (!anchor || !panel) {
        return;
      }

      triggers.forEach(function (trigger) {
        var active = trigger.getAttribute("data-deck-trigger") === key;
        trigger.classList.toggle("is-active", active);
        trigger.setAttribute("aria-expanded", active ? "true" : "false");
      });

      deckLinks.forEach(function (link) {
        var active = link.getAttribute("data-deck-link") === key;
        link.setAttribute("aria-current", active ? "true" : "false");
      });

      panels.forEach(function (candidate) {
        var active = candidate.getAttribute("data-deck-panel") === key;
        candidate.hidden = !active;
      });

      if (settings.updateHash) {
        window.history.replaceState(null, "", "#" + anchorId);
      }

      if (settings.scroll) {
        anchor.scrollIntoView({
          behavior: reducedMotionEnabled() ? "auto" : "smooth",
          block: "start"
        });
      }
    }

    function syncFromHash() {
      var hash = window.location.hash.replace(/^#/, "");
      if (!hash) {
        activateDeck("canon");
        return;
      }

      var key = Object.keys(DECK_IDS).find(function (candidate) {
        return DECK_IDS[candidate] === hash;
      });

      if (key) {
        activateDeck(key);
      }
    }

    function bindAnchor(anchor, key) {
      anchor.addEventListener("click", function (event) {
        event.preventDefault();
        activateDeck(key, {
          updateHash: true,
          scroll: true
        });
      });
    }

    triggers.forEach(function (trigger) {
      bindAnchor(trigger, trigger.getAttribute("data-deck-trigger"));
    });

    deckLinks.forEach(function (link) {
      bindAnchor(link, link.getAttribute("data-deck-link"));
    });

    window.addEventListener("hashchange", syncFromHash);
    syncFromHash();
  }

  function initReturnDock() {
    var dock = document.getElementById("apocReturnDock");
    if (!dock) {
      return;
    }

    function updateDock() {
      dock.classList.toggle("show", window.scrollY > 520);
    }

    window.addEventListener("scroll", updateDock, { passive: true });
    updateDock();
  }

  function watchMotionChanges() {
    var nodes = document.querySelectorAll("[data-reveal]");

    if (typeof MutationObserver !== "undefined" && nodes.length) {
      var mutationObserver = new MutationObserver(function () {
        if (reducedMotionEnabled()) {
          revealAll(nodes);
        }
      });

      mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-reduce-motion"]
      });
    }

    if (window.matchMedia) {
      var query = window.matchMedia("(prefers-reduced-motion: reduce)");
      var listener = function () {
        if (reducedMotionEnabled()) {
          revealAll(nodes);
        }
      };

      if (query.addEventListener) {
        query.addEventListener("change", listener);
      } else if (query.addListener) {
        query.addListener(listener);
      }
    }
  }

  function init() {
    initCardArt();
    initArchiveAtmosphere();
    initRevealObserver();
    initSectionRail();
    initDeckBrowser();
    initReturnDock();
    watchMotionChanges();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());

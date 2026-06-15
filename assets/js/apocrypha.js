(function () {
  "use strict";

  function reducedMotionEnabled() {
    return (
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
      document.documentElement.getAttribute("data-reduce-motion") === "true"
    );
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
      if (!window.location.hash) {
        return;
      }

      setActiveSection(window.location.hash.slice(1));
    }

    function updateFromScroll() {
      var marker = window.scrollY + 180;
      var activeId = "top";
      var index;

      for (index = 0; index < sections.length; index += 1) {
        var section = sections[index];
        if (section.offsetTop <= marker) {
          activeId = section.id;
        }
      }

      setActiveSection(activeId);
    }

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        var href = link.getAttribute("href") || "";
        if (href.charAt(0) !== "#") {
          return;
        }

        setActiveSection(href.slice(1));
      });
    });

    window.addEventListener("hashchange", syncSectionFromHash);
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    updateFromScroll();
    syncSectionFromHash();
  }

  function initSourceCompass() {
    var groups = Array.prototype.slice.call(document.querySelectorAll("details.apoc-library-group"));
    var tomes = Array.prototype.slice.call(document.querySelectorAll("[data-source-tome]"));

    if (!groups.length) {
      return;
    }

    function setActiveTome(id) {
      tomes.forEach(function (tome) {
        var active = tome.getAttribute("data-library-target") === id;
        tome.setAttribute("aria-current", active ? "true" : "false");
      });
    }

    function closeSiblingGroups(activeGroup) {
      groups.forEach(function (group) {
        if (group !== activeGroup) {
          group.open = false;
        }
      });
    }

    function openGroup(group) {
      if (!group) {
        return;
      }

      group.open = true;
      closeSiblingGroups(group);
      setActiveTome(group.id);
    }

    function findGroupFromHash() {
      if (!window.location.hash) {
        return null;
      }

      var id = window.location.hash.slice(1);
      var target = document.getElementById(id);
      if (!target) {
        return null;
      }

      if (target.matches && target.matches("details.apoc-library-group")) {
        return target;
      }

      if (target.closest) {
        return target.closest("details.apoc-library-group");
      }

      return null;
    }

    tomes.forEach(function (tome) {
      tome.addEventListener("click", function (event) {
        var targetId = tome.getAttribute("data-library-target");
        var group = targetId ? document.getElementById(targetId) : null;

        if (!group) {
          return;
        }

        event.preventDefault();
        openGroup(group);

        if (window.history && window.history.pushState) {
          window.history.pushState(null, "", "#" + group.id);
        } else {
          window.location.hash = group.id;
        }

        group.scrollIntoView({
          behavior: reducedMotionEnabled() ? "auto" : "smooth",
          block: "start"
        });
      });
    });

    groups.forEach(function (group) {
      group.addEventListener("toggle", function () {
        var hasOpenGroup;

        if (group.open) {
          closeSiblingGroups(group);
          setActiveTome(group.id);
          return;
        }

        hasOpenGroup = groups.some(function (candidate) {
          return candidate.open;
        });

        if (!hasOpenGroup) {
          setActiveTome("");
        }
      });
    });

    function syncFromHash() {
      var group = findGroupFromHash();
      if (group) {
        openGroup(group);
      }
    }

    window.addEventListener("hashchange", syncFromHash);
    syncFromHash();

    setActiveTome((groups.filter(function (group) {
      return group.open;
    })[0] || {}).id || "");
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
    initArchiveAtmosphere();
    initRevealObserver();
    initSectionRail();
    initSourceCompass();
    initReturnDock();
    watchMotionChanges();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());

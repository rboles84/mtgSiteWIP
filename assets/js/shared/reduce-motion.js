/* ============================================================
   Vox Mana - Reduce Motion Toggle
   /assets/js/shared/reduce-motion.js

   - Persists user choice in localStorage under "vm_reduce_motion".
   - Sets [data-reduce-motion="true"|"false"] on <html> and <body>.
   - Respects OS prefers-reduced-motion as the default if the user
     has not made an explicit choice.
   - Renders a toggle button into any element with
     [data-vm-reduce-motion-toggle].
   - Exposes window.vmReduceMotion for shared UI controls.
   ============================================================ */

(function () {
  "use strict";

  var STORAGE_KEY = "vm_reduce_motion";
  var html = document.documentElement;
  var body = document.body;

  function getStoredChoice() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === "true") return true;
      if (v === "false") return false;
      return null;
    } catch (e) {
      return null;
    }
  }

  function osPrefersReduced() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function setStoredChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
    } catch (e) {}
  }

  function applyState(reduced) {
    html.setAttribute("data-reduce-motion", reduced ? "true" : "false");
    if (body) body.setAttribute("data-reduce-motion", reduced ? "true" : "false");

    var toggles = document.querySelectorAll(".vm-reduce-motion-toggle");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute("aria-pressed", reduced ? "true" : "false");
      toggles[i].setAttribute(
        "aria-label",
        reduced
          ? "Reduce motion is on. Click to enable motion."
          : "Reduce motion is off. Click to reduce motion."
      );
      toggles[i].setAttribute(
        "data-vm-tooltip",
        reduced ? "Stillness - on" : "Quiet the motion"
      );
      toggles[i].removeAttribute("title");
    }

    window.dispatchEvent(
      new CustomEvent("vm:reduce-motion-change", { detail: { value: reduced } })
    );
  }

  var RUNE_SVG =
    '<svg class="vm-reduce-motion-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">' +
      '<polygon points="12,2 22,12 12,22 2,12" />' +
      '<polygon points="12,7 17,12 12,17 7,12" />' +
      '<line x1="12" y1="2" x2="12" y2="22" />' +
      '<line x1="2" y1="12" x2="22" y2="12" />' +
    "</svg>";

  function buildToggle() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "vm-reduce-motion-toggle";
    btn.innerHTML = RUNE_SVG;
    btn.addEventListener("click", function () {
      var current = html.getAttribute("data-reduce-motion") === "true";
      var next = !current;
      setStoredChoice(next);
      applyState(next);
    });
    return btn;
  }

  function mountToggles() {
    var hosts = document.querySelectorAll("[data-vm-reduce-motion-toggle]");
    for (var i = 0; i < hosts.length; i++) {
      if (hosts[i].querySelector(".vm-reduce-motion-toggle")) continue;
      hosts[i].appendChild(buildToggle());
    }
  }

  function init() {
    body = document.body;

    var stored = getStoredChoice();
    var initial = stored === null ? osPrefersReduced() : stored;

    applyState(initial);
    mountToggles();

    if (window.matchMedia) {
      var mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      var listener = function (e) {
        if (getStoredChoice() === null) applyState(e.matches);
      };
      if (mql.addEventListener) {
        mql.addEventListener("change", listener);
      } else if (mql.addListener) {
        mql.addListener(listener);
      }
    }
  }

  window.vmReduceMotion = {
    get: function () {
      return html.getAttribute("data-reduce-motion") === "true";
    },
    set: function (value) {
      setStoredChoice(!!value);
      applyState(!!value);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

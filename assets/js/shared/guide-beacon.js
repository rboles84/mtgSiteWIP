/* Progressive enhancement for eligible contextual Field Guide Beacons. */
(function () {
  "use strict";

  var selector = "[data-guide-beacon-id]";
  var seenBeaconIds = new Set();
  var activatedBeacons = new WeakSet();
  var beaconObservers = new WeakMap();
  var settleTimers = new WeakMap();

  function prefersReducedMotion() {
    return document.documentElement.getAttribute("data-reduce-motion") === "true"
      || document.body?.getAttribute("data-reduce-motion") === "true"
      || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
  }

  function beaconId(beacon) {
    return beacon?.getAttribute("data-guide-beacon-id") || "";
  }

  function stopObserving(beacon) {
    var observer = beaconObservers.get(beacon);
    if (observer) observer.disconnect();
    beaconObservers.delete(beacon);
  }

  function settle(beacon) {
    if (!beacon) return;
    var id = beaconId(beacon);
    if (id) seenBeaconIds.add(id);
    stopObserving(beacon);
    beacon.classList.remove("is-signaling");
    beacon.setAttribute("data-guide-beacon-state", "quiet");
    var timer = settleTimers.get(beacon);
    if (timer) window.clearTimeout(timer);
    settleTimers.delete(beacon);
  }

  function signal(beacon) {
    var id = beaconId(beacon);
    if (!id || seenBeaconIds.has(id) || prefersReducedMotion()) {
      settle(beacon);
      return;
    }

    seenBeaconIds.add(id);
    stopObserving(beacon);
    beacon.setAttribute("data-guide-beacon-state", "signaling");
    beacon.classList.add("is-signaling");
    settleTimers.set(beacon, window.setTimeout(function () {
      settle(beacon);
    }, 5200));
  }

  function observeVisibility(beacon) {
    if (!("IntersectionObserver" in window)) {
      beacon.setAttribute("data-guide-beacon-state", "static");
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting && entries[i].intersectionRatio >= 0.55) {
          signal(beacon);
          break;
        }
      }
    }, { threshold: [0.55] });

    beaconObservers.set(beacon, observer);
    observer.observe(beacon);
  }

  function activate(beacon) {
    if (!beacon || activatedBeacons.has(beacon)) return;
    activatedBeacons.add(beacon);

    var id = beaconId(beacon);
    if (!id) return;

    var endSignal = function () { settle(beacon); };
    beacon.addEventListener("pointerenter", endSignal, { once: true });
    beacon.addEventListener("mouseenter", endSignal, { once: true });
    beacon.addEventListener("mouseover", endSignal, { once: true });
    beacon.addEventListener("focusin", endSignal, { once: true });
    beacon.addEventListener("animationend", function (event) {
      if (event.animationName === "vm-guide-beacon-signal") settle(beacon);
    });

    if (seenBeaconIds.has(id) || prefersReducedMotion()) {
      settle(beacon);
      return;
    }

    beacon.setAttribute("data-guide-beacon-state", "waiting");
    observeVisibility(beacon);
  }

  function activateWithin(root) {
    if (!root) return;
    if (root.matches?.(selector)) activate(root);
    var beacons = root.querySelectorAll?.(selector) || [];
    for (var i = 0; i < beacons.length; i++) activate(beacons[i]);
  }

  function init() {
    activateWithin(document);

    var mutationObserver = new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        for (var j = 0; j < records[i].addedNodes.length; j++) {
          if (records[i].addedNodes[j].nodeType === 1) {
            activateWithin(records[i].addedNodes[j]);
          }
        }
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("vm:reduce-motion-change", function (event) {
      if (event.detail?.value !== true) return;
      var beacons = document.querySelectorAll(selector);
      for (var i = 0; i < beacons.length; i++) settle(beacons[i]);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

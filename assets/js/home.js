/* ============================================================
   Vox Mana — Home (Three Doors)
   /assets/js/home.js

   On page load, check for a cached placement_result in localStorage.
   If one exists, show the "resume your reading" chip with the faction
   name. Clicking it sends the user to /archscry/ where existing logic
   restores their result.

   This is the Batch 2 stub. Batch 4 will wire this to actual hash-based
   result URLs and the upgraded save flow. For now it just looks for
   anything plausibly readable in localStorage.

   No dependencies. ~0.7 KB minified.
   ============================================================ */

(function () {
  'use strict';

  function getCachedFaction() {
    try {
      // Multiple legacy keys exist depending on how the user got their
      // reading. Try them in priority order.
      var keys = ['vm_last_result', 'vm_placement_result', 'vm_profile'];
      for (var i = 0; i < keys.length; i++) {
        var raw = localStorage.getItem(keys[i]);
        if (!raw) continue;
        try {
          var parsed = JSON.parse(raw);
          // The placement_result schema (data-contracts.md) puts the
          // faction name at .faction_name. Older shapes used .guild_name
          // or .guild. Try in order.
          var name = parsed.faction_name
                  || parsed.guild_name
                  || parsed.guild
                  || (parsed.profile && parsed.profile.guild_name)
                  || null;
          if (name) return name;
        } catch (e) { /* not JSON, skip */ }
      }
    } catch (e) { /* localStorage blocked */ }
    return null;
  }

  function init() {
    var name = getCachedFaction();
    var resume = document.querySelector('[data-vm-resume]');
    if (name && resume) {
      var label = resume.querySelector('[data-vm-resume-faction]');
      if (label) label.textContent = name;

      resume.removeAttribute('hidden');
    }

    initHomeMotion();
  }

  function motionIsReduced() {
    return (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      document.documentElement.getAttribute('data-reduce-motion') === 'true';
  }

  function initHomeMotion() {
    var home = document.querySelector('.vm-home');
    if (!home) return;

    var raf = null;
    var targetX = 0;
    var targetY = 0;

    function apply() {
      raf = null;
      if (motionIsReduced()) {
        home.style.setProperty('--vm-home-parallax-x', '0px');
        home.style.setProperty('--vm-home-parallax-y', '0px');
        return;
      }
      home.style.setProperty('--vm-home-parallax-x', targetX.toFixed(2) + 'px');
      home.style.setProperty('--vm-home-parallax-y', targetY.toFixed(2) + 'px');
    }

    window.addEventListener('mousemove', function (event) {
      if (motionIsReduced()) return;
      targetX = ((event.clientX / window.innerWidth) - 0.5) * 10;
      targetY = ((event.clientY / window.innerHeight) - 0.5) * 8;
      if (!raf) raf = requestAnimationFrame(apply);
    });

    window.addEventListener('mouseleave', function () {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    });

    document.addEventListener('click', function (event) {
      if (motionIsReduced()) return;
      var ripple = document.createElement('span');
      ripple.className = 'vm-home__click-ripple';
      ripple.style.left = event.clientX + 'px';
      ripple.style.top = event.clientY + 'px';
      document.body.appendChild(ripple);
      window.setTimeout(function () {
        ripple.remove();
      }, 700);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

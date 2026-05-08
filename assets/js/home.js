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
    if (!name) return;

    var resume = document.querySelector('[data-vm-resume]');
    if (!resume) return;

    var label = resume.querySelector('[data-vm-resume-faction]');
    if (label) label.textContent = name;

    resume.removeAttribute('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

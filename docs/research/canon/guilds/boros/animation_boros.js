// animation.js
// Simple DOM API for Boros sigil animations.
// Assumes boros_sigil.svg is embedded inline (not via <img>) so elements are addressable by ID.

const Sigil = (function(){
  const core = document.getElementById('core');
  const spokes = [
    document.getElementById('spoke1'),
    document.getElementById('spoke2'),
    document.getElementById('spoke3'),
    document.getElementById('spoke4')
  ];
  const ember = document.getElementById('emberGlow');
  const shield = document.getElementById('shieldOverlay');

  function pulseSpoke(index){
    const s = spokes[index % spokes.length];
    if(!s) return;
    s.classList.add('spoke-pulse');
    // remove class after duration
    setTimeout(()=> s.classList.remove('spoke-pulse'), 300);
  }

  function triggerBattalion(){
    // apply battalion glow to all spokes and ember trail
    spokes.forEach(s => s.classList.add('battalion-glow'));
    ember.classList.add('ember-trail');
    setTimeout(()=>{
      spokes.forEach(s => s.classList.remove('battalion-glow'));
      ember.classList.remove('ember-trail');
    }, 700);
  }

  function setHardiness(durationMs = 600){
    // show shield overlay briefly
    shield.setAttribute('opacity', '1');
    shield.classList.add('hardiness-flash');
    setTimeout(()=>{
      shield.classList.remove('hardiness-flash');
      shield.setAttribute('opacity', '0');
    }, durationMs);
  }

  // convenience: animate a double pulse for ExtraCombat
  function extraCombatPulse(){
    pulseSpoke(0);
    setTimeout(()=> pulseSpoke(0), 260);
  }

  return {
    pulseSpoke,
    triggerBattalion,
    setHardiness,
    extraCombatPulse
  };
})();

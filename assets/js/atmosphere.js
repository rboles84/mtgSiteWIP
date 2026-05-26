/* ============================================================
   Vox Mana — Atmosphere Star Field
   /assets/js/atmosphere.js

   Paints a small canvas of pulsing distant stars on top of the
   painted hero. Self-contained, no dependencies. Respects:
     - prefers-reduced-motion media query
     - <html data-reduce-motion="true"> from the topbar toggle
     - document.hidden (pauses when tab inactive)

   The canvas is created lazily and inserted into the first
   .vm-bg element on the page.
   ============================================================ */

(function () {
  'use strict';

  function isReduced() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return document.documentElement.getAttribute('data-reduce-motion') === 'true';
  }

  function init() {
    var bg = document.querySelector('.vm-bg');
    if (!bg) return;

    var canvas = bg.querySelector('.vm-bg__stars');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'vm-bg__stars';
      canvas.setAttribute('aria-hidden', 'true');
      bg.appendChild(canvas);
    } else if (canvas.dataset.vmAtmosphere === 'true') {
      return;
    }

    canvas.dataset.vmAtmosphere = 'true';

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var stars = [];
    var raf = null;
    var lastT = 0;
    var rendered = false;

    function sizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = bg.clientWidth;
      var h = bg.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateStars(w, h);
    }

    function generateStars(w, h) {
      stars = [];
      // Fewer stars on smaller screens. Between 45 and 110 total.
      var count = Math.max(45, Math.min(110, Math.round((w * h) / 18000)));
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.45 + Math.random() * 1.75,
          phase: Math.random() * Math.PI * 2,
          // Slow pulse: 4–10s per cycle
          speed: 0.0006 + Math.random() * 0.0010,
          // Some stars warm, some cool — small random tint between gold-ish and pale-blue
          warm: Math.random() < 0.62,
          burst: Math.random() < 0.34
        });
      }
    }

    function drawStarburst(s, alpha) {
      if (!s.burst || s.r < 1.0 || alpha < 0.55) return;
      var ray = s.r * (7 + alpha * 4);
      ctx.save();
      ctx.globalAlpha = alpha * 0.38;
      ctx.strokeStyle = s.warm ? 'rgba(245, 206, 112, 1)' : 'rgba(218, 236, 245, 1)';
      ctx.lineWidth = 0.55;
      ctx.beginPath();
      ctx.moveTo(s.x - ray, s.y);
      ctx.lineTo(s.x + ray, s.y);
      ctx.moveTo(s.x, s.y - ray);
      ctx.lineTo(s.x, s.y + ray);
      ctx.stroke();
      ctx.globalAlpha = alpha * 0.18;
      ctx.lineWidth = 0.35;
      ctx.beginPath();
      ctx.moveTo(s.x - ray * 0.55, s.y - ray * 0.55);
      ctx.lineTo(s.x + ray * 0.55, s.y + ray * 0.55);
      ctx.moveTo(s.x + ray * 0.55, s.y - ray * 0.55);
      ctx.lineTo(s.x - ray * 0.55, s.y + ray * 0.55);
      ctx.stroke();
      ctx.restore();
    }

    function paint(t) {
      if (!lastT) lastT = t;
      var dt = t - lastT;
      lastT = t;

      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.phase += s.speed * dt;
        // Pulsing alpha between 0.15 and 1.0 with a soft sine
        var alpha = 0.55 + 0.45 * Math.sin(s.phase);
        alpha = Math.max(0.1, Math.min(1, alpha));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        if (s.warm) {
          ctx.fillStyle = 'rgba(212, 180, 97, ' + (alpha * 0.85).toFixed(3) + ')';
        } else {
          ctx.fillStyle = 'rgba(195, 215, 230, ' + (alpha * 0.7).toFixed(3) + ')';
        }
        ctx.fill();
        drawStarburst(s, alpha);

        // Brightest stars get a faint halo
        if (s.r > 1.0 && alpha > 0.7) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = s.warm
            ? 'rgba(212, 180, 97, ' + (alpha * 0.06).toFixed(3) + ')'
            : 'rgba(195, 215, 230, ' + (alpha * 0.05).toFixed(3) + ')';
          ctx.fill();
        }
      }

      rendered = true;
      if (!isReduced() && !document.hidden) {
        raf = requestAnimationFrame(paint);
      } else {
        raf = null;
      }
    }

    function start() {
      if (raf) return;
      lastT = 0;
      raf = requestAnimationFrame(paint);
    }
    function stop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    function paintOnceStatic() {
      // For reduced-motion: paint a single static frame so stars are
      // present but not animating.
      lastT = performance.now();
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var alpha = 0.55;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm
          ? 'rgba(212, 180, 97, ' + (alpha * 0.7).toFixed(3) + ')'
          : 'rgba(195, 215, 230, ' + (alpha * 0.6).toFixed(3) + ')';
        ctx.fill();
        drawStarburst(s, alpha);
      }
      rendered = true;
    }

    function reactToReducedChange() {
      if (isReduced()) {
        stop();
        paintOnceStatic();
      } else {
        start();
      }
    }

    // Resize handling, debounced
    var resizeT = null;
    window.addEventListener('resize', function () {
      if (resizeT) clearTimeout(resizeT);
      resizeT = setTimeout(function () {
        sizeCanvas();
        if (isReduced()) paintOnceStatic();
      }, 150);
    });

    // Pause when tab hidden
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (!isReduced()) start();
    });

    // React to OS reduce-motion changes mid-session
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      var mqHandler = function () { reactToReducedChange(); };
      if (mq.addEventListener) mq.addEventListener('change', mqHandler);
      else if (mq.addListener) mq.addListener(mqHandler); /* legacy Safari */
    }

    // React to the topbar toggle (it sets data-reduce-motion on <html>)
    var mo = new MutationObserver(reactToReducedChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-reduce-motion'] });

    // Boot
    sizeCanvas();
    if (isReduced()) {
      paintOnceStatic();
    } else {
      start();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

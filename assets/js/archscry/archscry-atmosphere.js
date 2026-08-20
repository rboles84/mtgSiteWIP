(() => {
  const body = document.body;
  if (!body || !body.classList.contains("vm-archscry-route")) return;

  const canvas = document.querySelector(".vm-bg__stars");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if (canvas.parentElement !== document.body) {
    document.body.appendChild(canvas);
  }

  const reducedMotionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const dpr = () => Math.max(1, window.devicePixelRatio || 1);
  const html = document.documentElement;

  let stars = [];
  let orbs = [];
  let tick = 0;
  let frameId = null;

  function prefersReducedMotion() {
    return html.getAttribute("data-reduce-motion") === "true"
      || !!(reducedMotionQuery && reducedMotionQuery.matches);
  }

  function buildStars() {
    const count = Math.min(165, Math.max(72, Math.floor(window.innerWidth / 8)));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.25 + 0.35,
      baseAlpha: Math.random() * 0.34 + 0.12,
      pulse: Math.random() * 0.28 + 0.10,
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      burstChance: Math.random() * 0.004 + 0.001
    }));
  }

  function buildOrbs() {
    const count = Math.min(32, Math.max(14, Math.floor(window.innerWidth / 44)));
    orbs = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2.2 + 1.25,
      velocity: Math.random() * 0.12 + 0.028,
      alpha: Math.random() * 0.08 + 0.02,
      drift: Math.random() * 0.24 + 0.05,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function resizeCanvas() {
    const ratio = dpr();
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    buildStars();
    buildOrbs();
    drawFrame(false);
  }

  function drawStars() {
    for (const star of stars) {
      const twinkle = star.baseAlpha + Math.sin(tick * star.speed + star.phase) * star.pulse;
      const alpha = clamp(twinkle, 0.08, 0.95);
      const bursting = alpha > 0.56 && star.radius > 0.8 && Math.random() < star.burstChance;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(247, 215, 132, ${alpha})`;
      ctx.fill();

      if (star.radius > 0.95 && alpha > 0.62) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 215, 132, ${alpha * 0.12})`;
        ctx.fill();
      }

      if (!bursting) continue;

      ctx.save();
      ctx.globalAlpha = Math.min(0.45, alpha + 0.12);
      ctx.strokeStyle = "rgba(247, 215, 132, 0.72)";
      ctx.lineWidth = 0.45;
      ctx.beginPath();
      ctx.moveTo(star.x - star.radius * 3.2, star.y);
      ctx.lineTo(star.x + star.radius * 3.2, star.y);
      ctx.moveTo(star.x, star.y - star.radius * 3.2);
      ctx.lineTo(star.x, star.y + star.radius * 3.2);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawOrbs(animate) {
    for (const orb of orbs) {
      if (animate) {
        orb.y -= orb.velocity;
        orb.x += Math.sin(tick * 0.006 + orb.phase) * orb.drift * 0.035;

        if (orb.y < -14) {
          orb.y = window.innerHeight + 14;
          orb.x = Math.random() * window.innerWidth;
        }
      }

      const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * 5);
      glow.addColorStop(0, `rgba(247, 215, 132, ${orb.alpha})`);
      glow.addColorStop(0.42, `rgba(216, 162, 60, ${orb.alpha * 0.38})`);
      glow.addColorStop(1, "rgba(216, 162, 60, 0)");

      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(orb.x, orb.y, orb.radius * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFrame(animate) {
    if (animate) {
      tick += 1;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawStars();
    drawOrbs(animate);
  }

  function shouldAnimate() {
    return !document.hidden && !prefersReducedMotion();
  }

  function stopLoop() {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  function frameLoop() {
    if (!shouldAnimate()) {
      stopLoop();
      drawFrame(false);
      return;
    }

    drawFrame(true);
    frameId = window.requestAnimationFrame(frameLoop);
  }

  function syncLoop() {
    stopLoop();
    if (shouldAnimate()) {
      frameId = window.requestAnimationFrame(frameLoop);
      return;
    }

    drawFrame(false);
  }

  function handlePointerMove(event) {
    body.style.setProperty("--mx", `${event.clientX}px`);
    body.style.setProperty("--my", `${event.clientY}px`);
  }

  const htmlObserver = new MutationObserver(syncLoop);
  htmlObserver.observe(html, {
    attributes: true,
    attributeFilter: ["data-reduce-motion"]
  });

  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", syncLoop);
  document.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("beforeunload", () => {
    stopLoop();
    htmlObserver.disconnect();
  });

  if (reducedMotionQuery) {
    const handleReducedMotionChange = () => syncLoop();
    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    } else if (typeof reducedMotionQuery.addListener === "function") {
      reducedMotionQuery.addListener(handleReducedMotionChange);
    }
  }

  resizeCanvas();
  syncLoop();
})();

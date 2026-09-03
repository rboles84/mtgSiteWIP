import { trackVoxGuideWalkthrough } from "./vox-telemetry.js";

const GUIDED_PARAMETER = "guided";
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]"
].join(",");

let activeSession = null;

function readGuidedRequest(expectedValue, location = window.location) {
  const url = new URL(location.href);
  const values = url.searchParams.getAll(GUIDED_PARAMETER);

  if (values.length === 0) return { state: "absent", url };
  if (values.length === 1 && values[0] === expectedValue) return { state: "eligible", url };
  return { state: "unsupported", url };
}

function removeGuidedParameter(url = new URL(window.location.href)) {
  url.searchParams.delete(GUIDED_PARAMETER);
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
}

function prefersReducedMotion() {
  return Boolean(
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.dataset.reduceMotion === "true" ||
    document.body?.dataset.reduceMotion === "true" ||
    window.vmReduceMotion?.get?.()
  );
}

function loadStylesheet(href, marker) {
  const existing = document.querySelector(`link[data-vm-guide-asset="${marker}"]`);
  if (existing?.sheet) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const link = existing || document.createElement("link");
    if (!existing) {
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.vmGuideAsset = marker;
      document.head.append(link);
    }
    link.addEventListener("load", resolve, { once: true });
    link.addEventListener("error", () => reject(new Error(`Unable to load ${marker}`)), { once: true });
  });
}

function loadScript(src, marker) {
  if (window.driver?.js?.driver) return Promise.resolve();
  const existing = document.querySelector(`script[data-vm-guide-asset="${marker}"]`);

  return new Promise((resolve, reject) => {
    const script = existing || document.createElement("script");
    if (!existing) {
      script.src = src;
      script.dataset.vmGuideAsset = marker;
      document.head.append(script);
    }
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", () => reject(new Error(`Unable to load ${marker}`)), { once: true });
  });
}

function suppressTargetFocusables(target) {
  const snapshots = [];
  target.querySelectorAll(FOCUSABLE_SELECTOR).forEach((element) => {
    snapshots.push({
      element,
      hadTabindex: element.hasAttribute("tabindex"),
      tabindex: element.getAttribute("tabindex")
    });
    element.setAttribute("tabindex", "-1");
  });

  return () => {
    snapshots.forEach(({ element, hadTabindex, tabindex }) => {
      if (!element.isConnected) return;
      if (hadTabindex) element.setAttribute("tabindex", tabindex);
      else element.removeAttribute("tabindex");
    });
  };
}

function focusWithoutJump(element) {
  if (!element) return;
  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
  }
}

function reportStartupFailure(error) {
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    console.warn("Vox Mana guided reading could not start.", error);
  }
}

export async function startGuideWalkthrough(config) {
  const request = readGuidedRequest(config.id);
  if (request.state === "absent") return { state: "static" };
  if (request.state === "unsupported") {
    removeGuidedParameter(request.url);
    return { state: "unsupported" };
  }

  if (activeSession) return { state: "already-active" };

  const resolvedSteps = config.steps.map((step) => ({
    ...step,
    target: document.querySelector(step.target),
    focusTarget: document.querySelector(step.focusTarget)
  }));

  if (resolvedSteps.length !== 4 || resolvedSteps.some((step) => !step.target || !step.focusTarget)) {
    removeGuidedParameter(request.url);
    return { state: "missing-target" };
  }

  try {
    await Promise.all([
      loadStylesheet(config.assets.driverCss, "driver-css"),
      loadStylesheet(config.assets.themeCss, "vox-guide-css"),
      loadScript(config.assets.driverJs, "driver-js")
    ]);
  } catch (error) {
    removeGuidedParameter(request.url);
    reportStartupFailure(error);
    return { state: "asset-failure" };
  }

  const createDriver = window.driver?.js?.driver;
  if (typeof createDriver !== "function") {
    removeGuidedParameter(request.url);
    return { state: "driver-unavailable" };
  }

  let restoreFocusables = () => {};
  let activeIndex = 0;
  let exitReason = "close";
  let finished = false;
  let telemetryStarted = false;
  let driverInstance;
  const cleanupCallbacks = [];

  const finish = () => {
    if (finished) return;
    finished = true;
    if (telemetryStarted) {
      trackVoxGuideWalkthrough({
        walkthroughId: config.id,
        state: exitReason === "done" ? "completed" : "closed",
        stepIndex: activeIndex + 1,
      });
      telemetryStarted = false;
    }
    restoreFocusables();
    restoreFocusables = () => {};
    cleanupCallbacks.splice(0).forEach((cleanup) => cleanup());
    activeSession = null;

    if (exitReason !== "navigation") removeGuidedParameter();

    queueMicrotask(() => {
      if (exitReason === "navigation") return;
      if (exitReason === "done") {
        const completionTarget = document.querySelector(config.doneFocusTarget || config.mainTarget);
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
        focusWithoutJump(completionTarget);
        return;
      }
      focusWithoutJump(resolvedSteps[activeIndex]?.focusTarget);
    });
  };

  const driverSteps = resolvedSteps.map((step) => ({
    element: step.target,
    popover: {
      title: step.title,
      description: step.description,
      side: step.side || "bottom",
      align: step.align || "start"
    }
  }));

  try {
    driverInstance = createDriver({
      steps: driverSteps,
      animate: !prefersReducedMotion(),
      smoothScroll: !prefersReducedMotion(),
      allowClose: true,
      allowKeyboardControl: true,
      allowScroll: true,
      overlayClickBehavior: "close",
      disableActiveInteraction: true,
      skipMissingElement: false,
      showProgress: false,
      showButtons: ["previous", "next", "close"],
      prevBtnText: "Previous",
      nextBtnText: "Next",
      doneBtnText: "Done",
      stagePadding: 8,
      stageRadius: 12,
      popoverOffset: 12,
      popoverClass: "vm-guide-walkthrough-popover",
      overlayColor: "#020408",
      overlayOpacity: 0.76,
      onHighlighted: (_element, _step, { state }) => {
        activeIndex = state.activeIndex ?? 0;
        restoreFocusables();
        restoreFocusables = suppressTargetFocusables(resolvedSteps[activeIndex].target);
      },
      onDeselected: () => {
        restoreFocusables();
        restoreFocusables = () => {};
      },
      onPopoverRender: (popover, { state }) => {
        const index = state.activeIndex ?? 0;
        popover.closeButton.setAttribute("aria-label", "Close guided reading");
        popover.previousButton.setAttribute("aria-label", "Previous guided-reading step");
        popover.nextButton.setAttribute(
          "aria-label",
          index === driverSteps.length - 1 ? "Finish guided reading" : "Next guided-reading step"
        );
        queueMicrotask(() => {
          if (popover.nextButton.isConnected) focusWithoutJump(popover.nextButton);
        });
      },
      onNextClick: () => {
        if (driverInstance.isLastStep()) exitReason = "done";
        driverInstance.moveNext();
      },
      onPrevClick: () => driverInstance.movePrevious(),
      onCloseClick: () => {
        exitReason = "close";
        driverInstance.destroy();
      },
      onDestroyStarted: () => driverInstance.destroy(),
      onDestroyed: finish
    });
  } catch (error) {
    removeGuidedParameter(request.url);
    reportStartupFailure(error);
    return { state: "driver-failure" };
  }

  const onKeydown = (event) => {
    if (event.key === "Escape") exitReason = "escape";
  };
  const onMotionChange = () => {
    exitReason = "motion-change";
    driverInstance.destroy();
  };
  const onNavigation = (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link || resolvedSteps[activeIndex].target.contains(link)) return;
    exitReason = "navigation";
    driverInstance.destroy();
  };
  const onPageHide = () => {
    exitReason = "navigation";
    driverInstance.destroy();
  };
  const onPopState = () => {
    exitReason = "navigation";
    driverInstance.destroy();
  };

  document.addEventListener("keydown", onKeydown, true);
  document.addEventListener("click", onNavigation, true);
  window.addEventListener("vm:reduce-motion-change", onMotionChange);
  window.addEventListener("pagehide", onPageHide, { once: true });
  window.addEventListener("popstate", onPopState);
  cleanupCallbacks.push(
    () => document.removeEventListener("keydown", onKeydown, true),
    () => document.removeEventListener("click", onNavigation, true),
    () => window.removeEventListener("vm:reduce-motion-change", onMotionChange),
    () => window.removeEventListener("pagehide", onPageHide),
    () => window.removeEventListener("popstate", onPopState)
  );

  activeSession = { destroy: driverInstance.destroy };
  try {
    driverInstance.drive();
    telemetryStarted = true;
    trackVoxGuideWalkthrough({
      walkthroughId: config.id,
      state: "started",
      stepIndex: 1,
    });
  } catch (error) {
    exitReason = "driver-failure";
    driverInstance.destroy();
    reportStartupFailure(error);
    return { state: "driver-failure" };
  }

  return { state: "started" };
}

export const guideWalkthroughInternals = Object.freeze({
  readGuidedRequest,
  suppressTargetFocusables
});

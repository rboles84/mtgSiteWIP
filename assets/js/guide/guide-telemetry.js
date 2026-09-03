import {
  beginVoxGuideSession,
  endVoxGuideSession,
  initializeVoxTelemetry,
  trackVoxGuideAction,
} from "../shared/vox-telemetry.js";

function guideModeForLocation(locationLike, walkthroughId) {
  try {
    const values = new URL(locationLike?.href).searchParams.getAll("guided");
    return values.length === 1 && values[0] === walkthroughId ? "guided" : "static";
  } catch {
    return "static";
  }
}

export function trackGuideCtaFromTarget(target) {
  const cta = target?.closest?.("[data-guide-cta]");
  return trackVoxGuideAction({
    destination: cta?.dataset?.guideCta,
    actionKind: cta?.dataset?.guideCtaKind,
  });
}

export function bootGuideTelemetry({
  guideSurface,
  walkthroughId,
  documentRef = globalThis.document,
  windowRef = globalThis.window,
  engagementOptions,
} = {}) {
  initializeVoxTelemetry();
  const guideSessionId = beginVoxGuideSession({
    guideSurface,
    guideMode: guideModeForLocation(windowRef?.location, walkthroughId),
    documentRef,
    engagementOptions,
  });
  if (!guideSessionId) return null;

  const onClick = (event) => trackGuideCtaFromTarget(event.target);
  documentRef?.addEventListener?.("click", onClick);

  return Object.freeze({
    guideSessionId,
    dispose() {
      documentRef?.removeEventListener?.("click", onClick);
      endVoxGuideSession();
    },
  });
}

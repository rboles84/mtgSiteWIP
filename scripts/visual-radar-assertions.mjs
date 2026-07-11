const EXPECTED_AXIS_COUNT = 5;

export async function stabilizeAndVerifyRadar(page, {
  selector,
  label,
  pointStyle,
}) {
  await page.waitForSelector(selector);
  await page.waitForFunction((targetSelector) => {
    const canvas = document.querySelector(targetSelector);
    return Boolean(
      canvas instanceof HTMLCanvasElement &&
      typeof window.Chart?.getChart === "function" &&
      window.Chart.getChart(canvas)
    );
  }, { timeout: 10000 }, selector);

  const report = await page.evaluate(({ targetSelector, expectedPointStyle, expectedAxisCount }) => {
    const canvas = document.querySelector(targetSelector);
    const chart = canvas instanceof HTMLCanvasElement && typeof window.Chart?.getChart === "function"
      ? window.Chart.getChart(canvas)
      : null;
    const failures = [];

    if (!chart || !(canvas instanceof HTMLCanvasElement)) {
      return { failures: ["production Chart.js instance is unavailable"] };
    }

    chart.stop();
    chart.update("none");

    const animationDuration = Number(chart.options?.animation?.duration ?? 0);
    if (animationDuration !== 0) {
      failures.push(`reduced-motion production animation duration is ${animationDuration}, expected 0`);
    }

    const labels = Array.isArray(chart.data?.labels) ? chart.data.labels : [];
    if (labels.length !== expectedAxisCount || labels.some((axisLabel) => !String(axisLabel || "").trim())) {
      failures.push(`expected ${expectedAxisCount} non-empty axis labels, found ${labels.length}`);
    }

    const compositeEntries = (chart.data?.datasets || [])
      .map((dataset, datasetIndex) => ({ dataset, datasetIndex }))
      .filter(({ dataset }) => dataset?._vmComposite === true);
    if (compositeEntries.length !== 1) {
      failures.push(`expected exactly one composite dataset, found ${compositeEntries.length}`);
    }

    const compositeEntry = compositeEntries[0];
    const dataset = compositeEntry?.dataset;
    const meta = compositeEntry ? chart.getDatasetMeta(compositeEntry.datasetIndex) : null;
    const values = Array.isArray(dataset?.data) ? dataset.data.map(Number) : [];
    if (values.length !== expectedAxisCount || values.some((value) => !Number.isFinite(value))) {
      failures.push(`expected one composite dataset with ${expectedAxisCount} finite values`);
    }

    const chartArea = chart.chartArea;
    if (!chartArea) {
      failures.push("Chart.js chartArea is unavailable");
      return { failures };
    }

    const points = (meta?.data || []).map((point) => ({
      x: Number(point?.x),
      y: Number(point?.y),
      options: point?.options || {},
    }));
    const pointInsideChartArea = (point) => (
      Number.isFinite(point.x) &&
      Number.isFinite(point.y) &&
      point.x >= chartArea.left &&
      point.x <= chartArea.right &&
      point.y >= chartArea.top &&
      point.y <= chartArea.bottom
    );
    if (points.length !== expectedAxisCount || !points.every(pointInsideChartArea)) {
      failures.push(`expected ${expectedAxisCount} rendered composite dataset points inside chartArea`);
    }

    const pointRadius = Number(dataset?.pointRadius ?? points[0]?.options?.radius);
    const pointBorderWidth = Number(dataset?.pointBorderWidth ?? points[0]?.options?.borderWidth);
    const configuredPlugins = Array.isArray(chart.config?.plugins) ? chart.config.plugins : [];
    const productionGlowPlugin = configuredPlugins.find((plugin) => /glow/i.test(String(plugin?.id || "")));
    const productionGlowOptions = productionGlowPlugin?.id
      ? chart.options?.plugins?.[productionGlowPlugin.id]
      : null;
    const glowBlurCandidates = [
      dataset?._vmGlowBlur,
      dataset?.glowBlur,
      productionGlowOptions?._vmGlowBlur,
      productionGlowOptions?.glowBlur,
      productionGlowOptions?.blur,
      productionGlowPlugin?._vmGlowBlur,
      productionGlowPlugin?.glowBlur,
      productionGlowPlugin?.blur,
    ];
    const glowBlur = glowBlurCandidates.map(Number).find(Number.isFinite);
    if (![pointRadius, pointBorderWidth, glowBlur].every(Number.isFinite)) {
      failures.push("point radius, point border width, and glow blur must resolve from production chart configuration");
    }

    const colorContext = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    const parseColor = (value) => {
      if (!colorContext || !value || typeof value !== "string") return null;
      colorContext.canvas.width = 1;
      colorContext.canvas.height = 1;
      colorContext.clearRect(0, 0, 1, 1);
      colorContext.fillStyle = "rgba(0,0,0,0)";
      try {
        colorContext.fillStyle = value;
      } catch {
        return null;
      }
      colorContext.fillRect(0, 0, 1, 1);
      return Array.from(colorContext.getImageData(0, 0, 1, 1).data);
    };
    const colorsClose = (left, right, tolerance = 4) => Boolean(
      left && right &&
      Math.abs(left[0] - right[0]) <= tolerance &&
      Math.abs(left[1] - right[1]) <= tolerance &&
      Math.abs(left[2] - right[2]) <= tolerance
    );
    const effectivePointBackground = parseColor(points[0]?.options?.backgroundColor || dataset?.pointBackgroundColor);
    const effectivePointBorder = parseColor(points[0]?.options?.borderColor || dataset?.pointBorderColor);
    const effectivePolygonBorder = parseColor(meta?.dataset?.options?.borderColor || dataset?.borderColor);

    if (expectedPointStyle === "home") {
      if (!colorsClose(effectivePointBackground, [255, 255, 255, 255])) {
        failures.push("Home composite points no longer use the production white fill");
      }
      if (!colorsClose(effectivePointBorder, effectivePolygonBorder)) {
        failures.push("Home composite point border no longer matches the production identity-colored border");
      }
    } else if (expectedPointStyle === "archscry") {
      if (!colorsClose(effectivePointBackground, [240, 197, 106, 255])) {
        failures.push("Archscry composite points no longer use the production gold synthesis fill");
      }
      if (!colorsClose(effectivePointBorder, [255, 247, 216, 242], 6)) {
        failures.push("Archscry composite points no longer use the production synthesis-point border");
      }
    } else {
      failures.push(`unsupported production point style assertion: ${expectedPointStyle}`);
    }

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      failures.push("radar 2D context is unavailable");
      return { failures };
    }

    const left = Math.max(0, Math.floor(chartArea.left));
    const top = Math.max(0, Math.floor(chartArea.top));
    const right = Math.min(canvas.width, Math.ceil(chartArea.right));
    const bottom = Math.min(canvas.height, Math.ceil(chartArea.bottom));
    const width = Math.max(0, right - left);
    const height = Math.max(0, bottom - top);
    if (!width || !height) {
      failures.push("chartArea has no measurable canvas pixels");
      return { failures };
    }

    const pixels = context.getImageData(left, top, width, height).data;
    const luminance = (red, green, blue) => (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
    const pixelOffset = (x, y) => ((y - top) * width + (x - left)) * 4;
    const qualifies = (offset, alphaFloor, luminanceFloor = 0) => (
      pixels[offset + 3] >= alphaFloor &&
      luminance(pixels[offset], pixels[offset + 1], pixels[offset + 2]) >= luminanceFloor
    );

    const totalPixels = width * height;
    let visiblePixelCount = 0;
    let strongPixelCount = 0;
    let strongMinX = right;
    let strongMaxX = left - 1;
    let strongMinY = bottom;
    let strongMaxY = top - 1;
    for (let y = top; y < bottom; y += 1) {
      for (let x = left; x < right; x += 1) {
        const offset = pixelOffset(x, y);
        if (qualifies(offset, 32)) visiblePixelCount += 1;
        if (qualifies(offset, 64, 80)) {
          strongPixelCount += 1;
          strongMinX = Math.min(strongMinX, x);
          strongMaxX = Math.max(strongMaxX, x);
          strongMinY = Math.min(strongMinY, y);
          strongMaxY = Math.max(strongMaxY, y);
        }
      }
    }

    const visibleRatio = visiblePixelCount / totalPixels;
    const strongRatio = strongPixelCount / totalPixels;
    const strongWidthCoverage = strongPixelCount ? (strongMaxX - strongMinX + 1) / width : 0;
    const strongHeightCoverage = strongPixelCount ? (strongMaxY - strongMinY + 1) / height : 0;
    if (visibleRatio < 0.01) failures.push(`chartArea alpha>=32 coverage ${visibleRatio.toFixed(4)} is below 0.01`);
    if (strongRatio < 0.0025) failures.push(`chartArea strong-pixel coverage ${strongRatio.toFixed(4)} is below 0.0025`);
    if (strongWidthCoverage < 0.45 || strongHeightCoverage < 0.45) {
      failures.push(`strong-pixel bounds cover only ${strongWidthCoverage.toFixed(3)} width and ${strongHeightCoverage.toFixed(3)} height`);
    }

    const nodeRadius = [pointRadius, pointBorderWidth, glowBlur].every(Number.isFinite)
      ? Math.ceil(Math.max(pointRadius + pointBorderWidth, Math.min(12, glowBlur / 2)))
      : 0;
    const nodeReports = points.map((point, pointIndex) => {
      let neighborhoodPixelCount = 0;
      let qualifyingPixelCount = 0;
      const startX = Math.max(left, Math.floor(point.x - nodeRadius));
      const endX = Math.min(right - 1, Math.ceil(point.x + nodeRadius));
      const startY = Math.max(top, Math.floor(point.y - nodeRadius));
      const endY = Math.min(bottom - 1, Math.ceil(point.y + nodeRadius));
      for (let y = startY; y <= endY; y += 1) {
        for (let x = startX; x <= endX; x += 1) {
          if (((x - point.x) ** 2) + ((y - point.y) ** 2) > nodeRadius ** 2) continue;
          neighborhoodPixelCount += 1;
          if (qualifies(pixelOffset(x, y), 64, 80)) qualifyingPixelCount += 1;
        }
      }
      const requiredPixels = Math.max(4, Math.ceil(neighborhoodPixelCount * 0.02));
      if (qualifyingPixelCount < requiredPixels) {
        failures.push(`composite point ${pointIndex + 1} has ${qualifyingPixelCount}/${requiredPixels} required visible neighborhood pixels`);
      }
      return { neighborhoodPixelCount, qualifyingPixelCount, requiredPixels };
    });

    const polygonBorderWidth = Number(meta?.dataset?.options?.borderWidth ?? dataset?.borderWidth);
    const edgeRadius = Math.max(2, Math.ceil((Number.isFinite(polygonBorderWidth) ? polygonBorderWidth : 1) + 1));
    const edgeReports = points.map((point, pointIndex) => {
      const nextPoint = points[(pointIndex + 1) % points.length];
      const sampleFractions = [0.3, 0.5, 0.7];
      let matchingSamples = 0;
      sampleFractions.forEach((fraction) => {
        const sampleX = point.x + ((nextPoint.x - point.x) * fraction);
        const sampleY = point.y + ((nextPoint.y - point.y) * fraction);
        let matched = false;
        for (let y = Math.max(top, Math.floor(sampleY - edgeRadius)); y <= Math.min(bottom - 1, Math.ceil(sampleY + edgeRadius)) && !matched; y += 1) {
          for (let x = Math.max(left, Math.floor(sampleX - edgeRadius)); x <= Math.min(right - 1, Math.ceil(sampleX + edgeRadius)); x += 1) {
            const offset = pixelOffset(x, y);
            const candidate = [pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3]];
            const colorDistance = effectivePolygonBorder
              ? Math.hypot(
                candidate[0] - effectivePolygonBorder[0],
                candidate[1] - effectivePolygonBorder[1],
                candidate[2] - effectivePolygonBorder[2]
              )
              : Number.POSITIVE_INFINITY;
            if (candidate[3] >= 32 && colorDistance <= 120) {
              matched = true;
              break;
            }
          }
        }
        if (matched) matchingSamples += 1;
      });
      if (matchingSamples < 2) {
        failures.push(`composite polygon edge ${pointIndex + 1} is not visibly rendered in production border color`);
      }
      return { matchingSamples, requiredSamples: 2 };
    });

    return {
      failures,
      labels,
      values,
      pointRadius,
      pointBorderWidth,
      glowBlur,
      animationDuration,
      nodeRadius,
      nodeReports,
      edgeReports,
      chartArea: { left, top, right, bottom, width, height },
      visibleRatio,
      strongRatio,
      strongWidthCoverage,
      strongHeightCoverage,
    };
  }, { targetSelector: selector, expectedPointStyle: pointStyle, expectedAxisCount: EXPECTED_AXIS_COUNT });

  if (report.failures?.length) {
    throw new Error(`${label} verification failed: ${report.failures.join("; ")}; report=${JSON.stringify(report)}`);
  }

  console.log(
    `${label}: ${report.labels.length} axes, ${report.values.length} composite points, ` +
    `${report.chartArea.width}x${report.chartArea.height} chartArea, ` +
    `${(report.visibleRatio * 100).toFixed(2)}% visible / ${(report.strongRatio * 100).toFixed(2)}% strong pixels, ` +
    `${(report.strongWidthCoverage * 100).toFixed(1)}% x ${(report.strongHeightCoverage * 100).toFixed(1)}% strong bounds`
  );
  return report;
}

export const COLOR_ORDER = ["W", "U", "B", "R", "G"];

const COLOR_NAMES = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
};

export function getColorName(code) {
  return COLOR_NAMES[String(code || "").toUpperCase()] || String(code || "").toUpperCase();
}

export function sortColorCodes(colors = []) {
  const selected = new Set(
    (Array.isArray(colors) ? colors : [colors])
      .map((entry) => String(entry || "").toUpperCase())
      .filter(Boolean)
  );
  return COLOR_ORDER.filter((code) => selected.has(code));
}

export function getExpressionKindLabel(value) {
  const kind = typeof value === "string"
    ? value
    : value?.identity?.expression_kind || value?.institution_type || value?.kind || "";
  switch (String(kind || "").toLowerCase()) {
    case "college":
      return "College";
    case "guild":
      return "Guild";
    case "color":
      return "Color";
    case "shard":
      return "Shard";
    case "wedge":
      return "Wedge";
    case "four_color":
      return "Four-color";
    case "five_color":
      return "Five-Color";
    case "colorless":
      return "Colorless";
    default:
      return "Expression";
  }
}

export function getExpressionKindLabelLower(value) {
  return getExpressionKindLabel(value).toLowerCase();
}

export function formatPurity(purity) {
  return typeof purity === "number" && Number.isFinite(purity)
    ? `${Math.round(purity * 100)}%`
    : "Pending color calibration";
}

function hasAggregateCoreColor(coreColor) {
  return !COLOR_ORDER.includes(String(coreColor || "").toUpperCase());
}

export function normalizeLayeredIdentity(identity = {}, fallback = {}) {
  const expressionKey = identity.expression_key || fallback.expression_key || fallback.key || null;
  const expressionName = identity.expression_name || fallback.expression_name || fallback.name || null;
  const expressionKind = identity.expression_kind || fallback.expression_kind || fallback.kind || fallback.institution_type || null;
  const coreColor = identity.core_color || fallback.core_color || null;
  const secondaryColors = sortColorCodes(
    identity.secondary_colors ||
      fallback.secondary_colors ||
      (identity.secondary_color ? [identity.secondary_color] : fallback.secondary_color ? [fallback.secondary_color] : [])
  );

  return {
    core_color: coreColor,
    secondary_colors: secondaryColors,
    secondary_color: hasAggregateCoreColor(coreColor) ? null : secondaryColors[0] || null,
    expression_key: expressionKey,
    expression_name: expressionName,
    expression_kind: expressionKind,
    purity: typeof identity.purity === "number" ? identity.purity : (typeof fallback.purity === "number" ? fallback.purity : null),
    routing: identity.routing || fallback.routing || null,
  };
}

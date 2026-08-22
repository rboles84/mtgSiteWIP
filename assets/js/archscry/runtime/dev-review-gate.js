export const ARCHSCRY_DEV_REVIEW_FLAG = "vm-dev-review";

export const ARCHSCRY_DEV_REVIEW_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "::1",
  "[::1]",
]);

export function isArchscryDevReviewLocation(locationLike) {
  const protocol = String(locationLike?.protocol || "").toLowerCase();
  const hostname = String(locationLike?.hostname || "").toLowerCase();
  if (!["http:", "https:"].includes(protocol) || !ARCHSCRY_DEV_REVIEW_HOSTS.has(hostname)) {
    return false;
  }
  const parameters = new URLSearchParams(String(locationLike?.search || ""));
  return parameters.get(ARCHSCRY_DEV_REVIEW_FLAG) === "1";
}

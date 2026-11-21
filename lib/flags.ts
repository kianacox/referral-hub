/**
 * Server-side feature flags. Read env vars here and nowhere else.
 *
 * ENABLE_FINANCE_PAGES: financial-product pages (brands with `financial: true`)
 * are shown only when this is exactly "true". Anything else — unset, "1",
 * "TRUE" — keeps them hidden. Pages are prerendered, so a change needs a redeploy.
 */
export function isFinancePagesEnabled(): boolean {
  return process.env.ENABLE_FINANCE_PAGES === "true";
}

/**
 * AdGurilla Utility & Formatter Functions
 */

/**
 * Formats a numeric price into Indian Rupee format (e.g. ₹ 25,000)
 */
export function formatINRPrice(price: number): string {
  return `₹ ${price.toLocaleString('en-IN')}`;
}

/**
 * Formats daily reach count into clean string (e.g., 150000 -> "~ 150K daily reach")
 */
export function formatDailyReach(impressions: number): string {
  if (impressions >= 1000000) {
    return `~ ${(impressions / 1000000).toFixed(1)}M daily reach`;
  }
  if (impressions >= 1000) {
    return `~ ${Math.round(impressions / 1000)}K daily reach`;
  }
  return `~ ${impressions} daily reach`;
}

/**
 * Truncates text cleanly with ellipsis if exceeding maxLength
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

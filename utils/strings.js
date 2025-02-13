export function formatAmount(text) {
  // Remove non-numeric characters except for the dot
  let result = text.replace(/[^0-9.]/g, "");

  // Limit to only two decimal places if there are more
  result = result.replace(/(\.\d{2})\d+/g, "$1");

  // If there are multiple dots, remove the extra dots
  if ((result.match(/\./g) || []).length > 1) {
    result = result.replace(/\./g, "");
  }

  return result;
}

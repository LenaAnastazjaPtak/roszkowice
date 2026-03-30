export function formatPostDate(isoString, locale) {
  const date = new Date(isoString);
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: date.toLocaleString(locale, { month: "long" }),
    year: String(date.getFullYear()),
  };
}

// Formats date. By default, it returns a string containing time, like
// "14:00:00".

export default function formatDate(date, locales, options) {
  locales = locales || "ru";
  options = options || {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };

  return date.toLocaleString(locales, options);
}
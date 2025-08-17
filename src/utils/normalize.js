export function normalizeCityName(raw) {
  if (!raw) return null;

  let name = raw
    .replace(/\(.*?\)/g, '')
    .replace(/station.*$/i, '')
    .replace(/powerplant.*$/i, '')
    .replace(/unknown.*$/i, '')
    .trim();

  name = name
    .toLowerCase()
    .replace(/(^|\s)\S/g, (c) => c.toUpperCase());

  if (!/^[A-Za-zÀ-ž\s-]+$/.test(name)) return null;
  if (name.length < 3) return null;

  return name;
}
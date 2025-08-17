import fetch from 'node-fetch';

const wikiCache = new Map();

export async function getWikipediaData(city) {
  if (wikiCache.has(city)) return wikiCache.get(city);

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Wiki fetch failed');
    const data = await res.json();
    const desc = data.extract || 'No description available';

    // Try to detect country from Wikipedia description
    let country = 'Unknown';
    if (data.description && /city in (.*)/i.test(data.description)) {
      country = data.description.replace(/.*city in /i, '').trim();
    }

    const result = { description: desc, country };
    wikiCache.set(city, result);
    return result;
  } catch (err) {
    console.error(`Wikipedia fetch failed for ${city}`, err.message);
    return { description: 'No description available', country: 'Unknown' };
  }
}
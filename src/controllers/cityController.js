import { fetchAllCities } from '../services/mockApiService.js';
import { getWikipediaData } from '../services/wikipediaService.js';
import { normalizeCityName } from '../utils/normalize.js';

export const getCities = async (req, res) => {
  try {
    const { page, limit, country } = req.query;

    const rawData = await fetchAllCities(req.token, country, page, limit);

    // Normalize + filter invalid entries
    const validCities = [];
    for (const entry of rawData) {
      const cityName = normalizeCityName(entry.name);
      if (!cityName) continue;

      // Prevent duplicates (prefer highest pollution value)
      const existing = validCities.find((c) => c.name === cityName);
      if (existing) {
        if (entry.pollution > existing.pollution) existing.pollution = entry.pollution;
      } else {
        validCities.push({ name: cityName, pollution: entry.pollution });
      }
    }

    // Enrich with Wikipedia data
    const enrichedCities = await Promise.all(
      validCities.map(async (c) => {
        const wikiData = await getWikipediaData(c.name);
        return {
          name: c.name,
          country: wikiData.country,
          pollution: c.pollution,
          description: wikiData.description
        };
      })
    );

    // Pagination
    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    const paginated = enrichedCities.slice(start, end);

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: enrichedCities.length,
      cities: paginated
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
};
import fetch from 'node-fetch';
import config from '../config/config.js';

// Get Cities
export async function fetchAllCities(token, country, page, limit) {
  let all = [];

  while (true) {
    const res = await fetch(`${config.baseURL}/pollution?country=${country}&page=${page}&limit=${limit}`, {
      headers: {
        accept: 'application/json',
        Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
      }
    });

    if (!res.ok) {
      let errorMessage = `Request failed with status ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData?.message || errorData?.error || JSON.stringify(errorData);
      } catch (err) {
        errorMessage = res.statusText;
      }
      throw new Error(errorMessage);
    }

    const data = await res.json();
    all = all.concat(data.results);

    if (page >= data.meta.totalPages) break;
    page++;
  }
  return all;
}

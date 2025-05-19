const weatherCache = {};

export async function fetchWeatherWithCache(key, fetcher) {
  const now = Date.now();
  const cached = weatherCache[key];
  if (cached && now - cached.timestamp < 60 * 60 * 1000) {
    return cached.data;
  }
  const data = await fetcher();
  weatherCache[key] = { data, timestamp: now };
  return data;
}
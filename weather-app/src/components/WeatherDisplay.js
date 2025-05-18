// API helper functions for Open-Meteo

export async function getCoordinates(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
    };
  }
  throw new Error("City not found.");
}

export async function getWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const data = await response.json();
  if (data.current_weather && typeof data.current_weather.temperature === "number") {
    return data.current_weather.temperature;
  }
  throw new Error("Weather data not available.");
}
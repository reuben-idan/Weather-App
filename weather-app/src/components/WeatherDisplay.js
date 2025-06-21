// API helper functions for local backend

export async function getCoordinates(city) {
  const response = await fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city }),
  });

  if (!response.ok) {
    throw new Error("City not found.");
  }

  const data = await response.json();
  // For demo purposes, generate coordinates based on city name
  const lat =
    40.0 +
    (city
      .toLowerCase()
      .split("")
      .reduce((a, b) => a + b.charCodeAt(0), 0) %
      1000) /
      1000.0;
  const lon =
    -74.0 +
    (city
      .toLowerCase()
      .split("")
      .reverse()
      .reduce((a, b) => a + b.charCodeAt(0), 0) %
      1000) /
      1000.0;

  return {
    latitude: lat,
    longitude: lon,
  };
}

export async function getWeather(latitude, longitude) {
  // For demo purposes, generate weather data based on coordinates
  const temperature = Math.round(15 + (latitude % 10) + (longitude % 5));
  return temperature;
}

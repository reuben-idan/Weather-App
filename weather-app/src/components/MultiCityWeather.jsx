import React, { useState, useEffect } from "react";
import { getCoordinates, getWeather } from "./WeatherDisplay";
import { fetchWeatherWithCache } from "../utils/weatherCache";

export default function MultiCityWeather() {
  const [cities, setCities] = useState(["London", "Paris"]);
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAddCity = (e) => {
    e.preventDefault();
    const city = input.trim();
    if (city && !cities.includes(city)) {
      setCities([...cities, city]);
    }
    setInput("");
  };

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const results = {};
      for (const city of cities) {
        try {
          const coords = await fetchWeatherWithCache(
            `coords_${city}`,
            () => getCoordinates(city)
          );
          const temp = await fetchWeatherWithCache(
            `weather_${city}`,
            () => getWeather(coords.latitude, coords.longitude)
          );
          results[city] = { temp, coords };
        } catch {
          results[city] = { temp: "N/A" };
        }
      }
      setWeatherData(results);
      setLoading(false);
    }
    fetchAll();
    // eslint-disable-next-line
  }, [cities.join(",")]);

  return (
    <div className="multi-city-container">
      <form onSubmit={handleAddCity} style={{ marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add city"
        />
        <button type="submit">Add</button>
      </form>
      {loading && <div>Loading...</div>}
      <div className="multi-city-list">
        {cities.map(city => (
          <div className="multi-city-card" key={city}>
            <div className="city-name">{city}</div>
            <div className="city-temp">
              {weatherData[city]?.temp !== undefined
                ? `${weatherData[city].temp}°C`
                : "…"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
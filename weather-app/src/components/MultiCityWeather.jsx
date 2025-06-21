import React, { useState, useEffect } from "react";
import { getCoordinates, getWeather } from "./WeatherDisplay";
import { fetchWeatherWithCache } from "../utils/weatherCache";
import "./MultiCityWeather.css";

export default function MultiCityWeather() {
  const [cities, setCities] = useState(["London", "Paris", "New York"]);
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCity = (e) => {
    e.preventDefault();
    const city = input.trim();
    if (city && !cities.includes(city)) {
      setCities([...cities, city]);
      setInput("");
      setIsAdding(false);
    }
  };

  const handleRemoveCity = (cityToRemove) => {
    setCities(cities.filter((city) => city !== cityToRemove));
    const newWeatherData = { ...weatherData };
    delete newWeatherData[cityToRemove];
    setWeatherData(newWeatherData);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCity(e);
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setInput("");
    }
  };

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const results = {};
      for (const city of cities) {
        try {
          const coords = await fetchWeatherWithCache(`coords_${city}`, () =>
            getCoordinates(city)
          );
          const temp = await fetchWeatherWithCache(`weather_${city}`, () =>
            getWeather(coords.latitude, coords.longitude)
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
      <div className="multi-city-header">
        <h3 className="multi-city-title">Global Weather</h3>
        <p className="multi-city-subtitle">
          Track weather across multiple cities
        </p>
      </div>

      <div className="multi-city-controls">
        {!isAdding ? (
          <button className="add-city-button" onClick={() => setIsAdding(true)}>
            <span className="add-icon">+</span>
            <span>Add City</span>
          </button>
        ) : (
          <form className="add-city-form" onSubmit={handleAddCity}>
            <div className="input-group">
              <input
                className="city-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter city name..."
                autoFocus
              />
              <div className="input-actions">
                <button type="submit" className="confirm-button">
                  <span>✓</span>
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setIsAdding(false);
                    setInput("");
                  }}
                >
                  <span>✕</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {loading && (
        <div className="multi-city-loading">
          <div className="loading-spinner"></div>
          <span>Updating weather data...</span>
        </div>
      )}

      <div className="multi-city-grid">
        {cities.map((city) => (
          <div className="city-card" key={city}>
            <div className="city-card-header">
              <h4 className="city-name">{city}</h4>
              <button
                className="remove-city-button"
                onClick={() => handleRemoveCity(city)}
                title="Remove city"
              >
                ×
              </button>
            </div>

            <div className="city-weather">
              <div className="city-temp">
                {weatherData[city]?.temp !== undefined &&
                weatherData[city].temp !== "N/A"
                  ? `${Math.round(weatherData[city].temp)}°C`
                  : "—"}
              </div>

              <div className="city-status">
                {weatherData[city]?.temp !== undefined &&
                weatherData[city].temp !== "N/A"
                  ? "Updated"
                  : "Loading..."}
              </div>
            </div>
          </div>
        ))}
      </div>

      {cities.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🌍</div>
          <p>No cities added yet</p>
          <p>Add a city to start tracking weather</p>
        </div>
      )}
    </div>
  );
}

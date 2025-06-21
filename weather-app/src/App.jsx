import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import MultiCityWeather from "./components/MultiCityWeather";
import FiveDayForecast from "./components/FiveDayForecast";
import { getCoordinates, getWeather } from "./components/WeatherDisplay";
import "./styles/App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("day");

  // Determine time of day for dynamic backgrounds
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      setTimeOfDay("day");
    } else if (hour >= 18 && hour < 20) {
      setTimeOfDay("sunset");
    } else {
      setTimeOfDay("night");
    }
  }, []);

  const handleSearch = async (city) => {
    setError("");
    setWeather(null);
    setCoords(null);
    setLoading(true);

    try {
      const { latitude, longitude } = await getCoordinates(city);
      setCoords({ latitude, longitude });

      const response = await fetch("/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error("Server error: " + text);
      }
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container ${timeOfDay}`}>
      <div className="background-overlay"></div>
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <main className="main-content">
        <header className="header">
          <div className="logo-container">
            <div className="logo-icon">🌤️</div>
            <div className="logo-text">
              <h1 className="app-title">Weatherly</h1>
              <p className="subtitle">Your weather companion</p>
            </div>
          </div>
        </header>

        <section className="search-section">
          <SearchBar onSearch={handleSearch} />
        </section>

        <section className="weather-display-section">
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Fetching weather data...</p>
            </div>
          )}

          {weather && !loading && (
            <div className="weather-content">
              <WeatherCard weather={weather} />
              {coords && (
                <div className="forecast-wrapper">
                  <FiveDayForecast
                    lat={coords.latitude}
                    lon={coords.longitude}
                  />
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <p className="error-message">{error}</p>
            </div>
          )}
        </section>

        <section className="multi-city-section">
          <MultiCityWeather />
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <span className="footer-text">
            Powered by{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Open-Meteo
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;

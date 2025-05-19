import React, { useState } from "react";
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
    <div className="app-bg">
      <main className="main-content">
        <header className="header">
          <h1 className="app-title">Weatherly</h1>
          <p className="subtitle">Effortless, beautiful weather at a glance</p>
        </header>
        <section className="search-section">
          <SearchBar onSearch={handleSearch} />
        </section>
        <section className="single-weather-section">
          {loading && <div className="loader"></div>}
          {weather && !loading && <WeatherCard weather={weather} />}
          {error && <div className="error-msg">{error}</div>}
        </section>
        {coords && (
          <section className="forecast-section">
            <FiveDayForecast lat={coords.latitude} lon={coords.longitude} />
          </section>
        )}
        <section className="multi-city-section">
          <MultiCityWeather />
        </section>
      </main>
      <footer className="footer">
        <span>
          Powered by{" "}
          <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">
            Open-Meteo
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;

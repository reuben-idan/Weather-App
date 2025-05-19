import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MultiCityWeather from "./components/MultiCityWeather";
import FiveDayForecast from "./components/FiveDayForecast";
import { getCoordinates, getWeather } from "./components/WeatherDisplay";
import "./styles/App.css";

function App() {
  const [temperature, setTemperature] = useState(null);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setError("");
    setTemperature(null);
    setCoords(null);
    setLoading(true);

    try {
      const { latitude, longitude } = await getCoordinates(city);
      setCoords({ latitude, longitude });
      const temp = await getWeather(latitude, longitude);
      setTemperature(temp);
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
          {temperature !== null && !loading && (
            <div className="weather-card fade-in">
              <span className="temp">{temperature}°C</span>
              <span className="desc">Current Temperature</span>
            </div>
          )}
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

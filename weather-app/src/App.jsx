import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { getCoordinates, getWeather } from "./components/WeatherDisplay";
import "./styles/App.css";

function App() {
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setError("");
    setTemperature(null);
    setLoading(true);

    try {
      const { latitude, longitude } = await getCoordinates(city);
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
      <div className="weather-container">
        <h1 className="app-title">🌤️ Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {loading && <div className="loader"></div>}
        {temperature !== null && !loading && (
          <div className="weather-card">
            <span className="temp">{temperature}°C</span>
            <span className="desc">Current Temperature</span>
          </div>
        )}
        {error && <div className="error-msg">{error}</div>}
      </div>
      <footer className="footer">
        Powered by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>
      </footer>
    </div>
  );
}

export default App;

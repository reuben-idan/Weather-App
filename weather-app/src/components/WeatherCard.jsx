import React from "react";
import "./WeatherCard.css";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  // Function to get weather icon based on conditions
  const getWeatherIcon = (temp, humidity) => {
    if (temp < 0) return "❄️";
    if (temp < 10) return "🌤️";
    if (temp < 20) return "⛅";
    if (temp < 25) return "☀️";
    if (temp < 30) return "🌞";
    if (humidity > 80) return "🌧️";
    return "☀️";
  };

  // Function to get weather description
  const getWeatherDescription = (temp) => {
    if (temp < 0) return "Freezing";
    if (temp < 10) return "Cold";
    if (temp < 20) return "Cool";
    if (temp < 25) return "Mild";
    if (temp < 30) return "Warm";
    return "Hot";
  };

  const weatherIcon = getWeatherIcon(weather.temperature, weather.humidity);
  const weatherDesc = getWeatherDescription(weather.temperature);

  return (
    <div className="weather-card">
      <div className="weather-card-background">
        <div className="weather-pattern"></div>
      </div>

      <div className="weather-content">
        <div className="weather-header">
          <div className="weather-icon-large">{weatherIcon}</div>
          <div className="weather-main-info">
            <div className="temperature">
              {Math.round(weather.temperature)}°C
            </div>
            <div className="weather-description">{weatherDesc}</div>
          </div>
        </div>

        <div className="weather-details-grid">
          <div className="weather-detail-item">
            <div className="detail-icon">💧</div>
            <div className="detail-content">
              <div className="detail-label">Humidity</div>
              <div className="detail-value">{weather.humidity}%</div>
            </div>
          </div>

          <div className="weather-detail-item">
            <div className="detail-icon">💨</div>
            <div className="detail-content">
              <div className="detail-label">Wind Speed</div>
              <div className="detail-value">{weather.wind_speed} km/h</div>
            </div>
          </div>

          <div className="weather-detail-item">
            <div className="detail-icon">🌧️</div>
            <div className="detail-content">
              <div className="detail-label">Precipitation</div>
              <div className="detail-value">{weather.precipitation} mm</div>
            </div>
          </div>

          <div className="weather-detail-item">
            <div className="detail-icon">🌡️</div>
            <div className="detail-content">
              <div className="detail-label">Feels Like</div>
              <div className="detail-value">
                {Math.round(weather.temperature)}°C
              </div>
            </div>
          </div>
        </div>

        <div className="weather-footer">
          <div className="current-time">
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
          <div className="weather-location">📍 Current Location</div>
        </div>
      </div>
    </div>
  );
}

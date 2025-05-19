import React from "react";

export default function WeatherCard({ weather }) {
  if (!weather) return null;
  return (
    <div className="weather-card fade-in">
      <div className="temp">{weather.temperature}°C</div>
      <div className="desc">Current Temperature</div>
      <div className="weather-details">
        <div>
          <span role="img" aria-label="humidity">💧</span> Humidity: <b>{weather.humidity}%</b>
        </div>
        <div>
          <span role="img" aria-label="wind">💨</span> Wind: <b>{weather.wind_speed} km/h</b>
        </div>
        <div>
          <span role="img" aria-label="rain">🌧️</span> Precipitation: <b>{weather.precipitation} mm</b>
        </div>
      </div>
    </div>
  );
}
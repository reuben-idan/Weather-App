import React, { useEffect, useState } from "react";
import { fetchWeatherWithCache } from "../utils/weatherCache";
import "./FiveDayForecast.css";

async function get5DayForecast(lat, lon) {
  return fetchWeatherWithCache(`forecast_${lat}_${lon}`, async () => {
    // For demo purposes, generate mock 5-day forecast data
    const today = new Date();
    const forecast = {
      time: [],
      temperature_2m_max: [],
      temperature_2m_min: [],
      weathercode: [],
    };

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      forecast.time.push(date.toISOString().split("T")[0]);

      // Generate mock temperature data based on coordinates
      const baseTemp = 15 + (lat % 10) + (lon % 5);
      const variation = Math.sin(i * 0.5) * 5;
      const maxTemp = Math.round(baseTemp + variation + 3);
      const minTemp = Math.round(baseTemp + variation - 3);

      forecast.temperature_2m_max.push(maxTemp);
      forecast.temperature_2m_min.push(minTemp);

      // Generate mock weather codes
      const weatherCodes = [
        0, 1, 2, 3, 45, 48, 51, 53, 55, 61, 63, 65, 80, 81, 82,
      ];
      forecast.weathercode.push(
        weatherCodes[Math.floor(Math.random() * weatherCodes.length)]
      );
    }

    return forecast;
  });
}

// Function to get weather icon based on weather code
const getWeatherIcon = (weatherCode) => {
  if (weatherCode >= 0 && weatherCode <= 3) return "☀️"; // Clear sky
  if (weatherCode >= 45 && weatherCode <= 48) return "🌫️"; // Foggy
  if (weatherCode >= 51 && weatherCode <= 55) return "🌧️"; // Drizzle
  if (weatherCode >= 56 && weatherCode <= 57) return "🌨️"; // Freezing drizzle
  if (weatherCode >= 61 && weatherCode <= 65) return "🌧️"; // Rain
  if (weatherCode >= 66 && weatherCode <= 67) return "🌨️"; // Freezing rain
  if (weatherCode >= 71 && weatherCode <= 75) return "❄️"; // Snow
  if (weatherCode >= 77 && weatherCode <= 77) return "🌨️"; // Snow grains
  if (weatherCode >= 80 && weatherCode <= 82) return "🌧️"; // Rain showers
  if (weatherCode >= 85 && weatherCode <= 86) return "🌨️"; // Snow showers
  if (weatherCode >= 95 && weatherCode <= 95) return "⛈️"; // Thunderstorm
  if (weatherCode >= 96 && weatherCode <= 99) return "⛈️"; // Thunderstorm with hail
  return "🌤️"; // Default
};

// Function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }
};

export default function FiveDayForecast({ lat, lon }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lat && lon) {
      setLoading(true);
      get5DayForecast(lat, lon)
        .then(setForecast)
        .finally(() => setLoading(false));
    }
  }, [lat, lon]);

  if (loading) {
    return (
      <div className="forecast-container">
        <div className="forecast-header">
          <h3 className="forecast-title">5-Day Forecast</h3>
          <div className="forecast-subtitle">Loading forecast data...</div>
        </div>
        <div className="forecast-loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!forecast) {
    return (
      <div className="forecast-container">
        <div className="forecast-header">
          <h3 className="forecast-title">5-Day Forecast</h3>
          <div className="forecast-subtitle">Unable to load forecast</div>
        </div>
      </div>
    );
  }

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-subtitle">Extended weather outlook</div>
      </div>

      <div className="forecast-grid">
        {forecast.time.slice(0, 5).map((date, idx) => {
          const weatherIcon = getWeatherIcon(forecast.weathercode[idx]);
          const formattedDate = formatDate(date);
          const minTemp = Math.round(forecast.temperature_2m_min[idx]);
          const maxTemp = Math.round(forecast.temperature_2m_max[idx]);

          return (
            <div className="forecast-day-card" key={date}>
              <div className="forecast-day-header">
                <div className="forecast-day-name">{formattedDate}</div>
                <div className="forecast-day-icon">{weatherIcon}</div>
              </div>

              <div className="forecast-day-temps">
                <div className="temp-range">
                  <span className="temp-max">{maxTemp}°</span>
                  <span className="temp-separator">/</span>
                  <span className="temp-min">{minTemp}°</span>
                </div>
              </div>

              <div className="forecast-day-details">
                <div className="temp-bar">
                  <div
                    className="temp-fill"
                    style={{
                      left: `${((minTemp + 20) / 60) * 100}%`,
                      width: `${((maxTemp - minTemp) / 60) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

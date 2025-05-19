import React, { useEffect, useState } from "react";
import { fetchWeatherWithCache } from "../utils/weatherCache";

async function get5DayForecast(lat, lon) {
  return fetchWeatherWithCache(
    `forecast_${lat}_${lon}`,
    async () => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const data = await res.json();
      return data.daily;
    }
  );
}

export default function FiveDayForecast({ lat, lon }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      get5DayForecast(lat, lon).then(setForecast);
    }
  }, [lat, lon]);

  if (!forecast) return <div>Loading 5-day forecast...</div>;

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.time.slice(0, 5).map((date, idx) => (
          <div className="forecast-day" key={date}>
            <div>{date}</div>
            <div>
              <span>
                🌡️ {forecast.temperature_2m_min[idx]}°C - {forecast.temperature_2m_max[idx]}°C
              </span>
            </div>
            <div>Code: {forecast.weathercode[idx]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
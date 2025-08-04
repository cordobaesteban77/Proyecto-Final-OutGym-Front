import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaCompressAlt,
  FaMapMarkerAlt,
  FaCloud,
} from "react-icons/fa";
import "./OpenWeatherMap.css";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Tucumán");

  const API_KEY = "84dfc375728c24bc0b456194c1ceb497";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=es`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);

        if (response.data && response.data.weather) {
          setWeatherData(response.data);
          setError(null);
        } else {
          throw new Error("Datos del clima no disponibles");
        }
      } catch (err) {
        setError(`Error: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  if (loading)
    return (
      <div className="weather-widget">
        <div className="weather-loading">Cargando datos del clima...</div>
      </div>
    );

  if (error)
    return (
      <div className="weather-widget">
        <div className="weather-error">
          {error}
          <p>Por favor verifica tu API key e intenta nuevamente</p>
        </div>
      </div>
    );

  return (
    <div className="weather-widget-container">
      {/* Título agregado aquí */}
      <h1 className="weather-main-title">¿Que clima que te acompañará hoy?</h1>

      <div className="weather-widget">
        {weatherData && (
          <div className="weather-container">
            <div className="weather-location-selector">
              <select
                value={location}
                onChange={handleLocationChange}
                className="weather-location-select"
              >
                <option value="Tucumán">Tucumán</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Rosario">Rosario</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Bariloche">Bariloche</option>
              </select>
            </div>

            <div className="weather-main-display">
              <img
                src={getWeatherIcon(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
                className="weather-icon"
              />
              <span className="weather-temp">
                {Math.round(weatherData.main.temp)}°C
              </span>
            </div>

            <div className="weather-city-info">
              <FaMapMarkerAlt className="weather-icon-sm" />
              <span>{weatherData.name}</span>
            </div>

            <div className="weather-description">
              <FaCloud className="weather-icon-sm" />
              <span>{weatherData.weather[0].description}</span>
            </div>

            <div className="weather-details">
              <div className="weather-detail-item">
                <FaTemperatureHigh className="weather-icon-sm" />
                <span>{Math.round(weatherData.main.feels_like)}°C</span>
              </div>

              <div className="weather-detail-item">
                <FaTint className="weather-icon-sm" />
                <span>{weatherData.main.humidity}%</span>
              </div>

              <div className="weather-detail-item">
                <FaWind className="weather-icon-sm" />
                <span>{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
              </div>

              <div className="weather-detail-item">
                <FaCompressAlt className="weather-icon-sm" />
                <span>{weatherData.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;

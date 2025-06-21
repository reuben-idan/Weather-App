import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="search-container">
      <form
        className={`search-form ${isFocused ? "focused" : ""}`}
        onSubmit={handleSubmit}
      >
        <div className="search-input-wrapper">
          <div className="search-icon">🔍</div>
          <input
            className="search-input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for a city..."
            required
            autoFocus
          />
        </div>
        <button className="search-button" type="submit">
          <span className="button-text">Search</span>
          <span className="button-icon">🌤️</span>
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;

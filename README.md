# Weather App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Open-Meteo API](https://img.shields.io/badge/API-Open--Meteo-blue)](https://open-meteo.com/)
[![React](https://img.shields.io/badge/Framework-React-61dafb?logo=react)](https://react.dev/)

A sleek and modern weather application built with React.js. This app allows users to search for current weather conditions by city name, using the [Open-Meteo API](https://open-meteo.com/) to provide real-time temperature data, robust error handling, and responsive UI for a seamless experience.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Example Output](#example-output)
- [Error Handling & Logging](#error-handling--logging)
- [API](#api)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

---

## Overview

Weather App provides instant access to current temperature data for any city worldwide. It features a clean, responsive UI and is built with maintainable, modular code for easy extension.

---

## Features

- **City Weather Search:** Instantly search for current weather by entering any city name.
- **Real-Time Data:** Displays live temperature data powered by the Open-Meteo API.
- **Responsive UI:** Modern, mobile-friendly design with smooth feedback and subtle animations.
- **Reliable Error Handling:** Handles invalid input, missing cities, API failures, and more.
- **Logging:** All API responses (including errors) are logged for traceability and debugging.
- **Input Validation:** Prevents empty or invalid city submissions.
- **Open Source:** Easily extensible for new features and improvements.

---

## Project Structure

```
weather-app/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/         # React UI components
│   │   ├── WeatherDisplay.jsx
│   │   └── SearchBar.jsx
│   ├── api/                # API utilities
│   ├── weather.js          # Fetches weather data
│   ├── App.js              # Main application component
│   ├── index.js            # App entry point
│   └── styles/             # CSS styles
│       └── App.css
├── package.json            # NPM configuration
├── README.md               # Project documentation
└── ...
```

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/reuben-idan/Weather-App.git
   cd Weather-App/weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm run dev or npm start
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## Usage Guide

- Enter the name of any city in the search bar.
- Click the "Get Weather" button.
- The app displays the current temperature for the specified location.
- Errors (invalid city, network issues) are shown to the user.

---

## Example Output

```
Current Temperature: 21°C
```
*If the city is not found:*
```
Error: City not found.
```

---

## Error Handling & Logging

- **City Not Found:** Displays a clear error if the city cannot be located.
- **Invalid Input:** Prompts user to enter a valid city name.
- **API Failures:** Handles API downtime, unexpected responses, and timeouts gracefully.
- **Logging:** All API responses (including errors) are logged using `console.error` and can be further extended for persistent logging or monitoring.

---

## API

This app uses the [Open-Meteo API](https://open-meteo.com/) to fetch weather data. Please review the [API documentation](https://open-meteo.com/en/docs) for usage limits and terms.

---

## Future Improvements

- Display additional weather metrics (humidity, wind, etc.).
- Integrate map-based city selection.
- Multi-language support.
- Email/share weather reports.
- Add persistent logging for audit trails.
- Push notifications for weather changes.
- More comprehensive unit and integration tests.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

## Acknowledgements

- [Open-Meteo API](https://open-meteo.com/) for providing free weather data.
- Built with [React.js](https://react.dev/).

---

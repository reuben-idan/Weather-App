# Weather App

A sleek and modern weather application built with React.js, allowing users to search for current weather conditions by city name. The app leverages the [Open-Meteo API](https://open-meteo.com/) to provide real-time temperature data with robust error handling and logs responses for better traceability.

---

## Table of Contents

- [Project Overview](#project-overview)
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
- [Acknowledgments](#acknowledgments)

---

## Project Overview

Weather App provides instant access to current temperature data for any city worldwide. It features a clean, responsive UI and is built with maintainable, modular code for ease of contribution and extension.

---

## Features

- 🌍 **City Weather Search:** Instantly search for current weather by entering any city name.
- ☀️ **Real-Time Data:** Displays live temperature data (in °C) powered by the Open-Meteo API.
- ⚡ **Responsive UI:** Modern, mobile-friendly design with smooth feedback and subtle animations.
- 🛰️ **Reliable Error Handling:** Handles invalid input, missing cities, API failures, and more.
- 📝 **Response Logging:** All API responses (including errors) are logged for traceability (see [Error Handling & Logging](#error-handling--logging)).
- 🔒 **Input Validation:** Prevents empty or invalid city submissions.
- 🛠️ **Open Source:** Easily extensible for new features and improvements.

---

## Project Structure

```
weather-app
├── public
│   └── index.html            # Main HTML file
├── src
│   ├── components            # React UI components
│   │   ├── WeatherDisplay.jsx    # Displays weather data
│   │   └── SearchBar.jsx         # Input for city search
│   ├── api                   # API utilities
│   │   └── weather.js        # Fetches weather data
│   ├── App.jsx               # Main application component
│   ├── index.js              # App entry point
│   └── styles                # CSS styles
│       └── App.css           # Application styling
├── package.json              # NPM configuration
└── README.md                 # Project documentation
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
   npm start
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## Usage Guide

- Enter the name of any city in the search bar.
- Click the "Get Weather" button.
- The app will display the current temperature for the specified location.
- Errors, such as invalid cities or network issues, are displayed to the user.

---

## Example Output

**Success:**
```
London
--------------------
Current Temperature: 21°C
```

**Error (Invalid City):**
```
Xyzabcnotacity
--------------------
Error: City not found.
```

---

## Error Handling & Logging

This application is designed with robust error handling:
- **City Not Found:** Displays a clear error if the city cannot be located.
- **Empty or Invalid Input:** Prompts the user to enter a valid city name.
- **API Failures:** Handles API downtime, unexpected responses, and timeouts gracefully.
- **Special Characters & Edge Cases:** Handles cities with special characters and extremely long names.

All API responses—including errors—are logged using `console.error` and can be further extended to log into persistent files or backend logs for auditing and debugging. (In a production backend, you would write logs to a file or use a monitoring service.)

---

## API

This application uses the [Open-Meteo API](https://open-meteo.com/) to fetch weather data. Please review the [API documentation](https://open-meteo.com/en/docs) for usage limits and terms.

---

## Future Improvements

- 🌦️ Display additional weather metrics (humidity, wind, etc.).
- 🗺️ Integrate map-based city selection.
- 📈 Show weather trends and forecasts.
- 🌐 Multi-language support.
- ✉️ Email/share weather reports.
- 🪝 Add persistent logging to file or cloud for audit trails.
- 🔔 Push notifications for weather changes.
- 🧪 More comprehensive unit and integration tests.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

## Acknowledgments

- [Open-Meteo API](https://open-meteo.com/) for providing free weather data.
- Built with [React.js](https://reactjs.org/).

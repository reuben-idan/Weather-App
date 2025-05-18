# Weather App

A simple and elegant weather application built with React.js, allowing users to search for current weather conditions by city name. The app leverages the [Open-Meteo API](https://open-meteo.com/) to provide real-time temperature data in a clean, user-friendly interface.

---

## Features

- 🌍 Search for current weather by city name
- ☀️ Displays real-time temperature data (°C)
- ⚡ Responsive, modern UI with instant feedback
- 🛰️ Powered by the Open-Meteo public weather API

## Project Structure

```
weather-app
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # React UI components
│   │   ├── WeatherDisplay.jsx  # Displays weather data
│   │   └── SearchBar.jsx       # Input for city search
│   ├── api                 # API utilities
│   │   └── weather.js      # Fetches weather data
│   ├── App.jsx             # Main application component
│   ├── index.js            # App entry point
│   └── styles              # CSS styles
│       └── App.css         # Application styling
├── package.json            # NPM configuration
└── README.md               # Project documentation
```

## Setup Instructions

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

## Usage

- Enter the name of any city in the search bar.
- The app will display the current temperature for the specified location.

## API

This application uses the [Open-Meteo API](https://open-meteo.com/) to fetch weather data. Please review the [API documentation](https://open-meteo.com/en/docs) for usage limits and terms.

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

## Acknowledgments

- [Open-Meteo API](https://open-meteo.com/) for providing free weather data.
- Built with [React.js](https://reactjs.org/).

# Weather App

This is a simple weather application built with React.js that allows users to search for weather information by city name. The app fetches data from the Open-Meteo API and displays it in a user-friendly format.

## Project Structure

```
weather-app
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # Contains React components
│   │   ├── WeatherDisplay.jsx  # Displays weather data
│   │   └── SearchBar.jsx      # Input for city search
│   ├── api                 # API functions
│   │   └── weather.js      # Fetches weather data
│   ├── App.jsx             # Main application component
│   ├── index.js            # Entry point of the application
│   └── styles              # CSS styles
│       └── App.css         # Styles for the application
├── package.json            # NPM configuration file
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

- Enter a city name in the search bar and click the search button.
- The weather information for the specified city will be displayed below the search bar.

## API

This application uses the Open-Meteo API to fetch weather data. Ensure you have access to the API and follow any usage guidelines provided by the API documentation.

## License

This project is open-source and available under the [MIT License](LICENSE).
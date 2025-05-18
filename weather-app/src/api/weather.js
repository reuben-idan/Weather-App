export const fetchWeather = async (city) => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true&city=${city}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.current_weather;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
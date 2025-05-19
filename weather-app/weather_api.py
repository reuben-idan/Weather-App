from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_coordinates(city):
    # In a real app, you'd call a geocoding API here.
    # For demo, accept any non-empty city and return mock coordinates.
    city = city.strip()
    if not city:
        raise ValueError("Empty input.")
    # Mock: generate coordinates based on city hash for demo purposes
    lat = 40.0 + (hash(city.lower()) % 1000) / 1000.0  # 40.000 to 40.999
    lon = -74.0 + (hash(city[::-1].lower()) % 1000) / 1000.0  # -74.000 to -73.001
    return {"latitude": lat, "longitude": lon}

def get_weather(lat, lon):
    # In a real app, you'd call a weather API here.
    # For demo, return mock weather data based on coordinates.
    return {
        "temperature": round(15 + (lat % 10) + (lon % 5), 1),
        "humidity": 50 + int(lat * lon) % 50,
        "wind_speed": round(5 + (lon % 7), 1),
        "precipitation": round((lat + lon) % 3, 1)
    }

@app.route("/weather", methods=["POST"])
def weather():
    data = request.get_json()
    city = data.get("city") if data else None
    if not city or not str(city).strip():
        return jsonify({"error": "City name is required."}), 400
    try:
        coords = get_coordinates(city)
        weather_data = get_weather(coords["latitude"], coords["longitude"])
        return jsonify(weather_data), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
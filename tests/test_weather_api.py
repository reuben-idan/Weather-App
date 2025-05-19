import pytest
from unittest.mock import patch
from flask import Flask, jsonify, request

# --- Module-level functions for patching ---
def get_coordinates(city):
    # Placeholder for actual geocoding logic
    if city == "London":
        return {"latitude": 51.5074, "longitude": -0.1278}
    elif city == "Xyzabcnotacity":
        raise ValueError("City not found.")
    elif city == "":
        raise ValueError("Empty input.")
    else:
        raise Exception("API failure")

def get_weather(lat, lon):
    # Placeholder for actual weather fetching logic
    if lat == 51.5074 and lon == -0.1278:
        return 20
    else:
        raise Exception("Weather API failure")

@pytest.fixture
def client():
    app = Flask(__name__)

    @app.route("/weather", methods=["POST"])
    def weather():
        data = request.get_json()
        city = data.get("city") if data else None
        if not city or not str(city).strip():
            return jsonify({"error": "City name is required."}), 400
        try:
            coords = get_coordinates(city)
            temp = get_weather(coords["latitude"], coords["longitude"])
            return jsonify({"temperature": temp}), 200
        except ValueError as ve:
            return jsonify({"error": str(ve)}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

# --- Parameterized tests for various city/user inputs ---
@pytest.mark.parametrize("city,expected_status,expected_key", [
    ("London", 200, "temperature"),           # Valid city
    ("New York", 500, "error"),               # Not in mock, triggers API failure
    ("München", 500, "error"),                # Special character, triggers API failure
    ("", 400, "error"),                       # Empty input
    ("Xyzabcnotacity", 404, "error"),         # Non-existent city
    ("paris", 500, "error"),                  # Lowercase, not in mock, triggers API failure
    ("   ", 400, "error"),                    # Whitespace only
    ("12345", 500, "error"),                  # Numeric input
    ("@!$%^", 500, "error"),                  # Special characters
    ("A"*300, 500, "error"),                  # Very long city name
])
def test_various_cities_and_inputs(client, city, expected_status, expected_key):
    response = client.post("/weather", json={"city": city})
    assert response.status_code == expected_status
    data = response.get_json()
    assert expected_key in data

def test_null_city_name(client):
    response = client.post("/weather", json={"city": None})
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert "required" in data["error"].lower()

def test_non_json_input(client):
    response = client.post("/weather", data="city=London", content_type="text/plain")
    assert response.status_code == 400 or response.status_code == 415

# --- Simulate different weather for different times ---
def test_weather_at_different_times(client):
    # Simulate morning temperature
    with patch("tests.test_weather_api.get_weather", return_value=15):
        response = client.post("/weather", json={"city": "London"})
        assert response.status_code == 200
        assert response.get_json()["temperature"] == 15

    # Simulate afternoon temperature
    with patch("tests.test_weather_api.get_weather", return_value=25):
        response = client.post("/weather", json={"city": "London"})
        assert response.status_code == 200
        assert response.get_json()["temperature"] == 25

# --- Simulate API rate limit exceeded ---
def test_rate_limit_exceeded(client):
    with patch("tests.test_weather_api.get_coordinates", side_effect=Exception("429 Too Many Requests: Rate limit exceeded")):
        response = client.post("/weather", json={"city": "London"})
        assert response.status_code == 500
        data = response.get_json()
        assert "error" in data
        assert "rate limit" in data["error"].lower()

# --- Simulate API timeout ---
def test_api_timeout(client):
    with patch("tests.test_weather_api.get_coordinates", side_effect=TimeoutError("Request timed out")):
        response = client.post("/weather", json={"city": "London"})
        assert response.status_code == 500
        data = response.get_json()
        assert "error" in data
        assert "timed out" in data["error"].lower()

# --- Simulate unexpected API response format ---
def test_unexpected_api_response_format(client):
    with patch("tests.test_weather_api.get_coordinates", return_value={"lat": 0}):  # Missing 'latitude' and 'longitude'
        response = client.post("/weather", json={"city": "London"})
        assert response.status_code == 500
        data = response.get_json()
        assert "error" in data
        assert "latitude" in data["error"].lower() or "longitude" in data["error"].lower()

# --- Case sensitivity test ---
def test_case_sensitivity(client):
    response = client.post("/weather", json={"city": "London"})
    assert response.status_code == 200
    response = client.post("/weather", json={"city": "london"})
    assert response.status_code == 500
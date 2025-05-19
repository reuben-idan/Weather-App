import pytest
from unittest.mock import patch
from flask import Flask, jsonify, request

# Move these to module scope so they can be patched
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

def test_valid_city_returns_weather(client):
    response = client.post("/weather", json={"city": "London"})
    assert response.status_code == 200
    data = response.get_json()
    assert "temperature" in data
    assert data["temperature"] == 20

def test_non_existent_city_returns_error(client):
    response = client.post("/weather", json={"city": "Xyzabcnotacity"})
    assert response.status_code == 404
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "City not found."

def test_empty_input_returns_error(client):
    response = client.post("/weather", json={"city": ""})
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "City name is required."

def test_api_failure_returns_error(client):
    response = client.post("/weather", json={"city": "ServerDownCity"})
    assert response.status_code == 500
    data = response.get_json()
    assert "error" in data
    assert "API failure" in data["error"]

def test_rate_limit_exceeded(client):
    with patch(__name__ + '.get_coordinates', side_effect=Exception("429 Too Many Requests: Rate limit exceeded")):
        response = client.post("/weather", json={"city": "London"})
        assert response.status_code == 500
        data = response.get_json()
        assert "error" in data
        assert "rate limit" in data["error"].lower()

def test_api_timeout(client):
    with patch(__name__ + '.get_coordinates', side_effect=TimeoutError("Request timed out")):
        response = client.post("/weather", json={"city": "London"})
        assert response.status_code == 500
        data = response.get_json()
        assert "error" in data
        assert "timed out" in data["error"].lower()

def test_unexpected_api_response_format(client):
    with patch(__name__ + '.get_coordinates', return_value={"lat": 0}):  # Missing 'latitude' and 'longitude'
        response = client.post("/weather", json={"city": "London"})
        assert response.status_code == 500
        data = response.get_json()
        assert "error" in data
        assert "latitude" in data["error"].lower() or "longitude" in data["error"].lower()

def test_non_json_input(client):
    response = client.post("/weather", data="city=London", content_type="text/plain")
    assert response.status_code == 400 or response.status_code == 415

def test_city_with_special_characters(client):
    response = client.post("/weather", json={"city": "München"})
    # Depending on your implementation, this may succeed or fail
    # Here, we expect an API failure as per the placeholder logic
    assert response.status_code == 500
    data = response.get_json()
    assert "error" in data

def test_extremely_long_city_name(client):
    long_city = "A" * 1000
    response = client.post("/weather", json={"city": long_city})
    assert response.status_code == 500
    data = response.get_json()
    assert "error" in data

def test_null_city_name(client):
    response = client.post("/weather", json={"city": None})
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert "required" in data["error"].lower()
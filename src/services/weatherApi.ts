import type { Weather, ForecastDay } from "../types/weather";

export function getWeatherCondition(code: number): string {
  switch (code) {
    case 0:
      return "Clear sky";

    case 1:
      return "Mainly clear";

    case 2:
      return "Partly cloudy";

    case 3:
      return "Overcast";

    case 45:
      return "Fog";

    case 48:
      return "Depositing rime fog";

    case 51:
      return "Light drizzle";

    case 53:
      return "Moderate drizzle";

    case 55:
      return "Dense drizzle";

    case 61:
      return "Slight rain";

    case 63:
      return "Moderate rain";

    case 65:
      return "Heavy rain";

    case 71:
      return "Slight snow";

    case 73:
      return "Moderate snow";

    case 75:
      return "Heavy snow";

    case 80:
      return "Slight rain showers";

    case 81:
      return "Moderate rain showers";

    case 82:
      return "Violent rain showers";

    case 95:
      return "Thunderstorm";

    default:
      return "Unknown";
  }
}

export function getWeatherIcon(code: number): string {
  switch (code) {
    case 0:
      return "☀️";

    case 1:
      return "🌤️";

    case 2:
      return "⛅";

    case 3:
      return "☁️";

    case 45:
    case 48:
      return "🌫️";

    case 51:
    case 53:
    case 55:
      return "🌦️";

    case 61:
    case 63:
    case 65:
      return "🌧️";

    case 71:
    case 73:
    case 75:
      return "❄️";

    case 80:
    case 81:
    case 82:
      return "🌧️";

    case 95:
      return "⛈️";

    default:
      return "🌡️";
  }
}

export async function getWeather(city: string): Promise<Weather> {
  try {
    const geoUrl =
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error("Failed to search for city");
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found");
    }

    const location = geoData.results[0];

    const cityUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`;

    const weatherResponse = await fetch(cityUrl);

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await weatherResponse.json();

    const forecast: ForecastDay[] = weatherData.daily.time.map(
      (date: string, index: number) => ({
        date,
        weatherCode: weatherData.daily.weather_code[index],
        maxTemperature: weatherData.daily.temperature_2m_max[index],
        minTemperature: weatherData.daily.temperature_2m_min[index],
      })
    );

    const weather: Weather = {
      city: location.name,
      country: location.country,
      temperature: weatherData.current.temperature_2m,
      feelsLike: weatherData.current.apparent_temperature,
      condition: getWeatherCondition(weatherData.current.weather_code),
      icon: getWeatherIcon(weatherData.current.weather_code),
      humidity: weatherData.current.relative_humidity_2m,
      windSpeed: weatherData.current.wind_speed_10m,
      forecast,
    };

    return weather;
  } catch (error) {
    console.error("Weather API error:", error);

    throw error;
  }
}

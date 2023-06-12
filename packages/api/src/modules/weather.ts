interface CurrentWeather {
  last_updated: string;
  last_updated_epoch: number;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  "condition:text": string;
  "condition:icon": string;
  "condition:code": number;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  is_day: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

const WEATHER_API_URL = "http://api.weatherapi.com/v1";

export async function fetchCurrentWeather(location: number | { lat: number; lon: number }) {
  try {
    const predictions: CurrentWeather = await (
      await fetch(`${WEATHER_API_URL}/current`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: process.env.WEATHER_API_KEY,
          q: typeof location === "number" ? location : `${location.lat},${location.lon}`,
        }),
      })
    ).json();

    return predictions;
  } catch (error) {
    console.error("Error detecting objects in image", error);
  }
}

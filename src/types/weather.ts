export interface ForecastDay {
  date: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
}
export interface Weather {
    city: string;
    country: string;
    temperature: number;
    feelsLike: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    forecast: ForecastDay[];
}

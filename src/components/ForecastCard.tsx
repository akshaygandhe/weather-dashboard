import type { ForecastDay } from "../types/weather";
import {
    getWeatherCondition,
    getWeatherIcon,
} from "../services/weatherApi";

interface ForecastCardProps {
    item: ForecastDay;
}

function formatDate(date: string): string {
  const forecastDate = new Date(date);
  const today = new Date();

  const isToday =
    forecastDate.toDateString() === today.toDateString();

  if (isToday) {
    return "Today";
  }

  return forecastDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function ForecastCard({ item }: ForecastCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-medium text-slate-500">
                {formatDate(item.date)}
            </p>

            <div className="my-4 text-4xl">
                {getWeatherIcon(item.weatherCode)}
            </div>

            <p className="text-sm font-medium text-slate-700">
                {getWeatherCondition(item.weatherCode)}
            </p>

            <div className="mt-3">
                <span className="font-semibold text-slate-900">
                    {item.maxTemperature.toFixed(1)}°C
                </span>

                <span className="ml-2 text-sm text-slate-400">
                    {item.minTemperature.toFixed(1)}°C
                </span>
            </div>
        </div>
    )
}

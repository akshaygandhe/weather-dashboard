import type { ForecastDay } from "../types/weather";
import { ForecastCard } from "./ForecastCard";
interface ForecastProps {
    forecast: ForecastDay[];
}
export function Forecast({ forecast }: ForecastProps) {
    return (
         <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          5-Day Forecast
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Weather outlook for the upcoming days.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {forecast.map((item) => (
          <ForecastCard
            key={item.date}
            item={item}
          />
        ))}
      </div>
    </section>
    )
}
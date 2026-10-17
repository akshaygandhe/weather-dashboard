import type { Weather } from "../types/weather"

interface CurrentWeatherProps {
  weather: Weather;
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Location */}
          <div>
            <p className="text-sm font-medium text-slate-500">
              Current Weather
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              {weather.city}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {weather.country}
            </p>
          </div>

          {/* Temperature */}
          <div className="flex items-center gap-5 sm:text-right">
            <div className="text-6xl">
              {weather.icon}
            </div>

            <div>
              <p className="text-5xl font-bold tracking-tight text-slate-900">
                {weather.temperature.toFixed(1)}°C
              </p>

              <p className="mt-2 text-sm font-medium text-slate-500">
                {weather.condition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 divide-y divide-slate-100 border-t border-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="p-5">
          <p className="text-sm text-slate-500">Feels Like</p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {weather.feelsLike.toFixed(1)}°C
          </p>
        </div>

        <div className="p-5">
          <p className="text-sm text-slate-500">Humidity</p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {weather.humidity}%
          </p>
        </div>

        <div className="p-5">
          <p className="text-sm text-slate-500">Wind Speed</p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {weather.windSpeed} km/h
          </p>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react';
import { getWeather } from "./services/weatherApi";
import { Forecast } from './components/Forecast';
import { CurrentWeather } from './components/CurrentWeather';
import type { Weather } from './types/weather';
import './App.css'

function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");

    if (!savedCity) {
      return;
    }

    setCity(savedCity);

    async function loadSavedWeather(cityName: string) {
      setError(null);
      setLoading(true);

      try {
        const result = await getWeather(cityName);

        setWeather(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadSavedWeather(savedCity);
  }, []);

async function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
  e.preventDefault();

  const searchCity = city.trim();

  if (!searchCity) {
    setWeather(null);
    setError("Please enter a city name");
    return;
  }

  setError(null);
  setWeather(null);
  setLoading(true);

  try {
    const result = await getWeather(searchCity);

    setWeather(result);
    localStorage.setItem("lastCity", searchCity);
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    }
  } finally {
    setLoading(false);
  }
}


  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              Weather Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Check the Weather
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
              Search for any city to see its current weather conditions.
            </p>
          </header>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label
                  htmlFor="searchcity"
                  className="sr-only"
                >
                  Search city
                </label>

                <input
                  type="text"
                  value={city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCity(e.target.value)
                  }
                  name="searchcity"
                  id="searchcity"
                  placeholder="Enter city name..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading || city.trim() === ""}
                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {/* Loading */}
          {loading && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

              <p className="mt-4 text-sm font-medium text-slate-600">
                Fetching weather...
              </p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-5">
              <h2 className="font-semibold text-red-800">
                Something went wrong
              </h2>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Weather */}
          {weather && !loading && !error && (
            <>
              {weather && <CurrentWeather weather={weather} />}

              <Forecast forecast={weather.forecast} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default App

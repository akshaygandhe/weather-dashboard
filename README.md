# Weather Dashboard 🌦️

A responsive weather dashboard built with React, TypeScript, Vite, and Tailwind CSS. The application allows users to search for cities, view weather information and forecasts, and restore their last-searched city using browser local storage.

## Features

### 🌍 City Search
- Search for cities by name.
- Retrieve matching locations using the Open-Meteo Geocoding API.
- Use the selected location's coordinates to retrieve weather data.

### 🌤️ Weather Information
- Display weather information for the selected city.
- View forecast information for upcoming days.
- Present weather information in a clean, responsive dashboard.

### ⚙️ User Experience
- Handle loading, error, and empty-result states.
- Restore the last-searched city using `localStorage`.
- Provide responsive layouts for desktop, tablet, and mobile screens.
- Use reusable React components and TypeScript types.

## Tech Stack

- **React** — Component-based UI development
- **TypeScript** — Type safety and maintainable code
- **Vite** — Development server and production build tooling
- **Tailwind CSS** — Responsive styling
- **Open-Meteo Weather Forecast API** — Weather and forecast data
- **Open-Meteo Geocoding API** — City and location search
- **Fetch API** — Asynchronous HTTP requests
- **React Hooks** — Component state and side-effect management
- **localStorage** — Persistence of the last-searched city

## APIs Used

This project uses Open-Meteo's public APIs.

- **Weather Forecast API:** https://open-meteo.com/en/docs
- **Geocoding API:** https://open-meteo.com/en/docs/geocoding-api
- **Open-Meteo website:** https://open-meteo.com/

The APIs supply location and weather information used by the dashboard. Refer to the official documentation for current API parameters and usage terms.

## Project Structure

The following is a representative structure. Adjust it to match the files and folders in your repository.

```text
weather-dashboard/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## What I Learned

- Integrating external REST APIs into a React application.
- Managing asynchronous requests and loading and error states.
- Using TypeScript interfaces to describe API data.
- Managing controlled search inputs and user interactions.
- Creating reusable, responsive components with Tailwind CSS.
- Persisting selected information using `localStorage`.
- Organizing a React project into components, services, and types.

## Future Improvements

- Add weather-based search suggestions.
- Improve forecast visualizations.
- Add temperature-unit switching between Celsius and Fahrenheit.
- Add saved cities and weather comparison.
- Expand automated testing and accessibility checks.

## License and Data Attribution

Weather information is provided by [Open-Meteo](https://open-meteo.com/). Review its current usage terms and attribution requirements before using this project commercially.

This is a learning and portfolio project, not an official Open-Meteo product.
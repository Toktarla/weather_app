# Weather App

This Weather App provides current weather, 3-hour forecast, 5-day extended forecast, and 14-day extended forecast information for cities around the world. It utilizes the OpenWeatherMap API and WeatherAPI for weather data and the City Info API for city-related information.


### Prerequisites

Before you begin, ensure you have the following installed: 
- Node.js 
-  npm (Node Package Manager)


### Installation
**Clone the repository:** 
```git clone https://github.com/your-username/weather-app.git```

```cd weather-app```

```npm install express node-fetch cors```

### Usage
To run the Weather App, use the following command:
`npm start`
`npx nodemon`
This will start the server, and you can access the app at [http://localhost:3000](http://localhost:3000/) in your web browser.

## APIs Used

1.  **OpenWeatherMap API**
    
    -   Endpoint: `http://api.openweathermap.org/data/2.5/forecast`
    -   Documentation: OpenWeatherMap API Docs
2.  **WeatherAPI**
    
    -   Endpoint: `http://api.weatherapi.com/v1/forecast.json`
    -   Documentation: WeatherAPI Docs
3.  **City Info API**
    
    -   Endpoint: `https://api.api-ninjas.com/v1/city`
    -   Documentation: City Info API Docs
    
4.  **Openstreetmap API**
    

## Design Decisions

### Default City

The app defaults to displaying weather information for London on the first visit. Users can then input their preferred city.




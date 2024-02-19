# Weather App

This Weather App provides current weather, 3-hour forecast, 5-day extended forecast, and 14-day extended forecast information for cities around the world. It utilizes the OpenWeatherMap API and WeatherAPI for weather data and the City Info API for city-related information.

Website URL : https://weathermonitoring-b2b570655d14.herokuapp.com (turned off)

## Prerequisites

Before you begin, ensure you have the following installed: 
- Node.js 
- npm (Node Package Manager)

### Installation
**Clone the repository:** 
```git clone https://github.com/your-username/weather-app.git```

```cd weather-app```

Install dependencies below like:
```npm install express axios``` etc or add dependencies below into package.json like below:

"dependencies": {
    "axios": "^1.6.7",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-session": "^1.18.0",
    "mongodb": "^6.3.0",
    "mongoose": "^8.1.1",
    "node-fetch": "^2.6.1",
    "pdfkit": "^0.14.0"
  }

And write in the  cmd ```npm install```


## Dependencies

- "axios": "^1.6.7"
- "bcrypt": "^5.1.1"
- "cors": "^2.8.5"
- "ejs": "^3.1.9"
- "express": "^4.18.2"
- "express-session": "^1.18.0"
- "mongodb": "^6.3.0"
- "mongoose": "^8.1.1"
- "node-fetch": "^2.6.1"
- "pdfkit": "^0.14.0"

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

### Authentication
- Implemented user authentication with sign up and login functionality.
- Admin user credentials: Username: `toktar`, Password: `toktar123`.
- Passwords are hashed for security purposes.
- Admin privileges include editing user passwords, login emails, and deleting accounts.

### Database
- Utilized MongoDB database, hosted on MongoDB Atlas.
- Integrated MongoDB Atlas cluster string into the application.

### Multilanguage Support
- Supported both Russian and English languages for user interface localization.

### History Page
- Implemented a history page for each user, allowing them to view past city inputs.
- Each user's history is stored and retrieved based on their unique user ID.
- Users can download a PDF report of their history.

### Charts
- Incorporated charts and graphs to visualize differences in weather parameters such as wind, humidity, etc.


### Additional Libraries
- Utilized EJS for templating.
- Implemented Bootstrap 5 for UI enhancement.
- Fav Icon

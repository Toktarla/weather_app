function setDefaultWeather() {
    const defaultCity = 'London';

    document.getElementById('cityInput').value = defaultCity;

    getWeather();
}

async function getWeather() {
    getCurrentWeather()
    getExtendedForecast()
    const city = document.getElementById('cityInput').value;
    const cityName = cityInput.value.trim();

    const forecastResponse = await fetch(`/forecast?city=${city}`);

    const weatherResult = document.getElementById('weatherResult');
    const forecastList = document.getElementById('forecastList');

        const buttonTriggered = weatherResult.innerHTML.trim() !== "";

        if (!buttonTriggered) {
            const defaultCity = 'London';
    
            document.getElementById('cityInput').value = defaultCity;
    
            getCity();
        }
    

    if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        const cityCoordinates = {
            lat: forecastData.city.coord.lat,
            lon: forecastData.city.coord.lon
        };
        map.setView([cityCoordinates.lat, cityCoordinates.lon], 8);

        L.marker([cityCoordinates.lat, cityCoordinates.lon]).addTo(map)
            .bindPopup(cityName);

        weatherResult.innerHTML = "";
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const last3HoursForecast = forecastData.list.filter(day => day.dt >= currentTimestamp - 3 * 60 * 60 && day.dt <= currentTimestamp);

        last3HoursForecast.forEach(timeSlot => {
            const { dt, main, weather, wind } = timeSlot;
            const date = new Date(dt * 1000);
            const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()} ${date.toLocaleTimeString()}`;
            const temperature = main.temp;
            const description = weather[0].description;
            const windSpeed = wind.speed;
            const feelsLike = main.feels_like;
            const humidity = main.humidity;
            const pressure = main.pressure;
            const countryCode = forecastData.city.country;

            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');

            card.innerHTML = `
                <div class="card h-100 w-300"> 
                    <div class="card-body">
                        <h5 class="card-title">${formattedDate}</h5>
                        <p class="card-text">Temperature: ${temperature} °C</p>
                        <p class="card-text">Feels Like: ${feelsLike} °C</p>
                        <p class="card-text">Weather: ${description}</p>
                        <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
                        <p class="card-text">Humidity: ${humidity}%</p>
                        <p class="card-text">Pressure: ${pressure} hPa</p>
                        <p class="card-text">Country Code: ${countryCode}</p>
                        <p class="card-text">Coordinates: Lat ${forecastData.city.coord.lat}, Lon ${forecastData.city.coord.lon}</p>
                    </div>
                </div>
            `;

            weatherResult.appendChild(card);
        });


        forecastList.innerHTML = "";
        const seenDates = {};

        forecastData.list.forEach(day => {
            const date = new Date(day.dt * 1000);
            const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;

            if (!seenDates[formattedDate]) {
                seenDates[formattedDate] = true; 
                const maxTemp = day.main.temp_max;
                const minTemp = day.main.temp_min;
                const description = day.weather[0].description;
                const windS = day.wind.speed;
                const icon = day.weather[0].icon;
                const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                const sunrise = new Date(forecastData.city.sunrise * 1000);
                const sunset = new Date(forecastData.city.sunset * 1000);

                forecastList.innerHTML += `
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-md-2">
                                <p>Date: ${formattedDate}</p>
                            </div>
                            <div class="col-md-3">
                                <img src= ${imageUrl} style="width: 40px; height: 40px;">
                                <span>${description}</span>
                            </div>
                            <div class="col-md-3">
                                <p>Min/Max Temp: ${minTemp}°C / ${maxTemp}°C</p>
                            </div>
                            <div class="col-md-2">
                                <p>Wind Speed: ${windS} m/s</p>
                            </div>
                            <div class="col-md-2">
                                <p>Sunrise: ${formatTime(sunrise)}</p>
                                <p>Sunset: ${formatTime(sunset)}</p>
                            </div>
                        </div>
                    </li>`;
            }
            });


    } 
    else {
        weatherResult.innerHTML = `<p>Error: ${forecastData.error}</p>`;
    }
    getCity()
}

function getMonthName(monthIndex) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
}



function formatTime(date) {
    return `${padZeroes(date.getHours())}:${padZeroes(date.getMinutes())}`;
}

function padZeroes(value) {
    return value < 10 ? `0${value}` : value;
}

async function getCurrentWeather() {
    const city = document.getElementById('cityInput').value;
    const currentWeatherResponse = await fetch(`/current?city=${city}`);

    const currentWeatherResult = document.getElementById('currentWeatherContent');

    if (currentWeatherResponse.ok) {
        const currentWeatherData = await currentWeatherResponse.json();

        const { location, current } = currentWeatherData;
        const weatherIconUrl = `https:${current.condition.icon}`;

        currentWeatherResult.innerHTML = `
            <div class="col-md-6">
                <p><strong>Location:</strong> ${location.name}, ${location.region}, ${location.country}</p>
                <p><strong>Temperature:</strong> ${current.temp_c} °C</p>
                <p><strong>Weather:</strong> ${current.condition.text}</p>
            </div>
            <div class="col-md-6 text-center">
                <img src="${weatherIconUrl}" alt="Weather Icon" style="width: 80px; height: 80px;">
            </div>
        `;
    } else {
        currentWeatherResult.innerHTML = `<p class="text-danger">Error: ${currentWeatherResponse.error}</p>`;
    }
}


async function getExtendedForecast() {
    const city = document.getElementById('cityInput').value;
    const forecastResponse = await fetch(`/forecast14days?city=${city}`);

    const extendedForecastList = document.getElementById('extendedForecastList');

    if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        const { forecast } = forecastData;

        extendedForecastList.innerHTML = "";
        forecast.forecastday.forEach(day => {
            const date = new Date(day.date_epoch * 1000);
            const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
            const maxTemp = day.day.maxtemp_c;
            const minTemp = day.day.mintemp_c;
            const description = day.day.condition.text;
            const icon = day.day.condition.icon;
            const imageUrl = `https:${icon}`;

            extendedForecastList.innerHTML += `
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-2">
                            <p>Date: ${formattedDate}</p>
                        </div>
                        <div class="col-md-3">
                            <img src= ${imageUrl} style="width: 40px; height: 40px;">
                            <span>${description}</span>
                        </div>
                        <div class="col-md-3">
                            <p>Min/Max Temp: ${minTemp}°C / ${maxTemp}°C</p>
                        </div>
                    </div>
                </li>`;
        });
    } else {
        extendedForecastList.innerHTML = `<p>Error: ${forecastData.error}</p>`;
    }
}

async function getCity() {
    const city = document.getElementById('cityInput').value;
    
    const cityInfoResponse = await fetch(`/city-info?city=${city}`);
    const cityInfoResult = document.getElementById('cityInfoResult');

    if (cityInfoResponse.ok) {
        const cityInfoData = await cityInfoResponse.json();
        const { name, latitude, longitude, country, population, is_capital } = cityInfoData[0];

        cityInfoResult.innerHTML = `
            <div class="mt-4 card">
                <div class="card-body">
                    <h5 class="card-title">City Information</h5>
                    <hr>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Latitude:</strong> ${latitude}</p>
                    <p><strong>Longitude:</strong> ${longitude}</p>
                    <p><strong>Country:</strong> ${country}</p>
                    <p><strong>Population:</strong> ${population}</p>
                    <p><strong>Is Capital:</strong> ${is_capital ? 'Yes' : 'No'}</p>
                </div>
            </div>
        `;
    } else {
        cityInfoResult.innerHTML = `<p class="text-danger">Error: ${cityInfoData.error}</p>`;
    }

}
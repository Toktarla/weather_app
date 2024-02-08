
const preferredLanguage = localStorage.getItem("preferredLanguage");

async function getWeather() {
    getExtendedForecast();
    getCity();
    getCurrentWeather();

    const city = document.getElementById('cityInput').value;
    const cityName = cityInput.value.trim();
    
    const forecastResponse = await fetch(`/forecast?city=${city}`);

    const weatherResult = document.getElementById('weatherResult');
    const forecastList = document.getElementById('forecastList');

    if (forecastResponse.ok) {
        document.getElementById('weatherLastThreeHoursTitle').classList.remove('hidden');
        document.getElementById('weatherResult').classList.remove('hidden');

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
            const feelsLike = main.feels_like;
            const windSpeed = wind.speed;
            const humidity = main.humidity;
            const pressure = main.pressure;
            const countryCode = forecastData.city.country;
        
            const temperatureLabel = preferredLanguage === "ru" ? "Температура" : "Temperature";
            const feelsLikeLabel = preferredLanguage === "ru" ? "Ощущается как" : "Feels like";
            const windLabel = preferredLanguage === "ru" ? "Ветер" : "Wind";
            const humidityLabel = preferredLanguage === "ru" ? "Влажность" : "Humidity";
            const pressureLabel = preferredLanguage === "ru" ? "Давление" : "Pressure";
            const countryCodeLabel = preferredLanguage === "ru" ? "Код страны" : "Country Code";
            const weatherWord = preferredLanguage === "ru" ? "Погода" : "Weather";
            const coordinates = preferredLanguage === "ru" ? "Координаты" : "Coordinates";
        
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4', 'offset-md-4');
        
            card.innerHTML = `
                <div class="card"> 
                    <div class="card-body">
                        <h5 class="card-title">${formattedDate}</h5>
                        <p class="card-text">${temperatureLabel}: ${temperature} °C</p>
                        <p class="card-text">${feelsLikeLabel}: ${feelsLike} °C</p>
                        <p class="card-text">${weatherWord}: ${weather[0].description}</p>
                        <p class="card-text">${windLabel}: ${windSpeed} m/s</p>
                        <p class="card-text">${humidityLabel}: ${humidity}%</p>
                        <p class="card-text">${pressureLabel}: ${pressure} hPa</p>
                        <p class="card-text">${countryCodeLabel}: ${countryCode}</p>
                        <p class="card-text">${coordinates}: Lat ${forecastData.city.coord.lat}, Lon ${forecastData.city.coord.lon}</p>
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
                const date = preferredLanguage === "ru" ? "Дата" : "Date";
                const sunriseWord = preferredLanguage === "ru" ? "Восход" : "Sunrise";
                const sunsetWord = preferredLanguage === "ru" ? "Закат" : "Sunset";

                forecastList.innerHTML += `
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-md-2">
                                <p>${date}: ${formattedDate}</p>
                            </div>
                            <div class="col-md-3">
                                <img src= ${imageUrl} style="width: 40px; height: 40px;">
                                <span>${description}</span>
                            </div>
                            <div class="col-md-3">
                                <p>${preferredLanguage === "ru" ? "Мин/Макс Температура" : "Min/Max Temp"}: ${minTemp}°C / ${maxTemp}°C</p>
                            </div>
                            <div class="col-md-2">
                                <p>${preferredLanguage === "ru" ? "Скорость ветра" : "Wind Speed"}: ${windS} m/s</p>
                            </div>
                            <div class="col-md-2">
                                <p>${sunriseWord}: ${formatTime(sunrise)}</p>
                                <p>${sunsetWord}: ${formatTime(sunset)}</p>
                            </div>
                        </div>
                    </li>`;
            }
        });

        document.getElementById('extendedForecast').classList.remove('hidden');

    } 
    else {
        weatherResult.innerHTML = `<p>Error: ${forecastData.error}</p>`;
    }
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
    try {
        const response = await axios.get(`/current?city=${city}`);

        const currentWeatherResult = document.getElementById('currentWeatherContent');
        const { location, current } = response.data;

        const weatherIconUrl = `https:${current.condition.icon}`;

        currentWeatherResult.innerHTML = `
            <div class="col-md-6">
                <p><strong>${preferredLanguage === "ru" ? "Местоположение" : "Location"}:</strong> ${location.name}, ${location.region}, ${location.country}</p>
                <p><strong>${preferredLanguage === "ru" ? "Температура" : "Temperature"}:</strong> ${current.temp_c} °C</p>
                <p><strong>${preferredLanguage === "ru" ? "Погода" : "Weather"}:</strong> ${current.condition.text}</p>
            </div>
            <div class="col-md-6 text-center">
                <img src="${weatherIconUrl}" alt="Weather Icon" style="width: 80px; height: 80px;">
            </div>
        `;
    } catch (error) {
        console.error("Error fetching current weather data:", error);
        const currentWeatherResult = document.getElementById('currentWeatherContent');
        currentWeatherResult.innerHTML = `<p class="text-danger">${preferredLanguage === "ru" ? "Ошибка при получении данных о погоде" : "Error fetching weather data"}</p>`;
    }
}


async function getExtendedForecast() {
    const city = document.getElementById('cityInput').value;
    try {
        const response = await axios.get(`/forecast14days?city=${city}`);
        const forecastData = response.data;
        const { forecast } = forecastData;

        const extendedForecastList = document.getElementById('extendedForecastList');
        extendedForecastList.innerHTML = ""; 
        document.getElementById('extendedForecast14Days').classList.remove('hidden');

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
                            <p>${preferredLanguage === "ru" ? "Дата" : "Date"}: ${formattedDate}</p>
                        </div>
                        <div class="col-md-3">
                            <img src=${imageUrl} style="width: 40px; height: 40px;">
                            <span>${description}</span>
                        </div>
                        <div class="col-md-3">
                            <p>${preferredLanguage === "ru" ? "Мин/Макс Температура" : "Min/Max Temp"}: ${minTemp}°C / ${maxTemp}°C</p>
                        </div>
                    </div>
                </li>`;
        });
    } catch (error) {
        console.error("Error fetching extended forecast data:", error);
        const extendedForecastList = document.getElementById('extendedForecastList');
        extendedForecastList.innerHTML = `<p class="text-danger">${preferredLanguage === "ru" ? "Ошибка при получении данных о прогнозе" : "Error fetching extended forecast data"}</p>`;
    }
}

async function getCity() {
    const city = document.getElementById('cityInput').value;
    
    const cityInfoResponse = await fetch(`/city-info?city=${city}`);
    const cityInfoResult = document.getElementById('cityInfoResult');

    if (cityInfoResponse.ok) {
        document.getElementById('cityInfoTitle').classList.remove('hidden');
        document.getElementById('cityInfoResult').classList.remove('hidden');

        const cityInfoData = await cityInfoResponse.json();
        const { name, latitude, longitude, country, population, is_capital } = cityInfoData[0];

        cityInfoResult.innerHTML = `
            <div class="mt-4 card">
                <div class="card-body">
                    <h5 class="card-title">${preferredLanguage === "ru" ? "Информация о городе" : "City Information"}</h5>
                    <hr>
                    <p><strong>${preferredLanguage === "ru" ? "Название" : "Name"}:</strong> ${name}</p>
                    <p><strong>${preferredLanguage === "ru" ? "Широта" : "Latitude"}:</strong> ${latitude}</p>
                    <p><strong>${preferredLanguage === "ru" ? "Долгота" : "Longitude"}:</strong> ${longitude}</p>
                    <p><strong>${preferredLanguage === "ru" ? "Страна" : "Country"}:</strong> ${country}</p>
                    <p><strong>${preferredLanguage === "ru" ? "Население" : "Population"}:</strong> ${population}</p>
                    <p><strong>${preferredLanguage === "ru" ? "Столица" : "Is Capital"}:</strong> ${is_capital ? 'Да' : 'Нет'}</p>
                </div>
            </div>
        `;
    } else {
        cityInfoResult.innerHTML = `<p class="text-danger">${preferredLanguage === "ru" ? "Ошибка" : "Error"}: ${cityInfoData.error}</p>`;
    }
}

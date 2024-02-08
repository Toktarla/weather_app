async function renderCharts() { 
    const city = document.getElementById('cityInput').value;
    const response = await axios.get(`/forecastChart?city=${city}`);
    const data = response.data.forecast.forecastday;

    const labels = data.map(day => day.date);
    const temperatureData = data.map(day => day.day.avgtemp_c);
    const windSpeedData = data.map(day => day.day.maxwind_kph);
    const humidityData = data.map(day => day.day.avghumidity);

    new Chart(document.getElementById('temperatureChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avg Temperature (°C)',
                data: temperatureData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });

    new Chart(document.getElementById('windSpeedChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Max Wind Speed (kph)',
                data: windSpeedData,
                fill: false,
                borderColor: 'rgb(255, 159, 64)',
                tension: 0.1
            }]
        }
    });

    new Chart(document.getElementById('humidityChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avg Humidity (%)',
                data: humidityData,
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
            }]
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    document.getElementById('languageSelect').value = preferredLanguage;
    updateTexts(preferredLanguage);
});

const translations = {
    en: {
        pageTitle: "Weather Forecast Charts",
        navbarBrand: "Weather App",
        mainPageLink: "Main Page",
        historyLink: "History",
        aboutLink: "About",
        chartsLink: "Charts",
        enterCityPlaceholder: "Enter City Name",
        getChartsButton: "Get Charts",
        temperatureForecastTitle: "Temperature Forecast",
        windSpeedForecastTitle: "Wind Speed Forecast",
        humidityForecastTitle: "Humidity Forecast",
        signOutButton: "Sign Out"
    },
    ru: {
        pageTitle: "Прогноз Погоды на Графиках",
        navbarBrand: "Погода",
        mainPageLink: "Главная Страница",
        historyLink: "История",
        aboutLink: "Про автора",
        chartsLink: "Чарты",
        enterCityPlaceholder: "Введите название города",
        getChartsButton: "Получить Графики",
        temperatureForecastTitle: "Прогноз температуры",
        windSpeedForecastTitle: "Прогноз скорости ветра",
        humidityForecastTitle: "Прогноз влажности",
        signOutButton: "Выйти"
    }
};

function updateTexts(lang) {
    document.title = translations[lang].pageTitle;

    document.getElementById('navbarBrand').textContent = translations[lang].navbarBrand;

    document.getElementById('mainPageLink').textContent = translations[lang].mainPageLink;
    document.getElementById('historyLink').textContent = translations[lang].historyLink;
    document.getElementById('aboutLink').textContent = translations[lang].aboutLink;
    document.getElementById('chartsLink').textContent = translations[lang].chartsLink;

    document.getElementById('cityInput').placeholder = translations[lang].enterCityPlaceholder;

    document.getElementById('getChartsButton').textContent = translations[lang].getChartsButton;

    document.getElementById('temperatureForecastTitle').textContent = translations[lang].temperatureForecastTitle;
    document.getElementById('windSpeedForecastTitle').textContent = translations[lang].windSpeedForecastTitle;
    document.getElementById('humidityForecastTitle').textContent = translations[lang].humidityForecastTitle;

    document.getElementById('signOutButton').textContent = translations[lang].signOutButton;
}

function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    localStorage.setItem('preferredLanguage', selectedLanguage); 
    updateTexts(selectedLanguage);
}

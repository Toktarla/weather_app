document.addEventListener('DOMContentLoaded', function() {
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
  document.getElementById('languageSelect').value = preferredLanguage;
  updateTexts(preferredLanguage);
});
 
const translations = {
    en: {
      welcomeMessage: "Welcome, guest!",
      currentWeather: "Current Weather",
      applicationName: "Weather App",
      mainPage: "Main Page",
      history: "History",
      about: "About",
      charts: "Charts",
      signOut: "Sign Out",
      weatherAppTitle: "Weather App",
      enterCityLabel: "Enter City:",
      buttonLabel: "Get Weather",
      currentWeatherTitle: "Current Weather",
      weatherForecastTitle: "Weather Forecast with Maps",
      weatherLastThreeHoursTitle: "Weather for the last 3 hours",
      extendedForecastFiveDaysTitle: "Extended Forecast (5 Days)",
      extendedForecastFourteenDaysTitle: "Extended Forecast (14 Days)",
      cityInfoTitle: "City Information"
    }, 
    ru: {
      welcomeMessage: "Добро пожаловать, гость!",
      currentWeather: "Текущая Погода",
      applicationName: "Погода",
      mainPage: "Главная",
      history: "История",
      about: "Про автора",
      charts: "Чарты",
      signOut: "Выйти",
      weatherAppTitle: "Погода",
      enterCityLabel: "Введите город:",
      buttonLabel: "Получить погоду",
      currentWeatherTitle: "Текущая Погода",
      weatherForecastTitle: "Прогноз погоды с картами",
      weatherLastThreeHoursTitle: "Погода за последние 3 часа",
      extendedForecastFiveDaysTitle: "Расширенный прогноз (5 дней)",
      extendedForecastFourteenDaysTitle: "Расширенный прогноз (14 дней)",
      cityInfoTitle: "Информация о городе"
    }
}; 

function updateTexts(lang) {
    const welcomeMessageElement = document.querySelector('.welcomeMessage');
    if (welcomeMessageElement) welcomeMessageElement.textContent = translations[lang].welcomeMessage;

    const applicationNameElement = document.querySelector('.applicationName');
    if (applicationNameElement) applicationNameElement.textContent = translations[lang].applicationName;

    const mainPage = document.querySelector('.nav-link.mainPage');
    if (mainPage) mainPage.textContent = translations[lang].mainPage;

    const historyElement = document.querySelector('.nav-link.history');
    if (historyElement) historyElement.textContent = translations[lang].history;

    const aboutElement = document.querySelector('.nav-link.about');
    if (aboutElement) aboutElement.textContent = translations[lang].about;

    const chartsElement = document.querySelector('.nav-link.charts');
    if (chartsElement) chartsElement.textContent = translations[lang].charts;

    const signOutElement = document.querySelector('.signOut');
    if (signOutElement) signOutElement.textContent = translations[lang].signOut;

    document.getElementById('weatherAppTitle').textContent = translations[lang].weatherAppTitle;
    document.getElementById('enterCityLabel').textContent = translations[lang].enterCityLabel;
    document.getElementById('button-addon2').textContent = translations[lang].buttonLabel;
    document.getElementById('currentWeatherTitle').textContent = translations[lang].currentWeatherTitle;
    document.getElementById('weatherForecastTitle').textContent = translations[lang].weatherForecastTitle;
    document.getElementById('weatherLastThreeHoursTitle').textContent = translations[lang].weatherLastThreeHoursTitle;
    document.getElementById('extendedForecastFiveDaysTitle').textContent = translations[lang].extendedForecastFiveDaysTitle;
    document.getElementById('extendedForecastFourteenDaysTitle').textContent = translations[lang].extendedForecastFourteenDaysTitle;
    document.getElementById('cityInfoTitle').textContent = translations[lang].cityInfoTitle;
}

function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    localStorage.setItem('preferredLanguage', selectedLanguage); 
    updateTexts(selectedLanguage);
}

document.addEventListener('DOMContentLoaded', function() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    document.getElementById('languageSelect').value = preferredLanguage;
    updateTexts(preferredLanguage);
  });
   
  const translations = {
      en: {
        welcomeMessage: "Welcome,",
        applicationName: "Weather App",
        mainPage: "Main Page",
        history: "History",
        about: "About",
        charts: "Charts",
        signOut: "Sign Out",
        userHistoryTitle: "User History",
        city: "City",
        requestType: "Request Type",
        date: "Date",
        details: "Details",
        downloadPDF: "Download PDF",
        detailsConsole: "Details in Console",
        noHistoryRecords: "No history records found."
      },
      ru: {
        welcomeMessage: "Добро пожаловать,",
        applicationName: "Погода",
        mainPage: "Главная",
        history: "История",
        about: "Про автора",
        charts: "Чарты",
        signOut: "Выйти",
        userHistoryTitle: "История пользователя",
        city: "Город",
        requestType: "Тип запроса",
        date: "Дата",
        details: "Детали",
        downloadPDF: "Скачать PDF",
        detailsConsole: "Детали в консоли",
        noHistoryRecords: "Записей истории не найдено."
      }
  };
  
  function updateTexts(lang) {
      const applicationNameElement = document.getElementById('applicationName');
      if (applicationNameElement) applicationNameElement.textContent = translations[lang].applicationName;
  
      const mainPageElement = document.getElementById('mainPage');
      if (mainPageElement) mainPageElement.textContent = translations[lang].mainPage;
  
      const historyElement = document.getElementById('history');
      if (historyElement) historyElement.textContent = translations[lang].history;
  
      const aboutElement = document.getElementById('about');
      if (aboutElement) aboutElement.textContent = translations[lang].about;
  
      const chartsElement = document.getElementById('charts');
      if (chartsElement) chartsElement.textContent = translations[lang].charts;
  
      const signOutElement = document.getElementById('signOut');
      if (signOutElement) signOutElement.textContent = translations[lang].signOut;
  
      document.getElementById('welcomeMessage').textContent = translations[lang].welcomeMessage;
      document.getElementById('userHistoryTitle').textContent = translations[lang].userHistoryTitle;
      document.getElementById('city').textContent = translations[lang].city;
      document.getElementById('requestType').textContent = translations[lang].requestType;
      document.getElementById('date').textContent = translations[lang].date;
      document.getElementById('details').textContent = translations[lang].details;
      document.getElementById('noHistoryRecords').textContent = translations[lang].noHistoryRecords;
  }
  
  function changeLanguage() {
      const selectedLanguage = document.getElementById('languageSelect').value;
      localStorage.setItem('preferredLanguage', selectedLanguage); 
      updateTexts(selectedLanguage);
  }
  
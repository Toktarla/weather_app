document.addEventListener("DOMContentLoaded", function () {
    const preferredLanguage =
      localStorage.getItem("preferredLanguage") || "en";
    const signupTitleElement = document.getElementById("signupTitle");
    const usernameInputElement = document.getElementById("username");
    const termsConditionsElement =
      document.getElementById("termsConditions");
    const loginLinkElement = document.getElementById("loginLink");
    const signupButtonElement = document.getElementById("signupButton");

    const languageSelectElement = document.getElementById("languageSelect");
    languageSelectElement.value = preferredLanguage;

    if (preferredLanguage === "en") {
      signupTitleElement.textContent = "Sign Up";
      usernameInputElement.placeholder = "Username";
      termsConditionsElement.textContent =
        "I Agree To The Terms & Conditions";
      loginLinkElement.innerHTML =
        'Already have an Account? <a href="/login"> Login Now!</a>';
      signupButtonElement.value = "Sign Up";
    } else {
      signupTitleElement.textContent = "Регистрация";
      usernameInputElement.placeholder = "Имя пользователя";
      termsConditionsElement.textContent =
        "Я согласен с Условиями и положениями";
      loginLinkElement.innerHTML =
        'Уже есть аккаунт? <a href="/login"> Войти сейчас!</a>';
      signupButtonElement.value = "Регистрация";
    }
  });

  function changeLanguage() {
    const selectedLanguage =
      document.getElementById("languageSelect").value;
    localStorage.setItem("preferredLanguage", selectedLanguage);

    location.reload();
  }
document.addEventListener('DOMContentLoaded', function() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    const loginTitleElement = document.getElementById('loginTitle');
    const usernameInputElement = document.getElementById('username');
    const passwordInputElement = document.getElementById('password');
    const loginButtonElement = document.getElementById('loginButton');
    const noAccountMessageElement = document.getElementById('noAccountMessage');
    
    const languageSelectElement = document.getElementById('languageSelect');
    languageSelectElement.value = preferredLanguage;
    
    if (preferredLanguage === 'en') {
        loginTitleElement.textContent = 'Login';
        usernameInputElement.placeholder = 'Username';
        passwordInputElement.placeholder = 'Password';
        loginButtonElement.value = 'LOGIN';
        noAccountMessageElement.innerHTML = 'Don\'t have an Account? <a href="/"> Sign Up Now!</a>';
    } else {
        loginTitleElement.textContent = 'Вход';
        usernameInputElement.placeholder = 'Имя пользователя';
        passwordInputElement.placeholder = 'Пароль';
        loginButtonElement.value = 'ВОЙТИ';
        noAccountMessageElement.innerHTML = 'У вас нет аккаунта? <a href="/"> Зарегистрируйтесь сейчас!</a>';
    }
});

function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    localStorage.setItem('preferredLanguage', selectedLanguage); 
    
    location.reload();
} 
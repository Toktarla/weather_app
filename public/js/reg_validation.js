function validatePassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const passwordError = document.getElementById('passwordError');

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const validLength = password.length >= 8;
    const passwordsMatch = password === confirmPassword;

    let errorMessage = "";
    if (!validLength) errorMessage = "Password must be at least 8 characters long.";
    if (!hasLetter) errorMessage += " Must contain at least one letter.";
    if (!hasDigit) errorMessage += " Must contain at least one digit.";
    if (!passwordsMatch) errorMessage += " Passwords do not match.";

    passwordError.textContent = errorMessage;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const localPart = email.split('@')[0];

    emailError.textContent = localPart.length >= 6 ? "" : "Email must have at least 6 letters before the '@'.";
}

function validateUsername() {
    const username = document.getElementById('username').value;
    const usernameError = document.getElementById('usernameError');
    
    const isValidStart = /^[a-zA-Z\d]/.test(username);
    const isValidLength = username.length >= 6;

    let errorMessage = "";
    if (!isValidStart) errorMessage = "Username must start with a letter or digit.";
    if (!isValidLength) errorMessage += " Username must be at least 6 characters long.";

    usernameError.textContent = errorMessage;
}


document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirm_password').addEventListener('input', validatePassword);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('username').addEventListener('input', validateUsername);
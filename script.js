function updateLengthDisplay(value) {
    document.getElementById('length-display').textContent = value;
}

function generatePassword() {
    const length = document.getElementById('password-length').value;
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charPool = '';

    if (includeUppercase) charPool += upperChars;
    if (includeLowercase) charPool += lowerChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool === '') {
        alert('Please select at least one character type.');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    document.getElementById('generated-password').value = password;
    updateStrengthIndicator(password);
}

function copyToClipboard() {
    const passwordField = document.getElementById('generated-password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

function updateStrengthIndicator(password) {
    const strengthBar = document.getElementById('strength-bar');
    let strength = 0;

    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthPercentage = (strength / 4) * 100;

    strengthBar.style.width = strengthPercentage + '%';
    strengthBar.style.background = strengthPercentage < 50 ? 'red' : strengthPercentage < 75 ? 'yellow' : 'green';
}
const passwordField = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

// Strength element
const strengthText = document.getElementById("strength");

function generatePassword() {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+-=[]{}<>?";

    let chars = "";

    if (uppercase.checked) chars += upper;
    if (lowercase.checked) chars += lower;
    if (numbers.checked) chars += nums;
    if (symbols.checked) chars += syms;

    if (chars.length === 0) {
        passwordField.value = "";
        strengthText.textContent = "Please select at least one option";
        return;
    }

    let password = "";

    for (let i = 0; i < Number(lengthSlider.value); i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    passwordField.value = password;
    checkStrength(password);
}

function checkStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        strengthText.textContent = "Strength: Weak";
        strengthText.style.color = "#ff4d4d";
    } else if (score <= 3) {
        strengthText.textContent = "Strength: Medium";
        strengthText.style.color = "#ffa500";
    } else if (score <= 4) {
        strengthText.textContent = "Strength: Strong";
        strengthText.style.color = "#ffd700";
    } else {
        strengthText.textContent = "Strength: Very Strong";
        strengthText.style.color = "#00cc66";
    }
}

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
    generatePassword();
});

[uppercase, lowercase, numbers, symbols].forEach(option => {
    option.addEventListener("change", generatePassword);
});

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordField.value);
    copyBtn.textContent = "Copied";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 1500);
});

generatePassword();
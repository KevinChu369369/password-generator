// Character sets for password generation
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// Get DOM elements
const lengthInput = document.getElementById("length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const passwordDisplay = document.getElementById("password");

// Generate password based on selected criteria
function generatePassword() {
  const length = parseInt(lengthInput.value);

  // Validate length
  if (length < 4 || length > 50) {
    alert("Please choose a length between 4 and 50 characters");
    return;
  }

  // Check if at least one character type is selected
  if (
    !uppercaseCheckbox.checked &&
    !lowercaseCheckbox.checked &&
    !numbersCheckbox.checked &&
    !symbolsCheckbox.checked
  ) {
    alert("Please select at least one character type");
    return;
  }

  // Build character pool based on selected options
  let chars = "";
  if (uppercaseCheckbox.checked) chars += UPPERCASE_CHARS;
  if (lowercaseCheckbox.checked) chars += LOWERCASE_CHARS;
  if (numbersCheckbox.checked) chars += NUMBER_CHARS;
  if (symbolsCheckbox.checked) chars += SYMBOL_CHARS;

  // Generate password
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  // Ensure at least one character from each selected type is included
  let finalPassword = password;
  if (uppercaseCheckbox.checked && !/[A-Z]/.test(password)) {
    const randomUppercase =
      UPPERCASE_CHARS[Math.floor(Math.random() * UPPERCASE_CHARS.length)];
    const randomPosition = Math.floor(Math.random() * length);
    finalPassword = replaceCharAt(
      finalPassword,
      randomPosition,
      randomUppercase
    );
  }
  if (lowercaseCheckbox.checked && !/[a-z]/.test(password)) {
    const randomLowercase =
      LOWERCASE_CHARS[Math.floor(Math.random() * LOWERCASE_CHARS.length)];
    const randomPosition = Math.floor(Math.random() * length);
    finalPassword = replaceCharAt(
      finalPassword,
      randomPosition,
      randomLowercase
    );
  }
  if (numbersCheckbox.checked && !/[0-9]/.test(password)) {
    const randomNumber =
      NUMBER_CHARS[Math.floor(Math.random() * NUMBER_CHARS.length)];
    const randomPosition = Math.floor(Math.random() * length);
    finalPassword = replaceCharAt(finalPassword, randomPosition, randomNumber);
  }
  if (
    symbolsCheckbox.checked &&
    !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)
  ) {
    const randomSymbol =
      SYMBOL_CHARS[Math.floor(Math.random() * SYMBOL_CHARS.length)];
    const randomPosition = Math.floor(Math.random() * length);
    finalPassword = replaceCharAt(finalPassword, randomPosition, randomSymbol);
  }

  // Display the password
  passwordDisplay.textContent = finalPassword;
}

// Helper function to replace character at specific position
function replaceCharAt(str, index, char) {
  return str.substring(0, index) + char + str.substring(index + 1);
}

// Copy password to clipboard
function copyPassword() {
  const password = passwordDisplay.textContent;
  if (password === "Your password will appear here") {
    alert("Please generate a password first");
    return;
  }

  // Use the modern clipboard API
  navigator.clipboard
    .writeText(password)
    .then(() => {
      // Visual feedback for copy
      const copyBtn = document.querySelector(".copy-btn");
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy password:", err);
      alert("Failed to copy password to clipboard");
    });
}

// Generate initial password
generatePassword();

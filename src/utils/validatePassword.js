export const validatePassword = (password) => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password); // Regex for uppercase letters
  const hasLowercase = /[a-z]/.test(password); // Regex for lowercase letters
  const hasNumber = /\d/.test(password); // Regex for numbers
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Regex for symbols

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSymbol
  );
};

export const generatePassword = (length) => {
  const lowerCharset = "abcdefghijklmnopqrstuvwxyz";
  const upperCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberCharset = "0123456789";
  const specialCharset = "!@#$%^&*";
  const allCharset =
    lowerCharset + upperCharset + numberCharset + specialCharset;

  let password = "";
  password += lowerCharset.charAt(
    Math.floor(Math.random() * lowerCharset.length)
  );
  password += upperCharset.charAt(
    Math.floor(Math.random() * upperCharset.length)
  );
  password += numberCharset.charAt(
    Math.floor(Math.random() * numberCharset.length)
  );
  password += specialCharset.charAt(
    Math.floor(Math.random() * specialCharset.length)
  );

  for (let i = 0; i < length; i++) {
    password += allCharset.charAt(
      Math.floor(Math.random() * allCharset.length)
    );
  }

  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

// in-memory blacklist
const tokenBlacklist = new Set();

// Helper function to check if a token is blacklisted
function isTokenBlacklisted(token) {
  return tokenBlacklist.has(token);
}

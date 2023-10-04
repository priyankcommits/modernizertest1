export const isValidURL = (url: string): boolean => {
  const urlPattern =
    /^(https?:\/\/)?([\w-]+\.+[\w-]{2,})+(\.[a-z]{2,})?([\/\w-]*)*\/?$/i;
  return urlPattern.test(url);
};

// Example usage:
const url = "https://www.example.com";
const isValid = isValidURL(url);

if (isValid) {
  console.log("Valid URL");
} else {
  console.log("Invalid URL");
}

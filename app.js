// Main js file, import here

// Dropdown menu in header:
const dropdownBtn = document.querySelector("#dropdown-menu-btn");
const dropdownMenu = document.querySelector("#dropdown-menu");

// Dropdown profile menu in header:
const dropdownProfileBtn = document.querySelector("#dropdown-profile-btn");
const dropdownProfile = document.querySelector("#dropdown-profile");

// Function to close all dropdowns
function closeAllDropdowns() {
  dropdownMenu.classList.add("hidden");
  dropdownProfile.classList.add("hidden");
}

// Toggle dropdown menu visibility
dropdownBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event from bubbling to document
  dropdownMenu.classList.toggle("hidden");
  dropdownProfile.classList.add("hidden"); // Close profile dropdown if open
});

// Toggle dropdown profile menu visibility
dropdownProfileBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event from bubbling to document
  dropdownProfile.classList.toggle("hidden");
  dropdownMenu.classList.add("hidden"); // Close menu dropdown if open
});

// Close dropdowns when clicking outside of the elements
document.addEventListener("click", () => {
  closeAllDropdowns();
});

// Apply initial theme
function applyInitialTheme() {
  const userPreference = localStorage.getItem("theme");
  const systemPreferenceIsDark = window.matchMedia(
    "prefers-color-scheme: dark",
  ).matches;
  const isDarkMode =
    userPreference === "dark" || (!userPreference && systemPreferenceIsDark);

  document.documentElement.classList.toggle("dark", isDarkMode);

  document.querySelector("#isLightmode").classList.toggle("hidden", isDarkMode);
  document.querySelector("#isDarkmode").classList.toggle("hidden", !isDarkMode);
}

applyInitialTheme();

// Dark mode theme toggle function and event listener
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle("dark");

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  document.querySelector("#isLightmode").classList.toggle("hidden", isDarkMode);
  document.querySelector("#isDarkmode").classList.toggle("hidden", !isDarkMode);
}

const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", toggleTheme);

// Clears the textarea and gives an alert for newsletter input on index.html, to improve the realism of the site
document
  .getElementById("newsletter-button")
  .addEventListener("click", function () {
    const emailInput = document.getElementById("subscribe-email");
    const email = emailInput.value.trim(); // Remove leading and trailing whitespaces

    // Basic email validation pattern (requires "@" symbol)
    const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    // Check if the email is not empty and matches the pattern
    if (email && emailPattern.test(email)) {
      emailInput.value = ""; // Clear the input field
      alert("Thank you for subscribing!");
    } else {
      alert("Please enter a valid email address.");
    }
  });

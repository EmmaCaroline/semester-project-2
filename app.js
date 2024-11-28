// main js file

//Dropdown menu in header:
const dropdownBtn = document.querySelector("#dropdown-menu-btn");
const dropdownMenu = document.querySelector("#dropdown-menu");

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

//Dropdown profile menu in header:
const dropdownProfileBtn = document.querySelector("#dropdown-profile-btn");
const dropdownProfile = document.querySelector("#dropdown-profile");

dropdownProfileBtn.addEventListener("click", () => {
  dropdownProfile.classList.toggle("hidden");
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

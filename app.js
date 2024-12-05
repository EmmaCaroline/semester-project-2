// Main JS file

import { setupNewsletterSubscription } from "./src/js";
import { addTypewriterEffect } from "./src/js";

// Dropdown menu in header
const dropdownBtn = document.querySelector("#dropdown-menu-btn");
const dropdownMenu = document.querySelector("#dropdown-menu");

// Dropdown profile menu in header
const dropdownProfileBtn = document.querySelector("#dropdown-profile-btn");
const dropdownProfile = document.querySelector("#dropdown-profile");

// Close dropdowns
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

// Close dropdowns when clicking anywhere outside of the elements
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

// Dark mode theme toggle function and event listener
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle("dark");

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  document.querySelector("#isLightmode").classList.toggle("hidden", isDarkMode);
  document.querySelector("#isDarkmode").classList.toggle("hidden", !isDarkMode);
}

const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", toggleTheme);

// Function calls
applyInitialTheme();

setupNewsletterSubscription("newsletter-button", "subscribe-email");

document.addEventListener("DOMContentLoaded", () => {
  addTypewriterEffect("typewriter", "Welcome to TreasureBid", 100);
});

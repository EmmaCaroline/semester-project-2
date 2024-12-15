import router from "./src/js/router/index";
import { setLogoutListener } from "./src/js/ui/global/logout";
import { redirectToAndScroll } from "./src/js/utilities/scrollToListings";

// Initialize router for the current page
await router(window.location.pathname);

const token = localStorage.getItem("token");

// Dropdown menu elements
const dropdownMenuBtn = document.querySelector("#dropdown-menu-btn");
const dropdownMenu = document.querySelector("#dropdown-menu");
const dropdownProfile = document.querySelector("#dropdown-profile");
const dropdownLoggedIn = document.querySelector("#dropdown-logged-in");
const dropdownProfileBtn = document.querySelector("#dropdown-profile-btn");

// Function to close all dropdowns
function closeAllDropdowns() {
  dropdownMenu?.classList.add("hidden");
  dropdownProfile?.classList.add("hidden");
  dropdownLoggedIn?.classList.add("hidden");
}

// Event listener for general dropdown menu toggle
dropdownMenuBtn?.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event bubbling
  dropdownMenu?.classList.toggle("hidden");
  closeAllDropdownsExcept(dropdownMenu);
});

// Event listener for profile dropdown toggle
dropdownProfileBtn?.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event bubbling

  if (token) {
    // User is logged in: toggle the logged-in dropdown
    dropdownLoggedIn?.classList.toggle("hidden");
    closeAllDropdownsExcept(dropdownLoggedIn);
  } else {
    // User is not logged in: toggle the logged-out dropdown
    dropdownProfile?.classList.toggle("hidden");
    closeAllDropdownsExcept(dropdownProfile);
  }
});

// Function to close all dropdowns except the one being toggled
function closeAllDropdownsExcept(openDropdown) {
  if (openDropdown !== dropdownMenu) dropdownMenu?.classList.add("hidden");
  if (openDropdown !== dropdownProfile)
    dropdownProfile?.classList.add("hidden");
  if (openDropdown !== dropdownLoggedIn)
    dropdownLoggedIn?.classList.add("hidden");
}

// Function to set initial state of dropdowns based on login status
function initializeDropdownState() {
  if (token) {
    dropdownProfile?.classList.add("hidden"); // Hide the logged-out menu
    dropdownLoggedIn?.classList.add("hidden"); // Ensure logged-in menu is hidden
  } else {
    dropdownProfile?.classList.add("hidden"); // Hide the logged-out menu
    dropdownLoggedIn?.classList.add("hidden"); // Ensure logged-in menu is hidden
  }
}

// Theme-related functions
function applyInitialTheme() {
  const userPreference = localStorage.getItem("theme");
  const systemPreferenceIsDark = window.matchMedia(
    "prefers-color-scheme: dark",
  ).matches;
  const isDarkMode =
    userPreference === "dark" || (!userPreference && systemPreferenceIsDark);

  document.documentElement.classList.toggle("dark", isDarkMode);

  document.querySelectorAll(".isLightmode").forEach((lightModeElem) => {
    lightModeElem.classList.toggle("hidden", isDarkMode);
  });
  document.querySelectorAll(".isDarkmode").forEach((darkModeElem) => {
    darkModeElem.classList.toggle("hidden", !isDarkMode);
  });
}

// Toggle dark/light mode
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle("dark");

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  document.querySelectorAll(".isLightmode").forEach((lightModeElem) => {
    lightModeElem.classList.toggle("hidden", isDarkMode);
  });
  document.querySelectorAll(".isDarkmode").forEach((darkModeElem) => {
    darkModeElem.classList.toggle("hidden", !isDarkMode);
  });
}

// Add event listeners to all theme-toggle buttons
function setupThemeToggleListeners() {
  document.querySelectorAll(".theme-toggle").forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", toggleTheme);
  });
}

// Close all dropdowns when clicking outside
document.addEventListener("click", () => {
  closeAllDropdowns();
});

// Initialize dropdown state on page load
initializeDropdownState();

// Initialize theme toggle listeners and apply theme
applyInitialTheme();
setupThemeToggleListeners();

setLogoutListener();

redirectToAndScroll();

// Scroll into view after the page loads if the hash matches
window.addEventListener("load", () => {
  if (window.location.hash === "#scroll-to-listings") {
    const listingsContainer = document.getElementById("scroll-to-listings");
    if (listingsContainer) {
      listingsContainer.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Listings container not found on this page.");
    }
  }
});

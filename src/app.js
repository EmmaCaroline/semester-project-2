import router from "./js/router/index";
import { setLogoutListener } from "./js/ui/global/logout";
import { redirectToAndScroll } from "./js/utilities/scrollToListings";

await router(window.location.pathname);

const token = localStorage.getItem("token");

const dropdownMenuBtn = document.querySelector("#dropdown-menu-btn");
const dropdownMenu = document.querySelector("#dropdown-menu");
const dropdownProfile = document.querySelector("#dropdown-profile");
const dropdownLoggedIn = document.querySelector("#dropdown-logged-in");
const dropdownProfileBtn = document.querySelector("#dropdown-profile-btn");

function closeAllDropdowns() {
  dropdownMenu?.classList.add("hidden");
  dropdownProfile?.classList.add("hidden");
  dropdownLoggedIn?.classList.add("hidden");
}

dropdownMenuBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  dropdownMenu?.classList.toggle("hidden");
  closeAllDropdownsExcept(dropdownMenu);
});

dropdownProfileBtn?.addEventListener("click", (event) => {
  event.stopPropagation();

  if (token) {
    dropdownLoggedIn?.classList.toggle("hidden");
    closeAllDropdownsExcept(dropdownLoggedIn);
  } else {
    dropdownProfile?.classList.toggle("hidden");
    closeAllDropdownsExcept(dropdownProfile);
  }
});

function closeAllDropdownsExcept(openDropdown) {
  if (openDropdown !== dropdownMenu) dropdownMenu?.classList.add("hidden");
  if (openDropdown !== dropdownProfile)
    dropdownProfile?.classList.add("hidden");
  if (openDropdown !== dropdownLoggedIn)
    dropdownLoggedIn?.classList.add("hidden");
}

function initializeDropdownState() {
  if (token) {
    dropdownProfile?.classList.add("hidden");
    dropdownLoggedIn?.classList.add("hidden");
  } else {
    dropdownProfile?.classList.add("hidden");
    dropdownLoggedIn?.classList.add("hidden");
  }
}

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

function setupThemeToggleListeners() {
  document.querySelectorAll(".theme-toggle").forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", toggleTheme);
  });
}

document.addEventListener("click", () => {
  closeAllDropdowns();
});

initializeDropdownState();
applyInitialTheme();
setupThemeToggleListeners();
setLogoutListener();
redirectToAndScroll();

window.addEventListener("load", () => {
  if (window.location.hash === "#scroll-to-listings") {
    const listingsContainer = document.getElementById("scroll-to-listings");
    if (listingsContainer) {
      listingsContainer.scrollIntoView({ behavior: "smooth" });
    }
  }
});

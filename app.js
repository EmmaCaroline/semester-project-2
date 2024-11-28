// main js file

//dropdown-menu:
const dropdownBtn = document.querySelector("#dropdown-menu-btn");
const dropdownMenu = document.querySelector("#dropdown-menu");

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

//dropdown-profile:
const dropdownProfileBtn = document.querySelector("#dropdown-profile-btn");
const dropdownProfile = document.querySelector("#dropdown-profile");

dropdownProfileBtn.addEventListener("click", () => {
  dropdownProfile.classList.toggle("hidden");
});

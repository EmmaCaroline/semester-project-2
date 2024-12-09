import { authGuard } from "../../utilities/authGuard";
import { readProfileData } from "../../ui/profile/profile";
import { onUpdateProfile } from "../../ui/profile/update";
import { prefillProfileForm } from "../../ui/profile/update";

const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);

const cancelButton = document.getElementById("cancel-update");

// Add event listener for cancel functionality
cancelButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default button behavior
  form.classList.add("hidden"); // Hide the form
  form.classList.remove("flex", "flex-col"); // Remove flex styles
});

// Ensure form is hidden initially
form.classList.add("hidden");

// Toggle form visibility
document
  .getElementById("update-profile-button")
  .addEventListener("click", function () {
    const isFormVisible = form.classList.contains("hidden");

    if (isFormVisible) {
      form.classList.remove("hidden");
      form.classList.add("block"); // Use block instead of flex for the form
      prefillProfileForm();
    } else {
      form.classList.add("hidden");
      form.classList.remove("block");
    }
  });

// Auth and profile setup
authGuard();
readProfileData();

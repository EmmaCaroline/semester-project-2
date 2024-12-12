import { authGuard } from "../../utilities/authGuard";
import {
  readProfileData,
  getListingCount,
  getWinsCount,
} from "../../ui/profile/profile";
import { onUpdateProfile, prefillProfileForm } from "../../ui/profile/update";
import { onReadListingsByProfile } from "../../ui/listings/listings";

const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);

const cancelButton = document.getElementById("cancel-update");

// Add event listener for cancel functionality
cancelButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default button behavior
  form.classList.add("hidden"); // Hide the form
});

// Ensure form is hidden initially
//form.classList.add("hidden");

// Toggle form visibility
document
  .getElementById("update-profile-button")
  .addEventListener("click", function () {
    const isFormVisible = form.classList.contains("hidden");

    if (isFormVisible) {
      form.classList.remove("hidden");
      form.classList.add("block");
      prefillProfileForm();

      // Scroll to the form, but a little higher. Couldn't use scrollIntoView() due to some elements being too close to the viewport's edge
      const formPosition = form.offsetTop; // Get the position of the form
      window.scrollTo({
        top: formPosition - 90,
        behavior: "smooth",
      });
    } else {
      form.classList.add("hidden");
      form.classList.remove("block");
    }
  });

authGuard();
readProfileData();
onReadListingsByProfile();
getListingCount();
getWinsCount();

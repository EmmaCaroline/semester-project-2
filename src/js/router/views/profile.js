import { authGuard } from "../../utilities/authGuard";
import {
  readProfileData,
  getListingCount,
  getWinsCount,
} from "../../ui/profile/profile";
import { onUpdateProfile, prefillProfileForm } from "../../ui/profile/update";
import { onReadListingsByProfile } from "../../ui/listings/listings";
import { onReadAllWins } from "../../ui/listings/wins";

const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);

const cancelButton = document.getElementById("cancel-update");

cancelButton.addEventListener("click", function (event) {
  event.preventDefault();
  form.classList.add("hidden");
});

document
  .getElementById("update-profile-button")
  .addEventListener("click", function () {
    const isFormVisible = form.classList.contains("hidden");

    if (isFormVisible) {
      form.classList.remove("hidden");
      form.classList.add("block");
      prefillProfileForm();

      const formPosition = form.offsetTop;
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
onReadAllWins();

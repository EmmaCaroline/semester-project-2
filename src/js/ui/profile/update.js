import { load } from "../../api/auth/key";
import { readProfile } from "../../api/profile/profile";
import { updateProfile } from "../../api/profile/update";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { showMessage } from "../../utilities/alertMessage";

/**
 * Handles the profile update form submission.
 *
 * This function prevents the default form submission behavior and checks if the user
 * is logged in by validating the user object. It collects the updated avatar, banner,
 * and bio information from the form, and if any of these fields have changed, it
 * sends the updated data to the server. If no changes are detected, it alerts the user.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the profile update is complete.
 */

export async function onUpdateProfile(event) {
  event.preventDefault();
  showLoadingSpinner();
  const user = load("user");
  if (!user || !user.name) {
    console.error("User is not logged in or user object is invalid");
    return;
  }
  hideLoadingSpinner();

  const username = user.name;

  const formData = new FormData(event.target);

  const updated = {};

  const avatarURL = formData.get("avatar-url");
  const bannerURL = formData.get("banner-url");
  const bioText = formData.get("bio");

  // Fetch current profile data
  const profile = await readProfile(username);

  // Compare new data with existing data before adding to updated object
  if (avatarURL && avatarURL !== profile.avatar?.url) {
    updated.avatar = {
      url: avatarURL,
      alt: formData.get("avatar-alt"),
    };
  }

  if (bannerURL && bannerURL !== profile.banner?.url) {
    updated.banner = {
      url: bannerURL,
      alt: formData.get("banner-alt"),
    };
  }

  if (bioText && bioText !== profile.bio) {
    updated.bio = bioText;
    console.log(updated.bio);
  }
  console.log(updated.bio);

  // Check if the 'updated' object has any keys
  if (Object.keys(updated).length > 0) {
    showLoadingSpinner();
    await updateProfile(username, updated);
    showMessage("Profile is now updated", 3000);
    setTimeout(() => {
      window.location.reload();
    }, 3000); // 3000 milliseconds = 3 seconds
  } else {
    showMessage("No changes were made to the profile.", 3000);
    setTimeout(() => {
      window.location.reload();
    }, 3000); // 3000 milliseconds = 3 seconds
  }
  hideLoadingSpinner();
}

/**
 * Prefills the profile update form with the current user's information.
 *
 * This function retrieves the logged-in user's profile data and populates the
 * corresponding fields in the update profile form. It checks if the user is logged
 * in and if the user's profile contains a bio. If the user is not logged in or the
 * profile is invalid, it logs an error message.
 *
 * @returns {Promise<void>} A promise that resolves when the profile data has been fetched
 * and the form has been populated.
 */

export async function prefillProfileForm() {
  showLoadingSpinner();
  const user = load("user");
  if (!user || !user.name) {
    console.error("User is not logged in or user object is invalid");
    return;
  }

  const username = user.name;

  const profile = await readProfile(username);

  const bioInput = document.forms["updateProfile"].elements["bio"];
  if (bioInput && profile.bio) {
    bioInput.value = profile.bio; // Prefill the bio field with current bio
  }
  hideLoadingSpinner();
}

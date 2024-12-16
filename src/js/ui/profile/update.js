import { load } from "../../api/auth/key";
import { readProfile } from "../../api/profile/profile";
import { updateProfile } from "../../api/profile/update";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { showMessage } from "../../utilities/alertMessage";

/**
 * Handles the profile update process when the update profile form is submitted.
 * It gathers the updated information from the form, compares it with the current profile data,
 * and only sends the updated fields to the server for updating.
 * If no changes are detected, it notifies the user. It also shows a loading spinner during the update process.
 *
 * @async
 * @param {Event} event - The submit event of the update profile form.
 * @throws {Error} If the user is not logged in or if the profile update fails.
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

  const profile = await readProfile(username);

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
  }

  if (Object.keys(updated).length > 0) {
    showLoadingSpinner();
    await updateProfile(username, updated);
    showMessage("Profile is now updated", 3000);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else {
    showMessage("No changes were made to the profile.", 3000);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  hideLoadingSpinner();
}

/**
 * Prefills the update profile form with the current user's profile data.
 * It retrieves the user's profile and sets the values of the form fields (such as bio)
 * to reflect the current information. Displays a loading spinner while fetching the data.
 *
 * @async
 * @throws {Error} If the user is not logged in or if fetching the profile data fails.
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
    bioInput.value = profile.bio;
  }
  hideLoadingSpinner();
}

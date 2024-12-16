import { load } from "../../api/auth/key";
import { readProfile } from "../../api/profile/profile";
import { updateProfile } from "../../api/profile/update";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { showMessage } from "../../utilities/alertMessage";

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

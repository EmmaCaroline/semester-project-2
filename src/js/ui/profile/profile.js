import { load } from "../../api/auth/key";
import { readProfile } from "../../api/profile/profile";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Fetches and displays the profile data of the currently logged-in user, including their banner image,
 * avatar image, username, total credits, and bio. If the logged-in user matches the profile being viewed,
 * the "edit profile" icon and total credits section will be shown.
 *
 * @async
 * @throws {Error} If fetching the profile data or user details fails.
 */
export const readProfileData = async () => {
  showLoadingSpinner();
  const user = load("user");
  if (!user || !user.name) {
    console.error("User is not logged in or user object is invalid");
    return;
  }
  hideLoadingSpinner();

  const username = user.name;
  const profile = await readProfile(username);

  const bannerImage = document.getElementById("banner-image");
  const userName = document.getElementById("user-name");
  const avatarImage = document.getElementById("avatar-image");
  const totalCredits = document.getElementById("total-credits");
  const bio = document.getElementById("bio");
  const editProfileIcon = document.getElementById("edit-profile-icon");

  if (!editProfileIcon) {
    console.error("Edit profile icon element not found.");
  }

  bannerImage.src = profile.banner?.url;
  bannerImage.alt = profile.banner?.alt;

  userName.textContent = username;

  avatarImage.src = profile.avatar?.url;
  avatarImage.alt = profile.avatar?.alt;

  totalCredits.textContent = "Total credits: " + profile.credits;

  const coinIcon = document.createElement("i");
  coinIcon.classList.add(
    "fa-solid",
    "fa-coins",
    "ml-2",
    "text-md",
    "md:text-lg",
  );

  totalCredits.appendChild(coinIcon);

  bio.textContent = profile.bio || "No bio available";

  if (user.name === username) {
    editProfileIcon.classList.remove("hidden");
    totalCredits.classList.remove("hidden");
  } else {
    editProfileIcon.classList.add("hidden");
    totalCredits.classList.add("hidden");
  }
};

/**
 * Fetches and displays the total count of listings for the currently logged-in user.
 * The count will be appended to an element with the ID "listings-count".
 *
 * @async
 * @throws {Error} If fetching the profile data or listings count fails.
 */
export async function getListingCount() {
  try {
    const user = load("user");
    const username = user.name;
    const profile = await readProfile(username);

    const listingCount = document.createElement("p");
    listingCount.classList.add("text-sm", "font-body", "md:text-base");
    listingCount.textContent = "Total: " + profile._count.listings;

    const listingsCountContainer = document.querySelector("#listings-count");
    listingsCountContainer.appendChild(listingCount);
  } catch (error) {
    console.error("Error fetching listing count:", error);
  }
}

/**
 * Fetches and displays the total count of wins for the currently logged-in user.
 * The count will be appended to an element with the ID "wins-count".
 *
 * @async
 * @throws {Error} If fetching the profile data or wins count fails.
 */
export async function getWinsCount() {
  try {
    const user = load("user");
    const username = user.name;
    const profile = await readProfile(username);

    const winsCount = document.createElement("p");
    winsCount.classList.add("text-sm", "font-body", "md:text-base");
    winsCount.textContent = "Total: " + profile._count.wins;

    const winsCountContainer = document.querySelector("#wins-count");
    winsCountContainer.appendChild(winsCount);
  } catch (error) {
    console.error("Error fetching listing count:", error);
  }
}

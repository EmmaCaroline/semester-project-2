import { load } from "../../api/auth/key";
import { readProfile } from "../../api/profile/profile";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Loads and displays the logged-in user's profile data.
 *
 * This function retrieves the user's profile using the username from
 * local storage, then dynamically creates and appends the profile
 * elements to the profile container in the DOM.
 *
 * @returns {Promise<void>} A promise that resolves when the profile data is loaded and displayed.
 * @throws {Error} If the user is not logged in or the profile data cannot be fetched.
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

  // Select existing elements in the DOM
  const bannerImage = document.getElementById("banner-image");
  const userName = document.getElementById("user-name");
  const avatarImage = document.getElementById("avatar-image");
  const totalCredits = document.getElementById("total-credits");
  const bio = document.getElementById("bio");
  const editProfileIcon = document.getElementById("edit-profile-icon");

  if (!editProfileIcon) {
    console.error("Edit profile icon element not found.");
  }

  // Update their properties and content
  bannerImage.src = profile.banner?.url;
  bannerImage.alt = profile.banner?.alt;

  userName.textContent = username;

  avatarImage.src = profile.avatar?.url;
  avatarImage.alt = profile.avatar?.alt;

  totalCredits.textContent = "Total credits: " + profile.credits;

  const coinIcon = document.createElement("i"); // Create <i> element for the icon
  coinIcon.classList.add(
    "fa-solid",
    "fa-coins",
    "ml-2",
    "text-md",
    "md:text-lg",
  ); // Tailwind classes for styling

  // Append icon after the text
  totalCredits.appendChild(coinIcon);

  bio.textContent = profile.bio || "No bio available";

  // Check if the logged-in user is viewing their own profile
  if (user.name === username) {
    editProfileIcon.classList.remove("hidden"); // Show icon
    totalCredits.classList.remove("hidden");
  } else {
    editProfileIcon.classList.add("hidden"); // Hide icon
    totalCredits.classList.add("hidden");
  }
};

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
    // You can also display an error message to the user
  }
}

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
    // You can also display an error message to the user
  }
}

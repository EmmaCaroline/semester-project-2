import { load } from "../../api/auth/key";
import { readProfile } from "../../api/profile/profile";

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
  const user = load("user");
  if (!user || !user.name) {
    console.error("User is not logged in or user object is invalid");
    return;
  }
  const username = user.name;
  const profile = await readProfile(username);

  // Select existing elements in the DOM
  const bannerImage = document.getElementById("banner-image");
  const userName = document.getElementById("user-name");
  const avatarImage = document.getElementById("avatar-image");
  const totalCredits = document.getElementById("total-credits");
  const bio = document.getElementById("bio");

  // Update their properties and content
  bannerImage.src = profile.banner?.url || "default-banner.jpg";
  bannerImage.alt = profile.banner?.alt || "Banner Image";

  userName.textContent = username;

  avatarImage.src = profile.avatar?.url || "default-avatar.jpg";
  avatarImage.alt = profile.avatar?.alt || "Avatar Image";

  // Update credits with an icon dynamically
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

  bio.textContent = "Total credits: " + profile.bio || "No bio available";
};

import { API_AUCTION_PROFILES } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Updates the profile of a user with the provided data.
 *
 * @param {string} username - The username of the profile to update.
 * @param {Object} updatedData - The data to update in the user's profile.
 * @param {string} updatedData.name - The user's name.
 * @param {string} updatedData.email - The user's email.
 * @param {string} [updatedData.bio] - The user's bio (optional).
 * @param {string[]} [updatedData.tags] - A list of tags associated with the user (optional).
 * @param {string[]} [updatedData.media] - Media links associated with the user (optional).
 * @returns {Promise<Object>} The updated profile data.
 * @throws {Error} If the request to update the profile fails.
 */
export async function updateProfile(username, updatedData) {
  const endpoint = `${API_AUCTION_PROFILES}/${username}`;
  showLoadingSpinner();
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "PUT",
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to update profile: " + errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Updating profile failed: ", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

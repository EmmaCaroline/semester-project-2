import { API_AUCTION_PROFILES } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * API call function to update the profile of a user with the specified username and new data.
 *
 * @param {string} username - The username of the profile to update.
 * @param {Object} updatedData - The new profile data to update.
 * @returns {Promise<Object>} The result of the update request.
 * @throws {Error} If the update fails.
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

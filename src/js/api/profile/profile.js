import { API_AUCTION_PROFILES } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Fetches the profile data for a given user.
 *
 * @param {string} username - The username of the profile to fetch.
 * @returns {Promise<Object>} The user's profile data, including bio and other details.
 * @throws {Error} If the request to fetch the profile fails or if a network error occurs.
 */
export async function readProfile(username) {
  const endpoint = `${API_AUCTION_PROFILES}/${username}`;
  showLoadingSpinner();
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });
    console.log(response); // Log profile to ensure bio exists

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch profile: " + errorText);
    }

    const userdata = await response.json();
    console.log(userdata); // Log profile to ensure bio exists
    return userdata.data;
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Fetching profile failed: ${error.message}`);
    }
    console.error("Fetching profile failed: ", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

import { API_AUCTION_PROFILES } from "../../constants";
import { headers } from "../../headers";

/**
 * API call function to fetch the profile data of a user by their username.
 *
 * @param {string} username - The username of the profile to fetch.
 * @returns {Promise<Object>} The user profile data fetched from the API.
 * @throws {Error} If fetching the profile fails.
 */

export async function readProfile(username) {
  const endpoint = `${API_AUCTION_PROFILES}/${username}`;
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch profile: " + errorText);
    }

    const userdata = await response.json();
    return userdata.data;
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Fetching profile failed: ${error.message}`);
    }
    console.error("Fetching profile failed: ", error);
    throw error;
  }
}

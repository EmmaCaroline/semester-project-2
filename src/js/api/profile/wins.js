import { API_AUCTION_PROFILES } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Fetches the wins of a user by username, including additional properties such as seller and bid details.
 *
 * @param {string} username - The username of the user whose wins are to be fetched.
 * @returns {Promise<Object[]>} A promise that resolves to an array of win data objects.
 * @throws {Error} If the request to fetch wins fails.
 */
export async function readWins(username) {
  // Add query parameters to include additional properties
  const endpoint = `${API_AUCTION_PROFILES}/${username}/wins?_seller=true&_bids=true`;
  showLoadingSpinner();
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch wins: " + errorText);
    }

    const userdata = await response.json();
    return userdata.data;
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Fetching wins failed: ${error.message}`);
    }
    console.error("Fetching wins failed: ", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

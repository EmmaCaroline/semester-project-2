import { API_AUCTION_LISTINGS } from "../../constants";
import { apiFetchWithHandling } from "../apiFetchWithHandling";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Creates a new auction listing with the provided details.
 *
 * @param {Object} params - The details of the auction listing to create.
 * @param {string} params.title - The title of the auction listing.
 * @param {string} params.description - The description of the auction listing.
 * @param {Array<string>} params.tags - The tags associated with the auction listing.
 * @param {Array<string>} params.media - The media URLs associated with the auction listing.
 * @param {string} params.endsAt - The ISO 8601 date-time string representing when the auction ends.
 * @returns {Promise<Object>} A promise resolving to the API response containing the created listing details.
 * @throws {Error} Throws if the listing creation fails. Alerts are shown for network errors and other failures.
 */
export async function createListing({
  title,
  description,
  tags,
  media,
  endsAt,
}) {
  showLoadingSpinner();
  try {
    const result = await apiFetchWithHandling(
      API_AUCTION_LISTINGS,
      {
        method: "POST",
        body: JSON.stringify({ title, description, tags, media, endsAt }),
      },
      "Failed to create post.",
    );

    return result;
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Creating post failed: ${error.message}`);
    }
    console.error("Creating post failed", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

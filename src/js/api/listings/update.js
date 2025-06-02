import { API_AUCTION_LISTINGS } from "../../constants";
import { apiFetchWithHandling } from "../apiFetchWithHandling";

/**
 * Updates an auction listing with the specified data.
 *
 * @param {string} id - The ID of the auction listing to update.
 * @param {Object} updatedData - The updated data for the listing.
 * @param {string} updatedData.title - The title of the listing.
 * @param {string} updatedData.description - The description of the listing.
 * @param {Array<string>} updatedData.tags - The tags associated with the listing.
 * @param {string} updatedData.media - The media URL for the listing.
 * @returns {Promise<Object>} The updated listing data.
 * @throws {Error} If the update request fails.
 */
export async function updateListing(id, { title, description, tags, media }) {
  const bodyData = { title, description, tags, media };

  try {
    const result = await apiFetchWithHandling(
      `${API_AUCTION_LISTINGS}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(bodyData),
      },
      "Failed to update listing.",
    );

    return result;
  } catch (error) {
    console.error("Updating listing failed:", error);
    throw error;
  }
}

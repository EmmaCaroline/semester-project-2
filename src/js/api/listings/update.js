import { headers } from "../../headers";
import { API_AUCTION_LISTINGS } from "../../constants";

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
  const bodyData = {
    title: title,
    description: description,
    tags: tags,
    media: media,
  };

  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
      headers: headers(),
      method: "PUT",
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to update listing: " + errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Updating listing failed:", error);
    throw error;
  }
}

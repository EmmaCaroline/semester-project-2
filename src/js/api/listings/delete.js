import { API_AUCTION_LISTINGS } from "../../constants";
import { headers } from "../../headers";

/**
 * Deletes an auction listing post by its ID.
 *
 * @param {string} id - The ID of the auction listing to delete. It must be a valid string (UUID).
 * @throws {Error} If the post ID is invalid, or if the delete request fails, an error is thrown with the failure message.
 */
export async function deletePost(id) {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid post ID: must be a valid string (UUID).");
  }

  try {
    const endpoint = `${API_AUCTION_LISTINGS}/${id}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to delete post: " + errorText);
    }
  } catch (error) {
    console.error("Deleting post failed: ", error);
    throw error;
  }
}

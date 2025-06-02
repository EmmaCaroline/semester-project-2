import { API_AUCTION_LISTINGS } from "../../constants";
import { apiFetchWithHandling } from "../apiFetchWithHandling";

/**
 * Deletes an auction listing by its ID.
 *
 * @param {string} id - The ID of the auction listing to delete.
 * @throws {Error} Throws an error if the ID is invalid or the delete request fails.
 */
export async function deletePost(id) {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid post ID: must be a valid string (UUID).");
  }

  try {
    await apiFetchWithHandling(
      `${API_AUCTION_LISTINGS}/${id}`,
      {
        method: "DELETE",
      },
      "Failed to delete post.",
    );
  } catch (error) {
    console.error("Deleting post failed:", error);
    throw error;
  }
}

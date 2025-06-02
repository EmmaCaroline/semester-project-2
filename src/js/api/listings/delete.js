import { API_AUCTION_LISTINGS } from "../../constants";
import { apiFetchWithHandling } from "../apiFetchWithHandling";

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

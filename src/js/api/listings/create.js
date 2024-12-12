import { API_AUCTION_LISTINGS } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * API call function to create a new post with the provided title, body, tags, and media.
 *
 * @param {Object} params - The post parameters.
 * @param {string} params.title - The title of the post.
 * @param {string} params.body - The content of the post.
 * @param {Array<string>} params.tags - An array of tags associated with the post.
 * @param {string} [params.media] - The media URL associated with the post (optional).
 * @returns {Promise<Object>} The result of the post creation request.
 * @throws {Error} If the post creation fails.
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
    const response = await fetch(API_AUCTION_LISTINGS, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify({ title, description, tags, media, endsAt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to create post: " + errorText);
    }

    const result = await response.json();
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

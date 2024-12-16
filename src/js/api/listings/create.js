import { API_AUCTION_LISTINGS } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

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

import { headers } from "../../headers";
import { API_AUCTION_LISTINGS } from "../../constants";

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

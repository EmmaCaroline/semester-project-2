import { headers } from "../../headers";
import { API_AUCTION_LISTINGS } from "../../constants";

export async function fetchBid(id, { amount }) {
  const bodyData = { amount }; // Ensure this matches the API request format

  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
      headers: headers(),
      method: "POST", // Correct HTTP method for creating a new bid
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch bid: " + errorText);
    }

    const result = await response.json();
    console.log("api result" + result);
    return result; // Return the API response for further processing
  } catch (error) {
    console.error("Fetching bid failed:", error);
    throw error;
  }
}

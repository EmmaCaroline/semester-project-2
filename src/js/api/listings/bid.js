import { headers } from "../../headers";
import { API_AUCTION_LISTINGS } from "../../constants";

export async function fetchBid(id, { amount }) {
  const bodyData = { amount: amount };

  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
      headers: headers(),
      method: "PUT",
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch bid: " + errorText);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Fetching bid failed:", error);
    throw error;
  }
}

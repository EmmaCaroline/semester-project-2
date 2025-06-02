import { API_AUCTION_LISTINGS } from "../../constants";
import { apiFetchWithHandling } from "../apiFetchWithHandling";

/**
 * Places a bid on an auction listing with the specified amount.
 *
 * @param {string} id - The ID of the auction listing to place the bid on.
 * @param {Object} params - The bid parameters.
 * @param {number} params.amount - The amount of the bid (must be a positive number).
 * @returns {Promise<Object>} A promise that resolves with the API response containing the bid details.
 * @throws {Error} Throws if the bid request fails, with the failure message.
 */
export async function fetchBid(id, { amount }) {
  const bodyData = { amount };

  try {
    const result = await apiFetchWithHandling(
      `${API_AUCTION_LISTINGS}/${id}/bids`,
      {
        method: "POST",
        body: JSON.stringify(bodyData),
      },
      "Failed to place bid.",
    );

    return result;
  } catch (error) {
    console.error("Fetching bid failed:", error);
    throw error;
  }
}

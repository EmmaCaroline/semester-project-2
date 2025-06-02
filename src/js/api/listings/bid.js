import { apiFetchWithHandling } from "../apiFetchWithHandling";
import { API_AUCTION_LISTINGS } from "../../constants";

/**
 * Places a bid on a listing by ID.
 *
 * @param {string} id - The ID of the listing.
 * @param {Object} options - The bid options.
 * @param {number} options.amount - The bid amount.
 * @returns {Promise<Object>} The created bid response.
 * @throws {Error} If the request fails.
 */
export async function fetchBid(id, { amount }) {
  return apiFetchWithHandling(
    `${API_AUCTION_LISTINGS}/${id}/bids`,
    {
      method: "POST",
      body: JSON.stringify({ amount }),
    },
    "Failed to place bid.",
  );
}

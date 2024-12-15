import { formatDate } from "./listings";
import { fetchBid } from "../../api/listings/bid";
import { fetchSingleListing } from "../../api/listings/listings";

function getCurrentBid(listing) {
  if (listing && Array.isArray(listing.bids) && listing.bids.length > 0) {
    // Log the bids array to verify the data
    console.log("Bids array:", listing.bids);

    // Sort bids by amount, descending, and return the highest bid amount
    const highestBid = listing.bids.sort((a, b) => b.amount - a.amount)[0];

    // Log the highest bid to confirm it's the correct one
    console.log("Highest bid:", highestBid);

    return highestBid.amount;
  }
  return null; // No bids
}

/**
 * Create and display the bid section for a listing.
 * @param {Object} listing - The listing object.
 */
export function createBidSection(listing) {
  // Ensure the listing object is valid and has the 'endsAt' property
  if (!listing || !listing.endsAt) {
    console.error(
      "Listing data is missing or 'endsAt' property is unavailable:",
      listing,
    );
    return; // Do not proceed if data is missing
  }
  const container = document.querySelector(".single-listing-container");
  if (!container) {
    console.error("Container not found!");
    return;
  }

  const currentDate = new Date();
  const endDate = new Date(listing.endsAt);
  const auctionStatus =
    currentDate > endDate
      ? "Auction ended"
      : `Auction ends on ${formatDate(listing.endsAt)}`;

  const bidSection = document.createElement("div");
  bidSection.classList.add("bid-section");

  const statusElement = document.createElement("h3");
  statusElement.textContent = auctionStatus;
  bidSection.appendChild(statusElement);

  const bidAmountContainer = document.createElement("div");
  bidAmountContainer.classList.add("bid-amount-container");
  const currentBid = getCurrentBid(listing);

  const amount = document.createElement("p");
  amount.textContent = currentBid
    ? `Current bid: $${currentBid}`
    : "No bids yet";
  bidAmountContainer.appendChild(amount);
  bidSection.appendChild(bidAmountContainer);

  if (currentDate <= endDate) {
    const bidInputLabel = document.createElement("label");
    bidInputLabel.setAttribute("for", "bidAmountInput");
    bidInputLabel.textContent = "Place your bid:";

    const bidInput = document.createElement("input");
    bidInput.setAttribute("type", "number");
    bidInput.setAttribute("id", "bidAmountInput");
    bidInput.setAttribute("placeholder", "Enter your bid amount");
    bidInput.setAttribute("min", currentBid ? currentBid + 1 : 1);

    const placeBidButton = document.createElement("button");
    placeBidButton.textContent = "Place Bid";
    placeBidButton.setAttribute("id", "placeBidButton");

    placeBidButton.addEventListener("click", () => {
      const bidAmount = parseFloat(bidInput.value);
      if (isNaN(bidAmount) || bidAmount <= (currentBid || 0)) {
        alert("Please enter a valid bid that is higher than the current bid.");
        return;
      }
      onPlaceBid(listing.id, bidAmount, bidInput);
    });

    bidSection.appendChild(bidInputLabel);
    bidSection.appendChild(bidInput);
    bidSection.appendChild(placeBidButton);
  }

  container.appendChild(bidSection);
}

async function onPlaceBid(listingId, bidAmount, bidInput) {
  console.log(`Placing bid of $${bidAmount} for listing ${listingId}`);
  try {
    // Place the bid
    const result = await fetchBid(listingId, { amount: bidAmount });
    console.log("Bid placed successfully:", result);

    // Re-fetch the updated listing data
    const updatedListing = await fetchSingleListing(listingId);
    console.log("Updated listing data after bid:", updatedListing);

    // Ensure the updatedListing.data contains the correct structure
    if (!updatedListing || !updatedListing.data) {
      console.error("Updated listing data is missing:", updatedListing);
      return;
    }

    // Update the bid section with the new data
    updateBidSection(updatedListing.data);

    // Reset input and set the minimum bid to the new value
    bidInput.value = "";
    bidInput.setAttribute("min", bidAmount + 1);

    // Display success message
    alert(`Your bid of $${bidAmount} has been placed successfully!`);
  } catch (error) {
    console.error("Error placing bid:", error);
    alert("Failed to place bid. Please try again.");
  }
}

function updateBidSection(listing) {
  console.log("Updated listing data:", listing); // Debug: Check if bids are included

  const bidAmountContainer = document.querySelector(".bid-amount-container");
  if (!bidAmountContainer) {
    console.error("Bid amount container not found.");
    return;
  }

  // Extract the highest bid using the `bids` array
  const bidAmount = getCurrentBid(listing); // Ensure this function works correctly

  console.log("Calculated bid amount:", bidAmount);

  // Select or create the paragraph element to display the bid
  let amount = bidAmountContainer.querySelector("p");
  if (!amount) {
    amount = document.createElement("p");
    bidAmountContainer.appendChild(amount);
  }

  // If there is a valid bid amount, update the displayed bid amount immediately
  if (bidAmount !== null) {
    amount.textContent = `Current bid: $${bidAmount}`;
  } else {
    // Fallback if there are no bids yet
    amount.textContent = "No bids yet";
  }
}

import { formatDate } from "./listings";
//import defaultAvatar from "../../../../images/default-avatar.jpg";
import { fetchBid } from "../../api/listings/bid";

function getCurrentBid(listing) {
  const bids = listing.bids || [];
  if (bids.length > 0) {
    const bidsAmount = bids.map((bid) => bid.amount);
    const highestBid = Math.max(...bidsAmount);
    return highestBid;
  }
  return null; // No bids yet
}

// Create Bid Section dynamically
export function createBidSection(listing) {
  const container = document.querySelector(".single-listing-container");
  if (!container) {
    console.error("Container not found!");
    return;
  }

  const currentDate = new Date();
  const endDate = formatDate(listing.endsAt);
  const auctionStatus =
    currentDate > new Date(listing.endsAt)
      ? "Auction ended"
      : "Auction ends on " + endDate;

  const bidSection = document.createElement("div");
  bidSection.classList.add("bid-section");

  const statusElement = document.createElement("h3");
  statusElement.textContent = auctionStatus;
  bidSection.appendChild(statusElement);

  const bidAmountContainer = document.createElement("div");
  bidAmountContainer.classList.add("bid-amount-container");
  const currentBid =
    listing.bids && listing.bids.length > 0
      ? listing.bids[listing.bids.length - 1].amount
      : "No bids yet";

  const amount = document.createElement("p");
  amount.textContent = `Current bid: $${currentBid}`;
  bidAmountContainer.appendChild(amount);
  bidSection.appendChild(bidAmountContainer);

  if (currentDate <= new Date(listing.endsAt)) {
    const bidInputLabel = document.createElement("label");
    bidInputLabel.setAttribute("for", "bidAmountInput");
    bidInputLabel.textContent = "Place your bid:";

    const bidInput = document.createElement("input");
    bidInput.setAttribute("type", "number");
    bidInput.setAttribute("id", "bidAmountInput");
    bidInput.setAttribute("placeholder", "Enter your bid amount");
    bidInput.setAttribute("min", currentBid + 1);

    const placeBidButton = document.createElement("button");
    placeBidButton.textContent = "Place Bid";
    placeBidButton.setAttribute("id", "placeBidButton");

    placeBidButton.addEventListener("click", () => {
      const bidAmount = parseFloat(bidInput.value);
      if (isNaN(bidAmount) || bidAmount <= currentBid) {
        alert("Please enter a valid bid that is higher than the current bid.");
        return;
      }

      onPlaceBid(listing.id, bidAmount, bidInput, currentBid);
    });

    bidSection.appendChild(bidInputLabel);
    bidSection.appendChild(bidInput);
    bidSection.appendChild(placeBidButton);
  }

  container.appendChild(bidSection);
  console.log("Listing data:", listing);
}

async function onPlaceBid(listingId, bidAmount, bidInput) {
  console.log(`Placing bid of $${bidAmount} for listing ${listingId}`);
  try {
    const result = await fetchBid(listingId, { amount: bidAmount });

    // Update the bid section with the new bid data
    updateBidSection(result.data);

    // Optionally reset the input field and update the minimum bid value
    bidInput.value = "";
    bidInput.setAttribute("min", bidAmount + 1); // Set new min bid to the latest bid
  } catch (error) {
    console.error("Error placing bid:", error);
    alert("Failed to place bid.");
  }
}

function updateBidSection(listing) {
  const bidAmountContainer = document.querySelector(".bid-amount-container");
  const bidAmount = getCurrentBid(listing);
  const amount = bidAmountContainer.querySelector("p");

  amount.textContent = bidAmount
    ? `Current bid: $${bidAmount}`
    : "Current bid: No bids yet";
}

export async function onReadBid(listingId) {
  const bidAmountInput = document.querySelector(`#bid-amount-${listingId}`);

  if (!bidAmountInput) {
    alert("Bid input field not found.");
    return;
  }

  const bidAmount = parseFloat(bidAmountInput.value);

  if (isNaN(bidAmount) || bidAmount <= 0) {
    alert("Please enter a valid bid amount.");
    return;
  }

  try {
    // Call the fetchBid function to place the bid
    const result = await fetchBid(listingId, { amount: bidAmount });

    // After placing the bid, update the UI with the new bid information
    updateBidSection(result.data);

    // Optionally reset the bid input field
    bidAmountInput.value = "";
  } catch (error) {
    console.error("Error placing bid:", error);
    alert("Failed to place bid.");
  }
}

import { formatDate } from "./listings";
import { fetchBid } from "../../api/listings/bid";
import { fetchSingleListing } from "../../api/listings/listings";

/**
 * Gets the current highest bid for a given listing.
 *
 * @param {Object} listing - The listing object containing bid data.
 * @param {Array} listing.bids - An array of bid objects for the listing.
 * @returns {number|null} - The highest bid amount or null if no bids exist.
 */
function getCurrentBid(listing) {
  if (listing && Array.isArray(listing.bids) && listing.bids.length > 0) {
    const highestBid = listing.bids.sort((a, b) => b.amount - a.amount)[0];

    return highestBid.amount;
  }
  return null;
}

/**
 * Checks if the auction for the given listing has ended.
 *
 * @param {Object} listing - The listing object containing the auction end date.
 * @param {string} listing.endsAt - The ISO string date when the auction ends.
 * @returns {boolean} - True if the auction has ended, otherwise false.
 */
function isAuctionEnded(listing) {
  const currentDate = new Date();
  const endDate = new Date(listing.endsAt);
  return currentDate > endDate;
}

/**
 * Creates the bid section UI for a listing, including bid input,
 * the current highest bid, and a list of previous bidders.
 *
 * @param {Object} listing - The listing object containing bid and auction data.
 * @param {Array} listing.bids - An array of bid objects.
 * @param {string} listing.endsAt - The ISO string date when the auction ends.
 * @returns {HTMLElement} - The created bid section element.
 */
export function createBidSection(listing) {
  const container = document.querySelector(".single-listing-container");
  if (!container) {
    console.error("Container not found!");
    return;
  }

  const currentDate = new Date();
  const endDate = new Date(listing.endsAt);
  const auctionStatus =
    currentDate > endDate ? "Auction ended: " : `Auction ends at: `;

  const bidSection = document.createElement("div");
  bidSection.classList.add(
    "bid-section",
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "border",
    "border-bg-customBlue",
    "rounded",
    "my-4",
    "dark:text-gray-300",
  );

  const statusElement = document.createElement("h3");

  const dateSpan = document.createElement("span");
  dateSpan.textContent = formatDate(listing.endsAt);

  dateSpan.classList.add("text-red-600");

  statusElement.textContent = auctionStatus;
  statusElement.appendChild(dateSpan);
  statusElement.classList.add(
    "font-body",
    "text-base",
    "font-medium",
    "md:text-lg",
    "mt-4",
    "mb-8",
  );

  bidSection.appendChild(statusElement);

  const bidAmountContainer = document.createElement("div");
  bidAmountContainer.classList.add("bid-amount-container");
  const currentBid = getCurrentBid(listing);

  const amount = document.createElement("p");
  amount.classList.add(
    "font-body",
    "text-sm",
    "md:text-base",
    "mb-4",
    "dark:text-gray-300",
  );

  if (isAuctionEnded(listing)) {
    amount.textContent = currentBid
      ? `Final bid was: $${currentBid}`
      : "No bids was placed on this listing";
  } else {
    amount.textContent = currentBid
      ? `Current bid: $${currentBid}`
      : "No bids yet";
  }

  bidAmountContainer.appendChild(amount);
  bidSection.appendChild(bidAmountContainer);

  if (currentDate <= endDate) {
    const bidInputLabel = document.createElement("label");
    bidInputLabel.setAttribute("for", "bidAmountInput");
    bidInputLabel.classList.add(
      "font-body",
      "text-sm",
      "md:text-base",
      "mx-2",
      "mb-1",
    );
    bidInputLabel.textContent = "Place your bid:";

    const bidInput = document.createElement("input");
    bidInput.classList.add(
      "font-body",
      "text-sm",
      "md:text-base",
      "border",
      "border-black",
      "rounded",
      "pl-2",
      "py-1",
      "w-24",
      "md:w-28",
      "mb-4",
      "dark:bg-gray-800",
    );
    bidInput.setAttribute("type", "number");
    bidInput.setAttribute("id", "bidAmountInput");
    bidInput.setAttribute("placeholder", "Bid amount");
    bidInput.setAttribute("min", currentBid ? currentBid + 1 : 1);

    const placeBidButton = document.createElement("button");
    placeBidButton.classList.add(
      "w-auto",
      "font-body",
      "text-sm",
      "py-1.5",
      "px-8",
      "rounded-lg",
      "md:text-base",
      "bg-customGray",
      "text-white",
      "hover:bg-gray-400",
      "mb-4",
    );
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

    const listOfBidders = document.createElement("div");
    listOfBidders.classList.add("flex", "flex-col");

    const biddersTitle = document.createElement("p");
    biddersTitle.classList.add(
      "font-body",
      "text-base",
      "md:text-lg",
      "font-medium",
      "mt-6",
      "pb-4",
      "dark:text-gray-300",
    );
    biddersTitle.textContent = "List of bidders:";

    if (
      listing.bids &&
      Array.isArray(listing.bids) &&
      listing.bids.length > 0
    ) {
      listing.bids.forEach((bid) => {
        const bidderContainer = document.createElement("div");
        bidderContainer.classList.add(
          "flex",
          "items-center",
          "mb-2",
          "dark:text-gray-300",
        );

        const bidderAvatar = document.createElement("img");
        bidderAvatar.classList.add("w-8", "h-8", "rounded-full", "mr-2");

        if (bid.bidder?.avatar) {
          bidderAvatar.src = bid.bidder.avatar.url;
          bidderAvatar.alt = bid.bidder.avatar.alt;
        } else {
          bidderAvatar.src = "";
          bidderAvatar.alt = "";
        }

        const bidderInfo = document.createElement("p");
        bidderInfo.classList.add("font-body", "text-sm", "md:text-base");
        bidderInfo.textContent = `${bid.bidder.name}: $${bid.amount}`;

        bidderContainer.appendChild(bidderAvatar);
        bidderContainer.appendChild(bidderInfo);

        listOfBidders.appendChild(bidderContainer);
      });
    }

    bidSection.append(
      bidInputLabel,
      bidInput,
      placeBidButton,
      biddersTitle,
      listOfBidders,
    );

    return bidSection;
  }

  container.appendChild(bidSection);
}

/**
 * Handles placing a bid on a listing. It validates the bid amount,
 * sends the bid to the server, and updates the UI with the new bid.
 *
 * @param {number} listingId - The ID of the listing being bid on.
 * @param {number} bidAmount - The amount of the new bid.
 * @param {HTMLInputElement} bidInput - The input element where the bid is entered.
 */
async function onPlaceBid(listingId, bidAmount, bidInput) {
  try {
    await fetchBid(listingId, { amount: bidAmount });

    const updatedListing = await fetchSingleListing(listingId);

    if (!updatedListing || !updatedListing.data) {
      console.error("Updated listing data is missing:", updatedListing);
      return;
    }

    updateBidSection(updatedListing.data);

    bidInput.value = "";
    bidInput.setAttribute("min", bidAmount + 1);

    alert(`Your bid of $${bidAmount} has been placed successfully!`);
  } catch (error) {
    console.error("Error placing bid:", error);
    alert(
      "Failed to place bid. Please try again. Note that you cannot bid on your own listing.",
    );
  }
}

/**
 * Updates the bid section UI with the latest bid information after a bid is placed.
 *
 * @param {Object} listing - The updated listing object containing bid data.
 * @param {Array} listing.bids - An array of bid objects.
 */
function updateBidSection(listing) {
  const bidAmountContainer = document.querySelector(".bid-amount-container");
  if (!bidAmountContainer) {
    console.error("Bid amount container not found.");
    return;
  }

  const bidAmount = getCurrentBid(listing);

  let amount = bidAmountContainer.querySelector("p");
  if (!amount) {
    amount = document.createElement("p");
    bidAmountContainer.appendChild(amount);
  }

  if (bidAmount !== null) {
    amount.textContent = `Current bid: $${bidAmount}`;
  } else {
    amount.textContent = "No bids yet";
  }
}

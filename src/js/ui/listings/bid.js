import { formatDate } from "./listings";
import { fetchBid } from "../../api/listings/bid";
import { fetchSingleListing } from "../../api/listings/listings";
//import { list } from "postcss";

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

function isAuctionEnded(listing) {
  const currentDate = new Date();
  const endDate = new Date(listing.endsAt);
  return currentDate > endDate;
}

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

  // Create the bid section container
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

  // Create the status element (h3)
  const statusElement = document.createElement("h3");

  // Create a span for the formatted date
  const dateSpan = document.createElement("span");
  dateSpan.textContent = formatDate(listing.endsAt);

  // Add a class to the span for styling (you can style this in CSS)
  dateSpan.classList.add("text-red-600"); // Tailwind example, or add your own CSS class

  // Append the text and span to the status element
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

  // Append the status element to the bid section
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

  // Change the text based on whether the auction has ended
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
        // Create a container for each bidder
        const bidderContainer = document.createElement("div");
        bidderContainer.classList.add(
          "flex",
          "items-center",
          "mb-2",
          "dark:text-gray-300",
        );

        // Create the bidder avatar
        const bidderAvatar = document.createElement("img");
        bidderAvatar.classList.add("w-8", "h-8", "rounded-full", "mr-2");

        // Check if the bidder has an avatar, otherwise use a default one
        if (bid.bidder?.avatar) {
          bidderAvatar.src = bid.bidder.avatar.url;
          bidderAvatar.alt = bid.bidder.avatar.alt;
        } else {
          bidderAvatar.src = "";
          bidderAvatar.alt = "";
        }

        // Create the bidder name and the bid amount text
        const bidderInfo = document.createElement("p");
        bidderInfo.classList.add("font-body", "text-sm", "md:text-base");
        bidderInfo.textContent = `${bid.bidder.name}: $${bid.amount}`;

        // Append the avatar and bidder info to the bidder container
        bidderContainer.appendChild(bidderAvatar);
        bidderContainer.appendChild(bidderInfo);

        // Append the bidder container to the list of bidders
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
    console.log("Created bid section:", bidSection);
    return bidSection;
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
    alert(
      "Failed to place bid. Please try again. Note that you cannot bid on your own listing.",
    );
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

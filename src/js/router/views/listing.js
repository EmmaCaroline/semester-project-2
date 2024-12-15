import { onReadSingleListing } from "../../ui/listings/listings";
import { onReadBid } from "../../ui/listings/bid";

// Assuming you fetch or have the listingId available somehow
const listingId = "some_listing_id"; // This should be dynamically set

// Function to attach event listeners to your bid button
function setupBidButton() {
  const placeBidButton = document.querySelector("#placeBidButton");

  if (placeBidButton) {
    placeBidButton.addEventListener("click", () => {
      onReadBid(listingId); // Pass the listingId to onReadBid
    });
  }
}

// Call functions to initialize the page
onReadSingleListing();
setupBidButton(); // Set up the bid button listener

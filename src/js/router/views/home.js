// router/views/home.js
import { setupNewsletterSubscription } from "../../ui/homepage";
import { addTypewriterEffect } from "../../ui/homepage/index";
import { onReadAllListings } from "../../ui/listings/listings";
import {
  fetchAndRenderListings,
  initializePagination,
} from "../../utilities/pagination";

setupNewsletterSubscription("newsletter-button", "subscribe-email");

addTypewriterEffect("typewriter", "TreasureBid Auction House", 100);

onReadAllListings();

initializePagination();
fetchAndRenderListings();

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission
    const scrollTarget = document.getElementById("scroll-to-listings");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  }
});

import { setupNewsletterSubscription } from "../../ui/homepage/index";
import { addTypewriterEffect } from "../../ui/homepage/index";
import { onReadAllListings } from "../../ui/listings/listings";
import {
  fetchAndRenderListings,
  initializePagination,
} from "../../utilities/pagination";
import { onReadAllSpecificListings } from "../../ui/listings/listingsSpecific";
import { createCarouselSlides } from "../../ui/homepage/index";
import { hideWelcomeifLoggedIn } from "../../ui/homepage/index";

setupNewsletterSubscription("newsletter-button", "subscribe-email");

addTypewriterEffect("typewriter", "TreasureBid Auction House", 100);

onReadAllListings();
onReadAllSpecificListings();

initializePagination();
fetchAndRenderListings();

createCarouselSlides();
hideWelcomeifLoggedIn();

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const scrollTarget = document.getElementById("scroll-to-listings");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  }
});

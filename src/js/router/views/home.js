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

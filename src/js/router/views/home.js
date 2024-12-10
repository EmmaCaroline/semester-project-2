// router/views/home.js
import { setupNewsletterSubscription } from "../../ui/homepage";
import { addTypewriterEffect } from "../../ui/homepage/index";
import { onReadAllListings } from "../../ui/listings/listings";

setupNewsletterSubscription("newsletter-button", "subscribe-email");

addTypewriterEffect("typewriter", "Welcome to TreasureBid", 100);

onReadAllListings();

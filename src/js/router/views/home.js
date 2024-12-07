// router/views/home.js
import { setupNewsletterSubscription } from "../../ui/homepage";
import { addTypewriterEffect } from "../../ui/homepage/index";

setupNewsletterSubscription("newsletter-button", "subscribe-email");

// Directly invoke typewriter effect after DOM manipulation
addTypewriterEffect("typewriter", "Welcome to TreasureBid", 100);

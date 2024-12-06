import {
  setupNewsletterSubscription,
  addTypewriterEffect,
} from "../../ui/homepage";

setupNewsletterSubscription("newsletter-button", "subscribe-email");

document.addEventListener("DOMContentLoaded", () => {
  addTypewriterEffect("typewriter", "Welcome to TreasureBid", 100);
});

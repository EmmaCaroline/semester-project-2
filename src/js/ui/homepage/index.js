import { fetchListings } from "../../api/listings/listings";
import defaultImage from "../../../../images/No_Image_Available.jpg";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

const token = localStorage.getItem("token");
const welcomeMessage = document.querySelector("#unregistered-welcome-message");

/**
 * Adds a click event listener to the newsletter button for handling subscriptions.
 * Clears the email input field and shows an alert based on the input's validity.
 * @param {string} buttonId - The ID of the newsletter button.
 * @param {string} inputId - The ID of the email input field.
 */
export function setupNewsletterSubscription(buttonId, inputId) {
  document.getElementById(buttonId).addEventListener("click", function () {
    const emailInput = document.getElementById(inputId);
    const email = emailInput.value.trim(); // Remove leading and trailing whitespaces

    // Email validation pattern (requires "@" symbol) for 'newsletter subscription'
    const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    // Check if the email is not empty and matches the pattern
    if (email && emailPattern.test(email)) {
      emailInput.value = ""; // Clear the input field
      alert("Thank you for subscribing!");
    } else {
      alert("Please enter a valid email address.");
    }
  });
}

/**
 * Adds a typewriter effect to the specified element.
 * @param {string} elementId - The ID of the element where the typewriter effect will be applied.
 * @param {string} text - The text to display with the typewriter effect.
 * @param {number} speed - The speed of the typing effect in milliseconds (default: 100ms).
 */
export function addTypewriterEffect(elementId, text, speed = 100) {
  const typewriterElement = document.getElementById(elementId);
  if (!typewriterElement) {
    console.error(`Element with ID '${elementId}' not found.`);
    return;
  }

  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      typewriterElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
}

export function ifLoggedIn() {
  if (token) {
    // User is logged in: hide the welcome message
    welcomeMessage.classList.add("hidden");
  } else {
    welcomeMessage.classList.remove("hidden");
  }
}

// CarouselFunctions.js

let currentSlideIndex = 0; // Track the current slide index

async function readPostsForCarousel() {
  showLoadingSpinner();
  try {
    const { data: listing } = await fetchListings();
    listing.sort((a, b) => new Date(b.created) - new Date(a.created));
    return listing.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch listing:", error);
    return [];
  } finally {
    hideLoadingSpinner();
  }
}

export async function createCarouselSlides() {
  const listings = await readPostsForCarousel();
  const carouselContainer = document.querySelector("#image-carousel");
  const dotsContainer = document.querySelector("#dots-container");

  carouselContainer.innerHTML = ""; // Clear existing slides
  dotsContainer.innerHTML = ""; // Clear existing dots

  listings.forEach((listing, index) => {
    const imageCarousel = document.createElement("div");
    imageCarousel.classList.add(
      "flex",
      "w-full",
      "h-72",
      "md:h-[400px]",
      "lg:h-[500px]",
      "overflow-hidden",
      "carousel-slide",
    );

    const bannerImage = document.createElement("img");
    bannerImage.classList.add("w-full", "object-cover", "h-full");
    if (listing.media?.[0]) {
      bannerImage.src = listing.media[0].url;
      bannerImage.alt = listing.media[0].alt;
    } else {
      bannerImage.src = defaultImage;
      bannerImage.alt = "No image available";
    }

    const bannerOverlay = document.createElement("div");
    bannerOverlay.classList.add(
      "absolute",
      "top-0",
      "left-0",
      "w-full",
      "h-full",
      "bg-black",
      "bg-opacity-40",
    );

    const bannerTitle = document.createElement("p");
    bannerTitle.textContent = listing.title;
    bannerTitle.classList.add(
      "font-heading",
      "text-white",
      "text-xl",
      "absolute",
      "top-1/2",
      "transform",
      "-translate-y-1/2",
      "left-1/2",
      "-translate-x-1/2",
      "max-w-52",
      "truncate",
      "sm:max-w-sm",
      "md:max-w-md",
      "lg:max-w-3xl",
      "md:text-xl",
      "lg:text-3xl",
    );

    const viewButton = document.createElement("a");
    viewButton.href = `/listing/listing.html?id=${listing.id}`;
    viewButton.textContent = "View items";
    viewButton.classList.add(
      "font-body",
      "text-sm",
      "py-1.5",
      "px-8",
      "rounded-lg",
      "md:text-base",
      "text-white",
      "bg-black",
      "absolute",
      "bottom-4",
      "left-1/2",
      "transform",
      "-translate-x-1/2",
      "border",
      "border-gray-600",
      "hover:bg-customGray",
      "hover:text-gray-300",
    );

    imageCarousel.append(bannerImage, bannerOverlay, bannerTitle, viewButton);
    carouselContainer.appendChild(imageCarousel);

    const dot = document.createElement("div");
    dot.classList.add(
      "single-dot",
      "w-2",
      "h-2",
      "md:w-3",
      "md:h-3",
      "mx-1",
      "bg-gray-400",
      "rounded-full",
      "inline-block",
      "transition-bg",
      "duration-600",
      "ease-in-out",
      "hover:bg-gray-700",
      "cursor-pointer",
    );

    // Click event to navigate to the corresponding slide
    dot.addEventListener("click", () => {
      currentSlideIndex = index;
      showSlide(currentSlideIndex);
    });

    dotsContainer.appendChild(dot);
  });

  const prevBtn = document.createElement("button");
  prevBtn.id = "prev-btn";
  prevBtn.classList.add(
    "absolute",
    "top-1/2",
    "left-6",
    "md:left-10",
    "transform",
    "-translate-y-1/2",
  );
  prevBtn.innerHTML =
    '<i class="fa-solid fa-chevron-left text-white text-2xl"></i>';
  prevBtn.onclick = prevImage;

  const nextBtn = document.createElement("button");
  nextBtn.id = "next-btn";
  nextBtn.classList.add(
    "absolute",
    "top-1/2",
    "right-6",
    "md:right-10",
    "transform",
    "-translate-y-1/2",
  );
  nextBtn.innerHTML =
    '<i class="fa-solid fa-chevron-right text-white text-2xl"></i>';
  nextBtn.onclick = nextImage;

  carouselContainer.appendChild(prevBtn);
  carouselContainer.appendChild(nextBtn);

  // Add drag-to-change functionality for mobile
  addDragToChangeSlides(carouselContainer);

  showSlide(currentSlideIndex); // Show the first slide initially
}

// Update the showSlide function to highlight the active dot
function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".single-dot");

  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-gray-700", i === index); // Highlight active dot
    dot.classList.toggle("bg-gray-400", i !== index); // Dim inactive dots
  });
}

function nextImage() {
  const slides = document.querySelectorAll(".carousel-slide");
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
  } else {
    currentSlideIndex = 0;
  }
  showSlide(currentSlideIndex);
}

function prevImage() {
  const slides = document.querySelectorAll(".carousel-slide");
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  } else {
    currentSlideIndex = slides.length - 1;
  }
  showSlide(currentSlideIndex);
}

// Drag-to-change logic for mobile
function addDragToChangeSlides(carouselContainer) {
  let startX = 0;
  let endX = 0;
  let isDragging = false;

  carouselContainer.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
  });

  carouselContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    endX = e.touches[0].pageX;
  });

  carouselContainer.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    if (startX - endX > 50) {
      // Swiped left
      nextImage();
    } else if (endX - startX > 50) {
      // Swiped right
      prevImage();
    }
  });
}

window.nextImage = nextImage;
window.prevImage = prevImage;

// Function calls
ifLoggedIn();
createCarouselSlides();

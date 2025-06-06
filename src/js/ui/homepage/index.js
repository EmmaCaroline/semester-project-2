import { fetchListings } from "../../api/listings/listings";
import defaultImage from "../../../../images/No_Image_Available.jpg";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { showMessage } from "../../utilities/alertMessage";

const token = localStorage.getItem("token");
const welcomeMessage = document.querySelector("#unregistered-welcome-message");

/**
 * Sets up an event listener for the newsletter subscription button. When clicked, it validates the email input.
 * If the email is valid, it clears the input and shows a success message. If invalid, it alerts the user to provide a valid email.
 *
 * @param {string} buttonId - The ID of the button to trigger the subscription.
 * @param {string} inputId - The ID of the email input field.
 */
export function setupNewsletterSubscription(buttonId, inputId) {
  document.getElementById(buttonId).addEventListener("click", function () {
    const emailInput = document.getElementById(inputId);
    const email = emailInput.value.trim();

    const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    if (email && emailPattern.test(email)) {
      emailInput.value = "";

      showMessage("Thank you for subscribing!", 3000);
    } else {
      alert("Please enter a valid email address.");
    }
  });
}

/**
 * Adds a typewriter effect to an element by gradually typing out the provided text at a given speed.
 *
 * @param {string} elementId - The ID of the element where the text will be typed.
 * @param {string} text - The text to type out.
 * @param {number} [speed=100] - The speed at which the text appears (in milliseconds).
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

/**
 * Hides the welcome message if the user is logged in.
 */
export function hideWelcomeifLoggedIn() {
  if (token) {
    welcomeMessage.classList.add("hidden");
  } else {
    welcomeMessage.classList.remove("hidden");
  }
}

let currentSlideIndex = 0;

/**
 * Fetches the latest listings, sorts them by creation date, and returns the top 3 for the carousel.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of the top 3 latest listings.
 */
async function readPostsForCarousel() {
  showLoadingSpinner();

  try {
    const { data: listings } = await fetchListings();
    listings.sort(
      (listingA, listingB) =>
        new Date(listingB.created) - new Date(listingA.created),
    );
    return listings.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch listing:", error);
    return [];
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Creates and displays carousel slides based on the latest listings.
 * Each slide contains an image, title, and a button linking to the listing's detail page.
 *
 * @returns {Promise<void>} Resolves when the carousel slides have been created.
 */
export async function createCarouselSlides() {
  const listings = await readPostsForCarousel();
  const carouselContainer = document.querySelector("#image-carousel");
  const dotsContainer = document.querySelector("#dots-container");

  carouselContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

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
      "cursor-pointer",
    );

    viewButton.addEventListener("click", () => {
      localStorage.setItem("listingID", JSON.stringify(listing.id));
      window.location.href = "/listing/listing/";
    });

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

  showSlide(currentSlideIndex);
}
/**
 * Displays the slide at the specified index and updates the active dot indicator.
 *
 * @param {number} index - The index of the slide to show.
 */
function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".single-dot");

  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-gray-700", i === index);
    dot.classList.toggle("bg-gray-400", i !== index);
  });
}

/**
 * Moves to the next slide in the carousel.
 */
function nextImage() {
  const slides = document.querySelectorAll(".carousel-slide");
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
  } else {
    currentSlideIndex = 0;
  }
  showSlide(currentSlideIndex);
}

/**
 * Moves to the previous slide in the carousel.
 */
function prevImage() {
  const slides = document.querySelectorAll(".carousel-slide");
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  } else {
    currentSlideIndex = slides.length - 1;
  }
  showSlide(currentSlideIndex);
}

window.nextImage = nextImage;
window.prevImage = prevImage;

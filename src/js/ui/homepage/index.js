import { fetchListings } from "../../api/listings/listings";
import defaultImage from "../../../../images/No_Image_Available.jpg";

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

    // Basic email validation pattern (requires "@" symbol)
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

async function readPostsForCarousel() {
  try {
    const { data: listing } = await fetchListings();
    listing.sort((a, b) => new Date(b.created) - new Date(a.created));
    return listing.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch listing:", error);
    return [];
  }
}

let slideIndex = 1;

export async function createCarouselSlides() {
  const posts = await readPostsForCarousel();
  const carouselContainer = document.querySelector("#image-carousel");

  carouselContainer.innerHTML = ""; // Clear any existing slides

  posts.forEach((post) => {
    const bannerImageDiv = document.createElement("div");
    bannerImageDiv.classList.add("banner-images", "fade");

    const bannerImageContainerDiv = document.createElement("div");
    bannerImageContainerDiv.classList.add("banner-image-container");

    const bannerImageOverlayDiv = document.createElement("div");
    bannerImageOverlayDiv.classList.add("banner-image-overlay");

    const img = document.createElement("img");
    if (post.media?.[0]) {
      img.src = post.media[0].url;
      img.alt = post.media[0].alt;
    } else {
      img.src = defaultImage;
      console.log("defaultImage: ", defaultImage);
      img.alt = "No image available";
    }

    bannerImageContainerDiv.appendChild(bannerImageOverlayDiv);
    bannerImageContainerDiv.appendChild(img);

    const bannerTextDiv = document.createElement("div");
    bannerTextDiv.classList.add("banner-text");
    const h2 = document.createElement("h2");
    h2.textContent = post.title;
    bannerTextDiv.appendChild(h2);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button");
    const anchor = document.createElement("a");
    anchor.href = `post/index.html?id=${post.id}`;
    anchor.textContent = "Read More";
    buttonDiv.appendChild(anchor);

    bannerImageDiv.appendChild(bannerImageContainerDiv);
    bannerImageDiv.appendChild(bannerTextDiv);
    bannerImageDiv.appendChild(buttonDiv);

    carouselContainer.appendChild(bannerImageDiv);
  });

  // Add buttons and dots
  addCarouselNavigation(carouselContainer);
  addCarouselDots(posts, carouselContainer);

  // Initialize the first slide
  showSlides(slideIndex);
}

function addCarouselNavigation(carouselContainer) {
  const prevButton = document.createElement("a");
  prevButton.classList.add("banner-prev");
  prevButton.innerHTML = "&#10094;";
  prevButton.onclick = function () {
    console.log("Prev button clicked");
    plusSlides(-1);
  };

  const nextButton = document.createElement("a");
  nextButton.classList.add("banner-next");
  nextButton.innerHTML = "&#10095;";
  nextButton.onclick = function () {
    console.log("Next button clicked");
    plusSlides(1);
  };

  carouselContainer.appendChild(prevButton);
  carouselContainer.appendChild(nextButton);
}

function addCarouselDots(posts, carouselContainer) {
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dots-container");

  posts.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.onclick = function () {
      console.log(`Dot clicked: ${index + 1}`);
      currentSlide(index + 1);
    };
    dotsContainer.appendChild(dot);
  });

  carouselContainer.appendChild(dotsContainer);
}

export function showSlides(numberOfSlides) {
  const slides = document.getElementsByClassName("banner-images");
  const dots = document.getElementsByClassName("dot");

  console.log(`showSlides called with slideIndex: ${numberOfSlides}`);
  if (numberOfSlides > slides.length) {
    slideIndex = 1;
  }
  if (numberOfSlides < 1) {
    slideIndex = slides.length;
  }

  // Log slides and dots to check if they are being correctly accessed
  console.log(`Slides length: ${slides.length}, Dots length: ${dots.length}`);

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  console.log(`Displaying slide index: ${slideIndex}`);
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

export function plusSlides(numberOfSlides) {
  console.log("PlusSlides triggered");
  slideIndex += numberOfSlides; // Update slideIndex
  showSlides(slideIndex); // Show the updated slide
}

export function currentSlide(numberOfSlides) {
  console.log("CurrentSlide triggered");
  slideIndex = numberOfSlides; // Set slideIndex to the given slide number
  showSlides(slideIndex); // Show the updated slide
}

// function calls

ifLoggedIn();

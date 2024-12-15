import {
  fetchListings,
  fetchListingsArt,
  fetchListingsBooks,
  fetchListingsJewelry,
} from "../api/listings/listings";
import { createListings } from "../ui/listings/listings";
import { showLoadingSpinner, hideLoadingSpinner } from "./loadingSpinner";

let currentPage = 1;
const limit = 24;
let totalListings = 0; // Track total listings to calculate total pages
const maxPages = 16; // Maximum number of pages

// Function to update pagination buttons
function updatePaginationButtons() {
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const currentPageElement = document.getElementById("currentPage");

  // Calculate total pages with a maximum limit of 20
  const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);

  currentPageElement.textContent = `Page ${currentPage} / ${totalPages}`;
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

export async function fetchAndRenderListings() {
  showLoadingSpinner();
  try {
    const listingContainer = document.querySelector(".listings-container");

    listingContainer.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );

    // Wait for the fade-out transition to finish before clearing the content
    setTimeout(async () => {
      listingContainer.innerHTML = "";

      const response = await fetchListings(limit, currentPage);
      const listingsArray = Array.isArray(response.data) ? response.data : [];
      totalListings = response.meta.totalCount; // Update totalListings

      // Handle case if listings are empty and we're on a higher page
      if (listingsArray.length === 0 && currentPage > 1) {
        currentPage--;
        fetchAndRenderListings();
        return;
      }

      listingsArray.forEach((listing) => {
        createListings(listing);
      });

      updatePaginationButtons();

      // Fade in after content is updated
      listingContainer.classList.remove("opacity-0");
      listingContainer.classList.add("opacity-100");
    }, 300); // Match timeout with CSS transition duration
  } catch (error) {
    console.error("Error fetching and rendering listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

export async function fetchAndRenderListingsArt() {
  showLoadingSpinner();
  try {
    const listingContainer = document.querySelector(".listings-container");

    listingContainer.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );

    // Wait for the fade-out transition to finish before clearing the content
    setTimeout(async () => {
      listingContainer.innerHTML = "";

      const response = await fetchListingsArt(limit, currentPage);
      const listingsArray = Array.isArray(response.data) ? response.data : [];
      totalListings = response.meta.totalCount; // Update totalListings

      // Handle case if listings are empty and we're on a higher page
      if (listingsArray.length === 0 && currentPage > 1) {
        currentPage--;
        fetchAndRenderListingsArt();
        return;
      }

      listingsArray.forEach((listing) => {
        createListings(listing);
      });

      updatePaginationButtons();

      // Fade in after content is updated
      listingContainer.classList.remove("opacity-0");
      listingContainer.classList.add("opacity-100");
    }, 300); // Match timeout with CSS transition duration
  } catch (error) {
    console.error("Error fetching and rendering listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

export async function fetchAndRenderListingsBooks() {
  showLoadingSpinner();
  try {
    const listingContainer = document.querySelector(".listings-container");

    listingContainer.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );

    // Wait for the fade-out transition to finish before clearing the content
    setTimeout(async () => {
      listingContainer.innerHTML = "";

      const response = await fetchListingsBooks(limit, currentPage);
      const listingsArray = Array.isArray(response.data) ? response.data : [];
      totalListings = response.meta.totalCount; // Update totalListings

      // Handle case if listings are empty and we're on a higher page
      if (listingsArray.length === 0 && currentPage > 1) {
        currentPage--;
        fetchAndRenderListingsBooks();
        return;
      }

      listingsArray.forEach((listing) => {
        createListings(listing);
      });

      updatePaginationButtons();

      // Fade in after content is updated
      listingContainer.classList.remove("opacity-0");
      listingContainer.classList.add("opacity-100");
    }, 300); // Match timeout with CSS transition duration
  } catch (error) {
    console.error("Error fetching and rendering listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

export async function fetchAndRenderListingsJewelry() {
  showLoadingSpinner();
  try {
    const listingContainer = document.querySelector(".listings-container");

    listingContainer.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );

    // Wait for the fade-out transition to finish before clearing the content
    setTimeout(async () => {
      listingContainer.innerHTML = "";

      const response = await fetchListingsJewelry(limit, currentPage);
      const listingsArray = Array.isArray(response.data) ? response.data : [];
      totalListings = response.meta.totalCount; // Update totalListings

      // Handle case if listings are empty and we're on a higher page
      if (listingsArray.length === 0 && currentPage > 1) {
        currentPage--;
        fetchAndRenderListingsJewelry();
        return;
      }

      listingsArray.forEach((listing) => {
        createListings(listing);
      });

      updatePaginationButtons();

      // Fade in after content is updated
      listingContainer.classList.remove("opacity-0");
      listingContainer.classList.add("opacity-100");
    }, 300); // Match timeout with CSS transition duration
  } catch (error) {
    console.error("Error fetching and rendering listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

// Event listeners for pagination buttons
export function initializePagination() {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndRenderListings();

      // Scroll to the listings container after fetching the listings
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);
    if (currentPage < totalPages) {
      currentPage++;
      fetchAndRenderListings();

      // Scroll to the listings container after fetching the listings
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

export function initializePaginationArt() {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndRenderListingsArt();

      // Scroll to the listings container after fetching the listings
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);
    if (currentPage < totalPages) {
      currentPage++;
      fetchAndRenderListingsArt();

      // Scroll to the listings container after fetching the listings
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

export function initializePaginationBooks() {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndRenderListingsBooks();

      // Scroll to the listings container after fetching the listings
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);
    if (currentPage < totalPages) {
      currentPage++;
      fetchAndRenderListingsBooks();

      // Scroll to the listings container after fetching the listings
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

export function initializePaginationJewelry() {
  const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndRenderListingsJewelry();
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchAndRenderListingsJewelry();
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Disable pagination buttons if there's only one page
  if (totalPages === 1) {
    document.getElementById("prevPage").disabled = true;
    document.getElementById("nextPage").disabled = true;
  }
}

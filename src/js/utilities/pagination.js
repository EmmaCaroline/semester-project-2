import { fetchListings } from "../api/listings/listings";
import { createAndReadListings } from "../ui/listings/listings";

let currentPage = 1;
const limit = 24;
let totalListings = 0; // Track total listings to calculate total pages

// Function to update pagination buttons
function updatePaginationButtons() {
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const currentPageElement = document.getElementById("currentPage");

  const totalPages = Math.ceil(totalListings / limit);

  currentPageElement.textContent = `Page ${currentPage} / ${totalPages}`;
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

export async function fetchAndRenderListings() {
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
        createAndReadListings(listing);
      });

      updatePaginationButtons();

      // Fade in after content is updated
      listingContainer.classList.remove("opacity-0");
      listingContainer.classList.add("opacity-100");
    }, 300); // Match timeout with CSS transition duration
  } catch (error) {
    console.error("Error fetching and rendering listings:", error);
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
    currentPage++;
    fetchAndRenderListings();

    // Scroll to the listings container after fetching the listings
    const listingContainer = document.querySelector(".listings-container");
    listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

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
let totalListings = 0;
const maxPages = 16;

/**
 * Updates the visibility and enabled/disabled state of the pagination buttons.
 * Disables the "Previous" button if the current page is the first page,
 * and disables the "Next" button if the current page is the last page.
 * Also updates the text displaying the current page and the total pages.
 */
function updatePaginationButtons() {
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const currentPageElement = document.getElementById("currentPage");

  const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);

  currentPageElement.textContent = `Page ${currentPage} / ${totalPages}`;
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

/**
 * Fetches listings from the server and renders them to the page.
 * It displays a loading spinner during the fetching process and handles page transitions smoothly.
 * If there are no listings on the current page, it will adjust the page and retry fetching.
 * After fetching the listings, it calls `createListings` for each listing and updates the pagination buttons.
 *
 * @async
 * @throws {Error} If there is an issue with fetching the listings or rendering the page.
 */
export async function fetchAndRenderListings() {
  showLoadingSpinner();
  try {
    const listingContainer = document.querySelector(".listings-container");

    listingContainer.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );

    setTimeout(async () => {
      listingContainer.innerHTML = "";

      const response = await fetchListings(limit, currentPage);
      const listingsArray = Array.isArray(response.data) ? response.data : [];
      totalListings = response.meta.totalCount;

      if (listingsArray.length === 0 && currentPage > 1) {
        currentPage--;
        fetchAndRenderListings();
        return;
      }

      listingsArray.forEach((listing) => {
        createListings(listing);
      });

      updatePaginationButtons();

      listingContainer.classList.remove("opacity-0");
      listingContainer.classList.add("opacity-100");
    }, 300);
  } catch (error) {
    console.error("Error fetching and rendering listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches listings with tag 'art' from the server and renders them to the page.
 * It displays a loading spinner during the fetching process and handles page transitions smoothly.
 * If there are no art listings on the current page, it will adjust the page and retry fetching.
 * After fetching the listings, it calls `createListings` for each listing and updates the pagination buttons.
 *
 * @async
 * @throws {Error} If there is an issue with fetching the listings or rendering the page.
 */

export async function fetchAndRenderListingsArt() {
  showLoadingSpinner();
  try {
    const listingContainer = document.querySelector(".listings-container");

    listingContainer.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );

    setTimeout(async () => {
      listingContainer.innerHTML = "";

      const response = await fetchListingsArt(limit, currentPage);
      const listingsArray = Array.isArray(response.data) ? response.data : [];
      totalListings = response.meta.totalCount;

      if (listingsArray.length === 0 && currentPage > 1) {
        currentPage--;
        fetchAndRenderListingsArt();
        return;
      }

      listingsArray.forEach((listing) => {
        createListings(listing);
      });

      updatePaginationButtons();

      listingContainer.classList.remove("opacity-0");
      listingContainer.classList.add("opacity-100");
    }, 300);
  } catch (error) {
    console.error("Error fetching and rendering listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches listings with tag 'books' from the server and renders them to the page.
 * It displays a loading spinner during the fetching process and handles page transitions smoothly.
 * If there are no art listings on the current page, it will adjust the page and retry fetching.
 * After fetching the listings, it calls `createListings` for each listing and updates the pagination buttons.
 *
 * @async
 * @throws {Error} If there is an issue with fetching the listings or rendering the page.
 */
export async function fetchAndRenderListingsBooks() {
  showLoadingSpinner();
  try {
    const listingContainer = document.querySelector(".listings-container");

    listingContainer.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );

    setTimeout(async () => {
      listingContainer.innerHTML = "";

      const response = await fetchListingsBooks(limit, currentPage);
      const listingsArray = Array.isArray(response.data) ? response.data : [];
      totalListings = response.meta.totalCount;

      if (listingsArray.length === 0 && currentPage > 1) {
        currentPage--;
        fetchAndRenderListingsBooks();
        return;
      }

      listingsArray.forEach((listing) => {
        createListings(listing);
      });

      updatePaginationButtons();

      listingContainer.classList.remove("opacity-0");
      listingContainer.classList.add("opacity-100");
    }, 300);
  } catch (error) {
    console.error("Error fetching and rendering listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches listings with tag 'jewelry' from the server and renders them to the page.
 * It displays a loading spinner during the fetching process and handles page transitions smoothly.
 * If there are no art listings on the current page, it will adjust the page and retry fetching.
 * After fetching the listings, it calls `createListings` for each listing and updates the pagination buttons.
 *
 * @async
 * @throws {Error} If there is an issue with fetching the listings or rendering the page.
 */
export async function fetchAndRenderListingsJewelry() {
  showLoadingSpinner();
  try {
    const listingContainer = document.querySelector(".listings-container");

    listingContainer.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-300",
    );

    setTimeout(async () => {
      listingContainer.innerHTML = "";

      const response = await fetchListingsJewelry(limit, currentPage);
      const listingsArray = Array.isArray(response.data) ? response.data : [];
      totalListings = response.meta.totalCount;

      if (listingsArray.length === 0 && currentPage > 1) {
        currentPage--;
        fetchAndRenderListingsJewelry();
        return;
      }

      listingsArray.forEach((listing) => {
        createListings(listing);
      });

      updatePaginationButtons();

      listingContainer.classList.remove("opacity-0");
      listingContainer.classList.add("opacity-100");
    }, 300);
  } catch (error) {
    console.error("Error fetching and rendering listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Initializes the pagination functionality for the listings page and the collection pages.
 * Adds event listeners to the 'Previous' and 'Next' page buttons to update the `currentPage`
 * and fetch/render listings accordingly. The page will scroll smoothly to the listings container
 * after each page change.
 *
 * @function
 * @throws {Error} If there is an issue with selecting the pagination buttons or the listings container.
 */
export function initializePagination() {
  const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      if (window.location.pathname === "/") {
        fetchAndRenderListings();
      } else if (window.location.pathname === "/collections/art") {
        fetchAndRenderListingsArt();
      } else if (window.location.pathname === "/collections/books") {
        fetchAndRenderListingsBooks();
      } else if (window.location.pathname === "/collections/jewelry") {
        fetchAndRenderListingsJewelry();
      }

      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);
    if (currentPage < totalPages) {
      currentPage++;
      fetchAndRenderListings();

      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  if (totalPages === 1) {
    document.getElementById("prevPage").disabled = true;
    document.getElementById("nextPage").disabled = true;
  }
}

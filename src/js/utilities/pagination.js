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

function updatePaginationButtons() {
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const currentPageElement = document.getElementById("currentPage");

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

export function initializePagination() {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndRenderListings();

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
}

export function initializePaginationArt() {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndRenderListingsArt();

      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);
    if (currentPage < totalPages) {
      currentPage++;
      fetchAndRenderListingsArt();

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

      const listingContainer = document.querySelector(".listings-container");
      listingContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.min(Math.ceil(totalListings / limit), maxPages);
    if (currentPage < totalPages) {
      currentPage++;
      fetchAndRenderListingsBooks();

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

  if (totalPages === 1) {
    document.getElementById("prevPage").disabled = true;
    document.getElementById("nextPage").disabled = true;
  }
}

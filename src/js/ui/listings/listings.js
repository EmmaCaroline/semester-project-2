import {
  fetchListings,
  fetchListingsArt,
  fetchListingsBooks,
  fetchListingsJewelry,
  fetchListingsByProfile,
} from "../../api/listings/listings";
import { save } from "../../api/auth/key";
import defaultImage from "../../../../images/No_Image_Available.jpg";
import { load } from "../../api/auth/key";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Extract parts of the date
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

export async function createAndReadListings(listing) {
  const listingElement = document.createElement("a");
  if (!listingElement) {
    console.error("Failed to create listing container for:", listing);
    return null; // Return null if something goes wrong
  }
  listingElement.setAttribute("aria-label", "View listing");
  listingElement.classList.add(
    "border",
    "border-2",
    "rounded",
    "border-bg-#92A6B4",
    "shadow-lg",
    "flex",
    "flex-col",
    "transition",
    "duration-300",
    "ease-linear",
    "group",
  );

  const sellerAndBidCount = document.createElement("div");
  sellerAndBidCount.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "py-2",
    "px-2",
  );

  const seller = document.createElement("div");
  seller.classList.add("flex", "items-center");
  const sellerName = document.createElement("p");
  sellerName.classList.add("text-sm", "font-body", "md:text-base");
  sellerName.textContent = listing.seller.name;

  const sellerAvatar = document.createElement("img");
  sellerAvatar.classList.add("w-8", "h-8", "rounded-full", "mr-2");
  if (listing.seller?.avatar) {
    sellerAvatar.src = listing.seller.avatar.url;
    sellerAvatar.alt = listing.seller.avatar.alt;
  } else {
    sellerAvatar.src = "../../../../images/default-avatar.jpg";
    sellerAvatar.alt = "Default avatar image";
  }

  seller.append(sellerAvatar, sellerName);

  const bidCount = document.createElement("p");
  bidCount.classList.add("text-sm", "font-body", "md:text-base");
  bidCount.textContent = "Bids: " + listing._count.bids;
  sellerAndBidCount.append(seller, bidCount);

  const endingDate = document.createElement("p");
  endingDate.classList.add(
    "py-2",
    "px-2",
    "text-sm",
    "font-body",
    "md:text-base",
  );

  // Get the current date and the auction's end date
  const currentDate = new Date();
  const endDate = new Date(listing.endsAt);

  // Check if the auction has ended
  if (endDate > currentDate) {
    // Auction is still active
    const redText = document.createElement("span");
    redText.classList.add(
      "text-red-600",
      "text-sm",
      "font-body",
      "md:text-base",
      "font-medium",
    );
    redText.textContent = formatDate(listing.endsAt);

    // Append the black text and the red text to the `p` element
    endingDate.textContent = "Ends at: ";
    endingDate.appendChild(redText);
  } else {
    // Auction has ended
    endingDate.textContent = "Auction ended";
    endingDate.classList.add(
      "text-gray-500",
      "italic",
      "text-sm",
      "font-body",
      "md:text-base",
    );
  }

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("aspect-square", "overflow-hidden", "mb-3");

  const listingImage = document.createElement("img");
  listingImage.classList.add(
    "object-cover",
    "object-center",
    "aspect-square",
    "w-full",
    "cursor-pointer",
    "transition",
    "duration-300",
    "ease-linear",
    "group-hover:scale-105",
  );
  if (listing.media?.[0]) {
    listingImage.src = listing.media[0].url;
    listingImage.alt = listing.media[0].alt;
  } else {
    listingImage.src = defaultImage;
    console.log("defaultImage: ", defaultImage);
    listingImage.alt = "No image available";
  }

  imageContainer.appendChild(listingImage);

  // Function to handle the click event
  const imageClick = () => {
    save("postID", JSON.stringify(listing.id));
    window.location.href = "/listing/listing.html";
  };

  // Make the image clickable
  listingImage.addEventListener("click", imageClick);

  const listingTitle = document.createElement("h2");
  listingTitle.textContent = listing.title || "Untitled";
  //console.log("Listing title:", listingTitle.textContent);
  listingTitle.classList.add(
    "font-heading",
    "text-xl",
    "truncate",
    "dark:text-gray-100",
    "pb-4",
    "px-2",
  );

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flex", "justify-center", "mb-4");

  const listingsButton = document.createElement("button");
  listingsButton.classList.add(
    "w-auto",
    "font-body",
    "text-sm",
    "py-1.5",
    "px-8",
    "rounded-lg",
    "md:text-base",
    "bg-customGray",
    "text-white",
    "hover:bg-gray-400",
  );
  listingsButton.textContent = "View items";
  buttonContainer.appendChild(listingsButton);

  listingElement.append(
    sellerAndBidCount,
    endingDate,
    imageContainer,
    listingTitle,
    buttonContainer,
  );

  const listingContainer = document.querySelector(".listings-container");
  listingContainer.appendChild(listingElement);

  return listingContainer;
}

function handleSearch(searchInput, listingsArray) {
  const searchQuery = searchInput.value.toLowerCase();
  const filteredListings = listingsArray.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery),
  );

  // Clear existing listings
  const listingContainer = document.querySelector(".listings-container");
  listingContainer.innerHTML = "";

  // Re-render filtered listings
  filteredListings.forEach((listing) => createAndReadListings(listing));
}

function handleSort(sortSelect) {
  const selectedSort = sortSelect.value;
  let sortParam = "created"; // Default sort parameter: sort by creation date
  let sortOrder = "desc"; // Default sort order: descending
  let active = false; // Default to include all listings

  if (selectedSort === "newest") {
    sortParam = "created";
    sortOrder = "desc"; // Sort by newest (descending order)
  } else if (selectedSort === "oldest") {
    sortParam = "created";
    sortOrder = "asc"; // Sort by oldest (ascending order)
  } else if (selectedSort === "ending-soon") {
    sortParam = "endsAt";
    sortOrder = "asc"; // Sort by ending soon (ascending order)
    active = true; // Filter for active listings only
  }

  fetchListings(undefined, undefined, undefined, sortParam, sortOrder, active)
    .then((response) => response.data)
    .then((listings) => {
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.innerHTML = "";
      listings.forEach((listing) => createAndReadListings(listing));
    })
    .catch((error) => console.error("Error fetching listings:", error));
}

export async function onReadAllListings() {
  showLoadingSpinner();
  try {
    // Fetch listings from the API
    const response = await fetchListings();

    // Access the listings data inside the 'data' property
    const listingsArray = Array.isArray(response.data) ? response.data : [];

    // Check if the array is empty
    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    if (window.location.pathname === "/") {
      window.listingsArray = listingsArray;

      const searchInput = document.getElementById("search-input");
      const sortSelect = document.getElementById("sort-select");

      searchInput.addEventListener("keyup", () =>
        handleSearch(searchInput, listingsArray),
      );
      sortSelect.addEventListener("change", () =>
        handleSort(sortSelect, listingsArray),
      );
    }

    // Loop through the listings and create a listing for each one
    listingsArray.forEach((listing) => {
      createAndReadListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

export async function onReadAllListingsArt() {
  showLoadingSpinner();
  try {
    // Fetch listings from the API
    const response = await fetchListingsArt();

    // Access the listings data inside the 'data' property
    const listingsArray = Array.isArray(response.data) ? response.data : [];

    // Check if the array is empty
    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    // Loop through the listings and create a listing for each one
    listingsArray.forEach((listing) => {
      createAndReadListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

export async function onReadAllListingsBooks() {
  showLoadingSpinner();
  try {
    // Fetch listings from the API
    const response = await fetchListingsBooks();

    // Access the listings data inside the 'data' property
    const listingsArray = Array.isArray(response.data) ? response.data : [];

    // Check if the array is empty
    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    // Loop through the listings and create a listing for each one
    listingsArray.forEach((listing) => {
      createAndReadListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

export async function onReadAllListingsJewelry() {
  showLoadingSpinner();
  try {
    // Fetch listings from the API
    const response = await fetchListingsJewelry();

    // Access the listings data inside the 'data' property
    const listingsArray = Array.isArray(response.data) ? response.data : [];

    // Check if the array is empty
    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    // Loop through the listings and create a listing for each one
    listingsArray.forEach((listing) => {
      createAndReadListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

export async function onReadListingsByProfile() {
  const user = load("user");
  const userName = user.name;
  showLoadingSpinner();
  try {
    // Fetch listings from the API
    const response = await fetchListingsByProfile(userName);

    // Access the listings data inside the 'data' property
    const listingsArray = Array.isArray(response.data) ? response.data : [];

    // Check if the array is empty
    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    // Loop through the listings and create a listing for each one
    listingsArray.forEach((listing) => {
      createAndReadListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}
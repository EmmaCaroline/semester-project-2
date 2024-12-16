import {
  fetchListings,
  fetchSingleListing,
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
import { onDeletePost } from "./delete";
import { onEditButton } from "./update";
import { createBidSection } from "./bid";

/**
 * Formats a given ISO date string into a more human-readable format.
 * The format will be: "DD MMM YYYY, HH:MM", where:
 * - DD: Day of the month (2 digits)
 * - MMM: Abbreviated month name (e.g., Jan, Feb, etc.)
 * - YYYY: Full year
 * - HH: Hour (2 digits, 24-hour format)
 * - MM: Minute (2 digits)
 *
 * @param {string} isoDate The ISO date string to format (e.g., "2024-12-16T14:30:00Z").
 * @returns {string} The formatted date string (e.g., "16 Dec 2024, 14:30").
 */
export function formatDate(isoDate) {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}
/**
 * Creates and renders a listing element in the DOM with the provided listing data.
 * The element includes seller information, bid count, auction ending date, an image,
 * a title, and a button that links to the single listing page.
 *
 * @param {Object} listing The listing object containing the data to render.
 * @param {Object} listing.seller The seller information.
 * @param {string} listing.seller.name The name of the seller.
 * @param {Object} [listing.seller.avatar] The seller's avatar image (optional).
 * @param {string} listing.seller.avatar.url The URL of the avatar image.
 * @param {string} listing.seller.avatar.alt The alt text for the avatar image.
 * @param {Object} listing._count The count of bids for the listing.
 * @param {number} listing._count.bids The number of bids on the listing.
 * @param {string} listing.endsAt The ISO string representing the auction's end date.
 * @param {Array} listing.media The media associated with the listing.
 * @param {Object} listing.media[0] The first media item.
 * @param {string} listing.media[0].url The URL of the media image.
 * @param {string} listing.media[0].alt The alt text for the media image.
 * @param {string} listing.title The title of the listing.
 *
 * @returns {HTMLElement|null} The parent container element (`listingContainer`)
 * where the new listing has been appended, or `null` if creation fails.
 */
export async function createListings(listing) {
  const listingElement = document.createElement("a");
  if (!listingElement) {
    console.error("Failed to create listing container for:", listing);
    return null;
  }
  listingElement.setAttribute("aria-label", "View listing");
  listingElement.classList.add(
    "border",
    "border-2",
    "rounded",
    "border-bg-#92A6B4",
    "dark:border-gray-800",
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
    "dark:text-gray-300",
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
    sellerAvatar.src = "";
    sellerAvatar.alt = "";
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
    "dark:text-gray-300",
  );

  const currentDate = new Date();
  const endDate = new Date(listing.endsAt);

  if (endDate > currentDate) {
    const redText = document.createElement("span");
    redText.classList.add(
      "text-red-600",
      "text-sm",
      "font-body",
      "md:text-base",
      "font-medium",
    );
    redText.textContent = formatDate(listing.endsAt);

    endingDate.textContent = "Ends at: ";
    endingDate.appendChild(redText);
  } else {
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
    listingImage.alt = "No image available";
  }

  imageContainer.appendChild(listingImage);

  const linkClick = () => {
    save("listingID", listing.id);
    window.location.href = "/listing/listing/";
  };

  listingImage.addEventListener("click", linkClick);

  const listingTitle = document.createElement("h2");
  listingTitle.textContent = listing.title || "Untitled";

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

  buttonContainer.addEventListener("click", linkClick);

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

/**
 * Handles the search functionality on the homepage, filtering listings based on the search input.
 *
 * @function handleSearch
 * @param {HTMLInputElement} searchInput The search input element where the user enters the query.
 * @param {Array<Object>} listingsArray The array of listings to filter based on the search query.
 */
function handleSearch(searchInput, listingsArray) {
  const searchQuery = searchInput.value.toLowerCase();
  const filteredListings = listingsArray.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery),
  );

  const listingContainer = document.querySelector(".listings-container");
  listingContainer.innerHTML = "";

  filteredListings.forEach((listing) => createListings(listing));
}

/**
 * Handles the sorting functionality for the listings based on the selected sort option.
 *
 * @function handleSort
 * @param {HTMLSelectElement} sortSelect The select element where the user chooses the sorting option.
 */
function handleSort(sortSelect) {
  const selectedSort = sortSelect.value;
  let sortParam = "created";
  let sortOrder = "desc";
  let active = false;

  if (selectedSort === "newest") {
    sortParam = "created";
    sortOrder = "desc";
  } else if (selectedSort === "oldest") {
    sortParam = "created";
    sortOrder = "asc";
  } else if (selectedSort === "ending-soon") {
    sortParam = "endsAt";
    sortOrder = "asc";
    active = true;
  }

  fetchListings(undefined, undefined, undefined, sortParam, sortOrder, active)
    .then((response) => response.data)
    .then((listings) => {
      const listingContainer = document.querySelector(".listings-container");
      listingContainer.innerHTML = "";
      listings.forEach((listing) => createListings(listing));
    })
    .catch((error) => console.error("Error fetching listings:", error));
}

/**
 * Creates and displays a detailed view of a single listing on the page.
 * This includes a carousel for images, seller information, bid count,
 * description, and an edit button if the user is authorized to edit the post.
 *
 * @param {Object} listing - The listing data object.
 * @param {Object} listing.data - The actual listing data.
 * @param {Object[]} listing.data.media - An array of media objects for the listing.
 * @param {string} listing.data.media.url - The URL of the media item.
 * @param {string} listing.data.media.alt - The alt text for the media item.
 * @param {Object} listing.data.seller - The seller's information.
 * @param {string} listing.data.seller.name - The name of the seller.
 * @param {Object} listing.data.seller.avatar - The seller's avatar information.
 * @param {string} listing.data.seller.avatar.url - The URL of the seller's avatar.
 * @param {string} listing.data.seller.avatar.alt - The alt text for the seller's avatar.
 * @param {Object} listing.data._count - A count of the associated bids.
 * @param {number} listing.data._count.bids - The number of bids placed on the listing.
 * @param {string} listing.data.title - The title of the listing.
 * @param {string} listing.data.created - The ISO date string of when the listing was created.
 * @param {string} listing.data.description - The description of the listing.
 * @returns {HTMLElement} The single listing container element containing the detailed view.
 */
export async function createSingleListing(listing) {
  const singleListingContainer = document.querySelector(
    ".single-listing-container",
  );

  const listingContainer = document.createElement("div");
  listingContainer.classList.add(
    "flex",
    "flex-col",
    "sm:flex-row",
    "sm:w-full",
    "overflow-hidden",
  );

  const imageCarousel = document.createElement("div");
  imageCarousel.classList.add(
    "w-full",
    "md:w-1/2",
    "h-80",
    "lg:h-[450px]",
    "overflow-hidden",
    "relative",
  );

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("flex", "transition-transform", "duration-500");

  const mediaArray =
    listing.data.media && listing.data.media.length > 0
      ? listing.data.media
      : [{ url: defaultImage, alt: "No image available" }];

  mediaArray.forEach((mediaItem) => {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("flex-shrink-0", "w-full");

    const listingImage = document.createElement("img");
    listingImage.classList.add(
      "object-cover",
      "object-center",
      "aspect-square",
      "sm:aspect-4/3",
      "w-full",
    );

    listingImage.src = mediaItem.url;
    listingImage.alt = mediaItem.alt;

    imageDiv.appendChild(listingImage);
    carouselInner.appendChild(imageDiv);
  });

  const prevButton = document.createElement("button");
  prevButton.classList.add(
    "prev-btn",
    "absolute",
    "top-1/2",
    "left-3",
    "transform",
    "translate-y-[-50%]",
    "bg-black",
    "text-white",
    "px-2",
    "py-2",
    "rounded",
    "bg-opacity-60",
  );
  const prevButtonIcon = document.createElement("i");
  prevButtonIcon.classList.add("fa-solid", "fa-arrow-left");
  prevButton.appendChild(prevButtonIcon);

  const nextButton = document.createElement("button");
  nextButton.classList.add(
    "next-btn",
    "absolute",
    "top-1/2",
    "right-3",
    "transform",
    "translate-y-[-50%]",
    "bg-black",
    "text-white",
    "px-2",
    "py-2",
    "rounded",
    "bg-opacity-60",
  );
  const nextButtonIcon = document.createElement("i");
  nextButtonIcon.classList.add("fa-solid", "fa-arrow-right");
  nextButton.appendChild(nextButtonIcon);

  imageCarousel.appendChild(carouselInner);
  imageCarousel.appendChild(prevButton);
  imageCarousel.appendChild(nextButton);

  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + mediaArray.length) % mediaArray.length;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % mediaArray.length;
    updateCarousel();
  });

  const listingInfo = document.createElement("div");
  listingInfo.classList.add(
    "w-full",
    "md:w-1/2",
    "sm:p-4",
    "ml-8",
    "sm:ml-1",
    "mt-4",
    "sm:mt-0",
    "dark:text-gray-300",
  );

  const listingTitle = document.createElement("h2");
  listingTitle.classList.add(
    "font-heading",
    "text-3xl",
    "lg:text-4xl",
    "font-bold",
    "mb-4",
    "mr-8",
    "lg:mr-20",
  );
  listingTitle.textContent = listing.data.title;

  const sellerAndBids = document.createElement("div");
  sellerAndBids.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "mr-14",
    "sm:mr-8",
  );

  const seller = document.createElement("div");
  seller.classList.add("flex", "items-center", "mb-4");
  const sellerName = document.createElement("p");
  sellerName.classList.add("font-body", "text-sm", "md:text-base");
  sellerName.textContent = listing.data.seller.name;

  const sellerAvatar = document.createElement("img");
  sellerAvatar.classList.add("w-8", "h-8", "rounded-full", "mr-2");
  if (listing.data.seller?.avatar) {
    sellerAvatar.src = listing.data.seller.avatar.url;
    sellerAvatar.alt = listing.data.seller.avatar.alt;
  } else {
    sellerAvatar.src = "";
    sellerAvatar.alt = "";
  }

  seller.append(sellerAvatar, sellerName);

  const bids = document.createElement("p");
  bids.classList.add("mb-4", "font-body", "text-sm", "md:text-base");
  bids.textContent = "Bids: " + listing.data._count.bids;

  sellerAndBids.append(seller, bids);

  const created = document.createElement("p");
  created.classList.add(
    "text-sm",
    "font-body",
    "md:text-base",
    "mb-4",
    "text-gray-600",
  );
  created.textContent = "Listed: " + formatDate(listing.data.created);

  const description = document.createElement("p");
  description.classList.add(
    "font-body",
    "text-sm",
    "md:text-base",
    "mr-8",
    "lg:mr-20",
  );
  description.textContent = listing.data.description;

  listingInfo.append(listingTitle, sellerAndBids, created, description);

  listingContainer.append(imageCarousel, listingInfo);

  let editButton = document.getElementById("edit-listing-button-container");
  if (!editButton) {
    editButton = document.createElement("button");
    editButton.id = "edit-listing-button-container";
    editButton.classList.add(
      "btn",
      "btn-primary",
      "my-4",
      "dark:text-gray-200",
      "dark:border-gray-400",
    );
    editButton.style.display = "none";
    editButton.innerText = "Edit Post";
  }

  const listingData = listing.data;
  const author = listingData.seller.name;
  onEditButton(listingData, author);

  singleListingContainer.append(listingContainer, editButton);

  return singleListingContainer;
}

/**
 * Fetches and displays all listings from the general listings API.
 * If on the homepage, sets up search and sort functionality for listings.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function onReadAllListings() {
  showLoadingSpinner();
  try {
    const response = await fetchListings();

    const listingsArray = Array.isArray(response.data) ? response.data : [];

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

    listingsArray.forEach((listing) => {
      createListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches and displays all art-related listings from the API.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function onReadAllListingsArt() {
  showLoadingSpinner();
  try {
    const response = await fetchListingsArt();

    const listingsArray = Array.isArray(response.data) ? response.data : [];

    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    listingsArray.forEach((listing) => {
      createListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches and displays all book-related listings from the API.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function onReadAllListingsBooks() {
  showLoadingSpinner();
  try {
    const response = await fetchListingsBooks();

    const listingsArray = Array.isArray(response.data) ? response.data : [];

    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    listingsArray.forEach((listing) => {
      createListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches and displays all jewelry-related listings from the API.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function onReadAllListingsJewelry() {
  showLoadingSpinner();
  try {
    const response = await fetchListingsJewelry();

    const listingsArray = Array.isArray(response.data) ? response.data : [];

    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    listingsArray.forEach((listing) => {
      createListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches and displays a single listing based on the ID stored in localStorage.
 * Displays the listing details and provides options for deleting or editing the post.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function onReadSingleListing() {
  const listingID = localStorage.getItem("listingID");

  if (!listingID) {
    console.error("No listing ID found in localStorage");
    return;
  }

  try {
    const parsedID = JSON.parse(listingID);
    if (typeof parsedID !== "string") {
      throw new Error("Invalid listing ID");
    }

    try {
      console.log("Attempting to fetch and create listing...");
      showLoadingSpinner();
      const singleListing = await fetchSingleListing(parsedID);

      const listing = singleListing.data;
      const author = listing.seller.name;
      onDeletePost(listing, author);
      onEditButton(listing, author);

      await createSingleListing(singleListing);

      const token = localStorage.getItem("token");

      const singleListingContainer = document.querySelector(
        ".single-listing-container",
      );

      if (token) {
        const bidSection = createBidSection(listing);

        if (bidSection instanceof Node) {
          const singleListingContainer = document.querySelector(
            ".single-listing-container",
          );
          singleListingContainer.appendChild(bidSection);
        } else {
          console.error("Failed to create a valid bid section.");
        }
      } else {
        const loginMessage = document.createElement("p");
        loginMessage.classList.add(
          "font-body",
          "text-sm",
          "md:text-base",
          "text-center",
          "mt-4",
        );
        loginMessage.textContent =
          "Please log in to view more info about this listing and to place a bid.";
        singleListingContainer.appendChild(loginMessage);
      }
    } catch (error) {
      console.error("Error reading single listing: ", error);
    } finally {
      hideLoadingSpinner();
    }
  } catch (error) {
    console.error("Error parsing listing ID:", error);
  }
}

/**
 * Fetches and displays the listings for the logged-in user's profile.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function onReadListingsByProfile() {
  const user = load("user");
  const userName = user.name;
  showLoadingSpinner();
  try {
    const response = await fetchListingsByProfile(userName);

    const listingsArray = Array.isArray(response.data) ? response.data : [];

    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    listingsArray.forEach((listing) => {
      createListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

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
import defaultAvatar from "../../../../images/default-avatar.jpg";
import { load } from "../../api/auth/key";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { onDeletePost } from "./delete";
import { onEditButton } from "./update";

function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Extract parts of the date
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Normalize the URL check to avoid issues with trailing slashes
  const pathname = window.location.pathname.replace(/\/$/, "");

  if (pathname === "/listing/listing.html") {
    return `${day} ${month} ${year}`;
  } else {
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  }
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
    sellerAvatar.src = defaultAvatar;
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
    listingImage.alt = "No image available";
  }

  imageContainer.appendChild(listingImage);

  // Function to handle the click event
  const imageClick = () => {
    save("listingID", listing.id);
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

export async function createAndReadSingleListing(listing) {
  const singleListingContainer = document.querySelector(
    ".single-listing-container",
  );

  const listingContainer = document.createElement("div");
  listingContainer.classList.add(
    "flex",
    "flex-col",
    "sm:flex-row",
    "sm:w-full",
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

    // Set the image source and alt text based on media item
    listingImage.src = mediaItem.url;
    listingImage.alt = mediaItem.alt;

    // Append the image to the carousel container
    imageDiv.appendChild(listingImage);
    carouselInner.appendChild(imageDiv);
  });

  // Carousel navigation buttons
  const prevButton = document.createElement("button");
  prevButton.classList.add(
    "prev-btn",
    "absolute",
    "top-1/2",
    "left-0",
    "transform",
    "translate-y-[-50%]",
    "bg-black",
    "text-white",
    "px-4",
    "py-2",
  );
  prevButton.innerHTML = "←";

  const nextButton = document.createElement("button");
  nextButton.classList.add(
    "next-btn",
    "absolute",
    "top-1/2",
    "right-0",
    "transform",
    "translate-y-[-50%]",
    "bg-black",
    "text-white",
    "px-4",
    "py-2",
  );
  nextButton.innerHTML = "→";

  imageCarousel.appendChild(carouselInner);
  imageCarousel.appendChild(prevButton);
  imageCarousel.appendChild(nextButton);

  let currentIndex = 0; // Start at the first image

  // Function to update carousel position
  function updateCarousel() {
    const offset = -currentIndex * 100; // Move the carousel by the width of one image (100% of the container width)
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  // Event listeners to buttons
  prevButton.addEventListener("click", () => {
    // Move to the previous image, or loop to the last image
    currentIndex = (currentIndex - 1 + mediaArray.length) % mediaArray.length;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    // Move to the next image, or loop to the first image
    currentIndex = (currentIndex + 1) % mediaArray.length;
    updateCarousel();
  });

  const listingInfo = document.createElement("div");
  listingInfo.classList.add("w-full", "md:w-1/2", "p-4");

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
    sellerAvatar.src = defaultAvatar;
    sellerAvatar.alt = "Default avatar image";
  }

  seller.append(sellerAvatar, sellerName);

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

  listingInfo.append(listingTitle, seller, created, description);

  // Append both the image carousel and listing info to the main container
  listingContainer.append(imageCarousel, listingInfo);

  // Ensure the edit button exists and append it
  let editButton = document.getElementById("edit-listing-button-container");
  if (!editButton) {
    // Create the edit button dynamically
    editButton = document.createElement("button");
    editButton.id = "edit-listing-button-container";
    editButton.classList.add(
      "btn",
      "btn-primary",
      "my-4",
      "dark:text-gray-200",
      "dark:border-gray-400",
    );
    editButton.style.display = "none"; // Hidden by default
    editButton.innerText = "Edit Post";
  }

  // Ensure the button is visible for the author
  const post = listing.data;
  const author = post.seller.name; // Assuming the seller is the author
  onEditButton(post, author);

  // Append the edit button and listing container to the single listing container
  singleListingContainer.append(listingContainer, editButton);

  return singleListingContainer;
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

export async function onReadSingleListing() {
  const listingID = JSON.parse(localStorage.getItem("listingID"));

  if (!listingID || typeof listingID !== "string") {
    console.error("Invalid post ID:", listingID);
    return;
  }

  console.log("Listing ID:", listingID);

  try {
    console.log("Attempting to fetch and create listing...");
    showLoadingSpinner();
    const singleListing = await fetchSingleListing(listingID);
    console.log("Fetched single listing:", singleListing);

    const post = singleListing.data;
    const author = post.seller.name;
    onDeletePost(post, author);
    onEditButton(post, author);

    await createAndReadSingleListing(singleListing);
  } catch (error) {
    console.error("Error reading single post: ", error);
  } finally {
    hideLoadingSpinner();
  }
}

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
      createAndReadListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

import { fetchListings } from "../../api/listings/listings";
import { save } from "../../api/auth/key";
import defaultImage from "../../../../images/No_Image_Available.jpg";

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
  //console.log("Processing listing:", listing);

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
  //console.log("Seller name:", sellerName.textContent);

  const sellerAvatar = document.createElement("img");
  sellerAvatar.classList.add("w-8", "h-8", "rounded-full", "mr-2");
  if (listing.seller?.avatar) {
    sellerAvatar.src = listing.seller.avatar.url;
    sellerAvatar.alt = listing.seller.avatar.alt;
  } else {
    sellerAvatar.src = "../../../../images/default-avatar.jpg";
    sellerAvatar.alt = "Default avatar image";
  }
  //console.log("Seller avatar:", sellerAvatar.src);

  seller.append(sellerAvatar, sellerName);

  const bidCount = document.createElement("p");
  bidCount.classList.add("text-sm", "font-body", "md:text-base");
  bidCount.textContent = "Bids: " + listing._count.bids;
  //console.log("Bid count:", bidCount.textContent);
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
  );
  listingsButton.textContent = "View items";
  buttonContainer.appendChild(listingsButton);

  //console.log("Assembling listing container...");
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

export async function onReadAllListings() {
  try {
    // Fetch listings from the API
    const response = await fetchListings();
    console.log("Raw API Response:", response);

    // Access the listings data inside the 'data' property
    const listingsArray = Array.isArray(response.data) ? response.data : [];
    //console.log("Processed Listings Array:", listingsArray);

    // Check if the array is empty
    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    // Loop through the listings and create the HTML for each one
    listingsArray.forEach((listing) => {
      //console.log("Processing Listing:", listing);
      createAndReadListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  }
}

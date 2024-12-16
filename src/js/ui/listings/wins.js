import { readWins } from "../../api/profile/wins";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { formatDate } from "../../ui/listings/listings";
import defaultImage from "../../../../images/No_Image_Available.jpg";
import { save, load } from "../../api/auth/key";

export async function createWins(listing) {
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
    window.location.href = "./listing/listing.html";
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

  const listingContainer = document.querySelector(".wins-container");
  listingContainer.appendChild(listingElement);

  return listingContainer;
}

export async function onReadAllWins() {
  showLoadingSpinner();
  try {
    showLoadingSpinner();
    const profile = load("user");
    if (!profile || !profile.name) {
      console.error("User is not logged in or user object is invalid");
      return;
    }

    const username = profile.name;

    const listingsArray = await readWins(username);

    if (!listingsArray || listingsArray.length === 0) {
      console.warn("No wins found for user:", username);
      return;
    }

    listingsArray.forEach((listing) => {
      createWins(listing);
    });
  } catch (error) {
    console.error("Error reading wins:", error);
  } finally {
    hideLoadingSpinner();
  }
}

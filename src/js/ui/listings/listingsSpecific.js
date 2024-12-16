import { fetchListingsSpecific } from "../../api/listings/listings";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

function createSpecificListings(listing) {
  const targetContainer = document.querySelector(".diamond-image-container");

  const wrapperDiv = document.createElement("div");
  wrapperDiv.id = "diamond-image-container";
  wrapperDiv.classList.add(
    "flex",
    "flex-col",
    "md:flex-row",
    "md:justify-center",
    "md:items-center",
  );

  if (Array.isArray(listing) && listing.length >= 3) {
    const firstImageLink = document.createElement("a");
    firstImageLink.id = "post-link1";
    firstImageLink.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "md:mr-24",
      "cursor-pointer",
    );

    const firstImageDiv = document.createElement("div");
    firstImageDiv.classList.add(
      "relative",
      "w-[100px]",
      "h-[100px]",
      "md:w-[150px]",
      "md:h-[150px]",
      "lg:w-[180px]",
      "lg:h-[180px]",
      "overflow-hidden",
      "rotate-45",
      "transition",
      "duration-300",
      "ease-linear",
      "group",
    );

    const firstImage = document.createElement("img");
    const firstPost = listing[0];
    const firstImageData = firstPost.media[0];
    firstImage.src = firstImageData ? firstImageData.url : "default-image.jpg";
    firstImage.alt = firstImageData ? firstImageData.alt : "Default Image";
    firstImage.classList.add(
      "w-full",
      "h-full",
      "object-cover",
      "-rotate-45",
      "transition",
      "duration-300",
      "ease-linear",
      "group-hover:scale-105",
    );

    firstImageDiv.appendChild(firstImage);
    firstImageLink.appendChild(firstImageDiv);

    const firstImageText = document.createElement("p");
    firstImageText.classList.add(
      "mt-2",
      "text-center",
      "text-sm",
      "md:text-base",
      "dark:text-gray-300",
    );
    firstImageText.textContent = firstPost.title;
    firstImageLink.appendChild(firstImageText);

    firstImageLink.addEventListener("click", () => {
      localStorage.setItem("listingID", JSON.stringify(firstPost.id));
      window.location.href = "./listing/listing.html";
    });

    const secondAndThirdContainer = document.createElement("div");
    secondAndThirdContainer.classList.add(
      "flex",
      "justify-center",
      "mt-8",
      "md:mt-0",
      "md:space-x-24",
    );

    const secondImageLink = document.createElement("a");
    secondImageLink.id = "post-link2";
    secondImageLink.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "cursor-pointer",
    );

    const secondImageDiv = document.createElement("div");
    secondImageDiv.classList.add(
      "relative",
      "w-[100px]",
      "h-[100px]",
      "md:w-[150px]",
      "md:h-[150px]",
      "lg:w-[180px]",
      "lg:h-[180px]",
      "overflow-hidden",
      "rotate-45",
      "mr-6",
      "md:mr-0",
      "transition",
      "duration-300",
      "ease-linear",
      "group",
    );

    const secondImage = document.createElement("img");
    const secondPost = listing[1];
    const secondImageData = secondPost.media[0];
    secondImage.src = secondImageData
      ? secondImageData.url
      : "default-image.jpg";
    secondImage.alt = secondImageData ? secondImageData.alt : "Default Image";
    secondImage.classList.add(
      "w-full",
      "h-full",
      "object-cover",
      "-rotate-45",
      "transition",
      "duration-300",
      "ease-linear",
      "group-hover:scale-105",
    );

    secondImageDiv.appendChild(secondImage);
    secondImageLink.appendChild(secondImageDiv);

    const secondImageText = document.createElement("p");
    secondImageText.classList.add(
      "mt-2",
      "text-center",
      "text-sm",
      "md:text-base",
      "mr-6",
      "md:mr-0",
      "dark:text-gray-300",
    );
    secondImageText.textContent = secondPost.title;
    secondImageLink.appendChild(secondImageText);

    secondImageLink.addEventListener("click", () => {
      localStorage.setItem("listingID", JSON.stringify(secondPost.id));
      window.location.href = "./listing/listing.html";
    });

    const thirdImageLink = document.createElement("a");
    thirdImageLink.id = "post-link3";
    thirdImageLink.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "cursor-pointer",
    );

    const thirdImageDiv = document.createElement("div");
    thirdImageDiv.classList.add(
      "relative",
      "w-[100px]",
      "h-[100px]",
      "md:w-[150px]",
      "md:h-[150px]",
      "lg:w-[180px]",
      "lg:h-[180px]",
      "overflow-hidden",
      "rotate-45",
      "ml-6",
      "md:ml-0",
      "transition",
      "duration-300",
      "ease-linear",
      "group",
    );

    const thirdImage = document.createElement("img");
    const thirdPost = listing[2];
    const thirdImageData = thirdPost.media[0];
    thirdImage.src = thirdImageData ? thirdImageData.url : "default-image.jpg";
    thirdImage.alt = thirdImageData ? thirdImageData.alt : "Default Image";
    thirdImage.classList.add(
      "w-full",
      "h-full",
      "object-cover",
      "-rotate-45",
      "transition",
      "duration-300",
      "ease-linear",
      "group-hover:scale-105",
    );

    thirdImageDiv.appendChild(thirdImage);
    thirdImageLink.appendChild(thirdImageDiv);

    const thirdImageText = document.createElement("p");
    thirdImageText.classList.add(
      "mt-2",
      "text-center",
      "text-sm",
      "md:text-base",
      "ml-6",
      "md:ml-0",
      "dark:text-gray-300",
    );
    thirdImageText.textContent = thirdPost.title;
    thirdImageLink.appendChild(thirdImageText);

    thirdImageLink.addEventListener("click", () => {
      localStorage.setItem("listingID", JSON.stringify(thirdPost.id));
      window.location.href = "./listing/listing.html";
    });

    secondAndThirdContainer.appendChild(secondImageLink);
    secondAndThirdContainer.appendChild(thirdImageLink);

    wrapperDiv.appendChild(firstImageLink);
    wrapperDiv.appendChild(secondAndThirdContainer);

    targetContainer.appendChild(wrapperDiv);
  } else {
    console.error("listing does not contain enough posts:", listing);
  }
}

export async function onReadAllSpecificListings() {
  showLoadingSpinner();
  try {
    const response = await fetchListingsSpecific();

    const listingsArray = Array.isArray(response.data) ? response.data : [];

    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    const filteredListings = listingsArray.filter(
      (listing) => listing.tags && listing.tags.includes("myUniqueTag932"),
    );

    if (filteredListings.length === 0) {
      console.warn("No listings found with the tag 'myUniqueTag932'.");
      return;
    }

    createSpecificListings(filteredListings);
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

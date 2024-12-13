import { fetchListingsSpecific } from "../../api/listings/listings";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

function createSpecificListings(listing) {
  // Select the target container where we will append the dynamically created content
  const targetContainer = document.querySelector(".diamond-image-container");

  // Create the wrapper div that holds the images
  const wrapperDiv = document.createElement("div");
  wrapperDiv.id = "diamond-image-container";
  wrapperDiv.classList.add(
    "flex",
    "flex-col",
    "md:flex-row",
    "md:justify-center",
    "md:items-center",
  );

  // Ensure listing.data exists and has at least 3 items
  if (Array.isArray(listing) && listing.length >= 3) {
    // Create the first image container (keep the original structure)
    const firstImageLink = document.createElement("a");
    firstImageLink.id = "post-link1";
    firstImageLink.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "md:mr-24",
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
    );

    const firstImage = document.createElement("img");
    const firstPost = listing[0]; // Get the first post
    const firstImageData = firstPost.media[0]; // Get the first image from the media array
    firstImage.src = firstImageData ? firstImageData.url : "default-image.jpg"; // Fallback image
    firstImage.alt = firstImageData ? firstImageData.alt : "Default Image"; // Fallback alt text
    firstImage.classList.add("w-full", "h-full", "object-cover", "-rotate-45");

    firstImageDiv.appendChild(firstImage);
    firstImageLink.appendChild(firstImageDiv);

    const firstImageText = document.createElement("p");
    firstImageText.classList.add(
      "mt-2",
      "text-center",
      "font-body",
      "text-sm",
      "md:text-base",
      /*"truncate",
      "w-[120px]",
      "sm:w-[150px]",
      "md:w-[200px]",*/
    );
    firstImageText.textContent = firstPost.title; // Set title text
    firstImageLink.appendChild(firstImageText);

    //second and third image container

    const secondAndThird = document.createElement("div");
    secondAndThird.classList.add(
      "flex",
      "justify-center",
      "mt-8",
      "md:mt-0",
      "md:space-x-24",
    );

    // Create the second image container
    const secondImageLink = document.createElement("a");
    secondImageLink.id = "post-link2";
    secondImageLink.classList.add("flex", "flex-col", "items-center");

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
    );

    const secondImage = document.createElement("img");
    const secondPost = listing[1]; // Get the second post
    const secondImageData = secondPost.media[0]; // Get the first image from the media array
    secondImage.src = secondImageData
      ? secondImageData.url
      : "default-image.jpg"; // Fallback image
    secondImage.alt = secondImageData ? secondImageData.alt : "Default Image"; // Fallback alt text
    secondImage.classList.add("w-full", "h-full", "object-cover", "-rotate-45");

    secondImageDiv.appendChild(secondImage);
    secondImageLink.appendChild(secondImageDiv);

    const secondImageText = document.createElement("p");
    secondImageText.classList.add(
      "mt-2",
      "font-body",
      "text-center",
      "text-sm",
      "md:text-base",
      "mr-6",
      "md:mr-0",
*/
    );
    secondImageText.textContent = secondPost.title;
    secondImageLink.appendChild(secondImageText);

    // Create the third image container
    const thirdImageLink = document.createElement("a");
    thirdImageLink.id = "post-link3";
    thirdImageLink.classList.add("flex", "flex-col", "items-center");

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
    );

    const thirdImage = document.createElement("img");
    const thirdPost = listing[2]; // Get the third post
    const thirdImageData = thirdPost.media[0]; // Get the first image from the media array
    thirdImage.src = thirdImageData ? thirdImageData.url : "default-image.jpg"; // Fallback image
    thirdImage.alt = thirdImageData ? thirdImageData.alt : "Default Image"; // Fallback alt text
    thirdImage.classList.add("w-full", "h-full", "object-cover", "-rotate-45");

    thirdImageDiv.appendChild(thirdImage);
    thirdImageLink.appendChild(thirdImageDiv);

    const thirdImageText = document.createElement("p");
    thirdImageText.classList.add(
      "mt-2",
      "font-body",
      "text-center",
      "text-sm",
      "md:text-base",
      "ml-6",
      "md:ml-0",
    );
    thirdImageText.textContent = thirdPost.title; // Set title text
    thirdImageLink.appendChild(thirdImageText);

    secondAndThird.append(secondImageLink, thirdImageLink);

    // Append all dynamically created content to the wrapper
    wrapperDiv.append(firstImageLink, secondAndThird);

    // Append the entire wrapper to the target container
    targetContainer.appendChild(wrapperDiv);
  } else {
    console.error("listing does not contain enough posts:", listing);
  }
}

export async function onReadAllSpecificListings() {
  showLoadingSpinner();
  try {
    // Fetch listings from the API
    const response = await fetchListingsSpecific();

    // Log the response to check its structure
    console.log(response);

    // Access the listings data inside the 'data' property
    const listingsArray = Array.isArray(response.data) ? response.data : [];

    // Check if the array is empty
    if (listingsArray.length === 0) {
      console.warn("No listings found in the response.");
      return;
    }

    // Filter listings that contain the specific tag
    const filteredListings = listingsArray.filter(
      (listing) => listing.tags && listing.tags.includes("myUniqueTag932"), // Match the tag
    );

    // Log the filtered listings to confirm they contain the correct tag
    console.log("Filtered listings:", filteredListings);

    // Check if the filtered list is empty
    if (filteredListings.length === 0) {
      console.warn("No listings found with the tag 'myUniqueTag932'.");
      return;
    }

    // Pass the entire filtered listings array to createSpecificListings
    createSpecificListings(filteredListings); // Passing the entire array at once
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

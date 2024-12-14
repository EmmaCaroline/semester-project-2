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
    // Create the first image link
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
    const firstPost = listing[0]; // Get the first post
    const firstImageData = firstPost.media[0]; // Get the first image
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
    );
    firstImageText.textContent = firstPost.title;
    firstImageLink.appendChild(firstImageText);

    // Add an event listener to the first image link
    firstImageLink.addEventListener("click", () => {
      localStorage.setItem("listingID", JSON.stringify(firstPost.id)); // Ensure storing as string
      window.location.href = "/listing/listing.html"; // Redirect to the specific post page
    });

    // Create the second and third image links inside a single container
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
    );
    secondImageText.textContent = secondPost.title;
    secondImageLink.appendChild(secondImageText);

    // Add an event listener to the second image link
    secondImageLink.addEventListener("click", () => {
      localStorage.setItem("listingID", JSON.stringify(secondPost.id)); // Ensure storing as string
      window.location.href = "/listing/listing.html"; // Redirect to the specific post page
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
    );
    thirdImageText.textContent = thirdPost.title;
    thirdImageLink.appendChild(thirdImageText);

    // Add an event listener to the third image link
    thirdImageLink.addEventListener("click", () => {
      localStorage.setItem("listingID", JSON.stringify(thirdPost.id)); // Ensure storing as string
      window.location.href = "/listing/listing.html"; // Redirect to the specific post page
    });

    // Append the second and third image links inside the container
    secondAndThirdContainer.appendChild(secondImageLink);
    secondAndThirdContainer.appendChild(thirdImageLink);

    // Append the first image link and the second/third container to the wrapper
    wrapperDiv.appendChild(firstImageLink);
    wrapperDiv.appendChild(secondAndThirdContainer);

    // Finally, append the entire wrapper to the target container
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

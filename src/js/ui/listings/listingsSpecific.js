import { fetchListingsSpecific } from "../../api/listings/listings";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

function createSpecificListings() {
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

  // Create the first image container
  const firstImageLink = document.createElement("a");
  firstImageLink.id = "post-link1";
  firstImageLink.classList.add("flex", "flex-col", "items-center", "md:mr-24");

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
  firstImage.src = "images/jewelry-item1-image1.jpg";
  firstImage.alt = "Diamond Image";
  firstImage.classList.add("w-full", "h-full", "object-cover", "-rotate-45");

  firstImageDiv.appendChild(firstImage);
  firstImageLink.appendChild(firstImageDiv);

  const firstImageText = document.createElement("p");
  firstImageText.classList.add(
    "mt-2",
    "text-center",
    "text-sm",
    "md:text-base",
    "truncate",
    "w-[120px]",
    "sm:w-[150px]",
    "md:w-[200px]",
  );
  firstImageText.textContent = "Title TEST";
  firstImageLink.appendChild(firstImageText);

  // Create the second and third image containers
  const imagesWrapperDiv = document.createElement("div");
  imagesWrapperDiv.classList.add(
    "flex",
    "justify-center",
    "mt-8",
    "md:mt-0",
    "md:space-x-24",
  );

  // Second Image
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
  secondImage.src = "images/books-item1-image1.jpg";
  secondImage.alt = "Diamond Image";
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
    "truncate",
    "w-[120px]",
    "sm:w-[150px]",
    "md:w-[200px]",
    "mr-6",
    "md:mr-0",
  );
  secondImageText.textContent = "Title TEST";
  secondImageLink.appendChild(secondImageText);

  // Third Image
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
  thirdImage.src = "images/art-item1-image1.jpg";
  thirdImage.alt = "Diamond Image";
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
    "truncate",
    "w-[120px]",
    "sm:w-[150px]",
    "md:w-[200px]",
    "ml-6",
    "md:ml-0",
  );
  thirdImageText.textContent = "Title TEST";
  thirdImageLink.appendChild(thirdImageText);

  // Append all dynamically created content
  imagesWrapperDiv.appendChild(secondImageLink);
  imagesWrapperDiv.appendChild(thirdImageLink);
  wrapperDiv.appendChild(firstImageLink);
  wrapperDiv.appendChild(imagesWrapperDiv);

  // Append the entire wrapper to the target container
  targetContainer.appendChild(wrapperDiv);
}

export async function onReadAlSpecificListings() {
  showLoadingSpinner();
  try {
    // Fetch listings from the API
    const response = await fetchListingsSpecific();

    // Access the listings data inside the 'data' property
    const listingsArray = Array.isArray(response.data) ? response.data : [];

    // Check if the array is empty
    if (listingsArray.length === 0) {
      //console.warn("No listings found in the response.");
      return;
    }

    // Loop through the listings and create a listing for each one
    listingsArray.forEach((listing) => {
      createSpecificListings(listing);
    });
  } catch (error) {
    console.error("Error reading all listings:", error);
  } finally {
    hideLoadingSpinner();
  }
}

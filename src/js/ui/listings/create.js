import { createListing } from "../../api/listings/create";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { showMessage } from "../../utilities/alertMessage";

/**
 * Handles the post creation form submission and processes the creation of a new post.
 *
 * @param {Event} event - The event object from the form submission.
 */
export async function onCreateListing(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const listing = Object.fromEntries(formData.entries());

  // Convert tags to array
  listing.tags = listing.tags
    ? listing.tags.split(",").map((tag) => tag.trim())
    : [];

  // Collect all media inputs dynamically
  const mediaInputs = document.querySelectorAll(".media-input");
  const media = [];
  mediaInputs.forEach((input) => {
    const url = input.value.trim();
    const altText = input.dataset.alt || "No description provided";
    if (url) {
      media.push({ url, alt: altText });
    }
  });

  listing.media = media.length ? media : null;

  // Process endsAt date to ISO 8601 format
  const endsAtInput = document.querySelector("#endsAt").value; // Read the value from input
  if (endsAtInput) {
    listing.endsAt = new Date(endsAtInput).toISOString(); // Convert to ISO 8601
  } else {
    alert("Please select an end date for the auction.");
    return;
  }

  // Check if the title is empty
  if (!listing.title) {
    alert("Title is required for creating a post");
    return;
  }
  showLoadingSpinner();
  try {
    await createListing(listing);
    showMessage("Listing created!", 3000);
    form.reset();
    document.getElementById("mediaFields").innerHTML = ""; // Clear media inputs on success
    addImageField(); // Ensure at least one media field is available after reset
    // Delay navigation for a few seconds
    setTimeout(() => {
      window.location.href = "/profile/profile/";
    }, 3000); // 3000 milliseconds = 3 seconds
  } catch (error) {
    console.error("Error creating post: ", error);
    alert("Failed to create post. Please try again.");
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Dynamically adds a new image input field for media entry with a remove button.
 */
export function addImageField() {
  const mediaFieldsContainer = document.getElementById("mediaFields");

  if (!mediaFieldsContainer) {
    console.error("Media fields container is missing.");
    return;
  }

  const container = document.createElement("div");
  container.className = "mb-4 relative";

  const label = document.createElement("label");
  label.setAttribute("for", "media-url");
  label.className =
    "block text-sm font-body font-medium text-gray-700 mb-2 dark:text-gray-200 md:text-base";
  label.innerText = "Image URL";

  const input = document.createElement("input");
  input.type = "url";
  input.placeholder = "Enter image URL";
  input.name = "media-url";
  input.className =
    "block w-full p-2 border rounded mb-2 media-input dark:bg-gray-800 dark:text-gray-100";

  const preview = document.createElement("img");
  preview.className = "w-24 h-24 object-cover mt-2 hidden";

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className =
    "absolute top-[29px] right-0 bg-customGray text-white px-2 py-2 rounded cursor-pointer";

  removeButton.innerText = "X";
  removeButton.addEventListener("click", () => {
    container.remove();
  });

  input.addEventListener("input", () => {
    const url = input.value.trim();
    if (url) {
      preview.src = url;
      preview.classList.remove("hidden");
    } else {
      preview.classList.add("hidden");
      preview.src = "";
    }
  });

  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(preview);
  container.appendChild(removeButton);

  mediaFieldsContainer.appendChild(container);
}

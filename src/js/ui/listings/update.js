import { updateListing } from "../../api/listings/update";
import { fetchSingleListing } from "../../api/listings/listings";
import { load } from "../../api/auth/key";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Handles the update of a listing. This function is triggered when the form is submitted to update a listing.
 * It compares the updated data with the existing listing to determine if any changes were made.
 * If changes are detected, it sends the updated data to the server and redirects to the updated listing page.
 * If no changes are made, it alerts the user and prevents further actions.
 *
 * @async
 * @function onUpdateListing
 * @param {Event} event - The submit event triggered when the update form is submitted.
 * @throws {Error} If there is an issue updating the listing or fetching the existing listing data.
 */
export async function onUpdateListing(event) {
  event.preventDefault();

  const id = new URLSearchParams(window.location.search).get("id");
  const formData = new FormData(event.target);

  const existingListing = await fetchSingleListing(id);

  const updatedData = {
    title: formData.get("title") || "",
    description: formData.get("description") || "",
    tags: formData.get("tags")
      ? formData
          .get("tags")
          .split(",")
          .map((tag) => tag.trim())
      : [],
    media: [],
  };

  const mediaInputs = document.querySelectorAll(".media-input");
  mediaInputs.forEach((input) => {
    const url = input.value.trim();
    const alt = input.dataset.alt || "No description";
    if (url) {
      updatedData.media.push({ url, alt });
    }
  });

  const isUnchanged =
    updatedData.title === existingListing.data.title &&
    updatedData.description === existingListing.data.description &&
    JSON.stringify(updatedData.tags) ===
      JSON.stringify(existingListing.data.tags) &&
    JSON.stringify(updatedData.media) ===
      JSON.stringify(existingListing.data.media);

  if (isUnchanged) {
    alert("No changes made to the listing.");
    return;
  }

  try {
    showLoadingSpinner();
    await updateListing(id, updatedData);
    alert("Listing updated successfully!");
    window.location.href = `/listing/listing/?id=${id}`;
  } catch (error) {
    console.error("Failed to update listing:", error);
    alert("Failed to update listing.");
  }
  hideLoadingSpinner();
}

const cancelButton = document.getElementById("cancelButton");
if (cancelButton) {
  cancelButton.addEventListener("click", () => {
    window.location.href = `/listing/listing/?id=${new URLSearchParams(window.location.search).get("id")}`;
  });
}

/**
 * Displays the "Edit Post" button for a specific listing if the logged-in user is the author.
 * This button allows the user to edit the listing. If the user is not the author, the button will be hidden.
 *
 * @function onEditButton
 * @param {Object} listing - The listing object containing information about the post.
 * @param {string} author - The name of the author of the listing.
 */
export const onEditButton = (listing, author) => {
  const user = load("user");
  const userName = user?.name;

  const editButton = document.getElementById("edit-listing-button-container");

  if (!editButton) {
    console.error("Edit button not found.");
    return;
  }
  editButton.style.display = "none";

  if (author === userName) {
    editButton.innerText = "Edit Post";
    editButton.style.display = "block";

    editButton.addEventListener("click", () => {
      window.location.href = `/listing/update/?id=${listing.id}`;
    });
  }
};

/**
 * Adds a new media input field for entering an image URL and an optional alt text.
 * This function dynamically creates the HTML elements for the URL input, an image preview,
 * and a remove button. The input allows users to add multiple images to a listing.
 *
 * @function addImageField
 * @param {string} [url=""] - The initial URL for the image (optional).
 * @param {string} [alt=""] - The alt text for the image (optional).
 * @param {number} [index=0] - The index used to uniquely name the input field (optional).
 */
export function addImageField(url = "", alt = "", index = 0) {
  const mediaFieldsContainer = document.getElementById("mediaFields");

  if (!mediaFieldsContainer) {
    console.error("Media fields container is missing.");
    return;
  }

  const container = document.createElement("div");
  container.className = "mb-4 relative";

  const label = document.createElement("label");
  label.setAttribute("for", `media-url-${index}`);
  label.className =
    "block text-sm font-body font-medium text-gray-700 mb-2 dark:text-gray-200 md:text-base";
  label.innerText = "Image URL";

  const input = document.createElement("input");
  input.type = "url";
  input.placeholder = "Enter image URL";
  input.name = `media-url-${index}`;
  input.className =
    "block w-full p-2 border rounded mb-2 media-input dark:bg-gray-800 dark:text-gray-100";
  input.value = url;

  const preview = document.createElement("img");
  preview.className = "w-24 h-24 object-cover mt-2 hidden";
  if (url) {
    preview.src = url;
    preview.alt = alt;
    preview.classList.remove("hidden");
  }

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
      preview.alt = alt || "No description";
      preview.classList.remove("hidden");
    } else {
      preview.classList.add("hidden");
      preview.src = "";
      preview.alt = "";
    }
  });

  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(preview);
  container.appendChild(removeButton);

  mediaFieldsContainer.appendChild(container);
}

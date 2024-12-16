import { createListing } from "../../api/listings/create";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { showMessage } from "../../utilities/alertMessage";

/**
 * Handles the form submission for creating a new listing.
 * It validates the input, constructs a listing object,
 * and calls the `createListing` function to submit the data.
 *
 * @param {Event} event - The form submission event.
 * @returns {void}
 */
export async function onCreateListing(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const listing = Object.fromEntries(formData.entries());

  listing.tags = listing.tags
    ? listing.tags.split(",").map((tag) => tag.trim())
    : [];

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

  const endsAtInput = document.querySelector("#endsAt").value;
  if (endsAtInput) {
    listing.endsAt = new Date(endsAtInput).toISOString();
  } else {
    alert("Please select an end date for the auction.");
    return;
  }

  if (!listing.title) {
    alert("Title is required for creating a post");
    return;
  }
  showLoadingSpinner();
  try {
    await createListing(listing);
    showMessage("Listing created!", 3000);
    form.reset();
    document.getElementById("mediaFields").innerHTML = "";
    addImageField();

    setTimeout(() => {
      window.location.href = "/profile/";
    }, 3000);
  } catch (error) {
    console.error("Error creating post: ", error);
    alert("Failed to create post. Please try again.");
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Adds a new input field for entering an image URL to the listing creation form.
 * It also includes a preview image and a remove button for the added field.
 *
 * @returns {void}
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

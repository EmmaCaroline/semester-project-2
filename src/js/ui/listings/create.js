import { createListing } from "../../api/listings/create";

/**
 * Handles the post creation form submission and processes the creation of a new post.
 *
 * This function prevents the default form submission, retrieves the form data,
 * processes the tags and media URL, and validates the post title. If the creation
 * is successful, it displays a success message and resets the form. If it fails,
 * it logs the error and alerts the user.
 *
 * @param {Event} event - The event object from the form submission.
 * @returns {Promise<void>} A promise that resolves when the post creation process is complete.
 * @throws {Error} If the post creation process encounters an error.
 */

// Function to handle creating a listing
export async function onCreateListing(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const listing = Object.fromEntries(formData.entries());

  // Convert tags to an array
  listing.tags = listing.tags
    ? listing.tags.split(",").map((tag) => tag.trim())
    : [];

  // Collect media URLs dynamically from the input fields
  const mediaInputs = document.querySelectorAll(".media-input");
  const media = [];
  mediaInputs.forEach((input) => {
    if (input.value.trim()) {
      media.push({
        url: input.value.trim(),
        alt: input.dataset.alt || "No description provided",
      });
    }
  });

  listing.media = media.length > 0 ? media : null;

  if (!listing.title) {
    alert("Title is required for creating a post");
    return;
  }

  try {
    await createListing(listing);
    alert("Post created!");
    form.reset();
    document.getElementById("mediaFields").innerHTML = ""; // Clear media inputs
    window.location.href = "/profile/";
  } catch (error) {
    console.error("Error creating post: ", error);
    alert("Failed to create post. Please try again.");
  }
}

export function addImageField() {
  const mediaFieldsContainer = document.getElementById("mediaFields");

  if (!mediaFieldsContainer) {
    console.error("Media fields container is missing.");
    return;
  }

  // Create a new field container for the image input
  const container = document.createElement("div");
  container.className = "mb-4 relative"; // Make the container relative for absolute positioning

  // Create the label
  const label = document.createElement("label");
  label.className =
    "block text-sm font-body font-medium text-gray-700 mb-2 dark:text-gray-200 md:text-base";
  label.innerText = "Images";

  // Create the input field
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter image URL";
  input.name = "media-url[]";
  input.className =
    "block w-full p-2 border border-gray-300 rounded mb-2 media-input";

  // Create the preview image element
  const preview = document.createElement("img");
  preview.className = "w-24 h-24 object-cover rounded mt-2 hidden";

  // Create the 'X' remove button
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className =
    "absolute top-[29px] right-0 bg-customGray text-white px-2 py-2 rounded cursor-pointer md:top-[33px]";

  removeButton.innerText = "X";

  // Remove logic
  removeButton.addEventListener("click", () => {
    if (preview.classList.contains("hidden")) {
      // If the preview is already hidden, this is not dynamically added, just reset preview URL
      input.value = "";
      preview.src = "";
      preview.classList.add("hidden");
    } else {
      // Dynamically remove the entire field only if it's not the first one
      if (mediaFieldsContainer.children.length > 1) {
        container.remove();
      } else {
        // Only clear the preview for the first field
        preview.src = "";
        preview.classList.add("hidden");
      }
    }
  });

  // Handle image URL input and only show the preview on valid URL after typing
  input.addEventListener("input", () => {
    const url = input.value.trim();
    if (url) {
      preview.src = url;
      preview.classList.remove("hidden");
    } else {
      preview.classList.add("hidden");
      preview.src = ""; // Clear image preview
    }
  });

  // Attach everything to the DOM
  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(preview);
  container.appendChild(removeButton);

  mediaFieldsContainer.appendChild(container);

  console.log("New input field with image preview is added.");
}

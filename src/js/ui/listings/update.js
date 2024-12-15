import { updateListing } from "../../api/listings/update";
import { fetchSingleListing } from "../../api/listings/listings";
import { load } from "../../api/auth/key";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

export async function onUpdateListing(event) {
  event.preventDefault();

  const id = new URLSearchParams(window.location.search).get("id");
  const formData = new FormData(event.target);

  const existingListing = await fetchSingleListing(id);

  console.log("Existing Listing Data:", existingListing);

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

  console.log("Updated Data:", updatedData);

  const isUnchanged =
    updatedData.title === existingListing.data.title &&
    updatedData.description === existingListing.data.description &&
    JSON.stringify(updatedData.tags) ===
      JSON.stringify(existingListing.data.tags) &&
    JSON.stringify(updatedData.media) ===
      JSON.stringify(existingListing.data.media);

  console.log("Is Unchanged:", isUnchanged);

  if (isUnchanged) {
    alert("No changes made to the listing.");
    return;
  }

  try {
    showLoadingSpinner();
    await updateListing(id, updatedData);
    alert("Listing updated successfully!");
    window.location.href = `/listing/listing.html?id=${id}`;
  } catch (error) {
    console.error("Failed to update listing:", error);
    alert("Failed to update listing.");
  }
  hideLoadingSpinner();
}

const cancelButton = document.getElementById("cancelButton");
if (cancelButton) {
  cancelButton.addEventListener("click", () => {
    window.location.href = `/listing/listing.html?id=${new URLSearchParams(window.location.search).get("id")}`;
  });
}

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
    console.log("User is the author, showing the edit button.");
    editButton.innerText = "Edit Post";
    editButton.style.display = "block";

    editButton.addEventListener("click", () => {
      console.log("Edit button clicked, navigating to update page.");
      window.location.href = `/listing/update-listing.html?id=${listing.id}`;
    });
  } else {
    console.log("User is not the author, edit button hidden.");
  }
};

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

  console.log("Image field added");
}

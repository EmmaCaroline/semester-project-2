import { authGuard } from "../../utilities/authGuard";
import { fetchSingleListing } from "../../api/listings/listings";
import { addImageField } from "../../ui/listings/update";
import { onUpdateListing } from "../../ui/listings/update";
import { setupNewsletterSubscription } from "../../ui/homepage";

console.log("views/update.js loaded");

const form = document.forms.updateListing;

if (!form) {
  console.error("Update form not found on the page.");
} else {
  const listingID = new URLSearchParams(window.location.search).get("id");

  if (listingID) {
    fetchSingleListing(listingID)
      .then((response) => {
        const listing = response.data;

        if (listing) {
          form.title.value = listing.title || "";
          form.description.value = listing.description || "";

          form.tags.value = listing.tags ? listing.tags.join(", ") : "";

          if (Array.isArray(listing.media) && listing.media.length > 0) {
            listing.media.forEach((mediaItem, index) => {
              console.log(`Preloading media ${index + 1}:`, mediaItem);
              addImageField(mediaItem.url, mediaItem.alt, index);
            });
          } else {
            addImageField();
          }
        } else {
          console.error("No listing found for the provided ID.");
        }
      })
      .catch((error) => {
        console.error("Error fetching post for editing:", error);
      });
  } else {
    console.error("Listing ID is missing from URL.");
  }

  attachImageButtonListener();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const updatedData = {
      title: formData.get("title"),
      description: formData.get("description"),
      tags: formData
        .get("tags")
        .split(",")
        .map((tag) => tag.trim()),
      media: [],
    };

    const mediaFields = form.querySelectorAll(".media-input");
    mediaFields.forEach((input, index) => {
      updatedData.media.push({
        url: input.value,
        alt: `Image ${index + 1}`,
      });
    });

    onUpdateListing(event, updatedData);
  });
}

function attachImageButtonListener() {
  const addImageButton = document.getElementById("addImageButton");

  if (addImageButton) {
    addImageButton.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Add image button clicked");
      addImageField();
    });
  } else {
    console.error("Add Image button is not found in the DOM.");
  }
}

authGuard();
setupNewsletterSubscription();

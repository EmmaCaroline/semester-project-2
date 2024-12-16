import { onCreateListing } from "../../ui/listings/create";
import { authGuard } from "../../utilities/authGuard";
import { addImageField } from "../../ui/listings/create";
import { setupNewsletterSubscription } from "../../ui/homepage";

authGuard();

const form = document.forms.create;
form.addEventListener("submit", onCreateListing);

/**
 * Attaches an event listener to the "Add Image" button. When clicked, it triggers the `addImageField` function.
 * Logs an error if the button is not found in the DOM.
 */
function attachImageButtonListener() {
  const addImageButton = document.getElementById("addImageButton");

  if (addImageButton) {
    addImageButton.addEventListener("click", addImageField);
  } else {
    console.error("Add Image button is not found in the DOM.");
  }
}

attachImageButtonListener();

addImageField();
setupNewsletterSubscription();

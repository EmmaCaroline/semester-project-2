import { onCreateListing } from "../../ui/listings/create";
import { authGuard } from "../../utilities/authGuard";
import { addImageField } from "../../ui/listings/create";

authGuard();

// Form handling
const form = document.forms.create;

// Attach submit listener
form.addEventListener("submit", onCreateListing);

// Ensure DOM is ready and the add image button is available
function attachImageButtonListener() {
  const addImageButton = document.getElementById("addImageButton");

  if (addImageButton) {
    addImageButton.addEventListener("click", addImageField);
  } else {
    console.error("Add Image button is not found in the DOM.");
  }
}

// Call this after dynamically importing the view logic
attachImageButtonListener();

// Ensure the first media field input is added when the page loads
addImageField();

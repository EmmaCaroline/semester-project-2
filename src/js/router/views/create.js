import { onCreateListing } from "../../ui/listings/create";
import { authGuard } from "../../utilities/authGuard";
import { addImageField } from "../../ui/listings/create";

authGuard();

const form = document.forms.create;
form.addEventListener("submit", onCreateListing);

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

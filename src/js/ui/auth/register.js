import { register } from "../../api/auth/register";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Handles the registration form submission and processes user registration.
 *
 * This function prevents the default form submission, retrieves the form data,
 * and attempts to register the user. On successful registration, it displays a success
 * message and redirects the user to the login page. If registration fails, it logs
 * the error to the console.
 *
 * @param {Event} event - The event object from the form submission.
 * @returns {Promise<void>} A promise that resolves when the registration process is complete.
 * @throws {Error} If the registration process encounters an error.
 */

export async function onRegister(event) {
  event.preventDefault();

  const form = document.forms.register;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  showLoadingSpinner();
  try {
    const response = await register(user);
    console.log("Registration ok", response);
    alert("You are now registered. Log in to start TreasureBidding");
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Registration failed:", error);
  } finally {
    hideLoadingSpinner();
  }
}

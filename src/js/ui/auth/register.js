import { register } from "../../api/auth/register";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { showMessageWithButtonAndRedirect } from "../../utilities/alertMessage";

/**
 * Handles the registration form submission. Prevents the default form submission, gathers the form data,
 * and sends a request to the `register` function. If registration is successful, displays a success message
 * with a button that redirects the user to the login page. If registration fails, logs an error.
 *
 * @param {Event} event - The form submit event.
 */
export async function onRegister(event) {
  event.preventDefault();

  const form = document.forms.register;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  showLoadingSpinner();
  try {
    await register(user);

    showMessageWithButtonAndRedirect(
      "Registered! 1000 credits are given to your account.",
      "/auth/login/",
    );
  } catch (error) {
    console.error("Registration failed:", error);
  } finally {
    hideLoadingSpinner();
  }
}

import { login } from "../../api/auth/login";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { showMessage } from "../../utilities/alertMessage";

/**
 * Handles the user login process on form submission.
 *
 * @param {Event} event - The form submission event.
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = document.forms.login;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  showLoadingSpinner();
  try {
    // Call the login API function
    const response = await login(user);
    console.log("Login successful:", response);
    //alert(`Hello ${response.data.name}`);
    showMessage(`Hello ${response.data.name}`, 3000);

    // Dispatch a custom event for global updates
    const loginEvent = new Event("userLoggedIn");
    document.dispatchEvent(loginEvent);

    // Redirect the user
    window.location.href = "/";
  } catch (error) {
    console.error("Login failed:", error);
    alert(`Login failed: ${error.message}`);
  } finally {
    hideLoadingSpinner();
  }
}

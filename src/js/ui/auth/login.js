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
    const response = await login(user);

    showMessage(`Hello ${response.data.name}`, 3000);

    setTimeout(() => {
      window.location.href = "./";
    }, 3000);
  } catch (error) {
    console.error("Login failed:", error);
    alert(`Login failed: ${error.message}`);
  } finally {
    hideLoadingSpinner();
  }
}

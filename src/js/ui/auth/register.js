import { register } from "../../api/auth/register";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";
import { showMessageWithButtonAndRedirect } from "../../utilities/alertMessage";

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
      "./auth/login.html",
    );
  } catch (error) {
    console.error("Registration failed:", error);
  } finally {
    hideLoadingSpinner();
  }
}

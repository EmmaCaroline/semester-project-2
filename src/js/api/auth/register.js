import { API_AUTH_REGISTER } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Registers a new user with the provided name, email, and password.
 *
 * @param {Object} params - The registration parameters.
 * @param {string} params.name - The user's name.
 * @param {string} params.email - The user's email.
 * @param {string} params.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves with the registration response, including the user’s data.
 * @throws {Error} If the registration request fails, an error is thrown with the failure message. A network error triggers an alert with a message.
 */
export async function register({ name, email, password }) {
  showLoadingSpinner();
  const body = JSON.stringify({ name, email, password });

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      headers: headers(),
      method: "POST",
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to register: " + errorText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Registration failed: ${error.message}`);
    }
    console.error("Registration failed", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

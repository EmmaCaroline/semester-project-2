import { API_AUTH_LOGIN } from "../../constants";
import * as storage from "../auth/key";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Logs in a user with the provided email and password, and stores the user's data and token in localStorage.
 *
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The user's email.
 * @param {string} params.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves with the login response, including the user's data and access token.
 * @throws {Error} If the login request fails, an error is thrown with the failure message.
 */
export async function login({ email, password }) {
  showLoadingSpinner();
  const body = JSON.stringify({ email, password });

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      headers: headers(),
      method: "POST",
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${errorText}`);
    }

    const result = await response.json();
    storage.save("token", result.data.accessToken);
    storage.save("user", result.data);

    return result;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

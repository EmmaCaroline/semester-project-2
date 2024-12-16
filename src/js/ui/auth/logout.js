import { remove } from "../../api/auth/key";

/**
 * Handles the user logout process.
 *
 * This function removes the user's token and user data from storage, and redirects
 * the user to the home page. If an error occurs during the logout process,
 * it logs the error to the console.
 *
 * @returns {void}
 * @throws {Error} If the logout process encounters an error.
 */

export function onLogout() {
  try {
    remove("token");
    remove("user");
    window.location.href = "/";
  } catch (error) {
    console.error("Failed to sign out:", error);
  }
}

/**
 * Checks if the user is authenticated by verifying the presence of a token in local storage.
 *
 * If the user is not authenticated (i.e., the token is absent), an alert is displayed,
 * and the user is redirected to the login page. This function is intended to protect
 * routes that require authentication.
 *
 * @returns {void}
 */

import { load } from "../api/auth/key";

export function authGuard() {
  const token = load("token");
  if (!token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}

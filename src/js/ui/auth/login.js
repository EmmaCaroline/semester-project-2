import { login } from "../../api/auth/login";

/**
 * Handles the login form submission and processes user login.
 *
 * This function prevents the default form submission, retrieves the form data,
 * and attempts to log the user in. On successful login, it displays a success
 * message. If the login fails, it alerts the user and logs the error.
 *
 * @param {Event} event - The event object from the form submission.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 * @throws {Error} If the login process encounters an error.
 */

/*export async function onLogin(event) {
  event.preventDefault();

  const form = document.forms.login;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  try {
    const response = await login(user);
    console.log("Login ok", response);
    alert(`Hello ${response.data.name}`);
    window.location.href = "/";
  } catch (error) {
    if (error.name === "TypeError") {
      alert("Network error, try again later");
    } else {
      alert(`Login failed: ${error.message}`);
    }
    console.error("Login failed", error);
    throw error;
  }
}*/

export async function onLogin(event) {
  event.preventDefault();

  const form = document.forms.login;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  try {
    const response = await login(user);
    console.log("Login successful:", response);

    // Store token in localStorage
    localStorage.setItem("token", response.data.token);

    // Dispatch custom event for global updates
    const loginEvent = new Event("userLoggedIn");
    document.dispatchEvent(loginEvent);

    // Redirect to homepage or wherever needed
    window.location.href = "/";
  } catch (error) {
    console.error("Login failed:", error);
    alert(`Login failed: ${error.message}`);
  }
}

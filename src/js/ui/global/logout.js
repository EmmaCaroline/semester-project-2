import { onLogout } from "../auth/logout";

/**
 * Attaches an event listener to all elements with the class `logout-button`. When clicked, a confirmation dialog
 * is shown to the user asking if they are sure they want to log out. If the user confirms, the `onLogout` function
 * is called to handle the logout process. If the user cancels, the page is reloaded to maintain the logged-in state.
 */
export function setLogoutListener() {
  document.querySelectorAll(".logout-button").forEach((logoutBtn) => {
    logoutBtn.addEventListener("click", () => {
      const userConfirmed = confirm("Are you sure you want to log out?");
      if (userConfirmed) {
        onLogout();
      } else {
        window.location.reload();
      }
    });
  });
}

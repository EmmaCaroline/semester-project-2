/**
 * Adds a click event listener to the newsletter button for handling subscriptions.
 * Clears the email input field and shows an alert based on the input's validity.
 * @param {string} buttonId - The ID of the newsletter button.
 * @param {string} inputId - The ID of the email input field.
 */
export function setupNewsletterSubscription(buttonId, inputId) {
  document.getElementById(buttonId).addEventListener("click", function () {
    const emailInput = document.getElementById(inputId);
    const email = emailInput.value.trim(); // Remove leading and trailing whitespaces

    // Basic email validation pattern (requires "@" symbol)
    const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    // Check if the email is not empty and matches the pattern
    if (email && emailPattern.test(email)) {
      emailInput.value = ""; // Clear the input field
      alert("Thank you for subscribing!");
    } else {
      alert("Please enter a valid email address.");
    }
  });
}

const token = localStorage.getItem("token");
const welcomeMessage = document.querySelector("#unregistered-welcome-message");

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

/**
 * Adds a typewriter effect to the specified element.
 * @param {string} elementId - The ID of the element where the typewriter effect will be applied.
 * @param {string} text - The text to display with the typewriter effect.
 * @param {number} speed - The speed of the typing effect in milliseconds (default: 100ms).
 */
export function addTypewriterEffect(elementId, text, speed = 100) {
  const typewriterElement = document.getElementById(elementId);
  if (!typewriterElement) {
    console.error(`Element with ID '${elementId}' not found.`);
    return;
  }

  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      typewriterElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
}

export function ifLoggedIn() {
  if (token) {
    // User is logged in: hide the welcome message
    welcomeMessage.classList.add("hidden");
  } else {
    welcomeMessage.classList.remove("hidden");
  }
}

ifLoggedIn();

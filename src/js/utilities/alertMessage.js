export function showMessage(message, duration = 3000) {
  const messageBox = document.getElementById("messageBox");
  messageBox.textContent = message;
  messageBox.classList.remove("hidden", "opacity-0");
  messageBox.classList.add("opacity-100");

  // Set a timeout to fade out and hide the message box
  setTimeout(() => {
    messageBox.classList.remove("opacity-100");
    messageBox.classList.add("opacity-0");
    setTimeout(() => {
      messageBox.classList.add("hidden");
    }, 1000); // Match the duration of the fade-out transition
  }, duration);
}

export function showMessageWithButtonAndRedirect(message, redirectUrl) {
  const messageBox = document.getElementById("clickableMessageBox");
  const messageText = document.getElementById("clickableMessageText");
  const closeButton = document.getElementById("closeMessageButton");

  // Set the message text and make the message box visible
  messageText.textContent = message;
  messageBox.classList.remove("hidden");

  // Add event listener to the close button
  closeButton.addEventListener(
    "click",
    () => {
      messageBox.classList.add("hidden");
      window.location.href = redirectUrl; // Redirect after closing
    },
    { once: true },
  );
}

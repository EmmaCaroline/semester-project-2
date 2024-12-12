export function showMessage(message, duration = 4000) {
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
    }, 2000); // Match the duration of the fade-out transition
  }, duration);
}

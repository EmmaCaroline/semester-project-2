export function showMessage(message, duration = 3000) {
  const messageBox = document.querySelector(".messageBox");
  messageBox.textContent = message;
  messageBox.classList.remove("hidden", "opacity-0");
  messageBox.classList.add("opacity-100");

  setTimeout(() => {
    messageBox.classList.remove("opacity-100");
    messageBox.classList.add("opacity-0");
    setTimeout(() => {
      messageBox.classList.add("hidden");
    }, 1000);
  }, duration);
}

export function showMessageWithButtonAndRedirect(message, redirectUrl) {
  const messageBox = document.getElementById("clickableMessageBox");
  const messageText = document.getElementById("clickableMessageText");
  const closeButton = document.getElementById("closeMessageButton");

  messageText.textContent = message;
  messageBox.classList.remove("hidden");

  closeButton.addEventListener(
    "click",
    () => {
      messageBox.classList.add("hidden");
      window.location.href = redirectUrl;
    },
    { once: true },
  );
}

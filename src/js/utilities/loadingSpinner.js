// Show the loading spinner
export function showLoadingSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.classList.remove("hidden"); // Show the spinner
    spinner.classList.add("flex");
  }
}

// Hide the loading spinner
export function hideLoadingSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.classList.add("hidden"); // Hide the spinner
    spinner.classList.remove("flex"); // Show the spinner
  }
}

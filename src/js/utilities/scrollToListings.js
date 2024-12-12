export function redirectToAndScroll() {
  const allListingsLink = document.getElementById("all-listings-link");

  if (allListingsLink) {
    allListingsLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior

      // Redirect to homepage with a hash
      window.location.href = "/#scroll-to-listings";
    });
  }
}

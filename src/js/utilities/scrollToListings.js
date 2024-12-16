export function redirectToAndScroll() {
  const allListingsLink = document.getElementById("all-listings-link");

  if (allListingsLink) {
    allListingsLink.addEventListener("click", (event) => {
      event.preventDefault();

      window.location.href = "/#scroll-to-listings";
    });
  }
}

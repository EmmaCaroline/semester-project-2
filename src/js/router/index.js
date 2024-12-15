export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/auth/register.html":
      await import("./views/register.js");
      break;
    case "/auth/login.html":
      await import("./views/login.js");
      break;
    case "/profile/profile.html":
      await import("./views/profile.js");
      break;
    case "/listing/create.html":
      await import("./views/create.js");
      break;
    case "/collections/art.html":
      await import("./views/art.js");
      break;
    case "/collections/books.html":
      await import("./views/books.js");
      break;
    case "/collections/jewelry.html":
      await import("./views/jewelry.js");
      break;
    case "/listing/listing.html":
      await import("./views/listing.js");
      break;
    case "/listing/update-listing.html":
      await import("./views/updateListing.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}

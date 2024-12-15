export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/auth/register/":
      await import("./views/register.js");
      break;
    case "/auth/login/":
      await import("./views/login.js");
      break;
    case "/profile/profile/":
      await import("./views/profile.js");
      break;
    case "/listing/create/":
      await import("./views/create.js");
      break;
    case "/collections/art/":
      await import("./views/art.js");
      break;
    case "/collections/books/":
      await import("./views/books.js");
      break;
    case "/collections/jewelry/":
      await import("./views/jewelry.js");
      break;
    case "/listing/listing/":
      await import("./views/listing.js");
      break;
    case "/listing/update/":
      await import("./views/updateListing.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}

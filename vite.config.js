/*import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    target: "es2022",
  },
  base: "./",
});*/

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        listing: resolve(__dirname, "./listing/index.html"),
        editListing: resolve(__dirname, "./listing/update/index.html"),
        createListing: resolve(__dirname, "./listing/create/index.html"),
        artCollection: resolve(__dirname, "./collections/art/index.html"),
        booksCollection: resolve(__dirname, "./collections/books/index.html"),
        jewelryCollection: resolve(
          __dirname,
          "./collections/jewelry/index.html",
        ),
      },
    },
  },
});

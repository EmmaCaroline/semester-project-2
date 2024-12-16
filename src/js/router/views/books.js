import { onReadAllListingsBooks } from "../../ui/listings/listings";
import {
  fetchAndRenderListingsBooks,
  initializePagination,
} from "../../utilities/pagination";
import { setupNewsletterSubscription } from "../../ui/homepage";

onReadAllListingsBooks();
fetchAndRenderListingsBooks();
initializePagination();
setupNewsletterSubscription();

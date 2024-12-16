import { onReadAllListingsArt } from "../../ui/listings/listings";
import {
  fetchAndRenderListingsArt,
  initializePagination,
} from "../../utilities/pagination";
import { setupNewsletterSubscription } from "../../ui/homepage";

onReadAllListingsArt();
initializePagination();
fetchAndRenderListingsArt();
setupNewsletterSubscription();

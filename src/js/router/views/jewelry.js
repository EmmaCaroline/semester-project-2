import { onReadAllListingsJewelry } from "../../ui/listings/listings";
import {
  fetchAndRenderListingsJewelry,
  initializePagination,
} from "../../utilities/pagination";
import { setupNewsletterSubscription } from "../../ui/homepage";

onReadAllListingsJewelry();
fetchAndRenderListingsJewelry();
initializePagination();
setupNewsletterSubscription();

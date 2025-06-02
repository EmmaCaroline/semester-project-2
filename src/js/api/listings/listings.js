import { API_AUCTION_LISTINGS } from "../../constants";
import { API_AUCTION_PROFILES } from "../../constants";
import { apiFetchWithHandling } from "../apiFetchWithHandling";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Generic fetch function that handles URL params, loading spinner,
 * and error handling via apiFetchWithHandling utility.
 *
 * @param {string|URL} url - The API endpoint URL.
 * @param {Object} [params={}] - Query parameters to append to the URL.
 * @param {string} [defaultErrorMessage="Failed to fetch listings"] - Error message for fallback.
 * @returns {Promise<Object>} The parsed JSON data from the API response.
 * @throws {Error} If the fetch request fails.
 */
async function fetchListingsCommon(
  url,
  params = {},
  defaultErrorMessage = "Failed to fetch listings",
) {
  const endpoint = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== false && value !== undefined && value !== null) {
      endpoint.searchParams.append(key, value);
    }
  });

  showLoadingSpinner();

  try {
    return await apiFetchWithHandling(
      endpoint,
      { method: "GET" },
      defaultErrorMessage,
    );
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches auction listings with pagination, sorting, and filtering options.
 *
 * @param {number} [limit=24] - Max number of listings per page.
 * @param {number} [page=1] - Page number to retrieve.
 * @param {boolean} [_seller=true] - Include seller info.
 * @param {string} [sort="created"] - Sort field.
 * @param {string} [sortOrder="desc"] - Sort order ("asc" or "desc").
 * @param {boolean} [active=false] - Filter by active status.
 * @returns {Promise<Object>} Auction listings data.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchListings(
  limit = 24,
  page = 1,
  _seller = true,
  sort = "created",
  sortOrder = "desc",
  active = false,
) {
  return fetchListingsCommon(API_AUCTION_LISTINGS, {
    limit,
    page,
    _seller,
    sort,
    sortOrder,
    _active: active === false ? undefined : active,
  });
}

/**
 * Fetches auction listings filtered by a specific tag with pagination.
 *
 * @param {number} [limit=24] - Max number of listings per page.
 * @param {number} [page=1] - Page number.
 * @param {boolean} [seller=true] - Include seller info.
 * @param {boolean} [active=false] - Filter by active status.
 * @param {string} [tag="art"] - Tag to filter listings by.
 * @returns {Promise<Object>} Auction listings data filtered by tag.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchListingsArt(
  limit = 24,
  page = 1,
  seller = true,
  active = false,
  tag = "art",
) {
  return fetchListingsCommon(API_AUCTION_LISTINGS, {
    limit,
    page,
    _seller: seller,
    _tag: tag,
    _active: active === false ? undefined : active,
  });
}

/**
 * Same as fetchListingsArt but for "books" tag.
 */
export async function fetchListingsBooks(
  limit = 24,
  page = 1,
  seller = true,
  active = false,
  tag = "books",
) {
  return fetchListingsCommon(API_AUCTION_LISTINGS, {
    limit,
    page,
    _seller: seller,
    _tag: tag,
    _active: active === false ? undefined : active,
  });
}

/**
 * Same as fetchListingsArt but for "jewelry" tag.
 */
export async function fetchListingsJewelry(
  limit = 24,
  page = 1,
  seller = true,
  active = false,
  tag = "jewelry",
) {
  return fetchListingsCommon(API_AUCTION_LISTINGS, {
    limit,
    page,
    _seller: seller,
    _tag: tag,
    _active: active === false ? undefined : active,
  });
}

/**
 * Fetches a single auction listing by its ID.
 *
 * @param {string} id - Listing ID.
 * @param {boolean} [seller=true] - Include seller info.
 * @param {boolean} [bids=true] - Include bids info.
 * @returns {Promise<Object>} Single listing data.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchSingleListing(id, seller = true, bids = true) {
  const endpoint = `${API_AUCTION_LISTINGS}/${id}`;
  return fetchListingsCommon(endpoint, {
    _seller: seller,
    _bids: bids,
  });
}

/**
 * Fetches listings with a specific tag (default "myUniqueTag932").
 *
 * @param {string} [tag="myUniqueTag932"] - Tag filter.
 * @returns {Promise<Object>} Listings filtered by tag.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchListingsSpecific(tag = "myUniqueTag932") {
  return fetchListingsCommon(API_AUCTION_LISTINGS, {
    _tag: tag,
  });
}

/**
 * Fetches listings from a specific user's profile.
 *
 * @param {string} username - Profile username.
 * @param {boolean} [_seller=true] - Include seller info.
 * @param {boolean} [active=false] - Filter by active status.
 * @returns {Promise<Object>} Listings from the user's profile.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchListingsByProfile(
  username,
  _seller = true,
  active = false,
) {
  const endpoint = `${API_AUCTION_PROFILES}/${username}/listings`;
  return fetchListingsCommon(endpoint, {
    _seller,
    _active: active === false ? undefined : active,
  });
}

import { API_AUCTION_LISTINGS } from "../../constants";
import { API_AUCTION_PROFILES } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

/**
 * Fetches auction listings with pagination and optional filtering.
 *
 * @param {number} [limit=24] - The maximum number of listings to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {boolean} [_seller=true] - Whether to include seller information in the response.
 * @param {string} [sort="created"] - The field to sort the listings by.
 * @param {string} [sortOrder="desc"] - The order to sort listings (asc/desc).
 * @param {boolean} [active=false] - Whether to filter listings by their active status.
 * @returns {Promise<Object>} The list of auction listings.
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
  const endpoint = new URL(API_AUCTION_LISTINGS);
  endpoint.searchParams.append("limit", limit);
  endpoint.searchParams.append("page", page);
  endpoint.searchParams.append("_seller", _seller);
  endpoint.searchParams.append("sort", sort);
  endpoint.searchParams.append("sortOrder", sortOrder);

  if (active !== false) {
    endpoint.searchParams.append("_active", active);
  }
  showLoadingSpinner();
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch posts: " + errorText);
    }

    const listingsData = await response.json();
    return listingsData;
  } catch (error) {
    console.error("Fetching listings failed: ", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches auction listings with a specific "art" tag and optional pagination and filtering.
 *
 * @param {number} [limit=24] - The maximum number of listings to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {boolean} [seller=true] - Whether to include seller information in the response.
 * @param {boolean} [active=false] - Whether to filter listings by their active status.
 * @param {string} [tag="art"] - The tag to filter listings by.
 * @returns {Promise<Object>} The list of "art" tagged auction listings.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchListingsArt(
  limit = 24,
  page = 1,
  seller = true,
  active = false,
  tag = "art",
) {
  const endpoint = new URL(API_AUCTION_LISTINGS);
  endpoint.searchParams.append("limit", limit);
  endpoint.searchParams.append("page", page);
  endpoint.searchParams.append("_seller", seller);
  endpoint.searchParams.append("_tag", tag);

  if (active !== false) {
    endpoint.searchParams.append("_active", active);
  }
  showLoadingSpinner();
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch posts: " + errorText);
    }

    const listingsData = await response.json();
    return listingsData;
  } catch (error) {
    console.error("Fetching listings failed: ", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches auction listings with a specific "books" tag and optional pagination and filtering.
 *
 * @param {number} [limit=24] - The maximum number of listings to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {boolean} [seller=true] - Whether to include seller information in the response.
 * @param {boolean} [active=false] - Whether to filter listings by their active status.
 * @param {string} [tag="books"] - The tag to filter listings by.
 * @returns {Promise<Object>} The list of "books" tagged auction listings.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchListingsBooks(
  limit = 24,
  page = 1,
  seller = true,
  active = false,
  tag = "books",
) {
  const endpoint = new URL(API_AUCTION_LISTINGS);
  endpoint.searchParams.append("limit", limit);
  endpoint.searchParams.append("page", page);
  endpoint.searchParams.append("_seller", seller);
  endpoint.searchParams.append("_tag", tag);

  if (active !== false) {
    endpoint.searchParams.append("_active", active);
  }
  showLoadingSpinner();
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch posts: " + errorText);
    }

    const listingsData = await response.json();
    return listingsData;
  } catch (error) {
    console.error("Fetching listings failed: ", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches auction listings with a specific "jewelry" tag and optional pagination and filtering.
 *
 * @param {number} [limit=24] - The maximum number of listings to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {boolean} [seller=true] - Whether to include seller information in the response.
 * @param {boolean} [active=false] - Whether to filter listings by their active status.
 * @param {string} [tag="jewelry"] - The tag to filter listings by.
 * @returns {Promise<Object>} The list of "jewelry" tagged auction listings.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchListingsJewelry(
  limit = 24,
  page = 1,
  seller = true,
  active = false,
  tag = "jewelry",
) {
  const endpoint = new URL(API_AUCTION_LISTINGS);
  endpoint.searchParams.append("limit", limit);
  endpoint.searchParams.append("page", page);
  endpoint.searchParams.append("_seller", seller);
  endpoint.searchParams.append("_tag", tag);

  if (active !== false) {
    endpoint.searchParams.append("_active", active);
  }
  showLoadingSpinner();
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch posts: " + errorText);
    }

    const listingsData = await response.json();
    return listingsData;
  } catch (error) {
    console.error("Fetching listings failed: ", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches a single auction listing by its ID with optional seller and bid information.
 *
 * @param {string} id - The ID of the auction listing to fetch.
 * @param {boolean} [seller=true] - Whether to include seller information in the response.
 * @param {boolean} [bids=true] - Whether to include bid information in the response.
 * @returns {Promise<Object>} The auction listing data.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchSingleListing(id, seller = true, bids = true) {
  try {
    const endpoint = new URL(`${API_AUCTION_LISTINGS}/${id}`);
    endpoint.searchParams.append("_seller", seller);
    endpoint.searchParams.append("_bids", bids);

    console.log("API Endpoint:", endpoint.toString());
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch post: " + errorText);
    }

    const listingData = await response.json();
    return listingData;
  } catch (error) {
    console.error("Fetching post failed: ", error);
    throw error;
  }
}

/**
 * Fetches auction listings with a specific tag and optional pagination and filtering.
 *
 * @param {string} [tag="myUniqueTag932"] - The tag to filter listings by.
 * @param {number} [limit=24] - The maximum number of listings to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {boolean} [active=false] - Whether to filter listings by their active status.
 * @returns {Promise<Object>} The list of auction listings with the specified tag.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchListingsSpecific(tag = "myUniqueTag932") {
  const endpoint = new URL(API_AUCTION_LISTINGS);
  endpoint.searchParams.append("_tag", tag);

  showLoadingSpinner();
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch posts: " + errorText);
    }

    const listingsData = await response.json();

    return listingsData;
  } catch (error) {
    console.error("Fetching listings failed: ", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

/**
 * Fetches auction listings from a specific user's profile, with optional filtering by active status.
 *
 * @param {string} username - The username of the profile to fetch listings from.
 * @param {boolean} [_seller=true] - Whether to include seller information in the response.
 * @param {boolean} [active=false] - Whether to filter listings by their active status.
 * @returns {Promise<Object>} The list of auction listings from the specified user's profile.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchListingsByProfile(
  username,
  _seller = true,
  active = false,
) {
  const endpoint = new URL(`${API_AUCTION_PROFILES}/${username}/listings`);
  endpoint.searchParams.append("_seller", _seller);

  if (active !== false) {
    endpoint.searchParams.append("_active", active);
  }
  showLoadingSpinner();
  try {
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch posts: " + errorText);
    }

    const listingsData = await response.json();
    return listingsData;
  } catch (error) {
    console.error("Fetching listings failed: ", error);
    throw error;
  } finally {
    hideLoadingSpinner();
  }
}

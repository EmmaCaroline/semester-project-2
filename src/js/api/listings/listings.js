import { API_AUCTION_LISTINGS } from "../../constants";
import { API_AUCTION_PROFILES } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

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

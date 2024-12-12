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

/*export async function fetchListing(
  id,
  title,
  description,
  tags,
  media,
  created,
  _seller,
  _bids,
) {
  if (isNaN(id)) {
    throw new Error("Invalid post ID: must be a number");
  }

  try {
    // Construct the endpoint with query parameters
    const endpoint = new URL(`${API_AUCTION_LISTINGS}/${id}`);
    if (title) endpoint.searchParams.append("title", title);
    if (description) endpoint.searchParams.append("description", description);
    if (tags) endpoint.searchParams.append("tags", tags);
    if (media) endpoint.searchParams.append("media", media);
    if (created) endpoint.searchParams.append("created", created);
    if (_seller) endpoint.searchParams.append("_seller", _seller);
    if (_bids) endpoint.searchParams.append("_bids", _bids);

    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch post: " + errorText);
    }

    const listingData = await response.json();
    return listingData; // Adjust to `listingData.data` if the API returns data in a nested object
  } catch (error) {
    console.error("Fetching post failed: ", error);
    throw error;
  }
}

export async function fetchListingsByUser(
  username,
  title,
  tags,
  media,
  endsAt,
  _seller,
  _count,
) {
  try {
    // Construct the endpoint URL with the base path
    const endpoint = new URL(`${API_AUCTION_PROFILES}/${username}/listings`);

    // Add query parameters if provided
    if (title) endpoint.searchParams.append("title", title);
    if (tags) endpoint.searchParams.append("tags", tags);
    if (media) endpoint.searchParams.append("media", media);
    if (endsAt) endpoint.searchParams.append("endsAt", endsAt);
    if (_seller) endpoint.searchParams.append("_seller", _seller);
    if (_count) endpoint.searchParams.append("_count", _count);

    // Make the fetch request
    const response = await fetch(endpoint, {
      headers: headers(),
      method: "GET",
    });

    // Handle response errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to fetch listings: " + errorText);
    }

    // Parse and return the response JSON
    const listingsData = await response.json();
    return listingsData; // Adjust to `listingsData.data` if needed based on API structure
  } catch (error) {
    console.error("Fetching listings failed: ", error);
    throw error;
  }
}*/

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

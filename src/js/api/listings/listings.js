import { API_AUCTION_LISTINGS } from "../../constants";
import { API_AUCTION_PROFILES } from "../../constants";
import { headers } from "../headers";

export async function readPosts(
  limit = 24,
  title,
  tags,
  media,
  endsAt,
  _seller,
  _count,
) {
  try {
    let allListings = [];
    let page = 1;
    let hasMoreListings = true;

    while (hasMoreListings) {
      // Construct the endpoint with query parameters
      const endpoint = new URL(API_AUCTION_LISTINGS);
      endpoint.searchParams.append("limit", limit);
      endpoint.searchParams.append("page", page);
      if (title) endpoint.searchParams.append("title", title);
      if (tags) endpoint.searchParams.append("tags", tags);
      if (media) endpoint.searchParams.append("media", media);
      if (endsAt) endpoint.searchParams.append("endsAt", endsAt);
      if (_seller) endpoint.searchParams.append("_seller", _seller);
      if (_count) endpoint.searchParams.append("_count", _count);

      const response = await fetch(endpoint, {
        headers: headers(),
        method: "GET",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Failed to fetch posts: " + errorText);
      }

      const listingsData = await response.json();

      if (listingsData.length === 0) {
        // No more posts, stop the loop
        hasMoreListings = false;
      } else {
        // Append fetched posts to the result array
        allListings = allListings.concat(listingsData);
        page++; // Increment the page number for the next request
      }
    }

    return allListings;
  } catch (error) {
    console.error("Fetching posts failed: ", error);
    throw error;
  }
}

export async function readPost(
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

export async function readListingsByUser(
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
}
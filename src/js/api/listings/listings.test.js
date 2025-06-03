/**
 * @jest-environment jsdom
 */

import {
  fetchListingsCommon,
  fetchListings,
  fetchListingsArt,
  fetchListingsBooks,
  fetchListingsJewelry,
  fetchSingleListing,
  fetchListingsSpecific,
  fetchListingsByProfile,
} from "./listings"; // adjust path if needed

// Mock fetch globally for apiFetchWithHandling
global.fetch = jest.fn();

// Mock loading spinner utilities
jest.mock("../../utilities/loadingSpinner", () => ({
  showLoadingSpinner: jest.fn(),
  hideLoadingSpinner: jest.fn(),
}));

import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

describe("Listings API fetch functions", () => {
  beforeEach(() => {
    fetch.mockClear();
    showLoadingSpinner.mockClear();
    hideLoadingSpinner.mockClear();

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe("fetchListingsCommon", () => {
    it("appends query params and calls apiFetchWithHandling", async () => {
      const mockData = { results: [1, 2, 3] };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
        text: async () => JSON.stringify(mockData), // added text()
      });

      const url = "https://api.example.com/test";
      const params = { limit: 10, active: true, ignore: false };

      const result = await fetchListingsCommon(url, params, "fail message");

      expect(showLoadingSpinner).toHaveBeenCalledTimes(1);
      expect(hideLoadingSpinner).toHaveBeenCalledTimes(1);

      expect(fetch).toHaveBeenCalledTimes(1);
      const calledUrl = fetch.mock.calls[0][0].toString();
      expect(calledUrl).toContain("limit=10");
      expect(calledUrl).toContain("active=true");
      expect(calledUrl).not.toContain("ignore=false"); // false params should be ignored

      expect(result).toEqual(mockData);
    });

    it("throws and logs error on fetch failure", async () => {
      const error = new Error("Fetch failed");
      fetch.mockRejectedValueOnce(error);

      await expect(
        fetchListingsCommon("https://api.example.com/"),
      ).rejects.toThrow("Fetch failed");

      expect(console.error).toHaveBeenCalledWith(error);
      expect(showLoadingSpinner).toHaveBeenCalledTimes(1);
      expect(hideLoadingSpinner).toHaveBeenCalledTimes(1);
    });
  });

  describe("fetchListings and variants", () => {
    it("fetchListings calls fetchListingsCommon with correct params", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ listings: [] }),
        text: async () => '{"listings": []}', // added text()
      });

      const result = await fetchListings(12, 2, false, "title", "asc", true);

      expect(fetch).toHaveBeenCalledTimes(1);
      const calledUrl = fetch.mock.calls[0][0].toString();

      expect(calledUrl).toContain("limit=12");
      expect(calledUrl).toContain("page=2");
      expect(calledUrl).toContain("_seller=false");
      expect(calledUrl).toContain("sort=title");
      expect(calledUrl).toContain("sortOrder=asc");
      expect(calledUrl).toContain("_active=true");

      expect(result).toEqual({ listings: [] });
    });

    it("fetchListingsArt includes _tag=art by default", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ artListings: [] }),
        text: async () => '{"artListings": []}', // added text()
      });
      await fetchListingsArt();

      const calledUrl = fetch.mock.calls[0][0].toString();
      expect(calledUrl).toContain("_tag=art");
    });

    it("fetchListingsBooks includes _tag=books", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ bookListings: [] }),
        text: async () => '{"bookListings": []}', // added text()
      });
      await fetchListingsBooks();

      const calledUrl = fetch.mock.calls[0][0].toString();
      expect(calledUrl).toContain("_tag=books");
    });

    it("fetchListingsJewelry includes _tag=jewelry", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ jewelryListings: [] }),
        text: async () => '{"jewelryListings": []}', // added text()
      });
      await fetchListingsJewelry();

      const calledUrl = fetch.mock.calls[0][0].toString();
      expect(calledUrl).toContain("_tag=jewelry");
    });

    it("fetchSingleListing calls with correct endpoint and params", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "abc", title: "Single" }),
        text: async () => '{"id":"abc","title":"Single"}', // added text()
      });

      const id = "abc";
      await fetchSingleListing(id, false, false);

      const calledUrl = fetch.mock.calls[0][0].toString();
      expect(calledUrl).toContain(id);
      expect(calledUrl).toContain("_seller=false");
      expect(calledUrl).toContain("_bids=false");
    });

    it("fetchListingsSpecific calls with default tag", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [] }),
        text: async () => '{"results": []}', // added text()
      });
      await fetchListingsSpecific();

      const calledUrl = fetch.mock.calls[0][0].toString();
      expect(calledUrl).toContain("_tag=myUniqueTag932");
    });

    it("fetchListingsByProfile calls with correct username and params", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ profileListings: [] }),
        text: async () => '{"profileListings": []}', // added text()
      });

      const username = "user123";
      await fetchListingsByProfile(username, false, true);

      const calledUrl = fetch.mock.calls[0][0].toString();
      expect(calledUrl).toContain(username);
      expect(calledUrl).toContain("_seller=false");
      expect(calledUrl).toContain("_active=true");
    });
  });
});

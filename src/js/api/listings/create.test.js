/**
 * @jest-environment jsdom
 */

import { createListing } from "./create";

// Mock fetch globally for apiFetchWithHandling
global.fetch = jest.fn();

// Mock alert globally
global.alert = jest.fn();

// Mock the loading spinner utilities
jest.mock("../../utilities/loadingSpinner", () => ({
  showLoadingSpinner: jest.fn(),
  hideLoadingSpinner: jest.fn(),
}));

import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

describe("createListing", () => {
  beforeEach(() => {
    fetch.mockClear();
    global.alert.mockClear();
    showLoadingSpinner.mockClear();
    hideLoadingSpinner.mockClear();

    // Mock console.error to silence errors in test output
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error to original after each test
    console.error.mockRestore();
  });

  it("should show spinner, send POST request, and return result", async () => {
    const mockResponse = { id: "abc123", title: "Test" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = {
      title: "Test title",
      description: "Test desc",
      tags: ["tag1", "tag2"],
      media: ["https://example.com/image.jpg"],
      endsAt: "2025-06-30T12:00:00Z",
    };

    const result = await createListing(data);

    expect(showLoadingSpinner).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("auction/listings"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(data),
      }),
    );

    expect(result).toEqual(mockResponse);
    expect(hideLoadingSpinner).toHaveBeenCalledTimes(1);
  });

  it("should alert and throw on network error", async () => {
    fetch.mockRejectedValueOnce(new TypeError("Network failure"));

    const data = {
      title: "Fail test",
      description: "desc",
      tags: [],
      media: [],
      endsAt: "2025-06-30T12:00:00Z",
    };

    await expect(createListing(data)).rejects.toThrow(TypeError);

    expect(global.alert).toHaveBeenCalledWith("Network error, try again later");
    expect(showLoadingSpinner).toHaveBeenCalledTimes(1);
    expect(hideLoadingSpinner).toHaveBeenCalledTimes(1);
  });

  it("should alert and throw on other errors from API", async () => {
    const errorMessage = "Failed to create post. Something went wrong";
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: errorMessage }),
    });

    const data = {
      title: "Fail test 2",
      description: "desc",
      tags: [],
      media: [],
      endsAt: "2025-06-30T12:00:00Z",
    };

    await expect(createListing(data)).rejects.toThrow(errorMessage);

    expect(global.alert).toHaveBeenCalledWith(
      `Creating post failed: ${errorMessage}`,
    );
    expect(showLoadingSpinner).toHaveBeenCalledTimes(1);
    expect(hideLoadingSpinner).toHaveBeenCalledTimes(1);
  });
});

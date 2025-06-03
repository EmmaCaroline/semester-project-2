/**
 * @jest-environment jsdom
 */

// Mock Response for fetch
global.Response = class {
  constructor(body, init) {
    this.body = body;
    this.status = init.status;
    this.headers = init.headers;
  }
  async json() {
    return JSON.parse(this.body);
  }
  async text() {
    return this.body;
  }
  get ok() {
    return this.status >= 200 && this.status < 300;
  }
};

import { updateProfile } from "./update";
import { API_AUCTION_PROFILES } from "../../constants";
import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

jest.mock("../../headers", () => ({
  headers: jest.fn(() => ({ "Content-Type": "application/json" })),
}));

jest.mock("../../utilities/loadingSpinner", () => ({
  showLoadingSpinner: jest.fn(),
  hideLoadingSpinner: jest.fn(),
}));

describe("updateProfile", () => {
  const username = "testuser";
  const updatedData = {
    name: "Test User",
    email: "test@example.com",
    bio: "Hello world",
    tags: ["tag1", "tag2"],
    media: ["https://example.com/image.jpg"],
  };
  const endpoint = `${API_AUCTION_PROFILES}/${username}`;

  beforeEach(() => {
    global.fetch = jest.fn();
    headers.mockClear();
    showLoadingSpinner.mockClear();
    hideLoadingSpinner.mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {}); // silence error logs
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it("shows and hides loading spinner and returns updated data on success", async () => {
    const mockResponseData = { data: { ...updatedData } };
    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponseData), { status: 200 }),
    );

    const result = await updateProfile(username, updatedData);

    expect(showLoadingSpinner).toHaveBeenCalled();
    expect(hideLoadingSpinner).toHaveBeenCalled();
    expect(headers).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endpoint, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(updatedData),
    });
    expect(result).toEqual(mockResponseData);
  });

  it("throws error and hides spinner when response is not ok", async () => {
    fetch.mockResolvedValueOnce(
      new Response("Bad request", { status: 400, statusText: "Bad Request" }),
    );

    await expect(updateProfile(username, updatedData)).rejects.toThrow(
      /Failed to update profile: Bad request/,
    );

    expect(showLoadingSpinner).toHaveBeenCalled();
    expect(hideLoadingSpinner).toHaveBeenCalled();
  });

  it("logs error and rethrows on network error", async () => {
    const networkError = new TypeError("Network failure");
    fetch.mockRejectedValueOnce(networkError);
    const consoleErrorSpy = jest.spyOn(console, "error");

    await expect(updateProfile(username, updatedData)).rejects.toThrow(
      "Network failure",
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Updating profile failed: ",
      networkError,
    );
    expect(hideLoadingSpinner).toHaveBeenCalled();
  });
});

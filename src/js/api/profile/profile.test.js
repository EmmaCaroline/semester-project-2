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

// Import the function to test
import { readProfile } from "./profile";

// Mock dependencies
jest.mock("../../headers", () => ({
  headers: jest.fn(() => ({ "Content-Type": "application/json" })),
}));

jest.mock("../../utilities/loadingSpinner", () => ({
  showLoadingSpinner: jest.fn(),
  hideLoadingSpinner: jest.fn(),
}));

import { headers } from "../../headers";
import {
  showLoadingSpinner,
  hideLoadingSpinner,
} from "../../utilities/loadingSpinner";

describe("readProfile", () => {
  // Mute console.log and console.error during tests
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });
  const mockUsername = "testuser";

  beforeEach(() => {
    global.fetch = jest.fn();
    headers.mockClear();
    showLoadingSpinner.mockClear();
    hideLoadingSpinner.mockClear();
    global.alert = jest.fn();
  });

  it("calls showLoadingSpinner and hideLoadingSpinner", async () => {
    const mockUserData = { data: { bio: "This is a bio" } };

    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockUserData), { status: 200 }),
    );

    const result = await readProfile(mockUsername);

    expect(showLoadingSpinner).toHaveBeenCalled();
    expect(hideLoadingSpinner).toHaveBeenCalled();
    expect(result).toEqual(mockUserData.data);
  });

  it("calls fetch with correct endpoint and headers", async () => {
    const mockUserData = { data: { bio: "This is a bio" } };

    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockUserData), { status: 200 }),
    );

    await readProfile(mockUsername);

    expect(headers).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(mockUsername), {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
  });

  it("throws and alerts when response is not ok", async () => {
    fetch.mockResolvedValueOnce(new Response("Not found", { status: 404 }));

    await expect(readProfile(mockUsername)).rejects.toThrow(
      "Failed to fetch profile: Not found",
    );

    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Fetching profile failed"),
    );
  });

  it("alerts on network error (TypeError) and rethrows", async () => {
    fetch.mockRejectedValueOnce(new TypeError("Network failure"));

    await expect(readProfile(mockUsername)).rejects.toThrow("Network failure");

    expect(global.alert).toHaveBeenCalledWith("Network error, try again later");
  });

  it("alerts on other errors and rethrows", async () => {
    fetch.mockRejectedValueOnce(new Error("Some other error"));

    await expect(readProfile(mockUsername)).rejects.toThrow("Some other error");

    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Fetching profile failed"),
    );
  });
});

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

import { readWins } from "./wins";
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

describe("readWins", () => {
  const username = "testuser";
  const endpoint = `${API_AUCTION_PROFILES}/${username}/wins?_seller=true&_bids=true`;

  beforeEach(() => {
    global.fetch = jest.fn();
    headers.mockClear();
    showLoadingSpinner.mockClear();
    hideLoadingSpinner.mockClear();
    global.alert = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it("fetches wins successfully and returns data", async () => {
    const mockData = {
      data: [
        { id: 1, item: "Item 1" },
        { id: 2, item: "Item 2" },
      ],
    };
    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockData), { status: 200 }),
    );

    const result = await readWins(username);

    expect(showLoadingSpinner).toHaveBeenCalled();
    expect(hideLoadingSpinner).toHaveBeenCalled();
    expect(headers).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endpoint, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
    expect(result).toEqual(mockData.data);
  });

  it("throws error and alerts when response is not ok", async () => {
    fetch.mockResolvedValueOnce(new Response("Not found", { status: 404 }));

    await expect(readWins(username)).rejects.toThrow(
      /Failed to fetch wins: Not found/,
    );

    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Fetching wins failed"),
    );
    expect(showLoadingSpinner).toHaveBeenCalled();
    expect(hideLoadingSpinner).toHaveBeenCalled();
  });

  it("alerts on network error (TypeError) and rethrows", async () => {
    fetch.mockRejectedValueOnce(new TypeError("Network failure"));

    await expect(readWins(username)).rejects.toThrow("Network failure");

    expect(global.alert).toHaveBeenCalledWith("Network error, try again later");
    expect(hideLoadingSpinner).toHaveBeenCalled();
  });

  it("alerts on other errors and rethrows", async () => {
    fetch.mockRejectedValueOnce(new Error("Unknown error"));

    await expect(readWins(username)).rejects.toThrow("Unknown error");

    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Fetching wins failed"),
    );
    expect(hideLoadingSpinner).toHaveBeenCalled();
  });
});

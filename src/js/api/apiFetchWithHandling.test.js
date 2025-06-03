/**
 * @jest-environment jsdom
 */

// defines a mock Response class
global.Response = class {
  constructor(body, init) {
    this.body = body;
    this.status = init.status;
    this.headers = init.headers;
  }
  async json() {
    return JSON.parse(this.body);
  }
  get ok() {
    return this.status >= 200 && this.status < 300;
  }
};

import { apiFetchWithHandling } from "./apiFetchWithHandling";

// Mock dependencies
jest.mock("../headers", () => ({
  headers: jest.fn(() => ({ "Content-Type": "application/json" })),
}));

jest.mock("../utilities/handleResponseWithFallback", () => ({
  handleResponseWithFallback: jest.fn(),
}));

import { headers } from "../headers";
import { handleResponseWithFallback } from "../utilities/handleResponseWithFallback";

describe("apiFetchWithHandling", () => {
  const mockUrl = "https://api.example.com/test";
  const mockOptions = {
    method: "POST",
    body: JSON.stringify({ test: true }),
  };

  beforeEach(() => {
    global.fetch = jest.fn();
    headers.mockClear();
    handleResponseWithFallback.mockClear();
  });

  it("should call fetch with headers and options, and return parsed result", async () => {
    const mockResponse = new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    fetch.mockResolvedValueOnce(mockResponse);
    handleResponseWithFallback.mockResolvedValueOnce({ ok: true });

    const result = await apiFetchWithHandling(mockUrl, mockOptions, "Error");

    expect(headers).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      ...mockOptions,
      headers: { "Content-Type": "application/json" },
    });
    expect(handleResponseWithFallback).toHaveBeenCalledWith(
      mockResponse,
      "Error",
    );
    expect(result).toEqual({ ok: true });
  });

  it("should throw if fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(
      apiFetchWithHandling(mockUrl, mockOptions, "Fallback error"),
    ).rejects.toThrow("Network error");
  });
});

/**
 * @jest-environment jsdom
 */

import { fetchBid } from "./bid";

jest.mock("../apiFetchWithHandling", () => ({
  apiFetchWithHandling: jest.fn(),
}));

import { apiFetchWithHandling } from "../apiFetchWithHandling";

describe("fetchBid", () => {
  beforeEach(() => {
    apiFetchWithHandling.mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("should call apiFetchWithHandling with correct URL, method, and body, and return result", async () => {
    const mockResult = { bidId: "bid123", amount: 100 };

    apiFetchWithHandling.mockResolvedValueOnce(mockResult);

    const id = "123e4567-e89b-12d3-a456-426614174000";
    const bidParams = { amount: 100 };

    const result = await fetchBid(id, bidParams);

    expect(apiFetchWithHandling).toHaveBeenCalledTimes(1);
    expect(apiFetchWithHandling).toHaveBeenCalledWith(
      expect.stringContaining(`${id}/bids`),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ amount: 100 }),
      }),
      "Failed to place bid.",
    );

    expect(result).toEqual(mockResult);
  });

  it("should log error and rethrow if apiFetchWithHandling fails", async () => {
    const error = new Error("Bid failed");
    apiFetchWithHandling.mockRejectedValueOnce(error);

    const id = "123e4567-e89b-12d3-a456-426614174000";
    const bidParams = { amount: 50 };

    await expect(fetchBid(id, bidParams)).rejects.toThrow(error);

    expect(console.error).toHaveBeenCalledWith("Fetching bid failed:", error);
  });
});

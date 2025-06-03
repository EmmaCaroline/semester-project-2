/**
 * @jest-environment jsdom
 */

import { deletePost } from "./delete";

// Mock apiFetchWithHandling module
jest.mock("../apiFetchWithHandling", () => ({
  apiFetchWithHandling: jest.fn(),
}));

import { apiFetchWithHandling } from "../apiFetchWithHandling";

describe("deletePost", () => {
  beforeEach(() => {
    apiFetchWithHandling.mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("should call apiFetchWithHandling with correct URL and method", async () => {
    apiFetchWithHandling.mockResolvedValueOnce();

    const id = "123e4567-e89b-12d3-a456-426614174000";

    await deletePost(id);

    expect(apiFetchWithHandling).toHaveBeenCalledTimes(1);
    expect(apiFetchWithHandling).toHaveBeenCalledWith(
      expect.stringContaining(id),
      expect.objectContaining({ method: "DELETE" }),
      "Failed to delete post.",
    );
  });

  it("should throw error if id is missing or invalid", async () => {
    // Missing id
    await expect(deletePost()).rejects.toThrow(
      "Invalid post ID: must be a valid string (UUID).",
    );

    // id not a string
    await expect(deletePost(123)).rejects.toThrow(
      "Invalid post ID: must be a valid string (UUID).",
    );

    await expect(deletePost(null)).rejects.toThrow(
      "Invalid post ID: must be a valid string (UUID).",
    );
  });

  it("should log error and rethrow if apiFetchWithHandling fails", async () => {
    const error = new Error("Network error");
    apiFetchWithHandling.mockRejectedValueOnce(error);

    const id = "123e4567-e89b-12d3-a456-426614174000";

    await expect(deletePost(id)).rejects.toThrow(error);

    expect(console.error).toHaveBeenCalledWith("Deleting post failed:", error);
  });
});

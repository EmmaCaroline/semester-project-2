import { updateListing } from "./update";

// Mock fetch globally
global.fetch = jest.fn();

// Mock alert globally
global.alert = jest.fn();

describe("updateListing", () => {
  beforeEach(() => {
    fetch.mockClear();
    global.alert.mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("should send PUT request and return updated result", async () => {
    const mockId = "listing123";
    const mockResponse = { id: mockId, title: "Updated title" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const updatedData = {
      title: "Updated title",
      description: "Updated description",
      tags: ["updated", "tags"],
      media: "https://example.com/updated.jpg",
    };

    const result = await updateListing(mockId, updatedData);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/auction/listings/${mockId}`),
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify(updatedData),
      }),
    );

    expect(result).toEqual(mockResponse);
  });

  it("should throw and log error on network failure", async () => {
    const mockId = "fail123";

    fetch.mockRejectedValueOnce(new TypeError("Network failure"));

    const updatedData = {
      title: "Fail",
      description: "Test",
      tags: [],
      media: "",
    };

    await expect(updateListing(mockId, updatedData)).rejects.toThrow(TypeError);
    expect(console.error).toHaveBeenCalledWith(
      "Updating listing failed:",
      expect.any(TypeError),
    );
  });

  it("should throw and log error on non-OK response", async () => {
    const mockId = "fail456";

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}), // No message provided = fallback is used
    });

    const updatedData = {
      title: "Fail again",
      description: "More fails",
      tags: [],
      media: "",
    };

    await expect(updateListing(mockId, updatedData)).rejects.toThrow(
      "Failed to update listing.",
    );

    expect(console.error).toHaveBeenCalled();
  });
});

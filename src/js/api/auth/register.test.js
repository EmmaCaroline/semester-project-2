import { register } from "./register";
import { API_AUTH_REGISTER } from "../../constants";
import * as loadingSpinner from "../../utilities/loadingSpinner";

describe("register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(global, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("registers successfully and returns result", async () => {
    const fakeResponse = {
      data: { id: 1, name: "Test User", email: "test@example.com" },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(fakeResponse),
    });

    const params = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };
    const result = await register(params);

    expect(fetch).toHaveBeenCalledWith(API_AUTH_REGISTER, {
      headers: expect.any(Object),
      method: "POST",
      body: JSON.stringify(params),
    });

    expect(result).toEqual(fakeResponse);
  });

  it("throws error if response is not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValueOnce("Email already taken"),
    });

    await expect(
      register({ name: "Fail", email: "fail@example.com", password: "wrong" }),
    ).rejects.toThrow(/Failed to register: Email already taken/);
  });

  it("shows alert and throws on network error (TypeError)", async () => {
    const networkError = new TypeError("Failed to fetch");
    fetch.mockRejectedValueOnce(networkError);

    await expect(
      register({ name: "Fail", email: "fail@example.com", password: "wrong" }),
    ).rejects.toThrow(networkError);

    expect(global.alert).toHaveBeenCalledWith("Network error, try again later");
    expect(console.error).toHaveBeenCalledWith(
      "Registration failed",
      networkError,
    );
  });

  it("shows alert and throws on other errors", async () => {
    const error = new Error("Server crashed");
    fetch.mockRejectedValueOnce(error);

    await expect(
      register({ name: "Fail", email: "fail@example.com", password: "wrong" }),
    ).rejects.toThrow(error);

    expect(global.alert).toHaveBeenCalledWith(
      `Registration failed: ${error.message}`,
    );
    expect(console.error).toHaveBeenCalledWith("Registration failed", error);
  });

  it("shows and hides loading spinner", async () => {
    const showSpy = jest.spyOn(loadingSpinner, "showLoadingSpinner");
    const hideSpy = jest.spyOn(loadingSpinner, "hideLoadingSpinner");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        data: { id: 1, name: "Test", email: "test@example.com" },
      }),
    });

    await register({
      name: "Test",
      email: "test@example.com",
      password: "pass",
    });

    expect(showSpy).toHaveBeenCalled();
    expect(hideSpy).toHaveBeenCalled();
  });
});

import { login } from "./login";
import * as storage from "./key";
import * as loadingSpinner from "../../utilities/loadingSpinner";
import { API_AUTH_LOGIN } from "../../constants";

describe("login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    jest.spyOn(storage, "save").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("logs in successfully and saves token and user", async () => {
    const fakeResponse = {
      data: {
        accessToken: "fakeToken",
        id: 123,
        email: "test@example.com",
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(fakeResponse),
    });

    const params = { email: "test@example.com", password: "password123" };
    const result = await login(params);

    expect(fetch).toHaveBeenCalledWith(API_AUTH_LOGIN, {
      headers: expect.any(Object),
      method: "POST",
      body: JSON.stringify(params),
    });

    expect(storage.save).toHaveBeenCalledWith(
      "token",
      fakeResponse.data.accessToken,
    );
    expect(storage.save).toHaveBeenCalledWith("user", fakeResponse.data);
    expect(result).toEqual(fakeResponse);
  });

  it("throws error if response is not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValueOnce("Invalid credentials"),
    });

    await expect(
      login({ email: "fail@example.com", password: "wrong" }),
    ).rejects.toThrow(/Login failed: Invalid credentials/);
  });

  it("throws error if fetch throws", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(
      login({ email: "fail@example.com", password: "wrong" }),
    ).rejects.toThrow(/Network error/);
  });

  it("shows and hides loading spinner", async () => {
    const showSpy = jest.spyOn(loadingSpinner, "showLoadingSpinner");
    const hideSpy = jest.spyOn(loadingSpinner, "hideLoadingSpinner");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        data: { accessToken: "token", id: 1, email: "e" },
      }),
    });

    await login({ email: "a", password: "b" });

    expect(showSpy).toHaveBeenCalled();
    expect(hideSpy).toHaveBeenCalled();
  });
});

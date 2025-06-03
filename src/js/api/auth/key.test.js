import { save, load, remove } from "./key";

describe("localStorage helpers", () => {
  beforeEach(() => {
    // Mock localStorage methods
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    jest.clearAllMocks();
  });

  it("save calls localStorage.setItem with JSON stringified value", () => {
    const spy = jest.spyOn(localStorage, "setItem");
    const key = "testKey";
    const value = { a: 1 };

    save(key, value);

    expect(spy).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it("load returns parsed value for valid JSON", () => {
    const key = "testKey";
    const value = { a: 1 };

    localStorage.getItem.mockReturnValueOnce(JSON.stringify(value));

    const result = load(key);

    expect(result).toEqual(value);
  });

  it("load returns null for missing key", () => {
    localStorage.getItem.mockReturnValueOnce(null);

    expect(load("missingKey")).toBeNull();
  });

  it("load returns null for invalid JSON value", () => {
    const key = "badJSON";

    localStorage.getItem.mockReturnValueOnce("not-json");

    expect(load(key)).toBeNull();
  });

  it("remove calls localStorage.removeItem with correct key", () => {
    const spy = jest.spyOn(localStorage, "removeItem");
    const key = "testKey";

    remove(key);

    expect(spy).toHaveBeenCalledWith(key);
  });
});

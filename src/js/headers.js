import { API_KEY } from "./constants";
import * as storage from "./api/auth/key";

/**
 * Constructs the headers for API requests, including content type and authorization.
 *
 * @returns {Headers} The headers object to be used in API requests.
 */

export function headers() {
  const token = storage.load("token");
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(API_KEY && { "X-Noroff-API-Key": API_KEY }),
    ...(token && { Authorization: `Bearer ${token}` }),
  });
  return headers;
}

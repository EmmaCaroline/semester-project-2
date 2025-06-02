import { headers } from "../headers";
import { handleResponseWithFallback } from "../utilities/handleResponseWithFallback";

/**
 * Performs a fetch request with provided options and handles response with error fallback.
 *
 * @param {string} url - The URL to send the fetch request to.
 * @param {RequestInit} [options={}] - The fetch options including method, headers, body, etc.
 * @param {string} [defaultErrorMessage] - The default error message to use if the fetch fails.
 * @returns {Promise<any>} A promise that resolves with the parsed JSON response.
 * @throws {Error} Throws an error if the fetch fails or the response is not OK.
 */
export async function apiFetchWithHandling(
  url,
  options = {},
  defaultErrorMessage,
) {
  const config = {
    headers: headers(),
    ...options,
  };

  const response = await fetch(url, config);
  return handleResponseWithFallback(response, defaultErrorMessage);
}

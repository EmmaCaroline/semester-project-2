/**
 * Handles the response from a fetch request, parsing the JSON result if successful,
 * or extracting and throwing an error message if the response is not OK.
 *
 * @param {Response} response - The fetch Response object to handle.
 * @param {string} [defaultErrorMessage="Request failed."] - The default error message to use if no specific error info is found.
 * @returns {Promise<any>} A promise that resolves with the parsed JSON data from the response.
 * @throws {Error} Throws an error with a detailed message if the response is not OK.
 */
export async function handleResponseWithFallback(
  response,
  defaultErrorMessage = "Request failed.",
) {
  if (!response.ok) {
    let errorMessage = defaultErrorMessage;

    try {
      const errorData = await response.json();
      errorMessage += ` ${errorData.errors?.[0]?.message || errorData.message || ""}`;
    } catch {
      const errorText = await response.text();
      errorMessage += ` ${errorText}`;
    }

    throw new Error(errorMessage.trim());
  }

  return response.json();
}

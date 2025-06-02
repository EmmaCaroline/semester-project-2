import { headers } from "../headers";
import { handleResponseWithFallback } from "../utilities/handleResponseWithFallback";

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

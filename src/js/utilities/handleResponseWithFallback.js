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

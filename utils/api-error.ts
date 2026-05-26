export async function getResponseError(response: Response, fallback = "Something went wrong.") {
  const data = await response.json().catch(() => null);

  return data?.error ?? fallback;
}

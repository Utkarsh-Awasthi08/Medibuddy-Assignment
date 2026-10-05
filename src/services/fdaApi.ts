import type { Medicine } from "../types/medicine";

const FDA_BASE_URL = "https://api.fda.gov/drug/label.json";

export const searchMedicines = async (
  query: string
): Promise<Medicine[]> => {
  const url = new URL(FDA_BASE_URL);

  url.searchParams.set(
    "search",
    `openfda.brand_name:${query}`
  );

  url.searchParams.set("limit", "20");

  const response = await fetch(url.toString());

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }

    throw new Error("Failed to fetch medicine data.");
  }

  const data = await response.json();

  return data.results ?? [];
};

export const getMedicineById = async (
  id: string,
  signal?: AbortSignal
): Promise<Medicine | null> => {
  const normalizedId = id.trim();

  if (!normalizedId) {
    return null;
  }

  const url = new URL(FDA_BASE_URL);
  url.searchParams.set("search", `id:${normalizedId}`);
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error("Failed to fetch medicine details.");
  }

  const data = await response.json();
  return data.results?.[0] ?? null;
};
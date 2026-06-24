import type { SearchResponse } from "../types/searchResponse";

const BASE_URL =
  import.meta.env.VITE_SEARCHSPRING_BASE_URL;

const SITE_ID =
  import.meta.env.VITE_SEARCHSPRING_SITE_ID;

const RESULTS_FORMAT =
  import.meta.env.VITE_SEARCHSPRING_RESULTS_FORMAT;

interface SearchParams {
  query?: string;
  page?: number;
  sort?: string;
  brand?: string;
  color?: string;
}

let activeController: AbortController | null = null;

export const searchProducts = async ({
  query = "",
  page = 1,
  sort = "",
  brand = "",
  color = "",
}: SearchParams): Promise<SearchResponse> => {
  const params = new URLSearchParams({
    siteId: SITE_ID,
    resultsFormat: RESULTS_FORMAT,
    page: String(page),
  });

  // Search
  if (query.trim()) {
    params.append("q", query.trim());
  }

  // Sorting
  switch (sort) {
    case "price-asc":
      params.append("sort.price", "asc");
      break;

    case "price-desc":
      params.append("sort.price", "desc");
      break;

    case "newest":
      params.append(
        "sort.days_since_published",
        "asc"
      );
      break;

    default:
      break;
  }

  // Brand Filter
  if (brand) {
    params.append("filter.brand", brand);
  }

  // Color Filter
  if (color) {
    params.append(
      "filter.color_family",
      color
    );
  }

  // Cancel previous request
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  try {
    const response = await fetch(
      `${BASE_URL}?${params.toString()}`,
      {
        signal: activeController.signal,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Searchspring request failed: ${response.status}`
      );
    }

    const data =
      (await response.json()) as SearchResponse;

    activeController = null;

    return data;
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw error;
    }

    activeController = null;
    throw error;
  }
};
import type { Product } from "./product";
import type { Pagination } from "./pagination";
import type { Facet } from "./facet";
import type { SortOption } from "./sorting";

export interface SearchResponse {
  pagination: Pagination;
  results: Product[];
  facets: Facet[];
  sorting: {
    options: SortOption[];
  };
}
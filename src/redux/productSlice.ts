import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { searchProducts } from "../api/searchspring";
import type { Product } from "../types/product";
import type { Facet } from "../types/facet";
import type { SortOption } from "../types/sorting";

interface ProductState {
  products: Product[];
  facets: Facet[];
  sortOptions: SortOption[];
  loading: boolean;
  error: string | null;
  query: string;
  page: number;
  totalPages: number;
  hasLoaded: boolean;
  totalResults: number;
  sortField: string;
  sortDirection: string;
  selectedFilters: Record<string, string[]>;
}

const initialState: ProductState = {
  products: [],
  facets: [],
  sortOptions: [],
  loading: false,
  error: null,
  query: "",
  page: 1,
  totalPages: 1,
  totalResults: 0,
  sortField: "",
  sortDirection: "",
  hasLoaded: false,
  selectedFilters: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      query,
      page,
      sort,
      brand,
      color,
    }: {
      query: string;
      page: number;
      sort?: string;
      brand?: string;
      color?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await searchProducts({
        query,
        page,
        sort,
        brand,
        color,
      });
    } catch (err) {
      if (
        err instanceof DOMException &&
        err.name === "AbortError"
      ) {
        // Ignore aborted requests
        return rejectWithValue("ABORTED");
      }

      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "Failed to load products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setQuery: (
      state,
      action: PayloadAction<string>
    ) => {
      state.query = action.payload;
    },
    setPage: (
      state,
      action: PayloadAction<number>
    ) => {
      state.page = action.payload;
    },
    setSort: (
      state,
      action: PayloadAction<{
        field: string;
        direction: string;
      }>
    ) => {
      state.sortField =
        action.payload.field;

      state.sortDirection =
        action.payload.direction;
    },
    addFilter: (
      state,
      action: PayloadAction<{
        field: string;
        value: string;
      }>
    ) => {
      const { field, value } =
        action.payload;
      if (!state.selectedFilters[field]) {
        state.selectedFilters[field] = [];
      }
      if (
        !state.selectedFilters[field].includes(
          value
        )
      ) {
        state.selectedFilters[field].push(
          value
        );
      }
    },
    removeFilter: (
      state,
      action: PayloadAction<{
        field: string;
        value: string;
      }>
    ) => {
      const { field, value } =
        action.payload;

      state.selectedFilters[field] =
        (
          state.selectedFilters[field] ||
          []
        ).filter(
          (item) => item !== value
        );
    },
    clearFilters: (state) => {
      state.selectedFilters = {};
    },
    resetProducts: (state) => {
      state.products = [];
      state.query = "";
      state.page = 1;
      state.sortField = "";
      state.sortDirection = "";
      state.selectedFilters = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
  fetchProducts.fulfilled,
  (state, action) => {
    state.loading = false;
    state.hasLoaded = true;

    state.products = action.payload.results;
    state.facets = action.payload.facets;
    state.sortOptions = action.payload.sorting.options;
    state.totalPages =
      action.payload.pagination.totalPages;
    state.totalResults =
      action.payload.pagination.totalResults;

    state.error = null;
  }
)
      .addCase(
  fetchProducts.rejected,
  (state, action) => {
    console.log(action.error);
    state.loading = false;
    state.hasLoaded = true;

    if (action.payload === "ABORTED") {
    return;
  }

    state.error =
      (action.payload as string) ??
      "Failed to load products";
  }
)
  },
});

export const {
  setQuery,
  setPage,
  setSort,
  addFilter,
  removeFilter,
  clearFilters,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Alert,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useDebounce } from "../hooks/useDebounce";

import SearchBar from "../components/SearchBar/SearchBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import FilterChips from "../components/FilterChips/FilterChips";
import PaginationControls from "../components/PaginationControls/PaginationControls";
import Logo from "../components/Logo/Logo";

import { useUrlState } from "../hooks/useUrlState";
import { fetchProducts } from "../redux/productSlice";

const FilterDrawer = lazy(
  () => import("../components/FilterDrawer/FilterDrawer"),
);

const ProductListingPage = () => {
  const dispatch = useAppDispatch();

  const {
    query: urlQuery,
    page: urlPage,
    sort,
    brand,
    color,
    updateParams,
  } = useUrlState();

  const [searchTerm, setSearchTerm] = useState(() => urlQuery);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    products,
    loading,
    error,
    totalResults,
    totalPages,
    facets,
    hasLoaded,
  } = useAppSelector((state) => state.products);

  const brandFacet = useMemo(
    () => facets.find((facet) => facet.field === "brand"),
    [facets],
  );

  const colorFacet = useMemo(
    () => facets.find((facet) => facet.field === "color_family"),
    [facets],
  );

  useEffect(() => {
    if (urlQuery !== searchTerm) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchTerm(urlQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        query: urlQuery,
        page: urlPage,
        sort,
        brand,
        color,
      }),
    );
  }, [dispatch, urlQuery, urlPage, sort, brand, color]);

  useEffect(() => {
    if (debouncedSearch === urlQuery) {
      return;
    }

    updateParams({
      q: debouncedSearch,
      page: 1,
      sort,
      brand,
      color,
    });
  }, [debouncedSearch, urlQuery, sort, brand, color, updateParams]);

  const handleOpenFilters = useCallback(() => {
    setFiltersOpen(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setFiltersOpen(false);
  }, []);

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e2ebef",
        px: {
          xs: 1,
          sm: 2,
          md: 3,
        },
      }}
    >
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1200,
          backgroundColor: "#e2ebef",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(8px)",
          flexShrink: 0,
        }}
      >
        <Box sx={{ py: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Logo />

            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mt: 1,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              aria-live="polite"
              sx={{
                fontWeight: 500,
                letterSpacing: "0.025em",
              }}
            >
              Total: <strong>{totalResults.toLocaleString()}</strong>
            </Typography>
            <PaginationControls
              page={urlPage}
              totalPages={totalPages}
              onPageChange={(page) =>
                updateParams({
                  page,
                })
              }
            />
            <IconButton onClick={handleOpenFilters} aria-label="Open filters">
              <MenuIcon />
            </IconButton>
          </Box>
          <FilterChips
            brand={brand}
            color={color}
            onRemoveBrand={() =>
              updateParams({
                brand: "",
                page: 1,
              })
            }
            onRemoveColor={() =>
              updateParams({
                color: "",
                page: 1,
              })
            }
            onClearAll={() =>
              updateParams({
                brand: "",
                color: "",
                page: 1,
              })
            }
          />
        </Box>
        <Suspense fallback={null}>
          <FilterDrawer
            open={filtersOpen}
            sort={sort ?? ""}
            brand={brand}
            color={color}
            brandFacet={brandFacet}
            colorFacet={colorFacet}
            onClose={handleCloseFilters}
            onSortChange={(value) => {
              updateParams({
                sort: value,
                page: 1,
              });
            }}
            onBrandChange={(value) => {
              updateParams({
                brand: value,
                page: 1,
              });
            }}
            onColorChange={(value) => {
              updateParams({
                color: value,
                page: 1,
              });
            }}
            onClearAll={() => {
              updateParams({
                brand: "",
                color: "",
                page: 1,
              });
            }}
          />
        </Suspense>

        {loading && (
          <Box role="status" aria-live="polite" aria-label="Loading products">
            <LinearProgress />
          </Box>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: "auto",
          pt: 2,
          pb: 4,
        }}
      >
        {hasLoaded && !loading && error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {hasLoaded && !loading && urlQuery !== "" && !error && products.length === 0 && (
          <Alert severity="info" sx={{ mb: 3 }}>
            No products found. Try another search.
          </Alert>
        )}

        <Box sx={{ mt: 2 }}>
          <section aria-label="Product search results">
            {!loading && products.length > 0 && (
              <ProductGrid products={products} />
            )}
          </section>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductListingPage;

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Alert,
  Button,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useDebounce } from "../hooks/useDebounce";

import SearchBar from "../components/SearchBar/SearchBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import FilterDropdown from "../components/FilterDropdown/FilterDropdown";
import FilterChips from "../components/FilterChips/FilterChips";
import PaginationControls from "../components/PaginationControls/PaginationControls";

import { useUrlState } from "../hooks/useUrlState";
import { fetchProducts } from "../redux/productSlice";

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

  const [showFilters, setShowFilters] = useState(false);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { products, loading, error, totalResults, totalPages, facets } =
    useAppSelector((state) => state.products);

  const brandFacet = facets.find((facet) => facet.field === "brand");

  const colorFacet = facets.find((facet) => facet.field === "color_family");

  useEffect(() => {
    if (urlQuery !== searchTerm) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchTerm(urlQuery);
    }
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

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        px: {
          xs: 2,
          sm: 3,
        },
      }}
    >
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Box sx={{ py: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 700,
            }}
          >
            Product Catalog
          </Typography>

          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          {isMobile ? (
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "✕ Close Filters" : "☰ Filters"}
              </Button>

              <Collapse in={showFilters}>
                <Box
                  sx={{
                    mt: 2,
                    display: "grid",
                    gap: 1.5,
                  }}
                >
                  <SortDropdown
                    value={sort ?? ""}
                    onChange={(value) =>
                      updateParams({
                        sort: value,
                        page: 1,
                      })
                    }
                  />

                  <FilterDropdown
                    label="Brand"
                    value={brand ? [brand] : []}
                    options={
                      brandFacet?.values.map((item) => ({
                        label: item.label,
                        value: item.value ?? "",
                      })) ?? []
                    }
                    onChange={(values) =>
                      updateParams({
                        brand: values[0] ?? "",
                        page: 1,
                      })
                    }
                  />

                  <FilterDropdown
                    label="Color"
                    value={color ? [color] : []}
                    options={
                      colorFacet?.values.map((item) => ({
                        label: item.label,
                        value: item.value ?? "",
                      })) ?? []
                    }
                    onChange={(values) =>
                      updateParams({
                        color: values[0] ?? "",
                        page: 1,
                      })
                    }
                  />
                </Box>
              </Collapse>
            </Box>
          ) : (
            <Box
              sx={{
                mt: 2,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
              }}
            >
              <SortDropdown
                value={sort ?? ""}
                onChange={(value) =>
                  updateParams({
                    sort: value,
                    page: 1,
                  })
                }
              />

              <FilterDropdown
                label="Brand"
                value={brand ? [brand] : []}
                options={
                  brandFacet?.values.map((item) => ({
                    label: item.label,
                    value: item.value ?? "",
                  })) ?? []
                }
                onChange={(values) =>
                  updateParams({
                    brand: values[0] ?? "",
                    page: 1,
                  })
                }
              />

              <FilterDropdown
                label="Color"
                value={color ? [color] : []}
                options={
                  colorFacet?.values.map((item) => ({
                    label: item.label,
                    value: item.value ?? "",
                  })) ?? []
                }
                onChange={(values) =>
                  updateParams({
                    color: values[0] ?? "",
                    page: 1,
                  })
                }
              />
            </Box>
          )}

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

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
            }}
            aria-live="polite"
          >
            {totalResults} products found
          </Typography>
        </Box>

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
          pt: 3,
          pb: 4,
        }}
      >
        {error && (
          <Alert
            severity="error"
            role="alert"
            sx={{
              mb: 3,
            }}
          >
            {error}
          </Alert>
        )}

        {!loading && products.length === 0 && (
          <Alert
            severity="info"
            role="status"
            sx={{
              mb: 3,
            }}
          >
            No products found. Try another search.
          </Alert>
        )}

        <section aria-label="Product search results">
          <ProductGrid products={products} />
        </section>

        
      </Box>
      <PaginationControls
          page={urlPage}
          totalPages={totalPages}
          onPageChange={(page) =>
            updateParams({
              page,
            })
          }
        />
    </Container>
  );
};

export default ProductListingPage;

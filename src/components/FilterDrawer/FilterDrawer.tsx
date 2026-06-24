import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

import SortDropdown from "../SortDropdown/SortDropdown";
import FilterDropdown from "../FilterDropdown/FilterDropdown";

import type { Facet } from "../../types/facet";

interface Props {
  open: boolean;
  sort: string;
  brand: string;
  color: string;
  brandFacet?: Facet;
  colorFacet?: Facet;
  onClose: () => void;
  onSortChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onClearAll: () => void;
}

const mapFacetOptions = (facet?: Facet) =>
  facet?.values.map((item) => ({
    label: item.label,
    value: item.value ?? "",
  })) ?? [];

const FilterDrawer = ({
  open,
  sort,
  brand,
  color,
  brandFacet,
  colorFacet,
  onClose,
  onSortChange,
  onBrandChange,
  onColorChange,
  onClearAll,
}: Props) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "85vw",
              sm: 380,
            },
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          square
          sx={{
            px: 3,
            py: 2,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              Filters & Sorting
            </Typography>

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <SortDropdown value={sort} onChange={onSortChange} />

          <Divider />

          <FilterDropdown
            label="Brand"
            value={brand ? [brand] : []}
            options={mapFacetOptions(brandFacet)}
            onChange={(values) => onBrandChange(values[0] ?? "")}
          />

          <FilterDropdown
            label="Color"
            value={color ? [color] : []}
            options={mapFacetOptions(colorFacet)}
            onChange={(values) => onColorChange(values[0] ?? "")}
          />
        </Box>

        {/* Footer */}
        <Paper
          elevation={0}
          square
          sx={{
            p: 3,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="error"
            size="large"
            onClick={onClearAll}
          >
            Clear All Filters
          </Button>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default React.memo(FilterDrawer);

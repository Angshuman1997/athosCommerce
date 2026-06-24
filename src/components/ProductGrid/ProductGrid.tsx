import React from "react";
import { Box } from "@mui/material";

import ProductCard from "../ProductCard/ProductCard";

import type { Product } from "../../types/product";

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
          xl: "repeat(8, 1fr)",
        },
        gap: 2,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default React.memo(ProductGrid);
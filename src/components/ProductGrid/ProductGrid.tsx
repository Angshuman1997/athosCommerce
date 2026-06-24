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
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },

        gap: 3,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductGrid;

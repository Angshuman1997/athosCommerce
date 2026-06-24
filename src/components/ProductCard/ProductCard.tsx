import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

import type { Product } from "../../types/product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const image = product.thumbnailImageUrl || product.imageUrl || "";

  const showMsrp = product.msrp && Number(product.msrp) > Number(product.price);

  return (
    <Card
      role="article"
      aria-label={product.name}
      tabIndex={0}
      sx={{
        height: "100%",
      }}
    >
      <CardMedia
  component="img"
  image={image}
  alt={product.name}
  loading="lazy"
  width="300"
  height="400"
  sx={{
    width: "100%",
    aspectRatio: "3 / 4",
    height: "auto",
    objectFit: "cover",
  }}
/>

      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": {
            pb: 1.5,
          },
        }}
      >
        <Typography
          variant="subtitle1"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 48,
          }}
        >
          {product.name}
        </Typography>

        {product.brand && (
          <Typography variant="caption" color="text.secondary">
            {product.brand}
          </Typography>
        )}

        <Box
          sx={{
            mt: 1,
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
            }}
          >
            {product.price}
          </Typography>

          {showMsrp && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "line-through",
              }}
            >
              {product.msrp}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(ProductCard);
